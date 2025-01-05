import React from "react";

function Profile({ profilePic, username, isOpen }) {
  return (
    <div className="h-16 ml-2 flex justify-center items-center">
      <div className="size-10 flex justify-center items-center bg-red-500 rounded-full">
        <span className="text-white font-sans text-xl">{profilePic}</span>
      </div>
      {isOpen && (
        <div>
          <span className="mx-3 text-stone-800 dark:text-gray-200 font-medium">
            {username}
          </span>
        </div>
      )}
    </div>
  );
}

export default Profile;
