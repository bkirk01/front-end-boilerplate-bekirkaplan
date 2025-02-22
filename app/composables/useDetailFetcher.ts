// app/composables/useDetailFetcher.ts
import { ref, type Ref } from "vue";
import { usePokemonApi } from "~/api/composables/usePokemonApi";
import { useRickAndMortyApi } from "~/api/composables/useRickAndMortyApi";
import { ERoutePaths } from "~/store/view";
import type { TCItemDetailType, TGenType } from "~/types/common";

export const useDetailFetcher = async (
  section: ERoutePaths,
  id: string
): Promise<TGenType<TCItemDetailType>> => {
  const itemData: TGenType<TCItemDetailType> = ref(undefined);

  const { getPokemonById, refMappedPokemon } = usePokemonApi();

  const { getCharacterById, refMappedCharacter } = useRickAndMortyApi();

  // Fetching logic based on section
  if (section === ERoutePaths.POKEMON) {
    await getPokemonById(Number(id));
    itemData.value = refMappedPokemon.value;
  } else {
    await getCharacterById(Number(id));
    itemData.value = refMappedCharacter.value;
  }

  return itemData;
};
