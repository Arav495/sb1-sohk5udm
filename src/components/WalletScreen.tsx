import React, { useEffect, useState } from 'react';
import { User, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import fetchBills from './fetchBills';
import BillCard from './BillCard'; // ✅ Importing the fixed BillCard

type Bill = {
  id?: string;
  brand: string;
  amount: number;
  date: string;
  store_location: string;
  order_id: string;
  payment_method: string;
  delivery_date?: string;
  created_at?: string;
  items: any;
};

type BrandCategory = {
  brand: string;
  color: string;
  icon: string;
  bills: Bill[];
};

function getBrandColor(brand: string): string {
  const mapping: Record<string, string> = {
    Zara: 'from-gray-800 to-black',
    'H&M': 'from-red-600 to-red-800',
    Uniqlo: 'from-red-500 to-red-600',
    Myntra: 'from-pink-500 to-pink-700',
    Ajio: 'from-orange-500 to-orange-700',
  };
  return mapping[brand] || 'from-gray-500 to-gray-700';
}

function getBrandIcon(brand: string): string {
  const mapping: Record<string, string> = {
    Zara: '🏷️',
    'H&M': '👔',
    Uniqlo: '🧥',
    Myntra: '👗',
    Ajio: '👕',
  };
  return mapping[brand] || '🛍️';
}

export default function WalletScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [expandedBrands, setExpandedBrands] = useState<string[]>([]);
  const [brandCategories, setBrandCategories] = useState<BrandCategory[]>([]);

  useEffect(() => {
    const loadBills = async () => {
      console.log('🚀 WalletScreen: Starting to load bills...');
      const bills = await fetchBills();
      console.log('🎯 WalletScreen: Fetched bills:', bills);
      console.log('🎯 WalletScreen: Bills count:', bills.length);

      const grouped: Record<string, BrandCategory> = {};
      bills.forEach((bill: Bill) => {
        const brand = bill.brand;
        const billWithId = {
          ...bill,
          id: bill.id || `${bill.order_id}-${bill.date}`,
        };

        if (!grouped[brand]) {
          grouped[brand] = {
            brand,
            color: getBrandColor(brand),
            icon: getBrandIcon(brand),
            bills: [],
          };
        }
        grouped[brand].bills.push(billWithId);
      });

      setBrandCategories(Object.values(grouped));
    };

    loadBills();
  }, []);

  const totalBills = brandCategories.reduce(
    (sum, cat) => sum + cat.bills.length,
    0
  );
  const totalSpent = brandCategories.reduce(
    (sum, cat) => sum + cat.bills.reduce((s, b) => s + b.amount, 0),
    0
  );
  const formatCurrency = (amt: number) =>
    `₹${amt.toLocaleString('en-IN')}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Birdy</h1>
            <p className="text-sm text-gray-500">Fashion Wallet</p>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <User size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 text-white mb-6">
          <h2 className="text-lg font-semibold">
            Welcome back, {user?.name?.split(' ')[0] || 'Guest'}!
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            You have {totalBills} clothing bills worth {formatCurrency(totalSpent)}
          </p>
        </div>

        {/* Brands */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Your Fashion Brands
          </h3>

          {brandCategories.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                📱
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No bills found
              </h3>
              <p className="text-gray-500 text-sm">
                Your clothing purchases will appear here automatically
              </p>
            </div>
          ) : (
            brandCategories.map((cat) => {
              const isExpanded = expandedBrands.includes(cat.brand);
              const brandTotal = cat.bills.reduce((s, b) => s + b.amount, 0);

              return (
                <div key={cat.brand} className="relative">
                  <div
                    className={`bg-gradient-to-r ${cat.color} rounded-2xl p-4 text-white cursor-pointer`}
                    onClick={() =>
                      setExpandedBrands((prev) =>
                        prev.includes(cat.brand)
                          ? prev.filter((b) => b !== cat.brand)
                          : [...prev, cat.brand]
                      )
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{cat.icon}</div>
                        <div>
                          <h3 className="text-xl font-bold">{cat.brand}</h3>
                          <p className="text-sm">{cat.bills.length} purchase(s)</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <div className="text-lg font-bold">
                            {formatCurrency(brandTotal)}
                          </div>
                          <div className="text-xs text-white/80">Total spent</div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp size={20} className="text-white/80" />
                        ) : (
                          <ChevronDown size={20} className="text-white/80" />
                        )}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 space-y-4">
                      {cat.bills.map((bill) => (
                        <BillCard key={bill.id} bill={bill} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
