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
    <div className="flex min-h-screen flex-col lg:flex-row">
      <Sidebar />
      <GroupPages />
      <MainSection />
      <div className="mt-4 w-full rounded-md bg-white p-2.5 lg:mt-2 lg:w-72  hidden md:block">
        <SponsoredSection padding="0" rounded="none" />
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
