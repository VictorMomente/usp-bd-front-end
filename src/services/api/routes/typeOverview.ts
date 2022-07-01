export type Overview = {
  numDrivers?: number
  numConstructors?: number
  numRaces?: number
  numSeasons?: number
  numConstructorsWins?: number
  numDriversDiff?: number
  constructorsFirstYear?: string
  constructorsLastYear?: string
  numDriverWins?: number
  driverFirstYear?: string
  driverLastYear?: string
}

export const OverviewMap = {
  numDrivers: 'Pilotos',
  numConstructors: 'Escuderias',
  numRaces: 'Corridas',
  numSeasons: 'Temporadas',
  numConstructorsWins: 'Vitórias',
  numDriversDiff: 'Pilotos',
  constructorsFirstYear: 'Primeiro ano',
  constructorsLastYear: 'Último ano',
  numDriverWins: 'Vitórias',
  driverFirstYear: 'Primeiro ano',
  driverLastYear: 'Último ano'
}
