import { BLOG_POSTS, BLOG_SLUGS } from "@/data/blog-posts";

const BASE_URL = "https://bluecorestudio.com";

export default function sitemap() {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/case-studies/refi2`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    // /research/:slug is a permanent redirect to /blog/:slug (see next.config.js),
    // so the sitemap advertises the canonical /blog URLs.
    ...BLOG_SLUGS.map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date(BLOG_POSTS[slug].date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
