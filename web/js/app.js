const STORAGE_KEY = "sawa_php_tracker_v3";

/* ====================================================================
   I18N — t() returns a string in the current language with FR fallback.
   Curriculum strings can be plain strings (untranslated, shows in both
   modes) or { fr, en } objects.  UI chrome lives in T below.
   ==================================================================== */
function t(v) {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v !== "object") return String(v);
  if (Array.isArray(v)) return v.map(t).join("");
  const lang = (state && state.lang) || "en";
  return v[lang] || v.en || v.fr || "";
}

const T_DICT = {
  // Header / chrome
  menu:          { fr: "Ouvrir le menu",       en: "Open menu" },
  installBtn:    { fr: "Installer",            en: "Install" },
  installApp:    { fr: "Installer l'app",      en: "Install the app" },
  skipToMain:    { fr: "Aller au contenu",     en: "Skip to content" },
  toggleTheme:   { fr: "Basculer thème",       en: "Toggle theme" },
  toLight:       { fr: "Passer en mode clair", en: "Switch to light mode" },
  toDark:        { fr: "Passer en mode sombre",en: "Switch to dark mode" },
  toggleLang:    { fr: "Switch to English",    en: "Passer en français" },
  search:        { fr: "Rechercher (raccourci : \"/\")", en: "Search (shortcut: \"/\")" },
  statLessons:   { fr: "Leçons terminées",     en: "Lessons completed" },
  statExercises: { fr: "Exercices complétés",  en: "Exercises completed" },
  statStreak:    { fr: "Jours actifs (streak)",en: "Streak (days in a row)" },
  lessonsShort:  { fr: "leçons",               en: "lessons" },
  exosShort:     { fr: "exos",                 en: "exos" },
  dShort:        { fr: "j",                    en: "d" },
  examIn:        { fr: "Examen dans",          en: "Exam in" },
  examPassed:    { fr: "Examen passé",         en: "Exam done" },
  examToday:     { fr: "Examen aujourd'hui",   en: "Exam today" },
  daysShort:     { fr: "j",                    en: "d" },
  // Sidebar sections
  progress:      { fr: "Progression",          en: "Progress" },
  lessons:       { fr: "leçons",               en: "lessons" },
  exos:          { fr: "exos",                 en: "exos" },
  achievements:  { fr: "🏆 Succès",            en: "🏆 Achievements" },
  plan7:         { fr: "📘 Plan 7 jours",      en: "📘 7-day Plan" },
  modePlan:      { fr: "📅 Plan",              en: "📅 Plan" },
  modeRef:       { fr: "📖 Référence",         en: "📖 Reference" },
  basic:         { fr: "PHP Basic",            en: "PHP Basic" },
  intermediate:  { fr: "PHP Intermediate",     en: "PHP Intermediate" },
  advanced:      { fr: "PHP Advanced",         en: "PHP Advanced" },
  resetBtn:      { fr: "Réinitialiser",         en: "Reset progress" },
  resetBtnText:  { fr: "Réinitialiser la progression", en: "Reset progress" },
  exportBtn:     { fr: "Exporter",              en: "Export" },
  exportBtnText: { fr: "Exporter",              en: "Export" },
  importBtn:     { fr: "Importer",              en: "Import" },
  importBtnText: { fr: "Importer",              en: "Import" },
  // Welcome
  welcomeTitle:  { fr: "Plan d'attaque", en: "Attack plan" },
  welcomeSub:    {
    fr: "7 jours pour l'examen · 140 exercices PHP · 34 leçons W3Schools · suivi automatique. Examen le 09/07/2026 — projet Sawa en parallèle.",
    en: "7 days to the exam · 140 PHP exercises · 34 W3Schools lessons · auto-tracked. Exam on 09/07/2026 — Sawa project in parallel."
  },
  day:           { fr: "Jour",                 en: "Day" },
  dayShort:      { fr: "J",                    en: "D" },
  exoCount:      { fr: "exos",                 en: "exos" },
  lessonCount:   { fr: "leçons",               en: "lessons" },
  // Lesson
  why:           { fr: "🎯 Pourquoi —",        en: "🎯 Why —" },
  mockExam:      { fr: "Exercice chronométré", en: "Timed exercise" },
  startMock:     { fr: "Lancer l'exercice (120 min)", en: "Start exercise (120 min)" },
  mockRunning:   { fr: "Exercice en cours — ne ferme pas la page", en: "Exercise running — do not close the page" },
  mockFinished:  { fr: "Exercice terminé",     en: "Exercise finished" },
  mockStop:      { fr: "Arrêter",              en: "Stop" },
  w3Source:      { fr: "Source W3Schools",     en: "W3Schools source" },
  markDone:      { fr: "Marquer terminé",      en: "Mark done" },
  marked:        { fr: "✓ Terminé",            en: "✓ Done" },
  markedAriaLabel: { fr: "Marquer comme terminé", en: "Mark as done" },
  prev:          { fr: "← Précédent",          en: "← Previous" },
  nextDir:       { fr: "Suivant →",            en: "Next →" },
  start:         { fr: "Début",                en: "Start" },
  end:           { fr: "Fin",                  en: "End" },
  noLesson:      { fr: "Aucune leçon",         en: "No lesson" },
  noMoreLessons: { fr: "Plus de leçons",       en: "No more lessons" },
  // Tabs (icons added in renderExArea)
  tabCourse:     { fr: "Cours",                en: "Course" },
  tabExos:       { fr: "Exercices",            en: "Exercises" },
  tabProbs:      { fr: "Problèmes",            en: "Problems" },
  // Exercise filters (icons rendered next to labels in renderExArea)
  filterAll:     { fr: "Tous",                 en: "All" },
  filterEasy:    { fr: "Facile",               en: "Easy" },
  filterMedium:  { fr: "Moyen",                en: "Medium" },
  filterHard:    { fr: "Difficile",            en: "Hard" },
  filterExtreme: { fr: "Extrême",              en: "Extreme" },
  filterBookmark:{ fr: "Signets",              en: "Bookmarks" },
  done:          { fr: "terminés",             en: "done" },
  noExos:        { fr: "Aucun exercice dans cette catégorie", en: "No exercises in this category" },
  diffEasy:      { fr: "Facile",               en: "Easy" },
  diffMedium:    { fr: "Moyen",                en: "Medium" },
  diffHard:      { fr: "Difficile",            en: "Hard" },
  diffExtreme:   { fr: "Extrême",              en: "Extreme" },
  proLabel:      { fr: "Pro",                  en: "Pro" },
  addBookmark:   { fr: "Ajouter un signet",    en: "Add bookmark" },
  removeBookmark:{ fr: "Retirer le signet",    en: "Remove bookmark" },
  viewSol:       { fr: "Voir solution",         en: "View solution" },
  hideSol:       { fr: "Cacher",                en: "Hide" },
  // Quiz
  quizTitle:     { fr: "🎯 Mini-quiz — vérifie tes acquis", en: "🎯 Mini quiz — check what stuck" },
  quizSub:       { fr: "Clique sur la bonne réponse. Pas de score : c'est pour s'entraîner.", en: "Click the right answer. No score — it's for practice." },
  // Code blocks
  copy:          { fr: "Copier",               en: "Copy" },
  copied:        { fr: "Copié ! ✓",             en: "Copied! ✓" },
  showOutput:    { fr: "▶ Voir résultat",       en: "▶ Show output" },
  hideOutput:    { fr: "▼ Cacher résultat",     en: "▼ Hide output" },
  // Callouts
  tip:           { fr: "✓ Bonne pratique",     en: "✓ Best practice" },
  note:          { fr: "💡 Astuce",             en: "💡 Tip" },
  warn:          { fr: "⚠️ Piège examen",       en: "⚠️ Exam trap" },
  bad:           { fr: "❌ Erreur fatale",      en: "❌ Fatal error" },
  guess:         { fr: "Devine",               en: "Guess" },
  seeAnswer:     { fr: "Voir la réponse",      en: "Show the answer" },
  hideAnswer:    { fr: "▲ Cacher",              en: "▲ Hide" },
  // Footer hint
  hintSearch:    { fr: "chercher",             en: "search" },
  hintNav:       { fr: "naviguer",             en: "navigate" },
  hintCourseEx:  { fr: "cours/exos",           en: "course/exos" },
  hintDone:      { fr: "fait",                 en: "done" },
  hintClose:     { fr: "fermer",               en: "close" },
  // Reset modal
  resetTitle:    { fr: "Réinitialiser la progression ?", en: "Reset all progress?" },
  resetBody:     { fr: "Ceci efface TOUTE ta progression (leçons, exercices, signets, succès). Cette action est irréversible.", en: "This wipes ALL your progress (lessons, exercises, bookmarks, achievements). This cannot be undone." },
  resetConfirm:  { fr: "Oui, tout effacer",    en: "Yes, wipe everything" },
  resetCancel:   { fr: "Annuler",              en: "Cancel" },
  resetDone:     { fr: "Progression effacée",  en: "Progress wiped" },
  resetDoneSub:  { fr: "On repart à zéro ! Choisis une leçon dans la barre latérale pour commencer.", en: "Starting fresh! Pick a lesson in the sidebar to begin." },
  // Import / export
  exportTitle:   { fr: "Exporter ma progression", en: "Export my progress" },
  exportDone:    { fr: "Progression copiée dans le presse-papier ✓", en: "Progress copied to clipboard ✓" },
  importPrompt:  { fr: "Colle ici ta progression JSON :", en: "Paste your JSON progress here:" },
  importBad:     { fr: "JSON invalide — rien n'a changé.", en: "Invalid JSON — nothing changed." },
  importOk:      { fr: "Progression restaurée ✓", en: "Progress restored ✓" },
  // Achievements (full set, all visible)
  ach1:          { fr: "1ère leçon",           en: "First lesson" },
  ach2:          { fr: "Mi-parcours (leçons)", en: "Halfway (lessons)" },
  ach3:          { fr: "PHP prêt",             en: "PHP ready" },
  ach4:          { fr: "7 jours d'affilée",    en: "7 day streak" },
  ach5:          { fr: "Tous les exos",        en: "All exercises" },
  achEx1:        { fr: "1er exercice",         en: "First exercise" },
  achEx10:       { fr: "10 exercices",         en: "10 exercises" },
  achEx50:       { fr: "50 exercices",         en: "50 exercises" },
  achBm:         { fr: "1er signet",           en: "First bookmark" },
  achDay7:       { fr: "Jour 7 atteint",       en: "Reached Day 7" },
  achUnlocked:   { fr: "Succès débloqué :",    en: "Achievement unlocked:" },
  achLocked:     { fr: "🔒 À débloquer",       en: "🔒 Locked" },
  // Daily goal
  dailyGoal:     { fr: "Objectif du jour",     en: "Daily goal" },
  dailyDone:     { fr: "aujourd'hui",          en: "today" },
  goalReached:   { fr: "Objectif du jour atteint ! 🎉", en: "Daily goal reached! 🎉" },
  setGoalTitle:  { fr: "Objectif quotidien",   en: "Daily goal" },
  setGoalBody:   { fr: "Combien d'exercices veux-tu faire par jour ?", en: "How many exercises per day do you want to do?" },
  save:          { fr: "Enregistrer",          en: "Save" },
  editGoal:      { fr: "Modifier l'objectif",  en: "Edit goal" },
  // Lesson mastery
  lessonMastered:{ fr: "Leçon maîtrisée ! 🌟", en: "Lesson mastered! 🌟" },
  // Confidence
  confGot:       { fr: "Je gère",              en: "Got it" },
  confShaky:     { fr: "Hésitant",             en: "Shaky" },
  confNo:        { fr: "Aucune idée",          en: "No idea" },
  confLabel:     { fr: "Niveau de confiance",  en: "Confidence" },
  filterWeak:    { fr: "À revoir",             en: "To review" },
  noWeak:        { fr: "Rien à revoir ici — bien joué !", en: "Nothing to review here — nice!" },
  // Pomodoro
  pomodoro:      { fr: "Pomodoro",             en: "Pomodoro" },
  pomoFocus:     { fr: "Concentration",        en: "Focus" },
  pomoShort:     { fr: "Pause",                en: "Break" },
  pomoLong:      { fr: "Pause longue",         en: "Long break" },
  pomoStart:     { fr: "Démarrer",             en: "Start" },
  pomoPause:     { fr: "Pause",                en: "Pause" },
  pomoTitle:     { fr: "Pomodoro",             en: "Pomodoro" },
  pomoDone:      { fr: "pomodoros aujourd'hui",en: "pomodoros today" },
  pomoFocusMin:  { fr: "Focus (min)",          en: "Focus (min)" },
  pomoBreakMin:  { fr: "Pause (min)",          en: "Break (min)" },
  pomoLongMin:   { fr: "Longue (min)",         en: "Long (min)" },
  pomoAuto:      { fr: "Auto-démarrer la pause", en: "Auto-start break" },
  pomoToday:     { fr: "Aujourd'hui",          en: "Today" },
  pomoClear:     { fr: "Effacer",              en: "Clear" },
  pomoSkip:      { fr: "Passer la phase",      en: "Skip phase" },
  pomoResetT:    { fr: "Réinitialiser",        en: "Reset" },
  pomoSound:     { fr: "Activer / couper le son", en: "Toggle sound" },
  pomoSoundLbl:  { fr: "Son",                  en: "Sound" },
  pomoFocusDone: { fr: "Concentration terminée — fais une pause ! 🍵", en: "Focus done — take a break! 🍵" },
  pomoBreakDone: { fr: "Pause terminée — au travail ! 💪", en: "Break over — back to work! 💪" },
  // Notes
  notesLabel:    { fr: "Notes",                en: "Notes" },
  notesPlaceholder: { fr: "Tes notes sur cet exercice (rappels, pièges, idées)…", en: "Your notes for this exercise (reminders, gotchas, ideas)…" },
  notesSaved:    { fr: "✓ enregistré",            en: "✓ saved" },
  // Focus mode
  focusOn:       { fr: "Mode focus activé",       en: "Focus mode on" },
  focusOff:      { fr: "Mode focus désactivé",    en: "Focus mode off" },
  focusBtn:      { fr: "Mode focus (F)",          en: "Focus mode (F)" },
  // Weekly goal
  weeklyLabel:   { fr: "Cette semaine",           en: "This week" },
  weeklyEdit:    { fr: "Objectif hebdo (1-500)",  en: "Weekly goal (1-500)" },
  // Shortcuts panel
  shortcutsTitle:{ fr: "Raccourcis clavier",      en: "Keyboard shortcuts" },
  shortcutsClose:{ fr: "Fermer",                  en: "Close" },
  scGroupNav:    { fr: "Navigation",              en: "Navigation" },
  scGroupActions:{ fr: "Actions",                 en: "Actions" },
  scGroupMisc:   { fr: "Autres",                  en: "Other" },
  scSearch:      { fr: "Rechercher",              en: "Search" },
  scPrevNext:    { fr: "Leçon précédente / suivante", en: "Previous / next lesson" },
  scTabSwap:     { fr: "Basculer cours / exos",   en: "Toggle course / exercises" },
  scMarkDone:    { fr: "Marquer la leçon comme terminée", en: "Mark lesson as done" },
  scBookmarks:   { fr: "Filtrer signets",         en: "Filter bookmarks" },
  scFocus:       { fr: "Mode focus",              en: "Focus mode" },
  scShortcuts:   { fr: "Ouvrir cette aide",       en: "Open this help" },
  scClose:       { fr: "Fermer modale / menu",    en: "Close modal / menu" },
  // XP / Level
  levelUp:       { fr: "Niveau supérieur !",   en: "Level up!" },
  // Analytics
  anaTitle:      { fr: "📊 Statistiques",      en: "📊 Stats" },
  anaXp:         { fr: "Total XP",             en: "Total XP" },
  anaStreakBest: { fr: "Streak max",           en: "Best streak" },
  anaBars:       { fr: "14 derniers jours",    en: "Last 14 days" },
  anaHeatmap:    { fr: "Activité (12 sem)",    en: "Activity (12w)" },
  anaHeatLess:   { fr: "moins",                en: "less" },
  anaHeatMore:   { fr: "plus",                 en: "more" },
  anaAvg:        { fr: "Moy. 7j",              en: "7d avg" },
  anaExosDay:    { fr: "exos / jour",          en: "exos / day" },
  // Daily challenge
  challengeLabel:{ fr: "🎯 Défi du jour",      en: "🎯 Daily challenge" },
  challengeDone: { fr: "Défi du jour réussi ! 🎉", en: "Daily challenge complete! 🎉" },
  chal_hard:     { fr: "Termine 3 exercices difficiles", en: "Finish 3 hard exercises" },
  chal_done:     { fr: "Termine 8 exercices",            en: "Finish 8 exercises" },
  chal_lesson:   { fr: "Termine 1 leçon entière",        en: "Complete 1 full lesson" },
  chal_pomo:     { fr: "Fais 3 pomodoros",               en: "Run 3 pomodoros" },
  chal_review:   { fr: "Note ta confiance sur 5 exos",   en: "Rate confidence on 5 exos" },
  chal_easy:     { fr: "Termine 5 exos faciles",         en: "Finish 5 easy exos" },
  // Extra achievements
  ach_pomo1:     { fr: "1er pomodoro",         en: "First pomodoro" },
  ach_pomo20:    { fr: "20 pomodoros",         en: "20 pomodoros" },
  ach_notes:     { fr: "10 notes prises",      en: "10 notes written" },
  ach_bm10:      { fr: "10 signets",           en: "10 bookmarks" },
  ach_conf10:    { fr: "10 confiances notées", en: "10 confidence ratings" },
  ach_week:      { fr: "Objectif semaine",     en: "Weekly goal hit" },
  ach_lvl5:      { fr: "Niveau 5",             en: "Level 5" },
  ach_lvl10:     { fr: "Niveau 10",            en: "Level 10" },
  ach_chal3:     { fr: "3 défis réussis",      en: "3 challenges done" },
};
const T = new Proxy(T_DICT, { get(o, k) { return t(o[k]); } });

const EXAM_DATE = new Date(2026, 6, 9); // Month is 0-indexed: 6 = July
const MOCK_EXAM_MINUTES = 120;
const MOCK_EXAM_KEY = "sawa_php_mock_exam_end";
const MAX_STATE_CHARS = 1500000;
const VALID_LESSON_IDS = new Set(ALL_LESSONS.map(l => l.id));
const VALID_EX_KEYS = new Set();
ALL_LESSONS.forEach(l => {
  [...(l.exercises || []), ...(l.problemes || [])].forEach(e => VALID_EX_KEYS.add(l.id + "-" + e.num));
});
const VALID_XP_CLAIMS = new Set([
  ...[...VALID_LESSON_IDS].map(id => "lesson:" + id),
  ...[...VALID_EX_KEYS].map(key => "ex:" + key)
]);
const COLLAPSE_KEYS = new Set(["days", "basic", "intermediate", "advanced"]);
const CONF_VALUES = new Set(["got", "shaky", "no"]);

let state = loadState();
let currentTab = "cours";
let exFilter = "all";

