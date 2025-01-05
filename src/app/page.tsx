import { IconLink } from "@/components/IconLink/IconLink";
import { Icon } from "@/components/icons/Icon";
import { blogList } from "@/libs/blogList";
import Link from "next/link";
import Profile from "@/contents/profile.mdx";

export default function Home() {
  return (
    <div>
      <div className="relative mb-20 md:mb-32">
        <div className="relative h-64 md:h-80">
          <img
            src="/header.webp"
            alt="ヘッダー画像"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute bottom-3/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src="/profile.webp"
            alt="プロフィールアイコン"
            className="object-cover w-32 h-32 md:w-48 md:h-48 rounded-full p-1 bg-[#FFF0FC]"
          />
        </div>
      </div>
      <div className="text-center">
        <p className="text-2xl md:text-3xl font-bold mb-6">
          higuchimmy/ひぐちみー
        </p>
        <div className="flex justify-center gap-6 mb-6">
          <IconLink name="x" />
          <IconLink name="github" />
          <IconLink name="qiita" />
        </div>
        <Link
          className="px-4 py-2 text-white bg-[#FF5F80] rounded-lg"
          href="#profile"
        >
          GO TO PROFILE
        </Link>
      </div>
      <section className="py-8 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Articles</h2>
        <ul className="bg-white p-4 rounded-md">
          {Object.entries(blogList).map(([key, value], idx) => (
            <li
              key={key}
              className={`${
                idx !== Object.keys(blogList).length - 1 &&
                "border-b border-gray-200"
              } p-2 hover:bg-gray-100 ${idx !== 0 && "mt-2"}`}
            >
              <Link
                href={`/blog/${key}`}
                className="text-md md:text-xl md:flex justify-between"
              >
                <div className="flex items-center gap-2">
                  <Icon name={value.category} />
                  <p>{value.title}</p>
                </div>
                <div className="flex justify-end w-full md:w-1/3">
                  <div className="flex items-center gap-1 text-sm mt-2 md:mt-0">
                    <Icon name="calendar" size="sm" />
                    <time>{key}</time>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section id="profile" className="py-8 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Profile</h2>
        <div className="bg-white p-4 rounded-md w-full">
          <div className="prose">
            <Profile />
          </div>
        </div>
      </section>
    </div>
  );
}
