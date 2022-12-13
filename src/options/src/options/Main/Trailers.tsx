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
        label={t('SHOW_TRAILER_ON_THE_BIG_CARD')}
        checked={trailerOnTheBigCardFlag}
        onChange={setTrailerOnTheBigCardFlag}
        rtl={_idRtl}
      />

      <Switch
        label={t('SUGGESTION_TO_SHOW_TRAILERS_ON_THE_HERO_HEADER_ON_THE_HOME_PAGE')}
        checked={trailersOnTheHeroHomepageFlag}
        onChange={setTrailersOnTheHeroHomepageFlag}
        rtl={_idRtl}
      />

      <Switch
        label={t('SUGGESTION_TO_SHOW_TRAILER_ON_THE_HERO_HEADER_ON_THE_MOVIE_PAGE_AND_SHOW_PAGE')}
        checked={trailersOnTheHeroMovieAndShowPageFlag}
        onChange={setTrailersOnTheHeroMovieAndShowPageFlag}
        rtl={_idRtl}
      />
    </React.Fragment>
  );
};

export default Trailers;