const W3_URLS = {
  "w3-intro": "https://www.w3schools.com/php/php_intro.asp",
  "w3-syntax": "https://www.w3schools.com/php/php_syntax.asp",
  "w3-variables": "https://www.w3schools.com/php/php_variables.asp",
  "w3-echo": "https://www.w3schools.com/php/php_echo_print.asp",
  "w3-types": "https://www.w3schools.com/php/php_datatypes.asp",
  "w3-strings": "https://www.w3schools.com/php/php_string.asp",
  "w3-numbers": "https://www.w3schools.com/php/php_numbers.asp",
  "w3-constants": "https://www.w3schools.com/php/php_constants.asp",
  "w3-operators": "https://www.w3schools.com/php/php_operators.asp",
  "w3-if": "https://www.w3schools.com/php/php_if_else.asp",
  "w3-loops": "https://www.w3schools.com/php/php_looping.asp",
  "w3-functions-basic": "https://www.w3schools.com/php/php_functions.asp",
  "w3-arrays-basic": "https://www.w3schools.com/php/php_arrays.asp",
  "w3-superglobals": "https://www.w3schools.com/php/php_superglobals.asp",
  "w3-forms": "https://www.w3schools.com/php/php_forms.asp",
  "w3-validation": "https://www.w3schools.com/php/php_form_validation.asp",
  "w3-regex": "https://www.w3schools.com/php/php_regex.asp",
  "w3-date": "https://www.w3schools.com/php/php_date.asp",
  "w3-include": "https://www.w3schools.com/php/php_includes.asp",
  "w3-file": "https://www.w3schools.com/php/php_file_open.asp",
  "w3-upload": "https://www.w3schools.com/php/php_file_upload.asp",
  "w3-cookies": "https://www.w3schools.com/php/php_cookies.asp",
  "w3-sessions": "https://www.w3schools.com/php/php_sessions.asp",
  "w3-json": "https://www.w3schools.com/php/php_json.asp",
  "w3-oop": "https://www.w3schools.com/php/php_oop_what_is.asp",
  "w3-constructor": "https://www.w3schools.com/php/php_oop_classes_objects.asp",
  "w3-modifiers": "https://www.w3schools.com/php/php_oop_access_modifiers.asp",
  "w3-inheritance": "https://www.w3schools.com/php/php_oop_inheritance.asp",
  "w3-abstract": "https://www.w3schools.com/php/php_oop_classes_abstract.asp",
  "w3-interfaces": "https://www.w3schools.com/php/php_oop_interfaces.asp",
  "w3-static": "https://www.w3schools.com/php/php_oop_static_methods.asp",
  "w3-exceptions": "https://www.w3schools.com/php/php_exception.asp",
  "w3-mysql": "https://www.w3schools.com/php/php_mysql_intro.asp",
  "w3-traits": "https://www.w3schools.com/php/php_oop_traits.asp",
  "day-1": "https://www.w3schools.com/php/php_syntax.asp",
  "day-2": "https://www.w3schools.com/php/php_functions.asp",
  "day-3": "https://www.w3schools.com/php/php_form_validation.asp",
  "day-4": "https://www.w3schools.com/php/php_mysql_intro.asp",
  "day-5": "https://www.w3schools.com/php/php_sessions.asp",
  "day-6": "https://www.w3schools.com/php/php_file_upload.asp",
  "day-7": "https://www.w3schools.com/php/php_oop_what_is.asp",
};

const LESSON_BY_ID = new Map(ALL_LESSONS.map(l => [l.id, l]));
const LESSON_INDEX_BY_ID = new Map(ALL_LESSONS.map((l, i) => [l.id, i]));
const _reviewDismissed = new Set();   // session-scoped — fresh on reload

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    if (raw.length > MAX_STATE_CHARS) {
      localStorage.removeItem(STORAGE_KEY);
      try { sessionStorage.setItem("php_tracker_state_reset_reason", "oversize"); } catch {}
      return defaultState();
    }
    return normalizeState(JSON.parse(raw));
  } catch { return defaultState(); }
}

function defaultState() {
  return { completed: {}, exDone: {}, bookmarks: {}, lastActive: null, theme: "dark", lang: "en", sectionsCollapsed: {}, achSeen: null, dailyGoal: 10, weeklyGoal: 50, confidence: {}, masteredSeen: {}, goalReachedDate: null, pomo: null, quizAnswers: {}, navMode: "plan", notes: {}, focusMode: false, pomoLog: [], xp: 0, challengeSeed: null, challengeDone: {}, reviewSeen: {}, xpClaims: {}, welcomeHintDismissed: false };
}

function sanitizeRecord(obj, { valid = null, max = 500, value = v => v } = {}) {
  const out = {};
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return out;
  let count = 0;
  for (const k in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
    if (valid && !valid.has(k)) continue;
    const v = value(obj[k], k);
    if (v === undefined) continue;
    out[k] = v;
    count++;
    if (count >= max) break;
  }
  return out;
}

function cleanTimestamp(v) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

function normalizeState(raw) {
  const state = Object.assign(defaultState(), raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {});
  state.completed = sanitizeRecord(state.completed, { valid: VALID_LESSON_IDS, max: TOTAL, value: cleanTimestamp });
  state.exDone = sanitizeRecord(state.exDone, { valid: VALID_EX_KEYS, max: TOTAL_EXERCISES, value: cleanTimestamp });
  state.bookmarks = sanitizeRecord(state.bookmarks, { valid: VALID_EX_KEYS, max: TOTAL_EXERCISES, value: cleanTimestamp });
  state.confidence = sanitizeRecord(state.confidence, {
    valid: VALID_EX_KEYS,
    max: TOTAL_EXERCISES,
    value: v => CONF_VALUES.has(v) ? v : undefined
  });
  state.notes = sanitizeRecord(state.notes, {
    valid: VALID_EX_KEYS,
    max: TOTAL_EXERCISES,
    value: v => typeof v === "string" && v.trim() ? v.slice(0, 4000) : undefined
  });
  state.sectionsCollapsed = sanitizeRecord(state.sectionsCollapsed, {
    valid: COLLAPSE_KEYS,
    max: COLLAPSE_KEYS.size,
    value: v => v ? true : undefined
  });
  state.masteredSeen = sanitizeRecord(state.masteredSeen, {
    valid: VALID_LESSON_IDS,
    max: TOTAL,
    value: v => v ? true : undefined
  });
  state.quizAnswers = sanitizeRecord(state.quizAnswers, {
    max: 400,
    value: (v, k) => VALID_LESSON_IDS.has(String(k).split("-q")[0]) && /^[a-z]$/.test(String(v)) ? String(v) : undefined
  });
  state.challengeDone = sanitizeRecord(state.challengeDone, {
    max: 90,
    value: cleanTimestamp
  });
  state.xpClaims = sanitizeRecord(state.xpClaims, {
    valid: VALID_XP_CLAIMS,
    max: VALID_XP_CLAIMS.size,
    value: v => {
      const n = Number(v);
      return Number.isFinite(n) && n > 0 ? n : undefined;
    }
  });
  state.reviewSeen = sanitizeRecord(state.reviewSeen, {
    max: 10,
    value: v => sanitizeRecord(v, { valid: VALID_EX_KEYS, max: TOTAL_EXERCISES, value: x => x ? 1 : undefined })
  });
  if (state.achSeen != null && (typeof state.achSeen !== "object" || Array.isArray(state.achSeen))) state.achSeen = null;
  if (state.pomo != null && (typeof state.pomo !== "object" || Array.isArray(state.pomo))) state.pomo = null;
  else if (state.pomo) {
    const phase = ["focus", "short", "long"].includes(state.pomo.phase) ? state.pomo.phase : "focus";
    const endTs = Number(state.pomo.endTs);
    const leftMs = Number(state.pomo.leftMs);
    state.pomo = {
      phase,
      running: !!state.pomo.running && Number.isFinite(endTs) && endTs > Date.now(),
      endTs: Number.isFinite(endTs) ? endTs : null,
      leftMs: Number.isFinite(leftMs) && leftMs >= 0 ? leftMs : null,
      focusMin: Math.max(1, Math.min(90, parseInt(state.pomo.focusMin, 10) || 25)),
      shortMin: Math.max(1, Math.min(60, parseInt(state.pomo.shortMin, 10) || 5)),
      longMin: Math.max(5, Math.min(60, parseInt(state.pomo.longMin, 10) || 15)),
      completed: Math.max(0, parseInt(state.pomo.completed, 10) || 0),
      cycle: Math.max(0, parseInt(state.pomo.cycle, 10) || 0),
      soundOn: state.pomo.soundOn !== false,
      autoStart: !!state.pomo.autoStart
    };
  }
  if (!Array.isArray(state.pomoLog)) state.pomoLog = [];
  else state.pomoLog = state.pomoLog
    .filter(s => s && typeof s === "object" && Number.isFinite(Number(s.ts)))
    .map(s => ({ ts: Number(s.ts), min: Math.max(1, Math.min(90, parseInt(s.min, 10) || 25)) }));
  for (const k in state.reviewSeen) {
    if (!state.reviewSeen[k] || typeof state.reviewSeen[k] !== "object" || Array.isArray(state.reviewSeen[k])) {
      delete state.reviewSeen[k];
    }
  }
  if (state.theme !== "light") state.theme = "dark";
  if (state.lang !== "fr") state.lang = "en";
  if (state.navMode !== "ref") state.navMode = "plan";
  if (typeof state.lastActive !== "string") state.lastActive = null;
  if (typeof state.goalReachedDate !== "string") state.goalReachedDate = null;
  if (typeof state.challengeSeed !== "string") state.challengeSeed = null;
  state.dailyGoal = Math.max(1, Math.min(200, parseInt(state.dailyGoal, 10) || 10));
  state.weeklyGoal = Math.max(1, Math.min(500, parseInt(state.weeklyGoal, 10) || 50));
  state.xp = Math.max(0, parseInt(state.xp, 10) || 0);
  state.focusMode = !!state.focusMode;
  state.welcomeHintDismissed = !!state.welcomeHintDismissed;
  return state;
}

let _saveTimer = 0;
let _saveIsIdle = false;
let _lastSavedJson = "";
function _flushSave() {
  _saveTimer = 0;
  _saveIsIdle = false;
  try {
    const json = JSON.stringify(state);
    if (json === _lastSavedJson) return;          // skip redundant writes
    localStorage.setItem(STORAGE_KEY, json);
    _lastSavedJson = json;
  } catch (e) {
    // QuotaExceeded or serialization error — don't crash the app
  }
}
function saveState() {
  if (_saveTimer) return;
  if ("requestIdleCallback" in window) {
    _saveIsIdle = true;
    _saveTimer = requestIdleCallback(_flushSave, { timeout: 900 });
  } else {
    _saveTimer = setTimeout(_flushSave, 220);
  }
}
// Flush pending writes on page hide so a freshly-toggled checkbox isn't lost
// when the user closes the tab or backgrounds the app on mobile.
function flushPendingSaveNow() {
  if (!_saveTimer) return;
  if (_saveIsIdle && "cancelIdleCallback" in window) cancelIdleCallback(_saveTimer);
  else clearTimeout(_saveTimer);
  _flushSave();
}
window.addEventListener("pagehide", flushPendingSaveNow);
window.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") flushPendingSaveNow(); });

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function noteIconSvg() {
  return `<svg class="ex-note-ico" aria-hidden="true" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><title>Notes</title><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/></svg>`;
}

function bookmarkIconSvg(on, size = 14) {
  return on
    ? `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`
    : `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
}

function scrollToPageTop() {
  const smooth = !window.matchMedia || !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
}

function scheduleIdle(cb, timeout = 700) {
  if ("requestIdleCallback" in window) return requestIdleCallback(cb, { timeout });
  return setTimeout(cb, Math.min(timeout, 250));
}

/* SVG icon library — stroke-only icons used across labels (tabs / filters / buttons).
   Kept small so they can sit inline with text without crowding. */
const SVGI = {
  book:       `<svg class="lico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  pencil:     `<svg class="lico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
  puzzle:     `<svg class="lico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>`,
  leaf:       `<svg class="lico" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>`,
  flame:      `<svg class="lico" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  bolt:       `<svg class="lico" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  skull:      `<svg class="lico" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 20v2h8v-2"/><path d="m12.5 17-.5-1-.5 1h1z"/><path d="M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"/></svg>`,
  bookmark:   `<svg class="lico" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`,
  filter:     `<svg class="lico" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  triangle:   `<svg class="lico" width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`,
  square:     `<svg class="lico" width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="1"/></svg>`,
  light:      `<svg class="lico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>`,
  external:   `<svg class="lico" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  target:     `<svg class="lico" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  trending:   `<svg class="lico" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
};
function diffIcoSvg(diff) {
  if (diff === "easy") return SVGI.leaf;
  if (diff === "medium") return SVGI.flame;
  if (diff === "hard") return SVGI.bolt;
  if (diff === "extreme") return SVGI.skull;
  return "";
}

// Strip diacritics so search matches "heritage" against "héritage" and vice versa.
function normalize(s) {
  return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// Real consecutive-days streak: counts back from today (or yesterday if no activity today)
// while there is at least one completed lesson / exercise per day.
function computeStreak() {
  const activeDays = new Set();
  Object.values(state.completed).forEach(ts => activeDays.add(new Date(ts).toDateString()));
  Object.values(state.exDone).forEach(ts => activeDays.add(new Date(ts).toDateString()));
  if (activeDays.size === 0) return 0;
  let streak = 0;
  let cursor = new Date();
  // If nothing today, start from yesterday so an off-day in the morning doesn't break the streak.
  if (!activeDays.has(cursor.toDateString())) cursor.setDate(cursor.getDate() - 1);
  while (activeDays.has(cursor.toDateString())) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function highlightPhp(code) {
  let s = esc(code);
  const stash = [];
  const hold = (cls, text) => {
    const i = stash.length;
    stash.push(`<span class="${cls}">${text}</span>`);
    return `__SAWAHOLD${i}HOLD__`;
  };
  s = s.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, m => hold("str", m));
  s = s.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*)/g, m => hold("com", m));
  s = s.replace(/\b(function|return|if|else|elseif|while|for|foreach|as|switch|case|default|break|continue|do|class|new|public|private|protected|static|const|use|namespace|require|require_once|include|include_once|echo|print|die|exit|true|false|null|self|parent|instanceof|extends|implements|interface|trait|try|catch|finally|throw|fn|match|declare|global|and|or|xor)\b/g, '<span class="kw">$1</span>');
  s = s.replace(/(\$\w+)/g, '<span class="var">$1</span>');
  s = s.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="num">$1</span>');
  s = s.replace(/\b([a-z_][a-z0-9_]*)\s*\(/gi, '<span class="fn">$1</span>(');
  s = s.replace(/(?:&lt;\?php|\?&gt;)/g, '<span class="kw">$&</span>');
  s = s.replace(/(-&gt;|=&gt;|::)/g, '<span class="op">$&</span>');
  return s.replace(/__SAWAHOLD(\d+)HOLD__/g, (_, i) => stash[+i] ?? "");
}

function celebrate() {
  const c = document.createElement('div');
  c.className = 'confetti-wrap';
  const colors = ['#6366f1','#818cf8','#22c55e','#f59e0b','#ef4444','#38bdf8'];
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-p';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDelay = Math.random() * 0.8 + 's';
    p.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
    p.style.width = (6 + Math.random() * 8) + 'px';
    p.style.height = (6 + Math.random() * 8) + 'px';
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    c.appendChild(p);
  }
  document.body.appendChild(c);
  setTimeout(() => c.remove(), 3500);
}

/* ====================================================================
   SIDEBAR
   ==================================================================== */
function renderSidebar() {
  document.getElementById("nav-days").innerHTML = DAYS.map(navItem).join("");
  const basic = W3SCHOOL.filter(l => (l.level || "basic") === "basic");
  const inter = W3SCHOOL.filter(l => l.level === "intermediate");
  const adv = W3SCHOOL.filter(l => l.level === "advanced");
  document.getElementById("nav-basic").innerHTML = basic.map(navItem).join("") || `<div class="empty-search">${T.noLesson}</div>`;
  document.getElementById("nav-intermediate").innerHTML = inter.map(navItem).join("") || `<div class="empty-search">${T.noLesson}</div>`;
  document.getElementById("nav-advanced").innerHTML = adv.map(navItem).join("") || `<div class="empty-search">${T.noLesson}</div>`;
  bindNav();
  applyCollapseState();
  applyNavMode();
  refreshProgress();
}

function updateSidebarActive() {
  document.querySelectorAll(".nav-item").forEach(el => {
    const id = el.dataset.id;
    const lesson = LESSON_BY_ID.get(id);
    if (!lesson) return;
    el.classList.toggle("active", id === state.lastActive);
    el.classList.toggle("done", !!state.completed[id]);
    const exAll = [...(lesson.exercises || []), ...(lesson.problemes || [])];
    const exTotal = exAll.length;
    const exDone = exAll.filter(e => state.exDone[lesson.id + "-" + e.num]).length;
    el.classList.toggle("fully-done", exTotal > 0 && exDone === exTotal);
    const count = el.querySelector(".nav-ex-count");
    if (count) applyExCount(count, exDone, exTotal);
  });
  refreshProgress();
}

/* Counter pill becomes a self-contained progress chip — fills up as exos are
 * completed, swaps to "Done" with a check at 100 %, ghosts out when untouched. */
function applyExCount(el, done, total) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  const remaining = total - done;
  el.style.setProperty("--ex-pct", pct + "%");
  el.dataset.pct = pct;
  el.dataset.remaining = remaining;
  el.classList.toggle("is-empty", pct === 0);
  el.classList.toggle("is-partial", pct > 0 && pct < 80);
  el.classList.toggle("is-near", pct >= 80 && pct < 100);
  el.classList.toggle("is-done", pct === 100);
  if (pct === 100) {
    el.innerHTML = `<svg class="ex-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="5 12 10 17 19 7"/></svg><span class="ex-num">${total}</span>`;
  } else {
    el.innerHTML = `<span class="ex-num">${done}<span class="ex-slash">/</span>${total}</span><span class="ex-left" aria-hidden="true">−${remaining}</span>`;
  }
  el.setAttribute("aria-label",
    pct === 100 ? `${total}/${total} exercices terminés`
                : `${done} sur ${total} exercices · ${remaining} restant${remaining > 1 ? "s" : ""}`);
}

function navItem(l) {
  const done = !!state.completed[l.id];
  const active = state.lastActive === l.id;
  const exAll = [...(l.exercises || []), ...(l.problemes || [])];
  const exTotal = exAll.length;
  const exDone = exAll.filter(e => state.exDone[l.id + "-" + e.num]).length;
  const fullyDone = exTotal > 0 && exDone === exTotal;
  const fullTitle = t(l.title);
  // Strip "Day N - " / "Jour N - " prefix for sidebar label (the .nav-tag already shows J1/D1)
  const labelText = fullTitle.replace(/^(Jour|Day) \d+ - /, "");
  // For 7-day plan items: mark first not-done as "current" and any subsequent untouched ones as "locked"
  let dayCls = "";
  if (l.id.startsWith("day-")) {
    const idx = DAYS.findIndex(d => d.id === l.id);
    const firstOpenIdx = DAYS.findIndex(d => !state.completed[d.id]);
    if (!done) {
      if (idx === firstOpenIdx) dayCls = "day-current";
      else if (firstOpenIdx !== -1 && idx > firstOpenIdx) dayCls = "day-locked";
    }
  }
  const pct = exTotal ? Math.round((exDone / exTotal) * 100) : 0;
  const remaining = exTotal - exDone;
  let stateCls = "is-empty";
  if (pct === 100) stateCls = "is-done";
  else if (pct >= 80) stateCls = "is-near";
  else if (pct > 0) stateCls = "is-partial";
  const countInner = pct === 100
    ? `<svg class="ex-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="5 12 10 17 19 7"/></svg><span class="ex-num">${exTotal}</span>`
    : `<span class="ex-num">${exDone}<span class="ex-slash">/</span>${exTotal}</span><span class="ex-left" aria-hidden="true">−${remaining}</span>`;
  const ariaLbl = pct === 100
    ? `${exTotal}/${exTotal} exercices terminés`
    : `${exDone} sur ${exTotal} exercices · ${remaining} restant${remaining > 1 ? "s" : ""}`;
  return `<div class="nav-item ${done ? "done" : ""} ${active ? "active" : ""} ${fullyDone ? "fully-done" : ""} ${dayCls}" data-id="${l.id}" title="${esc(fullTitle)}">
    <span class="nav-check">${done ? "✓" : ""}</span>
    <span class="nav-tag">${l.code}</span>
    <span class="nav-label">${esc(labelText)}</span>
    ${exTotal > 0 ? `
    <span class="nav-ex-wrap">
      <span class="nav-star" aria-hidden="true">⭐</span>
      <span class="nav-ex-count ${stateCls}" style="--ex-pct:${pct}%" data-pct="${pct}" data-remaining="${remaining}" aria-label="${esc(ariaLbl)}">${countInner}</span>
    </span>` : ""}
  </div>`;
}

