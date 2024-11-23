"use client";

const ProfileCard = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center space-x-4">
        <img
          src="/path-to-profile-image.jpg"
          alt="Profile"
          className="h-24 w-24 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">Sami Rahman</h2>
          <p className="text-gray-600">+1-856-569-9956</p>
          <p className="text-gray-600">samirahman002@gmail.com</p>
        </div>
      </div>
      <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
        Save
      </button>
    </div>
  );
};

export default ProfileCard;
