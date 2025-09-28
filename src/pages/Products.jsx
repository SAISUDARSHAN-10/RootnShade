import { useState } from "react";
import { useCart } from "../context/CartContext";
import appleImg from "../assets/apple.jpeg";
import breadImg from "../assets/bread.jpeg";
import milkImg from "../assets/milk.jpeg";

const sampleProducts = [
  { id: 1, name: "Apple", pricePerKg: 120, pricePerCase: 120 * 25, img: appleImg },
  { id: 2, name: "Milk", pricePerKg: 50, pricePerCase: 50 * 25, img: milkImg },
  { id: 3, name: "Bread", pricePerKg: 40, pricePerCase: 40 * 25, img: breadImg },
];

export default function Products() {
  const { cart, addOrUpdateItem, removeItem } = useCart();

  const [showSingleInput, setShowSingleInput] = useState({});
  const [showCaseInput, setShowCaseInput] = useState({});
  const [quantities, setQuantities] = useState({});

  const getUnits = (name) => {
    if (name.toLowerCase() === "bread") return { single: "Pkt", case: "Case (25Pkt)" };
    if (name.toLowerCase() === "milk") return { single: "Liter", case: "Case (25L)" };
    return { single: "Kg", case: "Case (25Kg)" };
  };

  const handleAddClick = (productId, type) => {
    if (type === "single") {
      setShowSingleInput((p) => ({ ...p, [productId]: true }));
    } else {
      setShowCaseInput((p) => ({ ...p, [productId]: true }));
    }
  };

  const handleQtyChange = (product, type, value) => {
    const qty = parseInt(value) || 0;
    setQuantities((p) => ({
      ...p,
      [product.id]: { ...p[product.id], [type]: qty },
    }));

    if (qty > 0) {
      addOrUpdateItem(product, type, qty);
    } else {
      // If cleared, remove from cart and revert to "Add"
      const current = cart.find((item) => item.id === product.id);
      if (!current?.qtyKg && !current?.qtyCase) {
        removeItem(product.id);
      }
      if (type === "single") {
        setShowSingleInput((p) => ({ ...p, [product.id]: false }));
      } else {
        setShowCaseInput((p) => ({ ...p, [product.id]: false }));
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sampleProducts.map((product) => {
          const units = getUnits(product.name);
          const qty = quantities[product.id] || {};
          const inCart = cart.find((item) => item.id === product.id);

          return (
            <div
              key={product.id}
              className="border rounded-xl shadow-sm bg-white hover:shadow-md transition flex flex-col"
            >
              <div className="w-full h-40 flex items-center justify-center bg-gray-50 rounded-t-xl">
                <img
                  src={product.img}
                  alt={product.name}
                  className="h-full object-cover rounded-t-xl"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h2 className="font-semibold text-gray-800 text-base">{product.name}</h2>

                {/* 🧪 Single Unit */}
                <div className="mt-3 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    {units.single}:
                  </label>
                  {showSingleInput[product.id] ? (
                    <input
                      type="number"
                      min="0"
                      value={qty.single || ""}
                      onChange={(e) =>
                        handleQtyChange(product, "single", e.target.value)
                      }
                      className="w-20 border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="0"
                    />
                  ) : (
                    <button
                      onClick={() => handleAddClick(product.id, "single")}
                      className="w-20 bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-1 rounded-lg"
                    >
                      Add
                    </button>
                  )}
                </div>

                {/* 🧪 Case Unit */}
                <div className="mt-3 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    {units.case}:
                  </label>
                  {showCaseInput[product.id] ? (
                    <input
                      type="number"
                      min="0"
                      value={qty.case || ""}
                      onChange={(e) =>
                        handleQtyChange(product, "case", e.target.value)
                      }
                      className="w-20 border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="0"
                    />
                  ) : (
                    <button
                      onClick={() => handleAddClick(product.id, "case")}
                      className="w-20 bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-1 rounded-lg"
                    >
                      Add
                    </button>
                  )}
                </div>

                {/* ✅ Quantity Summary in Cart */}
                {inCart && (
                  <div className="mt-4 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                    <p>
                      {inCart.qtyKg > 0 && (
                        <span>
                          {inCart.qtyKg} {units.single}
                        </span>
                      )}
                      {inCart.qtyCase > 0 && (
                        <span className="block">
                          {inCart.qtyCase} {units.case}
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
