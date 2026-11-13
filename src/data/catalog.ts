import { ASSETS } from './assets';
import type {
  HeroSlide,
  InfoModalTopic,
  JournalArticle,
  Product,
  SpaceItem,
} from '../types';

export const BRAND = {
  name: 'Atelier Sorel',
  email: 'studio@ateliersorel.com',
  phone: '+41 44 580 29 10',
  showrooms: 'Zurich · Copenhagen · Milan',
} as const;

export const WHITE_GLOVE_THRESHOLD = 2500;

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'living-sanctuary',
    eyebrow: 'TIMELESS DESIGN. THOUGHTFUL LIVING.',
    headline: 'Spaces Designed for the Way You Live.',
    description:
      'Discover beautifully crafted furniture and considered interiors that bring warmth, character, and lasting comfort to every space.',
    tagline: 'Architectural Living · Autumn Collection',
    image: ASSETS.heroLivingRoom,
    alt: 'Sunlit architectural living room with curved cream boucle sectional sofa, solid walnut coffee table, travertine fireplace, and floor-to-ceiling black steel windows',
    targetCategory: 'Living Room',
  },
  {
    id: 'dining-architecture',
    eyebrow: 'GATHERINGS IN NATURAL TIMBER',
    headline: 'Crafted Around Quiet Rituals.',
    description:
      'Solid American walnut tables and tailored linen seating proportioned for unhurried conversation and generous daylight.',
    tagline: 'Bespoke Dining · Solid Walnut Joinery',
    image: ASSETS.heroDiningSanctuary,
    alt: 'Open-plan European dining room with solid walnut dining table, upholstered cream linen chairs, wide-plank oak floors, and garden view',
    targetCategory: 'Dining',
  },
  {
    id: 'bedroom-serenity',
    eyebrow: 'RESTFUL MATERIAL HONESTY',
    headline: 'Calm Forms for Private Retreats.',
    description:
      'Low-profile upholstered frames, washed Belgian flax, and warm timber joinery conceived to bring stillness to the end of each day.',
    tagline: 'Bedroom Sanctuary · Belgian Flax & Walnut',
    image: ASSETS.heroBedroomRetreat,
    alt: 'Minimalist master bedroom with cream linen upholstered bed, warm taupe bedding, solid walnut nightstands, and sheer linen drapery',
    targetCategory: 'Bedroom',
  },
];

export const BRAND_STATS = [
  {
    id: 'homes',
    value: '10K+',
    label: 'Homes Inspired',
  },
  {
    id: 'countries',
    value: '25+',
    label: 'Countries Reached',
  },
  {
    id: 'satisfaction',
    value: '98%',
    label: 'Customer Satisfaction',
  },
  {
    id: 'years',
    value: '12+',
    label: 'Years of Craftsmanship',
  },
] as const;

