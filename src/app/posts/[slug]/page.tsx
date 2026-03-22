import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return { title: `${post.title} - 我的博客`, description: post.excerpt };
  } catch {
    return { title: "文章未找到" };
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
        <div className="flex items-center gap-3 text-sm text-gray-500">
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
      </header>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/"
          className="text-indigo-500 hover:text-indigo-600 transition-colors"
        >
          ← 返回首页
        </Link>
      </div>
    </article>
  );
}
