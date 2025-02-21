import type { ICBaseCardDetailItem } from "./common.types";

export const IPOKEMON_COLORS: Record<string, string> = {
  normal: "gray",
  fire: "red",
  water: "blue",
  electric: "yellow",
  grass: "green",
  ice: "sky",
  fighting: "orange",
  poison: "purple",
  ground: "amber",
  flying: "indigo",
  psychic: "pink",
  bug: "stone", // Changed from 'lime' to 'stone' for brown colors
  rock: "zinc",
  ghost: "violet",
  dragon: "rose",
  dark: "slate",
  steel: "zinc",
  fairy: "fuchsia",
};

export const IPOKEMON_GRADIENTS: Record<string, { from: string; to: string }> =
  {
    normal: { from: "gray-500", to: "gray-600" },
    fire: { from: "red-500", to: "red-600" },
    water: { from: "blue-500", to: "blue-600" },
    electric: { from: "yellow-500", to: "yellow-600" },
    grass: { from: "green-500", to: "green-600" },
    ice: { from: "sky-500", to: "sky-600" },
    fighting: { from: "orange-500", to: "orange-600" },
    poison: { from: "purple-500", to: "purple-600" },
    ground: { from: "amber-500", to: "amber-600" },
    flying: { from: "indigo-500", to: "indigo-600" },
    psychic: { from: "pink-500", to: "pink-600" },
    bug: { from: "stone-500", to: "stone-600" }, // Changed from 'lime' to 'stone' for brown colors
    rock: { from: "zinc-500", to: "zinc-600" },
    ghost: { from: "violet-500", to: "violet-600" },
    dragon: { from: "rose-500", to: "rose-600" },
    dark: { from: "slate-500", to: "slate-600" },
    steel: { from: "zinc-500", to: "zinc-600" },
    fairy: { from: "fuchsia-500", to: "fuchsia-600" },
  };

export interface IPokemonBaseCardSpecifications extends ICBaseCardDetailItem {
  type: string;
  badges?: { text: string; color: string }[];
  height?: number;
  weight?: number;
}
