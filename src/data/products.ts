
export const products = [
  {
    id: 1,
    name: "VAPES PREMIUM",
    description: "Vapes élégantes avec design moderne et performance exceptionnelle. Batterie longue durée et vapeur dense.",
    price: 39.99,
    icon: "💨",
    category: "vapes",
    features: ["Batterie 2000mAh", "Design élégant", "Vapeur dense"],
    stock: 15,
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    name: "E-LIQUIDES PREMIUM",
    description: "Saveurs artisanales créées par nos experts. Sans diacétyle, qualité pharmaceutique.",
    price: 12.99,
    icon: "💧",
    category: "eliquids",
    features: ["Saveurs naturelles", "Sans diacétyle", "Qualité premium"],
    stock: 28,
    rating: 4.9,
    inStock: true
  },
  {
    id: 3,
    name: "GUMS NICOTINÉS",
    description: "Gums discrets à libération contrôlée. Idéal pour réduire progressivement la consommation.",
    price: 16.99,
    icon: "🍬",
    category: "gums",
    features: ["Libération contrôlée", "Discrets", "Effet progressif"],
    stock: 22,
    rating: 4.7,
    inStock: true
  },
  {
    id: 4,
    name: "PACK DÉCOUVERTE",
    description: "Kit complet pour débuter: vape, 2 e-liquides et gums. Parfait pour commencer en douceur.",
    price: 59.99,
    icon: "📦",
    category: "packs",
    features: ["Kit complet", "Guide inclus", "Prix avantageux"],
    stock: 8,
    rating: 5.0,
    isPopular: true,
    inStock: true
  }
];

export const categories = [
  {
    id: 1,
    name: "Vapes Premium",
    description: "Découvrez notre gamme de vapes haut de gamme avec des performances exceptionnelles.",
    image: "💨",
    count: 24,
    featured: true
  },
  {
    id: 2,
    name: "E-Liquides",
    description: "Large sélection de saveurs premium créées par nos maîtres artisans.",
    image: "💧",
    count: 156
  },
  {
    id: 3,
    name: "Kits Débutants",
    description: "Kits complets parfaits pour commencer votre transition en douceur.",
    image: "📦",
    count: 12
  },
  {
    id: 4,
    name: "Gums Nicotinés",
    description: "Alternative discrète et pratique pour gérer votre consommation.",
    image: "🍬",
    count: 18
  },
  {
    id: 5,
    name: "Accessoires",
    description: "Tous les accessoires pour optimiser votre expérience vape.",
    image: "🔧",
    count: 89
  }
];

export const trendingProducts = [
  {
    id: 101,
    name: "Vapouriz Premium Blackcurrant E-Liquid 10ml",
    description: "Saveur cassis intense avec finition premium. Ratio PG/VG optimisé.",
    price: 2.50,
    originalPrice: 3.99,
    image: "💜",
    rating: 4.8,
    reviews: 124,
    badge: "OFFRE -37%",
    inStock: true
  },
  {
    id: 102,
    name: "Bar Juice 5000 Triple Mango 10ml",
    description: "Triple concentration de mangue tropicale pour une explosion de saveurs.",
    price: 3.99,
    image: "🥭",
    rating: 4.9,
    reviews: 89,
    inStock: true
  },
  {
    id: 103,
    name: "Pod Kit Starter Premium",
    description: "Kit de démarrage complet avec 2 pods et chargeur rapide inclus.",
    price: 24.99,
    originalPrice: 29.99,
    image: "📱",
    rating: 4.7,
    reviews: 203,
    badge: "NOUVEAU",
    inStock: true
  },
  {
    id: 104,
    name: "Mix & Match 4 E-Liquides",
    description: "Choisissez 4 e-liquides parmi notre sélection premium à prix avantageux.",
    price: 10.00,
    originalPrice: 15.96,
    image: "🌈",
    rating: 4.6,
    reviews: 67,
    badge: "PACK",
    inStock: true
  }
];

export const testimonials = [
  {
    content: "Service client exceptionnel et livraison ultra rapide. Les produits sont de qualité premium, je recommande vivement !",
    author: "Marc Lebreton",
    rating: 5,
    location: "Paris",
    verified: true
  },
  {
    content: "Les gums m'ont vraiment aidé à réduire ma consommation progressivement. Approche bienveillante et efficace.",
    author: "Sophie Dubois", 
    rating: 5,
    location: "Lyon",
    verified: true
  },
  {
    content: "Excellent choix de produits avec un design soigné. L'équipe connaît vraiment son domaine.",
    author: "Thomas Petit",
    rating: 5,
    location: "Bordeaux",
    verified: true
  },
  {
    content: "Transition réussie grâce à leurs conseils personnalisés. Site sécurisé et fiable, parfait !",
    author: "Marie Curie",
    rating: 5,
    location: "Marseille",
    verified: true
  }
];
