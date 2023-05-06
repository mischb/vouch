import { HousingUnit } from "./HousingUnit";

export type GeoDataResponse = {
  features: Feature[];
};

export class Feature {
  constructor(feature: Feature) {
    this.geometry = feature.geometry;
    this.properties = feature.properties;
  }
  geometry: Geometry;
  properties: Property;
  toUnit(): HousingUnit {
    return new HousingUnit().toBackend(this);
  }
}

export type Geometry = {
  coordinates: number[];
};

export type Property = {
  borough: "Brooklyn" | "Bronx" | "Queens" | "Manhattan" | "Staten Island";
  label: string;
  name: string;
  neighborhood: string;
  postalcode: string;
  street: string;
  housenumber?: string;
  id: string;
  lat: number;
  lng: number;
};
