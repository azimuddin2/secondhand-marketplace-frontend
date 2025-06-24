import { Button } from '@/components/ui/button';
import styles from './Offers.module.css';
import Image from 'next/image';
import headPhoneImg from '@/assets/images/headphone.png';
import { Input } from '@/components/ui/input';

const Offers = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-3 lg:px-5 my-12">
      <div
        className={`${styles.banner} border-2 border-white rounded-3xl my-6 lg:flex lg:flex-row-reverse items-center justify-center p-5 lg:py-0 lg:px-12`}
      >
        <div className="flex-1 py-12">
          <Image
            src={headPhoneImg}
            alt="Cup with head phone"
            className="mx-auto w-75"
          />
        </div>
        <div className="flex-1 text-center lg:text-left">
          <h2 className="lg:text-4xl text-xl font-bold lg:leading-snug">
            Stay Update with Exclusive Offers
          </h2>
          <p className="text-base my-4 text-gray-700">
            Save big this Black Friday with unbeatable deals on tech, home
            essentials, fashion, and more! Limited stock.
          </p>
          <div className="flex justify-items-center mt-8">
            <Input
              type="email"
              placeholder="Enter your email"
              className="px-5 rounded-full bg-white"
            />
            <Button className="rounded-full mr-3 px-6 font-semibold ms-3 cursor-pointer">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
