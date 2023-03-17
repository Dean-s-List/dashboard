import type { FC } from "react";

const Spinner: FC = () => (
  <div className="spinner-container absolute top-[50%] right-[50%] h-full w-full">
    <div className="loading-spinner"></div>
  </div>
);

export default Spinner;
