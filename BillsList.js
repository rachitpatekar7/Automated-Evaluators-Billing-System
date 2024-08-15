import React from 'react';

const bills = [
  { id: 'INV-U7263', status: 'Paid', user: 'Rachit Patekar' },
  { id: 'INV-U7264', status: 'Refunded', user: 'MIT World Peace University' },
  // Add more bills as needed...
];

const BillsList = () => {
  return (
    <div className="bills-list">
      <h3>Bills</h3>
      <ul>
        {bills.map((bill) => (
          <li key={bill.id}>
            {bill.id} - {bill.status} - {bill.user}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BillsList;
