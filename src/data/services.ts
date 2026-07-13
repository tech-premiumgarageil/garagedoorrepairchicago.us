export interface Service {
  slug: string;
  name: string;
  shortName: string;
  /** H1 for service×city spokes; {city} is replaced at render time */
  h1Pattern: string;
  blurb: string;
  /** Fed into the Gemini prompt — keep factual and specific */
  symptoms: string[];
  parts: string[];
  priceRange: string;
  isEmergency: boolean;
  isCommercial: boolean;
}

export const services: Service[] = [
  {
    slug: "garage-door-spring-repair",
    name: "Garage Door Spring Repair",
    shortName: "Spring Repair",
    h1Pattern: "Garage Door Spring Repair in {city}, IL",
    blurb:
      "Broken torsion or extension spring? We replace both springs with high-cycle steel, balance the door, and test safety reverse — same day.",
    symptoms: [
      "loud bang from the garage",
      "door won't lift or feels extremely heavy",
      "visible gap in the torsion spring above the door",
      "door lifts a few inches then stops",
      "cables look loose or slack",
    ],
    parts: [
      "torsion springs (high-cycle, oil-tempered)",
      "extension springs with safety cables",
      "center and end bearing plates",
      "winding cones",
    ],
    priceRange: "$180–$450 including parts",
    isEmergency: true,
    isCommercial: false,
  },
  {
    slug: "garage-door-cable-repair",
    name: "Garage Door Cable Repair",
    shortName: "Cable Repair",
    h1Pattern: "Garage Door Cable Repair in {city}, IL",
    blurb:
      "Frayed, snapped, or off-drum cables make a door dangerous to operate. We replace cables in pairs and re-tension the system correctly.",
    symptoms: [
      "door hangs crooked in the opening",
      "cable hanging loose or wrapped off the drum",
      "grinding noise as the door moves",
      "door slams down faster than normal",
    ],
    parts: [
      "galvanized aircraft-grade lift cables",
      "cable drums",
      "bottom brackets",
    ],
    priceRange: "$150–$350 including parts",
    isEmergency: true,
    isCommercial: false,
  },
  {
    slug: "garage-door-opener-repair",
    name: "Garage Door Opener Repair",
    shortName: "Opener Repair",
    h1Pattern: "Garage Door Opener Repair in {city}, IL",
    blurb:
      "From stripped gears to misaligned safety sensors, we diagnose and fix openers from every major brand — LiftMaster, Chamberlain, Genie, Craftsman.",
    symptoms: [
      "opener hums but the door doesn't move",
      "door reverses before touching the floor",
      "remote or keypad stopped responding",
      "safety sensor lights blinking",
      "trolley moves but door stays down",
    ],
    parts: [
      "drive gears and sprockets",
      "safety sensor pairs",
      "logic boards",
      "belts and chains",
      "trolley carriages",
    ],
    priceRange: "$120–$320 including parts",
    isEmergency: false,
    isCommercial: false,
  },
  {
    slug: "garage-door-opener-installation",
    name: "Garage Door Opener Installation",
    shortName: "Opener Installation",
    h1Pattern: "Garage Door Opener Installation in {city}, IL",
    blurb:
      "We install belt-drive, chain-drive, and wall-mount jackshaft openers with battery backup and smartphone control from LiftMaster, Chamberlain, and Genie.",
    symptoms: [
      "opener is 15+ years old with no safety sensors",
      "want smartphone / MyQ control",
      "need battery backup for power outages",
      "current opener too loud under a bedroom",
    ],
    parts: [
      "belt-drive openers (quietest)",
      "chain-drive openers (value)",
      "wall-mount jackshaft openers",
      "smart keypads and remotes",
    ],
    priceRange: "$450–$900 installed",
    isEmergency: false,
    isCommercial: false,
  },
  {
    slug: "new-garage-door-installation",
    name: "New Garage Door Installation",
    shortName: "Door Installation",
    h1Pattern: "New Garage Door Installation in {city}, IL",
    blurb:
      "Steel, insulated, carriage-house, and full-view glass doors, measured and installed by our own technicians — with old-door haul-away included.",
    symptoms: [
      "door panels rusted, cracked, or delaminating",
      "single-layer door leaking heat all winter",
      "upgrading curb appeal before selling",
      "converting to an insulated door for a heated garage",
    ],
    parts: [
      "insulated steel doors (R-9 to R-18)",
      "carriage-house style doors",
      "full-view aluminum and glass doors",
      "complete track and spring hardware",
    ],
    priceRange: "$1,100–$4,500 installed",
    isEmergency: false,
    isCommercial: false,
  },
  {
    slug: "garage-door-roller-replacement",
    name: "Garage Door Roller Replacement",
    shortName: "Roller Replacement",
    h1Pattern: "Garage Door Roller Replacement in {city}, IL",
    blurb:
      "Worn steel rollers grind, squeal, and can jump the track. We swap all ten rollers for sealed-bearing nylon rollers in under an hour.",
    symptoms: [
      "loud grinding or squealing as the door moves",
      "door shudders or vibrates in the track",
      "visible flat spots or wobble on rollers",
      "roller stem rusted or bent",
    ],
    parts: [
      "sealed-bearing nylon rollers (quiet, no lube needed)",
      "13-ball steel rollers",
      "roller hinges",
    ],
    priceRange: "$120–$220 for a full set",
    isEmergency: false,
    isCommercial: false,
  },
  {
    slug: "garage-door-track-repair",
    name: "Garage Door Track Repair",
    shortName: "Track Repair",
    h1Pattern: "Garage Door Track Repair & Alignment in {city}, IL",
    blurb:
      "Bent, rusted, or out-of-plumb tracks bind the door and strain the opener. We straighten, realign, or replace vertical and horizontal track.",
    symptoms: [
      "door sticks or binds at the same spot every time",
      "visible bend or dent in the track",
      "rollers popping out of the track",
      "gap between track and door frame",
    ],
    parts: [
      "vertical and horizontal track sections",
      "track brackets and jamb fasteners",
      "flag brackets",
    ],
    priceRange: "$130–$400 depending on sections",
    isEmergency: true,
    isCommercial: false,
  },
  {
    slug: "garage-door-panel-replacement",
    name: "Garage Door Panel Replacement",
    shortName: "Panel Replacement",
    h1Pattern: "Garage Door Panel Replacement in {city}, IL",
    blurb:
      "One dented or cracked panel doesn't mean a whole new door. When the model is still made, we source and swap individual sections.",
    symptoms: [
      "car bumped the bottom panel",
      "cracked or rotted section on an older door",
      "hail or windstorm damage",
      "top panel bowed from opener strain",
    ],
    parts: [
      "matched replacement sections",
      "struts and reinforcement bars",
      "hinges and fasteners",
    ],
    priceRange: "$250–$800 per panel installed",
    isEmergency: false,
    isCommercial: false,
  },
  {
    slug: "garage-door-tune-up",
    name: "Garage Door Tune-Up & Maintenance",
    shortName: "Tune-Up",
    h1Pattern: "Garage Door Tune-Up & Maintenance in {city}, IL",
    blurb:
      "A 25-point inspection: balance test, spring tension, hinge and roller check, track alignment, opener force settings, and full lubrication.",
    symptoms: [
      "door louder than it used to be",
      "haven't serviced the door since moving in",
      "preparing the door for winter",
      "small issues you want caught before they strand your car",
    ],
    parts: [
      "garage-door-specific lubricant",
      "hinges",
      "weather seal (bottom rubber)",
      "fastener hardware",
    ],
    priceRange: "$89–$150 flat",
    isEmergency: false,
    isCommercial: false,
  },
  {
    slug: "commercial-garage-door-repair",
    name: "Commercial Garage Door Repair",
    shortName: "Commercial",
    h1Pattern: "Commercial Garage Door Repair in {city}, IL",
    blurb:
      "Rolling steel, sectional, and high-cycle doors for warehouses, firehouses, and storefronts — with priority dispatch to keep your dock moving.",
    symptoms: [
      "loading dock door stuck open or closed",
      "rolling steel curtain off its guides",
      "commercial operator motor burned out",
      "high-cycle springs at end of life",
    ],
    parts: [
      "high-cycle torsion springs (25k–100k cycles)",
      "rolling steel curtains and guides",
      "trolley and jackshaft operators",
      "fusible links and safety edges",
    ],
    priceRange: "quoted on-site; priority dispatch available",
    isEmergency: true,
    isCommercial: true,
  },
  {
    slug: "emergency-garage-door-repair",
    name: "Emergency Garage Door Repair",
    shortName: "24/6 Emergency",
    h1Pattern: "24-Hour Emergency Garage Door Repair in {city}, IL",
    blurb:
      "Door stuck open at midnight? Car trapped before work? Our emergency dispatch runs 24 hours a day, Monday through Saturday.",
    symptoms: [
      "door stuck open — home unsecured",
      "car trapped inside before a commute",
      "door came off its tracks",
      "spring snapped at night",
      "break-in damaged the door",
    ],
    parts: [
      "springs, cables, rollers, and track stocked on every truck",
      "temporary lock-down and securing hardware",
    ],
    priceRange: "standard rates 7am–9pm; after-hours dispatch fee applies",
    isEmergency: true,
    isCommercial: false,
  },
];

export const getService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
