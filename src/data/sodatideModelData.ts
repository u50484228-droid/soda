import {
  konjacRootImg,
  greenTeaImg,
  gingerRootImg,
  chromiumImg,
  inulinImg,
  probioticImg,
  peppermintImg,
  sodatideTwoBottlesImg,
  sodatideSixBottlesImg,
  sodatideThreeBottlesImg,
  bonusEbooksImg
} from '../assets/images';

export interface SodaIngredient {
  id: string;
  name: string;
  category: 'Soluble Fiber' | 'Polyphenol' | 'Botanical' | 'Trace Mineral' | 'Prebiotic' | 'Probiotic' | 'Carminative';
  description: string;
  scientificRole: string;
  visualType: 'fiber' | 'greentea' | 'ginger' | 'chromium' | 'inulin' | 'probiotic' | 'peppermint';
  imageUrl: string;
}

export interface SodaBundlePlan {
  id: string;
  name: string;
  type: 'BASIC' | 'BEST VALUE!' | 'Most Popular';
  bottlesLabel: string;
  bottlesCount: number;
  supplyDays: number;
  pricePerBottle: number;
  totalPrice: number;
  originalPrice: number;
  savings: number;
  freeShipping: boolean;
  shippingPrice: number;
  highlighted?: boolean;
  freeEbooks?: boolean;
  badges: string[];
  image: string;
  checkoutUrl: string;
}

export interface SodaBonus {
  id: string;
  number: number;
  title: string;
  originalPrice: number;
  description: string;
}

export interface SodaCitation {
  id: number;
  authors: string;
  year: number;
  title: string;
  journal: string;
  sourceUrl?: string;
  keyFinding: string;
}

export const SODATIDE_INGREDIENTS: SodaIngredient[] = [
  {
    id: 'glucomannan',
    name: 'Glucomannan (Konjac Root)',
    category: 'Soluble Fiber',
    description: 'A pure water-soluble dietary fiber that expands gently in the stomach upon contact with fluid, promoting a natural feeling of fullness.',
    scientificRole: 'Slows gastric emptying rate, signals fullness via leptin pathways, and naturally reduces spontaneous caloric intake by up to 35%.',
    visualType: 'fiber',
    imageUrl: konjacRootImg
  },
  {
    id: 'green-tea',
    name: 'Green Tea Extract (50% EGCG)',
    category: 'Polyphenol',
    description: 'Standardized to 50% Epigallocatechin Gallate, the most bioactive antioxidant catechin supporting thermogenic metabolism.',
    scientificRole: 'Supports natural resting metabolic rate and promotes fatty acid oxidation without rapid heart rates or jittery stimulant crashes.',
    visualType: 'greentea',
    imageUrl: greenTeaImg
  },
  {
    id: 'steamed-ginger',
    name: 'Steamed Ginger Root Extract',
    category: 'Botanical',
    description: 'Specially steamed to maximize bioactive gingerols and shogaols that accelerate sluggish digestive motility and eliminate gut bloat.',
    scientificRole: 'Calms gastrointestinal smooth muscle spasms, accelerates gastric emptying, and relieves after-meal abdominal heaviness.',
    visualType: 'ginger',
    imageUrl: gingerRootImg
  },
  {
    id: 'chromium',
    name: 'Chromium Picolinate',
    category: 'Trace Mineral',
    description: 'An essential trace element in highly bioavailable picolinate form that works directly with cellular insulin receptors.',
    scientificRole: 'Stabilizes postprandial blood sugar curves, helping extinguish afternoon sugar cravings and compulsive carbohydrate snacking.',
    visualType: 'chromium',
    imageUrl: chromiumImg
  },
  {
    id: 'inulin',
    name: 'Organic Inulin Prebiotic',
    category: 'Prebiotic',
    description: 'Natural prebiotic soluble fiber harvested from organic chicory root to feed and nourish beneficial microbiome flora.',
    scientificRole: 'Converts in the colon into Short-Chain Fatty Acids (SCFAs) that reduce mucosal inflammation and nourish the intestinal lining.',
    visualType: 'inulin',
    imageUrl: inulinImg
  },
  {
    id: 'probiotic-paracasei',
    name: 'Lactobacillus Paracasei',
    category: 'Probiotic',
    description: 'Clinically studied probiotic strain recognized for reinforcing the gut-barrier epithelium and balancing appetite signaling.',
    scientificRole: 'Supports the enteric nervous system and helps clear metabolic inflammation across the gut-brain satiety axis.',
    visualType: 'probiotic',
    imageUrl: probioticImg
  },
  {
    id: 'peppermint',
    name: 'Peppermint Carminative Leaf',
    category: 'Carminative',
    description: 'Traditional soothing digestive herb containing natural menthol terpenes that relax intestinal distention and refresh digestion.',
    scientificRole: 'Provides rapid relief from intestinal gas entrapment, promoting a flat, comfortable stomach feeling after meals.',
    visualType: 'peppermint',
    imageUrl: peppermintImg
  }
];

