import { PlateFloatingLink } from "@udecode/plate";
import type { LinkPlugin, RenderAfterEditable } from "@udecode/plate";
import type { MyPlatePlugin, MyValue } from "../typescript/plateTypes";

export const linkPlugin: Partial<MyPlatePlugin<LinkPlugin>> = {
  renderAfterEditable: PlateFloatingLink as RenderAfterEditable<MyValue>,
};
