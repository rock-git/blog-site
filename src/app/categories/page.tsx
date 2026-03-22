import Link from "next/link";
import { getAllPosts, getCategories } from "@/lib/posts";

export const metadata = {
  title: "分类 - 我的博客",
};

export default function CategoriesPage() {
  const categories = getCategories();
  const posts = getAllPosts();

  const categoryCount = categories.map((cat) => ({
    name: cat,
    count: posts.filter((p) => p.category === cat).length,
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">文章分类</h1>
      <p className="text-gray-500 mb-8">按分类浏览文章</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {categoryCount.map(({ name, count }) => (
          <Link
            key={name}
            href={`/categories/${name}`}
            className="block p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 transition-colors"
          >
            <h2 className="text-lg font-semibold mb-1">{name}</h2>
            <p className="text-sm text-gray-500">{count} 篇文章</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
