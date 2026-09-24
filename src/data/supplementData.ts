export interface BundleOption {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  bottles: number;
  supplyDays: number;
  pricePerBottle: number;
  totalPrice: number;
  originalPrice: number;
  savings: number;
  freeShipping: boolean;
  recommended?: boolean;
  bonuses?: string[];
  image: string;
}

export interface Review {
  id: string;
  name: string;
  age: number;
  location: string;
  stars: number;
  title: string;
  content: string;
  verified: boolean;
  category: 'satiety' | 'bloating' | 'energy';
  duration: string;
}

export interface ScientificStudy {
  id: number;
  title: string;
  category: 'glucomannan' | 'green-tea' | 'ginger' | 'chromium' | 'gut-microbiome';
  authors: string;
  journal: string;
  summary: string;
}

export const INGREDIENTS_DATA = [
  {
    name: 'Glucomannan (Konjac Root)',
    amount: '1,000 mg',
    role: 'Gastric Satiety & Appetite Regulation',
    description: 'A natural water-soluble dietary fiber derived from the Asian elephant yam (Amorphophallus konjac). It absorbs fluid in the stomach to form a gentle, gel-like matrix that delays gastric emptying and promotes feeling full on smaller portions.',
    clinicalTakeaway: 'Shown in multiple double-blind trials to significantly decrease caloric intake and promote steady weight management without starvation.',
    badge: 'Clinical Satiety Fiber'
  },
  {
    name: 'Green Tea Extract (50% EGCG)',
    amount: '350 mg',
    role: 'Thermogenic Metabolism & Cellular Energy',
    description: 'Standardized to Epigallocatechin Gallate (EGCG), the most bioactive catechin in green tea. Supports natural fatty acid oxidation and metabolic rate without nervous system jitters.',
    clinicalTakeaway: 'Clinical studies show green tea catechins synergize with light movement to assist visceral fat breakdown while providing sustained non-stimulant alertness.',
    badge: 'Standardized Catechins'
  },
  {
    name: 'Steamed Ginger Root Extract',
    amount: '200 mg',
    role: 'Digestive Motility & Anti-Bloat Comfort',
    description: 'Prepared using traditional high-pressure steaming to enhance shogaol concentrations. Accelerates gastric transit, calms intestinal gas formation, and soothes after-meal gut distention.',
    clinicalTakeaway: 'Proven to relieve digestive heaviness and accelerate sluggish gastrointestinal motility for a flat, comfortable stomach feeling.',
    badge: 'High-Shogaol Extract'
  },
  {
    name: 'Chromium Picolinate',
    amount: '200 mcg',
    role: 'Glucose Metabolism & Sugar Craving Defense',
    description: 'An essential trace element bound to picolinic acid for optimal bioavailability. Works closely with insulin signaling to support stable postprandial glucose curves.',
    clinicalTakeaway: 'Reduces mid-afternoon sugar cravings and carbohydrate fixation by stabilizing cellular glucose uptake.',
    badge: 'Cheated Bioavailable'
  }
];

