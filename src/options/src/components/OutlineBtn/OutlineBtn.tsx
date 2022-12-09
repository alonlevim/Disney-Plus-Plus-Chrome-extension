import clsx from "clsx";
import OutlineBtnProps from "./OutlineBtn.interface";

const OutlineBtn = (props: OutlineBtnProps) => {
  const { label, color } = props;
  return (
    <button
      type="button"
      className={clsx(
        color === "red" &&
          "text-red-700 border-red-700 hover:bg-red-800 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900",
        "hover:text-white border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:text-white"
      )}
    >
      {label}
    </button>
  );
};

export default OutlineBtn;
