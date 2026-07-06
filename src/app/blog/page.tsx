import { BlogCard } from "@/components/BlogCard";
import { Reveal } from "@/components/Reveal";
import { featuredPost, posts } from "@/data/blog-posts";

export default function BlogPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,var(--gradient-hero-start),var(--gradient-hero-end))] px-8 py-[140px] pb-[72px] text-white">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-sm text-white/70">Home / Blog</p>
          <h1 className="mt-4 font-display text-5xl font-bold">Visa Insights &amp; Guides</h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-8 py-[100px]">
        <Reveal>
          <BlogCard post={featuredPost} featured />
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 120}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
