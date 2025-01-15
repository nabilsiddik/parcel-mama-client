import React, { useContext, useState } from "react";
import { authContext } from "../../../Contexts/AuthContext/AuthContext";
import { imageUpload } from "../../../api/utils";

const MyProfile = () => {
  const { user, profileUpdate } = useContext(authContext);
  const [selectedImiage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleUpdateProfile = async () => {
    const imageUrl = await imageUpload(selectedImiage);
    profileUpdate({ displayName: name, photoURL: imageUrl });
  };

  return (
    <div className="flex gap-10">
      <div className="p-5 shadow-lg">
        <img
          className="w-[150px] h-[150px] rounded-full"
          src={user?.photoURL}
          alt="profile"
        />
        <h3 className="text-center">Hey, {user?.displayName}</h3>
        <p className="text-center">{user?.email}</p>
      </div>

      <div>
        <h3 className="mb-10">Update Profile</h3>
        <form className="flex flex-col gap-3">
          <div>
            <input
              onChange={handleImageChange}
              name="image"
              type="file"
              accept="images/*"
            />
          </div>
          <div>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
              placeholder="Name"
              className="input input-bordered"
            />
          </div>
          <div>
            <input
              onClick={handleUpdateProfile}
              className="btn bg-purple-600 text-white"
              value={"Update Profile"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
