import { useState } from "react";
import { Eye, X } from "lucide-react";

export default function Orders() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Orders data
  const orders = {
    Pending: [
      {
        id: "ORD-2025-001",
        date: "2025-09-23",
        items: [
          { name: "Apple (1kg)", quantity: 2, price: 120 },
          { name: "Banana (1kg)", quantity: 1, price: 80 },
        ],
        status: "Pending",
        paymentStatus: "Credit",
        paymentMethod: "UPI",
      },
      {
        id: "ORD-2025-002",
        date: "2025-09-21",
        items: [{ name: "Milk (1L)", quantity: 3, price: 50 }],
        status: "Pending",
        paymentStatus: "Non-credit",
        paymentMethod: "COD",
      },
    ],
    Delivered: [
      {
        id: "ORD-2025-003",
        date: "2025-09-22",
        items: [{ name: "Bread", quantity: 1, price: 50 }],
        status: "Delivered",
        paymentStatus: "Credit",
        paymentMethod: "Card",
      },
      {
        id: "ORD-2025-004",
        date: "2025-09-19",
        items: [{ name: "Eggs", quantity: 12, price: 20 }],
        status: "Delivered",
        paymentStatus: "Non-credit",
        paymentMethod: "COD",
      },
    ],
    Cancelled: [
      {
        id: "ORD-2025-005",
        date: "2025-09-18",
        items: [{ name: "Cheese", quantity: 1, price: 90 }],
        status: "Cancelled",
        paymentStatus: "Non-credit",
        paymentMethod: "COD",
      },
    ],
    Rejected: [
      {
        id: "ORD-2025-006",
        date: "2025-09-15",
        items: [{ name: "Butter", quantity: 2, price: 55 }],
        status: "Rejected",
        paymentStatus: "Credit",
        paymentMethod: "UPI",
      },
    ],
  };

  // Combine all orders for "All" tab
  const allOrders = [
    ...orders.Pending,
    ...orders.Delivered,
    ...orders.Cancelled,
    ...orders.Rejected,
  ];

  const tabs = [
    { key: "All", label: "All", count: allOrders.length },
    { key: "Pending", label: "Pending", count: orders.Pending.length },
    { key: "Delivered", label: "Delivered", count: orders.Delivered.length },
    { key: "Cancelled", label: "Cancelled", count: orders.Cancelled.length },
    { key: "Rejected", label: "Rejected", count: orders.Rejected.length },
  ];

  const getOrdersForTab = (tab) => (tab === "All" ? allOrders : orders[tab]);

  // Helper: get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
      case "Processing":
        return "bg-orange-500";
      case "Delivered":
        return "bg-green-600";
      case "Cancelled":
        return "bg-gray-400";
      case "Rejected":
        return "bg-red-600";
      default:
        return "bg-gray-300";
    }
  };

  // Calculate grand total
  const getGrandTotal = (items) =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Orders</h2>
      <p className="text-gray-500 mb-4">Track and manage all your orders</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
              activeTab === key
                ? "bg-gray-100 border-gray-300 shadow-sm text-gray-700"
                : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span>{label}</span>
            <span
              className={`text-white text-xs px-2 py-0.5 rounded-full ${
                key === "All"
                  ? "bg-blue-600"
                  : key === "Pending"
                  ? "bg-orange-500"
                  : key === "Delivered"
                  ? "bg-green-600"
                  : key === "Cancelled"
                  ? "bg-gray-400"
                  : key === "Rejected"
                  ? "bg-red-600"
                  : "bg-gray-300"
              }`}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {getOrdersForTab(activeTab).map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-gray-800">{order.id}</h3>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Delivery Date:</strong> {order.date}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Items:</strong> {order.items.length}
              </p>
              <p
                className={`text-sm mt-1 font-medium ${getStatusColor(
                  order.status
                ).replace("bg-", "text-")}`}
              >
                <strong>Grand Total:</strong> ₹{getGrandTotal(order.items)}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-2 py-1 rounded-full text-white ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
              <button
                onClick={() => setSelectedOrder(order)}
                className="flex items-center gap-1 px-3 py-1.5 border rounded-lg text-gray-700 hover:bg-gray-100 text-sm"
              >
                <Eye className="w-4 h-4" /> View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <p className="text-gray-800 mb-2">
              <strong>Order Number:</strong> {selectedOrder.id}
            </p>
            <p className="text-gray-800 mb-2">
              <strong>Status:</strong>{" "}
              <span
                className={`text-white px-2 py-1 rounded-full ${getStatusColor(
                  selectedOrder.status
                )}`}
              >
                {selectedOrder.status}
              </span>
            </p>
            <p className="text-gray-800 mb-2">
              <strong>Delivery Date:</strong> {selectedOrder.date}
            </p>

            <div className="mt-3">
              <strong className="text-gray-800">Items:</strong>
              <ul className="list-disc list-inside text-gray-700 mt-1">
                {selectedOrder.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - {item.quantity} pcs × ₹{item.price} = ₹
                    {item.quantity * item.price}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-800 mt-3 font-semibold">
              Grand Total: ₹{getGrandTotal(selectedOrder.items)}
            </p>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
