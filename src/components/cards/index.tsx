import LeftCard from "./left-card";
import RightCard from "./right-card";
import type { FC } from "react";

const Cards: FC = () => (
  <div className="container flex items-center justify-center space-x-14 text-left">
    <LeftCard />
    <RightCard />
  </div>
);

export default Cards;
