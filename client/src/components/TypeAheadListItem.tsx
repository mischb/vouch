import React, { FunctionComponent, useContext, useEffect } from "react";
import { Feature } from "../types/GeoDataResponse";
import { FeaturesContext } from "./Contexts";

interface TypeAheadListItemProp {
  item: Feature;
}
export const TypeAheadListItem: FunctionComponent<TypeAheadListItemProp> = ({
  item,
}) => {
  const { setFeatureContext } = useContext(FeaturesContext);

  function setFeature() {
    console.log(item);
    setFeatureContext(item);
  }

  return (
    <li className="type-ahead-item" onClick={setFeature}>
      {item.properties.label}
    </li>
  );
};
