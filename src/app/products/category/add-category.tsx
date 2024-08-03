"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { icons } from "./icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createCategory } from "@/app/actions";

const formSchema = z.object({
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }).max(26, {
    message: "Category must be at most 26 characters.",
  }),
  icon: z.string().min(1, {
    message: "Icon must be selected.",
  }),
});

export default function AddCategory() {
  const [open, setOpen] = React.useState(false);
  const [selectedIcon, setSelectedIcon] = React.useState<string | undefined>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      icon: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await createCategory(values);

    if(res.status === 400) {
      toast("Already Exists", {
        description: "Category already exists, try different name.",
        action: {
          label: "Okay",
          onClick: () => toast.dismiss(),
        }
      })
    } else {
      toast("Category has been created", {
        description: "You can now add products to this category.",
        action: {
          label: "Okay",
          onClick: () => toast.dismiss(),
        }
      })
    }

    setOpen(false);
    setSelectedIcon(undefined);
    form.reset();
  }

  

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Card
          className={cn(
            "h-36 md:h-48 lg:h-52",
            "cursor-pointer select-none hover:bg-blue-600 hover:text-white",
          )}
        >
          <CardHeader></CardHeader>
          <CardContent className="flex w-full flex-col items-center justify-center gap-2">
            <Plus className="h-10 w-10 lg:h-16 lg:w-16" />
            <p className="font-bold">Add Category</p>
          </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add Category</DrawerTitle>
            <DrawerDescription>
              Make a new category of the product.
            </DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="p-4 pb-0">
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <FormControl>
                      <Input id="category" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem className="p-4 pb-2">
                    <FormLabel htmlFor="icon">
                      Icon:{" "}
                      <span className="text-blue-500">{selectedIcon}</span>
                    </FormLabel>
                    <FormControl>
                      <div>
                        <Input id="icon" className="hidden" type="text" {...field} />
                        <div className="grid h-56 w-full grid-cols-5 gap-2 overflow-y-scroll pr-1">
                          {icons.map(({ name, icon: IC }) => {
                            return (
                              <Button
                                type="button"
                                key={name}
                                className={cn(
                                  "",
                                  selectedIcon === name &&
                                    "bg-blue-600 text-white hover:bg-blue-500",
                                )}
                                variant="outline"
                                onClick={() => {
                                  setSelectedIcon(name)
                                  form.setValue("icon", name)
                                }}
                              >
                                <IC />
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isLoading ? "Loading..." : "Submit"}
                </Button>
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedIcon(undefined)
                      form.reset()
                    }}
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
