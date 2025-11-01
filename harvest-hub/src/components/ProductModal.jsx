function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="price">₦{product.price}</p>
        
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        <button style={{ background: "#ccc", marginLeft: "10px" }} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ProductModal;
