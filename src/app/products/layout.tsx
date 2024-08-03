
import { getCategories } from "@/app/actions";
import SideNav from "./side-nav";

export default async function ProductsLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const categories = await getCategories();
  return <SideNav children={children} categories={categories} />;
}
