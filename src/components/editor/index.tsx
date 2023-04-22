//./components/Editor
import React, { memo, useContext, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EditorContext } from "@/contexts/editor.context";
import { EDITOR_TOOLS } from "./editor.tools";
import type {
  ToolConfig,
  ToolConstructable,
  ToolSettings,
} from "@editorjs/editorjs";
import type { OutputData } from "@editorjs/editorjs";

//props
type Props = {
  data?: OutputData;
  onChange(val: OutputData): void;
  holder: string;
};

interface Tools {
  tools: ToolConfig | ToolSettings;
}

const EditorBlock = ({ data, onChange, holder }: Props) => {
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
        async onChange(api, event) {
          const data = await api.saver.save();
          // onChange(data);
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
