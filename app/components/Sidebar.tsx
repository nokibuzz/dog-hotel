"use client";

import { ProfileTabs } from "../types/ProfileTabs";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: ProfileTabs) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const tabs: ProfileTabs[] = [
    ProfileTabs.ACCOUNTS,
    ProfileTabs.MOBILE,
    ProfileTabs.PAYMENTS,
    ProfileTabs.COMPLAINTS,
    ProfileTabs.SUPPORT,
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } m-10 rounded-lg md:translate-x-0 md:relative z-10 w-3/4 md:w-1/5 bg-white shadow-md transition-transform duration-300 ease-in-out`}
    >
      <div className="p-4 font-bold text-lg text-gray-800">Dashboard</div>
      <ul className="space-y-2">
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`cursor-pointer p-4 ${
              activeTab === tab ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            onClick={() => {
              setActiveTab(tab);
              setIsMenuOpen(false);
            }}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
