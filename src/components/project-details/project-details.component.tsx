import Image from "next/image";
import { ClockIcon } from "@heroicons/react/24/solid";
import { numericalToString } from "@/tools/core/month";
import { Documents, Projects } from "@/types";
import type { FC } from "react";
import Link from "next/link";
import { DocumentIcon } from "@heroicons/react/24/outline";

interface ProjectDetailsProps {
  project: Projects;
  links: string[] | null;
  documents: Documents[] | null;
}

const ProjectDetails: FC<ProjectDetailsProps> = ({
  project,
  links,
  documents,
}) => (
  <div className="bg-white flex h-[calc(100vh-67.5px)] w-[50%] flex-col border-t border-l border-primary">
    <div className="w-full bg-primary-dark py-2 pl-8 text-xl font-bold">
      Project Details
    </div>

    <div className="mx-auto flex w-[88%] flex-col">
      <Image
        src={`${project.image ? project.image : "/images/fallback.png"}`}
        width={420}
        height={150}
        alt={`${project.name}`}
        className="mt-2 rounded-md border"
      />
      <span className="mt-8 text-sm">Description :</span>
      <p className="mt-2 text-justify text-xs">{project.description}</p>
      <span className="mt-8 flex items-center text-xs">
        <ClockIcon className="mr-1 h-6 w-6" /> Started
      </span>
      <span className="flex w-[100%] text-sm font-bold">
        {`${numericalToString(project.starts_at)} ${
          project.starts_at.split("-")[2]
        } ${project.starts_at.split("-")[0]}`}
      </span>
      <span className="mt-4 flex items-center text-xs">
        <ClockIcon className="mr-1 h-6 w-6" /> Due Date
      </span>
      <span className="flex w-[100%] text-sm font-bold">
        {`${numericalToString(project.ends_at)} ${
          project.ends_at.split("-")[2]
        } ${project.ends_at.split("-")[0]}`}
      </span>
      <ul className="mt-8">
        <span className="text-sm">Links :</span>
        {links ? (
          links.map((link) => (
            <li key={link}>
              <Link href={link} />
            </li>
          ))
        ) : (
          <div className="mt-2 text-xs">this project has no links yet.</div>
        )}
      </ul>
      <ul className="mt-8">
        <span className="text-sm">Documents :</span>
        {documents ? (
          documents.map((document) => (
            <li key={document.id}>
              <DocumentIcon className="h-6 w-6" />
              <Link href={document.name}>
                <span className="font-bold text-info">{document.name}</span>
              </Link>
              <span>{document.created_at}</span>
            </li>
          ))
        ) : (
          <div className="mt-2 text-xs">this project has no documets yet.</div>
        )}
      </ul>
    </div>
  </div>
);

export default ProjectDetails;
