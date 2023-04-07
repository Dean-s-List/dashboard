import { PaymentTypeEnum, PackagesEnum, TransactionEnum } from "@/constants";
import type { PaymentsItem } from "@/types";

export const _PAYMENTS_: PaymentsItem[] = [
  {
    id: 0,
    type: PaymentTypeEnum.Card,
    packageType: PackagesEnum.Main,
    description: `"The Main Event" has been activated successfully.`,
    transaction: TransactionEnum.Activated,
    amount: 2500,
    date: "02.02.2023",
    time: "07:16 AM",
  },
  {
    id: 1,
    type: PaymentTypeEnum.Paypal,
    packageType: PackagesEnum.Starter,
    transaction: TransactionEnum.Activated,
    description: `"Starter Package" has been activated successfully.`,
    amount: 1500,
    date: "13.12.2022",
    time: "05:11 AM",
  },
  {
    id: 2,
    type: PaymentTypeEnum.Card,
    packageType: PackagesEnum.Main,
    description: `"The Main Event" has been activated successfully.`,
    transaction: TransactionEnum.Activated,
    amount: 2500,
    date: "02.02.2023",
    time: "07:16 AM",
  },
  {
    id: 3,
    type: PaymentTypeEnum.Paypal,
    packageType: PackagesEnum.Starter,
    transaction: TransactionEnum.Activated,
    description: `"Starter Package" has been activated successfully.`,
    amount: 1500,
    date: "13.12.2022",
    time: "05:11 AM",
  },
];
