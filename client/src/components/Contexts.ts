import { createContext } from "react";
import { Feature } from "../types/GeoDataResponse";

export const FeaturesContext = createContext({
  feature: {} as Feature,
  setFeatureContext: ({}: Feature): void => {},
});
