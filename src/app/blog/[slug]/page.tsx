import { ArticleKey, blogList } from "@/libs/blogList";
import Link from "next/link";

export const generateStaticParams = async () => {
  return Object.keys(blogList).map((key) => ({
    slug: key,
  }));
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: ArticleKey }>;
}) {
  const slug = (await params).slug;
  const { default: Post } = await import(`@/contents/${slug}.mdx`);

  return (
    <div>
      <Link href="/">Top</Link>
      <h1 className="text-2xl m-0 py-2">{blogList[slug].title}</h1>
      <time>{slug}</time>
      <div className="p-2 bg-gray-200 rounded-md w-max leading-4 mt-2">
        {blogList[slug].category}
      </div>
      <div className="bg-white p-4 rounded-md w-full mt-4">
        <Post />
      </div>
    </div>
  );
}
