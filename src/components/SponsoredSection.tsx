import { FC } from "react";
import Image from "next/image";

interface SponsoredItem {
  src: string;
  alt: string;
  title: string;
  url: string;
}

interface SponsoredSectionProps {
  padding: string;
  rounded: string;
}

const sponsoredItems: SponsoredItem[] = [
  {
    src: "/sponsored2.png",
    alt: "Sponsored image 2",
    title: "আপনার অফিসের লাঞ্চ",
    url: "homefectionery.com",
  },
  {
    src: "/sponsored1.png",
    alt: "Sponsored image 1",
    title: "SEMrush এর সাথে Ubersuggest",
    url: "https://groupbuyservices.",
  },
];

const SponsoredSection: FC<SponsoredSectionProps> = ({ padding, rounded }) => {
  return (
    <div
      className={`mt-2 p-${padding} rounded-${rounded} hidden bg-white md:block`}
    >
      <h3 className="mb-4 mt-2 text-sm font-medium">Sponsored</h3>
      {sponsoredItems.map((item, index) => (
        <div key={index} className="mb-4 flex items-center gap-2">
          <Image
            src={item.src}
            alt={item.alt}
            width={100}
            height={100}
            className="h-16 w-16 rounded-md object-cover"
          />
          <div>
            <p className="text-[12px]">{item.title}</p>
            <p className="text-[10px] text-[#9FA2A6]">{item.url}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SponsoredSection;
