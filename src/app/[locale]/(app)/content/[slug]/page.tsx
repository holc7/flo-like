import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const supabase = await createClient();

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!article) {
    notFound();
  }

  const title = locale === "sl" ? article.title_sl : article.title_en;
  const body = locale === "sl" ? article.body_sl : article.body_en;

  return (
    <div className="space-y-4">
      <Badge variant="secondary">{article.category}</Badge>
      <h1 className="text-2xl font-bold">{title}</h1>

      <Card>
        <CardContent className="prose prose-sm max-w-none pt-6">
          <div
            dangerouslySetInnerHTML={{
              __html: body.replace(/\n/g, "<br />"),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
