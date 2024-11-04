// https://pokeapi.co/api/v2/berry
/*
{"count":64,"next":"https://pokeapi.co/api/v2/berry?offset=20&limit=20","previous":null,"results":[{"name":"cheri","url":"https://pokeapi.co/api/v2/berry/1/"},{"name":"chesto","url":"https://pokeapi.co/api/v2/berry/2/"},{"name":"pecha","url":"https://pokeapi.co/api/v2/berry/3/"},{"name":"rawst","url":"https://pokeapi.co/api/v2/berry/4/"},{"name":"aspear","url":"https://pokeapi.co/api/v2/berry/5/"},{"name":"leppa","url":"https://pokeapi.co/api/v2/berry/6/"},{"name":"oran","url":"https://pokeapi.co/api/v2/berry/7/"},{"name":"persim","url":"https://pokeapi.co/api/v2/berry/8/"},{"name":"lum","url":"https://pokeapi.co/api/v2/berry/9/"},{"name":"sitrus","url":"https://pokeapi.co/api/v2/berry/10/"},{"name":"figy","url":"https://pokeapi.co/api/v2/berry/11/"},{"name":"wiki","url":"https://pokeapi.co/api/v2/berry/12/"},{"name":"mago","url":"https://pokeapi.co/api/v2/berry/13/"},{"name":"aguav","url":"https://pokeapi.co/api/v2/berry/14/"},{"name":"iapapa","url":"https://pokeapi.co/api/v2/berry/15/"},{"name":"razz","url":"https://pokeapi.co/api/v2/berry/16/"},{"name":"bluk","url":"https://pokeapi.co/api/v2/berry/17/"},{"name":"nanab","url":"https://pokeapi.co/api/v2/berry/18/"},{"name":"wepear","url":"https://pokeapi.co/api/v2/berry/19/"},{"name":"pinap","url":"https://pokeapi.co/api/v2/berry/20/"}]}
https://pokeapi.co/api/v2/berry/1/
{"firmness":{"name":"soft","url":"https://pokeapi.co/api/v2/berry-firmness/2/"},"flavors":[{"flavor":{"name":"spicy","url":"https://pokeapi.co/api/v2/berry-flavor/1/"},"potency":10},{"flavor":{"name":"dry","url":"https://pokeapi.co/api/v2/berry-flavor/2/"},"potency":0},{"flavor":{"name":"sweet","url":"https://pokeapi.co/api/v2/berry-flavor/3/"},"potency":0},{"flavor":{"name":"bitter","url":"https://pokeapi.co/api/v2/berry-flavor/4/"},"potency":0},{"flavor":{"name":"sour","url":"https://pokeapi.co/api/v2/berry-flavor/5/"},"potency":0}],"growth_time":3,"id":1,"item":{"name":"cheri-berry","url":"https://pokeapi.co/api/v2/item/126/"},"max_harvest":5,"name":"cheri","natural_gift_power":60,"natural_gift_type":{"name":"fire","url":"https://pokeapi.co/api/v2/type/10/"},"size":20,"smoothness":25,"soil_dryness":15}
*/

import { useEffect, useState } from "react";
interface BerryResult {
  name: string;
  url: string;
}

interface BerryListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BerryResult[];
}

interface BerryFirmness {
  name: string;
  url: string;
}

interface BerryFlavor {
  flavor: {
    name: string;
    url: string;
  };
  potency: number;
}

interface BerryItem {
  name: string;
  url: string;
}

interface BerryType {
  name: string;
  url: string;
}

export interface Berry {
  firmness: BerryFirmness;
  flavors: BerryFlavor[];
  growth_time: number;
  id: number;
  item: BerryItem;
  max_harvest: number;
  name: string;
  natural_gift_power: number;
  natural_gift_type: BerryType;
  size: number;
  smoothness: number;
  soil_dryness: number;
}

export interface Firmness {
  name: string;
  count: string;
}

const firmnessNamesOrder = [
  "soft",
  "very-soft",
  "super-soft",
  "hard",
  "very-hard",
  "super-hard",
];

export const useBerries = (url: string) => {
  const [berries, setBerries] = useState<Berry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [firmnessList, setFirmnessList] = useState<Firmness[]>([]);

  useEffect(() => {
    if (!url) return;
    fetch(url)
      .then((res) => res.json())
      .then((data: BerryListResponse) => {
        const promises = data.results.map((result) =>
          fetch(result.url).then((res) => res.json())
        );
        Promise.all(promises)
          .then((berries) => {
            setBerries(berries);
            setLoading(false);
          })
          .catch(() => {
            setError(true);
            setLoading(false);
          });
      });
  }, [url]);

  useEffect(() => {
    const firmness = Array.from(
      new Set(berries.map((berry) => berry.firmness.name))
    );
    setFirmnessList(
      firmness
        .map((firmnessName) => ({
          name: firmnessName,
          count: berries
            .filter((berry) => berry.firmness.name === firmnessName)
            .length.toString(),
        }))
        .sort(
          (a, b) =>
            firmnessNamesOrder.indexOf(a.name) -
            firmnessNamesOrder.indexOf(b.name)
        )
    );
  }, [berries]);

  return { berries, loading, error, firmnessList };
};
