import React from "react";
import Image from "next/image";
import Link from "next/link";
import LinkItem from "../link-item/link-item.component";
import Description from "./project.description";
import Date from "./project.date";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { ClockIcon } from "@heroicons/react/24/solid";
import type { Documents, Links, Projects } from "@/types";
import type { FC } from "react";

interface Props {
  project: Projects;
  projects: Projects[] | null;
  setProjects: React.Dispatch<React.SetStateAction<Projects[] | null>>;
  links: Links[] | null;
  documents: Documents[] | null;
  setLinks: React.Dispatch<React.SetStateAction<Links[] | null>>;
  adminUI: boolean;
}

const Details: FC<Props> = ({
  project,
  projects,
  setProjects,
  links,
  setLinks,
  documents,
  adminUI,
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
        className={`my-4 rounded-md border border-primary shadow-xl hover:bg-[rgba(255,255,255,.7)]`}
        onClick={() => {
          console.log("hello world");
        }}
      />

      <Description
        project={project}
        projects={projects}
        setProjects={setProjects}
        description={project.description}
        adminUI={adminUI}
      />

      <Date project={project} projects={projects} setProjects={setProjects} />
      <ul className="mt-8">
        <span className="text-xs">Links :</span>
        {links && links.length > 0 ? (
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
      <ul className="mt-8">
        <span className="text-xs">Documents :</span>
        {documents && documents.length > 0 ? (
          documents.map((document) => (
            <li key={document.id} className="flex items-center space-x-1">
              <DocumentIcon className="h-4 w-4 text-secondary-dark" />
              <Link href={document.text}>
                <span className="text-sm font-bold text-secondary-dark">
                  {document.link}
                </span>
              </Link>
              <span className="text-xs">
                {document.uploaded_at
                  ?.split("T")[0]
                  ?.replace("-", "/")
                  .replace("-", "/")}
              </span>
            </li>
          ))
        ) : (
          <div className="mt-2 text-xs">this project has no documets yet.</div>
        )}
      </ul>
    </div>
  </div>
);

export default Details;
