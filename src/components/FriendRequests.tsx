import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface FriendRequestProps {
  name: string;
  time: string;
}

const FriendRequest: FC<FriendRequestProps> = ({ name, time }) => (
  <div className="flex items-center gap-4">
    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
      <Image
        src="/avatar.png"
        alt={name}
        width={64}
        height={64}
        className="h-full w-full rounded-full object-contain"
      />
    </div>
    <div className="flex w-full flex-col items-center gap-2">
      <div className="flex w-full items-center justify-between">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs font-medium text-[#307777]">{time}</p>
      </div>
      <div className="flex w-full items-center gap-2">
        <button className="w-full rounded-md bg-[#307777] px-3 py-1 text-sm text-white">
          Confirm
        </button>
        <button className="w-full rounded-md bg-black px-3 py-1 text-sm text-white">
          Delete
        </button>
      </div>
    </div>
  </div>
);

const FriendRequests: FC = () => {
  const requests = [
    { name: "Harmain Shakeel", time: "2h." },
    { name: "Wade Warren", time: "2h." },
    { name: "Cameron Williamson", time: "2h." },
  ];

  return (
    <div className="my-4 w-64">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Friend requests</h3>
        <Link href="#" className="text-sm font-medium text-[#307777]">
          See all
        </Link>
      </div>
      <div className="space-y-4">
        {requests.map((request, index) => (
          <FriendRequest key={index} name={request.name} time={request.time} />
        ))}
      </div>
    </div>
  );
};

export default FriendRequests;
