import { ChevronDown, Plus, Search, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden h-[69px] items-center justify-between border-b border-gray-200 bg-white px-4 shadow-md md:flex">
        <div className="flex items-center gap-7">
          <Link href="/home">
            <Image src="/qp.png" alt="Web Logo" width={45} height={45} />
          </Link>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="h-10 w-64 rounded-full bg-[#F0F2F5] py-1 pl-8 pr-2 text-sm outline-none placeholder:text-black"
            />
            <Image
              src="/search.png"
              alt="search logo"
              width={15}
              height={15}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 transform text-gray-400"
            />
          </div>
        </div>
        <nav className="flex items-center space-x-2">
          <Link href="/" className="relative flex w-16 flex-col items-center">
            <Image src="/home.png" alt="home logo" width={25} height={25} />
            <div className="absolute bottom-[-22px] h-[3px] w-16 bg-[#307777]"></div>
          </Link>
          <Link href="/" className="flex w-16 justify-center">
            <Image src="/cookie.png" alt="cookie logo" width={25} height={25} />
          </Link>
          <Link href="/" className="flex w-16 justify-center">
            <Image src="/people.png" alt="people logo" width={25} height={25} />
          </Link>
          <Link href="/" className="flex w-16 justify-center">
            <Image
              src="/bookmark.png"
              alt="bookmark logo"
              width={25}
              height={25}
            />
          </Link>
          <Link href="/" className="relative flex w-16 justify-center">
            <Image src="/cart.png" alt="cart logo" width={25} height={25} />
            <span className="absolute -top-1.5 right-3 flex h-4 w-4 items-center justify-center rounded-full bg-[#0B3243] text-[10px] text-white">
              3
            </span>
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <Link
            href="/"
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#E4E4E4]"
          >
            <Image
              src="/messenger.png"
              alt="messenger logo"
              width={18}
              height={18}
            />
          </Link>
          <Link
            href="/"
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#E4E4E4]"
          >
            <Image
              src="/notification.png"
              alt="notification logo"
              width={14}
              height={14}
            />
          </Link>
          <div className="relative">
            <Image
              src="/header_avatar.png"
              alt="avatar logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <ChevronDown
              size={14}
              className="absolute bottom-0 right-0 rounded-full bg-[#D9D9D9] p-[2px] text-[#307777]"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex h-[50px] items-center justify-between border-b border-gray-200 bg-white px-2 shadow-md md:hidden">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/qp.png" alt="Web Logo" width={32} height={32} />
          </Link>
        </div>

        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-[#307777]">
            <Image src="/home.png" alt="home logo" width={20} height={20} />
          </Link>
          <Link href="/">
            <Image src="/cookie.png" alt="cookie logo" width={20} height={20} />
          </Link>
          <Link href="/">
            <Image src="/people.png" alt="people logo" width={20} height={20} />
          </Link>
          <Link href="/" className="relative">
            <Image src="/cart.png" alt="cart logo" width={20} height={20} />
            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0B3243] text-[10px] text-white">
              3
            </span>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button>
            <Plus size={20} />
          </button>
          <button>
            <Search size={20} />
          </button>
          <button>
            <MessageCircle size={20} />
          </button>
          <button className="relative">
            <Image
              src="/header_avatar.png"
              alt="avatar logo"
              width={24}
              height={24}
              className="rounded-full"
            />
            <ChevronDown
              size={12}
              className="absolute bottom-0 right-0 rounded-full bg-[#D9D9D9] p-[1px] text-[#307777]"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
