import { FC } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

const stories = [
  { src: "/chanchal.jpg", name: "Vish Patil" },
  { src: "/chanchal.jpg", name: "Rakesh Shetty" },
  { src: "/chanchal.jpg", name: "Akash Boire" },
  { src: "/chanchal.jpg", name: "Akash Boire" },
  { src: "/chanchal.jpg", name: "Akash Boire" },
  { src: "/chanchal.jpg", name: "Akash Boire" },
];

const Stories: FC = () => {
  return (
    <div className="mx-auto max-w-lg">
      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-full"
      >
        <CarouselContent>
          <CarouselItem className="basis-1/3">
            <div className="relative h-48 w-36 overflow-hidden rounded-lg">
              <Image
                src="/chanchal.jpg"
                alt="Add story"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <Link
                href="/home"
                className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform flex-col items-center"
              >
                <div className="rounded-xl bg-teal-600 p-2">
                  <Plus className="text-white" size={30} />
                </div>
              </Link>
            </div>
          </CarouselItem>
          {stories.map((story, index) => (
            <CarouselItem key={index} className="basis-1/3">
              <div className="relative h-48 w-36 md:w-40">
                <Image
                  src={story.src}
                  alt={story.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute bottom-2 left-1/2 flex w-full -translate-x-1/2 transform flex-col items-center">
                  <div className="relative inline-block">
                    <Image
                      src="/chanchal.jpg"
                      alt="User"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full border"
                    />
                  </div>
                  <p className="mt-1 w-full text-center text-xs text-white">
                    {story.name.length > 15
                      ? `${story.name.slice(0, 15)}...`
                      : story.name}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 transform" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 transform" />
      </Carousel>
    </div>
  );
};

export default Stories;
