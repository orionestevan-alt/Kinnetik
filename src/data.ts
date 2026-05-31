import { Product, Testimonial, Order, UserProfile } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'knt-001',
    name: 'Kinetic Aero-Knitt Carbon V1',
    category: 'Men',
    subcategory: 'Shoes',
    sport: 'Running',
    price: 249,
    originalPrice: 249,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Volt Green', hex: '#84cc16' },
      { name: 'Core Black', hex: '#111827' },
      { name: 'Snow White', hex: '#ffffff' }
    ],
    sizes: ['7', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
    description: 'Designed in partnership with elite high-altitude marathon runners, the Aero-Knitt Carbon V1 features a continuous, bio-mapped woven upper paired with a dual-density supercritical Nitrogen-infused midsole and a proprietary spoon-shaped curved 3D Carbon-fiber plate for maximum structural energy return during high-velocity activities.',
    features: [
      'Supercritical Aero-Foam cushioning provides 87% energy feedback',
      'Continuous 3D Carbon Fiber Plate stabilizes foot transit',
      'Organic-patterned Aero-Knitt breathable structure adapts as foot expands',
      'Reinforced ultra-thin TPU heel-cup secures rear-foot during hard turns'
    ],
    isBestSeller: true,
    isNewArrival: false,
    isSale: false
  },
  {
    id: 'knt-002',
    name: 'Apex Phantom Stealth Runner',
    category: 'Women',
    subcategory: 'Shoes',
    sport: 'Running',
    price: 189,
    originalPrice: 220,
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Hyper Pink', hex: '#ec4899' },
      { name: 'Ice Purple', hex: '#a855f7' },
      { name: 'Core Black', hex: '#111827' }
    ],
    sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5'],
    description: 'Fusing street-luxe style with track performance, the Apex Phantom features an ultra-responsive cushioning matrix. Sleek profile detailing combined with high-contrast pastel gradients creates a cinematic look for both lifestyle wear and competitive racing.',
    features: [
      'Seamless multi-weave upper avoids high-friction points for blister prevention',
      'Dual foam density shock absorption tuned for pavement running',
      'Reflective metallic elements glow under low-intensity street lights',
      'Recycled ocean-bound plastics comprise 50% of woven upper yarn'
    ],
    isBestSeller: false,
    isNewArrival: true,
    isSale: true
  },
  {
    id: 'knt-003',
    name: 'Quantum Court Master II',
    category: 'Men',
    subcategory: 'Shoes',
    sport: 'Basketball',
    price: 210,
    rating: 4.7,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'White Cobalt', hex: '#1d4ed8' },
      { name: 'Core Black', hex: '#111827' },
      { name: 'Crimson Red', hex: '#dc2626' }
    ],
    sizes: ['8', '8.5', '9', '9.5', '10', '10.5', '11', '12', '13'],
    description: 'Built for high-friction indoor courts, the Quantum Court Master II delivers unmatched lateral lock-down and immediate vertical rebound. Reinforced side-walls protect during aggressive crossovers while the high-top collar shelters the ankle complex.',
    features: [
      'Herringbone directional rubber outsole offers hyper-sticky grip',
      'Exoskeletal midfoot cage secures lateral feet during rapid cuts',
      'Air-dome shock absorbs landings near the rim',
      'Dual eyelet laces construct custom fitting pathways'
    ],
    isBestSeller: true,
    isNewArrival: false,
    isSale: false
  },
  {
    id: 'knt-004',
    name: 'Velocity Prime Windbreaker Jacket',
    category: 'Men',
    subcategory: 'Apparel',
    sport: 'Training',
    price: 155,
    rating: 4.6,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Steel Grey', hex: '#6b7280' },
      { name: 'Core Black', hex: '#111827' },
      { name: 'Snow White', hex: '#ffffff' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'An elemental barrier engineered for all-weather runners. The Velocity Prime Windbreaker combines hyper-light water-resistant membranes with back-channel micro-ventilation ports to release heat while sealing out driving rain and cold wind.',
    features: [
      'Durable Water Repellent (DWR) surface finish completely blocks moisture',
      'Ultra-packable design stows away inside chest utility zipper pocket',
      'Aero-dynamic hood features dual adjustment toggles for secure fit',
      'Thumb-loop sleeves prevent slide-up during rapid arm swings'
    ],
    isBestSeller: false,
    isNewArrival: true,
    isSale: false
  },
  {
    id: 'knt-005',
    name: 'Aero-Weave Fitted Training Hoodie',
    category: 'Women',
    subcategory: 'Apparel',
    sport: 'Training',
    price: 120,
    rating: 4.9,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Lilac Frost', hex: '#cbd5e1' },
      { name: 'Obsidian Black', hex: '#1e293b' },
      { name: 'Chalk Rose', hex: '#fda4af' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Engineered with variable-weave compression areas, the Aero-Weave Training Hoodie stabilizes core muscles while granting unobstructed arm orbit. Ideal for cold weather workouts or luxury daily leisure.',
    features: [
      'Rapid-Dry proprietary yarn sweeps perspiration away in seconds',
      'Four-way knit flexibility adapts to high-impact stretches',
      'Zero-scuff internal seams avoid friction heat',
      'Concealed cards and key sleeve inside side hip seam'
    ],
    isBestSeller: true,
    isNewArrival: false,
    isSale: false
  },
  {
    id: 'knt-006',
    name: 'Stryker Carbon Turf Cleats',
    category: 'Men',
    subcategory: 'Shoes',
    sport: 'Football',
    price: 195,
    originalPrice: 225,
    rating: 4.7,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'White & Crimson', hex: '#b91c1c' },
      { name: 'Pitch Black', hex: '#0f172a' }
    ],
    sizes: ['7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
    description: 'Precision ball control meets aggressive acceleration. Designed with lightweight synthetic skins and asymmetrical lacing systems, the Stryker Cleat gives an expansive strike zone while the multi-stud design delivers maximum traction on artificial turf.',
    features: [
      'Micro-texture outer shell improves high-speed ball-grip precision',
      'Dual-split composite outsole improves flexibility at high cadences',
      'Carbon-fiber composite chassis prevents mid-foot rotation and fatigue',
      'Ultra flat lacing reduces direct striking pressure on arches'
    ],
    isBestSeller: false,
    isNewArrival: false,
    isSale: true
  },
  {
    id: 'knt-007',
    name: 'Kinetic Premium Commuter Duffel',
    category: 'Sports',
    subcategory: 'Accessories',
    price: 95,
    rating: 4.8,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Armor Grey', hex: '#4b5563' },
      { name: 'Matte Black', hex: '#111827' }
    ],
    sizes: ['One Size'],
    description: 'A modular, ballistic-nylon transit duffel built for modern hybrid life. Featuring isolated, ventilated compartments for wet clothes or training shoes, alongside padded sleeves that protect computing assets up to 16".',
    features: [
      '900D water-repellent ballistic nylon resists abrasions and spills',
      'Dual stowable backpack straps enable multiple carrying modes',
      'Deodorizing, antimicrobial lined shoe partition blocks cross-cargo odor',
      'TSA-ready fully lay-flat laptop slot simplifies security transits'
    ],
    isBestSeller: true,
    isNewArrival: true,
    isSale: false
  },
  {
    id: 'knt-008',
    name: 'Apex Track Compression Pants',
    category: 'Women',
    subcategory: 'Apparel',
    sport: 'Training',
    price: 85,
    rating: 4.5,
    reviewsCount: 44,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Dusty Rose', hex: '#f43f5e' },
      { name: 'Midnight Charcoal', hex: '#334155' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Offering targeted abdominal and major thigh muscle group support, these advanced compression tights reduce muscular vibration and accelerate recovery while maintaining absolute luxury design cues and comfort.',
    features: [
      'Wide high-waisted bands hug comfortably and do not roll',
      'High-gauge opaque material provides 100% concealment during squats',
      'Hidden vertical pocket on side fits large phone profiles seamlessly',
      'Breathability panel behind knees allows localized temperature drop'
    ],
    isBestSeller: false,
    isNewArrival: false,
    isSale: false
  },
  {
    id: 'knt-009',
    name: 'Kids Lunar Leap Running Shoes',
    category: 'Kids',
    subcategory: 'Shoes',
    sport: 'Running',
    price: 75,
    rating: 4.6,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Neon Yellow', hex: '#eab308' },
      { name: 'Ocean Blue', hex: '#0284c7' }
    ],
    sizes: ['3Y', '4Y', '5Y', '6Y'],
    description: 'Durable, cushion-focused, and incredibly easy for young active feet to slide into. The Lunar Leap combines high-visibility day-glo safety configurations with double-stitched toe protectors to outlast schoolyards and tracks alike.',
    features: [
      'Elastic pull-close lacing simplifies fit for children',
      'Highly flexible outsole mimics and respects natural skeletal development',
      'Durable vulcanized rubber bumper guards against front abrasion',
      'Ortholite breathable inner pads block fungal development'
    ],
    isBestSeller: false,
    isNewArrival: true,
    isSale: false
  },
  {
    id: 'knt-010',
    name: 'Precision Laser-Cut Athletics Cap',
    category: 'Sports',
    subcategory: 'Accessories',
    sport: 'Training',
    price: 45,
    rating: 4.8,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Core Black', hex: '#111827' },
      { name: 'Sleek Grey', hex: '#9ca3af' },
      { name: 'Pure White', hex: '#ffffff' }
    ],
    sizes: ['One Size'],
    description: 'An ultra-lightweight running cap designed with micro-perforations to channel heat. Crucial for scorching summer marathons, it has an flexible brim that returns to shape even when compressed in backpacks.',
    features: [
      'Hydrophobic thread construction sheds rain instantly',
      'Precision laser-cut side vents maximize heat release',
      'Adjustable soft-clasp closure avoids hair pinching',
      'Moisture-absorbent internal headband bars sunscreen run'
    ],
    isBestSeller: false,
    isNewArrival: false,
    isSale: false
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Marcus Sterling',
    role: 'Competitive Ultramarathoner',
    rating: 5,
    comment: 'The Carbon V1 is a paradigm shift. The responsiveness of the Nitrogen-injected midsole feels like you are getting pushed forward. I trimmed nearly 4 minutes off my personal half-marathon record on first use.',
    date: 'May 12, 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 't-2',
    name: 'Elena Rostova',
    role: 'Fitness Coach & Athlete',
    rating: 5,
    comment: 'Minimalist luxury at its finest. Usually, sportswear that looks this good performs poorly. Kinetic has done the impossible—crafting world-class track gear that also looks incredible in high-fashion streetwear editorial shoots.',
    date: 'April 28, 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 't-3',
    name: 'Hassan Al-Jamil',
    role: 'Semi-Pro Basketball Player',
    rating: 5,
    comment: 'The side-lock cage on the Court Master is elite. Hard crossover steps feel intensely secure. Plus, the high-top padding and aesthetic is pure Nike / Jordan level prestige. Highly recommended.',
    date: 'May 20, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  }
];

