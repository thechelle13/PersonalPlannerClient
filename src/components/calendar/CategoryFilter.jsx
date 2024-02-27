import { useEffect, useState } from "react";
import { getCategories } from "../../managers/CategoryManager";
import { getEvents } from "../../managers/EventManager";

export const CategoryFilter = ({ selectedCategory, setSelectedCategory,setFilteredEvents }) => {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getCategories().then((catArray) => {
      setCategories(catArray);
    });

    getEvents().then((eventArr) => {
      setEvents(eventArr);
      setFilteredEvents(eventArr);
    });
  }, []);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    
    // Filter events based on the selected category
    const filteredEvents = events.filter((event) => event.category === category || category === 'all');
    setFilteredEvents(filteredEvents);
  };

  return (
    <>
      <select
        id="categoryFilter" 
        className="category-filter"
        onChange={(e) => handleCategoryChange(e.target.value)}
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