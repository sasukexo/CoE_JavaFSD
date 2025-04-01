export interface Movie {
  id: number;
  name: string;
  image: string;
  rating: number | string;
  genre?: string;    // Made optional
  director?: string; // Made optional
  imdb?: number;     // Made optional
  price?: number;    // Made optional
}
