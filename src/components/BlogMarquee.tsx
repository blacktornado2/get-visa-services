import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { Reveal } from "@/components/Reveal";
import { featuredPost, posts } from "@/data/blog-posts";

const allPosts = [featuredPost, ...posts];

export function BlogMarquee() {
  return (
    <section className="overflow-hidden py-[100px]">
      <Reveal className="mx-auto max-w-[1200px] px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl font-bold text-foreground">Visa Insights &amp; Guides</h2>
            <p className="mt-2 text-foreground-secondary">
              Practical advice from our consultants, straight from the case files.
            </p>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-accent">
            View all articles →
          </Link>
        </div>
      </Reveal>

      <div className="marquee relative mt-10">
        <div className="overflow-hidden">
          <div className="marquee-track flex w-max">
            {[0, 1].map((half) => (
              <div key={half} className="flex" aria-hidden={half === 1}>
                {allPosts.map((post) => (
                  <div key={post.slug} className="mr-6 w-[320px] shrink-0 [&>a]:h-full">
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
