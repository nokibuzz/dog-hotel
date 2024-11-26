"use client";

// import { useRouter } from "next/navigation";
import { SafeUser } from "../types";
import Container from "../components/Container";
import { useState } from "react";
import { ProfileTabs } from "../types/ProfileTabs";
import TabContent from "../components/TabContent";
import Sidebar from "../components/Sidebar";

interface ProfileClientProps {
  currentUser: SafeUser | null;
}

const ProfileClient: React.FC<ProfileClientProps> = ({ currentUser }) => {
  //   const router = useRouter();

  const [activeTab, setActiveTab] = useState<ProfileTabs>(ProfileTabs.ACCOUNTS);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <Container>
      <div className="flex flex-col rounded-lg mt-10 md:flex-row bg-gray-100">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />

        <div className="md:hidden flex items-center bg-white shadow p-4">
          <button
            className="text-gray-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* Hamburger button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-800 ml-4">
            {activeTab}
          </h1>
        </div>

        <div className="flex-1 p-6">
          <TabContent activeTab={activeTab} currentUser={currentUser} />
        </div>
      </div>
    </Container>
  );
};

export default ProfileClient;
