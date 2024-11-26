"use client";

import React from "react";
import ProfileCard from "./profile/ProfileCard";
import AccountCard from "./profile/AccountCard";
import BillCard from "./profile/BillCard";
import { ProfileTabs } from "../types/ProfileTabs";
import { SafeUser } from "../types";

interface TabContentProps {
  activeTab: ProfileTabs;
  currentUser: SafeUser | null;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, currentUser }) => {
  switch (activeTab) {
    case ProfileTabs.ACCOUNTS:
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-5">
          <ProfileCard currentUser={currentUser} />
          <div className="grid grid-cols-1 gap-6">
            <AccountCard />
            <BillCard />
          </div>
        </div>
      );

    case ProfileTabs.MOBILE:
      return (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold">Mobile Tab Content</h2>
          <p className="text-gray-600">
            Here you can manage mobile-related details.
          </p>
        </div>
      );

    case ProfileTabs.PAYMENTS:
    case ProfileTabs.COMPLAINTS:
    case ProfileTabs.SUPPORT:
      return (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold">{activeTab} Tab Content</h2>
          <p className="text-gray-600">Details for {activeTab} go here.</p>
        </div>
      );

    default:
      return <div className="p-6">Welcome to the dashboard!</div>;
  }
};

export default TabContent;
