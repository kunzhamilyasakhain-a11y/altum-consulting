/** Перенесите компонент в проект ALTUM iSpring после получения доступа к его исходникам.
 * В Vercel проекта iSpring задайте NEXT_PUBLIC_ALTUM_CORPORATE_URL.
 */
export function AltumCorporateLink() {
  const url = process.env.NEXT_PUBLIC_ALTUM_CORPORATE_URL;
  if (!url) return null;
  return (
    <a href={url} aria-label="Перейти на корпоративный сайт ALTUM Consulting">
      ALTUM Consulting <span aria-hidden="true">↗</span>
    </a>
  );
}
