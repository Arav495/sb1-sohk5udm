import React from 'react';

type Bill = {
  id?: string;
  brand: string;
  amount: number;
  date: string;
  store_location: string;
  order_id: string;
  payment_method: string;
  delivery_date: string;
  created_at?: string;
  items: {
    name: string;
    qty: string;
    price: string;
    size: string;
    color: string;
  }[];
};

interface Props {
  bill: Bill;
}

const BillCard: React.FC<Props> = ({ bill }) => {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-4">
      {/* Header: Brand + Store */}
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-md font-bold text-gray-800">{bill.brand}</h4>
        <p className="text-sm text-gray-500">{bill.store_location}</p>
      </div>

      {/* Order Info */}
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
        <p>
          <strong>Order ID:</strong> {bill.order_id}
        </p>
        <p>
          <strong>Payment:</strong> {bill.payment_method}
        </p>
        <p>
          <strong>Delivered:</strong> {bill.delivery_date}
        </p>
      </div>

      {/* Items */}
      <div className="mt-3 space-y-2 text-sm">
        <p className="font-semibold text-gray-700">🧾 Items Purchased:</p>
        {bill.items.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-md px-3 py-2 text-gray-800"
          >
            {`${item.name} (Size: ${item.size}, Color: ${item.color}, Qty: ${item.qty}, Price: ₹${item.price})`}
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="mt-3 text-right font-semibold text-gray-900">
        Total: ₹{bill.amount.toLocaleString('en-IN')}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 mt-4">
        <a
          href="#"
          className="bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-blue-700"
        >
          🛡️ Warranty
        </a>
        <a
          href="#"
          className="bg-gray-300 text-gray-800 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-400"
        >
          🔁 Exchange
        </a>
      </div>
    </div>
  );
};

export default BillCard;
