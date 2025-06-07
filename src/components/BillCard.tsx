import React from 'react';
import { ExternalLink, Shield, RefreshCw, Calendar, MapPin, CreditCard, Hash, Package } from 'lucide-react';

interface Bill {
  id: string;
  brand: string;
  amount: number;
  date: string;
  items: string[];
  warrantyUrl: string;
  exchangeUrl: string;
  category: string;
  storeLocation: string;
  paymentMethod: string;
  orderId: string;
  deliveryDate?: string;
  returnPolicy: string;
  sizes: string[];
  colors: string[];
}

interface BillCardProps {
  bill: Bill;
}

const brandLogos: { [key: string]: string } = {
  'Zara': '🏷️',
  'H&M': '👔',
  'Uniqlo': '🧥',
  'Myntra': '👗',
  'Ajio': '👕'
};

const brandColors: { [key: string]: string } = {
  'Zara': 'from-gray-800 to-black',
  'H&M': 'from-red-600 to-red-800',
  'Uniqlo': 'from-red-500 to-red-600',
  'Myntra': 'from-pink-500 to-pink-700',
  'Ajio': 'from-orange-500 to-orange-700'
};

export default function BillCard({ bill }: BillCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handleWarranty = () => {
    window.open(bill.warrantyUrl, '_blank');
  };

  const handleExchange = () => {
    window.open(bill.exchangeUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
      {/* Brand Header */}
      <div className={`bg-gradient-to-r ${brandColors[bill.brand] || 'from-gray-800 to-black'} p-4 text-white relative overflow-hidden`}>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{brandLogos[bill.brand] || '🏪'}</div>
            <div>
              <h3 className="text-xl font-bold">{bill.brand}</h3>
              <p className="text-white/80 text-sm flex items-center">
                <MapPin size={12} className="mr-1" />
                {bill.storeLocation}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{formatCurrency(bill.amount)}</div>
            <div className="text-white/80 text-xs flex items-center justify-end">
              <Calendar size={12} className="mr-1" />
              {formatDate(bill.date)}
            </div>
          </div>
        </div>

        {/* Barcode Visual - Now on individual bills */}
        <div className="mt-4 flex space-x-1 relative z-10">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="bg-white"
              style={{
                width: Math.random() > 0.5 ? '2px' : '4px',
                height: '24px',
                opacity: 0.9
              }}
            />
          ))}
        </div>

        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <div className="w-full h-full bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
        </div>
      </div>

      {/* Order Details */}
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Hash size={14} className="text-gray-500" />
            <div>
              <p className="text-gray-500 text-xs">Order ID</p>
              <p className="font-medium text-gray-900">{bill.orderId}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <CreditCard size={14} className="text-gray-500" />
            <div>
              <p className="text-gray-500 text-xs">Payment</p>
              <p className="font-medium text-gray-900">{bill.paymentMethod}</p>
            </div>
          </div>
          {bill.deliveryDate && (
            <div className="flex items-center space-x-2 col-span-2">
              <Package size={14} className="text-gray-500" />
              <div>
                <p className="text-gray-500 text-xs">Delivered</p>
                <p className="font-medium text-gray-900">{formatDate(bill.deliveryDate)}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="p-4 bg-gray-50">
        <h4 className="font-medium text-gray-900 mb-3 text-sm flex items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
          Items Purchased:
        </h4>
        <div className="space-y-3">
          {bill.items.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-3 border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{item}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    {bill.sizes[index] && (
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        Size: {bill.sizes[index]}
                      </span>
                    )}
                    {bill.colors[index] && (
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        Color: {bill.colors[index]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Return Policy */}
      <div className="px-4 py-3 bg-blue-50 border-b border-gray-100">
        <p className="text-xs text-blue-700">
          <strong>Return Policy:</strong> {bill.returnPolicy}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-white">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleWarranty}
            className="flex items-center justify-center space-x-2 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200 text-sm font-medium hover:shadow-lg transform hover:scale-105"
          >
            <Shield size={16} />
            <span>Warranty</span>
            <ExternalLink size={12} />
          </button>
          <button
            onClick={handleExchange}
            className="flex items-center justify-center space-x-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 text-sm font-medium hover:shadow-lg transform hover:scale-105"
          >
            <RefreshCw size={16} />
            <span>Exchange</span>
            <ExternalLink size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}