var annual = {
  "single": [{
    "min" : 2250,
		"max" : 11525,
		"sub" : 0,
		"percent" : 10,
		"exceed" : 2250
  },
  {
    "min" : 11525,
		"max" : 39900,
		"sub" : 927.50,
		"percent" : 15,
		"exceed" : 11525
  },
  {
    "min" : 39900,
		"max" : 93400,
		"sub" : 5183.75,
		"percent" : 25,
		"exceed" : 39900
  },
  {
    "min" : 93400,
		"max" : 192400,
		"sub" : 18558.75,
		"percent" : 28,
		"exceed" : 93400
  },
  {
    "min" : 192400,
		"max" : 415600,
		"sub" : 46278.75,
		"percent" : 33,
		"exceed" : 192400
  },
  {
    "min" : 415600,
		"max" : 417300,
		"sub" : 119934.75,
		"percent" : 35,
		"exceed" : 415600
  },
  {
    "min" : 417300,
		"max" : '',
		"sub" : 120529.75,
		"percent" : 39.6,
		"exceed" : 417300
  }],
  "married": [{
    "min" : 8550,
		"max" : 27100,
		"sub" : 0,
		"percent" : 10,
		"exceed" : 8550
  },
  {
    "min" : 27100,
		"max" : 83850,
		"sub" : 1855.00,
		"percent" : 15,
		"exceed" : 27100
  },
  {
    "min" : 83850,
		"max" : 160450,
		"sub" : 1036.75,
		"percent" : 25,
		"exceed" : 83850
  },
  {
    "min" : 160450,
		"max" : 240000,
		"sub" : 29517.50,
		"percent" : 28,
		"exceed" : 160450
  },
  {
    "min" : 240000,
		"max" : 421900,
		"sub" : 51791.50,
		"percent" : 33,
		"exceed" : 240000
  },
  {
    "min" : 421900,
		"max" : 475500,
		"sub" : 111818.50,
		"percent" : 35,
		"exceed" : 421900
  },{
    "min" : 475500,
		"max" : '',
		"sub" : 130578.50,
		"percent" : 39.6,
		"exceed" : 475500
  }]
};