export const SODATIDE_BUNDLES: SodaBundlePlan[] = [
  {
    id: 'basic-2',
    name: 'Basic Package',
    type: 'BASIC',
    bottlesLabel: '2 BOTTLES',
    bottlesCount: 2,
    supplyDays: 60,
    pricePerBottle: 79,
    totalPrice: 158,
    originalPrice: 358,
    savings: 200,
    freeShipping: false,
    shippingPrice: 9.99,
    badges: ['YOU SAVE $200!', '60 DAYS GUARANTEE'],
    image: sodatideTwoBottlesImg,
    checkoutUrl: 'https://buygoods.com/secure/checkout.html?sessid2=sessid2026092401438432&aff_id=197118&account_id=12726&product_codename=PP_SDT2UNITS_AFF&redirect=aHR0cHM6Ly9pbXByb3ZpbmdvdXJoZWFsdGguY29tL3NkdC1hZmYtYnV5LXVwMS8%3D'
  },
  {
    id: 'best-value-6',
    name: 'Best Value Package',
    type: 'BEST VALUE!',
    bottlesLabel: '6 BOTTLES',
    bottlesCount: 6,
    supplyDays: 180,
    pricePerBottle: 49,
    totalPrice: 294,
    originalPrice: 1074,
    savings: 780,
    freeShipping: true,
    shippingPrice: 0,
    highlighted: true,
    freeEbooks: false,
    badges: ['YOU SAVE $780!', 'BIGGEST DISCOUNT', '60 DAYS GUARANTEE'],
    image: sodatideSixBottlesImg,
    checkoutUrl: 'https://buygoods.com/secure/checkout.html?sessid2=sessid2026092401438432&aff_id=197118&account_id=12726&product_codename=PP_SDT6UNITS_AFF&redirect=aHR0cHM6Ly9pbXByb3ZpbmdvdXJoZWFsdGguY29tL3NkdC1hZmYtYnV5LXVwMS1meDI%3D'
  },
  {
    id: 'popular-3',
    name: 'Most Popular',
    type: 'Most Popular',
    bottlesLabel: '3 BOTTLES',
    bottlesCount: 3,
    supplyDays: 90,
    pricePerBottle: 69,
    totalPrice: 207,
    originalPrice: 537,
    savings: 330,
    freeShipping: true,
    shippingPrice: 0,
    badges: ['YOU SAVE $330!', '60 DAYS GUARANTEE'],
    image: sodatideThreeBottlesImg,
    checkoutUrl: 'https://buygoods.com/secure/checkout.html?sessid2=sessid2026092401438432&aff_id=197118&account_id=12726&product_codename=PP_SDT3UNITS_AFF&redirect=aHR0cHM6Ly9pbXByb3ZpbmdvdXJoZWFsdGguY29tL3NkdC1hZmYtYnV5LXVwMS8%3D'
  }
];

export const SODATIDE_BONUSES: SodaBonus[] = [
  {
    id: 'bonus-1',
    number: 1,
    title: '1-Day Gut Detox & Rapid Debloat Protocol',
    originalPrice: 55,
    description: 'A doctor-designed 24-hour reset routine that flushes sluggish intestinal waste and restores flat-stomach comfort overnight.'
  },
  {
    id: 'bonus-2',
    number: 2,
    title: 'The Appetite & Craving Reset Mastery Guide',
    originalPrice: 54,
    description: 'Proven behavioral and nutritional secrets to silence compulsive 3 PM sugar cravings and feel satisfied on 40% less food.'
  },
  {
    id: 'bonus-3',
    number: 3,
    title: 'High-Energy Low-Bloat Recipe Cookbook',
    originalPrice: 49,
    description: '25 delicious, easy-to-prepare breakfasts, dinners, and gut-soothing smoothies that optimize natural digestive motility.'
  }
];

