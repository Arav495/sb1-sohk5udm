import React, { useEffect, useState } from 'react';
import { User, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BillCard from './BillCard';
import { useAuth } from '../contexts/AuthContext';
import { fetchBills } from './fetchBills';

interface Bill {
  id: string;
  brand: string;
  amount: number;
  date: string;
  items: string[];
  warrantyUrl: string;
  exchangeUrl: string;
  storeLocation: string;
  paymentMethod: string;
  orderId: string;
  deliveryDate?: string;
  returnPolicy: string;
  sizes: string[];
  colors: string[];
}

interface BrandCategory {
  brand: string;
  color: string;
  icon: string;
  bills: Bill[];
}

export default function WalletScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [expandedBrands, setExpandedBrands] = useState<string[]>([]);
  const [brandCategories, setBrandCategories] = useState<BrandCategory[]>([]);

  useEffect(() => {
  const loadBills = async () => {
    const bills = await fetchBills();
    console.log('Fetched bills from Supabase:', bills); // 👈 Add this
    setAllBills(bills);
  };
  loadBills();
}, []);
      // Group by brand
      const grouped: { [brand: string]: BrandCategory } = {};

      bills.forEach((bill) => {
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
    }

    loadBills();
  }, []);

  const toggleBrand = (brandName: string) => {
    setExpandedBrands(prev =>
      prev.includes(brandName)
        ? prev.filter(name => name !== brandName)
        : [...prev, brandName]
    );
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const totalBills = brandCategories.reduce((total, brand) => total + brand.bills.length, 0);
  const totalSpent = brandCategories.reduce(
    (total, brand) => total + brand.bills.reduce((sum, bill) => sum + bill.amount, 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Birdy</h1>
              <p className="text-sm text-gray-500">Fashion Wallet</p>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <User size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 text-white mb-6">
          <h2 className="text-lg font-semibold">Welcome back, {user?.name?.split(' ')[0]}!</h2>
          <p className="text-blue-100 text-sm mt-1">
            You have {totalBills} clothing bills worth {formatCurrency(totalSpent)}
          </p>
        </div>

        {/* Brand Categories */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Fashion Brands</h3>

          {brandCategories.map((brandCategory) => {
            const isExpanded = expandedBrands.includes(brandCategory.brand);
            const brandTotal = brandCategory.bills.reduce((sum, bill) => sum + bill.amount, 0);

            return (
              <div key={brandCategory.brand} className="relative">
                {/* Brand Header Card */}
                <div
                  className={`bg-gradient-to-r ${brandCategory.color} rounded-2xl p-4 text-white cursor-pointer transition-all duration-300 hover:shadow-lg relative z-10`}
                  onClick={() => toggleBrand(brandCategory.brand)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{brandCategory.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold">{brandCategory.brand}</h3>
                        <p className="text-white/80 text-sm">{brandCategory.bills.length} purchases</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <div className="text-lg font-bold">{formatCurrency(brandTotal)}</div>
                        <div className="text-white/80 text-xs">Total spent</div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp size={20} className="text-white/80" />
                      ) : (
                        <ChevronDown size={20} className="text-white/80" />
                      )}
                    </div>
                  </div>

                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <div className="w-full h-full bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
                  </div>
                </div>

                {/* Stacked Bills */}
                {!isExpanded && brandCategory.bills.length > 0 && (
                  <div className="absolute inset-0 pointer-events-none">
                    {brandCategory.bills.slice(0, 3).map((_, billIndex) => (
                      <div
                        key={billIndex}
                        className={`absolute inset-0 bg-gradient-to-r ${brandCategory.color} rounded-2xl opacity-60`}
                        style={{
                          transform: `translateY(${(billIndex + 1) * 4}px) scale(${1 - (billIndex + 1) * 0.02})`,
                          zIndex: -(billIndex + 1),
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Expanded Bills */}
                {isExpanded && (
                  <div className="mt-4 space-y-4 animate-in slide-in-from-top duration-300">
                    {brandCategory.bills.map((bill, billIndex) => (
                      <div
                        key={bill.id}
                        className="transform transition-all duration-300 hover:scale-[1.02]"
                        style={{ animationDelay: `${billIndex * 100}ms` }}
                      >
                        <BillCard bill={bill} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {brandCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-2xl">📱</div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bills found</h3>
            <p className="text-gray-500 text-sm">Your clothing purchases will appear here automatically</p>
          </div>
        )}
      </div>
    </div>
  );
}

function getBrandColor(brand: string): string {
  switch (brand.toLowerCase()) {
    case 'zara': return 'from-gray-800 to-black';
    case 'h&m': return 'from-red-600 to-red-800';
    case 'uniqlo': return 'from-red-500 to-red-600';
    case 'myntra': return 'from-pink-500 to-pink-700';
    case 'ajio': return 'from-orange-500 to-orange-700';
    default: return 'from-blue-500 to-purple-600';
  }
}

function getBrandIcon(brand: string): string {
  switch (brand.toLowerCase()) {
    case 'zara': return '🏷️';
    case 'h&m': return '👔';
    case 'uniqlo': return '🧥';
    case 'myntra': return '👗';
    case 'ajio': return '👕';
    default: return '🧾';
  }
}
