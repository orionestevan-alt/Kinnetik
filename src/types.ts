export interface Product {
  id: string;
  name: string;
  category: 'Men' | 'Women' | 'Kids' | 'Sports';
  subcategory: 'Shoes' | 'Apparel' | 'Accessories';
  sport?: 'Running' | 'Basketball' | 'Football' | 'Training' | 'Golf';
  price: number;
  originalPrice?: number; // For sale items
  rating: number;
  reviewsCount: number;
  image: string; // Master image
  gallery: string[]; // Additional views
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  features: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isSale?: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: { name: string; hex: string };
  selectedSize: string;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface Order {
  id: string;
  date: string;
  items: {
    productId: string;
    productName: string;
    image: string;
    price: number;
    quantity: number;
    selectedSize: string;
    selectedColor: string;
  }[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    phone: string;
  };
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  preferredSize: string;
  memberSince: string;
}
