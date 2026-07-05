import Link from "next/link";
import type { BlogPost } from "@/data/blog-posts";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`block overflow-hidden rounded-card border border-card-border bg-surface ${
        featured ? "grid grid-cols-1 md:grid-cols-2" : ""
      }`}
    >
      <img
        src={`https://picsum.photos/seed/${post.imageSeed}/800/500`}
        alt={post.title}
        className={`w-full object-cover ${featured ? "h-full" : "aspect-[16/10]"}`}
      />
      <div className="p-6">
        {featured && (
          <span className="rounded-pill bg-accent px-3 py-1 text-xs font-semibold text-white">Featured</span>
        )}
        <p className="mt-3 text-xs text-foreground-secondary">
          {post.date} · {post.readTime}
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{post.title}</h3>
        <p className="mt-2 text-sm text-foreground-secondary">{post.excerpt}</p>
        {featured && <p className="mt-4 text-sm font-semibold text-accent">Read the guide →</p>}
      </div>
    </Link>
  );
}
