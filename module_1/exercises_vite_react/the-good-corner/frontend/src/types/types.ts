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