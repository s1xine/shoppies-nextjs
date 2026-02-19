import { getCategories } from "@/lib/db/queries/products-queries";
import CategoryFilter from "./category-filter";

const CategoryFilterWrapper = async () => {
  const categories = await getCategories();

  return <CategoryFilter categories={categories} />;
};

export default CategoryFilterWrapper;