function bindNav() {
  document.querySelectorAll(".nav-item").forEach(el => {
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.addEventListener("click", () => {
      openLesson(el.dataset.id);
      document.body.classList.remove("drawer-open");
    });
    el.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLesson(el.dataset.id);
        document.body.classList.remove("drawer-open");
      }
    });

    const check = el.querySelector(".nav-check");
    if (check) {
      check.setAttribute("role", "checkbox");
      check.setAttribute("tabindex", "0");
      check.setAttribute("aria-label", T.markedAriaLabel);
      const toggle = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const id = el.dataset.id;
        if (state.completed[id]) {
          delete state.completed[id];
          unclaimXp("lesson:" + id);
        } else {
          state.completed[id] = Date.now();
          celebrate();
          claimXp("lesson:" + id, 25, "Lesson done");
          checkChallenge();
        }
        saveState();
        updateSidebarActive();
        if (state.lastActive === id) {
          const btn = document.getElementById("toggle-done");
          if (btn) {
            const done = !!state.completed[id];
            btn.classList.toggle("done", done);
            btn.textContent = done ? T.marked : T.markDone;
          }
        }
      };
      check.addEventListener("click", toggle);
      check.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") toggle(e);
      });
    }
  });
}

/* ====================================================================
   SIDEBAR COLLAPSE
   ==================================================================== */
function bindCollapseTitles() {
  document.querySelectorAll(".collapsible").forEach(el => {
    el.addEventListener("click", () => {
      const section = el.dataset.section;
      if (state.sectionsCollapsed[section]) {
        delete state.sectionsCollapsed[section];
      } else {
        state.sectionsCollapsed[section] = true;
      }
      saveState();
      applyCollapseState();
    });
  });
}

function applyCollapseState() {
  document.querySelectorAll(".collapsible").forEach(el => {
    const section = el.dataset.section;
    const target = document.getElementById("nav-" + section);
    const arrow = el.querySelector(".collapse-arrow");
    if (!target || !arrow) return;
    if (state.sectionsCollapsed[section]) {
      target.style.display = "none";
      arrow.style.transform = "rotate(-90deg)";
      el.classList.add("collapsed");
    } else {
      target.style.display = "";
      arrow.style.transform = "";
      el.classList.remove("collapsed");
    }
  });
}

function applyNavMode() {
  const mode = state.navMode === "ref" ? "ref" : "plan";
  document.querySelectorAll(".nav-track").forEach(tr => {
    tr.hidden = tr.dataset.track !== mode;
  });
  document.querySelectorAll(".nav-mode-btn").forEach(btn => {
    const on = btn.dataset.mode === mode;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-selected", on ? "true" : "false");
  });
}

function setNavMode(mode) {
  state.navMode = mode === "ref" ? "ref" : "plan";
  saveState();
  applyNavMode();
}

document.querySelectorAll(".nav-mode-btn").forEach(btn => {
  btn.addEventListener("click", () => setNavMode(btn.dataset.mode));
});

/* ====================================================================
   LAZY HYDRATION — slim data.js holds metadata only; full content
   (sections, exercise desc/sol, quizzes) is fetched per-lesson on demand.
   ==================================================================== */
const __hydrated = new Set();
const __hydrating = new Map();
function hydrateLesson(id) {
  if (__hydrated.has(id)) return Promise.resolve(true);
  const inflight = __hydrating.get(id);
  if (inflight) return inflight;
  const p = fetch("../web/data/" + id + ".json")
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(detail => {
      const lesson = LESSON_BY_ID.get(id);
      if (lesson) {
        if (detail.sections)  lesson.sections  = detail.sections;
        if (detail.quiz)      lesson.quiz      = detail.quiz;
        if (detail.exercises) lesson.exercises = detail.exercises;
        if (detail.problemes) lesson.problemes = detail.problemes;
      }
      __hydrated.add(id);
      return true;
    })
    .catch(() => false)
    .finally(() => { __hydrating.delete(id); });
  __hydrating.set(id, p);
  return p;
}

/* ====================================================================
   OPEN LESSON
   ==================================================================== */
function openLesson(id) {
  const lesson = LESSON_BY_ID.get(id);
  if (!lesson) return;
  state.lastActive = id;
  saveState();
  updateSidebarActive();

  const done = !!state.completed[id];
  const isDay = id.startsWith("day-");
  state.navMode = isDay ? "plan" : "ref";
  applyNavMode();
  const hasEx = (lesson.exercises && lesson.exercises.length > 0) || (lesson.problemes && lesson.problemes.length > 0);
  const idx = LESSON_INDEX_BY_ID.get(id);
  const prev = idx > 0 ? ALL_LESSONS[idx - 1] : null;
  const next = idx < ALL_LESSONS.length - 1 ? ALL_LESSONS[idx + 1] : null;

  currentTab = "cours";
  exFilter = "all";

  const main = document.getElementById("main");
  const lessonTitle = t(lesson.title);
  const prevTitle = prev ? t(prev.title).replace(/^(Jour|Day) \d+ - /, "") : "";
  const nextTitle = next ? t(next.title).replace(/^(Jour|Day) \d+ - /, "") : "";
  const breadcrumb = isDay
    ? (state.lang === "en" ? "📘 7-day plan" : "📘 Plan 7 jours")
    : "🌐 W3Schools PHP";
  main.innerHTML = `
    <div class="lesson-header">
      <div>
        <div class="breadcrumb">${breadcrumb} · ${lesson.code}</div>
        <h1 class="lesson-title">${esc(lessonTitle)}</h1>
        ${lesson.sub ? `<div class="lesson-sub">${esc(t(lesson.sub))}</div>` : ""}
        ${lesson.tags ? `<div class="tag-row">${lesson.tags.map(tag => `<span class="tag">#${esc(t(tag))}</span>`).join("")}</div>` : ""}
      </div>
      <div class="lesson-actions">
        ${id === "day-7" ? `<span class="tag" style="background:rgba(245,158,11,.12);color:var(--warn);font-weight:700">${T.mockExam}</span>` : ""}
        ${W3_URLS[id] ? `<a class="w3-link" href="${W3_URLS[id]}" target="_blank" rel="noopener noreferrer">${SVGI.book}<span>${T.w3Source}</span>${SVGI.external}</a>` : ""}
        <button class="complete-btn ${done ? "done" : ""}" id="toggle-done">${done ? T.marked : T.markDone}</button>
      </div>
    </div>
    ${lesson.why ? `<div class="why-card"><b>${T.why}</b> ${t(lesson.why)}</div>` : ""}
    ${id === "day-7" ? renderMockExamCard() : ""}
    ${renderReviewStrip(lesson)}
    <div id="ex-area"></div>
    <div class="lesson-foot">
      ${prev ? `<button class="btn-nav prev" data-id="${prev.id}"><span class="dir">${T.prev}</span><span class="ttl">${esc(prevTitle)}</span></button>` : `<div class="btn-nav" style="opacity:.3;cursor:default"><span class="dir">${T.start}</span><span class="ttl">${T.noLesson}</span></div>`}
      ${next ? `<button class="btn-nav next" data-id="${next.id}"><span class="dir">${T.nextDir}</span><span class="ttl">${esc(nextTitle)}</span></button>` : `<div class="btn-nav next" style="opacity:.3;cursor:default"><span class="dir">${T.end}</span><span class="ttl">${T.noMoreLessons}</span></div>`}
    </div>
  `;

  document.getElementById("toggle-done").addEventListener("click", () => toggleDone(id));
  main.querySelectorAll(".btn-nav[data-id]").forEach(btn => {
    btn.addEventListener("click", () => openLesson(btn.dataset.id));
  });

  main.classList.add("main-animate-in");
  // Show a skeleton in the body area while we fetch the detail JSON.
  const area = document.getElementById("ex-area");
  if (area && !__hydrated.has(id)) {
    area.innerHTML =
      '<div class="lesson-skel" aria-hidden="true">' +
      '<div class="skel-line w70"></div><div class="skel-line w50"></div>' +
      '<div class="skel-line w90"></div><div class="skel-line w60"></div>' +
      '</div>';
  }
  hydrateLesson(id).then(ok => {
    // The user may have navigated away while we were fetching.
    if (state.lastActive !== id) return;
    if (!ok) {
      // Network + cache both failed — surface a retry button instead of
      // leaving the skeleton spinning indefinitely.
      const a = document.getElementById("ex-area");
      if (a) a.innerHTML =
        '<div class="lesson-err">' +
        '<p>' + (state.lang === "en" ? "Couldn’t load this lesson." : "Impossible de charger cette leçon.") + '</p>' +
        '<button class="btn-retry" id="retry-hydrate">' + (state.lang === "en" ? "Retry" : "Réessayer") + '</button>' +
        '</div>';
      const r = document.getElementById("retry-hydrate");
      if (r) r.addEventListener("click", () => openLesson(id));
      return;
    }
    renderExArea(lesson);
    bindCopyButtons();
    // Warm the cache for the most likely next opens (prev/next) when idle.
    const ric = window.requestIdleCallback || (cb => setTimeout(cb, 600));
    ric(() => {
      if (prev && !__hydrated.has(prev.id)) hydrateLesson(prev.id);
      if (next && !__hydrated.has(next.id)) hydrateLesson(next.id);
    });
  });
  bindReviewStrip();
  scrollToPageTop();
}

function toggleDone(id) {
  const wasDone = !!state.completed[id];
  if (wasDone) {
    delete state.completed[id];
    unclaimXp("lesson:" + id);
  } else {
    state.completed[id] = Date.now();
    claimXp("lesson:" + id, 25, "Lesson done");
  }
  // Cheap synchronous feedback on the button so the click feels instant.
  const btn = document.getElementById("toggle-done");
  if (btn) {
    btn.classList.toggle("done", !wasDone);
    btn.textContent = wasDone ? T.markDone : T.marked;
  }
  saveState();
  // Defer the heavy stuff (confetti, challenge check, full lesson re-render)
  // to the next frame so the browser can paint the button state change first.
  requestAnimationFrame(() => {
    if (!wasDone) {
      celebrate();
      checkChallenge();
    }
    openLesson(id);
  });
}

/* ====================================================================
   EX AREA
   ==================================================================== */
function exKey(lesson, ex) {
  return lesson.id + "-" + ex.num;
}

function activeExerciseList(lesson) {
  return currentTab === "probs" ? (lesson.problemes || []) : (lesson.exercises || []);
}

function isWeakExercise(lesson, ex) {
  const c = state.confidence[exKey(lesson, ex)];
  return c === "shaky" || c === "no";
}

function exerciseMatchesFilter(lesson, ex) {
  if (exFilter === "all") return true;
  const key = exKey(lesson, ex);
  if (exFilter === "bookmark") return !!state.bookmarks[key];
  if (exFilter === "weak") return isWeakExercise(lesson, ex);
  return ex.diff === exFilter;
}

function emptyExerciseMessage() {
  return exFilter === "weak" ? T.noWeak : T.noExos;
}

function refreshExercisePanelCounts(lesson) {
  const area = document.getElementById("ex-area");
  if (!area) return;
  const exsRaw = lesson.exercises || [];
  const probsRaw = lesson.problemes || [];
  const updateTab = (tab, list) => {
    const b = area.querySelector(`.tab[data-tab="${tab}"] b`);
    if (b) b.textContent = `${list.filter(e => state.exDone[exKey(lesson, e)]).length}/${list.length}`;
  };
  updateTab("exos", exsRaw);
  updateTab("probs", probsRaw);

  if (currentTab !== "exos" && currentTab !== "probs") return;
  const activeList = activeExerciseList(lesson);
  const total = activeList.length;
  const done = activeList.filter(e => state.exDone[exKey(lesson, e)]).length;
  const countFor = filter => {
    if (filter === "all") return total;
    if (filter === "bookmark") return activeList.filter(e => state.bookmarks[exKey(lesson, e)]).length;
    if (filter === "weak") return activeList.filter(e => isWeakExercise(lesson, e)).length;
    return activeList.filter(e => e.diff === filter).length;
  };
  ["all", "easy", "medium", "hard", "extreme", "bookmark", "weak"].forEach(filter => {
    const b = area.querySelector(`.ex-filter-btn[data-filter="${filter}"] b`);
    if (b) b.textContent = countFor(filter);
  });

  const counter = area.querySelector(".ex-counter");
  if (counter) {
    const pct = total ? Math.round(done / total * 100) : 0;
    counter.innerHTML = `
      <b>${done}</b>/${total} ${T.done}
      <span class="ex-counter-bar"><span class="ex-counter-fill" style="width:${pct}%"></span></span>
    `;
  }
}

function ensureExerciseEmptyState() {
  const cards = document.querySelector("#ex-area .ex-cards");
  if (!cards) return;
  if (cards.querySelector(".ex-card")) {
    cards.querySelector(".empty-search")?.remove();
    return;
  }
  if (!cards.querySelector(".empty-search")) {
    cards.innerHTML = `<div class="empty-search">${emptyExerciseMessage()}</div>`;
  }
}

function removeCardIfFilteredOut(lesson, ex) {
  if (exerciseMatchesFilter(lesson, ex)) return;
  const card = document.getElementById("ex-" + exKey(lesson, ex));
  if (card) card.remove();
  ensureExerciseEmptyState();
}

function renderExArea(lesson) {
  const area = document.getElementById("ex-area");
  if (!area) return;
  const exsRaw   = lesson.exercises || [];
  const probsRaw = lesson.problemes || [];
  const hasEx    = exsRaw.length > 0;
  const hasProbs = probsRaw.length > 0;

  const doneEx = exsRaw.filter(e => state.exDone[exKey(lesson, e)]).length;
  const doneP  = probsRaw.filter(e => state.exDone[exKey(lesson, e)]).length;

  // Pick which list the active tab points to (defaults to exercises if probs tab selected on a lesson without probs).
  if (currentTab === "probs" && !hasProbs) currentTab = "exos";
  if (currentTab === "exos"  && !hasEx)    currentTab = hasProbs ? "probs" : "cours";

  const activeList = activeExerciseList(lesson);
  const total     = activeList.length;
  const done      = activeList.filter(e => state.exDone[exKey(lesson, e)]).length;
  const bmCount   = activeList.filter(e => state.bookmarks[exKey(lesson, e)]).length;
  const weakCount = activeList.filter(e => isWeakExercise(lesson, e)).length;

  let filtered = activeList;
  if (exFilter !== "all") {
    filtered = activeList.filter(e => exerciseMatchesFilter(lesson, e));
  }
  const emptyMsg = emptyExerciseMessage();

  const tabsHtml = `
    <div class="tab ${currentTab === "cours" ? "active" : ""}" data-tab="cours">${SVGI.book} <span>${T.tabCourse}</span></div>
    ${hasEx ? `<div class="tab ${currentTab === "exos" ? "active" : ""}" data-tab="exos">${SVGI.pencil} <span>${T.tabExos}</span> <b style="font-variant-numeric:tabular-nums;margin-left:4px">${doneEx}/${exsRaw.length}</b></div>` : ""}
    ${hasProbs ? `<div class="tab tab-probs ${currentTab === "probs" ? "active" : ""}" data-tab="probs">${SVGI.puzzle} <span>${T.tabProbs}</span> <b style="font-variant-numeric:tabular-nums;margin-left:4px">${doneP}/${probsRaw.length}</b></div>` : ""}
  `;

  const listTabHtml = (hasEx || hasProbs) && (currentTab === "exos" || currentTab === "probs") ? `
    <div class="tab-content active" id="tab-${currentTab}">
      <div class="ex-filter">
        <button class="ex-filter-btn ${exFilter === "all" ? "active" : ""}" data-filter="all">${SVGI.filter}<span>${T.filterAll}</span><b>${total}</b></button>
        <button class="ex-filter-btn diff-easy ${exFilter === "easy" ? "active" : ""}" data-filter="easy">${SVGI.leaf}<span>${T.filterEasy}</span><b>${activeList.filter(e => e.diff === "easy").length}</b></button>
        <button class="ex-filter-btn diff-medium ${exFilter === "medium" ? "active" : ""}" data-filter="medium">${SVGI.flame}<span>${T.filterMedium}</span><b>${activeList.filter(e => e.diff === "medium").length}</b></button>
        <button class="ex-filter-btn diff-hard ${exFilter === "hard" ? "active" : ""}" data-filter="hard">${SVGI.bolt}<span>${T.filterHard}</span><b>${activeList.filter(e => e.diff === "hard").length}</b></button>
        <button class="ex-filter-btn diff-extreme ${exFilter === "extreme" ? "active" : ""}" data-filter="extreme">${SVGI.skull}<span>${T.filterExtreme}</span><b>${activeList.filter(e => e.diff === "extreme").length}</b></button>
        <button class="ex-filter-btn ${exFilter === "bookmark" ? "active" : ""}" data-filter="bookmark">${SVGI.bookmark}<span>${T.filterBookmark}</span><b>${bmCount}</b></button>
        <button class="ex-filter-btn ${exFilter === "weak" ? "active" : ""}" data-filter="weak"><span>${T.filterWeak}</span><b>${weakCount}</b></button>
      </div>
      <div class="ex-counter">
        <b>${done}</b>/${total} ${T.done}
        <span class="ex-counter-bar"><span class="ex-counter-fill" style="width:${total ? Math.round(done / total * 100) : 0}%"></span></span>
      </div>
      <div class="ex-cards">
        ${filtered.length ? filtered.map(e => renderExCard(lesson, e)).join("") : `<div class="empty-search">${emptyMsg}</div>`}
      </div>
    </div>` : "";

  area.innerHTML = `
    <div class="tabs">${tabsHtml}</div>
    <div class="tab-content ${currentTab === "cours" ? "active" : ""}" id="tab-cours">
      <div class="lesson-body">
        ${(lesson.sections || []).map(renderSection).join("")}
        ${lesson.quiz && lesson.quiz.length ? renderQuiz(lesson.quiz, lesson.id) : ""}
      </div>
    </div>
    ${listTabHtml}
  `;

  // Tab switching
  area.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      currentTab = tab.dataset.tab;
      renderExArea(lesson);
      bindCopyButtons();
      area.querySelector(".tab.active")?.scrollIntoView({ block: "nearest", inline: "center" });
    });
  });

  // Quiz (always in "cours" tab)
  area.querySelectorAll(".quiz-opt").forEach(opt => {
    opt.addEventListener("click", () => {
      const card = opt.closest(".quiz-card");
      if (card.dataset.answered) return;
      card.dataset.answered = "1";
      card.classList.add("answered");
      const correct = card.dataset.correct;
      card.querySelectorAll(".quiz-opt").forEach(o => {
        o.classList.add("disabled");
        if (o.dataset.letter === correct) {
          o.classList.add("correct");
          o.insertAdjacentHTML("beforeend", ' <span class="quiz-ico">&#10003;</span>');
        } else if (o === opt) {
          o.classList.add("wrong");
          o.insertAdjacentHTML("beforeend", ' <span class="quiz-ico">&#10007;</span>');
        }
      });
      const expl = card.querySelector(".quiz-expl");
      if (expl) expl.classList.add("shown");
      // Persist so the answer survives navigation / reload
      if (card.dataset.qkey) {
        if (!state.quizAnswers) state.quizAnswers = {};
        state.quizAnswers[card.dataset.qkey] = opt.dataset.letter;
        saveState();
      }
    });
  });

  // Try buttons
  area.querySelectorAll(".try-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      const open = target.classList.toggle("open");
      btn.textContent = open ? T.hideAnswer : T.seeAnswer;
    });
  });

  // Output toggle
  area.querySelectorAll(".output-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const wrap = btn.closest(".code-output");
      const open = wrap.classList.toggle("open");
      btn.textContent = open ? T.hideOutput : T.showOutput;
    });
  });

  if (!hasEx && !hasProbs) return;

  // Exercise filter
  area.querySelectorAll(".ex-filter-btn").forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", () => {
      exFilter = btn.dataset.filter;
      renderExArea(lesson);
      bindCopyButtons();
      area.querySelector(".ex-filter-btn.active")?.scrollIntoView({ block: "nearest", inline: "center" });
    });
  });

  // Exercise check toggle
  area.querySelectorAll(".ex-check").forEach(chk => {
    chk.addEventListener("click", e => {
      e.stopPropagation();
      const key = chk.dataset.key;
      const wasDone = !!state.exDone[key];
      if (wasDone) {
        delete state.exDone[key];
        unclaimXp("ex:" + key);
      } else {
        state.exDone[key] = Date.now();
        const num = parseInt(key.split("-").pop(), 10);
        const ex = [...(lesson.exercises||[]), ...(lesson.problemes||[])].find(x => x.num === num);
        if (ex) claimXp("ex:" + key, xpFromDiff(ex.diff), "Exo " + ex.diff);
      }
      // Cheap synchronous feedback: flip the card's own classes so the user
      // sees the tick land before we do the heavy re-render in the next frame.
      const card = document.getElementById("ex-" + key);
      if (card) card.classList.toggle("done", !wasDone);
      chk.classList.toggle("done", !wasDone);
      chk.textContent = wasDone ? "" : "✓";
      saveState();
      requestAnimationFrame(() => {
        checkLessonMastery(lesson);
        checkDailyGoal();
        if (!wasDone) checkChallenge();
        updateSidebarActive();
        refreshExercisePanelCounts(lesson);
      });
    });
  });

  // Bookmark toggle (kept on the card so users can bookmark without opening)
  area.querySelectorAll(".ex-card .ex-bookmark").forEach(bm => {
    bm.addEventListener("click", e => {
      e.stopPropagation();
      const key = bm.dataset.key;
      const on = !state.bookmarks[key];
      if (on) state.bookmarks[key] = Date.now();
      else delete state.bookmarks[key];
      const num = parseInt(key.split("-").pop(), 10);
      const ex = [...(lesson.exercises || []), ...(lesson.problemes || [])].find(x => x.num === num);
      _exSyncCardBookmark(key, on);
      saveState();
      requestAnimationFrame(() => {
        refreshExercisePanelCounts(lesson);
        if (ex) removeCardIfFilteredOut(lesson, ex);
      });
    });
  });

  // Card click / Enter / Space → open modal (ignore clicks on check + bookmark)
  function openCardModal(card) {
    const exNum = parseInt(card.dataset.num, 10);
    const pool = [...(lesson.exercises || []), ...(lesson.problemes || [])];
    const ex = pool.find(x => x.num === exNum);
    if (ex) openExModal(lesson, ex);
  }
  area.querySelectorAll(".ex-card").forEach(card => {
    card.addEventListener("click", e => {
      if (e.target.closest(".ex-check") || e.target.closest(".ex-bookmark")) return;
      openCardModal(card);
    });
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        if (e.target.closest(".ex-check") || e.target.closest(".ex-bookmark")) return;
        e.preventDefault();
        openCardModal(card);
      }
    });
  });
}

