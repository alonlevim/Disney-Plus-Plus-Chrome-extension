import SwitchProps from "./Switch.inteface";
import clsx from "clsx";
import { FunctionComponent } from "react";

const Switch: FunctionComponent<SwitchProps> = (props) => {
  const { label, disabled, checked, onChange, nigthMode, rtl } = props;

  return (
    <div className="my-6">
      <label className="inline-flex relative items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          className="sr-only peer"
          disabled={disabled}
          onChange={() => typeof onChange === "function" && onChange(!checked)}
        />
        <div
          className={clsx(
            "w-11",
            "h-6",
            "bg-gray-200",
            "peer-focus:outline-none",
            "peer-focus:ring-4",
            "peer-focus:ring-blue-300",
            nigthMode && "dark:peer-focus:ring-blue-800",
            "rounded-full",
            "peer",
            nigthMode && "dark:bg-gray-400",
            "peer-checked:after:translate-x-full",
            "peer-checked:after:border-white",
            "relative",
            "after:content-['']",
            "after:absolute",
            "after:top-[50%]",
            "after:translate-y-[-50%]",
            "after:left-[2px]",
            "after:bg-white",
            "after:border-gray-300",
            "after:border",
            "after:rounded-full",
            "after:h-5",
            "after:w-5",
            "after:transition-all",
            nigthMode && "dark:border-gray-600",
            "peer-checked:bg-blue-600"
          )}
        ></div>
        <span
          className={clsx(
            rtl ? "mr-3" : "ml-3",
            "text-sm",
            "font-medium",
            !disabled
              ? `text-gray-900 ${nigthMode ? "dark:text-gray-300" : ""}`
              : `text-gray-400 ${nigthMode ? "dark:text-gray-500" : ""}`
          )}
        >
          {label}
        </span>
      </label>
    </div>
  );
};

Switch.defaultProps = {
  nigthMode: true,
  rtl: false,
};

export default Switch;
