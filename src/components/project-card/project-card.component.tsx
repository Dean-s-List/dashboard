import React, { FC, SetStateAction } from "react";
import { numericalToString } from "@/tools/core/month";
import { CategoryEnum } from "@/constants";
import type { Projects } from "@/types";

interface Props {
  project: Projects;
  onClick: () => void;
}

const ProjectCard: FC<Props> = ({ project, onClick }) => (
  <div
    className="card mx-8 w-96 cursor-pointer border border-primary bg-primary-dark shadow-xl"
    onClick={onClick}
  >
    <div className="card-body">
      <h2 className="card-title">{project.name}</h2>
      <hr />
      <div className="grid w-full grid-cols-2">
        <div
          className={`badge badge-md mx-auto w-[50%] ${
            project.focus == CategoryEnum.UXUI
              ? `uxui`
              : project.focus == CategoryEnum.Docs
              ? `docs`
              : project.focus == CategoryEnum.Strategy
              ? `strategy`
              : project.focus == CategoryEnum.Community
              ? `community`
              : `error`
          }`}
        >
          {project.focus === CategoryEnum.UXUI
            ? "UX/UI"
            : project.focus === CategoryEnum.Docs
            ? "Documentation"
            : project.focus === CategoryEnum.Strategy
            ? "Business/Strategy"
            : project.focus === CategoryEnum.Community
            ? "Community"
            : "Error"}
        </div>{" "}
        <span className="badge badge-md mx-auto flex w-[75%] bg-[#fff] font-bold text-success">
          <span className="badge-success badge badge-xs mr-2"></span>
          Active
        </span>
      </div>
      <div className="card-actions justify-end">
        <div className="flex w-full">
          <span className="w-[50%] text-left text-sm">Timeframe :</span>{" "}
          <span className="flex w-[75%] justify-end space-x-4 font-bold">
            <span className="w-[100%] text-sm">
              {`${project.starts_at.split("-")[2]} ${
                project.starts_at.split("-")[1] &&
                numericalToString(project.starts_at)
              }`}
            </span>
            <span className="flex w-[100%] text-sm">
              {`${project.ends_at.split("-")[2]}  ${
                project.ends_at.split("-")[1] &&
                numericalToString(project.ends_at)
              }`}
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectCard;
