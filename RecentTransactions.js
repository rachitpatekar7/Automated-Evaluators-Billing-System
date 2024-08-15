import React from 'react';

const transactions = [
  { name: 'Rachit Patekar', amount: 'INR 38,948.00', date: '9/8/24 1:00pm' },
  { name: 'MIT World Peace University', amount: 'INR 450.00', date: '9/8/24 2:34pm' },
  // Add more transactions as needed...
];

const RecentTransactions = () => {
  return (
    <div className="recent-transactions">
      <h3>Recent Transactions</h3>
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>
            {tx.name} - {tx.amount} - {tx.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentTransactions;
