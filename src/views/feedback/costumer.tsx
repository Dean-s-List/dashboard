import Cards from "@/components/cards";
import FeedbackTable from "@/components/tables/Feedback";
import PaymentTable from "@/components/tables/Payments";
import Deliverable from "@/components/deliverable";
import TeamMember from "@/components/team-member/team-member.component";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import type { Deliverables, Profiles, Team } from "@/types";
import type { FC, SetStateAction } from "react";
import React from "react";

interface Props {
  deliverables: Deliverables[] | null;
  setDeliverables: React.Dispatch<SetStateAction<Deliverables[] | null>>;
}

export const CostumerFeedback: FC<Props> = ({
  deliverables,
  setDeliverables,
}) => (
  <div className="mx-auto flex w-[100%] bg-primary-darker p-4 pr-4 md:p-8 md:pr-4">
    <div className="border-full top-0 flex w-full flex-col items-center">
      <Cards />
      <div className="w-full">
        <div className="w-full p-2 py-4 font-bold">New feedback received</div>
        <div className="w-[100%] justify-between rounded-xl bg-primary-dark py-2 shadow-lg">
          <FeedbackTable />
        </div>
      </div>
      <div className="max-w-screen flex md:hidden">
        <div className="md:max-w-[20vw]-xl hidden bg-primary-darker  md:flex md:min-h-[80vh] md:w-[25vw] md:flex-col">
          <div className="mx-auto mt-8 flex flex-col items-center justify-center rounded-xl bg-primary-dark p-4 shadow-xl md:mr-8 md:w-[379px]">
            <span className="font-bold">Deliverables</span>
            <ul className="w-full">
              {deliverables && setDeliverables ? (
                deliverables.map((deliverable: Deliverables) => {
                  return (
                    <Deliverable
                      deliverable={deliverable}
                      deliverables={deliverables}
                      setDeliverables={setDeliverables}
                      key={deliverable.id}
                    />
                  );
                })
              ) : (
                <span>Woops ! Something went wrong..</span>
              )}
            </ul>
          </div>
          <div className="mx-auto mx-[auto] mt-8 flex flex-col items-center justify-center rounded-xl bg-primary-dark p-4 shadow-xl md:mr-8 md:w-[379px]">
            <div className="flex font-bold">
              Team Members{" "}
              <span className="pl-3">
                <InformationCircleIcon className="h-6 w-6" />
              </span>
            </div>
            <ul className="w-full">
              {/* {team &&
                team.map((member: Profiles) => (
                  <li className="ml-0 list-none" key={member.id}>
                    <TeamMember member={member} />
                  </li>
                ))} */}
            </ul>
          </div>
        </div>
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
