import React from 'react';

type Item = {
  name: string;
  qty: string;
  price: string;
  size: string;
  color: string;
};

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
  items: Item[];
};

interface Props {
  bill: Bill;
}

const BillCard: React.FC<Props> = ({ bill }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      {/* Order Meta Info */}
      <div className="text-sm text-gray-700 space-y-1 mb-3">
        <div>
          <strong>Order ID:</strong> {bill.order_id}{' '}
          <span className="mx-2 text-gray-400">|</span>
          <strong>Payment:</strong> {bill.payment_method}
        </div>
        <div>
          <strong>Delivered:</strong> {bill.delivery_date}
        </div>
      </div>

      {/* Items List */}
      <div className="mt-2">
        <p className="font-semibold text-gray-800 mb-2">🧾 Items Purchased:</p>
        <ul className="space-y-1 text-sm text-gray-700">
          {bill.items.map((item, index) => (
            <li key={index} className="list-disc list-inside">
              {`${item.name} (Size: ${item.size}, Color: ${item.color}, Qty: ${item.qty}, Price: ₹${item.price})`}
            </li>
          ))}
        </ul>
      </div>

      {/* Total */}
      <div className="mt-4 text-right font-bold text-gray-900">
        Total: ₹{bill.amount.toLocaleString('en-IN')}
      </div>

      {/* Warranty & Exchange Buttons */}
      <div className="mt-4 flex gap-3">
        <a
          href="#"
          className="flex-1 text-center bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-blue-700"
        >
          🛡️ Warranty
        </a>
        <a
          href="#"
          className="flex-1 text-center bg-gray-300 text-gray-800 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-400"
        >
          🔁 Exchange
        </a>
      </div>
    </div>
  );
};

export default BillCard;
