import React, { useContext, useState } from "react";
import { authContext } from "../../../Contexts/AuthContext/AuthContext";
import { imageUpload } from "../../../api/utils";
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const MyProfile = () => {
  const { user, profileUpdate } = useContext(authContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const {
    data: currentUser = {},
    refetch
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/user/${user?.email}`
      );

      return data;
    },
    enabled: !!user?.email,
  });

  const handleUpdateProfile = async () => {
    const imageUrl = await imageUpload(selectedImage);
    await profileUpdate({ displayName: name, photoURL: imageUrl });
    await refetch()
  };

  return (
    <div className="">
      <div className="p-2 sm:p-5 py-5 shadow-lg rounded-lg">
        <div id="profile_cover"></div>
        <div className="avatar flex justify-center mt-[-80px]">
          <div className="mask mask-hexagon w-[150px]">
            <img src={user?.photoURL} />
          </div>
        </div>
        <h3 className="text-center mt-3 mb-1">Hey, {user?.displayName}</h3>
        <p className="text-center">{user?.email}</p>
        <p className="text-center">{user?.phone}</p>
        <div className="flex justify-center mt-4">
          <Badge className={'py-2 px-6'} variant="destructive">{currentUser.role}</Badge>
        </div>
      </div>

      <div className="shadow-lg w-full p-5 mt-2 rounded-lg">
        <form className="flex flex-col gap-3 md:w-10/12 lg:w-8/12 mx-auto">

          <h3 className="mb-4">Update Profile</h3>
          <div>
            <Label htmlFor="email">Upload Image</Label>
            <Input className='py-4 pb-8 mt-2' onChange={handleImageChange}
              name="image"
              type="file"
              accept="image/*" />
          </div>
          <div>
            <Input onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              value={name}
              className="input input-bordered py-6" />

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
