export type Ad = {
  id: number;
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  createdAt: string;
  category: { id: number };
  tags?: { id: number }[];
};

export type Category = {
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
  onAddToCart: (price: number) => void;
};

export interface GlobalContextProps {
  cartTotal: number;
  onAddToCart: (price: number) => void;
}

export type SearchFormProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export type AdListProps = {
  onAddToCart: (price: number) => void;
}

export type DarkModeContextProps = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}