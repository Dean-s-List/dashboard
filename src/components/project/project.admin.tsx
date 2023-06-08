import { useContext, useState } from "react";
import { addProject, createProject, createRecord } from "@/tools/supabase";
import type { FC } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import { ProjectsContext } from "@/contexts/projects.context";
import { CategoryEnum } from "@/constants";
import { Projects } from "@/types";

interface Props {
  toogleCreateProjectPopUp: () => void;
}

const AdminProject: FC<Props> = ({ toogleCreateProjectPopUp }) => {
  const { projects, setProjects } = useContext(ProjectsContext);
  const [sessionName, setSessionName] = useState<string | null>(null);
  const [sessionStart, setSessionStart] = useState<string | null>(null);
  const [sessionEnd, setSessionEnd] = useState<string | null>(null);
  const [category, setCategory] = useState<CategoryEnum | null>(null);
  return (
    <form
      className="absolute top-[25%] z-[999] flex w-full flex-col items-center justify-center rounded-lg border-4 border-secondary border-success bg-primary-dark p-4 px-2 md:left-[25%] md:w-[50vw] lg:left-[33.3%] lg:w-[25vw]"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // console.log(event);
        // if (
        //   sessionName &&
        //   sessionName?.length > 3 &&
        //   sessionStart &&
        //   sessionEnd
        // ) {
        if (!sessionName || !sessionStart || !sessionEnd) {
          switch (!sessionName || !sessionStart || !sessionEnd || !category) {
            case !category:
              toast.error("No focus selected !");
              break;
            case !sessionName:
              toast.error("No name provided !");
              break;
            case !sessionStart:
              toast.error("No start date provided !");
              break;
            case !sessionEnd:
              toast.error("No start date provided !");
              break;
          }
        } else {
          toast
            .promise(
              (async () => {
                const data = await createProject({
                  name: sessionName,
                  starts_at: sessionStart,
                  ends_at: sessionEnd,
                  created_at: null,
                  description: null,
                  focus: category!,
                  image: null,
                  logo: null,
                }).catch((error) => console.log(error));
                return data;
              })(),
              {
                loading: "Creating feedback session..",
                success: () => {
                  // setProjects!(
                  //   projects!.map((item) =>
                  //     item.id === project.id
                  //       ? { ...item, description: editDescription }
                  //       : item
                  //   )
                  // );
                  return <b>Feedback session created !</b>;
                },
                error: <b>Error creating feedback session !</b>,
              }
            )
            .catch((error) => console.log(error));
        }
      }}
    >
      <div className="static flex w-full items-center justify-center">
        <h2 className="text-xl font-bold">Create a Feedback Session :</h2>
        <div className="absolute right-[2.5%] top-4">
          <XMarkIcon
            className="h-6 w-6 cursor-pointer"
            onClick={toogleCreateProjectPopUp}
          />
        </div>
      </div>

      <label className="input-group mt-2" htmlFor="session_name">
        <span className="w-[25%]">name :</span>
        <input
          type="text"
          placeholder="ex : Backpack"
          className="input-borderless input w-[75%]"
          id="session_name"
          onChange={(e) => setSessionName(e.target.value)}
          required
        />
      </label>
      <label className="input-group mt-1" htmlFor="session_start">
        <span className="w-[25%]">starts :</span>
        <input
          type="date"
          className="input-borderless input w-[75%]"
          id="session_start"
          onChange={(e) => setSessionStart(e.target.value)}
          required
        />
      </label>
      <label className="input-group mt-1" htmlFor="session_end">
        <span className="w-[25%]">ends :</span>
        <input
          type="date"
          className="input-borderless input w-[75%]"
          id="session_end"
          onChange={(e) => setSessionEnd(e.target.value)}
          required
        />
      </label>
      <div className="form-control w-full max-w-full">
        <label className="label">
          <span className="label-text w-full text-center text-lg font-bold">
            Project Focus :
          </span>
        </label>
        <select
          className="select-bordered select"
          defaultValue="Focus"
          onChange={(e) => {
            switch (e.target.value) {
              case "UX/UI":
                setCategory(CategoryEnum.UXUI);
                break;
              case "Documentation":
                setCategory(CategoryEnum.Docs);
                break;
              case "Business/Strategy":
                setCategory(CategoryEnum.Strategy);
                break;
              case "Community":
                setCategory(CategoryEnum.Community);
                break;
            }
          }}
        >
          <option disabled>Focus</option>
          <option>UX/UI</option>
          <option>Documentation</option>
          <option>Business/Strategy</option>
          <option>Community</option>
        </select>
      </div>
      <button
        className="btn-info btn mx-auto mt-4 text-xs capitalize"
        type="submit"
      >
        Create Session
      </button>
    </form>
  );
};

export default AdminProject;
