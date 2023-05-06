import React, {
  DetailedHTMLProps,
  FormEvent,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { Feature, Property } from "../types/GeoDataResponse";
import { HousingUnit } from "../types/HousingUnit";
import { FeaturesContext } from "./Contexts";
import { TypeAhead } from "./TypeAhead";
import * as apiUtil from "../utils/apiUtils";
import { fieldValidation } from "../utils/FormUtils";

export type FormChangeEvent = {
  target: { name: string; value: string };
};

export const Form = ({
  addProperty,
}: {
  addProperty: (p: HousingUnit) => void;
}) => {
  const [feature, setFeature] = useState({} as Feature);

  const [inputValues, setInputValues] = useState({
    fname: "",
    lname: "",
    entityType: "INDIVIDUAL",
    email: "",
    phoneNumber: "",
    address: "",
  });
  useEffect(() => {}, [feature]);

  function change(e: FormChangeEvent) {
    console.log(e);
    if (!Object.keys(fieldValidation).includes(e.target.name)) {
      throw new Error(e.target.name + " does not have a validator");
    }
    e = (fieldValidation as any)[e.target.name];

    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  }

  return (
    <FeaturesContext.Provider
      value={{ feature: feature, setFeatureContext: setFeature }}
    >
      <form onSubmit={submitNewLocation}>
        <label>
          Unit Address:
          <TypeAhead url={process.env.LOCATIONS_API_URL} />
        </label>
        <div id="landlordInfo">
          <label>
            {inputValues.entityType === "INDIVIDUAL" && "first"} name:
            <input name="fname" type="text" onChange={change} />
          </label>
          {inputValues.entityType === "INDIVIDUAL" && (
            <label>
              last name:
              <input name="lname" type="text" onChange={change} />
            </label>
          )}
          <label>
            email:
            <input
              name="email"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              onChange={change}
            />
          </label>
          <label>
            entity type:
            {/* <input name="entityType" type="text" onChange={change} /> */}
            <select name="entityType" onChange={change}>
              <option value="INDIVIDUAL">Individual</option>
              <option value="MGMT_COMPANY">Management Company</option>
            </select>
          </label>
          <label>
            phone number:
            <input
              name="phoneNumber"
              type="tel"
              id="phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={inputValues.phoneNumber}
              onChange={change}
            />
          </label>
          <label>
            address:
            <input name="address" type="text" onChange={change} />
          </label>
        </div>

        {/* <input type="submit" disabled={!(feature instanceof Feature)} /> */}
        <input type="submit" />
      </form>
    </FeaturesContext.Provider>
  );

  function submitNewLocation(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { fname, lname, entityType, email, phoneNumber, address } =
      event.target as any;

    console.log(inputValues);
    console.log((event.target as any)[3]);
    apiUtil
      .request<HousingUnit>("http://localhost:8080/units/add-unit-landlord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          housingUnit: feature.toUnit(),
          landlord: inputValues,
        }),
      })
      .then((p) => {
        addProperty(new HousingUnit().fromBackend(p));
        console.log(p);
      })
      .catch(console.error);
  }
};
