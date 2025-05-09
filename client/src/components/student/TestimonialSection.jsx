import React, { useContext } from 'react';
import { dummyTestimonial } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const TestimonialSection = () => {
  const { getStars } = useContext(AppContext)
  return (
    <div className='pb-8 px-8 md:px-0'>
      <h2 className='text-3xl font-medium text-gray-800'> Testimonials </h2>
      <p className='md:text-base text-gray-500 mt-3'>Hear from our learners as they share their journeys of transformation ,success,and how our <br /> platform has made  a difference in their lives.</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 gap-4 md:my-16 my-10   content-center w-full  justify-between mt-14  '>
        {
          dummyTestimonial.slice(0, 4).map((testimonial, index) => {
            return (
              <div className='text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden' key={index}>
                <div className=' flex flex-col '>
                  <div className='flex gap-x-2 md:gap-x-4 gap-4  bg-gray-500/10 px-5 py-4 '>
                    <img className='h-12 w-12 rounded-full' src={testimonial.image} alt={testimonial.name} />
                    <div>
                      <h1 className='text-lg font-medium text-gray-800'>{testimonial.name}</h1>
                      <p className='text-gray-800/80'>{testimonial.role}</p>
                    </div>
                  </div>
                  <div className='p-2 sm:p-3 md:p-4 pb-7'>
                    <div className='flex gap-0.5 text-xl sm:text-2xl md:text-3xl '>
                      {getStars(testimonial.rating)}
                    </div>
                    <p className='text-gray-500 mt-5 line-clamp-4'>{testimonial.feedback}</p>
                  </div>
                  <button className='text-blue-500/80 self-start px-4 underline hover:text-blue-700 active:text-blue-900'>Read more</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default TestimonialSection;