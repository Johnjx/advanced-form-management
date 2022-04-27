import * as yup from "yup"

const formSchema = yup.object().shape({
    username: yup
    .string()
    .trim()
    .required("Must enter a name to continue.")
    .min(2, "Name must be at least 2 characters."),
    email: yup
    .string()
    .email("Must enter a valid email address to continue.")
    .required("Email is required."),
    password: yup
    .string()
    .required()
    .min(8, "Password must be at least 8 characters long for strength!"),
    tOS: yup
    .boolean()
    .oneOf([true], "Must accept Terms of Service to join.")
})

export default formSchema