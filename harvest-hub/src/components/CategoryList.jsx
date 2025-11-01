import React from 'react'

 function CategoryList({selectedCategory, onCategorySelect }) {
  const categories = ["All", "Produce", "Pantry", "Staple", "Dairy"];
  return (
    <div className="categories" aria-label="Product categories">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`category-btn ${
            selectedCategory === cat ? "active" : ""
          }`}
          onClick={() => onCategorySelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryList
