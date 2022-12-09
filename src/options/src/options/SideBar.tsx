import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { isRtl } from "../helper";
import logo from "../icon128.png";

const SideBar = () => {
  const { t, i18n } = useTranslation();
  const _isRtl = isRtl(i18n);

  return (
    <header
      className={clsx(
        "bg-slate-50",
        "dark:bg-slate-800",
        "overflow-y-auto",
        "w-112",
        "h-screen",
        "flex",
        "flex-col",
        "fixed",
        _isRtl ? "right-0" : "left-0",
        "inset-y-0",
        "border-slate-200",
        "border-r",
        "border-solid",
        "py-12 px-8"
      )}
    >
      <div className="relative mx-auto block bg-gradient-to-r from-white via-slate-50 to-white h-48 overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 lg:w-auto lg:rounded-2xl aspect-square flex items-center justify-center">
        <img className="aspect-square opacity-70" src={logo} alt="" />
      </div>

      <div className="mt-10 text-center">
        <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
          {t("DISNEY_PLUS_PLUS_EXTENSION")}
        </h1>
        <p className="mb-6 text-base font-normal text-gray-500 sm:px-8 dark:text-gray-400">
          {t("DESCRIPTION_EXTENSION")}
        </p>
      </div>
    </header>
  );
};

export default SideBar;
