export interface Mountain {
  id: string;
  name_en: string;
  name_bn: string;
  slug: string;
  altitude_ft: number;
  region: "Bandarban" | "Rangamati" | "Khagrachari";
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

export const mountains: Mountain[] = [
  {
    id: "1",
    name_en: "Tahjindong (Bijoy)",
    name_bn: "তাজিনডং (বিজয়)",
    slug: "tahjindong",
    altitude_ft: 3451,
    region: "Bandarban",
    lat: 21.8833,
    lng: 92.3667,
    difficulty: 8,
    prominence: 1200,
    range: "Mowdok Range",
    description:
      "Tahjindong, also known as Bijoy, is the highest peak in Bangladesh. Located in the remote southeastern region of Bandarban Hill District, it rises above the surrounding ridges offering panoramic views of the Chittagong Hill Tracts and Myanmar border.",
    images: [],
    first_ascent_date: "2004-01-01",
    category: "peak",
  },
  {
    id: "2",
    name_en: "Keokradong",
    name_bn: "কেওক্রাডং",
    slug: "keokradong",
    altitude_ft: 3172,
    region: "Bandarban",
    lat: 21.9167,
    lng: 92.5167,
    difficulty: 6,
    prominence: 980,
    range: "Mowdok Range",
    description:
      "Keokradong was long considered the highest peak in Bangladesh. It remains one of the most popular trekking destinations, featuring a well-established trail through Boga Lake and indigenous Mro villages.",
    images: [],
    first_ascent_date: "1990-03-15",
    category: "peak",
  },
  {
    id: "3",
    name_en: "Mowdok Mual",
    name_bn: "মৌদক মুয়াল",
    slug: "mowdok-mual",
    altitude_ft: 3292,
    region: "Bandarban",
    lat: 21.8667,
    lng: 92.4,
    difficulty: 9,
    prominence: 1100,
    range: "Mowdok Range",
    description:
      "Mowdok Mual is the second-highest peak in Bangladesh. The trek is extremely challenging, requiring multiple days through dense bamboo forests and steep ridgelines near the Myanmar border.",
    images: [],
    first_ascent_date: "2006-12-20",
    category: "peak",
  },
  {
    id: "4",
    name_en: "Dumlong",
    name_bn: "দুমলং",
    slug: "dumlong",
    altitude_ft: 2608,
    region: "Rangamati",
    lat: 22.6667,
    lng: 92.2,
    difficulty: 5,
    prominence: 750,
    range: "Barkal Range",
    description:
      "Dumlong is the highest peak in Rangamati district, offering stunning views of Kaptai Lake and surrounding hill tracts. The trek passes through Chakma and Tripura villages with rich cultural encounters.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "5",
    name_en: "Zow Tlang",
    name_bn: "জো ত্লাং",
    slug: "zow-tlang",
    altitude_ft: 2900,
    region: "Bandarban",
    lat: 21.85,
    lng: 92.45,
    difficulty: 7,
    prominence: 850,
    range: "Mowdok Range",
    description:
      "Zow Tlang is a remote and lesser-known peak in the Bandarban Hill District. The trail is unmarked for most of the route, passing through pristine forests and offering some of the most untouched wilderness in Bangladesh.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
];

export const regions = ["Bandarban", "Rangamati", "Khagrachari"] as const;
