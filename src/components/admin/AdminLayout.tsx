import { Link, useRouterState } from "@tanstack/react-router";
import { Briefcase, LayoutDashboard, LogOut, MessageSquare, Newspaper } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { signOut } from "@/lib/auth";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Dashboard", to: "/admin" as const, icon: LayoutDashboard },
  { label: "Blog", to: "/admin/blog" as const, icon: Newspaper },
  { label: "Work", to: "/admin/work" as const, icon: Briefcase },
  { label: "Leads", to: "/admin/leads" as const, icon: MessageSquare },
];

/**
 * Shared shell for every /admin/* page (except /admin/login). Uses the same
 * theme tokens as the public site (bg-background, bg-surface, text-foreground,
 * border-border, ...) so it follows light/dark mode correctly, instead of the
 * previous hardcoded slate-* colors which never changed with the toggle.
 */
export function AdminLayout({
  children,
  title,
  actions,
}: {
  children: ReactNode;
  title: string;
  actions?: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-60 flex-none border-r border-border bg-surface/40 sm:block">
          <div className="flex h-16 items-center border-b border-border px-6">
            <span className="font-display text-base font-bold">
              Muxair<span className="text-primary">.</span>
              <span className="ml-1.5 text-xs font-medium text-muted-foreground">Admin</span>
            </span>
          </div>
          <nav className="flex flex-col gap-1 p-3">
            {navLinks.map((link) => {
              const active =
                link.to === "/admin" ? pathname === "/admin" : pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-surface hover:text-foreground",
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 flex-none items-center justify-between border-b border-border bg-surface/40 px-5 sm:px-8">
            <h1 className="text-base font-semibold sm:text-lg">{title}</h1>
            <div className="flex items-center gap-3">
              {actions}
              <ThemeToggle />
              <button
                type="button"
                onClick={() => signOut().then(() => window.location.assign("/admin/login"))}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-surface/60 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Log out</span>
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-5 py-8 sm:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
