import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">最新文章</h1>
      <p className="text-gray-500 mb-8">记录技术与生活的点滴</p>

      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group border-b border-gray-100 dark:border-gray-800 pb-8 last:border-0"
          >
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-xl font-semibold group-hover:text-indigo-500 transition-colors mb-2">
                {post.title}
              </h2>
            </Link>
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
              <time>{post.date}</time>
              {post.category && (
                <>
                  <span>·</span>
                  <Link
                    href={`/categories/${post.category}`}
                    className="hover:text-indigo-500 transition-colors"
                  >
                    {post.category}
                  </Link>
                </>
              )}
            </div>
            {post.excerpt && (
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {post.excerpt}
              </p>
            )}
            {post.tags.length > 0 && (
              <div className="flex gap-2 mt-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
