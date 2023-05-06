import * as _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { HousingUnit } from "../types/HousingUnit";
export function GoogleMap({
  center,
  zoom,
  properties,
  openInfoWindow,
  setOpenInfoWindow,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
  properties: Array<HousingUnit>;
  openInfoWindow: google.maps.InfoWindow;

  setOpenInfoWindow: any;
}) {
  const ref = useRef();
  const [map, setMap] = useState({} as google.maps.Map);

  useEffect(() => {
    const mapRes: google.maps.Map = new google.maps.Map(ref.current, {
      center,
      zoom,
    });
    setMap(mapRes);
  }, []);

  useEffect(() => {
    properties.forEach(({ lat, lng, label }) => {
      const marker = new google.maps.Marker({
        position: {
          lat,
          lng,
        },
        map: map,
      });
      const infoWindow = new google.maps.InfoWindow({
        content: label,
        ariaLabel: "Uluru",
        maxWidth: 200,
      });
      map?.addListener("click", (e: any) => {
        console.log(infoWindow);
        infoWindow?.close();
      });

      marker.addListener("click", () => {
        if (!_.isEmpty(openInfoWindow)) openInfoWindow?.close();
        openInfoWindow = infoWindow;
        infoWindow.open({
          anchor: marker,
          map,
        });
        setOpenInfoWindow(infoWindow);
      });
    });
  }, [properties]);

  return (
    <div
      style={{ position: "inherit", overflow: "inherit" }}
      ref={ref}
      id="map"
    />
  );
}
