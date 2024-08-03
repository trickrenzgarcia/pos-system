"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ImagePlus, Minus, Plus } from "lucide-react";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Category, createProduct } from "@/app/actions";
import { ACCEPTED_IMAGE_TYPES } from "@/constant";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const formSchema = z.object({
  image: z.instanceof(File, {
    message: "Please select an image file.",
  }),
  name: z.string().min(1, {
    message: "Product Name must be at least 1 character.",
  }).max(50, {
    message: "Product Name must be at most 50 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }).max(50, {
    message: "Category must be at most 26 characters.",
  }),
  price: z.string().min(1, {
    message: "Min price 0.01.",
  }).max(100000000, {
    message: "Max price 100M.",
  }).refine((val) => parseFloat(val) > 0.01, {
    message: "Min price 0.01.",
  }).refine((val) => parseFloat(val) < 100000000, {
    message: "Max price 100M.",
  }),
  stock: z.string().min(1, {
    message: "Min stock 1.",
  }).max(100000, {
    message: "Max stock 100K.",
  }).refine((val) => parseInt(val) > 0, {
    message: "Min stock 1.",
  }).refine((val) => parseInt(val) < 100000, {
    message: "Max stock 100K.",
  }),
});

export default function AddProduct({ categories }: { categories: Category[] }) {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState<string | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = React.useState<string | null>(null);
  const [stock, setStock] = React.useState<number>(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      name: "",
      category: "",
      price: "",
      stock: "",
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const invalidChars = ["+", "-", "e", "E"];
    if (invalidChars.includes(event.key)) {
      event.preventDefault();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = event.clipboardData.getData("text");
    if (/[eE\+\-\*\/]/.test(paste)) {
      event.preventDefault();
    }
  };

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if(acceptedFiles.length > 0 && acceptedFiles[0].type.startsWith("image/")) {
        const file = acceptedFiles[0];

        if(!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
          toast("Invalid Image Type", {
            description: "Please select a valid image type.",
            action: {
              label: "Okay",
              onClick: () => toast.dismiss(),
            }
          })
          return;
        }

        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          setImage(e.target?.result?.toString() || "");
          form.setValue("image", file);
          const fileURL = URL.createObjectURL(file);
          setImageUrl(fileURL);
        }
        reader.readAsDataURL(file);
        setUploadedFileName(file.name);
      } else {
        toast("Invalid Image", {
          description: "Please select a valid image file.",
          action: {
            label: "Okay",
            onClick: () => toast.dismiss(),
          }
        })
      }
    },
    [form]
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setImage(e.target?.result?.toString() || "");
        form.setValue("image", file);
        const fileURL = URL.createObjectURL(file);
        setImageUrl(fileURL);
      };

      reader.readAsDataURL(file);
      setUploadedFileName(file.name);
    } else {
      toast("Invalid Image", {
        description: "Please select a valid image file.",
        action: {
          label: "Okay",
          onClick: () => toast.dismiss(),
        }
      })
    }
  }

  const { getInputProps, getRootProps, isDragActive } = useDropzone({ onDrop });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    //const res = await createCategory(values);

    // if(res.status === 400) {
    //   toast("Already Exists", {
    //     description: "Category already exists, try different name.",
    //     action: {
    //       label: "Okay",
    //       onClick: () => toast.dismiss(),
    //     }
    //   })
    // } else {
    //   toast("Category has been created", {
    //     description: "You can now add products to this category.",
    //     action: {
    //       label: "Okay",
    //       onClick: () => toast.dismiss(),
    //     }
    //   })
    // }

    setOpen(false);
    form.reset();
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-fit bg-blue-600 text-white hover:bg-blue-500" size="sm">Add Product</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add Product</DrawerTitle>
            <DrawerDescription>
              Make a new product.
            </DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="p-4 pb-0">
                    <FormLabel htmlFor="name">Product Image</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          {...getInputProps()}
                          {...form.register("image")}
                          id="image"
                          className="h-full w-full"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: "none" }}
                        />
                        <div className="w-full">
                          <div
                            className={cn("flex h-[125px] w-[125px] cursor-pointer items-center justify-center rounded-md bg-muted",
                              image && "border bg-background hover:border-accent"
                            )}
                            {...getRootProps()}
                            onClick={(e) => {
                              e.preventDefault();
                              const fileInput = document.getElementById("image") as HTMLInputElement;
                              fileInput.click();
                            }}
                          >
                            {image ? (
                              <Image
                                src={imageUrl || ""}
                                alt="Product Image"
                                style={{ objectFit: "cover" }}
                                width={125}
                                height={125}
                                className="z-0 h-full max-h-[125px] w-full max-w-[125px] rounded-md"
                              />
                            ) : (
                              <div className="flex h-[125px] max-h-[125px] w-[125px] max-w-[125px] items-center justify-center rounded-md border bg-muted hover:border-accent">
                                <ImagePlus className="h-6 w-6" />
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                      
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="p-4 pb-0">
                    <FormLabel htmlFor="name">Product name</FormLabel>
                    <FormControl>
                      <Input id="name" type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="p-4 pb-0">
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent id="category">
                        {categories.map((cat) => (
                          <SelectItem value={cat.id}>{cat.category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <div className="w-full gap-4 p-4 flex justify-between">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="pb-0">
                      <FormLabel htmlFor="price">Price</FormLabel>
                      <FormControl>
                        <Input 
                          id="price" 
                          type="number"
                          {...field}
                          onKeyDown={handleKeyDown}
                          onPaste={handlePaste}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem className="pb-0">
                      <FormLabel htmlFor="stock">Stock</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="default"
                            size="icon"
                            className="h-6 w-6 shrink-0"
                            onClick={() => {
                              setStock((prev) => prev - 10);
                            }}
                            disabled={stock <= 9}
                          >
                            <Minus className="h-4 w-4" />
                            <span className="sr-only">Decrease</span>
                          </Button>
                          <Input 
                            id="stock"
                            type="number"
                            value={stock}
                            onChange={(e) => {
                              setStock(parseInt(e.target.value))
                            }}
                            onKeyDown={handleKeyDown}
                            onPaste={handlePaste}
                          />
                          <Button
                            type="button"
                            variant="default"
                            size="icon"
                            className="h-6 w-6 shrink-0"
                            onClick={() => {
                              setStock((prev) => prev + 10);
                            }}
                          >
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Increase</span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                      setImage(null)
                      setImageUrl(null)
                      setUploadedFileName(null)
                      setStock(0)
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
