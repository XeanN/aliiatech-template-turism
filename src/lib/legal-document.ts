export type LegalDocumentMode = "text" | "file" | "link";

export type LegalDocument = {
  mode: LegalDocumentMode;
  content: string;
};

export function parseLegalDocument(value: unknown): LegalDocument | null {
  if (!value || typeof value !== "object") return null;

  const raw = value as Partial<LegalDocument>;
  if (!raw.content || typeof raw.content !== "string") return null;

  const mode: LegalDocumentMode =
    raw.mode === "file" || raw.mode === "link" ? raw.mode : "text";

  return { mode, content: raw.content };
}
