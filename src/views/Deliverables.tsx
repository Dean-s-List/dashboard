import { drawSVGInfo } from "@/tools/svg";
import { Category } from "@/types";
import { useState } from "react";
import type { FC } from "react";

type Deliverable = {
  id: number;
  value: number;
  name: string;
  category: Category;
};

const deliverables: Deliverable[] = [
  {
    id: 1,
    value: 60,
    name: "Soladex Review",
    category: Category.BizStrat,
  },
  {
    id: 2,
    value: 43,
    name: "Feedback",
    category: Category.Docs,
  },
  {
    id: 3,
    value: 10,
    name: "Extended Feedback",
    category: Category.BizStrat,
  },
  {
    id: 4,
    value: 70,
    name: "AMA",
    category: Category.Community,
  },
];

const Deliverables: FC = () => {
  const [deliverable, setDeliverables] = useState(deliverables);
  return (
    <div className="mt-2 w-screen rounded-xl border-2 bg-[#0d0d0f] p-3 shadow-xl md:mr-4 md:w-auto">
      <span className="font-bold">Deliverables</span>
      <ul className="w-full">
        {deliverable.map(({ id, value, name, category }) => (
          <li className="ml-0 list-none" key={id}>
            <div className="flex flex h-[65.7px] w-full items-center justify-center rounded-xl border bg-[#282323]">
              <div className="ml-[5%] flex w-[25%]">
                <div
                  className={`radial-progress text-${
                    category === Category.UxUi
                      ? "primary"
                      : category === Category.Docs
                      ? "secondary"
                      : category === Category.BizStrat
                      ? "info"
                      : category === Category.Community
                      ? "warning"
                      : "white"
                  }`}
                  style={{
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    "--value": value,
                    "--size": "3rem",
                    "--thickness": "0.3rem",
                  }}
                >
                  <span className="text-xs text-white">{`${value}`}%</span>
                </div>
              </div>
              <div className="flex w-[50%] gap-4 text-center">
                <div className="w-full text-sm">{`${name}`}</div>
              </div>
              <div className="flex w-[25%] gap-4 text-center">
                <div className="flex w-full items-center justify-center">
                  {drawSVGInfo(6)}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Deliverables;
