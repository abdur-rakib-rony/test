import { FC } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

interface Contact {
  name: string;
  avatar: string;
}

const contacts: Contact[] = [
  { name: "Mubashra Ansari", avatar: "/avatar.png" },
  { name: "Walija Ansari", avatar: "/avatar.png" },
  { name: "Esther Howard", avatar: "/avatar.png" },
  { name: "Brooklyn Simmons", avatar: "/avatar.png" },
  { name: "Leslie Alexander", avatar: "/avatar.png" },
  { name: "Aoun Haider", avatar: "/avatar.png" },
  { name: "Hafsa Ansari", avatar: "/avatar.png" },
  { name: "Hams Ahmed Ansari", avatar: "/avatar.png" },
  { name: "Rabia Ansari", avatar: "/avatar.png" },
];

const ContactSection: FC = () => {
  return (
    <div className="my-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold">Contacts</h3>
        <Search className="text-gray-400" size={15} />
      </div>

      <ul className="space-y-3 px-2">
        {contacts.map((contact, index) => (
          <li key={index} className="flex items-center">
            <Image
              width={30}
              height={30}
              src={contact.avatar}
              alt={contact.name}
              className="mr-3 rounded-full"
            />
            <span className="text-sm font-semibold">{contact.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactSection;
