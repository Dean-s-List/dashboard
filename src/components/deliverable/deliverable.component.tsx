import type { FC, PropsWithChildren } from "react";
import { RadialProgress } from "@/components/radial-progress/radial-progress.component";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { radialColors } from "@/tools/core/colors";
import type { CategoryEnum } from "@/constants";

type DeliverableItem = {
  id: number;
  value: number;
  name: string;
  date: string;
  category: CategoryEnum;
};

interface DeliverableProps {
  deliverable: DeliverableItem;
}

export const Deliverable: FC<PropsWithChildren<DeliverableProps>> = ({
  children,
  deliverable,
}): JSX.Element => {
  const { id, value, name, date, category } = deliverable;
  const rd = { value, category };
  const { trackColor, indicatorColor } = radialColors(rd.category);

  return (
    <>
      <RadialProgress
        trackColor={trackColor}
        indicatorColor={indicatorColor}
        indicatorCap=""
        labelColor=""
        progress={value}
        spinnerMode={false}
        spinnerSpeed={0}
      />
      <div className="flex flex w-[100%] flex-col justify-center text-center">
        <div className="text-md w-full font-bold">{`${name}`}</div>
        <div className="w-full text-xs">{`${date}`}</div>
      </div>
      <div className="flex w-[25%] gap-4 pr-2 text-center">
        <div className="flex w-full items-center justify-center">
          <InformationCircleIcon className="h-6 w-6" />
        </div>
      </div>
      {children}
    </>
  );
};
