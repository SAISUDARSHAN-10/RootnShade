import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  Gift,
  CreditCard,
  RotateCcw,
  Clock,
} from "lucide-react";

const links = [
  { name: "Home", path: "/", icon: <Home size={20} /> },
  { name: "Orders", path: "/orders", icon: <Package size={20} /> },
  { name: "Offers", path: "/offers", icon: <Gift size={20} /> },
  { name: "Credit Details", path: "/credit-details", icon: <CreditCard size={20} /> },
  { name: "Payment History", path: "/history", icon: <Clock size={20} /> },
  { name: "Reorder", path: "/reorder", icon: <RotateCcw size={20} /> },
];

export default function Sidebar({ collapsed, mobileOpen }) {
  const { pathname } = useLocation();

  return (
    <aside
      className={`
        fixed md:static top-[64px] left-0 h-full md:h-[calc(100vh-64px)] md:top-[64px]
        bg-white border-r shadow-sm flex flex-col transition-all duration-300 z-40
        ${collapsed ? "w-16" : "w-64"} 
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      <nav className="flex-1 p-2 space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition font-inter text-sm ${
              pathname === link.path
                ? "bg-[#1F4E79] text-white font-semibold border border-[#163B5C]"
                : "text-gray-700 hover:bg-[#F4F6F8]"
            }`}
          >
            {link.icon}
            {!collapsed && <span>{link.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}