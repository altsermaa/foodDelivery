"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ShowCategories } from "./_component/ShowCategories";
import { ShowFoods } from "./_component/ShowFoods";

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  console.log(foods);

  useEffect(() => {
    const getCategories = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8000/admin/getCategories",
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
        "http://localhost:8000/admin/readyFoods",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFoods(response.data.foods);
    };
    getFoods();
  }, []);

  return (
    <div>
      <ShowCategories categories={categories} />
      <ShowFoods foods={foods} />
    </div>
  );
};

export default MenuPage;
