export enum Holder {
  Yay,
  Nay,
}

export enum Category {
  UxUi,
  Docs,
  BizStrat,
  Community,
}

export type Feedback = {
  id: number;
  teamMember: string;
  avatar?: string;
  category: Category;
};
