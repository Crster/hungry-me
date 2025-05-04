export interface Restaurant {
  id: string;
  name: string;
  address?: string;
  cuisine: string[];
  rating?: number;
  price_level?: number;
  operating_hours?: string;
  website?: string;
  description?: string;
  photos: string[];
}