export const SPACES: SpaceItem[] = [
  {
    id: 'living-room',
    title: 'Living Room',
    subtitle: 'Relaxed. Refined. Yours.',
    description:
      'Low-slung modular silhouettes, raw travertine plinths, and textured upholstery tailored for quiet lounging and conversation.',
    image: ASSETS.spaceLivingRoom,
    alt: 'Minimalist living room with warm taupe modular sofa, sculpted oak side table, wool rug, and travertine plinth',
    filterCategory: 'Living Room',
    curatedNotes: 'Modular seating, lounge chairs, and sculptural timber tables.',
  },
  {
    id: 'dining-room',
    title: 'Dining Room',
    subtitle: 'Gather in Style.',
    description:
      'Architectural dining tables turned from single-origin timber paired with ergonomic seating and warm brass illumination.',
    image: ASSETS.spaceDiningRoom,
    alt: 'Contemporary dining room with oval solid walnut table, six woven cord timber chairs, and limewash plaster walls',
    filterCategory: 'Dining',
    curatedNotes: 'Solid hardwood tables, sideboards, and woven dining chairs.',
  },
  {
    id: 'bedroom',
    title: 'Bedroom',
    subtitle: 'Rest Beautifully.',
    description:
      'Tactile Belgian linen headboards, floating walnut shelving, and soft ceramic lighting designed for restorative sleep.',
    image: ASSETS.spaceBedroom,
    alt: 'Calm luxury bedroom featuring a sand linen upholstered bed, organic cotton throws, and floating walnut shelf',
    filterCategory: 'Bedroom',
    curatedNotes: 'Upholstered platform beds, nightstands, and warm ambient lamps.',
  },
  {
    id: 'home-office',
    title: 'Home Office',
    subtitle: 'Work Inspired.',
    description:
      'Considered workspaces balancing solid walnut joinery, saddle leather comfort, and integrated architectural storage.',
    image: ASSETS.spaceHomeOffice,
    alt: 'Contemporary home office with waterfall walnut writing desk, cognac leather task chair, and custom walnut bookshelves',
    filterCategory: 'Storage',
    curatedNotes: 'Writing desks, ergonomic leather seating, and fluted credenzas.',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'solenne-sofa',
    slug: 'the-solenne-sofa',
    sku: 'AS-LR-101',
    name: 'The Solenne Sofa',
    category: 'Living Room',
    space: 'living-room',
    price: 2800,
    availability: 'Made to Order',
    image: ASSETS.productSolenneSofa,
    alt: 'The Solenne Sofa upholstered in cream textured boucle with wide chaise lounge in a warm plaster room',
    gallery: [
      {
        src: ASSETS.productSolenneSofa,
        alt: 'The Solenne Sofa front studio composition in cream boucle',
        caption: 'Studio Profile · Chalk Bouclé',
      },
      {
        src: ASSETS.heroLivingRoom,
        alt: 'Sculptural cream boucle seating in sunlit architectural living room',
        caption: 'In Residence · Sunlit Living Room',
      },
      {
        src: ASSETS.detailLinenUpholstery,
        alt: 'Close-up of heavyweight cream boucle and Belgian linen weave',
        caption: 'Material Detail · Belgian Bouclé & Linen',
      },
    ],
    shortDescription:
      'Deep modular chaise sectional upholstered in Belgian boucle with feather-wrapped cushions.',
    description:
      'Sculpted with generous proportions and gentle radiused arms, The Solenne Sofa anchors open living spaces with effortless poise. Built on a kiln-dried European beech frame with down-wrapped high-resilience cushions and removable Belgian textile covers.',
    dimensions: 'W 295 cm × D 168 cm × H 74 cm · Seat H 41 cm',
    materials: 'Kiln-dried beech frame, heavyweight Belgian boucle, natural feather-down fill',
    careInstructions:
      'Vacuum gently with a soft brush attachment weekly. Removable cushion covers may be professionally dry-cleaned.',
    leadTime: '3–4 weeks white-glove delivery',
    finishes: [
      { name: 'Chalk Bouclé', swatchHex: '#EFECE6' },
      { name: 'Oatmeal Linen', swatchHex: '#D8CFC2' },
      { name: 'Warm Taupe', swatchHex: '#A39483' },
    ],
    pairedProductIds: ['terra-lounge-chair', 'halo-floor-lamp', 'noma-sideboard'],
  },
  {
    id: 'forme-dining-table',
    slug: 'the-forme-dining-table',
    sku: 'AS-DN-204',
    name: 'The Forme Dining Table',
    category: 'Dining',
    space: 'dining-room',
    price: 1950,
    availability: 'Made to Order',
    image: ASSETS.productFormeTable,
    alt: 'The Forme Dining Table in solid oiled American walnut with curved architectural pedestal legs',
    gallery: [
      {
        src: ASSETS.productFormeTable,
        alt: 'The Forme Dining Table in solid American walnut with twin fluted pedestals',
        caption: 'Studio Profile · Oiled American Walnut',
      },
      {
        src: ASSETS.heroDiningSanctuary,
        alt: 'Solid walnut dining table styled in sunlit European dining room',
        caption: 'In Residence · Architectural Dining',
      },
      {
        src: ASSETS.detailWalnutCraft,
        alt: 'Macro view of beveled solid walnut grain and architectural joinery',
        caption: 'Craft Detail · Hand-Rubbed Walnut',
      },
    ],
    shortDescription:
      'Architectural solid walnut dining table resting on twin sculpted timber pedestals.',
    description:
      'Milled from sustainably harvested solid American walnut, The Forme Dining Table pairs a chamfered plank top with a continuous U-shaped fluted pedestal base. Hand-rubbed with plant-based matte oil to preserve natural grain warmth.',
    dimensions: 'L 240 cm × W 105 cm × H 75 cm · Seats 8–10',
    materials: 'FSC-certified solid American walnut, plant-based matte oil finish',
    careInstructions:
      'Wipe daily with a lightly dampened cotton cloth following the wood grain. Re-oil annually with plant-based timber wax.',
    leadTime: '2–3 weeks white-glove delivery',
    finishes: [
      { name: 'Oiled Walnut', swatchHex: '#574638' },
      { name: 'Smoked Oak', swatchHex: '#6E5A49' },
      { name: 'Natural Ash', swatchHex: '#C9B8A5' },
    ],
    pairedProductIds: ['noma-sideboard', 'terra-lounge-chair', 'halo-floor-lamp'],
  },
  {
    id: 'terra-lounge-chair',
    slug: 'the-terra-lounge-chair',
    sku: 'AS-ST-112',
    name: 'The Terra Lounge Chair',
    category: 'Seating',
    space: 'living-room',
    price: 1420,
    availability: 'In Stock',
    image: ASSETS.productTerraChair,
    alt: 'The Terra Lounge Chair in cognac vegetable-tanned saddle leather and sculpted solid walnut frame',
    gallery: [
      {
        src: ASSETS.productTerraChair,
        alt: 'The Terra Lounge Chair in Caramel Saddle leather and solid walnut',
        caption: 'Studio Profile · Caramel Saddle Leather',
      },
      {
        src: ASSETS.storyAtelierInterior,
        alt: 'Warm residential reading room featuring natural walnut and neutral seating',
        caption: 'In Residence · Library & Lounge',
      },
      {
        src: ASSETS.journalNaturalMaterials,
        alt: 'Overhead material palette showing cognac saddle leather and oiled walnut',
        caption: 'Material Swatches · Hide & Walnut',
      },
    ],
    shortDescription:
      'Hand-shaped walnut armchair cushioned in supple vegetable-tanned saddle leather.',
    description:
      'Inspired by mid-century European joinery, The Terra Lounge Chair wraps a gently reclined solid walnut frame around deep cushions clad in full-grain Tuscan saddle leather that develops a rich patina over decades of use.',
    dimensions: 'W 74 cm × D 82 cm × H 79 cm · Seat H 40 cm',
    materials: 'Solid walnut frame, full-grain vegetable-tanned leather, mortise-and-tenon joinery',
    careInstructions:
      'Dust leather with a dry microfiber cloth and condition twice yearly with natural beeswax leather balm.',
    leadTime: 'In stock · Ships within 5 business days',
    finishes: [
      { name: 'Caramel Saddle', swatchHex: '#9C6239' },
      { name: 'Espresso Hide', swatchHex: '#433329' },
      { name: 'Sandstone Linen', swatchHex: '#D5C7B6' },
    ],
    pairedProductIds: ['solenne-sofa', 'halo-floor-lamp', 'forme-dining-table'],
  },
  {
    id: 'aurelle-bed',
    slug: 'the-aurelle-bed',
    sku: 'AS-BD-301',
    name: 'The Aurelle Bed',
    category: 'Bedroom',
    space: 'bedroom',
    price: 2600,
    availability: 'Made to Order',
    image: ASSETS.productAurelleBed,
    alt: 'The Aurelle Bed king-size platform frame in warm oatmeal Belgian linen with channel-tufted headboard',
    gallery: [
      {
        src: ASSETS.productAurelleBed,
        alt: 'The Aurelle Bed upholstered in oatmeal Belgian flax linen',
        caption: 'Studio Profile · Oatmeal Flax',
      },
      {
        src: ASSETS.spaceBedroom,
        alt: 'Minimalist serene bedroom styled with linen upholstery and walnut shelving',
        caption: 'In Residence · Master Sanctuary',
      },
      {
        src: ASSETS.detailLinenUpholstery,
        alt: 'Tactile close-up of unbleached Belgian linen upholstery weave',
        caption: 'Material Detail · Stonewashed Linen',
      },
    ],
    shortDescription:
      'Channel-padded king platform bed tailored in breathable unbleached Belgian flax.',
    description:
      'Conceived as an acoustic and visual sanctuary, The Aurelle Bed features a horizontally channeled headboard and softly mitered plinth wrapped in stonewashed Belgian linen, supported by silent solid oak slats.',
    dimensions: 'King: W 208 cm × L 224 cm × H 108 cm',
    materials: 'Stonewashed Belgian linen, solid white oak slat system, natural wool batting',
    careInstructions:
      'Spot clean linen with lukewarm water and mild neutral soap; avoid harsh optical brighteners.',
    leadTime: '3–4 weeks white-glove delivery',
    finishes: [
      { name: 'Oatmeal Flax', swatchHex: '#D8CEBE' },
      { name: 'Warm Ivory', swatchHex: '#EFEAE1' },
      { name: 'Slate Taupe', swatchHex: '#8E8479' },
    ],
    pairedProductIds: ['halo-floor-lamp', 'noma-sideboard', 'terra-lounge-chair'],
  },
  {
    id: 'noma-sideboard',
    slug: 'the-noma-sideboard',
    sku: 'AS-ST-408',
    name: 'The Noma Sideboard',
    category: 'Storage',
    space: 'home-office',
    price: 1780,
    availability: 'Made to Order',
    image: ASSETS.productNomaSideboard,
    alt: 'The Noma Sideboard in fluted dark walnut on slender blackened bronze legs against a warm plaster wall',
    gallery: [
      {
        src: ASSETS.productNomaSideboard,
        alt: 'The Noma Sideboard in fluted solid walnut with blackened bronze legs',
        caption: 'Studio Profile · Fluted Walnut',
      },
      {
        src: ASSETS.spaceHomeOffice,
        alt: 'Architectural home office featuring solid walnut joinery and bookshelves',
        caption: 'In Residence · Study & Storage',
      },
      {
        src: ASSETS.detailWalnutCraft,
        alt: 'Close-up of solid American walnut dovetail drawer and mitered edge',
        caption: 'Craft Detail · Dovetail Joinery',
      },
    ],
    shortDescription:
      'Low-profile fluted walnut credenza poised on slender blackened bronze legs.',
    description:
      'A study in architectural restraint, The Noma Sideboard conceals adjustable solid wood shelving and soft-close cable routing behind precision-milled fluted walnut doors—equally suited to dining rooms, living spaces, and executive studies.',
    dimensions: 'W 190 cm × D 46 cm × H 72 cm',
    materials: 'Solid walnut & quarter-sawn veneer, blackened bronze base, soft-close brass hinges',
    careInstructions:
      'Dust fluted channels with a natural bristle brush; keep away from direct radiator heat.',
    leadTime: '2 weeks white-glove delivery',
    finishes: [
      { name: 'Fluted Walnut', swatchHex: '#574638' },
      { name: 'Charred Oak', swatchHex: '#292521' },
    ],
    pairedProductIds: ['forme-dining-table', 'halo-floor-lamp', 'terra-lounge-chair'],
  },
  {
    id: 'halo-floor-lamp',
    slug: 'the-halo-floor-lamp',
    sku: 'AS-LT-502',
    name: 'The Halo Floor Lamp',
    category: 'Lighting',
    space: 'living-room',
    price: 480,
    availability: 'In Stock',
    image: ASSETS.productHaloLamp,
    alt: 'The Halo Floor Lamp with hand-carved raw travertine base, aged brass stem, and warm linen drum shade',
    gallery: [
      {
        src: ASSETS.productHaloLamp,
        alt: 'The Halo Floor Lamp with Roman travertine plinth and aged brass stem',
        caption: 'Studio Profile · Aged Brass & Travertine',
      },
      {
        src: ASSETS.spaceLivingRoom,
        alt: 'Warm ambient lighting beside minimalist modular living room seating',
        caption: 'In Residence · Ambient Corner',
      },
      {
        src: ASSETS.journalNaturalMaterials,
        alt: 'Honed Roman travertine, brushed bronze hardware, and unbleached linen',
        caption: 'Material Detail · Travertine & Brass',
      },
    ],
    shortDescription:
      'Hand-turned aged brass floor lamp anchored by a raw honed Roman travertine plinth.',
    description:
      'Balancing mineral weight with slender proportion, The Halo Floor Lamp rises from a hand-chiseled Roman travertine cylinder along a brushed brass stem to diffuse warm, glare-free illumination through an unbleached linen shade.',
    dimensions: 'Ø 42 cm × H 158 cm · Warm 2700K dimmable LED included',
    materials: 'Solid Roman travertine, brushed unlacquered brass, woven linen shade',
    careInstructions:
      'Dust travertine and linen shade with a dry soft cloth. Unlacquered brass naturally patinates with age.',
    leadTime: 'In stock · Ships within 3 business days',
    finishes: [
      { name: 'Aged Brass & Travertine', swatchHex: '#B69D74' },
      { name: 'Bronze & Limestone', swatchHex: '#5D534A' },
    ],
    pairedProductIds: ['solenne-sofa', 'terra-lounge-chair', 'aurelle-bed'],
  },
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'calm-living-space',
    slug: 'the-art-of-creating-a-calm-living-space',
    category: 'Interior Architecture',
    title: 'The Art of Creating a Calm Living Space',
    excerpt:
      'How measured negative space, warm mineral surfaces, and honest daylight quiet the visual noise of contemporary life.',
    readingTime: '5 min read',
    publishedDate: 'Autumn 2026',
    author: 'Clara Lindqvist, Creative Director',
    image: ASSETS.journalCalmSpace,
    alt: 'Quiet living room corner with curved linen lounge chair, travertine side table, and soft morning window light',
    paragraphs: [
      'Calmness in architecture is rarely achieved by emptiness alone; rather, it emerges from deliberate proportion and tactile restraint. When every object in a room earns its place through utility and quiet beauty, the eye naturally slows down.',
      'Begin with light and shadow. Rather than filling every perimeter wall, allow unencumbered stretches of limewash plaster or raw timber to catch shifting daylight across the afternoon. Pair a single low-slung seating piece with honest mineral textures—honed travertine, unglazed stoneware, and heavy Belgian linen.',
      'Finally, prioritize warmth beneath the hand and foot. Wool bouclé, oiled walnut, and woven jute absorb ambient sound while grounding the room in sensory comfort, transforming minimalist geometry into a deeply welcoming home.',
    ],
  },
  {
    id: 'choosing-timeless-furniture',
    slug: 'a-guide-to-choosing-timeless-furniture',
    category: 'Craftsmanship',
    title: 'A Guide to Choosing Timeless Furniture',
    excerpt:
      'What to look for in joinery, timber grading, and upholstery construction when investing in heirloom pieces.',
    readingTime: '6 min read',
    publishedDate: 'Autumn 2026',
    author: 'Henrik Sorel, Master Cabinetmaker',
    image: ASSETS.journalTimelessFurniture,
    alt: 'Furniture atelier workbench with solid oak and walnut chairs alongside architectural blueprints and wood swatches',
    paragraphs: [
      'A piece of furniture feels timeless when its silhouette obeys structural logic rather than seasonal ornament. Before considering finish or color, examine how weight meets the floor—tapered solid legs, recessed plinths, and balanced cantilevers immediately signal enduring design.',
      'Inspect the unseen details: kiln-dried hardwood frames, mortise-and-tenon joinery, and plant-based oil finishes that allow scratches to be renewed in minutes rather than sealed beneath brittle polyurethane.',
      'Choose upholstery in natural fibers—linen, wool bouclé, and full-grain vegetable-tanned leather—that age with grace, softening over years of daily gatherings rather than wearing out.',
    ],
  },
  {
    id: 'beauty-of-natural-materials',
    slug: 'the-beauty-of-natural-materials',
    category: 'Materiality',
    title: 'The Beauty of Natural Materials',
    excerpt:
      'Inside our material library of oiled American walnut, Roman travertine, unbleached flax, and unlacquered brass.',
    readingTime: '4 min read',
    publishedDate: 'Summer 2026',
    author: 'Elena Meyer, Head of Materials',
    image: ASSETS.journalNaturalMaterials,
    alt: 'Overhead composition of oiled walnut wood, travertine stone, Belgian linen, saddle leather, and brushed brass hardware',
    paragraphs: [
      'Synthetic imitations remain static from the day they leave a factory. Natural materials, by contrast, record the quiet story of a home—warmed by sunlight, burnished by touch, and rich with microscopic variation.',
      'In our Zurich and Copenhagen studios, every project begins on a stone sample table. We place oiled walnut beside porous travertine, unbleached Belgian flax beside brushed unlacquered brass, studying how their undertones converse in northern and southern light.',
      'By working exclusively with responsibly harvested timbers and minimally processed stone and textiles, each piece arrives with an unmistakable presence that synthetic substitutes simply cannot replicate.',
    ],
  },
];

