import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { cn } from "~/lib/utils";

interface PaginationProps {
  page: number;
  total: number;
  totalPages: number;
  siblingCount?: number;
  className?: string;
}

const DOTS = "...";

function getPaginationRange(
  current: number,
  total: number,
  siblingCount: number,
): (number | string)[] {
  const totalNumbers = siblingCount * 2 + 5; // first + last + current + 2 siblings + 2 dots;

  if (total <= totalNumbers) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSiblings = Math.max(current - siblingCount, 1);
  const rightSiblings = Math.min(current + siblingCount, total);

  const leftDots = leftSiblings > 2;
  const rightDots = rightSiblings < total - 1;

  if (!leftDots && rightDots) {
    const leftRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, i) => i + 1,
    );
    return [...leftRange, DOTS, total];
  }

  if (leftDots && !rightDots) {
    const rightRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, i) => total - (3 + siblingCount * 2) + i + 1,
    );
    return [1, DOTS, ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSiblings - leftSiblings + 1 },
    (_, i) => leftSiblings + i,
  );
  return [1, DOTS, ...middleRange, DOTS, total];
}

export default function Pagination({
  page,
  total,
  totalPages,
  siblingCount = 1,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const range = getPaginationRange(page, totalPages, siblingCount);

  return (
    <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
      <p className="order-2 text-xs whitespace-nowrap text-black md:order-1 md:text-sm">
        Halaman {page} dari {totalPages} • Total {total} Kegiatan
      </p>
      <div className="order-1 flex items-center gap-2 select-none md:order-2">
        <div
          className={cn(
            "flex items-center rounded py-0.5 pr-2 pl-1 text-sm transition-colors duration-250 md:text-base",
            page > 1
              ? "text-black hover:bg-gray-300"
              : "cursor-default text-gray-500",
          )}
        >
          <ChevronLeft className="size-5 min-w-5" />
          {page > 1 ? (
            <Link to={`?page=${page - 1}`}>Sebelumnya</Link>
          ) : (
            <span>Sebelumnya</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {range.map((item, i) =>
            item === DOTS ? (
              <span key={`dots-${i}`}>{DOTS}</span>
            ) : (
              <Link
                key={item}
                to={`?page=${item}`}
                className={cn(
                  "grid size-7.5 place-content-center rounded transition-colors duration-250",
                  item === page ? "bg-black text-white" : "text-black",
                )}
              >
                {item}
              </Link>
            ),
          )}
        </div>
        <div
          className={cn(
            "flex items-center rounded py-0.5 pr-1 pl-2 text-sm transition-colors duration-250 md:text-base",
            page < totalPages
              ? "text-black hover:bg-gray-300"
              : "cursor-default text-gray-500",
          )}
        >
          {page < totalPages ? (
            <Link to={`?page=${page + 1}`}>
              <span>Selanjutnya</span>
            </Link>
          ) : (
            <span>Selanjutnya</span>
          )}
          <ChevronRight className="size-5 min-w-5" />
        </div>
      </div>
    </div>
  );
}
