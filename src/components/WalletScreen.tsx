import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import fetchBills from "./fetchBills";
import BillCard from "./BillCard";

type Bill = {
  id: string;
  brand: string;
  amount: number;
  date: string;
  store_location: string;
  items: string;
};

type BrandCategory = {
  brand: string;
  color: string;
  icon: string;
  bills: Bill[];
};

function getBrandColor(brand: string): string {
  const colors: { [key: string]: string } = {
    Zara: "#FF6B6B",
    H&M: "#4ECDC4",
    Nike: "#FFD93D",
    Adidas: "#1A535C",
  };
  return colors[brand] || "#888";
}

function getBrandIcon(brand: string): string {
  const icons: { [key: string]: string } = {
    Zara: "🛍️",
    H&M: "👕",
    Nike: "👟",
    Adidas: "🎽",
  };
  return icons[brand] || "🛒";
}

export default function WalletScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [expandedBrands, setExpandedBrands] = useState<string[]>([]);
  const [brandCategories, setBrandCategories] = useState<BrandCategory[]>([]);

  useEffect(() => {
    const loadBills = async () => {
      const bills = await fetchBills();
      console.log("fetched bills from Supabase:", bills);

      // Group by brand
      const grouped: { [brand: string]: BrandCategory } = {};

      bills.forEach((bill: Bill) => {
        const brand = bill.brand;
        if (!grouped[brand]) {
          grouped[brand] = {
            brand,
            color: getBrandColor(brand),
            icon: getBrandIcon(brand),
            bills: [],
          };
        }
        grouped[brand].bills.push(bill);
      });

      setBrandCategories(Object.values(grouped));
    };

    loadBills();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Welcome back, {user?.name || "User"}!</h2>
      <div className="space-y-4">
        {brandCategories.length === 0 ? (
          <div className="text-center text-gray-500">No bills found</div>
        ) : (
          brandCategories.map((category) => (
            <BillCard
              key={category.brand}
              brand={category.brand}
              color={category.color}
              icon={category.icon}
              bills={category.bills}
              expanded={expandedBrands.includes(category.brand)}
              toggleExpand={() =>
                setExpandedBrands((prev) =>
                  prev.includes(category.brand)
                    ? prev.filter((b) => b !== category.brand)
                    : [...prev, category.brand]
                )
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
