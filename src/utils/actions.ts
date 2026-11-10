import toast from "react-hot-toast";
import { openPhone, openWebview } from "zmp-sdk";

export const EMERGENCY_NUMBER = "115";

/**
 * Opens the phone dialer, falling back to a tel: link outside the Zalo app
 * @param phoneNumber - The number to call
 */
export async function callPhone(phoneNumber: string) {
  try {
    await openPhone({ phoneNumber });
  } catch {
    window.location.href = `tel:${phoneNumber}`;
  }
}

/**
 * Opens an external page in Zalo's webview, falling back to a new tab outside the Zalo app
 * @param url - The page to open
 */
export async function openUrl(url: string) {
  try {
    await openWebview({ url });
  } catch {
    window.open(url, "_blank");
  }
}

export const mapsSearchUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const mapsDirectionsUrl = (destination: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;

/**
 * Placeholder for actions that are not wired up yet
 */
export const notAvailableYet = (message = "Tính năng đang phát triển") =>
  toast(message);
