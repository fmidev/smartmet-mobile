export const UNITS = [
  {
    parameterName: 'temperature',
    unitTypes: [
      {
        unitId: 1,
        unitAbb: 'C',
        unit: 'celsius',
        unitPrecision: 0
      },
      {
        unitId: 2,
        unitAbb: 'F',
        unit: 'fahrenheit',
        unitPrecision: 0
      }
    ]
  },
  {
    parameterName: 'precipitation',
    unitTypes: [
      {
        unitId: 1,
        unitAbb: 'mm',
        unit: 'millimeter',
        unitPrecision: 1
      },
      {
        unitId: 2,
        unitAbb: 'in',
        unit: 'inch',
        unitPrecision: 2
      }
    ]
  },
  {
    parameterName: 'wind',
    unitTypes: [
      {
        unitId: 1,
        unitAbb: 'm/s',
        unit: 'meters per second',
        unitPrecision: 0
      },
      {
        unitId: 2,
        unitAbb: 'km/h',
        unit: 'kilometers per hour',
        unitPrecision: 0
      },
      {
        unitId: 3,
        unitAbb: 'mph',
        unit: 'miles per hour',
        unitPrecision: 0
      },
      {
        unitId: 4,
        unitAbb: 'Bft',
        unit: 'beaufort',
        unitPrecision: 0
      },
      {
        unitId: 5,
        unitAbb: 'kn',
        unit: 'knot',
        unitPrecision: 0
      }
    ]
  },
  {
    parameterName: 'pressure',
    unitTypes: [
      {
        unitId: 1,
        unitAbb: 'hPa',
        unit: 'hehtopascal',
        unitPrecision: 1
      },
      {
        unitId: 2,
        unitAbb: 'inHg',
        unit: 'inch of mercury',
        unitPrecision: 1
      },
      {
        unitId: 3,
        unitAbb: 'mmHg',
        unit: 'millimeter of mercury',
        unitPrecision: 0
      },
      {
        unitId: 4,
        unitAbb: 'mbar',
        unit: 'millibar',
        unitPrecision: 1
      }
    ]
  }
]

export const WARNING_KEYWORD_MAPPER = [
  {
    id: 1,
    keywords: ['earthquake'],
    warningName: 'earthquake'
  },
  {
    id: 2,
    keywords: ['fire'],
    warningName: 'fire'
  },
  {
    id: 3,
    keywords: ['drought'],
    warningName: 'drought'
  },
  {
    id: 4,
    keywords: ['craft'],
    warningName: 'craft'
  },
  {
    id: 5,
    keywords: ['gale'],
    warningName: 'gale'
  },
  {
    id: 6,
    keywords: ['fog'],
    warningName: 'fog'
  },
  {
    id: 7,
    keywords: ['flood'],
    warningName: 'flood'
  },
  {
    id: 8,
    keywords: ['frost'],
    warningName: 'frost'
  },
  {
    id: 9,
    keywords: ['heat'],
    warningName: 'heat'
  },
  {
    id: 10,
    keywords: ['cold'],
    warningName: 'cold'
  },
  {
    id: 11,
    keywords: ['temperature'],
    warningName: 'temperature'
  },
  {
    id: 12,
    keywords: ['rain', 'rainfall'],
    warningName: 'rain'
  },
  {
    id: 13,
    keywords: ['snow'],
    warningName: 'snow'
  },
  {
    id: 14,
    keywords: ['icing'],
    warningName: 'icing'
  },
  {
    id: 15,
    keywords: ['sleet'],
    warningName: 'sleet'
  },
  {
    id: 16,
    keywords: ['wet snow'],
    warningName: 'wet snow'
  },
  {
    id: 17,
    keywords: ['wind'],
    warningName: 'wind'
  },
  {
    id: 18,
    keywords: ['tsunami'],
    warningName: 'tsunami'
  },
  {
    id: 19,
    keywords: ['tornado'],
    warningName: 'tornado'
  },
  {
    id: 20,
    keywords: ['waterspout'],
    warningName: 'waterspout'
  },
  {
    id: 21,
    keywords: ['volcanic'],
    warningName: 'volcanic'
  },
  {
    id: 22,
    keywords: ['thunderstorm'],
    warningName: 'thunderstorm'
  },
  {
    id: 23,
    keywords: ['lightning'],
    warningName: 'lightning'
  },
  {
    id: 24,
    keywords: ['storm'],
    warningName: 'storm'
  },
  {
    id: 25,
    keywords: ['hail'],
    warningName: 'hail'
  },
  {
    id: 26,
    keywords: ['hurricane'],
    warningName: 'hurricane'
  },
  {
    id: 27,
    keywords: ['tropical storm'],
    warningName: 'tropical storm'
  },
  {
    id: 28,
    keywords: ['depression'],
    warningName: 'depression'
  },
  {
    id: 29,
    keywords: ['tropical'],
    warningName: 'tropical'
  }
]

export const WARNING_SEVERITY_MAPPER =
{
  0: 'green',
  1: 'green',
  2: 'green',
  3: 'yellow',
  4: 'orange',
  5: 'red'
}
