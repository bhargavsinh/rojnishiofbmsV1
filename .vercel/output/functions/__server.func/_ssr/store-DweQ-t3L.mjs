import { n as toast } from "../_libs/sonner.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-DweQ-t3L.js
var PILLARS = {
	seva: {
		n: "આધ્યાત્મ & સેવા",
		nEn: "Spirituality & Seva",
		c: "#b45309"
	},
	vidya: {
		n: "વિદ્યા / ટેકનોલોજી",
		nEn: "Vidya / Technology",
		c: "#1d4ed8"
	},
	dhandho: {
		n: "ધંધો & મેનેજમેન્ટ",
		nEn: "Business & Management",
		c: "#047857"
	},
	kanun: {
		n: "કાયદો & દસ્તાવેજ",
		nEn: "Law & Documents",
		c: "#7c3aed"
	},
	lekhan: {
		n: "લેખન & પ્રકાશન",
		nEn: "Writing & Publishing",
		c: "#be123c"
	},
	munshi: {
		n: "મુનશી કામ",
		nEn: "Munshi work",
		c: "#0f766e"
	},
	other: {
		n: "દૈનિક ક્રમ / અન્ય",
		nEn: "Daily order / Other",
		c: "#64748b"
	}
};
var DEFAULT_CATEGORIES = Object.entries(PILLARS).map(([id, p], order) => ({
	id,
	nameGu: p.n,
	nameEn: p.nEn,
	color: p.c,
	builtin: true,
	order
}));
/** Source of truth from the original Rojnishi prototype — do not alter times. */
var DEFAULT_ROUTINE = [
	[
		"05:25",
		"જાગરણ — શ્રી દેવદમનપ્રભુ સ્મરણ",
		"seva"
	],
	[
		"05:26",
		"નિત્યકર્મ — સ્નાન, તિલક, પૂજા",
		"seva"
	],
	[
		"06:05",
		"શ્રીપ્રભુની સેવા — જગાવવાથી રાજભોગ સુધી",
		"seva"
	],
	[
		"07:16",
		"કોલેજની તૈયારી",
		"other"
	],
	[
		"07:56",
		"કોલેજ — BCA (મહીસાગર BCA કોલેજ, લુણાવાડા)",
		"vidya"
	],
	[
		"12:31",
		"ફ્રેશ + ભોજન",
		"other"
	],
	[
		"13:15",
		"ખંડ ૧ — વિદ્યા (BCA પાઠ/નોંધ)",
		"vidya"
	],
	[
		"14:28",
		"ખંડ ૨ — ટેકનોલોજી (કોડિંગ/પ્રોજેક્ટ)",
		"vidya"
	],
	[
		"15:41",
		"ખંડ ૩ — ધંધો, કાયદો & મેનેજમેન્ટ",
		"dhandho"
	],
	[
		"16:55",
		"ખંડ ૪ — લેખન, પ્રકાશન & આયોજન",
		"lekhan"
	],
	[
		"18:01",
		"સાંજની સેવા — ઉત્થાપન થી પોઢાડવા",
		"seva"
	],
	[
		"19:01",
		"ડિનર",
		"other"
	],
	[
		"22:00",
		"શયન (વિશ્રામ)",
		"other"
	]
].map(([time, description, pillar]) => ({
	time,
	description,
	pillar
}));
var NAMED_ROUTINES = [
	{
		id: "routine-nitya",
		name: "નિયમિત દિનચર્યા",
		pick: DEFAULT_ROUTINE.map((_, i) => i)
	},
	{
		id: "routine-morning",
		name: "સવારની દિનચર્યા",
		pick: [
			0,
			1,
			2,
			3
		]
	},
	{
		id: "routine-college",
		name: "કોલેજ દિનચર્યા",
		pick: [
			3,
			4,
			5
		]
	},
	{
		id: "routine-seva",
		name: "સેવા દિનચર્યા",
		pick: [
			0,
			1,
			2,
			10
		]
	},
	{
		id: "routine-study",
		name: "અભ્યાસ દિનચર્યા",
		pick: [
			6,
			7,
			8
		]
	},
	{
		id: "routine-writing",
		name: "લેખન દિનચર્યા",
		pick: [9]
	},
	{
		id: "routine-sunday",
		name: "રવિવાર દિનચર્યા",
		pick: [
			0,
			1,
			2,
			5,
			9,
			10,
			11,
			12
		]
	}
];
var MONTHS_GU = [
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
	"ડિસેમ્બર"
];
var MONTHS_EN = [
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
	"December"
];
/** JS getDay() order — Sunday first */
var WEEKDAYS_GU = [
	"રવિવાર",
	"સોમવાર",
	"મંગળવાર",
	"બુધવાર",
	"ગુરુવાર",
	"શુક્રવાર",
	"શનિવાર"
];
var WEEKDAYS_EN = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
var WEEK_HDR_GU = [
	"સોમ",
	"મંગળ",
	"બુધ",
	"ગુરુ",
	"શુક્ર",
	"શનિ",
	"રવિ"
];
var WEEK_HDR_EN = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
	"Sun"
];
var GU_DIGITS = [
	"૦",
	"૧",
	"૨",
	"૩",
	"૪",
	"૫",
	"૬",
	"૭",
	"૮",
	"૯"
];
var GUJARATI_MONTHS = [
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
	"આસો"
];
/** Best-effort Kartik Sud 1 (Gujarati New Year) dates. */
var GUJARATI_NEW_YEAR = {
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
	2035: "2035-11-01"
};
var SEVA_FOLDER_TREE = [
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
			"શયન"
		]
	},
	{ name: "સેવા સામગ્રી" },
	{ name: "ઉત્સવ સેવા" },
	{ name: "વસ્ત્ર અને શૃંગાર" },
	{ name: "ભોગ / મનોરથ" },
	{ name: "ફોટોગ્રાફ્સ" },
	{ name: "PDF ગ્રંથ / દસ્તાવેજ" },
	{ name: "અન્ય" }
];
var PRANALIKA_TEMPLATES = [
	{
		title: "નિત્ય સેવા",
		folderName: "નિત્ય સેવા",
		time: "05:26",
		sequence: "૧"
	},
	{
		title: "મંગળા",
		folderName: "મંગળા",
		time: "05:26",
		sequence: "૨"
	},
	{
		title: "શ્રૃંગાર",
		folderName: "શ્રૃંગાર",
		time: "",
		sequence: "૩"
	},
	{
		title: "ગ્વાલ",
		folderName: "ગ્વાલ",
		time: "",
		sequence: "૪"
	},
	{
		title: "રાજભોગ",
		folderName: "રાજભોગ",
		time: "06:05",
		sequence: "૫"
	},
	{
		title: "ઉત્થાપન",
		folderName: "ઉત્થાપન",
		time: "18:01",
		sequence: "૬"
	},
	{
		title: "ભોગ",
		folderName: "ભોગ",
		time: "",
		sequence: "૭"
	},
	{
		title: "શયન",
		folderName: "શયન",
		time: "22:00",
		sequence: "૮"
	}
];
var FILES_ROOT_ID = "files-root";
var SEVA_ROOT_ID = "seva-root";
var LEGACY_LS_KEYS = [
	"rojnishi-of-bms",
	"roznamu-store",
	"rojnishi-legacy",
	"rojnamu-data"
];
var OWNER_LINE = "ભારગવસિંહ મહેન્દ્રસિંહ સિસોદીયા · વિદ્યા · વિવેક · ધૈર્ય · આશ્રય";
var HUKAM = "હુકમ, શ્રી દેવદમનપ્રભુ ની કૃપાથી...";
var FOOTER_VERSE = "કર્મણ્યેવાધિકારસ્તે";
var APP_NAME = "Rojnishi Of Bms";
var dict = {
	appName: {
		gu: "રોજનિશી",
		en: "Rojnishi"
	},
	brand: {
		gu: "Rojnishi Of Bms",
		en: "Rojnishi Of Bms"
	},
	dashboard: {
		gu: "ડેશબોર્ડ",
		en: "Dashboard"
	},
	diary: {
		gu: "રોજનિશી",
		en: "Diary"
	},
	notes: {
		gu: "દૈનિક નોંધ",
		en: "Daily notes"
	},
	analytics: {
		gu: "વિશ્લેષણ",
		en: "Analytics"
	},
	files: {
		gu: "ફાઈલો",
		en: "Files"
	},
	seva: {
		gu: "શ્રી દેવદમન સેવા",
		en: "Shri Devdaman Seva"
	},
	library: {
		gu: "સેવા ગ્રંથાલય",
		en: "Service Library"
	},
	search: {
		gu: "શોધ",
		en: "Search"
	},
	settings: {
		gu: "સેટિંગ્સ",
		en: "Settings"
	},
	more: {
		gu: "વધુ",
		en: "More"
	},
	today: {
		gu: "આજે",
		en: "Today"
	},
	goToday: {
		gu: "આજે જાઓ",
		en: "Go to today"
	},
	newNote: {
		gu: "નવી નોંધ",
		en: "New note"
	},
	sevaNote: {
		gu: "સેવા નોંધ",
		en: "Seva note"
	},
	uploadFile: {
		gu: "ફાઈલ અપલોડ",
		en: "Upload file"
	},
	uploadPhoto: {
		gu: "ફોટો અપલોડ",
		en: "Upload photo"
	},
	uploadPdf: {
		gu: "PDF અપલોડ",
		en: "Upload PDF"
	},
	calendar: {
		gu: "કેલેન્ડર",
		en: "Calendar"
	},
	dayNote: {
		gu: "દિવસની નોંધ",
		en: "Day note"
	},
	dayLineNote: {
		gu: "દિવસની એક લીટી નોંધ (મુનશી અભિલેખ)",
		en: "One-line day note"
	},
	addEntry: {
		gu: "+ નવી નોંધ",
		en: "+ New entry"
	},
	fillRoutine: {
		gu: "નિયમિત દિનચર્યા ભરો",
		en: "Fill regular routine"
	},
	applyRoutine: {
		gu: "દિનચર્યા લાગુ કરો",
		en: "Apply routine"
	},
	copyYesterday: {
		gu: "ગઈકાલ નકલ કરો",
		en: "Copy yesterday"
	},
	copyDay: {
		gu: "બીજા દિવસની નકલ",
		en: "Copy another day"
	},
	clearDay: {
		gu: "આ દિવસ ખાલી કરો",
		en: "Clear this day"
	},
	saved: {
		gu: "સાચવાયું",
		en: "Saved"
	},
	saving: {
		gu: "સાચવાઈ રહ્યું છે…",
		en: "Saving…"
	},
	start: {
		gu: "શરૂ કરો",
		en: "Begin"
	},
	confirm: {
		gu: "ખાતરી કરો",
		en: "Confirm"
	},
	cancel: {
		gu: "રદ કરો",
		en: "Cancel"
	},
	delete: {
		gu: "ભૂંસો",
		en: "Delete"
	},
	rename: {
		gu: "નામ બદલો",
		en: "Rename"
	},
	move: {
		gu: "ખસેડો",
		en: "Move"
	},
	duplicate: {
		gu: "નકલ",
		en: "Duplicate"
	},
	edit: {
		gu: "સુધારો",
		en: "Edit"
	},
	save: {
		gu: "સાચવો",
		en: "Save"
	},
	print: {
		gu: "છાપો",
		en: "Print"
	},
	exportJson: {
		gu: "JSON નિકાસ",
		en: "Export JSON"
	},
	exportPdf: {
		gu: "PDF નિકાસ",
		en: "Export PDF"
	},
	backup: {
		gu: "બેકઅપ",
		en: "Backup"
	},
	restore: {
		gu: "પુનઃસ્થાપન",
		en: "Restore"
	},
	import: {
		gu: "આયાત કરો",
		en: "Import"
	},
	export: {
		gu: "નિકાસ કરો",
		en: "Export"
	},
	copy: {
		gu: "કૉપી કરો",
		en: "Copy"
	},
	wipe: {
		gu: "બધું ભૂંસો",
		en: "Clear all"
	},
	searchPlaceholder: {
		gu: "નોંધ, સેવા, ફાઈલ… શોધો",
		en: "Search notes, seva, files…"
	},
	emptyDay: {
		gu: "“નવી નોંધ” દબાવો, અથવા “નિયમિત દિનચર્યા ભરો” દબાવી આખો દિવસનો ક્રમ એક જ વારમાં ઉમેરો.",
		en: "Add a new entry, or fill the regular routine in one tap."
	},
	noEntries: {
		gu: "આ દિવસે હજુ કોઈ નોંધ નથી",
		en: "No entries for this day yet"
	},
	totalEntries: {
		gu: "કુલ નોંધ",
		en: "Total entries"
	},
	monthEntries: {
		gu: "આ મહિને નોંધ",
		en: "This month"
	},
	appearance: {
		gu: "દેખાવ",
		en: "Appearance"
	},
	theme: {
		gu: "થીમ",
		en: "Theme"
	},
	language: {
		gu: "ભાષા",
		en: "Language"
	},
	light: {
		gu: "ઉજાસ",
		en: "Light"
	},
	dark: {
		gu: "અંધારું",
		en: "Dark"
	},
	auto: {
		gu: "સ્વયં",
		en: "Auto"
	},
	popGlass: {
		gu: "પોપ ગ્લાસ",
		en: "Pop Glass"
	},
	royal: {
		gu: "રોયલ",
		en: "Royal"
	},
	minimal: {
		gu: "ન્યૂનતમ",
		en: "Minimal"
	},
	gujarati: {
		gu: "ગુજરાતી",
		en: "Gujarati"
	},
	english: {
		gu: "English",
		en: "English"
	},
	storage: {
		gu: "સ્ટોરેજ",
		en: "Storage"
	},
	active: {
		gu: "સક્રિય",
		en: "Active"
	},
	createFolder: {
		gu: "ફોલ્ડર બનાવો",
		en: "Create folder"
	},
	grid: {
		gu: "ગ્રિડ",
		en: "Grid"
	},
	list: {
		gu: "યાદી",
		en: "List"
	},
	photos: {
		gu: "ફોટા",
		en: "Photos"
	},
	pdfs: {
		gu: "PDF",
		en: "PDFs"
	},
	done: {
		gu: "પૂર્ણ",
		en: "Done"
	},
	pending: {
		gu: "બાકી",
		en: "Pending"
	},
	attach: {
		gu: "જોડાણ",
		en: "Attach"
	},
	close: {
		gu: "બંધ કરો",
		en: "Close"
	},
	open: {
		gu: "ખોલો",
		en: "Open"
	},
	download: {
		gu: "ડાઉનલોડ",
		en: "Download"
	},
	areYouSure: {
		gu: "શું તમે ખાતરી કરો છો?",
		en: "Are you sure?"
	},
	cannotUndo: {
		gu: "આ ક્રિયા પાછી લઈ શકાશે નહીં.",
		en: "This cannot be undone."
	},
	merge: {
		gu: "ભેળવો",
		en: "Merge"
	},
	replace: {
		gu: "બદલો",
		en: "Replace"
	},
	welcomeTitle: {
		gu: "Rojnishi Of Bms",
		en: "Rojnishi Of Bms"
	},
	welcomeBody: {
		gu: "તમારી દૈનિક નોંધ, વિદ્યા, કાર્ય, લેખન અને સેવા માટેનું વ્યક્તિગત ડિજિટલ અભિલેખાગાર.",
		en: "A private digital archive for daily notes, study, work, writing, and Seva."
	},
	statsDays: {
		gu: "કુલ દિવસોની નોંધ",
		en: "Days recorded"
	},
	statsEntries: {
		gu: "કુલ પ્રવૃત્તિઓ",
		en: "Total activities"
	},
	statsToday: {
		gu: "આજની પ્રવૃત્તિઓ",
		en: "Today's activities"
	},
	statsMonth: {
		gu: "આ મહિનાની પ્રવૃત્તિઓ",
		en: "This month"
	},
	statsSeva: {
		gu: "કુલ સેવા નોંધ",
		en: "Seva records"
	},
	statsPhotos: {
		gu: "કુલ ફોટા",
		en: "Photos"
	},
	statsPdfs: {
		gu: "કુલ PDF",
		en: "PDF documents"
	},
	statsFiles: {
		gu: "અપલોડ થયેલી ફાઈલો",
		en: "Uploaded files"
	},
	quick: {
		gu: "ઝડપી ક્રિયા",
		en: "Quick actions"
	},
	todayPanel: {
		gu: "આજનું",
		en: "Today"
	},
	completed: {
		gu: "પૂર્ણ થયેલી",
		en: "Completed"
	},
	pwa: {
		gu: "હોમ સ્ક્રીન પર ઉમેરો",
		en: "Add to Home Screen"
	},
	data: {
		gu: "ડેટા",
		en: "Data"
	},
	application: {
		gu: "એપ્લિકેશન",
		en: "Application"
	},
	editRoutine: {
		gu: "દિનચર્યા સુધારો",
		en: "Edit routine"
	},
	newRoutine: {
		gu: "નવી દિનચર્યા",
		en: "New routine"
	},
	routines: {
		gu: "દિનચર્યાઓ",
		en: "Routines"
	},
	noResults: {
		gu: "કોઈ પરિણામ નથી",
		en: "No results"
	},
	folder: {
		gu: "ફોલ્ડર",
		en: "Folder"
	},
	preview: {
		gu: "પૂર્વાવલોકન",
		en: "Preview"
	},
	sortName: {
		gu: "નામ",
		en: "Name"
	},
	sortDate: {
		gu: "તારીખ",
		en: "Date"
	},
	sortType: {
		gu: "પ્રકાર",
		en: "Type"
	},
	sortSize: {
		gu: "કદ",
		en: "Size"
	},
	details: {
		gu: "વિગત",
		en: "Details"
	},
	time: {
		gu: "સમય",
		en: "Time"
	},
	sequence: {
		gu: "ક્રમ",
		en: "Sequence"
	},
	materials: {
		gu: "આવશ્યક સામગ્રી",
		en: "Required materials"
	},
	special: {
		gu: "વિશેષ નોંધ",
		en: "Special notes"
	},
	festival: {
		gu: "ઉત્સવ સૂચના",
		en: "Festival instructions"
	},
	procedure: {
		gu: "સેવા વિગત",
		en: "Procedure"
	},
	sevaName: {
		gu: "સેવાનું નામ",
		en: "Seva name"
	},
	newPranalika: {
		gu: "નવી પ્રણાલિકા",
		en: "New procedure"
	},
	installHint: {
		gu: "એન્ડ્રોઇડ પર: બ્રાઉઝર મેનૂમાંથી “Add to Home screen” પસંદ કરો.",
		en: "On Android: use the browser menu → Add to Home screen."
	},
	offline: {
		gu: "ઑફલાઇન તૈયાર",
		en: "Ready offline"
	},
	dbActive: {
		gu: "Database સ્થિતિ: સક્રિય",
		en: "Database status: Active"
	},
	used: {
		gu: "વપરાયેલું સ્ટોરેજ",
		en: "Storage used"
	},
	includeFiles: {
		gu: "ફાઈલો (ફોટો/PDF) સાથે બેકઅપ",
		en: "Include files in backup"
	},
	showData: {
		gu: "ડેટા બતાવો",
		en: "Show data"
	},
	customCategory: {
		gu: "નવી શ્રેણી",
		en: "New category"
	},
	monthActivity: {
		gu: "માસિક પ્રવૃત્તિ",
		en: "Monthly activity"
	},
	categorySplit: {
		gu: "શ્રેણી વિતરણ",
		en: "Category distribution"
	},
	emptyFolder: {
		gu: "આ ફોલ્ડર ખાલી છે",
		en: "This folder is empty"
	},
	pickDate: {
		gu: "તારીખ પસંદ કરો",
		en: "Pick a date"
	},
	description: {
		gu: "વિગત લખો…",
		en: "Write details…"
	},
	dayNotePh: {
		gu: "આજનો સાર, નિર્ણય કે યાદ રાખવા જેવી વાત…",
		en: "Today's essence, a decision, something to remember…"
	}
};
function t(key, lang) {
	const row = dict[key];
	return lang === "en" ? row.en : row.gu;
}
var APP_VERSION = "1.0.0";
var DB_NAME = "rojnishi-of-bms";
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
	return `id_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}
function pad2(n) {
	return String(n).padStart(2, "0");
}
function keyOf(d) {
	return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function parseKey(key) {
	const [y, m, d] = key.split("-").map(Number);
	return new Date(y, (m ?? 1) - 1, d ?? 1);
}
function addDays(key, delta) {
	const dt = parseKey(key);
	dt.setDate(dt.getDate() + delta);
	return keyOf(dt);
}
function formatBytes(n) {
	if (!Number.isFinite(n) || n <= 0) return "0 B";
	const units = [
		"B",
		"KB",
		"MB",
		"GB"
	];
	const i = Math.min(units.length - 1, Math.floor(Math.log(n) / Math.log(1024)));
	const v = n / 1024 ** i;
	return `${v >= 10 || i === 0 ? v.toFixed(0) : v.toFixed(1)} ${units[i]}`;
}
function downloadBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.rel = "noopener";
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1500);
}
function extOf(name) {
	const i = name.lastIndexOf(".");
	return i >= 0 ? name.slice(i + 1).toLowerCase() : "";
}
function fileKind(mime, name) {
	if (mime.startsWith("image/")) return "image";
	if (mime === "application/pdf" || extOf(name) === "pdf") return "pdf";
	if (mime.startsWith("text/") || [
		"txt",
		"md",
		"csv",
		"json"
	].includes(extOf(name))) return "text";
	return "other";
}
var BLOCKED_EXT = /* @__PURE__ */ new Set([
	"html",
	"htm",
	"js",
	"mjs",
	"cjs",
	"exe",
	"bat",
	"cmd",
	"sh",
	"ps1",
	"com",
	"msi",
	"wasm"
]);
var BLOCKED_MIME = /* @__PURE__ */ new Set([
	"text/html",
	"application/javascript",
	"text/javascript",
	"application/x-msdownload",
	"application/x-executable"
]);
function isBlockedFile(file) {
	if (BLOCKED_EXT.has(extOf(file.name))) return true;
	if (file.type && BLOCKED_MIME.has(file.type)) return true;
	return false;
}
var IMAGE_ACCEPT = "image/jpeg,image/jpg,image/png,image/webp,.jpg,.jpeg,.png,.webp";
var PDF_ACCEPT = "application/pdf,.pdf";
var FILE_ACCEPT = `${IMAGE_ACCEPT},${PDF_ACCEPT},.txt,.md,.csv,.json,text/plain`;
async function blobToBase64(blob) {
	const buf = await blob.arrayBuffer();
	const bytes = new Uint8Array(buf);
	const chunk = 32768;
	let binary = "";
	for (let i = 0; i < bytes.length; i += chunk) binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
	return btoa(binary);
}
function base64ToBlob(b64, mime) {
	const binary = atob(b64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return new Blob([bytes], { type: mime || "application/octet-stream" });
}
var STORES = [
	"diary",
	"entries",
	"routines",
	"seva",
	"files",
	"fileblobs",
	"folders",
	"settings",
	"categories"
];
var dbPromise = null;
function reqToPromise(req) {
	return new Promise((resolve, reject) => {
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error ?? /* @__PURE__ */ new Error("IndexedDB request failed"));
	});
}
function txDone(tx) {
	return new Promise((resolve, reject) => {
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error ?? /* @__PURE__ */ new Error("IndexedDB tx failed"));
		tx.onabort = () => reject(tx.error ?? /* @__PURE__ */ new Error("IndexedDB tx aborted"));
	});
}
function openDb() {
	if (typeof indexedDB === "undefined") return Promise.reject(/* @__PURE__ */ new Error("IndexedDB is not available"));
	if (!dbPromise) dbPromise = new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, 1);
		req.onupgradeneeded = () => {
			const db = req.result;
			if (!db.objectStoreNames.contains("diary")) db.createObjectStore("diary", { keyPath: "id" });
			if (!db.objectStoreNames.contains("entries")) db.createObjectStore("entries", { keyPath: "id" }).createIndex("date", "date", { unique: false });
			if (!db.objectStoreNames.contains("routines")) db.createObjectStore("routines", { keyPath: "id" });
			if (!db.objectStoreNames.contains("seva")) db.createObjectStore("seva", { keyPath: "id" }).createIndex("folderId", "folderId", { unique: false });
			if (!db.objectStoreNames.contains("files")) db.createObjectStore("files", { keyPath: "id" }).createIndex("folderId", "folderId", { unique: false });
			if (!db.objectStoreNames.contains("fileblobs")) db.createObjectStore("fileblobs", { keyPath: "id" });
			if (!db.objectStoreNames.contains("folders")) db.createObjectStore("folders", { keyPath: "id" }).createIndex("space", "space", { unique: false });
			if (!db.objectStoreNames.contains("settings")) db.createObjectStore("settings", { keyPath: "id" });
			if (!db.objectStoreNames.contains("categories")) db.createObjectStore("categories", { keyPath: "id" });
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => {
			dbPromise = null;
			reject(req.error ?? /* @__PURE__ */ new Error("Failed to open database"));
		};
	});
	return dbPromise;
}
async function idbPut(store, value) {
	const tx = (await openDb()).transaction(store, "readwrite");
	tx.objectStore(store).put(value);
	await txDone(tx);
}
async function idbPutMany(store, values) {
	if (!values.length) return;
	const tx = (await openDb()).transaction(store, "readwrite");
	const os = tx.objectStore(store);
	for (const v of values) os.put(v);
	await txDone(tx);
}
async function idbGet(store, key) {
	return reqToPromise((await openDb()).transaction(store, "readonly").objectStore(store).get(key));
}
async function idbGetAll(store) {
	return reqToPromise((await openDb()).transaction(store, "readonly").objectStore(store).getAll());
}
async function idbDelete(store, key) {
	const tx = (await openDb()).transaction(store, "readwrite");
	tx.objectStore(store).delete(key);
	await txDone(tx);
}
async function idbClear(store) {
	const tx = (await openDb()).transaction(store, "readwrite");
	tx.objectStore(store).clear();
	await txDone(tx);
}
function defaultSettings() {
	const now = Date.now();
	return {
		id: "app",
		appearance: "light",
		theme: "pop-glass",
		language: "gu",
		hasSeenWelcome: false,
		seedVersion: 0,
		createdAt: now,
		updatedAt: now
	};
}
function folder(id, name, parentId, space) {
	return {
		id,
		name,
		parentId,
		space,
		createdAt: Date.now()
	};
}
async function seedIfNeeded() {
	const existing = await idbGet("settings", "app") ?? defaultSettings();
	if (existing.seedVersion >= 1) {
		if (!existing.id) existing.id = "app";
		await idbPut("settings", existing);
		return;
	}
	const now = Date.now();
	const folders = [folder(FILES_ROOT_ID, "Files", null, "files"), folder(SEVA_ROOT_ID, "શ્રી દેવદમન સેવા", null, "seva")];
	const folderIdByName = /* @__PURE__ */ new Map();
	for (const node of SEVA_FOLDER_TREE) {
		const id = uid();
		folders.push(folder(id, node.name, SEVA_ROOT_ID, "seva"));
		folderIdByName.set(node.name, id);
		for (const child of node.children ?? []) {
			const cid = uid();
			folders.push(folder(cid, child, id, "seva"));
			folderIdByName.set(child, cid);
		}
	}
	const routines = NAMED_ROUTINES.map((r) => ({
		id: r.id,
		name: r.name,
		items: r.pick.map((i) => ({ ...DEFAULT_ROUTINE[i] })),
		createdAt: now,
		updatedAt: now
	}));
	const seva = PRANALIKA_TEMPLATES.map((p) => ({
		id: uid(),
		title: p.title,
		category: p.folderName,
		folderId: folderIdByName.get(p.folderName) ?? "seva-root",
		content: "",
		date: keyOf(/* @__PURE__ */ new Date()),
		time: p.time,
		sequence: p.sequence,
		materials: "",
		notes: "",
		special: "",
		festival: "",
		attachments: [],
		kind: "pranalika",
		createdAt: now,
		updatedAt: now
	}));
	await idbPutMany("folders", folders);
	await idbPutMany("routines", routines);
	await idbPutMany("seva", seva);
	await idbPutMany("categories", DEFAULT_CATEGORIES);
	await idbPut("settings", {
		...existing,
		id: "app",
		seedVersion: 1,
		updatedAt: now
	});
}
async function loadAll() {
	await seedIfNeeded();
	const [days, entries, routines, seva, files, folders, settings, categories] = await Promise.all([
		idbGetAll("diary"),
		idbGetAll("entries"),
		idbGetAll("routines"),
		idbGetAll("seva"),
		idbGetAll("files"),
		idbGetAll("folders"),
		idbGet("settings", "app"),
		idbGetAll("categories")
	]);
	return {
		days,
		entries,
		routines,
		seva,
		files,
		folders,
		settings: settings ?? defaultSettings(),
		categories: categories.length ? categories : DEFAULT_CATEGORIES
	};
}
function readLegacyLocalStorage() {
	if (typeof localStorage === "undefined") return null;
	for (const k of LEGACY_LS_KEYS) {
		const raw = localStorage.getItem(k);
		if (!raw) continue;
		try {
			return JSON.parse(raw);
		} catch {}
	}
	return null;
}
async function putFileBlob(id, blob) {
	await idbPut("fileblobs", {
		id,
		blob
	});
}
async function getFileBlob(id) {
	return (await idbGet("fileblobs", id))?.blob;
}
async function deleteFileAndBlob(id) {
	await idbDelete("files", id);
	await idbDelete("fileblobs", id);
}
async function clearAllStoresHard() {
	for (const s of STORES) await idbClear(s);
}
async function buildBackup(data, includeFiles) {
	const payload = {
		version: 1,
		app: "rojnishi-of-bms",
		exportedAt: Date.now(),
		...data
	};
	if (includeFiles) {
		const fileData = {};
		for (const f of data.files) {
			const blob = await getFileBlob(f.id);
			if (!blob) continue;
			fileData[f.id] = {
				mimeType: f.mimeType,
				base64: await blobToBase64(blob)
			};
		}
		payload.fileData = fileData;
	}
	return payload;
}
function validateBackup(raw) {
	if (!raw || typeof raw !== "object") throw new Error("invalid");
	const obj = raw;
	const keys = Object.keys(obj);
	if (!("app" in obj) && !("entries" in obj) && keys.length > 0 && keys.every((k) => /^\d{4}-\d{2}-\d{2}$/.test(k) || k === "entries" || k === "note") || isLegacyDayMap(obj)) return migrateLegacyStore(obj);
	if (obj.app && obj.app !== "rojnishi-of-bms") {}
	return {
		version: typeof obj.version === "number" ? obj.version : 1,
		app: "rojnishi-of-bms",
		exportedAt: typeof obj.exportedAt === "number" ? obj.exportedAt : Date.now(),
		settings: obj.settings ?? void 0,
		days: Array.isArray(obj.days) ? obj.days : [],
		entries: Array.isArray(obj.entries) ? obj.entries : [],
		routines: Array.isArray(obj.routines) ? obj.routines : [],
		folders: Array.isArray(obj.folders) ? obj.folders : [],
		files: Array.isArray(obj.files) ? obj.files : [],
		fileData: obj.fileData && typeof obj.fileData === "object" ? obj.fileData : void 0,
		seva: Array.isArray(obj.seva) ? obj.seva : [],
		categories: Array.isArray(obj.categories) ? obj.categories : []
	};
}
function isLegacyDayMap(obj) {
	const keys = Object.keys(obj).filter((k) => /^\d{4}-\d{2}-\d{2}$/.test(k));
	if (!keys.length) return false;
	const sample = obj[keys[0]];
	return !!sample && typeof sample === "object" && "entries" in sample;
}
function migrateLegacyStore(obj) {
	const days = [];
	const entries = [];
	const now = Date.now();
	for (const [date, rec] of Object.entries(obj)) {
		if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
		const r = rec ?? {};
		const list = Array.isArray(r.entries) ? r.entries : [];
		days.push({
			id: date,
			date,
			note: typeof r.note === "string" ? r.note : "",
			attachments: [],
			createdAt: now,
			updatedAt: now
		});
		list.forEach((e, i) => {
			const row = e ?? {};
			entries.push({
				id: `${date}-${i}-${now}`,
				date,
				time: typeof row.t === "string" ? row.t : "",
				description: typeof row.d === "string" ? row.d : "",
				pillar: typeof row.p === "string" ? row.p : "other",
				note: "",
				status: "pending",
				attachments: [],
				order: i,
				createdAt: now,
				updatedAt: now
			});
		});
	}
	return {
		version: 1,
		app: "rojnishi-of-bms",
		exportedAt: now,
		days,
		entries,
		routines: [],
		folders: [],
		files: [],
		seva: [],
		categories: []
	};
}
function fileDataToBlobs(data) {
	const out = [];
	for (const [id, row] of Object.entries(data)) {
		if (!row?.base64) continue;
		out.push({
			id,
			blob: base64ToBlob(row.base64, row.mimeType || "application/octet-stream")
		});
	}
	return out;
}
var saveTimer;
function dayRecord(days, date) {
	const existing = days[date];
	if (existing) return existing;
	const now = Date.now();
	return {
		id: date,
		date,
		note: "",
		attachments: [],
		createdAt: now,
		updatedAt: now
	};
}
function applyDocumentChrome(settings) {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	let appearance = settings.appearance;
	if (appearance === "auto") appearance = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	root.dataset.appearance = appearance;
	root.dataset.theme = settings.theme;
	root.lang = settings.language === "en" ? "en" : "gu";
}
var useApp = create((set, get) => ({
	ready: false,
	saveState: "saved",
	legacyPrompt: null,
	selectedDate: keyOf(/* @__PURE__ */ new Date()),
	viewY: (/* @__PURE__ */ new Date()).getFullYear(),
	viewM: (/* @__PURE__ */ new Date()).getMonth(),
	days: {},
	entries: [],
	routines: [],
	seva: [],
	files: [],
	folders: [],
	categories: [],
	settings: defaultSettings(),
	confirm: {
		open: false,
		title: "",
		message: ""
	},
	viewer: { open: false },
	urlCache: {},
	setSaving: () => {
		set({ saveState: "saving" });
		if (saveTimer) clearTimeout(saveTimer);
	},
	setSaved: () => {
		if (saveTimer) clearTimeout(saveTimer);
		saveTimer = setTimeout(() => set({ saveState: "saved" }), 280);
	},
	init: async () => {
		try {
			const data = await loadAll();
			const days = {};
			for (const d of data.days) days[d.id] = d;
			const now = /* @__PURE__ */ new Date();
			set({
				ready: true,
				days,
				entries: data.entries,
				routines: data.routines,
				seva: data.seva,
				files: data.files,
				folders: data.folders,
				categories: data.categories,
				settings: data.settings,
				selectedDate: keyOf(now),
				viewY: now.getFullYear(),
				viewM: now.getMonth(),
				legacyPrompt: readLegacyLocalStorage()
			});
			applyDocumentChrome(data.settings);
		} catch (err) {
			console.error(err);
			set({
				ready: true,
				saveState: "error"
			});
			toast.error("⚠️ કંઈક ખોટું થયું");
		}
	},
	applyChrome: () => applyDocumentChrome(get().settings),
	setView: (y, m) => {
		let yy = y;
		let mm = m;
		if (mm < 0) {
			mm = 11;
			yy -= 1;
		}
		if (mm > 11) {
			mm = 0;
			yy += 1;
		}
		set({
			viewY: yy,
			viewM: mm
		});
	},
	selectDate: (key) => {
		const [y, m] = key.split("-").map(Number);
		set({
			selectedDate: key,
			viewY: y,
			viewM: m - 1
		});
	},
	goToday: () => {
		const n = /* @__PURE__ */ new Date();
		set({
			selectedDate: keyOf(n),
			viewY: n.getFullYear(),
			viewM: n.getMonth()
		});
	},
	ensureDay: (date) => {
		const rec = dayRecord(get().days, date);
		if (!get().days[date]) {
			set({ days: {
				...get().days,
				[date]: rec
			} });
			idbPut("diary", rec);
		}
		return rec;
	},
	addEntry: async (date, partial) => {
		const d = date ?? get().selectedDate;
		get().ensureDay(d);
		const now = Date.now();
		const siblings = get().entries.filter((e) => e.date === d);
		const entry = {
			id: uid(),
			date: d,
			time: "",
			description: "",
			pillar: "vidya",
			note: "",
			status: "pending",
			attachments: [],
			order: siblings.length,
			createdAt: now,
			updatedAt: now,
			...partial
		};
		set({ entries: [...get().entries, entry] });
		get().setSaving();
		await idbPut("entries", entry);
		get().setSaved();
		toast.success("✓ નોંધ સાચવાઈ");
		return entry;
	},
	updateEntry: async (id, patch) => {
		const entries = get().entries.map((e) => e.id === id ? {
			...e,
			...patch,
			updatedAt: Date.now()
		} : e);
		const next = entries.find((e) => e.id === id);
		if (!next) return;
		set({ entries });
		get().setSaving();
		await idbPut("entries", next);
		get().setSaved();
	},
	deleteEntry: async (id) => {
		if (!await get().ask({
			title: t("delete", get().settings.language),
			message: t("cannotUndo", get().settings.language),
			danger: true,
			confirmLabel: t("delete", get().settings.language)
		})) return;
		set({ entries: get().entries.filter((e) => e.id !== id) });
		get().setSaving();
		await idbDelete("entries", id);
		get().setSaved();
	},
	duplicateEntry: async (id) => {
		const src = get().entries.find((e) => e.id === id);
		if (!src) return;
		await get().addEntry(src.date, {
			time: src.time,
			description: src.description,
			pillar: src.pillar,
			note: src.note,
			status: "pending",
			attachments: [...src.attachments]
		});
	},
	reorderEntry: async (id, dir) => {
		const src = get().entries.find((e) => e.id === id);
		if (!src) return;
		const list = get().entries.filter((e) => e.date === src.date).sort((a, b) => a.order - b.order || a.time.localeCompare(b.time));
		const i = list.findIndex((e) => e.id === id);
		const j = i + dir;
		if (j < 0 || j >= list.length) return;
		const a = list[i];
		const b = list[j];
		const ao = a.order;
		a.order = b.order;
		b.order = ao;
		a.updatedAt = Date.now();
		b.updatedAt = Date.now();
		set({ entries: get().entries.map((e) => e.id === a.id ? a : e.id === b.id ? b : e) });
		await idbPutMany("entries", [a, b]);
	},
	toggleEntry: async (id) => {
		const src = get().entries.find((e) => e.id === id);
		if (!src) return;
		await get().updateEntry(id, { status: src.status === "done" ? "pending" : "done" });
	},
	setDayNote: async (date, note) => {
		const rec = {
			...get().ensureDay(date),
			note,
			updatedAt: Date.now()
		};
		set({ days: {
			...get().days,
			[date]: rec
		} });
		get().setSaving();
		await idbPut("diary", rec);
		get().setSaved();
	},
	clearDay: async (date) => {
		if (!await get().ask({
			title: t("clearDay", get().settings.language),
			message: t("cannotUndo", get().settings.language),
			danger: true
		})) return;
		const rest = get().entries.filter((e) => e.date !== date);
		const days = { ...get().days };
		delete days[date];
		set({
			entries: rest,
			days
		});
		const doomed = get().entries.filter((e) => e.date === date);
		for (const e of doomed) await idbDelete("entries", e.id);
		await idbDelete("diary", date);
		toast.success("આ દિવસની નોંધ ભૂંસાઈ.");
	},
	applyRoutine: async (routineId, date) => {
		const r = get().routines.find((x) => x.id === routineId);
		if (!r) return;
		get().ensureDay(date);
		const existing = get().entries.filter((e) => e.date === date);
		const now = Date.now();
		const added = [];
		r.items.forEach((item, i) => {
			if (existing.some((e) => e.time === item.time && e.description === item.description)) return;
			added.push({
				id: uid(),
				date,
				time: item.time,
				description: item.description,
				pillar: item.pillar,
				note: "",
				status: "pending",
				attachments: [],
				order: existing.length + i,
				createdAt: now,
				updatedAt: now
			});
		});
		if (!added.length) {
			toast.success("દિનચર્યા પહેલેથી છે.");
			return;
		}
		set({ entries: [...get().entries, ...added] });
		await idbPutMany("entries", added);
		toast.success("નિયમિત દિનચર્યાનો ક્રમ ઉમેરાયો — હવે વિગત પ્રમાણે સુધારી લેવો.");
	},
	copyDay: async (from, to) => {
		if (from === to) return;
		get().ensureDay(to);
		const srcDay = get().days[from];
		const srcEntries = get().entries.filter((e) => e.date === from);
		const now = Date.now();
		const copies = srcEntries.map((e, i) => ({
			...e,
			id: uid(),
			date: to,
			status: "pending",
			order: i,
			createdAt: now,
			updatedAt: now
		}));
		if (srcDay?.note) {
			const rec = {
				...get().ensureDay(to),
				note: srcDay.note,
				updatedAt: now
			};
			set({ days: {
				...get().days,
				[to]: rec
			} });
			await idbPut("diary", rec);
		}
		set({ entries: [...get().entries, ...copies] });
		await idbPutMany("entries", copies);
		toast.success("✓ નોંધ સાચવાઈ");
	},
	saveRoutine: async (r) => {
		const next = {
			...r,
			updatedAt: Date.now()
		};
		set({ routines: get().routines.map((x) => x.id === r.id ? next : x) });
		await idbPut("routines", next);
		toast.success("✓ નોંધ સાચવાઈ");
	},
	createRoutine: async (name) => {
		const r = {
			id: uid(),
			name,
			items: [],
			createdAt: Date.now(),
			updatedAt: Date.now()
		};
		set({ routines: [...get().routines, r] });
		await idbPut("routines", r);
		return r;
	},
	deleteRoutine: async (id) => {
		if (!await get().ask({
			title: t("delete", get().settings.language),
			message: t("cannotUndo", get().settings.language),
			danger: true
		})) return;
		set({ routines: get().routines.filter((r) => r.id !== id) });
		await idbDelete("routines", id);
	},
	addCategory: async (nameGu, color) => {
		const c = {
			id: uid(),
			nameGu,
			nameEn: nameGu,
			color,
			builtin: false,
			order: get().categories.length
		};
		set({ categories: [...get().categories, c] });
		await idbPut("categories", c);
	},
	saveSeva: async (rec) => {
		const next = {
			...rec,
			updatedAt: Date.now()
		};
		set({ seva: get().seva.some((s) => s.id === rec.id) ? get().seva.map((s) => s.id === rec.id ? next : s) : [...get().seva, next] });
		await idbPut("seva", next);
		toast.success("✓ સેવા પ્રણાલિકા સાચવાઈ");
	},
	deleteSeva: async (id) => {
		if (!await get().ask({
			title: t("delete", get().settings.language),
			message: t("cannotUndo", get().settings.language),
			danger: true
		})) return;
		set({ seva: get().seva.filter((s) => s.id !== id) });
		await idbDelete("seva", id);
	},
	duplicateSeva: async (id) => {
		const src = get().seva.find((s) => s.id === id);
		if (!src) return;
		const copy = {
			...src,
			id: uid(),
			title: `${src.title} (નકલ)`,
			createdAt: Date.now(),
			updatedAt: Date.now()
		};
		await get().saveSeva(copy);
		return copy;
	},
	createFolder: async (name, parentId, space) => {
		const f = {
			id: uid(),
			name,
			parentId,
			space,
			createdAt: Date.now()
		};
		set({ folders: [...get().folders, f] });
		await idbPut("folders", f);
		return f;
	},
	renameFolder: async (id, name) => {
		const folders = get().folders.map((f) => f.id === id ? {
			...f,
			name
		} : f);
		const next = folders.find((f) => f.id === id);
		if (!next) return;
		set({ folders });
		await idbPut("folders", next);
	},
	deleteFolder: async (id) => {
		if (id === "files-root" || id === "seva-root") return;
		if (!await get().ask({
			title: t("delete", get().settings.language),
			message: t("cannotUndo", get().settings.language),
			danger: true
		})) return;
		const folder = get().folders.find((f) => f.id === id);
		const fallback = folder?.parentId ?? (folder?.space === "seva" ? "seva-root" : "files-root");
		const files = get().files.map((f) => f.folderId === id ? {
			...f,
			folderId: fallback
		} : f);
		const folders = get().folders.filter((f) => f.id !== id).map((f) => f.parentId === id ? {
			...f,
			parentId: fallback
		} : f);
		const seva = get().seva.map((s) => s.folderId === id ? {
			...s,
			folderId: fallback
		} : s);
		set({
			files,
			folders,
			seva
		});
		await idbDelete("folders", id);
		await idbPutMany("files", files.filter((f) => f.folderId === fallback));
		await idbPutMany("seva", seva.filter((s) => s.folderId === fallback));
	},
	uploadFiles: async (list, folderId, link) => {
		const saved = [];
		for (const file of list) {
			if (isBlockedFile(file)) {
				toast.error("આ ફાઈલ પ્રકાર માન્ય નથી.");
				continue;
			}
			if (file.size > 41943040) {
				toast.error("ફાઈલ ૪૦ MBથી મોટી છે.");
				continue;
			}
			const meta = {
				id: uid(),
				name: file.name,
				type: fileKind(file.type, file.name),
				size: file.size,
				mimeType: file.type || "application/octet-stream",
				createdAt: Date.now(),
				folderId,
				...link
			};
			await putFileBlob(meta.id, file);
			await idbPut("files", meta);
			saved.push(meta);
			if (meta.type === "image") toast.success("✓ ફોટો અપલોડ થયો");
			else if (meta.type === "pdf") toast.success("✓ PDF સાચવાઈ");
			else toast.success("✓ નોંધ સાચવાઈ");
		}
		if (saved.length) set({ files: [...get().files, ...saved] });
		return saved;
	},
	renameFile: async (id, name) => {
		const files = get().files.map((f) => f.id === id ? {
			...f,
			name
		} : f);
		const next = files.find((f) => f.id === id);
		if (!next) return;
		set({ files });
		await idbPut("files", next);
	},
	moveFile: async (id, folderId) => {
		const files = get().files.map((f) => f.id === id ? {
			...f,
			folderId
		} : f);
		const next = files.find((f) => f.id === id);
		if (!next) return;
		set({ files });
		await idbPut("files", next);
	},
	deleteFile: async (id) => {
		if (!await get().ask({
			title: t("delete", get().settings.language),
			message: t("cannotUndo", get().settings.language),
			danger: true
		})) return;
		set({ files: get().files.filter((f) => f.id !== id) });
		const cache = { ...get().urlCache };
		if (cache[id]) {
			URL.revokeObjectURL(cache[id]);
			delete cache[id];
		}
		set({ urlCache: cache });
		await deleteFileAndBlob(id);
	},
	fileUrl: async (id) => {
		const cached = get().urlCache[id];
		if (cached) return cached;
		const blob = await getFileBlob(id);
		if (!blob) return;
		const url = URL.createObjectURL(blob);
		set({ urlCache: {
			...get().urlCache,
			[id]: url
		} });
		return url;
	},
	updateSettings: async (patch) => {
		const settings = {
			...get().settings,
			...patch,
			id: "app",
			updatedAt: Date.now()
		};
		set({ settings });
		applyDocumentChrome(settings);
		await idbPut("settings", settings);
	},
	markWelcome: async () => {
		await get().updateSettings({ hasSeenWelcome: true });
	},
	exportBackup: async (includeFiles) => {
		const s = get();
		const payload = await buildBackup({
			settings: s.settings,
			days: Object.values(s.days),
			entries: s.entries,
			routines: s.routines,
			folders: s.folders,
			files: s.files,
			seva: s.seva,
			categories: s.categories
		}, includeFiles);
		await get().updateSettings({ lastBackupAt: Date.now() });
		toast.success("✓ બેકઅપ તૈયાર");
		return payload;
	},
	importBackup: async (raw, mode) => {
		const parsed = validateBackup(raw);
		if (!await get().ask({
			title: mode === "replace" ? "બધો ડેટા બદલાશે" : "ડેટા ભેળવાશે",
			message: t("areYouSure", get().settings.language),
			danger: mode === "replace",
			confirmLabel: mode === "replace" ? t("replace", get().settings.language) : t("merge", get().settings.language)
		})) return;
		if (mode === "replace") {
			await clearAllStoresHard();
			await seedIfNeeded();
		}
		if (parsed.days.length) await idbPutMany("diary", parsed.days);
		if (parsed.entries.length) await idbPutMany("entries", parsed.entries);
		if (parsed.routines.length) await idbPutMany("routines", parsed.routines);
		if (parsed.folders.length) await idbPutMany("folders", parsed.folders);
		if (parsed.files.length) await idbPutMany("files", parsed.files);
		if (parsed.seva.length) await idbPutMany("seva", parsed.seva);
		if (parsed.categories.length) await idbPutMany("categories", parsed.categories);
		if (parsed.settings) await idbPut("settings", {
			...get().settings,
			...parsed.settings,
			id: "app",
			seedVersion: 1,
			hasSeenWelcome: true
		});
		if (parsed.fileData) for (const row of fileDataToBlobs(parsed.fileData)) await putFileBlob(row.id, row.blob);
		await get().init();
		toast.success("ડેટા આયાત થયો.");
	},
	wipeAll: async () => {
		if (!await get().ask({
			title: t("wipe", get().settings.language),
			message: t("cannotUndo", get().settings.language),
			danger: true,
			confirmLabel: t("wipe", get().settings.language)
		})) return;
		await clearAllStoresHard();
		await seedIfNeeded();
		await get().init();
		toast.success("બધો ડેટા ભૂંસાયો.");
	},
	migrateLegacy: async (raw) => {
		await get().importBackup(raw, "merge");
		get().dismissLegacy();
	},
	dismissLegacy: () => set({ legacyPrompt: null }),
	ask: (opts) => new Promise((resolve) => {
		set({ confirm: {
			open: true,
			...opts,
			resolve
		} });
	}),
	closeConfirm: (v) => {
		get().confirm.resolve?.(v);
		set({ confirm: {
			open: false,
			title: "",
			message: ""
		} });
	},
	openViewer: (fileId) => {
		const f = get().files.find((x) => x.id === fileId);
		if (!f) return;
		set({ viewer: {
			open: true,
			fileId,
			kind: f.type
		} });
	},
	closeViewer: () => set({ viewer: { open: false } })
}));
function entriesFor(date, entries) {
	return entries.filter((e) => e.date === date).sort((a, b) => (a.time || "99:99").localeCompare(b.time || "99:99") || a.order - b.order);
}
function pillarColor(id, categories) {
	const c = categories.find((x) => x.id === id);
	if (c) return c.color;
	return PILLARS[id]?.c ?? PILLARS.other.c;
}
function pillarName(id, categories, lang) {
	const c = categories.find((x) => x.id === id);
	if (c) return lang === "en" ? c.nameEn : c.nameGu;
	const p = PILLARS[id];
	if (p) return lang === "en" ? p.nEn : p.n;
	return id;
}
//#endregion
export { uid as A, entriesFor as C, pillarColor as D, parseKey as E, pillarName as O, downloadBlob as S, keyOf as T, WEEKDAYS_GU as _, FOOTER_VERSE as a, addDays as b, GU_DIGITS as c, MONTHS_EN as d, MONTHS_GU as f, WEEKDAYS_EN as g, SEVA_ROOT_ID as h, FILE_ACCEPT as i, useApp as j, t as k, HUKAM as l, PDF_ACCEPT as m, APP_VERSION as n, GUJARATI_MONTHS as o, OWNER_LINE as p, FILES_ROOT_ID as r, GUJARATI_NEW_YEAR as s, APP_NAME as t, IMAGE_ACCEPT as u, WEEK_HDR_EN as v, formatBytes as w, cn as x, WEEK_HDR_GU as y };
