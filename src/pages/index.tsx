import { useContext } from "react";
import Layout from "@/layout";
import HomeView from "@/views/home";
import { HolderContext } from "@/contexts/holder.context";
import { WIP } from "@/components/wip";
import { HolderEnum } from "@/constants";
import type { NextPage } from "next";

const Dashboard: NextPage = () => {
  const { holder } = useContext(HolderContext);
  return <Layout>{holder === HolderEnum.Yay ? <HomeView /> : <WIP />}</Layout>;
};

export default Dashboard;
