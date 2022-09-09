import Link from "next/link";

type Props = {
  title: string;
  summary: string;
  id: string;
};

export default function BlogPost({ title, summary, id }: Props) {
  return (
    <Link href={`/blog/${id}`}>
      <a className="w-full">
        <div className="w-full mb-8">
          <div className="flex flex-col justify-between md:flex-row">
            <h4 className="w-full mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
              {title}
            </h4>
          </div>
          <p className="text-gray-600 dark:text-gray-100 line-clamp-3">
            {summary}
          </p>
        </div>
      </a>
    </Link>
  );
}
