import { drawSVGInfo } from "@/tools/svg";
import { Category } from "@/types";
import { useState } from "react";
import type { FC } from "react";

type Deliverable = {
  id: number;
  value: number;
  name: string;
  date: string,
  category: Category;
};

const deliverables: Deliverable[] = [
  {
    id: 1,
    value: 60,
    name: "Soladex Review",
    date: "02/04/2023",
    category: Category.BizStrat,
  },
  {
    id: 2,
    value: 43,
    name: "Feedback",
    date: "02/04/2023",
    category: Category.Docs,
  },
  {
    id: 3,
    value: 10,
    name: "Extended Feedback",
    date: "02/04/2023",
    category: Category.BizStrat,
  },
  {
    id: 4,
    value: 70,
    name: "AMA",
    date: "02/04/2023",
    category: Category.Community,
  },
];

const Deliverables: FC = () => {
  const [deliverable, setDeliverables] = useState(deliverables);
  return (
    <div className="mt-8 w-screen rounded-xl bg-primary-dark p-4 shadow-xl md:mr-8 md:w-auto">
      <span className="font-bold">Deliverables</span>
      <ul className="w-full">
        {deliverable.map(({ id, value, name, date, category }) => (
          <li className="ml-0 list-none" key={id}>
            <div className="flex flex h-[65.7px] w-full items-center justify-center rounded-xl bg-primary-darker shadow-md">
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
                  } `}
                  style={{
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    "--value": value,
                    "--size": "3rem",
                    "--thickness": "0.3rem",
                  }}
                >
                  <div className="">                    
                    <span className="text-xs text-white">{`${value}`}%</span>
                  </div>
                </div>
              </div>
              <div className="flex w-[100%] text-center flex flex-col justify-center">
                <div className="w-full text-sm">{`${name}`}</div>
                <div className="w-full text-xs">{`${date}`}</div>
              </div>
              <div className="flex w-[25%] gap-4 text-center pr-2">
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
