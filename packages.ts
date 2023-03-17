type Perk = {
  name: string;
  description?: string;
};

type Package = {
  // when changing a package's id, make sure to update the `Package` enum in prisma/schema.prisma
  id: "STARTER" | "MAIN" | "MEGA";
  name: string;
  price: number;
  perks: boolean[];
};

export const perks: Perk[] = [
  {
    name: "Soladex.io Review",
  },
  {
    name: "Feedback",
    description:
      "Our signature review and feedback from our team of power users! 2 weeks of community deep diving united into one final document of improvements and feature requests to take your protocol to the next level",
  },
  {
    name: "Extended Feedback",
    description:
      "Extended Feedback for 3 months! Our users continue giving feedback and your team can expect high usage and responsiveness from our dedicated power user team",
  },
  {
    name: "AMA",
    description:
      "AMA with Whale's Friend. A one-on-one interview with Solana's OG influencer, delivered as a YouTube video for high visibility and easy-to-cut sections of interest for your marketing team",
  },
];

export const packages: Package[] = [
  {
    id: "STARTER",
    name: "Starter Package",
    perks: [true, true, false, false],
    price: 1000,
  },
  {
    id: "MAIN",
    name: "The Main Event",
    perks: [true, true, true, false],
    price: 2500,
  },
  {
    id: "MEGA",
    name: "Mega Package",
    perks: [true, true, true, true],
    price: 3500,
  },
];