var state_tax = {
  "AL": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        500,
        3000

      ],
      "rates": [
        2,
        4,
        5
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        1000,
        6000
      ],
      "rates": [
        2,
        4,
        5
      ]
    }
  },
  "AK": {
    "single": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        0
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        0
      ]
    }
  },
  "AZ": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        10000,
        25000,
        50000,
        150000
      ],
      "rates": [
        2.59,
        2.88,
        3.36,
        4.24,
        4.54
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        20000,
        50000,
        100000,
        300000
      ],
      "rates": [
        2.59,
        2.88,
        3.36,
        4.24,
        4.54
      ]
    }
  },
  "AR": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        4229,
        8399,
        12599,
        20999,
        35099
      ],
      "rates": [
       0.9,
       2.5,
       3.5,
       4.5,
       6,
       6.9
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        4229,
        8399,
        12599,
        20999,
        35099
      ],
      "rates": [
       0.9,
       2.5,
       3.5,
       4.5,
       6,
       6.9
      ]
    }
  },
  "CA": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        7875,
        18610,
        29372,
        40773,
        51530,
        263222,
        315866,
        526443,
        1000000
      ],
      "rates": [
        1,
        2,
        4,
        6,
        8,
        9.3,
        10.3,
        11.3,
        12.3,
        13.3
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        15700,
        37210,
        58744,
        81546,
        103060,
        526444,
        631732,
        1000000,
        1052866
      ],
      "rates": [
        1,
        2,
        4,
        6,
        8,
        9.3,
        10.3,
        11.3,
        12.3,
        13.3
      ]
    }
  },
  "CO": {
    "single": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        4.63
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        4.63
      ]
    }
  },
  "CT": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        10000,
        50000,
        100000,
        200000,
        250000,
        500000
      ],
      "rates": [
        3,
        5,
        5.5,
        6,
        6.6,
        6.9,
        6.99
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        20000,
        100000,
        200000,
        400000,
        500000,
        1000000
      ],
      "rates": [
        3,
        5,
        5.5,
        6,
        6.5,
        6.9,
        6.99
      ]
    }
  },
  "DE": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        2000,
        5000,
        10000,
        20000,
        25000,
        60000
      ],
      "rates": [
        2.2,
        3.9,
        4.8,
        5.2,
        5.55,
        6.6
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        2000,
        5000,
        10000,
        20000,
        25000,
        60000
      ],
      "rates": [
        2.2,
        3.9,
        4.8,
        5.2,
        5.55,
        6.6
      ]
    }
  },
  "DC": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        10000,
        40000,
        60000,
        350000,
        1000000
      ],
      "rates": [
        4,
        6,
        6.5,
        8.5,
        8.75,
        8.95
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        10000,
        40000,
        60000,
        350000,
        1000000
      ],
      "rates": [
        4,
        6,
        6.5,
        8.5,
        8.75,
        8.95
      ]
    }
  },
  "FL": {
    "single": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        0
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        0
      ]
    }
  },
  "GA": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        750,
        2250,
        3750,
        5250,
        7000
      ],
      "rates": [
        1,
        2,
        3,
        4,
        5,
        6
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        1000,
        3000,
        5000,
        7000,
        10000
      ],
      "rates": [
        1,
        2,
        3,
        4,
        5,
        6
      ]
    }
  },
  "HI": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        2400,
        4800,
        9600,
        14400,
        19200,
        24000,
        36000,
        48000
      ],
      "rates": [
        1.4,
        3.2,
        5.5,
        6.4,
        6.8,
        7.2,
        7.6,
        7.9,
        8.25
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        4800,
        9600,
        19200,
        28800,
        38400,
        48000,
        72000,
        96000
      ],
      "rates": [
        1.4,
        3.2,
        5.5,
        6.4,
        6.8,
        7.2,
        7.6,
        7.9,
        8.25
      ]
    }
  },
  "ID": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        1452,
        2940,
        4356,
        5808,
        7269,
        10890
      ],
      "rates": [
        1.6,
        3.6,
        4.1,
        5.1,
        6.1,
        7.1,
        7.4
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        2904,
        5808,
        8712,
        11616,
        14520,
        21780
      ],
      "rates": [
        1.6,
        3.6,
        4.1,
        5.1,
        6.1,
        7.1,
        7.4
      ]
    }
  },
  "IL": {
    "single": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
       3.75
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
       3.75
      ]
    }
  },
  "IN": {
    "single": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        3.3
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        3.3
      ]
    }
  },
  "IA": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        1554,
        3108,
        6216,
        13896,
        23310,
        31080,
        46620,
        69930
      ],
      "rates": [
        0.36,
        0.72,
        2.43,
        4.5,
        6.12,
        6.48,
        6.80,
        7.92,
        8.98
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        1554,
        3108,
        6216,
        13896,
        23310,
        31080,
        46620,
        69930
      ],
      "rates": [
        0.36,
        0.72,
        2.43,
        4.5,
        6.12,
        6.48,
        6.80,
        7.92,
        8.98
      ]
    }
  },
  "KS": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        15000
      ],
      "rates": [
        2.7,
        4.6
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        30000
      ],
      "rates": [
        2.7,
        4.6
      ]
    }
  },
  "KY": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        3000,
        4000,
        5000,
        8000,
        75000
      ],
      "rates": [
        2,
        3,
        4,
        5,
        5.8,
        6
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        3000,
        4000,
        5000,
        8000,
        75000
      ],
      "rates": [
        2,
        3,
        4,
        5,
        5.8,
        6
      ]
    }
  },
  "LA": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        12500,
        50000
      ],
      "rates": [
        2,
        4,
        6
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        25000,
        100000
      ],
      "rates": [
        2,
        4,
        6
      ]
    }
  },
  "ME": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        21049,
        37499
      ],
      "rates": [
        5.8,
        6.75,
        7.15
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        42099,
        74999
      ],
      "rates": [
        5.8,
        6.75,
        7.15
      ]
    }
  },
  "MD": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        1000,
        2000,
        3000,
        100000,
        125000,
        150000,
        250000
      ],
      "rates": [
        2,
        3,
        4,
        4.75,
        5,
        5.25,
        5.5,
        5.75
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        1000,
        2000,
        3000,
        150000,
        175000,
        225000,
        300000
      ],
      "rates": [
        2,
        3,
        4,
        4.75,
        5,
        5.25,
        5.5,
        5.75
      ]
    }
  },
  "MA": {
    "single": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        5.1
      ],
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        5.1
      ]
    }
  },
  "MI": {
    "single": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        4.25
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        4.25
      ]
    }
  },
  "MN": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        25180,
        82740,
        155650
      ],
      "rates": [
        5.35,
        7.05,
        7.85,
        9.85
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        36820,
        146270,
        259420
      ],
      "rates": [
        5.35,
        7.05,
        7.85,
        9.85
      ]
    }
  },
  "MS": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        5000,
        10000
      ],
      "rates": [
        3,
        4,
        5
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        5000,
        10000
      ],
      "rates": [
        3,
        4,
        5
      ]
    }
  },
  "MO": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        1000,
        2000,
        3000,
        4000,
        5000,
        6000,
        7000,
        8000,
        9000
      ],
      "rates": [
        1.5,
        2,
        2.5,
        3,
        3.5,
        4,
        4.5,
        5,
        5.5,
        6
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        1000,
        2000,
        3000,
        4000,
        5000,
        6000,
        7000,
        8000,
        9000
      ],
      "rates": [
        1.5,
        2,
        2.5,
        3,
        3.5,
        4,
        4.5,
        5,
        5.5,
        6
      ]
    }
  },
  "MT": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        2900,
        5100,
        7800,
        10500,
        13500,
        17400
      ],
      "rates": [
        1,
        2,
        3,
        4,
        5,
        6,
        6.9
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        2900,
        5100,
        7800,
        10500,
        13500,
        17400
      ],
      "rates": [
        1,
        2,
        3,
        4,
        5,
        6,
        6.9
      ]
    }
  },
  "NE": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        3060,
        18370,
        29590
      ],
      "rates": [
        2.46,
        3.51,
        5.01,
        6.84
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        6120,
        36730,
        59180
      ],
      "rates": [
        2.46,
        3.51,
        5.01,
        6.84
      ]
    }
  },
  "NV": {
    "single": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        0
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        0
      ]
    }
  },
  "NH": {
    "single": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        5
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        5
      ]
    }
  },
  "NJ": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        20000,
        35000,
        40000,
        75000,
        500000
      ],
      "rates": [
        1.4,
        1.75,
        3.5,
        5.53,
        6.37,
        8.97
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        20000,
        50000,
        70000,
        80000,
        150000,
        500000
      ],
      "rates": [
        1.4,
        1.75,
        2.45,
        3.5,
        5.53,
        6.37,
        8.97
      ]
    }
  },
  "NM": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        5500,
        11000,
        16000
      ],
      "rates": [
        1.7,
        3.2,
        4.7,
        4.9
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        8000,
        16000,
        24000
      ],
      "rates": [
        1.7,
        3.2,
        4.7,
        4.9
      ]
    }
  },
  "NY": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        8400,
        11650,
        13850,
        21300,
        80150,
        214000,
        1070350
      ],
      "rates": [
        4,
        4.5,
        5.25,
        5.9,
        6.45,
        6.65,
        6.85,
        8.82
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        17050,
        23450,
        27750,
        42750,
        160500,
        321050,
        2140900
      ],
      "rates": [
        4,
        4.5,
        5.25,
        5.9,
        6.45,
        6.65,
        6.85,
        8.82
      ]
    }
  },
  "NC": {
    "single": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        5.75
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        5.75
      ]
    }
  },
  "ND": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        37450,
        90750,
        189300,
        411500
      ],
      "rates": [
        1.1,
        2.04,
        2.27,
        2.64,
        2.90
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        62600,
        151200,
        230450,
        411500
      ],
      "rates": [
        1.1,
        2.04,
        2.27,
        2.64,
        2.90
      ]
    }
  },
  "OH": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        5200,
        10400,
        15650,
        20900,
        41700,
        83350,
        104250,
        208500
      ],
      "rates": [
        0.5,
        0.99,
        1.98,
        2.48,
        2.97,
        3.47,
        3.96,
        4.6,
        5
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        5200,
        10400,
        15650,
        20900,
        41700,
        83350,
        104250,
        208500
      ],
      "rates": [
        0.5,
        0.99,
        1.98,
        2.48,
        2.97,
        3.47,
        3.96,
        4.6,
        5
      ]
    }
  },
  "OK": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        1000,
        2500,
        3750,
        4900,
        7200
      ],
      "rates": [
        0.5,
        1,
        2,
        3,
        4,
        5
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        2000,
        5000,
        7500,
        9800,
        12200
      ],
      "rates": [
        0.5,
        1,
        2,
        3,
        4,
        5
      ]
    }
  },
  "OR": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        3350,
        8400,
        125000
      ],
      "rates": [
        5,
        7,
        9,
        9.9
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        6500,
        16300,
        250000
      ],
      "rates": [
        5,
        7,
        9,
        9.9
      ]
    }
  },
  "PA": {
    "single": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        3.07
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        3.07
      ]
    }
  },
  "RI": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        60850,
        138300
      ],
      "rates": [
        3.75,
        4.75,
        5.99
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        60850,
        138300
      ],
      "rates": [
        3.75,
        4.75,
        5.99
      ]
    }
  },
  "SC": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        2920,
        5840,
        8760,
        11680,
        14600
      ],
      "rates": [
        0,
        3,
        4,
        5,
        6,
        7
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        2920,
        5840,
        8760,
        11680,
        14600
      ],
      "rates": [
        0,
        3,
        4,
        5,
        6,
        7
      ]
    }
  },
  "SD": {
    "single": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        0
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        0
      ]
    }
  },
  "TN": {
    "single": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        0
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        0
      ]
    }
  },
  "TX": {
    "single": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        0
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        0
      ]
    }
  },
  "UT": {
    "single": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        5
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
       5
      ]
    }
  },
  "VT": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        39900,
        93400,
        192400,
        415600
      ],
      "rates": [
        3.55,
        6.8,
        7.8,
        8.8,
        8.95
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        69900,
        160450,
        240000,
        421900
      ],
      "rates": [
        3.55,
        6.8,
        7.8,
        8.8,
        8.95
      ]
    }
  },
  "VA": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        3000,
        5000,
        17000
      ],
      "rates": [
        2,
        3,
        5,
        5.75
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        3000,
        5000,
        17000
      ],
      "rates": [
        2,
        3,
        5,
        5.75
      ]
    }
  },
  "WA": {
    "single": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        0
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        0
      ]
    }
  },
  "WV": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        10000,
        25000,
        40000,
        60000
      ],
      "rates": [
        3,
        4,
        4.5,
        6,
        6.5
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        10000,
        25000,
        40000,
        60000
      ],
      "rates": [
        3,
        4,
        4.5,
        6,
        6.5
      ]
    }
  },
  "WI": {
    "single": {
      "deductions": 0,
      "brackets": [
        0,
        11150,
        22230,
        244750
      ],
      "rates": [
        4,
        5.84,
        6,
        27,
        7.65
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0,
        14820,
        29640,
        326330
      ],
      "rates": [
        4,
        5.84,
        6,
        27,
        7.65
      ]
    }
  },
  "WY": {
    "single": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        0
      ]
    },
    "married": {
      "deductions": 0,
      "brackets": [
        0
      ],
      "rates": [
        0
      ]
    }
  }
};

