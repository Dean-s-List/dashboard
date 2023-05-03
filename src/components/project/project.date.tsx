import React, { useRef, useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "@/contexts/user.context";
import { ProjectsContext } from "@/contexts/projects.context";
import { updateRecord } from "@/tools/supabase";
import { numericalToString } from "@/tools/core/month";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { ClockIcon } from "@heroicons/react/24/solid";
import type { Projects } from "@/types";
import type { SetStateAction } from "react";

interface Props {
  project: Projects;
  projects: Projects[] | null;
  setProjects: React.Dispatch<SetStateAction<Projects[] | null>>;
}

const ProjectDate: React.FC<Props> = ({ project, projects, setProjects }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editStartDate, setEditStartDate] = useState<string>(project.starts_at);
  const [editEndDate, setEditEndDate] = useState<string>(project.ends_at);
  const { adminUI } = useContext(UserContext);

  const inputRefStartDate = useRef<HTMLInputElement>(null);
  const inputRefEndDate = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRefStartDate.current?.focus();
  }, [edit]);

  useEffect(() => {
    inputRefEndDate.current?.focus();
  }, [edit]);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleEditStartDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditStartDate(e.target.value);
  };
  const handleEditEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditEndDate(e.target.value);
  };

  const handleEditNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editStartDate || !editEndDate) {
      switch (!editStartDate || !editEndDate) {
        case !editStartDate:
          toast.error("Start date is empty !");
          break;
        case !editEndDate:
          toast.error("End date is empty !");
          break;
      }
    } else {
      toast
        .promise(
          (async () => {
            const data = await updateRecord({
              id: project.id,
              name: project.name,
              created_at: project.created_at,
              starts_at: editStartDate,
              ends_at: editEndDate,
              description: project.description,
              focus: project.focus,
              logo: project.logo,
              image: project.image,
            });
            console.log(data);
            return data;
          })(),
          {
            loading: "Updating project..",
            success: () => {
              projects &&
                setProjects(
                  projects.map((item) =>
                    project.id == item.id
                      ? {
                          ...item,
                          starts_at: editStartDate,
                          ends_at: editEndDate,
                        }
                      : item
                  )
                );
              return <b>Project updated !</b>;
            },
            error: <b>Error updating project !</b>,
          }
        )
        .catch((error) => console.log(error));
    }
    setEdit(false);
  };

  const handleDelete = () => {
    // links && setLinks(links.filter((item) => item.id !== link!.id));
  };

  return (
    <>
      {adminUI ? (
        <form
          className="flex w-full items-center"
          onSubmit={handleEditNameSubmit}
        >
          <div className={`flex ${edit ? "" : "flex-col"}`}>
            {edit ? (
              <div className="flex flex-col ">
                <label className="input-group mt-1" htmlFor="session_start">
                  <span className="w-[50%]">start</span>
                  <input
                    type="date"
                    className="input-borderless input w-[100%]"
                    id="session_start"
                    value={editStartDate}
                    onChange={handleEditStartDateChange}
                    required
                  />
                </label>
                <label className="input-group mt-1" htmlFor="session_end">
                  <span className="w-[50%]">end</span>
                  <input
                    type="date"
                    className="input-borderless input"
                    id="session_end"
                    value={editEndDate}
                    onChange={handleEditEndDateChange}
                    required
                  />
                </label>
              </div>
            ) : (
              <>
                <span className="mt-8 flex items-center text-xs">
                  <ClockIcon className="mr-1 h-6 w-6" /> Started
                </span>
                <span className="flex w-[100%] text-sm font-bold">
                  {`${numericalToString(
                    project.starts_at
                  )!} ${project.starts_at.split(
                    "-"
                  )[2]!} ${project.starts_at.split("-")[0]!}`}
                </span>
                <span className="mt-8 flex items-center text-xs">
                  <ClockIcon className="mr-1 h-6 w-6" /> Due Date
                </span>
                <span className="flex w-[100%] text-sm font-bold">
                  {`${numericalToString(
                    project.ends_at
                  )!} ${project.ends_at.split("-")[2]!} ${project.ends_at.split(
                    "-"
                  )[0]!}`}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            <span
              className="ml-[10px] cursor-pointer text-[25px]"
              onClick={handleEdit}
            >
              {!edit ? (
                <AiFillEdit />
              ) : (
                <button type="submit">
                  <MdDone />
                </button>
              )}
            </span>
            {/* <span
              className="ml-[10px] cursor-pointer text-[25px]"
              onClick={handleDelete}
            >
              <AiFillDelete />
            </span> */}
          </div>
        </form>
      ) : (
        <>
          <span className="mt-8 flex items-center text-xs">
            <ClockIcon className="mr-1 h-6 w-6" /> Started
          </span>
          <span className="flex w-[100%] text-sm font-bold">
            {`${numericalToString(
              project.starts_at
            )!} ${project.starts_at.split("-")[2]!} ${project.starts_at.split(
              "-"
            )[0]!}`}
          </span>
          <span className="mt-8 flex items-center text-xs">
            <ClockIcon className="mr-1 h-6 w-6" /> Due Date
          </span>
          <span className="flex w-[100%] text-sm font-bold">
            {`${numericalToString(project.ends_at)!} ${project.ends_at.split(
              "-"
            )[2]!} ${project.ends_at.split("-")[0]!}`}
          </span>
        </>
      )}
    </>
  );
};

export default ProjectDate;
