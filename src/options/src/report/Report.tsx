import { useTranslation } from "react-i18next";
import { FC, useLayoutEffect, useState } from "react";
import { Formik, Form } from "formik";
import SaveBtn from "../components/SaveBtn/SaveBtn";
import reportImage from "../tools-icon.svg";
import SuccessMessage from "../components/SuccessMessage/SuccessMessage";
import * as storageConstant from "../storage.constant";
import FailMessage from "../components/FailMessage/FailMessage";
import sendToServer from "./sendToServer";
import formSchema from "./formSchema";
import { MyFormValues } from "./MyFormValues.interface";
import getFlags from "./getFlagsFromStorage";
import Required from "./Required";

export const Reports: FC<{}> = () => {
  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [failMessage, setFailMessage] = useState(false);

  const initialValues: MyFormValues = {
    fullName: "",
    email: "",
    subject: "PROBLEM_WITH_TRAILER",
    message: "",
    createdOn: new Date().toString(),
    flags: "",
  };
  const { t } = useTranslation();

  useLayoutEffect(() => {
    getFlags()
      .then((flags: any) => (initialValues.flags = JSON.stringify(flags)))
      .catch(() => null);
  }, []);

  return (
    <div className="w-full flex justify-center items-center gap-10 h-full">
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={(values, actions) => {
          if (sending) {
            return;
          }

          setSending(true);
          actions.setSubmitting(true);

          sendToServer(values)
            .then((res) => {
              setSuccessMessage(true);
              setSending(false);
              actions.setSubmitting(false);
              actions.resetForm();
            })
            .catch((err) => {
              console.error(err);
              setFailMessage(true);
              setSending(false);
              actions.setSubmitting(false);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => {
          return (
            <Form className="w-full max-w-lg" onSubmit={handleSubmit}>
              <div className="py-12 max-w-md w-full">
                <h2 className="text-2xl font-bold">{t("REPORT")}</h2>
                <div className="mt-8 ">
                  <div className="grid grid-cols-1 gap-6">
                    <label className="block">
                      <span className="text-gray-700">
                        {t("FULL_NAME")}
                        <Required />
                      </span>
                      <input
                        type="text"
                        className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                        name="fullName"
                        placeholder=""
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.fullName}
                        disabled={sending}
                      />
                      {errors.fullName && touched.fullName ? (
                        <p className="text-rose-400">
                          {t(errors.fullName.toUpperCase().replace(/ /g, "_"))}
                        </p>
                      ) : null}
                    </label>
                    <label className="block">
                      <span className="text-gray-700">
                        {t("EMAIL_ADDRESS")}
                        <Required />
                      </span>
                      <input
                        type="email"
                        className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        disabled={sending}
                        placeholder="john@example.com"
                      />
                      {errors.email && touched.email ? (
                        <p className="text-rose-400">
                          {t(errors.email.toUpperCase().replace(/ /g, "_"))}
                        </p>
                      ) : null}
                    </label>
                    <label className="block">
                      <span className="text-gray-700">
                        {t("SUBJECT")}
                        <Required />
                      </span>
                      <select
                        className="
                    block
                    w-full
                    mt-1
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.subject}
                        disabled={sending}
                        name="subject"
                      >
                        <option value="PROBLEM_WITH_TRAILER">
                          {t("PROBLEM_WITH_TRAILER")}
                        </option>
                        <option value="THERE_IS_A_BUG">
                          {t("THERE_IS_A_BUG")}
                        </option>
                        <option value="I_HAVE_A_SUGGESTION">
                          {t("I_HAVE_A_SUGGESTION")}
                        </option>
                        <option value="ERROR_IN_TRANSLATION">
                          {t("ERROR_IN_TRANSLATION")}
                        </option>
                        <option value="OTHER">{t("OTHER")}</option>
                      </select>
                      {errors.subject && touched.subject ? (
                        <p className="text-rose-400">
                          {t(errors.subject.toUpperCase().replace(/ /g, "_"))}
                        </p>
                      ) : null}
                    </label>
                    <label className="block">
                      <span className="text-gray-700">
                        {t("MESSAGE")}
                        <Required />
                      </span>
                      <textarea
                        className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                        name="message"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.message}
                        disabled={sending}
                        rows={3}
                      ></textarea>
                      {errors.message && touched.message ? (
                        <p className="text-rose-400">
                          {t(errors.message.toUpperCase().replace(/ /g, "_"))}
                        </p>
                      ) : null}
                    </label>

                    <input
                      type="hidden"
                      name="createdOn"
                      value={values.createdOn}
                    />

                    {Object.keys(storageConstant).map((key, i) => (
                      <input key={i} type="hidden" name={key} />
                    ))}

                    <div className="block">
                      <div className="mt-2">
                        <SaveBtn
                          label={t("SEND")}
                          textLoading={t("LOADING")}
                          loading={sending}
                          type="submit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>

      <img
        src={reportImage}
        className="w-1/4 aspect-square max-w-xs opacity-80"
        alt=""
      />

      <SuccessMessage
        show={successMessage}
        bg="bg-green-50"
        text={t(
          "THANK_YOU_MESSAGE_RECEIVED_I_WILL_DO_MY_BEST_TO_ANSWER_AS_SOON_AS_POSSIBLE"
        )}
        time={8000}
        onClose={setSuccessMessage}
      />

      <FailMessage
        show={failMessage}
        text={t("זמנית לא ניתן לשלוח את ההודעה")}
        time={8000}
        onClose={setFailMessage}
      />
    </div>
  );
};

export default Reports;
