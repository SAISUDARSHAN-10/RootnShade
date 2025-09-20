import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Package,
  ShoppingCart,
  Gift,
  CreditCard,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/products?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between bg-[#F4F6F8] px-6 py-6 rounded-lg">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back,</h1>
          <p className="text-gray-600 text-sm mt-1">
            Here’s what’s happening with your business today
          </p>
        </div>
        <Link
          to="/credit-details?paynow=true"
          className="bg-[#1F4E79] text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm hover:bg-[#16395d] transition"
        >
          <CreditCard size={16} />
          Pay Credit Balance
        </Link>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="bg-white border rounded-lg shadow-sm p-4 flex items-center gap-2"
      >
        <Search className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none text-sm text-gray-700"
        />
      </form>

      {/* Quick Links */}
      <section>
        <h2 className="font-semibold text-lg mb-3">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/orders">
            <div className="relative bg-white border rounded-lg shadow-sm p-4 h-32 flex flex-col justify-between hover:shadow-md transition">
              <ArrowRight
                size={18}
                className="absolute top-3 right-3 text-gray-400"
              />
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <Package size={20} />
                Orders
              </div>
              <p className="text-xl font-bold">12</p>
            </div>
          </Link>

          <Link to="/cart">
            <div className="relative bg-white border rounded-lg shadow-sm p-4 h-32 flex flex-col justify-between hover:shadow-md transition">
              <ArrowRight
                size={18}
                className="absolute top-3 right-3 text-gray-400"
              />
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <ShoppingCart size={20} />
                Cart
              </div>
              <p className="text-xl font-bold">5</p>
            </div>
          </Link>

          <Link to="/offers">
            <div className="relative bg-white border rounded-lg shadow-sm p-4 h-32 flex flex-col justify-between hover:shadow-md transition">
              <ArrowRight
                size={18}
                className="absolute top-3 right-3 text-gray-400"
              />
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <Gift size={20} />
                Offers
              </div>
            </div>
          </Link>

          <Link to="/credit-details">
            <div className="relative bg-white border rounded-lg shadow-sm p-4 h-32 flex flex-col justify-between hover:shadow-md transition">
              <ArrowRight
                size={18}
                className="absolute top-3 right-3 text-gray-400"
              />
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <CreditCard size={20} />
                Credit Details
              </div>
              <p className="text-xl font-bold">2</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Sales Overview */}
      <section>
        <h2 className="font-semibold text-lg mb-3">Sales Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border rounded-lg shadow-sm p-4 h-28 flex flex-col justify-between hover:shadow-md transition">
            <p className="font-medium">Today</p>
            <p className="text-xl font-bold">₹15,340</p>
            <span className="text-sm text-gray-500">vs previous period</span>
          </div>

          <div className="bg-white border rounded-lg shadow-sm p-4 h-28 flex flex-col justify-between hover:shadow-md transition">
            <p className="font-medium">This Week</p>
            <p className="text-xl font-bold">₹89,520</p>
            <span className="text-sm text-gray-500">vs previous period</span>
          </div>

          <div className="bg-white border rounded-lg shadow-sm p-4 h-28 flex flex-col justify-between hover:shadow-md transition">
            <p className="font-medium">This Month</p>
            <p className="text-xl font-bold">₹3,45,680</p>
            <span className="text-sm text-gray-500">vs previous period</span>
          </div>
        </div>
      </section>

      {/* Credit Balance */}
      <section>
        <div className="bg-white border rounded-lg shadow-sm p-4 flex items-center justify-between hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <CreditCard size={20} className="text-gray-700" />
            <div>
              <p className="font-medium">Credit Balance</p>
              <p className="text-xl font-bold text-red-600">₹25,000</p>
              <span className="text-sm text-gray-500">
                Outstanding balance • Credit limit: ₹1,00,000
              </span>
            </div>
          </div>
          <Link
            to="/credit-details?paynow=true"
            className="border border-[#1F4E79] text-[#1F4E79] px-5 py-2 rounded-lg flex items-center gap-2 shadow-sm hover:bg-[#2E7D32] hover:text-white hover:border-[#2E7D32] transition"
          >
            <CreditCard size={16} />
            Pay Now
          </Link>
        </div>
      </section>
    </div>
  );
}
