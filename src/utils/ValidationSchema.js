// LoginValidationSchema.js
import * as Yup from "yup";

export const ValidationSchema = Yup.object().shape({
  name: Yup.string().when("isRegister", {
    is: true,
    then: Yup.string().required("Required"),
    otherwise: Yup.string(),
  }),
  phone: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string().required("Required"),
});
