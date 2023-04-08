import { useContext } from "react";
import Layout from "@/layout";
import HomeView from "@/views/home";
import { HolderContext } from "@/contexts/holder.context";
import { HolderEnum } from "@/constants";
import type { NextPage } from "next";

const Dashboard: NextPage = () => {
  const { holder } = useContext(HolderContext);
  return (
    <Layout>
      {holder === HolderEnum.Yay ? (
        <HomeView />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-center">
          Under Construction
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
