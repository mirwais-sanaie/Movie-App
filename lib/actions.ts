"use server";

import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";

// Sign in with Google
export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

// Sign out
export async function signOutAction() {
  await signOut();
  redirect("/");
}
