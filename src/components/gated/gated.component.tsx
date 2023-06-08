// React
import { useContext } from "react";
import { HolderEnum } from "../../constants";
import { NotHolder } from "../not-holder/not-holder.component";
import { HolderContext } from "../../contexts/holder.context";
import Layout from "../../layout";
import type { FC, ReactNode } from "react";

const Gated: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { holder } = useContext(HolderContext);

  return (
    <Layout>
      {holder === HolderEnum.Yay ? (
        children
      ) : (
        <NotHolder />
        // <div className="flex h-full w-full flex-col items-center justify-center">
        //   <div>Unauthorized</div>

        // </div>
      )}
    </Layout>
  );
};

export default Gated;
