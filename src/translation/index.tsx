import { DEFAULT_LOCALE } from "../config";
import { createStoredSignal } from "../lib/createStoredSignal";
// KEYS
export const EXPIRES_m = "1";
export const EXPIRES_h = "2";
export const EXPIRES_d = "3";
export const EXPIRES_w = "4";
export const EXPIRES_mo = "5";
export const EXPIRES_y = "6";
export const EXPIRES_no = "7";
export const EXPIRES_uv = "8";
export const EXPIRES_v = "9";
export const STATUS_SUBMITTING = "a";
export const STATUS_SUCCESS = "b";
export const STATUS_FAILED = "c";
export const STATUS_EMPTY = "d";
export const HIGHLIGHT_AS = "e";
export const PREVIEW = "f";
export const SCROLL_DOWN = "g";
export const INSERT_YOUR_PASTE = "h";
export const PREVIEWING_AS = "i";
export const CREATE = "j";
export const COPIED = "k";
export const COPY = "l";
export const CLEAR = "m";
export const ARE_YOU_SURE_CLEAR = "n";
// view
export const INCORRECT = "p";
export const CLONE = "q";
export const DISABLE_ADBLOCKER = "r";
export const PASTE_NOT_FOUND = "s";
export const PASSWORD_REQUIRED = "t";
export const PASSWORD = "u";
export const EMAIL = "v";
// report
export const ERROR_INSERT_MIN_ONE_LINK = "x";
export const ERROR_INVALID_LINK = "y";
export const ERROR_SHORT_NOTIFICATION = "z";
export const ERROR_EMAIL = "10";
export const REPORT_COPYRIGHT = "11";
export const PLEASE_INSERT_LINKS = "12";
export const EXAMPLE = "13";
export const PLEASE_OFFICIAL_NOTIFICATION = "14";
export const PLEASE_EMAIL = "15";
export const SUBMIT = "16";
export const REQUEST_FAILED = "17";
export const REQUEST_SUBMITTED = "18";
// footer
export const DMCA_REPORT = "1a";
export const BUILT_BY = "1b";
// \ KEYS

const en = {
	// create
	[EXPIRES_m]: (n) => `expires in ${n} minute${n === 1 ? "" : "s"}`,
	[EXPIRES_h]: (n) => `expires in ${n} hour${n === 1 ? "" : "s"}`,
	[EXPIRES_d]: (n) => `expires in ${n} day${n === 1 ? "" : "s"}`,
	[EXPIRES_w]: (n) => `expires in ${n} week${n === 1 ? "" : "s"}`,
	[EXPIRES_mo]: (n) => `expires in ${n} month${n === 1 ? "" : "s"}`,
	[EXPIRES_y]: (n) => `expires in ${n} year${n === 1 ? "" : "s"}`,
	[EXPIRES_no]: "never expires",
	[EXPIRES_uv]: "with unlimited views",
	[EXPIRES_v]: (v) => `or after ${v} view${v === 1 ? "" : "s"}`,
	[STATUS_SUBMITTING]: "submitting",
	[STATUS_SUCCESS]: "success",
	[STATUS_FAILED]: "that didn't work, try again",
	[STATUS_EMPTY]: "your paste is empty",
	[HIGHLIGHT_AS]: "highlight as ",
	[PREVIEW]: "preview",
	[SCROLL_DOWN]: "scroll down to see",
	[INSERT_YOUR_PASTE]: "insert your paste here",
	[PREVIEWING_AS]: (l) => `previewing as ${l}`,
	[CREATE]: "CREATE",
	[COPIED]: "copied!",
	[COPY]: "copy",
	[CLEAR]: "clear",
	[ARE_YOU_SURE_CLEAR]:
		"You have unsaved changes.\nAre you sure you want to clear your paste?",

	// view
	[INCORRECT]: "INCORRECT",
	[CLONE]: "clone",
	[PASTE_NOT_FOUND]: "PASTE NOT FOUND",
	[PASSWORD_REQUIRED]: "PASSWORD REQUIRED",
	[DISABLE_ADBLOCKER]:
		"please, consider disabling your adblocker to support the website",
	[PASSWORD]: "password",
	[EMAIL]: "email",

	// report
	[ERROR_INSERT_MIN_ONE_LINK]: "insert at least one link",
	[ERROR_INVALID_LINK]: (l) => `link "${l}" is invalid`,
	[ERROR_SHORT_NOTIFICATION]: (n) =>
		`the official notification should be at least ${n} characters long`,
	[ERROR_EMAIL]: "your email is invalid",
	[REPORT_COPYRIGHT]: "report copyright infringements",
	[PLEASE_INSERT_LINKS]: "please insert all the infringing links, one per line",
	[EXAMPLE]: (l) => `eg. ${l}`,
	[PLEASE_OFFICIAL_NOTIFICATION]:
		"please provide an official notification under Section 512(c) of the Digital Millennium Copyright Act of 1998 (”DMCA”)",
	[PLEASE_EMAIL]: "please provide your email for additional verification",
	[SUBMIT]: "SUBMIT",
	[REQUEST_FAILED]: "your request couldn't be submitted, please retry",
	[REQUEST_SUBMITTED]: "your request was submitted successfully",

	// footer
	[DMCA_REPORT]: "DMCA report",
	[BUILT_BY]: "built by",
};

