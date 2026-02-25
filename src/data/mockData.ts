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
  {
    id: "6",
    name_en: "Kuwaongsu Tong",
    name_bn: "কুয়াওংসু তং",
    slug: "kuwaongsu-tong",
    altitude_ft: 2238,
    region: "Bandarban",
    lat: 21.87,
    lng: 92.38,
    difficulty: 7,
    prominence: 875,
    range: "Mowdok Range",
    description:
      "Kuwaongsu Tong rises to approximately 2,230–2,245 ft with a prominence of 870–880 ft and an isolation of 2.4 km. Its line parent and island parent is Kirs Tong.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "7",
    name_en: "Do Tong",
    name_bn: "দো তং",
    slug: "do-tong",
    altitude_ft: 2105,
    region: "Bandarban",
    lat: 21.89,
    lng: 92.39,
    difficulty: 7,
    prominence: 955,
    range: "Mowdok Range",
    description:
      "Do Tong stands at approximately 2,100–2,110 ft with a prominence of 950–960 ft and an isolation of 2.8 km. Its line parent is Tajing Dong and island parent is Saka Haphong.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "8",
    name_en: "Pao Tong",
    name_bn: "পাও তং",
    slug: "pao-tong",
    altitude_ft: 2095,
    region: "Bandarban",
    lat: 21.86,
    lng: 92.37,
    difficulty: 6,
    prominence: 785,
    range: "Mowdok Range",
    description:
      "Pao Tong reaches approximately 2,090–2,100 ft with a prominence of 780–790 ft and an isolation of 1.8 km. Its line parent is Kuwaongsu Tong and island parent is Kirs Tong.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "9",
    name_en: "Rengkri Kua Hung",
    name_bn: "রেংক্রী কুয়া হুং",
    slug: "rengkri-kua-hung",
    altitude_ft: 2075,
    region: "Bandarban",
    lat: 21.88,
    lng: 92.41,
    difficulty: 6,
    prominence: 835,
    range: "Mowdok Range",
    description:
      "Rengkri Kua Hung rises to approximately 2,070–2,080 ft with a prominence of 830–840 ft and an isolation of 2.4 km. Its line parent is Kuwaongsu Tong and island parent is Kirs Tong.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
  {
    id: "10",
    name_en: "Kalo Moun",
    name_bn: "কালো মৌন",
    slug: "kalo-moun",
    altitude_ft: 2045,
    region: "Bandarban",
    lat: 21.84,
    lng: 92.43,
    difficulty: 6,
    prominence: 1035,
    range: "Mowdok Range",
    description:
      "Kalo Moun stands at approximately 2,040–2,050 ft with a prominence of 1,030–1,040 ft and an isolation of 3.4 km. Its line parent is Sadra Haphong and island parent is Saka Haphong.",
    images: [],
    first_ascent_date: null,
    category: "peak",
  },
];

export const regions = ["Bandarban", "Rangamati", "Khagrachari"] as const;