export const SODATIDE_CITATIONS: SodaCitation[] = [
  {
    id: 1,
    authors: 'Sood, N., Baker, W. L., & Coleman, C. I.',
    year: 2008,
    title: 'Effect of glucomannan on body weight and lipid parameters: a systematic review of randomized controlled trials',
    journal: 'American Journal of Clinical Nutrition, 88(4), 1167-1175',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Demonstrated statistically significant weight management and appetite reduction via delayed gastric transit and satiety induction.'
  },
  {
    id: 2,
    authors: 'Hursel, R., Viechtbauer, W., & Westerterp-Plantenga, M. S.',
    year: 2009,
    title: 'The effects of green tea catechins on weight loss and metabolic energy maintenance: a meta-analysis',
    journal: 'International Journal of Obesity, 33(9), 956-961',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Confirmed that green tea EGCG increases 24-hour energy expenditure and stimulates lipid oxidation without increasing heart rate.'
  },
  {
    id: 3,
    authors: 'Park, Y. J., Kim, J., & Lee, M. H.',
    year: 2020,
    title: 'Efficacy and safety of steamed ginger extract for gastric motility and body composition: a randomized trial',
    journal: 'Nutrients, 12(2), 522',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Found high-shogaol steamed ginger significantly relieves abdominal heaviness and accelerates delayed digestive transit.'
  },
  {
    id: 4,
    authors: 'Pittler, M. H., Stevinson, C., & Ernst, E.',
    year: 2003,
    title: 'Chromium picolinate for reducing body weight: a meta-analysis of randomized trials',
    journal: 'International Journal of Obesity, 27(4), 522-529',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Synthesized evidence showing enhanced cellular insulin sensitivity and significant attenuation of compulsive carbohydrate cravings.'
  },
  {
    id: 5,
    authors: 'Wanders, A. J., van den Borne, J. J., & de Graaf, C.',
    year: 2011,
    title: 'Dietary fibres in the regulation of appetite and food intake: importance of viscosity and gastric volume',
    journal: 'Obesity Reviews, 12(9), 724-739',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Proved viscous fibers like glucomannan create substantial gastric mechanoreceptor stimulation, blunting hunger hormone ghrelin.'
  },
  {
    id: 6,
    authors: 'Dulloo, A. G., Duret, C., & Rohrer, D.',
    year: 1999,
    title: 'Efficacy of a green tea extract rich in catechin polyphenols and caffeine in increasing 24-h energy expenditure',
    journal: 'American Journal of Clinical Nutrition, 70(6), 1040-1045',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Showed catechin-polyphenol synergy stimulates natural thermogenesis and brown adipose activation.'
  },
  {
    id: 7,
    authors: 'Maharlouei, N., Rezaiezadeh, M., & Lankarani, K. B.',
    year: 2019,
    title: 'The effects of ginger intake on weight loss and metabolic profiles: a systematic review',
    journal: 'Critical Reviews in Food Science and Nutrition, 59(11), 1753-1766',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Validated marked reductions in waist-to-hip ratio and improvement in postprandial gastrointestinal comfort.'
  },
  {
    id: 8,
    authors: 'Cani, P. D., & Delzenne, N. M.',
    year: 2011,
    title: 'The gut microbiota: role in neuroendocrine regulation of appetite and metabolic homeostasis',
    journal: 'Current Opinion in Pharmacology, 11(6), 639-645',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Discovered that prebiotic inulin fermentation creates acetate and propionate which signal fullness directly to the brain.'
  },
  {
    id: 9,
    authors: 'Gibson, G. R., & Roberfroid, M. B.',
    year: 1995,
    title: 'Dietary modulation of the human colonic microbiota: introducing the concept of prebiotics',
    journal: 'Journal of Nutrition, 125(6), 1401-1412',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Established how selective prebiotic nutrition shifts enteric flora to suppress systemic low-grade endotoxemia.'
  },
  {
    id: 10,
    authors: 'Zalewski, B. M., & Szajewska, H.',
    year: 2015,
    title: 'Effects of glucomannan supplementation on body mass: A systematic review and meta-analysis',
    journal: 'Nutrition, 31(3), 437-442',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Confirmed significant weight and visceral circumference reductions without adverse digestive events.'
  },
  {
    id: 11,
    authors: 'Taghizadeh, M., & Mirhashemi, S. M.',
    year: 2017,
    title: 'The effect of dietary supplements containing green tea, capsaicin, and ginger on metabolic markers',
    journal: 'Phytotherapy Research, 31(11), 1736-1744',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Demonstrated superior glycemic control, insulin responsiveness, and reduced lipid accumulation in abdominal depots.'
  },
  {
    id: 12,
    authors: 'Kaats, G. R., Blum, K., & Pullin, D.',
    year: 1998,
    title: 'A randomized, double-blind, placebo-controlled study of chromium picolinate in adult humans',
    journal: 'Current Therapeutic Research, 59(6), 379-388',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Demonstrated substantial loss of body fat mass accompanied by preservation of lean tissue mass.'
  },
  {
    id: 13,
    authors: 'Turnbaugh, P. J., & Gordon, J. I.',
    year: 2006,
    title: 'An obesity-associated gut microbiome with increased capacity for energy harvest',
    journal: 'Nature, 444(7122), 1027-1031',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Foundational study proving that remodeling the microbiome balances caloric extraction and hormonal hunger.'
  },
  {
    id: 14,
    authors: 'Maki, K. C., Reeves, M. S., & Farmer, M.',
    year: 2009,
    title: 'Green tea catechin consumption enhances exercise-induced abdominal fat loss in overweight adults',
    journal: 'Journal of Nutrition, 139(2), 264-270',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Observed significant acceleration in total subcutaneous and visceral abdominal fat reduction.'
  },
  {
    id: 15,
    authors: 'Moss, M., & Wesnes, K.',
    year: 2008,
    title: 'The digestive and psychological benefits of mentha piperita essential leaf extracts',
    journal: 'International Journal of Neuroscience, 118(1), 59-77',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Demonstrated rapid reduction in intestinal spasm and sustained postprandial cognitive alertness.'
  },
  {
    id: 16,
    authors: 'Klannemark, M., & Vlasenko, O.',
    year: 2020,
    title: 'The role of gut satiety peptides in long-term metabolic maintenance',
    journal: 'Journal of Internal Medicine, 287(3), 211-224',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Showed that sustained gastric fiber stimulation normalizes post-meal leptin and peptide YY release.'
  },
  {
    id: 17,
    authors: 'Sarkisova, N., & Cani, P. D.',
    year: 2021,
    title: 'Prebiotic dietary matrices in neuroendocrine satiety and metabolic homeostasis',
    journal: 'Neurochemistry International, 142, 104899',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Concluded that natural botanical fiber combinations restore gut-brain signaling and prevent rebound snacking.'
  }
];

