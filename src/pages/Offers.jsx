// src/pages/offers.jsx
import { Tag, Calendar, ShoppingCart, Info, Gift } from "lucide-react";

// ✅ Export the offers array so Home.jsx can use it
export const offers = [
  {
    id: 1,
    category: "Oral Care",
    expires: true,
    discount: "16.67% OFF",
    title: "Dabur Bulk Purchase Offer",
    desc: "Buy 6 bundles of ₹10 Dabur paste → Get 1 free",
    minOrder: "₹600",
    maxSaving: "₹100",
    validTill: "2024-02-15",
    terms: [
      "Applicable on Dabur Red Paste only",
      "Minimum 6 units required",
      "Cannot be combined with other offers",
    ],
  },
  {
    id: 2,
    category: "Hair Care",
    expires: true,
    discount: "25% OFF",
    title: "Personal Care Combo",
    desc: "Buy any 3 shampoos + Get 1 conditioner free",
    minOrder: "₹850",
    maxSaving: "₹285",
    validTill: "2024-02-28",
    terms: [
      "Valid on premium brands only",
      "Free conditioner of equal or lesser value",
      "Limited stock available",
    ],
  },
  {
    id: 3,
    category: "Electronics",
    expires: true,
    discount: "12% OFF",
    title: "Electronics Store Special",
    desc: "Extra 12% discount on orders above ₹5,000",
    minOrder: "₹5,000",
    maxSaving: "₹2,000",
    validTill: "2024-01-31",
    terms: [
      "Applicable on your outlet category",
      "Cannot exceed credit limit",
      "Valid for limited time",
    ],
  },
  {
    id: 4,
    category: "All Categories",
    expires: true,
    discount: "₹500 OFF",
    title: "New Year Mega Sale",
    desc: "Flat ₹500 off on orders above ₹10,000",
    minOrder: "₹10,000",
    maxSaving: "₹500",
    validTill: "2024-01-25",
    terms: [
      "One time use per outlet",
      "Valid on all product categories",
      "Expires soon!",
    ],
  },
];

export default function Offers() {
  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-1">Offers & Schemes</h2>
      <p className="text-gray-500 mb-6">
        Special offers and schemes available for your outlet category
      </p>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-xl shadow-sm border p-6 flex flex-col justify-between 
                       transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            {/* Tags */}
            <div className="flex gap-2 mb-2">
              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                {offer.category}
              </span>
              {offer.expires && (
                <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 font-medium">
                  Expires Soon!
                </span>
              )}
              <span className="ml-auto px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                {offer.discount}
              </span>
            </div>

            {/* Title + Description */}
            <h3 className="text-lg font-semibold">{offer.title}</h3>
            <p className="text-gray-600 mb-4">{offer.desc}</p>

            {/* Details */}
            <div className="grid grid-cols-2 text-sm mb-4">
              <div>
                <p className="text-gray-500">Minimum Order</p>
                <p className="font-medium">{offer.minOrder}</p>
              </div>
              <div>
                <p className="text-gray-500">Max Saving</p>
                <p className="font-medium text-green-600">{offer.maxSaving}</p>
              </div>
            </div>

            {/* Validity */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <Calendar size={16} />
              <span>Valid until {offer.validTill}</span>
            </div>

            {/* Terms */}
            <ul className="list-disc list-inside text-gray-500 text-sm mb-4">
              {offer.terms.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex gap-3 mt-auto">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition">
                <ShoppingCart size={16} />
                Shop Now
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition">
                <Info size={16} />
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 p-6 bg-white rounded-xl border text-center">
        <Gift className="mx-auto text-gray-400 mb-2" size={32} />
        <h3 className="text-lg font-semibold">More offers coming soon!</h3>
        <p className="text-gray-500 text-sm">
          We're constantly adding new offers and schemes. Check back regularly
          for the latest deals.
        </p>
      </div>
    </div>
  );
}
