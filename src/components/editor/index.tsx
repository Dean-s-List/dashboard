//./components/Editor
import React, { FC, memo, useContext, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EditorContext } from "@/contexts/editor.context";
import { EDITOR_TOOLS } from "./editor.tools";
import type {
  ToolConfig,
  ToolConstructable,
  ToolSettings,
} from "@editorjs/editorjs";
import type { OutputData } from "@editorjs/editorjs";
import { toast } from "react-hot-toast";
import { updateFeedback } from "@/tools/supabase";
import { Feedbacks, Profiles } from "@/types";

//props
type Props = {
  data?: OutputData;
  // currentUser: Profiles;
  // feedback: Feedbacks;
  onChange(val: OutputData): void;
  holder: string;
};

interface Tools {
  tools: ToolConfig | ToolSettings;
}

const EditorBlock: FC<Props> = ({
  data,
  // currentUser,
  // feedback,
  onChange,
  holder,
}: Props) => {
  const { setEditorData } = useContext(EditorContext);
  //add a reference to editor
  const ref = useRef<EditorJS>();

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        // inlineToolbar: ["link", "marker", "bold", "italic"],
        autofocus: true,
        holder: holder,
        tools: EDITOR_TOOLS,
        data,
        onReady: () => {
          console.log("Editor.js is ready to work!");
        },
        async onChange(api, event) {
          const data = await api.saver.save();
          // onChange(data);
          // toast
          //   .promise(
          //     (async () => {
          //       const data = await updateFeedback({
          //         id: feedback.id,
          //         user_id: currentUser.id,
          //         title: feedback.title,
          //         project: feedback.project,
          //         created_at: feedback.created_at,
          //         published: false,
          //         category: feedback.category,
          //         content: feedback.content,
          //         user_agent: feedback.user_agent,
          //         avatar_url: feedback.avatar_url,
          //       });
          //       console.log(data);
          //       return data;
          //     })(),
          //     {
          //       loading: "Saving feedback..",
          //       success: () => {
          //         return <b>Feedback saved !</b>;
          //       },
          //       error: <b>Error saving feedback !</b>,
          //     }
          //   )
          //   .catch((error) => console.log(error));
          console.log(event);
          console.log(data);
          if (data) setEditorData(data);
        },
      });
      ref.current = editor;
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, [data, holder, onChange, setEditorData]);

  return <div id={holder} className="prose max-w-full text-[#000]" />;
};

export default memo(EditorBlock);
