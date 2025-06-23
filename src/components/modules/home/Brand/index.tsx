import husqvarnaImg from '@/assets/images/brand/husqvarna.png';
import zaraImg from '@/assets/images/brand/zara.png';
import caraImg from '@/assets/images/brand/cara.png';
import lufthansaImg from '@/assets/images/brand/lufthansa.png';
import necxImg from '@/assets/images/brand/necx.png';
import barlieImg from '@/assets/images/brand/barlie.png';
import amazonImg from '@/assets/images/brand/amazon.png';
import pumaImg from '@/assets/images/brand/puma.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const brandImages = [
  {
    id: 1,
    image: husqvarnaImg,
  },
  {
    id: 2,
    image: zaraImg,
  },
  {
    id: 3,
    image: caraImg,
  },
  {
    id: 4,
    image: lufthansaImg,
  },
  {
    id: 5,
    image: necxImg,
  },
  {
    id: 6,
    image: barlieImg,
  },
  {
    id: 7,
    image: amazonImg,
  },
  {
    id: 8,
    image: pumaImg,
  },
];

const Brand = () => {
  return (
    <div className="bg-[#f7f7f7] my-12 lg:my-16 py-20">
      <div className="max-w-screen-xl mx-auto px-3 lg:px-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Top Brand</h2>
          <Link href="/listings">
            <Button
              className="rounded-full font-semibold cursor-pointer"
              variant="outline"
            >
              All Collection
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-3 ">
          {brandImages.map((item) => (
            <div className="bg-[#f3f3f3] border-5 border-white rounded-5 p-5 flex items-center">
              <Image src={item.image} alt="Brand" className="mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brand;
