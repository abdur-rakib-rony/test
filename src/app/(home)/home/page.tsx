import { FC } from "react";
import FriendRequests from "@/components/FriendRequests";
import BirthdaySection from "@/components/BirthdaySection";
import ContactSection from "@/components/ContactSection";
import GroupConversation from "@/components/GroupConversation";
import SponsoredSection from "@/components/SponsoredSection";
import GroupPages from "@/components/GroupPages";
import MainSection from "@/components/main/MainSection";
import Sidebar from "@/components/Sidebar";

const HomePage: FC = () => {
  return (
    <div className="mt-2.5 flex flex-grow gap-4">
      <Sidebar />
      <GroupPages />
      <MainSection />
      <div className="scrollbar-hide hidden h-[calc(100vh-4rem)] overflow-y-auto rounded-md bg-white p-2.5 lg:block lg:w-1/5 lg:min-w-[250px]">
        <SponsoredSection />
        <hr />
        <FriendRequests />
        <hr />
        <BirthdaySection />
        <hr />
        <ContactSection />
        <hr />
        <GroupConversation />
      </div>
    </div>
  );
};

export default HomePage;
