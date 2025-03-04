import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/icons/logo.svg';
import facebookSvg from '@/assets/icons/facebook.svg';
import instagramSvg from '@/assets/icons/Instagram.svg';
import xSvg from '@/assets/icons/x.svg';

const Footer = () => {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/products', label: 'App Products' },
    { href: '/about', label: 'About Us' },
    { href: '/testimonial', label: 'Testimonial' },
    { href: '/blogs', label: 'Blogs' },
    { href: '/contact', label: 'Contact Us' },
  ];

  const socialLinks = [
    { href: '#', icon: facebookSvg },
    { href: '#', icon: instagramSvg },
    { href: '#', icon: xSvg },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 py-24">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center">
            <span className="text-lg lg:text-xl font-bold">
              SecondHand Market<span className="text-[#693AF8]">.</span>
            </span>
          </div>
          <p className="text-gray-600 mt-3 text-base lg:w-1/2">
            Save big this Black Friday with unbeatable deals on tech, home
            essentials, fashion, and more! Limited stock.
          </p>
        </div>

        <hr />
        <ul className="lg:flex justify-center items-center lg:space-x-6 text-sm text-gray-800 font-medium my-4">
          {navLinks.map((link) => (
            <li key={link.href} className="mb-3">
              <Link href={link.href} className="hover:text-purple-600 mb-5">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-center space-x-4">
          {socialLinks.map(({ href, icon }, index) => (
            <Link
              href={href}
              key={index}
              className="text-gray-600 hover:text-purple-600"
            >
              <Image src={icon} alt="Social icon" className="w-6 h-6" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
