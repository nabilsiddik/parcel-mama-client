import React, { useContext } from "react";
import { FiUpload } from "react-icons/fi";
import { imageUpload } from "../../../api/utils";
import axios from "axios";
import { authContext } from "../../../Contexts/AuthContext/AuthContext";

const AddPlant = () => {
    const {user} = useContext(authContext)

    const handleAddPlant = async(e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const description = form.description.value
        const category = form.category.value
        const price = parseFloat(form.price.value)
        const quantity = parseInt(form.quantity.value)
        const image = form.image.files[0]

        const imageUrl = await imageUpload(image)

        const plant = {
            seller: {
              name: user?.displayName,
              email: user?.email,
              photo: user?.photoURL
            },
            name,
            imageUrl,
            description,
            category,
            price,
            quantity,
        }

        // Send plant to database
        const {data} = await axios.post(`${import.meta.env.VITE_MAIN_URL}/plants`, plant)
    }
    
  return (
    <div>
      <h1>Add Plant</h1>

      <form  onSubmit={handleAddPlant} className="w-11/12 md:w-8/12 lg:w-6/12">
        <div className="input-group mb-3">
          <label className="label">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
          />
        </div>
        <div className="input-group mb-3">
          <label className="label">Description</label>
          <textarea
            name="description"
            type="text"
            placeholder="Description"
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-2 mb-3">
          <div className="input-group w-full">
            <label className="label">Category</label>
            <select
              name="category"
              id=""
              className="select select-bordered w-full"
            >
              <option value="one">One</option>
              <option value="two">Two</option>
              <option value="three">Three</option>
            </select>
          </div>
          <div className="input-group w-full">
            <label className="label">Price</label>
            <input
              name="price"
              type="number"
              placeholder="Price"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2 mb-3">
          <div className="input-group">
            <label className="label">Image</label>
            <input name="image" type="file" accept="image/*" />
          </div>
          <div className="input-group">
            <label className="label">Quantity</label>
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <input type="submit" value='Add Plant' className="btn w-full bg-purple-600 text-white font-bold" />
      </form>
    </div>
  );
};

export default AddPlant;
