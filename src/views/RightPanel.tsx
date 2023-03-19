import Deliverables from "./Deliverables";
import TeamMembers from "./TeamMembers";

import type { FC } from "react";

const RightPanel: FC = () => (
  <div className="md:max-w-[20vw]-xl flex flex-col md:min-h-[80vh] md:w-[25vw] bg-primary-darker">
    <Deliverables />
    <TeamMembers />
  </div>
);

export default RightPanel;
