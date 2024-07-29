"use client"

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

type SignOutButtonProps = {
  variant?: "default" | "ghost" | "destructive" | "outline" | "secondary" | "link" | null | undefined;
  size?: "default" | "icon" | "sm" | "lg" | null | undefined;
}

export default function SignOutButton({ variant = "default", size = "default" }: SignOutButtonProps) {
  return (
    <Button variant={variant} size={size} onClick={() => signOut()}>Sign out</Button>
  );
}