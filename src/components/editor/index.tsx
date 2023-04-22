//./components/Editor
import React, { memo, useEffect, useRef } from "react";
import { EDITOR_TOOLS } from "./editor.tools";
import EditorJS from "@editorjs/editorjs";
import type { OutputData } from "@editorjs/editorjs";

import type {
  ToolConfig,
  ToolConstructable,
  ToolSettings,
} from "@editorjs/editorjs";

//props
type Props = {
  data?: OutputData;
  onChange(val: OutputData): void;
  holder: string;
};

const EditorBlock = ({ data, onChange, holder }: Props) => {
  //add a reference to editor
  const ref = useRef<EditorJS>();

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_TOOLS,
        data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
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
  }, [data, holder, onChange]);

  return <div id={holder} className="prose max-w-full" />;
};

export default memo(EditorBlock);
