'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import banner1 from '@/assets/images/listing-banner1.jpg';
import banner2 from '@/assets/images/listing-banner2.jpg';
import banner3 from '@/assets/images/listing-banner3.jpg';
import Image from 'next/image';

const ListingBanner = () => {
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
    <div className="mb-10">
      <Swiper
        style={
          {
            '--swiper-pagination-color': '#2E2E2E',
            '--swiper-pagination-bullet-inactive-color': '#ffffff',
            '--swiper-pagination-bullet-inactive-opacity': '1',
            '--swiper-pagination-bullet-size': '12px',
            '--swiper-pagination-bullet-horizontal-gap': '3px',
            '--swiper-navigation-color': '#ffffff',
            '--swiper-navigation-size': '18px',
          } as React.CSSProperties
        }
        className="mySwiper"
        breakpoints={{
          576: {
            width: 576,
            slidesPerView: 1,
          },
          768: {
            width: 1024,
            slidesPerView: 1,
          },
          1280: {
            width: 1280,
            slidesPerView: 1,
          },
        }}
        modules={[A11y, Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        navigation={true}
      >
        {imageItems.map((item) => (
          <SwiperSlide key={item.id}>
            <Image src={item.image} alt="Banner" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ListingBanner;
