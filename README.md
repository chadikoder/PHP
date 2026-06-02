<div align="center">

# PHP Tracker

**A drawer-based PHP study tracker — 7-day plan with 140 exercises and full W3Schools coverage.**

[![Made by Chadi Khoder](https://img.shields.io/badge/made_by-Chadi_Khoder-6366f1?style=for-the-badge)](https://github.com/chadikoder)
[![No build](https://img.shields.io/badge/no_build-static-6366f1?style=for-the-badge)](https://github.com/chadikoder/PHP)
[![PHP](https://img.shields.io/badge/PHP-8.x-6366f1?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/)
[![License](https://img.shields.io/badge/license-PolyForm_NC-6366f1?style=for-the-badge)](#license)

[**Open the tracker →**](https://chadikoder.github.io/PHP/)

</div>

---

## What is this

A single-page PHP study tracker. The 7-day plan is topic-focused: each day covers one core PHP pattern. Same UI/UX as my other trackers (PHP / HTML / CSS / JS / SQL).

```
7 days   · 7-day plan
140      · exercises with full solutions
34       · W3Schools-style reference lessons
35       · quizzes
1        · timed practice (Day 7)
∞        · re-readable anytime
```

## Features

- **7-day plan** — each day = one core PHP pattern
- **140 exercises** — easy / medium / hard / extreme, with full solutions
- **34 W3Schools references** — Basic / Intermediate / Advanced, complete coverage
- **Timed practice (Day 7)** — 120-min dry run, OOP + full pattern
- **Quizzes** — short MCQ per day with explanations
- **Drawer sidebar** — same on desktop and mobile
- **Click-to-complete** — the cube in the sidebar marks a lesson done
- **Per-day progress bar** — visual feedback as you advance
- **Dark / Light theme** — saved across sessions
- **Search** — `/` shortcut, fuzzy match
- **Bookmarks** — pin tricky exercises to revisit
- **PHP-aware syntax highlighter** — keywords, variables, strings
- **Keyboard shortcuts** — `←` `→` navigate, `T` toggle course/exos, `B` bookmarks, `Esc` close
- **localStorage persistence** — your progress survives reloads
- **Confetti** when you complete a lesson, achievements unlock

## Curriculum (7-day plan)

1. **PHP Basics** — syntax, types, operators, control flow, includes (J1)
2. **Functions, arrays, regex** — exam favorites (J2)
3. **Forms & validation** — `$_GET`, `$_POST`, `filter_var`, security (J3)
4. **Sessions, cookies, auth** — login flow, `password_hash`/`password_verify` (J4)
5. **MySQL — mysqli + PDO** — prepared statements, CRUD (J5)
6. **File upload + CSV / JSON** — `move_uploaded_file`, `mkdir`, exports (J6)
7. **OOP + timed practice** — classes, inheritance, 120-min dry run (J7)

## W3Schools reference (34 lessons)

- **Basic** (14): Intro, Syntax, Variables, Echo/Print, Data Types, Strings, Numbers, Constants, Operators, If/Else/Switch, Loops, Functions, Arrays, Superglobals
- **Intermediate** (10): Forms, Validation, RegEx, Date/Time, Include/Require, File Handling, File Upload, Cookies, Sessions, JSON
- **Advanced** (10): OOP intro, Constructor, Access Modifiers, Inheritance, Abstract, Interfaces, Static, Exceptions, MySQL, Traits

## Quick start

```bash
git clone https://github.com/chadikoder/PHP.git
cd PHP
# Open index.html in any browser. That is it.
```

Or visit **https://chadikoder.github.io/PHP/** (enable GitHub Pages in Settings → Pages → `main` branch first).

## Project structure

```
PHP/
├── index.html              ← redirect → web/study_tracker.html
├── README.md
├── web/
│   ├── study_tracker.html  ← page shell
│   ├── css/
│   │   └── style.css       ← design system, ~660 lines
│   ├── js/
│   │   ├── app.js          ← rendering + state + PHP syntax highlight
│   │   └── data.js         ← curriculum, ~1500+ lines
│   └── image/
│       └── php-svgrepo-com.svg
└── .nojekyll
```

## Tech stack

| | |
|---|---|
| Markup | HTML5 |
| Style | CSS3 (custom properties, grid, flexbox) |
| Logic | Vanilla JavaScript |
| State | localStorage (`sawa_php_tracker_v3`) |
| Fonts | Inter + JetBrains Mono via Google Fonts |
| Build | None — open and run |

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses `structuredClone`, container queries, `:focus-visible`.

## Related trackers

By the same author, same design system:

- [chadikoder/PHP](https://github.com/chadikoder/PHP) — PHP study tracker
- [chadikoder/HTML](https://github.com/chadikoder/HTML) — HTML5
- [chadikoder/CSS](https://github.com/chadikoder/CSS) — CSS3
- [chadikoder/JS](https://github.com/chadikoder/JS) — Modern JavaScript
- [chadikoder/SQL](https://github.com/chadikoder/SQL) — SQL (MySQL / PostgreSQL)

## Author

<div align="center">

<a href="https://github.com/chadikoder">
  <img src="https://github.com/chadikoder.png" width="110" alt="Chadi Khoder" />
</a>

### Chadi Khoder

[![GitHub](https://img.shields.io/badge/@chadikoder-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/chadikoder)

Building a family of bilingual study trackers — PHP · HTML · CSS · JS · SQL.

</div>

## License

**PolyForm Noncommercial License 1.0.0** — Copyright © 2026 Chadi Ikhoder. All rights reserved.

You may read, study, and use this for personal, educational, and non-commercial purposes. You may **not** sell it or use it for any commercial purpose. See [`LICENSE`](./LICENSE) for the full text.
