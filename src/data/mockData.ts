export interface Mountain {
  id: string;
  name_en: string;
  name_bn: string;
  alt_name: string;
  slug: string;
  altitude_ft: number;
  altitude_m: number;
  height_source: "gps" | "gearth";
  region: "Bandarban" | "Rangamati" | "Khagrachari" | "Chittagong";
  lat: number;
  lng: number;
  difficulty: number;
  prominence: number;
  range: string;
  description: string;
  images: string[];
  first_ascent_date: string | null;
  category: "peak" | "waterfall";
}

export interface TrailFile {
  name: string;
  type: "gpx" | "kmz";
  contributor: string;
}

export interface WaterfallStep {
  step_number: number;
  type: string;
}

export interface WaterfallHydrology {
  watershed: string;
  primary_source: string;
  primary_source_lat: number | null;
  primary_source_lng: number | null;
  stream_gradient_pct: number | null;
  total_height_ft: string;
  largest_single_drop_ft: number | null;
  largest_single_drop_step: string;
  avg_width_ft: number | null;
  avg_discharge_m3s: string;
  beisel_rating: number | null;
  waterfall_type: string;
  steps: WaterfallStep[];
}

export interface Waterfall {
  id: string;
  name_en: string;
  name_bn: string;
  slug: string;
  lat: number | null;
  lng: number | null;
  region: "Bandarban" | "Rangamati" | "Khagrachari" | "Chittagong" | "Sylhet";
  region_tag: "CHT" | "Sylhet" | "Chittagong";
  description: string;
  how_to_go: string;
  tips: string;
  contributor: string;
  coordinates_pending: boolean;
  nearby_peak_slugs: string[];
  images: string[];
  trail_files: TrailFile[];
  hydrology: WaterfallHydrology | null;
}