export const STORY_VALUES = [
  {
    title: 'People.',
    detail: 'Ergonomic proportions tailored around unhurried everyday rituals.',
  },
  {
    title: 'Materials.',
    detail: 'Single-origin American walnut, Roman travertine, and Belgian flax.',
  },
  {
    title: 'Sustainability.',
    detail: 'FSC-certified timber, zero-VOC plant oils, and modular longevity.',
  },
  {
    title: 'Craftsmanship.',
    detail: 'Traditional mortise-and-tenon joinery finished by hand in small batches.',
  },
] as const;

export const INFO_MODAL_CONTENT: Record<
  Exclude<InfoModalTopic, null | 'cookies'>,
  { eyebrow: string; title: string; sections: { heading: string; body: string }[] }
> = {
  philosophy: {
    eyebrow: 'OUR PHILOSOPHY',
    title: 'Designed for Living. Created to Last.',
    sections: [
      {
        heading: 'Quiet Architectural Clarity',
        body: 'We design against disposable trends. Every Atelier Sorel silhouette begins with honest proportion—low center of gravity, generous seating depth, and clean sightlines that let architecture and daylight breathe.',
      },
      {
        heading: 'Tactile Material Integrity',
        body: 'We pair solid oiled hardwoods with raw stone and breathable natural textiles. Surfaces are left open-pored wherever possible so wood and brass mellow naturally over decades of daily life.',
      },
      {
        heading: 'Made for Everyday Comfort',
        body: 'Refinement should never feel fragile. Our upholstery uses removable natural covers and high-resilience cores wrapped in ethically sourced down for enduring residential comfort.',
      },
    ],
  },
  story: {
    eyebrow: 'OUR STORY',
    title: 'Thoughtful Spaces. Meaningful Living.',
    sections: [
      {
        heading: 'Origins in Zurich & Copenhagen',
        body: 'Founded by architectural cabinetmakers and interior stylists, Atelier Sorel bridges Alpine joinery precision with Nordic warmth. What began as a bespoke residential workshop has grown into an international furniture house serving private residences and boutique hospitality.',
      },
      {
        heading: 'Small-Batch Production',
        body: 'Rather than warehousing thousands of generic units, our pieces are crafted in focused runs by partner workshops across Europe and North America, ensuring every timber grain match is reviewed by hand.',
      },
    ],
  },
  craftsmanship: {
    eyebrow: 'ATELIER STANDARDS',
    title: 'Joinery, Upholstery & Finishing',
    sections: [
      {
        heading: 'Traditional Joinery',
        body: 'Solid frames are constructed with precision-milled mortise-and-tenon joints and dovetail drawer boxes, eliminating structural fatigue over decades of use.',
      },
      {
        heading: 'Hand-Rubbed Finishes',
        body: 'Each walnut and oak surface is sanded through progressive fine grits and sealed with zero-VOC plant oils that nourish the timber without plastic gloss.',
      },
    ],
  },
  sustainability: {
    eyebrow: 'RESPONSIBLE STEWARDSHIP',
    title: 'Materials That Respect Tomorrow',
    sections: [
      {
        heading: 'Certified Forestry',
        body: '100% of our American walnut, European oak, and ash is sourced from FSC-certified, regeneratively managed forests.',
      },
      {
        heading: 'Built to Be Reupholstered',
        body: 'Our sofas and chairs are designed with replaceable tailored covers and solid hardwood frames built to outlast multiple generations of interior refreshes.',
      },
    ],
  },
  careers: {
    eyebrow: 'STUDIO CAREERS',
    title: 'Join Atelier Sorel',
    sections: [
      {
        heading: 'Open Disciplines',
        body: 'We welcome portfolios year-round from interior architects, CAD/3D furniture engineers, master upholsterers, and client design advisors in Zurich, Copenhagen, and remote studio roles.',
      },
      {
        heading: 'How to Apply',
        body: 'Please share a concise portfolio and letter of introduction with studio@ateliersorel.com.',
      },
    ],
  },
  shipping: {
    eyebrow: 'CLIENT SERVICES',
    title: 'Shipping & White-Glove Delivery',
    sections: [
      {
        heading: 'Complimentary White-Glove Threshold',
        body: 'Orders over $2,500 qualify for complimentary white-glove in-room placement, full assembly, and packaging removal across all standard service zones.',
      },
      {
        heading: 'Lead Times & Scheduling',
        body: 'In-stock lighting and accent seating dispatch within 3–5 business days. Made-to-order upholstery and dining tables arrive in 2–4 weeks with scheduled two-hour delivery windows.',
      },
    ],
  },
  returns: {
    eyebrow: 'CLIENT SERVICES',
    title: 'Returns & 30-Day Home Trial',
    sections: [
      {
        heading: '30-Day Considered Trial',
        body: 'If a piece does not harmonize with your space, contact our studio within 30 days of delivery to arrange return collection in original condition.',
      },
      {
        heading: '10-Year Structural Guarantee',
        body: 'Every Atelier Sorel timber frame and structural joint is backed by a comprehensive 10-year residential warranty.',
      },
    ],
  },
  faqs: {
    eyebrow: 'CLIENT SERVICES',
    title: 'Frequently Asked Questions',
    sections: [
      {
        heading: 'Can I request fabric and timber swatches?',
        body: 'Yes. During a complimentary consultation—or via email request—we dispatch curated linen, bouclé, leather, and oiled walnut sample boxes directly to your residence or studio.',
      },
      {
        heading: 'Do you offer custom dimensions?',
        body: 'Selected dining tables and sideboards can be tailored in length and stone finish. Book a consultation to review custom architectural tolerances.',
      },
      {
        heading: 'Do you partner with interior architects and trade?',
        body: 'Yes, our Trade Program offers dedicated specification sheets, 3D CAD/BIM files, and tiered project pricing for verified architects and interior studios.',
      },
    ],
  },
  privacy: {
    eyebrow: 'LEGAL',
    title: 'Privacy Policy',
    sections: [
      {
        heading: 'Respect for Your Information',
        body: 'Atelier Sorel collects only the contact details you voluntarily provide when reserving pieces, subscribing to our journal, or scheduling a design consultation. We never sell or lease client data.',
      },
      {
        heading: 'Local Preferences',
        body: 'Your shopping bag, saved wishlist, and cookie preferences are stored locally in your browser so your selections remain intact between visits.',
      },
    ],
  },
  terms: {
    eyebrow: 'LEGAL',
    title: 'Terms of Service',
    sections: [
      {
        heading: 'Pricing & Natural Variations',
        body: 'Displayed prices are illustrative USD catalog figures. Because our pieces are crafted from genuine solid timber, natural stone, and unbleached textiles, subtle variations in wood grain and travertine veining are inherent signatures of authenticity.',
      },
      {
        heading: 'Client Reservations',
        body: 'Submitting an order reservation or consultation inquiry in this storefront generates a reference summary for studio confirmation prior to final production scheduling.',
      },
    ],
  },
};
