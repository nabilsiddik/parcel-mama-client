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
  const [selectedImiage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const {
    data: currentUser = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/user/${user?.email}`
      );

      return data;
    },
  });

  const handleUpdateProfile = async () => {
    const imageUrl = await imageUpload(selectedImiage);
    profileUpdate({ displayName: name, photoURL: imageUrl });
    refetch()
  };

  return (
    <div className="">
      <div className="p-5 shadow-lg rounded-lg">
        <div id="profile_cover"></div>
        <div className="avatar flex justify-center mt-[-80px]">
          <div className="mask mask-hexagon w-[150px]">
            <img src={user?.photoURL} />
          </div>
        </div>
        <h3 className="text-center mt-3 mb-1">Hey, {user?.displayName}</h3>
        <p className="text-center">{user?.email}</p>
        <div className="flex justify-center mt-4">
          <Badge className={'py-2 px-6'} variant="destructive">{currentUser.role}</Badge>
        </div>
      </div>

      <div className="shadow-lg w-full md:w-6/12 lg:w-4/12 mt-10 py-5 px-5 rounded-lg">
        <h3 className="mb-8">Update Profile</h3>
        <form className="flex flex-col gap-3">
          <div>
            <Label htmlFor="email">Upload Image</Label>
            <Input className='py-4 pb-8 mt-2' onChange={handleImageChange}
              name="image"
              type="file"
              accept="images/*" />
          </div>
          <div>
            <Input onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
              placeholder="Name"
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
