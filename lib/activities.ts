import type { Activity, AgeGroup, GroupSize } from './types'

export const activities: Activity[] = [
  // Sport
  {
    icon: '🏃', title: 'Løbetur med en udfordring', description: 'Løb til et bestemt sted og mål din tid.',
    tags: ['aktiv', 'udendørs', 'solo'], hobby: 'sport',
    time: '20–45 min', difficulty: 'let', needs: ['Løbesko'],
    tips: 'Sæt et mål og mål din tid — prøv at slå den næste gang!'
  },
  {
    icon: '⚽', title: 'Øvetræning med bold', description: 'Sæt kegler op og øv dine færdigheder.',
    tags: ['aktiv', 'udendørs', 'solo'], hobby: 'sport',
    time: '30–60 min', difficulty: 'let', needs: ['Bold', 'Kegler eller flasker'],
    tips: 'Prøv at øve det trick der er svært — gentag 10 gange!'
  },
  {
    icon: '🏆', title: 'Mini-turnering', description: 'Opfind jeres eget spil med regler og point.',
    tags: ['aktiv', 'udendørs', 'gruppe'], hobby: 'sport',
    time: '30–60 min', difficulty: 'let', needs: ['Bold eller andet udstyr', 'Point-system'],
    tips: 'Skriv reglerne ned inden I starter — det giver færre diskussioner!'
  },
  {
    icon: '💦', title: 'Vandkrig', description: 'Tag vandpistoler og hold vandkrig udendørs!',
    tags: ['aktiv', 'udendørs', 'gruppe'], hobby: 'sport',
    time: '30–60 min', difficulty: 'let', needs: ['Vandpistoler eller balloner', 'Tøj der må blive vådt'],
    tips: 'Del jer i hold og lav en base — det gør spillet sjovere!'
  },
  {
    icon: '🚴', title: 'Cykeltur på ny rute', description: 'Find en vej du aldrig har cyklet.',
    tags: ['aktiv', 'udendørs', 'solo'], hobby: 'sport',
    time: '30–90 min', difficulty: 'let', needs: ['Cykel', 'Hjelm'],
    tips: 'Brug Google Maps til at finde en spændende ny rute!'
  },
  // Kunst
  {
    icon: '🎨', title: 'Tegn hvad du ser', description: 'Kig ud og tegn det realistisk.',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'kunst',
    time: '15–60 min', difficulty: 'let', needs: ['Papir', 'Blyant eller farver'],
    tips: 'Prøv at tegne uden at løfte blyanten fra papiret!'
  },
  {
    icon: '✂️', title: 'Lav en collage', description: 'Klip billeder fra blade og lav et kunstværk.',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'kunst',
    time: '20–60 min', difficulty: 'let', needs: ['Blade/aviser', 'Saks', 'Lim', 'Papir'],
    tips: 'Brug billeder fra flere blade for de bedste resultater!'
  },
  {
    icon: '🎨', title: 'Tegnekonkurrence', description: 'Alle tegner det samme motiv — bedste vinder!',
    tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'kunst',
    time: '20–40 min', difficulty: 'let', needs: ['Papir til alle', 'Farver eller blyanter'],
    tips: 'Vælg et sjovt motiv der er svært at tegne — det giver mest grin!'
  },
  {
    icon: '🖌️', title: 'Mal med kaffe', description: 'Brug te eller kaffe som maling.',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'kunst',
    time: '20–45 min', difficulty: 'let', needs: ['Kaffe eller te', 'Papir', 'Pensel eller vatpinde'],
    tips: 'Jo stærkere kaffen er, jo mørkere bliver farven — eksperimenter!'
  },
  // Musik
  {
    icon: '🎵', title: 'Skriv en sang', description: 'Vælg et emne og skriv en tekst.',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'musik',
    time: '20–60 min', difficulty: 'let', needs: ['Papir og blyant'],
    tips: 'Start med omkvædet — det er nemmest!'
  },
  {
    icon: '🥁', title: 'Lav din egen rytme', description: 'Brug kasser og kopper som trommer.',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'musik',
    time: '15–30 min', difficulty: 'let', needs: ['Kasser', 'Kopper', 'Skeer eller pinde'],
    tips: 'Start med en simpel 4/4 rytme og byg videre derfra!'
  },
  {
    icon: '🎤', title: 'Karaoke-kamp', description: 'Syng mod hinanden!',
    tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'musik',
    time: '30–60 min', difficulty: 'let', needs: ['Telefon/tablet til tekster'],
    tips: 'Giv point for performance, ikke bare sangstemme!'
  },
  {
    icon: '🎵', title: 'Gæt melodien', description: 'En nynner, resten gætter.',
    tags: ['rolig', 'indendørs', 'gruppe'], hobby: 'musik',
    time: '20–40 min', difficulty: 'let', needs: ['Ingen ting nødvendigt'],
    tips: 'Vælg sange fra forskellige genrer — det gør det sværere!'
  },
  // Dans
  {
    icon: '💃', title: 'Lær en ny koreografi', description: 'Find en dans og lær den trin for trin.',
    tags: ['aktiv', 'indendørs', 'solo'], hobby: 'dans',
    time: '30–60 min', difficulty: 'mellem', needs: ['Plads til at bevæge sig', 'Musik'],
    tips: 'Find en tutorial på YouTube og lær 8 trin ad gangen!'
  },
  {
    icon: '💃', title: 'Dansekonkurrence', description: 'Skiftes til at dømme og give point.',
    tags: ['aktiv', 'indendørs', 'gruppe'], hobby: 'dans',
    time: '30–60 min', difficulty: 'let', needs: ['Musik', 'Point-kort'],
    tips: 'Giv ekstra point for originalitet — det motiverer alle!'
  },
  // Natur
  {
    icon: '🌿', title: 'Naturtur og opdagelse', description: 'Find 10 planter, insekter eller fugle.',
    tags: ['aktiv', 'udendørs', 'solo'], hobby: 'natur',
    time: '30–90 min', difficulty: 'let', needs: ['Notizbog', 'Blyant', 'Evt. lup'],
    tips: 'Tag billeder af det du finder og kig dem op bagefter!'
  },
  {
    icon: '🌱', title: 'Plant noget', description: 'Find en potte og plant et frø.',
    tags: ['rolig', 'indendørs', 'solo'], hobby: 'natur',
    time: '20–40 min', difficulty: 'let', needs: ['Potte', 'Jord', 'Frø'],
    tips: 'Radise- og basilikumfrø spirer hurtigt — perfekt til utålmodige!'
  },
  {
    icon: '🌿', title: 'Naturjagt', description: 'Lav en liste — hvem finder alt først?',
    tags: ['aktiv', 'udendørs', 'gruppe'], hobby: 'natur',
    time: '30–60 min', difficulty: 'let', needs: ['Naturjagt-liste', 'Blyant'],
    tips: 'Lav listen hjemmefra med 10–15 specifikke ting at finde!'
  },
  {
    icon: '⭐', title: 'Kig på stjernerne', description: 'Find stjernebilleder med en gratis app.',
    tags: ['rolig', 'udendørs', 'solo'], hobby: 'natur',
    time: '20–60 min', difficulty: 'let', needs: ['Telefon med stjerne-app', 'Tæppe at ligge på'],
    tips: 'Download "Star Walk" eller "Sky Map" — de er gratis og fantastiske!'
  },
  // Læsning
  {
    icon: '📖', title: 'Læs en bog', description: 'Sæt dig komfortabelt og læs 30 sider.',
    tags: ['rolig', 'indendørs', 'solo'], hobby: 'læsning',
    time: '30–60 min', difficulty: 'let', needs: ['En bog'],
    tips: 'Sæt telefonen i en anden stue — så læser du meget mere!'
  },
  {
    icon: '✏️', title: 'Skriv din egen historie', description: 'Start på en kort historie.',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'læsning',
    time: '30–60 min', difficulty: 'let', needs: ['Papir og blyant eller computer'],
    tips: 'Start in medias res — begyndt midt i handlingen!'
  },
  {
    icon: '📖', title: 'Historiefortælling på skift', description: 'En starter, den næste fortsætter.',
    tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'læsning',
    time: '20–40 min', difficulty: 'let', needs: ['Ingen ting nødvendigt'],
    tips: 'Lav en cliffhanger når det er din tur — hold de andre på tæerne!'
  },
  // Madlavning
  {
    icon: '🍪', title: 'Bag noget nyt', description: 'Find en opskrift og bag det fra bunden.',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'madlavning',
    time: '45–90 min', difficulty: 'mellem', needs: ['Ingredienser', 'Ovn', 'Bageredskaber'],
    tips: 'Find en opskrift der ser svær ud — det er sjovere!'
  },
  {
    icon: '🍳', title: 'Opfind din egen ret', description: 'Brug hvad der er i køleskabet.',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'madlavning',
    time: '30–60 min', difficulty: 'mellem', needs: ['Hvad der er i køleskabet'],
    tips: 'Kombiner to ting du aldrig har lavet sammen — det overrasker dig selv!'
  },
  {
    icon: '🍕', title: 'Lav pizza fra bunden', description: 'Lav jeres egne pizzaer.',
    tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'madlavning',
    time: '60–90 min', difficulty: 'svær', needs: ['Pizzadej eller mel/gær', 'Tomatsauce', 'Ost', 'Fyld', 'Ovn'],
    tips: 'Lad dejen hæve i 30 min for den bedste bund!'
  },
  {
    icon: '🍪', title: 'Bagekonkurrence', description: 'Bag det samme og bed nogen om at vurdere.',
    tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'madlavning',
    time: '60–90 min', difficulty: 'mellem', needs: ['Ingredienser til alle', 'Ovn', 'Dommere'],
    tips: 'Smag hinandens kager blindt — det er mere retfærdigt!'
  },
  {
    icon: '🍦', title: 'Lav hjemmelavet is', description: 'Bland fløde, sukker og frugt!',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'madlavning',
    time: '20 min + 4 timer frys', difficulty: 'let', needs: ['Fløde', 'Sukker', 'Frugt', 'Fryser'],
    tips: 'Ryst eller rør isen hvert 30 min. de første par timer for bedre konsistens!'
  },
  // Teater
  {
    icon: '🎭', title: 'Øv en monolog', description: 'Find tekst og øv foran spejlet.',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'teater',
    time: '20–45 min', difficulty: 'let', needs: ['Et spejl', 'Tekst at øve'],
    tips: 'Optag dig selv og se det bagefter — du lærer enormt meget af det!'
  },
  {
    icon: '🎭', title: 'Improvisationsteater', description: 'En siger en situation — resten improviserer.',
    tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'teater',
    time: '30–60 min', difficulty: 'let', needs: ['Ingen ting nødvendigt'],
    tips: 'Sig altid "ja, og..." for at bygge videre på det andre siger!'
  },
  // Foto
  {
    icon: '📸', title: 'Gå på fototur', description: 'Find interessante motiver.',
    tags: ['kreativ', 'udendørs', 'solo'], hobby: 'foto',
    time: '30–90 min', difficulty: 'let', needs: ['Telefon med kamera'],
    tips: 'Prøv at fotografere fra lav vinkel — det giver dramatiske billeder!'
  },
  {
    icon: '📸', title: 'Fotojagt', description: 'Giv hinanden 5 motiver.',
    tags: ['kreativ', 'udendørs', 'gruppe'], hobby: 'foto',
    time: '30–60 min', difficulty: 'let', needs: ['Telefon med kamera til alle'],
    tips: 'Lav reglerne kreative: "noget blåt", "noget der ligner et ansigt" osv.!'
  },
  // Håndværk
  {
    icon: '🔨', title: 'Byg noget kreativt', description: 'Brug kartong og tape.',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'håndværk',
    time: '30–90 min', difficulty: 'let', needs: ['Kartong', 'Tape', 'Saks'],
    tips: 'Lav en tegning af det du vil bygge inden du starter!'
  },
  {
    icon: '🏗️', title: 'Byggekonkurrence', description: 'Hvem kan bygge det højeste tårn?',
    tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'håndværk',
    time: '20–40 min', difficulty: 'let', needs: ['Spaghetti og marshmallows', 'eller kartong og tape'],
    tips: 'Trekanter er stærkere end firkanter — brug dem i din konstruktion!'
  },
  {
    icon: '🏰', title: 'Byg en fort', description: 'Brug puder og tæpper.',
    tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'håndværk',
    time: '20–45 min', difficulty: 'let', needs: ['Puder', 'Tæpper', 'Stole'],
    tips: 'Brug tøjklemmer til at holde tæpperne på plads — det holder bedre!'
  },
  // Rollespil
  {
    icon: '🧙', title: 'Skriv en fantasy-historie', description: 'Opfind en verden.',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'rollespil',
    time: '30–60 min', difficulty: 'let', needs: ['Papir og blyant eller computer'],
    tips: 'Tegn et kort over din verden inden du skriver — det hjælper med detaljer!'
  },
  {
    icon: '🗺️', title: 'Tegn et fantasykort', description: 'Tegn en opdigtet verden.',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'rollespil',
    time: '30–90 min', difficulty: 'let', needs: ['Papir', 'Farver eller blyanter'],
    tips: 'Tilføj navne til steder, bjerge og floder — det gør kortet levende!'
  },
  {
    icon: '🧙', title: 'Spil et rollespil', description: 'En er fortæller, resten er helte.',
    tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'rollespil',
    time: '60–120 min', difficulty: 'mellem', needs: ['Terninger', 'Papir til karakterark'],
    tips: 'Start med en simpel quest — redde en landsby fra en drage!'
  },
  // LEGO
  {
    icon: '🧩', title: 'Byg frit med LEGO', description: 'Byg noget uden vejledning.',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'lego',
    time: '30–90 min', difficulty: 'let', needs: ['LEGO-klodser'],
    tips: 'Giv dig selv et tema: "Fremtidens by" eller "Undervandsbygning"!'
  },
  {
    icon: '🧩', title: 'LEGO-konkurrence', description: 'Hvem bygger det sejeste?',
    tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'lego',
    time: '30–60 min', difficulty: 'let', needs: ['LEGO-klodser til alle', 'Timer'],
    tips: 'Sæt en tidsbegrænsning på 20 minutter — det øger kreativiteten!'
  },
  // Brætspil
  {
    icon: '🎲', title: 'Lær et nyt kortspil', description: 'Find reglerne til et kortspil.',
    tags: ['rolig', 'indendørs', 'solo'], hobby: 'brætspil',
    time: '20–45 min', difficulty: 'let', needs: ['Et kortspil'],
    tips: 'Prøv "Solitaire" eller "Freecell" — der er mange gratis regler online!'
  },
  {
    icon: '🎲', title: 'Brætspilsmaraton', description: 'Spil 3 spil — hvem vinder flest?',
    tags: ['rolig', 'indendørs', 'gruppe'], hobby: 'brætspil',
    time: '60–180 min', difficulty: 'let', needs: ['Mindst 3 brætspil', 'Point-tavle'],
    tips: 'Vælg spil af forskellig type: et heldigt, et taktisk og et ord-spil!'
  },
  // Yoga
  {
    icon: '🧘', title: 'Prøv en yoga-rutine', description: 'Find en begynder-video og følg med.',
    tags: ['rolig', 'indendørs', 'solo'], hobby: 'yoga',
    time: '20–45 min', difficulty: 'let', needs: ['Yogamåtte eller tæppe', 'Plads til at strække sig'],
    tips: 'Søg "yoga for beginners 20 min" på YouTube — der er masser af gode gratis videoer!'
  },
  {
    icon: '📓', title: 'Taknemmelighedsdagbog', description: 'Skriv 5 ting du er taknemmelig for.',
    tags: ['rolig', 'indendørs', 'solo'], hobby: 'yoga',
    time: '10–20 min', difficulty: 'let', needs: ['Notizbog', 'Blyant'],
    tips: 'Prøv at finde nye ting hver gang — det træner dit blik for det positive!'
  },
  // Skateboard
  {
    icon: '🛹', title: 'Øv nye tricks', description: 'Gå udenfor og øv et trick.',
    tags: ['aktiv', 'udendørs', 'solo'], hobby: 'skateboard',
    time: '30–90 min', difficulty: 'svær', needs: ['Skateboard', 'Beskyttelsesudstyr'],
    tips: 'Se YouTube-tutorials i slowmotion — det hjælper med at forstå footwork!'
  },
  {
    icon: '🛹', title: 'Tricks-konkurrence', description: 'Vis jeres bedste tricks.',
    tags: ['aktiv', 'udendørs', 'gruppe'], hobby: 'skateboard',
    time: '30–60 min', difficulty: 'svær', needs: ['Skateboard til alle', 'Point-system'],
    tips: 'Optag hinanden — det er sejt at se fremskridt over tid!'
  },
  // Ridning
  {
    icon: '🐴', title: 'Øv dine rideskills', description: 'Lav øvelser til næste gang.',
    tags: ['aktiv', 'udendørs', 'solo'], hobby: 'ridning',
    time: '30–60 min', difficulty: 'let', needs: ['Adgang til hest', 'Ridehjelm'],
    tips: 'Skriv dine mål ned inden du rider — fokus giver bedre træning!'
  },
  // Svømning
  {
    icon: '🏊', title: 'Svøm en tur', description: 'Se hvor mange baner du kan svømme.',
    tags: ['aktiv', 'udendørs', 'solo'], hobby: 'svømning',
    time: '30–60 min', difficulty: 'let', needs: ['Svømmetøj', 'Adgang til pool eller strand'],
    tips: 'Sæt et banetal som mål og prøv at slå det næste gang!'
  },
  // Venner
  {
    icon: '✉️', title: 'Skriv et brev til en ven', description: 'Et håndskrevet brev.',
    tags: ['rolig', 'indendørs', 'solo'], hobby: 'venner',
    time: '20–40 min', difficulty: 'let', needs: ['Papir', 'Pen', 'Kuvert og frimærke'],
    tips: 'Pynt brevet med tegninger eller klistermærker — det gør det ekstra specielt!'
  },
  {
    icon: '🗣️', title: 'To sande og en løgn', description: 'Hvem lyver? Resten gætter!',
    tags: ['rolig', 'indendørs', 'gruppe'], hobby: 'venner',
    time: '15–30 min', difficulty: 'let', needs: ['Ingen ting nødvendigt'],
    tips: 'Lav løgnen troværdig og de sande ting overraskende — det er tricket!'
  },

  // Ekstra aktiviteter — sport
  {
    icon: '🏸', title: 'Badminton i haven', description: 'Sæt et net op og spil badminton.',
    tags: ['aktiv', 'udendørs', 'gruppe'], hobby: 'sport',
    time: '30–60 min', difficulty: 'let', needs: ['Badmintonketchere', 'Fjerbolde'],
    tips: 'Brug et reb som net hvis du ikke har et rigtigt — det virker fint!'
  },
  {
    icon: '🤸', title: 'Gymnastikundersøgelse', description: 'Lær en ny gymnástiktbevægelse.',
    tags: ['aktiv', 'indendørs', 'solo'], hobby: 'sport',
    time: '20–45 min', difficulty: 'mellem', needs: ['Måtte eller blødt underlag', 'Plads til at bevæge sig'],
    tips: 'Start med kolbøtter og hjulspring — YouTube har gode tutorials!'
  },
  {
    icon: '🎯', title: 'Sækkekast', description: 'Lav mål og kast sækkekasser eller bolde derhen.',
    tags: ['aktiv', 'udendørs', 'gruppe'], hobby: 'sport',
    time: '20–45 min', difficulty: 'let', needs: ['Sækkekasser eller små bolde', 'Kurve eller kasser som mål'],
    tips: 'Skift afstanden for hvert runde — sværere og sværere!'
  },

  // Ekstra aktiviteter — kreativ
  {
    icon: '🪡', title: 'Lav armbånd', description: 'Flét armbånd af tråd til dine venner.',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'kunst',
    time: '30–60 min', difficulty: 'let', needs: ['Farvet tråd eller garn', 'Saks'],
    tips: 'Søg "venskabsarmbånd trin for trin" på YouTube — der er mange mønstre!'
  },
  {
    icon: '🪨', title: 'Mal sten', description: 'Find sten udenfor og mal dem med mønstre.',
    tags: ['kreativ', 'udendørs', 'solo'], hobby: 'kunst',
    time: '30–60 min', difficulty: 'let', needs: ['Flade sten', 'Maling eller tusser', 'Lak til at beskytte'],
    tips: 'Placer dine malede sten skjulte steder ude — det er en fin overraskelse for andre!'
  },
  {
    icon: '🧶', title: 'Lær at strikke eller hækle', description: 'Lav dit første strik-projekt.',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'kunst',
    time: '45–90 min', difficulty: 'mellem', needs: ['Strikkepinde eller hæklenål', 'Garn'],
    tips: 'Start med et simpelt halstørklæde — det er kun to masker der gentages!'
  },
  {
    icon: '🎭', title: 'Lav en dukketeater-forestilling', description: 'Byg dukker og lav et show.',
    tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'teater',
    time: '60–120 min', difficulty: 'let', needs: ['Sokker eller papirposer', 'Farver og saks', 'Et tæppe som scene'],
    tips: 'Skriv manuskriptet ned på forhånd — men improviser gerne undervejs!'
  },

  // Ekstra aktiviteter — natur
  {
    icon: '🌱', title: 'Lav en mini-have', description: 'Plant urter i en kasse eller potte.',
    tags: ['kreativ', 'udendørs', 'solo'], hobby: 'natur',
    time: '30–60 min', difficulty: 'let', needs: ['Potter eller kasse', 'Jord', 'Frø eller småplanter'],
    tips: 'Basilikum og mynte er nemmest — de gror hurtigt og kan bruges til mad!'
  },
  {
    icon: '🔭', title: 'Stjernekort-aften', description: 'Brug en app til at identificere stjerner.',
    tags: ['rolig', 'udendørs', 'gruppe'], hobby: 'natur',
    time: '30–60 min', difficulty: 'let', needs: ['Telefon med stjerne-app (f.eks. Sky Map)', 'Tæppe at ligge på'],
    tips: 'Vent til det er helt mørkt og gå væk fra lys — så kan du se flest stjerner!'
  },
  {
    icon: '🍄', title: 'Naturopsamling-tur', description: 'Saml blade, frø og kogler og lav et kunstværk.',
    tags: ['aktiv', 'udendørs', 'solo'], hobby: 'natur',
    time: '45–90 min', difficulty: 'let', needs: ['Pose til at samle', 'Lim og papir til kunstværk'],
    tips: 'Tag et foto af alt du finder — du kan lave en naturguide bagefter!'
  },

  // Ekstra aktiviteter — mad
  {
    icon: '🥗', title: 'Lav din egne wrap', description: 'Opfind en skøn wrap med det der er i køleskabet.',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'madlavning',
    time: '15–30 min', difficulty: 'let', needs: ['Wraps', 'Fyld fra køleskabet'],
    tips: 'Bland sødt og salt — f.eks. kylling og mango er fantastisk!'
  },
  {
    icon: '🍫', title: 'Dyp frugt i chokolade', description: 'Lav chokoladedyppede jordbær eller banan.',
    tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'madlavning',
    time: '20–40 min', difficulty: 'let', needs: ['Chokolade', 'Frugt', 'Pinde', 'Bagepapir'],
    tips: 'Tilsæt lidt kokosolie til chokoladen — det giver et flottere blankt lag!'
  },
  {
    icon: '🥤', title: 'Opfind en smoothie', description: 'Bland frugter og lav din signatursmoothie.',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'madlavning',
    time: '10–20 min', difficulty: 'let', needs: ['Frugt', 'Blender', 'Mælk eller juice'],
    tips: 'Frossen frugt giver en tykkere og koldere smoothie — prøv det!'
  },

  // Ekstra aktiviteter — musik/dans
  {
    icon: '🎹', title: 'Lær en simpel melodi', description: 'Lær en melodi på klaver, guitar eller xylofon.',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'musik',
    time: '30–60 min', difficulty: 'let', needs: ['Et instrument'],
    tips: 'Start med "Twinkle Twinkle" — 5 toner og du lyder allerede godt!'
  },
  {
    icon: '🕺', title: 'TikTok-dans udfordring', description: 'Lær en populær dans og film det.',
    tags: ['aktiv', 'indendørs', 'gruppe'], hobby: 'dans',
    time: '20–45 min', difficulty: 'let', needs: ['Telefon til musik og optagelse', 'Plads til at danse'],
    tips: 'Øv de sværeste dele separat inden du prøver hele dansen!'
  },

  // Ekstra aktiviteter — misc
  {
    icon: '🧩', title: 'Lav dit eget puslespil', description: 'Tegn et billede, klip det ud og saml det.',
    tags: ['kreativ', 'indendørs', 'solo'], hobby: 'lego',
    time: '30–60 min', difficulty: 'let', needs: ['Karton', 'Farver', 'Saks'],
    tips: 'Jo flere brikker du laver, jo sværere bliver det — start med 20!'
  },
  {
    icon: '🎪', title: 'Lav en cirkusforestilling', description: 'Opfind numre og hold en forestilling for familien.',
    tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'teater',
    time: '60–120 min', difficulty: 'let', needs: ['Kostumer (hvad som helst)', 'Musik til baggrund'],
    tips: 'Øv hvert nummer 3 gange inden generalprøven — det giver mere selvtillid!'
  },
  {
    icon: '📝', title: 'Lav din egen quiz', description: 'Skriv 10 spørgsmål og test familien.',
    tags: ['rolig', 'indendørs', 'gruppe'], hobby: 'brætspil',
    time: '30–60 min', difficulty: 'let', needs: ['Papir og blyant', 'Point-tavle'],
    tips: 'Mix nemme og svære spørgsmål — og lav mindst ét om lokale kendsgerninger!'
  },
  {
    icon: '🛶', title: 'Byg og sejl en papirsbåd', description: 'Fold en båd og test den i en balje eller et vandløb.',
    tags: ['kreativ', 'udendørs', 'gruppe'], hobby: 'håndværk',
    time: '20–45 min', difficulty: 'let', needs: ['Papir', 'Vand (balje, bæk eller sø)'],
    tips: 'Lav flere designs og test hvilken der bærer mest — det er rigtig videnskab!'
  },
]

