import { Button } from '@/components/ui/button';
import Image from 'next/image';
import hdTvImg from '@/assets/images/hd_tv.png';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-3 lg:px-5 lg:my-20">
      <div
        className={`border-2 border-white rounded-3xl my-6 lg:flex lg:flex-row-reverse items-center justify-center p-5 lg:py-0 lg:px-12`}
      >
        <div className="flex-1">
          <Image src={hdTvImg} alt="Cup with head phone" className="mx-auto" />
        </div>
        <div className="flex-1 text-center lg:text-left">
          <h2 className="lg:text-4xl text-3xl font-bold lg:leading-snug mt-6 lg:mt-0">
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
