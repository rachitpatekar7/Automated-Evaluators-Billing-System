import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Cards from './Cards';
import BillsList from './BillsList';
import RecentTransactions from './RecentTransactions';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Cards />
        <div className="dashboard-details">
          <BillsList />
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
