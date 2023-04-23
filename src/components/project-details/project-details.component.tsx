import Image from "next/image";
import Link from "next/link";
import { numericalToString } from "@/tools/core/month";
import { ClockIcon } from "@heroicons/react/24/solid";
import { DocumentIcon } from "@heroicons/react/24/outline";
import type { Documents, Links, Projects } from "@/types";
import type { FC } from "react";
import LinkItem from "../link-item/link-item.component";
import React from "react";

interface ProjectDetailsProps {
  project: Projects;
  links: Links[] | null;
  documents: Documents[] | null;
  setLinks: React.Dispatch<React.SetStateAction<Links[] | null>>;
  setDocuments: React.Dispatch<React.SetStateAction<Documents[] | null>>;
}

const ProjectDetails: FC<ProjectDetailsProps> = ({
  project,
  links,
  setLinks,
  documents,
  setDocuments,
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
        className="my-4 rounded-md border border-primary shadow-xl"
      />
      <span className="text-xs">Description :</span>
      <p className="mt-2 text-justify text-xs">{project.description}</p>
      <span className="mt-4 flex items-center text-xs">
        <ClockIcon className="mr-1 h-6 w-6" /> Started
      </span>
      <span className="flex w-[100%] text-sm font-bold">
        {`${numericalToString(project.starts_at)!} ${project.starts_at.split(
          "-"
        )[2]!} ${project.starts_at.split("-")[0]!}`}
      </span>
      <span className="mt-4 flex items-center text-xs">
        <ClockIcon className="mr-1 h-6 w-6" /> Due Date
      </span>
      <span className="flex w-[100%] text-sm font-bold">
        {`${numericalToString(project.ends_at)!} ${project.ends_at.split(
          "-"
        )[2]!} ${project.ends_at.split("-")[0]!}`}
      </span>
      <ul className="mt-4">
        <span className="text-xs">Links :</span>
        {links ? (
          links.map((link) => (
            <li key={link.id}>
              <LinkItem
                link={link}
                links={links}
                project={project}
                setLinks={setLinks}
              />
              {/* <Link href={link.link}>
                <span className="text-sm font-bold text-secondary-dark">
                  {link.text}
                </span>
              </Link> */}
            </li>
          ))
        ) : (
          <div className="mt-2 text-xs">this project has no links yet.</div>
        )}
      </ul>
      <ul className="mt-4">
        <span className="text-xs">Documents :</span>
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
