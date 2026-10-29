export function Icon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const paths: Record<string, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 19 19 5M5 5h14v14" />
      </>
    ),
    down: (
      <>
        <path d="M12 4v16m-6-6 6 6 6-6" />
      </>
    ),
    play: <path d="m9 6 10 6-10 6Z" />,
    course: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8m-4-4v4m-2-13 5 3-5 3Z" />
      </>
    ),
    chess: (
      <>
        <path d="M5 21h14l-2-4h-2l-1-6 4-2-2-5-5-1-5 5 4 3-1 6H7Z" />
        <path d="m11 3-1-2m4 6h.01" />
      </>
    ),
    digital: (
      <>
        <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-10-2 16" />
      </>
    ),
    diamond: (
      <>
        <path d="m3 8 4-5h10l4 5-9 13Zm0 0h18M7 3l5 18 5-18" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    bulb: (
      <>
        <path d="M9 18h6m-6 3h6M8 14a6 6 0 1 1 8 0l-1 4H9ZM12 1V0M3 4 1 2m20 2 2-2M2 11H0m22 0h2" />
      </>
    ),
    layers: (
      <>
        <path d="m3 7 9-5 9 5-9 5Zm0 5 9 5 9-5M3 17l9 5 9-5" />
      </>
    ),
    study: (
      <>
        <rect x="4" y="3" width="16" height="17" rx="2" />
        <path d="M8 7h8m-8 4h8m-8 4h4m-10 7h20" />
      </>
    ),
    team: (
      <>
        <circle cx="12" cy="6" r="3" />
        <path d="M7 19v-4a5 5 0 0 1 10 0v4Zm-3 0H1v-3a4 4 0 0 1 4-4m15 7h3v-3a4 4 0 0 0-4-4" />
        <path d="M5 3a3 3 0 0 0 0 6m14-6a3 3 0 0 1 0 6" />
      </>
    ),
    create: (
      <>
        <path d="m4 20 1-6L16 3l5 5L10 19Zm10-15 5 5M3 22h18" />
      </>
    ),
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m3 5 9 8 9-8" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    whatsapp: (
      <>
        <path d="M21 11.5a9 9 0 0 1-13 8L3 21l1.5-5A9 9 0 1 1 21 11.5Z" />
        <path d="M8 7c0 5 4 9 8 9l1-3-3-1-1 1-3-3 1-1-1-3Z" />
      </>
    ),
  };
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}
