import Main from "./main";
import Panel from "./panel";

import type { FC } from "react";

const HomeView: FC = () => (
  <div className="max-w-screen flex w-[100vw]">
    <Main />
    <Panel />
  </div>
);

export default HomeView;
