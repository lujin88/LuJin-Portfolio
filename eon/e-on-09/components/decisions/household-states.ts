export const householdStates = [
  {
    id: '1',
    occupancyLabel: '1 person',
    kwh: 1800,
    eurPerYear: 443,
  },
  {
    id: '2',
    occupancyLabel: '2 people',
    kwh: 2400,
    eurPerYear: 591,
  },
  {
    id: '3',
    occupancyLabel: '3 people',
    kwh: 3000,
    eurPerYear: 739,
  },
  {
    id: '4',
    occupancyLabel: '4 people',
    kwh: 3600,
    eurPerYear: 887,
  },
  {
    id: '5+',
    occupancyLabel: '5+ people',
    kwh: 4200,
    eurPerYear: 1035,
  },
] as const

export type HouseholdId = (typeof householdStates)[number]['id']
export type HouseholdState = (typeof householdStates)[number]

export const defaultHouseholdId: HouseholdId = '3'

export function getHouseholdState(id: HouseholdId): HouseholdState {
  const match = householdStates.find((state) => state.id === id)
  return match ?? householdStates[2]
}

export function formatKwhInput(kwh: number) {
  return kwh.toLocaleString('en-US')
}

export function formatEurPerYear(eur: number) {
  return `€${eur.toLocaleString('en-US')}`
}
