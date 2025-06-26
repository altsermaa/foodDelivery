import { Badge } from "@/components/ui/badge";

type CategoryType = {
  categoryName: string;
  _id: string;
};

type ShowCategoriesType = {
  categories: CategoryType[];
};

export const ShowCategories = ({ categories }: ShowCategoriesType) => {
  return (
    <div className="flex">
      {categories.map((category) => {
        return (
          <Badge variant="outline" key={category._id}>
            {" "}
            {category.categoryName}
          </Badge>
        );
      })}
    </div>
  );
};
