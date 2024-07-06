import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Users,
  CircleUser,
  FileText,
  Bookmark,
  Wallet,
  ShoppingBag,
  Store,
  ShoppingCart,
} from "lucide-react";

interface NavItem {
  name: string;
  icon: JSX.Element;
}

const navItems: NavItem[] = [
  { name: "Explore", icon: <Compass size={20} color="#307777" /> },
  { name: "Friends", icon: <Users size={20} color="#307777" /> },
  { name: "Groups", icon: <CircleUser size={20} color="#307777" /> },
  { name: "Pages", icon: <FileText size={20} color="#307777" /> },
  { name: "Bookmarks", icon: <Bookmark size={20} color="#307777" /> },
  { name: "Wallet", icon: <Wallet size={20} color="#307777" /> },
  { name: "Market Place", icon: <ShoppingBag size={20} color="#307777" /> },
  { name: "Seller Panel", icon: <Store size={20} color="#307777" /> },
  { name: "Buyer Panel", icon: <ShoppingCart size={20} color="#307777" /> },
];

const Sidebar: FC = () => {
  return (
    <div className="hidden min-w-[235px] bg-white p-4 md:block">
      <div className="mb-4 hidden items-center gap-2 lg:flex">
        <Image
          src="/sidebar_avatar.png"
          alt="James Rodigan"
          width={30}
          height={30}
          className="rounded-full"
        />
        <h2 className="font-medium">James Rodigan</h2>
      </div>
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href="#"
            className="flex items-center gap-4 py-2.5 hover:text-[#307777]"
          >
            {item.icon}
            <span className="text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