var sdi = {
  "CA": {
    "max": [
      106742
    ],
    "percent": [
      .9
    ],
    "maxtax": [
      960.68
    ],
    "flag": [
      1
    ]
  },
  "HI": {
    "max": [
      0
    ],
    "maxtax": [
      4.91
    ],
    "percent": [
      .5
    ],
    "flag": [
      2
    ]
  },
  "NJ": {
    "max": [
      32600
    ],
    "percent": [
      .2
    ],
    "maxtax": [
      65.2
    ],
    "flag": [
      1
    ]
  },
  "NY": {
    "max": [
      0
    ],
    "maxtax": [
      .60
    ],
    "percent": [
      .5
    ],
    "flag": [
      2
    ]
  },
  "RI": {
    "max": [
      66300
    ],
    "percent": [
      1.2
    ],
    "maxtax": [
      795.6
    ],
    "flag": [
      1
    ]
  }
};

var sui = {
  "AK": {
    "max": [
      39700
    ],
    "percent": [
      0.5
    ],
    "maxtax": [
      198.5
    ],
    "flag": [
      1
    ]
  },
  "NJ": {
    "max": [
      32600
    ],
    "percent": [
      0.425
    ],
    "maxtax": [
      138.55
    ],
    "flag": [
      1
    ]
  },
  "PA": {
    "percent": [
      0.07
    ],
    "flag": [
      5
    ]
  }
};

