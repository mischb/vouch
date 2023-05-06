import { FormChangeEvent } from "../components/Form";

type validation = (e: FormChangeEvent) => {
  target: { name: string; value: string };
};

export const fieldValidation: {
  phoneNumber: validation;
  fname: validation;
  lname: validation;
  entityType: validation;
  email: validation;
  address: validation;
} = {
  phoneNumber: changePhoneNumber,
  fname: (e: FormChangeEvent) => e,
  lname: (e: FormChangeEvent) => e,
  entityType: (e: FormChangeEvent) => e,
  email: (e: FormChangeEvent) => e,
  address: (e: FormChangeEvent) => e,
};

function changePhoneNumber(e: FormChangeEvent) {
  let value = e.target.value;
  if (!Number.isNaN(value)) {
    value = value.replace(/\D/g, "");
  }
  if (value.length > 9) {
    value = value.substring(0, 9);
  }
  e.target.value = value;
  return e;
}