function renderSection(s) {
  let out = `<section class="section-card">`;
  out += `<h3>${t(s.h)}</h3>`;
  if (s.p) out += `<p>${t(s.p)}</p>`;
  if (s.blocks && Array.isArray(s.blocks)) {
    s.blocks.forEach(b => { out += renderBlock(b); });
  }
  out += `</section>`;
  return out;
}

function renderBlock(b) {
  if (b.p) return `<p>${t(b.p)}</p>`;
  if (b.text) return `<p>${t(b.text)}</p>`;
  if (b.code) {
    const out = b.out
      ? `<div class="code-output"><button class="output-toggle">${T.showOutput}</button><div class="output-content"><pre><code>${esc(t(b.out))}</code></pre></div></div>`
      : "";
    // Code body stays as-is (translating code would break it). Comments translation: future work.
    return `<div class="block-code"><pre><code>${highlightPhp(t(b.code))}</code></pre></div>${out}`;
  }
  if (b.note) return `<div class="block-note"><b>${T.note}</b> ${t(b.note)}</div>`;
  if (b.tip) return `<div class="block-tip"><b>${T.tip}</b> ${t(b.tip)}</div>`;
  if (b.warn) return `<div class="block-warn"><b>${T.warn}</b> ${t(b.warn)}</div>`;
  if (b.bad) return `<div class="block-bad"><b>${T.bad}</b> ${t(b.bad)}</div>`;
  if (b.try) {
    const id = "try-" + Math.random().toString(36).slice(2, 9);
    return `<div class="block-try"><b>🤔 ${T.guess} —</b> ${t(b.try)}<button class="try-btn" data-target="${id}">${T.seeAnswer}</button><div class="try-ans" id="${id}">${t(b.ans || "")}</div></div>`;
  }
  if (b.table) {
    const rows = b.table.map((row, i) =>
      `<tr>${row.map(c => `<${i === 0 ? "th" : "td"}>${c}</${i === 0 ? "th" : "td"}>`).join("")}</tr>`
    ).join("");
    return `<div class="block-table"><table>${rows}</table></div>`;
  }
  if (b.list) {
    return `<ul class="block-list">${b.list.map(li => `<li>${li}</li>`).join("")}</ul>`;
  }
  return "";
}

function renderQuiz(quiz, lessonId) {
  const answers = state.quizAnswers || {};
  const cards = quiz.map((q, i) => {
    const key = lessonId + "-q" + i;
    const chosen = answers[key];           // letter the user picked, or undefined
    const answered = chosen != null;
    const letters = q.opts.map((_, j) => String.fromCharCode(97 + j));
    const opts = q.opts.map((o, j) => {
      const letter = letters[j];
      let cls = "quiz-opt", ico = "";
      if (answered) {
        cls += " disabled";
        if (letter === q.correct) { cls += " correct"; ico = ' <span class="quiz-ico">&#10003;</span>'; }
        else if (letter === chosen) { cls += " wrong"; ico = ' <span class="quiz-ico">&#10007;</span>'; }
      }
      return `<button class="${cls}" data-letter="${letter}">${t(o)}${ico}</button>`;
    }).join("");
    return `<div class="quiz-card${answered ? " answered" : ""}" data-correct="${q.correct}" data-qkey="${key}"${answered ? ' data-answered="1"' : ""}>
      <div class="quiz-q"><span class="num">Q${i + 1}.</span> ${t(q.q)}</div>
      <div class="quiz-opts">${opts}</div>
      ${q.expl ? `<div class="quiz-expl${answered ? " shown" : ""}">${t(q.expl)}</div>` : ""}
    </div>`;
  }).join("");
  return `<div class="quiz-section">
    <h3 class="quiz-title">${T.quizTitle}</h3>
    <p class="quiz-sub">${T.quizSub}</p>
    ${cards}
  </div>`;
}

function renderExCard(lesson, ex) {
  const key = lesson.id + "-" + ex.num;
  const exDone = !!state.exDone[key];
  const isBm = !!state.bookmarks[key];
  const isProb = (lesson.problemes || []).some(p => p.num === ex.num);
  const hasNote = !!(state.notes && state.notes[key] && state.notes[key].trim());
  const diffLbl = { easy: T.diffEasy, medium: T.diffMedium, hard: T.diffHard, extreme: T.diffExtreme };
  // Stroke-only SVGs for indicators — clean professional, no emoji, no flat dots
  const noteIco = hasNote ? noteIconSvg() : "";
  // Problèmes are inherently "pro tier" — show a crown instead of the extreme skull
  // so the column doesn't read as a wall of skulls.
  const probDiffSvg = `<svg class="ex-diff-svg" aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>`;
  // Difficulty icon — sits on the same row as the chip
  const diffSvg = {
    easy:    `<svg class="ex-diff-svg" aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>`,
    medium:  `<svg class="ex-diff-svg" aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
    hard:    `<svg class="ex-diff-svg" aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    extreme: `<svg class="ex-diff-svg" aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 20v2h8v-2"/><path d="m12.5 17-.5-1-.5 1h1z"/><path d="M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"/></svg>`,
  };
  const chipSvg = isProb ? probDiffSvg : (diffSvg[ex.diff] || "");
  const chipLbl = isProb ? (T.proLabel || "PRO") : (diffLbl[ex.diff] || ex.diff);
  const bmIco = bookmarkIconSvg(isBm);
  return `<div class="ex-card ${exDone ? "done" : ""}" id="ex-${key}" data-lesson="${lesson.id}" data-num="${ex.num}" role="button" tabindex="0">
    <span class="ex-check ${exDone ? "done" : ""}" data-key="${key}" title="${T.markedAriaLabel}">${exDone ? "✓" : ""}</span>
    <span class="ex-meta">
      <span class="ex-num-text">#${ex.num}</span>
      <span class="ex-diff ${ex.diff}${isProb ? " prob" : ""}">${chipSvg}<span class="ex-diff-lbl">${chipLbl}</span></span>
      ${noteIco}
    </span>
    <div class="ex-title">${esc(t(ex.title))}</div>
    <button class="ex-bookmark ${isBm ? "active" : ""}" data-key="${key}" title="${isBm ? T.removeBookmark : T.addBookmark}" aria-label="${isBm ? T.removeBookmark : T.addBookmark}">${bmIco}</button>
    <span class="ex-open-arrow" aria-hidden="true">›</span>
  </div>`;
}

/* ====================================================================
   EXERCISE MODAL — centered overlay opened on card click
   In-place state updates (no full rebuild on each click).
   ==================================================================== */
let _exModalCurrent = null;  // { lesson, ex, key }
let _exModalLastFocus = null;

function _exSyncCardCheck(key, done) {
  const card = document.getElementById("ex-" + key);
  if (!card) return;
  card.classList.toggle("done", done);
  const chk = card.querySelector(".ex-check");
  if (chk) { chk.classList.toggle("done", done); chk.textContent = done ? "✓" : ""; }
}
function _exSyncCardBookmark(key, on) {
  const card = document.getElementById("ex-" + key);
  if (!card) return;
  const bm = card.querySelector(".ex-bookmark");
  if (bm) {
    bm.classList.toggle("active", on);
    bm.innerHTML = bookmarkIconSvg(on);
    bm.title = on ? T.removeBookmark : T.addBookmark;
    bm.setAttribute("aria-label", on ? T.removeBookmark : T.addBookmark);
  }
}

function _exRenderActions(key) {
  const conf = state.confidence[key] || "";
  const isBm = !!state.bookmarks[key];
  const isDone = !!state.exDone[key];
  const checkSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;
  return `
    <button class="ex-modal-btn ex-modal-done-btn ${isDone ? "done" : ""}" id="ex-modal-done-btn" title="${T.markedAriaLabel}">
      <span class="ico">${isDone ? checkSvg : ""}</span><span>${T.markedAriaLabel}</span>
    </button>
    <button class="ex-modal-btn ex-modal-sol-btn" id="ex-modal-sol-btn">${SVGI.light}<span>${T.viewSol}</span></button>
    <div class="ex-modal-spacer"></div>
    <div class="ex-modal-rate-row">
      <div class="ex-modal-conf" id="ex-modal-conf" title="${T.confLabel}">
        <button class="conf-btn got ${conf === "got" ? "active" : ""}" data-conf="got" title="${T.confGot}">😎</button>
        <button class="conf-btn shaky ${conf === "shaky" ? "active" : ""}" data-conf="shaky" title="${T.confShaky}">😐</button>
        <button class="conf-btn no ${conf === "no" ? "active" : ""}" data-conf="no" title="${T.confNo}">😵</button>
      </div>
      <button class="ex-modal-btn-icon ex-modal-bookmark ${isBm ? "active" : ""}" id="ex-modal-bookmark" title="${isBm ? T.removeBookmark : T.addBookmark}" aria-label="${isBm ? T.removeBookmark : T.addBookmark}">${bookmarkIconSvg(isBm, 15)}</button>
    </div>
  `;
}

