import Link from "next/link";
import type { BlogPost } from "@/data/blog-posts";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block overflow-hidden rounded-card border border-card-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        featured ? "grid grid-cols-1 md:grid-cols-2" : ""
      }`}
    >
      <div className={`overflow-hidden ${featured ? "h-full" : ""}`}>
        <img
          src={`https://picsum.photos/seed/${post.imageSeed}/800/500`}
          alt={post.title}
          className={`w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05] ${featured ? "h-full" : "aspect-[16/10]"}`}
        />
      </div>
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
