import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    contactNumber: '',
  });

  const { navigate } = useContext(ShopContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = () => {
    const isFormComplete = Object.values(formData).every((value) => value.trim() !== '');
    if (!isFormComplete) {
      toast.error('Please fill in all the delivery information!');
      return;
    }
    navigate('/orders');
  };

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <ToastContainer />
      {/* ----------- delivery information ------------ */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={' INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input type="text" name="firstName" placeholder="First name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" value={formData.firstName} onChange={handleInputChange} />
          <input type="text" name="lastName" placeholder="Last name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" value={formData.lastName} onChange={handleInputChange} />
        </div>
        <input type="email" name="email" placeholder="Email address" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" value={formData.email} onChange={handleInputChange} />
        <input
          type="text"
          name="street" placeholder="Street" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" value={formData.street} onChange={handleInputChange} />
        <div className='flex gap-3'>
          <input type="text" name="city" placeholder="City" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" value={formData.city} onChange={handleInputChange} />
          <input type="text" name="state" placeholder="State" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" value={formData.state} onChange={handleInputChange} />
        </div>
        <input type="number" name="zipCode" placeholder="Zip code" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" value={formData.zipCode} onChange={handleInputChange} />
        <input type="number" name="contactNumber" placeholder="Contact number" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" value={formData.contactNumber} onChange={handleInputChange} />
      </div>

      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={' METHOD'} />
          {/* payment method selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer' onClick={() => setMethod('stripe')}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-600' : ''}`}></p>
              <img src={assets.stripe_logo} alt="" className='h-5 mx-4' />
            </div>
            <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer' onClick={() => setMethod('razorpay')}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-600' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="" className='h-5 mx-4' />
            </div>
            <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer' onClick={() => setMethod('cod')}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-600' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button className='bg-black text-white px-16 py-3 text-sm' onClick={handlePlaceOrder}>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