const it = {
	// create
	[EXPIRES_m]: (n) => `scade in ${n} minut${n === 1 ? "o" : "i"}`,
	[EXPIRES_h]: (n) => `scade in ${n} or${n === 1 ? "a" : "e"}`,
	[EXPIRES_d]: (n) => `scade in ${n} giorn${n === 1 ? "o" : "i"}`,
	[EXPIRES_w]: (n) => `scade in ${n} settiman${n === 1 ? "a" : "e"}`,
	[EXPIRES_mo]: (n) => `scade in ${n} mes${n === 1 ? "e" : "i"}`,
	[EXPIRES_y]: (n) => `scade in ${n} ann${n === 1 ? "o" : "i"}`,
	[EXPIRES_no]: "non scade",
	[EXPIRES_uv]: "con visite illimitate",
	[EXPIRES_v]: (v) => `o dopo ${v} visit${v === 1 ? "a" : "e"}`,
	[STATUS_SUBMITTING]: "inviando",
	[STATUS_SUCCESS]: "successo",
	[STATUS_FAILED]: "errore, prova di nuovo",
	[STATUS_EMPTY]: "il tuo paste è vuoto",
	[HIGHLIGHT_AS]: "evidenzia come ",
	[PREVIEW]: "anteprima",
	[SCROLL_DOWN]: "scrolla in basso",
	[INSERT_YOUR_PASTE]: "inserisci qui il tuo paste",
	[PREVIEWING_AS]: (l) => `anteprima come ${l}`,
	[CREATE]: "CREA",
	[COPIED]: "copiato!",
	[COPY]: "copia",
	[CLEAR]: "cancella",
	[ARE_YOU_SURE_CLEAR]:
		"Hai delle modifiche non salvate.\nSei sicuro di voler cancellare il tuo paste?",

	// view
	[INCORRECT]: "SBAGLIATO",
	[CLONE]: "duplica",
	[PASTE_NOT_FOUND]: "PASTE NON TROVATO",
	[PASSWORD_REQUIRED]: "PASSWORD RICHIESTA",
	[DISABLE_ADBLOCKER]:
		"per favore, considera di disabilitare il tuo adblocker per supportare il sito",
	[PASSWORD]: "password",
	[EMAIL]: "email",

	// report
	[ERROR_INSERT_MIN_ONE_LINK]: "inserisci almeno un link",
	[ERROR_INVALID_LINK]: (l) => `il link "${l}" non è valido`,
	[ERROR_SHORT_NOTIFICATION]: (n) =>
		`la notifica ufficiale deve contenere almeno ${n} caratteri`,
	[ERROR_EMAIL]: "il tuo indirizzo email è invalidi",
	[REPORT_COPYRIGHT]: "segnala violazioni del copyright",
	[PLEASE_INSERT_LINKS]:
		"per favore inserisci tutti i links che violano il tuo copyright, uno per linea",
	[EXAMPLE]: (l) => `ex. ${l}`,
	[PLEASE_OFFICIAL_NOTIFICATION]:
		"per favore fornisci una notifica ufficiale secondo la Sezione 512(c) del Digital Millennium Copyright Act del 1998 (”DMCA”)",
	[PLEASE_EMAIL]:
		"per favore fornisci il tuo indirizzo email per ulteriori verifiche",
	[SUBMIT]: "INVIA",
	[REQUEST_FAILED]:
		"la tua richiesta non è stata inviata, per favore riprova più tardi",
	[REQUEST_SUBMITTED]: "la tua richiesta è stata inviata",

	// footer
	[DMCA_REPORT]: "segnalazioni DMCA",
	[BUILT_BY]: "sviluppato da",
};

