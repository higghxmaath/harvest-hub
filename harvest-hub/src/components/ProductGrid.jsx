import React from 'react'
import ProductCard from "./ProductCard"

function ProductGrid({ products, onProductClick, onAddToCart }) {
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onClick={onProductClick} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default ProductGrid;
