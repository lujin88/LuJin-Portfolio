/** Research #8996, copy #9019, and PM wording corrections #9023. */
import copy from './suppliers-copy.en.json'

export const supplierCopy = {
  eyebrow: copy['local.eyebrow'].en,
  title: copy['local.title'].en,
  subtitle: copy['local.subtitle'].en,
  checkedDate: copy['local.checkedDate'].en,
  disclosure: copy['local.disclosure'].en,
}
export type Supplier = {
  name: string
  description: string
  price: string
  conditions: string
  source: string
  sourceLabel: string
}

// Keep nullable slots for future sources that have not yet been verified.
export const suppliers: readonly (Supplier | null)[] = [
  {
    name: copy['local.cake.name'].en,
    description: copy['local.cake.description'].en,
    price: copy['local.cake.price'].en,
    conditions: copy['local.cake.conditions'].en,
    sourceLabel: copy['local.cake.sourceLabel'].en,
    source: 'https://gipfeli.ch/torten/thementorten/',
  },
  {
    name: copy['local.venue.name'].en,
    description: copy['local.venue.description'].en,
    price: copy['local.venue.price'].en,
    conditions: copy['local.venue.conditions'].en,
    sourceLabel: copy['local.venue.sourceLabel'].en,
    source: 'https://sihlcity.ch/de/minicity/kindergeburtstag/',
  },
  {
    name: copy['local.performer.name'].en,
    description: copy['local.performer.description'].en,
    price: copy['local.performer.price'].en,
    conditions: copy['local.performer.conditions'].en,
    sourceLabel: copy['local.performer.sourceLabel'].en,
    source: 'https://bazingaparties.ch/zaubershows-in-zurich/',
  },
]
