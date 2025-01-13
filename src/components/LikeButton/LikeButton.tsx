"use client";
import { ArticleKey } from "@/libs/blogList";
import { FC, startTransition, useEffect, useState } from "react";

type Props = {
  preCount: number;
  slug: ArticleKey;
};

export const LikeButton: FC<Props> = ({ preCount, slug }) => {
  const [optimisticState, setOptimisticState] = useState({
    count: preCount,
    liked: false,
  });

  const [isPending, setIsPending] = useState(false);

  const handleClick = () => {
    const nextLiked = !optimisticState.liked;
    const nextCount = optimisticState.count + (nextLiked ? 1 : -1);

    setOptimisticState({
      count: nextCount,
      liked: nextLiked,
    });

    setIsPending(true);

    startTransition(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/like/?slug=${slug}`, {
        method: nextLiked ? "POST" : "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(() => {
          localStorage.setItem(`likes:${slug}`, nextLiked ? "1" : "0");
          setIsPending(false);
        })
        .catch((error) => {
          console.error("Error updating like:", error);

          setOptimisticState({
            count: optimisticState.count,
            liked: optimisticState.liked,
          });

          setIsPending(false);
        });
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const liked = localStorage.getItem(`likes:${slug}`);
    setOptimisticState((prev) => ({
      count: prev.count,
      liked: liked === "1",
    }));
  }, [preCount, slug]);

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <button
        type="button"
        className={`flex items-center justify-center text-[40px] w-[100px] h-[100px] rounded-full border-4 border-pink-300 ${
          optimisticState.liked
            ? "bg-gradient-to-r from-pink-500 to-yellow-500 border-none"
            : "bg-white"
        }`}
        onClick={handleClick}
        disabled={isPending}
      >
        👍
      </button>
      <span className="text-xl mt-2">{optimisticState.count}</span>
    </div>
  );
};
