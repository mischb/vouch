import React, { FunctionComponent } from "react";
import { Feature } from "../types/GeoDataResponse";
import { TypeAheadListItem } from "./TypeAheadListItem";
export interface TypeAheadListProps {
  features: Array<Feature>;
  isDisplay: boolean;
}

export const TypeAheadList: FunctionComponent<TypeAheadListProps> = ({
  features,
  isDisplay,
}) => {
  return (
    <ul className={`type-ahead ${!isDisplay && "hide"}`}>
      {features.map((feature) => (
        <TypeAheadListItem
          key={feature.properties.id}
          item={feature}
        ></TypeAheadListItem>
      ))}
    </ul>
  );
};
