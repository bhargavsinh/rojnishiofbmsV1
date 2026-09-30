import {
  GU_DIGITS,
  GUJARATI_MONTHS,
  GUJARATI_NEW_YEAR,
  MONTHS_EN,
  MONTHS_GU,
  WEEKDAYS_EN,
  WEEKDAYS_GU,
} from "./constants";
import { parseKey } from "./utils";
import type { Language } from "./types";

export function guDigits(v: string | number): string {
  return String(v).replace(/\d/g, (d) => GU_DIGITS[Number(d)] ?? d);
}

export function maybeGu(v: string | number, lang: Language): string {
  return lang === "gu" ? guDigits(v) : String(v);
}

export function monthName(monthIndex: number, lang: Language): string {
  return (lang === "gu" ? MONTHS_GU : MONTHS_EN)[monthIndex] ?? "";
}

export function weekdayName(jsDay: number, lang: Language): string {
  return (lang === "gu" ? WEEKDAYS_GU : WEEKDAYS_EN)[jsDay] ?? "";
}

export function formatDayTitle(key: string, lang: Language): string {
  const dt = parseKey(key);
  const wd = weekdayName(dt.getDay(), lang);
  const day = lang === "gu" ? guDigits(dt.getDate()) : String(dt.getDate());
  const mon = monthName(dt.getMonth(), lang);
  const year = lang === "gu" ? guDigits(dt.getFullYear()) : String(dt.getFullYear());
  return `${wd}, ${day} ${mon} ${year}`;
}

function newYearDate(year: number): Date {
  const iso = GUJARATI_NEW_YEAR[year];
  if (iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  // Fallback: ~20 days after autumnal equinox cluster — 23 Oct.
  return new Date(year, 9, 23);
}

export interface GujaratiDate {
  vsYear: number;
  monthIndex: number;
  monthName: string;
  day: number;
  paksha: "sud" | "vad";
  label: string;
}

export function gujaratiDate(d: Date, lang: Language = "gu"): GujaratiDate {
  const gy = d.getFullYear();
  const nyThis = newYearDate(gy);
  const afterNy = d >= startOfDay(nyThis);
  const vsYear = afterNy ? gy + 57 : gy + 56;
  const ny = afterNy ? nyThis : newYearDate(gy - 1);
  const diff = Math.max(0, Math.floor((startOfDay(d).getTime() - startOfDay(ny).getTime()) / 86400000));
  const monthIndex = Math.min(11, Math.floor(diff / 30));
  const dayInMonth = (diff % 30) + 1;
  const paksha: "sud" | "vad" = dayInMonth <= 15 ? "sud" : "vad";
  const tithi = paksha === "sud" ? dayInMonth : dayInMonth - 15;
  const mName = GUJARATI_MONTHS[monthIndex] ?? "";
  const pakshaLabel = lang === "gu" ? (paksha === "sud" ? "સુદ" : "વદ") : paksha === "sud" ? "Sud" : "Vad";
  const dayStr = lang === "gu" ? guDigits(tithi) : String(tithi);
  const yearStr = lang === "gu" ? guDigits(vsYear) : String(vsYear);
  const label =
    lang === "gu"
      ? `${mName} ${pakshaLabel} ${dayStr}, વિ.સં. ${yearStr}`
      : `${mName} ${pakshaLabel} ${dayStr}, V.S. ${yearStr}`;
  return { vsYear, monthIndex, monthName: mName, day: tithi, paksha, label };
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
