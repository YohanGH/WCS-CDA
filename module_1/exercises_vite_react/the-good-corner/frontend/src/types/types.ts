export type AdType = {
  id: number;
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  createdAt: string;
  category: CategoryType;
  tags?: Tag[];
};

export type CategoryType = {
  id: number
  title: string;
}

export type Tag = {
  id: number
  title: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

export type CardProps = {
  title: string;
  price: number;
  imageSrc: string;
  link: string;
};

export interface GlobalContextProps {
  cartTotal: number;
  onAddToCart: (price: number) => void;
  isAuthenticated: boolean;
}

export type SearchFormProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export type AdListProps = {
  categoryId?: number;
}

export type DarkModeContextProps = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export type CategoryWithAds = {
  id: number;
  title: string;
  ads: AdType[];
};

export type User = {
  id: string
  email: string
}

export type AuthContextProps = {
  user: User | null;
  isLoading: boolean;
  refetchUser: () => void;
  logout: () => void;
}
