import Image from "next/image";

import { FC, useState } from "react";

const drawSVGCard = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
    />
  </svg>
);

const drawSVGDots = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
    />
  </svg>
);

enum PaymentType {
  Card,
  Paypal,
  Sol,
}

enum Transaction {
  Activated,
  Refused,
  Cancelled,
  Delivered,
}

type Payments = {
  id: number;
  type: PaymentType;
  packageType: Packages;
  transaction: Transaction;
  description: string;
  amount: number;
  date: string;
  time: string;
};

enum Packages {
  Starter,
  Main,
}

const payments: Payments[] = [
  {
    id: 0,
    type: PaymentType.Card,
    packageType: Packages.Main,
    description: `"The Main Event" has been activated successfully.`,
    transaction: Transaction.Activated,
    amount: 2500,
    date: "02.02.2023",
    time: "07:16 AM",
  },
  {
    id: 1,
    type: PaymentType.Paypal,
    packageType: Packages.Starter,
    transaction: Transaction.Activated,
    description: `"Starter Package" has been activated successfully.`,
    amount: 1500,
    date: "13.12.2022",
    time: "05:11 AM",
  },
  {
    id: 2,
    type: PaymentType.Card,
    packageType: Packages.Main,
    description: `"The Main Event" has been activated successfully.`,
    transaction: Transaction.Activated,
    amount: 2500,
    date: "02.02.2023",
    time: "07:16 AM",
  },
  {
    id: 3,
    type: PaymentType.Paypal,
    packageType: Packages.Starter,
    transaction: Transaction.Activated,
    description: `"Starter Package" has been activated successfully.`,
    amount: 1500,
    date: "13.12.2022",
    time: "05:11 AM",
  },
];

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const PaymentTable: FC = () => {
  const [myPayments, setMyPayments] = useState(payments);
  return (
    <table className="w-[100%] rounded-xl bg-primary-dark shadow-xl">
      {/* HEADER */}
      <tr className="flex w-[100%] text-center">
        <th className="lg:text-md flex w-[80%] items-center justify-center py-2 text-sm">
          Type
        </th>
        <th className="lg:text-md flex w-[100%] items-center justify-center py-2 text-sm">
          Description
        </th>
        <th className="lg:text-md flex w-[80%] items-center justify-center py-2 text-sm">
          Amount
        </th>
        <th className="lg:text-md flex w-[80%] items-center justify-center py-2 text-sm">
          Date
        </th>
      </tr>
      {/* ROWS MAP */}
      {myPayments &&
        myPayments.map(({ id, type, description, amount, date, time }) => (
          <tr className="flex w-[100%] border-t text-center" key={id}>
            <td className="flex w-[80%] items-center justify-center py-1">
              {type === PaymentType.Card && (
                <div className="flex w-[100%] items-center justify-center">
                  <span className="mr-2">{drawSVGCard()}</span>{" "}
                  <span className="md:text-md text-sm">Card</span>
                </div>
              )}
              {type === PaymentType.Paypal && (
                <div className="flex w-[100%] items-center justify-center">
                  <span className="mr-2">
                    <Image
                      src={"/images/paypal.png"}
                      width={22}
                      height={22}
                      alt="Paypal"
                    />
                  </span>{" "}
                  <span className="md:text-md text-sm">Paypal</span>
                </div>
              )}
            </td>
            <td className="md:text-md flex w-[100%] items-center justify-center py-1 text-xs">
              {description}
            </td>
            <td className="flex w-[80%] items-center justify-center py-1 text-xs font-bold text-success md:text-sm">
              {formatter.format(amount)}
            </td>
            <td className="flex w-[80%]  items-center justify-center py-1">
              <div className="ml-5 flex w-[80%] flex-col items-center justify-center">
                <div className="text-xs md:text-sm">{date}</div>
                <div className="text-xs text-stone-600 md:text-sm">{time}</div>
              </div>

              <div>{drawSVGDots()}</div>
            </td>
          </tr>
        ))}
    </table>
  );
};

export default PaymentTable;