function _exWireActions(lesson, ex, key) {
  // Mark done
  const doneBtn = document.getElementById("ex-modal-done-btn");
  doneBtn.addEventListener("click", () => {
    const wasDone = !!state.exDone[key];
    if (wasDone) {
      delete state.exDone[key];
      unclaimXp("ex:" + key);
    } else {
      state.exDone[key] = Date.now();
      claimXp("ex:" + key, xpFromDiff(ex.diff), "Exo " + ex.diff);
    }
    saveState();
    const on = !!state.exDone[key];
    doneBtn.classList.toggle("done", on);
    doneBtn.querySelector(".ico").textContent = on ? "✓" : "";
    _exSyncCardCheck(key, on);
    checkLessonMastery(lesson);
    checkDailyGoal();
    if (!wasDone) checkChallenge();
    updateSidebarActive();
    refreshExercisePanelCounts(lesson);
  });

  // Solution toggle
  const solBox = document.getElementById("ex-modal-sol");
  const solBtn = document.getElementById("ex-modal-sol-btn");
  solBtn.addEventListener("click", () => {
    const showing = !solBox.hidden;
    solBox.hidden = showing;
    solBtn.classList.toggle("open", !showing);
    solBtn.innerHTML = (!showing
      ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg><span>${T.hideSol}</span>`
      : `${SVGI.light}<span>${T.viewSol}</span>`);
    if (!showing) bindCopyButtons();
  });

  // Confidence (in-place)
  document.querySelectorAll("#ex-modal-conf .conf-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const val = btn.dataset.conf;
      const wasSame = state.confidence[key] === val;
      if (wasSame) delete state.confidence[key];
      else state.confidence[key] = val;
      saveState();
      if (!wasSame) { noteConfidenceToday(key); checkChallenge(); }
      document.querySelectorAll("#ex-modal-conf .conf-btn").forEach(b => {
        b.classList.toggle("active", state.confidence[key] === b.dataset.conf);
      });
    });
  });

  // Bookmark (in-place)
  const bmBtn = document.getElementById("ex-modal-bookmark");
  bmBtn.addEventListener("click", e => {
    e.stopPropagation();
    if (state.bookmarks[key]) delete state.bookmarks[key];
    else state.bookmarks[key] = Date.now();
    saveState();
    const on = !!state.bookmarks[key];
    bmBtn.classList.toggle("active", on);
    bmBtn.innerHTML = bookmarkIconSvg(on, 15);
    bmBtn.title = on ? T.removeBookmark : T.addBookmark;
    bmBtn.setAttribute("aria-label", on ? T.removeBookmark : T.addBookmark);
    _exSyncCardBookmark(key, on);
    refreshExercisePanelCounts(lesson);
    removeCardIfFilteredOut(lesson, ex);
  });
}

let _noteSaveTimer = null;
let _noteSavedTimer = null;
function _exWireNote(key) {
  const ta = document.getElementById("ex-modal-note-input");
  const label = document.getElementById("ex-modal-note-label");
  const savedTag = document.getElementById("ex-modal-note-saved");
  if (!ta || !label) return;
  if (!state.notes) state.notes = {};
  ta.value = state.notes[key] || "";
  ta.setAttribute("placeholder", T.notesPlaceholder);
  label.textContent = T.notesLabel;
  if (savedTag) { savedTag.textContent = T.notesSaved; savedTag.classList.remove("show"); }
  ta.oninput = () => {
    clearTimeout(_noteSaveTimer);
    _noteSaveTimer = setTimeout(() => {
      const v = ta.value;
      if (v && v.trim()) state.notes[key] = v;
      else delete state.notes[key];
      saveState();
      // Sync indicator dot on the card list
      const card = document.getElementById("ex-" + key);
      if (card) {
        const has = !!(state.notes[key] && state.notes[key].trim());
        const meta = card.querySelector(".ex-meta");
        const note = card.querySelector(".ex-note-ico");
        if (has && meta && !note) {
          meta.insertAdjacentHTML("beforeend", noteIconSvg());
        } else if (!has && note) {
          note.remove();
        }
      }
      if (savedTag) {
        savedTag.classList.add("show");
        clearTimeout(_noteSavedTimer);
        _noteSavedTimer = setTimeout(() => savedTag.classList.remove("show"), 1100);
      }
    }, 320);
  };
}

function openExModal(lesson, ex) {
  const modal = document.getElementById("ex-modal");
  if (!modal) return;
  const key = lesson.id + "-" + ex.num;
  _exModalCurrent = { lesson, ex, key };
  _exModalLastFocus = document.activeElement;

  const diffLbl = { easy: T.diffEasy, medium: T.diffMedium, hard: T.diffHard, extreme: T.diffExtreme };
  const diffIcoMap = { easy: SVGI.leaf, medium: SVGI.flame, hard: SVGI.bolt, extreme: SVGI.skull };
  const isProb = (lesson.problemes || []).some(p => p.num === ex.num);
  const probIco = `<svg class="lico" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>`;
  document.getElementById("ex-modal-num").textContent = "#" + ex.num;
  document.getElementById("ex-modal-title").textContent = t(ex.title);
  const diffEl = document.getElementById("ex-modal-diff");
  diffEl.className = "ex-modal-diff " + ex.diff + (isProb ? " prob" : "");
  // Render the diff SVG icon side-by-side with the chip label so the snippet sits next to the emoji
  const modalChipIco = isProb ? probIco : (diffIcoMap[ex.diff] || "");
  const modalChipLbl = isProb ? (T.proLabel || "Pro") : (diffLbl[ex.diff] || ex.diff);
  diffEl.innerHTML = `${modalChipIco}<span>${modalChipLbl}</span>`;
  document.getElementById("ex-modal-body").innerHTML = t(ex.desc || "");

  document.getElementById("ex-modal-actions").innerHTML = _exRenderActions(key);

  const solBox = document.getElementById("ex-modal-sol");
  solBox.innerHTML = `<div class="block-code"><pre><code>${highlightPhp(t(ex.sol))}</code></pre></div>`;
  solBox.hidden = true;

  _exWireActions(lesson, ex, key);
  _exWireNote(key);

  modal.hidden = false;
  // Compensate scrollbar to avoid layout shift when locking body scroll.
  const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
  if (scrollbarW > 0) document.documentElement.style.paddingRight = scrollbarW + "px";
  document.documentElement.style.overflow = "hidden";

  // Focus the close button so Esc / Tab feel natural.
  setTimeout(() => {
    const closeBtn = document.getElementById("ex-modal-close");
    if (closeBtn) closeBtn.focus();
  }, 30);
}

function closeExModal() {
  const modal = document.getElementById("ex-modal");
  if (!modal) return;
  modal.hidden = true;
  document.documentElement.style.overflow = "";
  document.documentElement.style.paddingRight = "";
  if (_exModalLastFocus && typeof _exModalLastFocus.focus === "function") {
    try { _exModalLastFocus.focus(); } catch {}
  }
  _exModalCurrent = null;
}

// One-time global wiring for the modal shell (backdrop + close + Esc + focus trap).
(function wireExModalShell() {
  function init() {
    const closeBtn = document.getElementById("ex-modal-close");
    const backdrop = document.getElementById("ex-modal-backdrop");
    const dialog   = document.getElementById("ex-modal-dialog");
    if (closeBtn) closeBtn.addEventListener("click", closeExModal);
    if (backdrop) backdrop.addEventListener("click", closeExModal);
    document.addEventListener("keydown", e => {
      if (!_exModalCurrent) return;
      if (e.key === "Escape") { e.stopPropagation(); closeExModal(); return; }
      if (e.key === "Tab" && dialog) {
        // Simple focus trap inside the dialog.
        const focusables = dialog.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }, true);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

/* ====================================================================
   COPY BUTTON
   ==================================================================== */
function bindCopyButtons() {
  document.querySelectorAll(".block-code pre code").forEach(codeBlock => {
    const pre = codeBlock.parentElement;
    if (pre.querySelector(".copy-btn")) return;
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.textContent = T.copy;
    pre.appendChild(btn);
    btn.addEventListener("click", async e => {
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(codeBlock.innerText);
        btn.textContent = T.copied;
        btn.style.background = "var(--good)";
        btn.style.color = "#fff";
        setTimeout(() => {
          btn.textContent = T.copy;
          btn.style.background = "";
          btn.style.color = "";
        }, 1800);
      } catch {}
    });
  });
}

const toastEl = document.getElementById("toast");
let toastTimer = null;
function toast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
}

/* ====================================================================
   PROGRESS
   ==================================================================== */
function refreshProgress() {
  const doneLessons = Object.keys(state.completed).length;
  const doneEx = Object.keys(state.exDone).length;
  const pct = Math.round((doneLessons / TOTAL) * 100);

  document.getElementById("pct").textContent = pct;
  document.getElementById("stat-lessons").textContent = doneLessons;
  document.getElementById("stat-exercises").textContent = doneEx;

  const bar = document.getElementById("bar-fill");
  if (bar) bar.style.width = pct + "%";
  const barWrap = bar && bar.parentElement;
  if (barWrap) barWrap.setAttribute("aria-valuenow", pct);

  // Circular progress ring — 226.19 = 2 * PI * 36
  const ring = document.getElementById("progress-ring-fg");
  if (ring) {
    const C = 226.19;
    ring.style.strokeDashoffset = String(C - (C * pct) / 100);
  }

  const lTotal = document.getElementById("pct-lessons-total");
  if (lTotal) lTotal.textContent = TOTAL;
  const eTotal = document.getElementById("pct-exos-total");
  if (eTotal) eTotal.textContent = TOTAL_EXERCISES;
  const lDone = document.getElementById("pct-lessons");
  if (lDone) lDone.textContent = doneLessons;
  const eDone = document.getElementById("pct-exos");
  if (eDone) eDone.textContent = doneEx;

  document.getElementById("stat-streak").textContent = computeStreak();

  refreshAchievements();
  updateDayIndicator();
  updateDailyGoal();
  updateWeeklyGoal();
  refreshXp();
}

/* ====================================================================
   ACHIEVEMENTS
   ==================================================================== */
// Reusable inline SVG strings (small icons) for the achievement set.
// Each is a 13x13 stroke-only icon coloured by currentColor.
const ACH_SVG = {
  cap:      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 4.03 3 6 3s6-1.34 6-3v-5"/></svg>`,
  badgeCheck: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>`,
  ten:      `<svg width="14" height="14" viewBox="0 0 24 24"><text x="12" y="17" text-anchor="middle" font-family="-apple-system,'Segoe UI',sans-serif" font-weight="800" font-size="13" fill="currentColor">10</text></svg>`,
  pin:      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L9 7l-5 1 5 4-2 7 5-4 5 4-2-7 5-4-5-1z"/></svg>`,
  half:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3 a9 9 0 0 1 0 18 z" fill="currentColor"/></svg>`,
  star:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  medal:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="15" r="6"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/><path d="M7.21 9.5L6 1l6 4 6-4-1.21 8.5"/></svg>`,
  flag:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
  clock:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><polyline points="12 9 12 13 14 15"/><line x1="9" y1="3" x2="15" y2="3"/></svg>`,
  stopwatch:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14" r="7"/><polyline points="12 11 12 14 14 14"/><line x1="9" y1="2" x2="15" y2="2"/><line x1="20.5" y1="6" x2="18.5" y2="8"/></svg>`,
  note:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/></svg>`,
  bookmark: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`,
  rating:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="10"/></svg>`,
  trend:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  sparkle:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>`,
  target:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  trophy:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
  muscle:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h6a4 4 0 0 1 4 4v0a3 3 0 0 1-3 3h-1l3 6a3 3 0 0 1-3 3h-3v-4a4 4 0 0 0-4-4H4v-5a3 3 0 0 1 3-3z"/></svg>`,
};

function computeBadges() {
  const doneLessons = Object.keys(state.completed).length;
  const doneEx = Object.keys(state.exDone).length;
  const doneBm = Object.keys(state.bookmarks).length;
  const day7Done = !!state.completed["day-7"];
  const streak = computeStreak();
  const notesCount = state.notes ? Object.values(state.notes).filter(n => n && n.trim()).length : 0;
  const confCount = state.confidence ? Object.keys(state.confidence).length : 0;
  const pomoCount = Array.isArray(state.pomoLog) ? state.pomoLog.length : 0;
  const chalDone = state.challengeDone ? Object.keys(state.challengeDone).length : 0;
  const weeklyHit = (() => {
    const goal = state.weeklyGoal || 50;
    return weekExoCount() >= goal;
  })();
  const lvl = xpLevel(state.xp || 0);
  return [
    { id: "first-lesson", svg: ACH_SVG.cap,       label: T.ach1,        unlocked: doneLessons >= 1 },
    { id: "first-exo",    svg: ACH_SVG.badgeCheck, label: T.achEx1,     unlocked: doneEx >= 1 },
    { id: "exo-10",       svg: ACH_SVG.ten,       label: T.achEx10,     unlocked: doneEx >= 10 },
    { id: "bookmark",     svg: ACH_SVG.pin,       label: T.achBm,       unlocked: doneBm >= 1 },
    { id: "halfway",      svg: ACH_SVG.half,      label: T.ach2,        unlocked: doneLessons >= Math.ceil(TOTAL / 2) },
    { id: "streak-7",     svg: ACH_SVG.star,      label: T.ach4,        unlocked: streak >= 7 },
    { id: "exo-50",       svg: ACH_SVG.medal,     label: T.achEx50,     unlocked: doneEx >= 50 },
    { id: "day-7",        svg: ACH_SVG.flag,      label: T.achDay7,     unlocked: day7Done },
    { id: "pomo-1",       svg: ACH_SVG.clock,     label: T.ach_pomo1,   unlocked: pomoCount >= 1 },
    { id: "pomo-20",      svg: ACH_SVG.stopwatch, label: T.ach_pomo20,  unlocked: pomoCount >= 20 },
    { id: "notes-10",     svg: ACH_SVG.note,      label: T.ach_notes,   unlocked: notesCount >= 10 },
    { id: "bm-10",        svg: ACH_SVG.bookmark,  label: T.ach_bm10,    unlocked: doneBm >= 10 },
    { id: "conf-10",      svg: ACH_SVG.rating,    label: T.ach_conf10,  unlocked: confCount >= 10 },
    { id: "week-goal",    svg: ACH_SVG.trend,     label: T.ach_week,    unlocked: weeklyHit },
    { id: "lvl-5",        svg: ACH_SVG.star,      label: T.ach_lvl5,    unlocked: lvl >= 5 },
    { id: "lvl-10",       svg: ACH_SVG.sparkle,   label: T.ach_lvl10,   unlocked: lvl >= 10 },
    { id: "chal-3",       svg: ACH_SVG.target,    label: T.ach_chal3,   unlocked: chalDone >= 3 },
    { id: "all-lessons",  svg: ACH_SVG.trophy,    label: T.ach3,        unlocked: doneLessons >= TOTAL },
    { id: "all-exos",     svg: ACH_SVG.muscle,    label: T.ach5,        unlocked: doneEx >= TOTAL_EXERCISES },
  ];
}

function refreshAchievements() {
  const row = document.getElementById("achieve-row");
  const countEl = document.getElementById("achieve-count");
  const badges = computeBadges();
  const unlockedCount = badges.filter(b => b.unlocked).length;

  // First run / migration: sync the "seen" set silently so pre-earned badges
  // don't all fire a celebration at once. Afterwards, new unlocks celebrate.
  if (!state.achSeen) {
    state.achSeen = {};
    badges.forEach(b => { if (b.unlocked) state.achSeen[b.id] = true; });
    saveState();
  } else {
    const newly = badges.filter(b => b.unlocked && !state.achSeen[b.id]);
    if (newly.length) {
      newly.forEach(b => { state.achSeen[b.id] = true; });
      saveState();
      const last = newly[newly.length - 1];
      toast(`${T.achUnlocked} ${last.label}`);
      celebrate();
    }
  }

  if (countEl) countEl.textContent = `${unlockedCount}/${badges.length}`;
  if (!row) return;
  // Only rewrite (and re-trigger the pop animation) when the unlocked set or
  // language actually changed — avoids every badge popping on each refresh.
  const sig = badges.map(b => (b.unlocked ? "1" : "0")).join("") + "|" + (state.lang || "fr");
  if (row.dataset.sig === sig) return;
  row.dataset.sig = sig;
  row.innerHTML = badges.map(b =>
    `<span class="achieve-badge ${b.unlocked ? 'unlocked' : 'locked'}" title="${esc(b.unlocked ? b.label : T.achLocked + ' · ' + b.label)}">${b.svg || ''}</span>`
  ).join("");
}

/* ====================================================================
   LESSON MASTERY — confetti once when every exercise in a lesson is done
   ==================================================================== */
function isLessonMastered(lesson) {
  const exs = [...(lesson.exercises || []), ...(lesson.problemes || [])];
  return exs.length > 0 && exs.every(e => state.exDone[lesson.id + "-" + e.num]);
}
function checkLessonMastery(lesson) {
  if (isLessonMastered(lesson)) {
    if (!state.masteredSeen[lesson.id]) {
      state.masteredSeen[lesson.id] = true;
      saveState();
      celebrate();
      claimXp("mastery:" + lesson.id, 30, "Lesson mastered");
      toast(`${T.lessonMastered} ${t(lesson.title).replace(/^(Jour|Day) \d+ - /, "")}`);
    }
  } else if (state.masteredSeen[lesson.id]) {
    // un-completed an exercise — allow re-celebration later, refund the mastery XP
    delete state.masteredSeen[lesson.id];
    unclaimXp("mastery:" + lesson.id);
    saveState();
  }
}

/* ====================================================================
   DAILY GOAL — exercises completed today vs target
   ==================================================================== */
function todayExoCount() {
  const today = new Date().toDateString();
  let n = 0;
  Object.values(state.exDone).forEach(ts => { if (new Date(ts).toDateString() === today) n++; });
  return n;
}
function updateDailyGoal() {
  const el = document.getElementById("daily-goal");
  if (!el) return;
  const goal = state.dailyGoal || 10;
  const done = todayExoCount();
  const pct = Math.min(100, Math.round((done / goal) * 100));
  const reached = done >= goal;
  el.classList.toggle("reached", reached);
  el.innerHTML = `
    <div class="daily-head">
      <span class="daily-label">${SVGI.target}<span>${T.dailyGoal}</span></span>
      <button class="daily-edit" id="daily-edit" title="${T.editGoal}" aria-label="${T.editGoal}">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
      </button>
    </div>
    <div class="daily-ring-row">
      <span class="daily-count"><b>${done}</b><small>/${goal}</small></span>
      <span class="daily-bar"><span class="daily-fill" style="width:${pct}%"></span></span>
      ${reached ? `<span class="daily-check">✓</span>` : ""}
    </div>`;
  const editBtn = el.querySelector("#daily-edit");
  if (editBtn) editBtn.addEventListener("click", openGoalEditor);
}
function openGoalEditor() {
  const input = document.createElement("input");
  input.type = "number";
  input.min = "1";
  input.max = "200";
  input.value = String(state.dailyGoal || 10);
  input.className = "goal-input";
  showModal({
    title: T.setGoalTitle,
    body: `<p>${T.setGoalBody}</p>`,
    actions: [
      { label: T.resetCancel, variant: "secondary" },
      { label: T.save, variant: "primary", onClick: () => {
          const v = parseInt(input.value, 10);
          if (v >= 1 && v <= 200) { state.dailyGoal = v; saveState(); updateDailyGoal(); }
        }},
    ]
  });
  modalBodyEl.appendChild(input);
  setTimeout(() => { input.focus(); input.select(); }, 100);
}
function checkDailyGoal() {
  const goal = state.dailyGoal || 10;
  const today = new Date().toDateString();
  if (todayExoCount() >= goal && state.goalReachedDate !== today) {
    state.goalReachedDate = today;
    saveState();
    celebrate();
    awardXp(15, "Daily goal");
    toast(T.goalReached);
  }
  updateDailyGoal();
  updateWeeklyGoal();
}

function showBookmarkedExercises(lesson) {
  if (!lesson) return false;
  const exs = lesson.exercises || [];
  const probs = lesson.problemes || [];
  const hasBookmarkedEx = exs.some(e => state.bookmarks[lesson.id + "-" + e.num]);
  const hasBookmarkedProb = probs.some(e => state.bookmarks[lesson.id + "-" + e.num]);
  if (!hasBookmarkedEx && !hasBookmarkedProb) return false;

  if (currentTab === "probs" && hasBookmarkedProb) currentTab = "probs";
  else if (currentTab === "exos" && hasBookmarkedEx) currentTab = "exos";
  else currentTab = hasBookmarkedEx ? "exos" : "probs";
  exFilter = "bookmark";
  renderExArea(lesson);
  bindCopyButtons();
  return true;
}

/* ====================================================================
   SEARCH
   ==================================================================== */
const searchInput = document.getElementById("search");
let _searchTimer = 0;
function _runSearch(q) {
  if (!q) { renderSidebar(); return; }
  const filter = arr => arr.filter(l => {
    const hay = normalize(
      t(l.title) + " " + t(l.sub || "") + " " +
      (l.tags || []).map(t).join(" ") + " " +
      (l.sections || []).map(s => t(s.h) + " " + t(s.p || "")).join(" ") + " " +
      [...(l.exercises || []), ...(l.problemes || [])].map(x => t(x.title) + " " + t(x.desc || "")).join(" ")
    );
    return hay.includes(q);
  });
  const days = filter(DAYS);
  const basic = filter(W3SCHOOL.filter(l => (l.level || "basic") === "basic"));
  const inter = filter(W3SCHOOL.filter(l => l.level === "intermediate"));
  const adv = filter(W3SCHOOL.filter(l => l.level === "advanced"));
  const fill = (id, list) =>
    document.getElementById(id).innerHTML = list.length
      ? list.map(navItem).join("")
      : `<div class="empty-search">${T.noLesson}</div>`;
  fill("nav-days", days);
  fill("nav-basic", basic);
  fill("nav-intermediate", inter);
  fill("nav-advanced", adv);
  document.querySelectorAll(".nav-track").forEach(tr => { tr.hidden = false; });
  document.querySelectorAll(".nav-section").forEach(s => { s.style.display = ""; });
  document.querySelectorAll(".collapsible").forEach(el => {
    el.classList.remove("collapsed");
    const arrow = el.querySelector(".collapse-arrow");
    if (arrow) arrow.style.transform = "";
  });
  bindNav();
}
if (searchInput) {
  searchInput.addEventListener("input", e => {
    const q = normalize(e.target.value.trim());
    clearTimeout(_searchTimer);
    // Run empty-search instantly so backspace-to-clear feels snappy.
    if (!q) { _runSearch(""); return; }
    _searchTimer = setTimeout(() => _runSearch(q), 120);
  });
}

/* ====================================================================
   XP / LEVEL — earn points across actions, level grows roughly with sqrt(xp)
   ==================================================================== */
function xpFromDiff(d) { return d === "extreme" ? 25 : d === "hard" ? 15 : d === "medium" ? 10 : 5; }
function xpLevel(xp) {
  // Level n starts at 25*n*(n+1) XP: lvl 0 = 0–49, lvl 1 = 50–149, lvl 2 = 150–299, …
  if (xp <= 0) return 0;
  return Math.floor((-1 + Math.sqrt(1 + (8 * xp) / 50)) / 2);
}
function xpForLevel(n) { return 50 * (n * (n + 1)) / 2; }   // start of level n
// Idempotent XP — claim records the amount per key so unclaim can refund the exact value.
// Use for actions that can be reversed (lesson done / exercise done). For one-way actions
// like pomodoro complete or daily-goal, call awardXp directly.
function claimXp(claimKey, amount, reason) {
  if (!state.xpClaims) state.xpClaims = {};
  if (state.xpClaims[claimKey]) return;  // already paid for this exact action
  state.xpClaims[claimKey] = amount;
  awardXp(amount, reason);
}
function unclaimXp(claimKey) {
  if (!state.xpClaims || !state.xpClaims[claimKey]) return;
  const amount = state.xpClaims[claimKey];
  delete state.xpClaims[claimKey];
  state.xp = Math.max(0, (state.xp || 0) - amount);
  saveState();
  refreshXp();
}

function awardXp(amount, reason) {
  if (!amount) return;
  const prevLevel = xpLevel(state.xp || 0);
  state.xp = (state.xp || 0) + amount;
  saveState();
  refreshXp();
  const newLevel = xpLevel(state.xp);
  if (newLevel > prevLevel) {
    toast(`🆙 ${T.levelUp} ${newLevel}`);
    celebrate();
    const row = document.getElementById("xp-row");
    if (row) { row.classList.remove("level-up-pulse"); void row.offsetWidth; row.classList.add("level-up-pulse"); }
  } else if (amount >= 10) {
    // Small flash for meaningful gains (silent for the +5 trickle)
    const toastEl = document.getElementById("toast");
    if (toastEl) {
      toastEl.classList.add("xp");
      setTimeout(() => toastEl.classList.remove("xp"), 2800);
    }
    toast(`+${amount} XP${reason ? " · " + reason : ""}`);
  }
}
function refreshXp() {
  const xp = state.xp || 0;
  const lvl = xpLevel(xp);
  const start = xpForLevel(lvl);
  const next = xpForLevel(lvl + 1);
  const span = next - start || 1;
  const into = xp - start;
  const pct = Math.min(100, Math.round((into / span) * 100));
  const fill = document.getElementById("xp-bar-fill");
  const lvlEl = document.getElementById("xp-level");
  const curEl = document.getElementById("xp-current");
  const nextEl = document.getElementById("xp-next");
  if (fill) fill.style.width = pct + "%";
  if (lvlEl) lvlEl.textContent = lvl;
  if (curEl) curEl.textContent = into;
  if (nextEl) nextEl.textContent = span;
}

/* ====================================================================
   DAILY CHALLENGE — deterministic pick per day, reward = XP
   ==================================================================== */
const CHALLENGE_TEMPLATES = [
  { id: "hard",    target: 3, xp: 60, key: "chal_hard",    icon: "🔥",
    progress: () => todayDoneByDiff("hard") + todayDoneByDiff("extreme") },
  { id: "done",    target: 8, xp: 50, key: "chal_done",    icon: "✅",
    progress: () => todayExoCount() },
  { id: "lesson",  target: 1, xp: 70, key: "chal_lesson",  icon: "📘",
    progress: () => todayLessonsDone() },
  { id: "pomo",    target: 3, xp: 50, key: "chal_pomo",    icon: "🍅",
    progress: () => pomoTodayCount() },
  { id: "review",  target: 5, xp: 50, key: "chal_review",  icon: "🚦",
    progress: () => todayConfidenceCount() },
  { id: "easy",    target: 5, xp: 40, key: "chal_easy",    icon: "🟢",
    progress: () => todayDoneByDiff("easy") },
];
function todayDoneByDiff(diff) {
  const today = new Date().toDateString();
  let n = 0;
  for (const k in state.exDone) {
    const ts = state.exDone[k];
    if (new Date(ts).toDateString() !== today) continue;
    // Parse k = "lessonId-num"
    const dash = k.lastIndexOf("-");
    if (dash < 0) continue;
    const lessonId = k.slice(0, dash);
    const num = parseInt(k.slice(dash + 1), 10);
    const lesson = LESSON_BY_ID.get(lessonId);
    if (!lesson) continue;
    const ex = [...(lesson.exercises || []), ...(lesson.problemes || [])].find(e => e.num === num);
    if (ex && ex.diff === diff) n++;
  }
  return n;
}
function todayLessonsDone() {
  const today = new Date().toDateString();
  let n = 0;
  Object.values(state.completed).forEach(ts => { if (new Date(ts).toDateString() === today) n++; });
  return n;
}
function todayConfidenceCount() {
  if (!state.reviewSeen) state.reviewSeen = {};
  // Count distinct confidence keys updated today — we cheaply track set of seen-today keys
  const today = new Date().toDateString();
  const dateKey = "d-" + today;
  const seen = state.reviewSeen[dateKey] || {};
  return Object.keys(seen).length;
}
function noteConfidenceToday(key) {
  if (!state.reviewSeen) state.reviewSeen = {};
  const today = new Date().toDateString();
  const dateKey = "d-" + today;
  if (!state.reviewSeen[dateKey]) state.reviewSeen[dateKey] = {};
  state.reviewSeen[dateKey][key] = 1;
  // Prune any older day stash
  for (const k in state.reviewSeen) if (k !== dateKey) delete state.reviewSeen[k];
  saveState();
}
function todayChallenge() {
  // Deterministic pick by date: hash YYYY-MM-DD → index
  const today = new Date();
  const dateKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  let h = 0;
  for (let i = 0; i < dateKey.length; i++) h = ((h << 5) - h + dateKey.charCodeAt(i)) | 0;
  const idx = Math.abs(h) % CHALLENGE_TEMPLATES.length;
  return { tpl: CHALLENGE_TEMPLATES[idx], date: dateKey };
}
function renderChallengeCard() {
  const { tpl, date } = todayChallenge();
  const done = !!(state.challengeDone && state.challengeDone[date]);
  const cur = Math.min(tpl.target, tpl.progress());
  const pct = Math.round((cur / tpl.target) * 100);
  const label = t(T_DICT[tpl.key]);
  return `<div class="challenge-card ${done || cur >= tpl.target ? "done" : ""}" id="challenge-card">
    <div class="challenge-badge">${tpl.icon}</div>
    <div class="challenge-info">
      <div class="challenge-title">${T.challengeLabel}</div>
      <div class="challenge-desc">${esc(label)}</div>
      <div class="challenge-progress"><b>${cur}</b>/${tpl.target} · ${pct}%</div>
    </div>
    <span class="challenge-reward">+${tpl.xp} XP</span>
  </div>`;
}
function checkChallenge() {
  const { tpl, date } = todayChallenge();
  if (state.challengeDone && state.challengeDone[date]) return;
  if (tpl.progress() >= tpl.target) {
    if (!state.challengeDone) state.challengeDone = {};
    state.challengeDone[date] = Date.now();
    saveState();
    awardXp(tpl.xp, "Daily challenge");
    toast(T.challengeDone);
    celebrate();
  }
  // Re-render card on welcome screen
  const cc = document.getElementById("challenge-card");
  if (cc) cc.outerHTML = renderChallengeCard();
}

/* ====================================================================
   ANALYTICS — last 14 days bar chart + 12-week heatmap
   ==================================================================== */
function exoCountByDay(daysBack) {
  // returns array of length daysBack with counts ending today (today last)
  const arr = new Array(daysBack).fill(0);
  const map = {};
  Object.values(state.exDone).forEach(ts => {
    const d = new Date(ts).toDateString();
    map[d] = (map[d] || 0) + 1;
  });
  const today = new Date(); today.setHours(0,0,0,0);
  for (let i = 0; i < daysBack; i++) {
    const d = new Date(today); d.setDate(today.getDate() - (daysBack - 1 - i));
    arr[i] = map[d.toDateString()] || 0;
  }
  return arr;
}
function bestStreak() {
  // Walk all activity dates sorted, find longest run of consecutive days
  const set = new Set();
  Object.values(state.completed).forEach(ts => set.add(new Date(ts).toDateString()));
  Object.values(state.exDone).forEach(ts => set.add(new Date(ts).toDateString()));
  if (!set.size) return 0;
  const dates = [...set].map(s => new Date(s).getTime()).sort((a,b)=>a-b);
  let best = 1, cur = 1;
  for (let i = 1; i < dates.length; i++) {
    const diff = Math.round((dates[i] - dates[i-1]) / 86400000);
    if (diff === 1) { cur++; if (cur > best) best = cur; }
    else if (diff > 1) cur = 1;
  }
  return best;
}
function renderAnalytics() {
  const last14 = exoCountByDay(14);
  const max14 = Math.max(1, ...last14);
  const avg7 = (last14.slice(-7).reduce((a,b)=>a+b,0) / 7).toFixed(1);
  const xp = state.xp || 0;
  const lvl = xpLevel(xp);
  const best = bestStreak();

  const last84 = exoCountByDay(84); // 12 weeks
  // Bucket into 12 columns of 7 rows (Mon-first not critical here; just 7 cells/col)
  const cols = [];
  for (let c = 0; c < 12; c++) {
    cols.push(last84.slice(c * 7, c * 7 + 7));
  }
  const colorClass = (n) => n <= 0 ? "" : n <= 2 ? "l1" : n <= 5 ? "l2" : n <= 9 ? "l3" : "l4";

  const barsHtml = last14.map(n => {
    if (n === 0) return `<span class="ana-bar empty" title="0"></span>`;
    const h = Math.max(8, Math.round((n / max14) * 64));
    return `<span class="ana-bar" style="height:${h}px" title="${n} exos"></span>`;
  }).join("");

  const heatHtml = cols.map(col => `<div class="ana-heat-col">${col.map(n => `<div class="ana-heat-cell ${colorClass(n)}" title="${n} exos"></div>`).join("")}</div>`).join("");

  return `<div class="analytics">
    <div class="analytics-head">
      <span>${T.anaTitle}</span>
      <span class="ana-count">${T.anaXp} · ${xp.toLocaleString()}</span>
    </div>
    <div class="analytics-grid">
      <div class="ana-card">
        <h4>⭐ Level <span style="color:var(--accent)">${lvl}</span></h4>
        <div class="ana-big">${xp.toLocaleString()}<small>XP</small></div>
        <div class="ana-sub">${T.anaStreakBest}: <b>${best}</b> · ${T.anaAvg}: <b>${avg7}</b> ${T.anaExosDay}</div>
      </div>
      <div class="ana-card">
        <h4>${T.anaBars}</h4>
        <div class="ana-bars">${barsHtml}</div>
        <div class="ana-bars-axis"><span>-14d</span><span>-7d</span><span>${state.lang === "en" ? "today" : "auj."}</span></div>
      </div>
      <div class="ana-card" style="grid-column:1 / -1">
        <h4>${T.anaHeatmap}</h4>
        <div class="ana-heatmap">${heatHtml}</div>
        <div class="ana-heat-legend">
          <span>${T.anaHeatLess}</span>
          <span class="ana-heat-cell"></span>
          <span class="ana-heat-cell l1"></span>
          <span class="ana-heat-cell l2"></span>
          <span class="ana-heat-cell l3"></span>
          <span class="ana-heat-cell l4"></span>
          <span>${T.anaHeatMore}</span>
        </div>
      </div>
    </div>
  </div>`;
}

function renderWelcomeDeferred() {
  const badges = computeBadges();
  const unlockedCount = badges.filter(b => b.unlocked).length;
  const lockSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
  const badgesHtml = badges.map(b =>
    `<div class="wc-badge ${b.unlocked ? "unlocked" : "locked"}" title="${esc(b.label)}">
      <span class="wc-badge-emoji">${b.unlocked ? (b.svg || '') : lockSvg}</span>
      <span class="wc-badge-label">${esc(b.label)}</span>
    </div>`
  ).join("");

  return `<div class="wc-achievements">
    <div class="wc-ach-head">
      <span>${t(T_DICT.achievements)}</span>
      <span class="wc-ach-count">${unlockedCount}/${badges.length}</span>
    </div>
    <div class="wc-badges">${badgesHtml}</div>
  </div>
  ${renderAnalytics()}`;
}

/* ====================================================================
   PWA — service worker + install button
   ==================================================================== */
let _pwaDeferred = null;
const pwaInstallBtn = document.getElementById("pwa-install");
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  const isLocalDevHost = ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname);
  if (isLocalDevHost) {
    // Local dev should never be trapped behind an old service-worker cache.
    window.addEventListener("load", () => scheduleIdle(() => {
      navigator.serviceWorker.getRegistrations?.()
        .then(regs => regs.forEach(r => r.unregister()))
        .catch(() => {});
      if ("caches" in window) {
        caches.keys()
          .then(keys => keys.filter(k => /^php-tracker/.test(k)).forEach(k => caches.delete(k)))
          .catch(() => {});
      }
    }, 1200));
  } else {
    // Register after load + idle so the SW install doesn't compete with first paint.
    window.addEventListener("load", () => {
      const ric = window.requestIdleCallback || (cb => setTimeout(cb, 1200));
      ric(() => navigator.serviceWorker.register("../web/sw.js").catch(() => {}));
    });
    // When a freshly installed SW takes control (clients.claim), reload at most
    // once for this app build so an update cannot trap the page in a reload loop.
    const SW_RELOAD_KEY = "php_tracker_sw_reload_v35";
    let _swReloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (_swReloaded) return;
      _swReloaded = true;
      try {
        if (sessionStorage.getItem(SW_RELOAD_KEY)) return;
        sessionStorage.setItem(SW_RELOAD_KEY, "1");
      } catch {}
      setTimeout(() => window.location.reload(), 80);
    });
  }
}
window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  _pwaDeferred = e;
  if (pwaInstallBtn) pwaInstallBtn.classList.add("show");
});
if (pwaInstallBtn) {
  pwaInstallBtn.addEventListener("click", async () => {
    if (!_pwaDeferred) return;
    _pwaDeferred.prompt();
    const { outcome } = await _pwaDeferred.userChoice.catch(() => ({ outcome: "dismissed" }));
    if (outcome === "accepted") pwaInstallBtn.classList.remove("show");
    _pwaDeferred = null;
  });
}
window.addEventListener("appinstalled", () => {
  if (pwaInstallBtn) pwaInstallBtn.classList.remove("show");
});

