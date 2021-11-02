import {ReactNode} from 'react';
type Props = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

export default function ProjectCard({title, description, href, icon}: Props) {
  return (
    <a
      className="w-full mb-4 hover:shadow"
      href={href}
      aria-label={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center p-4 border border-gray-200 rounded dark:border-gray-800">
        {icon && (
          <div className="w-8 h-8 ml-2 mr-4">
            <span className="sr-only">{title}</span>
            {icon}
          </div>
        )}
        <div>
          <h4 className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {title}
          </h4>
          <p className="text-gray-700 leading-5 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}
