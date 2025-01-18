"use client"
import React from 'react';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import { Quote } from 'lucide-react';

const members = [
    {
        id: 1, 
        name: "Bridget",
        profession: "Business Owner",
        quote: "Infinity Thrift really helped me save for my dream car in less than a year! They have different saving plans suitable for my different needs",
    },
    {
        id: 2, 
        name: "Onyeka",
        profession: "Doctor",
        quote: "They are really a gamechanging organization helping me make profits from the savings interest.",
    },
    {
        id: 3, 
        name: "Anthony",
        profession: "Local Trader",
        quote: "Infinity Thrift is awesome. They helped me with loans to expand my business, and also supported me financially throughout thet jorney",
    },
    {
        id: 4, 
        name: "Anna",
        profession: "Banker",
        quote: "Best institution when it somes to financial aid.",
    },
]

export default function Members() {
  return (
    <div className='mt-28 px-5 py-10 w-full md:h-[70vh] h-[85vh]  bg-active-nav flex flex-col gap-6'>
        <div className='flex items-center justify-center'>
            <h2 className='md:text-3xl text-xl font-semibold text-content-day'>What Our Member Are Saying</h2>
        </div>
        <div className='flex items-center justify-center'>
            <p className='text-content-day text-center text-sm md:text-base '>Real stories of people achieving their financial goals through Infinity Thrift.</p>
        </div>
        <div>
        <Swiper className='h-[47vh]'
          modules={[Pagination]}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
            slidesPerView: 3,
              spaceBetween: 40,
            }
          }}
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={3}
   
    >
      {members.map((item) => (
        <SwiperSlide key={item.id}>
            <div className='flex p-3 flex-col gap-1 bg-primary-day rounded-md h-44'>
                <div className='p-1 border-b-[1px] border-b-outline-day flex flex-col justify-center items-center h-32'>
                    <Quote className='size-6 text-[#fdca28]' />
                <p className='text-sm text-text-button text-center mb-3'>{item.quote}</p>
                </div>
                <div className='flex flex-row items-center justify-center'>
                    <div className='relative  rounded-full border-text-button mr-2'>
                        <Image src="/img/jh.png" alt='customer image ' width={30} height={30} className='object-cover rounded-full border-text-button border-[1px]' />
                    </div>
                    <div className='text-text-button text-[13px] flex flex-col items-start justify-center'>
                        <p className='font-semibold'>{item.name}</p>
                        <p className='font-light text-[10px]'>{item.profession}</p>
                    </div>
                </div>
            </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
    </div>
  )
}
