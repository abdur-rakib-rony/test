import { FC } from "react";
import SponsoredSection from "./SponsoredSection";
import NewsCarousel from "./NewsCarousel";
import PagesMightLike from "./PagesMightLike";
import PagesMayKnow from "./PagesMayKnow";

const GroupPages: FC = () => {
  return (
    <div className="mt-4 w-full rounded-md lg:ml-2 lg:mt-2 lg:w-64">
      <div className="overflow-hidden rounded-md">
        <NewsCarousel />
        <PagesMightLike />
        <PagesMayKnow />
        <SponsoredSection padding="2" rounded="md" />
      </div>
    </div>
  );
};

export default GroupPages;