var wc = {
  "NM": {
    "daily": [
      0.0214
    ],
    "weekly": [
      0.15
    ],
    "biweekly": [
      0.31
    ],
    "monthly": [
      0.65
    ],
    "bimonthly": [
      0.325
    ],
    "semimonthly": [
      0.325
    ],
    "quarterly": [
      1.95
    ],
    "semiannual": [
      3.9
    ],
    "annual": [
      7.8
    ],
    "flag": [
      3
    ]
  },
  "OR": {
    "percent": [
      0.0165
    ],
    "flag": [
      4
    ]
  }
};

var flv = {
  "NJ": {
    "max": [
      32600
    ],
    "percent": [
      0.08
    ],
    "maxtax": [
      26.08
    ],
    "flag": [
      1
    ]
  }
};

var wf = {
  "NJ": {
    "max": [
      32600
    ],
    "percent": [
      0.0425
    ],
    "maxtax": [
      13.86
    ],
    "flag": [
      1
    ]
  }
};

var exp = {
  "weekly": {
    "rate": 77.90
  },
  "biweekly": {
    "rate": 155.80
  },
  "monthly": {
    "rate": 337.50
  },
  "bimonthly": {
    "rate": 168.80
  },
  "semimonthly": {
    "rate": 168.80
  },
  "quarterly": {
    "rate": 1012.50
  },
  "semiannual": {
    "rate": 2025
  },
  "annual": {
    "rate": 40500
  },
  "daily": {
    "rate": 15.60
  }
};

var medi = {
  "max": 200000,
  "p1": 0.0145,
  "p2": 0.0235
};

var social = {
  "max": 7347,
  "p1": 0.062
};

paystubConfig['2016'] = {
  annual: annual,
  state_tax: state_tax,
  sdi: sdi,
  sui: sui,
  wc: wc,
  flv: flv,
  wf: wf,
  exp: exp,
  medi: medi,
  social: social
};