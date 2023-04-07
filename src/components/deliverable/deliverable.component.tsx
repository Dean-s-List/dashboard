import { RadialProgress } from "@/components/radial-progress/radial-progress.component";
import { drawSVGInfo } from "@/tools/svg";
import type { FC, PropsWithChildren } from "react";
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
  return (
    <>
      <RadialProgress rd={rd} />
      <div className="flex flex w-[100%] flex-col justify-center text-center">
        <div className="text-md w-full font-bold">{`${name}`}</div>
        <div className="w-full text-xs">{`${date}`}</div>
      </div>
      <div className="flex w-[25%] gap-4 pr-2 text-center">
        <div className="flex w-full items-center justify-center">
          {drawSVGInfo(6)}
        </div>
      </div>
      {children}
    </>
  );
};