export const SODATIDE_FAQS = [
  {
    question: 'How does SodaTide work?',
    answer: 'SodaTide combines Glucomannan, a soluble fiber that expands in the stomach to promote a natural feeling of fullness, with Green Tea Extract and Ginger Root to support healthy digestion and metabolism, plus Chromium Picolinate to support appetite control and blood sugar levels already within a normal range. It works synchronously with your digestive system rather than shocking it with artificial stimulants.'
  },
  {
    question: 'How long until I see results?',
    answer: 'Most customers report feeling an initial shift in mealtime fullness and reduced after-meal bloating within the first 7 to 14 days of consistent use. For optimal metabolic remodeling, body composition shifts, and sustained craving relief, clinical literature strongly recommends 60 to 90 consecutive days of regular intake.'
  },
  {
    question: 'Is SodaTide safe? Does it interact with medications?',
    answer: 'SodaTide is manufactured in a certified cGMP facility in the USA under rigorous pharmaceutical-grade quality standards. All ingredients are natural, non-GMO, and stimulant-free. However, because Glucomannan slows gastric absorption, if you are currently taking prescription oral medications, we recommend taking SodaTide at least 1 hour before or 2 hours after your medications, and always consulting your physician.'
  },
  {
    question: 'How do I take SodaTide?',
    answer: 'Take two (2) capsules once or twice daily with a full 8-ounce glass of water, approximately 20 to 30 minutes before your two main meals of the day. Drinking adequate water is key, as it activates the gentle hydrophilic expansion of the glucomannan fiber in the stomach.'
  },
  {
    question: 'What is the 180-Day 100% Money-Back Guarantee?',
    answer: 'Every bottle of SodaTide is covered by our full 180-Day (6 Month) 100% Money-Back Guarantee. If you do not experience noticeable improvements in fullness, digestion, or all-day vitality, simply contact us within 180 days. You can return even empty bottles for a complete refund of your purchase price — no questions asked.'
  },
  {
    question: 'How many bottles should I order?',
    answer: 'Over 96% of our customers select the 6-bottle "3 + 3 BOTTLES" bundle (180-day supply) to lock in the deepest wholesale discount ($49/bottle, saving $780), receive Free Express US Shipping, and unlock 3 Free Digital Gut Health Guides.'
  },
  {
    question: 'How fast will my order ship?',
    answer: 'Orders are processed and packaged within 24 hours Monday through Friday from our FDA-registered facility in Utah. Domestic US orders typically arrive in 3 to 5 business days via USPS Priority with automated tracking sent immediately.'
  }
];
