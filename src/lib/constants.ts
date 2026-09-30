import type { Category, RoutineItem } from "./types";

export const PILLARS: Record<
  string,
  { n: string; nEn: string; c: string }
> = {
  seva: { n: "આધ્યાત્મ & સેવા", nEn: "Spirituality & Seva", c: "#b45309" },
  vidya: { n: "વિદ્યા / ટેકનોલોજી", nEn: "Vidya / Technology", c: "#1d4ed8" },
  dhandho: { n: "ધંધો & મેનેજમેન્ટ", nEn: "Business & Management", c: "#047857" },
  kanun: { n: "કાયદો & દસ્તાવેજ", nEn: "Law & Documents", c: "#7c3aed" },
  lekhan: { n: "લેખન & પ્રકાશન", nEn: "Writing & Publishing", c: "#be123c" },
  munshi: { n: "મુનશી કામ", nEn: "Munshi work", c: "#0f766e" },
  other: { n: "દૈનિક ક્રમ / અન્ય", nEn: "Daily order / Other", c: "#64748b" },
};

export const DEFAULT_CATEGORIES: Category[] = Object.entries(PILLARS).map(
  ([id, p], order) => ({
    id,
    nameGu: p.n,
    nameEn: p.nEn,
    color: p.c,
    builtin: true,
    order,
  }),
);

/** Source of truth from the original Rojnishi prototype — do not alter times. */
export const DEFAULT_ROUTINE: RoutineItem[] = [
  ["05:25", "જાગરણ — શ્રી દેવદમનપ્રભુ સ્મરણ", "seva"],
  ["05:26", "નિત્યકર્મ — સ્નાન, તિલક, પૂજા", "seva"],
  ["06:05", "શ્રીપ્રભુની સેવા — જગાવવાથી રાજભોગ સુધી", "seva"],
  ["07:16", "કોલેજની તૈયારી", "other"],
  ["07:56", "કોલેજ — BCA (મહીસાગર BCA કોલેજ, લુણાવાડા)", "vidya"],
  ["12:31", "ફ્રેશ + ભોજન", "other"],
  ["13:15", "ખંડ ૧ — વિદ્યા (BCA પાઠ/નોંધ)", "vidya"],
  ["14:28", "ખંડ ૨ — ટેકનોલોજી (કોડિંગ/પ્રોજેક્ટ)", "vidya"],
  ["15:41", "ખંડ ૩ — ધંધો, કાયદો & મેનેજમેન્ટ", "dhandho"],
  ["16:55", "ખંડ ૪ — લેખન, પ્રકાશન & આયોજન", "lekhan"],
  ["18:01", "સાંજની સેવા — ઉત્થાપન થી પોઢાડવા", "seva"],
  ["19:01", "ડિનર", "other"],
  ["22:00", "શયન (વિશ્રામ)", "other"],
].map(([time, description, pillar]) => ({ time, description, pillar }));

export const NAMED_ROUTINES: { id: string; name: string; pick: number[] }[] = [
  { id: "routine-nitya", name: "નિયમિત દિનચર્યા", pick: DEFAULT_ROUTINE.map((_, i) => i) },
  { id: "routine-morning", name: "સવારની દિનચર્યા", pick: [0, 1, 2, 3] },
  { id: "routine-college", name: "કોલેજ દિનચર્યા", pick: [3, 4, 5] },
  { id: "routine-seva", name: "સેવા દિનચર્યા", pick: [0, 1, 2, 10] },
  { id: "routine-study", name: "અભ્યાસ દિનચર્યા", pick: [6, 7, 8] },
  { id: "routine-writing", name: "લેખન દિનચર્યા", pick: [9] },
  { id: "routine-sunday", name: "રવિવાર દિનચર્યા", pick: [0, 1, 2, 5, 9, 10, 11, 12] },
];

export const MONTHS_GU = [
  "જાન્યુઆરી",
  "ફેબ્રુઆરી",
  "માર્ચ",
  "એપ્રિલ",
  "મે",
  "જૂન",
  "જુલાઈ",
  "ઑગસ્ટ",
  "સપ્ટેમ્બર",
  "ઑક્ટોબર",
  "નવેમ્બર",
  "ડિસેમ્બર",
];

