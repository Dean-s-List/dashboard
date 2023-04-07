import type { FC } from "react";

const LeftCard: FC = () => (
  <div className="h-[232px] rounded-xl bg-primary-dark shadow-xl md:w-[379px] lg:w-[45%]">
    <div className="text-stone-600 m-3 font-bold">SERVICE PACKAGE</div>
    <div className="m-3 mt-8 text-xl font-bold">The Main Event</div>
    <div className="text-stone-600 m-3 mt-8 text-xl font-bold">$2,500</div>
  </div>
);

export default LeftCard;
