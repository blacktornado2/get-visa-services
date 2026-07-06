import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { featuredPost, posts } from "@/data/blog-posts";

const allPosts = [featuredPost, ...posts];

// "28 Jun 2026" → "2026-06-28" for JSON-LD/OG dates
function toIsoDate(date: string): string {
  return new Date(`${date} 12:00 UTC`).toISOString().slice(0, 10);
}

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: toIsoDate(post.date),
      images: [{ url: `https://picsum.photos/seed/${post.imageSeed}/1200/630`, width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: toIsoDate(post.date),
    image: `https://picsum.photos/seed/${post.imageSeed}/1200/630`,
    author: { "@type": "Organization", name: "GVS – Get Visa Services", url: "https://getvisaservices.in" },
    publisher: {
      "@type": "Organization",
      name: "GVS – Get Visa Services",
      logo: { "@type": "ImageObject", url: "https://getvisaservices.in/gvs-icon.png" },
    },
    mainEntityOfPage: `https://getvisaservices.in/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="bg-[linear-gradient(135deg,var(--gradient-hero-start),var(--gradient-hero-end))] px-8 py-[140px] pb-[72px] text-white">
        <div className="mx-auto max-w-[800px]">
          <p className="text-sm text-white/70">
            <Link href="/">Home</Link> / <Link href="/blog">Blog</Link>
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">{post.title}</h1>
          <p className="mt-4 text-sm text-white/70">
            {post.date} · {post.readTime}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[800px] px-8 py-[100px]">
        <img
          src={`https://picsum.photos/seed/${post.imageSeed}/1200/675`}
          alt={post.title}
          className="w-full rounded-card object-cover"
        />

        <div className="mt-10 space-y-6">
          {post.content.map((block, i) => {
            switch (block.type) {
              case "heading":
                return (
                  <h2 key={i} className="pt-4 font-display text-2xl font-bold text-foreground">
                    {block.text}
                  </h2>
                );
              case "image":
                return (
                  <img
                    key={i}
                    src={`https://picsum.photos/seed/${block.seed}/1200/675`}
                    alt={block.alt}
                    className="w-full rounded-card object-cover"
                  />
                );
              case "list":
                return (
                  <ul key={i} className="space-y-3">
                    {block.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-foreground-secondary">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              default:
                return (
                  <p key={i} className="text-foreground-secondary">
                    {block.text}
                  </p>
                );
            }
          })}
        </div>

        <div className="mt-12 border-t border-card-border pt-8">
          <a
            href="/contact"
            className="inline-block rounded-btn bg-[linear-gradient(135deg,var(--gradient-cta-start),var(--gradient-cta-end))] px-6 py-3 text-sm font-semibold text-white transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            Talk to a Visa Expert
          </a>
        </div>
      </section>
    </>
  );
}
