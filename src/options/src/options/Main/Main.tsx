import clsx from "clsx";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import OutlineBtn from "../../components/OutlineBtn/OutlineBtn";
import { isRtl } from "../../helper";
import {
  FULLSCREEN_MOVIE_AND_SHOW,
  TRAILERS_ON_THE_HERO_HOMEPAGE,
  TRAILER_ON_THE_BIG_CARD,
  TRAILER_ON_THE_HERO_MOVIE_AND_SHOW_PAGE,
} from "../../storage.constant";
import FullScreen from "./FullScreen";
import Trailers from "./Trailers";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const _isRtl = isRtl(i18n);

  const [fullscreenMovieAndShowFlag, setFullscreenMovieAndShowFlag] =
    useState(false);
  const [trailerOnTheBigCardFlag, setTrailerOnTheBigCardFlag] = useState(false);

  const [trailersOnTheHeroHomepageFlag, setTrailersOnTheHeroHomepageFlag] =
    useState(false);

  const [
    trailersOnTheHeroMovieAndShowPageFlag,
    setTrailersOnTheHeroMovieAndShowPageFlag,
  ] = useState(false);

  const onSave = () => {
    const data = {
      [TRAILER_ON_THE_BIG_CARD]: trailerOnTheBigCardFlag,
      [TRAILERS_ON_THE_HERO_HOMEPAGE]: trailersOnTheHeroHomepageFlag,
      [TRAILER_ON_THE_HERO_MOVIE_AND_SHOW_PAGE]:
        trailersOnTheHeroMovieAndShowPageFlag,

      // full screen
      [FULLSCREEN_MOVIE_AND_SHOW]: fullscreenMovieAndShowFlag,
    };

    chrome.storage?.sync?.set(data).then(() => {
      
    });
  };

  useLayoutEffect(() => {
    chrome.storage?.sync
      ?.get([
        TRAILER_ON_THE_BIG_CARD,
        TRAILERS_ON_THE_HERO_HOMEPAGE,
        TRAILER_ON_THE_HERO_MOVIE_AND_SHOW_PAGE,
        FULLSCREEN_MOVIE_AND_SHOW,
      ])
      .then((data: any) => {
        // trailers
        setTrailerOnTheBigCardFlag(data[TRAILER_ON_THE_BIG_CARD] ?? true);
        setTrailersOnTheHeroHomepageFlag(
          data[TRAILERS_ON_THE_HERO_HOMEPAGE] ?? true
        );
        setTrailersOnTheHeroMovieAndShowPageFlag(
          data[TRAILER_ON_THE_HERO_MOVIE_AND_SHOW_PAGE] ?? true
        );

        // full screen
        setFullscreenMovieAndShowFlag(data[FULLSCREEN_MOVIE_AND_SHOW] ?? true);
      });
  }, []);

  return (
    <main
      className={clsx(
        "border-slate-200",
        "dark:bg-slate-700",
        _isRtl ? "mr-[28rem]" : "ml-[28rem]",
        "mb-28",
        "h-screen",
        "p-6 pt-8"
      )}
    >
      <h2 className="text-2xl font-bold dark:text-white">{t("OPTIONS")}</h2>

      <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-500" />

      <div className="min-h-[70vh] max-h-[70vh] overscroll-y-auto">
        <Trailers
          trailerOnTheBigCardFlag={trailerOnTheBigCardFlag}
          setTrailerOnTheBigCardFlag={setTrailerOnTheBigCardFlag}
          trailersOnTheHeroHomepageFlag={trailersOnTheHeroHomepageFlag}
          setTrailersOnTheHeroHomepageFlag={setTrailersOnTheHeroHomepageFlag}
          trailersOnTheHeroMovieAndShowPageFlag={
            trailersOnTheHeroMovieAndShowPageFlag
          }
          setTrailersOnTheHeroMovieAndShowPageFlag={
            setTrailersOnTheHeroMovieAndShowPageFlag
          }
          onChange={onSave}
        />

        <div className="h-16" />

        <FullScreen
          fullscreenMovieAndShowFlag={fullscreenMovieAndShowFlag}
          setFullscreenMovieAndShowFlag={setFullscreenMovieAndShowFlag}
          onChange={onSave}
        />
      </div>

      <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-500" />

      <div className="flex justify-between">
        <OutlineBtn
          color="red"
          style={{
            marginInlineStart: "auto"
          }}
          label={t("REPORT_A_PROBLEM")}
          onClick={() => navigate("/options/index.html?page=report")}
        />
      </div>
    </main>
  );
};

export default Main;
