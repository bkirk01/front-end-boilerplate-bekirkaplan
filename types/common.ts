interface BaseItem {
  id: string | number;
  name: string;
  image: string;
  details: string[];
}

interface DetailItem extends BaseItem {
  badges?: {
    text: string;
    color: string;
  }[];
  info: {
    label: string;
    value: string | number;
  }[];
  stats?: {
    name: string;
    value: number;
    max: number;
    color: string;
  }[];
  list?: {
    title: string;
    items: string[];
  };
}

export type { BaseItem, DetailItem };
