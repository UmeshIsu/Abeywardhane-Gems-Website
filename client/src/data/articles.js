/* =============================================================================
 *  Knowledge-hub content (Phase 5, topical authority).
 *  One pillar guide + cluster articles. Each entry drives a prerendered
 *  /blog/:slug page (Article + FAQ + Breadcrumb schema) via
 *  src/pages/blog/ArticlePage.jsx, and is listed on /blog.
 *
 *  `body` items render as paragraphs; a section may add an optional `list`.
 *  `related` = other article slugs; `moneyLinks` = contextual links to
 *  money / service pages for internal linking.
 * ========================================================================== */

export const articles = [
  /* ============================ PILLAR ============================ */
  {
    slug: 'ceylon-sapphire-buyers-guide',
    isPillar: true,
    title: 'Ceylon Sapphire: The Ultimate Buyer’s Guide',
    seoTitle: 'Ceylon Sapphire Buyer’s Guide: Colours, Quality, Price & Buying',
    metaDescription:
      'The complete guide to Ceylon sapphire: what it is, why Sri Lankan sapphires are special, the colours, how to judge quality (the 4 Cs), treatment, certification, pricing and how to buy with confidence.',
    category: 'Buyer’s Guide',
    date: '2026-05-20',
    dateDisplay: 'May 20, 2026',
    readingTime: '12 min read',
    image: '/gem-blue-sapphire.jpg',
    excerpt:
      'Everything an international buyer needs to know about Ceylon sapphire, origin, colours, the 4 Cs, treatment, certification and price, in one definitive guide.',
    intro: [
      'For more than two thousand years, the island of Sri Lanka, once known as Ceylon, and to gem traders as Ratna Dweepa, the “Island of Gems”, has been the world’s most celebrated source of sapphire. A “Ceylon sapphire” is simply a sapphire mined in Sri Lanka, but the name carries a reputation for luminous colour, high clarity and trustworthy origin that few gem sources can match.',
      'This guide walks you through everything that matters when buying a Ceylon sapphire: where it comes from, the colours it appears in, how to judge quality, what treatment and certification mean, and how price is determined, so you can buy with genuine confidence.',
    ],
    sections: [
      {
        heading: 'What is a Ceylon sapphire?',
        body: [
          'Sapphire is a variety of the mineral corundum (crystalline aluminium oxide). Pure corundum is colourless; trace elements create its colours, iron and titanium produce blue, iron alone gives yellow, and chromium creates pink (and, at higher concentrations, red, which we call ruby). A “Ceylon sapphire” is corundum mined in Sri Lanka, prized for the brightness and clarity characteristic of the island’s deposits.',
        ],
      },
      {
        heading: 'Why Sri Lankan sapphires are special',
        body: [
          'Ceylon sapphires tend to show a slightly lighter, more luminous blue than stones from some other origins, a quality that makes them sparkle rather than darken under evening light. Sri Lanka also yields an unusually high proportion of untreated material and an exceptional range of colours from a single, small geography.',
          'Just as importantly, “Ceylon origin” is itself a mark of desirability that is frequently noted on laboratory reports and reflected in a stone’s value.',
        ],
      },
      {
        heading: 'The colours of Ceylon sapphire',
        body: [
          'Sapphire is not only blue. Sri Lanka is famous for a full spectrum of “fancy” sapphires:',
        ],
        list: [
          'Blue sapphire, from soft cornflower to deep royal blue, the classic and most sought-after.',
          'Yellow sapphire, lemon to golden honey, known in the Vedic tradition as Pukhraj.',
          'Pink sapphire, delicate blush to vivid “hot” pink, coloured by chromium.',
          'White sapphire, colourless and brilliant, a natural diamond alternative.',
          'Padparadscha, the rare pink-orange “lotus” sapphire, Sri Lanka’s most coveted.',
        ],
      },
      {
        heading: 'Judging quality: the 4 Cs',
        body: [
          'As with all coloured gems, quality comes down to colour, clarity, cut and carat, but for sapphire, colour is king.',
        ],
        list: [
          'Colour, an even, vivid, well-saturated hue that holds up in different lighting is the single biggest value driver.',
          'Clarity, Ceylon sapphires are usually “eye-clean”; fine silk can even improve colour, but obvious dark inclusions reduce value.',
          'Cut, a precise cut returns light across the whole stone with no large “windows” (see-through flat zones).',
          'Carat, price per carat rises sharply with size, especially for fine colour and untreated stones.',
        ],
      },
      {
        heading: 'Treatment: heated vs. unheated',
        body: [
          'Heat treatment is an ancient, stable and widely accepted process that improves a sapphire’s colour and clarity. The majority of sapphires on the market are heated. “Unheated” (or “no heat”) sapphires are entirely natural in appearance and command a significant premium, especially in larger sizes and fine colours.',
          'What matters is disclosure: a reputable seller will always tell you a stone’s treatment status in writing, and for any significant purchase the status should be confirmed on an independent laboratory report.',
        ],
      },
      {
        heading: 'Certification, why it matters',
        body: [
          'For any sapphire of meaningful value, an independent gemmological certificate is your protection. A report from a recognised laboratory confirms that the stone is natural corundum, states its treatment status, and, depending on the lab and the stone, may indicate geographic origin.',
          'Certification turns a seller’s promise into objective, documented evidence, and makes a stone easier to resell.',
        ],
      },
      {
        heading: 'How Ceylon sapphire is priced',
        body: [
          'There is no single “price per carat” for sapphire, value is a combination of factors. In rough order of impact: colour quality, treatment status (unheated commands a premium), clarity, cut and carat weight, all underpinned by certification. Two stones of the same weight can differ in price many times over based on colour and treatment alone.',
        ],
      },
      {
        heading: 'How to buy with confidence',
        body: [
          'Buy from a seller who sources at origin, discloses treatment in writing, and offers independent certification. Ask to understand the stone’s colour, clarity and treatment, and how those compare to its price. Whether you are buying a single engagement stone or sourcing wholesale, working directly with a Sri Lankan specialist gives you better selection, honest provenance and pricing that isn’t inflated by intermediaries.',
        ],
      },
    ],
    takeaways: [
      'Ceylon sapphire = sapphire mined in Sri Lanka, prized for luminous colour and clarity.',
      'It comes in many colours, blue, yellow, pink, white and the rare padparadscha.',
      'Colour is the biggest value driver; unheated stones command a premium.',
      'Always insist on treatment disclosure and independent certification for significant stones.',
    ],
    faqs: [
      { q: 'Is a Ceylon sapphire better than other sapphires?', a: 'Ceylon sapphires are prized for their luminous colour, high clarity and a high proportion of untreated material, and “Ceylon origin” is widely regarded as a mark of quality, though the best stone for you depends on colour, clarity and budget rather than origin alone.' },
      { q: 'What is the most valuable colour of Ceylon sapphire?', a: 'Vivid royal-blue and the rare pink-orange padparadscha are among the most valuable, but a top-quality stone in any colour, even, saturated and untreated, commands a premium.' },
      { q: 'Should every sapphire be certified?', a: 'For any significant purchase, yes. An independent report confirms natural origin and treatment status and protects your investment.' },
    ],
    related: ['why-ceylon-sapphires-famous', 'how-to-identify-natural-sapphires', 'sapphire-certification-guide', 'blue-sapphire-pricing-guide'],
    moneyLinks: [
      { to: '/ceylon-blue-sapphire', label: 'Shop Ceylon blue sapphire' },
      { to: '/padparadscha-sapphire', label: 'Padparadscha sapphire' },
    ],
  },

  /* ============================ CLUSTERS ============================ */
  {
    slug: 'why-ceylon-sapphires-famous',
    title: 'Why Ceylon Sapphires Are Famous Worldwide',
    seoTitle: 'Why Ceylon Sapphires Are Famous Worldwide',
    metaDescription:
      'From royal engagement rings to record auction stones, discover why Ceylon (Sri Lankan) sapphires have been the world’s most celebrated sapphires for over 2,000 years.',
    category: 'Gem Knowledge',
    date: '2026-05-14',
    dateDisplay: 'May 14, 2026',
    readingTime: '6 min read',
    image: '/hero-collection.jpg',
    excerpt: 'Royal provenance, luminous colour and a 2,000-year reputation, the real reasons Ceylon sapphires command global demand.',
    intro: [
      'Few gemstones carry a reputation like the Ceylon sapphire. For two millennia, Sri Lanka’s sapphires have adorned royalty, filled the world’s great jewellery houses, and set records at auction. But reputation aside, what actually makes them so famous?',
    ],
    sections: [
      { heading: 'A 2,000-year legacy', body: ['Sri Lanka has been mining and trading sapphire since antiquity. Ancient traders called the island Ratna-Dweepa, the “Island of Gems”, and its stones travelled the Silk Road to the courts of Persia, Greece and Rome long before most gem sources were known.'] },
      { heading: 'Luminous colour', body: ['Ceylon sapphires are famed for a bright, slightly lighter blue that stays vivid in both daylight and artificial light, where some darker stones can look inky. This “alive” quality is one reason designers and collectors seek them out.'] },
      { heading: 'Clarity and untreated material', body: ['Sri Lankan deposits yield exceptionally clean stones and a high proportion of untreated sapphire, a combination that is increasingly rare and highly prized.'] },
      { heading: 'Royal and record-setting stones', body: ['Some of the world’s most famous sapphires are of Ceylon origin, and the island continues to produce stones that achieve premium results at international auction, reinforcing the desirability of the “Ceylon” name.'] },
    ],
    faqs: [
      { q: 'Are Ceylon sapphires rare?', a: 'Fine, untreated Ceylon sapphires of top colour are genuinely scarce, which supports their value; commercial-quality stones are more widely available.' },
      { q: 'Why do jewellers prefer Ceylon sapphires?', a: 'Their luminous colour, clarity and trusted provenance make them reliable and desirable for fine jewellery.' },
    ],
    related: ['ceylon-sapphire-buyers-guide', 'most-valuable-gemstones-sri-lanka', 'sri-lanka-gem-mining-industry'],
    moneyLinks: [{ to: '/ceylon-blue-sapphire', label: 'Explore Ceylon blue sapphire' }],
  },

  {
    slug: 'how-to-identify-natural-sapphires',
    title: 'How to Identify Natural Sapphires',
    seoTitle: 'How to Identify Natural Sapphires (Natural vs Synthetic)',
    metaDescription:
      'Learn how natural sapphires are distinguished from synthetic and imitation stones, the role of inclusions, and why gemmological certification is the only sure proof.',
    category: 'Gem Knowledge',
    date: '2026-05-08',
    dateDisplay: 'May 08, 2026',
    readingTime: '7 min read',
    image: '/service-gemology.jpg',
    excerpt: 'Inclusions, optical clues and the limits of the “naked eye”, how natural sapphires are told apart from synthetics, and why a lab report is decisive.',
    intro: [
      'As natural sapphire prices have risen, so has the sophistication of synthetic (lab-grown) and imitation stones. For buyers, knowing how authenticity is established is essential.',
    ],
    sections: [
      { heading: 'Natural vs. synthetic vs. imitation', body: ['A natural sapphire forms in the earth over millions of years. A synthetic sapphire has the same chemistry but is grown in a laboratory. An imitation merely looks like sapphire (glass, spinel or other stones). Only a natural sapphire carries the rarity, and value, buyers are paying for.'] },
      { heading: 'Inclusions tell the story', body: ['Under magnification, natural sapphires usually show characteristic inclusions, fine “silk,” crystals or growth features formed in nature. Synthetics often show curved growth lines or gas bubbles that nature does not produce. Reading these requires a trained gemologist and proper equipment.'] },
      { heading: 'What you can (and can’t) judge by eye', body: ['Hardness, a cool feel and certain optical effects can hint at sapphire, but they cannot reliably separate natural from synthetic. Treat any stone sold as natural without documentation with caution.'] },
      { heading: 'Why certification is decisive', body: ['The only sure proof is an independent gemmological report, which confirms natural corundum, identifies treatment, and may indicate origin. Always buy significant stones with certification.'] },
    ],
    faqs: [
      { q: 'Can I test a sapphire at home?', a: 'Home tests are unreliable for separating natural from synthetic sapphire. A gemmological laboratory using proper instruments is the only dependable method.' },
      { q: 'Do natural sapphires always have inclusions?', a: 'Most do, and certain inclusions help prove natural origin, but the definitive answer comes from gemmological testing rather than the naked eye.' },
    ],
    related: ['sapphire-certification-guide', 'natural-vs-treated-gemstones', 'ceylon-sapphire-buyers-guide'],
    moneyLinks: [{ to: '/ceylon-blue-sapphire', label: 'Certified Ceylon sapphires' }],
  },

  {
    slug: 'sapphire-certification-guide',
    title: 'Sapphire Certification Guide',
    seoTitle: 'Sapphire Certification Guide: What a Gem Report Tells You',
    metaDescription:
      'A practical guide to sapphire certification: what a gemmological report confirms (species, treatment, origin), why it matters, and how to read one before you buy.',
    category: 'Buying Tips',
    date: '2026-05-02',
    dateDisplay: 'May 02, 2026',
    readingTime: '6 min read',
    image: '/service-purchasing.jpg',
    excerpt: 'What a gem certificate actually confirms, species, treatment and origin, and how to use it to buy a sapphire with confidence.',
    intro: [
      'A gemmological certificate is the single most important document in a sapphire purchase. Here is what it tells you and how to read it.',
    ],
    sections: [
      { heading: 'What a certificate confirms', body: ['A laboratory report typically confirms the stone is natural corundum (sapphire), records its measurements and weight, states treatment status, and, for some labs and stones, gives an origin indication.'], list: ['Identity, natural sapphire vs. synthetic or imitation', 'Treatment, e.g. “no indication of heating” or “heated”', 'Origin indication, where supported (e.g. Sri Lanka)', 'Weight, dimensions and cut'] },
      { heading: 'Why it matters', body: ['Certification converts trust into evidence. It protects you against misrepresentation, clarifies exactly what you are buying, and makes the stone easier to insure and resell.'] },
      { heading: 'Reading a report before you buy', body: ['Check that the report is from a recognised laboratory, that the stone’s measurements match the gem in hand, and that treatment status is clearly stated. For premium stones, an unheated determination materially affects value.'] },
    ],
    faqs: [
      { q: 'Which labs certify sapphires?', a: 'Several internationally recognised gemmological laboratories issue sapphire reports. We can arrange certification with reputable labs on request.' },
      { q: 'Does a certificate guarantee value?', a: 'It confirms facts (identity, treatment, sometimes origin) that drive value, but price still depends on colour, clarity, cut and size.' },
    ],
    related: ['how-to-identify-natural-sapphires', 'natural-vs-treated-gemstones', 'ceylon-sapphire-buyers-guide'],
    moneyLinks: [{ to: '/ceylon-blue-sapphire', label: 'Buy certified sapphires' }, { to: '/gem-export-services', label: 'Export & certification' }],
  },

  {
    slug: 'natural-vs-treated-gemstones',
    title: 'Natural vs Treated Gemstones',
    seoTitle: 'Natural vs Treated Gemstones: What Buyers Should Know',
    metaDescription:
      'Understand gemstone treatments, what they are, which are accepted, how heat treatment of sapphire works, and why disclosure and certification protect buyers.',
    category: 'Gem Knowledge',
    date: '2026-04-26',
    dateDisplay: 'April 26, 2026',
    readingTime: '6 min read',
    image: '/gem-yellow-sapphire.jpg',
    excerpt: 'What gemstone “treatment” really means, which treatments are accepted, and why disclosure, not avoidance, is what protects buyers.',
    intro: [
      'Almost every buyer encounters the words “heated” or “treated.” Understanding what they mean removes a great deal of confusion, and risk.',
    ],
    sections: [
      { heading: 'What “treatment” means', body: ['Treatment is any process, beyond cutting and polishing, used to improve a gem’s appearance or durability. Treatments range from long-accepted (heat) to those that significantly affect value and require careful disclosure.'] },
      { heading: 'Heat treatment of sapphire', body: ['Heating is an ancient, stable and widely accepted treatment that improves a sapphire’s colour and clarity. The result is permanent and does not make the stone any less “natural” in material, but it does affect value relative to an unheated equivalent.'] },
      { heading: 'Untreated stones and premiums', body: ['Unheated sapphires of fine colour are scarcer and command a premium, particularly in larger sizes. For some buyers, including many seeking sapphires for astrological use, untreated status is essential.'] },
      { heading: 'Disclosure is everything', body: ['The key principle is honesty: a reputable seller discloses treatment in writing on every stone, and significant purchases should be backed by an independent report confirming the status.'] },
    ],
    faqs: [
      { q: 'Is a heated sapphire still a real sapphire?', a: 'Yes. A heated sapphire is a genuine, natural sapphire whose colour or clarity has been improved by heat, a long-accepted process. It should always be disclosed as heated.' },
      { q: 'Are untreated gemstones worth more?', a: 'Generally yes, untreated stones of fine quality are rarer and command a premium over comparable treated stones.' },
    ],
    related: ['sapphire-certification-guide', 'how-to-identify-natural-sapphires', 'ceylon-sapphire-buyers-guide'],
    moneyLinks: [{ to: '/yellow-sapphire', label: 'Untreated yellow sapphire (Pukhraj)' }],
  },

  {
    slug: 'padparadscha-sapphire-guide',
    title: 'Padparadscha Sapphire: A Complete Guide',
    seoTitle: 'Padparadscha Sapphire Guide: The Rare Pink-Orange Sapphire',
    metaDescription:
      'Everything about padparadscha sapphire, the rare pink-orange “lotus” sapphire from Sri Lanka: what defines the colour, why it’s so valuable, and how to buy one.',
    category: 'Buyer’s Guide',
    date: '2026-04-18',
    dateDisplay: 'April 18, 2026',
    readingTime: '7 min read',
    image: '/gem-padparadscha.jpg',
    excerpt: 'The rare pink-orange “lotus” sapphire explained, what defines a true padparadscha, why it’s so coveted, and how to buy one.',
    intro: [
      'No sapphire is more romantic, or more misunderstood, than the padparadscha. This guide explains what makes a stone a genuine padparadscha and why Sri Lanka is its spiritual home.',
    ],
    sections: [
      { heading: 'What defines a padparadscha', body: ['A true padparadscha shows a delicate, harmonious blend of pink and orange, the colour of a lotus blossom or a tropical sunset, from which it takes its Sinhalese-derived name. Stones that are predominantly pink (pink sapphire) or predominantly orange do not qualify.'] },
      { heading: 'Why Sri Lanka is its home', body: ['Sri Lanka is the classic and most respected source of padparadscha, and Ceylon origin is often reflected in a stone’s desirability and value.'] },
      { heading: 'Why it’s so valuable', body: ['The exact pink-orange balance occurs in only a tiny fraction of corundum, and fine, well-balanced stones in larger sizes are among the rarest gems on earth, which is why padparadscha can rival or exceed blue sapphire in price.'] },
      { heading: 'How to buy one', body: ['Because the name carries enormous value, always buy a padparadscha with an independent laboratory report classifying the colour. Look for an even, glowing pink-orange rather than a stone that leans strongly to one side.'] },
    ],
    faqs: [
      { q: 'Why are padparadscha sapphires so expensive?', a: 'They are extraordinarily rare, the precise pink-orange colour occurs in very little corundum, and Sri Lanka produces limited quantities, so fine stones are highly sought after.' },
      { q: 'Should a padparadscha be certified?', a: 'Yes, strongly. Because value hinges on the exact colour classification, an independent report is essential.' },
    ],
    related: ['ceylon-sapphire-buyers-guide', 'most-valuable-gemstones-sri-lanka', 'why-ceylon-sapphires-famous'],
    moneyLinks: [{ to: '/padparadscha-sapphire', label: 'Shop padparadscha sapphire' }, { to: '/pink-sapphire', label: 'Pink sapphire' }],
  },

  {
    slug: 'gemstone-investment-guide',
    title: 'Gemstone Investment Guide',
    seoTitle: 'Gemstone Investment Guide: Are Coloured Gemstones a Good Investment?',
    metaDescription:
      'A clear-eyed guide to investing in gemstones: what makes a gem investment-grade, why certification and rarity matter, and the risks every buyer should understand.',
    category: 'Investment',
    date: '2026-04-10',
    dateDisplay: 'April 10, 2026',
    readingTime: '8 min read',
    image: '/hero-trust.jpg',
    excerpt: 'What makes a gemstone “investment-grade,” why rarity and certification matter, and the risks to understand before you buy.',
    intro: [
      'Fine coloured gemstones have stored value for centuries. But not every gem is an investment. This guide explains what separates investment-grade stones from the rest.',
    ],
    sections: [
      { heading: 'What makes a gem investment-grade', body: ['Investment-grade gems combine rarity, fine quality and durability: top colour, good clarity, a quality cut, meaningful size, and ideally untreated status, all backed by independent certification.'] },
      { heading: 'Why certification and rarity matter', body: ['Certification provides the objective evidence a future buyer will demand, while rarity (fine colour, untreated material, larger sizes) underpins long-term desirability. Common, treated, commercial stones rarely appreciate.'] },
      { heading: 'Liquidity and horizon', body: ['Gems are a long-horizon, less-liquid asset than stocks or gold. Selling a fine stone takes the right buyer and the right documentation, so invest only with patience and quality.'] },
      { heading: 'Risks to understand', body: ['Risks include over-paying at retail mark-ups, buying treated stones sold as untreated, and illiquidity. Buying quality, certified stones at fair (ideally source-direct) prices mitigates much of this.'] },
    ],
    takeaways: [
      'Investment-grade = rarity + fine quality + durability + certification.',
      'Untreated, top-colour, larger stones hold value best.',
      'Gems are a long-horizon, less-liquid asset, buy quality and keep documentation.',
    ],
    faqs: [
      { q: 'Are gemstones a good investment?', a: 'Fine, rare, certified gemstones can hold and grow value over the long term, but they are a patient, less-liquid asset. Quality and certification are essential.' },
      { q: 'Which gemstones hold value best?', a: 'Rare, untreated stones of top colour and good size, fine sapphires (including padparadscha) and rubies among them, tend to hold value best.' },
    ],
    related: ['blue-sapphire-pricing-guide', 'most-valuable-gemstones-sri-lanka', 'sapphire-certification-guide'],
    moneyLinks: [{ to: '/padparadscha-sapphire', label: 'Investment-grade padparadscha' }, { to: '/ceylon-ruby', label: 'Ceylon ruby' }],
  },

  {
    slug: 'sri-lanka-gem-mining-industry',
    title: 'The Sri Lanka Gem Mining Industry',
    seoTitle: 'Sri Lanka Gem Mining Industry: How Ceylon Gems Are Found',
    metaDescription:
      'Inside Sri Lanka’s gem mining industry: where gems are found, traditional pit and tunnel mining, ethical artisanal practices, and the journey from gravel to certified gem.',
    category: 'Behind the Scenes',
    date: '2026-04-02',
    dateDisplay: 'April 02, 2026',
    readingTime: '7 min read',
    image: '/hero-tourism.jpg',
    excerpt: 'Where Ceylon gems come from, how traditional artisanal mining works, and why Sri Lanka’s approach is among the world’s most ethical.',
    intro: [
      'Behind every Ceylon sapphire is one of the world’s oldest and most distinctive mining traditions. Here is how Sri Lanka’s gems make their way from the ground to your hand.',
    ],
    sections: [
      { heading: 'Where the gems are found', body: ['Most of Sri Lanka’s gems come from alluvial gravels, known locally as illam, concentrated around Ratnapura, Elahera and Balangoda. These river-deposited gravels hold sapphire, ruby, chrysoberyl, spinel, garnet and more.'] },
      { heading: 'Traditional mining methods', body: ['Sri Lankan mining is largely artisanal: small teams dig pits and tunnels by hand, washing gravel in woven baskets to reveal rough stones. This low-impact, labour-intensive approach has changed little in centuries.'] },
      { heading: 'An ethical model', body: ['Because mining is small-scale and labour-based rather than industrial, Sri Lanka is widely regarded as one of the more ethical gem-sourcing countries, with livelihoods spread across local communities.'] },
      { heading: 'From gravel to certified gem', body: ['Rough is sorted, then cut and polished by skilled lapidaries, evaluated by gemologists, and, for fine stones, independently certified before reaching buyers worldwide.'] },
    ],
    faqs: [
      { q: 'Where are most gems mined in Sri Lanka?', a: 'The Ratnapura region (Sabaragamuwa Province) is the heart of Sri Lankan gem mining, along with areas such as Elahera and Balangoda.' },
      { q: 'Is Sri Lankan gem mining ethical?', a: 'Sri Lanka’s small-scale, artisanal mining is widely considered among the more ethical models, supporting local livelihoods with relatively low environmental impact.' },
    ],
    related: ['why-ceylon-sapphires-famous', 'most-valuable-gemstones-sri-lanka', 'how-gem-export-works-sri-lanka'],
    moneyLinks: [{ to: '/gem-dealers-ratnapura', label: 'Gem dealers in Ratnapura' }, { to: '/services/gem-tourism', label: 'Visit the mines' }],
  },

  {
    slug: 'blue-sapphire-pricing-guide',
    title: 'Blue Sapphire Pricing Guide',
    seoTitle: 'Blue Sapphire Pricing Guide: What Determines the Price',
    metaDescription:
      'How blue sapphire prices are set: the impact of colour, treatment, clarity, cut and carat, why two same-size stones can differ in price many times over, and how to judge value.',
    category: 'Buying Tips',
    date: '2026-03-25',
    dateDisplay: 'March 25, 2026',
    readingTime: '7 min read',
    image: '/gem-pink-sapphire.jpg',
    excerpt: 'Why two same-size blue sapphires can differ in price many times over, the factors that set the price, and how to judge value.',
    intro: [
      'Sapphire pricing confuses many first-time buyers because there is no fixed “price per carat.” Understanding the drivers lets you judge whether a stone is fairly priced.',
    ],
    sections: [
      { heading: 'Colour, the biggest driver', body: ['Colour accounts for more of a blue sapphire’s value than any other factor. Vivid, even “royal” and “cornflower” blues command the strongest premiums; stones that look grey, inky or washed-out are worth far less.'] },
      { heading: 'Treatment', body: ['An unheated sapphire of fine colour can be worth substantially more than a heated stone of similar appearance. Treatment status, confirmed on a report, is a major price lever.'] },
      { heading: 'Clarity, cut and carat', body: ['Eye-clean clarity, a precise cut that returns light evenly, and larger carat weight all add value. Price per carat tends to jump at key size thresholds.'] },
      { heading: 'Why two stones differ so much', body: ['Because these factors multiply together, two one-carat sapphires can differ in price many times over. Always compare colour, treatment and certification, not just weight.'] },
    ],
    faqs: [
      { q: 'How much does a blue sapphire cost?', a: 'There is no single price, it depends mainly on colour, treatment, clarity and size. Vivid, untreated, certified stones command the strongest premiums. Share your requirements and budget and we’ll show matched options.' },
      { q: 'What makes one sapphire more expensive than another?', a: 'Chiefly colour quality and treatment status, then clarity, cut and carat, all underpinned by certification.' },
    ],
    related: ['ceylon-sapphire-buyers-guide', 'gemstone-investment-guide', 'natural-vs-treated-gemstones'],
    moneyLinks: [{ to: '/ceylon-blue-sapphire', label: 'Browse Ceylon blue sapphire' }, { to: '/wholesale-gemstones-sri-lanka', label: 'Wholesale pricing' }],
  },

  {
    slug: 'how-gem-export-works-sri-lanka',
    title: 'How Gem Export Works in Sri Lanka',
    seoTitle: 'How Gem Export Works in Sri Lanka: A Buyer’s Overview',
    metaDescription:
      'A clear overview of how gemstone export works in Sri Lanka: sourcing, certification, documentation, secure logistics, and how international buyers receive their stones safely.',
    category: 'For Buyers',
    date: '2026-03-17',
    dateDisplay: 'March 17, 2026',
    readingTime: '6 min read',
    image: '/service-market.jpg',
    excerpt: 'From source selection to your door, how Ceylon gemstone export works, and what international buyers should expect.',
    intro: [
      'Buying a Ceylon gem from abroad raises practical questions: how does the stone reach you safely, and what should you expect? Here is how gem export from Sri Lanka works.',
    ],
    sections: [
      { heading: 'Sourcing and selection', body: ['It begins at the source: stones are hand-selected to a buyer’s specification, variety, colour, clarity, size and budget, and evaluated by gemologists against documented standards.'] },
      { heading: 'Certification and documentation', body: ['Stones are independently certified where required, and the exporter prepares the commercial invoices, certification and declarations needed for a compliant international shipment.'] },
      { heading: 'Secure, insured logistics', body: ['High-value gems are shipped via trusted secure-logistics partners, fully insured, discreetly packaged and tracked end-to-end, with proof of delivery.'] },
      { heading: 'What buyers should expect', body: ['Expect clear disclosure of treatment and provenance, transparent pricing, full documentation, and a single point of contact who coordinates the process from selection to delivery.'] },
    ],
    faqs: [
      { q: 'Is it safe to buy gemstones from Sri Lanka online?', a: 'Yes, when you buy from a reputable exporter who discloses treatment, provides certification, and ships via insured, tracked logistics with full documentation.' },
      { q: 'Do I pay import duties on gemstones?', a: 'Import taxes depend on your country’s rules. We provide the documentation you need; check your local customs requirements before ordering.' },
    ],
    related: ['sri-lanka-gem-mining-industry', 'sapphire-certification-guide', 'ceylon-sapphire-buyers-guide'],
    moneyLinks: [{ to: '/gem-export-services', label: 'Our gem export services' }, { to: '/gem-exporters-sri-lanka', label: 'Gem exporters Sri Lanka' }],
  },

  {
    slug: 'most-valuable-gemstones-sri-lanka',
    title: 'The Most Valuable Gemstones Found in Sri Lanka',
    seoTitle: 'Most Valuable Gemstones Found in Sri Lanka',
    metaDescription:
      'From padparadscha sapphire to star stones and cat’s-eye chrysoberyl, a tour of the most valuable and sought-after gemstones found in Sri Lanka (Ceylon).',
    category: 'Gem Knowledge',
    date: '2026-03-09',
    dateDisplay: 'March 09, 2026',
    readingTime: '7 min read',
    image: '/gem-cats-eye.jpg',
    excerpt: 'A tour of Sri Lanka’s most valuable gems, from the rare padparadscha to star sapphires and chatoyant cat’s-eye chrysoberyl.',
    intro: [
      'Sri Lanka produces an extraordinary variety of gemstones. These are among the most valuable and sought-after stones the island is known for.',
    ],
    sections: [
      { heading: 'Padparadscha sapphire', body: ['The rare pink-orange “lotus” sapphire is Sri Lanka’s most coveted gem, and fine examples can rival or exceed blue sapphire in price.'] },
      { heading: 'Blue and fancy sapphires', body: ['Vivid blue sapphires lead the island’s reputation, but fine yellow, pink and white sapphires are highly valued too, especially in untreated form.'] },
      { heading: 'Ruby', body: ['Ceylon rubies, bright, often pinkish-red corundum, are prized for their clarity and ethical provenance.'] },
      { heading: 'Star sapphires and cat’s-eye chrysoberyl', body: ['Sri Lanka is famous for phenomenal gems: star sapphires showing a six-rayed star, and cat’s-eye chrysoberyl with a single luminous band of light, both highly collectible.'] },
      { heading: 'Spinel and others', body: ['Vibrant red and pink spinels, garnets and other natural stones round out the island’s remarkable gem wealth.'] },
    ],
    faqs: [
      { q: 'What is the most valuable gemstone in Sri Lanka?', a: 'Fine padparadscha sapphire is among the most valuable, alongside top-colour blue sapphire and ruby, particularly untreated, certified stones.' },
      { q: 'What is a star sapphire?', a: 'A star sapphire is a sapphire that displays a six-rayed star of light (asterism) across its surface, caused by fine needle-like inclusions; Sri Lanka is a famous source.' },
    ],
    related: ['padparadscha-sapphire-guide', 'why-ceylon-sapphires-famous', 'gemstone-investment-guide'],
    moneyLinks: [{ to: '/ceylon-ruby', label: 'Ceylon ruby' }, { to: '/padparadscha-sapphire', label: 'Padparadscha sapphire' }],
  },
];

export const articleBySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));

/* Newest first for the /blog listing. */
export const articlesByDate = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));
