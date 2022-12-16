import * as Yup from "yup";

const formSchema = Yup.object().shape({
    fullName: Yup.string().required(),
    email: Yup.string().email().required(),
    subject: Yup.string().required(),
    message: Yup.string().required(),
    createdOn: Yup.date().default(() => new Date()),
});

export default formSchema;