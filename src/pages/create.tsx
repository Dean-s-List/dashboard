/* eslint-disable @typescript-eslint/no-non-null-assertion */
// React
import { useEffect, useState, useContext } from "react";
// import { toast } from "react-hot-toast";
// Solana SDK
// import { Transaction } from "@solana/web3.js";
// import {
//   getAssociatedTokenAddressSync,
//   getMint,
//   createTransferCheckedInstruction,
// } from "@solana/spl-token";
// import { useWallet } from "@solana/wallet-adapter-react";
// Packages
import { perks, packages } from "../../packages";
// Layout
import Layout from "@/layout";
// Context
import { HolderContext } from "@/contexts/holder.context";
// Components
import Pay from "@/components/create/Pay";
// UI
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
// Constants
// import { connection, TREASURY_MINT, USDC_MINT } from "@/constants";
import { HolderEnum } from "@/constants";
import { WIP } from "@/components/wip";
import type { ChangeEvent } from "react";

const Create = () => {
  const [selected, setSelected] = useState<number>(1);
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [contact, setContact] = useState<string>();
  const [transaction, setTransaction] = useState<string>();
  const { holder } = useContext(HolderContext);

  const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const descriptionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const contactHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setContact(e.target.value);
  };

  //const { data, mutate } = api.client.createProject.useMutation({
  //  onError(error: Error) {
  //    console.log(error);
  //    toast.error("A fatal error occoured, please contact us on Discord");
  //  },
  //  onSuccess: () => {
  //    toast.success("Feedback Request Created");
  //    window.location.href = "/dashboard";
  //  },
  //});

  //const { publicKey } = useWallet();

  //useEffect(() => {
  //  if (transaction && !data) {
  //    mutate({
  //      publicKey: publicKey!.toBase58(),
  //      data: {
  //        name: name!,
  //        description: description!,
  //        contact: contact!,
  //        package: packages[selected]!.id,
  //        transaction,
  //      },
  //    });
  //  }
  //}, [
  //  transaction,
  //  data,
  //  mutate,
  //  publicKey,
  //  name,
  //  description,
  //  contact,
  //  selected,
  //]);

  return (
    <Layout>
      <div className="font-font-space flex w-full justify-center font-medium">
        <div className="flex w-full max-w-screen-xl flex-col items-center pt-16">
          <div className="text-center font-tt text-5xl uppercase">
            feedback <br /> request
          </div>

          <div className="mt-16 flex w-full max-w-md flex-col gap-y-5">
            <div>
              <div className="m-1 mb-1.5">Project Name</div>
              <input
                type="text"
                className="text-gray-100 h-12 w-full rounded border-2 border-[#222] bg-[#111] px-3 outline-none transition-all hover:border-[#333]"
                value={name}
                onChange={nameHandler}
              />
            </div>

            <div>
              <div className="m-1 mb-1.5">Description</div>
              <textarea
                className="text-gray-100 h-28 w-full rounded border-2 border-[#222] bg-[#111] p-3 outline-none transition-all hover:border-[#333]"
                value={description}
                onChange={descriptionHandler}
              />
            </div>

            <div>
              <div className="m-1 mb-1.5">
                Contact <span className="text-gray-500 ml-1"></span>
              </div>
              <input
                type="text"
                placeholder="Dean#1234, Hanko#5678"
                className="text-gray-100 placeholder:text-gray-500 h-12 w-full rounded border-2 border-[#222] bg-[#111] px-3 outline-none transition-all hover:border-[#333]"
                value={contact}
                onChange={contactHandler}
              />
            </div>
          </div>
          <div className="mt-24">
            <div className="flex">
              <div className="rounded-lg border-2 border-[#333] bg-[#111]">
                <table>
                  <thead className="">
                    <tr className="border-b-2 border-[#333]">
                      <th className="w-max border-r-2 border-[#333]"></th>

                      {packages.map((_package, key) => (
                        <th
                          className={`relative cursor-pointer border-l-2 border-[#333] px-6 py-3 ${
                            selected === key ? "bg-white text-black" : ""
                          }`}
                          key={key}
                          onClick={() => {
                            setSelected(key);
                          }}
                        >
                          {selected === key && (
                            <div className="border-black bg-white text-black absolute -top-10 left-0 flex h-10 w-full items-center justify-center rounded-t border-b-2 text-sm">
                              SELECTED
                            </div>
                          )}
                          {_package.name} <br />
                          [${_package.price.toLocaleString()}]
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {perks.map((perk, key) => (
                      <tr className="border-t-2 border-[#333]" key={key}>
                        <td className="border-r-2 border-[#333] px-5 py-3">
                          <div>{perk.name}</div>
                          <div className="text-gray-300 mt-1 max-w-xs text-xs">
                            {perk?.description}
                          </div>
                        </td>
                        {packages.map((_package, index) => (
                          <td
                            className={`flex-grow cursor-pointer  border-l-2 border-[#333] text-center ${
                              selected === index ? "bg-white" : ""
                            }`}
                            key={index}
                            onClick={() => {
                              setSelected(index);
                            }}
                          >
                            <div className="flex w-full items-center justify-center">
                              {_package.perks[key] === true ? (
                                <CheckCircleIcon className="text-green-500 h-6 w-6" />
                              ) : (
                                <XCircleIcon className="text-red-500 h-6 w-6" />
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  <tr></tr>
                </table>
              </div>
            </div>
          </div>

          <Pay
            enabled={!(name && description && contact)}
            price={packages[selected]!.price}
            setTransaction={setTransaction}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Create;
