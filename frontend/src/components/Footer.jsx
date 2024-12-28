import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='my-10 mt-10 text-sm text-center flex flex-col items-center'>
      <img src={assets.logo} alt='' className='mb-5 w-32 h-21' />
      <p className='w-full md:w-2/3 text-gray-600 mb-8'>
        Elite Clothing is your ultimate destination for trendy and timeless fashion. We pride ourselves on offering premium-quality apparel, seamless shopping experiences, and exceptional customer service. Enjoy fast shipping, a hassle-free returns policy, and secure payment options tailored for your convenience. Stay connected with us on social media to explore the latest collections, exclusive offers, and style inspirations. Redefine your wardrobe today with Elite Clothing – where fashion meets excellence.
      </p>

      <div className='flex flex-wrap justify-center gap-5 mb-5'>
        <Link to='/' className='text-gray-600'>HOME</Link>
        <Link to='/collection' className='text-gray-600'>COLLECTION</Link>
        <Link to='/about' className='text-gray-600'>ABOUT</Link>
        <Link to='/contact' className='text-gray-600'>CONTACT</Link>
      </div>

      <div>
      <hr className='border-t-[1px] border-black w-full'/>
        <p className='py-5 text-sm text-center'>© 2025 Elite Clothing - Redefining Style, One Outfit at a Time</p>
      </div>
    </div>
  );
};

export default Footer;
