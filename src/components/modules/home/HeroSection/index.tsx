'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import banner1 from '@/assets/images/listing-banner1.jpg';
import banner2 from '@/assets/images/listing-banner2.jpg';
import banner3 from '@/assets/images/listing-banner3.jpg';

const HeroSection = () => {
  const imageItems = [
    {
      id: 1,
      image: banner1,
    },
    {
      id: 2,
      image: banner2,
    },
    {
      id: 3,
      image: banner3,
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-3 lg:px-5">
      <div
        className={`border-2 border-white rounded-3xl my-6 lg:flex lg:flex-row-reverse items-center justify-center`}
      >
        <Swiper
          className="mySwiper flex-1/5 "
          style={
            {
              '--swiper-pagination-color': 'red',
              '--swiper-pagination-bullet-inactive-color': '#ffffff',
              '--swiper-pagination-bullet-inactive-opacity': '1',
              '--swiper-pagination-bullet-size': '12px',
              '--swiper-pagination-bullet-horizontal-gap': '3px',
              '--swiper-navigation-color': '#ffffff',
              '--swiper-navigation-size': '18px',
            } as React.CSSProperties
          }
          modules={[A11y, Pagination, Navigation, Autoplay]}
          spaceBetween={18}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          pagination={{
            dynamicBullets: true,
          }}
        >
          {imageItems.map((item) => (
            <SwiperSlide key={item.id} className="">
              <Image src={item.image} alt="Banner" className=" h-[300px]" />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl font-bold lg:leading-snug lg:mt-0">
            Don&apos;t Miss Out on <br /> These Unbeatable Black <br /> Friday
            Deals!
          </h2>
          <p className="text-base my-4 text-gray-700">
            Save big this Black Friday with unbeatable deals on tech, home
            essentials, fashion, and more! Limited stock.
          </p>
          <Link href="/listings">
            <Button className="rounded-full mr-3 px-6 font-semibold cursor-pointer">
              Buy Now
            </Button>
          </Link>
          <Link href="/listings">
            <Button
              variant="outline"
              className="rounded-full px-6 font-semibold bg-white cursor-pointer"
            >
              All Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
