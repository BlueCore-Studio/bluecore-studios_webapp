import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "./articles";
import ArticleClient from "./ArticleClient";

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    alternates: {
      canonical: `/research/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: `https://bluecorestudio.com/research/${article.slug}`,
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
      images: [
        {
          url: `/api/og?slug=${article.slug}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [`/api/og?slug=${article.slug}`],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();
  return <ArticleClient article={article} />;
}
