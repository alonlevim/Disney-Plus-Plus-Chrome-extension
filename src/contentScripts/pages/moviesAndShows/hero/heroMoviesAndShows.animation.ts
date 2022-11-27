export const BEFORE_TRAILER_START = "position: absolute; inset: 0; width: 100%; opacity: 0; z-index: -1;";
export const ON_START_TRAILER = 'position: absolute; inset: 0; z-index:0; width: 100%; clip-path: ellipse(0% 0% at 0% 100%); opacity: 0; animation: enterBigTrailer 0.5s 1 ease-out;';
export const ON_START_ANIMATION_ENDED_TRAILER_1 = 'clip-path: ellipse(0% 0% at 0% 100%); opacity: 0;';
export const ON_START_ANIMATION_ENDED_TRAILER_2 = 'opacity: 1;';
export const ON_END_TRAILER = 'animation: exitBigTrailer 0.5s 1 ease-out;';