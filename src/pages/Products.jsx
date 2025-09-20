import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import appleImg from "../assets/apple.jpeg";
import breadImg from "../assets/bread.jpeg";
import milkImg from "../assets/milk.jpeg";

const sampleProducts = [
  { id: 1, name: "Apple (1kg)", price: 120, category: "Fruits", img: appleImg },
  { id: 2, name: "Milk (1L)", price: 50, category: "Dairy", img: milkImg },
  { id: 3, name: "Bread", price: 40, category: "Bakery", img: breadImg },
];

export default function Products() {
  const { addToCart } = useCart();
  const location = useLocation();

  // get search query (?q=...)
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("q")?.toLowerCase() || "";

  // filter products
  const filteredProducts = sampleProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow">
              <img src={product.img} alt={product.name} className="mb-2" />
              <h2 className="font-semibold">{product.name}</h2>
              <p>₹{product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found for "{searchQuery}"</p>
        )}
      </div>
    </div>
  );
}
