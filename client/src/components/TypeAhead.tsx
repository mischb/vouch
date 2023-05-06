import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Feature, GeoDataResponse } from "../types/GeoDataResponse";
import { FeaturesContext } from "./Contexts";
import { TypeAheadList } from "./TypeAheadList";
export const TypeAhead = ({ url }: { url: String }) => {
  let [items, setItems] = useState([] as Array<Feature>);
  let timeout: NodeJS.Timeout | undefined;
  const { feature, setFeatureContext } = useContext(FeaturesContext);
  const [inputState, setInputState] = useState("");
  const [isDisplay, setDisplay] = useState(true);

  useEffect(() => {
    if (feature?.properties) setInputState(feature.properties.label);
  }, [feature]);

  const inputCallback = (e: FormEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setFeatureContext(null);
    setInputState(value);
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      if (!value) return;

      const response = await fetch(
        `${url + (e.target as HTMLInputElement).value}`
      );
      const geoCoding: GeoDataResponse = await response.json();
      geoCoding.features = geoCoding.features
        .filter(
          (f) =>
            f.geometry?.coordinates?.length === 2 || !f.properties.housenumber
        )
        .map((f) => new Feature(f));
      setDisplay(true);
      setItems(geoCoding.features);
    }, 1000);
  };
  return (
    <span>
      <input
        value={inputState}
        onBlur={(e) => {
          console.log(e.relatedTarget);
          setTimeout(() => {
            setDisplay(false);
          }, 200);
        }}
        onChange={inputCallback}
      />
      {items.length ? (
        <TypeAheadList isDisplay={isDisplay} features={items}></TypeAheadList>
      ) : (
        <></>
      )}
    </span>
  );
};