/* ====================================================================
   MOBILE — left-edge swipe-open / drawer swipe-close
   Touch-only; pointer events keep desktop unaffected.
   ==================================================================== */
(function initSwipe(){
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;
  let startX = 0, startY = 0, startWidth = 0, dragging = false, openAtStart = false;
  const isTouch = () => matchMedia("(pointer:coarse)").matches || window.innerWidth < 720;
  document.addEventListener("touchstart", e => {
    if (!isTouch()) return;
    const t = e.touches[0];
    openAtStart = document.body.classList.contains("drawer-open");
    if (!openAtStart && t.clientX > 24) return;          // edge-open: must start near left edge
    if (openAtStart && !sidebar.contains(e.target)) return; // close: drag inside sidebar
    startX = t.clientX; startY = t.clientY;
    startWidth = sidebar.getBoundingClientRect().width;
    dragging = true;
  }, { passive: true });
  document.addEventListener("touchmove", e => {
    if (!dragging) return;
    const t = e.touches[0];
    const dx = t.clientX - startX, dy = t.clientY - startY;
    if (Math.abs(dy) > Math.abs(dx) * 1.4) { dragging = false; return; } // vertical scroll wins
    sidebar.classList.add("swiping");
    if (openAtStart) {
      const tx = Math.min(0, dx);
      sidebar.style.transform = `translateX(${tx}px)`;
    } else {
      const tx = Math.max(-startWidth, -startWidth + dx);
      document.body.classList.add("drawer-open");
      sidebar.style.transform = `translateX(${tx}px)`;
    }
  }, { passive: true });
  document.addEventListener("touchend", e => {
    if (!dragging) return;
    dragging = false;
    sidebar.classList.remove("swiping");
    sidebar.style.transform = "";
    const dx = (e.changedTouches[0].clientX - startX);
    if (openAtStart && dx < -60) document.body.classList.remove("drawer-open");
    else if (!openAtStart && dx > 60) document.body.classList.add("drawer-open");
    else if (!openAtStart && dx <= 60) document.body.classList.remove("drawer-open");
  });

  // Swipe left/right on the main lesson body — prev/next lesson
  const main = document.getElementById("main");
  if (main) {
    let mx = 0, my = 0, mActive = false;
    const inHScrollZone = (el) =>
      !!(el && el.closest && (el.closest(".block-code") || el.closest("pre") || el.closest(".ana-bars") || el.closest(".ana-heatmap") || el.closest(".tabs") || el.closest(".ex-filter") || el.closest(".block-table") || el.closest("textarea") || el.closest("input") || el.closest(".pomo-history-list")));
    main.addEventListener("touchstart", e => {
      if (!isTouch()) return;
      if (e.touches.length > 1) return;
      if (inHScrollZone(e.target)) { mActive = false; return; }
      mActive = true; mx = e.touches[0].clientX; my = e.touches[0].clientY;
    }, { passive: true });
    main.addEventListener("touchend", e => {
      if (!mActive) return;
      mActive = false;
      const dx = e.changedTouches[0].clientX - mx;
      const dy = e.changedTouches[0].clientY - my;
      if (Math.abs(dx) < 90 || Math.abs(dy) > Math.abs(dx) * 0.7) return;
      if (!state.lastActive) return;
      const idx = LESSON_INDEX_BY_ID.get(state.lastActive);
      if (dx < 0 && idx < ALL_LESSONS.length - 1) openLesson(ALL_LESSONS[idx + 1].id);
      else if (dx > 0 && idx > 0) openLesson(ALL_LESSONS[idx - 1].id);
    });
  }
})();

/* ====================================================================
   SPACED REPETITION — surface a stale or weak exercise to review
   Picks among: confidence === 'shaky' or 'no', or exercises not seen in 14+ days.
   Shown at the top of the lesson body when present; dismissable for the session.
   ==================================================================== */
function pickReviewExercise() {
  const candidates = [];
  ALL_LESSONS.forEach(l => {
    const exs = [...(l.exercises || []), ...(l.problemes || [])];
    exs.forEach(e => {
      const key = l.id + "-" + e.num;
      if (_reviewDismissed.has(key)) return;
      const conf = state.confidence[key];
      const lastTs = state.exDone[key] || 0;
      const ageDays = lastTs ? Math.floor((Date.now() - lastTs) / 86400000) : 0;
      let score = 0;
      if (conf === "no") score += 6;
      else if (conf === "shaky") score += 4;
      if (lastTs && ageDays >= 14) score += 2;
      if (lastTs && ageDays >= 30) score += 2;
      // Bookmarked = wants to review
      if (state.bookmarks[key] && !state.exDone[key]) score += 3;
      if (score > 0) candidates.push({ lesson: l, ex: e, key, score, ageDays });
    });
  });
  if (!candidates.length) return null;
  candidates.sort((a, b) => b.score - a.score);
  // Pick from top-5 to keep it from being deterministic on a quiet day
  const pool = candidates.slice(0, 5);
  return pool[Math.floor(Math.random() * pool.length)];
}
function renderReviewStrip(lesson) {
  if (!lesson) return "";
  const pick = pickReviewExercise();
  if (!pick) return "";
  const confLbl = state.confidence[pick.key] === "no" ? "😵" : state.confidence[pick.key] === "shaky" ? "😐" : "🕒";
  const tagText = pick.ageDays >= 30 ? (state.lang === "en" ? "30d+" : "+30j")
                : pick.ageDays >= 14 ? (state.lang === "en" ? "14d+" : "+14j")
                : (state.lang === "en" ? "weak" : "fragile");
  const title = esc(t(pick.ex.title));
  const lessonTitle = esc(t(pick.lesson.title).replace(/^(Jour|Day) \d+ - /, ""));
  return `<div class="review-strip" data-key="${pick.key}" data-lesson="${pick.lesson.id}" data-num="${pick.ex.num}">
    <span style="font-size:22px">${confLbl}</span>
    <div class="review-strip-info">
      <div class="review-strip-label">${state.lang === "en" ? "Review" : "Révision"} · ${tagText}</div>
      <div class="review-strip-desc">${title}</div>
      <div class="review-strip-meta">${lessonTitle}</div>
    </div>
    <button class="review-strip-btn" data-action="open">${state.lang === "en" ? "Open" : "Ouvrir"}</button>
    <button class="review-strip-dismiss" data-action="dismiss" aria-label="Dismiss">×</button>
  </div>`;
}
function bindReviewStrip() {
  document.querySelectorAll(".review-strip").forEach(strip => {
    const key = strip.dataset.key;
    const lessonId = strip.dataset.lesson;
    const num = parseInt(strip.dataset.num, 10);
    strip.querySelector("[data-action=open]").addEventListener("click", () => {
      const lesson = LESSON_BY_ID.get(lessonId);
      if (!lesson) return;
      if (state.lastActive !== lessonId) openLesson(lessonId);
      hydrateLesson(lessonId).then(() => {
        const ex = [...(lesson.exercises||[]), ...(lesson.problemes||[])].find(x => x.num === num);
        if (ex) openExModal(lesson, ex);
      });
    });
    strip.querySelector("[data-action=dismiss]").addEventListener("click", () => {
      _reviewDismissed.add(key);
      strip.remove();
    });
  });
}

/* ====================================================================
   SHARE PROGRESS CARD — render a 16:9 card and download as PNG via canvas
   ==================================================================== */
