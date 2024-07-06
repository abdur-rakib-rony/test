import { FC } from "react";
import { Plus, Search } from "lucide-react";
import Image from "next/image";

interface Group {
  name: string;
  avatar: string | null;
}

const groups: Group[] = [
  { name: "3 Idiots", avatar: "/avatar.png" },
  { name: "NZS Batch 16", avatar: "/avatar.png" },
  { name: "Developers Conversation", avatar: "/avatar.png" },
  { name: "Create new group", avatar: null },
];

const GroupConversation: FC = () => {
  return (
    <div className="mt-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold">Group conversations</h3>
        <Search className="text-gray-400" size={15} />
      </div>

      <ul className="space-y-3 px-2">
        {groups.map((group, index) => (
          <li key={index} className="flex items-center">
            {group.avatar ? (
              <Image
                src={group.avatar}
                alt={group.name}
                width={30}
                height={30}
                className="mr-3 rounded-full"
              />
            ) : (
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#307777]">
                <Plus color="#fff" size={16} />
              </div>
            )}
            <span
              className={`text-sm font-semibold ${group.avatar ? "" : "text-[#307777]"}`}
            >
              {group.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupConversation;
