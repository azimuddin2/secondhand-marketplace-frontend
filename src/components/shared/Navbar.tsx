'use client';

import { Button } from '../ui/button';
import { Heart, Search, ShoppingCart, Menu } from 'lucide-react';
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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <Link href="/login">
          <Button className="rounded cursor-pointer">Login</Button>
        </Link>
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
