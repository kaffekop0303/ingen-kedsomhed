import type { Activity, AgeGroup, GroupSize } from './types'

export const activities: Activity[] = [
  // Sport
  { icon: '🏃', title: 'Løbetur med en udfordring', description: 'Løb til et bestemt sted og mål din tid.', tags: ['aktiv', 'udendørs', 'solo'], hobby: 'sport' },
  { icon: '⚽', title: 'Øvetræning med bold', description: 'Sæt kegler op og øv dine færdigheder.', tags: ['aktiv', 'udendørs', 'solo'], hobby: 'sport' },
  { icon: '🏆', title: 'Mini-turnering', description: 'Opfind jeres eget spil med regler og point.', tags: ['aktiv', 'udendørs', 'gruppe'], hobby: 'sport' },
  { icon: '💦', title: 'Vandkrig', description: 'Tag vandpistoler og hold vandkrig udendørs!', tags: ['aktiv', 'udendørs', 'gruppe'], hobby: 'sport' },
  { icon: '🚴', title: 'Cykeltur på ny rute', description: 'Find en vej du aldrig har cyklet.', tags: ['aktiv', 'udendørs', 'solo'], hobby: 'sport' },
  // Kunst
  { icon: '🎨', title: 'Tegn hvad du ser', description: 'Kig ud og tegn det realistisk.', tags: ['kreativ', 'indendørs', 'solo'], hobby: 'kunst' },
  { icon: '✂️', title: 'Lav en collage', description: 'Klip billeder fra blade og lav et kunstværk.', tags: ['kreativ', 'indendørs', 'solo'], hobby: 'kunst' },
  { icon: '🎨', title: 'Tegnekonkurrence', description: 'Alle tegner det samme motiv — bedste vinder!', tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'kunst' },
  { icon: '🖌️', title: 'Mal med kaffe', description: 'Brug te eller kaffe som maling.', tags: ['kreativ', 'indendørs', 'solo'], hobby: 'kunst' },
  // Musik
  { icon: '🎵', title: 'Skriv en sang', description: 'Vælg et emne og skriv en tekst.', tags: ['kreativ', 'indendørs', 'solo'], hobby: 'musik' },
  { icon: '🥁', title: 'Lav din egen rytme', description: 'Brug kasser og kopper som trommer.', tags: ['kreativ', 'indendørs', 'solo'], hobby: 'musik' },
  { icon: '🎤', title: 'Karaoke-kamp', description: 'Syng mod hinanden!', tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'musik' },
  { icon: '🎵', title: 'Gæt melodien', description: 'En nynner, resten gætter.', tags: ['rolig', 'indendørs', 'gruppe'], hobby: 'musik' },
  // Dans
  { icon: '💃', title: 'Lær en ny koreografi', description: 'Find en dans og lær den trin for trin.', tags: ['aktiv', 'indendørs', 'solo'], hobby: 'dans' },
  { icon: '💃', title: 'Dansekonkurrence', description: 'Skiftes til at dømme og give point.', tags: ['aktiv', 'indendørs', 'gruppe'], hobby: 'dans' },
  // Natur
  { icon: '🌿', title: 'Naturtur og opdagelse', description: 'Find 10 planter, insekter eller fugle.', tags: ['aktiv', 'udendørs', 'solo'], hobby: 'natur' },
  { icon: '🌱', title: 'Plant noget', description: 'Find en potte og plant et frø.', tags: ['rolig', 'indendørs', 'solo'], hobby: 'natur' },
  { icon: '🌿', title: 'Naturjagt', description: 'Lav en liste — hvem finder alt først?', tags: ['aktiv', 'udendørs', 'gruppe'], hobby: 'natur' },
  { icon: '⭐', title: 'Kig på stjernerne', description: 'Find stjernebilleder med en gratis app.', tags: ['rolig', 'udendørs', 'solo'], hobby: 'natur' },
  // Læsning
  { icon: '📖', title: 'Læs en bog', description: 'Sæt dig komfortabelt og læs 30 sider.', tags: ['rolig', 'indendørs', 'solo'], hobby: 'læsning' },
  { icon: '✏️', title: 'Skriv din egen historie', description: 'Start på en kort historie.', tags: ['kreativ', 'indendørs', 'solo'], hobby: 'læsning' },
  { icon: '📖', title: 'Historiefortælling på skift', description: 'En starter, den næste fortsætter.', tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'læsning' },
  // Madlavning
  { icon: '🍪', title: 'Bag noget nyt', description: 'Find en opskrift og bag det fra bunden.', tags: ['kreativ', 'indendørs', 'solo'], hobby: 'madlavning' },
  { icon: '🍳', title: 'Opfind din egen ret', description: 'Brug hvad der er i køleskabet.', tags: ['kreativ', 'indendørs', 'solo'], hobby: 'madlavning' },
  { icon: '🍕', title: 'Lav pizza fra bunden', description: 'Lav jeres egne pizzaer.', tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'madlavning' },
  { icon: '🍪', title: 'Bagekonkurrence', description: 'Bag det samme og bed nogen om at vurdere.', tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'madlavning' },
  { icon: '🍦', title: 'Lav hjemmelavet is', description: 'Bland fløde, sukker og frugt!', tags: ['kreativ', 'indendørs', 'solo'], hobby: 'madlavning' },
  // Teater
  { icon: '🎭', title: 'Øv en monolog', description: 'Find tekst og øv foran spejlet.', tags: ['kreativ', 'indendørs', 'solo'], hobby: 'teater' },
  { icon: '🎭', title: 'Improvisationsteater', description: 'En siger en situation — resten improviserer.', tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'teater' },
  // Foto
  { icon: '📸', title: 'Gå på fototur', description: 'Find interessante motiver.', tags: ['kreativ', 'udendørs', 'solo'], hobby: 'foto' },
  { icon: '📸', title: 'Fotojagt', description: 'Giv hinanden 5 motiver.', tags: ['kreativ', 'udendørs', 'gruppe'], hobby: 'foto' },
  // Håndværk
  { icon: '🔨', title: 'Byg noget kreativt', description: 'Brug kartong og tape.', tags: ['kreativ', 'indendørs', 'solo'], hobby: 'håndværk' },
  { icon: '🏗️', title: 'Byggekonkurrence', description: 'Hvem kan bygge det højeste tårn?', tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'håndværk' },
  { icon: '🏰', title: 'Byg en fort', description: 'Brug puder og tæpper.', tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'håndværk' },
  // Rollespil
  { icon: '🧙', title: 'Skriv en fantasy-historie', description: 'Opfind en verden.', tags: ['kreativ', 'indendørs', 'solo'], hobby: 'rollespil' },
  { icon: '🗺️', title: 'Tegn et fantasykort', description: 'Tegn en opdigtet verden.', tags: ['kreativ', 'indendørs', 'solo'], hobby: 'rollespil' },
  { icon: '🧙', title: 'Spil et rollespil', description: 'En er fortæller, resten er helte.', tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'rollespil' },
  // LEGO
  { icon: '🧩', title: 'Byg frit med LEGO', description: 'Byg noget uden vejledning.', tags: ['kreativ', 'indendørs', 'solo'], hobby: 'lego' },
  { icon: '🧩', title: 'LEGO-konkurrence', description: 'Hvem bygger det sejeste?', tags: ['kreativ', 'indendørs', 'gruppe'], hobby: 'lego' },
  // Brætspil
  { icon: '🎲', title: 'Lær et nyt kortspil', description: 'Find reglerne til et kortspil.', tags: ['rolig', 'indendørs', 'solo'], hobby: 'brætspil' },
  { icon: '🎲', title: 'Brætspilsmaraton', description: 'Spil 3 spil — hvem vinder flest?', tags: ['rolig', 'indendørs', 'gruppe'], hobby: 'brætspil' },
  // Yoga
  { icon: '🧘', title: 'Prøv en yoga-rutine', description: 'Find en begynder-video og følg med.', tags: ['rolig', 'indendørs', 'solo'], hobby: 'yoga' },
  { icon: '📓', title: 'Taknemmelighedsdagbog', description: 'Skriv 5 ting du er taknemmelig for.', tags: ['rolig', 'indendørs', 'solo'], hobby: 'yoga' },
  // Skateboard
  { icon: '🛹', title: 'Øv nye tricks', description: 'Gå udenfor og øv et trick.', tags: ['aktiv', 'udendørs', 'solo'], hobby: 'skateboard' },
  { icon: '🛹', title: 'Tricks-konkurrence', description: 'Vis jeres bedste tricks.', tags: ['aktiv', 'udendørs', 'gruppe'], hobby: 'skateboard' },
  // Ridning
  { icon: '🐴', title: 'Øv dine rideskills', description: 'Lav øvelser til næste gang.', tags: ['aktiv', 'udendørs', 'solo'], hobby: 'ridning' },
  // Svømning
  { icon: '🏊', title: 'Svøm en tur', description: 'Se hvor mange baner du kan svømme.', tags: ['aktiv', 'udendørs', 'solo'], hobby: 'svømning' },
  // Venner
  { icon: '✉️', title: 'Skriv et brev til en ven', description: 'Et håndskrevet brev.', tags: ['rolig', 'indendørs', 'solo'], hobby: 'venner' },
  { icon: '🗣️', title: 'To sande og en løgn', description: 'Hvem lyver? Resten gætter!', tags: ['rolig', 'indendørs', 'gruppe'], hobby: 'venner' },
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

export const dailyChallenges: { day: number; title: string; emoji: string; description: string }[] = [
  { day: 1, title: 'Bag noget du aldrig har bagt', emoji: '🍞', description: 'Find en opskrift på noget du aldrig har lavet og bag det fra bunden i dag!' },
  { day: 2, title: 'Find 5 ting i naturen du aldrig har set', emoji: '🌿', description: 'Gå udenfor og find 5 planter, insekter eller fænomener du aldrig har lagt mærke til.' },
  { day: 3, title: 'Tegn et selvportræt uden at kigge', emoji: '✏️', description: 'Tag en pen og tegn dit ansigt uden at løfte pennen og uden at kigge på papiret!' },
  { day: 4, title: 'Skriv et brev til dig selv om 1 år', emoji: '✉️', description: 'Skriv et brev til dig selv om hvad du håber og drømmer om. Gem det og åbn om et år.' },
  { day: 5, title: 'Løb til et sted du aldrig har løbet til', emoji: '🏃', description: 'Find et sted i din nærhed du aldrig har løbet til og løb derhen i dag!' },
  { day: 6, title: 'Lær en sang udenad på 30 minutter', emoji: '🎵', description: 'Vælg en sang du elsker og lær hele teksten udenad på 30 minutter. Syng den bagefter!' },
  { day: 0, title: 'Sid helt stille i 10 minutter', emoji: '🧘', description: 'Find et roligt sted, sæt en timer på 10 minutter og sid stille. Ingen telefon. Bare vær til stede.' },
]
