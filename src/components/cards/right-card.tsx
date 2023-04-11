import { ClockIcon } from "@heroicons/react/24/solid";
import type { FC } from "react";

const RightCard: FC = () => (
  <div className="h-[232px] rounded-xl bg-primary-dark shadow-xl md:w-[379px] lg:w-[45%]">
    <div className="text-stone-600 m-3 font-bold">FEEDBACK PROJECT</div>
    <div className="m-3 mt-8 text-xl font-bold">Backpack</div>
    <div className="text-stone-600 m-3 mt-8 flex items-center text-xl font-bold">
      Ongoing{" "}
      <span className="ml-2">
        <ClockIcon className="h-6 w-6" />
      </span>
    </div>
  </div>
);

export default RightCard;