export const hobbies = [
  { id: 'sport', label: 'Sport', icon: '⚽' },
  { id: 'svømning', label: 'Svømning', icon: '🏊' },
  { id: 'ridning', label: 'Ridning', icon: '🐴' },
  { id: 'skateboard', label: 'Skateboard', icon: '🛹' },
  { id: 'natur', label: 'Natur', icon: '🌿' },
  { id: 'yoga', label: 'Yoga', icon: '🧘' },
  { id: 'kunst', label: 'Kunst', icon: '🎨' },
  { id: 'musik', label: 'Musik', icon: '🎵' },
  { id: 'dans', label: 'Dans', icon: '💃' },
  { id: 'teater', label: 'Teater', icon: '🎭' },
  { id: 'foto', label: 'Foto', icon: '📸' },
  { id: 'håndværk', label: 'Håndværk', icon: '🔨' },
  { id: 'madlavning', label: 'Madlavning', icon: '🍳' },
  { id: 'læsning', label: 'Læsning', icon: '📖' },
  { id: 'rollespil', label: 'Rollespil', icon: '🧙' },
  { id: 'lego', label: 'LEGO', icon: '🧩' },
  { id: 'brætspil', label: 'Brætspil', icon: '🎲' },
  { id: 'venner', label: 'Venner', icon: '🗣️' },
]

