import { E as parseKey, _ as WEEKDAYS_GU, c as GU_DIGITS, d as MONTHS_EN, f as MONTHS_GU, g as WEEKDAYS_EN, o as GUJARATI_MONTHS, s as GUJARATI_NEW_YEAR } from "./store-DweQ-t3L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gujarati-DvhvqI5H.js
function guDigits(v) {
	return String(v).replace(/\d/g, (d) => GU_DIGITS[Number(d)] ?? d);
}
function maybeGu(v, lang) {
	return lang === "gu" ? guDigits(v) : String(v);
}
function monthName(monthIndex, lang) {
	return (lang === "gu" ? MONTHS_GU : MONTHS_EN)[monthIndex] ?? "";
}
function weekdayName(jsDay, lang) {
	return (lang === "gu" ? WEEKDAYS_GU : WEEKDAYS_EN)[jsDay] ?? "";
}
function formatDayTitle(key, lang) {
	const dt = parseKey(key);
	return `${weekdayName(dt.getDay(), lang)}, ${lang === "gu" ? guDigits(dt.getDate()) : String(dt.getDate())} ${monthName(dt.getMonth(), lang)} ${lang === "gu" ? guDigits(dt.getFullYear()) : String(dt.getFullYear())}`;
}
function newYearDate(year) {
	const iso = GUJARATI_NEW_YEAR[year];
	if (iso) {
		const [y, m, d] = iso.split("-").map(Number);
		return new Date(y, m - 1, d);
	}
	return new Date(year, 9, 23);
}
function gujaratiDate(d, lang = "gu") {
	const gy = d.getFullYear();
	const nyThis = newYearDate(gy);
	const afterNy = d >= startOfDay(nyThis);
	const vsYear = afterNy ? gy + 57 : gy + 56;
	const ny = afterNy ? nyThis : newYearDate(gy - 1);
	const diff = Math.max(0, Math.floor((startOfDay(d).getTime() - startOfDay(ny).getTime()) / 864e5));
	const monthIndex = Math.min(11, Math.floor(diff / 30));
	const dayInMonth = diff % 30 + 1;
	const paksha = dayInMonth <= 15 ? "sud" : "vad";
	const tithi = paksha === "sud" ? dayInMonth : dayInMonth - 15;
	const mName = GUJARATI_MONTHS[monthIndex] ?? "";
	const pakshaLabel = lang === "gu" ? paksha === "sud" ? "સુદ" : "વદ" : paksha === "sud" ? "Sud" : "Vad";
	const dayStr = lang === "gu" ? guDigits(tithi) : String(tithi);
	const yearStr = lang === "gu" ? guDigits(vsYear) : String(vsYear);
	return {
		vsYear,
		monthIndex,
		monthName: mName,
		day: tithi,
		paksha,
		label: lang === "gu" ? `${mName} ${pakshaLabel} ${dayStr}, વિ.સં. ${yearStr}` : `${mName} ${pakshaLabel} ${dayStr}, V.S. ${yearStr}`
	};
}
function startOfDay(d) {
	return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
//#endregion
export { monthName as i, gujaratiDate as n, maybeGu as r, formatDayTitle as t };
