"use client";

import { useMemo, useSyncExternalStore } from "react";
import { createClient } from "@/lib/supabase/client";
import { removeFromAccount, saveToAccount } from "@/lib/saved-api";

const STORAGE_KEY = "nivora-saved-properties";
const UPDATE_EVENT = "nivora-favourites-updated";
const EMPTY_SNAPSHOT = "[]";

function subscribe(callback: () => void) {
  window.addEventListener(UPDATE_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(UPDATE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT;
}

function getServerSnapshot() {
  return EMPTY_SNAPSHOT;
}

function parseSavedIds(snapshot: string): string[] {
  try {
    const parsedValue = JSON.parse(snapshot);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(
      (value): value is string => typeof value === "string",
    );
  } catch {
    return [];
  }
}

export function useSavedProperties() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const savedIds = useMemo(
    () => parseSavedIds(snapshot),
    [snapshot],
  );

  function isPropertySaved(propertyId: string) {
    return savedIds.includes(propertyId);
  }

  function toggleSavedProperty(propertyId: string) {
    const wasSaved = savedIds.includes(propertyId);
    const updatedIds = wasSaved
      ? savedIds.filter((savedId) => savedId !== propertyId)
      : [...savedIds, propertyId];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedIds),
    );

    window.dispatchEvent(new Event(UPDATE_EVENT));

    void createClient().auth.getSession().then(({ data }) => {
      if (!data.session) return;
      return wasSaved
        ? removeFromAccount(propertyId)
        : saveToAccount(propertyId);
    }).catch(() => {
      // The local optimistic state remains available if account sync fails.
    });
  }

  return {
    savedIds,
    savedCount: savedIds.length,
    isPropertySaved,
    toggleSavedProperty,
  };
}
