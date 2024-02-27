import { useEffect, useState } from "react";
import { getCategories } from "../../managers/CategoryManager";
import { getEvents } from "../../managers/EventManager";

export const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getCategories().then((catArray) => {
      setCategories(catArray);
    });

    getEvents().then((eventArr) => {
      setEvents(eventArr);
    });
  }, []);

  return (
    <>
      <select
        id="categoryFilter" 
        className="category-filter"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="all">Category </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.label}
          </option>
        ))}
      </select>
    </>
  );
};