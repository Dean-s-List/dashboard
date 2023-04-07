import Deliverables from "./deliverables";
import Members from "./members";

import type { FC } from "react";

const Panel: FC = () => (
  <div className="md:max-w-[20vw]-xl hidden bg-primary-darker  md:flex md:min-h-[80vh] md:w-[25vw] md:flex-col">
    <Deliverables />
    <Members />
  </div>
);

export default Panel;