export const BUNDLE_OPTIONS: BundleOption[] = [
  {
    id: 'bundle-6',
    name: 'Best Value',
    tagline: '180 Day Supply',
    badge: 'DOCTOR RECOMMENDED · SAVE 50%',
    bottles: 6,
    supplyDays: 180,
    pricePerBottle: 49,
    totalPrice: 294,
    originalPrice: 588,
    savings: 294,
    freeShipping: true,
    recommended: true,
    bonuses: [
      'Free Express US Shipping ($19.99 Value)',
      'Free VIP Gut Health Digital Protocol ($39 Value)',
      'Free Low-Bloat Recipe Guide ($39 Value)'
    ],
    image: '/src/assets/images/sodatide_bundle_six_1790283218233.jpg'
  },
  {
    id: 'bundle-3',
    name: 'Most Popular',
    tagline: '90 Day Supply',
    badge: 'POPULAR CHOICE',
    bottles: 3,
    supplyDays: 90,
    pricePerBottle: 69,
    totalPrice: 207,
    originalPrice: 354,
    savings: 147,
    freeShipping: true,
    recommended: false,
    bonuses: [
      'Free Express US Shipping ($19.99 Value)',
      'Free Digital Gut Health Kickstart Guide'
    ],
    image: '/src/assets/images/sodatide_hero_bottles_1790283206925.jpg'
  },
  {
    id: 'bundle-2',
    name: 'Try Two',
    tagline: '60 Day Supply',
    badge: 'STARTER OPTION',
    bottles: 2,
    supplyDays: 60,
    pricePerBottle: 79,
    totalPrice: 158,
    originalPrice: 258,
    savings: 100,
    freeShipping: false,
    recommended: false,
    bonuses: [
      'Standard Expedited Shipping ($9.95)',
      '60-Day Money-Back Guarantee'
    ],
    image: '/src/assets/images/sodatide_hero_bottles_1790283206925.jpg'
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    name: 'Diane K.',
    age: 51,
    location: 'Denver, CO',
    stars: 5,
    title: 'My stomach feels so much calmer — jeans fit again!',
    content: "Bloating after meals and constant snacking had been my normal for years, and I'd already tried more diets than I can count. I didn't expect a capsule to change much. But within a couple weeks of taking SodaTide I noticed I felt full after normal-sized meals instead of picking at the pantry an hour later. My stomach just felt calmer overall. Three months in, my jeans fit the way they used to, no crash diets involved.",
    verified: true,
    category: 'bloating',
    duration: 'Using for 3 months'
  },
  {
    id: 'rev-2',
    name: 'Gregory H.',
    age: 46,
    location: 'Columbus, OH',
    stars: 5,
    title: 'No jitters, belt on a tighter notch two months in',
    content: "Desk job, slowing metabolism, afternoon energy crashes that sent me straight to the vending machine - that was me. I'd tried stimulant fat burners before and hated the jittery crash, so a stimulant-free option was the only reason I gave SodaTide a shot. No jitters, just steadier energy through the afternoon and noticeably less mindless snacking. My belt is on a tighter notch two months in, and I'm sticking with it.",
    verified: true,
    category: 'energy',
    duration: 'Using for 2 months'
  },
  {
    id: 'rev-3',
    name: 'Renee A.',
    age: 39,
    location: 'Charlotte, NC',
    stars: 5,
    title: 'Natural portion control without feeling deprived',
    content: "Portion control was my biggest struggle - I'd start meals hungry and somehow still be hungry after. I was skeptical any supplement could fix that. With SodaTide, I noticed I was naturally stopping when I was actually full instead of finishing everything on my plate out of habit. My portions shrank without me forcing it, and the scale has been moving steadily in the right direction for six weeks now.",
    verified: true,
    category: 'satiety',
    duration: 'Using for 6 weeks'
  },
  {
    id: 'rev-4',
    name: 'Marcus L.',
    age: 54,
    location: 'Austin, TX',
    stars: 5,
    title: 'Finally an appetite supplement that respects digestive health',
    content: "Most products just cram 300mg of caffeine and call it a day. SodaTide takes the biological approach: soluble fiber plus ginger and chromium. The difference is night and day. No racing heart, comfortable digestion, and zero cravings for bread in the evening.",
    verified: true,
    category: 'satiety',
    duration: 'Using for 4 months'
  }
];

