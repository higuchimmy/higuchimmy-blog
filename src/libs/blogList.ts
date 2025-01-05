type BlogList = {
  [key: string]: {
    title: string;
    category: "parenting" | "tech";
  };
};

export const blogList: BlogList = {
  "2025-01-05": {
    title: "産休終了直前に個人ブログ作ってみた",
    category: "tech",
  },
};

export type ArticleKey = keyof typeof blogList;
