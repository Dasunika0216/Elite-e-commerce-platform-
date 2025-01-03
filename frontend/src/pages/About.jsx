import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT '} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} alt="" className='w-full md:max-w-[450px]'/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Elite was founded to redefine online shopping by offering innovation and convenience. We aim to create a platform where customers can effortlessly browse and shop for clothing that reflects their unique style—all from the comfort of home.</p>
          <p>At Elite, we offer a carefully curated range of high-quality clothing for men, women and children. From timeless classics to trendy styles, our collection ensures quality, style and comfort in every piece.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our Mission at Elite is to empower customers with style, quality and confidence. We're committed to providing a seamless shopping experience for clothing that exceeds expectations - from discovering the perfect outfit to delivery and beyond.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY '} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>QUALITY ASSURANCE :</b>
          <p className='text-gray-600'>We carefully handpick every clothing item to guarantee it meets our uncompromising quality standards.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>TRENDSETTING STYLES :</b>
          <p className='text-gray-600'>Our collection is a blend of timeless designs and the latest fashion trends, tailored to suit every preference.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>CUSTOMER-CENTRIC SERVICE :</b>
          <p className='text-gray-600'>Our dedicated support team is committed to making your shopping experience smooth, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>
      
    </div>

    
  )
}

export default About
