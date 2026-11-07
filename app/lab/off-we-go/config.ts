/**
 * Off We Go case page configuration.
 *
 * `prototypeUrl` is the local clickable prototype. The Open Prototype button
 * and the laptop glass both open it in a new window. Leave it empty to
 * disable those hotspots.
 */
export const prototypeUrl = '/lab/off-we-go/prototype'

export const prototypePreviewSrc = '/assets/images/lab/off-we-go/prototype-home.png'
export const screenWallpaperSrc = '/assets/images/lab/off-we-go/screen-wallpaper.png'
export const sceneBackgroundSrc = '/assets/images/lab/off-we-go/lakeside-hero.jpg'

export const SCENE_IMAGE = {
  width: 3840,
  height: 2160,
} as const

export const SCENE_ASPECT = SCENE_IMAGE.width / SCENE_IMAGE.height

export const laptopScreen = {
  top: 20.1,
  left: 40.9,
  width: 42.8,
  height: 54.2,
  clipPath: 'polygon(7.2% 1.6%, 99.2% 0.3%, 99.5% 99.4%, 0.3% 99.7%)',
  rotateX: 0.15,
  rotateY: -0.2,
  rotateZ: 0.05,
  perspective: 1800,
  radius: 5,
  frameWidth: 1440,
  frameHeight: 900,
  debug: false,
} as const
