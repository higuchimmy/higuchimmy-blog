import { LikeButton } from "@/components/LikeButton/LikeButton";
import { ArticleKey, blogList } from "@/libs/blogList";
import Link from "next/link";
export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: ArticleKey }>;
}) {
  const slug = (await params).slug;
  const { default: Post } = await import(`@/contents/${slug}.mdx`);

  const { count: preCount } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/like/?slug=${slug}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error updating like:", error);
    });

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
      <LikeButton preCount={preCount} slug={slug} />
    </div>
  );
}