export const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** JS getDay() order — Sunday first */
export const WEEKDAYS_GU = [
  "રવિવાર",
  "સોમવાર",
  "મંગળવાર",
  "બુધવાર",
  "ગુરુવાર",
  "શુક્રવાર",
  "શનિવાર",
];

export const WEEKDAYS_EN = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const WEEK_HDR_GU = ["સોમ", "મંગળ", "બુધ", "ગુરુ", "શુક્ર", "શનિ", "રવિ"];
export const WEEK_HDR_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const GU_DIGITS = ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"];

export const GUJARATI_MONTHS = [
  "કારતક",
  "માગશર",
  "પોષ",
  "મહા",
  "ફાગણ",
  "ચૈત્ર",
  "વૈશાખ",
  "જેઠ",
  "અષાઢ",
  "શ્રાવણ",
  "ભાદરવો",
  "આસો",
];

/** Best-effort Kartik Sud 1 (Gujarati New Year) dates. */
export const GUJARATI_NEW_YEAR: Record<number, string> = {
  2020: "2020-11-16",
  2021: "2021-11-05",
  2022: "2022-10-26",
  2023: "2023-11-14",
  2024: "2024-11-02",
  2025: "2025-10-22",
  2026: "2026-11-10",
  2027: "2027-10-31",
  2028: "2028-10-19",
  2029: "2029-11-07",
  2030: "2030-10-27",
  2031: "2031-11-15",
  2032: "2032-11-04",
  2033: "2033-10-24",
  2034: "2034-11-12",
  2035: "2035-11-01",
};

export const SEVA_FOLDER_TREE: {
  name: string;
  children?: string[];
}[] = [
  {
    name: "સેવા પ્રણાલિકા",
    children: [
      "નિત્ય સેવા",
      "મંગળા",
      "શ્રૃંગાર",
      "ગ્વાલ",
      "રાજભોગ",
      "ઉત્થાપન",
      "ભોગ",
      "શયન",
    ],
  },
  { name: "સેવા સામગ્રી" },
  { name: "ઉત્સવ સેવા" },
  { name: "વસ્ત્ર અને શૃંગાર" },
  { name: "ભોગ / મનોરથ" },
  { name: "ફોટોગ્રાફ્સ" },
  { name: "PDF ગ્રંથ / દસ્તાવેજ" },
  { name: "અન્ય" },
];

export const PRANALIKA_TEMPLATES: {
  title: string;
  folderName: string;
  time: string;
  sequence: string;
}[] = [
  { title: "નિત્ય સેવા", folderName: "નિત્ય સેવા", time: "05:26", sequence: "૧" },
  { title: "મંગળા", folderName: "મંગળા", time: "05:26", sequence: "૨" },
  { title: "શ્રૃંગાર", folderName: "શ્રૃંગાર", time: "", sequence: "૩" },
  { title: "ગ્વાલ", folderName: "ગ્વાલ", time: "", sequence: "૪" },
  { title: "રાજભોગ", folderName: "રાજભોગ", time: "06:05", sequence: "૫" },
  { title: "ઉત્થાપન", folderName: "ઉત્થાપન", time: "18:01", sequence: "૬" },
  { title: "ભોગ", folderName: "ભોગ", time: "", sequence: "૭" },
  { title: "શયન", folderName: "શયન", time: "22:00", sequence: "૮" },
];

export const FILES_ROOT_ID = "files-root";
export const SEVA_ROOT_ID = "seva-root";
export const LEGACY_LS_KEYS = [
  "rojnishi-of-bms",
  "roznamu-store",
  "rojnishi-legacy",
  "rojnamu-data",
];

export const OWNER_LINE = "ભારગવસિંહ મહેન્દ્રસિંહ સિસોદીયા · વિદ્યા · વિવેક · ધૈર્ય · આશ્રય";
export const HUKAM = "હુકમ, શ્રી દેવદમનપ્રભુ ની કૃપાથી...";
export const FOOTER_VERSE = "કર્મણ્યેવાધિકારસ્તે";
export const APP_NAME = "Rojnishi Of Bms";
export const APP_SHORT = "Rojnishi";
export const APP_NAME_GU = "રોજનિશી";
