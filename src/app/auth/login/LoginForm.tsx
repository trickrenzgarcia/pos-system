"use client";
import SignInButton from "@/components/button/SignInButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  empId: z.string().min(6, {
    message: "Employee ID must be at least 6 characters long.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      empId: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await signIn("credentials", {
      empId: values.empId,
      password: values.password,
      redirect: false
    })
    if(!response?.error) {
      router.push("/");
      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Credentials",
        description: "There was a problem with your request.",
      })
    }
  }

  return (
    <Card className="w-[450px] px-5 py-5">
      <CardHeader>
        <CardTitle className="text-center">POS Login</CardTitle>
        <CardDescription className="text-center">
          Point of sales and Inventory management system all in one.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 gap-3">
                <FormField
                  control={form.control}
                  name="empId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input id="UserID" placeholder="User ID" {...field} type="number" className="appearance-none" inputMode="numeric" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <Input
                          id="Password"
                          placeholder="Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Button type="submit" className="w-full bg-blue-600">Login</Button>
              <SignInButton provider={{ id: "google", name: "Google" }} />
            </div>
            
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
