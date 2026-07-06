import type { MetadataRoute } from "next";
import { countries } from "@/data/countries";
import { featuredPost, posts } from "@/data/blog-posts";

const BASE = "https://getvisaservices.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/countries`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const countryRoutes: MetadataRoute.Sitemap = countries.map((c) => ({
    url: `${BASE}/countries/${c.code}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = [featuredPost, ...posts].map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...countryRoutes, ...blogRoutes];
}
