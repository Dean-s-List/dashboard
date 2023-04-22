import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import {
  SquaresPlusIcon,
  ArrowsUpDownIcon,
  CreditCardIcon,
  UserCircleIcon,
  PresentationChartLineIcon,
  Cog6ToothIcon,
  ClockIcon,
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  BugAntIcon,
} from "@heroicons/react/24/solid";

import { UserContext } from "@/contexts/user.context";
import CTA from "@/components/cta";
import Admin from "@/components/admin/admin.component";

import type { ReactNode } from "react";
import type { Projects } from "@/types";
import type { FC, PropsWithChildren } from "react";

interface Props {
  children: ReactNode;
  projects: Projects[] | null;
}

export const ContentContainer: FC<PropsWithChildren<Props>> = ({
  children,
  projects,
}: {
  children: ReactNode;
  projects: Projects[] | null;
}) => {
  const { currentUser, isAdmin } = useContext(UserContext);
  // console.log(currentUser);
  const router = useRouter();
  return (
    <div className="drawer-mobile drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex max-w-[100%] flex-col items-center justify-center overflow-x-hidden">
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="text-white menu static mt-0 w-44 w-full max-w-[100%] bg-primary-dark lg:w-[14vw]">
          <Link href={"/"} className="ml-8 hidden lg:block">
            <Image
              src={"/images/logo-dl.png"}
              width={150}
              height={150}
              alt="Dean's List Logo"
            />
          </Link>
          {currentUser?.account_enum == 0 && (
            <>
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
            </>
          )}

          {currentUser?.account_enum == 1 && (
            <>
              <li className="ml-0 p-0 text-xs font-bold uppercase">
                <Link
                  href="/"
                  className={`mx-[12px] ${
                    router.pathname == "/" ? "active" : ""
                  }`}
                >
                  <SquaresPlusIcon className="h-6 w-6" />
                  Dashboard
                </Link>
              </li>
              <li tabIndex={0} className="ml-0 text-xs font-bold uppercase">
                <Link
                  href="/feedback"
                  className={`mx-[12px] ${
                    router.pathname == "/feedback" ? "active" : ""
                  }`}
                >
                  <HeartIcon className="h-6 w-6" />
                  Feedback Focus
                </Link>
              </li>
              {/* <li className="ml-0 text-xs font-bold uppercase">
                <a className="mx-[12px]">
                  <ClockIcon className="h-6 w-6" /> History
                </a>
              </li> */}
              <li className="ml-0 text-xs font-bold uppercase">
                <Link
                  href="/my-feedbacks"
                  className={`mx-[12px] ${
                    router.pathname == "/my-feedbacks" ? "active" : ""
                  }`}
                >
                  <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
                  My Feedbacks
                </Link>
              </li>
              <li className="ml-0 p-0 text-xs font-bold uppercase">
                <Link
                  href="/profile"
                  className={`mx-[12px] ${
                    router.pathname == "/profile" ? "active" : ""
                  }`}
                >
                  <UserCircleIcon className="h-6 w-6" />
                  Profile
                </Link>
              </li>
            </>
          )}
          {currentUser?.account_enum == 0 && <CTA />}
          {isAdmin && <Admin projects={projects!} />}

          {/* SIDEBAR BOTTOM */}
          <ul className="menu absolute bottom-0 w-full">
            {currentUser && (
              <li className="ml-0 p-0 text-xs font-bold uppercase">
                <a className="mx-[12px]">
                  <Cog6ToothIcon className="h-6 w-6" />
                  Settings
                </a>
              </li>
            )}
            <li className="ml-0 p-0 text-xs font-bold uppercase">
              <Link
                href="https://github.com/Deans-List/dashboard/issues/new"
                target="_blank"
                className="mx-[12px]"
              >
                <BugAntIcon className="h-6 w-6" />
                Bug Report
              </Link>
            </li>
            {/* <li className="ml-0 p-0 text-xs font-bold uppercase">
              <a className="mx-[12px]">
                <QuestionMarkCircleIcon className="h-6 w-6" />
                Support
              </a>
            </li> */}
          </ul>
        </ul>
      </div>
    </div>
  );
};
