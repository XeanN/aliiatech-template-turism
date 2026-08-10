export type SocialLinks = {
  facebook: string | null;
  instagram: string | null;
  tiktok: string | null;
  youtube: string | null;
};

export function parseSocialLinks(value: unknown): SocialLinks {
  const empty: SocialLinks = {
    facebook: null,
    instagram: null,
    tiktok: null,
    youtube: null,
  };
  if (!value || typeof value !== "object") return empty;

  const raw = value as Partial<Record<keyof SocialLinks, unknown>>;
  const pick = (key: keyof SocialLinks) =>
    typeof raw[key] === "string" && raw[key] ? (raw[key] as string) : null;

  return {
    facebook: pick("facebook"),
    instagram: pick("instagram"),
    tiktok: pick("tiktok"),
    youtube: pick("youtube"),
  };
}
