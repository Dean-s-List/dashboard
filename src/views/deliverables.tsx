import { useState } from "react";

import { Deliverable } from "@/components/deliverable/deliverable.component";

import type { FC } from "react";
import type { DeliverableItem } from "@/types";

import { _DELIVERABLES_ } from "@/mock/deliverables";

const DeliverablesView: FC = () => {
  const [deliverables, setDeliverables] = useState(_DELIVERABLES_);
  return (
    <div className="mx-auto mt-8 flex flex-col items-center justify-center rounded-xl bg-primary-dark p-4 shadow-xl md:mr-8 md:w-[379px]">
      <span className="font-bold">Deliverables</span>
      <ul className="w-full">
        {deliverables.map((deliverable: DeliverableItem) => {
          return (
            <li
              className="mx-auto flex flex h-[92px] w-full max-w-[331px] list-none items-center justify-center rounded-xl bg-primary-darker shadow-md"
              key={deliverable.id}
            >
              <Deliverable deliverable={deliverable} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DeliverablesView;
