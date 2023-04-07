import { FC } from "react";

const RightCard: FC = () => (
  <div className="h-[232px] rounded-xl bg-primary-dark shadow-xl md:w-[379px] lg:w-[45%]">
    <div className="text-stone-600 m-3 font-bold">FEEDBACK PROJECT</div>
    <div className="m-3 mt-8 text-xl font-bold">Backpack</div>
    <div className="text-stone-600 m-3 mt-8 flex items-center text-xl font-bold">
      Ongoing{" "}
      <span className="ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
    </div>
  </div>
);

export default RightCard;
