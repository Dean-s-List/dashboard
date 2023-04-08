import Link from "next/link";
import Image from "next/image";

import {
  SquaresPlusIcon,
  ArrowsUpDownIcon,
  CreditCardIcon,
  UserCircleIcon,
  PresentationChartLineIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";

import type { ReactNode } from "react";
import CTA from "../cta";

export const ContentContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="drawer-mobile drawer z-0">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {children}
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="text-white menu static mt-0 w-44 w-full bg-primary-dark lg:w-[14vw]">
          <Link href={"/"} className="ml-8 hidden lg:block">
            <Image
              src={"/images/logo-dl.png"}
              width={150}
              height={150}
              alt="Dean's List Logo"
            />
          </Link>

          <li className="ml-0 p-0 text-xs font-bold uppercase">
            <a className="active mx-[12px]">
              <SquaresPlusIcon className="h-6 w-6" />
              Project Hub
            </a>
          </li>
          <li tabIndex={0} className="ml-0 text-xs font-bold uppercase">
            <span className=" mx-[12px]">
              <ArrowsUpDownIcon className="h-6 w-6" />
              Feedback
            </span>
            <ul className="text-white mx-[12px]">
              <li>
                <a> Backpack</a>
              </li>
              <li>
                <a> Hawksight</a>
              </li>
              <li>
                <a> Zignaly</a>
              </li>
            </ul>
          </li>
          <li className="ml-0 text-xs font-bold uppercase">
            <a className="mx-[12px]">
              <CreditCardIcon className="h-6 w-6" /> Payments
            </a>
          </li>
          <li className="ml-0 text-xs font-bold uppercase">
            <a className="mx-[12px]">
              <UserCircleIcon className="h-6 w-6" />
              Profile
            </a>
          </li>
          <li className="ml-0 text-xs font-bold uppercase">
            <a className="mx-[12px]">
              <PresentationChartLineIcon className="h-6 w-6" />
              Reports
            </a>
          </li>
          <CTA />
          {/* SIDEBAR BOTTOM */}
          <ul className="menu absolute bottom-0 w-full">
            <li className="ml-0 p-0 text-xs font-bold uppercase">
              <a className="mx-[12px]">
                <Cog6ToothIcon className="h-6 w-6" />
                Settings
              </a>
            </li>
            <li className="ml-0 p-0 text-xs font-bold uppercase">
              <a className="mx-[12px]">
                <QuestionMarkCircleIcon className="h-6 w-6" />
                Support
              </a>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};
