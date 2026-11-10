import { toLowerCaseNonAccentVietnamese } from "./miscellaneous";

// Accent-free, lower case. Avoid bare "ngat": it also matches "ngạt mũi".
const EMERGENCY_KEYWORDS = [
  "dau nguc",
  "tuc nguc",
  "kho tho",
  "co giat",
  "ngat xiu",
  "bi ngat",
  "bat tinh",
  "liet",
  "meo mieng",
  "chay mau nhieu",
];

/**
 * Checks a symptom description for danger signs that need the emergency screen instead of a clinic search
 * @param description - Free text typed by the user
 * @returns true if any emergency keyword appears in the description
 */
export function hasEmergencySigns(description: string) {
  const normalized = toLowerCaseNonAccentVietnamese(description);
  return EMERGENCY_KEYWORDS.some((keyword) => normalized.includes(keyword));
}
