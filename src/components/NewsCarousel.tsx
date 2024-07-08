import { FC } from "react";
import Image from "next/image";

const NewsCarousel: FC = () => {
  return (
    <div className="w-full">
      <div className="relative">
        <Image
          src="/canon.png"
          alt="Tank in Karabakh"
          width={300}
          height={300}
          className="h-[300px] w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white">
          <p className="text-xs text-gray-100">
            Karabakh humanitarian fears grow with thousands sleeping on
            Stepanakert streets
          </p>
        </div>
        <button className="absolute bottom-2 right-2 rounded bg-white px-1 text-xs text-[#2E20C7]">
          See More
        </button>
      </div>

      {/* Pagination dots */}
      <div className="mt-2 flex justify-center space-x-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-2 w-2 rounded-full bg-gray-300"></div>
        ))}
      </div>
    </div>
  );
};

export default NewsCarousel;
