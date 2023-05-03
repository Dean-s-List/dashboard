import {
  BalloonToolbar,
  getPluginType,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MarkToolbarButton,
  usePlateEditorRef,
} from "@udecode/plate";
import { FormatBold } from "@styled-icons/material/FormatBold";
import { FormatItalic } from "@styled-icons/material/FormatItalic";
import { FormatUnderlined } from "@styled-icons/material/FormatUnderlined";
import type { TippyProps } from "@tippyjs/react";
import type { BalloonToolbarProps, WithPartial } from "@udecode/plate";

const markTooltip: TippyProps = {
  arrow: true,
  delay: 0,
  duration: [200, 0],
  hideOnClick: false,
  offset: [0, 17],
  placement: "top",
};

const MyBalloonToolbar = (
  props: WithPartial<BalloonToolbarProps, "children">
) => {
  const { children, ...balloonToolbarProps } = props;

  const editor = usePlateEditorRef();

  const arrow = false;
  const theme = "dark";

  const boldTooltip: TippyProps = { content: "Bold (⌘+B)", ...markTooltip };
  const italicTooltip: TippyProps = { content: "Italic (⌘+I)", ...markTooltip };
  const underlineTooltip: TippyProps = {
    content: "Underline (⌘+U)",
    ...markTooltip,
  };

  return (
    <BalloonToolbar theme={theme} arrow={arrow} {...balloonToolbarProps}>
      <MarkToolbarButton
        type={getPluginType(editor, MARK_BOLD)}
        icon={<FormatBold />}
        tooltip={boldTooltip}
        actionHandler="onMouseDown"
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_ITALIC)}
        icon={<FormatItalic />}
        tooltip={italicTooltip}
        actionHandler="onMouseDown"
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_UNDERLINE)}
        icon={<FormatUnderlined />}
        tooltip={underlineTooltip}
        actionHandler="onMouseDown"
      />
      {children}
    </BalloonToolbar>
  );
};

export default MyBalloonToolbar;