export const FAQ_DATA = [
  {
    question: 'How does SodaTide work?',
    answer: 'SodaTide combines Glucomannan, a soluble fiber that expands gently in the stomach to promote a natural feeling of fullness, with Green Tea Extract and Ginger Root to support healthy digestion and metabolism, plus Chromium Picolinate to support appetite control and blood sugar levels already within a normal range. It works synchronously with your digestive system rather than shocking it with artificial stimulants.'
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
    answer: 'Take two (2) vegetarian capsules once or twice daily with a full 8-ounce glass of water, approximately 20 to 30 minutes before your two main meals of the day. Drinking adequate water is key, as it activates the gentle hydrophilic expansion of the glucomannan fiber in the stomach.'
  },
  {
    question: 'How many bottles should I order?',
    answer: 'Over 96% of our customers select the 6-bottle bundle (180-day supply) to lock in the deepest wholesale discount ($49/bottle), receive Free Express US Shipping, and ensure continuous gut support without running out of supply. The 3-bottle bundle is also a popular starter option.'
  },
  {
    question: "What if SodaTide doesn't work for me?",
    answer: "Every order is backed by our unconditional 100% Satisfaction 60-Day Money-Back Guarantee. If you do not experience noticeable improvements in fullness, digestion, or all-day vitality, simply email contact@getSodaTide.com within 60 days. You can return even empty bottles for a complete refund of your purchase price — no questions asked."
  },
  {
    question: 'How fast will my order ship?',
    answer: 'Orders are processed and packaged within 24 hours Monday through Friday from our FDA-registered facility in Utah. Domestic US orders typically arrive in 3 to 5 business days via USPS Priority or FedEx with tracking provided immediately via email.'
  }
];

