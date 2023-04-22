import React, { createContext, useContext, useEffect, useState } from "react";
import type { OutputData } from "@editorjs/editorjs";
import type { SetStateAction } from "react";

export interface IContext {
  editorData: OutputData | null;
  setEditorData: React.Dispatch<SetStateAction<OutputData | null>>;
}

export const EditorContext = createContext<IContext>({
  editorData: null,
  setEditorData: () => null,
});

interface IProvider {
  children: React.ReactNode;
}

export const EditorProvider = ({ children }: IProvider) => {
  const [editorData, setEditorData] = useState<OutputData | null>(null);
  const value = { editorData, setEditorData };
  useEffect(() => {
    if (editorData) {
      console.log(editorData);
      setEditorData(editorData);
    } else {
      setEditorData(null);
    }
  }, [editorData]);

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
};

export const useEditor = (): IContext => {
  return useContext<IContext>(EditorContext);
};
