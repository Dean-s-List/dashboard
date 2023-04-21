import type { FC, PropsWithChildren } from "react";
import { RadialProgress } from "@/components/radial-progress/radial-progress.component";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { radialColors } from "@/tools/core/colors";
import { Deliverables } from "@/types";

interface DeliverableProps {
  deliverable: Deliverables;
}

export const Deliverable: FC<PropsWithChildren<DeliverableProps>> = ({
  children,
  deliverable,
}): JSX.Element => {
  const { id, value, name, due_date, category } = deliverable;
  const { trackColor, indicatorColor } = radialColors(category);
  return (
    <div className="mx-auto mt-1 flex flex h-[92px] w-full max-w-[331px] list-none items-center justify-center rounded-xl bg-primary-darker shadow-md">
      <RadialProgress
        trackColor={trackColor}
        indicatorColor={indicatorColor}
        indicatorCap=""
        labelColor=""
        progress={value}
        spinnerMode={false}
        spinnerSpeed={0}
      />
      <div className="flex flex w-[100%] flex-col justify-center text-center text-[#fff]">
        <div className="text-md w-full font-bold">{`${name}`}</div>
        <div className="w-full text-xs">{`${due_date}`}</div>
      </div>
      <div className="flex w-[25%] gap-4 pr-2 text-center text-[#fff]">
        <div className="flex w-full items-center justify-center">
          <InformationCircleIcon className="h-6 w-6" />
        </div>
      </div>
      {children}
    </div>
  );
};
