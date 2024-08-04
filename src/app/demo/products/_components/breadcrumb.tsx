"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation";

import React from "react";

type Props = {
  list?: string[];
  page: string;
};

export default function ProductBreadcrumb({ list = [], page }: Props) {
  const router = useRouter();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="cursor-pointer"
            onClick={() => router.push(`/demo/products`)}
          >
            Products
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {list.map((item, index) => (
          <>
            <BreadcrumbItem key={index}>
              <BreadcrumbLink
                className="cursor-pointer"
                onClick={() => router.push(`/demo/products/${list[0].toLowerCase()}`)}
              >
                {item}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ))}

        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold">{page}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