export const ageGroups: { id: AgeGroup; label: string; emoji: string }[] = [
  { id: '3-5', label: '3-5 år', emoji: '🐣' },
  { id: '6-8', label: '6-8 år', emoji: '🌟' },
  { id: '9-11', label: '9-11 år', emoji: '🚀' },
  { id: '12-14', label: '12-14 år', emoji: '🎯' },
  { id: '15-17', label: '15-17 år', emoji: '🔥' },
  { id: '18+', label: '18+ år', emoji: '💪' },
]

export const groupSizes: { id: GroupSize; label: string; emoji: string }[] = [
  { id: 'solo', label: 'Solo', emoji: '🧍' },
  { id: '2', label: '2 personer', emoji: '👫' },
  { id: '3-5', label: '3-5 personer', emoji: '👨‍👩‍👧' },
  { id: '6+', label: '6+ personer', emoji: '🎉' },
]

export function filterActivities(
  selectedHobbies: string[],
  groupSize: GroupSize | null,
  weatherFilter?: string
): Activity[] {
  let filtered = activities

  // Filter by hobby
  if (selectedHobbies.length > 0) {
    filtered = filtered.filter((a) => selectedHobbies.includes(a.hobby))
  }

  // Filter by group size
  if (groupSize) {
    if (groupSize === 'solo') {
      filtered = filtered.filter((a) => a.tags.includes('solo'))
    } else if (groupSize === '2') {
      filtered = filtered.filter(
        (a) => a.tags.includes('solo') || a.tags.includes('gruppe')
      )
    } else {
      filtered = filtered.filter((a) => a.tags.includes('gruppe'))
    }
  }

  // Filter by weather
  if (weatherFilter && weatherFilter !== 'alle') {
    if (weatherFilter === 'regn' || weatherFilter === 'sne') {
      filtered = filtered.filter((a) => a.tags.includes('indendørs'))
    } else if (weatherFilter === 'sol' || weatherFilter === 'varmt') {
      // Both outdoor and indoor are fine, just return all
    }
  }

  return filtered
}

