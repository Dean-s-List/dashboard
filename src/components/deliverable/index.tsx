import React from "react";
import { radialColors } from "@/tools/core/colors";
import DeliverableTitle from "./deliverable.title";
import DeliverableValue from "./deliverable.value";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import type { Deliverables } from "@/types";
import type { FC } from "react";

interface Props {
  deliverable: Deliverables;
  deliverables: Deliverables[];
  setDeliverables: React.Dispatch<React.SetStateAction<Deliverables[] | null>>;
}

const Deliverable: FC<Props> = ({
  deliverable,
  deliverables,
  setDeliverables,
}): JSX.Element => {
  const { value, due_date, category } = deliverable;
  const { trackColor, indicatorColor } = radialColors(category);
  return (
    <div className="mx-auto mt-1 flex flex h-[92px] w-[331px] max-w-[331px] list-none items-center justify-center rounded-xl border border-primary bg-primary-darker shadow-md">
      <DeliverableValue
        trackColor={indicatorColor}
        indicatorColor={trackColor}
        indicatorCap=""
        labelColor=""
        progress={value}
        spinnerMode={false}
        spinnerSpeed={0}
      />
      <div className="flex flex w-[100%] flex-col justify-center text-center text-[#fff]">
        <DeliverableTitle
          deliverable={deliverable}
          deliverables={deliverables}
          setDeliverables={setDeliverables}
        />
        <div className="w-full text-xs">{`${due_date}`}</div>
      </div>
      <div className="flex w-[25%] gap-4 pr-2 text-center text-[#fff]">
        <div className="flex w-full cursor-pointer items-center justify-center">
          <InformationCircleIcon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default Deliverable;
