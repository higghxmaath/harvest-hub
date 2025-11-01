import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "", category: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    setProducts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateDoc(doc(db, "products", editingId), form);
      setEditingId(null);
    } else {
      await addDoc(collection(db, "products"), { ...form, price: Number(form.price) });
    }

    setForm({ name: "", price: "", image: "", category: "" });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

      <form onSubmit={handleSubmit} className="grid gap-2 mb-5 bg-white p-4 rounded shadow">
        <input placeholder="Name" className="border p-2" 
               value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Price" type="number" className="border p-2"
               value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
        <input placeholder="Image URL" className="border p-2" 
               value={form.image} onChange={e => setForm({...form, image: e.target.value})} />
        <input placeholder="Category" className="border p-2"
               value={form.category} onChange={e => setForm({...form, category: e.target.value})} />

        <button className="bg-black text-white p-2 rounded">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="grid gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-4 shadow rounded flex justify-between items-center">
            <div>
              <strong>{p.name}</strong> — ₦{p.price}
              <br />
              <small>{p.category}</small>
            </div>

            <div className="space-x-2">
              <button className="bg-blue-500 text-white p-1 rounded"
                onClick={() => { setForm(p); setEditingId(p.id); }}>Edit</button>

              <button className="bg-red-500 text-white p-1 rounded"
                onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
