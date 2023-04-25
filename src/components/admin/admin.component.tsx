import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import type { Projects } from "@/types";
import type { FC } from "react";

interface Props {
  projects: Projects[];
}

const AdminPopup: FC<Props> = ({ projects }) => (
  <div className="mx-auto mt-16 flex h-60 w-[88%] flex-col items-center justify-center rounded-xl border border-primary bg-primary-darker px-1 text-center">
    <ShieldCheckIcon className="h-6 w-6" />
    <div className="mt-4 w-[100%] text-sm font-bold">
      You are an admin, click on the button below to open the administrative
      panel
    </div>
    <button
      className="bottom bg-white text-black btn-secondary btn-sm btn  mt-4 border border-primary text-sm capitalize"
      onClick={() => null}
    >
      <span className="text-sm ">Admin Panel</span>
    </button>
  </div>
);

export default AdminPopup;
