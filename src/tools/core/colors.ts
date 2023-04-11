import { CategoryEnum } from "@/constants";

export const radialColors = (category: CategoryEnum) => {
  if (category == CategoryEnum.UXUI) {
    return {
      trackColor: "#037BCB",
      indicatorColor: "#103c5b",
    };
  } else if (category == CategoryEnum.Docs) {
    return {
      indicatorColor: "#d307c1",
      trackColor: "#4e134d",
    };
  } else if (category == CategoryEnum.Strategy) {
    return {
      indicatorColor: "#037BCB",
      trackColor: "#103c5b",
    };
  } else if (category == CategoryEnum.Community) {
    return {
      indicatorColor: "#09d9c8",
      trackColor: "#125a5e",
    };
  } else {
    return {
      trackColor: "#03CBB3",
      indicatorColor: "#18FBFB",
    };
  }
};
