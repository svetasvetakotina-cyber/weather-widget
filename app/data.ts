export type Coffee = {
  id: string
  name: string
  origin: string
  flag: string
  region: 'Europe' | 'Americas' | 'Africa' | 'Asia' | 'Oceania'
  description: string
  notes: string[]
  price: number
  roast: 'Light' | 'Medium' | 'Dark'
  emoji: string
}

export const COFFEES: Coffee[] = [
  {
    id: 'ethiopia-yirgacheffe',
    name: 'Yirgacheffe',
    origin: 'Ethiopia',
    flag: '🇪🇹',
    region: 'Africa',
    description: 'The birthplace of coffee. Bright, floral, with notes of bergamot and citrus blossom.',
    notes: ['Jasmine', 'Bergamot', 'Lemon'],
    price: 7.5,
    roast: 'Light',
    emoji: '☕',
  },
  {
    id: 'colombia-huila',
    name: 'Huila Supremo',
    origin: 'Colombia',
    flag: '🇨🇴',
    region: 'Americas',
    description: 'Andean highlands beans, balanced and silky with a long sweet finish.',
    notes: ['Caramel', 'Red apple', 'Cocoa'],
    price: 6.9,
    roast: 'Medium',
    emoji: '☕',
  },
  {
    id: 'italy-espresso',
    name: 'Napoli Espresso',
    origin: 'Italy',
    flag: '🇮🇹',
    region: 'Europe',
    description: 'Classic Neapolitan dark roast. Thick crema, deep bitterness, square of dark chocolate.',
    notes: ['Dark chocolate', 'Toasted nut', 'Smoke'],
    price: 5.5,
    roast: 'Dark',
    emoji: '☕',
  },
  {
    id: 'vietnam-cafe-sua-da',
    name: 'Cà Phê Sữa Đá',
    origin: 'Vietnam',
    flag: '🇻🇳',
    region: 'Asia',
    description: 'Robusta drip with condensed milk over ice. Bold, sweet, unmistakably Saigon.',
    notes: ['Condensed milk', 'Dark cocoa', 'Vanilla'],
    price: 6.2,
    roast: 'Dark',
    emoji: '🧋',
  },
  {
    id: 'turkey-kahve',
    name: 'Türk Kahvesi',
    origin: 'Turkey',
    flag: '🇹🇷',
    region: 'Europe',
    description: 'Finely ground beans brewed in a cezve. Served thick with sweet lokum on the side.',
    notes: ['Cardamom', 'Honey', 'Walnut'],
    price: 5.9,
    roast: 'Dark',
    emoji: '☕',
  },
  {
    id: 'brazil-santos',
    name: 'Santos Bourbon',
    origin: 'Brazil',
    flag: '🇧🇷',
    region: 'Americas',
    description: 'Cerrado plateau favorite. Nutty, smooth, low acidity — perfect everyday cup.',
    notes: ['Hazelnut', 'Milk chocolate', 'Brown sugar'],
    price: 6.5,
    roast: 'Medium',
    emoji: '☕',
  },
  {
    id: 'kenya-aa',
    name: 'Kenya AA',
    origin: 'Kenya',
    flag: '🇰🇪',
    region: 'Africa',
    description: 'Top-grade AA beans from Nyeri. Wine-like body, blackcurrant brightness, sparkling finish.',
    notes: ['Blackcurrant', 'Grapefruit', 'Tomato'],
    price: 8.2,
    roast: 'Light',
    emoji: '☕',
  },
  {
    id: 'japan-kyoto-cold-brew',
    name: 'Kyoto Cold Brew',
    origin: 'Japan',
    flag: '🇯🇵',
    region: 'Asia',
    description: 'Slow tower-dripped over 8 hours. Crystal clear, tea-like, profoundly delicate.',
    notes: ['Jasmine tea', 'Cane sugar', 'Stone fruit'],
    price: 9.0,
    roast: 'Medium',
    emoji: '🥶',
  },
  {
    id: 'guatemala-antigua',
    name: 'Antigua Volcanic',
    origin: 'Guatemala',
    flag: '🇬🇹',
    region: 'Americas',
    description: 'Grown on the slopes of three volcanoes. Spicy, smoky, full-bodied.',
    notes: ['Spice', 'Toffee', 'Smoke'],
    price: 7.1,
    roast: 'Medium',
    emoji: '🌋',
  },
  {
    id: 'australia-flat-white',
    name: 'Melbourne Flat White',
    origin: 'Australia',
    flag: '🇦🇺',
    region: 'Oceania',
    description: 'Double ristretto under silky microfoam. The Antipodean way of doing milk coffee.',
    notes: ['Brown butter', 'Cream', 'Caramel'],
    price: 6.8,
    roast: 'Medium',
    emoji: '🥛',
  },
  {
    id: 'morocco-spiced',
    name: 'Marrakech Spiced',
    origin: 'Morocco',
    flag: '🇲🇦',
    region: 'Africa',
    description: 'Brewed with cinnamon, cardamom, black pepper and a touch of sesame.',
    notes: ['Cinnamon', 'Sesame', 'Pepper'],
    price: 6.4,
    roast: 'Dark',
    emoji: '🌶️',
  },
  {
    id: 'usa-portland-pour-over',
    name: 'Portland Pour Over',
    origin: 'United States',
    flag: '🇺🇸',
    region: 'Americas',
    description: 'Pacific Northwest third-wave classic. Single origin, hand-poured, painfully precise.',
    notes: ['Peach', 'Honey', 'Black tea'],
    price: 7.8,
    roast: 'Light',
    emoji: '☕',
  },
]

export const REGIONS = ['All', 'Europe', 'Americas', 'Africa', 'Asia', 'Oceania'] as const
export type Region = (typeof REGIONS)[number]

export const COUNTRIES = [
  'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China',
  'Colombia', 'Czechia', 'Denmark', 'Egypt', 'Ethiopia', 'Finland', 'France',
  'Germany', 'Greece', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Ireland',
  'Israel', 'Italy', 'Japan', 'Kenya', 'Mexico', 'Morocco', 'Netherlands',
  'New Zealand', 'Norway', 'Philippines', 'Poland', 'Portugal', 'Romania',
  'Singapore', 'South Africa', 'South Korea', 'Spain', 'Sweden', 'Switzerland',
  'Thailand', 'Türkiye', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
  'United States', 'Vietnam',
]

export function shippingFor(country: string): number {
  const europe = ['Austria', 'Belgium', 'Czechia', 'Denmark', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'Spain', 'Sweden', 'Switzerland', 'Türkiye', 'Ukraine', 'United Kingdom']
  const americas = ['Brazil', 'Canada', 'Chile', 'Colombia', 'Mexico', 'United States']
  if (europe.includes(country)) return 4.9
  if (americas.includes(country)) return 7.9
  return 9.9
}
