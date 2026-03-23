"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/lib/i18n/navigation";
import { createClient } from "@/lib/supabase/client";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImageUrl: string | null;
}

const categories = [
  "all",
  "menstrual_health",
  "nutrition",
  "exercise",
  "mental_health",
  "fertility",
  "general",
] as const;

export default function ContentPage() {
  const t = useTranslations("content");
  const locale = useLocale();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    async function fetchArticles() {
      const supabase = createClient();
      let query = supabase
        .from("articles")
        .select("id, slug, title_sl, title_en, excerpt_sl, excerpt_en, category, cover_image_url")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (activeCategory !== "all") {
        query = query.eq("category", activeCategory);
      }

      const { data } = await query;

      if (data) {
        setArticles(
          data.map((a) => ({
            id: a.id,
            slug: a.slug,
            title: locale === "sl" ? a.title_sl : a.title_en,
            excerpt: locale === "sl" ? (a.excerpt_sl || "") : (a.excerpt_en || ""),
            category: a.category,
            coverImageUrl: a.cover_image_url,
          }))
        );
      }
      setLoading(false);
    }

    fetchArticles();
  }, [activeCategory, locale]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t("title")}</h2>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {t(`categories.${cat}` as Parameters<typeof t>[0])}
          </button>
        ))}
      </div>

      {/* Articles list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          {t("noArticles")}
        </p>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <Link key={article.id} href={`/content/${article.slug}`}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {t(`categories.${article.category}` as Parameters<typeof t>[0])}
                  </Badge>
                  <h3 className="font-semibold">{article.title}</h3>
                  {article.excerpt && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
