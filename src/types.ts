export interface UserLoginFormData {
  email: string;
  password: string;
}
export interface UserRegistrationData extends UserLoginFormData {
  name: string;
  age: number;
}
export interface AuthorizedUser {
  id: string;
  name: string;
  avatar: string;
  backgroundFon: string;
  age: string;
  role: string;
  email: string;
  country: string;
  city: string;
  color: string;
  gender: string;
  date: string;
  biography: string;
}
export interface SavedUserObject {
  token: string;
  user: Pick<AuthorizedUser, "name" | "role" | "id">;
}

export interface AuthContextTypes {
  isAuth: boolean;
  isReady: boolean;
  userData: SavedUserObject;
  login: (data: UserLoginFormData) => void;
  logout: () => void;
  isLoading: boolean;
}

export interface PokemonShortData {
  name: string;
  url: string;
}
export interface PokemonsResponse {
  count: number;
  next: any;
  previous: any;
  results: PokemonShortData[];
}
