import Hero from "../components/Hero";
import CategoryList from "../components/CategoryList";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";
import Cart from "../components/Cart";
import Checkout from "./Checkout";
import OrderSuccess from "./OrderSuccess";
import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState(null);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [step, setStep] = useState("home"); // home | checkout | success

  // ✅ Load JSON
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  }, []);

  // ✅ Cart logic
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) setCartItems(JSON.parse(savedCart));
    setCartLoaded(true);
  }, []);

  useEffect(() => {
    if (cartLoaded) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, cartLoaded]);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      return [...prev, { ...product, quantity: 1 }];
    });

    setToast(`${product.name} ✅`);
    setTimeout(() => setToast(null), 2000);
  };

  const handleSubmitOrder = async (form) => {
    const order = {
      customer: form,
      items: cartItems,
      total: cartItems.reduce((a, i) => a + i.price * i.quantity, 0),
      createdAt: new Date().toISOString(),
    };

    const { db } = await import("../firebase");
    const { collection, addDoc } = await import("firebase/firestore");

    await addDoc(collection(db, "orders"), order);

    setCartItems([]);
    localStorage.removeItem("cartItems");
    setStep("success");
  };

  return (
    <div className="app">
      {step === "home" && (
        <>
          <Hero />
          <CategoryList
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />

          <div className="cart-icon" onClick={() => setShowCart(!showCart)}>
            🛒 <span>{cartItems.reduce((s, i) => s + i.quantity, 0)}</span>
          </div>

          <ProductGrid
            products={filteredProducts}
            onProductClick={setSelectedProduct}
            onAddToCart={addToCart}
          />

          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
          />

          {showCart && (
            <Cart
              items={cartItems}
              onClose={() => setShowCart(false)}
              onCheckout={() => setStep("checkout")}
            />
          )}

          {toast && <div className="toast">{toast}</div>}
        </>
      )}

      {step === "checkout" && (
        <Checkout
          cartItems={cartItems}
          onSubmitOrder={handleSubmitOrder}
          onBack={() => setStep("home")}
        />
      )}

      {step === "success" && (
        <OrderSuccess onContinue={() => setStep("home")} />
      )}
    </div>
  );
}
