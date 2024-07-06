import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const PagesMayKnow: FC = () => {
  return (
    <div className="mt-2 hidden rounded-md bg-white p-2 md:block">
      <div className="flex items-center justify-between">
        <h3 className="mb-4 mt-2 text-sm font-bold">Pages You May Know</h3>
        <Link href="#" className="mb-1 text-[12px] font-medium text-[#307777]">
          See All
        </Link>
      </div>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/avatar.png"
              alt="James Rodigan"
              width={40}
              height={40}
              className="mr-2 h-10 w-10 rounded-full"
            />
            <div>
              <p className="text-sm font-bold">Angelina Anika</p>
              <p className="text-[10px] text-[#307777]">6 Friends in Common</p>
            </div>
          </div>
          <Image src="/addfriend.png" alt="Add Friend" width={24} height={24} />
        </div>
      ))}
    </div>
  );
};

export default PagesMayKnow;
