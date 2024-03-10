import * as React from "react";
import { act } from "react-dom/test-utils";
import * as ReactDOM from 'react-dom';
import { App } from "../src/app"
import { ResolverFactory } from "../src/resolver/resolverFactory";
import { WellSchematicData } from "../src/resolver/wellSchematicData";
import { GlobalObserver } from "../src/resolver/globalObserver";
import { TestResolver } from "../src/resolver/testResolver";

var wellSchematicData: WellSchematicData = {
    "availableColorized": [
        "Flow rate",
        "Pressure",
        "Phase flow fractions",
        "Nothing"
    ],
    "currentTitleLateral": "mainbore",
    "currentschedule": {
        "colorized": "Flow rate",
        "num": 0.0
    },
    "laterals": [
        {
            "completions": [
                {
                    "MD": 0.0,
                    "TVD": 0.0,
                    "devices": [],
                    "item": "1",
                    "key": "completion_1",
                    "length": 13.4256,
                    "pipes": [
                        {
                            "completionName": "OPEN_HOLE_HTML",
                            "layerName": "Reservoir"
                        }
                    ],
                    "points": [
                        {
                            "MD": 0.0,
                            "MDH": 0.0,
                            "Rwell": 8.580153333333334,
                            "TVD": 0.0,
                            "X": 591.689,
                            "Y": 1965.96,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 4.47519,
                            "MDH": 4.47519,
                            "Rwell": 8.580153333333334,
                            "TVD": 0.0,
                            "X": 593.791,
                            "Y": 1969.91,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 8.95039,
                            "MDH": 8.95039,
                            "Rwell": 8.580153333333334,
                            "TVD": 0.0,
                            "X": 596.398,
                            "Y": 1973.54,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 13.4256,
                            "MDH": 13.4256,
                            "Rwell": 8.580153333333334,
                            "TVD": 0.0,
                            "X": 599.707,
                            "Y": 1976.53,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        }
                    ],
                    "userNotes": "",
                    "viewDiameterWell": 17.160306666666667
                },
                {
                    "MD": 13.4256,
                    "TVD": 0.0,
                    "devices": [],
                    "item": "2",
                    "key": "completion_2",
                    "layers": [
                        {
                            "completionName": "JUNCTION_HTML",
                            "description": "Junction",
                            "gravelInAnnulus": false,
                            "inner": 8.580153333333334,
                            "key": "layer_2_1",
                            "layerName": "Tubing",
                            "outer": 10.296184,
                            "packerLeaking": false
                        }
                    ],
                    "length": 3.75,
                    "pipes": [
                        {
                            "completionName": "OPEN_HOLE_HTML",
                            "layerName": "Reservoir"
                        }
                    ],
                    "points": [
                        {
                            "MD": 13.4256,
                            "MDH": 13.4256,
                            "Rwell": 8.580153333333334,
                            "TVD": 0.0,
                            "X": 599.707,
                            "Y": 1976.53,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 17.1756,
                            "MDH": 17.1756,
                            "Rwell": 8.580153333333334,
                            "TVD": 0.0,
                            "X": 603.1,
                            "Y": 1978.09,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        }
                    ],
                    "userNotes": "",
                    "viewDiameterWell": 17.160306666666667
                },
                {
                    "MD": 17.1756,
                    "TVD": 0.0,
                    "devices": [],
                    "item": "3",
                    "key": "completion_3",
                    "length": 9.6756,
                    "pipes": [
                        {
                            "completionName": "OPEN_HOLE_HTML",
                            "layerName": "Reservoir"
                        }
                    ],
                    "points": [
                        {
                            "MD": 17.1756,
                            "MDH": 17.1756,
                            "Rwell": 8.580153333333334,
                            "TVD": 0.0,
                            "X": 603.1,
                            "Y": 1978.09,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 22.0134,
                            "MDH": 22.0134,
                            "Rwell": 8.580153333333334,
                            "TVD": 0.0,
                            "X": 607.746,
                            "Y": 1976.81,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 26.8512,
                            "MDH": 26.8512,
                            "Rwell": 8.580153333333334,
                            "TVD": 0.0,
                            "X": 612.05,
                            "Y": 1974.61,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        }
                    ],
                    "userNotes": "",
                    "viewDiameterWell": 17.160306666666667
                },
                {
                    "MD": 26.8512,
                    "TVD": 0.0,
                    "devices": [],
                    "item": "4",
                    "key": "completion_4",
                    "layers": [
                        {
                            "completionName": "SCREEN_HTML",
                            "description": "Screen",
                            "gravelInAnnulus": false,
                            "inner": 6.056578823529412,
                            "key": "layer_4_1",
                            "layerName": "Sand control",
                            "outer": 6.561293725490196,
                            "packerLeaking": false
                        }
                    ],
                    "length": 13.4255,
                    "pipes": [
                        {
                            "completionName": "SCREEN_HTML",
                            "layerName": "Sand control"
                        }
                    ],
                    "points": [
                        {
                            "MD": 26.8512,
                            "MDH": 26.8512,
                            "Rwell": 8.580153333333334,
                            "TVD": 0.0,
                            "X": 612.05,
                            "Y": 1974.61,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 31.3263,
                            "MDH": 31.3263,
                            "Rwell": 8.580153333333334,
                            "TVD": 0.0,
                            "X": 615.904,
                            "Y": 1972.34,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 35.8015,
                            "MDH": 35.8015,
                            "Rwell": 8.580153333333334,
                            "TVD": 0.0,
                            "X": 619.79,
                            "Y": 1970.12,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 40.2767,
                            "MDH": 40.2767,
                            "Rwell": 8.580153333333334,
                            "TVD": 0.0,
                            "X": 624.006,
                            "Y": 1968.75,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        }
                    ],
                    "userNotes": "",
                    "viewDiameterWell": 17.160306666666667
                },
                {
                    "MD": 40.2767,
                    "TVD": 0.0,
                    "devices": [],
                    "item": "5",
                    "key": "completion_5",
                    "length": 13.425600000000003,
                    "pipes": [
                        {
                            "completionName": "OPEN_HOLE_HTML",
                            "layerName": "Reservoir"
                        }
                    ],
                    "points": [
                        {
                            "MD": 40.2767,
                            "MDH": 40.2767,
                            "Rwell": 8.580153333333334,
                            "TVD": 0.0,
                            "X": 624.006,
                            "Y": 1968.75,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 49.2271,
                            "MDH": 49.2271,
                            "Rwell": 8.580153333333334,
                            "TVD": 0.0,
                            "X": 632.92,
                            "Y": 1968.11,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 53.7023,
                            "MDH": 53.7023,
                            "Rwell": 8.580153333333334,
                            "TVD": 0.0,
                            "X": 637.385,
                            "Y": 1968.4,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        }
                    ],
                    "userNotes": "",
                    "viewDiameterWell": 17.160306666666667
                }
            ],
            "horizontalWell": true,
            "pressureSensors": [],
            "simulationResults": [
                {
                    "flowRate": [
                        {
                            "MD": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334,
                            "value": 0.0115741
                        },
                        {
                            "MD": 8.95039,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334,
                            "value": 0.0102623
                        },
                        {
                            "MD": 17.1756,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334,
                            "value": 0.00905678
                        },
                        {
                            "MD": 22.0134,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334,
                            "value": 0.00464433
                        },
                        {
                            "MD": 26.8512,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 6.056578823529412,
                            "value": 0.00266154
                        },
                        {
                            "MD": 26.8512,
                            "inner": 6.561293725490196,
                            "layerName": "Sand control",
                            "outer": 8.580153333333334,
                            "value": 0.00127377
                        },
                        {
                            "MD": 31.3263,
                            "inner": 6.561293725490196,
                            "layerName": "Sand control",
                            "outer": 8.580153333333334,
                            "value": 0.000969554
                        },
                        {
                            "MD": 35.8015,
                            "inner": 6.561293725490196,
                            "layerName": "Sand control",
                            "outer": 8.580153333333334,
                            "value": 0.000540528
                        },
                        {
                            "MD": 40.2767,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334,
                            "value": 0.00196765
                        },
                        {
                            "MD": 49.2271,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334,
                            "value": 0.000655883
                        },
                        {
                            "MD": 53.7023,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334,
                            "value": 0.0
                        }
                    ],
                    "fractions": [
                        {
                            "MD": 0.0,
                            "Q": 0.9999998,
                            "Qgas": 0.0409738,
                            "Qoil": 0.959026,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334
                        },
                        {
                            "MD": 4.47519,
                            "Q": 1.0000003,
                            "Qgas": 0.0409733,
                            "Qoil": 0.959027,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334
                        },
                        {
                            "MD": 4.47519,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 8.580153333333334,
                            "layerName": "Reservoir",
                            "outer": 10.296184
                        },
                        {
                            "MD": 8.95039,
                            "Q": 0.9999998,
                            "Qgas": 0.0409728,
                            "Qoil": 0.959027,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334
                        },
                        {
                            "MD": 13.4256,
                            "Q": 1.0000004,
                            "Qgas": 0.0409724,
                            "Qoil": 0.959028,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334
                        },
                        {
                            "MD": 17.1756,
                            "Q": 1.0000001,
                            "Qgas": 0.0409721,
                            "Qoil": 0.959028,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 0.0
                        },
                        {
                            "MD": 17.1756,
                            "Q": 1.0000001,
                            "Qgas": 0.0409721,
                            "Qoil": 0.959028,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 0.0
                        },
                        {
                            "MD": 26.8512,
                            "Q": 0.9999998,
                            "Qgas": 0.0409718,
                            "Qoil": 0.959028,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334
                        },
                        {
                            "MD": 26.8512,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 8.580153333333334,
                            "layerName": "Reservoir",
                            "outer": 10.296184
                        },
                        {
                            "MD": 31.3263,
                            "Q": 0.9999996,
                            "Qgas": 0.0409716,
                            "Qoil": 0.959028,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 6.056578823529412
                        },
                        {
                            "MD": 31.3263,
                            "Q": 0.9999996,
                            "Qgas": 0.0409716,
                            "Qoil": 0.959028,
                            "Qwater": 0.0,
                            "inner": 6.561293725490196,
                            "layerName": "Sand control",
                            "outer": 8.580153333333334
                        },
                        {
                            "MD": 31.3263,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 8.580153333333334,
                            "layerName": "Reservoir",
                            "outer": 10.296184
                        },
                        {
                            "MD": 35.8015,
                            "Q": 1.0000004,
                            "Qgas": 0.0409714,
                            "Qoil": 0.959029,
                            "Qwater": 0.0,
                            "inner": 6.561293725490196,
                            "layerName": "Sand control",
                            "outer": 8.580153333333334
                        },
                        {
                            "MD": 40.2767,
                            "Q": 1.0000004,
                            "Qgas": 0.0409714,
                            "Qoil": 0.959029,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 6.056578823529412
                        },
                        {
                            "MD": 40.2767,
                            "Q": 1.0000004,
                            "Qgas": 0.0409714,
                            "Qoil": 0.959029,
                            "Qwater": 0.0,
                            "inner": 6.561293725490196,
                            "layerName": "Sand control",
                            "outer": 8.580153333333334
                        },
                        {
                            "MD": 44.7519,
                            "Q": 1.0000003,
                            "Qgas": 0.0409713,
                            "Qoil": 0.959029,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334
                        },
                        {
                            "MD": 44.7519,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 8.580153333333334,
                            "layerName": "Reservoir",
                            "outer": 10.296184
                        },
                        {
                            "MD": 53.7023,
                            "Q": 1.0000003,
                            "Qgas": 0.0409713,
                            "Qoil": 0.959029,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334
                        },
                        {
                            "MD": 53.7023,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 8.580153333333334,
                            "layerName": "Reservoir",
                            "outer": 10.296184
                        }
                    ],
                    "influxRate": [
                        {
                            "MD": 0.0,
                            "inner": 8.580153333333334,
                            "layerName": "Reservoir",
                            "outer": 9.438168666666666,
                            "value": 0.000143448
                        },
                        {
                            "MD": 4.47519,
                            "inner": 8.580153333333334,
                            "layerName": "Reservoir",
                            "outer": 9.438168666666666,
                            "value": 0.000143447
                        },
                        {
                            "MD": 8.95039,
                            "inner": 8.580153333333334,
                            "layerName": "Reservoir",
                            "outer": 9.438168666666666,
                            "value": 0.000143447
                        },
                        {
                            "MD": 13.4256,
                            "inner": 8.580153333333334,
                            "layerName": "Reservoir",
                            "outer": 9.438168666666666,
                            "value": 0.000143446
                        },
                        {
                            "MD": 22.0134,
                            "inner": 8.580153333333334,
                            "layerName": "Reservoir",
                            "outer": 9.438168666666666,
                            "value": 0.000143446
                        },
                        {
                            "MD": 26.8512,
                            "inner": 6.056578823529412,
                            "layerName": "Sand control",
                            "outer": 6.561293725490196,
                            "value": 7.85826e-05
                        },
                        {
                            "MD": 26.8512,
                            "inner": 8.580153333333334,
                            "layerName": "Reservoir",
                            "outer": 9.438168666666666,
                            "value": 0.000143446
                        },
                        {
                            "MD": 31.3263,
                            "inner": 6.056578823529412,
                            "layerName": "Sand control",
                            "outer": 6.561293725490196,
                            "value": 5.06922e-05
                        },
                        {
                            "MD": 35.8015,
                            "inner": 6.056578823529412,
                            "layerName": "Sand control",
                            "outer": 6.561293725490196,
                            "value": 0.0
                        },
                        {
                            "MD": 35.8015,
                            "inner": 8.580153333333334,
                            "layerName": "Reservoir",
                            "outer": 9.438168666666666,
                            "value": 0.000143445
                        },
                        {
                            "MD": 40.2767,
                            "inner": 8.580153333333334,
                            "layerName": "Reservoir",
                            "outer": 9.438168666666666,
                            "value": 0.000143445
                        },
                        {
                            "MD": 49.2271,
                            "inner": 8.580153333333334,
                            "layerName": "Reservoir",
                            "outer": 9.438168666666666,
                            "value": 0.000143445
                        }
                    ],
                    "num": 0.0,
                    "pressure": [
                        {
                            "MD": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334,
                            "value": 23794500.0
                        },
                        {
                            "MD": 4.47519,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334,
                            "value": 23794500.0
                        },
                        {
                            "MD": 8.95039,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334,
                            "value": 23794500.0
                        },
                        {
                            "MD": 13.4256,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334,
                            "value": 23794600.0
                        },
                        {
                            "MD": 17.1756,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 0.0,
                            "value": 23794600.0
                        },
                        {
                            "MD": 17.1756,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 0.0,
                            "value": 23794600.0
                        },
                        {
                            "MD": 26.8512,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334,
                            "value": 23794600.0
                        },
                        {
                            "MD": 31.3263,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 6.056578823529412,
                            "value": 23794600.0
                        },
                        {
                            "MD": 31.3263,
                            "inner": 6.561293725490196,
                            "layerName": "Sand control",
                            "outer": 8.580153333333334,
                            "value": 23794600.0
                        },
                        {
                            "MD": 35.8015,
                            "inner": 6.561293725490196,
                            "layerName": "Sand control",
                            "outer": 8.580153333333334,
                            "value": 23794600.0
                        },
                        {
                            "MD": 40.2767,
                            "inner": 6.561293725490196,
                            "layerName": "Sand control",
                            "outer": 8.580153333333334,
                            "value": 23794600.0
                        },
                        {
                            "MD": 44.7519,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334,
                            "value": 23794600.0
                        },
                        {
                            "MD": 53.7023,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 8.580153333333334,
                            "value": 23794600.0
                        }
                    ],
                    "temperature": [],
                    "title": "t=",
                    "unitType": "time-days"
                }
            ],
            "title": "mainbore",
            "wellTrajectory": {
                "points": [
                    {
                        "MD": 0.0,
                        "MDH": 0.0,
                        "Rwell": 8.580153333333334,
                        "TVD": 0.0,
                        "X": 591.689,
                        "Y": 1965.96,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 4.47519,
                        "MDH": 4.47519,
                        "Rwell": 8.580153333333334,
                        "TVD": 0.0,
                        "X": 593.791,
                        "Y": 1969.91,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 8.95039,
                        "MDH": 8.95039,
                        "Rwell": 8.580153333333334,
                        "TVD": 0.0,
                        "X": 596.398,
                        "Y": 1973.54,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 13.4256,
                        "MDH": 13.4256,
                        "Rwell": 8.580153333333334,
                        "TVD": 0.0,
                        "X": 599.707,
                        "Y": 1976.53,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 17.1756,
                        "MDH": 17.1756,
                        "Rwell": 8.580153333333334,
                        "TVD": 0.0,
                        "X": 603.1,
                        "Y": 1978.09,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 22.0134,
                        "MDH": 22.0134,
                        "Rwell": 8.580153333333334,
                        "TVD": 0.0,
                        "X": 607.746,
                        "Y": 1976.81,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 26.8512,
                        "MDH": 26.8512,
                        "Rwell": 8.580153333333334,
                        "TVD": 0.0,
                        "X": 612.05,
                        "Y": 1974.61,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 31.3263,
                        "MDH": 31.3263,
                        "Rwell": 8.580153333333334,
                        "TVD": 0.0,
                        "X": 615.904,
                        "Y": 1972.34,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 35.8015,
                        "MDH": 35.8015,
                        "Rwell": 8.580153333333334,
                        "TVD": 0.0,
                        "X": 619.79,
                        "Y": 1970.12,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 40.2767,
                        "MDH": 40.2767,
                        "Rwell": 8.580153333333334,
                        "TVD": 0.0,
                        "X": 624.006,
                        "Y": 1968.75,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 49.2271,
                        "MDH": 49.2271,
                        "Rwell": 8.580153333333334,
                        "TVD": 0.0,
                        "X": 632.92,
                        "Y": 1968.11,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 53.7023,
                        "MDH": 53.7023,
                        "Rwell": 8.580153333333334,
                        "TVD": 0.0,
                        "X": 637.385,
                        "Y": 1968.4,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    }
                ],
                "radiusFactor": 0.012581360239871393,
                "viewDiameterWell": 17.160306666666667
            }
        },
        {
            "completions": [
                {
                    "MD": 17.1756,
                    "TVD": 0.0,
                    "devices": [],
                    "item": "1",
                    "key": "completion_1",
                    "length": 8.422900000000002,
                    "pipes": [
                        {
                            "completionName": "OPEN_HOLE_HTML",
                            "layerName": "Reservoir"
                        }
                    ],
                    "points": [
                        {
                            "MD": 17.1756,
                            "MDH": 0.0,
                            "Rwell": 7.246113333333333,
                            "TVD": 0.0,
                            "X": 603.1,
                            "Y": 1978.09,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 21.387,
                            "MDH": 4.211400000000001,
                            "Rwell": 7.246113333333333,
                            "TVD": 0.0,
                            "X": 604.141,
                            "Y": 1974.0,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 25.5985,
                            "MDH": 8.422900000000002,
                            "Rwell": 7.246113333333333,
                            "TVD": 0.0,
                            "X": 605.281,
                            "Y": 1969.95,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        }
                    ],
                    "userNotes": "",
                    "viewDiameterWell": 14.492226666666665
                },
                {
                    "MD": 25.5985,
                    "TVD": 0.0,
                    "devices": [
                        {
                            "completionName": "PACKER_HTML",
                            "layerName": "Sand control",
                            "outer": 7.246113333333333,
                            "rotate": -90.0,
                            "scaleHeight": 0.11654913602539194,
                            "scaleWidth": 0.19455264949952095,
                            "x1": 8.422900000000002,
                            "y1": 7.246113333333333
                        }
                    ],
                    "item": "2",
                    "key": "completion_2",
                    "layers": [
                        {
                            "completionName": "SECTION_PACKER_HTML",
                            "description": "Packer",
                            "gravelInAnnulus": false,
                            "inner": 5.114903529411764,
                            "key": "layer_2_1",
                            "layerName": "Sand control",
                            "outer": 7.246113333333333,
                            "packerLeaking": false
                        }
                    ],
                    "length": 8.423000000000002,
                    "pipes": [],
                    "points": [
                        {
                            "MD": 25.5985,
                            "MDH": 8.422900000000002,
                            "Rwell": 7.246113333333333,
                            "TVD": 0.0,
                            "X": 605.281,
                            "Y": 1969.95,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 29.81,
                            "MDH": 12.6344,
                            "Rwell": 7.246113333333333,
                            "TVD": 0.0,
                            "X": 606.519,
                            "Y": 1965.92,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 34.0215,
                            "MDH": 16.845900000000004,
                            "Rwell": 7.246113333333333,
                            "TVD": 0.0,
                            "X": 607.855,
                            "Y": 1961.93,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        }
                    ],
                    "userNotes": "",
                    "viewDiameterWell": 14.492226666666665
                },
                {
                    "MD": 34.0215,
                    "TVD": 0.0,
                    "devices": [],
                    "item": "3",
                    "key": "completion_3",
                    "length": 16.845799999999997,
                    "pipes": [
                        {
                            "completionName": "OPEN_HOLE_HTML",
                            "layerName": "Reservoir"
                        }
                    ],
                    "points": [
                        {
                            "MD": 34.0215,
                            "MDH": 16.845900000000004,
                            "Rwell": 7.246113333333333,
                            "TVD": 0.0,
                            "X": 607.855,
                            "Y": 1961.93,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 38.2329,
                            "MDH": 21.0573,
                            "Rwell": 7.246113333333333,
                            "TVD": 0.0,
                            "X": 609.291,
                            "Y": 1957.97,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 42.4444,
                            "MDH": 25.268800000000002,
                            "Rwell": 7.246113333333333,
                            "TVD": 0.0,
                            "X": 610.824,
                            "Y": 1954.05,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 46.6559,
                            "MDH": 29.480300000000003,
                            "Rwell": 7.246113333333333,
                            "TVD": 0.0,
                            "X": 612.455,
                            "Y": 1950.17,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 50.8673,
                            "MDH": 33.6917,
                            "Rwell": 7.246113333333333,
                            "TVD": 0.0,
                            "X": 614.183,
                            "Y": 1946.33,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        }
                    ],
                    "userNotes": "",
                    "viewDiameterWell": 14.492226666666665
                }
            ],
            "horizontalWell": true,
            "pressureSensors": [],
            "simulationResults": [
                {
                    "flowRate": [
                        {
                            "MD": 17.1756,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 7.246113333333333,
                            "value": 0.00370341
                        },
                        {
                            "MD": 21.387,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 7.246113333333333,
                            "value": 0.00308618
                        },
                        {
                            "MD": 25.5985,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.114903529411764,
                            "value": 0.00246894
                        },
                        {
                            "MD": 34.0215,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 7.246113333333333,
                            "value": 0.00246894
                        },
                        {
                            "MD": 38.2329,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 7.246113333333333,
                            "value": 0.0018517
                        },
                        {
                            "MD": 42.4444,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 7.246113333333333,
                            "value": 0.00123447
                        },
                        {
                            "MD": 46.6559,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 7.246113333333333,
                            "value": 0.000617235
                        },
                        {
                            "MD": 50.8673,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 7.246113333333333,
                            "value": 0.0
                        }
                    ],
                    "fractions": [
                        {
                            "MD": 17.1756,
                            "Q": 1.0000001,
                            "Qgas": 0.0409721,
                            "Qoil": 0.959028,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 7.246113333333333
                        },
                        {
                            "MD": 21.387,
                            "Q": 1.0,
                            "Qgas": 0.040972,
                            "Qoil": 0.959028,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 7.246113333333333
                        },
                        {
                            "MD": 21.387,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 7.246113333333333,
                            "layerName": "Reservoir",
                            "outer": 8.695336
                        },
                        {
                            "MD": 25.5985,
                            "Q": 0.9999998999999999,
                            "Qgas": 0.0409719,
                            "Qoil": 0.959028,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 7.246113333333333
                        },
                        {
                            "MD": 29.81,
                            "Q": 0.9999998,
                            "Qgas": 0.0409718,
                            "Qoil": 0.959028,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.114903529411764
                        },
                        {
                            "MD": 34.0215,
                            "Q": 0.9999997,
                            "Qgas": 0.0409717,
                            "Qoil": 0.959028,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.114903529411764
                        },
                        {
                            "MD": 38.2329,
                            "Q": 0.9999997,
                            "Qgas": 0.0409717,
                            "Qoil": 0.959028,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 7.246113333333333
                        },
                        {
                            "MD": 38.2329,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 7.246113333333333,
                            "layerName": "Reservoir",
                            "outer": 8.695336
                        },
                        {
                            "MD": 46.6559,
                            "Q": 0.9999996,
                            "Qgas": 0.0409716,
                            "Qoil": 0.959028,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 7.246113333333333
                        },
                        {
                            "MD": 50.8673,
                            "Q": 0.9999996,
                            "Qgas": 0.0409716,
                            "Qoil": 0.959028,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 7.246113333333333
                        },
                        {
                            "MD": 50.8673,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 7.246113333333333,
                            "layerName": "Reservoir",
                            "outer": 8.695336
                        }
                    ],
                    "influxRate": [
                        {
                            "MD": 17.1756,
                            "inner": 7.246113333333333,
                            "layerName": "Reservoir",
                            "outer": 7.9707246666666665,
                            "value": 0.000143446
                        },
                        {
                            "MD": 21.387,
                            "inner": 7.246113333333333,
                            "layerName": "Reservoir",
                            "outer": 7.9707246666666665,
                            "value": 0.000143446
                        },
                        {
                            "MD": 34.0215,
                            "inner": 7.246113333333333,
                            "layerName": "Reservoir",
                            "outer": 7.9707246666666665,
                            "value": 0.000143446
                        },
                        {
                            "MD": 42.4444,
                            "inner": 7.246113333333333,
                            "layerName": "Reservoir",
                            "outer": 7.9707246666666665,
                            "value": 0.000143446
                        },
                        {
                            "MD": 46.6559,
                            "inner": 7.246113333333333,
                            "layerName": "Reservoir",
                            "outer": 7.9707246666666665,
                            "value": 0.000143446
                        }
                    ],
                    "num": 0.0,
                    "pressure": [
                        {
                            "MD": 17.1756,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 7.246113333333333,
                            "value": 23794600.0
                        },
                        {
                            "MD": 21.387,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 7.246113333333333,
                            "value": 23794600.0
                        },
                        {
                            "MD": 25.5985,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 7.246113333333333,
                            "value": 23794600.0
                        },
                        {
                            "MD": 29.81,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.114903529411764,
                            "value": 23794600.0
                        },
                        {
                            "MD": 34.0215,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.114903529411764,
                            "value": 23794600.0
                        },
                        {
                            "MD": 38.2329,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 7.246113333333333,
                            "value": 23794600.0
                        },
                        {
                            "MD": 46.6559,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 7.246113333333333,
                            "value": 23794600.0
                        },
                        {
                            "MD": 50.8673,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 7.246113333333333,
                            "value": 23794600.0
                        }
                    ],
                    "temperature": [],
                    "title": "t=",
                    "unitType": "time-days"
                }
            ],
            "title": "Lateral 1",
            "wellTrajectory": {
                "points": [
                    {
                        "MD": 17.1756,
                        "MDH": 0.0,
                        "Rwell": 7.246113333333333,
                        "TVD": 0.0,
                        "X": 603.1,
                        "Y": 1978.09,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 21.387,
                        "MDH": 4.211400000000001,
                        "Rwell": 7.246113333333333,
                        "TVD": 0.0,
                        "X": 604.141,
                        "Y": 1974.0,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 25.5985,
                        "MDH": 8.422900000000002,
                        "Rwell": 7.246113333333333,
                        "TVD": 0.0,
                        "X": 605.281,
                        "Y": 1969.95,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 29.81,
                        "MDH": 12.6344,
                        "Rwell": 7.246113333333333,
                        "TVD": 0.0,
                        "X": 606.519,
                        "Y": 1965.92,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 34.0215,
                        "MDH": 16.845900000000004,
                        "Rwell": 7.246113333333333,
                        "TVD": 0.0,
                        "X": 607.855,
                        "Y": 1961.93,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 38.2329,
                        "MDH": 21.0573,
                        "Rwell": 7.246113333333333,
                        "TVD": 0.0,
                        "X": 609.291,
                        "Y": 1957.97,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 42.4444,
                        "MDH": 25.268800000000002,
                        "Rwell": 7.246113333333333,
                        "TVD": 0.0,
                        "X": 610.824,
                        "Y": 1954.05,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 46.6559,
                        "MDH": 29.480300000000003,
                        "Rwell": 7.246113333333333,
                        "TVD": 0.0,
                        "X": 612.455,
                        "Y": 1950.17,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 50.8673,
                        "MDH": 33.6917,
                        "Rwell": 7.246113333333333,
                        "TVD": 0.0,
                        "X": 614.183,
                        "Y": 1946.33,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    }
                ],
                "radiusFactor": 0.014897641678251423,
                "viewDiameterWell": 14.492226666666667
            }
        }
    ],
    rangessimulationresults: new Map(),
    units: new Map(),
    "viewOptions": {
        "modeView": "NETOOL_WELLSCHEMATIC_DEVIATION"
    }
}

