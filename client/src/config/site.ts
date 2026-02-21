export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "MAVA",
  description: "Premium Cosmetics & Home Decoration - Beauty meets elegance",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Shop",
      href: "/shop",
    },
    {
      label: "New Arrivals",
      href: "/new-arrivals",
    },
    {
      label: "Best Sellers",
      href: "/best-sellers",
    },
    {
      label: "Offers",
      href: "/offers",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Shop All",
      href: "/shop",
    },
    {
      label: "New Arrivals",
      href: "/new-arrivals",
    },
    {
      label: "Best Sellers",
      href: "/best-sellers",
    },
    {
      label: "My Account",
      href: "/account",
    },
    {
      label: "My Orders",
      href: "/orders",
    },
    {
      label: "Wishlist",
      href: "/wishlist",
    },
    {
      label: "Help Center",
      href: "/help",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
  ],
  links: {
    github: "https://github.com/mava",
    twitter: "https://twitter.com/mava",
    instagram: "https://instagram.com/mava",
    facebook: "https://facebook.com/mava",
    pinterest: "https://pinterest.com/mava",
  },
};

// Categories for Cosmetics & Lifestyle Store
export const categories = [
  {
    id: "cosmetics",
    name: "Cosmetics",
    icon: "💄",
    image: "/categories/cosmetics.jpg",
    description: "Premium beauty & skincare",
    theme: "COSMETICS",
    accent: "#E75480",
    gradient: "from-[#FFD1DC] to-[#FFF9FA]",
    subcategories: [
      { id: "face", name: "Foundation & Face", count: 156 },
      { id: "lips", name: "Lipsticks & Lip Care", count: 234 },
      { id: "eyes", name: "Eye Makeup", count: 189 },
    ],
  },
  {
    id: "candiles",
    name: "Candiles Wala",
    icon: "🕯️",
    image: "/categories/candles.jpg",
    description: "Handcrafted aromatic candles",
    theme: "CANDILES",
    accent: "#FFBF00",
    gradient: "from-[#FFBF00]/20 to-[#1A1A1A]",
    subcategories: [
      { id: "scented", name: "Scented Candles", count: 45 },
      { id: "decorative", name: "Decorative Pillars", count: 32 },
      { id: "essential", name: "Essential Oil Blends", count: 28 },
    ],
  },
  {
    id: "hanky",
    name: "Hanky Wala",
    icon: "🧣",
    image: "/categories/hanky.jpg",
    description: "Pure cotton & silk handkerchiefs",
    theme: "HANKY",
    accent: "#40E0D0",
    gradient: "from-[#E0FFF0] to-[#FFFFFF]",
    subcategories: [
      { id: "cotton", name: "Pure Cotton", count: 120 },
      { id: "silk", name: "Luxury Silk", count: 45 },
      { id: "printed", name: "Hand-printed", count: 88 },
    ],
  },
  {
    id: "rasie",
    name: "Rasie Wala",
    icon: "✨",
    image: "/categories/rasie.jpg",
    description: "Luxury decorative & aesthetic items",
    theme: "RASIE",
    accent: "#D4AF37",
    gradient: "from-[#D4AF37]/30 to-[#0F0F0F]",
    subcategories: [
      { id: "sculptures", name: "Aesthetic Sculptures", count: 24 },
      { id: "table-decor", name: "Premium Table Decor", count: 56 },
      { id: "wall-accents", name: "Gold Leaf Accents", count: 18 },
    ],
  },
];

// Featured Brands
export const featuredBrands = [
  { id: "lakme", name: "Lakmé", logo: "/brands/lakme.png", discount: "Up to 30% Off" },
  { id: "maybelline", name: "Maybelline", logo: "/brands/maybelline.png", discount: "Buy 2 Get 1" },
  { id: "loreal", name: "L'Oréal Paris", logo: "/brands/loreal.png", discount: "Min 20% Off" },
  { id: "nykaa", name: "Nykaa", logo: "/brands/nykaa.png", discount: "Flat 25% Off" },
  { id: "mac", name: "MAC", logo: "/brands/mac.png", discount: "New Arrivals" },
  { id: "forest-essentials", name: "Forest Essentials", logo: "/brands/forest.png", discount: "Premium Range" },
  { id: "ikea", name: "IKEA", logo: "/brands/ikea.png", discount: "Home Essentials" },
  { id: "home-centre", name: "Home Centre", logo: "/brands/homecentre.png", discount: "Flat 40% Off" },
];

// Promotional Banners
export const promotions = [
  {
    id: "summer-sale",
    title: "Summer Glow Sale",
    subtitle: "Up to 50% OFF on Skincare",
    code: "GLOW50",
    bgColor: "from-pink-500 to-rose-500",
  },
  {
    id: "home-makeover",
    title: "Home Makeover Fest",
    subtitle: "Flat 40% OFF on Decor",
    code: "HOME40",
    bgColor: "from-amber-500 to-orange-500",
  },
  {
    id: "new-user",
    title: "New User Special",
    subtitle: "Extra 15% OFF on First Order",
    code: "NEW15",
    bgColor: "from-violet-500 to-purple-500",
  },
];

// Quick Links for Footer/Navbar
export const quickLinks = {
  customerService: [
    { label: "Track Order", href: "/track-order" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
    { label: "Store Locator", href: "/stores" },
  ],
  policies: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};
