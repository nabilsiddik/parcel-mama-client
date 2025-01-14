import React, { useContext, useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { authContext } from './../../Contexts/AuthContext/AuthContext';
import axios from 'axios';

const PurchaseModal = ({isOpen, setIsOpen, plant, refetch}) => {

    const {user} = useContext(authContext)
    const [totalQuantity, setTotalQuantity] = useState(1)
    const [totalPrice, setTotalPrice] = useState(plant.price)
    const [address, setAddress] = useState('')
    const [purchaseInfo, setPurchaseInfo] = useState({
      customerInfo: {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL
      },
      seller: plant?.seller?.email,
      plantId: plant._id,
      price: totalPrice,
      quantity: totalQuantity,
      address: '',
      status: 'pending'
    })

    const handleQuantity = (value) => {
        if(value > plant.quantity){
            setTotalQuantity(plant.quantity)
            setTotalPrice(plant.quantity * plant.price)
            return alert('Value can not be greater than available quantity')
        }else if(value < 1){
            setTotalQuantity(1)
            return alert('Value can not be less than 1')
        }
        setTotalQuantity(value)
        setTotalPrice(plant.price * value)
        setPurchaseInfo(prev => {
          return {...prev, quantity: value, price: value * plant.price}
        })
    }

    // Handle address
    const handleAddress = (address) => {
      setAddress(address)

      setPurchaseInfo(prev => {
        return {...prev, address: address}
      })
    }


    const handlePayment = async() => {
      try{
        // send order info to database
        await axios.post(`${import.meta.env.VITE_MAIN_URL}/order`, purchaseInfo)

        // Update quantity in database
        await axios.patch(`${import.meta.env.VITE_MAIN_URL}/plant/quantity/${plant._id}`, {quantityToUpdate: totalQuantity})
        refetch()
      }catch(err){
        console.log(err)
      }finally{
        closeModal()
      }
    }
    
  return (
    <div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-full items-center justify-center p-4">
          <DialogPanel className="w-10/12 md:w-8/12 lg:w-6/12 space-y-4 border p-12 shadow-xl bg-purple-600 text-white rounded-lg">
            <DialogTitle className="font-bold">{plant?.name}</DialogTitle>
            <Description>{plant?.description}</Description>
            <p>Price: ${plant?.price}</p>
            <p>Category: {plant?.category}</p>
            <p>Quantity: {plant?.quantity}</p>
            <input onChange={(e) => handleAddress(e.target.value)} type="text" className='input input-borders text-black' placeholder='address' value={address} />
            <input onChange={(e) => handleQuantity(e.target.value)} type="number" className='text-black input input-bordered' value={totalQuantity}/>
            <button onClick={handlePayment} className='btn'>Pay ${totalPrice}</button>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Close</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}

export default PurchaseModal
