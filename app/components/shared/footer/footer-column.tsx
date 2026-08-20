import { Link } from "react-router";
import { cn } from "~/lib/utils";
import type { BottomNav } from "./types";

type Props = {
  title: string;
  items: BottomNav[];
};

export default function FooterColumn({ title, items }: Props) {
  return (
    <div className="text-black">
      <h1
        className={cn(
          "relative text-2xl font-medium capitalize",
          'after:content[""] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-14 after:rounded-full after:bg-[#840000]',
        )}
      >
        {title}
      </h1>
      <ul className="mt-5 space-y-1 font-medium">
        {items.map((item) => (
          <li key={item.key}>
            {item.url && item.type === "navigate" && (
              <Link
                to={item?.url}
                className="capitalize transition-colors duration-250 hover:text-[#840000]"
              >
                {item.label}
              </Link>
            )}
            {item.url && item.type === "anchor" && (
              <a
                href={item?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="capitalize transition-colors duration-250 hover:text-[#840000]"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
