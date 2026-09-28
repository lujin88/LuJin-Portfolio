export type Chapter = {
  id: string
  number: string
  still: string
  video?: string
  titleKey: string
  bodyKey?: string
  labelKey?: string
  toolKey?: string
  objectPosition: string
  stillAltKey: string
}

const IMG = '/assets/images/lab/way-of-work'
const VID = '/assets/videos/lab/way-of-work'

/** Six source clips concatenated into one scrub film. */
export const SCRUB_VIDEO = `${VID}/scrub.mp4?v=2560`

export const CHAPTERS: readonly Chapter[] = [
  {
    id: 'hero',
    number: '',
    still: `${IMG}/01.jpg`,
    video: `${VID}/01-02.mp4`,
    titleKey: 'wow.heroTitle',
    bodyKey: 'wow.heroLede',
    objectPosition: '72% 38%',
    stillAltKey: 'wow.heroAlt',
  },
  {
    id: 'research',
    number: '01',
    still: `${IMG}/02.jpg`,
    video: `${VID}/02-03.mp4`,
    labelKey: 'wow.researchLabel',
    titleKey: 'wow.researchTitle',
    bodyKey: 'wow.researchBody',
    toolKey: 'wow.researchTool',
    objectPosition: '68% 48%',
    stillAltKey: 'wow.researchAlt',
  },
  {
    id: 'journey',
    number: '02',
    still: `${IMG}/03.jpg`,
    video: `${VID}/03-04.mp4`,
    labelKey: 'wow.journeyLabel',
    titleKey: 'wow.journeyTitle',
    bodyKey: 'wow.journeyBody',
    toolKey: 'wow.journeyTool',
    objectPosition: '70% 46%',
    stillAltKey: 'wow.journeyAlt',
  },
  {
    id: 'system',
    number: '03',
    still: `${IMG}/04.jpg`,
    video: `${VID}/04-05.mp4`,
    labelKey: 'wow.systemLabel',
    titleKey: 'wow.systemTitle',
    bodyKey: 'wow.systemBody',
    toolKey: 'wow.systemTool',
    objectPosition: '64% 50%',
    stillAltKey: 'wow.systemAlt',
  },
  {
    id: 'static-screens',
    number: '03.1',
    still: `${IMG}/05.jpg`,
    video: `${VID}/05-06.mp4`,
    labelKey: 'wow.staticLabel',
    titleKey: 'wow.staticTitle',
    bodyKey: 'wow.staticBody',
    toolKey: 'wow.staticTool',
    objectPosition: '62% 48%',
    stillAltKey: 'wow.staticAlt',
  },
  {
    id: 'prototype',
    number: '04',
    still: `${IMG}/06.jpg`,
    video: `${VID}/06-07.mp4`,
    labelKey: 'wow.prototypeLabel',
    titleKey: 'wow.prototypeTitle',
    bodyKey: 'wow.prototypeBody',
    toolKey: 'wow.prototypeTool',
    objectPosition: '66% 50%',
    stillAltKey: 'wow.prototypeAlt',
  },
  {
    id: 'production',
    number: '05',
    still: `${IMG}/07.jpg`,
    video: `${VID}/06-07.mp4`,
    labelKey: 'wow.productionLabel',
    titleKey: 'wow.productionTitle',
    bodyKey: 'wow.productionBody',
    toolKey: 'wow.productionTool',
    objectPosition: '58% 52%',
    stillAltKey: 'wow.productionAlt',
  },
] as const
