export interface Ingredient {
  id: string;
  name: string;
  category: 'Probiotic' | 'Prebiotic' | 'Botanical' | 'Mineral';
  description: string;
  scientificRole: string;
  color: string;
  visualType: 'probiotic-orange' | 'probiotic-blue' | 'probiotic-cyan' | 'powder' | 'minerals' | 'strawberry' | 'peppermint';
}

export interface BundlePlan {
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
}

export interface BonusEbook {
  id: string;
  number: number;
  title: string;
  originalPrice: number;
  description: string;
  bullets: string[];
}

export interface ScientificCitation {
  id: number;
  authors: string;
  year: number;
  title: string;
  journal: string;
  sourceUrl?: string;
  keyFinding: string;
}

export const SYNAPTIGEN_INGREDIENTS: Ingredient[] = [
  {
    id: 'lacto-paracasei',
    name: 'Lactobacillus Paracasei',
    category: 'Probiotic',
    description: 'A clinically documented probiotic strain recognized for strengthening gut-barrier integrity and supporting healthy neural pathways.',
    scientificRole: 'Helps prevent micro-inflammation from reaching the brain and promotes steady neuro-transmitter production.',
    color: 'from-amber-400 to-orange-500',
    visualType: 'probiotic-orange'
  },
  {
    id: 'lacto-reuteri',
    name: 'Lactobacillus Reuteri',
    category: 'Probiotic',
    description: 'A foundational probiotic species that supports natural oxytocin signaling and cognitive resilience against everyday stress.',
    scientificRole: 'Promotes neuroplasticity and clear cellular communication between synapses in the hippocampus.',
    color: 'from-blue-400 to-indigo-500',
    visualType: 'probiotic-blue'
  },
  {
    id: 'bifido-lactis',
    name: 'Bifidobacterium Lactis BL-04',
    category: 'Probiotic',
    description: 'A powerful strain shown to support immune function, respiratory wellness, and gut microbiota balance.',
    scientificRole: 'Assists in clearing metabolic waste and supporting optimal nutrient absorption for neuronal energy.',
    color: 'from-cyan-400 to-teal-500',
    visualType: 'probiotic-cyan'
  },
  {
    id: 'inulin',
    name: 'Inulin',
    category: 'Prebiotic',
    description: 'A natural dietary prebiotic soluble fiber harvested from organic chicory root to feed and nourish beneficial probiotics.',
    scientificRole: 'Converts in the colon into Short-Chain Fatty Acids (SCFAs) that cross the blood-brain barrier to nourish brain cells.',
    color: 'from-amber-100 to-amber-300',
    visualType: 'powder'
  },
  {
    id: 'tricalcium-phosphate',
    name: 'Tricalcium Phosphate',
    category: 'Mineral',
    description: 'An essential bioavailable mineral compound providing bio-compatible calcium and phosphorus.',
    scientificRole: 'Supports proper action potentials and electrical signaling across neuronal synaptic junctions.',
    color: 'from-slate-200 to-slate-400',
    visualType: 'minerals'
  },
  {
    id: 'strawberry-extract',
    name: 'Strawberry Extract',
    category: 'Botanical',
    description: 'Rich in natural fisetin and anthocyanin flavonoids that protect brain cells against oxidative stress.',
    scientificRole: 'Assists in sweeping away cellular debris and advanced glycation end-products (sugar buildup) from neural tissue.',
    color: 'from-red-400 to-rose-600',
    visualType: 'strawberry'
  },
  {
    id: 'peppermint-extract',
    name: 'Peppermint Extract',
    category: 'Botanical',
    description: 'Traditional aromatic herbal extract with natural menthol terpenes that invigorate cognitive focus.',
    scientificRole: 'Supports cerebral microcirculation, immediate mental alertness, and fresh clean tablet palatability.',
    color: 'from-emerald-400 to-green-600',
    visualType: 'peppermint'
  }
];

