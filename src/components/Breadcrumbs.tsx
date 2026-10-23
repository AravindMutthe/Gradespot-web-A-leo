import Link from "next/link";

// Visible breadcrumb trail (pairs with the BreadcrumbList JSON-LD —
// nav-ia research: breadcrumbs on detail pages, visible + schema).
export default function Breadcrumbs({
  items,
  dark = false,
}: {
  items: { name: string; path?: string }[];
  dark?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px]">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden className={dark ? "text-white/50" : "text-body/60"}>
                  /
                </span>
              )}
              {item.path && !last ? (
                <Link
                  href={item.path}
                  className={
                    dark
                      ? "font-medium text-white/75 transition-colors hover:text-signal"
                      : "font-medium text-body transition-colors hover:text-signal"
                  }
                >
                  {item.name}
                </Link>
              ) : (
                <span aria-current="page" className={dark ? "font-semibold text-white" : "font-semibold text-heading"}>
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
