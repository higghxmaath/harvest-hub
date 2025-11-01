import React from 'react'

function ProductCard({ product, onClick, onAddToCart}) {
  return (
    <div className="product-card" 
    onClick={() => onClick(product)}>
      <img src={product.image} alt={product.name} className='card-image'/>
      <div className='product-card-body'>
      <h3>{product.name}</h3>
      <p>₦{product.price}</p>
      </div>
    
   <button 
          className="add-btn"
          onClick={(e) => {
            e.stopPropagation();   // Prevent opening modal
            onAddToCart(product);  // Add to cart only
          }}
        >
          Add to Cart
        </button>
      
      {/* <p>{product.description}</p> */}
     </div>
  );
}

export default ProductCard
