import { useState } from "react";
import { CheckSquare, Square, Clock } from "lucide-react";

export default function Reorder() {
  const [selected, setSelected] = useState([]);

  const items = [
    {
      id: 1,
      name: "Dabur Red Paste 200g",
      category: "Oral Care",
      tag: "Low Stock",
      tagColor: "bg-orange-100 text-orange-700",
      lastOrdered: "2024-01-15",
      frequency: "Weekly",
      stock: 3,
      suggested: 12,
      price: 85,
    },
    {
      id: 2,
      name: "Colgate Total 150g",
      category: "Oral Care",
      tag: "Regular",
      tagColor: "bg-blue-100 text-blue-700",
      lastOrdered: "2024-01-12",
      frequency: "Bi-weekly",
      stock: 1,
      suggested: 8,
      price: 120,
    },
    {
      id: 3,
      name: "Head & Shoulders 340ml",
      category: "Hair Care",
      tag: "Out of Stock",
      tagColor: "bg-red-100 text-red-700",
      lastOrdered: "2024-01-18",
      frequency: "Monthly",
      stock: 0,
      suggested: 6,
      price: 285,
    },
    {
      id: 4,
      name: "Lux Soap 100g",
      category: "Personal Care",
      tag: "Regular",
      tagColor: "bg-blue-100 text-blue-700",
      lastOrdered: "2024-01-10",
      frequency: "Weekly",
      stock: 8,
      suggested: 24,
      price: 35,
    },
  ];

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const totalItems = items.length;
  const lowStock = items.filter((i) => i.stock <= 3).length;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Smart Reorder</h2>
      <p className="text-gray-500 mb-6">
        AI-suggested reorders based on your purchase patterns
      </p>

      {/* Top summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border p-4 flex justify-between items-center">
          <p className="text-gray-500 text-sm">Suggested Items</p>
          <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-semibold">
            {totalItems}
          </span>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4 flex justify-between items-center">
          <p className="text-gray-500 text-sm">Low Stock Items</p>
          <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-semibold">
            {lowStock}
          </span>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4 flex justify-between items-center">
          <p className="text-gray-500 text-sm">Selected Items</p>
          <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-semibold">
            {selected.length}
          </span>
        </div>
      </div>

      {/* Frequently Ordered Items */}
      <div className="bg-white border rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold">Frequently Ordered Items</h3>
          <button className="px-4 py-2 bg-blue-900 text-white text-sm rounded-lg hover:bg-blue-800">
            Add to Cart ({selected.length})
          </button>
        </div>

        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between p-4 border-b last:border-0 bg-white 
                       transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          >
            {/* Left - checkbox + info */}
            <div className="flex items-start gap-3">
              <button onClick={() => toggleSelect(item.id)}>
                {selected.includes(item.id) ? (
                  <CheckSquare className="text-blue-600" />
                ) : (
                  <Square className="text-gray-400" />
                )}
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{item.name}</p>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.tagColor}`}
                  >
                    {item.tag}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">{item.category}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    Last: {item.lastOrdered}
                  </div>
                  <span>{item.frequency}</span>
                  <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                    Stock: {item.stock}
                  </span>
                </div>
              </div>
            </div>

            {/* Right - suggested qty & price */}
            <div className="text-right">
              <p className="text-sm text-gray-500">
                Suggested:{" "}
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                  {item.suggested}
                </span>
              </p>
              <p className="font-semibold text-blue-600">
                ₹{item.suggested * item.price}
              </p>
              <p className="text-xs text-gray-500">@₹{item.price}/unit</p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="bg-white border rounded-lg shadow-sm p-4">
        <h3 className="font-bold text-lg mb-3">AI Insights</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Your Dabur Red Paste orders show a weekly pattern. Consider ordering
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full ml-1">24</span> units to last 2 weeks.
          </li>
          <li>
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
            Head & Shoulders is out of stock. Based on past sales, you typically
            need <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full ml-1">6</span> units monthly.
          </li>
          <li>
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
            Personal care items show increased demand. Consider stocking
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full ml-1">20%</span> more for the upcoming season.
          </li>
        </ul>
      </div>
    </div>
  );
}
