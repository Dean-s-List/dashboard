import Image from "next/image";
import Link from "next/link";
import { numericalToString } from "@/tools/core/month";
import { ClockIcon } from "@heroicons/react/24/solid";
import { DocumentIcon } from "@heroicons/react/24/outline";
import type { Documents, Links, Projects } from "@/types";
import type { FC } from "react";
import LinkItem from "../link-item/link-item.component";
import React from "react";
import ProjectDescription from "../project-description/project-description.component";
import ProjectDate from "../project-date/project-date.component";

interface ProjectDetailsProps {
  project: Projects;
  projects: Projects[] | null;
  setProjects: React.Dispatch<React.SetStateAction<Projects[] | null>>;
  links: Links[] | null;
  documents: Documents[] | null;
  setLinks: React.Dispatch<React.SetStateAction<Links[] | null>>;
  // setDocuments: React.Dispatch<React.SetStateAction<Documents[] | null>>;
  // setDescription: React.Dispatch<React.SetStateAction<string>>;
  adminUI: boolean;
}

const ProjectDetails: FC<ProjectDetailsProps> = ({
  project,
  projects,
  setProjects,
  links,
  setLinks,
  documents,
  // setDocuments,
  // setDescription,
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

      <ProjectDescription
        project={project}
        projects={projects}
        setProjects={setProjects}
        description={project.description}
        adminUI={adminUI}
      />

      <ProjectDate
        project={project}
        projects={projects}
        setProjects={setProjects}
      />
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
