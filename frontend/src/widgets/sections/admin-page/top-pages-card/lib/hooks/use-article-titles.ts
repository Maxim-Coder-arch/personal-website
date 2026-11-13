"use client";

import { useQuery } from "@tanstack/react-query";
import { BACKEND_PROXY } from "@/src/shared/config/api";

type ArticleLite = {
  id: string;
  title: string;
};

export const useArticleTitles = () =>
  useQuery({
    queryKey: ["articles", "titles"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const response = await fetch(`${BACKEND_PROXY}/api/articles`);
      if (!response.ok) throw new Error("Articles request failed");
      const list = (await response.json()) as ArticleLite[];
      return new Map(list.map((article) => [article.id.toLowerCase(), article.title]));
    },
  });