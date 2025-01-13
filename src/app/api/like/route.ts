import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

// ブログごとのいいね数と、いいね済みかを管理
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const count = await redis.get(`likes:${slug}`);
  // const hasLiked = Boolean(
  //   await redis.sismember(`likes:${slug}:ips`, clientId)
  // );

  return NextResponse.json({
    count: Number(count) || 0,
  });
}

// いいねを追加
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  // Redis で既にいいね済みかを確認
  // const hasLiked = await redis.sismember(`likes:${slug}:ips`, clientId);

  // if (hasLiked) {
  //   return NextResponse.json(
  //     { error: `You have already liked this post: ${clientId}` },
  //     { status: 400 }
  //   );
  // }

  // いいねカウントを増やし、IP を記録
  await redis.incr(`likes:${slug}`);
  // await redis.sadd(`likes:${slug}:ips`, clientId);

  return NextResponse.json({ message: "Liked successfully", slug });
}

// いいねを削除
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  // Redis でいいね済みか確認
  // const hasLiked = await redis.sismember(`likes:${slug}:ips`, clientId);

  // いいねカウントを減らし、IP を削除
  await redis.decr(`likes:${slug}`);
  // await redis.srem(`likes:${slug}:ips`, clientId);

  return NextResponse.json({ message: "Unliked successfully", slug });
}
