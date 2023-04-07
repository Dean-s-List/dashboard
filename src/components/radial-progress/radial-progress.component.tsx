import { CategoryEnum } from "@/constants";
import type { FC, PropsWithChildren } from "react";

type RadialProgress = {
  category: CategoryEnum;
  value: number;
};

interface RadialProgressProps {
  rd: RadialProgress;
}

export const RadialProgress: FC<PropsWithChildren<RadialProgressProps>> = (
  children,
  rd: RadialProgress
): JSX.Element => {
  const { category, value } = rd;
  return (
    <div className="ml-[5%] flex h-[61.72px]">
      <div
        className={`radial-progress text-${
          category === CategoryEnum.UXUI
            ? "primary"
            : category === CategoryEnum.Docs
            ? "secondary"
            : category === CategoryEnum.Strategy
            ? "info"
            : category === CategoryEnum.Community
            ? "warning"
            : "white"
        } `}
        style={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          "--value": value,
          "--size": "3rem",
          "--thickness": "4px",
        }}
      >
        <div className="">
          <span className="text-white text-xs">{`${value}`}%</span>
        </div>
      </div>
    </div>
  );
};
