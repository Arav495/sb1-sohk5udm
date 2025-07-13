import React from 'react';

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

export default function BillCard({ bill }: { bill: Bill }) {
  const formatCurrency = (amt: number) =>
    `₹${amt.toLocaleString('en-IN')}`;

  const handleRedirect = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow border">
      <div className="text-sm text-gray-500 mb-2">
        <strong>Order ID:</strong> {bill.order_id} &nbsp;|&nbsp;
        <strong>Payment:</strong> {bill.payment_method}
      </div>
      <div className="text-sm text-gray-500 mb-2">
        <strong>Delivered:</strong> {bill.delivery_date || bill.date}
      </div>

      <div className="text-sm mt-2">
        <h4 className="font-semibold text-gray-800 mb-1">
          🧾 Items Purchased:
        </h4>
        <ul className="list-disc pl-5 space-y-1">
          {bill.items.map((item: any, idx: number) => (
            <li key={idx} className="text-gray-700">
              {typeof item === 'object'
                ? `${item.name} (Size: ${item.size}, Color: ${item.color}, Qty: ${item.qty}, Price: ₹${item.price})`
                : item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 text-right font-bold text-gray-800">
        Total: {formatCurrency(bill.amount)}
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <button
          onClick={() =>
            handleRedirect('https://www.zara.com/in/en/help-center/FaultyItems')
          }
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
        >
          🛡 Warranty
        </button>
        <button
          onClick={() =>
            handleRedirect('https://www.zara.com/in/en/help-center/HowToExchange')
          }
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm"
        >
          🔁 Exchange
        </button>
      </div>
    </div>
  );
}
