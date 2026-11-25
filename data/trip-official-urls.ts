/**
 * Verified official pages per trip slug (managing body or the place itself).
 * Only add a link after checking it opens the place's own page.
 * Last checked: 2026-11-24.
 */
export const tripOfficialUrlsBySlug: Record<string, string> = {
  // רשות הטבע והגנים
  "nchl-dn": "https://www.parks.org.il/reserve-park/שמורת-טבע-תל-דן/",
  "shmvrt-tb-bnys": "https://www.parks.org.il/reserve-park/שמורת-טבע-נחל-חרמון-בניאס/",
  "mpl-tnvr-gbvl-lbnvn": "https://www.parks.org.il/reserve-park/שמורת-טבע-נחל-עיון-התנור/",
  "shmvrt-tb-gml": "https://www.parks.org.il/reserve-park/שמורת-טבע-גמלא/",
  "myyn-chrvd": "https://www.parks.org.il/reserve-park/גן-לאומי-מעיין-חרוד/",
  "nchl-lksndr": "https://www.parks.org.il/reserve-park/גן-לאומי-נחל-אלכסנדר-חוף-בית-ינאי/",
  "nchl-tnynym": "https://www.parks.org.il/reserve-park/שמורת-טבע-נחל-תנינים/",
  "shmvrt-plmchym": "https://www.parks.org.il/reserve-park/גן-לאומי-חוף-פלמחים/",
  "nahal-sorek-estuary": "https://www.parks.org.il/trip/sorek/",
  "tl-pk": "https://www.parks.org.il/reserve-park/yarkon-2/",
  "myynvt-gybtvn": "https://www.parks.org.il/reserve-park/m-gibton/",
  "tl-gzr": "https://www.parks.org.il/reserve-park/tel-gezer/",
  "yn-pshchh-yynvt-tzvkym": "https://www.parks.org.il/reserve-park/שמורת-טבע-עיינות-צוקים-עין-פשחה/",
  "kvmrn": "https://www.parks.org.il/reserve-park/פארק-גן-לאומי-קומראן/",
  "gn-lvmy-mgdl-tzdk": "https://www.parks.org.il/reserve-park/migdal-tzedek/",
  "byt-gvbryn": "https://www.parks.org.il/reserve-park/גן-לאומי-בית-גוברין/",
  "nchl-dvd": "https://www.parks.org.il/reserve-park/david/",
  "yn-chmd": "https://www.parks.org.il/reserve-park/גן-לאומי-עין-חמד/",
  "ein-bokek": "https://www.parks.org.il/reserve-park/en-bokek/",
  "yn-lbn": "https://www.parks.org.il/reserve-park/גן-לאומי-נחל-רפאים/",
  "btrvnvt-rvchmh": "https://www.parks.org.il/trip/סובב-רוחמה-המלצה-למסלול-טיול-משולב-ב/",

  // קק"ל
  "nahal-hashofet": "https://www.kkl.org.il/travel/trips/2790/",
  "sataf": "https://www.kkl.org.il/travel/trips/sataf/",
  "ben-shemen-forest": "https://www.kkl.org.il/travel/ben_shemen_forest/",
  "prk-kndh": "https://www.kkl.org.il/travel/kkl_p_ayacan/",
  "yr-tzrh": "https://www.kkl.org.il/travel/trips/hanasi_forest/",
  "prk-brytnyh": "https://www.kkl.org.il/travel/kkl_p_brit/",
  "yr-hmlkym": "https://www.kkl.org.il/travel/kkl_shahariya_forest/",
  "gmvn-hchvlh": "https://www.kkl.org.il/travel/hula_lake/",
  "yr-hmgynym": "https://www.kkl.org.il/travel/trips/231/",
  "tl-chdyd": "https://www.kkl.org.il/travel/trips/181/",
  "mshmr-dvd": "https://www.kkl.org.il/travel/kkl_hulda_forest/",

  // רשויות מקומיות
  "prk-rnnh": "https://www.raanana.muni.il/park-raanana/",
  "prk-kvlvgy-hvd-hshrvn": "https://www.hod-hasharon.muni.il/375/",
  "prk-lkysh": "https://visit.ashdod.muni.il/en/sites-and-beaches/lachish-park/",
  "hmpl-hnstr": "https://www.petah-tikva.muni.il/events/tourism/yarkon-river",
  "tchnt-bv-rbch": "https://www.petah-tikva.muni.il/events/tourism/yarkon-river",

  // אתרי המקומות עצמם
  "chrmvn": "https://skihermon.co.il/",
  "rsh-hnkrh": "https://www.rosh-hanikra.com/",
  "rvb-rvy": "https://www.robroy.co.il/",
  "prk-ryl-shrvn": "https://www.parksharon.co.il/",
  "gn-hchyvt-htnky": "https://www.jerusalemzoo.org.il/",
  "kvvryvm-yshrl": "https://www.israel-aquarium.org.il/",
  "ym-hmlch-chvf-bynykny": "https://www.biankini.co.il/",
  "yzh-pzyzh": "https://www.izapzizadairy.com/",
  "mvzyvn-hyldym-chvlvn": "https://www.childrensmuseum.org.il/",
  "mdbryvm": "https://midbarium.co.il/",
  "mshk-bgbh-gdrh": "https://meshekbagiva.co.il/",
  "prk-vtvpyh": "https://www.utopiapark.co.il/",
  "gny-chvgh": "https://www.huga.co.il/",
  "hchvf-shl-mvsh-kzyb": "https://moshachziv.com/",
  "lgt-bchyvt": "https://www.lagaat-bahayot.com/",
  "nitzanim-lake": "https://agam-nitzanim.co.il/",
  "klchym-vmbvkym": "https://cornmaze.co.il/",
  "tel-lachish": "https://www.parks.org.il/reserve-park/lachish/",
  "bishvil-hanefesh": "https://www.ramat-hanadiv.org.il/routs/bishvilhanefesh/",
};

/**
 * Slugs whose link is a broader official guide that covers the place or route
 * (not the place's own page). These show "מידע רשמי על המסלול".
 */
export const tripOfficialGuideSlugs = new Set<string>([
  "hmpl-hnstr", // Petah Tikva municipality page for the whole Yarkon route
  "tchnt-bv-rbch", // same Yarkon route page
  "yn-lbn", // Nahal Refaim national park page, covers Ein Lavan
  "mshmr-dvd", // KKL Hulda forest page, covers the Mishmar David loop
  "btrvnvt-rvchmh", // Nature and Parks Authority "Sovev Ruhama" route guide
]);
