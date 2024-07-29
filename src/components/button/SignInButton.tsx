"use client"
import { OAuthProviderType } from "next-auth/providers";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

type SignInButtonProps = {
  provider: {
    id: OAuthProviderType;
    name: string;
  }
};

export default function SignInButton({ provider }: SignInButtonProps) {
  return (
    <Button
      type="button"
      className="w-full"
      variant="outline"
      onClick={() => signIn(provider.id)}
    >
      Sign in with {provider.name}
    </Button>
  );

}