import React from "react";
import {
  createImagePlugin,
  createMediaEmbedPlugin,
  createSelectOnBackspacePlugin,
  createLinkPlugin,
  LinkToolbarButton,
  ELEMENT_IMAGE,
  ELEMENT_MEDIA_EMBED,
  ImageToolbarButton,
  MediaEmbedToolbarButton,
  Plate,
  PlateProvider,
} from "@udecode/plate";
import { MarkBalloonToolbar } from "./balloon-toolbar/MarkBalloonToolbar";
import { basicNodesPlugins } from "./basic-nodes/basicNodesPlugins";
import { linkPlugin } from "./link/linkPlugin";
import { Toolbar } from "./toolbar/Toolbar";
import { editableProps } from "./common/editableProps";
import { plateUI } from "./common/plateUI";
import { createMyPlugins } from "./typescript/plateTypes";
import { Link } from "@styled-icons/material/Link";
import { Image } from "@styled-icons/material/Image";
import { OndemandVideo } from "@styled-icons/material/OndemandVideo";
import type { MyValue, MyEditor } from "./typescript/plateTypes";
import type { FC } from "react";
import type { Json } from "@/types/supabase";
import type { Feedbacks, Profiles } from "@/types";

interface Props {
  value: MyValue | Json | undefined;
  setValue: React.Dispatch<React.SetStateAction<MyValue | Json | undefined>>;
  feedback: Feedbacks | null;
  currentUser: Profiles | null;
  isOwner: boolean;
  adminUI: boolean;
}

const PlateEditor: FC<Props> = ({
  value,
  setValue,
  isOwner,
  feedback,
  currentUser,
  adminUI,
}) => {
  const plugins = createMyPlugins(
    [
      ...basicNodesPlugins,
      createLinkPlugin(linkPlugin),
      createImagePlugin(),
      createMediaEmbedPlugin(),
      createSelectOnBackspacePlugin({
        options: {
          query: {
            allow: [ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED],
          },
        },
      }),
    ],
    {
      components: plateUI,
    }
  );
  return (
    <div className="h-full w-full overflow-x-hidden overflow-y-scroll text-[#000]">
      <PlateProvider<MyValue>
        plugins={plugins}
        value={value ? (value as MyValue) : initialValue}
        initialValue={value ? (value as MyValue) : initialValue}
        onChange={(v) => {
          console.log(value);
          setValue(v);
        }}
        readOnly={isOwner ? false : true}
      >
        {isOwner && (
          <Toolbar>
            <LinkToolbarButton icon={<Link />} />
            <ImageToolbarButton icon={<Image />} />
            <MediaEmbedToolbarButton icon={<OndemandVideo />} />
          </Toolbar>
        )}

        <h1 className="mx-auto text-center">
          {feedback ? feedback.title : "Untilted"}
        </h1>
        <Plate<MyValue, MyEditor>
          plugins={basicNodesPlugins}
          editableProps={editableProps}
        >
          <MarkBalloonToolbar />
        </Plate>
      </PlateProvider>
    </div>
  );
};
const initialValue: MyValue = [
  {
    type: "p",
    children: [
      {
        text: "Much wow !",
      },
    ],
  },
  {
    type: "img",
    url: "https://cdn3.emoji.gg/emojis/7346-pepe-hmmm.png",
    children: [{ text: "" }],
    width: 88,
  },
];
export default PlateEditor;
