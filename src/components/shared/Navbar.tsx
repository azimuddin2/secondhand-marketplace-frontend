'use client';

import { Button } from '../ui/button';
import {
  Heart,
  Search,
  ShoppingCart,
  Menu,
  User,
  LayoutDashboard,
  Store,
  LogOut,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';
import Link from 'next/link';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { logout } from '@/services/Auth';
import { usePathname, useRouter } from 'next/navigation';
import { protectedRoutes } from '@/constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push('/');
    }
  };

  const navOptions = (
    <div className="flex flex-col lg:flex-row items-center gap-3 w-full">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="rounded-full p-0 size-10 cursor-pointer"
        >
          <Heart />
        </Button>
        <Link href="/cart">
          <Button
            variant="outline"
            className="rounded-full p-0 size-10 cursor-pointer"
          >
            <ShoppingCart />
          </Button>
        </Link>

        {user ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="mx-auto w-10 h-10">
                  <AvatarImage src={user?.image} />
                  <AvatarFallback className="bg-primary text-white text-xl">
                    {user?.name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-[10px] mt-2 w-80 mr-3 p-3">
                <div>
                  <Avatar className="mx-auto w-12 h-12">
                    <AvatarImage src={user?.image} />
                    <AvatarFallback className="bg-primary text-white text-2xl">
                      {user?.name.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center my-2">
                    <h2 className="text-lg">{user?.name}</h2>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-[5px] cursor-pointer">
                  <User />
                  <span>Profile</span>
                </DropdownMenuItem>
                <Link href={`${user?.role}/dashboard`}>
                  <DropdownMenuItem className="rounded-[5px] cursor-pointer">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="rounded-[5px] cursor-pointer">
                  <Store />
                  <span>My Shop</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="rounded-[5px] text-white bg-[#FF4D4F] cursor-pointer mt-2"
                >
                  <LogOut />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button className="cursor-pointer">Login</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );

  return (
    <header className="border-b bg-white">
      <div className="max-w-screen-xl px-4 lg:px-6 flex justify-between items-center mx-auto h-16 lg:h-20">
        <Link href="/" className="flex items-center">
          <span className="text-lg lg:text-xl font-bold">
            SecondHand Market
          </span>
        </Link>

        {/* Search Bar Centered for Desktop */}
        <div className="hidden lg:flex flex-grow justify-center max-w-lg items-center space-x-2 bg-white rounded border">
          <Select>
            <SelectTrigger className="border-none w-[75%] shadow-none">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="rounded-lg mt-1">
              <SelectGroup>
                <SelectItem value="foods">Foods</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="books">Books</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            type="text"
            placeholder="Search here anything"
            className="px-4 py-2 m-0 shadow-none border-none bg-white w-full rounded rounded-r-none focus:outline-none focus:ring-1 focus:ring-[#693AF8]"
          />
          <Button className="px-4 text-white rounded rounded-l-none transition cursor-pointer">
            <Search />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className="lg:hidden p-0 size-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={28} />
        </Button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-2">{navOptions}</nav>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-center space-y-3 p-4 bg-white shadow-md border-t">
          <div className="flex items-center space-x-2 w-full bg-white p-2 rounded-lg shadow-md">
            <Select>
              <SelectTrigger className="border-none w-[75%]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="rounded-lg mt-1">
                <SelectGroup>
                  <SelectItem value="foods">Foods</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Search here anything"
              className="px-4 py-2 border-none bg-white w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#693AF8]"
            />
            <Button className="px-4 py-2 text-white rounded-full transition">
              <Search />
            </Button>
          </div>
          {navOptions}
        </div>
      )}
    </header>
  );
};

export default Navbar;
