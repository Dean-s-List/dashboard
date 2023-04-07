import Cards from "@/components/cards";
import Feedback from "./feedback";
import PaymentTable from "@/components/tables/Payments";
import RightPanel from "./panel";

import type { FC } from "react";

const Main: FC = () => (
  <div className="mx-auto flex w-[100%] bg-primary-darker p-4 pr-4 md:p-8 md:pr-4">
    <div className="border-full top-0 flex w-full flex-col items-center">
      <Cards />
      <Feedback />
      <div className="max-w-screen flex md:hidden">
        <RightPanel />
      </div>
      <div className="w-full">
        <div className="w-full p-2 py-4 font-bold">Payment History</div>
        <div className="w-[100%] justify-between ">
          <PaymentTable />
        </div>
      </div>
    </div>
  </div>
);

export default Main;