export const mountains: Mountain[] = [
  {
    id: "1",
    name_en: "Saka Haphong",
    name_bn: "সাকা হাফং",
    alt_name: "Mowdok Taung / Tlangmoy / Clang Moy / Shopno Chura",
    slug: "saka-haphong",
    altitude_ft: 3489,
    altitude_m: 1063,
    height_source: "gps",
    region: "Bandarban",
    lat: 21.78852,
    lng: 92.60925,
    difficulty: 9,
    prominence: 2280,
    range: "Mowdok",
    description:
      "Saka Haphong is the highest peak in Bangladesh at 1,063 m (GPS). Located in Ramakri, Bandarban, deep in the Mowdok Range near the Myanmar border. Also known as Mowdok Taung, Tlangmoy, Clang Moy, and Shopno Chura.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "2",
    name_en: "Zow Tlang",
    name_bn: "জো ত্লাং",
    alt_name: "Mowdok Mual",
    slug: "zow-tlang",
    altitude_ft: 3353,
    altitude_m: 1021.69,
    height_source: "gps",
    region: "Bandarban",
    lat: 21.67327,
    lng: 92.60445,
    difficulty: 9,
    prominence: 896,
    range: "Mowdok",
    description:
      "Zow Tlang, also known as Mowdok Mual, is the second-highest peak in Bangladesh at 1,021.69 m (GPS). Located in Ramakri, Bandarban, in the Mowdok Range.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "3",
    name_en: "Dumlong",
    name_bn: "দুমলং",
    alt_name: "",
    slug: "dumlong",
    altitude_ft: 3307,
    altitude_m: 1008,
    height_source: "gps",
    region: "Rangamati",
    lat: 22.03398,
    lng: 92.59347,
    difficulty: 7,
    prominence: 1119,
    range: "Reng Tlang",
    description:
      "Dumlong is the highest peak in Rangamati district at 1,008 m (GPS). Located in Belaichari, part of the Reng Tlang range.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "4",
    name_en: "Jogi Haphong",
    name_bn: "জগি হাফং",
    alt_name: "",
    slug: "jogi-haphong",
    altitude_ft: 3252,
    altitude_m: 991.2,
    height_source: "gps",
    region: "Bandarban",
    lat: 21.70361,
    lng: 92.60149,
    difficulty: 8,
    prominence: 528,
    range: "Mowdok",
    description:
      "Jogi Haphong rises to 991.2 m (GPS) in the Mowdok Range. Located in Remarki, Bandarban.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "5",
    name_en: "Keokradong",
    name_bn: "কেওক্রাডং",
    alt_name: "Kewkradong / Keokaradong / Kewkaradong",
    slug: "keokradong",
    altitude_ft: 3234,
    altitude_m: 986,
    height_source: "gps",
    region: "Bandarban",
    lat: 21.94998,
    lng: 92.51449,
    difficulty: 6,
    prominence: 1247,
    range: "Ruma",
    description:
      "Keokradong is one of the most popular trekking destinations in Bangladesh at 986 m (GPS). Official height listed as 1,230 m. Located in Ruma, Bandarban, with well-established trails through Boga Lake.",
    images: [],
    first_ascent_date: "1990-03-15",
    category: "peak",
  },
  {
    id: "6",
    name_en: "Thingdawlte Tlang",
    name_bn: "থিংদাউলতে ত্লাং",
    alt_name: "",
    slug: "thingdawlte-tlang",
    altitude_ft: 3133,
    altitude_m: 955,
    height_source: "gps",
    region: "Bandarban",
    lat: 21.91046,
    lng: 92.58933,
    difficulty: 7,
    prominence: 837,
    range: "Lawmbok",
    description:
      "Thingdawlte Tlang rises to 955 m (GPS) in the Lawmbok range. Located in Ruma, Bandarban.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "7",
    name_en: "Rang Tlang",
    name_bn: "রেং ত্লাং",
    alt_name: "",
    slug: "rang-tlang",
    altitude_ft: 3123,
    altitude_m: 952,
    height_source: "gearth",
    region: "Rangamati",
    lat: 22.01221,
    lng: 92.59754,
    difficulty: 7,
    prominence: 577,
    range: "Reng Tlang",
    description:
      "Rang Tlang stands at 952 m (Google Earth) in the Reng Tlang range. Located in Belaichari, Rangamati. No GPS data available.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "8",
    name_en: "Teen Matha",
    name_bn: "তিন মাথা",
    alt_name: "",
    slug: "teen-matha",
    altitude_ft: 3100,
    altitude_m: 945,
    height_source: "gps",
    region: "Rangamati",
    lat: 21.98154,
    lng: 92.60309,
    difficulty: 7,
    prominence: 909,
    range: "Reng Tlang",
    description:
      "Teen Matha rises to 945 m (GPS) in the Reng Tlang range. Located in Balaichari, Rangamati.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "9",
    name_en: "Capital",
    name_bn: "ক্যাপিটাল",
    alt_name: "Kopital / Kapital",
    slug: "capital",
    altitude_ft: 3084,
    altitude_m: 940,
    height_source: "gps",
    region: "Bandarban",
    lat: 21.90126,
    lng: 92.52410,
    difficulty: 6,
    prominence: 837,
    range: "Ruma",
    description:
      "Capital (also Kopital/Kapital) stands at 940 m (GPS). Located in Ruma, Bandarban.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "10",
    name_en: "Lakhu Dong",
    name_bn: "লাখু ডং",
    alt_name: "Lakhuduang",
    slug: "lakhuduang",
    altitude_ft: 3065,
    altitude_m: 934,
    height_source: "gearth",
    region: "Bandarban",
    lat: 21.87556,
    lng: 92.5275,
    difficulty: 6,
    prominence: 475,
    range: "Dong",
    description:
      "Lakhu Dong (লাখু ডং) stands at 3,060-3,070 ft in the Dong range, Bandarban. South peak located at 21°51'42\"N 92°32'05\"E at 3,015 ft. Topographic prominence: 475 ft with 2.8 km isolation. Line parent: Capital. Island parent: Keokradong.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "11",
    name_en: "UR 2",
    name_bn: "ইউআর ২",
    alt_name: "",
    slug: "ur-2",
    altitude_ft: 3005,
    altitude_m: 916,
    height_source: "gearth",
    region: "Bandarban",
    lat: 21.92596,
    lng: 92.58025,
    difficulty: 7,
    prominence: 528,
    range: "Ruma",
    description:
      "UR 2 stands at 916 m (Google Earth) in Bandarban. No GPS data available.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "12",
    name_en: "Mowdok 3rd",
    name_bn: "মৌদক ৩য়",
    alt_name: "",
    slug: "mowdok-3rd",
    altitude_ft: 2989,
    altitude_m: 911,
    height_source: "gearth",
    region: "Bandarban",
    lat: 21.76103,
    lng: 92.60037,
    difficulty: 8,
    prominence: 574,
    range: "Mowdok",
    description:
      "Mowdok 3rd stands at 911 m (Google Earth) in the Mowdok Range, Bandarban. No GPS data available.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "13",
    name_en: "Kirs Taung",
    name_bn: "কির্স তাউং",
    alt_name: "",
    slug: "kirs-taung",
    altitude_ft: 2980,
    altitude_m: 908.3,
    height_source: "gps",
    region: "Bandarban",
    lat: 21.65878,
    lng: 92.47183,
    difficulty: 8,
    prominence: 2251,
    range: "Mowdok",
    description:
      "Kirs Taung rises to 908.3 m (GPS) in the Mowdok Range, Bandarban. Notable for its high prominence of 686 m.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "14",
    name_en: "Rang Tlang 3rd",
    name_bn: "রেং ত্লাং ৩য়",
    alt_name: "",
    slug: "rang-tlang-3rd",
    altitude_ft: 2979,
    altitude_m: 908,
    height_source: "gearth",
    region: "Rangamati",
    lat: 22.09010,
    lng: 92.57904,
    difficulty: 6,
    prominence: 1362,
    range: "Reng Tlang",
    description:
      "Rang Tlang 3rd stands at 908 m (Google Earth) in the Reng Tlang range, Rangamati. No GPS data available.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "15",
    name_en: "Sippi Arsuang",
    name_bn: "সিপ্পি আরসুয়াং",
    alt_name: "Ramiu Taung / Rakhamoin Taung / Rakhamoo Taung / Pyramid Hill",
    slug: "sippi-arsuang",
    altitude_ft: 3030,
    altitude_m: 923,
    height_source: "gearth",
    region: "Bandarban",
    lat: 22.18417,
    lng: 92.48333,
    difficulty: 5,
    prominence: 1415,
    range: "North Lombok Row / Politai Taung",
    description:
      "Sippi Arsuang is the 17th highest and 5th most prominent mountain peak of Bangladesh. Located on the border of Roangchari, Bandarban & Bilaichari, Rangamati. Elevation: 3,025-3,035 ft. Topographic prominence: 1,410-1,420 ft with 14.3 km isolation. Line parent: Dumlong. Prominence parent & Island parent: Saka Haphong. Nearest settlements: Devchara Para, Sippi Para. Also known as Ramiu Taung, Rakhamoin Taung, Rakhamoo Taung, and Pyramid Hill. Survey data from 2018.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "16",
    name_en: "Chimbuk 2nd",
    name_bn: "চিম্বুক ২য়",
    alt_name: "",
    slug: "chimbuk-2nd",
    altitude_ft: 2867,
    altitude_m: 874,
    height_source: "gearth",
    region: "Bandarban",
    lat: 21.82020,
    lng: 92.37989,
    difficulty: 5,
    prominence: 869,
    range: "Chimbuk",
    description:
      "Chimbuk 2nd stands at 874 m (Google Earth) in the Chimbuk range, Bandarban. No GPS data available.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "17",
    name_en: "Lowmbok-Row",
    name_bn: "লোমবক-রো",
    alt_name: "Fhon Thu Sip / Nag Pahar",
    slug: "lowmbok-row",
    altitude_ft: 2848,
    altitude_m: 868,
    height_source: "gearth",
    region: "Bandarban",
    lat: 22.06743,
    lng: 92.51997,
    difficulty: 6,
    prominence: 1184,
    range: "Lawmbok",
    description:
      "Lowmbok-Row (also Fhon Thu Sip / Nag Pahar) stands at 868 m (Google Earth) in Bandarban. No GPS data available.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "18",
    name_en: "Thajindong",
    name_bn: "তাজিনডং",
    alt_name: "Lungphe Taung",
    slug: "thajindong",
    altitude_ft: 2721,
    altitude_m: 829.6,
    height_source: "gps",
    region: "Bandarban",
    lat: 21.82158,
    lng: 92.53646,
    difficulty: 8,
    prominence: 0,
    range: "Mowdok",
    description:
      "Thajindong (also Lungphe Taung) has an official height of 1,411 m but GPS survey measured 829.6 m. Located in Bandarban. Historically considered the highest peak in Bangladesh.",
    images: [],
    first_ascent_date: "2004-01-01",
    category: "peak",
  },
  {
    id: "19",
    name_en: "Taung Prai",
    name_bn: "তাউং প্রাই",
    alt_name: "",
    slug: "taung-prai",
    altitude_ft: 2985,
    altitude_m: 910,
    height_source: "gearth",
    region: "Rangamati",
    lat: 21.9025,
    lng: 92.62694,
    difficulty: 7,
    prominence: 740,
    range: "Reng Tlang",
    description:
      "Taung Prai stands at approximately 2,980-2,990 ft in the Reng Tlang range, Bilaichari, Rangamati. Topographic prominence of 740 ft with 7.7 km isolation. Line parent: Lisra Haphong. Island parent: Mukhra Thutai Haphong. Nearest settlements: Lui Moy Para and Kes Pai Para.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
];

export const regions = ["Bandarban", "Rangamati", "Khagrachari", "Chittagong", "Sylhet"] as const;
export const waterfallRegionTags = ["CHT", "Chittagong", "Sylhet"] as const;

export const waterfalls: Waterfall[] = [
  {
    id: "w1",
    name_en: "Tlubong Waterfall (The Double Falls)",
    name_bn: "ত্লুবং জলপ্রপাত",
    slug: "tlubong-waterfall",
    lat: 21.92217,
    lng: 92.54852,
    region: "Bandarban",
    region_tag: "CHT",
    description:
      "Formed by the Prangsha and Pangkhiang streams, Tlubong is the starting point of the Remakri canal and one of the rare double waterfalls in the Chittagong Hill Tracts.",
    how_to_go:
      "Best reached from Sungsang para (Bawm village), approx. 2.5km south-east. 1-2 hours from Keokradong via Passing para.",
    tips:
      "Monsoon season offers the most spectacular flow but leeches are common. Carry salt and wear full-length leggings. Respect the local Bawm community customs — always ask permission before entering the village.",
    contributor: "Zaqiul Deep",
    coordinates_pending: false,
    nearby_peak_slugs: ["keokradong", "capital"],
    images: [],
    trail_files: [],
    hydrology: null,
  },
  {
    id: "w2",
    name_en: "Khoiya Chora Waterfall",
    name_bn: "খৈইয়াছড়া জলপ্রপাত",
    slug: "khoiya-chora-waterfall",
    lat: 22.77014,
    lng: 91.61256,
    region: "Chittagong",
    region_tag: "Chittagong",
    description:
      "Khoiya Chora is one of the most accessible and popular waterfalls near Chittagong, featuring multiple cascading tiers through lush green hills.",
    how_to_go:
      "Located near Mirsarai, Chittagong. Accessible by bus from Chittagong city to Mirsarai, then a short trek of about 2-3 hours.",
    tips:
      "Best visited during or just after monsoon (July-September). Avoid visiting during heavy rainfall due to flash flood risk. Carry drinking water and snacks.",
    contributor: "Sohrab Chowdhury",
    coordinates_pending: false,
    nearby_peak_slugs: [],
    images: [],
    trail_files: [
      { name: "Khoiya Chora Trail", type: "kmz", contributor: "Sajal" },
      { name: "Khoiya Chora GPS Track", type: "gpx", contributor: "Sadman Sakib" },
    ],
    hydrology: null,
  },
  {
    id: "w3",
    name_en: "Ri-Sung-Sung Falls",
    name_bn: "রি-সুং-সুং জলপ্রপাত",
    slug: "ri-sung-sung-falls",
    lat: 21.89262,
    lng: 92.43857,
    region: "Bandarban",
    region_tag: "CHT",
    description:
      "A remote and pristine waterfall in the deep hills of Bandarban, Ri-Sung-Sung offers a secluded experience amidst dense jungle terrain.",
    how_to_go:
      "Accessible via Ruma, Bandarban. Requires a multi-hour trek through hilly terrain. Local guides are essential.",
    tips:
      "Extremely remote — carry all supplies. Hire a local Marma or Bawm guide. Not recommended during peak monsoon due to trail conditions.",
    contributor: "Zaqiul Deep",
    coordinates_pending: false,
    nearby_peak_slugs: ["keokradong", "capital", "lakhuduang"],
    images: [],
    trail_files: [],
    hydrology: null,
  },
  {
    id: "w4",
    name_en: "Sohosro Dhara-2",
    name_bn: "সহস্রধারা-২",
    slug: "sohosro-dhara-2",
    lat: 22.67376,
    lng: 91.65754,
    region: "Chittagong",
    region_tag: "Chittagong",
    description:
      "The second Sohosro Dhara waterfall is a lesser-known gem near Sitakunda, featuring multiple thin streams cascading down a rocky face.",
    how_to_go:
      "Located near Sitakunda, Chittagong. Reachable by local transport from Sitakunda bazar followed by a short hike.",
    tips:
      "Less crowded than the original Sohosro Dhara. Best visited October-December when water flow is moderate and trails are dry. Carry sturdy footwear for slippery rocks.",
    contributor: "Sohrab Chowdhury",
    coordinates_pending: false,
    nearby_peak_slugs: [],
    images: [],
    trail_files: [],
    hydrology: null,
  },
  {
    id: "w5",
    name_en: "Nafakhum",
    name_bn: "নাফাখুম",
    slug: "nafakhum",
    lat: 21.7203,
    lng: 92.5337,
    region: "Bandarban",
    region_tag: "CHT",
    description:
      "Nafakhum is one of the largest and most iconic waterfalls in Bangladesh, located on the Sangu River in Remakri, Thanchi. The roaring horseshoe-shaped falls is a must-visit for any trekker.",
    how_to_go:
      "Reach Thanchi by bus from Bandarban town (3-4 hours), then take a boat ride to Remakri (3-4 hours). From Remakri, a 3-hour trek leads to Nafakhum.",
    tips:
      "The trek from Remakri involves multiple river crossings. Dry season (Nov-Mar) is safest. Hire a mandatory local guide from Thanchi. Accommodation available at Remakri.",
    contributor: "",
    coordinates_pending: false,
    nearby_peak_slugs: ["saka-haphong", "zow-tlang"],
    images: [],
    trail_files: [],
    hydrology: null,
  },
  {
    id: "w6",
    name_en: "Ateka Falls",
    name_bn: "আটেকা জলপ্রপাত",
    slug: "ateka-falls",
    lat: null,
    lng: null,
    region: "Sylhet",
    region_tag: "Sylhet",
    description:
      "Ateka Falls is located in the Rajkandi Reserve Forest, Kurma Bit, Komolganj, Moulovi Bazar. A hidden gem in the Sylhet region, distinct from the Chittagong Hill Tracts waterfalls.",
    how_to_go:
      "Reach Komolganj, Moulovi Bazar by bus from Sylhet city. From Komolganj, local transport to Kurma Bit area of Rajkandi Reserve Forest. A forest trek leads to the falls.",
    tips:
      "Located inside a reserve forest — entry permits may be required. Carry insect repellent and wear long clothing. Best visited November-February when trails are dry.",
    contributor: "Rakib Kishore",
    coordinates_pending: true,
    nearby_peak_slugs: [],
    images: [],
    trail_files: [],
    hydrology: null,
  },
  {
    id: "w7",
    name_en: "Sijuk Falls",
    name_bn: "সিজুক জলপ্রপাত",
    slug: "sijuk-falls",
    lat: null,
    lng: null,
    region: "Bandarban",
    region_tag: "CHT",
    description:
      "Sijuk Falls is a recently documented waterfall in the Chittagong Hill Tracts. Exact coordinates are pending verification from field surveys.",
    how_to_go:
      "Access details are being compiled. Check back for updated route information.",
    tips:
      "As a newly documented site, trail conditions are unknown. Always travel with a local guide and inform someone of your itinerary.",
    contributor: "Ridwanul Khair",
    coordinates_pending: true,
    nearby_peak_slugs: [],
    images: [],
    trail_files: [],
    hydrology: null,
  },
  {
    id: "w8",
    name_en: "Jamrum Waterfall",
    name_bn: "জামরুম জলপ্রপাত",
    slug: "jamrum-waterfall",
    lat: null,
    lng: null,
    region: "Bandarban",
    region_tag: "CHT",
    description:
      "Jamrum is a spectacular staircase/tiered waterfall with 6 distinct steps, fed by the Jamrum Jhiri stream which flows into the Toain and then the Matamuhuri river system. With a total height of 370-380 feet and a largest single drop of 81 feet (5th step), it is one of the tallest measured waterfalls in the CHT.",
    how_to_go:
      "Access details are being compiled. The waterfall is located in the Matamuhuri watershed area of Bandarban.",
    tips:
      "This is a remote multi-tier waterfall. Each step has a different character — from the punchbowl at the top to the chute at the bottom. Carry ropes and proper footwear for the steep sections.",
    contributor: "",
    coordinates_pending: true,
    nearby_peak_slugs: [],
    images: [],
    trail_files: [],
    hydrology: {
      watershed: "জামরুম ঝিরি → টোয়াইন → মাতামুহুরি",
      primary_source: "তৈন রিজ",
      primary_source_lat: 21.61,
      primary_source_lng: 92.44194,
      stream_gradient_pct: 29,
      total_height_ft: "370-380",
      largest_single_drop_ft: 81,
      largest_single_drop_step: "5th step",
      avg_width_ft: 30,
      avg_discharge_m3s: "29 (estimated, further measurement needed)",
      beisel_rating: 4,
      waterfall_type: "Staircase/Tiered",
      steps: [
        { step_number: 1, type: "Punchbowl" },
        { step_number: 2, type: "Cascade, Segmented" },
        { step_number: 3, type: "Horsetail" },
        { step_number: 4, type: "Ephemeral" },
        { step_number: 5, type: "Fan" },
        { step_number: 6, type: "Chute" },
      ],
    },
  },
  {
    id: "w9",
    name_en: "Tinap Saitar",
    name_bn: "তিনাপ সাইতার",
    slug: "tinap-saitar",
    lat: 22.1667,
    lng: 92.3333,
    region: "Bandarban",
    region_tag: "CHT",
    description:
      "Tinap Saitar (also known as Paindu Saitar) is considered one of the tallest waterfalls in Bangladesh, located in Roangchhari/Ruma Upazila, Bandarban. 'Tinap' means water and 'Saitar' means waterfall in the Bawm language. It requires a 40 km trek through dense forest.",
    how_to_go:
      "From Bandarban, take a local bus to Roangchhari. From Roangchhari bus stand, a 23 km trek with a guide through hilly terrain leads to the waterfall.",
    tips:
      "Extremely remote — carry all supplies for 2 days. A local Bawm guide is mandatory. Best visited November-March. The 40 km round trip requires overnight camping.",
    contributor: "",
    coordinates_pending: false,
    nearby_peak_slugs: [],
    images: [],
    trail_files: [],
    hydrology: null,
  },
  {
    id: "w10",
    name_en: "Amiakhum",
    name_bn: "আমিয়াখুম",
    slug: "amiakhum",
    lat: 21.6833,
    lng: 92.5667,
    region: "Bandarban",
    region_tag: "CHT",
    description:
      "Amiakhum is one of the most breathtaking and inaccessible waterfalls in Bangladesh, located in Thanchi upazila near the Myanmar border. The crystal-clear waters tumble down rugged cliffs into a tranquil pool. Often called the most beautiful waterfall in Bangladesh.",
    how_to_go:
      "From Thanchi, take a boat to Remakri, then trek to Nafakhum. From Nafakhum, continue another 3-4 hours of difficult trekking through dense jungle and river crossings to reach Amiakhum.",
    tips:
      "One of the most remote waterfalls — requires at least 3 days round trip from Bandarban. Multiple river crossings required. Only attempt in dry season (Nov-Feb). Mandatory local guide from Thanchi.",
    contributor: "",
    coordinates_pending: true,
    nearby_peak_slugs: ["saka-haphong", "zow-tlang"],
    images: [],
    trail_files: [],
    hydrology: null,
  },
  {
    id: "w11",
    name_en: "Jadipai Waterfall",
    name_bn: "জাদিপাই জলপ্রপাত",
    slug: "jadipai-waterfall",
    lat: 21.9450,
    lng: 92.5100,
    region: "Bandarban",
    region_tag: "CHT",
    description:
      "Jadipai is one of the widest waterfalls in Bangladesh, located approximately 1.5 km from Keokradong peak in Ruma Upazila. Known as the 'Queen of Bandarban's Waterfalls', it features a wide curtain of water cascading down a cliff face.",
    how_to_go:
      "Trek from Ruma to Boga Lake, then continue to Keokradong. Jadipai is about 1.5 km descent from Keokradong peak through steep trails.",
    tips:
      "The descent to Jadipai from Keokradong is steep and slippery. Best combined with Keokradong-Boga Lake trek. Carry rope for safety. Best visited October-February.",
    contributor: "",
    coordinates_pending: true,
    nearby_peak_slugs: ["keokradong", "capital"],
    images: [],
    trail_files: [],
    hydrology: null,
  },
  {
    id: "w12",
    name_en: "Madhabkunda Waterfall",
    name_bn: "মাধবকুণ্ড জলপ্রপাত",
    slug: "madhabkunda-waterfall",
    lat: 24.638472,
    lng: 92.224556,
    region: "Sylhet",
    region_tag: "Sylhet",
    description:
      "Madhabkunda is the largest waterfall in Bangladesh at approximately 200 feet (61 m) high, located in Barlekha Upazila, Moulvibazar District. The waterfall is fed by a stream originating from the Patharia Hills and is a popular tourist destination.",
    how_to_go:
      "From Sylhet city, take a bus to Kulaura or directly to Madhabkunda (approximately 72 km). The waterfall is easily accessible with paved roads leading close to the site.",
    tips:
      "Most accessible major waterfall in Bangladesh. Entry fee applies. Best visited during monsoon (June-September) for maximum water flow. Weekdays are less crowded.",
    contributor: "",
    coordinates_pending: false,
    nearby_peak_slugs: [],
    images: [],
    trail_files: [],
    hydrology: null,
  },
  {
    id: "w13",
    name_en: "Hum Hum Waterfall",
    name_bn: "হাম হাম জলপ্রপাত",
    slug: "humhum-waterfall",
    lat: 24.167972,
    lng: 91.912528,
    region: "Sylhet",
    region_tag: "Sylhet",
    description:
      "Hum Hum (also known as Cheetah Falls) is a stunning horsetail waterfall in the Rajkandi Reserve Forest, Kamalganj, Moulvibazar. Discovered in 2010, it stands 135-170 feet tall and is surrounded by dense tropical forest.",
    how_to_go:
      "From Sreemangal, travel to Kamalganj, then to Rajkandi Reserve Forest. A 3-4 hour trek through the forest leads to the waterfall.",
    tips:
      "The trek involves stream crossings and steep climbs. Leeches are common — carry salt. A local guide is essential. Best visited September-December. Discovered in 2010 by tourist guide Shyamal Deva Barma.",
    contributor: "",
    coordinates_pending: false,
    nearby_peak_slugs: [],
    images: [],
    trail_files: [],
    hydrology: null,
  },
];

export interface StreamEntry {
  local_name: string;
  alt_name: string;
}

export interface ForestRegion {
  id: string;
  name: string;
  slug: string;
  political_name: string;
  total_area_km2: number;
  max_elevation_ft: number;
  min_elevation_ft: number;
  avg_rainfall_mm: number;
  stream_basin: string;
  streams: StreamEntry[];
  natural_waterbodies: number;
  forest_density_pct: number;
  max_canopy_height_ft: number;
  avg_canopy_height_ft: number;
  leaf_area_index: string;
  foliage_height_diversity: number;
  vertical_canopy_index: number;
  estimated_biomass_tonnes_per_ha: string;
  above_ground_biomass_tonnes: string;
  below_ground_biomass_tonnes: string;
  total_carbon_tonnes: string;
  canopy_timber_species: string[];
  bamboo_species: string[];
  understory_flora: string;
  notable_mammals: string[];
  birds_description: string;
  reptiles_amphibians_description: string;
}

export const forestRegions: ForestRegion[] = [
  {
    id: "fr1",
    name: "Sangu Upper Basin Tropical Semi Evergreen Rainforest",
    slug: "sangu-upper-basin",
    political_name: "Sangu Reserve Forest",
    total_area_km2: 320,
    max_elevation_ft: 2985,
    min_elevation_ft: 160,
    avg_rainfall_mm: 3000,
    stream_basin: "Sangu/Sangkho",
    streams: [
      { local_name: "Boro Mowdok", alt_name: "Madhugree Khiyang" },
      { local_name: "Boro Saipu", alt_name: "Hombung Khiyang" },
      { local_name: "Otto Khiyang", alt_name: "Tawa Chara" },
      { local_name: "Tomo aw", alt_name: "Tomoto Chara" },
      { local_name: "Wangring aw", alt_name: "Wangnyo Chara" },
      { local_name: "Fa wayne saw", alt_name: "Tao Chara" },
      { local_name: "Panjhiri", alt_name: "Marang Chara" },
      { local_name: "Sapachara", alt_name: "Sangkha Jhiri" },
      { local_name: "Lagpai jhiri", alt_name: "Sapang Chara" },
      { local_name: "Braw khiyang", alt_name: "Malak Chara" },
      { local_name: "Likri aw", alt_name: "Saingpho Chara" },
      { local_name: "Saikhiang chara", alt_name: "" },
      { local_name: "Tuiwang", alt_name: "" },
      { local_name: "Narissha Khiyang", alt_name: "" },
      { local_name: "Nablain Khiyang", alt_name: "" },
    ],
    natural_waterbodies: 1,
    forest_density_pct: 70,
    max_canopy_height_ft: 140,
    avg_canopy_height_ft: 67,
    leaf_area_index: "6-7",
    foliage_height_diversity: 0.9,
    vertical_canopy_index: 0.7,
    estimated_biomass_tonnes_per_ha: "150-200",
    above_ground_biomass_tonnes: "3.36 million",
    below_ground_biomass_tonnes: "1.15 million",
    total_carbon_tonnes: "4.3 million",
    canopy_timber_species: [
      "Jarul", "Karai", "Gamar", "Chapalish", "Toon", "Civit", "Chandul", "Shimul", "Champa",
    ],
    bamboo_species: [
      "Melocanna baccifera", "Bambusa burmanica", "B. polymorpha", "Dendrocalamus spp.", "Gigantochloa spp.",
    ],
    understory_flora: "Mainly Ferns, Mushrooms, Herbs",
    notable_mammals: [
      "Asian Elephant", "Indochinese Leopard", "Sambar Deer", "Barking Deer", "Binturong",
      "Clouded Leopard", "Asian Black Bear", "Sun Bear", "Capped Langur",
      "Western Hoolock Gibbon", "Crab-Eating Macaques", "Gray Slow Loris",
      "Indian Civet", "Wild Boar",
    ],
    birds_description:
      "More than 280 species of birds including Great Hornbill, Spotted Owlet, Hill Myna, House Swift, and Greater Painted-snipe. Almost all birds live in the canopy layer.",
    reptiles_amphibians_description:
      "49 species of reptiles and 20 species of amphibians including Asian Forest Turtle, Reticulated Python, and various kinds of lizards and tree toads.",
  },
];
