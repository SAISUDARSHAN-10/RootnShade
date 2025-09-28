// src/pages/Cart.jsx
import { Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, updateQuantity, removeItem } = useCart();

  // --- Totals ---
  const subtotal = cart.reduce((sum, item) => {
    const singleTotal = (item.qtyKg || 0) * (item.pricePerKg || item.price);
    const caseTotal = (item.qtyCase || 0) * (item.pricePerCase || item.price);
    return sum + singleTotal + caseTotal;
  }, 0);
  const discount = 0; // extend later with product-level discounts
  const total = subtotal - discount;

  const getUnits = (name) => {
    if (name.toLowerCase() === "bread") return { single: "Pkt", case: "Case (25Pkt)" };
    if (name.toLowerCase() === "milk") return { single: "Liter", case: "Case (25L)" };
    return { single: "Kg", case: "Case (25Kg)" };
  };

  return (
    <div className="p-6">
      {/* Header with badge */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <ShoppingCart size={32} className="text-[#1F4E79]" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              {cart.length}
            </span>
          )}
        </div>
        <h2 className="text-2xl font-bold">
          Shopping Cart{" "}
          {cart.length > 0 && (
            <span className="text-sm font-semibold text-gray-500">
              ({cart.length} {cart.length === 1 ? "item" : "items"})
            </span>
          )}
        </h2>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const units = getUnits(item.name);
              const singleTotal = (item.qtyKg || 0) * (item.pricePerKg || item.price);
              const caseTotal = (item.qtyCase || 0) * (item.pricePerCase || item.price);

              return (
                <div
                  key={item.id}
                  className="bg-white border rounded-xl shadow-sm hover:shadow-md transition flex items-center gap-4 p-4"
                >
                  {/* Product Image */}
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>

                    {/* Show quantities and unit types */}
                    {item.qtyKg > 0 && (
                      <p className="text-gray-800">
                        {item.qtyKg} {units.single} × ₹{item.pricePerKg || item.price} = ₹{singleTotal}
                      </p>
                    )}
                    {item.qtyCase > 0 && (
                      <p className="text-gray-800">
                        {item.qtyCase} {units.case} × ₹{item.pricePerCase || item.price} = ₹{caseTotal}
                      </p>
                    )}

                    <p className="text-gray-900 font-semibold mt-1">
                      Total: ₹{singleTotal + caseTotal}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Summary */}
          <div className="space-y-4">
            <div className="bg-white border rounded-xl shadow-sm p-4">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600 mb-2">
                <span>Discount</span>
                <span>-₹{discount.toFixed(1)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-3 mb-4">
                <span>Total</span>
                <span>₹{total.toFixed(1)}</span>
              </div>
              <button className="w-full bg-[#1F4E79] text-white py-2 rounded-lg font-medium hover:bg-[#163B5C] transition">
                Place Order
              </button>
              <button className="w-full mt-3 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
                Continue Shopping
              </button>
            </div>

            {/* Credit Info */}
            <div className="bg-white border rounded-xl shadow-sm p-4">
              <h3 className="font-semibold mb-4">Available Credit</h3>
              <div className="flex justify-between text-sm mb-2">
                <span>Credit Limit</span>
                <span>₹1,00,000</span>
              </div>
              <div className="flex justify-between text-sm text-orange-600 mb-2">
                <span>Outstanding</span>
                <span>₹25,000</span>
              </div>
              <div className="flex justify-between text-sm text-green-600 font-semibold">
                <span>Available</span>
                <span>₹75,000</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