export function getDayOfYear(date: Date): number {
  return Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
}

export const dailyChallenges: { title: string; emoji: string; description: string }[] = [
  { title: 'Bag noget du aldrig har bagt', emoji: '🍞', description: 'Find en opskrift på noget du aldrig har lavet og bag det fra bunden i dag!' },
  { title: 'Find 5 ting i naturen du aldrig har set', emoji: '🌿', description: 'Gå udenfor og find 5 planter, insekter eller fænomener du aldrig har lagt mærke til.' },
  { title: 'Tegn et selvportræt uden at kigge', emoji: '✏️', description: 'Tag en pen og tegn dit ansigt uden at løfte pennen og uden at kigge på papiret!' },
  { title: 'Skriv et brev til dig selv om 1 år', emoji: '✉️', description: 'Skriv et brev til dig selv om hvad du håber og drømmer om. Gem det og åbn om et år.' },
  { title: 'Løb til et sted du aldrig har løbet til', emoji: '🏃', description: 'Find et sted i din nærhed du aldrig har løbet til og løb derhen i dag!' },
  { title: 'Lær en sang udenad på 30 minutter', emoji: '🎵', description: 'Vælg en sang du elsker og lær hele teksten udenad på 30 minutter. Syng den bagefter!' },
  { title: 'Sid helt stille i 10 minutter', emoji: '🧘', description: 'Find et roligt sted, sæt en timer på 10 minutter og sid stille. Ingen telefon. Bare vær til stede.' },
  { title: 'Lav en tegneserie med mindst 4 billeder', emoji: '🎭', description: 'Opfind dine egne tegneseriefigurer og lav en sjov history med mindst 4 ruder!' },
  { title: 'Byg det højeste tårn du kan med ting fra køkkenet', emoji: '🏗️', description: 'Brug kun ting fra dit køkken og byg det højeste tårn muligt. Mål det til sidst!' },
  { title: 'Lær 5 ord på et nyt sprog', emoji: '🌍', description: 'Vælg et sprog du aldrig har lært og lær 5 nyttige ord. Øv udtalen højt!' },
  { title: 'Skriv et digt der rimer', emoji: '📝', description: 'Vælg et emne du synes om og skriv et digt med mindst 4 linjer der rimer. Læs det højt!' },
  { title: 'Find 10 ting i dit hjem der starter med samme bogstav', emoji: '🔤', description: 'Vælg et bogstav og find 10 ting i dit hjem der starter med det. Begynd med B eller S!' },
  { title: 'Lav et fotoalbum af din dag på din telefon', emoji: '📸', description: 'Fotografér mindst 10 øjeblikke i løbet af dagen. Lav et lille album i slutningen!' },
  { title: 'Opfind dit eget boldspil med egne regler', emoji: '⚽', description: 'Tag en bold og opfind et helt nyt spil med dine egne regler. Afprøv det bagefter!' },
  { title: 'Lav en obstacle course i din stue', emoji: '🏃', description: 'Byg en forhindringsbane med puder, stole og tæpper. Mål din tid og prøv at slå den!' },
  { title: 'Tegn en opdigtet by med gader og bygninger', emoji: '🏙️', description: 'Brug et stort stykke papir og tegn din helt egen fantasiby med gader, parker og bygninger!' },
  { title: 'Lær at lave en ny frisure på dig selv', emoji: '💇', description: 'Find en tutorial og lær en ny frisure du aldrig har prøvet. Tag et billede bagefter!' },
  { title: 'Skriv en kort novelle på max 1 side', emoji: '📖', description: 'Opfind en spændende karakter og skriv en hel lille story på max én side. Begynd med konflikten!' },
  { title: 'Byg en fort med puder og tæpper', emoji: '🏰', description: 'Brug alt hvad du kan finde og byg en episk fort. Bliv inde i den i mindst 30 minutter!' },
  { title: 'Lær en jonglering med 2 bolde eller appelsiner', emoji: '🤹', description: 'Find 2 bolde eller appelsiner og lær at jonglere. Øv dig i 20 minutter — du kan godt!' },
  { title: 'Lav din egen quiz med 10 spørgsmål til familien', emoji: '🧠', description: 'Opfind 10 trivia-spørgsmål om emner du kender. Stil dem til familien til aftensmad!' },
  { title: 'Tag 10 kunstneriske billeder af hverdagsting', emoji: '🎨', description: 'Find 10 kedelige hverdagsting og fotografér dem på en kunstnerisk og spændende måde!' },
  { title: 'Skriv et brev til din yndlingsperson', emoji: '💌', description: 'Skriv et ægte håndskrevet brev til en person du holder af. Send det eller giv det personligt!' },
  { title: 'Lav et kageeksperiment — opfind en ny kage', emoji: '🎂', description: 'Opfind din helt egen kage ved at kombinere ingredienser på nye måder. Smag undervejs!' },
  { title: 'Byg en fuglekasse eller foderbræt af kartong', emoji: '🐦', description: 'Brug kartong og tape til at lave noget til fuglene i haven. Sæt det udenfor bagefter!' },
  { title: 'Lav en danserutine til din yndlingssang', emoji: '💃', description: 'Vælg din yndlingssang og koreografér en hel danserutine. Optag den og vis den til nogen!' },
  { title: 'Tegn din drømmebolig med alle rum', emoji: '🏠', description: 'Tegn planerne for din absolut drømmebolig — husk alle detaljer i hvert rum!' },
  { title: 'Opret en opskriftsbog med dine yndlingsretter', emoji: '📋', description: 'Skriv dine 5 yndlingsretter ned med ingredienser og fremgangsmåde. Pynt bogen med tegninger!' },
]
