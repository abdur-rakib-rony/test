import { FC } from "react";
import SponsoredSection from "./SponsoredSection";
import NewsCarousel from "./NewsCarousel";
import PagesMightLike from "./PagesMightLike";
import PagesMayKnow from "./PagesMayKnow";

const GroupPages: FC = () => {
  return (
    <div className="scrollbar-hide hidden h-[calc(100vh-4rem)] overflow-hidden overflow-y-auto rounded-md bg-white p-2.5 lg:block lg:w-[18%] lg:min-w-[200px]">
      <NewsCarousel />
      <PagesMightLike />
      <PagesMayKnow />
      <SponsoredSection />
    </div>
  );
};

export default GroupPages;
