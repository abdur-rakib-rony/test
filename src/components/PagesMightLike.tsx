import { FC } from "react";
import Image from "next/image";

const PagesMightLike: FC = () => {
  return (
    <div className="mt-4">
      <h3 className="mb-4 mt-2 text-center text-sm font-bold">
        Pages You Might Like
      </h3>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="mb-4 flex items-center justify-between">
          <Image
            src="/avatar2.png"
            alt="James Rodigan"
            width={40}
            height={40}
            className="mr-2 h-10 w-10 rounded-full border"
          />
          <div>
            <p className="text-sm font-bold">Angelina Super</p>
            <p className="text-[10px] text-[#307777]">Fashion Brand</p>
          </div>
          <button className="ml-auto rounded bg-[#307777] px-3 py-1 text-[12px] text-white">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default PagesMightLike;
