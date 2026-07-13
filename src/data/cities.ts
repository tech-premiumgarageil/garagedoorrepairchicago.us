export type County = "Cook" | "DuPage" | "Will" | "Kane" | "Lake";

export interface City {
  slug: string;
  name: string;
  county: County;
  lat: number;
  lng: number;
  population: number;
  /** Real neighborhoods/landmarks — injected into Gemini prompts and rendered on pages */
  neighborhoods: string[];
  /** What the garages/housing actually look like there — keeps generated copy locally true */
  housingNotes: string;
  /** A city-specific hook (weather, commuting, geography) for unique copy */
  localAngle: string;
  /** 3–4 nearby city slugs for cross-linking */
  nearby: string[];
}

export const cities: City[] = [
  {
    slug: "chicago",
    name: "Chicago",
    county: "Cook",
    lat: 41.8781,
    lng: -87.6298,
    population: 2746388,
    neighborhoods: [
      "Lincoln Park",
      "Portage Park",
      "Beverly",
      "Jefferson Park",
      "Bridgeport",
      "Norwood Park",
      "Mount Greenwood",
      "Albany Park",
    ],
    housingNotes:
      "Classic Chicago bungalows and two-flats with detached alley-access garages; many original wood-frame garages from the 1920s–1950s with older hardware, plus new-construction attached garages in infill developments.",
    localAngle:
      "Alley-facing garage doors take the brunt of lake-effect snow, road salt spray, and freeze-thaw cycles; a stuck door in a Chicago alley often means a blocked car and an unsecured garage facing public alley traffic.",
    nearby: ["cicero", "oak-park", "berwyn", "evanston"],
  },
  {
    slug: "naperville",
    name: "Naperville",
    county: "DuPage",
    lat: 41.7508,
    lng: -88.1535,
    population: 149540,
    neighborhoods: [
      "Downtown Naperville",
      "White Eagle",
      "Cress Creek",
      "Knoch Knolls",
      "Ashbury",
      "Tall Grass",
    ],
    housingNotes:
      "Large 1980s–2000s subdivision homes with attached two- and three-car garages; heavy insulated steel doors and builder-grade openers now reaching end of life across entire subdivisions at once.",
    localAngle:
      "Metra BNSF commuters depend on the garage every morning — a spring that snaps at 6am in Cress Creek means a missed train; oversized doors here need properly matched high-cycle springs.",
    nearby: ["bolingbrook", "wheaton", "aurora", "downers-grove"],
  },
  {
    slug: "schaumburg",
    name: "Schaumburg",
    county: "Cook",
    lat: 42.0334,
    lng: -88.0834,
    population: 78723,
    neighborhoods: [
      "Weathersfield",
      "Hoffman Hills",
      "Lexington Fields",
      "Town Square",
      "Olde Schaumburg Centre",
    ],
    housingNotes:
      "1960s–1980s split-levels and ranches in Weathersfield with original hardware, alongside newer townhome communities with shared-wall attached garages and HOA appearance standards.",
    localAngle:
      "One of the Northwest suburbs' commercial hubs — we service both Weathersfield-era residential doors and commercial dock doors in the Woodfield business corridor.",
    nearby: ["hoffman-estates", "palatine", "arlington-heights", "elgin"],
  },
  {
    slug: "joliet",
    name: "Joliet",
    county: "Will",
    lat: 41.525,
    lng: -88.0817,
    population: 150362,
    neighborhoods: [
      "Cathedral Area",
      "West Park",
      "Ridgewood",
      "Ingalls Park",
      "Cunningham",
    ],
    housingNotes:
      "Historic limestone-era homes near the Cathedral Area with detached garages, post-war ranches on the west side, and new subdivisions toward Plainfield with builder-grade attached garages.",
    localAngle:
      "Will County's logistics belt — warehouse and distribution dock doors around the CenterPoint intermodal run high daily cycles and wear springs far faster than residential doors.",
    nearby: ["bolingbrook", "tinley-park", "orland-park", "naperville"],
  },
  {
    slug: "orland-park",
    name: "Orland Park",
    county: "Cook",
    lat: 41.6303,
    lng: -87.8539,
    population: 58703,
    neighborhoods: [
      "Old Orland",
      "Crystal Tree",
      "Eagle Ridge",
      "Fernway",
      "Silver Lake",
    ],
    housingNotes:
      "Southwest-suburban brick ranches and 1990s two-stories with attached two- and three-car garages; Crystal Tree and other golf communities favor carriage-style insulated doors.",
    localAngle:
      "Wide-open southwest-suburban lots take unbroken winter wind off the prairie — cold-stiffened springs and contracting steel tracks make January the busiest repair month here.",
    nearby: ["tinley-park", "oak-lawn", "joliet", "chicago"],
  },
  {
    slug: "evanston",
    name: "Evanston",
    county: "Cook",
    lat: 42.0451,
    lng: -87.6877,
    population: 78110,
    neighborhoods: [
      "Central Street",
      "South Evanston",
      "Ridge Historic District",
      "Northwestern campus area",
      "West Village",
    ],
    housingNotes:
      "Century-old Victorians and brick homes with original detached garages on rear alleys; historic-district appearance rules often steer owners toward carriage-house replacement doors.",
    localAngle:
      "First ring off Lake Michigan — lake-effect snow, wind-driven moisture, and salt air corrode hinges, cables, and bottom seals faster than anywhere inland.",
    nearby: ["skokie", "glenview", "chicago", "des-plaines"],
  },
  {
    slug: "aurora",
    name: "Aurora",
    county: "Kane",
    lat: 41.7606,
    lng: -88.3201,
    population: 180542,
    neighborhoods: [
      "Stonebridge",
      "West Side Historic District",
      "Fox Valley",
      "Eola",
      "Pigeon Hill",
    ],
    housingNotes:
      "Illinois' second-largest city: Victorian-era homes with detached garages near the Fox River, plus sprawling 1990s–2000s subdivisions on the far east side with attached three-car garages.",
    localAngle:
      "Fox River valley humidity swings warp older wood doors and rust bare track; east-side subdivisions built in the same five-year window are now hitting spring end-of-life together.",
    nearby: ["naperville", "bolingbrook", "wheaton", "elgin"],
  },
  {
    slug: "cicero",
    name: "Cicero",
    county: "Cook",
    lat: 41.8456,
    lng: -87.7539,
    population: 85268,
    neighborhoods: ["Boulevard Manor", "Grant Works", "Warren Park", "Clyde"],
    housingNotes:
      "Dense blocks of brick bungalows and two-flats, nearly all with detached single-car garages on shared alleys; many doors are decades-old hardware overdue for spring and roller work.",
    localAngle:
      "Tight alley clearances mean a door that jumps its track can pin a car inside a single-car garage — and an alley-facing garage left stuck open overnight is a real security concern.",
    nearby: ["berwyn", "chicago", "oak-park", "oak-lawn"],
  },
  {
    slug: "berwyn",
    name: "Berwyn",
    county: "Cook",
    lat: 41.8506,
    lng: -87.7937,
    population: 57250,
    neighborhoods: [
      "Depot District",
      "South Berwyn",
      "Proksa Park area",
      "Cermak Road corridor",
    ],
    housingNotes:
      "The world's largest concentration of Chicago-style brick bungalows — 1920s homes with original detached alley garages, many still running first- or second-generation hardware.",
    localAngle:
      "Bungalow garages here were built for Model T-width cars; modern SUVs demand smooth, full-width travel, which worn rollers and bent track in a 100-year-old garage can't deliver.",
    nearby: ["cicero", "oak-park", "chicago", "oak-lawn"],
  },
  {
    slug: "oak-lawn",
    name: "Oak Lawn",
    county: "Cook",
    lat: 41.7139,
    lng: -87.7528,
    population: 56690,
    neighborhoods: [
      "Columbus Manor",
      "Stony Creek",
      "95th Street corridor",
      "Oak Meadows",
    ],
    housingNotes:
      "Post-war brick ranches and Georgians from the 1950s–60s, split between original detached garages and later attached additions; plenty of first-generation openers still in service.",
    localAngle:
      "A hub of the southwest side's trades community — homeowners here use the garage as a workshop, so doors cycle several times a day and wear parts accordingly.",
    nearby: ["orland-park", "chicago", "cicero", "tinley-park"],
  },
  {
    slug: "oak-park",
    name: "Oak Park",
    county: "Cook",
    lat: 41.885,
    lng: -87.7845,
    population: 54583,
    neighborhoods: [
      "Frank Lloyd Wright Historic District",
      "Hemingway District",
      "Harrison Arts District",
      "Gunderson Historic District",
    ],
    housingNotes:
      "Architecturally protected Victorians, Prairie-style homes, and vintage brick with detached alley garages; historic-district review favors carriage-house doors and period-appropriate replacements.",
    localAngle:
      "In a village known for Frank Lloyd Wright architecture, a dented builder-grade door stands out — owners here want repairs and replacements that respect the streetscape.",
    nearby: ["berwyn", "cicero", "chicago", "elmhurst"],
  },
  {
    slug: "skokie",
    name: "Skokie",
    county: "Cook",
    lat: 42.0324,
    lng: -87.7416,
    population: 67824,
    neighborhoods: [
      "Downtown Skokie",
      "Devonshire",
      "Timber Ridge",
      "Old Orchard area",
    ],
    housingNotes:
      "1950s–60s brick ranches and split-levels, most with attached single- or double-car garages added during the village's post-war boom; original hardware is common.",
    localAngle:
      "Many Skokie garages share a wall with the house — a failing opener gear or unbalanced door rattling the kitchen wall is usually the first symptom owners notice.",
    nearby: ["evanston", "glenview", "des-plaines", "chicago"],
  },
  {
    slug: "des-plaines",
    name: "Des Plaines",
    county: "Cook",
    lat: 42.0334,
    lng: -87.8834,
    population: 60675,
    neighborhoods: [
      "Downtown Des Plaines",
      "Cumberland",
      "Orchard Place",
      "River Road corridor",
    ],
    housingNotes:
      "Post-war Cape Cods and ranches with a mix of attached and detached garages; homes near the Des Plaines River deal with damp garage slabs that rust bottom brackets and track.",
    localAngle:
      "O'Hare-corridor living: early-morning flights and shift work mean garage doors here run at 4am — and a door that fails then needs genuinely 24-hour dispatch.",
    nearby: ["mount-prospect", "arlington-heights", "skokie", "glenview"],
  },
  {
    slug: "arlington-heights",
    name: "Arlington Heights",
    county: "Cook",
    lat: 42.0884,
    lng: -87.9806,
    population: 77676,
    neighborhoods: [
      "Downtown Arlington",
      "Scarsdale",
      "Pioneer Park",
      "Berkley Square",
      "Lake Arlington",
    ],
    housingNotes:
      "Established northwest-suburban stock from 1950s ranches near downtown to 1990s two-stories around Lake Arlington, nearly all with attached garages and mid-life openers.",
    localAngle:
      "Metra UP-NW commuters and downtown-Arlington professionals — morning failures get our first dispatch slots, and quiet belt-drive openers are the most-requested upgrade under bedrooms.",
    nearby: ["mount-prospect", "palatine", "des-plaines", "schaumburg"],
  },
  {
    slug: "palatine",
    name: "Palatine",
    county: "Cook",
    lat: 42.1103,
    lng: -88.0342,
    population: 67908,
    neighborhoods: [
      "Downtown Palatine",
      "Deer Grove",
      "Winston Park",
      "Pepper Tree",
    ],
    housingNotes:
      "Rolling-terrain subdivisions from the 1970s–90s with attached two-car garages; driveway slopes toward Deer Grove mean water and ice collect at the door's bottom seal.",
    localAngle:
      "Ice damming at the threshold is Palatine's signature winter call — doors freeze to the slab, and forcing the opener strips gears or snaps the trolley.",
    nearby: ["arlington-heights", "schaumburg", "hoffman-estates", "mount-prospect"],
  },
  {
    slug: "elgin",
    name: "Elgin",
    county: "Kane",
    lat: 42.0354,
    lng: -88.2826,
    population: 114797,
    neighborhoods: [
      "Elgin Historic District",
      "Gifford Park",
      "South West Area",
      "Highlands",
    ],
    housingNotes:
      "Victorian-era historic districts with detached carriage garages near the Fox River, plus far-west new construction with modern insulated doors and smart openers.",
    localAngle:
      "The Fox River bluffs put many Elgin garages downhill from the house — runoff, damp slabs, and rusted bottom sections are the recurring local pattern.",
    nearby: ["schaumburg", "hoffman-estates", "aurora", "palatine"],
  },
  {
    slug: "bolingbrook",
    name: "Bolingbrook",
    county: "Will",
    lat: 41.6986,
    lng: -88.0684,
    population: 73922,
    neighborhoods: [
      "Indian Chase Meadows",
      "Winston Village",
      "Bloomfield",
      "Americana Estates",
    ],
    housingNotes:
      "1970s–2000s subdivision waves, each now aging in sync — entire blocks of original builder-grade doors and openers reaching replacement age within a few years of each other.",
    localAngle:
      "Bolingbrook's I-55 logistics corridor keeps our commercial crews busy with dock doors, while residential calls cluster in the older Winston Village sections.",
    nearby: ["naperville", "joliet", "downers-grove", "orland-park"],
  },
  {
    slug: "tinley-park",
    name: "Tinley Park",
    county: "Cook",
    lat: 41.5731,
    lng: -87.7932,
    population: 55971,
    neighborhoods: [
      "Downtown Tinley",
      "Brementowne",
      "Radcliffe Place",
      "Brookside Glen",
    ],
    housingNotes:
      "1970s–90s southwest-suburban two-stories and townhomes with attached garages; Brookside Glen's larger homes run oversized 16-foot doors that need correctly paired springs.",
    localAngle:
      "Convention-center and Metra Rock Island commuter town — weekend event traffic and weekday 5am commutes both end at a garage door that has to work the first time.",
    nearby: ["orland-park", "oak-lawn", "joliet", "chicago"],
  },
  {
    slug: "wheaton",
    name: "Wheaton",
    county: "DuPage",
    lat: 41.8661,
    lng: -88.107,
    population: 52745,
    neighborhoods: [
      "Downtown Wheaton",
      "Danada",
      "Arrowhead",
      "College Avenue area",
    ],
    housingNotes:
      "Mature tree-lined blocks with 1950s–70s homes near Wheaton College and newer Danada-area two-stories; falling limbs and seed debris routinely foul tracks and photo eyes.",
    localAngle:
      "Wheaton's canopy of mature oaks is beautiful and brutal on garage doors — every storm season brings track-obstruction and panel-dent calls.",
    nearby: ["lombard", "naperville", "downers-grove", "elmhurst"],
  },
  {
    slug: "downers-grove",
    name: "Downers Grove",
    county: "DuPage",
    lat: 41.8089,
    lng: -88.0112,
    population: 50247,
    neighborhoods: [
      "Downtown Downers",
      "Pierce Downer",
      "Denburn Woods",
      "Orchard Brook",
    ],
    housingNotes:
      "A teardown-and-rebuild town: original 1920s Sears-kit homes with detached garages sit next to new-construction homes with wide insulated doors and smart openers.",
    localAngle:
      "Half our Downers Grove calls are century-old detached garages, half are five-year-old smart openers — technicians here carry parts for both eras on the same truck.",
    nearby: ["lombard", "elmhurst", "naperville", "wheaton"],
  },
  {
    slug: "elmhurst",
    name: "Elmhurst",
    county: "DuPage",
    lat: 41.8995,
    lng: -87.9403,
    population: 45786,
    neighborhoods: [
      "Elmhurst City Centre",
      "College View",
      "Crescent Park",
      "Yorkfield",
    ],
    housingNotes:
      "Brick Georgians and Tudors from the 1930s–50s, many rebuilt or expanded; a mix of original detached garages and new oversized attached garages on rebuilt lots.",
    localAngle:
      "Salt Creek flooding history makes Elmhurst owners quick to fix doors that won't seal at the slab — a working, weather-tight door is part of the flood defense.",
    nearby: ["lombard", "oak-park", "downers-grove", "wheaton"],
  },
  {
    slug: "mount-prospect",
    name: "Mount Prospect",
    county: "Cook",
    lat: 42.0664,
    lng: -87.9373,
    population: 56852,
    neighborhoods: [
      "Downtown Mount Prospect",
      "Prospect Manor",
      "We-Go Park",
      "Countryside",
    ],
    housingNotes:
      "1950s–60s brick ranches and split-levels with attached garages; many original steel doors are un-insulated single-skin panels that flex and bind in deep cold.",
    localAngle:
      "Un-insulated post-war doors here visibly bow inward on subzero January days — binding tracks and overworked openers follow within weeks.",
    nearby: ["arlington-heights", "des-plaines", "palatine", "glenview"],
  },
  {
    slug: "hoffman-estates",
    name: "Hoffman Estates",
    county: "Cook",
    lat: 42.0629,
    lng: -88.1227,
    population: 52530,
    neighborhoods: [
      "Highlands",
      "Winston Knolls",
      "Barrington Square",
      "South Ridge",
    ],
    housingNotes:
      "1960s–80s Parcel-lettered subdivisions of raised ranches and split-levels with attached two-car garages; original wood-composite doors are delaminating across whole blocks.",
    localAngle:
      "Exposed northwest-corridor terrain drives horizontal rain and snow straight at west-facing doors — swollen, delaminating panels are the local tell.",
    nearby: ["schaumburg", "palatine", "elgin", "arlington-heights"],
  },
  {
    slug: "lombard",
    name: "Lombard",
    county: "DuPage",
    lat: 41.88,
    lng: -88.0078,
    population: 44476,
    neighborhoods: [
      "Downtown Lombard",
      "Lilacia Park area",
      "Yorktown",
      "Westmore",
    ],
    housingNotes:
      "The Lilac Village: 1920s bungalows near Lilacia Park with detached garages, and 1960s–70s ranches toward Yorktown with attached garages on their second or third opener.",
    localAngle:
      "Older Lombard garages settle on clay soil — out-of-square openings pinch tracks seasonally, and spring balance drifts with the frame.",
    nearby: ["elmhurst", "wheaton", "downers-grove", "oak-park"],
  },
  {
    slug: "glenview",
    name: "Glenview",
    county: "Cook",
    lat: 42.0698,
    lng: -87.7878,
    population: 48705,
    neighborhoods: [
      "The Glen",
      "Downtown Glenview",
      "Swainwood",
      "Countryside area",
    ],
    housingNotes:
      "From 1940s Swainwood colonials to The Glen's newer luxury homes on the former naval air station — high-end insulated doors, full-view glass, and smart openers are the norm.",
    localAngle:
      "In The Glen, the garage door is a design feature — owners expect flush-panel and full-view glass options, installed with the same polish as the rest of the home.",
    nearby: ["skokie", "evanston", "des-plaines", "mount-prospect"],
  },
];

export const getCity = (slug: string): City | undefined =>
  cities.find((c) => c.slug === slug);

export const countyOrder: County[] = ["Cook", "DuPage", "Will", "Kane", "Lake"];

export const citiesByCounty = (): Record<string, City[]> => {
  const grouped: Record<string, City[]> = {};
  for (const county of countyOrder) {
    const members = cities.filter((c) => c.county === county);
    if (members.length) grouped[county] = members;
  }
  return grouped;
};
