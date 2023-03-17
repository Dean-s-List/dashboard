import type { FC } from "react";

const servicePackage = {
  name: "",
  price: 2500,
};

const Header: FC = () => (
  <div className="container flex w-[100%] items-center justify-center space-x-4 text-left">
    {/* PANEL LEFT */}
    <div className="h-[200px] w-[50%] rounded-xl border-2 bg-[#0d0d0f] shadow-xl">
      <div className="m-3 font-bold text-stone-600">SERVICE PACKAGE</div>
      <div className="m-3 mt-8 text-xl font-bold">The Main Event</div>
      <div className="m-3 mt-8 text-xl font-bold text-stone-600">$2,500</div>
    </div>
    {/* PANEL RIGHT */}
    <div className="h-[200px] w-[50%] rounded-xl border-2 bg-[#0d0d0f] shadow-xl">
      <div className="m-3 font-bold text-stone-600">FEEDBACK PROJECT</div>
      <div className="m-3 mt-8 text-xl font-bold">Backpack</div>
      <div className="m-3 mt-8 flex items-center text-xl font-bold text-stone-600">
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
  </div>
);

export default Header;
