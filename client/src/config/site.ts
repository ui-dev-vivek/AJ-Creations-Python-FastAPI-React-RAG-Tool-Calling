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

// Categories for Cosmetics & Home Decoration
export const categories = [
  {
    id: "skincare",
    name: "Skincare",
    icon: "✨",
    image: "/categories/skincare.jpg",
    description: "Nourish your skin with premium products",
    subcategories: [
      { id: "cleansers", name: "Cleansers & Face Wash", count: 124 },
      { id: "moisturizers", name: "Moisturizers & Creams", count: 89 },
      { id: "serums", name: "Serums & Essences", count: 67 },
      { id: "sunscreen", name: "Sunscreen & SPF", count: 45 },
      { id: "masks", name: "Face Masks & Peels", count: 78 },
      { id: "eye-care", name: "Eye Care", count: 34 },
    ],
  },
  {
    id: "makeup",
    name: "Makeup",
    icon: "💄",
    image: "/categories/makeup.jpg",
    description: "Express yourself with vibrant colors",
    subcategories: [
      { id: "face", name: "Foundation & Face", count: 156 },
      { id: "lips", name: "Lipsticks & Lip Care", count: 234 },
      { id: "eyes", name: "Eye Makeup", count: 189 },
      { id: "nails", name: "Nail Art & Polish", count: 145 },
      { id: "brushes", name: "Brushes & Tools", count: 67 },
      { id: "palettes", name: "Makeup Palettes", count: 89 },
    ],
  },
  {
    id: "haircare",
    name: "Hair Care",
    icon: "💇‍♀️",
    image: "/categories/haircare.jpg",
    description: "Healthy & beautiful hair solutions",
    subcategories: [
      { id: "shampoo", name: "Shampoo & Conditioner", count: 98 },
      { id: "treatments", name: "Hair Treatments", count: 56 },
      { id: "styling", name: "Styling Products", count: 78 },
      { id: "oils", name: "Hair Oils & Serums", count: 45 },
      { id: "color", name: "Hair Color", count: 67 },
      { id: "tools", name: "Hair Tools", count: 34 },
    ],
  },
  {
    id: "fragrance",
    name: "Fragrances",
    icon: "🌸",
    image: "/categories/fragrance.jpg",
    description: "Signature scents for every occasion",
    subcategories: [
      { id: "perfume", name: "Perfumes", count: 234 },
      { id: "body-mist", name: "Body Mists", count: 89 },
      { id: "deodorant", name: "Deodorants", count: 67 },
      { id: "gift-sets", name: "Gift Sets", count: 45 },
      { id: "attar", name: "Attar & Traditional", count: 56 },
    ],
  },
  {
    id: "home-decor",
    name: "Home Decor",
    icon: "🏠",
    image: "/categories/home-decor.jpg",
    description: "Transform your space beautifully",
    subcategories: [
      { id: "wall-art", name: "Wall Art & Frames", count: 178 },
      { id: "vases", name: "Vases & Planters", count: 123 },
      { id: "candles", name: "Candles & Holders", count: 89 },
      { id: "mirrors", name: "Mirrors", count: 67 },
      { id: "clocks", name: "Clocks", count: 45 },
      { id: "showpieces", name: "Showpieces & Figurines", count: 156 },
    ],
  },
  {
    id: "lighting",
    name: "Lighting",
    icon: "💡",
    image: "/categories/lighting.jpg",
    description: "Illuminate your home with style",
    subcategories: [
      { id: "lamps", name: "Table & Floor Lamps", count: 134 },
      { id: "ceiling", name: "Ceiling Lights", count: 89 },
      { id: "wall-lights", name: "Wall Lights", count: 67 },
      { id: "fairy-lights", name: "Fairy & String Lights", count: 78 },
      { id: "led", name: "LED Strips", count: 45 },
    ],
  },
  {
    id: "furnishing",
    name: "Home Furnishing",
    icon: "🛋️",
    image: "/categories/furnishing.jpg",
    description: "Comfort meets elegance",
    subcategories: [
      { id: "cushions", name: "Cushions & Covers", count: 189 },
      { id: "curtains", name: "Curtains & Blinds", count: 134 },
      { id: "rugs", name: "Rugs & Carpets", count: 98 },
      { id: "bedding", name: "Bedding Sets", count: 156 },
      { id: "throws", name: "Throws & Blankets", count: 67 },
    ],
  },
  {
    id: "bath",
    name: "Bath & Body",
    icon: "🛁",
    image: "/categories/bath.jpg",
    description: "Luxurious bath experience",
    subcategories: [
      { id: "body-wash", name: "Body Wash & Soaps", count: 145 },
      { id: "body-lotion", name: "Body Lotions", count: 123 },
      { id: "bath-bombs", name: "Bath Bombs & Salts", count: 78 },
      { id: "scrubs", name: "Body Scrubs", count: 56 },
      { id: "bath-accessories", name: "Bath Accessories", count: 89 },
    ],
  },
];

// Featured Brands
export const featuredBrands = [
  {
    id: "lakme",
    name: "Lakmé",
    logo: "/brands/lakme.png",
    discount: "Up to 30% Off",
  },
  {
    id: "maybelline",
    name: "Maybelline",
    logo: "/brands/maybelline.png",
    discount: "Buy 2 Get 1",
  },
  {
    id: "loreal",
    name: "L'Oréal Paris",
    logo: "/brands/loreal.png",
    discount: "Min 20% Off",
  },
  {
    id: "nykaa",
    name: "Nykaa",
    logo: "/brands/nykaa.png",
    discount: "Flat 25% Off",
  },
  { id: "mac", name: "MAC", logo: "/brands/mac.png", discount: "New Arrivals" },
  {
    id: "forest-essentials",
    name: "Forest Essentials",
    logo: "/brands/forest.png",
    discount: "Premium Range",
  },
  {
    id: "ikea",
    name: "IKEA",
    logo: "/brands/ikea.png",
    discount: "Home Essentials",
  },
  {
    id: "home-centre",
    name: "Home Centre",
    logo: "/brands/homecentre.png",
    discount: "Flat 40% Off",
  },
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