function openShareCard() {
  const xp = state.xp || 0;
  const lvl = xpLevel(xp);
  const doneLessons = Object.keys(state.completed).length;
  const doneEx = Object.keys(state.exDone).length;
  const streak = computeStreak();
  const best = bestStreak();
  const pct = Math.round((doneLessons / TOTAL) * 100);
  const dateStr = new Date().toLocaleDateString();
  const cardId = "share-card-render";
  const html = `
    <div class="share-card" id="${cardId}">
      <div class="share-card-head">
        <div class="share-card-brand"><span class="dot"></span> <span>PHP Tracker · Chadi Khoder</span></div>
        <div class="share-card-date">${esc(dateStr)}</div>
      </div>
      <div class="share-card-body">
        <div class="share-stat"><span class="v">${pct}<small style="font-size:18px;color:inherit;-webkit-text-fill-color:inherit">%</small></span><span class="l">${state.lang === "en" ? "completion" : "complétion"}</span></div>
        <div class="share-stat"><span class="v">${doneEx}</span><span class="l">${state.lang === "en" ? "exos" : "exos"}</span></div>
        <div class="share-stat"><span class="v">L${lvl}</span><span class="l">${state.lang === "en" ? "level" : "niveau"}</span></div>
      </div>
      <div class="share-card-foot">
        <span>🔥 ${streak} ${state.lang === "en" ? "day streak" : "jours de suite"} · 🏆 ${state.lang === "en" ? "best" : "max"} ${best}d</span>
        <span>${xp.toLocaleString()} XP</span>
      </div>
    </div>
    <div class="share-actions">
      <button class="modal-btn primary" id="share-download">${state.lang === "en" ? "Download PNG" : "Télécharger PNG"}</button>
      <button class="modal-btn secondary" id="share-copy">${state.lang === "en" ? "Copy text" : "Copier en texte"}</button>
    </div>
  `;
  showModal({
    title: state.lang === "en" ? "Share progress" : "Partager ma progression",
    body: html,
    actions: [{ label: state.lang === "en" ? "Close" : "Fermer", variant: "secondary" }],
  });
  // Wire actions
  setTimeout(() => {
    const dl = document.getElementById("share-download");
    const cp = document.getElementById("share-copy");
    if (dl) dl.addEventListener("click", () => downloadShareCardPng(cardId));
    if (cp) cp.addEventListener("click", () => {
      const txt = `PHP Tracker · ${pct}% · ${doneEx} exos · Level ${lvl} · ${xp} XP · 🔥 ${streak}d`;
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => toast(state.lang === "en" ? "Copied!" : "Copié !"));
    });
  }, 50);
}
function downloadShareCardPng(cardId) {
  // Render the styled card into an SVG foreignObject → PNG via canvas. Pure browser, no deps.
  const node = document.getElementById(cardId);
  if (!node) return;
  const rect = node.getBoundingClientRect();
  const w = Math.round(rect.width * 2);
  const h = Math.round(rect.height * 2);
  const cloned = node.cloneNode(true);
  // Inline computed styles for fidelity
  const inline = el => {
    const cs = getComputedStyle(el);
    let s = "";
    for (let i = 0; i < cs.length; i++) {
      const p = cs[i];
      s += `${p}:${cs.getPropertyValue(p)};`;
    }
    el.setAttribute("style", s);
    [...el.children].forEach(inline);
  };
  inline(cloned);
  cloned.style.width = rect.width + "px";
  cloned.style.height = rect.height + "px";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${rect.width} ${rect.height}">
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml">${cloned.outerHTML}</div>
    </foreignObject>
  </svg>`;
  const img = new Image();
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0a0f1c"; ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    canvas.toBlob(b => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = `php-tracker-${new Date().toISOString().slice(0,10)}.png`;
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(a.href);
      toast(state.lang === "en" ? "Card saved!" : "Carte enregistrée !");
    }, "image/png");
    URL.revokeObjectURL(url);
  };
  img.onerror = () => {
    URL.revokeObjectURL(url);
    toast(state.lang === "en" ? "Could not render PNG" : "Rendu PNG impossible");
  };
  img.src = url;
}

/* ====================================================================
   FOCUS MODE
   ==================================================================== */
const focusBtn = document.getElementById("focus-btn");
function applyFocusMode() {
  document.body.classList.toggle("focus-mode", !!state.focusMode);
  if (focusBtn) focusBtn.setAttribute("title", T.focusBtn);
}
function toggleFocusMode() {
  state.focusMode = !state.focusMode;
  saveState();
  applyFocusMode();
  toast(state.focusMode ? T.focusOn : T.focusOff);
}
if (focusBtn) focusBtn.addEventListener("click", toggleFocusMode);

/* ====================================================================
   SHORTCUTS HELP PANEL — opens with ?
   ==================================================================== */
function openShortcutsModal() {
  const rows = [
    { group: T.scGroupNav, items: [
      ["/", T.scSearch],
      ["←  →", T.scPrevNext],
      ["T", T.scTabSwap],
      ["B", T.scBookmarks],
    ]},
    { group: T.scGroupActions, items: [
      ["D", T.scMarkDone],
      ["F", T.scFocus],
      ["S", state.lang === "en" ? "Share progress card" : "Carte de partage"],
    ]},
    { group: T.scGroupMisc, items: [
      ["?", T.scShortcuts],
      ["Esc", T.scClose],
    ]},
  ];
  const html = rows.map(g => `
    <div class="sc-group">
      <h4>${esc(g.group)}</h4>
      ${g.items.map(([k, label]) => `
        <div class="sc-row">
          <span class="sc-keys">${k.split(/\s+/).map(part => `<kbd>${esc(part)}</kbd>`).join(" ")}</span>
          <span>${esc(label)}</span>
        </div>`).join("")}
    </div>`).join("");
  showModal({
    title: T.shortcutsTitle,
    body: `<div class="shortcuts-modal">${html}</div>`,
    actions: [{ label: T.shortcutsClose, variant: "secondary" }],
  });
}

/* ====================================================================
   WEEKLY GOAL — exercises completed in the last 7 days vs target
   ==================================================================== */
function weekExoCount() {
  const cutoff = Date.now() - 7 * 86400000;
  let n = 0;
  Object.values(state.exDone).forEach(ts => { if (ts >= cutoff) n++; });
  return n;
}
function updateWeeklyGoal() {
  const target = document.getElementById("daily-goal");
  if (!target) return;
  let el = document.getElementById("weekly-goal");
  if (!el) {
    el = document.createElement("div");
    el.id = "weekly-goal";
    el.className = "weekly-goal";
    target.appendChild(el);
  }
  const goal = state.weeklyGoal || 50;
  const done = weekExoCount();
  const pct = Math.min(100, Math.round((done / goal) * 100));
  el.classList.toggle("reached", done >= goal);
  el.innerHTML = `
    <span class="weekly-goal-label">${SVGI.trending}<span>${T.weeklyLabel}</span></span>
    <span class="weekly-goal-bar"><span class="weekly-goal-fill" style="width:${pct}%"></span></span>
    <span><b>${done}</b>/${goal}</span>
  `;
}

/* ====================================================================
   THEME
   ==================================================================== */
const themeBtn = document.getElementById("theme-btn");
function applyTheme() {
  if (state.theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    if (themeBtn) themeBtn.setAttribute("title", T.toDark);
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (themeBtn) themeBtn.setAttribute("title", T.toLight);
  }
}
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    saveState();
    // Circular clip-path reveal that originates from the theme button's centre.
    // Uses the View Transitions API where available (Chrome/Edge); falls back
    // to the class-based crossfade on Firefox/Safari.
    const rect = themeBtn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const maxR = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    if (document.startViewTransition) {
      const vt = document.startViewTransition(() => applyTheme());
      vt.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxR}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 520,
            easing: "cubic-bezier(.4,0,.2,1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      }).catch(() => {});
    } else {
      document.documentElement.classList.add("theme-transitioning");
      void document.documentElement.offsetHeight;
      applyTheme();
      setTimeout(() => document.documentElement.classList.remove("theme-transitioning"), 480);
    }
  });
}

/* ====================================================================
   LANGUAGE TOGGLE
   ==================================================================== */
const langBtn = document.getElementById("lang-btn");
const langLabel = document.getElementById("lang-label");
function applyLang() {
  document.documentElement.setAttribute("lang", state.lang === "en" ? "en" : "fr");
  if (langLabel) langLabel.textContent = state.lang === "en" ? "EN" : "FR";
  if (langBtn) langBtn.setAttribute("title", T.toggleLang);
  applyI18n();
  applyTheme();
  updateExamCountdown();
  renderSidebar();
  updateDayIndicator();
  // Re-render current view
  if (state.lastActive && LESSON_BY_ID.has(state.lastActive)) {
    openLesson(state.lastActive);
  } else {
    renderWelcome();
  }
}
function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.dataset.i18n;
    if (T_DICT[k]) el.textContent = t(T_DICT[k]);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const k = el.dataset.i18nPlaceholder;
    if (T_DICT[k]) el.setAttribute("placeholder", t(T_DICT[k]));
  });
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const k = el.dataset.i18nTitle;
    if (T_DICT[k]) el.setAttribute("title", t(T_DICT[k]));
  });
}
if (langBtn) {
  langBtn.addEventListener("click", () => {
    state.lang = state.lang === "en" ? "fr" : "en";
    saveState();
    applyLang();
  });
}

/* ====================================================================
   EXAM COUNTDOWN
   ==================================================================== */
function updateExamCountdown() {
  const el = document.getElementById("exam-countdown");
  const daysEl = document.getElementById("exam-days");
  const lblEl = document.getElementById("exam-lbl");
  if (!el || !daysEl) return;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const examDay = new Date(EXAM_DATE.getFullYear(), EXAM_DATE.getMonth(), EXAM_DATE.getDate());
  const ms = examDay - today;
  const examDaysLeft = Math.round(ms / 86400000);

  // Show the current plan day (J3/7) in the chip; the days-until-exam is in the tooltip
  let currentDayIdx = DAYS.findIndex(d => !state.completed[d.id]);
  if (currentDayIdx === -1) currentDayIdx = DAYS.length - 1;
  const planDay = currentDayIdx + 1;
  const planTotal = DAYS.length;
  const examDateStr = examDay.toLocaleDateString();

  el.classList.remove("urgent", "passed");
  daysEl.textContent = `${state.lang === "en" ? "D" : "J"}${planDay}`;
  if (lblEl) lblEl.textContent = `/${planTotal}`;

  if (examDaysLeft > 0) {
    el.setAttribute("title", `${t(T_DICT.examIn)} ${examDaysLeft} ${t(T_DICT.daysShort)} · ${examDateStr}`);
    if (examDaysLeft <= 14) el.classList.add("urgent");
  } else if (examDaysLeft === 0) {
    el.setAttribute("title", t(T_DICT.examToday));
    el.classList.add("urgent");
  } else {
    el.setAttribute("title", t(T_DICT.examPassed));
    el.classList.add("passed");
  }
  // All plan days done?
  if (state.completed[DAYS[DAYS.length - 1].id]) {
    daysEl.textContent = "✓";
    if (lblEl) lblEl.textContent = "";
    el.classList.add("passed");
  }
}

/* ====================================================================
   DAY-OF-PLAN INDICATOR
   ==================================================================== */
function updateDayIndicator() {
  const el = document.getElementById("day-indicator");
  if (!el) return;
  // Current day = first day-N lesson not yet completed; if all done, last day.
  let currentDayIdx = DAYS.findIndex(d => !state.completed[d.id]);
  if (currentDayIdx === -1) currentDayIdx = DAYS.length - 1;
  const doneCount = DAYS.filter(d => state.completed[d.id]).length;
  const pct = Math.round((doneCount / DAYS.length) * 100);
  const dots = DAYS.map((d, i) => {
    const isDone = !!state.completed[d.id];
    const isCurrent = i === currentDayIdx && !isDone;
    const cls = "day-dot" + (isDone ? " done" : "") + (isCurrent ? " current" : "");
    const inner = isDone
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="5 12 10 17 19 7"/></svg>`
      : `<span>${i + 1}</span>`;
    return `<button type="button" class="${cls}" data-lid="${esc(d.id)}" title="${esc(t(d.title))}" aria-label="${esc(t(d.title))}">${inner}</button>`;
  }).join("");
  el.hidden = false;
  el.innerHTML = `
    <div class="day-indicator-head">
      <span class="day-indicator-lbl">${t(T_DICT.day)} <b>${currentDayIdx + 1}</b><span class="day-sep">/</span><span class="day-total">${DAYS.length}</span></span>
      <span class="day-indicator-pct">${pct}%</span>
    </div>
    <div class="day-track" style="--day-pct:${pct}%"><div class="day-dots">${dots}</div></div>
  `;
  el.querySelectorAll(".day-dot").forEach(btn => {
    btn.addEventListener("click", () => openLesson(btn.dataset.lid));
  });
}

/* ====================================================================
   WELCOME PAGE
   ==================================================================== */
let _welcomeRenderToken = 0;
function renderWelcome() {
  const main = document.getElementById("main");
  if (!main) return;
  const welcomeToken = ++_welcomeRenderToken;
  document.documentElement.classList.remove("has-active");

  // Build day-card metadata with progress per day + which is "next up"
  const firstOpenDay = DAYS.findIndex(d => !state.completed[d.id]);
  // Monoline SVG icons — neutral, professional, theme-aware via currentColor
  const SVG = (path) => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  const ICO = {
    basics:    SVG(`<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>`),
    functions: SVG(`<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>`),
    forms:     SVG(`<rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>`),
    auth:      SVG(`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="11" r="1.5"/><line x1="12" y1="12.5" x2="12" y2="15.5"/>`),
    db:        SVG(`<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6"/>`),
    upload:    SVG(`<path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>`),
    oop:       SVG(`<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>`),
    leaf:      SVG(`<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>`),
    layers:    SVG(`<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>`),
    zap:       SVG(`<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`),
  };
  const dayMeta = [
    { id: "day-1", ico: ICO.basics,    title: { fr: "PHP Basics",            en: "PHP Basics" },           sub: { fr: "Syntaxe · types · loops", en: "Syntax · types · loops" } },
    { id: "day-2", ico: ICO.functions, title: { fr: "Functions / Arrays",    en: "Functions / Arrays" },   sub: { fr: "fns · arrays · dates",    en: "fns · arrays · dates" } },
    { id: "day-3", ico: ICO.forms,     title: { fr: "Formulaires",           en: "Forms" },                sub: { fr: "forms · regex · validation", en: "forms · regex · validation" } },
    { id: "day-4", ico: ICO.db,        title: { fr: "MySQL / PDO",           en: "MySQL / PDO" },          sub: { fr: "DB · PDO · prepared",     en: "DB · PDO · prepared" } },
    { id: "day-5", ico: ICO.auth,      title: { fr: "Sessions / Auth",       en: "Sessions / Auth" },      sub: { fr: "cookies · sessions",      en: "cookies · sessions" } },
    { id: "day-6", ico: ICO.upload,    title: { fr: "Uploads / CSV",         en: "Uploads / CSV" },        sub: { fr: "files · upload · CSV",   en: "files · upload · CSV" } },
    { id: "day-7", ico: ICO.oop,       title: { fr: "OOP + Exercice",        en: "OOP + Exercise" },       sub: { fr: "OOP · examen blanc",      en: "OOP · mock exam" } },
  ];
  const refMeta = [
    { id: "w3-intro", ico: ICO.leaf,    title: { fr: "PHP Basic",        en: "PHP Basic" },        sub: { fr: "14 leçons · W3Schools",  en: "14 lessons · W3Schools" } },
    { id: "w3-forms", ico: ICO.layers,  title: { fr: "PHP Intermediate", en: "PHP Intermediate" }, sub: { fr: "10 leçons · W3Schools",  en: "10 lessons · W3Schools" } },
    { id: "w3-oop",   ico: ICO.zap,     title: { fr: "PHP Advanced",     en: "PHP Advanced" },     sub: { fr: "10 leçons · W3Schools",  en: "10 lessons · W3Schools" } },
  ];

  function dayCardHtml(m, planIdx) {
    const lesson = LESSON_BY_ID.get(m.id);
    const exs = lesson ? [...(lesson.exercises||[]), ...(lesson.problemes||[])] : [];
    const exTotal = exs.length;
    const exDone = exs.filter(e => state.exDone[m.id + "-" + e.num]).length;
    const pct = exTotal ? Math.round(exDone / exTotal * 100) : 0;
    const done = !!state.completed[m.id];
    const current = !done && planIdx === firstOpenDay;
    const cls = ["quick-card", done ? "done" : "", current ? "current" : ""].filter(Boolean).join(" ");
    const tag = current ? `<span class="quick-card-tag">${state.lang === "en" ? "Next up" : "À toi"}</span>` : "";
    const dayLbl = `${t(T_DICT.dayShort)}${planIdx + 1}`;
    return `<button class="${cls}" data-jump="${m.id}">
      <span class="quick-card-ico">${m.ico}</span>
      <span class="quick-card-body">
        <span class="big">${dayLbl} · ${esc(t(m.title))}</span>
        <span class="sub">${esc(t(m.sub))}</span>
        <span class="quick-card-meta"><span class="quick-card-bar"><span class="quick-card-bar-fill" style="width:${pct}%"></span></span><span>${exDone}/${exTotal}</span></span>
      </span>
      ${tag}
      <span class="quick-card-arrow" aria-hidden="true">→</span>
    </button>`;
  }
  function refCardHtml(m) {
    const lesson = LESSON_BY_ID.get(m.id);
    // Show progress across the matching group (basic / intermediate / advanced)
    const group = m.id === "w3-intro" ? "basic" : m.id === "w3-forms" ? "intermediate" : "advanced";
    const lessons = W3SCHOOL.filter(l => (l.level || "basic") === group);
    const total = lessons.length;
    const done = lessons.filter(l => state.completed[l.id]).length;
    const pct = total ? Math.round(done / total * 100) : 0;
    const isDone = total > 0 && done === total;
    const cls = ["quick-card", isDone ? "done" : ""].filter(Boolean).join(" ");
    return `<button class="${cls}" data-jump="${m.id}">
      <span class="quick-card-ico">${m.ico}</span>
      <span class="quick-card-body">
        <span class="big">${esc(t(m.title))}</span>
        <span class="sub">${esc(t(m.sub))}</span>
        <span class="quick-card-meta"><span class="quick-card-bar"><span class="quick-card-bar-fill" style="width:${pct}%"></span></span><span>${done}/${total}</span></span>
      </span>
      <span class="quick-card-arrow" aria-hidden="true">→</span>
    </button>`;
  }

  // First-run hint — only when there's zero activity AND the user hasn't dismissed it
  const noActivity = Object.keys(state.completed).length === 0 && Object.keys(state.exDone).length === 0;
  const hintShown = !state.welcomeHintDismissed && noActivity;
  const hintHtml = hintShown ? `
    <div class="welcome-hint">
      <span class="welcome-hint-ico">👋</span>
      <span class="welcome-hint-text">${state.lang === "en"
        ? "Click <b>Day 1</b> below to start. Each exercise gives XP and counts toward your daily goal."
        : "Clique sur <b>Jour 1</b> ci-dessous pour démarrer. Chaque exercice donne de l'XP et avance l'objectif du jour."}</span>
      <button class="welcome-hint-dismiss" id="welcome-hint-dismiss">${state.lang === "en" ? "Got it" : "OK"}</button>
    </div>` : "";
  main.innerHTML = `
    <div class="welcome">
      <h1>${t(T_DICT.welcomeTitle)} <span class="accent">PHP</span></h1>
      <p>${t(T_DICT.welcomeSub)}</p>
      ${hintHtml}
      <div class="wc-group-label">${t(T_DICT.modePlan)}</div>
      <div class="quick-grid">
        ${dayMeta.map((m, i) => dayCardHtml(m, i)).join("")}
      </div>
      <div class="wc-group-label">${t(T_DICT.modeRef)}</div>
      <div class="quick-grid">
        ${refMeta.map(refCardHtml).join("")}
      </div>
      ${renderChallengeCard()}
      <div class="wc-share-row">
        <button class="sidebar-action-btn wc-share-btn" id="share-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
          <span>${state.lang === "en" ? "Share progress" : "Partager"}</span>
        </button>
      </div>
      <div class="wc-deferred" id="welcome-deferred"></div>
    </div>
  `;
  main.querySelectorAll(".quick-card").forEach(c => {
    c.setAttribute("role", "button");
    c.setAttribute("tabindex", "0");
    c.addEventListener("click", () => openLesson(c.dataset.jump));
    c.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLesson(c.dataset.jump);
      }
    });
  });
  const shareBtn = document.getElementById("share-btn");
  if (shareBtn) shareBtn.addEventListener("click", openShareCard);
  const hintDismiss = document.getElementById("welcome-hint-dismiss");
  if (hintDismiss) hintDismiss.addEventListener("click", () => {
    state.welcomeHintDismissed = true;
    saveState();
    const strip = document.querySelector(".welcome-hint");
    if (strip) strip.remove();
  });
  scheduleIdle(() => {
    if (welcomeToken !== _welcomeRenderToken) return;
    const deferred = document.getElementById("welcome-deferred");
    if (!deferred || !document.querySelector(".welcome")) return;
    deferred.innerHTML = renderWelcomeDeferred();
  });
}

/* ====================================================================
   MODAL + TOAST
   ==================================================================== */
const modalBackdrop = document.getElementById("modal-backdrop");
const modalTitleEl = document.getElementById("modal-title");
const modalBodyEl = document.getElementById("modal-body");
const modalActionsEl = document.getElementById("modal-actions");
let modalLastFocus = null;

function showModal({ title, body, actions }) {
  if (!modalBackdrop) return;
  modalLastFocus = document.activeElement;
  modalTitleEl.textContent = title || "";
  modalBodyEl.innerHTML = "";
  if (typeof body === "string") modalBodyEl.innerHTML = body;
  else if (body instanceof Node) modalBodyEl.appendChild(body);
  modalActionsEl.innerHTML = "";
  (actions || []).forEach(a => {
    const btn = document.createElement("button");
    btn.className = "modal-btn " + (a.variant || "secondary");
    btn.textContent = a.label;
    btn.addEventListener("click", () => {
      try { a.onClick && a.onClick(); } finally {
        if (a.closeAfter !== false) hideModal();
      }
    });
    modalActionsEl.appendChild(btn);
  });
  modalBackdrop.classList.add("open");
  // Focus the first primary/danger button
  const primary = modalActionsEl.querySelector(".primary, .danger") || modalActionsEl.querySelector(".modal-btn");
  if (primary) setTimeout(() => primary.focus(), 50);
}
function hideModal() {
  if (!modalBackdrop) return;
  modalBackdrop.classList.remove("open");
  if (modalLastFocus && typeof modalLastFocus.focus === "function") modalLastFocus.focus();
}
if (modalBackdrop) {
  modalBackdrop.addEventListener("click", e => {
    if (e.target === modalBackdrop) hideModal();
  });
}
// ESC closes any open modal
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modalBackdrop && modalBackdrop.classList.contains("open")) {
    e.stopPropagation();
    hideModal();
  }
}, true);

/* ====================================================================
   RESET (uses modal)
   ==================================================================== */
const resetBtn = document.getElementById("reset-btn");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    showModal({
      title: T.resetTitle,
      body: T.resetBody,
      actions: [
        { label: T.resetCancel, variant: "secondary" },
        { label: T.resetConfirm, variant: "danger", onClick: () => {
            state = Object.assign(defaultState(), { theme: state.theme, lang: state.lang });
            stopMockExam();
            saveState();
            renderSidebar();
            renderWelcome();
            toast(T.resetDone);
          }},
      ]
    });
  });
}

/* ====================================================================
   EXPORT / IMPORT
   ==================================================================== */
