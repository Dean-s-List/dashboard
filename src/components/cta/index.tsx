import Image from "next/image";

import type { FC } from "react";

const CTA: FC = () => (
  <div className="mx-auto mt-8 flex h-60 w-[88%] flex-col items-center justify-center rounded-xl bg-primary-darker px-1 text-center">
    <Image
      src="/images/community.png"
      height={100}
      width={100}
      alt="community"
    />
    <div className="text-md w-[100%] font-bold">Join Our Community</div>
    <div className="w-full text-xs">Join Dean&apos;s List on Discord</div>
    <button className="btn-secondary-100 bottom bg-white text-black btn-md btn  mt-2 text-sm">
      <span className="text-sm">JOIN NOW</span>
    </button>
  </div>
);

export default CTA;
