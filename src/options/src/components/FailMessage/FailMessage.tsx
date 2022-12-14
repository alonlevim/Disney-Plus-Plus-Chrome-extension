import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FailMessageProps from "./FailMessage.interface";

const FailMessage: FunctionComponent<FailMessageProps> = (props) => {
  const { show, text, onClose, time, bg, darkBg } = props;
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  const handleClose = () => {
    onClose(false);
  };

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        if (show) {
          onClose(false);
        }
      }, time);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          id="toast-fail"
          className={clsx(
            "flex",
            "items-center",
            "p-4",
            "mb-4",
            "w-full",
            "max-w-xs",
            "text-gray-500",
            bg,
            "rounded-lg",
            "shadow",
            "dark:text-gray-400",
            darkBg,
            "fixed",
            isRtl ? "left-2" : "right-2",
            "bottom-[15vh]"
          )}
          role="alert"
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-rose-500 bg-white rounded-lg dark:bg-rose-800 dark:text-rose-200">
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div
            className={clsx(isRtl ? "mr-3" : "ml-3", "text-sm", "font-normal")}
          >
            {text}
          </div>
          <button
            type="button"
            className={clsx(
              isRtl ? "mr-auto" : "ml-auto",
              "-mx-1.5",
              "-my-1.5",
              "bg-white",
              "text-gray-400",
              "hover:text-gray-900",
              "rounded-lg",
              "focus:ring-2",
              "focus:ring-gray-300",
              "p-1.5",
              "hover:bg-gray-100",
              "inline-flex",
              "h-8",
              "w-8",
              "dark:text-gray-500",
              "dark:hover:text-white",
              "dark:bg-gray-800",
              "dark:hover:bg-gray-700"
            )}
            data-dismiss-target="#toast-fail"
            aria-label="Close"
            onClick={handleClose}
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

FailMessage.defaultProps = {
  time: 4000,
  bg: "bg-rose-50",
  darkBg: "dark:bg-rose-800",
};

export default FailMessage;