const es = {
	// create
	[EXPIRES_m]: (n) => `expira en ${n} minuto${n === 1 ? "" : "s"}`,
	[EXPIRES_h]: (n) => `expira en ${n} hora${n === 1 ? "" : "s"}`,
	[EXPIRES_d]: (n) => `expira en ${n} día${n === 1 ? "" : "s"}`,
	[EXPIRES_w]: (n) => `expira en ${n} semana${n === 1 ? "" : "s"}`,
	[EXPIRES_mo]: (n) => `expira en ${n} mes${n === 1 ? "" : "s"}`,
	[EXPIRES_y]: (n) => `expira en ${n} año${n === 1 ? "" : "s"}`,
	[EXPIRES_no]: "no expira nunca",
	[EXPIRES_uv]: "con vistas ilimitadas",
	[EXPIRES_v]: (v) => `o después de ${v} vista${v === 1 ? "" : "s"}`,
	[STATUS_SUBMITTING]: "enviando",
	[STATUS_SUCCESS]: "éxito",
	[STATUS_FAILED]: "eso no funcionó, inténtalo de nuevo",
	[STATUS_EMPTY]: "tu paste está vacío",
	[HIGHLIGHT_AS]: "destaca como ",
	[PREVIEW]: "vista previa",
	[SCROLL_DOWN]: "desplázate hacia abajo para ver",
	[INSERT_YOUR_PASTE]: "inserte su paste aquí",
	[PREVIEWING_AS]: (l) => `previsualizando como ${l}`,
	[CREATE]: "CREAR",
	[COPIED]: "¡copiado!",
	[COPY]: "copiar",
	[CLEAR]: "limpiar",
	[ARE_YOU_SURE_CLEAR]:
		"Tienes cambios sin guardar.\n¿Estás seguro de que quieres borrar tu paste?",

	// view
	[INCORRECT]: "INCORRECTO",
	[CLONE]: "clonar",
	[PASTE_NOT_FOUND]: "PASTE NO ENCONTRADO",
	[PASSWORD_REQUIRED]: "SE REQUIERE CONTRASEÑA",
	[DISABLE_ADBLOCKER]:
		"por favor, considera desactivar tu adblocker para apoyar el sitio",
	[PASSWORD]: "contraseña",
	[EMAIL]: "email",

	// report
	[ERROR_INSERT_MIN_ONE_LINK]: "inserte al menos un enlace",
	[ERROR_INVALID_LINK]: (l) => `el enlace "${l}" es inválido`,
	[ERROR_SHORT_NOTIFICATION]: (n) =>
		`la notificación oficial debe tener al menos ${n} caracteres`,
	[ERROR_EMAIL]: "tu email es inválido",
	[REPORT_COPYRIGHT]: "informar de infracciones de derechos de autor",
	[PLEASE_INSERT_LINKS]:
		"por favor, inserta todos los enlaces de infracción, uno por línea",
	[EXAMPLE]: (l) => `por ejemplo ${l}`,
	[PLEASE_OFFICIAL_NOTIFICATION]:
		"por favor, proporciona una notificación oficial en virtud del artículo 512(c) del Digital Millennium Copyright Act de 1998 (”DMCA”)",
	[PLEASE_EMAIL]: "por favor, proporciona tu email para verificación adicional",
	[SUBMIT]: "ENVIAR",
	[REQUEST_FAILED]:
		"no se ha podido enviar tu solicitud, por favor, inténtalo de nuevo",
	[REQUEST_SUBMITTED]: "tu solicitud se ha enviado correctamente",

	// footer
	[DMCA_REPORT]: "informe DMCA",
	[BUILT_BY]: "construido por",
};

