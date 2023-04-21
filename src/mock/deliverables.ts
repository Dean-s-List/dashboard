import type { DeliverableItem } from "@/types";
import { CategoryEnum } from "@/constants";

export const _DELIVERABLES_: DeliverableItem[] = [
  {
    id: 1,
    value: 60,
    name: "Soladex Review",
    due_date: "02/04/2023",
    category: CategoryEnum.Strategy,
  },
  {
    id: 2,
    value: 43,
    name: "Feedback",
    due_date: "02/04/2023",
    category: CategoryEnum.Docs,
  },
  {
    id: 3,
    value: 10,
    name: "Extended Feedback",
    due_date: "02/04/2023",
    category: CategoryEnum.Strategy,
  },
  {
    id: 4,
    value: 70,
    name: "AMA",
    due_date: "02/04/2023",
    category: CategoryEnum.Community,
  },
];
