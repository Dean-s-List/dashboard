import { useContext, useState } from "react";
import { addDeliverable, addProject } from "@/tools/supabase";
import type { FC } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import { ProjectsContext } from "@/contexts/projects.context";
import { CategoryEnum } from "@/constants";

interface Props {
  toogleCreateDeliverablePopUp: () => void;
}

const AdminDeliverable: FC<Props> = ({ toogleCreateDeliverablePopUp }) => {
  const { projects, setProjects } = useContext(ProjectsContext);
  const [deliverableCategory, setDeliverableCategory] =
    useState<CategoryEnum>();
  const [deliverableName, setDeliverableName] = useState<string>("");
  const [deliverableDate, setDeliverableDate] = useState<string>("");
  const [deliverableTargetProject, setDeliverableTargetProject] =
    useState<string>("");

  return (
    <form
      className="absolute top-[25%] z-[999] flex w-full flex-col items-center justify-center rounded-lg border-4 border-secondary bg-primary-dark p-4 px-2 md:left-[25%] md:w-[50vw] lg:left-[33.3%] lg:w-[25vw]"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event);
        if (
          !deliverableName ||
          !deliverableCategory ||
          !projects ||
          !deliverableDate
        ) {
          switch (!deliverableName || !deliverableCategory || !projects) {
            case !deliverableName:
              toast.error("No name provided !");
              break;
            case !deliverableCategory:
              toast.error("No category provided !");
              break;
            case !projects:
              toast.error("No due date provided !");
              break;
            case !projects:
              toast.error("No due date provided !");
              break;
          }
        } else {
          toast
            .promise(
              (async () => {
                const [projectId] = projects?.filter(
                  (project) => project.name == deliverableTargetProject
                );
                const { id } = projectId!;
                const data = await addDeliverable({
                  project: id,
                  name: deliverableName,
                  category: deliverableCategory,
                  due_date: deliverableDate,
                }).catch((error) => console.log(error));
                setDeliverableName("");
                setDeliverableDate("");
                return data;
              })(),
              {
                loading: "Updating description..",
                success: () => {
                  // setProjects!(
                  //   projects!.map((item) =>
                  //     item.id === project.id
                  //       ? { ...item, description: editDescription }
                  //       : item
                  //   )
                  // );
                  return <b>Deliverable created !</b>;
                },
                error: <b>Error creating deliverable !</b>,
              }
            )
            .catch((error) => console.log(error));
        }
      }}
    >
      <div className="static flex w-full items-center pl-2">
        <span className="text-xl font-bold">Create a Deliverable :</span>
        <div className="absolute right-[2.5%] top-4">
          <XMarkIcon
            className="h-6 w-6 cursor-pointer"
            onClick={toogleCreateDeliverablePopUp}
          />
        </div>
      </div>
      <select
        className="select-bordered select mt-2 w-full"
        defaultValue="Target Project"
        onChange={(e) => setDeliverableTargetProject(e.target.value)}
        required
      >
        <option disabled>Target Project</option>
        {projects &&
          projects.map((project) => {
            return <option key={project.id}>{project.name}</option>;
          })}
      </select>
      <label className="input-group mt-1" htmlFor="deliverable_name">
        <span className="w-[25%]">name :</span>
        <input
          type="text"
          placeholder="ex : Soladex.io Review"
          className="input-borderless input w-[75%]"
          id="deliverable_name"
          value={deliverableName}
          onChange={(e) => setDeliverableName(e.target.value)}
        />
      </label>
      <label className="input-group mt-1" htmlFor="deliverable_date">
        <span className="w-[25%]">date :</span>
        <input
          type="date"
          className="input-borderless input w-[75%]"
          id="deliverable_date"
          value={deliverableDate}
          onChange={(e) => setDeliverableDate(e.target.value)}
        />
      </label>
      <select
        className="select-bordered select mt-1 w-full"
        defaultValue="Category"
        onChange={(e) => {
          switch (e.target.value) {
            case "UX/UI":
              setDeliverableCategory(CategoryEnum.UXUI);
              break;
            case "Documentation":
              setDeliverableCategory(CategoryEnum.Docs);
              break;
            case "Business/Strategy":
              setDeliverableCategory(CategoryEnum.Strategy);
              break;
            case "Community":
              setDeliverableCategory(CategoryEnum.Community);
              break;
          }
        }}
      >
        <option disabled>Category</option>

        <option>UX/UI</option>
        <option>Documentation</option>
        <option>Business/Strategy</option>
        <option>Community</option>
      </select>
      <button
        className="btn-secondary btn mx-auto mt-4 text-xs capitalize"
        type="submit"
      >
        Create Deliverable
      </button>
    </form>
  );
};

export default AdminDeliverable;
