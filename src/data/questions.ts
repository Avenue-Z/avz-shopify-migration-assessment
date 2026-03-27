import { Question } from '@/lib/types';

export const questions: Question[] = [
  // ════════════════════════════════════════════════════════════════
  // Section 1: Company + Commerce Profile
  // ════════════════════════════════════════════════════════════════
  {
    id: 'Q2',
    number: 2,
    section: 1,
    text: 'What is your website URL?',
    type: 'website',
  },
  {
    id: 'Q3',
    number: 3,
    section: 1,
    text: 'Which best describes your business model?',
    type: 'single_select',
    options: ['DTC', 'B2B', 'Hybrid DTC + B2B', 'Wholesale', 'Marketplace', 'Other'],
    required: true,
    scoring: {
      type: 'single_select',
      category: 'shopify_fit',
      scores: {
        'DTC': 2,
        'Hybrid DTC + B2B': 2,
        'B2B': 1,
        'Wholesale': 1,
        'Marketplace': 1,
        'Other': 0,
      },
    },
  },
  {
    id: 'Q4',
    number: 4,
    section: 1,
    text: 'What platform are you on today?',
    type: 'single_select',
    options: [
      'Magento / Adobe Commerce',
      'WooCommerce',
      'BigCommerce',
      'Salesforce Commerce Cloud',
      'SAP Commerce',
      'Custom platform',
      'Shopify already',
      'Other',
    ],
    required: true,
  },
  {
    id: 'Q5',
    number: 5,
    section: 1,
    text: 'What is your approximate annual ecommerce revenue?',
    type: 'single_select',
    options: ['Under $1M', '$1M–$5M', '$5M–$20M', '$20M–$100M', '$100M+', 'Prefer not to say'],
  },
  {
    id: 'Q6',
    number: 6,
    section: 1,
    text: 'Roughly how many active SKUs do you manage?',
    type: 'single_select',
    options: ['Fewer than 100', '100–1,000', '1,000–10,000', '10,000–50,000', '50,000+'],
    required: true,
    scoring: {
      type: 'single_select',
      category: 'complexity',
      scores: {
        '50,000+': 2,
        '10,000–50,000': 1,
        '1,000–10,000': 1,
        '100–1,000': 0,
        'Fewer than 100': 0,
      },
    },
  },
  {
    id: 'Q7',
    number: 7,
    section: 1,
    text: 'How many regions, storefronts, or languages do you support?',
    type: 'single_select',
    options: [
      'One market only',
      'Multiple regions one storefront',
      'Multiple storefronts',
      'Multiple languages/currencies',
      'Complex global setup',
    ],
    required: true,
    scoring: {
      type: 'single_select',
      category: 'complexity',
      scores: {
        'Complex global setup': 2,
        'Multiple storefronts': 1,
        'Multiple languages/currencies': 1,
        'Multiple regions one storefront': 1,
        'One market only': 0,
      },
    },
  },

  // ════════════════════════════════════════════════════════════════
  // Section 2: Why Migrate Now?
  // ════════════════════════════════════════════════════════════════
  {
    id: 'Q8',
    number: 8,
    section: 2,
    text: 'What is driving interest in Shopify?',
    type: 'multi_select',
    options: [
      'Agentic Commerce',
      'Lower maintenance costs',
      'Better site speed',
      'Easier merchandising/content updates',
      'Better conversion performance',
      'Simpler integrations',
      'International expansion',
      'Better checkout experience',
      'Better app ecosystem',
      'Replatforming pressure from current platform',
      'Other',
    ],
    scoring: {
      type: 'multi_select',
      category: 'shopify_fit',
      scorableCount: 10,
      excludedOptions: ['Other'],
    },
  },
  {
    id: 'Q9',
    number: 9,
    section: 2,
    text: 'What are your top 3 goals?',
    type: 'ranking',
    rankingItems: [
      'Increase conversion rate',
      'Increase revenue',
      'Improve site speed',
      'Improve marketer autonomy',
      'Reduce dev dependency',
      'Expand internationally',
      'Improve operations',
      'Reduce total cost of ownership',
    ],
  },
  {
    id: 'Q10',
    number: 10,
    section: 2,
    text: 'Do you have a target launch window?',
    type: 'single_select',
    options: ['0–3 months', '3–6 months', '6–12 months', '12+ months', 'Just exploring'],
    required: true,
    scoring: {
      type: 'single_select',
      category: 'migration_readiness',
      scores: {
        '0–3 months': 2,
        '3–6 months': 2,
        '6–12 months': 1,
        '12+ months': 0,
        'Just exploring': 0,
      },
    },
  },
  {
    id: 'Q11',
    number: 11,
    section: 2,
    text: 'Who is sponsoring this initiative internally?',
    type: 'single_select',
    options: [
      'CEO / Founder',
      'Ecommerce leadership',
      'Marketing leadership',
      'IT / Engineering',
      'Operations',
      'No clear sponsor yet',
    ],
    required: true,
    scoring: {
      type: 'single_select',
      category: 'shopify_fit',
      scores: {
        'CEO / Founder': 2,
        'Ecommerce leadership': 2,
        'Marketing leadership': 1,
        'IT / Engineering': 1,
        'Operations': 1,
        'No clear sponsor yet': 0,
      },
    },
  },

  // ════════════════════════════════════════════════════════════════
  // Section 3: Current Platform Pain Points
  // ════════════════════════════════════════════════════════════════
  {
    id: 'Q12',
    number: 12,
    section: 3,
    text: 'How difficult is it to make routine site updates today?',
    type: 'opinion_scale',
    scaleLabels: { low: 'Very easy', high: 'Very difficult' },
    required: true,
    scoring: {
      type: 'opinion_scale',
      category: 'shopify_fit',
      high: [4, 5],  // 2 pts — difficult = good Shopify fit
      mid: [3],       // 1 pt
      low: [1, 2],    // 0 pts — easy = less motivation to switch
    },
  },
  {
    id: 'Q13',
    number: 13,
    section: 3,
    text: 'Which current pain points apply?',
    type: 'multi_select',
    options: [
      'Slow page speed',
      'Hard to launch campaigns',
      'Too much developer dependency',
      'Checkout limitations',
      'Search / filtering issues',
      'Poor mobile UX',
      'Promotion / discount limitations',
      'Integration issues',
      'Reporting / analytics gaps',
      'Frequent bugs / outages',
    ],
    scoring: {
      type: 'multi_select',
      category: 'shopify_fit',
      scorableCount: 10,
      excludedOptions: [],
    },
  },
  {
    id: 'Q14',
    number: 14,
    section: 3,
    text: 'How satisfied are you with your current checkout experience?',
    type: 'opinion_scale',
    scaleLabels: { low: 'Very dissatisfied', high: 'Very satisfied' },
    required: true,
    scoring: {
      type: 'opinion_scale',
      category: 'shopify_fit',
      high: [1, 2],  // 2 pts — dissatisfied = good Shopify fit (inverted)
      mid: [3],       // 1 pt
      low: [4, 5],    // 0 pts — satisfied = less reason to switch
    },
  },
  {
    id: 'Q15',
    number: 15,
    section: 3,
    text: 'How often does your current platform slow down business execution?',
    type: 'single_select',
    options: ['Rarely', 'Monthly', 'Weekly', 'Daily', 'Constantly'],
    required: true,
    scoring: {
      type: 'single_select',
      category: 'shopify_fit',
      scores: {
        'Constantly': 2,
        'Daily': 2,
        'Weekly': 1,
        'Monthly': 1,
        'Rarely': 0,
      },
    },
  },

  // ════════════════════════════════════════════════════════════════
  // Section 4: Catalog Complexity
  // ════════════════════════════════════════════════════════════════
  {
    id: 'Q16',
    number: 16,
    section: 4,
    text: 'How would you describe your catalog?',
    type: 'single_select',
    options: [
      'Simple catalog',
      'Moderate variants/options',
      'Large catalog with advanced rules',
      'Highly complex/custom catalog',
    ],
    required: true,
    scoring: {
      type: 'single_select',
      category: 'complexity',
      scores: {
        'Highly complex/custom catalog': 2,
        'Large catalog with advanced rules': 1,
        'Moderate variants/options': 1,
        'Simple catalog': 0,
      },
    },
  },
  {
    id: 'Q17',
    number: 17,
    section: 4,
    text: 'Do you currently sell any of the following?',
    type: 'multi_select',
    options: [
      'Bundles / kits',
      'Subscriptions',
      'Personalized products',
      'Configurable products',
      'Preorders / backorders',
      'Gift cards',
      'B2B pricing',
      'None of the above',
    ],
    scoring: {
      type: 'multi_select',
      category: 'complexity',
      scorableCount: 7,
      excludedOptions: ['None of the above'],
    },
  },
  {
    id: 'Q18',
    number: 18,
    section: 4,
    text: 'Do you need advanced merchandising features?',
    type: 'multi_select',
    options: [
      'Faceted filtering',
      'Nested filtering',
      'Dynamic collections',
      'Search boosting / burying',
      'Product recommendations',
      'Multi-catalog structure',
      'Region-specific assortment',
      'None',
    ],
    scoring: {
      type: 'multi_select',
      category: 'complexity',
      scorableCount: 7,
      excludedOptions: ['None'],
    },
  },

  // ════════════════════════════════════════════════════════════════
  // Section 5: Content + SEO Readiness
  // ════════════════════════════════════════════════════════════════
  {
    id: 'Q19',
    number: 19,
    section: 5,
    text: 'How important is organic search to your ecommerce revenue?',
    type: 'single_select',
    options: ['Low', 'Moderate', 'High', 'Critical'],
  },
  {
    id: 'Q20',
    number: 20,
    section: 5,
    text: 'Which SEO/content assets do you already have prepared?',
    type: 'multi_select',
    options: [
      'Redirect map',
      'Metadata inventory',
      'Content inventory',
      'Sitemap',
      'Top landing page list',
      'Structured data plan',
      'None of the above',
    ],
    scoring: {
      type: 'multi_select',
      category: 'definition_confidence',
      scorableCount: 6,
      excludedOptions: ['None of the above'],
    },
  },
  {
    id: 'Q21',
    number: 21,
    section: 5,
    text: 'How much content would need to be migrated?',
    type: 'single_select',
    options: ['Minimal', 'Moderate', 'Large amount', 'Unsure'],
    required: true,
    scoring: {
      type: 'single_select',
      category: 'complexity',
      scores: {
        'Large amount': 2,
        'Moderate': 1,
        'Minimal': 0,
        'Unsure': 1,
      },
    },
  },
  {
    id: 'Q22',
    number: 22,
    section: 5,
    text: 'Who manages website content today?',
    type: 'single_select',
    options: [
      'Marketing team',
      'Ecommerce team',
      'IT / Dev team',
      'Agency / partner',
      'Shared ownership',
    ],
    required: true,
    scoring: {
      type: 'single_select',
      category: 'definition_confidence',
      scores: {
        'Marketing team': 2,
        'Ecommerce team': 2,
        'IT / Dev team': 1,
        'Agency / partner': 1,
        'Shared ownership': 1,
      },
    },
  },

  // ════════════════════════════════════════════════════════════════
  // Section 6: Integrations + Systems
  // ════════════════════════════════════════════════════════════════
  {
    id: 'Q23',
    number: 23,
    section: 6,
    text: 'Which systems must connect to Shopify?',
    type: 'multi_select',
    options: [
      'ERP',
      'OMS',
      'PIM',
      'CRM',
      'ESP / marketing automation',
      'Loyalty',
      'Reviews',
      'Subscription platform',
      'Search / personalization',
      'Tax engine',
      'Fraud tools',
      '3PL / WMS',
      'CDP / analytics',
      'Other',
    ],
    scoring: {
      type: 'multi_select',
      category: 'complexity',
      scorableCount: 13,
      excludedOptions: ['Other'],
    },
  },
  {
    id: 'Q24',
    number: 24,
    section: 6,
    text: 'How would you describe your current integration environment overall?',
    type: 'single_select',
    options: [
      'Mostly native / app-based integrations',
      'Mix of native middleware and custom integrations',
      'Mostly custom API integrations',
      'Heavy middleware / iPaaS reliance',
      'Significant manual processes',
      'Not sure',
    ],
    required: true,
    scoring: {
      type: 'single_select',
      category: 'complexity',
      scores: {
        'Mostly custom API integrations': 2,
        'Heavy middleware / iPaaS reliance': 2,
        'Mix of native middleware and custom integrations': 1,
        'Significant manual processes': 1,
        'Not sure': 1,
        'Mostly native / app-based integrations': 0,
      },
    },
  },
  {
    id: 'Q25',
    number: 25,
    section: 6,
    text: 'Are there mission-critical custom workflows that must be preserved?',
    type: 'single_select',
    options: ['Yes', 'No', 'Unsure'],
    required: true,
    scoring: {
      type: 'single_select',
      category: 'definition_confidence',
      scores: {
        'Yes': 2,
        'No': 2,
        'Unsure': 0,
      },
    },
  },
  {
    id: 'Q26',
    number: 26,
    section: 6,
    text: 'How confident are you in your product, customer, and order data quality?',
    type: 'opinion_scale',
    scaleLabels: { low: 'Low confidence', high: 'High confidence' },
    required: true,
    scoring: {
      type: 'opinion_scale',
      category: 'definition_confidence',
      high: [4, 5],  // 2 pts
      mid: [3],       // 1 pt
      low: [1, 2],    // 0 pts
    },
  },

  // ════════════════════════════════════════════════════════════════
  // Section 7: Operations + Fulfillment
  // ════════════════════════════════════════════════════════════════
  {
    id: 'Q27',
    number: 27,
    section: 7,
    text: 'How complex is your fulfillment setup?',
    type: 'single_select',
    options: [
      'Single warehouse',
      'Multiple warehouses',
      '3PL-managed',
      'International / multi-node',
      'Very complex hybrid model',
    ],
    required: true,
    scoring: {
      type: 'single_select',
      category: 'complexity',
      scores: {
        'Very complex hybrid model': 2,
        'International / multi-node': 2,
        'Multiple warehouses': 1,
        '3PL-managed': 1,
        'Single warehouse': 0,
      },
    },
  },
  {
    id: 'Q28',
    number: 28,
    section: 7,
    text: 'Which operational requirements apply?',
    type: 'multi_select',
    options: [
      'International shipping',
      'Split shipments',
      'Store pickup / BOPIS',
      'Returns portal',
      'Subscription fulfillment',
      'Wholesale ordering',
      'Marketplace fulfillment',
      'None of the above',
    ],
    scoring: {
      type: 'multi_select',
      category: 'complexity',
      scorableCount: 7,
      excludedOptions: ['None of the above'],
    },
  },
  {
    id: 'Q29',
    number: 29,
    section: 7,
    text: 'Where does inventory truth live today?',
    type: 'single_select',
    options: ['Ecommerce platform', 'ERP', 'OMS', 'WMS / 3PL', 'Multiple systems', 'Not sure'],
    required: true,
    scoring: {
      type: 'single_select',
      category: 'complexity',
      scores: {
        'Multiple systems': 2,
        'ERP': 1,
        'OMS': 1,
        'WMS / 3PL': 1,
        'Not sure': 1,
        'Ecommerce platform': 0,
      },
    },
  },
  {
    id: 'Q30',
    number: 30,
    section: 7,
    text: 'Are fulfillment or returns pain points affecting customer experience?',
    type: 'single_select',
    options: ['Yes significantly', 'Somewhat', 'Not really', 'Unsure'],
    required: true,
    scoring: {
      type: 'single_select',
      category: 'complexity',
      scores: {
        'Yes significantly': 2,
        'Somewhat': 1,
        'Not really': 0,
        'Unsure': 1,
      },
    },
  },

  // ════════════════════════════════════════════════════════════════
  // Section 8: Checkout + Payments + Compliance
  // ════════════════════════════════════════════════════════════════
  {
    id: 'Q31',
    number: 31,
    section: 8,
    text: 'Which payment complexity applies?',
    type: 'multi_select',
    options: [
      'Multiple gateways',
      'Local payment methods',
      'Multi-currency',
      'Buy now pay later',
      'Subscription payments',
      'PO / net terms for B2B',
      'Minimal complexity',
    ],
    scoring: {
      type: 'multi_select',
      category: 'complexity',
      scorableCount: 6,
      excludedOptions: ['Minimal complexity'],
    },
  },
  {
    id: 'Q32',
    number: 32,
    section: 8,
    text: 'How important is checkout customization to your business?',
    type: 'opinion_scale',
    scaleLabels: { low: 'Not important', high: 'Critical' },
    required: true,
    scoring: {
      type: 'opinion_scale',
      category: 'complexity',
      high: [4, 5],  // 2 pts
      mid: [3],       // 1 pt
      low: [1, 2],    // 0 pts
    },
  },
  {
    id: 'Q33',
    number: 33,
    section: 8,
    text: 'Which compliance requirements need special attention in this migration?',
    type: 'multi_select',
    options: [
      'GDPR / international privacy requirements',
      'CCPA / U.S. privacy requirements',
      'Accessibility / ADA or WCAG requirements',
      'PCI / payment security requirements',
      'Age-restricted or regulated products',
      'None beyond standard ecommerce requirements',
      'Not sure',
    ],
    scoring: {
      type: 'multi_select',
      category: 'complexity',
      scorableCount: 5,
      excludedOptions: ['None beyond standard ecommerce requirements', 'Not sure'],
    },
  },

  // ════════════════════════════════════════════════════════════════
  // Section 9: Team + Governance Readiness
  // ════════════════════════════════════════════════════════════════
  {
    id: 'Q34',
    number: 34,
    section: 9,
    text: 'Who will own ecommerce after launch?',
    type: 'single_select',
    options: [
      'Marketing',
      'Ecommerce',
      'IT / Engineering',
      'Operations',
      'Agency / external partner',
      'Shared ownership',
    ],
    required: true,
    scoring: {
      type: 'single_select',
      category: 'definition_confidence',
      scores: {
        'Marketing': 2,
        'Ecommerce': 2,
        'IT / Engineering': 1,
        'Operations': 1,
        'Agency / external partner': 1,
        'Shared ownership': 1,
      },
    },
  },
  {
    id: 'Q35',
    number: 35,
    section: 9,
    text: 'What internal resources do you have for migration?',
    type: 'multi_select',
    options: [
      'Ecommerce lead',
      'Technical lead',
      'Developer resources',
      'SEO/content owner',
      'Data/integration owner',
      'QA/UAT support',
      'Executive sponsor',
      'No dedicated team yet',
    ],
    scoring: {
      type: 'multi_select',
      category: 'migration_readiness',
      scorableCount: 7,
      excludedOptions: ['No dedicated team yet'],
    },
  },
  {
    id: 'Q36',
    number: 36,
    section: 9,
    text: 'Is budget approved?',
    type: 'single_select',
    options: ['Yes', 'In progress', 'No', 'Unsure'],
    required: true,
    scoring: {
      type: 'single_select',
      category: 'migration_readiness',
      scores: {
        'Yes': 2,
        'In progress': 1,
        'No': 0,
        'Unsure': 0,
      },
    },
  },
  {
    id: 'Q37',
    number: 37,
    section: 9,
    text: 'Are requirements documented?',
    type: 'single_select',
    options: ['Fully documented', 'Partially documented', 'Not yet', 'Unsure'],
    required: true,
    scoring: {
      type: 'single_select',
      category: 'definition_confidence',
      scores: {
        'Fully documented': 2,
        'Partially documented': 1,
        'Not yet': 0,
        'Unsure': 0,
      },
    },
  },

  // ════════════════════════════════════════════════════════════════
  // Section 10: Migration Readiness Checkpoint
  // ════════════════════════════════════════════════════════════════
  {
    id: 'Q38',
    number: 38,
    section: 10,
    text: 'Which of the following are already in place?',
    type: 'multi_select',
    options: [
      'Product data cleanup underway',
      'Customer/order migration scope defined',
      'Design system or brand guidelines ready',
      'Redirect strategy planned',
      'Integration owners assigned',
      'Testing/UAT plan drafted',
      'Launch window agreed',
      'Implementation partner selected',
      'None of the above',
    ],
    scoring: {
      type: 'multi_select',
      category: 'migration_readiness',
      scorableCount: 8,
      excludedOptions: ['None of the above'],
    },
  },
  {
    id: 'Q39',
    number: 39,
    section: 10,
    text: 'How would you describe overall migration readiness today?',
    type: 'single_select',
    options: [
      'Ready to scope now',
      'Mostly ready need discovery',
      'Early-stage planning',
      'Not ready yet',
    ],
    required: true,
    scoring: {
      type: 'single_select',
      category: 'migration_readiness',
      scores: {
        'Ready to scope now': 2,
        'Mostly ready need discovery': 1,
        'Early-stage planning': 0,
        'Not ready yet': 0,
      },
    },
  },
  {
    id: 'Q40',
    number: 40,
    section: 10,
    text: 'What is your biggest migration concern?',
    type: 'long_text',
  },

  // ════════════════════════════════════════════════════════════════
  // Lead Capture (Section 11)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'Q41',
    number: 41,
    section: 11,
    text: 'What is your name?',
    type: 'short_text',
    required: true,
  },
  {
    id: 'Q42',
    number: 42,
    section: 11,
    text: 'What is your work email?',
    type: 'email',
    required: true,
  },
  {
    id: 'Q43',
    number: 43,
    section: 11,
    text: 'How would you like to receive your results?',
    type: 'single_select',
    options: [
      'Book a discovery call to review my results',
      'Email me my results and book a follow-up call',
      'Just email me my results for now',
    ],
    required: true,
  },
];

/** Lookup a question by ID */
export const getQuestion = (id: string): Question | undefined =>
  questions.find((q) => q.id === id);

/** Get all questions for a given section number */
export const getQuestionsForSection = (sectionNumber: number): Question[] =>
  questions.filter((q) => q.section === sectionNumber);
