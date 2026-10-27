export type CarCategory = 'All' | 'SUV' | 'Sedan' | 'Economy' | 'Luxury' | 'Pickup' | 'Minivan';

export interface CarSpecs {
  gearBox: 'Automatic' | 'Manual' | 'Tiptronic';
  fuel: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  doors: number;
  airConditioner: boolean;
  seats: number;
  distanceLimit: string;
  engineCapacity?: string;
  modelYear?: string;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  category: Exclude<CarCategory, 'All'>;
  dailyRatePkr: number;
  weeklyRateDiscountPercent?: number;
  monthlyRatePkr?: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: string;
  seats: number;
  airConditioner: boolean;
  image: string;
  altImages?: string[];
  specs: CarSpecs;
  equipment: string[];
  badge?: 'Available Now' | 'Popular' | 'Executive Choice' | 'Best Value' | 'Chauffeur Option';
  description: string;
  isAvailable: boolean;
  popularRank?: number;
}

export interface BookingSearch {
  city: 'Peshawar' | 'Mardan' | 'All KP';
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  returnDate: string;
  carType: string;
}

export interface BookingRequest {
  id: string;
  carId: string;
  carName: string;
  customerName: string;
  phone: string;
  city: string;
  pickupDate: string;
  returnDate: string;
  days: number;
  withDriver: boolean;
  totalAmountPkr: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
  notes?: string;
}

export interface AdminStats {
  totalFleet: number;
  activeRentals: number;
  monthlyEarningsPkr: number;
  pendingInquiries: number;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
}
