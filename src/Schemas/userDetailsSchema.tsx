import * as Yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const userDetailsSchemaForStep1 = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  mobile: Yup.string()
    .required("Please enter your mobile number")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "too short")
    .max(10, "too long"),
  age: Yup.number().required("Age is required").positive("Age must be a positive number"),
  gender: Yup.string().min(2).max(25).required("Please select your gender"),
  idType: Yup.string().required("Please select your ID Type"),
  idNumber: Yup.string()
    .min(10)
    .max(12)
    .test("govtId", "Invalid ID", function (value) {
      const idType = this.resolve(Yup.ref("idType"));
      console.log("idType", idType);
      if (idType === "Aadhar Card") {
        return Yup.string()
          .matches(
            /^[1-9]\d{11}$/,
            "Invalid Aadhar ID. Must be a 12-digit number and shouldn't start with 0 or 1"
          )
          .isValidSync(value);
      } else if (idType === "PAN Card") {
        return Yup.string()
          .matches(/^[A-Za-z0-9]{10}$/, "Invalid PAN ID. Must be a 10 digit alphnumeric ID.")
          .isValidSync(value);
      }
      return true;
    })
    .required("Please enter your ID Number"),
});
export const userDetailsSchemaForStep2 = Yup.object({
  zip: Yup.string()
    .min(6)
    .max(6)
    .notRequired()
    .matches(/^\d{6}$/, "PIN code must be exactly 6 digits"),
  //   country:Yup.string().required("Please select your country ")
});
