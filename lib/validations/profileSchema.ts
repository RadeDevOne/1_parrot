import { object, string, TypeOf } from "yup";

// const profileSchema = object()
const profileSchema = object({
  // I DON'T NEED PROFIE ID HERE BUT I'M SETTING
  // THIS JUST TO HAVE SOMETHING THAT IS REQUIRED (JUST TO TRY IT OUT)
  // profileId: string().required(),

  name: string()
    .optional()
    .min(2, "name must contain at least 2 characters")
    .max(31, "name can't be more than 31 characters long"),
  email: string()
    .optional()
    .email("invalid email")
    .min(8, "email must contain at least 8 characters")
    .max(22, "email can't be more than 22 characters long"),
  streetAddress: string().optional().max(26, "maximum is 26 characters"),
  postalCode: string()
    .optional()
    .min(2, "zip code minimum is 2 characters")
    .max(10, "zip code can't be more than 10 characters long"),
  country: string()
    .optional()
    .min(2, "country minimum is 2 characters")
    .max(22, "country can't be more than 22 characters long"),
  regionOrState: string()
    .optional()
    .min(4, "state must be at leasr 4 characters long")
    .max(18, "state can't be more than 18 characters long"),
});
// .required();

export type ProfileDataType = TypeOf<typeof profileSchema>;

export default profileSchema;
