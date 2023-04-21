import { CategoryEnum } from "@/constants";
import type { FC } from "react";

interface Props {
  category: CategoryEnum;
}

export const Badge: FC<Props> = ({ category }) => (
  <div
    className={`badge badge-md w-[100%] rounded-md border border-primary text-xs ${
      category == CategoryEnum.UXUI
        ? `uxui`
        : category == CategoryEnum.Docs
        ? `docs`
        : category == CategoryEnum.Strategy
        ? `strategy`
        : category == CategoryEnum.Community
        ? `community`
        : `error`
    }`}
  >
    {category === CategoryEnum.UXUI
      ? "UX/UI"
      : category === CategoryEnum.Docs
      ? "Documentation"
      : category === CategoryEnum.Strategy
      ? "Business/Strategy"
      : category === CategoryEnum.Community
      ? "Community"
      : "Error"}
  </div>
);
