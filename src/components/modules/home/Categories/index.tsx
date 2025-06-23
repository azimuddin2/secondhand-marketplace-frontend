import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import computerIcon from '@/assets/images/categories/computer.png';
import gadgetsIcon from '@/assets/images/categories/gadgets.png';
import gameControllerIcon from '@/assets/images/categories/game_controller.png';
import kitchenIcon from '@/assets/images/categories/kitchen.png';
import electronicsIcon from '@/assets/images/categories/electronics.png';
import lifestyleIcon from '@/assets/images/categories/lifestyle.png';
import mobileIcon from '@/assets/images/categories/mobile.png';
import routersIcon from '@/assets/images/categories/routers.png';
import shoeIcon from '@/assets/images/categories/shoe.png';
import watchIcon from '@/assets/images/categories/watch.png';

const categoriesData = [
  {
    id: 1,
    icon: computerIcon,
    name: 'computer',
  },
  {
    id: 2,
    icon: gadgetsIcon,
    name: 'gadgets',
  },
  {
    id: 3,
    icon: gameControllerIcon,
    name: 'game',
  },
  {
    id: 4,
    icon: kitchenIcon,
    name: 'kitchen',
  },
  {
    id: 5,
    icon: electronicsIcon,
    name: 'electronics',
  },
  {
    id: 6,
    icon: lifestyleIcon,
    name: 'lifestyle',
  },
  {
    id: 7,
    icon: mobileIcon,
    name: 'mobile',
  },
  {
    id: 8,
    icon: routersIcon,
    name: 'routers',
  },
  {
    id: 9,
    icon: shoeIcon,
    name: 'shoe',
  },
  {
    id: 10,
    icon: watchIcon,
    name: 'watch',
  },
];

const Categories = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-3 lg:px-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Categories</h2>
        <Link href="/listings">
          <Button
            className="rounded-full font-semibold cursor-pointer"
            variant="outline"
          >
            View All
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {categoriesData.map((category) => (
          <div
            key={category.id}
            className="bg-[#f7f7f7] border-2 border-white rounded-xl p-5 lg:p-6"
          >
            <div className="h-20">
              <Image
                src={category.icon}
                alt="Category"
                width={100}
                height={100}
                className="mx-auto"
              />
            </div>
            <h3 className="text-center font-semibold mt-5 text-lg capitalize">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
