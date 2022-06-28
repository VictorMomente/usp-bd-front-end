enum Colors {
  'gray-100' = '#F5F6F8',
  'gray-200' = '#E6EAEF',
  'gray-300' = '#ACB5C3',
  'gray-400' = 'rgba(255, 255, 255, 0.4)',
  'gray-500' = '#161616',
  'green-100' = '#317F60',
  'green-200' = '#00773B',
  'yellow-100' = '#E9A930',
  'red-100' = '#FFE2DB',
  'red-200' = '#FDF0ED',
  'red-300' = '#A71D38',
  'red-400' = '#FF0000',
  'white' = '#FFFFFF'
}

enum Padding {
  p1 = '4px',
  p2 = '8px',
  p3 = '16px',
  p4 = '32px',
  p5 = '40px',
  p6 = '48px',
  p7 = '56px'
}

enum Border {
  b0 = '0px',
  b1 = '5px'
}

export default {
  colors: {
    textPrimary: Colors['gray-500'],
    textGray: Colors['gray-300'],
    textWhite: Colors.white,
    cardLetter: Colors['gray-400'],
    synced: Colors['gray-300'],
    outOfSync: Colors['red-400'],
    divider: Colors['gray-100'],
    background: Colors.white,
    backgroundGreen: Colors['green-200'],
    selectedBackground: Colors['gray-100'],
    selectedErrorBackground: Colors['red-100'],
    errorBackground: Colors['red-200'],
    border: Colors['gray-200'],
    statusIndicator: {
      valid: Colors['green-100'],
      invalid: Colors['red-300']
    },
    toast: {
      success: Colors['green-100'],
      warning: Colors['yellow-100'],
      error: Colors['red-300']
    }
  },
  padding: {
    p1: Padding.p1,
    p2: Padding.p2,
    p3: Padding.p3,
    p4: Padding.p4,
    p5: Padding.p5,
    p6: Padding.p6,
    p7: Padding.p7
  },
  border: {
    b0: Border.b0,
    b1: Border.b1
  }
}