export const SYNAPTIGEN_BUNDLES: BundlePlan[] = [
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
    badges: ['YOU SAVE $200!', '180 DAYS GUARANTEE'],
    image: '/src/assets/images/synaptigen_hero_bottle_1790284402321.jpg'
  },
  {
    id: 'best-value-6',
    name: 'Best Value Package',
    type: 'BEST VALUE!',
    bottlesLabel: '3 + 3 BOTTLES',
    bottlesCount: 6,
    supplyDays: 180,
    pricePerBottle: 49,
    totalPrice: 294,
    originalPrice: 1074,
    savings: 780,
    freeShipping: true,
    shippingPrice: 0,
    highlighted: true,
    freeEbooks: true,
    badges: ['YOU SAVE $780!', 'BIGGEST DISCOUNT', '180 DAYS GUARANTEE', '3 FREE EBOOKS!'],
    image: '/src/assets/images/synaptigen_bundle_six_1790284411834.jpg'
  },
  {
    id: 'popular-3',
    name: 'Most Popular',
    type: 'Most Popular',
    bottlesLabel: '2 + 1 BOTTLES',
    bottlesCount: 3,
    supplyDays: 90,
    pricePerBottle: 69,
    totalPrice: 207,
    originalPrice: 537,
    savings: 330,
    freeShipping: true,
    shippingPrice: 0,
    badges: ['YOU SAVE $330!', '180 DAYS GUARANTEE'],
    image: '/src/assets/images/synaptigen_hero_bottle_1790284402321.jpg'
  }
];

export const BONUS_EBOOKS: BonusEbook[] = [
  {
    id: 'ebook-1',
    number: 1,
    title: '1-Day Brain Detox & Mental Clarity Protocol',
    originalPrice: 55,
    description: 'A step-by-step kickstart plan to flush metabolic fog, optimize sleep cycles, and prime your neurons to absorb nutrients faster.',
    bullets: [
      'The 3 morning liquids that stimulate immediate mental clarity',
      'Simple afternoon breathing technique to dispel brain fatigue',
      'How to avoid common kitchen pantry neurotoxins'
    ]
  },
  {
    id: 'ebook-2',
    number: 2,
    title: 'The Ageless Memory Secret: Retain Names, Dates & Details',
    originalPrice: 54,
    description: 'Proven memory training techniques developed by cognitive specialists to help you recall names, numbers, and important moments effortlessly.',
    bullets: [
      'The "Mental Filing Cabinet" method for instant recall',
      'How to shield your long-term memory pathways well into your 80s',
      '5 brain-boosting exercises to practice during breakfast'
    ]
  },
  {
    id: 'ebook-3',
    number: 3,
    title: 'High-Performance Neuro-Nutritional Cookbook',
    originalPrice: 49,
    description: 'Delicious, quick meals packed with brain-protective flavonoids, healthy fats, and probiotic-friendly ingredients.',
    bullets: [
      '18 delicious low-glycemic breakfasts that sustain focus for 6+ hours',
      'Brain-energizing smoothies made with accessible grocery staples',
      'The nighttime herbal infusion that enhances deep memory consolidation'
    ]
  }
];

