"use client";

import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";



// Saving a preset
export async function saveMixerPreset(presetName, settings) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Not logged in");
  }
  const presetsCol = collection(db, "users", user.uid, "presets");

  await addDoc(presetsCol, {
    name: presetName || "Unnamed preset",
    createdAt: Date.now(),
    ...settings,
  });
}

// Load presets
export async function loadMixerPresets() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Not logged in");
  }

  const presetsCol = collection(db, "users", user.uid, "presets");
  const snap = await getDocs(presetsCol);
  const presets = [];
  snap.forEach((docSnap) => {
    presets.push({ id: docSnap.id, ...docSnap.data() });
  });

  return presets;
}
 // delete a preset (need to add an option to replace or rename maybe but that comes later)
export async function deleteMixerPreset(presetId) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Not logged in");
  }

  const presetRef = doc(db, "users", user.uid, "presets", presetId);
  await deleteDoc(presetRef);
}
