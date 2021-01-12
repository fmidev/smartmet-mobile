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
    keywords: ['cold'],
    warningName: 'cold'
  },
  {
    keywords: ['craft'],
    warningName: 'craft'
  },
  {
    keywords: ['cyclone'],
    warningName: 'cyclone'
  },
  {
    keywords: ['depression'],
    warningName: 'depression'
  },
  {
    keywords: ['drought'],
    warningName: 'drought'
  },
  {
    keywords: ['dust'],
    warningName: 'dust'
  },
  {
    keywords: ['earthquake'],
    warningName: 'earthquake'
  },
  {
    keywords: ['fire'],
    warningName: 'fire'
  },
  {
    keywords: ['flood'],
    warningName: 'flood'
  },
  {
    keywords: ['fog'],
    warningName: 'fog'
  },
  {
    keywords: ['frost'],
    warningName: 'frost'
  },
  {
    keywords: ['gale'],
    warningName: 'gale'
  },
  {
    keywords: ['hail'],
    warningName: 'hail'
  },
  {
    keywords: ['heat'],
    warningName: 'heat'
  },
  {
    keywords: ['hot'],
    warningName: 'hot'
  },
  {
    keywords: ['hurricane'],
    warningName: 'hurricane'
  },
  {
    keywords: ['icing'],
    warningName: 'icing'
  },
  {
    keywords: ['lightning'],
    warningName: 'lightning'
  },
  {
    keywords: ['rain', 'rainfall'],
    warningName: 'rain'
  },
  {
    keywords: ['smallcraft'],
    warningName: 'smallcraft'
  },
  {
    keywords: ['sleet'],
    warningName: 'sleet'
  },
  {
    keywords: ['snow'],
    warningName: 'snow'
  },
  {
    keywords: ['storm'],
    warningName: 'storm'
  },
  {
    keywords: ['temperature'],
    warningName: 'temperature'
  },
  {
    keywords: ['thunderstorm'],
    warningName: 'thunderstorm'
  },
  {
    keywords: ['tornado'],
    warningName: 'tornado'
  },
  {
    keywords: ['tropical'],
    warningName: 'tropical'
  },
  {
    keywords: ['tropical depression'],
    warningName: 'tropical depression'
  },

  {
    keywords: ['tropical storm'],
    warningName: 'tropical storm'
  },
  {
    keywords: ['tsunami'],
    warningName: 'tsunami'
  },
  {
    keywords: ['volcanic'],
    warningName: 'volcanic'
  },
  {
    keywords: ['waterspout'],
    warningName: 'waterspout'
  },
  {
    keywords: ['wet snow'],
    warningName: 'wet snow'
  },
  {
    keywords: ['wind'],
    warningName: 'wind'
  },
]

export const WARNING_SEVERITY_MAPPER =
{
  0: 'rgb(104,193,104)',
  1: 'rgb(104,193,104)',
  2: 'rgb(104,193,104)',
  3: 'rgb(255,227,0)',
  4: 'rgb(255,162,0)',
  5: 'rgb(227,0,0)'
}
