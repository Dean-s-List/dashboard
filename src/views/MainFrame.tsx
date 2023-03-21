import Header from "./Header";
import FeedbackTable from "@/components/tables/Feedback";
import PaymentTable from "@/components/tables/Payments";
import type { FC } from "react";
import RightPanel from "./RightPanel";

const MainFrame: FC = () => (
  <div className="maw-w-[75vw] bg-primary-darker mx-auto flex w-[100%] md:p-8 p-4 pr-4">
    <div className="border-full top-0 flex w-full flex-col items-center">
      <Header />

      <div className="w-full">
        <div className="w-full p-2 font-bold py-4">New feedback received</div>
        <div className="w-[100%] justify-between rounded-xl bg-primary-dark py-2 shadow-lg">
          <FeedbackTable />
        </div>
      </div>
      <div className="max-w-screen flex md:hidden">
        <RightPanel />
      </div>
      <div className="w-full">
        <div className="w-full p-2 font-bold py-4">Payment History</div>
        <div className="w-[100%] justify-between ">
          <PaymentTable />
        </div>
      </div>
    </div>
  </div>
);

export default MainFrame;