export const SAMPLE_USER: UserProfile = {
  name: 'Alex Mercer',
  email: 'alex.mercer@kinetic.com',
  phone: '+1 (555) 7943-2009',
  address: {
    street: '742 Infinite Loop, Velocity District',
    city: 'New York',
    postalCode: '10001'
  },
  preferredSize: 'US 10 / App Medium',
  memberSince: 'December 2024'
};

export const SAMPLE_ORDERS: Order[] = [
  {
    id: 'KNT-84291',
    date: '2026-05-28',
    items: [
      {
        productId: 'knt-001',
        productName: 'Kinetic Aero-Knitt Carbon V1',
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
        price: 249,
        quantity: 1,
        selectedSize: '10',
        selectedColor: 'Volt Green'
      },
      {
        productId: 'knt-010',
        productName: 'Precision Laser-Cut Athletics Cap',
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
        price: 45,
        quantity: 1,
        selectedSize: 'One Size',
        selectedColor: 'Core Black'
      }
    ],
    total: 294,
    status: 'Shipped',
    trackingNumber: '1Z999AA10123456784',
    carrier: 'DHL Express Prestige',
    estimatedDelivery: 'June 03, 2026',
    shippingAddress: {
      fullName: 'Alex Mercer',
      street: '742 Infinite Loop, Velocity District',
      city: 'New York',
      postalCode: '10001',
      phone: '+1 (555) 7943-2009'
    }
  },
  {
    id: 'KNT-73902',
    date: '2026-04-15',
    items: [
      {
        productId: 'knt-005',
        productName: 'Aero-Weave Fitted Training Hoodie',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
        price: 120,
        quantity: 1,
        selectedSize: 'M',
        selectedColor: 'Obsidian Black'
      }
    ],
    total: 120,
    status: 'Delivered',
    trackingNumber: '1Z999AA10123956481',
    carrier: 'FedEx Priority',
    estimatedDelivery: 'April 18, 2026',
    shippingAddress: {
      fullName: 'Alex Mercer',
      street: '742 Infinite Loop, Velocity District',
      city: 'New York',
      postalCode: '10001',
      phone: '+1 (555) 7943-2009'
    }
  }
];

export const FAQS = [
  {
    q: 'How does the 3D Carbon Plate inside the Carbon V1 function?',
    a: 'The plate acts as a spring-lever, loaded when your foot strikes and flexes, and releasing energy when your weight transfers to the toes. This reduces muscle fatigue and supports forward momentum.'
  },
  {
    q: 'What is your shipping & return policy?',
    a: 'We offer complimentary express shipping worldwide on all orders exceeding $150. If you are not satisfied with the fit or performance, return any unworn items within 30 days of receiving them—using our pre-paid DHL shipping packet.'
  },
  {
    q: 'Do you offer an athlete verification program?',
    a: 'Yes. Elite athletes, personal coaches, and military personnel qualify for our 20% Kinetic performance registry discount. Simply upload your credentials or connect via ID.me during verification inside your user profile.'
  },
  {
    q: 'Are your shoes vegan and carbon-neutral?',
    a: 'More than 70% of our products utilize recycled synthetic yarns (such as Parley ocean plastic). We pledge complete carbon neutrality across our manufacturing lines by 2028, neutralising all shipping carbon offsets dynamically.'
  }
];
