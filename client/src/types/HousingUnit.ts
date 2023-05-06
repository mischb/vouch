import { Feature } from "./GeoDataResponse";
import { Landlord } from "./Landlord";
export class HousingUnit {
  lat: number;
  lng: number;
  lst_rented?: string;
  unit?: string;
  unitId: string;
  streetNumber: string;
  streetName: string;
  postalCode: string;
  city: string = "NYC";
  county: string;
  country: string = "USA";
  cr_ts: string;
  landlord: Landlord;
  label: string;

  toBackend = (feature: Feature) => {
    this.lat = feature.geometry.coordinates[1];
    this.lng = feature.geometry.coordinates[0];
    this.streetNumber = feature.properties.housenumber;
    this.streetName = feature.properties.street;
    this.postalCode = feature.properties.postalcode;
    this.county = feature.properties.borough;
    return this;
  };

  fromBackend = (housingUnit: HousingUnit) => {
    this.city = housingUnit.city;
    this.country = housingUnit.country;
    this.county = housingUnit.county;
    this.cr_ts = housingUnit.cr_ts;
    this.landlord = housingUnit.landlord;
    this.lat = housingUnit.lat;
    this.lng = housingUnit.lng;
    this.lst_rented = housingUnit.lst_rented;
    this.postalCode = housingUnit.postalCode;
    this.streetNumber = housingUnit.streetNumber;
    this.streetName = housingUnit.streetName;
    this.unit = housingUnit.unit;
    this.unitId = housingUnit.unitId;
    this.lat = housingUnit.lat;
    this.lng = housingUnit.lng;
    this.label = this.createLabel();
    return this;
  };

  createLabel = () => {
    return `<ul>
			<li>address: ${this.streetNumber} ${this.streetName}, ${this.county}</li>
			<li>landlord name: ${this.landlord}</li>
			</ul>`;
  };

  //   getLandlordInfo = () => {
  // 	if(!this.landlord) return;
  // 	const htmlString = ""
  // 	if(this.landlord.name)
  //   }
}
