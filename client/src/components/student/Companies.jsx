import React from 'react';
import assets from '../../assets/assets';

const Companies = () => {
  return (
    <div className='flex flex-col w-full justify-center items-center pt-16'>
      <p className='text-gray-500 max-w-sm mx-auto '>Trusted by learners from </p>
      <div className='flex   flex-wrap justify-center items-center gap-6 md:gap-16 md:mt-10 mt-5 '>
        <img src={assets.microsoftLogo} alt="microsoft_logo" className='w-20 md:w-28' />
        <img src={assets.accentureLogo} alt="accenture_logo" className='w-20 md:w-28' />
        <img src={assets.walmartLogo} alt="walmart_logo" className='w-20 md:w-28' />
        <img src={assets.paypalLogo} alt="paypal_logo" className='w-20 md:w-28' />
        <img src={assets.adobeLogo} alt="adobe_logo" className='w-20 md:w-28' />
      </div>
    </div>
  );
};

export default Companies;