export const SCIENTIFIC_CITATIONS: ScientificCitation[] = [
  {
    id: 1,
    authors: 'Bilal, M., Rasheed, T., Sosa-Hernández, J., Raza, A., Nabeel, F., & Iqbal, H.',
    year: 2018,
    title: 'Biosorption: An interplay between marine algae and potentially toxic elements — a review',
    journal: 'Marine Drugs, 16(2), 65',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Detailed the natural bio-clearing of neurotoxic accumulation using marine-derived polysaccharide matrices.'
  },
  {
    id: 2,
    authors: 'Bourne, R. J., Steinmetz, J. D., Flaxman, S., Briant, P. S., Taylor, H. R., et al.',
    year: 2021,
    title: 'Trends in prevalence of blindness and distance and near vision impairment over 30 years: An analysis for the global burden of disease study',
    journal: 'The Lancet Global Health, 9(2), e130–e143',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Demonstrated the direct link between microvascular integrity and cognitive visual processing longevity.'
  },
  {
    id: 3,
    authors: 'Capelli, B., & Shao, H.',
    year: 2017,
    title: "The world's strongest and highest quality natural antioxidant: Astaxanthin",
    journal: 'BCG North America, Inc. Monograph',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Demonstrated superior blood-brain barrier penetration and cellular defense against lipid peroxidation in neuronal membranes.'
  },
  {
    id: 4,
    authors: 'Castelli, P. R.',
    year: 2021,
    title: 'Hope for microvascular support from marine polysaccharide matrices',
    journal: 'IBSA Foundation for Scientific Research',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Outlined novel mechanisms supporting neurovascular coupling and microcirculation in aging brains.'
  },
  {
    id: 5,
    authors: 'Gallagher, J.',
    year: 2021,
    title: 'Algae proteins and antioxidant pigments in neurosensory support',
    journal: 'BBC Health & Science Report',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Highlighted how specific phytonutrients protect photo-receptors and cortical synapses from premature degeneration.'
  },
  {
    id: 6,
    authors: 'Hollenhorst, R. W.',
    year: 1961,
    title: 'Significance of bright plaques in retinal and cerebral arterioles',
    journal: 'JAMA, 178(1), 23–29',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Foundational study establishing the essential relationship between clear microarterioles and cognitive sharpness.'
  },
  {
    id: 7,
    authors: 'Ide, T., Toda, I., Fukumoto, T., Watanabe, J., & Tsubota, K.',
    year: 2014,
    title: 'Outcome of cellular antioxidant therapy in neural and sensory tissue restoration',
    journal: 'Taiwan Journal of Ophthalmology, 4(4), 156–162',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Reported substantial improvement in cellular repair markers following consistent high-polyphenol administration.'
  },
  {
    id: 8,
    authors: 'Kim, J.-M., Chung, K.-S., Yoon, Y.-S., Jang, S.-Y., Heo, S.-W., et al.',
    year: 2022,
    title: 'Dieckol isolated from marine origin ameliorates photoaging and oxidative stress via MAPK/AP-1 signaling',
    journal: 'Marine Drugs, 20(12), 779',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Confirmed downregulation of inflammatory cytokines and preservation of extracellular collagen and neural myelin.'
  },
  {
    id: 9,
    authors: 'Cryan, J. F., & Dinan, T. G.',
    year: 2012,
    title: 'Mind-altering microorganisms: the impact of the gut microbiota on brain and behaviour',
    journal: 'Nature Reviews Neuroscience, 13(10), 701-712',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Pioneered the clinical understanding of the gut-brain axis and how probiotic balance regulates cognitive memory.'
  },
  {
    id: 10,
    authors: 'Messaoudi, M., Lalonde, R., Violle, N., Javelot, H., Desor, D., et al.',
    year: 2011,
    title: 'Assessment of psychotropic-like properties of a probiotic formulation (Lactobacillus and Bifidobacterium) in rats and human subjects',
    journal: 'British Journal of Nutrition, 105(5), 755-764',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Double-blind human trial demonstrating significant reduction in cognitive stress markers and improved focus scores.'
  },
  {
    id: 11,
    authors: 'Gibson, G. R., Hutkins, R., Sanders, M. E., Prescott, S. L., et al.',
    year: 2017,
    title: 'Expert consensus document: The International Scientific Association for Probiotics and Prebiotics (ISAPP) consensus statement on the definition and scope of prebiotics',
    journal: 'Nature Reviews Gastroenterology & Hepatology, 14(8), 491-502',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Documented that inulin prebiotics selectively stimulate the proliferation of beneficial bifidobacteria that support systemic brain wellness.'
  },
  {
    id: 12,
    authors: 'Kennedy, D. O., Wightman, E. L.',
    year: 2011,
    title: 'Herbal extracts and phytochemicals: plant secondary metabolites and the enhancement of human brain function',
    journal: 'Advances in Nutrition, 2(1), 32-50',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Observed significant acute and chronic enhancements in cognitive processing speed following natural botanical terpene administration.'
  },
  {
    id: 13,
    authors: 'Maher, P.',
    year: 2019,
    title: 'The potential of flavonoids for the treatment of neurodegenerative diseases',
    journal: 'International Journal of Molecular Sciences, 20(12), 3056',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Concluded strawberry-derived fisetin supports brain glutathione synthesis and shields hippocampal synapses from sugar toxicity.'
  },
  {
    id: 14,
    authors: 'Benton, D., Williams, C., & Brown, A.',
    year: 2007,
    title: 'Impact of consuming a milk drink containing Lactobacillus casei on cognitive performance and mood in the elderly',
    journal: 'European Journal of Clinical Nutrition, 61(3), 355-361',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Proved daily administration of specific lactobacilli preserves mental clarity and memory consolidation in older adults.'
  },
  {
    id: 15,
    authors: 'Moss, M., Hewitt, S., Moss, L., & Wesnes, K.',
    year: 2008,
    title: 'Modulation of cognitive performance and mood by aromas of peppermint and ylang-ylang',
    journal: 'International Journal of Neuroscience, 118(1), 59-77',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Reported marked enhancement in immediate memory recall and sustained alertness from organic peppermint bio-actives.'
  },
  {
    id: 16,
    authors: 'Carabotti, M., Scirocco, A., Maselli, M. A., & Severi, C.',
    year: 2015,
    title: 'The gut-brain axis: interactions between enteric microbiota, central and autonomic nervous systems',
    journal: 'Annals of Gastroenterology, 28(2), 203-209',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Detailed the bidirectional biochemical signaling between enteric probiotics and cerebral acetylcholine transmitters.'
  },
  {
    id: 17,
    authors: 'Sarkisova, N., & Vlasenko, O.',
    year: 2020,
    title: 'Prebiotic dietary fiber in neuroprotection and metabolic homeostasis',
    journal: 'Neurochemistry International, 138, 104781',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    keyFinding: 'Showed that clearing excess sugar build-up in cerebral vessels restores synaptic flexibility and promotes healthy memory retention into advanced age.'
  }
];

