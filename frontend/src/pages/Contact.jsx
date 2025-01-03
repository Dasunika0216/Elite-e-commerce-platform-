import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT '} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} alt="" className='w-full md:max-w-[480px]'/>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Elite Headquarters, No: 45, <br/> Park Lane, Colombo 07, Sri Lanka</p>
          <p className='text-gray-500'>Tel: +94 (11) 234-5678 <br/>Email: support@elite.lk</p>
          <p className='font-semibold text-xl text-gray-600'>Get in Touch with Elite</p>
          <p className='text-gray-500'>We’re here to assist you! Whether you have a question about our products, need help with your order or want to share your feedback, our dedicated team is ready to help. Reach out to us and we’ll get back to you promptly.</p>
        </div>
      </div>
    </div>
  )
}

export default Contact
