"use client";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ShowCategories } from "./_component/ShowCategories";
import { ShowFoods } from "./_component/ShowFoods";

export type FoodProps = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  categoryId: string;
};

export type PropsType = {
  foods: Record<string, FoodProps[]>;
  setFoods: Dispatch<SetStateAction<Record<string, FoodProps[]>>>;
};

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState<Record<string, FoodProps[]>>({});
  console.log(foods, "asd");

  useEffect(() => {
    const getCategories = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://fooddelivery-q3yg.onrender.com/admin/getCategories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data.allCategories);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getFoods = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://fooddelivery-q3yg.onrender.com/admin/readyFoods",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFoods(response?.data?.foods);
    };
    getFoods();
  }, []);

  console.log(foods);

  return (
    <div>
      <ShowCategories categories={categories} />
      <ShowFoods foods={foods} setFoods={setFoods} />
    </div>
  );
};

export default MenuPage;