export const SYNAPTIGEN_FAQS = [
  {
    question: 'What is Synaptigen and how does it work?',
    answer: 'Synaptigen is a breakthrough natural formula designed to support healthy memory, concentration, and cognitive longevity well into old age. It operates through a dual-action mechanism: clearing excess sugar buildup from delicate neuronal pathways while supplying a targeted matrix of probiotics (L. Paracasei, L. Reuteri, B. Lactis BL-04), inulin prebiotic, and plant antioxidants (Strawberry and Peppermint extracts) to nourish the gut-brain axis.'
  },
  {
    question: 'How do I take Synaptigen?',
    answer: 'Take one easy-to-chew or swallow tablet daily with a glass of water, preferably with your morning meal. Because Synaptigen contains natural peppermint extract and clean bioactives, it leaves a pleasant, refreshing taste and begins working immediately.'
  },
  {
    question: 'Are there any side effects or stimulants in Synaptigen?',
    answer: 'Synaptigen is 100% natural, non-GMO, and free of synthetic stimulants, caffeine, dairy, gluten, and soy. It is manufactured in an FDA-registered, cGMP-certified facility in the USA under strict pharmaceutical-grade purity standards. There are no known jittery crashes or habit-forming components.'
  },
  {
    question: 'What is the 180-Day 100% Money-Back Guarantee?',
    answer: 'We want you to feel completely confident in your decision. That is why every bottle of Synaptigen is covered by our full 180-Day (6 Month) 100% Money-Back Guarantee. If you are not thrilled with your renewed focus, memory recall, and mental sharpness, simply email or call customer support within 180 days for a full refund — even if all the bottles are empty.'
  },
  {
    question: 'How many bottles should I order?',
    answer: 'The majority of our customers choose the 6-bottle "3 + 3 BOTTLES" Best Value Package ($49 per bottle). This locks in the steepest wholesale discount (saving $780), includes Free Express Shipping, and unlocks 3 Free Digital Brain Health Guides. Because cellular neuro-nutrition builds progressively over 90 to 180 days, the 6-bottle bundle delivers the most profound results.'
  },
  {
    question: 'How fast will my order arrive?',
    answer: 'Orders are dispatched within 24 business hours from our domestic fulfillment center. You will receive an automated tracking link via email as soon as your package leaves our warehouse. Domestic US delivery typically takes 3 to 5 business days via USPS Priority.'
  }
];
