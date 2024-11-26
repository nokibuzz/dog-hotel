"use client";

import { useState } from "react";
import Button from "../Button";
import EditableField from "../inputs/EditableField";
import { SafeUser } from "@/app/types";

interface ProfileCardProps {
  currentUser: SafeUser | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ currentUser }) => {
  const [name, setName] = useState(currentUser?.name ?? "");
  // const [phone, setPhone] = useState(currentUser?.phone);
  const [email, setEmail] = useState("currentUser.email");

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">My Profile</h2>

      <div className="grid grid-cols-1 gap-4">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <img
            src="/images/placeholder.png"
            alt="Profile"
            className="rounded-full w-24 h-24"
          />
        </div>

        {/* Editable Fields */}
        <EditableField label="Name" value={name} onSave={setName} />
        {/* <EditableField label="Phone" value={phone} onSave={setPhone} /> */}
        <EditableField label="Email" value={email} onSave={setEmail} />

        {/* Save Button */}
        <div className="flex justify-center">
          <Button disabled={false} label="Save" onClick={handleSubmit} small />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
