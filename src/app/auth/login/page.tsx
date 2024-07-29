import { auth } from "@/drizzle/auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ModeToggle } from "@/components/button/ModeToggle";
import { Button } from "@/components/ui/button";


export const metadata = {
  title: "Sign In | POS System powered by Brojava",
  description: "Sign in to your account",
};

export default async function LoginPage() {
  const session = await auth();

  if(session) {
    redirect("/");
  }

  return (
    <div className="w-full h-screen">
      <header className="w-full h-[100px] mb-10">
        <nav className="container flex justify-between items-center h-full">
          <div className="space-y-2">
            <h1 className="text-xl font-semibold">App Name</h1>
            <Separator />
            <div className="flex gap-4">
              <Link href="/" className="text-sm">Company Link</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/demo">
              <Button variant="default" size="default">Demo</Button>
            </Link>
          </div>
        </nav>
      </header>
      <div className="w-full flex flex-col justify-center items-center gap-8">
        <LoginForm />
        <footer>
          <p className="text-center text-sm text-gray-500">© 2021 Brojava. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}