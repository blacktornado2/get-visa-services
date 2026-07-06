import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { featuredPost, posts } from "@/data/blog-posts";

const allPosts = [featuredPost, ...posts];

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
    title: `${post.title} — GVS Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
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
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-foreground-secondary">
              {paragraph}
            </p>
          ))}
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
