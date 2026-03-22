import Link from "next/link";
import { getAllPosts, getCategories } from "@/lib/posts";

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  return { title: `${decoded} - 我的博客` };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const posts = getAllPosts().filter((post) => post.category === decoded);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">分类：{decoded}</h1>
      <p className="text-gray-500 mb-8">共 {posts.length} 篇文章</p>

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
            </div>
            {post.excerpt && (
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/categories"
          className="text-indigo-500 hover:text-indigo-600 transition-colors"
        >
          ← 所有分类
        </Link>
      </div>
    </div>
  );
}
