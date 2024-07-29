import SignOutButton from "@/components/button/SignOutButton";
import { auth } from "@/drizzle/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if(!session) {
    redirect("/auth/login");
  }

  if(session.user.role !== "admin") {
    redirect("/access-denied");
  }

  return (
    <main className="">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <SignOutButton />
    </main>
  );
}
