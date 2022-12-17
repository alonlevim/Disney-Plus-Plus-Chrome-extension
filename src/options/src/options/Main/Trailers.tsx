import React from "react";
import { useTranslation } from 'react-i18next';
import Switch from "../../components/Switch/Switch";
import { isRtl } from "../../helper";

interface Props {
  trailerOnTheBigCardFlag: boolean;
  setTrailerOnTheBigCardFlag: (flag: boolean) => void;
  trailersOnTheHeroHomepageFlag: boolean;
  setTrailersOnTheHeroHomepageFlag: (flag: boolean) => void;
  trailersOnTheHeroMovieAndShowPageFlag: boolean;
  setTrailersOnTheHeroMovieAndShowPageFlag: (flag: boolean) => void;
}

const Trailers = (props: Props) => {
  const { t, i18n } = useTranslation();
  const _idRtl = isRtl(i18n);

  const {
    trailerOnTheBigCardFlag,
    setTrailerOnTheBigCardFlag,
    trailersOnTheHeroHomepageFlag,
    setTrailersOnTheHeroHomepageFlag,
    trailersOnTheHeroMovieAndShowPageFlag,
    setTrailersOnTheHeroMovieAndShowPageFlag,
  } = props;
  return (
    <React.Fragment>
      <h3 className="text-base font-bold dark:text-white">{t('TRAILERS')}</h3>

      <Switch
        label={t('SHOW_TRAILER_ON_THE_CARD')}
        checked={trailerOnTheBigCardFlag}
        onChange={setTrailerOnTheBigCardFlag}
        rtl={_idRtl}
      />

      <Switch
        label={t('SHOW_TRAILERS_AT_THE_TOP_OF_THE_PAGE_ON_THE_HOME_PAGE')}
        checked={trailersOnTheHeroHomepageFlag}
        onChange={setTrailersOnTheHeroHomepageFlag}
        rtl={_idRtl}
      />

      <Switch
        label={t('SHOW_THE_TRAILER_AT_THE_TOP_OF_THE_MOVIE_PAGE')}
        checked={trailersOnTheHeroMovieAndShowPageFlag}
        onChange={setTrailersOnTheHeroMovieAndShowPageFlag}
        rtl={_idRtl}
      />
    </React.Fragment>
  );
};

export default Trailers;
