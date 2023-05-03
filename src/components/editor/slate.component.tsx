import React, { useState, useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import type { Descendant } from "slate";
import type { FC } from "react";
import type { MyValue } from "./typescript/plateTypes";

interface Props {
  data: MyValue;
}

const SlateEditor: FC<Props> = ({ data }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<MyValue | Descendant[]>(data);
  return (
    <Slate
      editor={editor}
      value={value as Descendant[]}
      onChange={(value) => setValue(value)}
    >
      <Editable style={{ margin: "0 0", padding: "0 0" }} readOnly />
    </Slate>
  );
};

export default SlateEditor;
