
import { getCategories, getProducts } from "@/app/actions";
import SideNav from "./side-nav";

export default async function ProductsLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const categories = await getCategories();
  const products = await getProducts();
  return <SideNav children={children} products={products} categories={categories} />;
}
