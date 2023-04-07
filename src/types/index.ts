import type {
  CategoryEnum,
  PaymentTypeEnum,
  PackagesEnum,
  TransactionEnum,
} from "@/constants";

export type FeedbackItem = {
  id: number;
  teamMember: string;
  avatar?: string;
  category: CategoryEnum;
};

export type DeliverableItem = {
  id: number;
  value: number;
  name: string;
  date: string;
  category: CategoryEnum;
};

export type TeamMemberItem = {
  id: number;
  avatar: string;
  name: string;
  roles: string;
};

export type PaymentsItem = {
  id: number;
  type: PaymentTypeEnum;
  packageType: PackagesEnum;
  transaction: TransactionEnum;
  description: string;
  amount: number;
  date: string;
  time: string;
};
