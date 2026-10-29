/** Заполните подтверждёнными контактами перед публичным запуском. */
export const siteConfig = {
  name: "ALTUM Consulting",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@altum.kz",
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "",
  privacyUrl: process.env.NEXT_PUBLIC_PRIVACY_URL || "",
  phone: "",
  whatsapp: "", // Только цифры, включая код страны, без +
  address: "",
  url: process.env.NEXT_PUBLIC_SITE_URL || "",
  ispringUrl: "https://altum-eta.vercel.app/",
  logo: "/brand/altum-logo.png",
};
export type SceneName = "courses" | "training" | "digital";
/** Добавьте /videos/*.webm и/или mp4. WebP остаётся постером и reduced-motion fallback. */
export const sceneMedia: Record<
  SceneName,
  { webm?: string; mp4?: string; poster: string }
> = {
  courses: { poster: "/art/courses-v3.webp" },
  training: { poster: "/art/training.webp" },
  digital: { poster: "/art/digital.webp" },
};