const fr = {
	// create
	[EXPIRES_m]: (n) => `expire dans ${n} minute${n === 1 ? "" : "s"}`,
	[EXPIRES_h]: (n) => `expire dans ${n} heure${n === 1 ? "" : "s"}`,
	[EXPIRES_d]: (n) => `expire dans ${n} jour${n === 1 ? "" : "s"}`,
	[EXPIRES_w]: (n) => `expire dans ${n} semaine${n === 1 ? "" : "s"}`,
	[EXPIRES_mo]: (n) => `expire dans ${n} mois`,
	[EXPIRES_y]: (n) => `expire dans ${n} an${n === 1 ? "" : "s"}`,
	[EXPIRES_no]: "n'expire jamais",
	[EXPIRES_uv]: "aux vues illimitées",
	[EXPIRES_v]: (v) => `ou après ${v} vue${v === 1 ? "" : "s"}`,
	[STATUS_SUBMITTING]: "envoi en cours",
	[STATUS_SUCCESS]: "succès",
	[STATUS_FAILED]: "échec, réessayez",
	[STATUS_EMPTY]: "votre paste est vide",
	[HIGHLIGHT_AS]: "surligner en tant que ",
	[PREVIEW]: "aperçu",
	[SCROLL_DOWN]: "faites défiler vers le bas pour voir",
	[INSERT_YOUR_PASTE]: "insérez votre paste ici",
	[PREVIEWING_AS]: (l) => `aperçu en tant que ${l}`,
	[CREATE]: "CRÉER",
	[COPIED]: "copié !",
	[COPY]: "copier",
	[CLEAR]: "effacer",
	[ARE_YOU_SURE_CLEAR]:
		"Vous avez des modifications non enregistrées.\nÊtes-vous sûr de vouloir effacer votre paste?",

	// view
	[INCORRECT]: "INCORRECT",
	[CLONE]: "cloner",
	[PASTE_NOT_FOUND]: "PASTE NON TROUVÉ",
	[PASSWORD_REQUIRED]: "MOT DE PASSE REQUIS",
	[DISABLE_ADBLOCKER]:
		"veuillez considérer la désactivation de votre bloqueur de publicité pour soutenir le site web",
	[PASSWORD]: "mot de passe",
	[EMAIL]: "email",

	// report
	[ERROR_INSERT_MIN_ONE_LINK]: "insérez au moins un lien",
	[ERROR_INVALID_LINK]: (l) => `le lien "${l}" est invalide`,
	[ERROR_SHORT_NOTIFICATION]: (n) =>
		`la notification officielle devrait faire au moins ${n} caractères de long`,
	[ERROR_EMAIL]: "votre adresse email est invalide",
	[REPORT_COPYRIGHT]: "signaler des infractions au droit d'auteur",
	[PLEASE_INSERT_LINKS]:
		"veuillez insérer tous les liens infraction, un par ligne",
	[EXAMPLE]: (l) => `par ex. ${l}`,
	[PLEASE_OFFICIAL_NOTIFICATION]:
		"veuillez fournir une notification officielle conformément à l'article 512(c) de la Digital Millennium Copyright Act de 1998 («DMCA»)",
	[PLEASE_EMAIL]:
		"veuillez fournir votre adresse email pour une vérification supplémentaire",
	[SUBMIT]: "SOUMETTRE",
	[REQUEST_FAILED]: "votre demande n'a pas pu être soumise, veuillez réessayer",
	[REQUEST_SUBMITTED]: "votre demande a été soumise avec succès",
	
	// footer
	[DMCA_REPORT]: "signalement DMCA",
	[BUILT_BY]: "construit par",
};

