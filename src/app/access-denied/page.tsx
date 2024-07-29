import SignOutButton from "@/components/button/SignOutButton";
import { auth } from "@/drizzle/auth";
import { redirect } from "next/navigation";

export default async function AccessDenied() {
  const session = await auth();

  if(!session) {
    redirect("/auth/login");
  }

  if(session && session.user.role !== "admin") {
    return (
      <main className="w-full h-screen flex flex-col justify-center items-center">
        <h1>Access Denied</h1>
        <SignOutButton variant="outline" />
      </main>
    );
  } else {
    redirect("/");
  }
}