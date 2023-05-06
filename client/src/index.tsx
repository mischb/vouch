import React, { FormEvent, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { TypeAhead } from "./components/TypeAhead";
import { Form } from "./components/Form";
import { GoogleMap } from "./components/GoogleMap";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import "./index.css";
import { Feature, Property } from "./types/GeoDataResponse";
import { HousingUnit } from "./types/HousingUnit";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const render = (
  status: Status,
  properties: Array<HousingUnit>,
  openInfoWindow: google.maps.InfoWindow,
  setOpenInfoWindow: any
) => {
  switch (status) {
    case Status.LOADING:
      return <div>Loading...</div>;
    case Status.FAILURE:
      return <div>Error...</div>;
    case Status.SUCCESS:
      return (
        <GoogleMap
          zoom={10}
          center={{ lat: 40.7128, lng: -74.006 }}
          properties={properties}
          openInfoWindow={openInfoWindow}
          setOpenInfoWindow={setOpenInfoWindow}
        />
      );
  }
};
const App = () => {
  const [properties, setProperties] = useState([] as Array<HousingUnit>);
  const [openInfoWindow, setOpenInfoWindow] = useState(
    {} as google.maps.InfoWindow
  );
  useEffect(() => {
    async function getData() {
      const response = await fetch(`${process.env.API_URL}/units`);
      const featuresRes = (await response.json()) as Array<HousingUnit>;

      console.log(featuresRes);
      setProperties(featuresRes.map((f) => new HousingUnit().fromBackend(f)));
    }
    getData();
  }, []);

  const addProperty = (property: HousingUnit) => {
    console.log("property:", property);
    setProperties([...properties, property]);
  };
  return (
    <>
      <div>
        <Wrapper
          apiKey={process.env.GMAP_API_KEY}
          render={(status) =>
            render(status, properties, openInfoWindow, setOpenInfoWindow)
          }
        />
      </div>
      <Form addProperty={addProperty} />
    </>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
