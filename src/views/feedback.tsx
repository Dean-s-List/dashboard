import FeedbackTable from "@/components/tables/Feedback";
import type { FC } from "react";

const Feedback: FC = () => (
  <div className="w-full">
    <div className="w-full p-2 py-4 font-bold">New feedback received</div>
    <div className="w-[100%] justify-between rounded-xl bg-primary-dark py-2 shadow-lg">
      <FeedbackTable />
    </div>
  </div>
);

export default Feedback;
