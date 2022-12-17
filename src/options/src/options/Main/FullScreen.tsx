import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Switch from "../../components/Switch/Switch";
import { isRtl } from "../../helper";

interface Props {
  fullscreenMovieAndShowFlag: boolean;
  setFullscreenMovieAndShowFlag: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: () => void;
}

const FullScreen = (props: Props) => {
  const { t, i18n } = useTranslation();
  const _isRtl = isRtl(i18n);

  const {
    fullscreenMovieAndShowFlag,
    setFullscreenMovieAndShowFlag,
    onChange,
  } = props;
  
  useEffect(() => {
    onChange();
  }, [fullscreenMovieAndShowFlag]);

  return (
    <React.Fragment>
      <h3 className="text-base font-bold dark:text-white">
        {t("FULL_SCREEN")}
      </h3>

      <Switch
        label={t("ENABLE_FULLSCREEN_WHEN_DOUBLE_CLICK_ON_A_MOVIE")}
        checked={fullscreenMovieAndShowFlag}
        onChange={setFullscreenMovieAndShowFlag}
        rtl={_isRtl}
      />
    </React.Fragment>
  );
};

export default FullScreen;
