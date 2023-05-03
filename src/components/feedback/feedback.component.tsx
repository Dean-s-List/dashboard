import Image from "next/image";
import Link from "next/link";
// import Blocks from "editorjs-blocks-react-renderer";
import SlateEditor from "../editor/slate.component";
// import Rating from "../rating/rating.component";
import { Badge } from "../badge/badge.component";
import type { Feedbacks, Projects } from "@/types";
import type { MyValue } from "../editor/typescript/plateTypes";

import type { FC } from "react";

interface Props {
  project: Projects;
  feedback: Feedbacks;
}

const Feedback: FC<Props> = ({ project, feedback }) => (
  <div className="mx-auto h-[227px] w-[100%] max-w-[379px] rounded-md border border-primary bg-primary-dark p-4 shadow-xl">
    <Link href={`/feedback/${feedback.id!}`} className="h-[50%] max-h-[50%] ">
      {feedback.content ? (
        <div className="h-[50%] max-h-[50%] w-full overflow-y-hidden">
          <SlateEditor
            data={JSON.parse(feedback.content as string) as MyValue[]}
          />
        </div>
      ) : (
        <div className="h-[50%] max-h-[50%] " />
      )}
    </Link>

    <hr className="text-primary" />
    <div className="mt-2 h-[42%] w-[100%] ">
      <span className="w-full font-bold">{feedback.title || "Untitled"}</span>
      <div className="mt-2 flex w-[100%] items-end">
        <div className="flex w-[50%] flex-col">
          <span className="mb-1 text-sm">Project : {project.name}</span>
          <Badge category={feedback.category!} />
          <div className="mt-2 flex ">
            {/* <Rating stars={feedback.avg || 0} /> */}
          </div>
        </div>
        <div className="mt-1 mr-0 flex h-[50%] w-[50%] items-center justify-end self-end">
          <span className="text-xs">{feedback.created_at!.split("T")[0]}</span>
          <div className="btn-ghost btn-circle avatar btn">
            <div className="bg-base-800">
              <div className="w-10 rounded-full">
                <Image
                  src={`${
                    feedback.avatar_url.startsWith("https://")
                      ? feedback.avatar_url
                      : (process.env.NEXT_PUBLIC_SUPABASE_URL as string) +
                        "/storage/v1/object/public/avatars/" +
                        feedback.avatar_url
                  }`}
                  className="rounded-full"
                  width={42}
                  height={42}
                  alt="author"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Feedback;
