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
  numDrivers: 'Total de pilotos',
  numConstructors: 'Total de escuderias',
  numRaces: 'Total de corridas',
  numSeasons: 'Total de temporadas',
  numConstructorsWins: 'Vitórias',
  numDriversDiff: 'Quantidade de pilotos',
  constructorsFirstYear: 'Primeiro ano',
  constructorsLastYear: 'Último ano',
  numDriverWins: 'Vitórias',
  driverFirstYear: 'Primeiro ano',
  driverLastYear: 'Último ano'
}