wellSchematicData.rangessimulationresults['Flow rate'] = {
    "maxValue": 1.84215,
    "minValue": 0.0
}
wellSchematicData.rangessimulationresults['Pressure'] = {
    "maxValue": 4163560.0,
    "minValue": -22053300.0
}
wellSchematicData.rangessimulationresults['Temperature'] = {
    "maxValue": null,
    "minValue": null
}

wellSchematicData.units['angle'] = {
    "factor": 0.0174533,
    "name": "°deg",
    "offset": 0.0
}
wellSchematicData.units['flowrate-liquid'] = {
    "factor": 1.0,
    "name": "Sm³/s",
    "offset": 0.0
}
wellSchematicData.units['flowrate-reservoir'] = {
    "factor": 1.15741e-05,
    "name": "Rm³/day",
    "offset": 0.0
}
wellSchematicData.units['flux-reservoir'] = {
    "factor": 1.15741e-05,
    "name": "Rm³/day/m",
    "offset": 0.0
}
wellSchematicData.units['length'] = {
    "factor": 1.0,
    "name": "m",
    "offset": 0.0
}
wellSchematicData.units['length-diameters'] = {
    "factor": 0.001,
    "name": "mm",
    "offset": 0.0
}
wellSchematicData.units['pressure'] = {
    "factor": 100000.0,
    "name": "bar",
    "offset": 0.0
}
wellSchematicData.units['temperature'] = {
    "factor": 1.0,
    "name": "°C",
    "offset": 273.15
}

let container

beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.2)
    container = document.createElement('div')
    document.body.appendChild(container)
});

afterEach(() => {
    document.body.removeChild(container)
    container = null
    jest.spyOn(global.Math, 'random').mockRestore()
})

jest.mock('svg-pan-zoom', () => {
    const originalModule = jest.requireActual('svg-pan-zoom')
    return jest.fn(originalModule.mockReturnThis)
});

const crypto = require('crypto')

Object.defineProperty(global.self, 'crypto', {
    value: {
        getRandomValues: arr => crypto.randomBytes(arr.length)
    }
});

it('Test multilateral', () => {
    ResolverFactory.initResolver(ResolverFactory.TEST_RESOLVER)
    if (ResolverFactory.getResolver() instanceof TestResolver)
        (ResolverFactory.getResolver() as TestResolver).setWellSchematicData(wellSchematicData)
    act(() => {
        ReactDOM.render(<App />, container)
    })
    act(() => { GlobalObserver.getInstance().observableResolverInit.notify(true) })
    setTimeout(() => { }, 1000)
    act(() => { ResolverFactory.getResolver().onUpdateTitleLateral('Lateral 1') })
    setTimeout(() => { }, 1000)
    expect(container).toMatchSnapshot()
})