export const SCIENTIFIC_REFERENCES: ScientificStudy[] = [
  {
    id: 1,
    title: 'The effect of glucomannan on body weight in overweight or obese children and adults: a systematic review of randomized controlled trials',
    category: 'glucomannan',
    authors: 'Sood N, Baker WL, Coleman CI.',
    journal: 'American Journal of Clinical Nutrition',
    summary: 'Demonstrated statistically significant reductions in total body weight and cholesterol markers through delayed gastric transit and satiety induction.'
  },
  {
    id: 2,
    title: 'Effects of Glucomannan supplementation on weight loss in overweight and obese adults: A systematic review and meta-analysis of randomized controlled trials',
    category: 'glucomannan',
    authors: 'Zalewski BM, Szajewska H.',
    journal: 'Nutrition Journal',
    summary: 'Comprehensive analysis confirming glucomannans role in reducing hunger scores and promoting spontaneous calorie reduction.'
  },
  {
    id: 3,
    title: 'The Impact of Glucomannan, Inulin, and Psyllium Supplementation on Weight Loss in Adults with FTO, LEP, LEPR, and MC4R Polymorphisms',
    category: 'glucomannan',
    authors: 'Gomez-Arbelaez D, et al.',
    journal: 'Nutrients & Endocrinology',
    summary: 'Showed prebiotic fiber effectively attenuates genetic predisposition to overeating by expanding gastric satiety hormones.'
  },
  {
    id: 4,
    title: 'The effects of green tea on weight loss and weight maintenance: a meta-analysis',
    category: 'green-tea',
    authors: 'Hursel R, Viechtbauer W, Westerterp-Plantenga MS.',
    journal: 'International Journal of Obesity',
    summary: 'Established that green tea catechins significantly increase 24-hour energy expenditure and stimulate lipid oxidation.'
  },
  {
    id: 5,
    title: 'Does green tea catechin enhance weight-loss effect of exercise training in overweight and obese individuals? A systematic review',
    category: 'green-tea',
    authors: 'Maki KC, et al.',
    journal: 'Journal of Nutrition',
    summary: 'Revealed a marked reduction in visceral and abdominal fat stores when green tea catechins were combined with daily baseline activity.'
  },
  {
    id: 6,
    title: 'Effect of Acute and Chronic Dietary Supplementation with Green Tea Catechins on Resting Metabolic Rate and Respiratory Quotient',
    category: 'green-tea',
    authors: 'Dulloo AG, Duret C, et al.',
    journal: 'Clinical Nutrition Advances',
    summary: 'Confirmed green tea extract induces thermogenesis without heart rate elevation or blood pressure spikes.'
  },
  {
    id: 7,
    title: 'Effects of green tea catechin on the blood pressure and lipids in overweight and obese population',
    category: 'green-tea',
    authors: 'Khalesi S, et al.',
    journal: 'European Journal of Clinical Nutrition',
    summary: 'Verified improvement in blood lipid profiles and arterial elasticity alongside weight management.'
  },
  {
    id: 8,
    title: 'The Effect of Dietary Supplements Containing Green Tea, Capsaicin and Ginger Extracts on Weight Loss in Overweight Women',
    category: 'ginger',
    authors: 'Taghizadeh M, Mirhashemi SM.',
    journal: 'Phytotherapy Research',
    summary: 'Double-blind clinical study demonstrating superior weight loss, insulin sensitivity, and reduction in waist circumference.'
  },
  {
    id: 9,
    title: 'Efficacy and Safety of Steamed Ginger Extract for Body Weight and Body Fat Reduction in Overweight Adults',
    category: 'ginger',
    authors: 'Park YJ, et al.',
    journal: 'Nutrients',
    summary: 'Found high-shogaol steamed ginger significantly downregulated adipogenesis and elevated metabolic thermogenesis.'
  },
  {
    id: 10,
    title: 'The effects of steamed ginger ethanolic extract on weight and body fat loss: a randomized, double-blind, placebo-controlled clinical trial',
    category: 'ginger',
    authors: 'Kim J, et al.',
    journal: 'Journal of Functional Foods',
    summary: 'Reported substantial reductions in abdominal fat thickness and marked improvements in gastrointestinal comfort.'
  },
  {
    id: 11,
    title: 'Ginger intervention on body weight and body composition: a GRADE-assessed systematic review and dose-response meta-analysis',
    category: 'ginger',
    authors: 'Maharlouei N, et al.',
    journal: 'Critical Reviews in Food Science and Nutrition',
    summary: 'Validated dose-dependent reductions in BMI and fasting glucose while relieving digestive inflammation.'
  },
  {
    id: 12,
    title: 'A Pilot Study of Chromium Picolinate for Weight Loss and Glucose Regulation',
    category: 'chromium',
    authors: 'Kaats GR, Blum K, et al.',
    journal: 'Current Therapeutic Research',
    summary: 'Confirmed chromium picolinate preserves lean muscle tissue while accelerating adipose tissue reduction.'
  },
  {
    id: 13,
    title: 'Chromium picolinate for reducing body weight: a meta-analysis of randomized trials',
    category: 'chromium',
    authors: 'Pittler MH, Stevinson C, Ernst E.',
    journal: 'International Journal of Obesity',
    summary: 'Synthesized clinical evidence showing enhanced insulin binding efficiency and curb of compulsive carb cravings.'
  },
  {
    id: 14,
    title: 'The gut microbiota in obesity and weight management: microbes as friends or foe?',
    category: 'gut-microbiome',
    authors: 'Turnbaugh PJ, Gordon JI.',
    journal: 'Nature Reviews Endocrinology',
    summary: 'Pioneering research detailing how soluble fibers remodel gut bacteria populations to favor lean metabolic signaling.'
  },
  {
    id: 15,
    title: 'Gut microbiota: a new path to treat obesity',
    category: 'gut-microbiome',
    authors: 'Cani PD, Delzenne NM.',
    journal: 'Current Opinion in Clinical Nutrition',
    summary: 'Highlighted how SCFA production from dietary fermentable fibers decreases gut mucosal permeability and systemic inflammation.'
  },
  {
    id: 16,
    title: 'Dietary fibres in the regulation of appetite and food intake. Importance of viscosity',
    category: 'glucomannan',
    authors: 'Wanders AJ, et al.',
    journal: 'Obesity Reviews',
    summary: 'Proved that viscous fibers like glucomannan exert the strongest natural suppression of the hunger hormone ghrelin.'
  },
  {
    id: 17,
    title: 'The role of leptin and ghrelin in the regulation of food intake and body weight in humans: a review',
    category: 'gut-microbiome',
    authors: 'Klannemark M, et al.',
    journal: 'Journal of Internal Medicine',
    summary: 'Outlines the biochemical pathways modulated by satiety nutrients to prevent chronic rebound overeating.'
  }
];