const de = {
	// create
	[EXPIRES_m]: (n) => `läuft in ${n} minute${n === 1 ? "" : "n"} ab`,
	[EXPIRES_h]: (n) => `läuft in ${n} stunde${n === 1 ? "" : "n"} ab`,
	[EXPIRES_d]: (n) => `läuft in ${n} tag${n === 1 ? "" : "en"} ab`,
	[EXPIRES_w]: (n) => `läuft in ${n} woche${n === 1 ? "" : "n"} ab`,
	[EXPIRES_mo]: (n) => `läuft in ${n} monat${n === 1 ? "" : "en"} ab`,
	[EXPIRES_y]: (n) => `läuft in ${n} jahr${n === 1 ? "" : "en"} ab`,
	[EXPIRES_no]: "läuft nie ab",
	[EXPIRES_uv]: "mit unbegrenzten ansichten",
	[EXPIRES_v]: (v) => `oder nach ${v} ansicht${v === 1 ? "" : "en"}`,
	[STATUS_SUBMITTING]: "sende",
	[STATUS_SUCCESS]: "erfolgreich",
	[STATUS_FAILED]: "das hat nicht funktioniert, bitte versuchen sie es erneut",
	[STATUS_EMPTY]: "ihr paste ist leer",
	[HIGHLIGHT_AS]: "hervorheben als ",
	[PREVIEW]: "vorschau",
	[SCROLL_DOWN]: "nach unten scrollen um zu sehen",
	[INSERT_YOUR_PASTE]: "fügen sie hier ihren paste ein",
	[PREVIEWING_AS]: (l) => `vorschau als ${l}`,
	[CREATE]: "ERSTELLEN",
	[COPIED]: "kopiert!",
	[COPY]: "kopieren",
	[CLEAR]: "löschen",
	[ARE_YOU_SURE_CLEAR]:
		"Sie haben ungespeicherte änderungen.\nMöchten sie ihren paste wirklich löschen?",
	// view
	[INCORRECT]: "INKORREKT",
	[CLONE]: "klonen",
	[PASTE_NOT_FOUND]: "PASTE NICHT GEFUNDEN",
	[PASSWORD_REQUIRED]: "PASSWORT ERFORDERLICH",
	[DISABLE_ADBLOCKER]:
		"bitte deaktivieren sie ihren adblocker, um die website zu unterstützen",
	[PASSWORD]: "passwort",
	[EMAIL]: "email",
	// report
	[ERROR_INSERT_MIN_ONE_LINK]: "fügen sie mindestens einen link ein",
	[ERROR_INVALID_LINK]: (l) => `link "${l}" ist ungültig`,
	[ERROR_SHORT_NOTIFICATION]: (n) =>
		`die offizielle nenachrichtigung sollte mindestens ${n} zeichen lang sein`,
	[ERROR_EMAIL]: "ihre email ist ungültig",
	[REPORT_COPYRIGHT]: "melden sie urheberrechtsverletzungen",
	[PLEASE_INSERT_LINKS]:
		"fügen sie alle verletzenden links ein, einen pro zeile",
	[EXAMPLE]: (l) => `z.b. ${l}`,
	[PLEASE_OFFICIAL_NOTIFICATION]:
		"bitte geben sie eine offizielle benachrichtigung gemäß Abschnitt 512 (c) des Digital Millenium Copyright Act von 1998 (”DMCA”) an",
	[PLEASE_EMAIL]: "bitte geben sie ihre email für zusätzliche verifikation an",
	[SUBMIT]: "SENDEN",
	[REQUEST_FAILED]:
		"ihre anfrage konnte nicht übermittelt werden, bitte versuchen sie es erneut",
	[REQUEST_SUBMITTED]: "ihre anfrage wurde erfolgreich übermittelt",

	// footer
	[DMCA_REPORT]: "DMCA-bericht",
	[BUILT_BY]: "entwickelt von",
};

export const locales = { en, it, es, fr, de };

export const tr = (locale, key) => {
	return locales[locale][key];
};

export const [locale, setLocale] = createStoredSignal("locale", DEFAULT_LOCALE);
