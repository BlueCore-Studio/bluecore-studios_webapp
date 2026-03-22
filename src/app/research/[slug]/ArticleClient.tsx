"use client";

import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import type { Article } from "./articles";

function readingTimeToISO(readTime: string): string {
  const match = readTime.match(/(\d+)/);
  if (!match) return "PT10M";
  return `PT${match[1]}M`;
}

function wordCount(content: string): number {
  return content.trim().split(/\s+/).length;
}

export default function ArticleClient({ article }: { article: Article }) {
  const router = useRouter();

  useEffect(() => {
    if (!article) {
      router.push("/#research");
    }
  }, [article, router]);

  if (!article) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "Bluecore Studios",
      url: "https://bluecorestudio.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Bluecore Studios",
      url: "https://bluecorestudio.com",
    },
    keywords: article.tags,
    wordCount: wordCount(article.content),
    timeRequired: readingTimeToISO(article.readTime),
    image: `https://bluecorestudio.com/api/og?slug=${article.slug}`,
    url: `https://bluecorestudio.com/research/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section with Background Image */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${article.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-raised via-raised/90 to-raised/60" />

        <div className="relative w-full">
          <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
            <Link
              href="/#research"
              className="inline-flex items-center gap-2 text-sm text-body hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              <span>Back to Research</span>
            </Link>

            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-mono text-accent bg-accent-glow/50 backdrop-blur-sm rounded-md border border-accent/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-heading leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{article.readTime}</span>
              </div>
              <span>{article.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="relative py-16 md:py-24 bg-raised">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="font-display font-bold text-3xl text-heading mt-10 mb-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-display font-bold text-2xl text-heading mt-10 mb-4">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-display font-semibold text-xl text-heading mt-8 mb-3">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-body leading-relaxed mb-6">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="text-heading font-semibold">{children}</strong>
                ),
                code: ({ children }) => (
                  <code className="font-mono text-accent bg-accent-glow/30 px-1.5 py-0.5 rounded text-sm">{children}</code>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-body mb-6 space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-body mb-6 space-y-2">{children}</ol>
                ),
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-accent pl-6 my-6 text-body italic">{children}</blockquote>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          <div className="mt-16 pt-8 border-t border-edge">
            <Link
              href="/#research"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-alt transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Research</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
