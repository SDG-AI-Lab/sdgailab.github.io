interface SidebarProps {
  currentPath: string;
  isOpen?: boolean;
}

const navItems = [
  { label: 'Dashboard', href: '#/' },
  { label: 'Statistics', href: '#/statistics' },
  { label: 'Projects', href: '#/projects' },
  { label: 'News', href: '#/news' },
  { label: 'People', href: '#/people' },
  { label: 'Partners', href: '#/partners' },
  { label: 'Geographic Reach', href: '#/geographic-reach' },
  { label: 'Page Content', href: '#/page-content' },
] as const;

export default function Sidebar({ currentPath, isOpen = false }: SidebarProps) {
  const normalizedPath = currentPath || '/';
  const hashHref = normalizedPath === '/' ? '#/' : `#${normalizedPath}`;

  return (
    <nav
      aria-label="Admin navigation"
      className={`
        fixed inset-y-0 left-0 z-40 w-64 shrink-0
        transform bg-white shadow-md transition-transform duration-200 ease-in-out
        md:relative md:translate-x-0 md:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      <ul className="flex flex-col gap-0.5 p-4">
        {navItems.map(({ label, href }) => {
          const isActive = hashHref === href;
          return (
            <li key={href}>
              <a
                href={href}
                className={`
                  block rounded-lg px-4 py-2.5 text-sm font-medium
                  transition-colors
                  ${
                    isActive
                      ? 'bg-primary-50 text-primary font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
