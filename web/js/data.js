const DAYS = [
  {
    id: "day-1",
    code: "J1",
    title: {
      fr: "Jour 1 - chap1 PHP Basics",
      en: "Day 1 - chap1 PHP Basics"
    },
    sub: {
      fr: "Syntaxe, types, operateurs, control flow, includes, printf",
      en: "Syntax, types, operators, control flow, includes, printf"
    },
    why: {
      fr: "Fondations CNAM NFA042 chap1. La quasi-totalite des QCM (10 points sur 20) viennent d'ici. A maitriser avant de toucher SQL/PDO.",
      en: "CNAM NFA042 chap1 foundations. Nearly all MCQ marks (10/20) come from here. Master before touching SQL/PDO."
    },
    tags: [
      "chap1",
      "syntax",
      "types",
      "loops",
      "include",
      "printf"
    ],
    sections: [
      {
        h: "Balises PHP & sortie",
        blocks: [
          {
            p: "PHP s'execute <strong>cote serveur</strong>. Le code PHP doit etre dans des balises <code>&lt;?php ... ?&gt;</code>. Le navigateur ne voit jamais le code, uniquement le HTML genere."
          },
          {
            code: "<?php\n  // Balise standard\n  echo 'Bonjour';\n?>\n\n<?= 'Short echo' ?>\n\n<?php\n  // Dans un fichier 100% PHP, NE PAS fermer la balise\n  // (evite des espaces parasites avant header())",
            out: "Bonjour\nShort echo"
          },
          {
            note: "<code>echo</code> accepte plusieurs arguments separes par virgules : <code>echo 'a', 'b', 'c';</code>. <code>print</code> retourne 1 (utilisable comme expression). <code>printf()</code> formate comme en C."
          },
          {
            warn: "Si le fichier est inclus dans un autre PHP, <strong>ne ferme pas avec <code>?&gt;</code></strong>. Sinon, tout espace ou retour ligne apres sera envoye au navigateur et tu auras l'erreur <em>Headers already sent</em>."
          },
          {
            p: "<strong>printf / sprintf</strong> (chap1, <code>print_f.docx</code>) : formattage type C. <code>printf</code> ecrit directement, <code>sprintf</code> retourne la chaine sans l'afficher. Tres demande en QCM CNAM."
          },
          {
            code: "<?php\n// Specificateurs courants\nprintf(\"%d\\n\", 3.7);         // 3        (entier, troncature)\nprintf(\"%.2f\\n\", 3.14159);    // 3.14     (float, 2 decimales)\nprintf(\"%05d\\n\", 42);         // 00042    (padding zero, largeur 5)\nprintf(\"%s a %d ans\\n\", 'Chadi', 23);  // Chadi a 23 ans\n\n// sprintf : recupere la chaine au lieu de l'afficher\n$msg = sprintf('Total : %.2f EUR', 1234.5);\necho $msg;  // Total : 1234.50",
            out: "3\n3.14\n00042\nChadi a 23 ans\nTotal : 1234.50"
          },
          {
            note: "Specificateurs cles : <code>%d</code> entier, <code>%f</code> float, <code>%s</code> string, <code>%x</code> hex, <code>%%</code> pour un <code>%</code> litteral. Largeur : <code>%5d</code>. Padding zero : <code>%05d</code>. Precision : <code>%.2f</code>."
          },
          {
            try: "Que retourne <code>sprintf('%05.2f', 3.1)</code> ?",
            ans: "<code>03.10</code> — largeur totale 5, 2 decimales, padding zero a gauche. Le <code>.</code> et les 2 decimales comptent dans la largeur."
          }
        ]
      },
      {
        h: "Variables & types dynamiques",
        blocks: [
          {
            p: "PHP est <strong>dynamiquement type</strong> : pas besoin de declarer le type. Toutes les variables commencent par <code>$</code> et sont sensibles a la casse (<code>$nom</code> != <code>$Nom</code>)."
          },
          {
            code: "<?php\n$age   = 23;          // int\n$nom   = 'Chadi';     // string\n$ok    = true;        // bool\n$pi    = 3.14;        // float\n$tab   = [1, 2, 3];   // array\n$rien  = null;        // null\n\n// Inspection\necho gettype($age);   // integer\nvar_dump($ok);        // bool(true)",
            out: "integer\nbool(true)"
          },
          {
            tip: "Pour debugger une variable, utilise <code>var_dump($x)</code> (montre type + valeur) ou <code>print_r($arr)</code> (lisible pour tableaux). En prod, ne JAMAIS laisser de <code>var_dump</code>."
          },
          {
            try: "Que retourne <code>gettype('42')</code> ?",
            ans: "<code>string</code> -- '42' est une chaine, pas un entier. <code>(int)'42'</code> donnerait 42."
          }
        ]
      },
      {
        h: "Operateurs (les pieges d'exam)",
        blocks: [
          {
            p: "En PHP, la <strong>concatenation</strong> de chaines se fait avec <code>.</code> (PAS avec <code>+</code> comme en JS). Les comparaisons sont le piege n1 du QCM."
          },
          {
            code: "<?php\n// Concatenation\n$msg = 'Bonjour ' . $nom . ' !';\n\n// Comparaisons\nvar_dump(5 == '5');    // true  (loose, juggling)\nvar_dump(5 === '5');   // false (strict, types differents)\nvar_dump(0 == 'abc');  // false (PHP 8+, true avant)\n\n// Spaceship (PHP 7+)\necho 1 <=> 2;          // -1\necho 5 <=> 5;          //  0\necho 9 <=> 3;          //  1\n\n// Null coalescing\n$nom = $_POST['nom'] ?? 'Invite';",
            out: "bool(true)\nbool(false)\nbool(false)\n-1\n0\n1"
          },
          {
            warn: "Toujours utiliser <code>===</code> (strict) en exam. <code>'5' == 5</code> est <strong>true</strong>, mais <code>'5' === 5</code> est <strong>false</strong>. Les correcteurs verifient ce point."
          },
          {
            try: "Que vaut <code>echo 'Total: ' . 5 + 3 . ' euros';</code> ?",
            ans: "<code>3 euros</code> ! La concat <code>.</code> a une priorite plus faible que <code>+</code>, donc evalue comme <code>('Total: '.5) + (3.' euros')</code> = <code>0 + 3</code> = 3."
          }
        ]
      },
      {
        h: "Control flow : if / switch / match",
        blocks: [
          {
            p: "PHP supporte les structures classiques : <code>if/elseif/else</code>, <code>switch</code>, et le nouveau <code>match</code> (PHP 8+, recommande pour le moderne)."
          },
          {
            code: "<?php\n// if / elseif / else\nif ($age < 18) {\n    echo 'Mineur';\n} elseif ($age < 65) {\n    echo 'Adulte';\n} else {\n    echo 'Senior';\n}\n\n// switch (compare avec ==, fall-through)\nswitch ($role) {\n    case 'admin':  echo 'Administrateur'; break;\n    case 'editor':\n    case 'author': echo 'Redacteur';     break;  // fall-through\n    default:       echo 'Inconnu';\n}\n\n// match (PHP 8, strict ===, retourne une valeur)\n$label = match($code) {\n    200, 201 => 'OK',\n    301, 302 => 'Redirect',\n    404      => 'Not Found',\n    default  => 'Unknown',\n};"
          },
          {
            note: "Le <code>match</code> (PHP 8+) est preferable au <code>switch</code> : il utilise <code>===</code> (strict), pas de fall-through, retourne une valeur, et leve <code>UnhandledMatchError</code> si rien ne matche."
          },
          {
            bad: "Oublier <code>break;</code> dans un <code>switch</code> est une cause classique de bug. PHP execute alors aussi le case suivant (fall-through), ce qui n'est presque jamais voulu."
          }
        ]
      },
      {
        h: "Boucles : for, while, foreach",
        blocks: [
          {
            p: "PHP a 4 types de boucles. <code>foreach</code> est de loin la plus utilisee pour iterer sur un tableau."
          },
          {
            code: "<?php\n// for (compteur)\nfor ($i = 1; $i <= 5; $i++) {\n    echo $i . ' ';\n}\n\n// while (tant que)\n$n = 10;\nwhile ($n > 0) { echo $n--; echo ' '; }\n\n// foreach (tableau indexe)\n$fruits = ['pomme', 'banane', 'kiwi'];\nforeach ($fruits as $fruit) {\n    echo $fruit . '<br>';\n}\n\n// foreach (tableau associatif avec cles)\n$user = ['name' => 'Chadi', 'age' => 23];\nforeach ($user as $key => $value) {\n    echo \"$key: $value<br>\";\n}",
            out: "1 2 3 4 5\n10 9 8 7 6 5 4 3 2 1\npomme\nbanane\nkiwi\nname: Chadi\nage: 23"
          },
          {
            warn: "<code>foreach</code> par reference avec <code>&amp;</code> : <strong>toujours</strong> faire <code>unset($v)</code> apres la boucle, sinon la variable garde une reference et corrompt le tableau au prochain foreach."
          },
          {
            try: "Combien d'iterations fait <code>for ($i = 0; $i < 5; $i++)</code> ?",
            ans: "5 iterations : $i prend les valeurs 0, 1, 2, 3, 4. La condition est <code>&lt; 5</code> donc s'arrete a 5."
          }
        ]
      },
      {
        h: "Include / Require - modulariser le code",
        blocks: [
          {
            p: "Pour inclure d'autres fichiers PHP, 4 instructions au choix selon le besoin :"
          },
          {
            table: [
              [
                "Instruction",
                "Si manquant",
                "Si deja inclus"
              ],
              [
                "<code>include</code>",
                "Warning, continue",
                "Re-inclut"
              ],
              [
                "<code>require</code>",
                "<strong>Fatal error</strong>",
                "Re-inclut"
              ],
              [
                "<code>include_once</code>",
                "Warning",
                "<strong>Ignore</strong>"
              ],
              [
                "<code>require_once</code>",
                "<strong>Fatal error</strong>",
                "<strong>Ignore</strong>"
              ]
            ]
          },
          {
            code: "<?php\n// Bonne pratique : chemin absolu avec __DIR__\nrequire_once __DIR__ . '/config.php';\nrequire_once __DIR__ . '/db.php';\nrequire_once __DIR__ . '/helpers.php';\n\n// Pour les templates HTML reutilisables\ninclude 'header.html';"
          },
          {
            tip: "<strong>Code critique</strong> (config, classes) : <code>require_once</code>. <strong>Templates reutilisables</strong> : <code>include</code>. Toujours utiliser <code>__DIR__</code> pour eviter les bugs de chemins relatifs."
          }
        ]
      },
      {
        h: "Checklist chap1 - a maitriser avant Day 2",
        blocks: [
          {
            p: "Au bout de ce jour tu dois pouvoir, sans aide :"
          },
          {
            list: [
              "Ecrire / fermer correctement les balises PHP (et savoir pourquoi on ne ferme pas <code>?&gt;</code> dans un fichier 100% PHP)",
              "Connaitre les 8 types PHP et utiliser <code>gettype()</code> / <code>var_dump()</code> sans hesiter",
              "Distinguer <code>==</code> vs <code>===</code> et expliquer 3 pieges classiques (<code>0 == 'abc'</code>, <code>'5' == 5</code>, <code>null == 0</code>)",
              "Choisir <code>if / switch / match</code> selon le contexte, expliquer le fall-through",
              "Ecrire les 4 boucles (<code>for</code>, <code>while</code>, <code>do...while</code>, <code>foreach</code>) et savoir laquelle utiliser quand",
              "Connaitre les 4 instructions d'inclusion (<code>include</code>, <code>require</code>, <code>_once</code>) et leur comportement si fichier absent / deja inclus",
              "Formater une sortie avec <code>printf</code> / <code>sprintf</code> (<code>%d</code>, <code>%.2f</code>, <code>%05d</code>, <code>%s</code>)"
            ]
          },
          {
            tip: "Ouvre le fichier source CNAM : <code>documents/PHP_UNI/chap1/print_f.docx</code>. C'est le seul doc officiel de chap1 — l'examinateur vient piocher des QCM directement dedans."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Dans un fichier 100% PHP (sans HTML autour), quelle balise est <strong>deconseillee</strong> en fin de fichier ?",
        opts: [
          "<code>?&gt;</code>",
          "<code>&lt;?php</code>",
          "<code>&lt;?=</code>",
          "<code>// fin</code>"
        ],
        correct: "a",
        expl: "Fermer avec <code>?&gt;</code> peut laisser des espaces ou retours-ligne parasites qui sont envoyes au navigateur. Resultat : l'erreur <em>Headers already sent</em> des qu'on appelle <code>header()</code>, <code>session_start()</code> ou <code>setcookie()</code>. <b>Regle :</b> dans un fichier 100% PHP, ne pas fermer la balise — le parseur s'arrete proprement en fin de fichier."
      },
      {
        q: "Que retourne <code>var_dump(0 == 'abc')</code> en PHP 8 ?",
        opts: [
          "<code>bool(true)</code>",
          "<code>bool(false)</code>",
          "<code>NULL</code>",
          "Erreur fatale"
        ],
        correct: "b",
        expl: "Depuis PHP 8, comparer un nombre a une chaine <strong>non numerique</strong> utilise une comparaison stricte : <code>0 == 'abc'</code> = <b>false</b>. Avant PHP 8 c'etait <code>true</code> car 'abc' etait converti en 0. Avec une chaine numerique (<code>0 == '0'</code>) le resultat reste true. <b>En exam, toujours utiliser <code>===</code></b> pour eviter ce piege."
      },
      {
        q: "Pour inclure un fichier <code>config.php</code> indispensable au demarrage, quelle instruction est la meilleure ?",
        opts: [
          "<code>include</code>",
          "<code>include_once</code>",
          "<code>require</code>",
          "<code>require_once</code>"
        ],
        correct: "d",
        expl: "<code>require_once</code> combine deux protections : <b>(1) require</b> = fatal si fichier absent (on veut crasher si pas de config, pas continuer silencieusement) ; <b>(2) _once</b> = pas de double inclusion (evite les <em>Cannot redeclare</em> sur les constantes ou fonctions). C'est l'instruction par defaut pour tout code critique (config, classes, helpers)."
      },
      {
        q: "Quel operateur permet de concatener deux chaines en PHP ?",
        opts: [
          "<code>+</code>",
          "<code>.</code>",
          "<code>&amp;</code>",
          "<code>~</code>"
        ],
        correct: "b",
        expl: "En PHP, la concatenation se fait avec <code>.</code> (point), contrairement a JavaScript / Python qui utilisent <code>+</code>. Le <code>+</code> en PHP est strictement arithmetique : <code>'Hello ' + 'World'</code> declenche une TypeError (PHP 8) ou renvoie <code>0</code> (PHP 7). <b>Piege exam :</b> <code>echo 'Total: ' . 5 + 3;</code> n'affiche pas 8 — voir la question sur la priorite."
      },
      {
        q: "Combien d'iterations effectue la boucle <code>for ($i = 5; $i &gt; 0; $i--)</code> ?",
        opts: [
          "4 fois",
          "5 fois",
          "6 fois",
          "Boucle infinie"
        ],
        correct: "b",
        expl: "<code>$i</code> prend les valeurs 5, 4, 3, 2, 1 — soit <b>5 iterations</b>. La condition <code>$i &gt; 0</code> est encore vraie quand $i=1, puis devient fausse quand $i=0 (le corps n'est pas execute). <b>Astuce :</b> pour 'aller de N a 1 inclus', utiliser <code>for ($i = N; $i &gt;= 1; $i--)</code> ou <code>for ($i = N; $i &gt; 0; $i--)</code>."
      },
      {
        q: "Que vaut <code>$x</code> apres <code>$x = $_GET['id'] ?? 0;</code> si <code>$_GET['id']</code> n'existe pas ?",
        opts: [
          "<code>null</code>",
          "<code>0</code>",
          "<code>false</code>",
          "Notice : undefined index"
        ],
        correct: "b",
        expl: "L'operateur <code>??</code> (null coalescing, PHP 7+) renvoie l'operande de droite si celui de gauche est <strong>null OU inexistant</strong>, sans declencher de notice. C'est LE pattern pour les superglobales : <code>$_POST['x'] ?? ''</code> evite les warnings. Different de <code>?:</code> (ternaire court) qui prend la droite si la gauche est <em>falsy</em> (0, '', '0', null declenchent tous)."
      },
      {
        q: "En PHP, <code>$nom</code> et <code>$Nom</code> sont :",
        opts: [
          "La meme variable",
          "Deux variables differentes",
          "Synonymes selon la version",
          "Une erreur fatale"
        ],
        correct: "b",
        expl: "Les <strong>noms de variables</strong> PHP sont sensibles a la casse : <code>$nom</code> et <code>$Nom</code> sont <b>deux variables completement separees</b>. En revanche, les <strong>noms de fonctions</strong> et <strong>de classes</strong> ne le sont PAS : <code>echo</code>, <code>ECHO</code>, <code>Echo</code> fonctionnent tous. <b>Convention :</b> variables en minuscules / camelCase, classes en PascalCase."
      },
      {
        q: "Pour debugger une variable avec son <strong>type</strong>, on utilise :",
        opts: [
          "<code>echo $x</code>",
          "<code>print $x</code>",
          "<code>var_dump($x)</code>",
          "<code>printf($x)</code>"
        ],
        correct: "c",
        expl: "<code>var_dump($x)</code> affiche le <b>type</b> + la <b>valeur</b> + la <b>longueur</b> (pour chaines/tableaux) : <code>int(5)</code>, <code>string(4) \"abcd\"</code>, <code>array(2) {...}</code>. C'est l'outil n°1 du debug. <code>print_r($arr)</code> est plus lisible pour les tableaux mais cache les types. <code>echo</code> ne montre pas les types : <code>1</code>, <code>'1'</code>, <code>true</code> s'affichent tous comme <code>1</code>."
      },
      {
        q: "En PHP 8, quelle structure est <strong>la plus sure</strong> pour matcher un code HTTP sur une valeur a retourner ?",
        opts: [
          "<code>if/elseif</code>",
          "<code>switch</code>",
          "<code>match</code>",
          "<code>goto</code>"
        ],
        correct: "c",
        expl: "<code>match</code> (PHP 8+) bat <code>switch</code> sur 4 points : (1) comparaison <strong>stricte</strong> <code>===</code> ; (2) <strong>pas de fall-through</strong>, donc pas de <code>break</code> a oublier ; (3) <strong>retourne une valeur</strong> directement assignable ; (4) leve <code>UnhandledMatchError</code> si rien ne matche (au lieu d'ignorer silencieusement). <code>switch</code> reste valide pour la retrocompatibilite."
      },
      {
        q: "Quelle est la sortie de <code>echo 'Total: ' . 5 + 3 . ' EUR';</code> en PHP 7 ?",
        opts: [
          "<code>Total: 8 EUR</code>",
          "<code>3 EUR</code>",
          "<code>Total: 5+3 EUR</code>",
          "Erreur de syntaxe"
        ],
        correct: "b",
        expl: "Piege classique de priorite d'operateurs. Le <code>.</code> et le <code>+</code> ont la <b>meme priorite</b>, evalues de gauche a droite. L'expression devient <code>(('Total: '.5) + 3) . ' EUR'</code> = <code>('Total: 5' + 3) . ' EUR'</code>. PHP convertit la chaine non-numerique en 0, donne <code>0 + 3 = 3</code>, puis concatene → <b>'3 EUR'</b>. <b>Fix :</b> parentheses autour de l'addition : <code>echo 'Total: ' . (5 + 3) . ' EUR';</code>. En PHP 8 ce code leve une TypeError."
      }
    ],
    exercises: [
      {
        num: 1,
        diff: "easy",
        title: "Hello NFA042",
        desc: "Ecrire un script PHP qui affiche exactement la chaine <code>Bonjour NFA042!</code>. Utiliser la balise <code>&lt;?php</code> et la fonction <code>echo</code>. Aucune sortie HTML autour, juste le texte demande.",
        sol: "<?php\necho 'Bonjour NFA042!';\n?>"
      },
      {
        num: 2,
        diff: "easy",
        title: "Variables",
        desc: "Declarer deux variables : <code>$nom</code> (chaine) et <code>$age</code> (entier). Affecter respectivement <code>\"Chadi\"</code> et <code>23</code>. Afficher la phrase <em>Chadi a 23 ans.</em> en interpolant les deux variables dans une chaine entre guillemets doubles.",
        sol: "<?php\n$nom = 'Chadi';\n$age = 23;\necho \"$nom a $age ans.\";\n?>"
      },
      {
        num: 3,
        diff: "easy",
        title: "Pair / Impair",
        desc: "Soit un entier <code>$n = 17</code>. Afficher <code>pair</code> si le nombre est divisible par 2, sinon <code>impair</code>. Utiliser l'operateur modulo <code>%</code> et l'operateur ternaire <code>? :</code>. Le code doit fonctionner pour n'importe quel entier.",
        sol: "<?php\n$n = 17;\necho ($n % 2 === 0) ? 'pair' : 'impair';\n?>"
      },
      {
        num: 4,
        diff: "easy",
        title: "Boucle 1-10",
        desc: "Afficher les entiers de 1 a 10 separes par un tiret : <code>1-2-3-4-5-6-7-8-9-10</code>. Pas de tiret final apres le 10. Utiliser une boucle <code>for</code> et un test sur la derniere iteration.",
        sol: "<?php\nfor ($i = 1; $i <= 10; $i++) {\n    echo $i;\n    if ($i < 10) echo '-';\n}\n?>"
      },
      {
        num: 5,
        diff: "easy",
        title: "Somme 1-100",
        desc: "Calculer la somme <code>1 + 2 + 3 + ... + 100</code> a l'aide d'une boucle. Stocker le resultat dans une variable <code>$s</code> puis l'afficher. Resultat attendu : <code>5050</code>. Boucle obligatoire (pas de formule mathematique directe).",
        sol: "<?php\n$s = 0;\nfor ($i = 1; $i <= 100; $i++) {\n    $s += $i;\n}\necho $s; // 5050\n?>"
      },
      {
        num: 6,
        diff: "medium",
        title: "Categorie age",
        desc: "A partir d'une variable <code>$age</code>, afficher la categorie : <code>Mineur</code> si <code>$age &lt; 18</code>, <code>Adulte</code> si <code>18 &le; $age &lt; 65</code>, <code>Senior</code> sinon. Utiliser une chaine <code>if / elseif / else</code>. Tester avec <code>$age = 23</code>.",
        sol: "<?php\n$age = 23;\nif ($age < 18)      echo 'Mineur';\nelseif ($age < 65) echo 'Adulte';\nelse                echo 'Senior';\n?>"
      },
      {
        num: 7,
        diff: "medium",
        title: "Table de 7",
        desc: "Afficher la table de multiplication par 7, de <code>7 x 1 = 7</code> jusqu'a <code>7 x 10 = 70</code>. Une ligne par produit, separees par <code>&lt;br&gt;</code>. Utiliser une boucle <code>for</code> et l'interpolation de chaine pour formater chaque ligne.",
        sol: "<?php\nfor ($i = 1; $i <= 10; $i++) {\n    echo \"7 x $i = \" . (7 * $i) . '<br>';\n}\n?>"
      },
      {
        num: 8,
        diff: "medium",
        title: "FizzBuzz",
        desc: "Classique d'entretien et de TD : pour les entiers de 1 a 30, afficher <code>Fizz</code> si divisible par 3, <code>Buzz</code> si divisible par 5, <code>FizzBuzz</code> si divisible par 15. Attention a l'ordre des conditions : tester d'abord le cas combine (15) sinon il ne se declenchera jamais. Chaque resultat separe par un espace.",
        sol: "<?php\nfor ($i = 1; $i <= 30; $i++) {\n    if    ($i % 15 === 0) echo 'FizzBuzz ';\n    elseif ($i %  3 === 0) echo 'Fizz ';\n    elseif ($i %  5 === 0) echo 'Buzz ';\n    else                   echo $i . ' ';\n}\n?>"
      },
      {
        num: 9,
        diff: "medium",
        title: "Switch role universite",
        desc: "A partir d'une variable <code>$role</code> contenant <code>\"admin\"</code>, <code>\"prof\"</code> ou <code>\"etudiant\"</code>, afficher respectivement <code>Administrateur</code>, <code>Professeur</code> ou <code>Etudiant</code>. Toute autre valeur affiche <code>Inconnu</code>. Utiliser <code>switch</code> avec <code>break</code> apres chaque cas pour eviter le fall-through.",
        sol: "<?php\n$role = 'admin';\nswitch ($role) {\n    case 'admin':    echo 'Administrateur'; break;\n    case 'prof':     echo 'Professeur';     break;\n    case 'etudiant': echo 'Etudiant';       break;\n    default:         echo 'Inconnu';\n}\n?>"
      },
      {
        num: 10,
        diff: "medium",
        title: "Compte a rebours",
        desc: "Afficher un compte a rebours de 10 a 1 (chaque nombre separe par un espace), puis <code>Decollage!</code> a la fin. Utiliser une boucle <code>while</code> (pas <code>for</code>). Sortie attendue : <code>10 9 8 7 6 5 4 3 2 1 Decollage!</code>.",
        sol: "<?php\n$i = 10;\nwhile ($i >= 1) {\n    echo $i . ' ';\n    $i--;\n}\necho 'Decollage!';\n?>"
      },
      {
        num: 11,
        diff: "hard",
        title: "Filtrer etudiants admis",
        desc: "Soit un tableau d'etudiants, chacun ayant les cles <code>nom</code> et <code>note</code>. Parcourir avec <code>foreach</code> et n'afficher que le <code>nom</code> des etudiants dont la <code>note</code> est >= 10 (admis), un par ligne avec <code>&lt;br&gt;</code>. Pattern d'examen classique CNAM pour <em>Exercice 1</em> Tableaux.",
        sol: "<?php\n$etudiants = [\n    ['nom'=>'Chadi','note'=>14],\n    ['nom'=>'Lina', 'note'=>8],\n    ['nom'=>'Ali',  'note'=>17],\n];\nforeach ($etudiants as $e) {\n    if ($e['note'] >= 10) echo $e['nom'] . '<br>';\n}\n?>"
      },
      {
        num: 12,
        diff: "hard",
        title: "Triangle d'etoiles",
        desc: "Afficher un triangle d'etoiles aligne a gauche, hauteur 5 lignes. Ligne 1 : <code>*</code>, ligne 2 : <code>**</code>, ..., ligne 5 : <code>*****</code>. Chaque ligne separee par <code>&lt;br&gt;</code>. Utiliser <code>str_repeat()</code> pour generer les etoiles de chaque ligne.",
        sol: "<?php\nfor ($i = 1; $i <= 5; $i++) {\n    echo str_repeat('*', $i) . '<br>';\n}\n?>"
      },
      {
        num: 13,
        diff: "hard",
        title: "Min / Max",
        desc: "Trouver le minimum et le maximum dans un tableau de nombres sans utiliser <code>min()</code> ou <code>max()</code> (interdites pour l'exercice). Initialiser <code>$min</code> et <code>$max</code> au premier element, parcourir le reste avec <code>foreach</code>, mettre a jour a chaque comparaison. Afficher au format <code>min=X, max=Y</code>.",
        sol: "<?php\n$a = [14, 7, 22, 9, 3, 18];\n$min = $max = $a[0];\nforeach ($a as $v) {\n    if ($v < $min) $min = $v;\n    if ($v > $max) $max = $v;\n}\necho \"min=$min, max=$max\";\n?>"
      },
      {
        num: 14,
        diff: "hard",
        title: "Premier impair",
        desc: "Soit un tableau d'entiers. Trouver le premier nombre impair et afficher son index et sa valeur sous la forme <code>Index: i, valeur: v</code>. Sortir de la boucle (<code>break</code>) des qu'on l'a trouve, sinon on continue inutilement. Si aucun impair n'existe, ne rien afficher.",
        sol: "<?php\n$a = [4, 8, 2, 7, 6, 3];\nforeach ($a as $i => $v) {\n    if ($v % 2 !== 0) {\n        echo \"Index: $i, valeur: $v\";\n        break;\n    }\n}\n?>"
      },
      {
        num: 15,
        diff: "hard",
        title: "Inverser chaine",
        desc: "Inverser une chaine caractere par caractere sans utiliser la fonction <code>strrev()</code> (interdite). Construire la chaine inversee dans une boucle <code>for</code> qui decremente depuis <code>strlen($s) - 1</code> jusqu'a 0. Tester avec <code>$s = \"NFA042\"</code> -> resultat attendu <code>240AFN</code>.",
        sol: "<?php\n$s = 'NFA042';\n$r = '';\nfor ($i = strlen($s) - 1; $i >= 0; $i--) {\n    $r .= $s[$i];\n}\necho $r; // 240AFN\n?>"
      },
      {
        num: 16,
        diff: "extreme",
        title: "Multiples de 3",
        desc: "Afficher tous les multiples de 3 entre 1 et 30 inclus, separes par un espace. Utiliser une boucle <code>for</code> et l'operateur modulo <code>%</code>. Sortie attendue : <code>3 6 9 12 15 18 21 24 27 30</code>.",
        sol: "<?php\nfor ($i = 1; $i <= 30; $i++) {\n    if ($i % 3 === 0) echo $i . ' ';\n}\n// 3 6 9 12 15 18 21 24 27 30\n?>"
      },
      {
        num: 17,
        diff: "extreme",
        title: "in_array",
        desc: "Soit un tableau <code>$arr</code> et une valeur <code>$x</code>. Verifier si <code>$x</code> est present dans le tableau en mode strict (<code>in_array($x, $arr, true)</code>). Si oui, recuperer son index via <code>array_search()</code> et afficher <code>Trouve a l'index i</code>. Sinon, afficher <code>Absent</code>.",
        sol: "<?php\n$arr = ['lb', 'fr', 'us', 'de'];\n$x   = 'fr';\nif (in_array($x, $arr, true)) {\n    $i = array_search($x, $arr);\n    echo \"Trouve a l'index $i\";\n} else {\n    echo 'Absent';\n}\n?>"
      },
      {
        num: 18,
        diff: "extreme",
        title: "Tri etudiants admis par note",
        desc: "A partir d'un tableau d'etudiants (chacun avec <code>nom</code>, <code>matiere</code>, <code>note</code>), garder uniquement ceux en NFA042 ayant note >= 10 (<code>array_filter()</code> avec une fonction flechee), puis trier par note decroissante (<code>usort()</code> + operateur <code>&lt;=&gt;</code>). Afficher chaque etudiant avec sa note. Combine filtre + tri — pattern recurrent des exams CNAM.",
        sol: "<?php\n$etudiants = [\n    ['nom'=>'Chadi','matiere'=>'NFA042','note'=>14],\n    ['nom'=>'Lina', 'matiere'=>'NFA040','note'=>16],\n    ['nom'=>'Ali',  'matiere'=>'NFA042','note'=>17],\n    ['nom'=>'Sami', 'matiere'=>'NFA042','note'=>7],\n];\n$admis = array_filter($etudiants,\n    fn($e) => $e['matiere'] === 'NFA042' && $e['note'] >= 10);\nusort($admis, fn($a, $b) => $b['note'] <=> $a['note']);\nforeach ($admis as $e) echo $e['nom'] . ' : ' . $e['note'] . '<br>';\n?>"
      },
      {
        num: 19,
        diff: "extreme",
        title: "Pyramide centree",
        desc: "Afficher une pyramide d'etoiles centree de hauteur 5. Chaque ligne contient <code>2i-1</code> etoiles precedees de <code>h-i</code> espaces insecables <code>&amp;nbsp;</code> pour le centrage. Lignes separees par <code>&lt;br&gt;</code>. Utiliser deux <code>str_repeat()</code> par ligne.",
        sol: "<?php\n$h = 5;\nfor ($i = 1; $i <= $h; $i++) {\n    echo str_repeat('&nbsp;', $h - $i)\n       . str_repeat('*', 2 * $i - 1)\n       . '<br>';\n}\n?>"
      },
      {
        num: 20,
        diff: "extreme",
        title: "Mini calculatrice",
        desc: "Ecrire une fonction <code>calc($a, $b, $op)</code> qui prend deux nombres et un operateur (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>) et retourne le resultat. Cas particuliers : division par zero retourne <code>Erreur: /0</code>, operateur inconnu retourne <code>Operateur invalide</code>. Tester avec <code>calc(10, 3, \"+\")</code> et <code>calc(10, 0, \"/\")</code>.",
        sol: "<?php\nfunction calc($a, $b, $op) {\n    switch ($op) {\n        case '+': return $a + $b;\n        case '-': return $a - $b;\n        case '*': return $a * $b;\n        case '/': return ($b == 0) ? 'Erreur: /0' : $a / $b;\n        default:  return 'Operateur invalide';\n    }\n}\necho calc(10, 3, '+'); // 13\necho calc(10, 0, '/'); // Erreur: /0\n?>"
      }
    ],
    problemes: [
      {
        num: 101,
        diff: "extreme",
        title: "Problème 01",
        desc: "<b>TD 01 CNAM — sujet officiel.</b><br><br>Créez une fonction PHP appelée verifier_age qui prend en paramètre l'âge de l'utilisateur et vérifie si c'est un nombre\r<br>entier. La fonction doit retourner vrai si c'est le cas, sinon faux.<br><br><i>Source : <code>documents/PHP_UNI/TD 01-16_Questions_Solution.pdf</code>. Solution extraite du PDF officiel (accolades reconstruites par heuristique — verifier si necessaire).</i>",
        sol: "// === TD 1 CNAM — solution officielle ===\n<?php\r\n$age = 12.3;\r\n\r\necho verifier_age_3($age);\r\nfunction verifier_age_1($age) {\n\r\n   if(intval($age) === $age) return true;\r\n   return false;\r\n}\r\nfunction verifier_age_2($age) {\n  return is_int($age);\r\n}\r\nfunction verifier_age_3($age) {\n  return gettype($age) == \"integer\";\r\n}"
      },
      {
        num: 102,
        diff: "extreme",
        title: "Problème 02",
        desc: "<b>TD 02 CNAM — sujet officiel.</b><br><br>Créez une fonction PHP appelée traiter_chaine qui prend une chaîne de caractères en entrée. La fonction doit vérifier si la\r<br>chaîne est vide, puis retourner la longueur de la chaîne et la chaîne inversée sous forme de tableau.<br><br><i>Source : <code>documents/PHP_UNI/TD 01-16_Questions_Solution.pdf</code>. Solution extraite du PDF officiel (accolades reconstruites par heuristique — verifier si necessaire).</i>",
        sol: "// === TD 2 CNAM — solution officielle ===\n<?php\r\n$myString = \"Cnam Bickfaya\";\r\n// $myString = \"\";\r\n\r\nprint_r(traiter_chaine($myString));\r\n\r\nfunction traiter_chaine($myString) {\n  $result = [\r\n     \"length\" => strlen($myString) {\n     \"reversedString\" => str_split(strrev($myString))\r\n  ];\r\n  // La fonction doit vérifier si la chaîne est vide\r\n  // Option 1: strlen\r\n  if(strlen($myString) == 0) return false;\r\n  // Option 2: empty\r\n  if(empty($myString)) return false;\r\n\r\n  return $result;\r\n}"
      },
      {
        num: 103,
        diff: "extreme",
        title: "Problème 03",
        desc: "<b>TD 03 CNAM — sujet officiel.</b><br><br>Créez une fonction PHP appelée afficher_jours_semaine qui crée un tableau contenant les jours de la semaine.\r<br>Ensuite, utilisez une boucle dans cette fonction pour afficher chaque jour de la semaine sur une nouvelle ligne.<br><br><i>Source : <code>documents/PHP_UNI/TD 01-16_Questions_Solution.pdf</code>. Solution extraite du PDF officiel (accolades reconstruites par heuristique — verifier si necessaire).</i>",
        sol: "// === TD 3 CNAM — solution officielle ===\n<?php\r\nfunction afficher_jours_semaine() {\n\r\n  $jours_semaine = [\"Lundi\", \"Mardi\", \"Mercredi\", \"Jeudi\", \"Vendredi\", \"Samedi\", \"Dimanche\"];\r\n  foreach($jours_semaine as $jour) echo \"$jour <br>\";\r\n}\r\n\r\nafficher_jours_semaine();\r\necho \"<br>\";\r\n/* End OF Solution */\r\n\r\n// How can I generate and display the dates for today and the next seven days in the following format:\r\n// Day of the week followed by the day of the month (e.g., \"Wednesday 20\", \"Thursday 21\")?\r\n$todaysDate = new DateTime();\r\n$currentDate = clone $todaysDate;\r\n$iterations = 0;\r\nwhile(true) {\n\r\n  echo $currentDate->format('l d') . \"<br>\";\r\n  $currentDate->modify('+1 day');\r\n  if($currentDate->diff($todaysDate)->days == 7) break;\r\n}\r\n// Thursday 06 Friday 07 Saturday 08 Sunday 09 Monday 10 Tuesday 11 Wednesday 12"
      },
      {
        num: 104,
        diff: "extreme",
        title: "Problème 04",
        desc: "<b>TD 04 CNAM — sujet officiel.</b><br><br>Créez une fonction PHP appelée modifier_variable_globale qui prend en paramètre une valeur et qui modifie une\r<br>variable globale nommée $_GLOBALS['variable_globale'] pour lui attribuer cette valeur. Ensuite, écrivez une autre\r<br>fonction appelée afficher_variable_globale qui affiche la valeur de $_GLOBALS['variable_globale']. Enfin, utilisez\r<br>ces deux fonctions pour modifier et afficher la variable globale $_GLOBALS['variable_globale'] dans le script\r<br>principal.<br><br><i>Source : <code>documents/PHP_UNI/TD 01-16_Questions_Solution.pdf</code>. Solution extraite du PDF officiel (accolades reconstruites par heuristique — verifier si necessaire).</i>",
        sol: "// === TD 4 CNAM — solution officielle ===\n<?php\r\nfunction modifier_variable_globale($valeur) {\n\r\n  $GLOBALS*'variable_globale'+ = $valeur;\r\n}\r\n\r\nfunction afficher_variable_globale() {\n  if(isset($GLOBALS*'variable_globale'])) echo $GLOBALS*'variable_globale'];\r\n  else echo \"La variable \\$_GLOBALS*'variable_globale'+ n'existe pas.\";\r\n\r\n}\r\n\r\nmodifier_variable_globale(\"Cnam Bickfaya\");\r\nafficher_variable_globale();"
      },
      {
        num: 105,
        diff: "extreme",
        title: "EXAM 2023-2024 Session 2 — Ex.1 Compléter le code (2 pts)",
        desc: "<b>Sujet officiel CNAM NFA042 2023-2024 Session 2, Exercice 1 (2 pts).</b><br><br>Exercice 1 - Compléter le code – 2 points\r<br>\r<br>    a. Vérification si les deux chaînes ont la même longueur\r<br>\r<br>     $string1 = \"Hello\";\r<br>     $string2 = \"World\";\r<br>\r<br>    if ( strlen($string1) == strlen($string2) ) {\r<br>\r<br>             echo \"Les deux chaînes ont une longueur égale\";\r<br>     }\r<br>\r<br>    b. Affichage des diviseurs de 3 entre 1 et 30\r<br>\r<br>     for ($i = 1; $i &lt;= 30; $i++) {\r<br>\r<br>        if ( $i % 3 == 0 ) {\r<br>\r<br>                echo $i . \" \";\r<br>           }\r<br>     }\r<br>\r<br>    c. Vérification si une chaîne contient une sous-chaîne spécifique\r<br>\r<br>     $string1 = \"Bonjour, comment ça va ?\";\r<br>     $string2 = \"comment\";\r<br>     if (strpos($string1, $string2) !== false) {\r<br>\r<br>             echo $string1 . \" contient \" . $string2;\r<br>     }\r<br>\r<br>    d. Recherche d'un élément dans un tableau\r<br>\r<br>     $array = array(2, 4, 6, 8, 10);\r<br>     $searchValue = 6;\r<br>\r<br>    if ( in_array($searchValue, $array) ) {\r<br>\r<br>             echo \"$searchValue existe dans le tableau\";\r<br>     }<br><br><i>Source : <code>documents/PHP_UNI/NFA042 - 2023-2024 Session 2 + Solution.pdf</code>. Extraction PDF officielle.</i>",
        sol: "// === EXAM 2023-2024 Session 2 — Ex.1 Compléter le code (2 pts) — solution non incluse dans le PDF, a ecrire ===\n<?php\n// TODO\n?>"
      }
    ]
  },
  {
    id: "day-2",
    code: "J2",
    title: {
      fr: "Jour 2 - chap2 Arrays, Dates, Math, Functions",
      en: "Day 2 - chap2 Arrays, Dates, Math, Functions"
    },
    sub: {
      fr: "Tableaux, DateTime, fonctions mathematiques, define - CNAM chap2",
      en: "Arrays, DateTime, math functions, define - CNAM chap2"
    },
    why: {
      fr: "Garanti 3-4 points : Exercice 2 recurrent depuis 2023. Maitrise les 5 patterns chap2 : arrays, DateTime, math, fonctions typees, define.",
      en: "Guaranteed 3-4 points: recurring Exercise 2 since 2023. Master the 5 chap2 patterns: arrays, DateTime, math, typed functions, define."
    },
    tags: [
      "chap2",
      "functions",
      "arrays",
      "datetime",
      "math",
      "define"
    ],
    sections: [
      {
        h: "Definir une fonction",
        blocks: [
          {
            p: "Une fonction en PHP est declaree avec <code>function</code>. On peut typer les parametres et le retour (recommande depuis PHP 7)."
          },
          {
            code: "<?php\n// Fonction simple\nfunction direBonjour() {\n    echo 'Bonjour NFA042';\n}\ndireBonjour();\n\n// Avec parametres typees + type de retour\nfunction additionner(int $a, int $b): int {\n    return $a + $b;\n}\necho additionner(5, 3); // 8\n\n// Avec valeur par defaut\nfunction saluer(string $nom = 'etudiant'): string {\n    return \"Bonjour $nom\";\n}\necho saluer();        // Bonjour etudiant\necho saluer('Chadi'); // Bonjour Chadi",
            out: "Bonjour NFA042\n8\nBonjour etudiant\nBonjour Chadi"
          },
          {
            tip: "Le typage est <strong>fortement recommande</strong> en exam : ca documente le code, evite des bugs, et les correcteurs apprecient."
          },
          {
            warn: "Les parametres avec valeur par defaut doivent <strong>toujours etre apres</strong> ceux sans defaut, sinon deprecation PHP 8."
          },
          {
            try: "Que retourne <code>function f() { $x = 5; }</code> apres <code>echo f();</code> ?",
            ans: "<code>NULL</code> (rien affiche). Sans <code>return</code>, une fonction retourne implicitement null."
          }
        ]
      },
      {
        h: "Arrays - le type le plus utilise",
        blocks: [
          {
            p: "En PHP, un <code>array</code> est super versatile : il peut etre <strong>indexe</strong> (numerique) ou <strong>associatif</strong> (cle-valeur), ou les deux melanges."
          },
          {
            code: "<?php\n// Array indexe\n$jours = ['Lun', 'Mar', 'Mer'];\n$jours[] = 'Jeu';            // ajout en fin\necho $jours[0];               // Lun\necho count($jours);           // 4\n\n// Array associatif\n$etudiant = [\n    'nom'      => 'Chadi',\n    'age'      => 23,\n    'matieres' => ['NFA042', 'NFA040'],\n];\necho $etudiant['nom'];\nforeach ($etudiant as $k => $v) {\n    echo \"$k = \" . print_r($v, true) . '<br>';\n}",
            out: "Lun\n4\nChadi"
          },
          {
            p: "Les <strong>fonctions essentielles</strong> a connaitre pour l'exam :"
          },
          {
            table: [
              [
                "Categorie",
                "Fonctions cles"
              ],
              [
                "Tri",
                "<code>sort, rsort, asort, ksort, usort</code>"
              ],
              [
                "Recherche",
                "<code>in_array, array_search, array_key_exists</code>"
              ],
              [
                "Transformation",
                "<code>array_map, array_filter, array_reduce</code>"
              ],
              [
                "Combinaison",
                "<code>array_merge, array_diff, array_intersect, array_combine</code>"
              ],
              [
                "String <-> Array",
                "<code>implode(',', $arr)</code>, <code>explode(',', $str)</code>"
              ],
              [
                "Comptage",
                "<code>count, array_count_values, array_unique</code>"
              ]
            ]
          },
          {
            code: "<?php\n$nums = [4, 1, 7, 3, 9];\n\nsort($nums);                              // tri natif\n$doubles = array_map(fn($n) => $n * 2, $nums);\n$pairs   = array_filter($nums, fn($n) => $n % 2 === 0);\n$total   = array_reduce($nums, fn($c, $n) => $c + $n, 0);\n\necho implode(', ', $doubles);            // 2, 6, 8, 14, 18\necho \"\\nTotal: $total\";                   // Total: 24",
            out: "2, 6, 8, 14, 18\nTotal: 24"
          },
          {
            try: "Comment ajouter en debut d'un tableau ?",
            ans: "<code>array_unshift($arr, $val)</code>. (<code>array_push</code> ajoute en fin, equivalent a <code>$arr[] = $val</code>.)"
          }
        ]
      },
      {
        h: "Strings : trim, sprintf, number_format",
        blocks: [
          {
            p: "Les manipulations de chaines reviennent dans tous les examens. Memorise ces fonctions :"
          },
          {
            code: "<?php\n$s = '  Bonjour NFA042  ';\necho strlen($s);              // 18 (avec espaces)\necho strlen(trim($s));        // 14\n\necho strtolower($s);          // bonjour nfa042\necho strtoupper($s);          // BONJOUR NFA042\necho ucfirst('hello');        // Hello\necho ucwords('chadi khoder'); // Chadi Khoder\n\necho str_replace('NFA042', 'NFA040', $s);\necho substr('Bonjour', 0, 3); // Bon\necho strpos('Bonjour', 'jour'); // 3\n\necho str_repeat('-', 5);      // -----\n\n// Formatage de nombres (super utile)\necho number_format(1500000, 0, '.', ' '); // 1 500 000\necho number_format(99.5, 2);              // 99.50\n\n// printf / sprintf\nprintf('Note: %5.2f / 20', 14.5);         // Note: 14.50 / 20",
            out: "18\n14"
          },
          {
            note: "<code>number_format($n, $decimals, $decSep, $thousandSep)</code> est l'outil ideal pour afficher des prix : <code>number_format(1500, 0, '.', ' ')</code> donne <code>1 500</code>."
          },
          {
            try: "Que retourne <code>trim('  hello  ')</code> ?",
            ans: "<code>'hello'</code> sans espaces. Tres utilise avant validation : <code>trim($_POST['email'])</code>."
          }
        ]
      },
      {
        h: "Fonctions mathematiques (chap2)",
        blocks: [
          {
            p: "Les fonctions math sont garanties au QCM CNAM. Source : <code>chap2/Fonctions Mathematiques en PHP.docx</code> et <code>chap2/pi.docx</code>."
          },
          {
            code: "<?php\n// Constantes\necho M_PI;              // 3.1415926535898\necho pi();              // 3.1415926535898 (equivalent)\necho M_E;               // 2.718281828\n\n// Arrondi\necho round(3.7);        // 4   (au plus proche)\necho round(3.14159, 2); // 3.14\necho ceil(3.1);         // 4   (entier superieur)\necho floor(3.9);        // 3   (entier inferieur)\necho intval(3.9);       // 3   (troncature)\n\n// Puissance, racine, abs\necho pow(2, 10);        // 1024\necho 2 ** 10;           // 1024 (operateur ** PHP 5.6+)\necho sqrt(144);         // 12\necho abs(-7);           // 7\n\n// Min / max\necho min(4, 9, 2, 7);   // 2\necho max(4, 9, 2, 7);   // 9\necho min([4, 9, 2, 7]); // 2  (sur tableau)\n\n// Aleatoire\necho rand(1, 100);      // entre 1 et 100\necho mt_rand(1, 100);   // version rapide\n\n// Trigonometrie (rare en exam)\necho sin(M_PI / 2);     // 1\necho cos(0);            // 1",
            out: "3.1415926535898"
          },
          {
            note: "<code>round($x, $n)</code> arrondit au plus proche (4.5 -> 5). <code>ceil</code> arrondit toujours au SUP, <code>floor</code> toujours a l'INF, <code>intval</code> tronque (jette les decimales)."
          },
          {
            try: "Quelle est la difference entre <code>round(3.5)</code> et <code>(int) 3.5</code> ?",
            ans: "<code>round(3.5)</code> = 4 (arrondi au plus proche). <code>(int) 3.5</code> = 3 (cast tronque). Piege QCM classique."
          }
        ]
      },
      {
        h: "define() et constantes (chap2)",
        blocks: [
          {
            p: "<code>define()</code> declare une constante globale, non modifiable apres. Source : <code>chap2/La fonction define.docx</code>. Tres present dans les exams (config DB)."
          },
          {
            code: "<?php\n// Syntaxe : define(nom, valeur, case_insensitive = false)\ndefine('PI_APPROX', 3.14);\ndefine('DB_HOST', 'localhost');\ndefine('MAX_LOGIN', 3);\n\necho PI_APPROX;       // 3.14 (pas de $ devant !)\necho DB_HOST;         // localhost\n\n// Verifier qu'une constante existe\nif (defined('DB_HOST')) {\n    echo 'OK config chargee';\n}\n\n// Alternative PHP moderne (>= 5.3) : const\nconst APP_NAME = 'NFA042 Tracker';\necho APP_NAME;\n\n// Constante magique courantes\necho __FILE__;        // chemin absolu du fichier\necho __LINE__;        // numero de ligne\necho __DIR__;         // dossier du fichier\necho __FUNCTION__;    // nom de la fonction courante",
            out: "3.14\nlocalhost\nOK config chargee\nNFA042 Tracker"
          },
          {
            table: [
              [
                "",
                "<code>define()</code>",
                "<code>const</code>"
              ],
              [
                "Visibilite",
                "Globale (runtime)",
                "Compile-time, scope class"
              ],
              [
                "Expression dynamique",
                "OUI : <code>define('X', 2+3)</code>",
                "NON : valeur litterale"
              ],
              [
                "Conditionnel",
                "OUI : dans <code>if</code>",
                "NON : top-level seulement"
              ],
              [
                "Classes",
                "NON",
                "OUI"
              ]
            ]
          },
          {
            warn: "Une constante ne se prefixe <strong>JAMAIS</strong> avec <code>$</code> : <code>echo PI;</code>, pas <code>echo $PI;</code>. Piege n.1 du QCM."
          },
          {
            try: "Que se passe-t-il si on fait <code>define('X', 1); define('X', 2);</code> ?",
            ans: "PHP genere un <strong>Warning : Constant X already defined</strong> et garde la PREMIERE valeur (1). Une constante est immuable."
          }
        ]
      },
      {
        h: "DateTime - dates et durees",
        blocks: [
          {
            p: "Pour manipuler les dates en PHP moderne, utilise la classe <code>DateTime</code> plutot que les fonctions procedurales comme <code>date()</code> ou <code>strtotime()</code>."
          },
          {
            code: "<?php\n// Creer une date\n$dt = new DateTime('2026-05-24');\n$dt = new DateTime();        // maintenant\n\n// Depuis un format precis (valide aussi le format !)\n$dt = DateTime::createFromFormat('Y-m-d', '2026-05-24');\nif (!$dt || $dt->format('Y-m-d') !== '2026-05-24') {\n    die('Date invalide');\n}\n\n// Modifier\n$dt->modify('+10 day');\n$dt->modify('-2 month');\n$dt->modify('next monday');\n\n// Formater\necho $dt->format('Y-m-d');         // 2026-06-03\necho $dt->format('d/m/Y H:i');     // 03/06/2026 00:00\n\n// Difference entre dates\n$diff = (new DateTime())->diff(new DateTime('2003-05-24'));\necho \"Age: $diff->y ans, $diff->m mois\";"
          },
          {
            tip: "Pour <strong>valider</strong> qu'une date saisie est bien au format attendu : <code>DateTime::createFromFormat</code> + verifier <code>$dt-&gt;format(...) === $input</code>. C'est plus strict que <code>strtotime</code>."
          },
          {
            try: "Quelle methode pour ajouter 7 jours a <code>$dt</code> ?",
            ans: "<code>$dt-&gt;modify('+7 day')</code> ou <code>$dt-&gt;add(new DateInterval('P7D'))</code>."
          }
        ]
      },
      {
        h: "Checklist chap2 - a maitriser avant Day 3",
        blocks: [
          {
            p: "Au bout de ce jour tu dois pouvoir, sans aide :"
          },
          {
            list: [
              "Definir une fonction <strong>typee</strong> (params + retour) : <code>function f(int $a): bool { ... }</code>",
              "Choisir entre array indexe et associatif et iterer avec <code>foreach ($arr as $k =&gt; $v)</code>",
              "Connaitre les 6 categories de fonctions array : tri, recherche, transformation, combinaison, string<->array, comptage",
              "Manipuler <code>DateTime</code> : construire, modifier (<code>modify('+10 day')</code>), comparer (<code>diff()</code>), formater",
              "<strong>Valider strictement</strong> une date saisie : <code>DateTime::createFromFormat</code> + verifier <code>format(...) === input</code>",
              "Utiliser les fonctions math : <code>round</code>, <code>ceil</code>, <code>floor</code>, <code>abs</code>, <code>pow</code>, <code>sqrt</code>, <code>min</code>, <code>max</code>",
              "Declarer une constante avec <code>define()</code> ou <code>const</code> et expliquer la difference",
              "Formater un nombre : <code>number_format($n, $dec, '.', ' ')</code> pour les milliers"
            ]
          },
          {
            tip: "Source CNAM : <code>documents/PHP_UNI/chap2/</code> (16 docx). Priorite : <code>tableaux en php.docx</code>, <code>La classe DateTime en PHP.docx</code>, <code>Fonctions Mathematiques en PHP.docx</code>, <code>La fonction define.docx</code>."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Comment definir une fonction qui retourne un entier en PHP ?",
        opts: [
          "<code>function f() : int { return 1; }</code>",
          "<code>int f() { return 1; }</code>",
          "<code>function int f() { return 1; }</code>",
          "<code>function f() returns int { ... }</code>"
        ],
        correct: "a",
        expl: "Le type de retour se met <strong>apres</strong> les parametres avec <code>:</code>. Syntaxe : <code>function nom(params): typeRetour { ... }</code>."
      },
      {
        q: "Quelle fonction transforme <code>['a','b','c']</code> en <code>'a,b,c'</code> ?",
        opts: [
          "<code>explode</code>",
          "<code>join</code>",
          "<code>implode</code>",
          "Les deux b et c"
        ],
        correct: "d",
        expl: "<code>implode</code> et <code>join</code> sont des alias : <code>implode(',', $arr)</code>. <code>explode</code> fait l'inverse (string -> array)."
      },
      {
        q: "Pour valider un email, le mieux est :",
        opts: [
          "<code>strpos($e, '@')</code>",
          "<code>preg_match</code> avec regex",
          "<code>filter_var($e, FILTER_VALIDATE_EMAIL)</code>",
          "<code>is_email($e)</code>"
        ],
        correct: "c",
        expl: "<code>filter_var</code> avec <code>FILTER_VALIDATE_EMAIL</code> est la methode officielle, robuste et standard. Les regex maison oublient des cas valides."
      },
      {
        q: "Que retourne <code>round(2.5)</code> en PHP ?",
        opts: [
          "<code>2</code>",
          "<code>3</code>",
          "<code>2.5</code>",
          "<code>NULL</code>"
        ],
        correct: "b",
        expl: "<code>round(2.5)</code> = <b>3</b> (arrondi au plus proche, mode HALF_UP par defaut : 0.5 va vers le haut). Piege : <code>(int) 2.5</code> donne <b>2</b> (cast tronque, jette les decimales). Comprendre la difference entre <code>round</code>, <code>ceil</code>, <code>floor</code>, <code>intval</code> = 4 questions QCM potentielles."
      },
      {
        q: "Comment ajouter 10 jours a une date en PHP moderne ?",
        opts: [
          "<code>$dt + 10</code>",
          "<code>strtotime('+10 day', $dt)</code>",
          "<code>$dt-&gt;modify('+10 day')</code>",
          "<code>date_add($dt, 10)</code>"
        ],
        correct: "c",
        expl: "Avec la classe <code>DateTime</code>, on utilise <code>$dt-&gt;modify('+10 day')</code>. Lisible, chainable, gere les fins de mois correctement."
      }
    ],
    exercises: [
      {
        num: 1,
        diff: "easy",
        title: "square",
        desc: "Ecrire une fonction <code>square(int $n): int</code> qui retourne le carre de <code>$n</code> (c'est-a-dire <code>$n * $n</code>). Le type de parametre et le type de retour doivent etre <strong>declares explicitement</strong> (<code>int</code> en entree, <code>int</code> en sortie). Tester avec <code>square(9)</code> qui doit renvoyer <code>81</code>.",
        sol: "<?php\nfunction square(int $n): int {\n    return $n * $n;\n}\necho square(9); // 81\n?>"
      },
      {
        num: 2,
        diff: "easy",
        title: "isEven",
        desc: "Ecrire une fonction <code>isEven(int $n): bool</code> qui retourne <code>true</code> si <code>$n</code> est pair, <code>false</code> sinon. Utiliser l'operateur modulo <code>%</code> et la comparaison <strong>stricte</strong> <code>===</code>. <strong>Pattern d'examen :</strong> la signature doit imposer <code>int</code> en entree et <code>bool</code> en sortie — c'est ce que les correcteurs regardent en premier.",
        sol: "<?php\nfunction isEven(int $n): bool {\n    return $n % 2 === 0;\n}\nvar_dump(isEven(4)); // true\n?>"
      },
      {
        num: 3,
        diff: "easy",
        title: "foreach fruits",
        desc: "Soit un tableau <code>$fruits = [\"pomme\", \"banane\", \"kiwi\"]</code>. Parcourir le tableau avec une boucle <code>foreach</code> et afficher chaque fruit sur sa propre ligne (separe par <code>&lt;br&gt;</code>). Ne pas utiliser d'index numerique : utiliser la forme <code>foreach ($fruits as $f)</code>.",
        sol: "<?php\n$fruits = ['pomme', 'banane', 'kiwi'];\nforeach ($fruits as $f) {\n    echo $f . '<br>';\n}\n?>"
      },
      {
        num: 4,
        diff: "easy",
        title: "count_words",
        desc: "Ecrire une fonction <code>count_words(string $s): int</code> qui compte le nombre de mots dans une chaine, separes par des espaces. Decouper la chaine avec <code>explode(\" \", trim($s))</code>, puis compter avec <code>count()</code>. Le <code>trim</code> est important pour eviter les espaces parasites en debut/fin qui creeraient des mots vides. Tester avec <code>\"Vive le Liban\"</code> → <code>3</code>.",
        sol: "<?php\nfunction count_words(string $s): int {\n    return count(explode(' ', trim($s)));\n}\necho count_words('Vive le Liban'); // 3\n?>"
      },
      {
        num: 5,
        diff: "easy",
        title: "capitalize",
        desc: "Ecrire une fonction <code>capitalize(string $s): string</code> qui transforme la chaine en commencant par une <strong>majuscule</strong> et le reste en <strong>minuscules</strong>. Exemples : <code>capitalize(\"CHADI\")</code> → <code>\"Chadi\"</code>, <code>capitalize(\"aLi\")</code> → <code>\"Ali\"</code>, <code>capitalize(\"\")</code> → <code>\"\"</code>. Combiner <code>ucfirst()</code> et <code>strtolower()</code>.",
        sol: "<?php\nfunction capitalize(string $s): string {\n    return ucfirst(strtolower($s));\n}\necho capitalize('CHADI'); // Chadi\n?>"
      },
      {
        num: 6,
        diff: "medium",
        title: "sum_array",
        desc: "Ecrire une fonction <code>sum_array(array $a): float</code> qui calcule la somme des elements d'un tableau de nombres. <strong>Contrainte :</strong> ne PAS utiliser <code>array_sum()</code> — implementer la somme avec une boucle <code>foreach</code> pour demontrer la maitrise des boucles. Tester avec <code>[10, 20, 30]</code> → <code>60</code>, <code>[]</code> → <code>0</code>.",
        sol: "<?php\nfunction sum_array(array $a): float {\n    $total = 0;\n    foreach ($a as $v) $total += $v;\n    return $total;\n}\necho sum_array([10, 20, 30]); // 60\n?>"
      },
      {
        num: 7,
        diff: "medium",
        title: "average",
        desc: "Ecrire une fonction <code>average(array $v): float</code> qui retourne la moyenne arithmetique des elements d'un tableau. <strong>Cas particulier :</strong> si le tableau est vide, retourner <code>0</code> (eviter la division par zero). Utiliser <code>array_sum()</code> + <code>count()</code>. Tests : <code>[10, 20, 30]</code> → <code>20</code>, <code>[]</code> → <code>0</code>.",
        sol: "<?php\nfunction average(array $v): float {\n    if (count($v) === 0) return 0;\n    return array_sum($v) / count($v);\n}\necho average([10, 20, 30]); // 20\n?>"
      },
      {
        num: 8,
        diff: "medium",
        title: "contains_admin",
        desc: "Ecrire une fonction <code>contains_admin(array $users): bool</code> qui retourne <code>true</code> si au moins un utilisateur du tableau a un <code>role</code> egal a <code>\"admin\"</code>, <code>false</code> sinon. Chaque utilisateur est un tableau associatif avec au moins la cle <code>role</code>. <strong>Optimisation :</strong> retourner <code>true</code> immediatement des qu'un admin est trouve (early return) pour ne pas parcourir tout le tableau.",
        sol: "<?php\nfunction contains_admin(array $users): bool {\n    foreach ($users as $u) {\n        if ($u['role'] === 'admin') return true;\n    }\n    return false;\n}\n?>"
      },
      {
        num: 9,
        diff: "medium",
        title: "format_amount",
        desc: "Ecrire une fonction <code>format_amount(float $amount): string</code> qui formate un montant en euros avec un <strong>espace</strong> comme separateur de milliers et <strong>aucune decimale</strong>. Exemples : <code>format_amount(1500)</code> → <code>\"1 500 EUR\"</code>, <code>format_amount(1500000)</code> → <code>\"1 500 000 EUR\"</code>. Utiliser <code>number_format($n, 0, \".\", \" \")</code>. <strong>Pattern d'examen recurrent CNAM :</strong> formatage de montants.",
        sol: "<?php\nfunction format_amount(float $amount): string {\n    return number_format($amount, 0, '.', ' ') . ' EUR';\n}\necho format_amount(1500000); // 1 500 000 EUR\n?>"
      },
      {
        num: 10,
        diff: "medium",
        title: "init_capitals",
        desc: "Ecrire une fonction <code>init_capitals(string $s): string</code> qui met la <strong>premiere lettre de chaque mot</strong> en majuscule et le reste en minuscules. Differente de <code>capitalize()</code> qui ne traite que le premier mot. Exemples : <code>init_capitals(\"chadi khoder\")</code> → <code>\"Chadi Khoder\"</code>, <code>init_capitals(\"ALI BAKER\")</code> → <code>\"Ali Baker\"</code>. Combiner <code>ucwords()</code> + <code>strtolower()</code>.",
        sol: "<?php\nfunction init_capitals(string $s): string {\n    return ucwords(strtolower($s));\n}\necho init_capitals('chadi khoder'); // Chadi Khoder\n?>"
      },
      {
        num: 11,
        diff: "hard",
        title: "array_combine notes",
        desc: "<strong>Exercice chap2 type CNAM.</strong> Ecrire une fonction <code>fusionner_notes(array $noms, array $notes): array</code> qui combine deux tableaux paralleles en un tableau associatif <code>nom =&gt; note</code>. Utiliser <code>array_combine($keys, $values)</code>. <strong>Cas d'erreur :</strong> si les deux tableaux n'ont pas la meme taille, retourner un tableau vide. <br><br><strong>Test :</strong> <code>fusionner_notes([\"Chadi\",\"Ali\"], [14, 17])</code> → <code>[\"Chadi\"=&gt;14, \"Ali\"=&gt;17]</code>.",
        sol: "<?php\nfunction fusionner_notes(array $noms, array $notes): array {\n    if (count($noms) !== count($notes)) return [];\n    return array_combine($noms, $notes);\n}\nprint_r(fusionner_notes(['Chadi','Ali'], [14, 17]));\n?>"
      },
      {
        num: 12,
        diff: "hard",
        title: "checkSize",
        desc: "Ecrire une fonction <code>checkSize(string $size): bool</code> qui retourne <code>true</code> si <code>$size</code> est <strong>exactement</strong> <code>\"S\"</code>, <code>\"M\"</code>, ou <code>\"L\"</code>, <code>false</code> sinon (casse stricte, pas de <code>\"s\"</code>). Utiliser <code>in_array()</code> avec le 3e argument <code>true</code> pour le mode strict. <strong>Piege classique :</strong> sans le mode strict, <code>in_array(0, [\"S\", \"M\", \"L\"])</code> renvoie true en PHP &lt; 8 (juggling).",
        sol: "<?php\nfunction checkSize(string $size): bool {\n    return in_array($size, ['S', 'M', 'L'], true);\n}\n?>"
      },
      {
        num: 13,
        diff: "hard",
        title: "addDays",
        desc: "Ecrire une fonction <code>addDays(string $date, int $n): string</code> qui prend une date au format <code>\"Y-m-d\"</code>, ajoute <code>$n</code> jours, et retourne la nouvelle date au meme format. Utiliser la classe <code>DateTime</code> + la methode <code>modify(\"+$n day\")</code>. Exemple : <code>addDays(\"2026-05-24\", 10)</code> → <code>\"2026-06-03\"</code>. La fonction doit gerer correctement les <strong>fins de mois</strong> et les <strong>annees bissextiles</strong>.",
        sol: "<?php\nfunction addDays(string $date, int $n): string {\n    $dt = new DateTime($date);\n    $dt->modify(\"+$n day\");\n    return $dt->format('Y-m-d');\n}\necho addDays('2026-05-24', 10); // 2026-06-03\n?>"
      },
      {
        num: 14,
        diff: "hard",
        title: "formatCurrency",
        desc: "Ecrire une fonction <code>formatCurrency(float $amount, string $currency): string</code> qui retourne le montant formate avec <strong>2 decimales</strong> suivi du code devise en <strong>majuscules</strong>. Exemples : <code>formatCurrency(150, \"usd\")</code> → <code>\"150.00 USD\"</code>, <code>formatCurrency(1234.5, \"eur\")</code> → <code>\"1234.50 EUR\"</code>, <code>formatCurrency(0, \"lbp\")</code> → <code>\"0.00 LBP\"</code>. Utiliser <code>number_format()</code> et <code>strtoupper()</code>.",
        sol: "<?php\nfunction formatCurrency(float $amount, string $currency): string {\n    return number_format($amount, 2) . ' ' . strtoupper($currency);\n}\necho formatCurrency(150, 'usd'); // 150.00 USD\n?>"
      },
      {
        num: 15,
        diff: "hard",
        title: "checkDir",
        desc: "Ecrire une fonction <code>checkDir(string $path): void</code> qui cree un dossier s'il n'existe pas, en mode <strong>recursif</strong> (creer aussi les dossiers parents manquants). Utiliser <code>is_dir()</code> pour le test, puis <code>mkdir($path, 0777, true)</code> avec le 3e argument <code>true</code>. Test : <code>checkDir(\"uploads/\" . date(\"Y/m/d\"))</code> doit creer toute l'arborescence meme si <code>uploads</code> est absent. <strong>Pattern d'examen :</strong> obligatoire pour les uploads (exercice 4).",
        sol: "<?php\nfunction checkDir(string $path): void {\n    if (!is_dir($path)) {\n        mkdir($path, 0777, true);\n    }\n}\ncheckDir('uploads/' . date('Y/m/d'));\n?>"
      },
      {
        num: 16,
        diff: "extreme",
        title: "calculateAge",
        desc: "Ecrire une fonction <code>calculateAge(string $birthdate): int|string</code> qui calcule l'age en annees a partir d'une date de naissance au format <code>\"Y-m-d\"</code>. <br><br><strong>Cas particuliers :</strong><br>• Format invalide (ex: <code>\"24-05-2003\"</code>) → retourner <code>\"Format invalide\"</code><br>• Date future (ex: 2030) → retourner <code>\"Date future\"</code><br>• Date valide → retourner l'age en annees (entier)<br><br>Utiliser <code>DateTime::createFromFormat()</code> pour valider strictement le format, puis <code>->diff()</code> pour calculer l'ecart.",
        sol: "<?php\nfunction calculateAge(string $birthdate): int|string {\n    $d = DateTime::createFromFormat('Y-m-d', $birthdate);\n    if (!$d || $d->format('Y-m-d') !== $birthdate) {\n        return 'Format invalide';\n    }\n    $now = new DateTime();\n    if ($d > $now) return 'Date future';\n    return $now->diff($d)->y;\n}\necho calculateAge('2003-05-24'); // 22\n?>"
      },
      {
        num: 17,
        diff: "extreme",
        title: "isDateWithinRange",
        desc: "Ecrire une fonction <code>isDateWithinRange(string $start, string $end, string $date): bool</code> qui retourne <code>true</code> si <code>$date</code> est compris entre <code>$start</code> et <code>$end</code> (<strong>inclus aux deux bornes</strong>). Toutes les dates sont au format ISO <code>Y-m-d</code>. Utiliser <code>strtotime()</code> pour convertir en timestamps, puis comparer. Test : <code>isDateWithinRange(\"2026-01-01\", \"2026-12-31\", \"2026-05-24\")</code> → <code>true</code>.",
        sol: "<?php\nfunction isDateWithinRange(string $start, string $end, string $date): bool {\n    return strtotime($start) <= strtotime($date)\n        && strtotime($date)  <= strtotime($end);\n}\nvar_dump(isDateWithinRange('2026-01-01', '2026-12-31', '2026-05-24')); // true\n?>"
      },
      {
        num: 18,
        diff: "extreme",
        title: "surface_cercle (math chap2)",
        desc: "<strong>Exercice chap2 type CNAM.</strong> Ecrire une fonction <code>surface_cercle(float $rayon): float</code> qui retourne la surface d'un cercle avec la formule <code>pi * r^2</code>, <strong>arrondie a 2 decimales</strong>. Utiliser la constante <code>M_PI</code> ou la fonction <code>pi()</code>, et <code>round($x, 2)</code> pour l'arrondi. <strong>Bonus :</strong> si <code>$rayon &lt; 0</code>, retourner <code>0</code>.<br><br><strong>Tests :</strong><br>• <code>surface_cercle(5)</code> → <code>78.54</code><br>• <code>surface_cercle(0)</code> → <code>0</code><br>• <code>surface_cercle(-3)</code> → <code>0</code>",
        sol: "<?php\nfunction surface_cercle(float $rayon): float {\n    if ($rayon < 0) return 0;\n    return round(M_PI * pow($rayon, 2), 2);\n}\necho surface_cercle(5);  // 78.54\necho surface_cercle(0);  // 0\n?>"
      },
      {
        num: 19,
        diff: "extreme",
        title: "define + config (chap2)",
        desc: "<strong>Exercice chap2 type CNAM.</strong> Definir 3 constantes pour une mini-app NFA042 :<br>• <code>APP_NAME</code> = <code>\"NFA042 Tracker\"</code><br>• <code>NOTE_MAX</code> = <code>20</code><br>• <code>SEUIL_ADMIS</code> = <code>10</code><br><br>Puis ecrire une fonction <code>est_admis(float $note): bool</code> qui retourne <code>true</code> si la note >= <code>SEUIL_ADMIS</code> ET &lt;= <code>NOTE_MAX</code>. <strong>Contrainte :</strong> ne pas hardcoder les valeurs 10 et 20 dans la fonction — utiliser les constantes. <br><br><strong>Tests :</strong><br>• <code>est_admis(14)</code> → <code>true</code><br>• <code>est_admis(8)</code> → <code>false</code><br>• <code>est_admis(25)</code> → <code>false</code> (depasse NOTE_MAX)",
        sol: "<?php\ndefine('APP_NAME',    'NFA042 Tracker');\ndefine('NOTE_MAX',    20);\ndefine('SEUIL_ADMIS', 10);\n\nfunction est_admis(float $note): bool {\n    return $note >= SEUIL_ADMIS && $note <= NOTE_MAX;\n}\nvar_dump(est_admis(14));  // true\nvar_dump(est_admis(8));   // false\nvar_dump(est_admis(25));  // false\n?>"
      },
      {
        num: 20,
        diff: "extreme",
        title: "stats_notes (integration chap2)",
        desc: "<strong>Integration chap2 type exam CNAM.</strong> Ecrire une fonction <code>stats_notes(array $etudiants): array</code> qui calcule des statistiques sur un tableau d'etudiants (chacun avec cles <code>nom</code> et <code>note</code>).<br><br><strong>Retourner un tableau associatif avec :</strong><br>• <code>moyenne</code> : moyenne arithmetique arrondie a 2 decimales (<code>array_sum</code> + <code>count</code> + <code>round</code>)<br>• <code>min</code> : note minimale (<code>min()</code> sur un array_column)<br>• <code>max</code> : note maximale (<code>max()</code>)<br>• <code>nb_admis</code> : nombre d'etudiants avec note >= 10 (<code>array_filter</code> + <code>count</code>)<br>• <code>meilleur</code> : <code>nom</code> de l'etudiant avec la meilleure note (<code>usort</code> ou <code>array_search</code>)<br><br>Si le tableau est vide, retourner <code>[]</code>. <strong>Pattern recurrent CNAM :</strong> combine 5 fonctions chap2 en une integration.",
        sol: "<?php\nfunction stats_notes(array $etudiants): array {\n    if (count($etudiants) === 0) return [];\n    $notes = array_column($etudiants, 'note');\n    $admis = array_filter($etudiants, fn($e) => $e['note'] >= 10);\n    $best  = null;\n    foreach ($etudiants as $e) {\n        if ($best === null || $e['note'] > $best['note']) $best = $e;\n    }\n    return [\n        'moyenne'  => round(array_sum($notes) / count($notes), 2),\n        'min'      => min($notes),\n        'max'      => max($notes),\n        'nb_admis' => count($admis),\n        'meilleur' => $best['nom'],\n    ];\n}\nprint_r(stats_notes([\n    ['nom'=>'Chadi','note'=>14],\n    ['nom'=>'Lina', 'note'=>8],\n    ['nom'=>'Ali',  'note'=>17],\n]));\n?>"
      }
    ],
    problemes: [
      {
        num: 101,
        diff: "extreme",
        title: "Problème 05",
        desc: "<b>TD 05 CNAM — sujet officiel.</b><br><br>Créez une fonction PHP appelée afficher_date_heure qui affiche la date et l'heure actuelles au format\r<br>\"jour/mois/année heure:minute:seconde\".<br><br><i>Source : <code>documents/PHP_UNI/TD 01-16_Questions_Solution.pdf</code>. Solution extraite du PDF officiel (accolades reconstruites par heuristique — verifier si necessaire).</i>",
        sol: "// === TD 5 CNAM — solution officielle ===\n<?php\r\n// Créez une fonction PHP appelée afficher_date_heure qui affiche la date et l'heure actuelles au format\r\n\"jour/mois/année heure:minute:seconde\".\r\n\r\n// Option 1 en utilisant Date()\r\nfunction afficher_date_heure_1() {\n\r\n  echo Date(\"d/m/Y H:i:s\");\r\n}\r\n\r\n// Option 2 en utilisant new DateTime()\r\nfunction afficher_date_heure_2() {\n\r\n  $currentTime = new DateTime();\r\n  echo $currentTime->format(\"d/m/Y H:i:s\");\r\n}\r\n\r\nafficher_date_heure_1();\r\nafficher_date_heure_2();"
      },
      {
        num: 102,
        diff: "extreme",
        title: "Problème 06",
        desc: "<b>TD 06 CNAM — sujet officiel.</b><br><br>Question 1\r<br>\r<br>Soit le tableau \"students\" suivant:\r<br>\r<br>$students = array(\r<br>       array(\"Name\", \"Age\", \"Country\"),\r<br>       array(\"John\", 25, \"USA\"),\r<br>       array(\"Alice\", 30, \"UK\"),\r<br>       array(\"Bob\", 22, \"Canada\"),\r<br>       array(\"Emily\", 28, \"Australia\"),\r<br>       array(\"David\", 35, \"Germany\")\r<br>\r<br>);\r<br>\r<br>Créez une fonction PHP appelée afficher_tableau qui prend en paramètre un tableau (array) et qui affiche un tableau\r<br>en HTML en tenant compte que le premier élément du tableau (array) sera les titres du tableau HTML.\r<br>\r<br>Question 2\r<br>\r<br>Chaque ligne du tableau HTML doit avoir une couleur différente : la première ligne en gris, la deuxième en blanc, la troisième\r<br>en gris, la quatrième en blanc, etc.<br><br><i>Source : <code>documents/PHP_UNI/TD 01-16_Questions_Solution.pdf</code>. Solution extraite du PDF officiel (accolades reconstruites par heuristique — verifier si necessaire).</i>",
        sol: "// === TD 6 CNAM — solution officielle ===\n<?php\r\nfunction afficher_tableau($myArray)\r\n,\r\n\r\n  if (sizeof($myArray) == 0)\r\n     exit();\r\n\r\n  $html = \"<table border='1' cellspacing='0' cellpadding='5'>\";\r\n  $html .= \"<thead class='headerRow'>\";\r\n  for ($i = 0; $i < sizeof($myArray*0]); $i+])\r\n     $html .= \"<th>\" . $myArray*0+*$i+ . \"</th>\";\r\n\r\n  $html .= \"</thead>\";\r\n  $html .= \"<tbody>\";\r\n\r\n  array_shift($myArray); // We removed the first row (element) of $myArray\r\n  // We used array_shift to refresh our memory. We could use for($i=1; $i<sizeof($myArray); $i+])\r\n\r\n  $count = 1;\r\n  foreach ($myArray as $row) {\n\r\n     $rowClassName = $count % 2 == 0 ? \"evenRow\" : \"oddRow\";\r\n     $html .= \"<tr class='$rowClassName'>\";\r\n\r\n     foreach ($row as $cell)\r\n        $html .= \"<td>\" . $cell . \"</td>\";\r\n\r\n     $html .= \"</tr>\";\r\n     $count+];\r\n}\r\n\r\n  $html .= \"</tbody>\";\r\n  $html .= \"</table>\";\r\n  return $html;\r\n}\r\n\r\n$students = array(\r\n  array(\"Name\", \"Age\", \"Country\") {\n  array(\"John\", 25, \"USA\") {\n  array(\"Alice\", 30, \"UK\") {\n  array(\"Bob\", 22, \"Canada\") {\n  array(\"Emily\", 28, \"Australia\") {\n  array(\"David\", 35, \"Germany\")\r\n\r\n);\r\n?>\r\n\r\n<html>\r\n\r\n<head>\r\n  <style>\r\n     .oddRow ,\r\n        background-color: #fff;\r\n}\r\n\r\n     .evenRow ,\r\n        background-color: #ddd;\r\n\r\n}\r\n\r\n     .headerRow ,\r\n        background-color: #555;\r\n        color: #fff;\r\n\r\n}\r\n  </style>\r\n</head>\r\n<body>\r\n  <?= afficher_tableau($students); ?>\r\n\r\n</body>\r\n\r\n</html>\r\n\r\n<?php\r\nfunction afficher_tableau($myArray) {\n\r\n  if(sizeof($myArray) == 0) exit();\r\n  $html = \"<table border='1' cellspacing='0' cellpadding='5'>\";\r\n  $html .= \"<thead class='headerRow'>\";\r\n\r\n  $keys = array_keys($myArray*0]);\r\n  for($i=0; $i<sizeof($keys); $i+]) $html .= \"<th>\".$keys*$i+.\"</th>\";\r\n\r\n  $html .= \"</thead>\";\r\n  $html .= \"<tbody>\";\r\n\r\n  $count = 1;\r\n  foreach($myArray as $row) {\n\r\n     $rowClassName = $count%2==0?\"evenRow\":\"oddRow\";\r\n     $html .= \"<tr class='$rowClassName'>\";\r\n\r\n     foreach($row as $key=>$value) $html .= \"<td class='$key'>\".$value.\"</td>\";\r\n\r\n     $html .= \"</tr>\";\r\n     $count+];\r\n}\r\n\r\n  $html .= \"</tbody>\";\r\n  $html .= \"</table>\";\r\n  return $html;\r\n}\r\n\r\n$students = array(\r\n  array(\"Name\"=>\"John\", \"Age\"=>25, \"Country\"=>\"USA\") {\n  array(\"Name\"=>\"Alice\", \"Age\"=>30, \"Country\"=>\"UK\") {\n  array(\"Name\"=>\"Bob\", \"Age\"=>22, \"Country\"=>\"Canada\") {\n  array(\"Name\"=>\"Emily\", \"Age\"=>28, \"Country\"=>\"Australia\") {\n  array(\"Name\"=>\"David\", \"Age\"=>35, \"Country\"=>\"Germany\") {\n\r\n);\r\n?>\r\n\r\n<html>\r\n  <head>\r\n     <style>\r\n        .oddRow,\r\n          background-color:#fff;\r\n}\r\n        .evenRow,\r\n          background-color:#ddd;\r\n}\r\n        .headerRow,\r\n\r\n          background-color:#555;\r\n          color:#fff;\r\n}\r\n     </style>\r\n  </head>\r\n  <body>\r\n     <?= afficher_tableau($students); ?>\r\n  </body>\r\n</html>"
      },
      {
        num: 103,
        diff: "extreme",
        title: "EXAM 2023-2024 Session 1 — Ex.3 Fonctions Diverses (4 pts)",
        desc: "<b>Sujet officiel CNAM NFA042 2023-2024 Session 1, Exercice 3 (4 pts).</b><br><br>Exercice 3 - Fonctions Diverses – 4 points\r<br>\r<br>    a. Créer une fonction checkName($nom) qui doit vérifier si le nom d’une personne est une chaîne de\r<br>         caractères de longueur supérieure à 3 et qu'il ne contient aucun caractère spécial ou des nombres.\r<br>         (Il faut utiliser une expression régulière pour cette vérification.) (1 point)\r<br>         Réponse :\r<br>\r<br>          function checkName($nom) {\r<br>                 if (preg_match('/^[a-zA-Z]{4,}$/', $nom)) {\r<br>                       return true;\r<br>                 }\r<br>                 return false;\r<br>\r<br>          }\r<br>\r<br>    b. Créer une fonction checkSize($size) afin de vérifier si la taille ($size) est un élément du tableau suivant :\r<br>         $sizes = ['S', 'M', 'L']; (1 point)\r<br>         Réponse :\r<br>\r<br>          function checkSize($size) {\r<br>                 $sizes = ['S', 'M', 'L'];\r<br>                 if (in_array($size, $sizes)) return true;\r<br>                 else return false;\r<br>\r<br>          }\r<br>    c. Créer une fonction addDays($date, $nbDays) qui ajoute des jours ($nbDays) à la date $date. (2 points)\r<br>\r<br>         Réponse :\r<br>\r<br>          function addDays($date, $nbDays) {\r<br>                 $dateTime = new DateTime($date);\r<br>                 $dateTime-&gt;modify(\"+{$nbDays} day\");\r<br>                 return $dateTime-&gt;format('Y-m-d');\r<br>\r<br>          }<br><br><i>Source : <code>documents/PHP_UNI/NFA042 - 2023-2024 Session 1 + Solution.pdf</code>. Extraction PDF officielle.</i>",
        sol: "// === EXAM 2023-2024 Session 1 — Ex.3 Fonctions Diverses (4 pts) — solution non incluse dans le PDF, a ecrire ===\n<?php\n// TODO\n?>"
      },
      {
        num: 104,
        diff: "extreme",
        title: "EXAM 2023-2024 Session 2 — Ex.2 Fonctions Diverses (3 pts)",
        desc: "<b>Sujet officiel CNAM NFA042 2023-2024 Session 2, Exercice 2 (3 pts).</b><br><br>Exercice 2 - Fonctions Diverses – 3 points\r<br>\r<br>    a. Créer une fonction calculateAge($birthdate) qui calcule l'âge (en année) d'une personne à partir\r<br>         de sa date de naissance $birthdate. La fonction doit valider que le format de la date est correct\r<br>         (Y-m-d) et que la date envoyée n’est pas dans le futur. (2 points)\r<br>         Exemple d'utilisation : calculateAge('2000-05-15') doit retourner 24\r<br>         Réponse :\r<br>\r<br>           function calculateAge($birthdate) {\r<br>                   $date = DateTime::createFromFormat('Y-m-d', $birthdate);\r<br>                   if (!$date || $date-&gt;format('Y-m-d') !== $birthdate) {\r<br>                          return \"Format de date invalide. Utilisez 'Y-m-d'.\";\r<br>                   }\r<br>                   $currentDate = new DateTime();\r<br>                   if ($date &gt; $currentDate) {\r<br>                          return \"La date de naissance ne peut pas être dans le futur.\";\r<br>                   }\r<br>                   $age = $currentDate-&gt;diff($date)-&gt;y;\r<br>                   return $age;\r<br>\r<br>           }\r<br>    b. Créez une fonction formatCurrency($amount, $currency) qui prend en paramètre une somme\r<br>         d'argent ($amount) et une devise ($currency). La fonction doit retourner la somme formatée\r<br>         avec deux chiffres après la virgule, suivie du symbole de la devise. (1 point)\r<br>         Exemple d'utilisation : formatCurrency(150, 'USD') doit retourner 150.00 USD.\r<br>         Réponse :\r<br>\r<br>           function formatCurrency($amount, $currency) {\r<br>                 $formattedAmount = number_format($amount, 2);\r<br>                 return $formattedAmount . ' ' . $currency;\r<br>\r<br>           }<br><br><i>Source : <code>documents/PHP_UNI/NFA042 - 2023-2024 Session 2 + Solution.pdf</code>. Extraction PDF officielle.</i>",
        sol: "// === EXAM 2023-2024 Session 2 — Ex.2 Fonctions Diverses (3 pts) — solution non incluse dans le PDF, a ecrire ===\n<?php\n// TODO\n?>"
      }
    ]
  },
  {
    id: "day-3",
    code: "J3",
    title: {
      fr: "Jour 3 - chap3+chap4 Regex, Forms, Validation",
      en: "Day 3 - chap3+chap4 Regex, Forms, Validation"
    },
    sub: {
      fr: "Regex (chap3) + Forms / filter_var / htmlspecialchars / file I/O / mkdir (chap4)",
      en: "Regex (chap3) + Forms / filter_var / htmlspecialchars / file I/O / mkdir (chap4)"
    },
    why: {
      fr: "CNAM chap3+chap4 = Exercice 3 de TOUS les examens depuis 2022. Le boilerplate (valider POST + sanitize + redirect) est identique chaque annee. A memoriser ce soir.",
      en: "CNAM chap3+chap4 = Exercise 3 of EVERY exam since 2022. The validate-POST + sanitize + redirect boilerplate is identical every year. Memorise it tonight."
    },
    tags: [
      "chap3",
      "chap4",
      "regex",
      "forms",
      "POST",
      "filter_var",
      "file",
      "mkdir"
    ],
    sections: [
      {
        h: "Superglobales : ou viennent les donnees ?",
        blocks: [
          {
            p: "PHP recupere les donnees envoyees par l'utilisateur dans des <strong>superglobales</strong> (tableaux automatiques disponibles partout) :"
          },
          {
            table: [
              [
                "Variable",
                "Source"
              ],
              [
                "<code>$_GET</code>",
                "Query string : <code>page.php?id=5&amp;sort=asc</code>"
              ],
              [
                "<code>$_POST</code>",
                "Form data (<code>method=\"POST\"</code>)"
              ],
              [
                "<code>$_FILES</code>",
                "Fichiers uploades (form <code>enctype</code>)"
              ],
              [
                "<code>$_SERVER</code>",
                "Infos requete (URI, METHOD, IP, headers)"
              ],
              [
                "<code>$_SESSION</code>",
                "Donnees de session (apres <code>session_start</code>)"
              ],
              [
                "<code>$_COOKIE</code>",
                "Cookies envoyes par le navigateur"
              ]
            ]
          },
          {
            warn: "Eviter <code>$_REQUEST</code> qui combine GET + POST + COOKIE : c'est ambigu et source de bugs/securite."
          }
        ]
      },
      {
        h: "Regex - patterns d'exam (chap3)",
        blocks: [
          {
            p: "Les regex sont garanties au CNAM (chap3 : <code>La fonction preg_match_all.docx</code>, <code>modificateurs.docx</code>, <code>unicode.docx</code>) pour valider nom, email, telephone, date, password. PHP utilise PCRE avec <code>preg_match($pattern, $str)</code>."
          },
          {
            code: "<?php\n// Nom (lettres + espaces, >= 3 chars)\npreg_match('/^[a-zA-Z\\s]{3,}$/', 'Chadi');     // 1\npreg_match('/^[a-zA-Z\\s]{3,}$/', 'Ab');         // 0\n\n// Email (regex simple - chap3 type exam)\npreg_match(\n    '/^[a-zA-Z][a-zA-Z0-9._]*@[a-zA-Z]{2,}\\.[a-zA-Z]{2,}$/',\n    'chadi@univ.fr'\n); // 1\n\n// Date format Y-m-d\npreg_match('/^\\d{4}-\\d{2}-\\d{2}$/', '2026-05-24'); // 1\n\n// Mot de passe fort (>=8, 1 maj, 1 min, 1 chiffre)\nif (strlen($p) >= 8\n    && preg_match('/[A-Z]/', $p)\n    && preg_match('/[a-z]/', $p)\n    && preg_match('/\\d/', $p)) { /* OK */ }\n\n// preg_match_all - compter toutes les occurrences\npreg_match_all('/\\d+/', 'TD12 et TD15 et TD03', $m);\nprint_r($m[0]); // ['12','15','03']"
          },
          {
            table: [
              [
                "Modificateur",
                "Effet"
              ],
              [
                "<code>i</code>",
                "Insensible a la casse"
              ],
              [
                "<code>m</code>",
                "Multi-ligne (<code>^</code>/<code>$</code> matchent chaque ligne)"
              ],
              [
                "<code>s</code>",
                "<code>.</code> matche aussi les retours-ligne"
              ],
              [
                "<code>u</code>",
                "Unicode (caracteres accentues : <code>e</code>, <code>a</code>...)"
              ],
              [
                "<code>x</code>",
                "Ignore espaces et commentaires dans le pattern"
              ]
            ]
          },
          {
            note: "Le delimiteur le plus commun est <code>/</code>. Si la regex contient des <code>/</code>, utilise <code>#</code> ou <code>~</code> : <code>preg_match('#^/api/.*$#', $url)</code>."
          },
          {
            warn: "<code>preg_match</code> retourne <strong>1</strong> (match), <strong>0</strong> (pas de match) ou <strong>false</strong> (erreur). Pour bool strict : <code>(bool) preg_match(...)</code>."
          }
        ]
      },
      {
        h: "Le pattern de validation a memoriser",
        blocks: [
          {
            p: "Ce squelette est present dans 5/5 examens. Memorise-le par coeur :"
          },
          {
            code: "<?php\n$errors = [];\n\nif ($_SERVER['REQUEST_METHOD'] === 'POST') {\n\n    // 1. Verifier presence des champs\n    foreach (['nom', 'email'] as $field) {\n        if (empty($_POST[$field])) {\n            $errors[$field] = \"Le champ $field est requis\";\n        }\n    }\n\n    if (empty($errors)) {\n        // 2. Sanitize + validate nom\n        $nom = htmlspecialchars(trim($_POST['nom']));\n        if (!preg_match('/^[a-zA-Z\\s]{3,}$/', $nom)) {\n            $errors['nom'] = 'Nom invalide';\n        }\n\n        // 3. Sanitize + validate email\n        $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);\n        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {\n            $errors['email'] = 'Email invalide';\n        }\n\n        // 4. Si tout OK, traitement (insert DB, mail, etc.)\n        if (empty($errors)) {\n            // INSERT INTO ... + redirect\n            header('Location: merci.php');\n            exit;\n        }\n    }\n\n} else {\n    // Methode non autorisee (ex: PUT, DELETE...)\n    http_response_code(405);\n    die('Methode invalide');\n}\n\n// Si on arrive ici : afficher le formulaire (et $errors)"
          },
          {
            tip: "Suis toujours l'ordre : <strong>1) check methode -> 2) presence -> 3) sanitize -> 4) validate -> 5) traitement -> 6) redirect</strong>. Tout ce qui ne suit pas cet ordre = points en moins."
          }
        ]
      },
      {
        h: "filter_var - le bon reflexe pour valider",
        blocks: [
          {
            p: "<code>filter_var</code> est l'outil officiel PHP pour <strong>sanitize</strong> (nettoyer) ou <strong>validate</strong> (verifier) une valeur :"
          },
          {
            code: "<?php\n// Email\nfilter_var($x, FILTER_VALIDATE_EMAIL);   // false ou string\nfilter_var($x, FILTER_SANITIZE_EMAIL);    // nettoyage\n\n// Entier (avec contraintes)\nfilter_var($x, FILTER_VALIDATE_INT, [\n    'options' => ['min_range' => 1, 'max_range' => 100]\n]);\n\n// URL\nfilter_var($x, FILTER_VALIDATE_URL);\n\n// IP (v4 ou v6)\nfilter_var($x, FILTER_VALIDATE_IP);\n\n// Sanitize XSS\nfilter_var($x, FILTER_SANITIZE_FULL_SPECIAL_CHARS);\n\n// Float (avec separateurs)\nfilter_var($x, FILTER_VALIDATE_FLOAT, [\n    'options' => ['decimal' => '.']\n]);"
          },
          {
            note: "<code>filter_var</code> retourne <code>false</code> si la valeur est invalide, sinon la valeur (eventuellement filtree). Toujours tester avec <code>!== false</code> en strict."
          }
        ]
      },
      {
        h: "Sanitize : XSS et htmlspecialchars",
        blocks: [
          {
            p: "Le <strong>XSS</strong> (Cross-Site Scripting) est l'injection de HTML/JS dans tes pages. Si un user envoie <code>&lt;script&gt;alert(1)&lt;/script&gt;</code> et tu l'affiches tel quel : XSS reussi."
          },
          {
            code: "<?php\n// MAUVAIS - faille XSS\necho 'Bonjour ' . $_POST['nom'];\n\n// BON - htmlspecialchars convertit <,>,&,\",'\necho 'Bonjour ' . htmlspecialchars(\n    $_POST['nom'],\n    ENT_QUOTES,        // echapper aussi les quotes\n    'UTF-8'\n);\n\n// Helper raccourci\nfunction e($s) {\n    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');\n}\necho 'Bonjour ' . e($_POST['nom']);"
          },
          {
            bad: "NE JAMAIS faire <code>echo $_POST['x']</code> directement. C'est une faille XSS automatique et les correcteurs sanctionnent fort (-1pt minimum)."
          },
          {
            try: "Quelle est la difference entre <code>htmlspecialchars</code> et <code>strip_tags</code> ?",
            ans: "<code>htmlspecialchars</code> <strong>echappe</strong> (transforme <code>&lt;</code> en <code>&amp;lt;</code>) -- l'utilisateur voit son texte mais le navigateur ne l'execute pas. <code>strip_tags</code> <strong>supprime</strong> les balises. <code>htmlspecialchars</code> est preferable car non destructif."
          }
        ]
      },
      {
        h: "File I/O et mkdir (chap4)",
        blocks: [
          {
            p: "chap4 CNAM (<code>file.docx</code>, <code>file_put_contents.docx</code>, <code>La fonction mkdir.docx</code>) : manipulations de fichiers. <strong>Indispensable</strong> pour Q3-Q4 (upload + CSV)."
          },
          {
            code: "<?php\n// Lecture (3 facons)\n$contenu = file_get_contents('data.txt');     // tout le fichier en string\n$lignes  = file('data.txt');                  // tableau de lignes\n$lignes  = file('data.txt', FILE_IGNORE_NEW_LINES); // sans les \\n\n\n// Iteration ligne par ligne (gros fichiers)\n$h = fopen('big.log', 'r');\nwhile (($line = fgets($h)) !== false) {\n    echo trim($line) . \"\\n\";\n}\nfclose($h);\n\n// Ecriture\nfile_put_contents('out.txt', \"Bonjour\\n\");          // ecrase\nfile_put_contents('out.txt', \"Ligne 2\\n\", FILE_APPEND); // append\n\n// Tests d'existence\nif (file_exists('data.txt')) { ... }\nif (is_dir('uploads'))       { ... }\nif (is_writable('data.txt')) { ... }\n\n// CSV (Q4 exam recurrent)\n$rows = array_map('str_getcsv', file('etudiants.csv'));\nforeach ($rows as $r) {\n    [$nom, $note] = $r;\n    echo \"$nom : $note\\n\";\n}"
          },
          {
            p: "<strong>mkdir recursif</strong> (chap4) — obligatoire pour les uploads dates :"
          },
          {
            code: "<?php\n// Creer uploads/2026/05 meme si uploads/2026 n'existe pas\n$path = 'uploads/' . date('Y/m');\nif (!is_dir($path)) {\n    mkdir($path, 0777, true);  // le 3e arg = recursif\n}\n\n// Apres upload\nmove_uploaded_file($_FILES['photo']['tmp_name'], \"$path/photo.jpg\");"
          },
          {
            warn: "<code>file_put_contents</code> sans <code>FILE_APPEND</code> <strong>ecrase</strong> le fichier. Piege classique : on perd l'historique."
          },
          {
            try: "Quelle est la difference entre <code>file()</code> et <code>file_get_contents()</code> ?",
            ans: "<code>file($path)</code> retourne un <strong>tableau de lignes</strong> (chaque ligne avec son <code>\\n</code> final par defaut). <code>file_get_contents($path)</code> retourne <strong>tout le fichier en une seule string</strong>. Pour iterer ligne par ligne, <code>file()</code> est plus pratique."
          }
        ]
      },
      {
        h: "Redirection avec header()",
        blocks: [
          {
            p: "Apres avoir traite un POST avec succes, il faut <strong>rediriger</strong> (pattern Post-Redirect-Get) pour eviter le double-submit. Toujours faire <code>exit;</code> apres."
          },
          {
            code: "<?php\n// Redirection simple\nheader('Location: merci.php');\nexit; // CRITIQUE : sinon le code en dessous continue !\n\n// Avec parametre\nheader('Location: profile.php?id=' . $userId);\nexit;\n\n// Code HTTP custom\nhttp_response_code(404);\ndie('Page introuvable');\n\nhttp_response_code(405);\ndie('Methode non autorisee');\n\nhttp_response_code(302);"
          },
          {
            bad: "Oublier <code>exit;</code> apres <code>header('Location: ...')</code> est un bug critique : le code en dessous continue d'executer (DB queries, mails...), et la redirection arrive trop tard."
          },
          {
            warn: "Tout appel a <code>header()</code> doit etre fait <strong>avant tout output HTML</strong>. Un seul espace avant <code>&lt;?php</code> et c'est <em>Headers already sent</em>."
          }
        ]
      },
      {
        h: "mail() - envoyer un email (exam 2023-24)",
        blocks: [
          {
            p: "PHP a une fonction <code>mail()</code> native. Limitee mais largement utilisee a l'exam :"
          },
          {
            code: "<?php\n$to      = 'etudiant@cnam.fr';\n$subject = 'Confirmation inscription';\n$message = \"Bonjour {$nom},\\nVotre compte est cree.\";\n$headers  = \"From: noreply@cnam.fr\\r\\n\";\n$headers .= \"Reply-To: contact@cnam.fr\\r\\n\";\n$headers .= \"Content-Type: text/plain; charset=UTF-8\\r\\n\";\n\nif (mail($to, $subject, $message, $headers)) {\n    echo 'Email envoye';\n} else {\n    echo 'Erreur envoi';\n}"
          },
          {
            warn: "<strong>JAMAIS</strong> mettre une variable utilisateur dans le header <code>From:</code> sans validation : risque d'email-injection / spoofing. Garder un From: fixe."
          }
        ]
      },
      {
        h: "Checklist chap3+chap4 - a maitriser avant Day 4",
        blocks: [
          {
            p: "Au bout de ce jour tu dois pouvoir, sans aide :"
          },
          {
            list: [
              "<strong>Regex (chap3)</strong> : ecrire <code>preg_match</code> pour nom, email, date, password fort",
              "Connaitre les modificateurs <code>i</code>, <code>m</code>, <code>s</code>, <code>u</code> et choisir le bon delimiteur",
              "<strong>Forms (chap4)</strong> : valider une requete <code>POST</code> via <code>$_SERVER['REQUEST_METHOD']</code>",
              "Appliquer le pattern : <strong>presence -> sanitize -> validate -> traitement -> redirect+exit</strong>",
              "Utiliser <code>filter_var</code> avec <code>FILTER_VALIDATE_EMAIL/INT/URL</code> + options",
              "Echapper toute sortie utilisateur via <code>htmlspecialchars($x, ENT_QUOTES, 'UTF-8')</code>",
              "Lire/ecrire un fichier : <code>file()</code>, <code>file_get_contents</code>, <code>file_put_contents</code> (+ <code>FILE_APPEND</code>)",
              "Creer un dossier recursif : <code>mkdir($path, 0777, true)</code>",
              "Parser un CSV : <code>array_map('str_getcsv', file($csv))</code>",
              "Rediriger proprement : <code>header('Location: ...'); exit;</code>"
            ]
          },
          {
            tip: "Sources CNAM : <code>documents/PHP_UNI/chap3/</code> (3 docx : preg_match_all, modificateurs, unicode) et <code>documents/PHP_UNI/chap4/</code> (7 docx : file, file_put_contents, filter, htmlspecialchars, isset, mkdir)."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Quelle est la maniere correcte de verifier que le formulaire a ete envoye en POST ?",
        opts: [
          "<code>if ($_POST)</code>",
          "<code>if (count($_POST) > 0)</code>",
          "<code>if ($_SERVER['REQUEST_METHOD'] === 'POST')</code>",
          "<code>if (isset($_POST))</code>"
        ],
        correct: "c",
        expl: "<code>$_SERVER['REQUEST_METHOD']</code> est la facon canonique. Les autres peuvent etre vrais avec un POST vide ou meme avec un GET."
      },
      {
        q: "Pourquoi faut-il <code>exit;</code> apres <code>header('Location: ...')</code> ?",
        opts: [
          "Sinon le redirect ne marche pas",
          "Pour eviter que le code en dessous s'execute",
          "Pour vider la session",
          "Aucune des reponses"
        ],
        correct: "b",
        expl: "<code>header()</code> envoie juste un header HTTP, mais le script continue. Sans <code>exit</code>, tu peux executer une INSERT DB ou envoyer un mail apres avoir redirige !"
      },
      {
        q: "Pour proteger contre le XSS, on utilise :",
        opts: [
          "<code>mysqli_real_escape_string</code>",
          "<code>htmlspecialchars</code>",
          "<code>password_hash</code>",
          "<code>strip_tags</code>"
        ],
        correct: "b",
        expl: "<code>htmlspecialchars</code> echappe les caracteres HTML dangereux. <code>mysqli_real_escape_string</code> = SQL (a eviter, prefer prepared statements). <code>strip_tags</code> = destructif."
      },
      {
        q: "Quel code HTTP signifie << Methode non autorisee >> ?",
        opts: [
          "<code>400</code>",
          "<code>403</code>",
          "<code>404</code>",
          "<code>405</code>"
        ],
        correct: "d",
        expl: "<strong>405</strong> = Method Not Allowed. Utilise quand tu acceptes seulement POST mais qu'on t'envoie un GET, par exemple."
      },
      {
        q: "Quelle est la BONNE facon d'extraire et valider un parametre numerique en GET ?",
        opts: [
          "<code>$id = $_GET['id']</code>",
          "<code>$id = (int) $_GET['id']</code>",
          "<code>$id = filter_var($_GET['id'], FILTER_VALIDATE_INT, ['options'=>['min_range'=>1]])</code>",
          "<code>$id = intval($_GET['id'])</code>"
        ],
        correct: "c",
        expl: "<code>filter_var</code> avec contraintes valide ET retourne <code>false</code> si invalide. Les casts <code>(int)</code> ou <code>intval</code> retournent 0 pour 'abc', ce qui peut masquer un bug."
      }
    ],
    exercises: [
      {
        num: 1,
        diff: "easy",
        title: "POST name",
        desc: "Recuperer un parametre <code>name</code> envoye via <code>$_POST</code> et afficher <code>Bonjour [name]</code>. <strong>Securite obligatoire :</strong> passer la valeur dans <code>htmlspecialchars()</code> pour eviter une attaque <strong>XSS</strong> si l'utilisateur soumet du HTML/JS. Verifier aussi que le champ n'est pas vide (<code>!empty</code>) avant d'afficher. <strong>Pattern d'examen :</strong> tout affichage de donnee utilisateur DOIT etre echappe.",
        sol: "<?php\nif (!empty($_POST['name'])) {\n    echo 'Bonjour ' . htmlspecialchars($_POST['name']);\n}\n?>"
      },
      {
        num: 2,
        diff: "easy",
        title: "GET lang",
        desc: "Lire un parametre <code>lang</code> envoye via l'URL (<code>?lang=fr</code>) et afficher <code>Langue: [valeur]</code>. <strong>Contraintes :</strong> si le parametre est absent, utiliser <code>fr</code> comme valeur par defaut (operateur <code>??</code>). Echapper la valeur avec <code>htmlspecialchars()</code> avant affichage.",
        sol: "<?php\n$lang = htmlspecialchars($_GET['lang'] ?? 'fr');\necho \"Langue: $lang\";\n?>"
      },
      {
        num: 3,
        diff: "easy",
        title: "isset / empty",
        desc: "Verifier qu'un champ <code>email</code> est <strong>present ET non vide</strong> dans <code>$_POST</code>. Si oui afficher <code>Email recu</code>, sinon <code>Email manquant</code>. <br><br><strong>Difference cle :</strong> <code>isset</code> teste l'existence (la cle existe ?), <code>empty</code> teste si la valeur est vide (<code>\"\"</code>, 0, null, false). Les deux ensemble couvrent tous les cas.",
        sol: "<?php\nif (isset($_POST['email']) && !empty($_POST['email'])) {\n    echo 'Email recu';\n} else {\n    echo 'Email manquant';\n}\n?>"
      },
      {
        num: 4,
        diff: "easy",
        title: "Sanitize",
        desc: "Recuperer <code>$_POST[\"name\"]</code>, lui appliquer <code>trim()</code> pour enlever les espaces en debut/fin, puis <code>htmlspecialchars()</code> avec les flags <code>ENT_QUOTES</code> et l'encoding <code>\"UTF-8\"</code> pour echapper TOUS les caracteres dangereux (incluant les guillemets simples). Afficher le resultat. <strong>Pattern :</strong> trim → escape → output.",
        sol: "<?php\n$name = htmlspecialchars(trim($_POST['name']), ENT_QUOTES, 'UTF-8');\necho $name;\n?>"
      },
      {
        num: 5,
        diff: "easy",
        title: "Filter email",
        desc: "Recuperer <code>$_POST[\"email\"]</code>, lui appliquer <code>trim()</code>, puis valider sa syntaxe avec <code>filter_var($email, FILTER_VALIDATE_EMAIL)</code>. Afficher <code>Email valide</code> ou <code>Email invalide</code>. <br><br><strong>Note :</strong> <code>filter_var</code> retourne l'email si valide, <code>false</code> sinon. Ca valide la <strong>syntaxe</strong>, pas l'existence reelle de la boite mail.",
        sol: "<?php\n$email = trim($_POST['email'] ?? '');\nif (filter_var($email, FILTER_VALIDATE_EMAIL)) {\n    echo 'Email valide';\n} else {\n    echo 'Email invalide';\n}\n?>"
      },
      {
        num: 6,
        diff: "medium",
        title: "3 champs requis",
        desc: "Valider 3 champs <code>$_POST</code> obligatoires : <code>name</code>, <code>email</code>, <code>message</code>. Si l'un est vide, le marquer dans un tableau <code>$errors[$field] = \"Le champ X est requis\"</code>. <br><br>Si <code>$errors</code> est vide a la fin → afficher <code>OK</code>. Sinon → afficher la liste avec <code>print_r</code>. <strong>Pattern :</strong> boucle <code>foreach</code> sur la liste des champs requis.",
        sol: "<?php\n$errors = [];\nforeach (['name', 'email', 'message'] as $f) {\n    if (empty($_POST[$f])) $errors[$f] = \"Le champ $f est requis\";\n}\nif (empty($errors)) echo 'OK';\nelse print_r($errors);\n?>"
      },
      {
        num: 7,
        diff: "medium",
        title: "GET int positif",
        desc: "Lire <code>$_GET[\"id\"]</code> et le valider comme entier <strong>positif</strong> (&ge; 1). Utiliser <code>filter_var($id, FILTER_VALIDATE_INT, [\"options\" =&gt; [\"min_range\" =&gt; 1]])</code>. Si invalide → <code>die(\"ID invalide\")</code>. Sinon afficher <code>ID: [valeur]</code>. <br><br><strong>Piege :</strong> <code>filter_var</code> retourne <code>false</code> pour les valeurs invalides, donc tester avec <code>=== false</code> (pas juste <code>!$id</code> car 0 serait pris comme invalide).",
        sol: "<?php\n$id = filter_var(\n    $_GET['id'] ?? null,\n    FILTER_VALIDATE_INT,\n    ['options' => ['min_range' => 1]]\n);\nif ($id === false) die('ID invalide');\necho \"ID: $id\";\n?>"
      },
      {
        num: 8,
        diff: "medium",
        title: "Redirection",
        desc: "Rediriger l'utilisateur vers <code>profile.php?id=5</code> avec <code>header(\"Location: ...\")</code>.<br><br><strong>Regle absolue :</strong> TOUJOURS faire <code>exit;</code> immediatement apres <code>header()</code> pour empecher l'execution du code suivant. Sans <code>exit</code>, le serveur envoie aussi le contenu HTML qui suit, ce qui peut casser la redirection ou exposer des donnees sensibles. <strong>Pattern d'examen incontournable.</strong>",
        sol: "<?php\nheader('Location: profile.php?id=5');\nexit; // TOUJOURS exit apres header\n?>"
      },
      {
        num: 9,
        diff: "medium",
        title: "Radio genre",
        desc: "Recuperer <code>$_POST[\"gender\"]</code> (issu d'un radio button). N'accepter QUE les valeurs <code>\"m\"</code> ou <code>\"f\"</code> en <strong>mode strict</strong>. Si autre chose → <code>die(\"Genre invalide\")</code>. Sinon afficher <code>Genre: [valeur]</code>. <br><br><strong>Securite :</strong> ne JAMAIS faire confiance aux valeurs client meme pour un radio button — le HTML peut etre modifie via les devtools.",
        sol: "<?php\n$gender = $_POST['gender'] ?? '';\nif (!in_array($gender, ['m', 'f'], true)) {\n    die('Genre invalide');\n}\necho \"Genre: $gender\";\n?>"
      },
      {
        num: 10,
        diff: "medium",
        title: "Select role",
        desc: "Valider que <code>$_POST[\"role\"]</code> est l'une des valeurs autorisees : <code>donor</code>, <code>org</code>, ou <code>admin</code>. Si invalide → retourner un code HTTP <code>400</code> via <code>http_response_code(400)</code> puis <code>die(\"Role invalide\")</code>. <br><br>Utiliser <code>in_array($role, $allowed, true)</code> en mode strict. <strong>Pattern :</strong> whitelist pour eviter les valeurs malveillantes.",
        sol: "<?php\n$allowed = ['donor', 'org', 'admin'];\n$role = $_POST['role'] ?? '';\nif (!in_array($role, $allowed, true)) {\n    http_response_code(400);\n    die('Role invalide');\n}\n?>"
      },
      {
        num: 11,
        diff: "hard",
        title: "Formulaire contact",
        desc: "Traiter un formulaire de contact en POST.<br><br><strong>Champs :</strong> <code>name</code>, <code>email</code>, <code>msg</code>.<br><strong>Validations :</strong><br>• Tous remplis (<code>trim</code> + non vide)<br>• Email syntaxiquement valide<br><br>Si OK → envoyer un mail avec <code>mail(\"admin@cnam.fr\", $sujet, $msg, $headers)</code> incluant les headers <code>From:</code> et <code>Reply-To:</code>. Afficher <code>Message envoye</code>. <strong>Securite :</strong> proteger contre l'injection de headers (CRLF) en validant rigoureusement l'email avant de le mettre dans les headers.",
        sol: "<?php\nif ($_SERVER['REQUEST_METHOD'] === 'POST') {\n    $n = trim($_POST['name']  ?? '');\n    $e = trim($_POST['email'] ?? '');\n    $m = trim($_POST['msg']   ?? '');\n    if ($n && filter_var($e, FILTER_VALIDATE_EMAIL) && $m) {\n        mail('admin@cnam.fr', \"Contact: $n\", $m,\n             \"From: $e\\r\\nReply-To: $e\");\n        echo 'Message envoye';\n    }\n}\n?>"
      },
      {
        num: 12,
        diff: "hard",
        title: "Reset mot de passe",
        desc: "Endpoint de reset password. Si <code>$_POST[\"email\"]</code> est valide :<br>1. Generer un mot de passe temporaire de 8 caracteres aleatoires via <code>substr(uniqid(), -8)</code><br>2. Le hasher avec <code>password_hash($newPwd, PASSWORD_DEFAULT)</code><br>3. Stocker le hash en base (commentaire UPDATE)<br>4. Afficher le pwd en clair (pour le mail)<br><br><strong>Note pedagogique :</strong> en prod, on envoie le pwd par mail, on ne l'affiche pas a l'ecran. Ici c'est l'echelle d'un TD.",
        sol: "<?php\nif (filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL)) {\n    $newPwd = substr(uniqid(), -8);\n    $hash   = password_hash($newPwd, PASSWORD_DEFAULT);\n    // UPDATE users SET password = $hash WHERE email = ?\n    echo \"Nouveau mot de passe: $newPwd\";\n}\n?>"
      },
      {
        num: 13,
        diff: "hard",
        title: "Confirmer mot de passe",
        desc: "Valider un mot de passe avec 5 regles :<br>1. <code>password</code> et <code>password_confirm</code> identiques (===)<br>2. Au moins 8 caracteres<br>3. Au moins UNE majuscule<br>4. Au moins UNE minuscule<br>5. Au moins UN chiffre<br><br>Accumuler TOUTES les erreurs dans <code>$errors[]</code>, puis afficher <code>OK</code> si vide, sinon la liste avec <code>print_r</code>. Utiliser <code>preg_match</code> pour les 3 dernieres regles. <strong>Pattern :</strong> strong password policy avec retour exhaustif (pas early-return).",
        sol: "<?php\n$p1 = $_POST['password']         ?? '';\n$p2 = $_POST['password_confirm'] ?? '';\n$errors = [];\nif ($p1 !== $p2)              $errors[] = 'Les mots de passe ne correspondent pas';\nif (strlen($p1) < 8)          $errors[] = 'Trop court (8 min)';\nif (!preg_match('/[A-Z]/',$p1)) $errors[] = 'Pas de majuscule';\nif (!preg_match('/[a-z]/',$p1)) $errors[] = 'Pas de minuscule';\nif (!preg_match('/\\d/',$p1))    $errors[] = 'Pas de chiffre';\nif (empty($errors)) echo 'OK';\nelse print_r($errors);\n?>"
      },
      {
        num: 14,
        diff: "hard",
        title: "Checkbox multiples",
        desc: "L'utilisateur coche plusieurs pays dans un formulaire (<code>name=\"countries[]\"</code>). On recoit donc un <strong>tableau</strong> dans <code>$_POST[\"countries\"]</code>.<br><br><strong>Travail :</strong> filtrer ce tableau pour ne garder que les pays dans la whitelist <code>[\"lb\", \"fr\", \"us\", \"de\"]</code> (proteger contre l'envoi de valeurs malveillantes via curl). Afficher les pays selectionnes separes par <code>, </code>. Utiliser <code>array_filter</code> + fonction flechee.",
        sol: "<?php\n$allowed = ['lb', 'fr', 'us', 'de'];\n$selected = array_filter(\n    $_POST['countries'] ?? [],\n    fn($v) => in_array($v, $allowed, true)\n);\necho 'Selectionnes: ' . implode(', ', $selected);\n?>"
      },
      {
        num: 15,
        diff: "hard",
        title: "Normaliser telephone",
        desc: "Ecrire une fonction <code>normalize_phone(string $phone): string</code> qui :<br>1. Enleve tous les espaces ET tirets (<code>preg_replace</code> sur <code>/[\\s\\-]/</code>)<br>2. Si le numero ne commence pas par <code>+33</code>, prefixer <code>+33</code> (en enlevant le <code>0</code> initial s'il y en a un)<br><br><strong>Exemple :</strong> <code>\"06 12 34 56 78\"</code> → <code>\"+33612345678\"</code>. <strong>Pattern :</strong> normalisation avant stockage en base — toujours le meme format quoi que l'utilisateur saisisse.",
        sol: "<?php\nfunction normalize_phone(string $phone): string {\n    $phone = preg_replace('/[\\s\\-]/', '', $phone);\n    if (!str_starts_with($phone, '+33')) {\n        $phone = '+33' . ltrim($phone, '0');\n    }\n    return $phone;\n}\necho normalize_phone('06 12 34 56 78'); // +33612345678\n?>"
      },
      {
        num: 16,
        diff: "extreme",
        title: "Signup NFA042 (3 champs)",
        desc: "Endpoint d'inscription CNAM avec validation complete sur 3 champs <code>$_POST</code> :<br><br>• <code>name</code> : lettres + espaces uniquement, &ge; 3 caracteres (regex)<br>• <code>email</code> : valide via <code>FILTER_VALIDATE_EMAIL</code><br>• <code>phone</code> : portable francais valide (regex : <code>+33</code> ou <code>0</code>, suivi de 6/7, puis 8 chiffres)<br><br>Accumuler les erreurs dans <code>$errors[$champ]</code>. Si <code>$errors</code> vide → <code>Inscription validee</code>. Sinon <code>print_r($errors)</code>. <strong>Pattern d'examen recurrent CNAM :</strong> validation multi-champs.",
        sol: "<?php\n$errors = [];\n$name  = trim($_POST['name']  ?? '');\n$email = trim($_POST['email'] ?? '');\n$phone = trim($_POST['phone'] ?? '');\nif (!preg_match('/^[a-zA-Z\\s]{3,}$/', $name))\n    $errors['name'] = 'Nom invalide';\nif (!filter_var($email, FILTER_VALIDATE_EMAIL))\n    $errors['email'] = 'Email invalide';\nif (!preg_match('/^(\\+33|0)[67]\\d{8}$/', $phone))\n    $errors['phone'] = 'Telephone invalide';\nif (empty($errors)) {\n    echo 'Inscription validee';\n} else {\n    print_r($errors);\n}\n?>"
      },
      {
        num: 17,
        diff: "extreme",
        title: "Login validation",
        desc: "Endpoint de login.<br><br><strong>Etape 0 :</strong> rejeter toute methode HTTP autre que <code>POST</code> avec <code>http_response_code(405)</code> + <code>die</code>.<br><br><strong>Validations :</strong><br>• Email syntaxiquement valide<br>• Password de au moins 6 caracteres<br><br>Si l'une des deux echoue → <code>die(\"Identifiants invalides\")</code> avec un message <strong>generique</strong> (ne pas reveler quel champ est faux, sinon on aide un attaquant a deviner si l'email existe). Sinon <code>Login OK</code>.",
        sol: "<?php\nif ($_SERVER['REQUEST_METHOD'] !== 'POST') {\n    http_response_code(405);\n    die('Methode non autorisee');\n}\n$email = trim($_POST['email'] ?? '');\n$pwd   = $_POST['password']    ?? '';\nif (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($pwd) < 6) {\n    die('Identifiants invalides');\n}\necho 'Login OK';\n?>"
      },
      {
        num: 18,
        diff: "extreme",
        title: "GET / POST / 404",
        desc: "Endpoint dual-method. Selon <code>$_SERVER[\"REQUEST_METHOD\"]</code> :<br>• <code>GET</code> → afficher le formulaire HTML<br>• <code>POST</code> → traiter les donnees et afficher <code>Traitement OK</code><br>• Autre methode (PUT, DELETE, PATCH...) → repondre <code>404</code> via <code>http_response_code(404)</code> + <code>die</code><br><br><strong>Pattern d'examen :</strong> dual-purpose endpoint (formulaire + handler dans le meme fichier). Utiliser <code>switch</code> pour brancher proprement.",
        sol: "<?php\nswitch ($_SERVER['REQUEST_METHOD']) {\n    case 'GET':\n        echo '<form method=\"POST\">...</form>';\n        break;\n    case 'POST':\n        // traitement\n        echo 'Traitement OK';\n        break;\n    default:\n        http_response_code(404);\n        die('Page introuvable');\n}\n?>"
      },
      {
        num: 19,
        diff: "extreme",
        title: "validate_required",
        desc: "Ecrire une fonction utilitaire reutilisable <code>validate_required(array $data, array $fields): array</code> qui retourne la liste des champs <strong>manquants</strong> (vides ou absents) d'un tableau associatif.<br><br><strong>Usage type :</strong> <code>validate_required($_POST, [\"name\", \"email\", \"phone\"])</code>. Si rien ne manque, le tableau retourne est vide. <strong>Pattern :</strong> helper pour eviter de repeter la meme boucle dans chaque endpoint.",
        sol: "<?php\nfunction validate_required(array $data, array $fields): array {\n    $missing = [];\n    foreach ($fields as $f) {\n        if (empty($data[$f])) $missing[] = $f;\n    }\n    return $missing;\n}\n$missing = validate_required($_POST, ['name', 'email', 'phone']);\nif ($missing) echo 'Champs manquants: ' . implode(', ', $missing);\n?>"
      },
      {
        num: 20,
        diff: "extreme",
        title: "Signup complet",
        desc: "<strong>Integration exam.</strong> Endpoint d'inscription complet avec session + redirection PRG (Post/Redirect/Get).<br><br><strong>Travail :</strong><br>1. <code>session_start()</code> en premier (avant toute sortie HTML)<br>2. Rejeter toute methode autre que POST (405)<br>3. Valider <code>name</code> (&ge; 3 chars) et <code>email</code> (valide)<br>4. Si OK : stocker <code>$_SESSION[\"success\"]</code> + redirection vers <code>login.php</code> + <code>exit</code><br>5. Sinon : stocker <code>$_SESSION[\"errors\"]</code> + redirection vers <code>signup.php</code> + <code>exit</code><br><br><strong>Pattern PRG :</strong> evite le double-submit sur F5. Les erreurs sont restituees via la session, pas via re-affichage direct.",
        sol: "<?php\nsession_start();\nif ($_SERVER['REQUEST_METHOD'] !== 'POST') {\n    http_response_code(405);\n    die('Methode invalide');\n}\n$errors = [];\n$name  = trim($_POST['name']  ?? '');\n$email = trim($_POST['email'] ?? '');\nif (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Email invalide';\nif (strlen($name) < 3) $errors['name'] = 'Nom trop court';\nif (empty($errors)) {\n    $_SESSION['success'] = 'Inscription reussie';\n    header('Location: login.php'); exit;\n} else {\n    $_SESSION['errors'] = $errors;\n    header('Location: signup.php'); exit;\n}\n?>"
      }
    ],
    problemes: [
      {
        num: 101,
        diff: "extreme",
        title: "Problème 08 — Regular Expression",
        desc: "<b>TD 08 CNAM — Regular Expression — sujet officiel.</b><br><br>Question 1\r<br>\r<br>Écris une fonction nommée verifier_email($email) pour vérifier si une adresse email est correctement formatée.\r<br>\r<br>Voici les instructions :\r<br>\r<br>     Elle doit commencer par une lettre.\r<br>     Elle ne doit pas contenir de caractères spéciaux.\r<br>     Elle doit se terminer par une lettre.\r<br>     La casse (majuscules ou minuscules) ne doit pas être prise en compte.\r<br>     Il doit y avoir au moins deux caractères avant le symbole @.\r<br>     Elle doit contenir le symbole @.\r<br>     Après le @, le nom de domaine doit comporter au moins deux lettres.\r<br>     Il doit être suivi d'un point.\r<br>     Suivi par l'extension TLD (.com, .net, .org...) avec au moins deux lettres\r<br>\r<br>Question 2\r<br>\r<br>Écris une fonction nommée verifier_cell_liban($num) qui utilise preg_match pour vérifier si le numéro est un\r<br>numéro de téléphone portable libanais.\r<br>\r<br>Les critères sont les suivants :\r<br>\r<br>     Pas d'espaces.\r<br>     Il doit commencer par +961 ou 00961.\r<br>     Suivi par l'un de ces codes : 3, 70, 71, 76 ou 81.\r<br>     Suivi par 6 chiffres.<br><br><i>Source : <code>documents/PHP_UNI/TD 01-16_Questions_Solution.pdf</code>. Solution extraite du PDF officiel (accolades reconstruites par heuristique — verifier si necessaire).</i>",
        sol: "// === TD 8 CNAM — solution officielle ===\n<?php\r\nfunction verifier_email($email): bool\r\n,\r\n\r\n  $pattern = \"/^*a-z+\\w**a-z+@*a-z],2,-(\\.*a-z],2,-)+$/i\";\r\n  // $pattern = \"/^*a-z+\\w**a-z+@*a-z],2,-.([a-z+|.,2,63-+$/i\";\r\n  return preg_match($pattern, $email);\r\n}\r\n\r\n$emails = [\r\n  \"john@isae.edu.lb\", // 1\r\n  \"john@cnam.fr\", // 1\r\n  \"j0hn@cnam.fr\", // Zero à la place de o // 1\r\n  \"john@cnam.fr\", // 1\r\n  \"john@cnam.fr\", // 1\r\n  \"j4@cnam.fr\", // 0\r\n  \"j@cnam.fr\", // 0\r\n  \"jo@cnam.fr\", // 1\r\n  \"jo@c.fr\", // 0\r\n  \"jo@cnam.f\", // 0\r\n  \"jo@cnam.com\", // 1\r\n  \"jo@cnam.group\", // 1\r\n  \"jo@cnam.com@Liban\", // 0\r\n  \"jo@cnam.com@Liban.com\", // 0\r\n  \"jo@cnamcnam\", // 0\r\n];\r\n\r\nforeach ($emails as $email) {\n  echo $email, \" - \", verifier_email($email), \"<br>\";\r\n\r\n}\r\n\r\nfunction verifier_cell_liban($num): bool\r\n,\r\n\r\n  $pattern = \"/^(\\+961|00961)(3|70|71|76|81)\\d,6-$/\";\r\n  return preg_match($pattern, $num);\r\n}\r\n\r\n$nums = [\r\n  \"+961 70 500 560\", // false\r\n  \"+96170500560\", // true\r\n  \"0096170500560\", // true\r\n  \"0096103500560\", // false\r\n  \"009613500560\", // true\r\n  \"009617050056\", // false\r\n  \"009619500560\", // false\r\n  \"0096129500560\", // false\r\n  \"@Henry0096170500560Liban\", // false\r\n\r\n];\r\n\r\nforeach ($nums as $num) {\n  echo $num, \" - \", verifier_cell_liban($num), \"<br>\";\r\n\r\n}"
      },
      {
        num: 102,
        diff: "extreme",
        title: "Problème 09 — Form Submission",
        desc: "<b>TD 09 CNAM — Form Submission — sujet officiel.</b><br><br>Soit le code HTML suivant:\r<br>\r<br>&lt;!DOCTYPE html&gt;\r<br>&lt;html lang=\"en\"&gt;\r<br>&lt;head&gt;\r<br>\r<br>       &lt;meta charset=\"UTF-8\"&gt;\r<br>       &lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;\r<br>       &lt;title&gt;Form Submission&lt;/title&gt;\r<br>&lt;/head&gt;\r<br>&lt;body&gt;\r<br>       &lt;h3&gt;Login&lt;/h3&gt;\r<br>       &lt;form action=\"save_form.php\" method=\"post\"&gt;\r<br>\r<br>              &lt;label for=\"name\"&gt;Name&lt;/label&gt;\r<br>              &lt;input type=\"text\" name=\"name\" id=\"name\"&gt;\r<br>              &lt;br&gt;&lt;br&gt;\r<br>              &lt;label for=\"email\"&gt;Email&lt;/label&gt;\r<br>              &lt;input type=\"email\" name=\"email\" id=\"email\"&gt;\r<br>              &lt;br&gt;&lt;br&gt;\r<br>              &lt;label for=\"password\"&gt;Password&lt;/label&gt;\r<br>              &lt;input type=\"password\" name=\"password\" id=\"password\"&gt;\r<br>              &lt;br&gt;&lt;br&gt;\r<br>              &lt;label for=\"birthdate\"&gt;Birthdate&lt;/label&gt;\r<br>              &lt;input type=\"date\" name=\"birthdate\" id=\"birthdate\"&gt;\r<br>              &lt;br&gt;&lt;br&gt;\r<br>              &lt;label for=\"number_of_kids\"&gt;Number of kids&lt;/label&gt;\r<br>              &lt;input type=\"number\" name=\"number_of_kids\" id=\"number_of_kids\"&gt;\r<br>              &lt;br&gt;&lt;br&gt;\r<br>              Gender:&lt;br&gt;\r<br>              &lt;input type=\"radio\" id=\"gender_m\" name=\"gender\" value=\"m\"&gt;\r<br>              &lt;label for=\"gender_m\"&gt;Male&lt;/label&gt;&lt;br&gt;\r<br>              &lt;input type=\"radio\" id=\"gender_f\" name=\"gender\" value=\"f\"&gt;\r<br>              &lt;label for=\"gender_f\"&gt;Female&lt;/label&gt;\r<br>              &lt;br&gt;&lt;br&gt;\r<br>\r<br>              &lt;label&gt;Nationality:&lt;/label&gt;\r<br>              &lt;br&gt;\r<br>              &lt;label for=\"lb\"&gt;Lebanon&lt;/label&gt;\r<br>              &lt;input type=\"checkbox\" name=\"nationality[]\" id=\"lb\" value=\"lb\" &gt;&lt;br&gt;\r<br>              &lt;label for=\"fr\"&gt;France&lt;/label&gt;\r<br>              &lt;input type=\"checkbox\" name=\"nationality[]\" id=\"fr\" value=\"fr\"&gt;&lt;br&gt;\r<br>              &lt;label for=\"us\"&gt;USA&lt;/label&gt;\r<br>              &lt;input type=\"checkbox\" name=\"nationality[]\" id=\"us\" value=\"us\" &gt;&lt;br&gt;\r<br>\r<br>              &lt;br&gt;&lt;br&gt;\r<br>              &lt;label for=\"message\"&gt;Message&lt;/label&gt;\r<br>              &lt;textarea name=\"message\" id=\"message\" cols=\"30\" rows=\"10\"&gt;&lt;/textarea&gt;\r<br>              &lt;br&gt;&lt;br&gt;\r<br>\r<br>              &lt;label for=\"position\"&gt;Position&lt;/label&gt;\r<br>              &lt;select name=\"position\" id=\"position\"&gt;\r<br>\r<br>                     &lt;option value=\"manager\"&gt;manager&lt;/option&gt;\r<br>                     &lt;option value=\"supervisor\"&gt;supervisor&lt;/option&gt;\r<br>                     &lt;option value=\"employee\"&gt;employee&lt;/option&gt;\r<br>              &lt;/select&gt;\r<br>              &lt;br&gt;&lt;br&gt;\r<br>\r<br>              &lt;label for=\"skills\"&gt;Skills&lt;/label&gt;\r<br>              &lt;select name=\"skills[]\" id=\"skills\" multiple&gt;\r<br>\r<br>                     &lt;option value=\"word\" &gt;word&lt;/option&gt;\r<br>                     &lt;option value=\"excel\" &gt;excel&lt;/option&gt;\r<br>                     &lt;option value=\"programming\" &gt;programming&lt;/option&gt;\r<br>              &lt;/select&gt;\r<br>              &lt;br&gt;&lt;br&gt;\r<br>\r<br>              &lt;input type=\"submit\" value=\"Submit\"&gt;\r<br>       &lt;/form&gt;\r<br>&lt;/body&gt;\r<br>&lt;/html&gt;\r<br>\r<br>Ecrire le code PHP de la page save_form.php qui sauvegarde les données soumises dans un fichier en format JSON\r<br>en ajoutant la date actuelle de la soumission sous le format année-mois-jour heure:minute:seconde. Le nom du\r<br>document doit être composé du {annee}-{mois}-{jour}-{nom}-{position}.json\r<br>\r<br>2024-04-08-John Smith-supervisor.json\r<br>\r<br>,\r<br>  \"name\": \"John Smith\",\r<br>  \"email\": \"john@smith.com\",\r<br>  \"password\": \"John@2000\",\r<br>  \"birthdate\": \"2000-04-11\",\r<br>  \"number_of_kids\": \"1\",\r<br>  \"gender\": \"m\",\r<br>  \"nationality\": *\r<br>     \"lb\",\r<br>     \"us\"\r<br>  +,\r<br>  \"message\": \"Bonjour! C'est un message de test.\",\r<br>  \"position\": \"supervisor\",\r<br>  \"skills\": *\r<br>\r<br>     \"word\",\r<br>     \"excel\"\r<br>  +,\r<br>  \"submission_date\": \"2024-04-08 19:36:56\"\r<br>-\r<br>\r<br>&lt;!DOCTYPE html&gt;\r<br>&lt;html lang=\"en\"&gt;\r<br>\r<br>&lt;head&gt;\r<br>  &lt;meta charset=\"UTF-8\"&gt;\r<br>  &lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;\r<br>  &lt;title&gt;Form Submission&lt;/title&gt;\r<br>\r<br>&lt;/head&gt;\r<br>\r<br>&lt;body&gt;\r<br>  &lt;h3&gt;Login&lt;/h3&gt;\r<br>  &lt;form action=\"\" method=\"post\"&gt;\r<br>     &lt;label for=\"name\"&gt;Name&lt;/label&gt;\r<br>     &lt;input type=\"text\" name=\"name\" id=\"name\"&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>     &lt;label for=\"email\"&gt;Email&lt;/label&gt;\r<br>     &lt;input type=\"email\" name=\"email\" id=\"email\"&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>     &lt;label for=\"password\"&gt;Password&lt;/label&gt;\r<br>     &lt;input type=\"password\" name=\"password\" id=\"password\"&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>     &lt;label for=\"birthdate\"&gt;Birthdate&lt;/label&gt;\r<br>     &lt;input type=\"date\" name=\"birthdate\" id=\"birthdate\"&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>     &lt;label for=\"number_of_kids\"&gt;Number of kids&lt;/label&gt;\r<br>     &lt;input type=\"number\" name=\"number_of_kids\" id=\"number_of_kids\"&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>     Gender:&lt;br&gt;\r<br>     &lt;input type=\"radio\" id=\"gender_m\" name=\"gender\" value=\"m\"&gt;\r<br>     &lt;label for=\"gender_m\"&gt;Male&lt;/label&gt;&lt;br&gt;\r<br>     &lt;input type=\"radio\" id=\"gender_f\" name=\"gender\" value=\"f\"&gt;\r<br>     &lt;label for=\"gender_f\"&gt;Female&lt;/label&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>\r<br>     &lt;label&gt;Nationality:&lt;/label&gt;\r<br>     &lt;br&gt;\r<br>     &lt;label for=\"lb\"&gt;Lebanon&lt;/label&gt;\r<br>     &lt;input type=\"checkbox\" name=\"nationality*+\" id=\"lb\" value=\"lb\" checked&gt;&lt;br&gt;\r<br>     &lt;label for=\"fr\"&gt;France&lt;/label&gt;\r<br>     &lt;input type=\"checkbox\" name=\"nationality*+\" id=\"fr\" value=\"fr\"&gt;&lt;br&gt;\r<br>     &lt;label for=\"us\"&gt;USA&lt;/label&gt;\r<br>     &lt;input type=\"checkbox\" name=\"nationality*+\" id=\"us\" value=\"us\" checked&gt;&lt;br&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>     &lt;label for=\"message\"&gt;Message&lt;/label&gt;\r<br>     &lt;textarea name=\"message\" id=\"message\" cols=\"30\" rows=\"10\"&gt;&lt;/textarea&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>\r<br>     &lt;label for=\"position\"&gt;Position&lt;/label&gt;\r<br>     &lt;select name=\"position\" id=\"position\"&gt;\r<br>\r<br>        &lt;option value=\"manager\" selected&gt;manager&lt;/option&gt;\r<br>        &lt;option value=\"supervisor\"&gt;supervisor&lt;/option&gt;\r<br>        &lt;option value=\"employee\"&gt;employee&lt;/option&gt;\r<br>     &lt;/select&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>\r<br>     &lt;label for=\"skills\"&gt;Skills&lt;/label&gt;\r<br>     &lt;select name=\"skills*+\" id=\"skills\" multiple&gt;\r<br>\r<br>        &lt;option value=\"word\" selected&gt;word&lt;/option&gt;\r<br>        &lt;option value=\"excel\" selected&gt;excel&lt;/option&gt;\r<br>        &lt;option value=\"programming\" selected&gt;programming&lt;/option&gt;\r<br>     &lt;/select&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>\r<br>     &lt;input type=\"submit\" value=\"Submit\"&gt;\r<br>  &lt;/form&gt;\r<br>&lt;/body&gt;\r<br>\r<br>&lt;/html&gt;<br><br><i>Source : <code>documents/PHP_UNI/TD 01-16_Questions_Solution.pdf</code>. Solution extraite du PDF officiel (accolades reconstruites par heuristique — verifier si necessaire).</i>",
        sol: "// === TD 9 CNAM — solution officielle ===\n<?php\r\n\r\n// Vérifier si les données sont soumises\r\nif ($_SERVER*\"REQUEST_METHOD\"+ == \"POST\") {\n\r\n  // Créer le nom du fichier\r\n  extract($_POST);\r\n  $filename = date(\"Y-m-d\") . \"-\" . $name . \"-\" . $position . \".json\";\r\n\r\n  // $data = $_POST;\r\n  $_POST*\"submission_date\"+ = date(\"Y-m-d H:i:s\");\r\n\r\n  $json_data = json_encode($_POST, JSON_PRETTY_PRINT);\r\n\r\n  file_put_contents($filename, $json_data);\r\n\r\n  echo (\"Les données ont étées sauvegarder\");\r\n- else  {\n\r\n  // header(\"Location: 02Date.php\");\r\n  // exit();\r\n}\r\n?>"
      },
      {
        num: 103,
        diff: "extreme",
        title: "EXAM 2023-2024 Session 1 — Ex.4 Contactez-Nous (3 pts)",
        desc: "<b>Sujet officiel CNAM NFA042 2023-2024 Session 1, Exercice 4 (3 pts).</b><br><br>Exercice 4 - Contactez-Nous – 3 points\r<br>\r<br>Soit le code HTML de la page contactez-nous.php suivant :\r<br>\r<br>  &lt;h2&gt;Contactez-nous&lt;/h2&gt;\r<br>     &lt;form action=\"contactez-nous.php\" method=\"post\"&gt;\r<br>         &lt;label for=\"nom\"&gt;Nom :&lt;/label&gt;\r<br>         &lt;input type=\"text\" id=\"nom\" name=\"nom\" required&gt;&lt;br&gt;&lt;br&gt;\r<br>         &lt;label for=\"email\"&gt;Email :&lt;/label&gt;\r<br>         &lt;input type=\"email\" id=\"email\" name=\"email\" required&gt;&lt;br&gt;&lt;br&gt;\r<br>         &lt;label for=\"message\"&gt;Message :&lt;/label&gt;&lt;br&gt;\r<br>         &lt;textarea id=\"message\" name=\"message\" rows=\"4\" required&gt;\r<br>         &lt;/textarea&gt;&lt;br&gt;&lt;br&gt;\r<br>         &lt;input type=\"submit\" value=\"Envoyer\"&gt;\r<br>     &lt;/form&gt;\r<br>\r<br>  &lt;?php … ?&gt;\r<br>\r<br>Écrivez le script PHP de la page \"contactez-nous.php\" afin d'envoyer un e-mail au visiteur pour l'informer que\r<br>nous avons bien reçu son message.\r<br>\r<br>• Il faut vérifier si la méthode de requête est POST, que toutes les données obligatoires ont été soumises, et les\r<br>    valider et nettoyer. (1 point)\r<br>\r<br>• Le destinataire de l'e-mail doit être l'adresse e-mail fournie par l'utilisateur (input nommé \"email\"). (0.5 point)\r<br>• L'e-mail doit être envoyé depuis l'adresse e-mail webmaster@cnam.fr. (0.5 point)\r<br>• Le sujet de l'e-mail doit être : Votre message a bien été reçu. (0.5 point)\r<br>• Le corps de l'e-mail doit afficher les informations saisies par le visiteur. Par exemple : (0.5 point)\r<br>\r<br>    Cher {nom},\r<br>\r<br>    Nous avons bien reçu votre message.\r<br>\r<br>    Votre message :\r<br>\r<br>    {message}\r<br>\r<br>    Cordialement,<br><br><i>Source : <code>documents/PHP_UNI/NFA042 - 2023-2024 Session 1 + Solution.pdf</code>. Extraction PDF officielle.</i>",
        sol: "// === EXAM 2023-2024 Session 1 — Ex.4 Contactez-Nous (3 pts) — solution officielle ===\nRéponse (Ex 4):\r\n\r\nif ($_SERVER[\"REQUEST_METHOD\"] == \"POST\") {\r\n      if (!empty($_POST['nom']) && !empty($_POST['email']) && !empty($_POST['message'])) {\r\n             $nom = htmlspecialchars(trim($_POST['nom']));\r\n             $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);\r\n             $message = htmlspecialchars(trim($_POST['message']));\r\n\r\n             if (filter_var($email, FILTER_VALIDATE_EMAIL)) {\r\n                   $to = $email;\r\n                   $subject = \"Votre message a bien été reçu\";\r\n                   $body = \"Cher {$nom},\\n\\nNous avons bien reçu votre message.\\n\\nVotre message\r\n\r\n:\\n{$message}\\n\\nCordialement,\\nL'équipe\";\r\n                   $headers = \"From: webmaster@cnam.fr\\r\\n\";\r\n                   $headers .= \"Reply-To: webmaster@cnam.fr\\r\\n\";\r\n                   $headers .= \"Content-Type: text/plain; charset=UTF-8\\r\\n\";\r\n                   if (mail($to, $subject, $body, $headers)) {\r\n                          echo \"Votre message a été envoyé avec succès.\";\r\n                   } else {\r\n                          echo \"Une erreur s'est produite lors de l'envoi de votre message.\";\r\n                   }\r\n\r\n             } else {\r\n                   echo \"L'adresse e-mail fournie n'est pas valide.\";\r\n\r\n             }\r\n      } else {\r\n\r\n             echo \"Veuillez remplir tous les champs obligatoires.\";\r\n      }\r\n}"
      }
    ]
  },
  {
    id: "day-4",
    code: "J4",
    title: {
      fr: "Jour 4 - chap5 MySQL + PDO + CRUD",
      en: "Day 4 - chap5 MySQL + PDO + CRUD"
    },
    sub: {
      fr: "CNAM chap5 - l'exercice le plus lourd : 5-9 points chaque annee",
      en: "CNAM chap5 - the heaviest exercise: 5-9 points every year"
    },
    why: {
      fr: "CNAM chap5 (PDO.docx, sqli.docx) = exercice 5 de TOUS les examens. Maitrise les prepared statements et tu gagnes 5-9 pts garantis. <strong>Jour le plus critique de la semaine.</strong>",
      en: "CNAM chap5 (PDO.docx, sqli.docx) = exercise 5 of EVERY exam. Master prepared statements and you bank 5-9 guaranteed points. <strong>Most critical day of the week.</strong>"
    },
    tags: [
      "chap5",
      "mysql",
      "PDO",
      "mysqli",
      "prepared",
      "CRUD"
    ],
    sections: [
      {
        h: "Se connecter a la base : mysqli ou PDO",
        blocks: [
          {
            p: "PHP propose 2 API pour MySQL : <strong>mysqli</strong> (specifique MySQL) et <strong>PDO</strong> (portable, recommande). Les examens utilisent les deux."
          },
          {
            code: "<?php\n// mysqli orient objet\n$conn = new mysqli('localhost', 'root', '', 'nfa042');\nif ($conn->connect_error) {\n    die('Erreur : ' . $conn->connect_error);\n}\n$conn->set_charset('utf8mb4');\n\n// mysqli procedural (souvent dans les anciens examens CNAM)\n$conn = mysqli_connect('localhost', 'root', '', 'nfa042');\nmysqli_set_charset($conn, 'utf8mb4');\n\n// PDO (RECOMMANDE)\ntry {\n    $pdo = new PDO(\n        'mysql:host=localhost;dbname=nfa042;charset=utf8mb4',\n        'root', ''\n    );\n    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);\n    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);\n} catch (PDOException $e) {\n    die('Connexion echouee : ' . $e->getMessage());\n}"
          },
          {
            tip: "PDO est portable (MySQL, PostgreSQL, SQLite), plus securise (mode EXCEPTION), et plus lisible (named parameters <code>:email</code>)."
          }
        ]
      },
      {
        h: "Prepared statements - obligatoire !",
        blocks: [
          {
            p: "Un <strong>prepared statement</strong> separe la requete SQL des valeurs. PHP envoie d'abord la requete au serveur, puis les valeurs. Resultat : <strong>injection SQL impossible</strong>."
          },
          {
            code: "<?php\n// MAUVAIS - injection SQL possible !\n$email = $_POST['email'];\n$sql = \"SELECT * FROM users WHERE email = '$email'\";\n// Si email = ' OR 1=1 -- ... PWNED\n\n// BON - prepared (mysqli)\n$stmt = $conn->prepare('SELECT * FROM users WHERE email = ?');\n$stmt->bind_param('s', $email);   // s=string, i=int, d=double, b=blob\n$stmt->execute();\n$result = $stmt->get_result();\n$user = $result->fetch_assoc();\n\n// BON - prepared (PDO, named params)\n$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');\n$stmt->execute([':email' => $email]);\n$user = $stmt->fetch();\n\n// BON - prepared (PDO, ? params, plus court)\n$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');\n$stmt->execute([$email]);\n$user = $stmt->fetch();"
          },
          {
            bad: "Concatener une variable dans une requete SQL = <strong>injection SQL garantie</strong> et -2pt minimum a l'exam. JAMAIS."
          },
          {
            try: "Que fait <code>$stmt-&gt;bind_param('ssi', $n, $e, $a)</code> ?",
            ans: "Lie 3 parametres : le 1er et 2eme sont des <strong>strings</strong>, le 3eme un <strong>integer</strong>. <code>s=string, i=int, d=double, b=blob</code>."
          }
        ]
      },
      {
        h: "CRUD complet (Create/Read/Update/Delete)",
        blocks: [
          {
            p: "Le pattern CRUD revient EXACTEMENT dans tous les examens. 4 fichiers pour chaque entite (campaign_list.php, campaign_create.php, etc.) :"
          },
          {
            code: "<?php\n// =========== CREATE ===========\nif ($_SERVER['REQUEST_METHOD'] === 'POST') {\n    $stmt = $pdo->prepare(\n        'INSERT INTO campaigns (title, goal, status) VALUES (?, ?, ?)'\n    );\n    $stmt->execute([$_POST['title'], (float)$_POST['goal'], 'pending']);\n    $newId = $pdo->lastInsertId();\n    header('Location: campaign_list.php');\n    exit;\n}\n\n// =========== READ (list) ===========\n$campaigns = $pdo->query('SELECT * FROM campaigns')->fetchAll();\nforeach ($campaigns as $c) {\n    echo '<tr><td>' . htmlspecialchars($c['title']) . '</td>';\n    echo '<td><a href=\"campaign_edit.php?id=' . $c['id'] . '\">Edit</a></td>';\n    echo '<td><a href=\"campaign_delete.php?id=' . $c['id'] . '\">Delete</a></td></tr>';\n}\n\n// =========== READ (single) ===========\n$stmt = $pdo->prepare('SELECT * FROM campaigns WHERE id = ?');\n$stmt->execute([$_GET['id']]);\n$campaign = $stmt->fetch();\nif (!$campaign) { http_response_code(404); die(); }\n\n// =========== UPDATE ===========\nif ($_SERVER['REQUEST_METHOD'] === 'POST') {\n    $stmt = $pdo->prepare(\n        'UPDATE campaigns SET title = ?, goal = ? WHERE id = ?'\n    );\n    $stmt->execute([$_POST['title'], (float)$_POST['goal'], (int)$_POST['id']]);\n    header('Location: campaign_list.php');\n    exit;\n}\n\n// =========== DELETE ===========\n$stmt = $pdo->prepare('DELETE FROM campaigns WHERE id = ?');\n$stmt->execute([(int)$_GET['id']]);\nheader('Location: campaign_list.php');\nexit;"
          },
          {
            tip: "Pour CHAQUE fichier edit/delete : <strong>verifier ownership</strong> (la campagne appartient bien a l'utilisateur connecte) sinon HTTP 403. C'est garanti a l'exam."
          }
        ]
      },
      {
        h: "JOIN, GROUP BY, agregations",
        blocks: [
          {
            p: "Pour combiner plusieurs tables, on utilise les <strong>JOIN</strong>. Pour calculer des stats : <strong>SUM, COUNT, AVG, GROUP BY</strong>."
          },
          {
            code: "<?php\n// INNER JOIN (intersection)\n$sql = '\n    SELECT c.title, u.name AS organisation\n    FROM campaigns c\n    INNER JOIN users u ON c.organisation_id = u.id\n    WHERE c.status = \"active\"\n';\n\n// LEFT JOIN (toutes les campagnes meme sans dons)\n$sql = '\n    SELECT c.title, COALESCE(SUM(d.amount), 0) AS raised\n    FROM campaigns c\n    LEFT JOIN donations d ON d.campaign_id = c.id\n    GROUP BY c.id\n';\n\n// SUM + GROUP BY\n$sql = '\n    SELECT u.name, SUM(d.amount) AS total_donated\n    FROM donations d\n    JOIN users u ON u.id = d.donor_id\n    GROUP BY u.id\n    HAVING total_donated > 100\n    ORDER BY total_donated DESC\n    LIMIT 10\n';\n\n// COUNT (nombre de campagnes par orga)\n$sql = '\n    SELECT u.name, COUNT(c.id) AS nb_campaigns\n    FROM users u\n    LEFT JOIN campaigns c ON c.organisation_id = u.id\n    WHERE u.role = \"org\"\n    GROUP BY u.id\n';"
          },
          {
            note: "<code>COALESCE(x, 0)</code> remplace <code>NULL</code> par 0 (utile quand un LEFT JOIN ne trouve rien)."
          },
          {
            try: "Quelle difference entre <code>WHERE</code> et <code>HAVING</code> ?",
            ans: "<code>WHERE</code> filtre les <strong>lignes</strong> AVANT le GROUP BY. <code>HAVING</code> filtre les <strong>groupes</strong> APRES le GROUP BY (peut utiliser SUM, COUNT...)."
          }
        ]
      },
      {
        h: "Methodes fetch : la bonne pour chaque cas",
        blocks: [
          {
            p: "Apres <code>execute()</code>, plusieurs methodes pour recuperer le resultat :"
          },
          {
            table: [
              [
                "Methode",
                "Retourne",
                "Quand"
              ],
              [
                "<code>fetch()</code>",
                "1 ligne (array)",
                "SELECT unique (login, find by id)"
              ],
              [
                "<code>fetchAll()</code>",
                "Tableau d'arrays",
                "SELECT multiple (liste, table HTML)"
              ],
              [
                "<code>fetchColumn()</code>",
                "Valeur d'une colonne",
                "COUNT, SUM (1 chiffre)"
              ],
              [
                "<code>rowCount()</code>",
                "Nombre de lignes affectees",
                "UPDATE, DELETE"
              ],
              [
                "<code>lastInsertId()</code>",
                "ID du dernier INSERT",
                "Apres INSERT"
              ]
            ]
          },
          {
            code: "<?php\n// 1 user\n$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');\n$stmt->execute([$email]);\n$user = $stmt->fetch();\n\n// Liste\n$users = $pdo->query('SELECT * FROM users')->fetchAll();\n\n// Compter\n$nb = $pdo->query('SELECT COUNT(*) FROM users')->fetchColumn();\n\n// UPDATE puis verifier\n$stmt = $pdo->prepare('UPDATE users SET role = ? WHERE id = ?');\n$stmt->execute(['admin', 5]);\necho $stmt->rowCount(); // 1 si update reussi"
          }
        ]
      },
      {
        h: "Checklist chap5 - a maitriser avant Day 5",
        blocks: [
          {
            p: "Au bout de ce jour tu dois pouvoir, sans aide :"
          },
          {
            list: [
              "Ouvrir une connexion <strong>mysqli</strong> (objet) ET <strong>PDO</strong> (avec <code>ATTR_ERRMODE = EXCEPTION</code>)",
              "Ecrire un <strong>prepared statement</strong> avec <code>bind_param</code> (mysqli) ou <code>execute([$arg])</code> (PDO)",
              "Connaitre les types <code>bind_param</code> : <code>s</code>=string, <code>i</code>=int, <code>d</code>=double, <code>b</code>=blob",
              "Choisir la bonne methode fetch : <code>fetch</code> (1 ligne), <code>fetchAll</code> (liste), <code>fetchColumn</code> (1 valeur), <code>rowCount</code> (UPDATE/DELETE)",
              "Recuperer <code>lastInsertId()</code> apres un INSERT",
              "Ecrire un <strong>CRUD complet</strong> (list/create/edit/delete) en 4 fichiers ou en un seul",
              "Connaitre <strong>INNER JOIN</strong> vs <strong>LEFT JOIN</strong> et <code>GROUP BY</code>/<code>HAVING</code>",
              "<strong>Verifier l'ownership</strong> en edit/delete (l'enregistrement appartient bien a l'utilisateur connecte)"
            ]
          },
          {
            tip: "Source CNAM : <code>documents/PHP_UNI/chap5/</code> (PDO.docx, sqli.docx). Ce jour est <strong>le plus rentable</strong> de la semaine : 5-9 points garantis."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Pourquoi utiliser des prepared statements ?",
        opts: [
          "Pour aller plus vite",
          "Pour empecher l'injection SQL",
          "Pour eviter d'ecrire du SQL",
          "Pour les transactions"
        ],
        correct: "b",
        expl: "Les prepared statements separent la requete des valeurs. PHP envoie le SQL au serveur d'abord, puis les valeurs : impossible d'injecter du SQL malveillant via une variable."
      },
      {
        q: "Quelle ligne configure PDO pour lever des exceptions ?",
        opts: [
          "<code>$pdo->setMode(PDO::EXCEPTION)</code>",
          "<code>$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION)</code>",
          "<code>PDO::throwExceptions(true)</code>",
          "<code>$pdo->errors = true</code>"
        ],
        correct: "b",
        expl: "<code>setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION)</code> est la syntaxe exacte. Sans ca, PDO retourne juste <code>false</code> en cas d'erreur (silencieux et dangereux)."
      },
      {
        q: "Pour recuperer une seule ligne, on utilise :",
        opts: [
          "<code>$stmt->fetchAll()</code>",
          "<code>$stmt->fetch()</code>",
          "<code>$stmt->rowCount()</code>",
          "<code>$stmt->fetchColumn()</code>"
        ],
        correct: "b",
        expl: "<code>fetch()</code> retourne une seule ligne (la prochaine du curseur). <code>fetchAll()</code> les recupere toutes."
      },
      {
        q: "Quelle est la difference entre INNER JOIN et LEFT JOIN ?",
        opts: [
          "Aucune",
          "INNER = plus rapide",
          "INNER = intersection, LEFT = garde toutes les lignes de gauche",
          "LEFT = uniquement les NULL"
        ],
        correct: "c",
        expl: "<code>INNER JOIN</code> garde seulement les lignes avec correspondance dans les deux tables. <code>LEFT JOIN</code> garde toutes les lignes de la table de gauche (NULL si pas de match a droite)."
      },
      {
        q: "Pour recuperer l'ID juste apres un INSERT :",
        opts: [
          "<code>$pdo->lastId()</code>",
          "<code>$pdo->lastInsertId()</code>",
          "<code>$stmt->getId()</code>",
          "<code>SELECT MAX(id)</code>"
        ],
        correct: "b",
        expl: "<code>$pdo->lastInsertId()</code> (ou <code>$conn->insert_id</code> en mysqli) retourne l'ID auto-genere du dernier INSERT, par session de connexion (donc safe en concurrence)."
      }
    ],
    exercises: [
      {
        num: 1,
        diff: "easy",
        title: "mysqli connect",
        desc: "Se connecter a la base nfa042.",
        sol: "<?php\n$conn = new mysqli('localhost', 'root', '', 'nfa042');\nif ($conn->connect_error) {\n    die('Erreur: ' . $conn->connect_error);\n}\n$conn->set_charset('utf8mb4');\necho 'Connexion OK';\n?>"
      },
      {
        num: 2,
        diff: "easy",
        title: "PDO connect",
        desc: "Connexion via PDO + exception mode.",
        sol: "<?php\ntry {\n    $pdo = new PDO(\n        'mysql:host=localhost;dbname=nfa042;charset=utf8mb4',\n        'root', ''\n    );\n    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);\n    echo 'PDO OK';\n} catch (PDOException $e) {\n    die('Erreur: ' . $e->getMessage());\n}\n?>"
      },
      {
        num: 3,
        diff: "easy",
        title: "SELECT COUNT",
        desc: "Compter les utilisateurs.",
        sol: "<?php\n$result = $conn->query('SELECT COUNT(*) AS total FROM users');\n$row    = $result->fetch_assoc();\necho 'Utilisateurs: ' . $row['total'];\n?>"
      },
      {
        num: 4,
        diff: "easy",
        title: "INSERT prepare (mysqli)",
        desc: "Inserer un utilisateur.",
        sol: "<?php\n$stmt = $conn->prepare(\n    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'\n);\n$stmt->bind_param('sss', $name, $email, $hash);\n$stmt->execute();\necho 'ID cree: ' . $conn->insert_id;\n?>"
      },
      {
        num: 5,
        diff: "easy",
        title: "SELECT all PDO",
        desc: "Afficher tous les noms.",
        sol: "<?php\nforeach ($pdo->query('SELECT * FROM users') as $row) {\n    echo $row['name'] . '<br>';\n}\n?>"
      },
      {
        num: 6,
        diff: "medium",
        title: "getUserByEmail",
        desc: "Retourne la ligne ou null.",
        sol: "<?php\nfunction getUserByEmail(PDO $pdo, string $email): ?array {\n    $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :e');\n    $stmt->execute([':e' => $email]);\n    $row = $stmt->fetch(PDO::FETCH_ASSOC);\n    return $row ?: null;\n}\n?>"
      },
      {
        num: 7,
        diff: "medium",
        title: "createUser",
        desc: "Insert + hash + lastInsertId.",
        sol: "<?php\nfunction createUser(PDO $pdo, string $name, string $email, string $pwd): int {\n    $hash = password_hash($pwd, PASSWORD_DEFAULT);\n    $stmt = $pdo->prepare(\n        'INSERT INTO users (name, email, password) VALUES (:n, :e, :p)'\n    );\n    $stmt->execute([':n' => $name, ':e' => $email, ':p' => $hash]);\n    return (int) $pdo->lastInsertId();\n}\n?>"
      },
      {
        num: 8,
        diff: "medium",
        title: "updateUserRole",
        desc: "Update avec garde role valide.",
        sol: "<?php\nfunction updateUserRole(PDO $pdo, int $id, string $role): bool {\n    $allowed = ['donor', 'org', 'admin'];\n    if (!in_array($role, $allowed, true)) return false;\n    $stmt = $pdo->prepare('UPDATE users SET role = :r WHERE id = :i');\n    return $stmt->execute([':r' => $role, ':i' => $id]);\n}\n?>"
      },
      {
        num: 9,
        diff: "medium",
        title: "Liste utilisateurs HTML",
        desc: "SELECT + tableau HTML.",
        sol: "<?php\n$users = $pdo->query('SELECT id, name, role FROM users');\necho '<table><tr><th>ID</th><th>Nom</th><th>Role</th></tr>';\nforeach ($users as $row) {\n    echo '<tr>'\n       . '<td>' . $row['id'] . '</td>'\n       . '<td>' . htmlspecialchars($row['name']) . '</td>'\n       . '<td>' . htmlspecialchars($row['role']) . '</td>'\n       . '</tr>';\n}\necho '</table>';\n?>"
      },
      {
        num: 10,
        diff: "medium",
        title: "Recherche LIKE",
        desc: "LIKE en prepared statement.",
        sol: "<?php\nfunction searchUsers(PDO $pdo, string $keyword): array {\n    $like = '%' . $keyword . '%';\n    $stmt = $pdo->prepare('SELECT * FROM users WHERE name LIKE :k');\n    $stmt->execute([':k' => $like]);\n    return $stmt->fetchAll(PDO::FETCH_ASSOC);\n}\n?>"
      },
      {
        num: 11,
        diff: "hard",
        title: "campaign_list",
        desc: "Campagnes actives + liens edit/delete.",
        sol: "<?php\n$stmt = $conn->prepare('SELECT * FROM campaigns WHERE status = ?');\n$stmt->bind_param('s', $status);\n$status = 'active';\n$stmt->execute();\n$result = $stmt->get_result();\necho '<table><tr><th>Titre</th><th>Objectif</th><th>Actions</th></tr>';\nwhile ($row = $result->fetch_assoc()) {\n    echo '<tr>'\n       . '<td>' . htmlspecialchars($row['title']) . '</td>'\n       . '<td>' . number_format($row['goal'], 0, '.', ' ') . '</td>'\n       . '<td>'\n       . '<a href=\"edit.php?id=' . $row['id'] . '\">Modifier</a> | '\n       . '<a href=\"delete.php?id=' . $row['id'] . '\">Supprimer</a>'\n       . '</td></tr>';\n}\necho '</table>';\n?>"
      },
      {
        num: 12,
        diff: "hard",
        title: "campaign_create",
        desc: "INSERT + validation.",
        sol: "<?php\nif ($_SERVER['REQUEST_METHOD'] === 'POST') {\n    $title = trim($_POST['title'] ?? '');\n    $goal  = (float) ($_POST['goal'] ?? 0);\n    if (strlen($title) >= 5 && $goal > 0) {\n        $stmt = $conn->prepare(\n            'INSERT INTO campaigns (title, goal, status) VALUES (?, ?, \"pending\")'\n        );\n        $stmt->bind_param('sd', $title, $goal);\n        $stmt->execute();\n        header('Location: campaign_list.php');\n        exit;\n    }\n}\n?>"
      },
      {
        num: 13,
        diff: "hard",
        title: "campaign_edit",
        desc: "GET = prerempli, POST = UPDATE.",
        sol: "<?php\nif ($_SERVER['REQUEST_METHOD'] === 'GET') {\n    $id = (int) ($_GET['id'] ?? 0);\n    $stmt = $pdo->prepare('SELECT * FROM campaigns WHERE id = ?');\n    $stmt->execute([$id]);\n    $campaign = $stmt->fetch();\n    if (!$campaign) { http_response_code(404); die('Introuvable'); }\n    // afficher form prerempli avec $campaign\n} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {\n    $stmt = $pdo->prepare(\n        'UPDATE campaigns SET title = :t, goal = :g WHERE id = :i'\n    );\n    $stmt->execute([\n        ':t' => $_POST['title'],\n        ':g' => (float) $_POST['goal'],\n        ':i' => (int) $_POST['id'],\n    ]);\n    header('Location: campaign_list.php');\n    exit;\n}\n?>"
      },
      {
        num: 14,
        diff: "hard",
        title: "campaign_delete",
        desc: "DELETE + redirect.",
        sol: "<?php\n$id = (int) ($_GET['id'] ?? 0);\nif ($id <= 0) { http_response_code(400); die('ID invalide'); }\n$stmt = $conn->prepare('DELETE FROM campaigns WHERE id = ?');\n$stmt->bind_param('i', $id);\n$stmt->execute();\nheader('Location: campaign_list.php');\nexit;\n?>"
      },
      {
        num: 15,
        diff: "hard",
        title: "INNER JOIN",
        desc: "Campagnes avec nom organisation.",
        sol: "<?php\n$sql = '\n    SELECT c.title, u.name AS organisation\n    FROM campaigns c\n    INNER JOIN users u ON c.organisation_id = u.id\n    WHERE c.status = \"active\"\n';\nforeach ($pdo->query($sql) as $row) {\n    echo $row['title'] . ' par ' . $row['organisation'] . '<br>';\n}\n?>"
      },
      {
        num: 16,
        diff: "extreme",
        title: "INSERT matiere (exam)",
        desc: "bind_param ssi pour matiere.",
        sol: "<?php\n$stmt = $conn->prepare(\n    'INSERT INTO matiere (code, description, nb_credit, created_at)\n     VALUES (?, ?, ?, NOW())'\n);\n$stmt->bind_param('ssi', $code, $description, $nb_credit);\n$stmt->execute();\necho 'Matiere creee, ID: ' . $conn->insert_id;\n$stmt->close();\n?>"
      },
      {
        num: 17,
        diff: "extreme",
        title: "modifier_matiere",
        desc: "GET = recuperer, POST = update, autre = 404.",
        sol: "<?php\nif ($_SERVER['REQUEST_METHOD'] === 'GET' && !empty($_GET['code'])) {\n    $stmt = $conn->prepare('SELECT * FROM matiere WHERE code = ?');\n    $stmt->bind_param('s', $_GET['code']);\n    $stmt->execute();\n    $row = $stmt->get_result()->fetch_assoc();\n    if (!$row) { http_response_code(404); die(); }\n    // afficher form prerempli\n} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {\n    $stmt = $conn->prepare(\n        'UPDATE matiere SET description = ?, nb_credit = ? WHERE code = ?'\n    );\n    $stmt->bind_param('sis', $description, $nb_credit, $code);\n    $stmt->execute();\n    header('Location: list.php'); exit;\n} else {\n    http_response_code(404);\n}\n?>"
      },
      {
        num: 18,
        diff: "extreme",
        title: "Login PDO (Final 2025)",
        desc: "Login complet avec PDO + session.",
        sol: "<?php\nsession_start();\nif ($_SERVER['REQUEST_METHOD'] !== 'POST') {\n    http_response_code(405); die();\n}\n$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');\n$stmt->execute([$_POST['email']]);\n$user = $stmt->fetch(PDO::FETCH_ASSOC);\nif ($user && password_verify($_POST['password'], $user['password'])) {\n    session_regenerate_id(true);\n    $_SESSION['user'] = $user;\n    header('Location: index.php');\n    exit;\n}\n$_SESSION['error'] = 'Identifiants invalides';\nheader('Location: login.php');\nexit;\n?>"
      },
      {
        num: 19,
        diff: "extreme",
        title: "JOIN a 3 tables",
        desc: "Donations + donors + campagnes.",
        sol: "<?php\n$sql = '\n    SELECT d.amount, u.name AS donor, c.title AS campaign\n    FROM donations d\n    INNER JOIN users     u ON d.donor_id    = u.id\n    INNER JOIN campaigns c ON d.campaign_id = c.id\n    ORDER BY d.created_at DESC\n';\nforeach ($pdo->query($sql) as $row) {\n    echo $row['donor'] . ' a donne '\n       . number_format($row['amount'], 2)\n       . ' a ' . $row['campaign'] . '<br>';\n}\n?>"
      },
      {
        num: 20,
        diff: "extreme",
        title: "CRUD avec role org",
        desc: "CRUD campaigns reserve aux orgs.",
        sol: "<?php\nrequire_role('org');\n$orgId = $_SESSION['user']['id'];\n\n// Liste UNIQUEMENT les campagnes de cette org\n$stmt = $pdo->prepare(\n    'SELECT * FROM campaigns WHERE organisation_id = ?'\n);\n$stmt->execute([$orgId]);\n$mine = $stmt->fetchAll();\n\n// Edit/Delete: verifier ownership\nfunction owns_campaign(PDO $pdo, int $cid, int $orgId): bool {\n    $stmt = $pdo->prepare(\n        'SELECT 1 FROM campaigns WHERE id = ? AND organisation_id = ?'\n    );\n    $stmt->execute([$cid, $orgId]);\n    return (bool) $stmt->fetchColumn();\n}\nif (!owns_campaign($pdo, $cid, $orgId)) {\n    http_response_code(403); die();\n}\n?>"
      }
    ],
    problemes: [
      {
        num: 101,
        diff: "extreme",
        title: "Problème 11 — Gestion des Étudiants",
        desc: "<b>TD 11 CNAM — Gestion des Étudiants — sujet officiel.</b><br><br>Préparations MySQL\r<br>\r<br>     Créer une base de données MySQL nommée \"nfa042_db\"\r<br>     Créer un utilisateur MySQL nommé \"nfa042_user\" avec un mot de passe \"nfa042_pass\"\r<br>     Créer la table étudiant suivante:\r<br>\r<br>CREATE TABLE student (\r<br>       id varchar(255),\r<br>       nom varchar(255) not null,\r<br>       email varchar(255) not null,\r<br>       date_de_naissance date,\r<br>       primary key (id)\r<br>\r<br>);\r<br>\r<br>     Insérer des enregistrements démo suivants :\r<br>\r<br>INSERT INTO student (nom, email, date_de_naissance)\r<br>VALUES\r<br>('Sam', 'sam@gmail.com', '2000-02-14'),\r<br>('Joya', 'joya@gmail.com', '2000-02-10');\r<br>\r<br>PHP\r<br>\r<br>     Créer un fichier index.php qui affiche le formulaire HTML suivant :\r<br>\r<br>&lt;h3&gt;Ajouter de nouveaux enregistrements&lt;/h3&gt;\r<br>&lt;form action=\"create_etudiant.php\" method=\"POST\"&gt;\r<br>\r<br>       &lt;div style=\"margin-bottom:10px;\"&gt;\r<br>              &lt;div&gt;Nom&lt;/div&gt;\r<br>              &lt;div&gt;&lt;input type=\"text\" name=\"nom\" id=\"\"&gt;&lt;/div&gt;\r<br>\r<br>       &lt;/div&gt;\r<br>       &lt;div style=\"margin-bottom:10px;\"&gt;\r<br>\r<br>              &lt;div&gt;Email&lt;/div&gt;\r<br>              &lt;div&gt;&lt;input type=\"text\" name=\"email\" id=\"\"&gt;&lt;/div&gt;\r<br>       &lt;/div&gt;\r<br>       &lt;div style=\"margin-bottom:10px;\"&gt;\r<br>              &lt;div&gt;Date de Naissance&lt;/div&gt;\r<br>              &lt;div&gt;&lt;input type=\"date\" name=\"date_de_naissance\" id=\"\"&gt;&lt;/div&gt;\r<br>       &lt;/div&gt;\r<br>       &lt;div&gt;\r<br>              &lt;div&gt;&lt;input type=\"submit\" name=\"\" value=\"Ajouter un nouvel étudiant\" id=\"\"&gt;&lt;/div&gt;\r<br>       &lt;/div&gt;\r<br>&lt;/form&gt;\r<br>\r<br>     Au dessous du formulaire, créer un tableau qui affiche les informations des étudiants\r<br>     Créer le fichier create_etudiant.php qui enregistre les informations soumises après leur validation dans la base de\r<br>\r<br>         données. Une fois ajoutées, la page doit être redirigée vers index.php pour afficher le tableau à jour.\r<br>\r<br>index.php\r<br>\r<br>&lt;!DOCTYPE html&gt;\r<br>&lt;html lang=\"fr\"&gt;\r<br>&lt;head&gt;\r<br>\r<br>  &lt;meta charset=\"UTF-8\"&gt;\r<br>  &lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;\r<br>  &lt;title&gt;Gestion des Étudiants&lt;/title&gt;\r<br>&lt;/head&gt;\r<br>&lt;body&gt;\r<br>\r<br>  &lt;h3&gt;Ajouter de nouveaux enregistrements&lt;/h3&gt;\r<br>  &lt;form action=\"create_etudiant.php\" method=\"POST\"&gt;\r<br>\r<br>     &lt;div style=\"margin-bottom:10px;\"&gt;\r<br>        &lt;div&gt;Nom&lt;/div&gt;\r<br>        &lt;div&gt;&lt;input type=\"text\" name=\"nom\" id=\"\"&gt;&lt;/div&gt;\r<br>\r<br>     &lt;/div&gt;\r<br>     &lt;div style=\"margin-bottom:10px;\"&gt;\r<br>\r<br>        &lt;div&gt;Email&lt;/div&gt;\r<br>        &lt;div&gt;&lt;input type=\"text\" name=\"email\" id=\"\"&gt;&lt;/div&gt;\r<br>     &lt;/div&gt;\r<br>     &lt;div style=\"margin-bottom:10px;\"&gt;\r<br>        &lt;div&gt;Date de Naissance&lt;/div&gt;\r<br>        &lt;div&gt;&lt;input type=\"date\" name=\"date_de_naissance\" id=\"\"&gt;&lt;/div&gt;\r<br>     &lt;/div&gt;\r<br>     &lt;div&gt;\r<br>        &lt;div&gt;&lt;input type=\"submit\" value=\"Ajouter un nouvel étudiant\"&gt;&lt;/div&gt;\r<br>     &lt;/div&gt;\r<br>  &lt;/form&gt;\r<br>\r<br>  &lt;h3&gt;Informations des étudiants&lt;/h3&gt;\r<br>  &lt;table border=\"1\"&gt;\r<br>\r<br>     &lt;thead&gt;\r<br>        &lt;tr&gt;\r<br>          &lt;th&gt;ID&lt;/th&gt;\r<br>          &lt;th&gt;Nom&lt;/th&gt;\r<br>          &lt;th&gt;Email&lt;/th&gt;\r<br>          &lt;th&gt;Date de Naissance&lt;/th&gt;\r<br>        &lt;/tr&gt;\r<br>\r<br>     &lt;/thead&gt;\r<br>     &lt;tbody&gt;<br><br><i>Source : <code>documents/PHP_UNI/TD 01-16_Questions_Solution.pdf</code>. Solution extraite du PDF officiel (accolades reconstruites par heuristique — verifier si necessaire).</i>",
        sol: "// === TD 11 CNAM — solution officielle ===\n<?php\r\n        // Connexion à la base de données\r\n        $servername = \"localhost\";\r\n        $username = \"root\";\r\n        $password = \"\";\r\n        $dbname = \"nfa042_db\";\r\n        $conn = new mysqli($servername, $username, $password, $dbname);\r\n        if ($conn->connect_error) {\n\r\n          die(\"La connexion a échoué : \" . $conn->connect_error);\r\n}\r\n\r\n        // Récupération des données des étudiants\r\n        $query = \"SELECT * FROM student\";\r\n        $stmt = $conn->prepare($query);\r\n        $stmt->execute();\r\n\r\n        $result = $stmt->get_result();\r\n\r\n        if ($result->num_rows > 0) {\n          // Affichage des données\r\n          while ($row = $result->fetch_assoc()) {\n             echo \"<tr>\";\r\n             echo \"<td>\" . $row*\"id\"+ . \"</td>\";\r\n             echo \"<td>\" . $row*\"nom\"+ . \"</td>\";\r\n             echo \"<td>\" . $row*\"email\"+ . \"</td>\";\r\n             echo \"<td>\" . $row*\"date_de_naissance\"+ . \"</td>\";\r\n             echo \"</tr>\";\r\n\r\n}\r\n        - else  {\n\r\n          echo \"<tr><td colspan='4'>Aucun étudiant trouvé</td></tr>\";\r\n}\r\n        $stmt->close();\r\n        $conn->close();\r\n        ?>\r\n     </tbody>\r\n  </table>\r\n</body>\r\n</html>\r\n\r\nCreate_etudiant.php\r\n<?php\r\n// Validation des entrées\r\nfunction validateInput($data) {\n\r\n  $data = trim($data);\r\n  $data = stripslashes($data);\r\n  $data = htmlspecialchars($data);\r\n  return $data;\r\n}\r\n\r\n// Vérification de la méthode de requête\r\nif ($_SERVER*\"REQUEST_METHOD\"+ == \"POST\") {\n\r\n  // Validation des données du formulaire\r\n  $nom = validateInput($_POST*\"nom\"]);\r\n  $email = validateInput($_POST*\"email\"]);\r\n  $date_de_naissance = validateInput($_POST*\"date_de_naissance\"]);\r\n\r\n  // Vérification de la validité de l'email\r\n  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {\n\r\n     die(\"Adresse email invalide\");\r\n}\r\n\r\n  // Connexion à la base de données\r\n  $servername = \"localhost\";\r\n  $username = \"root\";\r\n  $password = \"\";\r\n  $dbname = \"nfa042_db\";\r\n\r\n  $conn = new mysqli($servername, $username, $password, $dbname);\r\n  if ($conn->connect_error) {\n\r\n     die(\"La connexion a échoué : \" . $conn->connect_error);\r\n}\r\n  // Préparation de la requête SQL d'insertion avec des requêtes préparées\r\n  $studentID = uniqid();\r\n  $stmt = $conn->prepare(\"INSERT INTO student (id, nom, email, date_de_naissance) VALUES (?, ?, ?, ?)\");\r\n  $stmt->bind_param(\"ssss\", $studentID, $nom, $email, $date_de_naissance);\r\n\r\n  // Exécution de la requête préparée\r\n  $stmt->execute();\r\n\r\n  // Fermeture de la connexion et du statement\r\n  $stmt->close();\r\n  $conn->close();\r\n\r\n  header(\"Location: index.php\");\r\n  exit();\r\n}\r\nelse {\n\r\n}"
      },
      {
        num: 102,
        diff: "extreme",
        title: "Problème 12 — Gestion des Étudiants",
        desc: "<b>TD 12 CNAM — Gestion des Étudiants — sujet officiel.</b><br><br>Mise à jour des étudiants\r<br>\r<br>Ajoutez au TD 11 la possibilité de mettre à jour les données des étudiants. Pour ce faire, ajoutez une colonne dans le\r<br>tableau de la page index.php appelée \"Modifier\" avec l'icône \"/img/edit.png\". Lorsque l'on clique sur cette icône, une\r<br>page \"update_etudiant.php\" doit s'ouvrir.\r<br>\r<br>Il faut envoyer l'ID de l'étudiant en paramètre GET, par exemple : update_etudiant.php?id=1\r<br>\r<br>     Si la requête est GET, la page update_etudiant.php doit afficher le même formulaire mais avec les données actuelles\r<br>         de l'étudiant en question.\r<br>\r<br>     Si la requête est POST, cela signifie que les données ont été modifiées et que le formulaire a été soumis. Dans ce cas,\r<br>         nous devons modifier les données dans la base de données puis rediriger l'utilisateur vers la page index.php.\r<br>\r<br>Suppression d'un étudiant\r<br>\r<br>Ajoutez au TD 12 la possibilité de supprimer un étudiant. Pour ce faire, ajoutez une colonne dans le tableau de la\r<br>page \"index.php\" appelée \"Supprimer\" avec l'icône \"/img/delete.png\". Lorsque l'on clique sur cette icône, le script\r<br>doit se diriger vers une nouvelle page \"supprimer.php?id=1\" avec la méthode GET.\r<br>\r<br>Cette page doit afficher un message de confirmation : \"Êtes-vous sûr(e) de vouloir effacer l'étudiant {NOM} ?\" avec\r<br>deux boutons : oui et non.\r<br>\r<br>     Si l'on clique sur oui, les données doivent être supprimées de la base de données.\r<br>     Si non, le script doit rediriger l'utilisateur vers index.php.\r<br>\r<br>Avant d'afficher le message de confirmation, le script doit s'assurer que l'étudiant existe. Sinon, il doit rediriger vers\r<br>index.php.\r<br>\r<br>Il faut toujours distinguer GET et POST. Si la requête est GET, on doit afficher le message, et si elle est POST, on\r<br>doit supprimer l'étudiant et rediriger l'utilisateur vers index.php.\r<br>\r<br>index.php<br><br><i>Source : <code>documents/PHP_UNI/TD 01-16_Questions_Solution.pdf</code>. Solution extraite du PDF officiel (accolades reconstruites par heuristique — verifier si necessaire).</i>",
        sol: "// === TD 12 CNAM — solution officielle ===\n<?php require_once 'functions.php'; ?>\r\n<!DOCTYPE html>\r\n<html lang=\"fr\">\r\n<head>\r\n\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <title>Gestion des Étudiants</title>\r\n</head>\r\n<body>\r\n  <h3>Ajouter de nouveaux enregistrements</h3>\r\n  <form action=\"create_etudiant.php\" method=\"POST\">\r\n\r\n     <div style=\"margin-bottom:10px;\">\r\n        <div>Nom</div>\r\n        <div><input type=\"text\" name=\"nom\" id=\"\"></div>\r\n\r\n     </div>\r\n     <div style=\"margin-bottom:10px;\">\r\n\r\n        <div>Email</div>\r\n        <div><input type=\"text\" name=\"email\" id=\"\"></div>\r\n     </div>\r\n     <div style=\"margin-bottom:10px;\">\r\n\r\n        <div>Date de Naissance</div>\r\n        <div><input type=\"date\" name=\"date_de_naissance\" id=\"\"></div>\r\n     </div>\r\n     <div>\r\n        <div><input type=\"submit\" value=\"Ajouter un nouvel étudiant\"></div>\r\n     </div>\r\n  </form>\r\n\r\n  <h3>Informations des étudiants</h3>\r\n  <table border=\"1\">\r\n\r\n     <thead>\r\n        <tr>\r\n          <th>ID</th>\r\n          <th>Nom</th>\r\n          <th>Email</th>\r\n          <th>Date de Naissance</th>\r\n          <th>Edit</th>\r\n          <th>Delete</th>\r\n        </tr>\r\n\r\n     </thead>\r\n     <tbody>\r\n\r\n        <?php\r\n        // Récupération des données des étudiants\r\n        $conn = db_connect();\r\n        // Récupération des données des étudiants\r\n        $query = \"SELECT * FROM student\";\r\n        $stmt = $conn->prepare($query);\r\n        $stmt->execute();\r\n\r\n        $result = $stmt->get_result();\r\n\r\n        if ($result->num_rows > 0) {\n          // Affichage des données\r\n          while ($row = $result->fetch_assoc()) {\n             echo \"<tr>\";\r\n             echo \"<td>\" . $row*\"id\"+ . \"</td>\";\r\n             echo \"<td>\" . $row*\"nom\"+ . \"</td>\";\r\n             echo \"<td>\" . $row*\"email\"+ . \"</td>\";\r\n             echo \"<td>\" . $row*\"date_de_naissance\"+ . \"</td>\";\r\n             echo \"<td align='center'><a href='edit_etudiant.php?id=\".$row*\"id\"+.\"''><img width='16'\r\n\r\nsrc='img/edit.png'></a></td>\";\r\n             echo \"<td align='center'><a href='delete_etudiant.php?id=\".$row*\"id\"+.\"'><img width='16'\r\n\r\nsrc='img/delete.png'></a></td>\";\r\n             echo \"</tr>\";\r\n\r\n}\r\n        - else  {\n\r\n          echo \"<tr><td colspan='4'>Aucun étudiant trouvé</td></tr>\";\r\n}\r\n        $stmt->close();\r\n        $conn->close();\r\n        ?>\r\n     </tbody>\r\n  </table>\r\n</body>\r\n</html>\r\n\r\nfonctions.php\r\n<?php\r\nfunction cleanStringInput($data) {\n\r\n  $data = trim($data);\r\n  $data = stripslashes($data);\r\n  $data = htmlspecialchars($data);\r\n  return $data;\r\n}\r\n\r\nfunction db_connect() {\n  $conn = null;\r\n  // Connexion à la base de données\r\n  $servername = \"localhost\";\r\n  $username = \"root\";\r\n  $password = \"\";\r\n  $dbname = \"nfa042_db\";\r\n  try {\n     $conn = new mysqli($servername, $username, $password, $dbname);\r\n}\r\n  catch(Exception $e) {\n     die(str($e->getMessage()));\r\n}\r\n  finally,\r\n     if(!$conn) die(\"MySQL Connection Error \");\r\n     return $conn;\r\n}\r\n\r\n}\r\nEdit_etudiant.php\r\n<?php require_once 'functions.php'; ?>\r\n\r\n<?php\r\nif ($_SERVER*\"REQUEST_METHOD\"+ == \"POST\") {\n\r\n  if (\r\n     isset($_GET*\"id\"]) && !empty($_GET*\"id\"]) &&\r\n     isset($_POST*\"nom\"]) && !empty($_POST*\"nom\"]) &&\r\n     isset($_POST*\"email\"]) && !empty($_POST*\"email\"]) &&\r\n     isset($_POST*\"date_de_naissance\"]) && !empty($_POST*\"date_de_naissance\"])\r\n\r\n  ) {\n     $id = cleanStringInput($_GET*\"id\"]);\r\n\r\n     // Validation des données du formulaire\r\n     $nom = cleanStringInput($_POST*\"nom\"]);\r\n     $email = cleanStringInput($_POST*\"email\"]);\r\n     $date_de_naissance = cleanStringInput($_POST*\"date_de_naissance\"]);\r\n     // Vérification de la validité de l'email\r\n     if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {\n\r\n        die(\"Adresse email invalide\");\r\n}\r\n     $conn = db_connect();\r\n     // Préparation de la requête SQL d'insertion avec des requêtes préparées\r\n     $stmt = $conn->prepare(\"UPDATE student SET nom=?, email=?, date_de_naissance=? WHERE id=?\");\r\n     $stmt->bind_param(\"ssss\", $nom, $email, $date_de_naissance, $id);\r\n\r\n     // Exécution de la requête préparée\r\n     $stmt->execute();\r\n\r\n     // Fermeture de la connexion et du statement\r\n     $stmt->close();\r\n     $conn->close();\r\n\r\n     header(\"location: edit_etudiant.php?id=$id\");\r\n     exit();\r\n  - else  {\n     http_response_code(500);\r\n     die();\r\n}\r\n- else if (($_SERVER*\"REQUEST_METHOD\"+ == \"GET\")) {\n  if (isset($_GET*\"id\"]) && !empty($_GET*\"id\"])) {\n     $id = cleanStringInput($_GET*\"id\"]);\r\n     $conn = db_connect();\r\n     $stmt = $conn->prepare(\"SELECT * FROM student WHERE id = ?\");\r\n     $stmt->bind_param(\"s\", $id);\r\n\r\n     // Exécution de la requête préparée\r\n     $stmt->execute();\r\n\r\n     $result = $stmt->get_result();\r\n\r\n     // Fetch data from the result set\r\n     $user = $result->fetch_assoc();\r\n     extract($user);\r\n\r\n     $stmt->close();\r\n     $conn->close();\r\n     ?>\r\n\r\n        <!DOCTYPE html>\r\n        <html lang=\"fr\">\r\n\r\n        <head>\r\n          <meta charset=\"UTF-8\">\r\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n          <title>Gestion des Étudiants</title>\r\n\r\n        </head>\r\n\r\n        <body>\r\n          <h3>Modifier un etudiant</h3>\r\n          <form action=\"edit_etudiant.php?id=<?= $id ?>\" method=\"POST\">\r\n             <div style=\"margin-bottom:10px;\">\r\n                <div>Nom</div>\r\n                <div><input type=\"text\" name=\"nom\" id=\"\" value=\"<?= $nom ?>\"></div>\r\n             </div>\r\n             <div style=\"margin-bottom:10px;\">\r\n                <div>Email</div>\r\n                <div><input type=\"text\" name=\"email\" id=\"\" value=\"<?= $email ?>\"></div>\r\n             </div>\r\n             <div style=\"margin-bottom:10px;\">\r\n                <div>Date de Naissance</div>\r\n                <div><input type=\"date\" name=\"date_de_naissance\" id=\"\" value=\"<?= $date_de_naissance\r\n\r\n?>\"></div>\r\n             </div>\r\n             <div>\r\n                <div><input type=\"submit\" value=\"Mettre à jour\"></div>\r\n             </div>\r\n\r\n          </form>\r\n          <a href=\"index.php\">Back</a>\r\n        </body>\r\n\r\n        </html>\r\n     <?php\r\n  - else  {\n     http_response_code(500);\r\n     die();\r\n}\r\n- else  {\n  http_response_code(404);\r\n  die();\r\n}\r\n?>\r\n\r\ndelete_etudiant.php\r\n\r\n<?php require_once 'functions.php'; ?>\r\n<?php\r\n// Vérification de la méthode de requête\r\nif ($_SERVER*\"REQUEST_METHOD\"+ == \"GET\") {\n\r\n  if(isset($_GET*\"id\"]) && !empty($_GET*\"id\"])) {\n     $id = cleanStringInput($_GET*\"id\"]);\r\n     $conn = db_connect();\r\n     $stmt = $conn->prepare(\"DELETE FROM student WHERE id = ?\");\r\n     $stmt->bind_param(\"s\", $id);\r\n\r\n     // Exécution de la requête préparée\r\n     $stmt->execute();\r\n\r\n     // Fermeture de la connexion et du statement\r\n     $stmt->close();\r\n     $conn->close();\r\n     header(\"location: index.php\");\r\n     exit();\r\n\r\n}\r\n  else {\n\r\n     http_response_code(500);\r\n     die();\r\n}\r\n}\r\nelse {\n  http_response_code(404);\r\n  die();\r\n}\r\n?>\r\n\r\ncreate_etudiant.php\r\n\r\n<?php require_once 'functions.php'; ?>\r\n<?php\r\n// Vérification de la méthode de requête\r\nif ($_SERVER*\"REQUEST_METHOD\"+ == \"POST\") {\n\r\n  if\r\n  (\r\n\r\n     isset($_POST*\"nom\"]) && !empty($_POST*\"nom\"]) &&\r\n     isset($_POST*\"email\"]) && !empty($_POST*\"email\"]) &&\r\n     isset($_POST*\"date_de_naissance\"]) && !empty($_POST*\"date_de_naissance\"])\r\n  ) {\n     // Validation des données du formulaire\r\n     $nom = cleanStringInput($_POST*\"nom\"]);\r\n     $email = cleanStringInput($_POST*\"email\"]);\r\n     $date_de_naissance = cleanStringInput($_POST*\"date_de_naissance\"]);\r\n\r\n     // Vérification de la validité de l'email\r\n     if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {\n\r\n        die(\"Adresse email invalide\");\r\n}\r\n     $conn = db_connect();\r\n     // Préparation de la requête SQL d'insertion avec des requêtes préparées\r\n     $studentID = uniqid();\r\n     $stmt = $conn->prepare(\"INSERT INTO student (id, nom, email, date_de_naissance) VALUES (?, ?, ?, ?)\");\r\n     $stmt->bind_param(\"ssss\", $studentID, $nom, $email, $date_de_naissance);\r\n\r\n     // Exécution de la requête préparée\r\n     $stmt->execute();\r\n\r\n     // Fermeture de la connexion et du statement\r\n     $stmt->close();\r\n     $conn->close();\r\n\r\n     header(\"location: index.php\");\r\n     exit();\r\n  - else  {\n     http_response_code(500);\r\n     die();\r\n}\r\n- else  {\n  http_response_code(404);\r\n  die();\r\n}"
      },
      {
        num: 103,
        diff: "extreme",
        title: "EXAM 2023-2024 Session 2 — Ex.4 Matière Cnam (9 pts)",
        desc: "<b>Sujet officiel CNAM NFA042 2023-2024 Session 2, Exercice 4 (9 pts).</b><br><br>Exercice 4 – Matière Cnam – 9 points\r<br>\r<br>Considérer le code HTML de la page `matiere.php` ci-dessous qui permet d'ajouter une nouvelle\r<br>matière :\r<br>\r<br>  &lt;h2&gt;Ajouter une nouvelle matière&lt;/h2&gt;\r<br>  &lt;form action=\"create_matiere.php\" method=\"post\"&gt;\r<br>\r<br>         &lt;label for=\"code\"&gt;Code :&lt;/label&gt;&lt;br&gt;\r<br>         &lt;input type=\"text\" id=\"code\" name=\"code\" required&gt;&lt;br&gt;&lt;br&gt;\r<br>         &lt;label for=\"description\"&gt;Description :&lt;/label&gt;&lt;br&gt;\r<br>         &lt;textarea id=\"description\" name=\"description\" rows=\"4\" required&gt;&lt;/textarea&gt;&lt;br&gt;&lt;br&gt;\r<br>         &lt;label for=\"credits\"&gt;Nombre de crédits :&lt;/label&gt;&lt;br&gt;\r<br>         &lt;input type=\"number\" id=\"credits\" name=\"credits\" min=\"1\" required&gt;&lt;br&gt;&lt;br&gt;\r<br>         &lt;input type=\"submit\" value=\"Ajouter\"&gt;\r<br>  &lt;/form&gt;\r<br>\r<br>Pour vous aider dans cet exercice, vous pouvez supposer qu’on a déjà créé la fonction dbConnect() qui\r<br>retourne une instance $conn de la classe mysqli.\r<br>On vous donne aussi les détails de la table `matiere` :\r<br>`code` : String – clé primaire, `description` : String, `nb_credit` : Integer, `created` : DateTime\r<br>\r<br>    1. Ajouter à la fin du code HTML de la page `matiere.php` un script PHP pour récupérer les matières\r<br>         de la table `matiere` et les afficher dans un tableau avec des liens vers `modifier_matiere.php` et\r<br>         `supprimer_matiere.php`, comme illustré ci-dessous. (2 points)\r<br>\r<br>         Réponse :\r<br>         &lt;h2&gt;Liste des matières&lt;/h2&gt;\r<br>         &lt;table border=\"1\"&gt;\r<br>\r<br>             &lt;tr&gt;\r<br>                 &lt;th&gt;Code&lt;/th&gt;\r<br>                 &lt;th&gt;Description&lt;/th&gt;\r<br>                 &lt;th&gt;Crédits&lt;/th&gt;\r<br>                 &lt;th&gt;Modifier&lt;/th&gt;\r<br>                 &lt;th&gt;Supprimer&lt;/th&gt;\r<br>\r<br>             &lt;/tr&gt;\r<br>             &lt;?php\r<br>\r<br>                  $mysqli = db_connect();\r<br>                  $result = $mysqli-&gt;query(\"SELECT * FROM matiere\");\r<br>                  if ($result-&gt;num_rows &gt; 0) {\r<br>\r<br>                      while ($row = $result-&gt;fetch_assoc()) {\r<br>                          echo \"&lt;tr&gt;\";\r<br>                          echo \"&lt;td&gt;\" . $row['code'] . \"&lt;/td&gt;\";\r<br>                          echo \"&lt;td&gt;\" . $row['description'] . \"&lt;/td&gt;\";\r<br>                          echo \"&lt;td&gt;\" . $row['credits'] . \"&lt;/td&gt;\";\r<br>                          echo \"&lt;td&gt;&lt;a href='modifier_matiere.php?code=\" . $row['code'] . \"'&gt;Modifier&lt;/a&gt;&lt;/td&gt;\";\r<br>                            echo \"&lt;td&gt;&lt;a href='supprimer_matiere.php?code=\" . $row['code'] . \"'&gt;Supprimer&lt;/a&gt;&lt;/td&gt;\";\r<br>                          echo \"&lt;/tr&gt;\";\r<br>\r<br>                      }\r<br>                  } else { echo \"&lt;tr&gt;&lt;td colspan='4'&gt;Aucune matière trouvée.&lt;/td&gt;&lt;/tr&gt;\";}\r<br>                  $mysqli-&gt;close();\r<br>                  ?&gt;\r<br>         &lt;/table&gt;\r<br>\r<br>2. Créer le code de la page `create_matiere.php` afin d'insérer une nouvelle matière dans la table\r<br>    `matiere`. (2 points)<br><br><i>Source : <code>documents/PHP_UNI/NFA042 - 2023-2024 Session 2 + Solution.pdf</code>. Extraction PDF officielle.</i>",
        sol: "// === EXAM 2023-2024 Session 2 — Ex.4 Matière Cnam (9 pts) — solution officielle ===\nRéponse :\r\n\r\n  if ($_SERVER['REQUEST_METHOD'] == 'POST') {\r\n          if(\r\n                 isset($_POST[\"code\"]) && !empty($_POST[\"code\"]) &&\r\n                 isset($_POST[\"description\"]) && !empty($_POST[\"description\"]) &&\r\n                 isset($_POST[\"nb_credit\"]) && !empty($_POST[\"nb_credit\"])\r\n          )\r\n          {\r\n                 extract($_POST);\r\n                 $code = htmlspecialchars($code);\r\n                 $description = htmlspecialchars($description);\r\n                 $nb_credit = intval($nb_credit);\r\n                 $mysqli = db_connect();\r\n\r\n                   $query = \"INSERT INTO matiere (code, description, nb_credit, created) VALUES (?, ?, ?, NOW())\";\r\n                 $stmt = $mysqli->prepare($query);\r\n                 $stmt->bind_param('ssi', $code, $description, $nb_credit);\r\n\r\n                 if ($stmt->execute()) {\r\n                        echo \"Matière ajoutée avec succès.\";\r\n\r\n                 } else {\r\n                        echo \"Erreur lors de l'ajout de la matière : \" . $stmt->error;\r\n\r\n                 }\r\n\r\n                 $stmt->close();\r\n                 $mysqli->close();\r\n          }\r\n  }\r\n3. Créer le code de la page `modifier_matiere.php` permettant de modifier une matière : (4 points)\r\n         • Si la méthode de requête est GET, récupérer les informations de la matière à modifier\r\n             depuis la base de données en utilisant le code de la matière soumis et affichez-les dans\r\n             un formulaire.\r\n         • Si la méthode de requête est POST, récupérer les données soumises, valider-les et mettre\r\n             à jour la matière dans la base de données\r\n\r\n    Réponse :\r\n$code = $description = $nb_credit = \"\";\r\nif ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['code']) && !empty($_GET['code'])) {\r\n\r\n       $code = htmlspecialchars($_GET['code']);\r\n       $mysqli = db_connect();\r\n       $stmt = $mysqli->prepare(\"SELECT * FROM matiere WHERE code = ?\");\r\n       $stmt->bind_param('s', $code);\r\n       $stmt->execute();\r\n       $result = $stmt->get_result();\r\n       if ($result->num_rows == 1) {\r\n\r\n              $row = $result->fetch_assoc();\r\n              $description = $row['description'];\r\n              $nb_credit = $row['nb_credit'];\r\n       }\r\n       else die(\"Matière non trouvée.\");\r\n       $stmt->close();\r\n       ?>\r\n       <form action=\"modifier_matiere.php\" method=\"post\">\r\n              <label for=\"code\">Code :</label><br>\r\n              <input type=\"text\" id=\"code\" name=\"code\" value=\"<?= $code ?>\" readonly><br><br>\r\n              <label for=\"description\">Description :</label><br>\r\n              <textarea id=\"description\" name=\"description\" rows=\"4\" cols=\"50\" required>\r\n\r\n                     <?= $description ?>\r\n              </textarea><br><br>\r\n              <label for=\"nb_credit\">Nombre de crédits :</label><br>\r\n              <input type=\"number\" id=\"nb_credit\" name=\"nb_credit\" value=\"<?= $nb_credit ?>\"\r\nrequired><br><br>\r\n              <input type=\"submit\" value=\"Modifier\">\r\n       </form>\r\n       <?php\r\n}\r\nif ($_SERVER['REQUEST_METHOD'] == 'POST') {\r\n       if(\r\n              isset($_POST[\"code\"]) && !empty($_POST[\"code\"]) &&\r\n              isset($_POST[\"description\"]) && !empty($_POST[\"description\"]) &&\r\n              isset($_POST[\"nb_credit\"]) && !empty($_POST[\"nb_credit\"])\r\n       )\r\n       {\r\n              $code = htmlspecialchars($_POST[\"code\"]);\r\n              $description = htmlspecialchars($_POST[\"description\"]);\r\n              $nb_credit = intval($_POST[\"nb_credit\"]);\r\n              $query = \"UPDATE matiere SET description = ?, nb_credit = ? WHERE code = ?\";\r\n              $stmt = $mysqli->prepare($query);\r\n              $stmt->bind_param('sis', $description, $nb_credit, $code);\r\n              if ($stmt->execute()) {\r\n\r\n                     echo \"Matière modifiée avec succès.\";\r\n              } else {\r\n\r\n                     echo \"Erreur lors de la modification de la matière : \" . $stmt->error;\r\n              }\r\n              $stmt->close();\r\n              $mysqli->close();\r\n       } else echo \"Veuillez remplir tous les champs correctement.\";\r\n}\r\nelse{\r\n       http_response_code(404);\r\n       die();\r\n}\r\n?>\r\n    4. Créer le code pour la page `supprimer_matiere.php` permettant de supprimer une matière de la\r\n         table. (1 point)\r\n\r\nRéponse :\r\n\r\n  <?php\r\n  if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['code']) && !empty($_GET['code'])) {\r\n\r\n         $code = $_GET['code'];\r\n         $mysqli = db_connect();\r\n         $query = \"DELETE FROM matiere WHERE code = ?\";\r\n         $stmt = $mysqli->prepare($query);\r\n         $stmt->bind_param('s', $code);\r\n         if ($stmt->execute()) {\r\n\r\n                echo \"Matière supprimée avec succès.\";\r\n         } else {\r\n\r\n                echo \"Erreur lors de la suppression de la matière : \" . $stmt->error;\r\n         }\r\n         $stmt->close();\r\n         $mysqli->close();\r\n         exit;\r\n  }"
      }
    ]
  },
  {
    id: "day-5",
    code: "J5",
    title: {
      fr: "Jour 5 - chap7 Sessions, Cookies, Auth",
      en: "Day 5 - chap7 Sessions, Cookies, Auth"
    },
    sub: {
      fr: "CNAM chap7 - session_start, $_SESSION, password_hash, login flow",
      en: "CNAM chap7 - session_start, $_SESSION, password_hash, login flow"
    },
    why: {
      fr: "CNAM chap7 (Les sessions.docx, header.docx, La fonction setcookie.docx, TD 12.docx) = Final 2025 Q1 (login complet avec password_verify + sessions + PDO). Le pattern est identique chaque annee.",
      en: "CNAM chap7 (sessions, header, setcookie, TD12) = 2025 Q1 final (full login with password_verify + sessions + PDO). Identical pattern every year."
    },
    tags: [
      "chap7",
      "session",
      "cookie",
      "auth",
      "password_hash",
      "login"
    ],
    sections: [
      {
        h: "Sessions - principe et cycle de vie",
        blocks: [
          {
            p: "Une <strong>session</strong> permet de garder des donnees pour un utilisateur entre plusieurs pages. PHP stocke ces donnees serveur-side (fichier), et envoie un cookie <code>PHPSESSID</code> au navigateur."
          },
          {
            code: "<?php\n// IMPERATIF : avant tout output HTML\nsession_start();\n\n// Stocker\n$_SESSION['user'] = [\n    'id'    => 5,\n    'name'  => 'Chadi',\n    'email' => 'c@s.lb',\n    'role'  => 'donor',\n];\n\n// Lire\nif (isset($_SESSION['user'])) {\n    echo 'Connecte : ' . $_SESSION['user']['name'];\n}\n\n// Supprimer une cle\nunset($_SESSION['user']);\n\n// Vider toute la session (logout)\n$_SESSION = [];\nsession_destroy();"
          },
          {
            warn: "<code>session_start()</code> doit etre <strong>la premiere instruction</strong> du script. Un seul espace avant <code>&lt;?php</code> = <em>Headers already sent</em>."
          },
          {
            tip: "Apres un login reussi, toujours faire <code>session_regenerate_id(true)</code> pour eviter le <strong>session fixation attack</strong>."
          }
        ]
      },
      {
        h: "password_hash / password_verify",
        blocks: [
          {
            p: "Ne JAMAIS stocker un mot de passe en clair. PHP propose <code>password_hash()</code> qui utilise <strong>bcrypt</strong> par defaut (lent, salt automatique)."
          },
          {
            code: "<?php\n// SIGNUP : hasher avant stockage\n$plain = $_POST['password'];\n$hash  = password_hash($plain, PASSWORD_DEFAULT);\n// $hash = '$2y$10$NSXKZb...' (60 chars)\n// INSERT INTO users (..., password) VALUES (..., :hash)\n\n// LOGIN : verifier\n$user = /* SELECT WHERE email = ? */;\nif (password_verify($_POST['password'], $user['password'])) {\n    // Mot de passe correct\n    $_SESSION['user'] = $user;\n    session_regenerate_id(true);\n    header('Location: dashboard.php');\n    exit;\n} else {\n    $_SESSION['error'] = 'Identifiants invalides';\n    header('Location: login.php');\n    exit;\n}"
          },
          {
            bad: "<strong>JAMAIS</strong> de <code>md5</code>, <code>sha1</code>, ou mot de passe en clair. C'est faux, ancien, et les correcteurs sanctionnent (-2pt). <code>password_hash</code> uniquement."
          },
          {
            try: "Quelle est la taille (en caracteres) d'un hash bcrypt ?",
            ans: "<strong>60 caracteres</strong>. La colonne DB doit etre <code>VARCHAR(255)</code> pour anticiper les futurs algos plus longs."
          }
        ]
      },
      {
        h: "Le flow de login complet (pattern exam)",
        blocks: [
          {
            p: "Ce flow est demande au Final 2025. Suis EXACTEMENT cet ordre :"
          },
          {
            table: [
              [
                "Etape",
                "Action"
              ],
              [
                "1",
                "Verifier <code>REQUEST_METHOD === 'POST'</code> (sinon 405)"
              ],
              [
                "2",
                "Verifier presence + format des champs"
              ],
              [
                "3",
                "<code>SELECT * FROM users WHERE email = ?</code> (prepared !)"
              ],
              [
                "4",
                "<code>password_verify($input, $row['password'])</code>"
              ],
              [
                "5",
                "Si OK : <code>session_regenerate_id(true)</code> + stocker user en session"
              ],
              [
                "6",
                "Redirect vers dashboard"
              ],
              [
                "7",
                "Si fail : flash error en session + redirect vers login"
              ]
            ]
          },
          {
            code: "<?php\nsession_start();\n\nif ($_SERVER['REQUEST_METHOD'] !== 'POST') {\n    http_response_code(405);\n    die('Methode invalide');\n}\n\n$email = trim($_POST['email'] ?? '');\n$pwd   = $_POST['password']   ?? '';\n\nif (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($pwd) < 6) {\n    $_SESSION['error'] = 'Identifiants invalides';\n    header('Location: login.php');\n    exit;\n}\n\n$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');\n$stmt->execute([$email]);\n$user = $stmt->fetch();\n\nif (!$user || !password_verify($pwd, $user['password'])) {\n    $_SESSION['error'] = 'Identifiants invalides';\n    header('Location: login.php');\n    exit;\n}\n\nsession_regenerate_id(true);\n$_SESSION['user'] = [\n    'id'    => $user['id'],\n    'name'  => $user['name'],\n    'email' => $user['email'],\n    'role'  => $user['role'],\n];\nheader('Location: dashboard.php');\nexit;"
          }
        ]
      },
      {
        h: "Auth guard - proteger une page",
        blocks: [
          {
            p: "Toute page \"connecte uniquement\" doit verifier la session au top du fichier. On centralise dans une fonction <code>require_login()</code> :"
          },
          {
            code: "<?php\n// auth_check.php\nfunction require_login(): void {\n    if (session_status() === PHP_SESSION_NONE) session_start();\n    if (!isset($_SESSION['user'])) {\n        header('Location: login.php');\n        exit;\n    }\n}\n\nfunction require_role(string $role): void {\n    require_login();\n    if (($_SESSION['user']['role'] ?? '') !== $role) {\n        http_response_code(403);\n        die('Acces refuse');\n    }\n}\n\nfunction current_user(): ?array {\n    return $_SESSION['user'] ?? null;\n}\n\n// dashboard.php\nrequire_once 'auth_check.php';\nrequire_login();\n$user = current_user();\necho 'Bienvenue ' . htmlspecialchars($user['name']);\n\n// admin.php\nrequire_once 'auth_check.php';\nrequire_role('admin');"
          },
          {
            tip: "Toujours mettre <code>require_login()</code> en <strong>premiere ligne</strong> apres les require, avant tout HTML. Sinon la page se charge a moitie puis redirige = mauvaise UX."
          }
        ]
      },
      {
        h: "Flash messages - communiquer entre redirections",
        blocks: [
          {
            p: "Un <strong>flash message</strong> est un message stocke en session, affiche UNE seule fois, puis supprime. Utile pour <em>\"Inscription reussie !\"</em> apres redirect."
          },
          {
            code: "<?php\n// Etape A : on prepare le message + redirect\n$_SESSION['flash'] = [\n    'type'    => 'success',\n    'message' => 'Inscription reussie !'\n];\nheader('Location: login.php');\nexit;\n\n// Etape B : on l'affiche puis supprime\nif (!empty($_SESSION['flash'])) {\n    $flash = $_SESSION['flash'];\n    unset($_SESSION['flash']);\n    echo \"<div class='flash {$flash['type']}'>\";\n    echo htmlspecialchars($flash['message']);\n    echo '</div>';\n}"
          },
          {
            note: "On peut aussi creer un helper <code>flash($type, $message)</code> et <code>show_flash()</code> pour standardiser dans tout le projet."
          }
        ]
      },
      {
        h: "Cookies vs Sessions",
        blocks: [
          {
            p: "<strong>Cookie</strong> = stocke cote navigateur (envoye a chaque requete). <strong>Session</strong> = stocke cote serveur (cookie ne contient que l'ID)."
          },
          {
            table: [
              [
                "",
                "Cookie",
                "Session"
              ],
              [
                "Stockage",
                "Navigateur",
                "Serveur"
              ],
              [
                "Securite",
                "Visible / modifiable",
                "Cachee"
              ],
              [
                "Taille max",
                "4 KB",
                "Illimitee (RAM/disque)"
              ],
              [
                "Duree",
                "Personnalisable",
                "Jusqu'a fermeture nav (par defaut)"
              ],
              [
                "Usage",
                "Theme, langue, preferences UI",
                "User connecte, panier, CSRF token"
              ]
            ]
          },
          {
            code: "<?php\n// Cookie : setcookie(nom, valeur, expiration, path)\nsetcookie('theme', 'dark', time() + 30 * 86400, '/');\n\n// Lire\n$theme = $_COOKIE['theme'] ?? 'light';\n\n// Supprimer\nsetcookie('theme', '', time() - 3600, '/');\n\n// Cookie securise (HTTPS + HttpOnly)\nsetcookie('token', $token, [\n    'expires'  => time() + 3600,\n    'path'     => '/',\n    'secure'   => true,    // HTTPS uniquement\n    'httponly' => true,    // JS ne peut pas lire\n    'samesite' => 'Strict'\n]);"
          }
        ]
      },
      {
        h: "Checklist chap7 - a maitriser avant Day 6",
        blocks: [
          {
            p: "Au bout de ce jour tu dois pouvoir, sans aide :"
          },
          {
            list: [
              "Demarrer une session : <code>session_start()</code> AVANT tout output, et savoir pourquoi",
              "Stocker / lire / effacer une cle <code>$_SESSION</code>, et detruire la session complete (<code>session_destroy</code>)",
              "Appliquer <code>session_regenerate_id(true)</code> apres un login (anti session-fixation)",
              "Hasher avec <code>password_hash($pwd, PASSWORD_DEFAULT)</code> et verifier avec <code>password_verify</code> (jamais md5/sha1)",
              "Ecrire le <strong>flow de login complet</strong> : check methode -> select prepared -> verify -> regenerate -> stocker user -> redirect",
              "Proteger une page avec <code>require_login()</code> / <code>require_role($r)</code>",
              "Implementer un flash message via <code>$_SESSION['flash']</code> + <code>unset</code> apres affichage",
              "Connaitre les options <code>setcookie</code> securisees : <code>secure</code>, <code>httponly</code>, <code>samesite</code>",
              "Rediriger proprement : <code>header('Location: ...'); exit;</code> (toujours <code>exit</code>)",
              "Utiliser <code>match</code> (chap7) pour brancher selon une valeur"
            ]
          },
          {
            tip: "Sources CNAM : <code>documents/PHP_UNI/chap7/</code> (Les sessions.docx, header.docx, La fonction setcookie.docx, match.docx, TD 12.docx). Le Final 2025 Q1 = ce jour."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Pourquoi appeler <code>session_regenerate_id(true)</code> apres un login ?",
        opts: [
          "Pour vider la session",
          "Pour eviter le session fixation attack",
          "Pour rallonger la session",
          "Pour gagner en performance"
        ],
        correct: "b",
        expl: "Un attaquant peut forcer un ID de session sur un user. Apres login, regenerer l'ID invalide cette attaque (le vrai utilisateur a un nouvel ID que l'attaquant ne connait pas)."
      },
      {
        q: "Comment hasher correctement un mot de passe ?",
        opts: [
          "<code>md5($pwd)</code>",
          "<code>sha1($pwd)</code>",
          "<code>password_hash($pwd, PASSWORD_DEFAULT)</code>",
          "<code>base64_encode($pwd)</code>"
        ],
        correct: "c",
        expl: "<code>password_hash</code> utilise bcrypt (lent, salt auto, evolutif). md5/sha1 sont craquables en secondes ; base64 n'est meme pas un hash."
      },
      {
        q: "Ou doit-on appeler <code>session_start()</code> ?",
        opts: [
          "A la fin du fichier",
          "N'importe ou",
          "Avant tout output HTML",
          "Dans la balise &lt;head&gt;"
        ],
        correct: "c",
        expl: "<code>session_start()</code> envoie un cookie via header HTTP, donc doit etre <strong>avant tout output</strong> (HTML, espace, echo, BOM)."
      },
      {
        q: "Pour rendre un cookie inaccessible au JavaScript :",
        opts: [
          "<code>'secure' => true</code>",
          "<code>'httponly' => true</code>",
          "<code>'samesite' => 'Strict'</code>",
          "Aucune solution"
        ],
        correct: "b",
        expl: "<code>HttpOnly</code> empeche <code>document.cookie</code> de le lire. Protection contre les attaques XSS qui voleraient les sessions."
      },
      {
        q: "Quel est l'inconvenient majeur de <code>$_COOKIE</code> vs <code>$_SESSION</code> pour stocker l'utilisateur connecte ?",
        opts: [
          "Le cookie est plus lent",
          "Le cookie est visible et modifiable par l'utilisateur",
          "Le cookie ne supporte pas les arrays",
          "Tout est correct"
        ],
        correct: "b",
        expl: "Le cookie est stocke cote navigateur, visible (DevTools) et modifiable. Mettre <code>role=admin</code> en cookie = un user peut devenir admin en 3 clics. Sessions = stockage serveur, securise."
      }
    ],
    exercises: [
      {
        num: 1,
        diff: "easy",
        title: "Session counter",
        desc: "Compteur de visites par session.",
        sol: "<?php\nsession_start();\n$_SESSION['count'] = ($_SESSION['count'] ?? 0) + 1;\necho 'Visite #' . $_SESSION['count'];\n?>"
      },
      {
        num: 2,
        diff: "easy",
        title: "Cookie theme",
        desc: "Stocker et lire le theme.",
        sol: "<?php\nsetcookie('theme', 'dark', time() + 86400 * 30, '/');\n$theme = $_COOKIE['theme'] ?? 'light';\necho \"Theme actif: $theme\";\n?>"
      },
      {
        num: 3,
        diff: "easy",
        title: "Hash mot de passe",
        desc: "Hasher avec PASSWORD_DEFAULT.",
        sol: "<?php\n$hash = password_hash('nfa042_secret', PASSWORD_DEFAULT);\necho $hash; // bcrypt: $2y$10$...\n?>"
      },
      {
        num: 4,
        diff: "easy",
        title: "Verify password",
        desc: "Verifier un mot de passe.",
        sol: "<?php\n$hash = password_hash('secret', PASSWORD_DEFAULT);\nif (password_verify('secret', $hash)) {\n    echo 'Match';\n} else {\n    echo 'Wrong';\n}\n?>"
      },
      {
        num: 5,
        diff: "easy",
        title: "Logout",
        desc: "Detruire session + rediriger.",
        sol: "<?php\nsession_start();\n$_SESSION = [];\nsession_destroy();\nheader('Location: index.php');\nexit;\n?>"
      },
      {
        num: 6,
        diff: "medium",
        title: "Auth guard",
        desc: "Proteger une page.",
        sol: "<?php\nsession_start();\nif (!isset($_SESSION['user'])) {\n    header('Location: login.php');\n    exit;\n}\necho 'Bienvenue ' . htmlspecialchars($_SESSION['user']['name']);\n?>"
      },
      {
        num: 7,
        diff: "medium",
        title: "Flash message",
        desc: "Set + redirect + read + delete.",
        sol: "<?php\n// Page A: set + redirect\nsession_start();\n$_SESSION['flash'] = 'Inscription reussie!';\nheader('Location: next.php');\nexit;\n\n// Page B: read + delete\nsession_start();\nif (!empty($_SESSION['flash'])) {\n    echo htmlspecialchars($_SESSION['flash']);\n    unset($_SESSION['flash']);\n}\n?>"
      },
      {
        num: 8,
        diff: "medium",
        title: "Login hardcoded",
        desc: "Match contre hash en dur.",
        sol: "<?php\nsession_start();\n$validHash = '$2y$10$NSXKZb...'; // bcrypt\nif (password_verify($_POST['password'] ?? '', $validHash)) {\n    $_SESSION['user'] = ['email' => $_POST['email']];\n    header('Location: dashboard.php');\n    exit;\n} else {\n    $_SESSION['error'] = 'Identifiants invalides';\n    header('Location: login.php');\n    exit;\n}\n?>"
      },
      {
        num: 9,
        diff: "medium",
        title: "Header dynamique",
        desc: "Nom utilisateur ou lien Login.",
        sol: "<?php\nsession_start();\nif (isset($_SESSION['user'])) {\n    echo 'Bonjour ' . htmlspecialchars($_SESSION['user']['name']);\n    echo ' | <a href=\"logout.php\">Deconnexion</a>';\n} else {\n    echo '<a href=\"login.php\">Connexion</a>';\n}\n?>"
      },
      {
        num: 10,
        diff: "medium",
        title: "Admin only",
        desc: "403 si pas admin.",
        sol: "<?php\nsession_start();\nif (($_SESSION['user']['role'] ?? '') !== 'admin') {\n    http_response_code(403);\n    die('Acces refuse');\n}\necho 'Bienvenue admin';\n?>"
      },
      {
        num: 11,
        diff: "hard",
        title: "Remember me",
        desc: "Cookie pour pre-remplir l'email.",
        sol: "<?php\nif ($_SERVER['REQUEST_METHOD'] === 'POST') {\n    if (!empty($_POST['remember'])) {\n        setcookie('saved_email', $_POST['email'], time() + 30 * 86400, '/');\n    } else {\n        setcookie('saved_email', '', time() - 3600, '/');\n    }\n}\n$prefill = $_COOKIE['saved_email'] ?? '';\n?>"
      },
      {
        num: 12,
        diff: "hard",
        title: "Rate limiter",
        desc: "3 fails = 60s blocage.",
        sol: "<?php\nsession_start();\n$_SESSION['fails'] = $_SESSION['fails'] ?? 0;\nif (($_SESSION['locked_until'] ?? 0) > time()) {\n    die('Trop de tentatives, reessayez plus tard.');\n}\n$bad = !password_verify($_POST['password'] ?? '', $hash);\nif ($bad) {\n    $_SESSION['fails']++;\n    if ($_SESSION['fails'] >= 3) {\n        $_SESSION['locked_until'] = time() + 60;\n        $_SESSION['fails'] = 0;\n    }\n} else {\n    $_SESSION['fails'] = 0;\n}\n?>"
      },
      {
        num: 13,
        diff: "hard",
        title: "Wizard multi-etapes",
        desc: "Stocker etape 1 puis afficher etape 2.",
        sol: "<?php\nsession_start();\n// Etape 1\n$_SESSION['signup']['name'] = $_POST['name'];\n// Etape 2: relire\necho 'Bonjour ' . htmlspecialchars($_SESSION['signup']['name']);\n// Final: clean\nunset($_SESSION['signup']);\n?>"
      },
      {
        num: 14,
        diff: "hard",
        title: "Redirect par role",
        desc: "Apres login, rediriger vers la bonne page.",
        sol: "<?php\nsession_start();\n$role = $_SESSION['user']['role'] ?? '';\nswitch ($role) {\n    case 'donor': header('Location: donor.php'); break;\n    case 'org':   header('Location: org.php');   break;\n    case 'admin': header('Location: admin.php'); break;\n    default:      header('Location: login.php');\n}\nexit;\n?>"
      },
      {
        num: 15,
        diff: "hard",
        title: "CSRF token",
        desc: "Generer + verifier un token.",
        sol: "<?php\nsession_start();\nif (empty($_SESSION['csrf'])) {\n    $_SESSION['csrf'] = bin2hex(random_bytes(16));\n}\n// Dans le form: <input type=\"hidden\" name=\"_token\" value=\"<?= $_SESSION['csrf'] ?>\">\nif ($_SERVER['REQUEST_METHOD'] === 'POST') {\n    if (!hash_equals($_SESSION['csrf'], $_POST['_token'] ?? '')) {\n        http_response_code(419);\n        die('CSRF invalide');\n    }\n}\n?>"
      },
      {
        num: 16,
        diff: "extreme",
        title: "Login PDO (Final 2025)",
        desc: "Login complet PDO + session.",
        sol: "<?php\nsession_start();\nif ($_SERVER['REQUEST_METHOD'] !== 'POST') {\n    http_response_code(405);\n    die('Methode invalide');\n}\n$email = trim($_POST['email'] ?? '');\n$pwd   = $_POST['password']    ?? '';\n$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');\n$stmt->execute([$email]);\n$user = $stmt->fetch();\nif (!$user || !password_verify($pwd, $user['password'])) {\n    $_SESSION['error'] = 'Identifiants invalides';\n    header('Location: login.php');\n    exit;\n}\nsession_regenerate_id(true);\n$_SESSION['user'] = [\n    'id'    => $user['id'],\n    'name'  => $user['name'],\n    'email' => $user['email'],\n    'role'  => $user['role'],\n];\nheader('Location: dashboard.php');\nexit;\n?>"
      },
      {
        num: 17,
        diff: "extreme",
        title: "Reset password DB",
        desc: "Generer + UPDATE + mail.",
        sol: "<?php\n$email = $_POST['email'] ?? '';\n$stmt = $conn->prepare('SELECT id FROM users WHERE email = ?');\n$stmt->bind_param('s', $email);\n$stmt->execute();\nif ($stmt->get_result()->num_rows > 0) {\n    $newPwd = substr(uniqid(), -8);\n    $hash   = password_hash($newPwd, PASSWORD_DEFAULT);\n    $upd = $conn->prepare('UPDATE users SET password = ? WHERE email = ?');\n    $upd->bind_param('ss', $hash, $email);\n    $upd->execute();\n    mail($email, 'Reinitialisation NFA042',\n         \"Votre nouveau mot de passe: $newPwd\");\n    echo 'Email envoye';\n}\n?>"
      },
      {
        num: 18,
        diff: "extreme",
        title: "Login CNAM + role",
        desc: "Login + redirect par role.",
        sol: "<?php\nsession_start();\n$user = User::verifyPassword($email, $password);\nif (!$user) {\n    $_SESSION['error'] = 'Identifiants invalides';\n    header('Location: login.html');\n    exit;\n}\nlogin_user($user);\nswitch ($user['role']) {\n    case 'admin': header('Location: admin.html'); break;\n    case 'org':   header('Location: org.html');   break;\n    default:      header('Location: donor.html');\n}\nexit;\n?>"
      },
      {
        num: 19,
        diff: "extreme",
        title: "Changer mot de passe",
        desc: "Ancien + nouveau + confirmation.",
        sol: "<?php\nsession_start();\n$uid = $_SESSION['user']['id'];\n$old = $_POST['old']     ?? '';\n$new = $_POST['new']     ?? '';\n$cnf = $_POST['confirm'] ?? '';\n$stmt = $pdo->prepare('SELECT password FROM users WHERE id = ?');\n$stmt->execute([$uid]);\n$row = $stmt->fetch();\nif (!password_verify($old, $row['password'])) die('Ancien mot de passe incorrect');\nif ($new !== $cnf)                            die('Confirmation ne correspond pas');\nif (strlen($new) < 8)                         die('Trop court');\n$hash = password_hash($new, PASSWORD_DEFAULT);\n$pdo->prepare('UPDATE users SET password = ? WHERE id = ?')\n    ->execute([$hash, $uid]);\necho 'Mot de passe mis a jour';\n?>"
      },
      {
        num: 20,
        diff: "extreme",
        title: "auth_check.php",
        desc: "Module reutilisable.",
        sol: "<?php\nfunction require_login(): void {\n    if (session_status() === PHP_SESSION_NONE) session_start();\n    if (!isset($_SESSION['user'])) {\n        header('Location: login.php');\n        exit;\n    }\n}\nfunction require_role(string $role): void {\n    require_login();\n    if (($_SESSION['user']['role'] ?? '') !== $role) {\n        http_response_code(403);\n        die('Acces refuse');\n    }\n}\nfunction login_user(array $row): void {\n    session_regenerate_id(true);\n    $_SESSION['user'] = [\n        'id'    => $row['id'],\n        'name'  => $row['name'],\n        'email' => $row['email'],\n        'role'  => $row['role'],\n    ];\n}\nfunction logout_user(): void {\n    $_SESSION = [];\n    session_destroy();\n}\nfunction current_user(): ?array {\n    return $_SESSION['user'] ?? null;\n}\n?>"
      }
    ],
    problemes: [
      {
        num: 101,
        diff: "extreme",
        title: "Problème 13 — Login / Logout",
        desc: "<b>TD 13 CNAM — Login / Logout — sujet officiel.</b><br><br>Login without \"Remember Me\" Option\r<br>\r<br>index.php<br><br><i>Source : <code>documents/PHP_UNI/TD 01-16_Questions_Solution.pdf</code>. Solution extraite du PDF officiel (accolades reconstruites par heuristique — verifier si necessaire).</i>",
        sol: "// === TD 13 CNAM — solution officielle ===\n<?php\r\nrequire_once 'functions.php';\r\n$loginLink = \"<a href='login.php'>Login</a>\";\r\n$user_name = \"\";\r\n\r\nif (isset($_SESSION*\"user\"])) {\n  // Logged In\r\n  $loginLink = \"<a href='logout.php'>Logout</a> - <a href='admin.php'>Admin</a>\";\r\n  $user_name = $_SESSION*\"user\"+*\"name\"];\r\n\r\n}\r\n?>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <title>Document</title>\r\n\r\n</head>\r\n\r\n<body>\r\n  <h2>Welcome <?= $user_name ?> to our project</h2>\r\n  <h3>This is a public area</h3>\r\n  <h4><?= $loginLink ?></h4>\r\n  <?php\r\n  if (isset($_SESSION*\"user\"])) {\n\r\n     echo '<div id=\"secureDiv\">';\r\n     echo 'This is a secure section. Only logged in users should see it';\r\n     echo '</div>';\r\n}\r\n  ?>\r\n\r\n</body>\r\n\r\n</html>\r\nfunctions.php\r\n<?php\r\nsession_start();\r\nfunction cleanStringInput($data) {\n\r\n  $data = trim($data);\r\n  $data = stripslashes($data);\r\n  $data = htmlspecialchars($data);\r\n  return $data;\r\n}\r\n\r\nfunction db_connect() {\n  $conn = null;\r\n  // Connexion à la base de données\r\n  $servername = \"localhost\";\r\n  $username = \"root\";\r\n  $password = \"\";\r\n  $dbname = \"nfa042_db\";\r\n  try {\n     $conn = new mysqli($servername, $username, $password, $dbname);\r\n}\r\n  catch(Exception $e) {\n     die(str($e->getMessage()));\r\n}\r\n  finally,\r\n     if(!$conn) die(\"MySQL Connection Error \");\r\n     return $conn;\r\n}\r\n\r\n}\r\n\r\nLogin.php\r\n\r\n<?php\r\nrequire_once 'functions.php';\r\nif (isset($_SESSION*\"user\"]))\r\n\r\n  header(\"location:index.php\");\r\n\r\n$error = [];\r\nif ($_SERVER*\"REQUEST_METHOD\"+ === 'POST') {\n\r\n  if\r\n  (\r\n\r\n     isset($_POST*\"username\"]) && !empty($_POST*\"username\"])\r\n     &&\r\n     isset($_POST*\"password\"]) && !empty($_POST*\"password\"])\r\n  ) {\n     extract($_POST);\r\n     $username = cleanStringInput($username);\r\n     $password = cleanStringInput($password);\r\n     $conn = db_connect();\r\n\r\n     // NOT SECURE - The password is saved as a clear text in the database\r\n     // $query = \"SELECT id, username, name FROM users WHERE username = '$username' AND password =\r\n'$password'\";\r\n     // MD5: More secure than clear text, but again not the best\r\n     // $query = \"SELECT id, username, name FROM users WHERE username = '$username' AND `password` =\r\nMD5('$password')\";\r\n\r\n     $query = \"SELECT id, username, name, password FROM users WHERE username = ?\";\r\n     $stmt = $conn->prepare($query);\r\n     $stmt->bind_param(\"s\", $username);\r\n     $stmt->execute();\r\n\r\n     $result = $stmt->get_result();\r\n\r\n     if ($result->num_rows > 0) {\n        $row = $result->fetch_assoc();\r\n        echo $row*\"password\"];\r\n        echo $password;\r\n        if (password_verify($password, password_hash($row*\"password\"], PASSWORD_DEFAULT))) {\n        // if (password_verify($password, $row*\"password\"])) {\n\r\n          // Authentication Succeeded\r\n          $_SESSION*\"user\"+*\"id\"+ = $row*\"id\"];\r\n          $_SESSION*\"user\"+*\"name\"+ = $row*\"name\"];\r\n          $_SESSION*\"user\"+*\"username\"+ = $row*\"username\"];\r\n          $stmt->close();\r\n          $conn->close();\r\n\r\n          header(\"location:index.php\");\r\n}\r\n\r\n}\r\n     die(\"Invalid Credentials\");\r\n}\r\n- else if ($_SERVER*\"REQUEST_METHOD\"+ === 'GET') {\n  ?>\r\n\r\n     <body>\r\n        <h2>Connexion</h2>\r\n        <form method=\"POST\" action=\"login.php\">\r\n          <label for=\"username\">Nom d'utilisateur :</label><br>\r\n          <input type=\"text\" id=\"username\" name=\"username\" required><br><br>\r\n          <label for=\"password\">Mot de passe :</label><br>\r\n          <input type=\"password\" id=\"password\" name=\"password\" required><br><br>\r\n          <input type=\"submit\" name=\"login\" value=\"Se connecter\">\r\n        </form>\r\n\r\n     </body>\r\n  <?php\r\n- else  {\n  http_response_code(404);\r\n  die();\r\n}\r\nadmin.php\r\n\r\n<?php\r\nrequire_once 'functions.php';\r\nif(!isset($_SESSION*\"user\"])) header(\"location:login.php\");\r\n?>\r\n<html lang=\"en\">\r\n<head>\r\n\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <title>Document</title>\r\n</head>\r\n<body>\r\n  <h3>This is an admin area</h3>\r\n  <div><a href='index.php'>Home</a></div>\r\n</body>\r\n</html>\r\nlogout.php\r\n<?php\r\nrequire_once 'functions.php';\r\nsession_destroy();\r\nheader(\"location:index.php\");"
      },
      {
        num: 102,
        diff: "extreme",
        title: "Problème 14 — Login / Logout",
        desc: "<b>TD 14 CNAM — Login / Logout — sujet officiel.</b><br><br>Login with \"Remember Me\" Option\r<br>\r<br>index.php<br><br><i>Source : <code>documents/PHP_UNI/TD 01-16_Questions_Solution.pdf</code>. Solution extraite du PDF officiel (accolades reconstruites par heuristique — verifier si necessaire).</i>",
        sol: "// === TD 14 CNAM — solution officielle ===\n<?php\r\n\r\n  require_once 'functions.php';\r\n  $loginLink = \"<a href='login.php'>Login</a>\";\r\n  $user_name = \"\";\r\n\r\n  if(isset($_SESSION*\"user\"])) {\n     // Logged In\r\n     $loginLink = \"<a href='logout.php'>Logout</a> - <a href='admin.php'>Admin</a>\";\r\n     $user_name = $_SESSION*\"user\"+*\"name\"];\r\n\r\n}\r\n?>\r\n<html lang=\"en\">\r\n<head>\r\n\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <title>Document</title>\r\n</head>\r\n<body>\r\n  <h2>Welcome <?= $user_name ?> to our project</h2>\r\n  <h3>This is a public area</h3>\r\n  <h4><?= $loginLink ?></h4>\r\n  <?php\r\n  if(isset($_SESSION*\"user\"])) {\n  ?>\r\n  <div id=\"secureDiv\">\r\n\r\n     This is a secure section. Only logged in users should see it.\r\n  </div>\r\n  <?php - ?>\r\n\r\n</body>\r\n</html>\r\nfunctions.php\r\n<?php\r\nsession_start();\r\nif(!isset($_SESSION*\"user\"])) checkCookieToken();\r\n\r\nfunction cleanStringInput($data) {\n  $data = trim($data);\r\n  $data = stripslashes($data);\r\n  $data = htmlspecialchars($data);\r\n  return $data;\r\n\r\n}\r\n\r\nfunction db_connect() {\n  $conn = null;\r\n  // Connexion à la base de données\r\n  $servername = \"localhost\";\r\n  $username = \"root\";\r\n  $password = \"\";\r\n  $dbname = \"nfa042_db\";\r\n  try {\n     $conn = new mysqli($servername, $username, $password, $dbname);\r\n}\r\n  catch(Exception $e) {\n     die(str($e->getMessage()));\r\n}\r\n  finally,\r\n     if(!$conn) die(\"MySQL Connection Error \");\r\n     return $conn;\r\n}\r\n\r\n}\r\n\r\nfunction setCookieToken($username) {\n  $t_user = uniqid();\r\n\r\n  $conn = db_connect();\r\n  $query = \"UPDATE users SET token = ? WHERE username = ?\";\r\n  $stmt = $conn->prepare($query);\r\n  $stmt->bind_param(\"ss\", $t_user, $username);\r\n  $stmt->execute();\r\n  $stmt->close();\r\n  $conn->close();\r\n  setcookie(\"t_user\", $t_user, time() + 3600, \"/\");\r\n}\r\n\r\nfunction checkCookieToken() {\n  if(isset($_COOKIE*\"t_user\"])) {\n     $t_user = $_COOKIE*\"t_user\"];\r\n\r\n     $conn = db_connect();\r\n     $query = \"SELECT id, username, name, email FROM users WHERE token = ?\";\r\n     $stmt = $conn->prepare($query);\r\n     // echo $t_user;\r\n     $stmt->bind_param(\"s\", $t_user);\r\n     $stmt->execute();\r\n     $result = $stmt->get_result();\r\n     if($result->num_rows > 0) {\n\r\n        $row = mysqli_fetch_assoc($result);\r\n\r\n        // To reset the token\r\n        setCookieToken($row*\"username\"]);\r\n\r\n        $_SESSION*\"user\"+*\"id\"+ = $row*\"id\"];\r\n        $_SESSION*\"user\"+*\"name\"+ = $row*\"name\"];\r\n        $_SESSION*\"user\"+*\"username\"+ = $row*\"username\"];\r\n        $stmt->close();\r\n        $conn->close();\r\n        header(\"location:index.php\");\r\n}\r\n}\r\n}\r\nlogin.php\r\n<?php\r\nrequire_once 'functions.php';\r\nif(isset($_SESSION*\"user\"])) header(\"location:index.php\");\r\n\r\n$error = [];\r\nif($_SERVER*\"REQUEST_METHOD\"+ === 'POST') {\n\r\n  if\r\n  (\r\n\r\n     isset($_POST*\"username\"]) && !empty($_POST*\"username\"]) &&\r\n     isset($_POST*\"password\"]) && !empty($_POST*\"password\"])\r\n  )\r\n  ,\r\n     extract($_POST);\r\n     $username = cleanStringInput($username);\r\n     $password = cleanStringInput($password);\r\n     $conn = db_connect();\r\n\r\n     // NOT SECURE - The password is saved as a clear text in the database\r\n     // $query = \"SELECT id, username, name FROM users WHERE username = '$username' AND password =\r\n'$password'\";\r\n     // MD5: More secure than clear text, but again not the best\r\n     // $query = \"SELECT id, username, name FROM users WHERE username = '$username' AND `password` =\r\nMD5('$password')\";\r\n\r\n     $query = \"SELECT id, username, name, password FROM users WHERE username = ?\";\r\n     $stmt = $conn->prepare($query);\r\n     $stmt->bind_param(\"s\", $username);\r\n     $stmt->execute();\r\n\r\n     $result = $stmt->get_result();\r\n\r\n     if($result->num_rows > 0) {\n        $row = $result->fetch_assoc();\r\n        if (password_verify($password, password_hash($row*\"password\"], PASSWORD_DEFAULT))) {\n          // if(password_verify($password, $row*\"password\"])) {\n          // Authentication Succeeded\r\n          $_SESSION*\"user\"+*\"id\"+ = $row*\"id\"];\r\n          $_SESSION*\"user\"+*\"name\"+ = $row*\"name\"];\r\n          $_SESSION*\"user\"+*\"username\"+ = $row*\"username\"];\r\n\r\n          if(isset($_POST*\"rememberme\"])) setCookieToken($row*\"username\"]);\r\n\r\n          $stmt->close();\r\n          $conn->close();\r\n\r\n          header(\"location:index.php\");\r\n}\r\n}\r\n     die(\"Invalid Credentials\");\r\n}\r\n}\r\nelse if($_SERVER*\"REQUEST_METHOD\"+ === 'GET') {\n?>\r\n<body>\r\n  <h2>Connexion</h2>\r\n  <form method=\"POST\" action=\"login.php\">\r\n     <label for=\"username\">Nom d'utilisateur :</label><br>\r\n     <input type=\"text\" id=\"username\" name=\"username\" required><br><br>\r\n     <label for=\"password\">Mot de passe :</label><br>\r\n     <input type=\"password\" id=\"password\" name=\"password\" required><br><br>\r\n     Remember me <input type=\"checkbox\" name=\"rememberme\"><br><br>\r\n     <input type=\"submit\" name=\"login\" value=\"Se connecter\">\r\n  </form>\r\n</body>\r\n<?php\r\n}\r\nelse {\n  http_response_code(404);\r\n  die();\r\n}\r\nlogout.php\r\n<?php\r\nrequire_once 'functions.php';\r\nsession_destroy();\r\nsetcookie(\"t_user\", \"\", time() - 1, \"/\");\r\nheader(\"location:index.php\");\r\n\r\nadmin.php\r\n<?php\r\nrequire_once 'functions.php';\r\nif(!isset($_SESSION*\"user\"])) header(\"location:login.php\");\r\n?>\r\n<html lang=\"en\">\r\n<head>\r\n\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <title>Document</title>\r\n</head>\r\n<body>\r\n  <h3>This is an admin area</h3>\r\n  <div><a href='index.php'>Home</a></div>\r\n</body>\r\n</html>"
      },
      {
        num: 103,
        diff: "extreme",
        title: "EXAM 2023-2024 Session 2 — Ex.3 Réinitialisation du mot de passe (6 pts)",
        desc: "<b>Sujet officiel CNAM NFA042 2023-2024 Session 2, Exercice 3 (6 pts).</b><br><br>Exercice 3 – Réinitialisation du mot de passe – 6 points\r<br>\r<br>Dans la table `users` de la base de données MySQL de votre site web, on trouve les informations des\r<br>utilisateurs. On vous demande de créer le code PHP de la page `reset_password.php` qui sert à\r<br>réinitialiser le mot de passe de l'utilisateur. On vous donne le formulaire de réinitialisation du mot de\r<br>passe ci-dessous.\r<br>\r<br>  &lt;form action=\"reset_password.php\" method=\"POST\"&gt;\r<br>      &lt;label for=\"email\"&gt;Email:&lt;/label&gt;\r<br>      &lt;input type=\"email\" id=\"email\" name=\"email\" required&gt;\r<br>      &lt;input type=\"submit\" value=\"Réinitialiser le mot de passe\"&gt;\r<br>\r<br>  &lt;/form&gt;\r<br>\r<br>Votre code doit :\r<br>\r<br>    1. S’assurer que la méthode de requête est POST et que le champ “email” n’est pas vide. (0.5 point)\r<br>    2. S’assurer que la valeur du champ “email” contient une adresse électronique valide. (0.5 point)\r<br>    3. S'assurer que l'adresse électronique soumise existe dans la base de données. (2 points)\r<br>    4. Mettre à jour le mot de passe de l'utilisateur en question en utilisant un mot de passe aléatoire\r<br>\r<br>         généré par la fonction uniqid(). (1 point)\r<br>    5. Envoyer le nouveau mot de passe par email à l'utilisateur. (2 points)\r<br>Les informations de connexion à la base de données sont les suivantes :\r<br>    • Host: localhost, User: cnam, Password: cnam@24, Database: cnamdb\r<br>    • Table `users`: ID, name, email, password, status, created<br><br><i>Source : <code>documents/PHP_UNI/NFA042 - 2023-2024 Session 2 + Solution.pdf</code>. Extraction PDF officielle.</i>",
        sol: "// === EXAM 2023-2024 Session 2 — Ex.3 Réinitialisation du mot de passe (6 pts) — solution officielle ===\nRéponse :\r\n  if ($_SERVER['REQUEST_METHOD'] == 'POST') {\r\n          $email = $_POST['email'];\r\n          $conn = new mysqli('localhost', 'cnam', 'cnam@24', 'cnamdb');\r\n          if ($conn->connect_error) die(\"Connection failed: \" . $conn->connect_error);\r\n          $stmt = $conn->prepare(\"SELECT * FROM users WHERE email = ?\");\r\n          $stmt->bind_param(\"s\", $email);\r\n          $stmt->execute();\r\n          $result = $stmt->get_result();\r\n          if ($result->num_rows > 0) {\r\n                 $new_password = uniqid();\r\n                 $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);\r\n                 $stmt = $conn->prepare(\"UPDATE users SET password = ? WHERE email = ?\");\r\n                 $stmt->bind_param(\"ss\", $hashed_password, $email);\r\n                 if ($stmt->execute()) {\r\n                        $to = $email;\r\n                        $subject = \"Réinitialisation de votre mot de passe\";\r\n                        $message = \"Votre nouveau mot de passe est : $new_password\";\r\n                        $headers = \"From: no-reply@cnam.fr\";\r\n                        if (mail($to, $subject, $message, $headers)) {\r\n                                echo \"Le nouveau mot de passe a été envoyé à votre adresse e-mail.\";\r\n                        } else {\r\n                                echo \"Erreur lors de l'envoi de l'e-mail.\";\r\n                        }\r\n                 } else {\r\n                        echo \"Erreur lors de la mise à jour du mot de passe.\";\r\n                 }\r\n          } else {\r\n                 echo \"Aucun utilisateur trouvé avec cette adresse e-mail.\";\r\n          }\r\n          $stmt->close();\r\n          $conn->close();\r\n\r\n  }"
      }
    ]
  },
  {
    id: "day-6",
    code: "J6",
    title: {
      fr: "Jour 6 - chap4 avance : Upload + CSV / JSON",
      en: "Day 6 - chap4 advanced: Upload + CSV / JSON"
    },
    sub: {
      fr: "Final 2025 Q3 (upload + mkdir) + Q4 (export CSV). Present dans 4/5 examens (3-8 points)",
      en: "Final 2025 Q3 (upload + mkdir) + Q4 (CSV export). Present in 4/5 past exams (3-8 points)"
    },
    why: {
      fr: "Q3-Q4 du Final 2025. L'upload trompe beaucoup d'etudiants a cause de mkdir recursif et move_uploaded_file. Le boilerplate est court — a memoriser.",
      en: "Q3-Q4 of Final 2025. Upload trips up many students because of recursive mkdir and move_uploaded_file. The boilerplate is short — memorise it."
    },
    tags: [
      "chap4",
      "upload",
      "CSV",
      "JSON",
      "files",
      "mkdir",
      "move_uploaded_file",
      "Final2025"
    ],
    sections: [
      {
        h: "$_FILES - anatomie d'un upload",
        blocks: [
          {
            p: "Quand un formulaire envoie un fichier, PHP le stocke temporairement et remplit <code>$_FILES</code>. Tu DOIS verifier l'attribut <code>enctype</code> du form :"
          },
          {
            code: "<!-- HTML : enctype OBLIGATOIRE -->\n<form action=\"upload.php\" method=\"POST\" enctype=\"multipart/form-data\">\n    <input type=\"file\" name=\"cv\">\n    <button>Envoyer</button>\n</form>\n\n<?php\n// PHP : structure de $_FILES['cv']\n$_FILES['cv'] = [\n    'name'     => 'monCV.pdf',     // nom original\n    'type'     => 'application/pdf', // MIME (non fiable !)\n    'tmp_name' => '/tmp/phpA1B2',    // chemin temporaire\n    'error'    => 0,                 // 0 = OK, sinon UPLOAD_ERR_*\n    'size'     => 234567,             // taille en octets\n];"
          },
          {
            warn: "Sans <code>enctype=\"multipart/form-data\"</code>, <code>$_FILES</code> est vide. C'est le piege n1 a l'exam : ecrire le bon PHP avec un mauvais HTML."
          },
          {
            bad: "Ne JAMAIS faire confiance a <code>$_FILES['x']['type']</code> (envoye par le navigateur, manipulable). Toujours verifier l'extension via <code>pathinfo</code>."
          }
        ]
      },
      {
        h: "Pattern d'upload securise (a memoriser)",
        blocks: [
          {
            p: "Le boilerplate exam complet :"
          },
          {
            code: "<?php\n// 1. Verifier qu'il n'y a pas eu d'erreur\nif ($_FILES['cv']['error'] !== UPLOAD_ERR_OK) {\n    die('Upload echoue : code ' . $_FILES['cv']['error']);\n}\n\n// 2. Verifier la taille (5 Mo max)\nif ($_FILES['cv']['size'] > 5 * 1024 * 1024) {\n    die('Fichier trop volumineux');\n}\n\n// 3. Verifier l'extension\n$ext = strtolower(pathinfo($_FILES['cv']['name'], PATHINFO_EXTENSION));\n$allowed = ['pdf', 'jpg', 'jpeg', 'png'];\nif (!in_array($ext, $allowed, true)) {\n    die('Format non autorise');\n}\n\n// 4. Creer le dossier de destination (recursivement !)\n$dir = __DIR__ . '/uploads/' . date('Y/m/d');\nif (!is_dir($dir)) {\n    mkdir($dir, 0777, true); // true = recursif IMPERATIF\n}\n\n// 5. Generer un nom unique\n$newName = uniqid('cv_', true) . '.' . $ext;\n\n// 6. Deplacer le fichier (jamais rename !)\nif (move_uploaded_file($_FILES['cv']['tmp_name'], \"$dir/$newName\")) {\n    echo 'Upload reussi : ' . \"$dir/$newName\";\n    // INSERT dans la DB...\n} else {\n    echo 'Erreur deplacement';\n}"
          },
          {
            tip: "Le 3eme parametre <code>true</code> de <code>mkdir</code> rend la creation <strong>recursive</strong> : <code>mkdir('a/b/c/d', 0777, true)</code> cree toute l'arborescence."
          },
          {
            bad: "Utiliser <code>rename()</code> au lieu de <code>move_uploaded_file()</code> est une faille de securite. <code>move_uploaded_file()</code> verifie que le fichier vient bien d'un upload (et pas d'un attaquant qui ferait un path traversal)."
          }
        ]
      },
      {
        h: "Codes d'erreur UPLOAD_ERR_*",
        blocks: [
          {
            table: [
              [
                "Constante",
                "Valeur",
                "Cause"
              ],
              [
                "<code>UPLOAD_ERR_OK</code>",
                "0",
                "Tout va bien"
              ],
              [
                "<code>UPLOAD_ERR_INI_SIZE</code>",
                "1",
                "Depasse <code>upload_max_filesize</code> de php.ini"
              ],
              [
                "<code>UPLOAD_ERR_FORM_SIZE</code>",
                "2",
                "Depasse le MAX_FILE_SIZE du form (rarement utilise)"
              ],
              [
                "<code>UPLOAD_ERR_PARTIAL</code>",
                "3",
                "Upload interrompu"
              ],
              [
                "<code>UPLOAD_ERR_NO_FILE</code>",
                "4",
                "Aucun fichier envoye"
              ],
              [
                "<code>UPLOAD_ERR_NO_TMP_DIR</code>",
                "6",
                "Dossier temporaire manquant"
              ],
              [
                "<code>UPLOAD_ERR_CANT_WRITE</code>",
                "7",
                "Erreur d'ecriture disque"
              ]
            ]
          },
          {
            note: "En production, log <code>error</code> + message lisible pour l'utilisateur. En dev, affiche le code pour debugger."
          }
        ]
      },
      {
        h: "CSV - lire et ecrire",
        blocks: [
          {
            p: "Le CSV (Comma-Separated Values) est utilise pour exporter/importer des donnees. PHP a <code>fgetcsv()</code> et <code>fputcsv()</code> qui gerent les quotes et echappements pour toi."
          },
          {
            code: "<?php\n// ========== LIRE un CSV ==========\n$file = fopen('inscriptions.csv', 'r');\nwhile (($row = fgetcsv($file)) !== false) {\n    // $row = ['Chadi', 'chadi@s.lb', '23']\n    echo $row[0] . ' / ' . $row[1] . '<br>';\n}\nfclose($file);\n\n// ========== ECRIRE / APPEND ==========\n$file = fopen('inscriptions.csv', 'a'); // 'a' = append\nfputcsv($file, [\n    'Chadi Khoder',\n    'chadi@cnam.fr',\n    23,\n    date('Y-m-d H:i:s'),\n]);\nfclose($file);\n\n// ========== EXPORT pour telechargement ==========\nheader('Content-Type: text/csv; charset=utf-8');\nheader('Content-Disposition: attachment; filename=donations.csv');\n$out = fopen('php://output', 'w');\nfputcsv($out, ['ID', 'Donateur', 'Montant', 'Date']);\nforeach ($donations as $d) {\n    fputcsv($out, [$d['id'], $d['donor'], $d['amount'], $d['date']]);\n}\nfclose($out);\nexit;"
          },
          {
            tip: "<code>php://output</code> = stream direct vers la reponse HTTP. Combine avec les headers <code>Content-Disposition: attachment</code> pour declencher un telechargement."
          }
        ]
      },
      {
        h: "JSON - encoder et decoder",
        blocks: [
          {
            p: "<code>json_encode</code> transforme une variable PHP en string JSON. <code>json_decode</code> fait l'inverse."
          },
          {
            code: "<?php\n// ========== Encoder ==========\n$data = ['name' => 'Chadi', 'roles' => ['donor', 'admin'], 'age' => 23];\n$json = json_encode($data);\n// {\"name\":\"Chadi\",\"roles\":[\"donor\",\"admin\"],\"age\":23}\n\n// Pretty print + UTF-8 propre\n$json = json_encode(\n    $data,\n    JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE\n);\n\n// Sauvegarder dans un fichier\nfile_put_contents('user.json', $json);\n\n// ========== Decoder ==========\n$json = file_get_contents('user.json');\n$data = json_decode($json, true); // true = array assoc\n// false / omis = objet stdClass : $data->name\n\necho $data['name'];\n\n// API JSON (envoyer du JSON)\nheader('Content-Type: application/json');\necho json_encode(['status' => 'ok', 'data' => $data]);\nexit;\n\n// Recevoir du JSON (depuis un POST API)\n$input = json_decode(file_get_contents('php://input'), true);"
          },
          {
            warn: "Toujours mettre <code>true</code> en 2eme argument de <code>json_decode</code> pour avoir un array (sinon un objet <code>stdClass</code>, plus penible)."
          }
        ]
      },
      {
        h: "Checklist Day 6 - a maitriser avant Day 7 Mock",
        blocks: [
          {
            p: "Au bout de ce jour tu dois pouvoir, sans aide :"
          },
          {
            list: [
              "Construire un form HTML avec <code>enctype=\"multipart/form-data\"</code> + <code>&lt;input type=\"file\"&gt;</code>",
              "Inspecter <code>$_FILES['x']</code> : <code>name</code>, <code>tmp_name</code>, <code>type</code>, <code>error</code>, <code>size</code>",
              "Verifier <code>error === UPLOAD_ERR_OK</code> et connaitre les autres constantes (<code>UPLOAD_ERR_INI_SIZE</code>, etc.)",
              "Verifier la taille (<code>size</code>) ET l'extension (<code>pathinfo</code> + whitelist)",
              "Creer le dossier de destination en <strong>recursif</strong> : <code>mkdir($p, 0777, true)</code>",
              "Generer un nom unique : <code>uniqid('prefix_', true) . '.' . $ext</code>",
              "Deplacer avec <code>move_uploaded_file</code> (jamais <code>rename</code> ou <code>copy</code>)",
              "Parser un CSV : <code>fgetcsv</code> dans une boucle ou <code>array_map('str_getcsv', file($csv))</code>",
              "Exporter un CSV en streaming : headers HTTP + <code>fopen('php://output', 'w')</code> + <code>fputcsv</code>",
              "<code>json_encode</code> avec <code>JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE</code>, <code>json_decode($s, true)</code> pour avoir un array"
            ]
          },
          {
            tip: "Reference CNAM : <code>documents/PHP_UNI/chap4/file.docx</code>, <code>file_put_contents.docx</code>, <code>La fonction mkdir.docx</code>, <code>final 2025 + solution/</code> (Q3 upload + Q4 CSV)."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Quelle est la fonction OBLIGATOIRE pour finaliser un upload securise ?",
        opts: [
          "<code>rename()</code>",
          "<code>move_uploaded_file()</code>",
          "<code>copy()</code>",
          "<code>file_put_contents()</code>"
        ],
        correct: "b",
        expl: "<code>move_uploaded_file()</code> verifie que le fichier vient bien d'un upload HTTP (pas d'une autre source). <code>rename</code> ou <code>copy</code> permettraient un path traversal attack."
      },
      {
        q: "Pourquoi mettre <code>true</code> dans <code>mkdir($dir, 0777, true)</code> ?",
        opts: [
          "Pour ecraser",
          "Pour creer recursivement",
          "Pour ignorer les erreurs",
          "Pour rendre executable"
        ],
        correct: "b",
        expl: "Le 3eme parametre <code>true</code> active la creation <strong>recursive</strong> : <code>mkdir('a/b/c', 0777, true)</code> cree a, puis b, puis c. Sans <code>true</code>, ca echoue si <code>a/b</code> n'existe pas."
      },
      {
        q: "Pour valider qu'un fichier upload est bien un PDF :",
        opts: [
          "<code>$_FILES['f']['type'] === 'application/pdf'</code>",
          "<code>pathinfo($_FILES['f']['name'], PATHINFO_EXTENSION) === 'pdf'</code>",
          "Verifier l'extension ET le contenu (magic bytes)",
          "Les options b ou c"
        ],
        correct: "d",
        expl: "Le MIME envoye par le navigateur (<code>$_FILES['type']</code>) est manipulable. Toujours verifier l'extension via <code>pathinfo</code>. Pour une vraie securite, verifier aussi les magic bytes avec <code>finfo</code>."
      },
      {
        q: "Quelle est la difference entre <code>fputcsv</code> et <code>file_put_contents</code> pour ecrire du CSV ?",
        opts: [
          "Aucune",
          "<code>fputcsv</code> gere automatiquement les quotes et echappements",
          "<code>file_put_contents</code> est plus rapide",
          "<code>fputcsv</code> ne marche que pour les nombres"
        ],
        correct: "b",
        expl: "<code>fputcsv($f, ['Chadi', 'a,b'])</code> echappera automatiquement la virgule en quotant : <code>Chadi,\"a,b\"</code>. Avec <code>file_put_contents</code> + implode, tu dois gerer ca toi-meme."
      },
      {
        q: "Comment decoder un JSON en tableau associatif ?",
        opts: [
          "<code>json_decode($s)</code>",
          "<code>json_decode($s, true)</code>",
          "<code>json_to_array($s)</code>",
          "<code>(array) json_decode($s)</code>"
        ],
        correct: "b",
        expl: "<code>json_decode($s, true)</code> retourne un array associatif. Sans le <code>true</code>, c'est un objet <code>stdClass</code> (acces via <code>$obj->prop</code>)."
      }
    ],
    exercises: [
      {
        num: 1,
        diff: "easy",
        title: "Formulaire upload",
        desc: "Form avec enctype + print_r $_FILES.",
        sol: "<?php\nif ($_SERVER['REQUEST_METHOD'] === 'POST') {\n    echo '<pre>';\n    print_r($_FILES);\n    echo '</pre>';\n}\n?>\n<form method=\"POST\" enctype=\"multipart/form-data\">\n    <input type=\"file\" name=\"doc\">\n    <button>Envoyer</button>\n</form>"
      },
      {
        num: 2,
        diff: "easy",
        title: "Taille en KB",
        desc: "Afficher la taille en kilo-octets.",
        sol: "<?php\nif (isset($_FILES['doc'])) {\n    echo round($_FILES['doc']['size'] / 1024, 2) . ' KB';\n}\n?>"
      },
      {
        num: 3,
        diff: "easy",
        title: "Extension lowercase",
        desc: "pathinfo + strtolower.",
        sol: "<?php\n$ext = strtolower(pathinfo('Mon_Fichier.PDF', PATHINFO_EXTENSION));\necho $ext; // pdf\n?>"
      },
      {
        num: 4,
        diff: "easy",
        title: "Verifier PDF",
        desc: "Le fichier est-il un PDF ?",
        sol: "<?php\n$ext = strtolower(pathinfo($_FILES['doc']['name'], PATHINFO_EXTENSION));\nif ($ext === 'pdf') {\n    echo 'PDF valide';\n} else {\n    echo 'Format non supporte';\n}\n?>"
      },
      {
        num: 5,
        diff: "easy",
        title: "mkdir recursif",
        desc: "Creer une arborescence.",
        sol: "<?php\n$dir = 'uploads/' . date('Y/m/d');\nif (!is_dir($dir)) {\n    mkdir($dir, 0777, true); // true = recursif\n}\necho 'Dossier pret: ' . $dir;\n?>"
      },
      {
        num: 6,
        diff: "medium",
        title: "Validation PDF <=1Mo",
        desc: "PDF uniquement, max 1 Mo.",
        sol: "<?php\nif ($_FILES['doc']['error'] !== UPLOAD_ERR_OK) die('Upload echoue');\n\n$ext = strtolower(pathinfo($_FILES['doc']['name'], PATHINFO_EXTENSION));\nif ($ext !== 'pdf')                     die('PDF requis');\nif ($_FILES['doc']['size'] > 1024 * 1024) die('Trop volumineux');\n\necho 'Validation OK';\n?>"
      },
      {
        num: 7,
        diff: "medium",
        title: "uniqid rename",
        desc: "Renommer avec uniqid + ext.",
        sol: "<?php\n$ext = strtolower(pathinfo($_FILES['doc']['name'], PATHINFO_EXTENSION));\n$new = uniqid('doc_', true) . '.' . $ext;\necho $new; // doc_6745a3b...pdf\n?>"
      },
      {
        num: 8,
        diff: "medium",
        title: "Dossier date Y/m/d",
        desc: "Sauvegarder dans uploads/AAAA/MM/JJ.",
        sol: "<?php\n$ext = strtolower(pathinfo($_FILES['doc']['name'], PATHINFO_EXTENSION));\n$new = uniqid() . '.' . $ext;\n$dir = 'uploads/' . date('Y/m/d');\nif (!is_dir($dir)) mkdir($dir, 0777, true);\nif (move_uploaded_file($_FILES['doc']['tmp_name'], \"$dir/$new\")) {\n    echo 'Sauvegarde: ' . \"$dir/$new\";\n}\n?>"
      },
      {
        num: 9,
        diff: "medium",
        title: "CSV vers tableau HTML",
        desc: "Lire un CSV et afficher.",
        sol: "<?php\n$file = fopen('data.csv', 'r');\necho '<table>';\nwhile (($row = fgetcsv($file)) !== false) {\n    echo '<tr>';\n    foreach ($row as $cell) {\n        echo '<td>' . htmlspecialchars($cell) . '</td>';\n    }\n    echo '</tr>';\n}\necho '</table>';\nfclose($file);\n?>"
      },
      {
        num: 10,
        diff: "medium",
        title: "CSV append",
        desc: "Ajouter une ligne au CSV.",
        sol: "<?php\nif ($_SERVER['REQUEST_METHOD'] === 'POST') {\n    $file = fopen('inscriptions.csv', 'a');\n    fputcsv($file, [\n        $_POST['name']  ?? '',\n        $_POST['email'] ?? '',\n        date('Y-m-d H:i:s'),\n    ]);\n    fclose($file);\n    echo 'Ligne ajoutee';\n}\n?>"
      },
      {
        num: 11,
        diff: "hard",
        title: "Upload image PNG/JPG",
        desc: "Image <=2 Mo, PNG ou JPG.",
        sol: "<?php\n$file = $_FILES['photo'];\nif ($file['error'] !== UPLOAD_ERR_OK) die('Erreur upload');\n\n$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));\nif (!in_array($ext, ['png', 'jpg', 'jpeg'])) die('Format non autorise');\nif ($file['size'] > 2 * 1024 * 1024)         die('Trop lourd');\n\n$new = 'photo_' . uniqid() . '.' . $ext;\n$dir = 'uploads/photos';\nif (!is_dir($dir)) mkdir($dir, 0777, true);\nif (move_uploaded_file($file['tmp_name'], \"$dir/$new\")) {\n    echo 'Sauvegarde: ' . \"$dir/$new\";\n}\n?>"
      },
      {
        num: 12,
        diff: "hard",
        title: "Tail log (10 dernieres)",
        desc: "Afficher les 10 dernieres lignes.",
        sol: "<?php\n$lines = file('app.log');\nforeach (array_slice($lines, -10) as $line) {\n    echo htmlspecialchars($line) . '<br>';\n}\n?>"
      },
      {
        num: 13,
        diff: "hard",
        title: "Form vers JSON",
        desc: "Sauver $_POST en JSON pretty.",
        sol: "<?php\n$name = preg_replace('/[^a-z0-9]/', '-', strtolower($_POST['name'] ?? 'x'));\n$file = date('Y-m-d') . '-' . $name . '.json';\nfile_put_contents(\n    $file,\n    json_encode($_POST, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)\n);\necho 'Sauvegarde: ' . $file;\n?>"
      },
      {
        num: 14,
        diff: "hard",
        title: "Upload multiple",
        desc: "Boucle sur plusieurs fichiers.",
        sol: "<?php\nforeach ($_FILES['images']['tmp_name'] as $i => $tmp) {\n    if ($_FILES['images']['error'][$i] !== UPLOAD_ERR_OK) continue;\n    $ext = strtolower(pathinfo($_FILES['images']['name'][$i], PATHINFO_EXTENSION));\n    if (!in_array($ext, ['png', 'jpg'])) continue;\n    $new = uniqid('img_', true) . '.' . $ext;\n    move_uploaded_file($tmp, 'uploads/' . $new);\n    echo 'Sauve: ' . $new . '<br>';\n}\n?>"
      },
      {
        num: 15,
        diff: "hard",
        title: "safe_save() reutilisable",
        desc: "Fonction de sauvegarde generique.",
        sol: "<?php\nfunction safe_save(array $file, array $allowed, int $maxBytes, string $dir): string {\n    if ($file['error'] !== UPLOAD_ERR_OK) throw new RuntimeException('Upload echoue');\n    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));\n    if (!in_array($ext, $allowed, true)) throw new RuntimeException('Extension invalide');\n    if ($file['size'] > $maxBytes)        throw new RuntimeException('Trop volumineux');\n    if (!is_dir($dir)) mkdir($dir, 0777, true);\n    $name = uniqid() . '.' . $ext;\n    if (!move_uploaded_file($file['tmp_name'], \"$dir/$name\")) {\n        throw new RuntimeException('Echec move');\n    }\n    return \"$dir/$name\";\n}\n?>"
      },
      {
        num: 16,
        diff: "extreme",
        title: "Upload 2022-23 (exam)",
        desc: "Espaces -> tirets + dossier date.",
        sol: "<?php\n$ext = strtolower(pathinfo($_FILES['fichier']['name'], PATHINFO_EXTENSION));\nif ($ext !== 'pdf') die('PDF uniquement');\n\n$base = strtolower(str_replace(' ', '-', trim($_POST['filename'])));\n$new  = $base . '.' . $ext;\n$dir  = 'assets/pdf/' . date('Y/m/d');\nif (!is_dir($dir)) mkdir($dir, 0777, true);\nif (move_uploaded_file($_FILES['fichier']['tmp_name'], \"$dir/$new\")) {\n    echo 'OK';\n}\n?>"
      },
      {
        num: 17,
        diff: "extreme",
        title: "Carriere 2023-24",
        desc: "CV-{POSTE}-{EMAIL}.ext.",
        sol: "<?php\n$ext = strtolower(pathinfo($_FILES['cv']['name'], PATHINFO_EXTENSION));\nif (!in_array($ext, ['pdf', 'jpg'])) die('Format non autorise');\n\n$poste = strtoupper(preg_replace('/\\s+/', '-', $_POST['poste']));\n$email = strtolower($_POST['email']);\n$new   = 'CV-' . $poste . '-' . $email . '.' . $ext;\n$dir   = 'assets/cv/' . date('Y');\nif (!is_dir($dir)) mkdir($dir, 0777, true);\nmove_uploaded_file($_FILES['cv']['tmp_name'], \"$dir/$new\");\necho 'CV sauve: ' . \"$dir/$new\";\n?>"
      },
      {
        num: 18,
        diff: "extreme",
        title: "jobPosting (Final 2025)",
        desc: "Validation + upload + INSERT.",
        sol: "<?php\n$errors = [];\nif (!preg_match('/^[a-zA-Z\\s]{3,}$/', $_POST['name'])) $errors[] = 'name';\nif (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))  $errors[] = 'email';\nif ($_FILES['cv']['size'] > 5 * 1024 * 1024)              $errors[] = 'cv_size';\n\nif (empty($errors)) {\n    $ext = pathinfo($_FILES['cv']['name'], PATHINFO_EXTENSION);\n    $new = uniqid() . '.' . $ext;\n    move_uploaded_file($_FILES['cv']['tmp_name'], 'uploads/cv/' . $new);\n    $stmt = $pdo->prepare(\n        'INSERT INTO job_applications (name, email, poste, salaire, cv_path, created_at)\n         VALUES (?, ?, ?, ?, ?, NOW())'\n    );\n    $stmt->execute([\n        $_POST['name'], $_POST['email'],\n        $_POST['poste'], $_POST['salaire'],\n        $new,\n    ]);\n    echo 'Candidature envoyee';\n} else {\n    print_r($errors);\n}\n?>"
      },
      {
        num: 19,
        diff: "extreme",
        title: "CSV employes",
        desc: "Ajout + affichage en tableau.",
        sol: "<?php\nfunction add_employee(string $name, string $position, int $salary): void {\n    $file = fopen('employees.csv', 'a');\n    fputcsv($file, [$name, $position, $salary, date('Y-m-d')]);\n    fclose($file);\n}\n\nfunction display_employees(): void {\n    echo '<table><tr><th>Nom</th><th>Poste</th><th>Salaire</th></tr>';\n    $file = fopen('employees.csv', 'r');\n    while (($row = fgetcsv($file)) !== false) {\n        echo '<tr>'\n           . '<td>' . htmlspecialchars($row[0]) . '</td>'\n           . '<td>' . htmlspecialchars($row[1]) . '</td>'\n           . '<td>' . number_format((float)$row[2], 0, '.', ' ') . '</td>'\n           . '</tr>';\n    }\n    fclose($file);\n    echo '</table>';\n}\n?>"
      },
      {
        num: 20,
        diff: "extreme",
        title: "Images de campagne (multi-upload)",
        desc: "Upload multiple reserve aux orgs.",
        sol: "<?php\nrequire_role('org');\n$cid = (int) $_POST['campaign_id'];\n\n// Verifier ownership\n$stmt = $pdo->prepare(\n    'SELECT 1 FROM campaigns WHERE id = ? AND organisation_id = ?'\n);\n$stmt->execute([$cid, $_SESSION['user']['id']]);\nif (!$stmt->fetchColumn()) { http_response_code(403); die(); }\n\nforeach ($_FILES['images']['tmp_name'] as $i => $tmp) {\n    if ($_FILES['images']['error'][$i] !== UPLOAD_ERR_OK) continue;\n    try {\n        $path = safe_save([\n            'name'     => $_FILES['images']['name'][$i],\n            'tmp_name' => $tmp,\n            'error'    => 0,\n            'size'     => $_FILES['images']['size'][$i],\n        ], ['png', 'jpg'], 2 * 1024 * 1024, 'uploads/campaigns/' . $cid);\n        $pdo->prepare(\n            'INSERT INTO campaign_images (campaign_id, path, created_at)\n             VALUES (?, ?, NOW())'\n        )->execute([$cid, $path]);\n    } catch (RuntimeException $e) {\n        echo 'Erreur image ' . $i . ': ' . $e->getMessage() . '<br>';\n    }\n}\n?>"
      }
    ],
    problemes: [
      {
        num: 101,
        diff: "extreme",
        title: "Problème 07",
        desc: "<b>TD 07 CNAM — sujet officiel.</b><br><br>Question 1:\r<br>\r<br>Créez un fichier texte (data.txt) contenant des données au format CSV (Comma-Separated Values). Par exemple :\r<br>\r<br>nom,prenom,age\r<br>Dupont,Jean,30\r<br>Durand,Marie,25\r<br>\r<br>Question 2:\r<br>\r<br>Modifiez le script PHP pour stocker les données lues dans un tableau associatif. Chaque ligne du fichier sera un\r<br>élément du tableau. Affichez le contenu du tableau associatif sous forme de tableau HTML sur la page web.\r<br>\r<br>Question 3:\r<br>\r<br>Ajoutez une fonction ajouter_personne() permettant d'ajouter de nouvelles données au fichier (nom,prenom,age).\r<br>\r<br>Assurez-vous que les nouvelles données sont ajoutées à la fin du fichier data.txt et reflétées dans le tableau affiché\r<br>sur la page.<br><br><i>Source : <code>documents/PHP_UNI/TD 01-16_Questions_Solution.pdf</code>. Solution extraite du PDF officiel (accolades reconstruites par heuristique — verifier si necessaire).</i>",
        sol: "// === TD 7 CNAM — solution officielle ===\n<?php\r\n  // Question 1\r\n  $filename = \"data.txt\";\r\n\r\n  if(!file_exists($filename)) {\n     $content = \"nom,prenom,age\\n\";\r\n\r\n     $file = fopen($filename, \"w\") or die(\"Can't open/create the file $filename\");\r\n     fwrite($file, $content);\r\n\r\n     fclose($file);\r\n\r\n     echo \"<div>File created successfully!</div>\";\r\n}\r\najouter_personne(\"Samir\", \"Mounir\", 18);\r\najouter_personne(\"Fadi\", \"Radi\", 19);\r\najouter_personne(\"Charif\", \"Nabil\", 21);\r\n\r\n// Question 2\r\n$file = fopen($filename, \"r\") or die(\"Can't open the file $filename\");\r\n$dataArr = [];\r\n\r\n$header = fgets($file);\r\n$keys = explode(\",\", trim($header));\r\n\r\nwhile(!feof($file)) {\n  $line = fgets($file);\r\n  if(empty($line)) break;\r\n  $values = explode(\",\", trim($line));\r\n  $dataArrElement = array_combine($keys, $values);\r\n  // array_push($dataArr, $dataArrElement);\r\n  // OR\r\n  $dataArr*+ = $dataArrElement;\r\n\r\n}\r\nfclose($file);\r\necho \"<div>Array created successfully!</div>\";\r\necho \"<br>\";\r\n\r\n$html = \"<table border='1' cellpadding='5' cellspacing='0'>\";\r\n$html .= \"<thead>\";\r\nforeach($keys as $key)\r\n,\r\n\r\n  $html .= \"<th>$key</th>\";\r\n}\r\n$html .= \"</thead>\";\r\n$html .= \"<tbody>\";\r\nforeach($dataArr as $personInfo) {\n\r\n  $html .= \"<tr>\";\r\n  foreach($personInfo as $attribute) {\n\r\n     $html .= \"<td>$attribute</td>\";\r\n}\r\n  $html .= \"</tr>\";\r\n}\r\n$html .= \"</tbody>\";\r\n$html .= \"</table>\";\r\necho $html;\r\n\r\n// Question 3\r\nfunction ajouter_personne($nom, $prenom, $age) {\n\r\n  if(empty($nom) || empty($prenom) || empty($age)) return false;\r\n  global $filename;\r\n  $file = fopen($filename, 'a') or die(\"Unable to open the file $filename\");\r\n  $newLine = \"$nom,$prenom,$age\\n\";\r\n  fwrite($file, $newLine);\r\n  fclose($file);\r\n}"
      },
      {
        num: 102,
        diff: "extreme",
        title: "Problème 10 — File Upload",
        desc: "<b>TD 10 CNAM — File Upload — sujet officiel.</b><br><br>Ajoutez au TD 09 -&gt; form.php un champ d'entrée pour télécharger le CV qui doit être au format PDF. Modifiez le\r<br>fichier save_form.php comme suit :\r<br>\r<br>     Créez un dossier portant le nom {année}-{mois}-{jour}-{nom}-{position}.\r<br>     Enregistrez les données soumises dans un fichier {année}-{mois}-{jour}-data-{nom}-{position}.json.\r<br>     Vérifiez que le document est au format PDF et enregistrez-le sous le nom : {année}-{mois}-{jour}-cv-\r<br>\r<br>         {nom}-{position}.pdf\r<br>\r<br>    form.php\r<br>\r<br>&lt;!DOCTYPE html&gt;\r<br>&lt;html lang=\"en\"&gt;\r<br>\r<br>&lt;head&gt;\r<br>  &lt;meta charset=\"UTF-8\"&gt;\r<br>  &lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;\r<br>  &lt;title&gt;Form Submission&lt;/title&gt;\r<br>\r<br>&lt;/head&gt;\r<br>\r<br>&lt;body&gt;\r<br>  &lt;h3&gt;Login&lt;/h3&gt;\r<br>  &lt;form action=\"save_form.php\" method=\"post\" enctype=\"multipart/form-data\"&gt;\r<br>     &lt;label for=\"name\"&gt;Name&lt;/label&gt;\r<br>     &lt;input type=\"text\" name=\"name\" id=\"name\"&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>     &lt;label for=\"email\"&gt;Email&lt;/label&gt;\r<br>     &lt;input type=\"email\" name=\"email\" id=\"email\"&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>     &lt;label for=\"password\"&gt;Password&lt;/label&gt;\r<br>     &lt;input type=\"password\" name=\"password\" id=\"password\"&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>     &lt;label for=\"birthdate\"&gt;Birthdate&lt;/label&gt;\r<br>     &lt;input type=\"date\" name=\"birthdate\" id=\"birthdate\"&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>     &lt;label for=\"number_of_kids\"&gt;Number of kids&lt;/label&gt;\r<br>     &lt;input type=\"number\" name=\"number_of_kids\" id=\"number_of_kids\"&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>     Gender:&lt;br&gt;\r<br>     &lt;input type=\"radio\" id=\"gender_m\" name=\"gender\" value=\"m\"&gt;\r<br>     &lt;label for=\"gender_m\"&gt;Male&lt;/label&gt;&lt;br&gt;\r<br>     &lt;input type=\"radio\" id=\"gender_f\" name=\"gender\" value=\"f\"&gt;\r<br>     &lt;label for=\"gender_f\"&gt;Female&lt;/label&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>\r<br>     &lt;label&gt;Nationality:&lt;/label&gt;\r<br>     &lt;br&gt;\r<br>     &lt;label for=\"lb\"&gt;Lebanon&lt;/label&gt;\r<br>     &lt;input type=\"checkbox\" name=\"nationality*+\" id=\"lb\" value=\"lb\" checked&gt;&lt;br&gt;\r<br>     &lt;label for=\"fr\"&gt;France&lt;/label&gt;\r<br>     &lt;input type=\"checkbox\" name=\"nationality*+\" id=\"fr\" value=\"fr\"&gt;&lt;br&gt;\r<br>     &lt;label for=\"us\"&gt;USA&lt;/label&gt;\r<br>     &lt;input type=\"checkbox\" name=\"nationality*+\" id=\"us\" value=\"us\" checked&gt;&lt;br&gt;\r<br>\r<br>     &lt;br&gt;&lt;br&gt;\r<br>     &lt;label for=\"message\"&gt;Message&lt;/label&gt;\r<br>     &lt;textarea name=\"message\" id=\"message\" cols=\"30\" rows=\"10\"&gt;&lt;/textarea&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>\r<br>     &lt;label for=\"position\"&gt;Position&lt;/label&gt;\r<br>     &lt;select name=\"position\" id=\"position\"&gt;\r<br>\r<br>        &lt;option value=\"manager\" selected&gt;manager&lt;/option&gt;\r<br>        &lt;option value=\"supervisor\"&gt;supervisor&lt;/option&gt;\r<br>        &lt;option value=\"employee\"&gt;employee&lt;/option&gt;\r<br>     &lt;/select&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>\r<br>     &lt;label for=\"skills\"&gt;Skills&lt;/label&gt;\r<br>     &lt;select name=\"skills*+\" id=\"skills\" multiple&gt;\r<br>\r<br>        &lt;option value=\"word\" selected&gt;word&lt;/option&gt;\r<br>        &lt;option value=\"excel\" selected&gt;excel&lt;/option&gt;\r<br>        &lt;option value=\"programming\" selected&gt;programming&lt;/option&gt;\r<br>     &lt;/select&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>\r<br>     &lt;label for=\"cv\"&gt;CV&lt;/label&gt;\r<br>     &lt;input type=\"file\" name=\"cv\" id=\"cv\" accept=\"application/pdf\" required&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>\r<br>     &lt;input type=\"submit\" value=\"Submit\"&gt;\r<br>  &lt;/form&gt;\r<br>&lt;/body&gt;\r<br>\r<br>&lt;/html&gt;\r<br>\r<br>    save_form.php<br><br><i>Source : <code>documents/PHP_UNI/TD 01-16_Questions_Solution.pdf</code>. Solution extraite du PDF officiel (accolades reconstruites par heuristique — verifier si necessaire).</i>",
        sol: "// === TD 10 CNAM — solution officielle ===\n<?php\r\n\r\n// Vérifier si les données sont soumises\r\nif ($_SERVER*\"REQUEST_METHOD\"+ == \"POST\") {\n\r\n  extract($_POST);\r\n\r\n  // ,année--,mois--,jour--,nom--,position-\r\n  $path = Date(\"Y-m-d\") . \"-\" . $name . \"-\" . $position;\r\n  if (!file_exists($path)) {\n\r\n     if (!mkdir($path)) {\n        die(\"No permission to create a directory!\");\r\n\r\n}\r\n}\r\n  // $data = $_POST;\r\n  $_POST*\"submission_date\"+ = date(\"Y-m-d H:i:s\");\r\n\r\n  $jsonData = json_encode($_POST, JSON_PRETTY_PRINT);\r\n\r\n  // ,année--,mois--,jour--data-,nom--,position-.json\r\n  $JSONFileName = date(\"Y-m-d\") . \"-data-\" . $name . \"-\" . $position . \".json\";\r\n  $JSONFullpath = $path . \"/\" . $JSONFileName;\r\n  $file = fopen($JSONFullpath, \"w\");\r\n  fwrite($file, $jsonData);\r\n  fclose($file);\r\n\r\n  // Check if the user uploaded a CV in PDF\r\n  if (isset($_FILES*\"cv\"]) && $_FILES*\"cv\"+*\"size\"+ > 0 && $_FILES*\"cv\"+*\"error\"+ == 0) {\n\r\n     if ($_FILES*\"cv\"+*\"type\"+ == \"application/pdf\") {\n\r\n        // ,année--,mois--,jour--cv-,nom--,position-.pdf\r\n        $extension = pathinfo($_FILES*\"cv\"+*\"name\"], PATHINFO_EXTENSION);\r\n        $cvFileName = date(\"Y-m-d\") . \"-cv-\" . $name . \"-\" . $position . \".\" . $extension;\r\n        $cvFullpath = $path . \"/\" . $cvFileName;\r\n        move_uploaded_file($_FILES*\"cv\"+*\"tmp_name\"], $cvFullpath);\r\n     - else  {\n        die(\"Le document n'est pas en PDF\");\r\n}\r\n}\r\n  exit(\"Les données ont étées sauvegarder\");\r\n- else  {\n  header(\"Location: form.php\");\r\n  // exit();\r\n}"
      },
      {
        num: 103,
        diff: "extreme",
        title: "Problème 15 — Upload de fichier CSV et insertion de",
        desc: "<b>TD 15 CNAM — Upload de fichier CSV et insertion de — sujet officiel.</b><br><br>toutes les données dans une base de données MySQL\r<br>\r<br>Base de données\r<br>\r<br>Créer une nouvelle base de données nommée note avec un utilisateur ayant les droits SELECT, UPDATE, DELETE,\r<br>INSERT. Créer les tables suivantes :\r<br>\r<br>     matiere (id, description)\r<br>     annee (annee)\r<br>     note (id, note, annee, matiereID, eleveID)\r<br>\r<br>Ajouter toutes les requêtes que vous avez utilisées dans un fichier requetes.sql.\r<br>\r<br>Page Web\r<br>\r<br>Créer une page note.php qui affiche un formulaire avec les champs suivants :\r<br>\r<br>     Select : Matière (rempli à partir de la base de données)\r<br>     Select : Année (rempli à partir de la base de données ; l'année actuelle doit être sélectionnée par défaut)\r<br>     Upload de fichier : Notes (le fichier à télécharger doit être au format CSV)\r<br>\r<br>Une fois le formulaire soumis, il faut valider que toutes les données ont été envoyées et que le fichier existe et est de\r<br>type CSV. Il faut sauvegarder le fichier dans un dossier appelé notes. Renommer le fichier en : notes-{matiere}-\r<br>{annee}.csv. Lire le fichier ligne par ligne et ajouter les notes (avec l'année et la matière) dans la table note de la\r<br>base de données crées. N'oubliez pas de valider les entrées.\r<br>Veuillez vérifier le fichier note-à-télécharger.csv que vous pouvez utiliser comme exemple :\r<br>\r<br>eleveID,note\r<br>1021,12\r<br>2222,13\r<br>1233,4\r<br>2324,4\r<br>4235,0\r<br>1226,17\r<br>\r<br>requêtes.sql\r<br>\r<br>-- Création de la base de données\r<br>CREATE DATABASE note;\r<br>\r<br>-- Création de l'utilisateur et définition des privilèges\r<br>CREATE USER 'note'@'localhost' IDENTIFIED BY 'note123';\r<br>GRANT SELECT, INSERT, UPDATE, DELETE ON note.* TO 'note'@'localhost';\r<br>FLUSH PRIVILEGES;\r<br>\r<br>USE note;\r<br>\r<br>-- Création de la table matiere\r<br>CREATE TABLE matiere (\r<br>\r<br>  id INT AUTO_INCREMENT PRIMARY KEY,\r<br>  description VARCHAR(255) NOT NULL\r<br>);\r<br>\r<br>-- Création de la table annee\r<br>CREATE TABLE annee (\r<br>\r<br>  annee YEAR PRIMARY KEY\r<br>);\r<br>\r<br>-- Création de la table note\r<br>CREATE TABLE note (\r<br>\r<br>  id INT AUTO_INCREMENT PRIMARY KEY,\r<br>  note FLOAT NOT NULL,\r<br>  annee YEAR NOT NULL,\r<br>  matiereID INT NOT NULL,\r<br>  eleveId INT NOT NULL,\r<br>  FOREIGN KEY (matiereID) REFERENCES matiere(id),\r<br>  FOREIGN KEY (annee) REFERENCES annee(annee)\r<br>);\r<br>\r<br>-- Ajout des matières\r<br>INSERT INTO matiere (description) values ('NFA008'), ('NFA021'), ('NFA040'), ('NFA041'), ('NFA042');\r<br>INSERT INTO annee (annee) values ('2020'), ('2023'), ('2024'), ('2025'), ('2026');\r<br>-- INSERT INTO note (note,annee,matiereID,eleveId) values (20.1,2023,2,12), (18.5,2024,3,132);\r<br>\r<br>TRUNCATE note;\r<br>note.php<br><br><i>Source : <code>documents/PHP_UNI/TD 01-16_Questions_Solution.pdf</code>. Solution extraite du PDF officiel (accolades reconstruites par heuristique — verifier si necessaire).</i>",
        sol: "// === TD 15 CNAM — solution officielle ===\n<?php\r\n// Connexion à la base de données\r\n$servername = \"localhost\";\r\n$username = \"note\";\r\n$password = \"note123\";\r\n$dbname = \"note\";\r\n\r\n$conn = new mysqli($servername, $username, $password, $dbname);\r\n\r\nif ($conn->connect_error) {\n  die(\"Connexion échouée: \" . $conn->connect_error);\r\n\r\n}\r\n\r\n// Fonction pour obtenir les matières depuis la base de données\r\nfunction getMatieres($conn) {\n\r\n  $sql = \"SELECT id, description FROM matiere\";\r\n  $result = $conn->query($sql);\r\n  $matieres = [];\r\n  while($row = $result->fetch_assoc()) {\n\r\n     $matieres*+ = $row;\r\n}\r\n  return $matieres;\r\n}\r\n\r\n// Fonction pour obtenir les années depuis la base de données\r\nfunction getAnnees($conn) {\n\r\n  $sql = \"SELECT annee FROM annee\";\r\n  $result = $conn->query($sql);\r\n  $annees = [];\r\n  while($row = $result->fetch_assoc()) {\n\r\n     $annees*+ = $row;\r\n}\r\n  return $annees;\r\n}\r\n\r\nif ($_SERVER*'REQUEST_METHOD'+ === 'POST') {\n  // Vérification et traitement du formulaire\r\n  $matiereID = $_POST*'matiere'];\r\n  $annee = $_POST*'annee'];\r\n  $file = $_FILES*'notes'];\r\n\r\n  // Validation des entrées\r\n  if (!$matiereID || !$annee || !$file) {\n\r\n     echo \"Tous les champs sont requis.\";\r\n     exit;\r\n}\r\n\r\n  if ($file*'type'+ !== 'text/csv') {\n     echo \"Le fichier doit être au format CSV.\";\r\n     exit;\r\n}\r\n\r\n  // Déplacement du fichier téléchargé\r\n  $uploadDir = 'notes/';\r\n  if (!is_dir($uploadDir)) {\n\r\n     mkdir($uploadDir, 0777, true);\r\n}\r\n\r\n  $filename = \"notes-,$matiereID--,$annee-.csv\";\r\n  $filePath = $uploadDir . $filename;\r\n\r\n  if (move_uploaded_file($file*'tmp_name'], $filePath)) {\n     // Lecture du fichier et insertion dans la base de données\r\n     if (($handle = fopen($filePath, \"r\")) !== FALSE) {\n        fgetcsv($handle); // Sauter la première ligne (en-têtes)\r\n        while (($data = fgetcsv($handle, 1000, \",\")) !== FALSE) {\n          $eleveId = (int) $data*0];\r\n          $note = (float) $data*1];\r\n\r\n          // Validation des données\r\n          if (!is_numeric($note) || $note < 0 || $note > 20) {\n\r\n             echo \"Note invalide pour l'élève ID: $eleveId.\";\r\n             continue; // Passer à la ligne suivante\r\n}\r\n\r\n          $sql = \"INSERT INTO note (note, annee, matiereID, eleveId) VALUES ('$note', '$annee', '$matiereID',\r\n'$eleveId')\";\r\n\r\n          if (!$conn->query($sql)) {\n             echo \"Erreur lors de l'insertion des données pour l'élève ID: $eleveId.\";\r\n\r\n}\r\n}\r\n        fclose($handle);\r\n        echo \"Les données ont été insérées avec succès.\";\r\n     - else  {\n        echo \"Impossible de lire le fichier.\";\r\n}\r\n  - else  {\n     echo \"Erreur lors du téléchargement du fichier.\";\r\n}\r\n- else  {\n  // Affichage du formulaire\r\n  $matieres = getMatieres($conn);\r\n  $annees = getAnnees($conn);\r\n  $currentYear = date('Y');\r\n  ?>\r\n\r\n  <form action=\"note.php\" method=\"post\" enctype=\"multipart/form-data\">\r\n     <label for=\"matiere\">Matière:</label>\r\n     <select name=\"matiere\" id=\"matiere\">\r\n        <?php foreach ($matieres as $matiere) , ?>\r\n          <option value=\"<?php echo $matiere*'id']; ?>\"><?php echo $matiere*'description']; ?></option>\r\n        <?php - ?>\r\n     </select><br>\r\n\r\n     <label for=\"annee\">Année:</label>\r\n     <select name=\"annee\" id=\"annee\">\r\n\r\n        <?php foreach ($annees as $annee) , ?>\r\n          <option value=\"<?php echo $annee*'annee']; ?>\" <?php echo ($annee*'annee'+ == $currentYear) ?\r\n\r\n'selected' : ''; ?>>\r\n             <?php echo $annee*'annee']; ?>\r\n\r\n          </option>\r\n        <?php - ?>\r\n     </select><br>\r\n\r\n     <label for=\"notes\">Fichier des notes (CSV):</label>\r\n     <input type=\"file\" name=\"notes\" id=\"notes\"><br>\r\n\r\n     <input type=\"submit\" value=\"Soumettre\">\r\n  </form>\r\n\r\n  <?php\r\n}\r\n\r\n$conn->close();\r\n?>"
      },
      {
        num: 104,
        diff: "extreme",
        title: "EXAM 2023-2024 Session 1 — Ex.5 Carrière (8 pts)",
        desc: "<b>Sujet officiel CNAM NFA042 2023-2024 Session 1, Exercice 5 (8 pts).</b><br><br>Exercice 5 - Carrière – 8 points\r<br>\r<br>Soit le code la page carriere.php suivant\r<br>\r<br>  &lt;h2&gt;Postuler à un poste&lt;/h2&gt;\r<br>  &lt;form action=\"carriere.php\" method=\"post\" enctype=\"multipart/form-data\"&gt;\r<br>\r<br>     &lt;label for=\"poste\"&gt;Poste :&lt;/label&gt;&lt;br&gt;\r<br>     &lt;select id=\"poste\" name=\"poste\" required&gt;\r<br>\r<br>         &lt;option value=\"\"&gt;Choisir un poste&lt;/option&gt;\r<br>         &lt;?php\r<br>         // Code de la première question\r<br>         ?&gt;\r<br>     &lt;/select&gt;&lt;br&gt;&lt;br&gt;\r<br>     &lt;label for=\"nom\"&gt;Nom :&lt;/label&gt;&lt;br&gt;\r<br>     &lt;input type=\"text\" id=\"nom\" name=\"nom\" required&gt;&lt;br&gt;&lt;br&gt;\r<br>     &lt;label for=\"email\"&gt;Email :&lt;/label&gt;&lt;br&gt;\r<br>     &lt;input type=\"email\" id=\"email\" name=\"email\" required&gt;&lt;br&gt;&lt;br&gt;\r<br>     &lt;label for=\"cv\"&gt;Télécharger votre CV (PDF ou JPG) :&lt;/label&gt;&lt;br&gt;\r<br>     &lt;input type=\"file\" id=\"cv\" name=\"cv\" accept=\".pdf, .jpg\" required&gt;\r<br>     &lt;br&gt;&lt;br&gt;\r<br>     &lt;input type=\"submit\" value=\"Postuler\"&gt;\r<br>  &lt;/form&gt;\r<br>\r<br>• Ajouter le script PHP dans le code ci-dessus afin de récupérer les postes depuis la table `poste` de la base de\r<br>    données et les afficher comme options dans le champ “Poste”. (2 Points)\r<br>\r<br>• Ajouter un script PHP qui : (1 point)\r<br>    o Affiche le formulaire si la méthode de requête est GET.\r<br>    o Récupère les informations soumises si la méthode de requête est POST.\r<br>    o Retourne une réponse HTTP 404 si la méthode de requête n'est ni GET ni POST.\r<br>\r<br>• Assurez-vous que le script vérifie la présence de toutes les données obligatoires (nom, email et poste) lorsque\r<br>    le formulaire est soumis. (1 point)\r<br>\r<br>• Le script doit vérifier que le fichier téléchargé :\r<br>    o Est au format PDF ou JPG.\r<br>    o A une taille supérieure à 0 octet. (1 point)\r<br>\r<br>• Renommez le fichier téléchargé selon le format : CV-{POSTE}-{EMAIL}.pdf (1 point)\r<br>    o {POSTE} est le poste choisi par l'utilisateur.\r<br>    o {EMAIL} est l'adresse e-mail de l'utilisateur.\r<br>    Par exemple : \"CV_DESIGNER_johndoe@gmail.com.pdf\"\r<br>\r<br>• Sauvegardez le fichier dans le dossier (folder) : /assets/cv/{ANNEE} (1 point)\r<br>    {ANNEE} représente l'année actuelle\r<br>\r<br>• Les données soumises doivent être sauvegarder dans la base de données MySQL. (1 point)\r<br>• Les informations de connexion à la base de données sont les suivantes :\r<br>\r<br>    o MySQL Host : localhost\r<br>    o Nom d'utilisateur : cnam\r<br>    o Mot de passe : cnam@2024\r<br>    o Base de données : cariere\r<br>    o La table « carriere » : id (AUTO_INCREMENT), nom, email, poste, nom_du_fichier\r<br>    o La table « poste » : id, description<br><br><i>Source : <code>documents/PHP_UNI/NFA042 - 2023-2024 Session 1 + Solution.pdf</code>. Extraction PDF officielle.</i>",
        sol: "// === EXAM 2023-2024 Session 1 — Ex.5 Carrière (8 pts) — solution officielle ===\nRéponse (Ex 5):\r\n\r\n<?php\r\n$mysqli = new mysqli('localhost', 'cnam', 'cnam@2024', 'carriere');\r\nif ($mysqli->connect_error) die('Erreur de connexion : ' . $mysqli->connect_error);\r\n$query = \"SELECT id, description FROM poste\";\r\n$result = $mysqli->query($query);\r\nif ($result) {\r\n\r\n      while ($row = $result->fetch_assoc()) {\r\n             echo \"<option value='{$row['id']}'>{$row['description']}</option>\";\r\n\r\n      }\r\n      $result->free();\r\n} else {\r\n      echo \"Erreur lors de la récupération des postes : \" . $mysqli->error;\r\n}\r\n$mysqli->close();\r\n?>\r\n_____________________________________________________________________________________________\r\n\r\n<?php\r\n\r\nif ($_SERVER[\"REQUEST_METHOD\"] == \"POST\") {\r\n   if (!empty($_POST['nom']) && !empty($_POST['email']) && !empty($_POST['poste'])) {\r\n      $nom = htmlspecialchars($_POST['nom']);\r\n      $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);\r\n      $poste_id = $_POST['poste'];\r\n      if ($_FILES['cv']['error'] === UPLOAD_ERR_OK) {\r\n          $filename = basename($_FILES['cv']['name']);\r\n          $ext = pathinfo($filename, PATHINFO_EXTENSION);\r\n          if (in_array($ext, ['pdf', 'jpg']) && $_FILES['cv']['size'] > 0) {\r\n             $newFilename = \"CV-\".strtoupper($_POST['poste']).\"-\".strtolower($email).\".\".$ext;\r\n             $uploadDir = __DIR__ . \"/assets/cv/\" . date('Y');\r\n             if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);\r\n                $uploadPath = $uploadDir . \"/\" . $newFilename;\r\n                if (move_uploaded_file($_FILES['cv']['tmp_name'], $uploadPath)) {\r\n                    $mysqli = new mysqli('localhost', 'cnam', 'cnam@2024', 'carriere');\r\n                    if ($mysqli->connect_error) die('Erreur de connexion : ' . $mysqli->connect_error);\r\n                    $query = \"INSERT INTO carriere (nom, email, poste, nom_du_fichier) VALUES (?, ?, ?, ?)\";\r\n                    $stmt = $mysqli->prepare($query);\r\n                    $stmt->bind_param(\"ssis\", $nom, $email, $poste_id, $newFilename);\r\n                    if ($stmt->execute()) echo \"Votre candidature a été soumise avec succès.\";\r\n                    else echo \"Erreur lors de l'insertion des données : \" . $stmt->error;\r\n                    $stmt->close();\r\n                    $mysqli->close();\r\n\r\n                       } else echo \"Erreur lors de l'envoi du fichier CV.\";\r\n                    } else echo \"Veuillez télécharger un fichier au format PDF ou JPG et ayant une taille\r\nsupérieure à 0 octet.\";\r\n                } else echo \"Une erreur s'est produite lors du téléchargement de votre CV.\";\r\n      } else echo \"Veuillez remplir tous les champs obligatoires.\";\r\n}"
      }
    ]
  },
  {
    id: "day-7",
    code: "J7",
    title: {
      fr: "Jour 7 - chap8 OOP + Mock Exam Final 2025",
      en: "Day 7 - chap8 OOP + Mock Exam Final 2025"
    },
    sub: {
      fr: "CNAM chap8 (POO) + dry-run examen 120 min calibre sur Final 2025",
      en: "CNAM chap8 (OOP) + 120-min exam dry-run calibrated on Final 2025"
    },
    why: {
      fr: "CNAM chap8 (POO) apparait dans 2/5 examens (3 pts a chaque fois). Pattern identique : 1 classe, props privees, constructor, 1 methode, instance, appel. Puis le Mock final couvre Q1-Q4 du Final 2025.",
      en: "CNAM chap8 (OOP) shows up in 2/5 exams (3 pts each time). Identical pattern: 1 class, private props, constructor, 1 method, instance, call. Then the Mock covers Q1-Q4 of Final 2025."
    },
    tags: [
      "chap8",
      "OOP",
      "classes",
      "inheritance",
      "mock-exam",
      "Final2025"
    ],
    sections: [
      {
        h: "Classe, proprietes, constructeur",
        blocks: [
          {
            p: "Une <strong>classe</strong> est un patron pour creer des objets. Une <strong>instance</strong> est un objet cree depuis cette classe. Le <code>__construct</code> est appele automatiquement a la creation."
          },
          {
            code: "<?php\nclass Produit {\n    // Proprietes\n    private string $nom;\n    private float  $prix;\n\n    // Constructeur\n    public function __construct(string $nom, float $prix) {\n        $this->nom  = $nom;\n        $this->prix = $prix;\n    }\n\n    // Methode\n    public function afficher(): void {\n        echo \"Produit {$this->nom} : \" . number_format($this->prix, 2) . ' EUR';\n    }\n\n    // Getter\n    public function getPrix(): float {\n        return $this->prix;\n    }\n}\n\n// Instancier et utiliser\n$tv = new Produit('TV 4K', 799.99);\n$tv->afficher();\necho $tv->getPrix();",
            out: "Produit TV 4K : 799.99 EUR\n799.99"
          },
          {
            tip: "<strong>Convention</strong> : noms de classe en <code>PascalCase</code>, methodes en <code>camelCase</code>, proprietes en <code>camelCase</code> aussi. Une classe par fichier, meme nom que le fichier."
          },
          {
            note: "PHP 8 supporte la <strong>constructor property promotion</strong> : <code>public function __construct(public string $nom) {}</code> declare ET assigne la propriete en une ligne."
          }
        ]
      },
      {
        h: "Visibilite : public, protected, private",
        blocks: [
          {
            table: [
              [
                "Modificateur",
                "Accessible depuis"
              ],
              [
                "<code>public</code>",
                "Partout (dehors, classes filles, dedans)"
              ],
              [
                "<code>protected</code>",
                "Classe + classes filles uniquement"
              ],
              [
                "<code>private</code>",
                "Classe definissante uniquement"
              ]
            ]
          },
          {
            code: "<?php\nclass Compte {\n    public string $nom;          // accessible partout\n    protected float $solde = 0;  // accessible par les enfants\n    private string $iban;        // uniquement Compte\n\n    public function getSolde(): float {\n        return $this->solde;  // OK : dans la classe\n    }\n}\n\nclass CompteEpargne extends Compte {\n    public function bonifier(float $taux): void {\n        $this->solde *= (1 + $taux);  // OK : protected accessible\n        // $this->iban = ...           // ERREUR : private invisible\n    }\n}\n\n$c = new Compte();\necho $c->nom;        // OK : public\n// echo $c->solde;   // ERREUR : protected non accessible dehors"
          },
          {
            tip: "Convention : proprietes en <strong>private</strong>, exposees via <strong>getters/setters</strong> publiques. Permet de changer l'implementation sans casser le code appelant (encapsulation)."
          }
        ]
      },
      {
        h: "Heritage avec extends",
        blocks: [
          {
            p: "<code>extends</code> permet a une classe d'heriter des proprietes/methodes d'une autre. PHP ne supporte que l'<strong>heritage simple</strong> (une seule classe parent)."
          },
          {
            code: "<?php\nclass Animal {\n    public function __construct(protected string $nom) {}\n\n    public function parler(): void {\n        echo \"{$this->nom} fait un bruit\";\n    }\n\n    public function presenter(): void {\n        echo \"Je suis {$this->nom}\";\n    }\n}\n\nclass Chien extends Animal {\n    // Override : redefinir une methode\n    public function parler(): void {\n        echo \"{$this->nom} aboie : WOUF !\";\n    }\n\n    // parent:: appelle la methode parente\n    public function presenter(): void {\n        parent::presenter();\n        echo ' et je suis un chien.';\n    }\n}\n\n$rex = new Chien('Rex');\n$rex->parler();      // Rex aboie : WOUF !\n$rex->presenter();   // Je suis Rex et je suis un chien.",
            out: "Rex aboie : WOUF !\nJe suis Rex et je suis un chien."
          },
          {
            note: "Pour empecher l'override d'une methode : <code>final public function ...</code>. Pour interdire l'heritage : <code>final class</code>."
          }
        ]
      },
      {
        h: "Static : methodes et proprietes de classe",
        blocks: [
          {
            p: "Une methode/propriete <code>static</code> appartient a la <strong>classe</strong>, pas a une instance. On l'appelle avec <code>::</code> au lieu de <code>-&gt;</code>."
          },
          {
            code: "<?php\nclass Compteur {\n    private static int $count = 0;\n\n    public static function increment(): int {\n        return ++self::$count;\n    }\n\n    public static function get(): int {\n        return self::$count;\n    }\n}\n\nCompteur::increment(); // 1\nCompteur::increment(); // 2\necho Compteur::get();   // 2\n\n// Pattern : factory statique\nclass User {\n    public function __construct(public string $name) {}\n\n    public static function fromArray(array $data): self {\n        return new self($data['name']);\n    }\n}\n\n$u = User::fromArray(['name' => 'Chadi']);\necho $u->name;",
            out: "2\nChadi"
          },
          {
            tip: "<code>self::</code> = la classe ou la methode est definie. <code>static::</code> = la classe reellement utilisee (Late Static Binding) -- utile en heritage."
          }
        ]
      },
      {
        h: "Pattern modele (style Active Record - chap8 + chap5)",
        blocks: [
          {
            p: "Pattern courant : 1 classe par table, methodes statiques pour <code>find</code>, methodes d'instance pour <code>save/delete</code>."
          },
          {
            code: "<?php\nclass Campaign {\n    public function __construct(\n        public int    $id              = 0,\n        public int    $organisationId  = 0,\n        public string $title           = '',\n        public float  $goal            = 0,\n        public string $status          = 'pending'\n    ) {}\n\n    // Factory : trouver par ID\n    public static function find(PDO $pdo, int $id): ?self {\n        $stmt = $pdo->prepare('SELECT * FROM campaigns WHERE id = ?');\n        $stmt->execute([$id]);\n        $row = $stmt->fetch();\n        if (!$row) return null;\n        return new self(\n            $row['id'], $row['organisation_id'],\n            $row['title'], $row['goal'], $row['status']\n        );\n    }\n\n    // INSERT ou UPDATE selon $id\n    public function save(PDO $pdo): void {\n        if ($this->id === 0) {\n            $stmt = $pdo->prepare(\n                'INSERT INTO campaigns (organisation_id, title, goal, status) VALUES (?, ?, ?, ?)'\n            );\n            $stmt->execute([$this->organisationId, $this->title, $this->goal, $this->status]);\n            $this->id = (int) $pdo->lastInsertId();\n        } else {\n            $stmt = $pdo->prepare(\n                'UPDATE campaigns SET title = ?, goal = ?, status = ? WHERE id = ?'\n            );\n            $stmt->execute([$this->title, $this->goal, $this->status, $this->id]);\n        }\n    }\n\n    public function delete(PDO $pdo): void {\n        $pdo->prepare('DELETE FROM campaigns WHERE id = ?')->execute([$this->id]);\n    }\n\n    public function isOwnedBy(int $userId): bool {\n        return $this->organisationId === $userId;\n    }\n}"
          }
        ]
      },
      {
        h: "🏁 MOCK EXAM — calibre Final 2025 NFA042 (19 pts)",
        blocks: [
          {
            p: "Examen blanc complet, calibre sur le Final 2025 NFA042 (Q1 login, Q2 INSERT matiere, Q3 upload, Q4 CSV). Va dans l'onglet <strong>Exos</strong> et filtre par <strong>🔴 Extreme</strong> pour retrouver les 5 exercices <code>🏁 MOCK</code>. Chacun est un vrai sujet d'examen, avec enonce complet, contraintes et tests."
          },
          {
            table: [
              [
                "Exo",
                "Sujet",
                "Points",
                "Duree"
              ],
              [
                "MOCK 1",
                "Validation NIC libanais (regex)",
                "3 pts",
                "15 min"
              ],
              [
                "MOCK 2",
                "Formulaire de don avec validation",
                "4 pts",
                "25 min"
              ],
              [
                "MOCK 3",
                "Upload justificatif PDF (finfo)",
                "4 pts",
                "25 min"
              ],
              [
                "MOCK 4",
                "CRUD donations en PDO",
                "6 pts",
                "40 min"
              ],
              [
                "MOCK 5",
                "QCM rapide (5 questions)",
                "2 pts",
                "10 min"
              ],
              [
                "Total",
                "",
                "19 pts",
                "115 min"
              ]
            ]
          },
          {
            tip: "<strong>Protocole jour J :</strong> ouvre MOCK 1, lance le timer 120 min (bouton ▶ plus haut), ferme l'onglet solution, ecris sur papier ou dans un editeur SANS aide. Verifie a la fin avec les solutions. Note ton score honnete."
          },
          {
            bad: "Ne regarde PAS les solutions avant d'avoir essaye serieusement. Le but est de tester ton vrai niveau, pas de relire du code deja vu. Si tu blocs plus de 10 min sur un exo, passe au suivant et reviens a la fin."
          },
          {
            note: "Apres avoir fait le 1er mock, refais-le une 2e fois 3 jours plus tard — sans regarder ton premier passage. Tu verras les progres et tu reperreras les fautes recurrentes."
          }
        ]
      },
      {
        h: "🏁 Exercice chronometre - protocole 120 minutes",
        blocks: [
          {
            p: "Le jour J, suis CE plan d'attaque. Il est calibre sur les 5 examens passes :"
          },
          {
            table: [
              [
                "Phase",
                "Duree",
                "Action"
              ],
              [
                "1",
                "0-5 min",
                "Lire TOUT le sujet, identifier chaque exercice"
              ],
              [
                "2",
                "5-15 min",
                "QCM (2 pts) -- rapide, instinct, pas de surreflexion"
              ],
              [
                "3",
                "15-35 min",
                "Fonctions (3-4 pts) -- regex / date / format"
              ],
              [
                "4",
                "35-55 min",
                "Formulaire (3-4 pts) -- POST + validation"
              ],
              [
                "5",
                "55-75 min",
                "Upload (3-8 pts) -- _FILES + mkdir + move"
              ],
              [
                "6",
                "75-115 min",
                "CRUD MySQL (5-9 pts) -- prepare partout"
              ],
              [
                "7",
                "115-120 min",
                "Relecture : prepare / exit / exit / htmlspecialchars"
              ]
            ]
          },
          {
            bad: "Si tu doutes d'une question : <strong>ne perds pas 15 min dessus</strong>. Passe a la suivante, reviens a la fin. Mieux vaut 5 exos a 70% que 1 exo a 100%."
          },
          {
            tip: "Meme si tu n'es pas sur du SQL exact, <strong>ecris toujours <code>$stmt = $pdo-&gt;prepare(...)</code></strong>. Les correcteurs donnent du partiel pour la bonne structure meme si la requete est imparfaite."
          }
        ]
      },
      {
        h: "Checklist avant de rendre",
        blocks: [
          {
            list: [
              "✓ <code>htmlspecialchars</code> sur tout affichage de donnee utilisateur",
              "✓ <code>prepare()</code> + <code>execute()</code> partout en SQL (zero concatenation)",
              "✓ <code>exit;</code> apres chaque <code>header('Location: ...')</code>",
              "✓ <code>mkdir($p, 0777, true)</code> recursif pour les uploads",
              "✓ <code>enctype=\"multipart/form-data\"</code> dans les forms avec fichier",
              "✓ <code>password_hash</code> / <code>password_verify</code> (jamais md5/sha1)",
              "✓ <code>session_start()</code> AVANT toute sortie HTML",
              "✓ Verifier la methode HTTP (<code>REQUEST_METHOD</code>)",
              "✓ Sortir 404 / 405 / 403 si necessaire",
              "✓ Tester chaque fichier mentalement : que se passe-t-il si POST vide ?"
            ]
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Quel modificateur permet l'acces a une propriete depuis la classe ET ses enfants, mais pas dehors ?",
        opts: [
          "<code>public</code>",
          "<code>protected</code>",
          "<code>private</code>",
          "<code>readonly</code>"
        ],
        correct: "b",
        expl: "<code>protected</code> = accessible dans la classe et dans toutes les classes qui en heritent, mais pas depuis l'exterieur."
      },
      {
        q: "Comment appeler la methode d'une classe parente apres l'avoir surchargee ?",
        opts: [
          "<code>$this->parent->methode()</code>",
          "<code>parent::methode()</code>",
          "<code>super::methode()</code>",
          "<code>self::parent->methode()</code>"
        ],
        correct: "b",
        expl: "<code>parent::methode()</code> appelle la version de la classe parente. <code>self::</code> = classe courante. PHP n'a pas de mot-cle <code>super</code>."
      },
      {
        q: "A quoi sert <code>__construct</code> ?",
        opts: [
          "A creer la classe",
          "A initialiser un objet a sa creation",
          "A liberer la memoire",
          "A copier un objet"
        ],
        correct: "b",
        expl: "<code>__construct()</code> est appelle <strong>automatiquement</strong> juste apres <code>new MaClasse(...)</code>. Sert a initialiser les proprietes."
      },
      {
        q: "Comment appelle-t-on une methode <code>static</code> ?",
        opts: [
          "<code>$obj->methode()</code>",
          "<code>MaClasse->methode()</code>",
          "<code>MaClasse::methode()</code>",
          "<code>new MaClasse()->methode()</code>"
        ],
        correct: "c",
        expl: "Les methodes statiques s'appellent avec <code>::</code> sans avoir besoin d'une instance : <code>MaClasse::methode()</code>."
      },
      {
        q: "Quelle est la BONNE strategie pour gerer le temps sur un examen 120 min ?",
        opts: [
          "Faire tous les exos parfaitement dans l'ordre",
          "Commencer par le plus difficile",
          "Repartir : QCM(10)+Fn(20)+Form(20)+Upload(20)+CRUD(40)+Relecture(10)",
          "Passer 30 min sur chaque exo"
        ],
        correct: "c",
        expl: "Le plan de bataille calibre sur les 5 examens passes : tu maximises les points en t'assurant d'aborder TOUS les exos, meme partiellement, puis relire."
      }
    ],
    exercises: [
      {
        num: 1,
        diff: "easy",
        title: "Hello class",
        desc: "Classe avec une methode say().",
        sol: "<?php\nclass Hello {\n    public function say(): void {\n        echo 'Bonjour NFA042';\n    }\n}\n$h = new Hello();\n$h->say();\n?>"
      },
      {
        num: 2,
        diff: "easy",
        title: "Point (x, y)",
        desc: "Classe Point avec constructeur.",
        sol: "<?php\nclass Point {\n    public function __construct(\n        public float $x,\n        public float $y\n    ) {}\n}\n$p = new Point(3, 4);\necho \"({$p->x}, {$p->y})\";\n?>"
      },
      {
        num: 3,
        diff: "easy",
        title: "Counter prive",
        desc: "Increment + getter.",
        sol: "<?php\nclass Counter {\n    private int $n = 0;\n    public function increment(): void { $this->n++; }\n    public function get(): int       { return $this->n; }\n}\n$c = new Counter();\n$c->increment(); $c->increment();\necho $c->get(); // 2\n?>"
      },
      {
        num: 4,
        diff: "easy",
        title: "Rectangle",
        desc: "Constructeur + area().",
        sol: "<?php\nclass Rectangle {\n    public function __construct(\n        private float $width,\n        private float $height\n    ) {}\n    public function area(): float {\n        return $this->width * $this->height;\n    }\n}\n$r = new Rectangle(4, 5);\necho $r->area(); // 20\n?>"
      },
      {
        num: 5,
        diff: "easy",
        title: "__toString",
        desc: "echo direct sur l'objet.",
        sol: "<?php\nclass Greeter {\n    public function __construct(private string $name) {}\n    public function __toString(): string {\n        return 'Bonjour ' . $this->name;\n    }\n}\necho new Greeter('Chadi'); // Bonjour Chadi\n?>"
      },
      {
        num: 6,
        diff: "medium",
        title: "Produit (exam type)",
        desc: "Private + afficher().",
        sol: "<?php\nclass Produit {\n    public function __construct(\n        private string $nom,\n        private string $categorie,\n        private float  $prix\n    ) {}\n    public function afficher(): void {\n        echo \"Le produit {$this->nom} (cat: {$this->categorie}) \"\n           . 'coute ' . number_format($this->prix, 2) . ' EUR';\n    }\n}\n$p = new Produit('TV 4K', 'Electronique', 799);\n$p->afficher();\n?>"
      },
      {
        num: 7,
        diff: "medium",
        title: "BankAccount",
        desc: "deposit / withdraw + solde.",
        sol: "<?php\nclass BankAccount {\n    public function __construct(private float $balance = 0) {}\n    public function deposit(float $amount): void { $this->balance += $amount; }\n    public function withdraw(float $amount): bool {\n        if ($amount > $this->balance) return false;\n        $this->balance -= $amount;\n        return true;\n    }\n    public function getBalance(): float { return $this->balance; }\n}\n?>"
      },
      {
        num: 8,
        diff: "medium",
        title: "MathHelper::factorial",
        desc: "Methode statique recursive.",
        sol: "<?php\nclass MathHelper {\n    public static function factorial(int $n): int {\n        return $n <= 1 ? 1 : $n * self::factorial($n - 1);\n    }\n}\necho MathHelper::factorial(5); // 120\n?>"
      },
      {
        num: 9,
        diff: "medium",
        title: "Panier (Cart)",
        desc: "add + total.",
        sol: "<?php\nclass Cart {\n    private array $items = [];\n    public function add(string $name, float $price): void {\n        $this->items[] = ['name' => $name, 'price' => $price];\n    }\n    public function total(): float {\n        return array_sum(array_column($this->items, 'price'));\n    }\n}\n$cart = new Cart();\n$cart->add('TV', 799);\n$cart->add('Souris', 25);\necho $cart->total(); // 824\n?>"
      },
      {
        num: 10,
        diff: "medium",
        title: "Date wrapper",
        desc: "Wrapper DateTime chainable.",
        sol: "<?php\nclass DateWrapper {\n    private DateTime $dt;\n    public function __construct(string $date) {\n        $this->dt = new DateTime($date);\n    }\n    public function addDays(int $n): self {\n        $this->dt->modify(\"+$n day\");\n        return $this;\n    }\n    public function format(string $f = 'Y-m-d'): string {\n        return $this->dt->format($f);\n    }\n}\necho (new DateWrapper('2026-05-24'))->addDays(10)->format(); // 2026-06-03\n?>"
      },
      {
        num: 11,
        diff: "hard",
        title: "Validator chainable",
        desc: "->required()->email()->passes().",
        sol: "<?php\nclass Validator {\n    private array $errors = [];\n    public function __construct(private mixed $value) {}\n    public function required(): self {\n        if (empty($this->value)) $this->errors[] = 'required';\n        return $this;\n    }\n    public function email(): self {\n        if (!filter_var($this->value, FILTER_VALIDATE_EMAIL)) {\n            $this->errors[] = 'email';\n        }\n        return $this;\n    }\n    public function passes(): bool   { return empty($this->errors); }\n    public function errors(): array { return $this->errors; }\n}\n$v = (new Validator($_POST['email'] ?? ''))->required()->email();\nif (!$v->passes()) print_r($v->errors());\n?>"
      },
      {
        num: 12,
        diff: "hard",
        title: "User from array",
        desc: "Auto-fill par property_exists.",
        sol: "<?php\nclass User {\n    public int    $id   = 0;\n    public string $name = '';\n    public string $email = '';\n    public function __construct(array $data) {\n        foreach ($data as $k => $v) {\n            if (property_exists($this, $k)) $this->$k = $v;\n        }\n    }\n    public function toArray(): array {\n        return get_object_vars($this);\n    }\n}\n$u = new User(['id' => 5, 'name' => 'Chadi', 'email' => 'c@s.lb']);\nprint_r($u->toArray());\n?>"
      },
      {
        num: 13,
        diff: "hard",
        title: "Heritage Person",
        desc: "Donor + Org extends Person.",
        sol: "<?php\nclass Person {\n    public function __construct(\n        public string $name,\n        public string $email\n    ) {}\n}\nclass Donor extends Person {\n    public float $totalDonated = 0;\n}\nclass Organisation extends Person {\n    public bool $verified = false;\n}\n$d = new Donor('Chadi', 'c@s.lb');\n$d->totalDonated = 500;\necho $d->name . ' a donne ' . $d->totalDonated;\n?>"
      },
      {
        num: 14,
        diff: "hard",
        title: "Campaign::find",
        desc: "Methode statique avec PDO.",
        sol: "<?php\nclass Campaign {\n    public int    $id = 0;\n    public string $title = '';\n    public function __construct() {}\n    public static function find(PDO $pdo, int $id): ?self {\n        $stmt = $pdo->prepare('SELECT * FROM campaigns WHERE id = ?');\n        $stmt->execute([$id]);\n        $row = $stmt->fetch(PDO::FETCH_ASSOC);\n        if (!$row) return null;\n        $c = new self();\n        $c->id    = (int) $row['id'];\n        $c->title = $row['title'];\n        return $c;\n    }\n}\n?>"
      },
      {
        num: 15,
        diff: "hard",
        title: "Donation + SUM",
        desc: "save + totalForCampaign.",
        sol: "<?php\nclass Donation {\n    public function __construct(\n        public int   $donorId    = 0,\n        public int   $campaignId = 0,\n        public float $amount     = 0\n    ) {}\n    public function save(PDO $pdo): void {\n        $stmt = $pdo->prepare(\n            'INSERT INTO donations (donor_id, campaign_id, amount) VALUES (?, ?, ?)'\n        );\n        $stmt->execute([$this->donorId, $this->campaignId, $this->amount]);\n    }\n    public static function totalForCampaign(PDO $pdo, int $cid): float {\n        $stmt = $pdo->prepare(\n            'SELECT COALESCE(SUM(amount), 0) AS total FROM donations WHERE campaign_id = ?'\n        );\n        $stmt->execute([$cid]);\n        return (float) $stmt->fetchColumn();\n    }\n}\n?>"
      },
      {
        num: 16,
        diff: "extreme",
        title: "User complet (Sawa)",
        desc: "find, create, verifyPassword.",
        sol: "<?php\nclass User {\n    public function __construct(\n        public int    $id       = 0,\n        public string $name     = '',\n        public string $email    = '',\n        public string $role     = 'donor',\n        public string $password = ''\n    ) {}\n\n    public static function findByEmail(PDO $pdo, string $email): ?self {\n        $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');\n        $stmt->execute([$email]);\n        $row = $stmt->fetch(PDO::FETCH_ASSOC);\n        return $row ? new self(\n            $row['id'], $row['name'], $row['email'],\n            $row['role'], $row['password']\n        ) : null;\n    }\n\n    public static function create(PDO $pdo, string $name, string $email, string $pwd, string $role = 'donor'): int {\n        $hash = password_hash($pwd, PASSWORD_DEFAULT);\n        $stmt = $pdo->prepare(\n            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)'\n        );\n        $stmt->execute([$name, $email, $hash, $role]);\n        return (int) $pdo->lastInsertId();\n    }\n\n    public function verifyPassword(string $candidate): bool {\n        return password_verify($candidate, $this->password);\n    }\n}\n?>"
      },
      {
        num: 17,
        diff: "extreme",
        title: "Campaign complet",
        desc: "find, save, delete, isOwnedBy.",
        sol: "<?php\nclass Campaign {\n    public function __construct(\n        public int    $id              = 0,\n        public int    $organisationId  = 0,\n        public string $title           = '',\n        public float  $goal            = 0,\n        public string $status          = 'pending'\n    ) {}\n\n    private static function fromRow(array $r): self {\n        return new self(\n            (int)   $r['id'],\n            (int)   $r['organisation_id'],\n                    $r['title'],\n            (float) $r['goal_amount'],\n                    $r['status']\n        );\n    }\n\n    public static function find(PDO $pdo, int $id): ?self {\n        $stmt = $pdo->prepare('SELECT * FROM campaigns WHERE id = ?');\n        $stmt->execute([$id]);\n        $row = $stmt->fetch(PDO::FETCH_ASSOC);\n        return $row ? self::fromRow($row) : null;\n    }\n\n    public function save(PDO $pdo): void {\n        if ($this->id === 0) {\n            $stmt = $pdo->prepare(\n                'INSERT INTO campaigns (organisation_id, title, goal_amount, status)\n                 VALUES (?, ?, ?, ?)'\n            );\n            $stmt->execute([$this->organisationId, $this->title, $this->goal, $this->status]);\n            $this->id = (int) $pdo->lastInsertId();\n        } else {\n            $stmt = $pdo->prepare(\n                'UPDATE campaigns SET title = ?, goal_amount = ?, status = ? WHERE id = ?'\n            );\n            $stmt->execute([$this->title, $this->goal, $this->status, $this->id]);\n        }\n    }\n\n    public function delete(PDO $pdo): void {\n        $pdo->prepare('DELETE FROM campaigns WHERE id = ?')->execute([$this->id]);\n    }\n\n    public function isOwnedBy(int $userId): bool {\n        return $this->organisationId === $userId;\n    }\n}\n?>"
      },
      {
        num: 18,
        diff: "extreme",
        title: "FormRequest",
        desc: "Regles declaratives.",
        sol: "<?php\nclass FormRequest {\n    private array $errors = [];\n    public function __construct(\n        private array $data,\n        array $rules\n    ) {\n        foreach ($rules as $field => $ruleList) {\n            foreach (explode('|', $ruleList) as $rule) {\n                $this->apply($field, $rule);\n            }\n        }\n    }\n    private function apply(string $f, string $rule): void {\n        $v = $this->data[$f] ?? null;\n        match ($rule) {\n            'required' => empty($v) && $this->errors[$f][] = 'requis',\n            'email'    => !filter_var($v, FILTER_VALIDATE_EMAIL) && $this->errors[$f][] = 'email invalide',\n            default    => null,\n        };\n    }\n    public function passes(): bool { return empty($this->errors); }\n    public function errors(): array { return $this->errors; }\n}\n$req = new FormRequest($_POST, [\n    'name'  => 'required',\n    'email' => 'required|email',\n]);\nif (!$req->passes()) print_r($req->errors());\n?>"
      },
      {
        num: 19,
        diff: "extreme",
        title: "Repository interface",
        desc: "Pattern Repository.",
        sol: "<?php\ninterface Repository {\n    public function find(int $id): ?object;\n    public function all(): array;\n    public function save(object $entity): void;\n    public function delete(int $id): bool;\n}\n\nclass UserRepository implements Repository {\n    public function __construct(private PDO $pdo) {}\n    public function find(int $id): ?object {\n        $stmt = $this->pdo->prepare('SELECT * FROM users WHERE id = ?');\n        $stmt->execute([$id]);\n        $row = $stmt->fetch(PDO::FETCH_OBJ);\n        return $row ?: null;\n    }\n    public function all(): array {\n        return $this->pdo->query('SELECT * FROM users')->fetchAll(PDO::FETCH_OBJ);\n    }\n    public function save(object $u): void { /* INSERT/UPDATE */ }\n    public function delete(int $id): bool {\n        return $this->pdo->prepare('DELETE FROM users WHERE id = ?')->execute([$id]);\n    }\n}\n?>"
      },
      {
        num: 20,
        diff: "extreme",
        title: "Strategie — 120 min",
        desc: "Plan de bataille chronometre 120 min.",
        sol: "<?php\n/* ================================================\n   PLAN 120 minutes, papier+stylo\n   ================================================\n\n   00:00 -> 00:05  Lire TOUT le sujet, identifier les exercices.\n   00:05 -> 00:15  QCM (2 pts) — rapide, pas de surreflexion.\n   00:15 -> 00:35  Fonctions (3-4 pts) — regex/date/format.\n   00:35 -> 00:55  Formulaire (3-4 pts) — POST + validation.\n   00:55 -> 01:15  Upload (3-8 pts) — _FILES + mkdir + move.\n   01:15 -> 01:55  CRUD MySQL (5-9 pts) — prepare partout.\n   01:55 -> 02:00  RELECTURE + verifier prepare/exit/exit.\n\n   CHECKLIST AVANT DE RENDRE:\n   [x] htmlspecialchars sur tout affichage utilisateur\n   [x] prepare() + bind/execute partout en SQL\n   [x] exit; apres chaque header()\n   [x] mkdir($p, 0777, true) recursif\n   [x] enctype=\"multipart/form-data\" si fichier\n   [x] password_hash / password_verify (jamais md5)\n   [x] session_start() AVANT toute sortie HTML\n*/\n?>"
      }
    ],
    problemes: [
      {
        num: 101,
        diff: "extreme",
        title: "🏁 MOCK 1 — Final 2025 Q1 : checkLogin.php (4 pts)",
        desc: "<b>Sujet officiel Final 2025 Q1.</b> Construis la page <code>checkLogin.php</code> qui authentifie un utilisateur via PDO + session.<br><br><b>Etapes notees (bareme officiel) :</b><br>0.5 pt — Verifier <code>REQUEST_METHOD === 'POST'</code><br>0.5 pt — <code>isset</code> + <code>!empty</code> sur email et password<br>0.5 pt — <code>filter_var($email, FILTER_VALIDATE_EMAIL)</code><br>1 pt — <code>prepare</code> + <code>bindParam</code> + <code>execute</code> + <code>rowCount</code><br>0.5 pt — <code>password_verify</code><br>0.5 pt — Stockage en <code>$_SESSION</code><br>0.5 pt — <code>header('location:...')</code> de redirection<br><br><b>Helpers fournis :</b> <code>getPDOConnection()</code> retourne un <code>PDO</code> deja configure.<br><br><b>Schema attendu :</b> table <code>users(id, name, email, password)</code> avec password hashe via <code>password_hash</code>.",
        sol: "<?php\n// Final 2025 Q1 — checkLogin.php (solution officielle)\nsession_start();\n$error = null;\nif ($_SERVER[\"REQUEST_METHOD\"] == \"POST\") {                       // 0.5 pt\n    if (\n        isset($_POST[\"email\"]) && isset($_POST[\"password\"])\n        && !empty($_POST[\"email\"]) && !empty($_POST[\"password\"])\n    ) {                                                            // 0.5 pt\n        extract($_POST);\n        $email = filter_var($email, FILTER_SANITIZE_EMAIL);\n        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {           // 0.5 pt\n            $conn = getPDOConnection();\n            $sql  = \"SELECT * FROM users WHERE email = :email\";\n            $stmt = $conn->prepare($sql);\n            $stmt->bindParam(\"email\", $email, PDO::PARAM_STR);\n            $stmt->execute();\n            if ($stmt->rowCount() > 0) {                           // 1 pt\n                $user = $stmt->fetch(PDO::FETCH_ASSOC);\n                if (password_verify($password, $user[\"password\"])) { // 0.5 pt\n                    $_SESSION[\"user\"][\"id\"]    = $user[\"id\"];\n                    $_SESSION[\"user\"][\"name\"]  = $user[\"name\"];\n                    $_SESSION[\"user\"][\"email\"] = $user[\"email\"];\n                    header(\"location:index.php\");                  // 0.5 pt\n                    exit;\n                } else { $error = \"Invalid Credentials\"; }\n            } else { $error = \"Invalid Credentials\"; }\n        } else { $error = \"Invalid Request\"; }\n    }\n}\n?>"
      },
      {
        num: 102,
        diff: "extreme",
        title: "🏁 MOCK 2 — Final 2025 Q2 : checkDir + isDateWithinRange (2 pts)",
        desc: "<b>Sujet officiel Final 2025 Q2.</b> Ecris ces deux fonctions utilitaires (1 pt chacune).<br><br><b>1) <code>checkDir(string $path): void</code></b><br>Cree le dossier <code>$path</code> en mode <strong>recursif</strong> s'il n'existe pas.<br>• Bareme : 0.5 pt pour <code>is_dir</code>, 0.5 pt pour <code>mkdir($path, 0777, true)</code> (le <code>true</code> est imperatif).<br><br><b>2) <code>isDateWithinRange(string $startDate, string $endDate, string $date): bool</code></b><br>Retourne <code>true</code> si <code>$date</code> est compris entre <code>$startDate</code> et <code>$endDate</code> (bornes incluses). Dates au format ISO <code>Y-m-d</code>.<br>• Bareme : 1 pt pour la double comparaison avec <code>strtotime()</code>.",
        sol: "<?php\n// Final 2025 Q2 — 2 fonctions utilitaires (solution officielle)\n\n// 1) checkDir : cree le dossier recursivement s'il n'existe pas (1 pt)\nfunction checkDir($path) {\n    if (!is_dir($path)) {                  // 0.5 pt\n        mkdir($path, 0777, true);          // 0.5 pt — true = recursif\n    }\n}\n\n// 2) isDateWithinRange : vrai si $date est entre $startDate et $endDate (1 pt)\nfunction isDateWithinRange($startDate, $endDate, $date) {\n    return strtotime($startDate) <= strtotime($date)\n        && strtotime($date)      <= strtotime($endDate);\n}\n\n// Demo\ncheckDir('uploads/' . date('Y/m'));\nvar_dump(isDateWithinRange('2025-01-01', '2025-12-31', '2025-07-09')); // bool(true)\n?>"
      },
      {
        num: 103,
        diff: "extreme",
        title: "🏁 MOCK 3 — Final 2025 Q3 : jobPosting.php (8 pts)",
        desc: "<b>Sujet officiel Final 2025 Q3.</b> Page <code>jobPosting.php</code> : formulaire de candidature avec upload de CV PDF, validation + INSERT en base.<br><br><b>Champs :</b> <code>name</code>, <code>email</code>, <code>position</code>, <code>expectedSalary</code>, <code>cv</code> (fichier).<br><br><b>Bareme officiel (~8 pts) :</b><br>1 pt — Clarte du tableau <code>$error</code><br>0.5 pt — Methode POST<br>0.5 pt — <code>isset</code>/<code>!empty</code> sur tous les champs + <code>$_FILES['cv']['error']==0</code><br>0.5 pt + 0.5 pt — Regex nom <code>/^[a-zA-Zs]{3,}$/</code> + <code>preg_match</code><br>0.5 pt — <code>ucfirst(strtolower($name))</code><br>0.5 pt — Email valide via <code>filter_var</code><br>0.5 pt — Position whitelist <code>in_array</code> (developer/designer/project-manager)<br>0.5 pt — Salaire entier positif via <code>intval</code><br>0.5 pt — CV de type <code>application/pdf</code><br>0.5 pt — Taille CV &lt; 5 Mo<br>0.5 pt — Nom unique <code>uniqid().'.'.$extension</code><br>0.5 pt — <code>move_uploaded_file</code><br>1 pt — INSERT SQL prepared<br>1 pt — Code <code>try/catch</code> autour de l'INSERT<br>1 pt — Si erreurs : <code>$_SESSION['error']</code> + redirect, sinon redirect <code>result.php</code><br><br><b>Helper :</b> <code>getPDOConnection()</code> deja fourni.",
        sol: "<?php\n// Final 2025 Q3 — jobPosting.php (solution officielle ~8 pts)\n$error = [];                                                            // 1 pt clarte erreurs\nif ($_SERVER[\"REQUEST_METHOD\"] == \"POST\") {                             // 0.5 pt\n    if (\n        isset($_POST[\"name\"]) && isset($_POST[\"email\"])\n        && isset($_POST[\"position\"]) && isset($_POST[\"expectedSalary\"])\n        && isset($_FILES[\"cv\"])\n        && !empty($_POST[\"name\"]) && !empty($_POST[\"email\"])\n        && !empty($_POST[\"position\"]) && !empty($_POST[\"expectedSalary\"])\n        && $_FILES[\"cv\"][\"error\"] == 0\n    ) {                                                                  // 0.5 pt\n        extract($_POST);\n\n        $pattern = \"/^[a-zA-Z\\s]{3,}$/\";                                 // 0.5 pt\n        if (!preg_match($pattern, $name)) {                              // 0.5 pt\n            $error[\"name\"] = \"The name should contain only letters with a minimum length of 3\";\n        }\n        $name = ucfirst(strtolower($name));                              // 0.5 pt\n\n        $email = filter_var($email, FILTER_SANITIZE_EMAIL);\n        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {                // 0.5 pt\n            $error[\"email\"] = \"The mail is not valid\";\n        }\n\n        if (!in_array($position, ['developer','designer','project-manager'])) { // 0.5 pt\n            $error[\"position\"] = \"The position is not valid\";\n        }\n\n        $expectedSalary = intval($expectedSalary);\n        if ($expectedSalary <= 0) {                                      // 0.5 pt\n            $error[\"expectedSalary\"] = \"The expected salary should be a positive integer\";\n        }\n\n        if ($_FILES[\"cv\"][\"type\"] != 'application/pdf') {                // 0.5 pt\n            $error[\"cv\"] = \"CV should be in PDF format\";\n        }\n        if ($_FILES[\"cv\"][\"size\"] > (5 * 1024 * 1024)) {                 // 0.5 pt\n            $error[\"cv\"] = \"CV should be less than 5Mo\";\n        }\n\n        $extension    = pathinfo($_FILES[\"cv\"][\"name\"], PATHINFO_EXTENSION);\n        $filename     = uniqid() . \".\" . $extension;\n        $path         = \"/cv/\";\n        $fullFilename = $path . $filename;                               // 0.5 pt nom fichier\n        if (!move_uploaded_file($_FILES[\"cv\"][\"tmp_name\"], $fullFilename)) { // 0.5 pt\n            $error[\"file_upload\"] = \"Error uploading the CV\";\n        }\n\n        $conn = getPDOConnection();\n        $sql  = \"INSERT INTO job_application (id, name, email, position, expected_salary, cv, date_applied)\n                 VALUES (NULL, :name, :email, :position, :expected_salary, :cv, NOW())\"; // 1 pt\n        try {                                                            // 1 pt code\n            $stmt = $conn->prepare($sql);\n            $stmt->bindParam(\"name\", $name, PDO::PARAM_STR);\n            $stmt->bindParam(\"email\", $email, PDO::PARAM_STR);\n            $stmt->bindParam(\"position\", $position, PDO::PARAM_STR);\n            $stmt->bindParam(\"expected_salary\", $expectedSalary, PDO::PARAM_STR);\n            $stmt->bindParam(\"cv\", $filename, PDO::PARAM_STR);\n            $stmt->execute();\n        } catch (PDOException $e) {\n            $error[\"saving_information\"] = \"Database Error \" . $e->getMessage();\n        }\n    }\n}\n\nif (count($error) > 0) {                                                 // 1 pt\n    session_start();\n    $_SESSION[\"error\"] = $error;\n    header('location:jobPosting.php');\n} else {\n    header('location:result.php');\n}\n?>"
      },
      {
        num: 104,
        diff: "extreme",
        title: "🏁 MOCK 4 — Final 2025 Q4 : CSV addEmployee + displayEmployees (4 pts)",
        desc: "<b>Sujet officiel Final 2025 Q4.</b> Gestion d'un fichier <code>data.csv</code> avec deux fonctions.<br><br><b>1) <code>addEmployee(string $name, string $position, string $salary): void</code></b><br>Ouvre <code>data.csv</code> en mode <strong>append</strong> (<code>'a'</code>) puis ajoute une ligne avec <code>fputcsv</code>. Ferme le handle.<br><br><b>2) <code>displayEmployees(): void</code></b><br>• Verifie l'existence du fichier avec <code>file_exists</code>, sinon <code>die</code> avec message.<br>• Ouvre le fichier en lecture, construit un <code>&lt;table border=\"1\"&gt;</code> avec <code>&lt;thead&gt;</code> (Nom / Position / Salaire) et un <code>&lt;tbody&gt;</code>.<br>• Iterate avec <code>fgetcsv</code> dans un <code>while</code>.<br>• Chaque cellule est echappee via <code>htmlspecialchars</code>.<br>• Ferme le handle puis <code>echo</code> le HTML.<br><br><b>Test fourni :</b> <code>addEmployee('Marc','Analyste','1400'); displayEmployees();</code> doit afficher Marc / Analyste / 1400 dans le tableau.",
        sol: "<?php\n// Final 2025 Q4 — gestion CSV (solution officielle)\n\n// 1) addEmployee : ajoute une ligne au CSV\nfunction addEmployee($name, $position, $salary) {\n    $file    = 'data.csv';\n    $newLine = [$name, $position, $salary];\n\n    $csvFile = fopen($file, 'a');               // mode append\n    if ($csvFile !== false) {\n        fputcsv($csvFile, $newLine);\n        fclose($csvFile);\n    }\n}\n\n// 2) displayEmployees : lit le CSV et affiche un tableau HTML\nfunction displayEmployees() {\n    $file = 'data.csv';\n    if (!file_exists($file)) {\n        die(\"Erreur : Le fichier data.csv n'existe pas.\");\n    }\n\n    $csvFile = fopen($file, 'r');\n    $html  = '<table border=\"1\">';\n    $html .= '<thead><tr><th>Nom</th><th>Position</th><th>Salaire</th></tr></thead>';\n    $html .= '<tbody>';\n\n    while (($row = fgetcsv($csvFile)) !== false) {\n        $html .= '<tr>';\n        foreach ($row as $cell) {\n            $html .= '<td>' . htmlspecialchars($cell) . '</td>';\n        }\n        $html .= '</tr>';\n    }\n\n    $html .= '</tbody></table>';\n    fclose($csvFile);\n    echo $html;\n}\n\n// Demo\naddEmployee(\"Marc\", \"Analyste\", \"1400\");\ndisplayEmployees();\n?>"
      },
      {
        num: 105,
        diff: "extreme",
        title: "🏁 MOCK 5 — QCM rapide (2 pts)",
        desc: "<b>5 questions, 2 minutes max par question.</b> Reponds vite, instinct, ne reflechis pas trop. Note tes reponses sur papier, puis verifie avec la solution.<br><br><b>Q1.</b> En PHP 8, <code>var_dump(0 == 'abc')</code> affiche :<br>a) <code>bool(true)</code> &nbsp; b) <code>bool(false)</code> &nbsp; c) <code>NULL</code> &nbsp; d) Erreur fatale<br><br><b>Q2.</b> Quel attribut de <code>&lt;form&gt;</code> est obligatoire pour uploader un fichier ?<br>a) <code>method=\"upload\"</code> &nbsp; b) <code>accept=\"file\"</code> &nbsp; c) <code>enctype=\"multipart/form-data\"</code> &nbsp; d) <code>data=\"binary\"</code><br><br><b>Q3.</b> Pour eviter les injections SQL :<br>a) <code>addslashes()</code> &nbsp; b) <code>mysql_real_escape_string()</code> &nbsp; c) <code>prepare()</code> + <code>execute()</code> &nbsp; d) <code>htmlspecialchars()</code><br><br><b>Q4.</b> Pour stocker un mot de passe en base :<br>a) <code>md5($pwd)</code> &nbsp; b) <code>sha1($pwd)</code> &nbsp; c) <code>password_hash($pwd, PASSWORD_DEFAULT)</code> &nbsp; d) <code>base64_encode($pwd)</code><br><br><b>Q5.</b> Apres <code>header('Location: /home')</code>, on DOIT toujours :<br>a) <code>return;</code> &nbsp; b) <code>exit;</code> &nbsp; c) <code>die();</code> &nbsp; d) (b) ou (c)<br><br>👉 Reponds dans ta tete, puis clique <em>Voir solution</em>.",
        sol: "<?php\n/* =================================================\n   REPONSES MOCK 5 - QCM\n   =================================================\n\n   Q1 -> (b) bool(false)\n         Depuis PHP 8, comparer un nombre a une chaine\n         non-numerique utilise une comparaison stricte.\n         0 == 'abc' = false. Avant PHP 8 : true.\n\n   Q2 -> (c) enctype=multipart/form-data\n         Sans ca, $_FILES sera vide et l'upload echoue\n         silencieusement.\n\n   Q3 -> (c) prepare() + execute()\n         addslashes et mysql_* sont obsoletes.\n         htmlspecialchars protege contre XSS, PAS contre\n         SQL injection.\n\n   Q4 -> (c) password_hash($pwd, PASSWORD_DEFAULT)\n         md5/sha1 sont cassables en quelques secondes.\n         password_hash utilise bcrypt et genere automa-\n         tiquement un sel unique par mot de passe.\n\n   Q5 -> (d) exit; ou die() (synonymes)\n         Sans exit, le code apres header() s'execute\n         quand meme, ce qui peut envoyer du contenu et\n         casser la redirection (Headers already sent).\n\n   ================================================= */\n?>"
      },
      {
        num: 106,
        diff: "extreme",
        title: "Problème 16 — Classe Livre",
        desc: "<b>TD 16 CNAM — Classe Livre — sujet officiel.</b><br><br> Définir la classe Livre\r<br>             o Créez une classe nommée Livre.\r<br>             o Ajoutez les propriétés privées suivantes : $titre, $auteur, $prix, $anneePublication.\r<br>\r<br>     Ajouter un constructeur\r<br>             o Ajoutez un constructeur à la classe Livre qui initialise ces propriétés.\r<br>\r<br>     Ajouter des méthodes setter\r<br>             o Ajoutez des méthodes setter pour chaque propriété (setTitre, setAuteur, setPrix,\r<br>                  setAnneePublication).\r<br>             o Ajouter des méthodes getter\r<br>\r<br>     Ajoutez des méthodes getter pour chaque propriété (getTitre, getAuteur, getPrix, getAnneePublication).<br><br><i>Source : <code>documents/PHP_UNI/TD 01-16_Questions_Solution.pdf</code>. Solution extraite du PDF officiel (accolades reconstruites par heuristique — verifier si necessaire).</i>",
        sol: "// === TD 16 CNAM — solution officielle ===\n<?php\r\nclass Livre ,\r\n\r\n  private $titre;\r\n  private $auteur;\r\n  private $prix;\r\n  private $anneePublication;\r\n\r\n  public function __construct($titre, $auteur, $prix, $anneePublication) {\n     $this->titre = $titre;\r\n     $this->auteur = $auteur;\r\n     $this->prix = $prix;\r\n     $this->anneePublication = $anneePublication;\r\n\r\n}\r\n  public function setTitre($titre) {\n     $this->titre = $titre;\r\n\r\n}\r\n\r\n  public function getTitre() {\n     return $this->titre;\r\n\r\n}\r\n\r\n  public function setAuteur($auteur) {\n     $this->auteur = $auteur;\r\n\r\n}\r\n\r\n  public function getAuteur() {\n     return $this->auteur;\r\n\r\n}\r\n\r\n  public function setPrix($prix) {\n     $this->prix = $prix;\r\n\r\n}\r\n\r\n  public function getPrix() {\n     return $this->prix;\r\n\r\n}\r\n\r\n  public function setAnneePublication($anneePublication) {\n     $this->anneePublication = $anneePublication;\r\n\r\n}\r\n\r\n  public function getAnneePublication() {\n     return $this->anneePublication;\r\n\r\n}\r\n}"
      },
      {
        num: 107,
        diff: "extreme",
        title: "EXAM 2023-2024 Session 1 — Ex.2 Classe Produit (3 pts)",
        desc: "<b>Sujet officiel CNAM NFA042 2023-2024 Session 1, Exercice 2 (3 pts).</b><br><br>Exercice 2 - Classe Produit - 3 points\r<br>\r<br>• Créez une classe \"Produit\" avec les propriétés privées suivantes : (0.75 point)\r<br>         o Nom\r<br>         o Catégorie\r<br>         o Prix\r<br>\r<br>    Réponse :\r<br>\r<br>class Produit{\r<br>      private $nom;\r<br>      private $categorie;\r<br>      private $prix;\r<br>\r<br>}\r<br>\r<br>• Ajoutez un constructeur à la classe qui permet d'initialiser toutes les propriétés. (1 point)\r<br>    Réponse :\r<br>\r<br>     public function __construct($nom, $categorie, $prix){\r<br>               $this-&gt;nom = $nom;\r<br>               $this-&gt;categorie = $categorie;\r<br>               $this-&gt;prix = $prix;\r<br>\r<br>     }\r<br>    • Ajoutez une méthode afficherProduit() qui affiche la phrase suivante : (0.5 point)\r<br>         Le produit [Nom] appartient à la catégorie [Catégorie] et coûte [Prix] euros.\r<br>         Réponse :\r<br>\r<br>          public function afficherProduit() {\r<br>                    echo \"Le produit {$this-&gt;nom} appartient à la catégorie {$this-&gt;categorie}\r<br>\r<br>          et coûte {$this-&gt;prix} euros.\";\r<br>          }\r<br>\r<br>    • Créez une instance de la classe \"Produit\" avec les valeurs suivantes : (0.5 point)\r<br>              o Nom : \"Téléviseur 4K\"\r<br>              o Catégorie : \"Électronique\"\r<br>              o Prix : 799\r<br>\r<br>         Réponse :\r<br>\r<br>          $produit = new Produit(\"Téléviseur 4K\", \"Électronique\", 799);\r<br>\r<br>    • Appelez la méthode afficherProduit() de l'instance créée. (0.25 point)\r<br>         Réponse :\r<br>\r<br>          $produit-&gt;afficherProduit();<br><br><i>Source : <code>documents/PHP_UNI/NFA042 - 2023-2024 Session 1 + Solution.pdf</code>. Extraction PDF officielle.</i>",
        sol: "// === EXAM 2023-2024 Session 1 — Ex.2 Classe Produit (3 pts) — solution non incluse dans le PDF, a ecrire ===\n<?php\n// TODO\n?>"
      }
    ]
  }
];
const GIO = [
  {
    id: "w3-intro",
    code: "B1",
    level: "basic",
    title: {
      fr: "PHP Intro",
      en: "PHP Intro"
    },
    sub: {
      fr: "Qu'est-ce que PHP, ce qu'il peut faire, premier script",
      en: "What PHP is, what it can do, first script"
    },
    tags: [
      "intro",
      "basics"
    ],
    sections: [
      {
        h: "1. Qu'est-ce que PHP ?",
        blocks: [
          {
            p: "<strong>PHP</strong> = <em>PHP : Hypertext Preprocessor</em>. C'est un langage <strong>cote serveur</strong>, open source, gratuit, qui s'integre dans le HTML."
          },
          {
            list: [
              "PHP execute sur le <strong>serveur</strong> — le client ne voit jamais le code source",
              "Il genere du HTML qui est envoye au navigateur",
              "Il fonctionne sur tous les serveurs (Apache, Nginx, IIS) et OS",
              "Il supporte la plupart des bases de donnees (MySQL, PostgreSQL, SQLite…)",
              "Il est <strong>gratuit</strong> et facile a apprendre"
            ]
          },
          {
            note: "Un fichier PHP a l'extension <code>.php</code>. Il peut contenir HTML, CSS, JavaScript et du code PHP."
          }
        ]
      },
      {
        h: "2. Premier script",
        blocks: [
          {
            code: "<!DOCTYPE html>\n<html><body>\n<h1>Mon premier PHP</h1>\n<?php\necho 'Bonjour Sawa !';\n?>\n</body></html>",
            out: "Mon premier PHP\nBonjour Sawa !"
          },
          {
            tip: "Le code PHP doit etre entre <code>&lt;?php ... ?&gt;</code>. Tout le reste est du HTML envoye tel quel."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "PHP s'execute :",
        opts: [
          "Cote client",
          "Cote serveur",
          "Les deux",
          "Aucun"
        ],
        correct: "b",
        expl: "PHP est cote <strong>serveur</strong>. Le navigateur recoit uniquement le HTML genere."
      },
      {
        q: "Quelle extension a un fichier PHP ?",
        opts: [
          ".html",
          ".php",
          ".js",
          ".phtml"
        ],
        correct: "b",
        expl: "L'extension standard est <code>.php</code>."
      }
    ]
  },
  {
    id: "w3-syntax",
    code: "B2",
    level: "basic",
    title: {
      fr: "PHP Syntax",
      en: "PHP Syntax"
    },
    sub: {
      fr: "Balises, instructions, commentaires, casse",
      en: "Tags, statements, comments, case sensitivity"
    },
    tags: [
      "syntax",
      "basics"
    ],
    sections: [
      {
        h: "1. Balises PHP",
        blocks: [
          {
            code: "<?php\necho 'Bonjour Sawa';\n?>\n\n<!-- Short echo (raccourci) -->\n<p>Bienvenue, <?= $nom ?></p>"
          },
          {
            tip: "Dans un fichier 100% PHP, <strong>ne pas fermer</strong> avec <code>?&gt;</code>. Evite les espaces parasites avant <code>header()</code>."
          }
        ]
      },
      {
        h: "2. Instructions et commentaires",
        blocks: [
          {
            code: "<?php\n// commentaire 1 ligne\n# autre commentaire 1 ligne\n/* commentaire\n   multi-lignes */\n\n$x = 5;       // chaque instruction finit par ;\n$y = 10;\necho $x + $y;\n?>"
          }
        ]
      },
      {
        h: "3. Sensibilite a la casse",
        blocks: [
          {
            warn: "Les <strong>variables</strong> sont sensibles a la casse, mais les <strong>mots-cles</strong> et <strong>fonctions</strong> ne le sont pas."
          },
          {
            code: "<?php\n$Color = 'red';\n$color = 'blue';\necho $Color;   // red\necho $color;   // blue  ← variables differentes\n\nECHO 'Hi';     // OK\nEcho 'Hi';     // OK"
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Quel symbole termine une instruction PHP ?",
        opts: [
          ".",
          ";",
          ":",
          ","
        ],
        correct: "b",
        expl: "Chaque instruction PHP finit par <code>;</code>."
      },
      {
        q: "<code>$var</code> et <code>$Var</code> sont :",
        opts: [
          "La meme variable",
          "Deux variables differentes",
          "Erreur",
          "Equivalent"
        ],
        correct: "b",
        expl: "Les variables PHP sont <strong>sensibles a la casse</strong>."
      }
    ]
  },
  {
    id: "w3-variables",
    code: "B3",
    level: "basic",
    title: {
      fr: "PHP Variables",
      en: "PHP Variables"
    },
    sub: {
      fr: "Declaration, regles de nommage, scope",
      en: "Declaration, naming rules, scope"
    },
    tags: [
      "variables",
      "basics"
    ],
    sections: [
      {
        h: "1. Creer une variable",
        blocks: [
          {
            code: "<?php\n$nom    = 'Chadi';\n$age    = 23;\n$taille = 1.78;\necho \"$nom a $age ans\";  // Chadi a 23 ans"
          },
          {
            note: "PHP est <strong>dynamiquement type</strong> : pas besoin de declarer le type, il est determine par la valeur."
          }
        ]
      },
      {
        h: "2. Regles de nommage",
        blocks: [
          {
            list: [
              "Commence par <code>$</code> puis une lettre ou <code>_</code>",
              "Suivi de lettres, chiffres ou <code>_</code>",
              "<strong>Sensible a la casse</strong>",
              "Pas d'espace ni de caractere special",
              "Ne pas commencer par un chiffre"
            ]
          }
        ]
      },
      {
        h: "3. Scope (portee)",
        blocks: [
          {
            code: "<?php\n$x = 5;   // global\n\nfunction test() {\n    echo $x;   // Warning : Undefined !\n}\n\nfunction testGlobal() {\n    global $x;\n    echo $x;   // 5\n}\n\nfunction counter() {\n    static $n = 0;\n    return ++$n;\n}\necho counter(); // 1\necho counter(); // 2"
          },
          {
            tip: "<code>global</code> est <strong>deconseille</strong> — preferer passer en argument."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Quelle declaration est valide ?",
        opts: [
          "<code>$1nom</code>",
          "<code>$mon-nom</code>",
          "<code>$_user42</code>",
          "<code>nom</code>"
        ],
        correct: "c",
        expl: "Commence par <code>$</code> + une lettre ou <code>_</code>."
      },
      {
        q: "Pour utiliser une variable globale dans une fonction :",
        opts: [
          "<code>global $x</code>",
          "<code>$_GLOBAL[\"x\"]</code>",
          "<code>$this->x</code>",
          "Automatique"
        ],
        correct: "a",
        expl: "<code>global $x</code> importe la variable globale dans la fonction."
      }
    ]
  },
  {
    id: "w3-echo",
    code: "B4",
    level: "basic",
    title: {
      fr: "PHP Echo / Print",
      en: "PHP Echo / Print"
    },
    sub: {
      fr: "echo vs print, short tag, printf",
      en: "echo vs print, short tag, printf"
    },
    tags: [
      "echo",
      "output",
      "basics"
    ],
    sections: [
      {
        h: "1. echo",
        blocks: [
          {
            p: "<code>echo</code> = plus rapide, accepte plusieurs arguments, ne retourne rien."
          },
          {
            code: "<?php\necho 'Bonjour ', 'Sawa', '!';   // arguments multiples\necho 'Concat ' . 'avec ' . '.';  // avec . (concat)\n\n$nom = 'Chadi';\necho \"Bonjour $nom\";             // interpolation (double quotes)\n?>"
          }
        ]
      },
      {
        h: "2. print",
        blocks: [
          {
            p: "<code>print</code> = retourne toujours 1 (utilisable comme expression)."
          },
          {
            code: "<?php\nprint 'Hello';\n$r = print 'Hi';   // $r = 1"
          }
        ]
      },
      {
        h: "3. Short echo tag",
        blocks: [
          {
            code: "<p>Bonjour <?= $nom ?></p>\n<!-- equivaut a <?php echo $nom; ?> -->"
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Difference entre echo et print ?",
        opts: [
          "Aucune",
          "echo accepte plusieurs args, print retourne 1",
          "print n'existe plus",
          "echo est plus lent"
        ],
        correct: "b",
        expl: "<code>echo</code> peut prendre plusieurs args, <code>print</code> en prend 1 seul et retourne 1."
      }
    ]
  },
  {
    id: "w3-types",
    code: "B5",
    level: "basic",
    title: {
      fr: "PHP Data Types",
      en: "PHP Data Types"
    },
    sub: {
      fr: "8 types : scalaires + composes + speciaux",
      en: "8 types: scalar + compound + special"
    },
    tags: [
      "types",
      "basics"
    ],
    sections: [
      {
        h: "1. Les 8 types",
        blocks: [
          {
            table: [
              [
                "Categorie",
                "Types"
              ],
              [
                "Scalaires",
                "<code>bool</code>, <code>int</code>, <code>float</code>, <code>string</code>"
              ],
              [
                "Composes",
                "<code>array</code>, <code>object</code>, <code>callable</code>, <code>iterable</code>"
              ],
              [
                "Speciaux",
                "<code>null</code>, <code>resource</code>"
              ]
            ]
          }
        ]
      },
      {
        h: "2. Exemples",
        blocks: [
          {
            code: "<?php\n$s = 'Hello';        // string\n$i = 42;              // int\n$f = 3.14;            // float\n$b = true;            // bool\n$a = [1, 2, 3];       // array\n$o = new stdClass();  // object\n$n = null;            // null\n\nvar_dump($i);   // int(42)\nvar_dump($s);   // string(5) \"Hello\"\nvar_dump($a);   // array(3) {...}"
          }
        ]
      },
      {
        h: "3. Type juggling",
        blocks: [
          {
            warn: "PHP convertit automatiquement les types — source classique de bugs :"
          },
          {
            code: "<?php\nvar_dump('5' + 3);   // int(8)\nvar_dump('5' . 3);   // string(2) \"53\"\nvar_dump(true + 1);  // int(2)\nvar_dump('5' == 5);  // true  (loose)\nvar_dump('5' === 5); // false (strict)"
          },
          {
            tip: "<strong>Toujours <code>===</code></strong> (strict) pour comparer."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Combien de types PHP ?",
        opts: [
          "4",
          "6",
          "8",
          "10"
        ],
        correct: "c",
        expl: "4 scalaires + 4 composes + 2 speciaux = 8."
      },
      {
        q: "<code>'5' === 5</code> retourne :",
        opts: [
          "true",
          "false",
          "null",
          "Erreur"
        ],
        correct: "b",
        expl: "<code>===</code> est strict (valeur + type). string '5' ≠ int 5."
      }
    ]
  },
  {
    id: "w3-strings",
    code: "B6",
    level: "basic",
    title: {
      fr: "PHP Strings",
      en: "PHP Strings"
    },
    sub: {
      fr: "strlen, str_replace, strpos, ucfirst, number_format",
      en: "strlen, str_replace, strpos, ucfirst, number_format"
    },
    tags: [
      "strings",
      "basics"
    ],
    sections: [
      {
        h: "1. Fonctions essentielles",
        blocks: [
          {
            code: "<?php\n$s = 'Hello World';\n\necho strlen($s);                  // 11\necho str_word_count($s);          // 2\necho strrev($s);                  // dlroW olleH\necho strpos($s, 'World');         // 6\necho str_replace('World', 'Sawa', $s); // Hello Sawa\necho substr($s, 0, 5);            // Hello\necho strtoupper($s);              // HELLO WORLD\necho strtolower($s);              // hello world\necho ucfirst('hello');            // Hello\necho ucwords('hello world');      // Hello World\necho trim('  hi  ');              // hi\necho str_repeat('-', 5);          // -----"
          }
        ]
      },
      {
        h: "2. Concatenation",
        blocks: [
          {
            code: "<?php\n$a = 'Hello';\n$b = 'World';\necho $a . ' ' . $b;    // Hello World\n$a .= ' Sawa';          // append"
          },
          {
            bad: "NE JAMAIS utiliser <code>+</code> pour concatener — c'est arithmetique en PHP."
          }
        ]
      },
      {
        h: "3. number_format",
        blocks: [
          {
            code: "<?php\necho number_format(1500000, 0, '.', ' ');  // 1 500 000\necho number_format(99.5, 2);                // 99.50"
          }
        ]
      }
    ],
    quiz: [
      {
        q: "<code>strlen('Sawa')</code> retourne :",
        opts: [
          "3",
          "4",
          "5",
          "Sawa"
        ],
        correct: "b",
        expl: "<code>strlen</code> retourne le nombre d'octets. 'Sawa' = 4."
      },
      {
        q: "Pour concatener deux strings :",
        opts: [
          "<code>+</code>",
          "<code>.</code>",
          "<code>&</code>",
          "<code>concat</code>"
        ],
        correct: "b",
        expl: "En PHP la concatenation se fait avec <code>.</code> (point)."
      }
    ]
  },
  {
    id: "w3-numbers",
    code: "B7",
    level: "basic",
    title: {
      fr: "PHP Numbers & Math",
      en: "PHP Numbers & Math"
    },
    sub: {
      fr: "int, float, abs, round, sqrt, rand, IEEE 754",
      en: "int, float, abs, round, sqrt, rand, IEEE 754"
    },
    tags: [
      "numbers",
      "math",
      "basics"
    ],
    sections: [
      {
        h: "1. Integer",
        blocks: [
          {
            code: "<?php\n$dec = 1234;        // decimal\n$hex = 0x1A;        // 26\n$oct = 0o123;       // 83 (PHP 8.1+)\n$bin = 0b1010;      // 10\n$sep = 1_000_000;   // PHP 7.4+\n\nvar_dump(is_int($dec));   // true\necho PHP_INT_MAX;         // 9223372036854775807"
          }
        ]
      },
      {
        h: "2. Float",
        blocks: [
          {
            code: "<?php\n$f = 3.14;\n$g = 1.5e3;        // 1500.0\n$h = 7E-2;         // 0.07\n\nvar_dump(is_float($f));     // true\nvar_dump(is_numeric('42')); // true"
          },
          {
            warn: "Precision IEEE 754 : <code>0.1 + 0.2 === 0.3</code> = <strong>false</strong>. Comparer avec <code>abs($a - $b) &lt; PHP_FLOAT_EPSILON</code>."
          }
        ]
      },
      {
        h: "3. Math",
        blocks: [
          {
            code: "<?php\necho abs(-7.2);          // 7.2\necho round(4.7);         // 5\necho floor(4.7);         // 4\necho ceil(4.1);          // 5\necho sqrt(64);           // 8\necho pow(2, 10);         // 1024\necho min(1, 5, -3);      // -3\necho max(1, 5, -3);      // 5\necho rand(1, 100);       // aleatoire 1-100\necho intval('42abc');    // 42"
          }
        ]
      }
    ],
    quiz: [
      {
        q: "<code>intval('42abc')</code> retourne :",
        opts: [
          "0",
          "42",
          "'42'",
          "Erreur"
        ],
        correct: "b",
        expl: "<code>intval</code> s'arrete au 1er caractere non-numerique."
      },
      {
        q: "<code>0.1 + 0.2 === 0.3</code> :",
        opts: [
          "true",
          "false",
          "null",
          "0.3"
        ],
        correct: "b",
        expl: "Imprecision IEEE 754 : <code>0.1 + 0.2 = 0.30000000000000004</code>."
      }
    ]
  },
  {
    id: "w3-constants",
    code: "B8",
    level: "basic",
    title: {
      fr: "PHP Constants",
      en: "PHP Constants"
    },
    sub: {
      fr: "define(), const, constantes magiques",
      en: "define(), const, magic constants"
    },
    tags: [
      "constants",
      "basics"
    ],
    sections: [
      {
        h: "1. define() vs const",
        blocks: [
          {
            code: "<?php\ndefine('PI', 3.14);            // runtime\nconst MAX_USERS = 100;         // compile-time, plus rapide\nconst COLORS = ['red', 'blue']; // arrays OK\n\necho PI;          // 3.14\necho MAX_USERS;   // 100"
          },
          {
            table: [
              [
                "",
                "<code>define()</code>",
                "<code>const</code>"
              ],
              [
                "Quand evalue",
                "Runtime",
                "Compile-time"
              ],
              [
                "Conditionnel",
                "Oui",
                "Non"
              ],
              [
                "Scope classe",
                "Non",
                "Oui"
              ]
            ]
          }
        ]
      },
      {
        h: "2. Constantes magiques",
        blocks: [
          {
            code: "<?php\necho __LINE__;       // numero de ligne\necho __FILE__;       // chemin complet du fichier\necho __DIR__;        // dossier du fichier\necho __FUNCTION__;   // nom de la fonction\necho __CLASS__;      // nom de la classe"
          },
          {
            tip: "<code>__DIR__</code> est essentiel pour les includes : <code>require __DIR__ . '/config.php';</code>"
          }
        ]
      }
    ],
    quiz: [
      {
        q: "<code>define()</code> vs <code>const</code> :",
        opts: [
          "Identiques",
          "const ne supporte pas arrays",
          "define() runtime, const compile-time",
          "const obsolete"
        ],
        correct: "c",
        expl: "<code>const</code> = compile-time (plus rapide). <code>define</code> = runtime + conditionnel."
      },
      {
        q: "Pour le chemin absolu d'un include :",
        opts: [
          "<code>__FILE__</code>",
          "<code>__DIR__</code>",
          "<code>__LINE__</code>",
          "<code>__PATH__</code>"
        ],
        correct: "b",
        expl: "<code>__DIR__</code> = dossier du fichier courant."
      }
    ]
  },
  {
    id: "w3-operators",
    code: "B9",
    level: "basic",
    title: {
      fr: "PHP Operators",
      en: "PHP Operators"
    },
    sub: {
      fr: "Arithmetique, comparaison, logique, ternaire, ??",
      en: "Arithmetic, comparison, logical, ternary, ??"
    },
    tags: [
      "operators",
      "basics"
    ],
    sections: [
      {
        h: "1. Arithmetiques",
        blocks: [
          {
            table: [
              [
                "Op",
                "Exemple",
                "Resultat"
              ],
              [
                "<code>+</code>",
                "<code>5 + 3</code>",
                "8"
              ],
              [
                "<code>/</code>",
                "<code>10 / 3</code>",
                "3.333… (float)"
              ],
              [
                "<code>%</code>",
                "<code>10 % 3</code>",
                "1"
              ],
              [
                "<code>**</code>",
                "<code>2 ** 8</code>",
                "256"
              ]
            ]
          },
          {
            code: "<?php\necho 10 / 3;        // 3.333...\necho intdiv(10, 3); // 3 (division entiere)"
          }
        ]
      },
      {
        h: "2. Comparaison (piege QCM)",
        blocks: [
          {
            table: [
              [
                "Op",
                "Sens",
                "Exemple"
              ],
              [
                "<code>==</code>",
                "Egal loose",
                "<code>'5' == 5</code> = true ⚠️"
              ],
              [
                "<code>===</code>",
                "Strict",
                "<code>'5' === 5</code> = false"
              ],
              [
                "<code>&lt;=&gt;</code>",
                "Spaceship",
                "<code>1 &lt;=&gt; 2</code> = -1"
              ]
            ]
          },
          {
            bad: "<strong>Toujours <code>===</code></strong> en exam et en production."
          }
        ]
      },
      {
        h: "3. Logiques",
        blocks: [
          {
            warn: "Toujours <code>&amp;&amp;</code> et <code>||</code>. <code>and</code>/<code>or</code> ont une precedence plus basse que <code>=</code> :"
          },
          {
            code: "<?php\n$r1 = true && false;  // false (correct)\n$r2 = true and false; // true (!!) — piege"
          }
        ]
      },
      {
        h: "4. Ternaire et ??",
        blocks: [
          {
            code: "<?php\n$msg = $age >= 18 ? 'adulte' : 'mineur';     // ternaire\n$nom = $_POST['nom'] ?? 'Invite';             // null coalescing\n$x ??= 'default';                              // assign si null"
          },
          {
            tip: "<code>??</code> est preferable a <code>?:</code> pour <code>$_POST</code> : pas de warning, declenche que si null."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "<code>true and false</code> :",
        opts: [
          "true",
          "false",
          "null",
          "Erreur"
        ],
        correct: "b",
        expl: "<code>and</code> = true ET false = false. Le piege est <code>$x = true and false</code> qui donne <code>$x = true</code>."
      },
      {
        q: "<code>'5' === 5</code> :",
        opts: [
          "true",
          "false",
          "null",
          "'5'"
        ],
        correct: "b",
        expl: "<code>===</code> strict — string '5' ≠ int 5."
      }
    ]
  },
  {
    id: "w3-if",
    code: "B10",
    level: "basic",
    title: {
      fr: "PHP If / Else / Switch",
      en: "PHP If / Else / Switch"
    },
    sub: {
      fr: "Branchements, syntaxe alternative, match (PHP 8)",
      en: "Branches, alternative syntax, match (PHP 8)"
    },
    tags: [
      "control-flow",
      "basics"
    ],
    sections: [
      {
        h: "1. if / elseif / else",
        blocks: [
          {
            code: "<?php\n$h = 14;\nif ($h < 12)        echo 'Bonjour';\nelseif ($h < 18)    echo 'Bon apres-midi';\nelse                 echo 'Bonsoir';"
          }
        ]
      },
      {
        h: "2. Syntaxe alternative (templates)",
        blocks: [
          {
            code: "<?php if ($logged): ?>\n    <p>Bonjour <?= $nom ?></p>\n<?php elseif ($guest): ?>\n    <p>Invite</p>\n<?php else: ?>\n    <a href=\"login.php\">Connexion</a>\n<?php endif; ?>"
          }
        ]
      },
      {
        h: "3. switch et match",
        blocks: [
          {
            code: "<?php\n// switch (compare avec ==)\nswitch ($role) {\n    case 'admin':\n        echo 'Admin';\n        break;\n    case 'editor':\n    case 'author':   // fall-through volontaire\n        echo 'Redacteur';\n        break;\n    default:\n        echo 'Inconnu';\n}\n\n// match (PHP 8, strict ===)\n$label = match($code) {\n    200, 201 => 'OK',\n    404      => 'Not Found',\n    default  => 'Unknown',\n};"
          },
          {
            bad: "Oublier <code>break</code> dans switch = fall-through involontaire."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "<code>switch</code> compare avec :",
        opts: [
          "<code>==</code>",
          "<code>===</code>",
          "<code>match</code>",
          "Aucun"
        ],
        correct: "a",
        expl: "<code>switch</code> utilise <code>==</code> (loose). <code>match</code> est strict."
      },
      {
        q: "En syntaxe alternative, <code>else if</code> :",
        opts: [
          "Fonctionne",
          "Ne fonctionne pas",
          "Warning",
          "Equivalent endif"
        ],
        correct: "b",
        expl: "En syntaxe alternative, <strong>seul <code>elseif</code></strong> fonctionne."
      }
    ]
  },
  {
    id: "w3-loops",
    code: "B11",
    level: "basic",
    title: {
      fr: "PHP Loops",
      en: "PHP Loops"
    },
    sub: {
      fr: "while, do-while, for, foreach, break, continue",
      en: "while, do-while, for, foreach, break, continue"
    },
    tags: [
      "loops",
      "basics"
    ],
    sections: [
      {
        h: "1. while / do-while",
        blocks: [
          {
            code: "<?php\n// while : teste AVANT\n$i = 1;\nwhile ($i <= 5) {\n    echo $i++;\n}\n// 12345\n\n// do-while : teste APRES (execute au moins 1 fois)\ndo {\n    echo $i;\n} while ($i++ < 0);"
          }
        ]
      },
      {
        h: "2. for",
        blocks: [
          {
            code: "<?php\nfor ($i = 0; $i < 10; $i++) {\n    echo $i . ' ';\n}\n// 0 1 2 3 4 5 6 7 8 9"
          }
        ]
      },
      {
        h: "3. foreach",
        blocks: [
          {
            code: "<?php\nforeach ($fruits as $fruit) {\n    echo $fruit;\n}\n\nforeach ($user as $key => $value) {\n    echo \"$key = $value\";\n}\n\n// Par reference\nforeach ($nums as &$n) { $n *= 2; }\nunset($n);   // CRITIQUE !"
          },
          {
            warn: "Apres <code>foreach (&$v)</code>, TOUJOURS <code>unset($v)</code>."
          }
        ]
      },
      {
        h: "4. break / continue N",
        blocks: [
          {
            code: "<?php\nfor ($i = 0; $i < 5; $i++) {\n    foreach ($arr as $v) {\n        if ($v === 'STOP') break 2;   // sort des 2 boucles\n    }\n}"
          }
        ]
      }
    ],
    quiz: [
      {
        q: "<code>do { ... } while (false);</code> s'execute :",
        opts: [
          "0 fois",
          "1 fois",
          "Infini",
          "Erreur"
        ],
        correct: "b",
        expl: "<code>do-while</code> teste APRES → execute toujours au moins une fois."
      },
      {
        q: "Apres <code>foreach (&$v)</code>, on doit :",
        opts: [
          "return",
          "<code>unset($v)</code>",
          "<code>$v = null</code>",
          "Rien"
        ],
        correct: "b",
        expl: "$v garde une reference au dernier element — corromprait l'array au prochain foreach."
      }
    ]
  },
  {
    id: "w3-functions-basic",
    code: "B12",
    level: "basic",
    title: {
      fr: "PHP Functions",
      en: "PHP Functions"
    },
    sub: {
      fr: "Declaration, parametres, return, type hints",
      en: "Declaration, parameters, return, type hints"
    },
    tags: [
      "functions",
      "basics"
    ],
    sections: [
      {
        h: "1. Declaration",
        blocks: [
          {
            code: "<?php\nfunction direBonjour() {\n    echo 'Bonjour !';\n}\ndireBonjour();\n\n// Avec parametres + type de retour\nfunction additionner(int $a, int $b): int {\n    return $a + $b;\n}\necho additionner(3, 5);  // 8"
          }
        ]
      },
      {
        h: "2. Parametres par defaut",
        blocks: [
          {
            code: "<?php\nfunction saluer(string $nom = 'ami'): string {\n    return \"Bonjour $nom\";\n}\necho saluer();         // Bonjour ami\necho saluer('Chadi');  // Bonjour Chadi"
          },
          {
            warn: "Parametres avec defaut <strong>apres</strong> ceux sans defaut."
          }
        ]
      },
      {
        h: "3. Passage par valeur vs reference",
        blocks: [
          {
            code: "<?php\nfunction inc1(int $x) { $x++; }       // par valeur\n$n = 5; inc1($n); echo $n;             // 5\n\nfunction inc2(int &$x) { $x++; }       // par reference\n$n = 5; inc2($n); echo $n;             // 6"
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Une fonction sans return retourne :",
        opts: [
          "0",
          "false",
          "null",
          "Erreur"
        ],
        correct: "c",
        expl: "Sans <code>return</code>, une fonction PHP retourne implicitement <code>null</code>."
      },
      {
        q: "Pour modifier l'original d'un argument :",
        opts: [
          "<code>$x</code>",
          "<code>&$x</code>",
          "<code>*$x</code>",
          "Auto"
        ],
        correct: "b",
        expl: "<code>&amp;</code> devant le parametre = passage par reference."
      }
    ]
  },
  {
    id: "w3-arrays-basic",
    code: "B13",
    level: "basic",
    title: {
      fr: "PHP Arrays",
      en: "PHP Arrays"
    },
    sub: {
      fr: "Indexes, associatifs, multidimensionnels",
      en: "Indexed, associative, multidimensional"
    },
    tags: [
      "arrays",
      "basics"
    ],
    sections: [
      {
        h: "1. Creation",
        blocks: [
          {
            code: "<?php\n// Indexe\n$cars = ['Volvo', 'BMW', 'Toyota'];\necho $cars[0];   // Volvo\n\n// Associatif\n$age = ['Peter' => 35, 'Ben' => 37, 'Joe' => 43];\necho $age['Peter'];  // 35\n\n// Multidimensionnel\n$grid = [[1,2,3],[4,5,6]];\necho $grid[1][2];   // 6"
          }
        ]
      },
      {
        h: "2. Fonctions essentielles",
        blocks: [
          {
            code: "<?php\necho count($cars);              // 3\necho in_array('BMW', $cars);    // true\necho array_search('BMW', $cars); // 1\n\n$cars[] = 'Audi';                // push\narray_push($cars, 'Tesla');\n$last = array_pop($cars);\n\necho implode(', ', $cars);\n$mots = explode(' ', 'Vive le Liban');"
          }
        ]
      },
      {
        h: "3. Tri",
        blocks: [
          {
            table: [
              [
                "Fonction",
                "Trie",
                "Conserve cles ?"
              ],
              [
                "<code>sort()</code>",
                "Valeurs ASC",
                "Non"
              ],
              [
                "<code>asort()</code>",
                "Valeurs ASC",
                "Oui"
              ],
              [
                "<code>ksort()</code>",
                "Cles ASC",
                "Oui"
              ],
              [
                "<code>usort()</code>",
                "Callback",
                "Non"
              ]
            ]
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Trier en conservant les cles ?",
        opts: [
          "<code>sort()</code>",
          "<code>asort()</code>",
          "<code>ksort()</code>",
          "<code>usort()</code>"
        ],
        correct: "b",
        expl: "<code>asort</code> trie par valeur en conservant cle-valeur. <code>sort</code> reindexe."
      },
      {
        q: "<code>implode(',', ['a','b','c'])</code> :",
        opts: [
          "'a,b,c'",
          "['a,b,c']",
          "'a'",
          "Erreur"
        ],
        correct: "a",
        expl: "<code>implode</code> joint avec le separateur. <code>explode</code> fait l'inverse."
      }
    ]
  },
  {
    id: "w3-superglobals",
    code: "B14",
    level: "basic",
    title: {
      fr: "PHP Superglobals",
      en: "PHP Superglobals"
    },
    sub: {
      fr: "$_GET, $_POST, $_SERVER, $_SESSION, $_COOKIE, $_FILES",
      en: "$_GET, $_POST, $_SERVER, $_SESSION, $_COOKIE, $_FILES"
    },
    tags: [
      "superglobals",
      "basics"
    ],
    sections: [
      {
        h: "1. Les superglobales",
        blocks: [
          {
            table: [
              [
                "Variable",
                "Contient"
              ],
              [
                "<code>$_SERVER</code>",
                "Infos serveur + requete"
              ],
              [
                "<code>$_GET</code>",
                "URL (?x=1)"
              ],
              [
                "<code>$_POST</code>",
                "Formulaire POST"
              ],
              [
                "<code>$_COOKIE</code>",
                "Cookies client"
              ],
              [
                "<code>$_SESSION</code>",
                "Session serveur"
              ],
              [
                "<code>$_FILES</code>",
                "Fichiers uploades"
              ]
            ]
          }
        ]
      },
      {
        h: "2. $_SERVER",
        blocks: [
          {
            code: "<?php\necho $_SERVER['REQUEST_METHOD'];   // GET / POST\necho $_SERVER['HTTP_HOST'];        // sawa.lb\necho $_SERVER['REQUEST_URI'];      // /page?x=1\necho $_SERVER['REMOTE_ADDR'];      // IP client"
          }
        ]
      },
      {
        h: "3. $_GET / $_POST",
        blocks: [
          {
            code: "<?php\necho $_GET['nom'];   // depuis ?nom=Chadi\n\nif ($_SERVER['REQUEST_METHOD'] === 'POST') {\n    $email = trim($_POST['email'] ?? '');\n    if (filter_var($email, FILTER_VALIDATE_EMAIL)) echo 'OK';\n}"
          },
          {
            bad: "NE JAMAIS afficher <code>$_GET</code>/<code>$_POST</code> sans <code>htmlspecialchars()</code> — XSS."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Ou se trouve la methode HTTP ?",
        opts: [
          "<code>$_GET['method']</code>",
          "<code>$_SERVER['REQUEST_METHOD']</code>",
          "<code>$_POST['method']</code>",
          "<code>$_REQUEST['m']</code>"
        ],
        correct: "b",
        expl: "<code>$_SERVER['REQUEST_METHOD']</code> = 'GET', 'POST', etc."
      },
      {
        q: "Pour eviter XSS sur <code>$_POST['msg']</code> :",
        opts: [
          "<code>htmlspecialchars()</code>",
          "<code>strip_tags()</code>",
          "<code>(string)</code>",
          "Rien"
        ],
        correct: "a",
        expl: "<code>htmlspecialchars</code> echappe &lt; &gt; &amp; \" '."
      }
    ]
  },
  {
    id: "w3-forms",
    code: "I1",
    level: "intermediate",
    title: {
      fr: "PHP Form Handling",
      en: "PHP Form Handling"
    },
    sub: {
      fr: "POST/GET, securite, pattern PRG",
      en: "POST/GET, security, PRG pattern"
    },
    tags: [
      "forms",
      "POST",
      "intermediate"
    ],
    sections: [
      {
        h: "1. POST vs GET",
        blocks: [
          {
            table: [
              [
                "",
                "GET",
                "POST"
              ],
              [
                "Ou ?",
                "URL",
                "Body"
              ],
              [
                "Visible",
                "Oui",
                "Non"
              ],
              [
                "Cache",
                "Oui",
                "Non"
              ],
              [
                "Usage",
                "Lectures",
                "Creations / secrets"
              ]
            ]
          }
        ]
      },
      {
        h: "2. Formulaire + traitement",
        blocks: [
          {
            code: "<!-- form.php -->\n<form action=\"welcome.php\" method=\"POST\">\n    <input type=\"text\"  name=\"name\">\n    <input type=\"email\" name=\"email\">\n    <button>Send</button>\n</form>"
          },
          {
            code: "<?php\n// welcome.php\nif ($_SERVER['REQUEST_METHOD'] === 'POST') {\n    $name  = htmlspecialchars(trim($_POST['name']  ?? ''));\n    $email = htmlspecialchars(trim($_POST['email'] ?? ''));\n    echo \"Bonjour $name ($email)\";\n}\n?>"
          }
        ]
      },
      {
        h: "3. Pattern PRG",
        blocks: [
          {
            p: "Apres un POST reussi, <strong>toujours rediriger</strong> (302) vers une page GET — sinon F5 = double submit."
          },
          {
            code: "<?php\nif ($_SERVER['REQUEST_METHOD'] === 'POST') {\n    // ... traitement ...\n    $_SESSION['flash'] = 'Inscription reussie';\n    header('Location: success.php');\n    exit;\n}"
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Pour un formulaire login (sensible) :",
        opts: [
          "GET",
          "POST",
          "Les deux",
          "Aucun"
        ],
        correct: "b",
        expl: "POST : donnees pas visibles dans l'URL ni en cache."
      },
      {
        q: "Apres un POST, on doit :",
        opts: [
          "Echo direct",
          "Rediriger 302 puis afficher",
          "AJAX",
          "Print"
        ],
        correct: "b",
        expl: "Pattern PRG (Post-Redirect-Get) evite le double-submit au F5."
      }
    ]
  },
  {
    id: "w3-validation",
    code: "I2",
    level: "intermediate",
    title: {
      fr: "PHP Form Validation",
      en: "PHP Form Validation"
    },
    sub: {
      fr: "filter_var, required, sanitize, repopulation",
      en: "filter_var, required, sanitize, repopulation"
    },
    tags: [
      "forms",
      "validation",
      "intermediate"
    ],
    sections: [
      {
        h: "1. Required fields",
        blocks: [
          {
            code: "<?php\n$errors = [];\nforeach (['name','email','message'] as $f) {\n    if (empty($_POST[$f])) $errors[$f] = \"$f requis\";\n}\nif (empty($errors)) echo 'OK';"
          }
        ]
      },
      {
        h: "2. filter_var",
        blocks: [
          {
            code: "<?php\n// VALIDATE\nfilter_var($x, FILTER_VALIDATE_EMAIL);\nfilter_var($x, FILTER_VALIDATE_URL);\nfilter_var($x, FILTER_VALIDATE_INT);\nfilter_var($x, FILTER_VALIDATE_INT, ['options'=>['min_range'=>1,'max_range'=>100]]);\n\n// SANITIZE\nfilter_var($x, FILTER_SANITIZE_EMAIL);\nfilter_var($x, FILTER_SANITIZE_FULL_SPECIAL_CHARS);"
          }
        ]
      },
      {
        h: "3. Repopulation",
        blocks: [
          {
            code: "<input type=\"text\" name=\"name\"\n       value=\"<?= htmlspecialchars($_POST['name'] ?? '') ?>\">"
          }
        ]
      },
      {
        h: "4. Pattern complet (Exo 3 des exams)",
        blocks: [
          {
            code: "<?php\n$errors = [];\nif ($_SERVER['REQUEST_METHOD'] === 'POST') {\n    foreach (['name','email','phone'] as $f) {\n        if (empty($_POST[$f])) $errors[$f] = 'Requis';\n    }\n    if (empty($errors)) {\n        $name = trim($_POST['name']);\n        if (!preg_match('/^[a-zA-Z\\s]{3,}$/', $name))\n            $errors['name'] = 'Nom invalide';\n\n        $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);\n        if (!filter_var($email, FILTER_VALIDATE_EMAIL))\n            $errors['email'] = 'Email invalide';\n    }\n    if (empty($errors)) {\n        // INSERT + redirect\n    }\n}"
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Pour valider un email :",
        opts: [
          "<code>strpos($e,'@')</code>",
          "<code>filter_var($e, FILTER_VALIDATE_EMAIL)</code>",
          "<code>preg_match</code>",
          "<code>is_email</code>"
        ],
        correct: "b",
        expl: "<code>filter_var(FILTER_VALIDATE_EMAIL)</code> = methode officielle."
      },
      {
        q: "Contre XSS en re-affichant un champ :",
        opts: [
          "<code>htmlspecialchars</code>",
          "<code>strip_tags</code>",
          "<code>addslashes</code>",
          "<code>urlencode</code>"
        ],
        correct: "a",
        expl: "<code>htmlspecialchars</code> echappe les chars HTML dangereux."
      }
    ]
  },
  {
    id: "w3-regex",
    code: "I3",
    level: "intermediate",
    title: {
      fr: "PHP RegEx",
      en: "PHP RegEx"
    },
    sub: {
      fr: "preg_match, preg_replace, patterns essentiels",
      en: "preg_match, preg_replace, essential patterns"
    },
    tags: [
      "regex",
      "intermediate"
    ],
    sections: [
      {
        h: "1. preg_match",
        blocks: [
          {
            code: "<?php\n// Retourne 1 (match), 0 (no match), false (erreur)\nif (preg_match('/^[a-zA-Z]{3,}$/', $nom)) echo 'OK';\n\n// Capturer\nif (preg_match('/(\\d{4})-(\\d{2})-(\\d{2})/', '2026-05-24', $m)) {\n    echo $m[1]; // 2026\n    echo $m[2]; // 05\n}"
          }
        ]
      },
      {
        h: "2. Syntaxe",
        blocks: [
          {
            table: [
              [
                "Pattern",
                "Sens"
              ],
              [
                "<code>^</code> / <code>$</code>",
                "Debut / fin"
              ],
              [
                "<code>\\d</code>",
                "Chiffre"
              ],
              [
                "<code>\\w</code>",
                "Lettre/chiffre/_"
              ],
              [
                "<code>\\s</code>",
                "Espace blanc"
              ],
              [
                "<code>+</code> / <code>*</code>",
                "1+ / 0+"
              ],
              [
                "<code>{n,m}</code>",
                "n a m fois"
              ],
              [
                "<code>[abc]</code>",
                "a, b ou c"
              ],
              [
                "<code>(a|b)</code>",
                "a OU b"
              ]
            ]
          }
        ]
      },
      {
        h: "3. Patterns d'exam",
        blocks: [
          {
            code: "<?php\n// Nom : lettres + espaces, 3+ chars\n'/^[a-zA-Z\\s]{3,}$/'\n\n// Email\n'/^[a-zA-Z][a-zA-Z0-9._]*@[a-zA-Z]{2,}\\.[a-zA-Z]{2,}$/'\n\n// Tel libanais portable\n'/^(\\+961|00961)(3|70|71|76|81)\\d{6}$/'\n\n// Date Y-m-d\n'/^\\d{4}-\\d{2}-\\d{2}$/'"
          }
        ]
      },
      {
        h: "4. preg_replace",
        blocks: [
          {
            code: "<?php\necho preg_replace('/\\s+/', '-', 'Vive  le   Liban');\n// 'Vive-le-Liban'\n\nfunction slugify(string $s): string {\n    return preg_replace('/[^a-z0-9]+/', '-', strtolower(trim($s)));\n}"
          }
        ]
      }
    ],
    quiz: [
      {
        q: "<code>preg_match</code> retourne :",
        opts: [
          "true/false",
          "1/0/false",
          "yes/no",
          "le match"
        ],
        correct: "b",
        expl: "Retourne 1 (match), 0 (pas de match), false (erreur)."
      },
      {
        q: "Pattern nom (lettres+espaces, 3+) :",
        opts: [
          "<code>/[a-z]/i</code>",
          "<code>/^[a-zA-Z\\s]{3,}$/</code>",
          "<code>/\\w+/</code>",
          "<code>/.{3}/</code>"
        ],
        correct: "b",
        expl: "Ancres + classe + quantifieur {3,}."
      }
    ]
  },
  {
    id: "w3-date",
    code: "I4",
    level: "intermediate",
    title: {
      fr: "PHP Date and Time",
      en: "PHP Date and Time"
    },
    sub: {
      fr: "date(), DateTime, createFromFormat",
      en: "date(), DateTime, createFromFormat"
    },
    tags: [
      "date",
      "intermediate"
    ],
    sections: [
      {
        h: "1. date()",
        blocks: [
          {
            code: "<?php\necho date('Y-m-d');         // 2026-05-24\necho date('d/m/Y H:i:s');\necho date('l');              // Sunday\necho time();                 // timestamp\necho mktime(12, 0, 0, 5, 24, 2026);"
          }
        ]
      },
      {
        h: "2. DateTime (recommande)",
        blocks: [
          {
            code: "<?php\n$dt = new DateTime('2026-05-24');\necho $dt->format('Y-m-d');\n\n$dt->modify('+10 day');\n$dt->modify('next monday');\n\nif ($dt > new DateTime('now')) echo 'Future';\n\n$diff = (new DateTime())->diff(new DateTime('2003-05-24'));\necho \"$diff->y ans\";"
          }
        ]
      },
      {
        h: "3. Valider une date",
        blocks: [
          {
            code: "<?php\nfunction validerDate(string $input): bool {\n    $d = DateTime::createFromFormat('Y-m-d', $input);\n    return $d !== false && $d->format('Y-m-d') === $input;\n}\nvar_dump(validerDate('2026-05-24'));  // true\nvar_dump(validerDate('2026-13-99'));  // false"
          },
          {
            warn: "<code>strtotime('2026-13-99')</code> peut retourner une date incorrecte au lieu de false."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Ajouter 10 jours :",
        opts: [
          "<code>$dt + 10</code>",
          "<code>$dt->modify('+10 day')</code>",
          "<code>strtotime</code>",
          "<code>date_add</code>"
        ],
        correct: "b",
        expl: "<code>modify()</code> avec string lisible."
      },
      {
        q: "Valider rigoureusement Y-m-d :",
        opts: [
          "<code>strtotime</code>",
          "<code>checkdate</code>",
          "<code>createFromFormat</code> + re-format",
          "<code>is_date</code>"
        ],
        correct: "c",
        expl: "<code>createFromFormat</code> + comparer le re-format."
      }
    ]
  },
  {
    id: "w3-include",
    code: "I5",
    level: "intermediate",
    title: {
      fr: "PHP Include & Require",
      en: "PHP Include & Require"
    },
    sub: {
      fr: "include, require, _once, __DIR__",
      en: "include, require, _once, __DIR__"
    },
    tags: [
      "include",
      "intermediate"
    ],
    sections: [
      {
        h: "1. 4 instructions",
        blocks: [
          {
            table: [
              [
                "Instruction",
                "Si manquant",
                "Si deja inclus"
              ],
              [
                "<code>include</code>",
                "Warning",
                "Re-inclut"
              ],
              [
                "<code>require</code>",
                "<strong>Fatal</strong>",
                "Re-inclut"
              ],
              [
                "<code>include_once</code>",
                "Warning",
                "<strong>Ignore</strong>"
              ],
              [
                "<code>require_once</code>",
                "<strong>Fatal</strong>",
                "<strong>Ignore</strong>"
              ]
            ]
          },
          {
            code: "<?php\nrequire_once __DIR__ . '/config.php';\nrequire_once __DIR__ . '/User.php';\ninclude        'header.html';"
          }
        ]
      },
      {
        h: "2. __DIR__",
        blocks: [
          {
            code: "<?php\n// ❌ Mauvais\nrequire 'config.php';\n\n// ✅ Bon\nrequire __DIR__ . '/config.php';"
          },
          {
            tip: "Code critique (config, classes) → <code>require_once</code>. Templates → <code>include</code>."
          }
        ]
      },
      {
        h: "3. Return depuis include",
        blocks: [
          {
            code: "<?php\n// config.php\nreturn ['db_host' => 'localhost'];\n\n// index.php\n$cfg = require 'config.php';\necho $cfg['db_host'];"
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Pour une config indispensable :",
        opts: [
          "<code>include</code>",
          "<code>require</code>",
          "<code>require_once</code>",
          "<code>include_once</code>"
        ],
        correct: "c",
        expl: "Fatal si manquant + evite double inclusion."
      },
      {
        q: "<code>__DIR__</code> retourne :",
        opts: [
          "Nom du fichier",
          "Dossier du fichier",
          "CWD",
          "Namespace"
        ],
        correct: "b",
        expl: "<code>__DIR__</code> = chemin absolu du dossier courant."
      }
    ]
  },
  {
    id: "w3-file",
    code: "I6",
    level: "intermediate",
    title: {
      fr: "PHP File Handling",
      en: "PHP File Handling"
    },
    sub: {
      fr: "fopen, fread, fwrite, file_get_contents, CSV",
      en: "fopen, fread, fwrite, file_get_contents, CSV"
    },
    tags: [
      "files",
      "intermediate"
    ],
    sections: [
      {
        h: "1. file_get_contents / file_put_contents",
        blocks: [
          {
            code: "<?php\n// Lire tout\n$content = file_get_contents('data.txt');\n\n// Ecrire (ecrase)\nfile_put_contents('data.txt', \"Bonjour\\n\");\n\n// Append\nfile_put_contents('log.txt', date('c').\"\\n\", FILE_APPEND);"
          }
        ]
      },
      {
        h: "2. fopen / fgets / fwrite",
        blocks: [
          {
            code: "<?php\n// Lire ligne par ligne\n$f = fopen('big.log', 'r');\nwhile (($line = fgets($f)) !== false) {\n    echo $line;\n}\nfclose($f);\n\n// Ecrire\n$f = fopen('out.txt', 'w');\nfwrite($f, \"Ligne 1\\n\");\nfclose($f);"
          },
          {
            table: [
              [
                "Mode",
                "Effet"
              ],
              [
                "<code>'r'</code>",
                "Lecture seule"
              ],
              [
                "<code>'w'</code>",
                "Ecriture (efface)"
              ],
              [
                "<code>'a'</code>",
                "Append"
              ],
              [
                "<code>'x'</code>",
                "Echoue si existe"
              ]
            ]
          }
        ]
      },
      {
        h: "3. CSV",
        blocks: [
          {
            code: "<?php\n// Lire\n$f = fopen('data.csv', 'r');\nwhile (($row = fgetcsv($f)) !== false) {\n    print_r($row);\n}\nfclose($f);\n\n// Ecrire\n$f = fopen('data.csv', 'a');\nfputcsv($f, ['Chadi', 'chadi@s.lb', date('Y-m-d')]);\nfclose($f);"
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Lire tout un fichier en string :",
        opts: [
          "<code>fread</code>",
          "<code>file_get_contents</code>",
          "<code>fgets</code>",
          "<code>readfile</code>"
        ],
        correct: "b",
        expl: "<code>file_get_contents</code> = le plus simple."
      },
      {
        q: "Ajouter sans effacer :",
        opts: [
          "mode w",
          "mode a",
          "mode r",
          "mode x"
        ],
        correct: "b",
        expl: "Mode <code>a</code> = append."
      }
    ]
  },
  {
    id: "w3-upload",
    code: "I7",
    level: "intermediate",
    title: {
      fr: "PHP File Upload",
      en: "PHP File Upload"
    },
    sub: {
      fr: "enctype, $_FILES, move_uploaded_file, validation",
      en: "enctype, $_FILES, move_uploaded_file, validation"
    },
    tags: [
      "upload",
      "intermediate"
    ],
    sections: [
      {
        h: "1. Formulaire d'upload",
        blocks: [
          {
            code: "<form action=\"upload.php\" method=\"POST\" enctype=\"multipart/form-data\">\n    <input type=\"file\" name=\"avatar\">\n    <button>Envoyer</button>\n</form>"
          },
          {
            bad: "Oublier <code>enctype=\"multipart/form-data\"</code> = $_FILES vide."
          }
        ]
      },
      {
        h: "2. Pattern securise",
        blocks: [
          {
            code: "<?php\n// 1) Verifier error\nif ($_FILES['avatar']['error'] !== UPLOAD_ERR_OK) die('Erreur');\n\n// 2) Taille\nif ($_FILES['avatar']['size'] > 5*1024*1024) die('Trop gros');\n\n// 3) Extension\n$ext = strtolower(pathinfo($_FILES['avatar']['name'], PATHINFO_EXTENSION));\nif (!in_array($ext, ['jpg','png'], true)) die('Format');\n\n// 4) Dossier recursif\n$dir = __DIR__ . '/uploads/' . date('Y/m/d');\nif (!is_dir($dir)) mkdir($dir, 0777, true);\n\n// 5) Nom unique + move_uploaded_file\n$new = uniqid('av_', true) . '.' . $ext;\nif (move_uploaded_file($_FILES['avatar']['tmp_name'], \"$dir/$new\")) {\n    echo 'Sauve';\n}"
          },
          {
            warn: "<code>mkdir($dir, 0777, true)</code> avec <code>true</code> = recursif."
          },
          {
            bad: "<code>rename()</code> au lieu de <code>move_uploaded_file()</code> = faille."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Attribut obligatoire pour uploader ?",
        opts: [
          "method=POST",
          "enctype=multipart/form-data",
          "Les deux",
          "action=upload"
        ],
        correct: "c",
        expl: "POST + enctype=\"multipart/form-data\"."
      },
      {
        q: "Pour creer une arborescence :",
        opts: [
          "<code>mkdir($p)</code>",
          "<code>mkdir($p, 0777, true)</code>",
          "<code>new_dir</code>",
          "<code>file_put_contents</code>"
        ],
        correct: "b",
        expl: "3eme argument <code>true</code> = recursif."
      }
    ]
  },
  {
    id: "w3-cookies",
    code: "I8",
    level: "intermediate",
    title: {
      fr: "PHP Cookies",
      en: "PHP Cookies"
    },
    sub: {
      fr: "setcookie, $_COOKIE, expiration",
      en: "setcookie, $_COOKIE, expiration"
    },
    tags: [
      "cookies",
      "intermediate"
    ],
    sections: [
      {
        h: "1. Creer un cookie",
        blocks: [
          {
            code: "<?php\nsetcookie(\n    'theme', 'dark',\n    time() + 86400 * 30,  // 30 jours\n    '/'\n);"
          },
          {
            warn: "<code>setcookie()</code> AVANT toute sortie HTML."
          }
        ]
      },
      {
        h: "2. Lire / supprimer",
        blocks: [
          {
            code: "<?php\n// Lire\n$theme = $_COOKIE['theme'] ?? 'light';\n\n// Supprimer (date passee)\nsetcookie('theme', '', time() - 3600, '/');"
          },
          {
            note: "Cookie disponible seulement a la <strong>prochaine requete</strong>."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Cookie sans expiration dure :",
        opts: [
          "Pour toujours",
          "30 jours",
          "Fermeture du navigateur",
          "24h"
        ],
        correct: "c",
        expl: "Session cookie : jusqu'a fermeture du navigateur."
      },
      {
        q: "<code>setcookie</code> doit etre appele :",
        opts: [
          "N'importe quand",
          "AVANT toute sortie HTML",
          "APRES session_start",
          "APRES HTML"
        ],
        correct: "b",
        expl: "Comme <code>header()</code>, envoie un header HTTP."
      }
    ]
  },
  {
    id: "w3-sessions",
    code: "I9",
    level: "intermediate",
    title: {
      fr: "PHP Sessions",
      en: "PHP Sessions"
    },
    sub: {
      fr: "session_start, $_SESSION, regenerate_id, destroy",
      en: "session_start, $_SESSION, regenerate_id, destroy"
    },
    tags: [
      "sessions",
      "intermediate"
    ],
    sections: [
      {
        h: "1. Demarrer",
        blocks: [
          {
            code: "<?php\nsession_start();  // OBLIGATOIRE, avant tout HTML\n\n$_SESSION['user_id']   = 5;\n$_SESSION['user_name'] = 'Chadi';\n\necho 'Bienvenue ' . $_SESSION['user_name'];"
          }
        ]
      },
      {
        h: "2. Modifier / supprimer",
        blocks: [
          {
            code: "<?php\nsession_start();\n\nunset($_SESSION['user_name']);   // une cle\n\n$_SESSION = [];                   // tout effacer\nsession_destroy();                // logout"
          }
        ]
      },
      {
        h: "3. Securite",
        blocks: [
          {
            tip: "Apres login, <code>session_regenerate_id(true)</code> contre la session fixation."
          },
          {
            code: "<?php\n$_SESSION = [];\nsession_regenerate_id(true);\n$_SESSION['user'] = ['id'=>5, 'name'=>'Chadi'];"
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Avant <code>$_SESSION</code> :",
        opts: [
          "<code>session_init</code>",
          "<code>session_start</code>",
          "<code>new Session</code>",
          "Rien"
        ],
        correct: "b",
        expl: "<code>session_start()</code> AVANT toute sortie HTML."
      },
      {
        q: "<code>session_regenerate_id(true)</code> protege contre :",
        opts: [
          "XSS",
          "Session fixation",
          "CSRF",
          "SQL injection"
        ],
        correct: "b",
        expl: "Genere un nouvel ID, rendant l'ancien inutilisable par un attaquant."
      }
    ]
  },
  {
    id: "w3-json",
    code: "I10",
    level: "intermediate",
    title: {
      fr: "PHP JSON",
      en: "PHP JSON"
    },
    sub: {
      fr: "json_encode, json_decode, API REST",
      en: "json_encode, json_decode, REST API"
    },
    tags: [
      "json",
      "intermediate"
    ],
    sections: [
      {
        h: "1. Encoder",
        blocks: [
          {
            code: "<?php\n$data = ['name'=>'Chadi','tags'=>['php','web']];\n\n$json = json_encode($data);\n// {\"name\":\"Chadi\",\"tags\":[\"php\",\"web\"]}\n\n$json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);"
          }
        ]
      },
      {
        h: "2. Decoder",
        blocks: [
          {
            code: "<?php\n$json = '{\"name\":\"Chadi\",\"age\":23}';\n\n// true = array\n$arr = json_decode($json, true);\necho $arr['name'];\n\n// sans true = stdClass\n$obj = json_decode($json);\necho $obj->name;"
          },
          {
            tip: "Preferer <code>true</code> (array) en general."
          }
        ]
      },
      {
        h: "3. API JSON",
        blocks: [
          {
            code: "<?php\nheader('Content-Type: application/json; charset=utf-8');\necho json_encode([\n    'success' => true,\n    'user'    => ['id'=>5, 'name'=>'Chadi'],\n]);\nexit;"
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Decoder en array assoc :",
        opts: [
          "<code>json_decode($j)</code>",
          "<code>json_decode($j, true)</code>",
          "<code>json_decode($j, false)</code>",
          "<code>json_array</code>"
        ],
        correct: "b",
        expl: "<code>true</code> = array. Sans = stdClass."
      },
      {
        q: "Header pour API JSON :",
        opts: [
          "text/html",
          "application/json",
          "application/xml",
          "text/plain"
        ],
        correct: "b",
        expl: "<code>Content-Type: application/json</code>."
      }
    ]
  },
  {
    id: "w3-oop",
    code: "A1",
    level: "advanced",
    title: {
      fr: "PHP OOP — Intro",
      en: "PHP OOP — Intro"
    },
    sub: {
      fr: "Class, object, property, method",
      en: "Class, object, property, method"
    },
    tags: [
      "OOP",
      "advanced"
    ],
    sections: [
      {
        h: "1. Classe et objet",
        blocks: [
          {
            p: "Classe = modele. Objet = instance creee par <code>new</code>."
          },
          {
            code: "<?php\nclass Fruit {\n    public string $name;\n    public string $color;\n\n    public function setName(string $n): void {\n        $this->name = $n;\n    }\n\n    public function getName(): string {\n        return $this->name;\n    }\n}\n\n$apple = new Fruit();\n$apple->setName('Apple');\necho $apple->getName();"
          },
          {
            note: "<code>$this</code> = instance courante dans une methode."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Instancier une classe ?",
        opts: [
          "<code>create Fruit()</code>",
          "<code>new Fruit()</code>",
          "<code>Fruit()</code>",
          "<code>$Fruit</code>"
        ],
        correct: "b",
        expl: "<code>new MaClasse()</code> instancie et appelle le constructeur."
      }
    ]
  },
  {
    id: "w3-constructor",
    code: "A2",
    level: "advanced",
    title: {
      fr: "PHP Constructor / Destructor",
      en: "PHP Constructor / Destructor"
    },
    sub: {
      fr: "__construct, __destruct, property promotion (PHP 8)",
      en: "__construct, __destruct, property promotion (PHP 8)"
    },
    tags: [
      "OOP",
      "constructor",
      "advanced"
    ],
    sections: [
      {
        h: "1. Constructor",
        blocks: [
          {
            code: "<?php\nclass Fruit {\n    private string $name;\n    private string $color;\n\n    public function __construct(string $name, string $color) {\n        $this->name  = $name;\n        $this->color = $color;\n    }\n\n    public function intro(): void {\n        echo \"{$this->name} is {$this->color}\";\n    }\n}\n\n$apple = new Fruit('Apple', 'red');\n$apple->intro();"
          }
        ]
      },
      {
        h: "2. Property promotion (PHP 8)",
        blocks: [
          {
            tip: "Syntaxe raccourcie tres recommandee :"
          },
          {
            code: "<?php\n// Avant PHP 8\nclass Fruit {\n    private string $name;\n    private string $color;\n    public function __construct(string $n, string $c) {\n        $this->name = $n;\n        $this->color = $c;\n    }\n}\n\n// Depuis PHP 8\nclass Fruit {\n    public function __construct(\n        private string $name,\n        private string $color\n    ) {}\n}"
          }
        ]
      },
      {
        h: "3. Destructor",
        blocks: [
          {
            code: "<?php\nclass Fruit {\n    public function __construct(public string $name) {\n        echo \"Cree: {$this->name}\\n\";\n    }\n    public function __destruct() {\n        echo \"Detruit: {$this->name}\\n\";\n    }\n}"
          }
        ]
      }
    ],
    quiz: [
      {
        q: "<code>__construct</code> appele :",
        opts: [
          "Manuellement",
          "Auto par <code>new</code>",
          "Par <code>init()</code>",
          "Par <code>::create</code>"
        ],
        correct: "b",
        expl: "Auto avec <code>new MaClasse(...)</code>."
      },
      {
        q: "Property promotion depuis :",
        opts: [
          "PHP 5",
          "PHP 7",
          "PHP 8",
          "PHP 8.1"
        ],
        correct: "c",
        expl: "PHP 8 a introduit cette syntaxe."
      }
    ]
  },
  {
    id: "w3-modifiers",
    code: "A3",
    level: "advanced",
    title: {
      fr: "PHP Access Modifiers",
      en: "PHP Access Modifiers"
    },
    sub: {
      fr: "public, protected, private",
      en: "public, protected, private"
    },
    tags: [
      "OOP",
      "advanced"
    ],
    sections: [
      {
        h: "1. Les 3 modificateurs",
        blocks: [
          {
            table: [
              [
                "Modificateur",
                "Visible depuis"
              ],
              [
                "<code>public</code>",
                "Partout"
              ],
              [
                "<code>protected</code>",
                "Classe + enfants"
              ],
              [
                "<code>private</code>",
                "Classe seule"
              ]
            ]
          },
          {
            code: "<?php\nclass User {\n    public    string $name;\n    protected string $email;\n    private   string $password;\n\n    public function setPassword(string $p): void {\n        $this->password = password_hash($p, PASSWORD_DEFAULT);\n    }\n}\n\n$u = new User();\necho $u->name;       // OK\n// echo $u->password;  // Erreur fatale"
          },
          {
            tip: "Convention : props <code>private</code> + getters/setters publics = encapsulation."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Visible dans enfant mais pas dehors :",
        opts: [
          "public",
          "protected",
          "private",
          "internal"
        ],
        correct: "b",
        expl: "<code>protected</code> = classe + enfants."
      }
    ]
  },
  {
    id: "w3-inheritance",
    code: "A4",
    level: "advanced",
    title: {
      fr: "PHP Inheritance",
      en: "PHP Inheritance"
    },
    sub: {
      fr: "extends, parent::, override, final",
      en: "extends, parent::, override, final"
    },
    tags: [
      "OOP",
      "inheritance",
      "advanced"
    ],
    sections: [
      {
        h: "1. extends",
        blocks: [
          {
            code: "<?php\nclass Animal {\n    public function __construct(protected string $nom) {}\n    public function parler(): void {\n        echo \"{$this->nom} fait un bruit\";\n    }\n}\n\nclass Chien extends Animal {\n    public function parler(): void {\n        echo \"{$this->nom} aboie\";\n    }\n}\n\nclass Chat extends Animal {\n    public function parler(): void {\n        parent::parler();   // appelle parent\n        echo ' puis miaule';\n    }\n}"
          },
          {
            note: "PHP supporte l'<strong>heritage simple</strong> (1 parent). Pour partager du code entre classes non liees, utiliser <code>trait</code>."
          }
        ]
      },
      {
        h: "2. final",
        blocks: [
          {
            code: "<?php\nfinal class User {}  // ne peut etre etendue\n\nclass Base {\n    final public function id(): int { return 1; }  // ne peut etre overriden\n}"
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Appeler la methode parent dans override :",
        opts: [
          "<code>$this->parent()</code>",
          "<code>parent::methode()</code>",
          "<code>super.methode()</code>",
          "<code>self::methode()</code>"
        ],
        correct: "b",
        expl: "<code>parent::methode()</code>."
      },
      {
        q: "Combien de parents par classe ?",
        opts: [
          "0",
          "1",
          "Plusieurs",
          "Illimite"
        ],
        correct: "b",
        expl: "PHP = heritage simple. Pour le multiple : traits/interfaces."
      }
    ]
  },
  {
    id: "w3-abstract",
    code: "A5",
    level: "advanced",
    title: {
      fr: "PHP Abstract Classes",
      en: "PHP Abstract Classes"
    },
    sub: {
      fr: "abstract class, abstract method",
      en: "abstract class, abstract method"
    },
    tags: [
      "OOP",
      "abstract",
      "advanced"
    ],
    sections: [
      {
        h: "1. abstract",
        blocks: [
          {
            p: "Classe <code>abstract</code> = ne peut PAS etre instanciee. Sert de modele aux enfants."
          },
          {
            code: "<?php\nabstract class Shape {\n    abstract public function area(): float;\n\n    public function describe(): string {\n        return 'Aire = ' . $this->area();\n    }\n}\n\nclass Circle extends Shape {\n    public function __construct(private float $r) {}\n    public function area(): float {\n        return pi() * $this->r ** 2;\n    }\n}\n\nclass Square extends Shape {\n    public function __construct(private float $s) {}\n    public function area(): float {\n        return $this->s ** 2;\n    }\n}\n\n// $s = new Shape();   // Erreur fatale\n$c = new Circle(3);\necho $c->describe();"
          },
          {
            tip: "Force toutes les classes enfants a implementer la methode abstraite."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Peut-on instancier une classe abstraite ?",
        opts: [
          "Oui",
          "Non, jamais",
          "Seulement avec ::create",
          "Depend"
        ],
        correct: "b",
        expl: "<code>abstract</code> sert uniquement de modele."
      }
    ]
  },
  {
    id: "w3-interfaces",
    code: "A6",
    level: "advanced",
    title: {
      fr: "PHP Interfaces",
      en: "PHP Interfaces"
    },
    sub: {
      fr: "interface, implements, multi-implementation",
      en: "interface, implements, multi-implementation"
    },
    tags: [
      "OOP",
      "interface",
      "advanced"
    ],
    sections: [
      {
        h: "1. interface",
        blocks: [
          {
            p: "<code>interface</code> = contrat. Toutes les methodes sont publiques."
          },
          {
            code: "<?php\ninterface Sortable {\n    public function sortBy(string $field): array;\n}\n\ninterface Filterable {\n    public function filterBy(callable $cb): array;\n}\n\nclass Collection implements Sortable, Filterable {\n    public function __construct(private array $items) {}\n\n    public function sortBy(string $f): array {\n        usort($this->items, fn($a,$b)=>$a[$f]<=>$b[$f]);\n        return $this->items;\n    }\n\n    public function filterBy(callable $cb): array {\n        return array_filter($this->items, $cb);\n    }\n}"
          },
          {
            tip: "Une classe peut implementer <strong>plusieurs interfaces</strong> = equivalent multi-inheritance."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Combien d'interfaces par classe ?",
        opts: [
          "1",
          "Plusieurs",
          "Aucune",
          "3 max"
        ],
        correct: "b",
        expl: "<code>class X implements A, B, C</code>."
      },
      {
        q: "Methodes d'interface sont :",
        opts: [
          "Privees",
          "Publiques",
          "Protected",
          "Selon"
        ],
        correct: "b",
        expl: "Une interface declare un contrat public."
      }
    ]
  },
  {
    id: "w3-static",
    code: "A7",
    level: "advanced",
    title: {
      fr: "PHP Static",
      en: "PHP Static"
    },
    sub: {
      fr: "static methods, static properties, self::, static::",
      en: "static methods, static properties, self::, static::"
    },
    tags: [
      "OOP",
      "static",
      "advanced"
    ],
    sections: [
      {
        h: "1. Methodes statiques",
        blocks: [
          {
            code: "<?php\nclass MathHelper {\n    public static function factorial(int $n): int {\n        return $n <= 1 ? 1 : $n * self::factorial($n - 1);\n    }\n}\n\necho MathHelper::factorial(5);   // 120"
          }
        ]
      },
      {
        h: "2. Proprietes statiques",
        blocks: [
          {
            code: "<?php\nclass Counter {\n    public static int $count = 0;\n    public function __construct() {\n        self::$count++;\n    }\n}\n\nnew Counter();\nnew Counter();\necho Counter::$count;   // 2"
          }
        ]
      },
      {
        h: "3. self vs static",
        blocks: [
          {
            note: "<code>self::</code> = classe ou definie. <code>static::</code> = classe reelle (LSB)."
          },
          {
            code: "<?php\nclass A {\n    public static function create(): self {\n        return new self();      // toujours A\n    }\n    public static function createLate(): static {\n        return new static();    // peut etre A ou B\n    }\n}\nclass B extends A {}\nvar_dump(B::create());      // object(A)\nvar_dump(B::createLate());  // object(B)"
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Appeler une methode statique :",
        opts: [
          "<code>$x->foo()</code>",
          "<code>X::foo()</code>",
          "<code>X->foo()</code>",
          "<code>new X()->foo()</code>"
        ],
        correct: "b",
        expl: "<code>::</code> pour static, <code>-></code> pour instance."
      },
      {
        q: "self vs static :",
        opts: [
          "Identiques",
          "self = definie, static = reelle",
          "static n'existe pas",
          "self obsolete"
        ],
        correct: "b",
        expl: "Late Static Binding avec <code>static::</code>."
      }
    ]
  },
  {
    id: "w3-exceptions",
    code: "A8",
    level: "advanced",
    title: {
      fr: "PHP Exceptions",
      en: "PHP Exceptions"
    },
    sub: {
      fr: "try/catch/throw/finally, hierarchie",
      en: "try/catch/throw/finally, hierarchy"
    },
    tags: [
      "exceptions",
      "advanced"
    ],
    sections: [
      {
        h: "1. throw / try / catch",
        blocks: [
          {
            code: "<?php\nfunction divide(float $a, float $b): float {\n    if ($b == 0) {\n        throw new InvalidArgumentException('Division par zero');\n    }\n    return $a / $b;\n}\n\ntry {\n    echo divide(10, 0);\n} catch (InvalidArgumentException $e) {\n    echo 'Erreur: ' . $e->getMessage();\n} finally {\n    echo \"\\nFin\";   // toujours\n}"
          }
        ]
      },
      {
        h: "2. Hierarchie",
        blocks: [
          {
            list: [
              "<code>Throwable</code> (interface racine)",
              "├─ <code>Error</code> (erreurs internes)",
              "└─ <code>Exception</code> (logique app)",
              "&nbsp;&nbsp;&nbsp;&nbsp;├─ <code>RuntimeException</code>",
              "&nbsp;&nbsp;&nbsp;&nbsp;├─ <code>InvalidArgumentException</code>",
              "&nbsp;&nbsp;&nbsp;&nbsp;└─ <code>PDOException</code>"
            ]
          }
        ]
      },
      {
        h: "3. Multi-catch (PHP 8)",
        blocks: [
          {
            code: "<?php\ntry { /* ... */ }\ncatch (PDOException | FileException $e) {\n    log('IO: ' . $e->getMessage());\n}"
          }
        ]
      }
    ],
    quiz: [
      {
        q: "<code>finally</code> s'execute :",
        opts: [
          "Si pas d'exception",
          "Si exception",
          "Toujours",
          "Jamais"
        ],
        correct: "c",
        expl: "<code>finally</code> = toujours apres try/catch."
      },
      {
        q: "Racine des exceptions :",
        opts: [
          "Exception",
          "Error",
          "Throwable",
          "RuntimeError"
        ],
        correct: "c",
        expl: "<code>Throwable</code> depuis PHP 7."
      }
    ]
  },
  {
    id: "w3-mysql",
    code: "A9",
    level: "advanced",
    title: {
      fr: "PHP MySQL Connect",
      en: "PHP MySQL Connect"
    },
    sub: {
      fr: "mysqli, PDO, prepared statements",
      en: "mysqli, PDO, prepared statements"
    },
    tags: [
      "mysql",
      "database",
      "advanced"
    ],
    sections: [
      {
        h: "1. mysqli",
        blocks: [
          {
            code: "<?php\n$conn = new mysqli('localhost','root','','sawa');\nif ($conn->connect_error) die($conn->connect_error);\n$conn->set_charset('utf8mb4');\n\n// SELECT\n$result = $conn->query('SELECT * FROM users');\nwhile ($row = $result->fetch_assoc()) {\n    echo $row['name'];\n}\n\n// Prepared INSERT\n$stmt = $conn->prepare('INSERT INTO users (name, email) VALUES (?, ?)');\n$stmt->bind_param('ss', $name, $email);\n$stmt->execute();\necho $conn->insert_id;"
          }
        ]
      },
      {
        h: "2. PDO (recommande)",
        blocks: [
          {
            code: "<?php\ntry {\n    $pdo = new PDO(\n        'mysql:host=localhost;dbname=nfa042;charset=utf8mb4',\n        'root', '',\n        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]\n    );\n} catch (PDOException $e) {\n    die('DB: ' . $e->getMessage());\n}\n\n$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');\n$stmt->execute([$email]);\n$user = $stmt->fetch(PDO::FETCH_ASSOC);\n\n$stmt = $pdo->prepare('INSERT INTO users (name, email) VALUES (?, ?)');\n$stmt->execute([$name, $email]);\necho $pdo->lastInsertId();"
          }
        ]
      },
      {
        h: "3. Pourquoi prepared",
        blocks: [
          {
            bad: "NE JAMAIS concatener input utilisateur en SQL = SQL injection."
          },
          {
            code: "<?php\n// ❌ FAILLE\n$sql = \"SELECT * FROM users WHERE email = '$email'\";\n\n// ✅ SAFE\n$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');\n$stmt->execute([$email]);"
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Pourquoi prepared statements ?",
        opts: [
          "Plus rapide",
          "Empeche SQL injection",
          "Plus court",
          "Obligatoire"
        ],
        correct: "b",
        expl: "Separation requete/donnees au niveau SQL = injection impossible."
      },
      {
        q: "ID auto en PDO apres INSERT :",
        opts: [
          "<code>$pdo->lastInsertId()</code>",
          "<code>$pdo->insertId</code>",
          "<code>$stmt->insert_id</code>",
          "<code>$pdo->lastId()</code>"
        ],
        correct: "a",
        expl: "PDO: <code>lastInsertId()</code>. mysqli: <code>insert_id</code>."
      }
    ]
  },
  {
    id: "w3-traits",
    code: "A10",
    level: "advanced",
    title: {
      fr: "PHP Traits",
      en: "PHP Traits"
    },
    sub: {
      fr: "Partage de code entre classes non liees",
      en: "Code sharing across unrelated classes"
    },
    tags: [
      "OOP",
      "traits",
      "advanced"
    ],
    sections: [
      {
        h: "1. trait",
        blocks: [
          {
            p: "<code>trait</code> = partager du code SANS heritage. Comble le manque d'heritage multiple."
          },
          {
            code: "<?php\ntrait Timestamps {\n    public ?DateTime $createdAt = null;\n    public ?DateTime $updatedAt = null;\n\n    public function touch(): void {\n        if (!$this->createdAt) $this->createdAt = new DateTime();\n        $this->updatedAt = new DateTime();\n    }\n}\n\ntrait SoftDelete {\n    public ?DateTime $deletedAt = null;\n    public function delete(): void {\n        $this->deletedAt = new DateTime();\n    }\n}\n\nclass User {\n    use Timestamps, SoftDelete;\n}\n\n$u = new User();\n$u->touch();\n$u->delete();"
          },
          {
            tip: "Cas typique : Timestamps, Loggable, HasUuid, SoftDelete partages entre modeles."
          }
        ]
      }
    ],
    quiz: [
      {
        q: "Combien de traits par classe ?",
        opts: [
          "1",
          "3 max",
          "Plusieurs (illimite)",
          "0"
        ],
        correct: "c",
        expl: "<code>use A, B, C;</code> — illimite."
      },
      {
        q: "Utilite d'un trait ?",
        opts: [
          "Remplacer interfaces",
          "Partager code entre classes non liees",
          "Multi-heritage classique",
          "Cacher methodes"
        ],
        correct: "b",
        expl: "Mutualiser du code entre classes sans parent commun."
      }
    ]
  }
];
const ALL_LESSONS = [...DAYS, ...GIO];
const TOTAL = ALL_LESSONS.length;
const TOTAL_EXERCISES = DAYS.reduce((s,d)=>s+(d.exercises?d.exercises.length:0)+(d.problemes?d.problemes.length:0),0);
