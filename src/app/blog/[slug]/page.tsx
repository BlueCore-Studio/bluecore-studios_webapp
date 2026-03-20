"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getBlogPost } from "@/data/blog-posts";

export default function BlogPostPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : null;
  const router = useRouter();
  const post = slug ? getBlogPost(slug) : null;

  useEffect(() => {
    if (slug && !post) {
      router.push("/blog");
    }
  }, [slug, post, router]);

  if (!post) return null;

  return (
    <>
      <Navbar isLightBg={false} />
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/90 to-navy/50" />
        <div className="relative w-full">
          <Container>
            <div className="pb-16 pt-32 md:pb-20 md:pt-40">
              <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-2 text-sm text-pale-blue/80 transition-colors hover:text-white"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 12H5M12 19l-7-7 7-7"
                  />
                </svg>
                Back to Blog
              </Link>

              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-mono font-medium uppercase tracking-wider text-pale-blue backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="max-w-3xl font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              <div className="mt-6 flex items-center gap-6 text-sm text-pale-blue/70">
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>{post.readTime}</span>
                <span>{post.author}</span>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Article body */}
      <article className="bg-white py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="mb-4 mt-12 font-display text-3xl font-bold text-text-dark">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mb-4 mt-12 font-display text-2xl font-bold text-text-dark">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-3 mt-8 font-display text-xl font-semibold text-text-dark">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-6 font-body text-[16px] leading-[1.8] text-text-dark/85">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-text-dark">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="text-gray">{children}</em>
                ),
                code: ({ children }) => (
                  <code className="rounded bg-pale-blue/40 px-1.5 py-0.5 font-mono text-sm text-navy">
                    {children}
                  </code>
                ),
                ul: ({ children }) => (
                  <ul className="mb-6 list-disc space-y-2 pl-6 text-text-dark/85">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-6 list-decimal space-y-2 pl-6 text-text-dark/85">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="font-body text-[16px] leading-[1.8]">
                    {children}
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="my-6 border-l-2 border-primary-blue pl-6 text-gray italic">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>

            <div className="mt-16 border-t border-gray/15 pt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-blue transition-colors hover:text-navy"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 12H5M12 19l-7-7 7-7"
                  />
                </svg>
                Back to Blog
              </Link>
            </div>
          </div>
        </Container>
      </article>

      <Footer />
    </>
  );
}
