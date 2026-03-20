"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { BLOG_POSTS, BLOG_SLUGS } from "@/data/blog-posts";

const ALL_TAGS = Array.from(
  new Set(BLOG_SLUGS.flatMap((slug) => BLOG_POSTS[slug].tags))
).sort();

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allPostsSorted = useMemo(
    () =>
      BLOG_SLUGS.map((slug) => ({ slug, ...BLOG_POSTS[slug] })).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    []
  );

  const { featuredPost, posts } = useMemo(() => {
    const featured = !selectedTag && allPostsSorted[0] ? allPostsSorted[0] : null;
    let list = selectedTag
      ? allPostsSorted.filter((p) => p.tags.includes(selectedTag))
      : allPostsSorted;
    if (featured) {
      list = list.filter((p) => p.slug !== featured.slug);
    }
    return { featuredPost: featured, posts: list };
  }, [selectedTag, allPostsSorted]);

  return (
    <>
      <Navbar isLightBg={false} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-navy py-20 md:py-28 lg:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.25),transparent)]" />
          <Container className="relative">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-pale-blue/80">
              Blog
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              Technical Writing
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-[1.7] text-pale-blue/90 md:text-base">
              Deep technical content for engineers and protocol founders
              evaluating depth. Not a blog — research.
            </p>
          </Container>
        </section>

        {/* Tag filter */}
        <section className="border-b border-gray/10 bg-soft-white py-6">
          <Container>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[12px] font-medium uppercase tracking-wider text-gray">
                Filter:
              </span>
              <button
                onClick={() => setSelectedTag(null)}
                className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
                  !selectedTag
                    ? "bg-primary-blue text-white"
                    : "bg-white/80 text-gray hover:bg-white hover:text-navy"
                }`}
              >
                All
              </button>
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
                    selectedTag === tag
                      ? "bg-primary-blue text-white"
                      : "bg-white/80 text-gray hover:bg-white hover:text-navy"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </Container>
        </section>

        {/* Featured article (first post, larger) */}
        {featuredPost && !selectedTag && (
          <section className="border-b border-gray/10 bg-white py-16 md:py-20">
            <Container>
              <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-steel-blue">
                Featured
              </p>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block overflow-hidden rounded-xl border border-gray/10 bg-white shadow-sm transition-all hover:border-primary-blue/20 hover:shadow-lg"
              >
                <div className="grid gap-0 md:grid-cols-2">
                  <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px]">
                    <Image
                      src={featuredPost.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent md:from-transparent md:via-transparent" />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-gray">
                      {featuredPost.tags.join(" · ")}
                    </div>
                    <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-text-dark transition-colors group-hover:text-primary-blue md:text-3xl">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-4 text-[15px] leading-[1.6] text-gray">
                      {featuredPost.description}
                    </p>
                    <div className="mt-6 flex items-center gap-4 text-[13px] text-gray">
                      <span>
                        {new Date(featuredPost.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-primary-blue transition-colors group-hover:text-navy">
                      Read Article
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </Container>
          </section>
        )}

        {/* Article grid */}
        <section className="bg-soft-white py-16 md:py-24">
          <Container>
            <h2 className="mb-10 text-xl font-semibold tracking-[-0.02em] text-text-dark md:text-2xl">
              {selectedTag ? `Articles in ${selectedTag}` : "All Articles"}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative block overflow-hidden rounded-lg border border-gray/10 bg-white shadow-sm transition-all hover:border-primary-blue/20 hover:shadow-md"
                >
                  <div
                    aria-hidden
                    className="absolute -bottom-14 -right-14 h-44 w-44 opacity-[0.08]"
                    style={{
                      background: "#2563EB",
                      clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                    }}
                  />
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="relative p-6">
                    <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-gray">
                      {post.tags.join(" · ")}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold leading-[1.3] tracking-[-0.01em] text-text-dark transition-colors group-hover:text-primary-blue">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-[15px] leading-[1.6] text-gray">
                      {post.description}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-[12px] text-gray">
                      <span>{post.readTime}</span>
                      <span>·</span>
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <span className="mt-4 flex items-center gap-1 text-[13px] font-medium text-primary-blue transition-colors group-hover:text-navy">
                      Read
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
