import React, { useState } from 'react';
import { User, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BillCard from './BillCard';
import { useAuth } from '../contexts/AuthContext';

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

const mockBrandCategories: BrandCategory[] = [
  {
    brand: 'Zara',
    color: 'from-gray-800 to-black',
    icon: '🏷️',
    bills: [
      {
        id: '1',
        brand: 'Zara',
        amount: 7499,
        date: '2024-01-15',
        items: ['Wool Blend Coat', 'Skinny Jeans'],
        warrantyUrl: 'https://zara.com/warranty',
        exchangeUrl: 'https://zara.com/exchange',
        storeLocation: 'Phoenix Marketcity, Mumbai',
        paymentMethod: 'UPI - GPay',
        orderId: 'ZRA240115001',
        deliveryDate: '2024-01-18',
        returnPolicy: '30 days return with receipt',
        sizes: ['M', '32'],
        colors: ['Navy Blue', 'Black']
      },
      {
        id: '2',
        brand: 'Zara',
        amount: 10450,
        date: '2024-01-10',
        items: ['Blazer', 'Dress Shirt', 'Trousers'],
        warrantyUrl: 'https://zara.com/warranty',
        exchangeUrl: 'https://zara.com/exchange',
        storeLocation: 'Select City Walk, Delhi',
        paymentMethod: 'Credit Card',
        orderId: 'ZRA240110002',
        deliveryDate: '2024-01-13',
        returnPolicy: '30 days return with receipt',
        sizes: ['L', 'L', '34'],
        colors: ['Charcoal', 'White', 'Navy']
      },
      {
        id: '3',
        brand: 'Zara',
        amount: 5580,
        date: '2024-01-05',
        items: ['Sweater', 'Scarf'],
        warrantyUrl: 'https://zara.com/warranty',
        exchangeUrl: 'https://zara.com/exchange',
        storeLocation: 'Forum Mall, Bangalore',
        paymentMethod: 'Debit Card',
        orderId: 'ZRA240105003',
        returnPolicy: '30 days return with receipt',
        sizes: ['M', 'One Size'],
        colors: ['Beige', 'Brown']
      }
    ]
  },
  {
    brand: 'H&M',
    color: 'from-red-600 to-red-800',
    icon: '👔',
    bills: [
      {
        id: '4',
        brand: 'H&M',
        amount: 3790,
        date: '2024-01-12',
        items: ['Cotton T-Shirt', 'Denim Jacket'],
        warrantyUrl: 'https://hm.com/warranty',
        exchangeUrl: 'https://hm.com/exchange',
        storeLocation: 'Express Avenue, Chennai',
        paymentMethod: 'UPI - PhonePe',
        orderId: 'HM240112001',
        deliveryDate: '2024-01-15',
        returnPolicy: '60 days return with receipt',
        sizes: ['L', 'L'],
        colors: ['White', 'Blue Denim']
      },
      {
        id: '5',
        brand: 'H&M',
        amount: 2749,
        date: '2024-01-08',
        items: ['Basic Tee', 'Joggers'],
        warrantyUrl: 'https://hm.com/warranty',
        exchangeUrl: 'https://hm.com/exchange',
        storeLocation: 'Palladium Mall, Mumbai',
        paymentMethod: 'Cash',
        orderId: 'HM240108002',
        returnPolicy: '60 days return with receipt',
        sizes: ['M', 'L'],
        colors: ['Black', 'Grey']
      }
    ]
  },
  {
    brand: 'Uniqlo',
    color: 'from-red-500 to-red-600',
    icon: '🧥',
    bills: [
      {
        id: '6',
        brand: 'Uniqlo',
        amount: 10750,
        date: '2024-01-08',
        items: ['Cashmere Scarf', 'Merino Sweater'],
        warrantyUrl: 'https://uniqlo.com/warranty',
        exchangeUrl: 'https://uniqlo.com/exchange',
        storeLocation: 'Ambience Mall, Gurgaon',
        paymentMethod: 'UPI - Paytm',
        orderId: 'UNI240108001',
        deliveryDate: '2024-01-11',
        returnPolicy: '90 days return with receipt',
        sizes: ['One Size', 'L'],
        colors: ['Camel', 'Navy']
      },
      {
        id: '7',
        brand: 'Uniqlo',
        amount: 7492,
        date: '2024-01-03',
        items: ['Heattech Shirt', 'Ultra Light Down Jacket'],
        warrantyUrl: 'https://uniqlo.com/warranty',
        exchangeUrl: 'https://uniqlo.com/exchange',
        storeLocation: 'VR Mall, Bangalore',
        paymentMethod: 'Credit Card',
        orderId: 'UNI240103002',
        returnPolicy: '90 days return with receipt',
        sizes: ['M', 'L'],
        colors: ['White', 'Black']
      }
    ]
  },
  {
    brand: 'Myntra',
    color: 'from-pink-500 to-pink-700',
    icon: '👗',
    bills: [
      {
        id: '8',
        brand: 'Myntra',
        amount: 4999,
        date: '2024-01-05',
        items: ['Kurta Set', 'Cotton Palazzo'],
        warrantyUrl: 'https://myntra.com/warranty',
        exchangeUrl: 'https://myntra.com/exchange',
        storeLocation: 'Online Purchase',
        paymentMethod: 'UPI - GPay',
        orderId: 'MYN240105001',
        deliveryDate: '2024-01-08',
        returnPolicy: '14 days return/exchange',
        sizes: ['M', 'M'],
        colors: ['Pink', 'White']
      }
    ]
  },
  {
    brand: 'Ajio',
    color: 'from-orange-500 to-orange-700',
    icon: '👕',
    bills: [
      {
        id: '9',
        brand: 'Ajio',
        amount: 3250,
        date: '2024-01-02',
        items: ['Formal Shirt', 'Chinos'],
        warrantyUrl: 'https://ajio.com/warranty',
        exchangeUrl: 'https://ajio.com/exchange',
        storeLocation: 'Online Purchase',
        paymentMethod: 'Credit Card',
        orderId: 'AJO240102001',
        deliveryDate: '2024-01-05',
        returnPolicy: '15 days return/exchange',
        sizes: ['L', '32'],
        colors: ['Light Blue', 'Khaki']
      }
    ]
  }
];

export default function WalletScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [expandedBrands, setExpandedBrands] = useState<string[]>([]);

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

  const totalBills = mockBrandCategories.reduce((total, brand) => total + brand.bills.length, 0);
  const totalSpent = mockBrandCategories.reduce((total, brand) => 
    total + brand.bills.reduce((sum, bill) => sum + bill.amount, 0), 0
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

        {/* Brand Categories - Apple Wallet Style */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Fashion Brands</h3>
          
          {mockBrandCategories.map((brandCategory, categoryIndex) => {
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
                        <div className="text-lg font-bold">
                          {formatCurrency(brandTotal)}
                        </div>
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

                {/* Stacked Bills Behind - Apple Wallet Style */}
                {!isExpanded && brandCategory.bills.length > 0 && (
                  <div className="absolute inset-0 pointer-events-none">
                    {brandCategory.bills.slice(0, 3).map((_, billIndex) => (
                      <div
                        key={billIndex}
                        className={`absolute inset-0 bg-gradient-to-r ${brandCategory.color} rounded-2xl opacity-60`}
                        style={{
                          transform: `translateY(${(billIndex + 1) * 4}px) scale(${1 - (billIndex + 1) * 0.02})`,
                          zIndex: -(billIndex + 1)
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
                        style={{
                          animationDelay: `${billIndex * 100}ms`
                        }}
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
        {mockBrandCategories.length === 0 && (
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