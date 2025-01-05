import Link from "next/link";
import { FC } from "react";

const links = {
  x: {
    href: "https://x.com/marimo_egn",
    image: "/x.webp",
    name: "xのアイコン",
  },
  github: {
    href: "https://github.com/higuchimmy",
    image: "/github.webp",
    name: "githubのアイコン",
  },
  qiita: {
    href: "https://qiita.com/higuchimmy",
    image: "/qiita.webp",
    name: "qiitaのアイコン",
  },
};

type LinkName = keyof typeof links;

export const IconLink: FC<{ name: LinkName }> = ({ name }) => {
  return (
    <Link
      href={links[name].href}
      className="bg-white rounded-full p-2 border-2 border-[#FF5F80] hover:bg-[#E9B9DC]"
    >
      <img
        src={links[name].image}
        alt={links[name].name}
        className="object-cover w-8 h-8 md:w-10 md:h-10 rounded-full"
      />
    </Link>
  );
};