const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
if (exportBtn) {
  exportBtn.addEventListener("click", () => {
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url; a.download = `php-tracker-${stamp}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    // Also copy to clipboard for convenience
    if (navigator.clipboard) navigator.clipboard.writeText(json).catch(() => {});
    toast(T.exportDone);
  });
}
if (importBtn) {
  importBtn.addEventListener("click", () => {
    const ta = document.createElement("textarea");
    ta.placeholder = "{ ... }";
    showModal({
      title: T.importBtn,
      body: `<p>${T.importPrompt}</p>`,
      actions: [
        { label: T.resetCancel, variant: "secondary" },
        { label: T.importBtn, variant: "primary", onClick: () => {
            try {
              const parsed = JSON.parse(ta.value);
              if (!parsed || typeof parsed !== "object") throw new Error("bad");
              state = normalizeState(parsed);
              saveState();
              renderSidebar();
              if (state.lastActive && LESSON_BY_ID.has(state.lastActive)) openLesson(state.lastActive);
              else renderWelcome();
              toast(T.importOk);
            } catch {
              toast(T.importBad);
            }
          }},
      ]
    });
    modalBodyEl.appendChild(ta);
    setTimeout(() => ta.focus(), 100);
  });
}

/* ====================================================================
   MOCK EXAM TIMER (Day 7)
   ==================================================================== */
let mockTimer = null;

function renderMockExamCard() {
  const endTs = parseInt(localStorage.getItem(MOCK_EXAM_KEY) || "0", 10);
  const running = endTs > Date.now();
  if (running) {
    return `<div class="mock-exam-card">
      <div class="mock-info">
        <div class="mock-title">${T.mockRunning}</div>
        <div class="mock-sub">${T.mockExam}</div>
      </div>
      <span class="mock-exam-countdown" id="mock-countdown">--:--</span>
      <button class="mock-exam-btn stop" id="mock-stop">${SVGI.square}<span>${T.mockStop}</span></button>
    </div>`;
  }
  return `<div class="mock-exam-card">
    <div class="mock-info">
      <div class="mock-title">${T.mockExam}</div>
      <div class="mock-sub">${MOCK_EXAM_MINUTES} min</div>
    </div>
    <button class="mock-exam-btn" id="mock-start">${SVGI.triangle}<span>${T.startMock}</span></button>
  </div>`;
}

function startMockExam() {
  const end = Date.now() + MOCK_EXAM_MINUTES * 60 * 1000;
  localStorage.setItem(MOCK_EXAM_KEY, String(end));
  document.body.classList.add("mock-running");
  if (state.lastActive) openLesson(state.lastActive);
  startMockTicker();
}
function stopMockExam() {
  localStorage.removeItem(MOCK_EXAM_KEY);
  document.body.classList.remove("mock-running");
  if (mockTimer) { clearInterval(mockTimer); mockTimer = null; }
}
function startMockTicker() {
  if (mockTimer) clearInterval(mockTimer);
  const tick = () => {
    const endTs = parseInt(localStorage.getItem(MOCK_EXAM_KEY) || "0", 10);
    if (!endTs) { stopMockExam(); return; }
    const remain = Math.max(0, endTs - Date.now());
    const el = document.getElementById("mock-countdown");
    if (el) {
      const mm = String(Math.floor(remain / 60000)).padStart(2, "0");
      const ss = String(Math.floor((remain % 60000) / 1000)).padStart(2, "0");
      el.textContent = `${mm}:${ss}`;
      el.classList.toggle("urgent", remain < 5 * 60 * 1000);
    }
    if (remain <= 0) {
      stopMockExam();
      toast(T.mockFinished);
      celebrate();
      if (state.lastActive) openLesson(state.lastActive);
    }
  };
  tick();
  mockTimer = setInterval(tick, 500);
}
// Bind mock buttons via event delegation (works each re-render)
document.body.addEventListener("click", e => {
  if (e.target && e.target.id === "mock-start") startMockExam();
  if (e.target && e.target.id === "mock-stop") {
    showModal({
      title: T.mockStop,
      body: t({ fr: "Arrêter l'exercice en cours ?", en: "Stop the exercise in progress?" }),
      actions: [
        { label: T.resetCancel, variant: "secondary" },
        { label: T.mockStop, variant: "danger", onClick: () => { stopMockExam(); if (state.lastActive) openLesson(state.lastActive); }},
      ],
    });
  }
});

/* ====================================================================
   KEYBOARD SHORTCUTS
   ==================================================================== */
document.addEventListener("keydown", e => {
  const tag = e.target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
  if (e.key === "/") {
    e.preventDefault();
    document.body.classList.add("drawer-open");
    setTimeout(() => document.getElementById("search").focus(), 50);
    return;
  }
  if (e.key === "?") {
    e.preventDefault();
    openShortcutsModal();
    return;
  }
  if (e.key === "f" || e.key === "F") {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    toggleFocusMode();
    return;
  }
  if (e.key === "s" || e.key === "S") {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    openShareCard();
    return;
  }
  if (!state.lastActive) return;
  const idx = LESSON_INDEX_BY_ID.get(state.lastActive);
  if (e.key === "ArrowRight" && idx < ALL_LESSONS.length - 1) {
    openLesson(ALL_LESSONS[idx + 1].id);
  }
  if (e.key === "ArrowLeft" && idx > 0) {
    openLesson(ALL_LESSONS[idx - 1].id);
  }
  if (e.key === "t" || e.key === "T") {
    const lesson = ALL_LESSONS[idx];
    if (!lesson) return;
    const hasEx = !!(lesson.exercises && lesson.exercises.length);
    const hasProbs = !!(lesson.problemes && lesson.problemes.length);
    if (!hasEx && !hasProbs) return;
    // Cycle: cours -> exos -> probs -> cours, skipping tabs the lesson doesn't have
    const order = ["cours"];
    if (hasEx) order.push("exos");
    if (hasProbs) order.push("probs");
    const i = order.indexOf(currentTab);
    currentTab = order[(i + 1) % order.length];
    renderExArea(lesson);
    bindCopyButtons();
  }
  if (e.key === "b" || e.key === "B") {
    const lesson = ALL_LESSONS[idx];
    if (!lesson) return;
    showBookmarkedExercises(lesson);
  }
  if (e.key === "d" || e.key === "D") {
    if (ALL_LESSONS[idx]) toggleDone(state.lastActive);
  }
  if (e.key === "Escape") {
    document.body.classList.remove("drawer-open");
  }
});

/* ====================================================================
   MOBILE DRAWER
   ==================================================================== */
const menuBtn = document.getElementById("menu-btn");
const backdrop = document.getElementById("drawer-backdrop");

if (menuBtn) {
  menuBtn.addEventListener("click", () => document.body.classList.toggle("drawer-open"));
}
if (backdrop) {
  backdrop.addEventListener("click", () => document.body.classList.remove("drawer-open"));
}

/* ====================================================================
   POMODORO TIMER + ALARM
   Classic 25/5 (long break every 4). State lives in state.pomo so it
   rides the per-tracker storage key. endTs is absolute so it survives
   reloads. Alarm uses Web Audio (no asset) + optional Notification.
   ==================================================================== */
function pomoState() {
  const def = { phase: "focus", running: false, endTs: null, leftMs: null, focusMin: 25, shortMin: 5, longMin: 15, completed: 0, cycle: 0, soundOn: true, autoStart: false };
  if (!state.pomo || typeof state.pomo !== "object") state.pomo = def;
  else for (const k in def) if (!(k in state.pomo)) state.pomo[k] = def[k];
  return state.pomo;
}
function pomoPhaseMin(p) { return p.phase === "focus" ? p.focusMin : p.phase === "long" ? p.longMin : p.shortMin; }
function pomoPhaseLabel(p) { return p.phase === "focus" ? T.pomoFocus : p.phase === "long" ? T.pomoLong : T.pomoShort; }
function pomoFmt(ms) {
  ms = Math.max(0, ms);
  const m = Math.floor(ms / 60000), s = Math.floor((ms % 60000) / 1000);
  return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}
function pomoRemaining() {
  const p = pomoState();
  if (p.running && p.endTs) return Math.max(0, p.endTs - Date.now());
  if (p.leftMs != null) return p.leftMs;
  return pomoPhaseMin(p) * 60000;
}
let pomoAudio = null;
function pomoEnsureAudio() {
  try {
    pomoAudio = pomoAudio || new (window.AudioContext || window.webkitAudioContext)();
    if (pomoAudio.state === "suspended") pomoAudio.resume();
  } catch (e) {}
}
function pomoBeep(times) {
  if (!pomoState().soundOn) return;
  pomoEnsureAudio();
  if (!pomoAudio) return;
  try {
    let t = pomoAudio.currentTime;
    for (let i = 0; i < times; i++) {
      const o = pomoAudio.createOscillator(), g = pomoAudio.createGain();
      o.type = "sine";
      o.frequency.value = i % 2 ? 660 : 880;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.32, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);
      o.connect(g); g.connect(pomoAudio.destination);
      o.start(t); o.stop(t + 0.36);
      t += 0.42;
    }
  } catch (e) {}
}
function pomoNotify(msg) {
  try {
    if (window.Notification && Notification.permission === "granted") {
      new Notification("🍅 " + T.pomodoro, { body: msg });
    }
  } catch (e) {}
}
let pomoTimer = null;
function pomoStartTicker() {
  if (pomoTimer) clearInterval(pomoTimer);
  pomoTimer = setInterval(pomoTick, 500);
}
function pomoStopTicker() {
  if (pomoTimer) { clearInterval(pomoTimer); pomoTimer = null; }
}
function pomoTick() {
  const p = pomoState();
  if (!p.running) return;
  if (pomoRemaining() <= 0) { pomoComplete(); return; }
  pomoRender();
}
function pomoStart() {
  const p = pomoState();
  const base = p.leftMs != null ? p.leftMs : pomoPhaseMin(p) * 60000;
  p.endTs = Date.now() + base;
  p.leftMs = null;
  p.running = true;
  pomoEnsureAudio();
  saveState();
  pomoStartTicker();
  pomoRender();
}
function pomoPause() {
  const p = pomoState();
  p.leftMs = pomoRemaining();
  p.running = false;
  p.endTs = null;
  pomoStopTicker();
  saveState();
  pomoRender();
}
function pomoToggle() { pomoState().running ? pomoPause() : pomoStart(); }
function pomoReset() {
  const p = pomoState();
  p.running = false; p.endTs = null; p.leftMs = pomoPhaseMin(p) * 60000;
  pomoStopTicker();
  saveState();
  pomoRender();
}
function pomoAdvance() {
  const p = pomoState();
  if (p.phase === "focus") {
    p.completed += 1;
    p.cycle += 1;
    p.phase = (p.cycle % 4 === 0) ? "long" : "short";
  } else {
    p.phase = "focus";
  }
  p.running = false; p.endTs = null; p.leftMs = pomoPhaseMin(p) * 60000;
  pomoStopTicker();
  saveState();
  pomoRender();
}
function pomoComplete() {
  const p = pomoState();
  const wasFocus = p.phase === "focus";
  pomoStopTicker();
  pomoBeep(3);
  if (wasFocus) {
    if (!Array.isArray(state.pomoLog)) state.pomoLog = [];
    state.pomoLog.push({ ts: Date.now(), min: p.focusMin });
    // Cap log to keep storage light (last 200 sessions)
    if (state.pomoLog.length > 200) state.pomoLog = state.pomoLog.slice(-200);
    saveState();
    awardXp(5, "Pomodoro");
    checkChallenge();
  }
  pomoAdvance();
  // Auto-start the next phase if break and the user opted in
  if (wasFocus && p.autoStart) {
    pomoStart();
  }
  const msg = wasFocus ? T.pomoFocusDone : T.pomoBreakDone;
  toast(msg);
  pomoNotify(msg);
}

function pomoTodayCount() {
  if (!Array.isArray(state.pomoLog)) return 0;
  const today = new Date().toDateString();
  return state.pomoLog.filter(s => new Date(s.ts).toDateString() === today).length;
}
let _pomoHistoryLastSig = "";
function pomoRenderHistory() {
  const list = document.getElementById("pomo-history-list");
  const countEl = document.getElementById("pomo-today-count");
  if (!list) return;
  const today = new Date().toDateString();
  const sessions = (Array.isArray(state.pomoLog) ? state.pomoLog : []).filter(s => new Date(s.ts).toDateString() === today);
  // Skip the innerHTML rebuild when nothing changed (pomoRender fires every 500 ms while running).
  const sig = today + "|" + sessions.length;
  if (sig === _pomoHistoryLastSig) return;
  _pomoHistoryLastSig = sig;
  if (countEl) countEl.textContent = sessions.length;
  list.innerHTML = sessions.length
    ? sessions.map(s => `<span class="pomo-history-pip" title="${new Date(s.ts).toLocaleTimeString()} · ${s.min} min"></span>`).join("")
    : `<span class="pomo-history-empty">—</span>`;
}
function pomoRender() {
  const p = pomoState();
  const rem = pomoRemaining();
  const disp = document.getElementById("pomo-display");
  const phaseEl = document.getElementById("pomo-phase");
  const toggle = document.getElementById("pomo-toggle");
  const countEl = document.getElementById("pomo-count");
  const timeEl = document.getElementById("pomo-time");
  const btn = document.getElementById("pomo-btn");
  const barFill = document.getElementById("pomo-bar-fill");
  const panel = document.getElementById("pomo-panel");
  if (disp) disp.textContent = pomoFmt(rem);
  if (phaseEl) phaseEl.textContent = pomoPhaseLabel(p);
  if (toggle) toggle.textContent = p.running ? T.pomoPause : T.pomoStart;
  if (countEl) countEl.textContent = p.completed;
  if (timeEl) timeEl.textContent = p.running ? pomoFmt(rem) : "";
  if (btn) btn.classList.toggle("running", !!p.running);
  if (panel) panel.classList.toggle("phase-break", p.phase !== "focus");
  const sidePomo = document.getElementById("sidebar-pomo-btn");
  const sidePomoTime = document.getElementById("sidebar-pomo-time");
  if (sidePomo) sidePomo.classList.toggle("running", !!p.running);
  if (sidePomoTime) sidePomoTime.textContent = p.running ? pomoFmt(rem) : "";
  if (barFill) {
    const total = pomoPhaseMin(p) * 60000 || 1;
    barFill.style.width = Math.min(100, (1 - rem / total) * 100) + "%";
  }
  // Circular ring — 477.52 ≈ 2 * PI * 76
  const ring = document.getElementById("pomo-ring-fg");
  if (ring) {
    const total = pomoPhaseMin(p) * 60000 || 1;
    const C = 477.52;
    const pct = Math.min(1, Math.max(0, 1 - rem / total));
    ring.style.strokeDashoffset = String(C * pct);
  }
  const fIn = document.getElementById("pomo-focus-min");
  const sIn = document.getElementById("pomo-short-min");
  const lIn = document.getElementById("pomo-long-min");
  const auto = document.getElementById("pomo-autostart");
  const snd = document.getElementById("pomo-sound");
  if (fIn && document.activeElement !== fIn) fIn.value = p.focusMin;
  if (sIn && document.activeElement !== sIn) sIn.value = p.shortMin;
  if (lIn && document.activeElement !== lIn) lIn.value = p.longMin;
  if (auto) auto.checked = !!p.autoStart;
  if (snd) {
    snd.classList.toggle("off", !p.soundOn);
    const ico = document.getElementById("pomo-sound-ico");
    const stateEl = document.getElementById("pomo-sound-state");
    if (ico) ico.textContent = p.soundOn ? "🔔" : "🔕";
    if (stateEl) stateEl.textContent = p.soundOn ? "ON" : "OFF";
  }
  pomoRenderHistory();
}
function initPomodoro() {
  const btn = document.getElementById("pomo-btn");
  const panel = document.getElementById("pomo-panel");
  if (!btn || !panel) return;
  const p = pomoState();
  // Resume a running timer across reloads
  if (p.running && p.endTs) {
    if (p.endTs > Date.now()) pomoStartTicker();
    else pomoComplete(); // finished while the tab was closed
  }
  btn.addEventListener("click", e => {
    e.stopPropagation();
    const open = panel.classList.toggle("open");
    panel.setAttribute("aria-hidden", open ? "false" : "true");
    if (open && window.Notification && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
    pomoRender();
  });
  const sidePomo = document.getElementById("sidebar-pomo-btn");
  if (sidePomo) sidePomo.addEventListener("click", e => { e.stopPropagation(); btn.click(); });
  document.getElementById("pomo-toggle").addEventListener("click", pomoToggle);
  document.getElementById("pomo-reset").addEventListener("click", pomoReset);
  document.getElementById("pomo-skip").addEventListener("click", pomoAdvance);
  const fIn = document.getElementById("pomo-focus-min");
  const sIn = document.getElementById("pomo-short-min");
  const snd = document.getElementById("pomo-sound");
  if (fIn) fIn.addEventListener("change", () => {
    const v = Math.max(1, Math.min(90, parseInt(fIn.value, 10) || 25));
    const q = pomoState(); q.focusMin = v;
    if (!q.running && q.phase === "focus") q.leftMs = v * 60000;
    saveState(); pomoRender();
  });
  if (sIn) sIn.addEventListener("change", () => {
    const v = Math.max(1, Math.min(60, parseInt(sIn.value, 10) || 5));
    const q = pomoState(); q.shortMin = v;
    if (!q.running && q.phase === "short") q.leftMs = v * 60000;
    saveState(); pomoRender();
  });
  const lIn = document.getElementById("pomo-long-min");
  if (lIn) lIn.addEventListener("change", () => {
    const v = Math.max(5, Math.min(60, parseInt(lIn.value, 10) || 15));
    const q = pomoState(); q.longMin = v;
    if (!q.running && q.phase === "long") q.leftMs = v * 60000;
    saveState(); pomoRender();
  });
  const auto = document.getElementById("pomo-autostart");
  if (auto) auto.addEventListener("change", () => {
    pomoState().autoStart = auto.checked;
    saveState();
  });
  const clear = document.getElementById("pomo-history-clear");
  if (clear) clear.addEventListener("click", () => {
    if (!Array.isArray(state.pomoLog) || !state.pomoLog.length) return;
    const today = new Date().toDateString();
    state.pomoLog = state.pomoLog.filter(s => new Date(s.ts).toDateString() !== today);
    pomoState().completed = 0;
    saveState();
    pomoRender();
  });
  if (snd) snd.addEventListener("click", () => { pomoState().soundOn = !pomoState().soundOn; saveState(); pomoRender(); });
  document.addEventListener("click", e => {
    if (panel.classList.contains("open") && !panel.contains(e.target) && !btn.contains(e.target)) {
      panel.classList.remove("open"); panel.setAttribute("aria-hidden", "true");
    }
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && panel.classList.contains("open")) {
      panel.classList.remove("open"); panel.setAttribute("aria-hidden", "true");
    }
  });
  pomoRender();
}

/* ====================================================================
   INIT
   ==================================================================== */
applyTheme();
applyFocusMode();
refreshXp();
applyI18n();
if (langLabel) langLabel.textContent = state.lang === "en" ? "EN" : "FR";
if (langBtn) langBtn.setAttribute("title", T.toggleLang);
document.documentElement.setAttribute("lang", state.lang === "en" ? "en" : "fr");
renderSidebar();
bindCollapseTitles();
updateExamCountdown();
updateDayIndicator();
// Refresh countdown once an hour (covers day rollover during long sessions)
setInterval(updateExamCountdown, 60 * 60 * 1000);

if (state.lastActive && LESSON_BY_ID.has(state.lastActive)) {
  openLesson(state.lastActive);
} else {
  renderWelcome();
}

// Resume timed exercise if one was in progress
if (parseInt(localStorage.getItem(MOCK_EXAM_KEY) || "0", 10) > Date.now()) {
  document.body.classList.add("mock-running");
  startMockTicker();
}

initPomodoro();

/* ====================================================================
   SCROLL PROGRESS BAR + JUMP TO TOP
   ==================================================================== */
const scrollBar = document.getElementById("scroll-progress");
const jumpTopBtn = document.getElementById("jump-top");
let scrollRaf = 0;
function onScroll() {
  if (scrollRaf) return;
  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = 0;
    const doc = document.documentElement;
    const max = (doc.scrollHeight - doc.clientHeight) || 1;
    const pct = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
    if (scrollBar) scrollBar.style.transform = `scaleX(${pct / 100})`;
    if (jumpTopBtn) jumpTopBtn.classList.toggle("show", window.scrollY > 400);
  });
}
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll, { passive: true });
if (jumpTopBtn) jumpTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
onScroll();

// Floating shortcuts help button → opens the same modal as `?`
const scFab = document.getElementById("shortcuts-fab");
if (scFab) scFab.addEventListener("click", openShortcutsModal);

