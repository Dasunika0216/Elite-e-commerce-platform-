import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({...data, [name]: value}));      // Update the formData  
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();    // Prevent from loading the page after form submission

    try {
      let orderItems = [];

      // Loop through the cartItems and get the product details
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));    // Get the product details from the products array using the product id 

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);  // Push the product details to the orderItems array
            }
          }
        }
      }

      // console.log(orderItems);
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch(method) {
        // API calls for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers:{token}});

          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          }
          else{
            toast.error(response.data.message);
          }
          break;

        case 'stripe':

        break;

        default:
          break;
      }
      
    } 
    catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <ToastContainer />
      {/* ----------- delivery information ------------ */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={' INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} type="text" name="firstName" placeholder="First name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" value={formData.firstName} />
          <input required onChange={onChangeHandler} type="text" name="lastName" placeholder="Last name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" value={formData.lastName} />
        </div>
        <input required type="email" name="email" placeholder="Email address" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" value={formData.email} onChange={onChangeHandler} />
        <input
          type="text" required
          name="street" placeholder="Street" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" value={formData.street} onChange={onChangeHandler} />
        <div className='flex gap-3'>
          <input required type="text" name="city" placeholder="City" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" value={formData.city} onChange={onChangeHandler} />
          <input required type="text" name="state" placeholder="State" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" value={formData.state} onChange={onChangeHandler} />
        </div>
        <input required type="number" name="zipcode" placeholder="Zip code" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" value={formData.zipcode} onChange={onChangeHandler} />
        <input required type="number" name="phone" placeholder="Contact number" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" value={formData.phone} onChange={onChangeHandler} />
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
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
