import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
    </div>
  );
};

export default Categories;
