/** Non-breaking semantic groups; preserves the approved wording and punctuation. */
export function typography(text: string): string {
  return text
    .replace(/Digital Marketing & AI/g, "Digital\u00a0Marketing\u00a0&\u00a0AI")
    .replace(/\bALTUM Consulting\b/g, "ALTUM\u00a0Consulting")
    .replace(/\biSpring (Suite|LMS)\b/g, "iSpring\u00a0$1")
    .replace(/(\d{4}) (года|году|год)(?=[\s.,!?;:]|$)/gu, "$1\u00a0$2")
    .replace(/№\s+(\d+)/gu, "№\u00a0$1")
    .replace(/ — /g, "\u00a0— ")
    .replace(
      /(^|[\s(«])([вксуоаи]|во|со|об|на|не|но|от|до|из|за|по|для|при|без|над|под) /giu,
      "$1$2\u00a0",
    );
}
