import Image from "next/image";
import { useState } from "react";
import { drawSVGCard, drawSVGDots } from "@/tools/svg";
import { formatter } from "@/tools/core/currency";

import { PaymentTypeEnum } from "@/constants";

import type { FC } from "react";

import { _PAYMENTS_ } from "@/mock/payments";

const PaymentTable: FC = () => {
  const [payments, setPayments] = useState(_PAYMENTS_);
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
        <th className="lg:text-md flex w-[80%] items-center justify-center py-2 pr-4 text-sm">
          Date
        </th>
      </tr>
      {/* ROWS MAP */}
      {payments &&
        payments.map(({ id, type, description, amount, date, time }) => (
          <tr className="flex w-[100%] border-t text-center" key={id}>
            <td className="flex w-[80%] items-center justify-center py-1">
              {type === PaymentTypeEnum.Card && (
                <div className="flex w-[100%] items-center justify-center">
                  <span className="mr-2">{drawSVGCard()}</span>{" "}
                  <span className="md:text-md text-sm">Card</span>
                </div>
              )}
              {type === PaymentTypeEnum.Paypal && (
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
                <div className="text-stone-600 text-xs md:text-sm">{time}</div>
              </div>

              <div className="pr-4">{drawSVGDots()}</div>
            </td>
          </tr>
        ))}
    </table>
  );
};

export default PaymentTable;
