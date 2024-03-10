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
                    "layers": [
                        {
                            "completionName": "CEMENTED_BLANK_PIPE_HTML",
                            "description": "Cemented B.P.",
                            "gravelInAnnulus": false,
                            "inner": 9.263547938860583,
                            "key": "layer_1_1",
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "packerLeaking": false
                        }
                    ],
                    "length": 840.0,
                    "pipes": [
                        {
                            "completionName": "CEMENTED_BLANK_PIPE_HTML",
                            "layerName": "Casing / Liner"
                        }
                    ],
                    "points": [
                        {
                            "MD": 0.0,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 0.0,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 250.0,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 250.0,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 500.0,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 500.0,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 750.0,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 750.0,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 780.0,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 780.0,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 810.0,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 810.0,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 840.0,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 840.0,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        }
                    ],
                    "userNotes": "",
                    "viewDiameterWell": 50.0
                },
                {
                    "MD": 840.0,
                    "TVD": 840.0,
                    "devices": [
                        {
                            "completionName": "PUMP_SRP_HTML",
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "rotate": -5.9259264162392356e-12,
                            "scaleHeight": 0.211118930330753,
                            "scaleWidth": 0.4552671305497276,
                            "x1": -9.263547938860583,
                            "y1": 840.0
                        }
                    ],
                    "item": "2",
                    "key": "completion_2",
                    "layers": [
                        {
                            "completionName": "SECTION_UNDEFINED_HTML",
                            "description": "Pump (SRP)",
                            "gravelInAnnulus": false,
                            "inner": 9.263547938860583,
                            "key": "layer_2_1",
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "packerLeaking": false
                        },
                        {
                            "completionName": "CEMENTED_BLANK_PIPE_HTML",
                            "description": "Cemented B.P.",
                            "gravelInAnnulus": false,
                            "inner": 9.263547938860583,
                            "key": "layer_2_2",
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "packerLeaking": false
                        }
                    ],
                    "length": 6.0,
                    "pipes": [],
                    "points": [
                        {
                            "MD": 840.0,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 840.0,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 846.0,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 846.0,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        }
                    ],
                    "userNotes": "",
                    "viewDiameterWell": 50.0
                },
                {
                    "MD": 846.0,
                    "TVD": 846.0,
                    "devices": [],
                    "item": "3",
                    "key": "completion_3",
                    "layers": [
                        {
                            "completionName": "SECTION_UNDEFINED_HTML",
                            "description": "Open",
                            "gravelInAnnulus": false,
                            "inner": 9.263547938860583,
                            "key": "layer_3_1",
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "packerLeaking": false
                        },
                        {
                            "completionName": "CEMENTED_BLANK_PIPE_HTML",
                            "description": "Cemented B.P.",
                            "gravelInAnnulus": false,
                            "inner": 9.263547938860583,
                            "key": "layer_3_2",
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "packerLeaking": false
                        }
                    ],
                    "length": 24.0,
                    "pipes": [
                        {
                            "completionName": "CEMENTED_BLANK_PIPE_HTML",
                            "layerName": "Casing / Liner"
                        }
                    ],
                    "points": [
                        {
                            "MD": 846.0,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 846.0,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 852.0,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 852.0,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 870.0,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 870.0,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        }
                    ],
                    "userNotes": "",
                    "viewDiameterWell": 50.0
                },
                {
                    "MD": 870.0,
                    "TVD": 870.0,
                    "devices": [],
                    "item": "4",
                    "key": "completion_4",
                    "layers": [
                        {
                            "completionName": "CEMENTED_BLANK_PIPE_HTML",
                            "description": "Cemented B.P.",
                            "gravelInAnnulus": false,
                            "inner": 9.263547938860583,
                            "key": "layer_4_1",
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "packerLeaking": false
                        }
                    ],
                    "length": 30.0,
                    "pipes": [
                        {
                            "completionName": "CEMENTED_BLANK_PIPE_HTML",
                            "layerName": "Casing / Liner"
                        }
                    ],
                    "points": [
                        {
                            "MD": 870.0,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 870.0,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 876.0,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 876.0,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 900.0,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 900.0,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        }
                    ],
                    "userNotes": "",
                    "viewDiameterWell": 50.0
                },
                {
                    "MD": 900.0,
                    "TVD": 900.0,
                    "devices": [],
                    "item": "5",
                    "key": "completion_5",
                    "layers": [
                        {
                            "completionName": "PERF_CEMENTED_HTML",
                            "description": "Perf. cemented liner",
                            "gravelInAnnulus": false,
                            "inner": 9.263547938860583,
                            "key": "layer_5_1",
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "packerLeaking": false
                        }
                    ],
                    "length": 100.0,
                    "pipes": [
                        {
                            "completionName": "PERF_CEMENTED_HTML",
                            "layerName": "Casing / Liner"
                        }
                    ],
                    "points": [
                        {
                            "MD": 900.0,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 900.0,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 905.882,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 905.882,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 911.765,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 911.765,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 917.647,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 917.647,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 923.529,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 923.529,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 929.412,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 929.412,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 935.294,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 935.294,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 941.176,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 941.176,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 947.059,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 947.059,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 952.941,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 952.941,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 964.706,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 964.706,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 976.471,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 976.471,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 988.235,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 988.235,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 994.118,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 994.118,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        },
                        {
                            "MD": 1000.0,
                            "MDH": 0.0,
                            "Rwell": 25.0,
                            "TVD": 1000.0,
                            "X": 0.0,
                            "Y": 0.0,
                            "cosInclination": 0.0,
                            "sinInclination": 1.0
                        }
                    ],
                    "userNotes": "",
                    "viewDiameterWell": 50.0
                }
            ],
            "horizontalWell": false,
            "pressureSensors": [],
            "simulationResults": [
                {
                    "flowRate": [
                        {
                            "MD": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": 0.00150838
                        },
                        {
                            "MD": 840.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": 5.74693e-05
                        },
                        {
                            "MD": 846.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": 5.74666e-05
                        },
                        {
                            "MD": 870.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": 5.74557e-05
                        },
                        {
                            "MD": 900.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": 5.74423e-05
                        },
                        {
                            "MD": 905.882,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": -0.000480519
                        },
                        {
                            "MD": 911.765,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": -0.000951518
                        },
                        {
                            "MD": 917.647,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": -0.00135561
                        },
                        {
                            "MD": 929.412,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": -0.00196325
                        },
                        {
                            "MD": 947.059,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": -0.0023739
                        },
                        {
                            "MD": 976.471,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": -0.00172333
                        },
                        {
                            "MD": 988.235,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": -0.000995459
                        },
                        {
                            "MD": 994.118,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": -0.000531193
                        },
                        {
                            "MD": 1000.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": 0.0
                        }
                    ],
                    "fractions": [
                        {
                            "MD": 0.0,
                            "Q": 1.0000002,
                            "Qgas": 0.985575,
                            "Qoil": 0.0144252,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583
                        },
                        {
                            "MD": 846.0,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583
                        },
                        {
                            "MD": 852.0,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583
                        },
                        {
                            "MD": 876.0,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583
                        },
                        {
                            "MD": 905.882,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583
                        },
                        {
                            "MD": 905.882,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0
                        },
                        {
                            "MD": 905.882,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 25.0,
                            "layerName": "Reservoir",
                            "outer": 30.0
                        },
                        {
                            "MD": 1000.0,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583
                        },
                        {
                            "MD": 1000.0,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0
                        },
                        {
                            "MD": 1000.0,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 25.0,
                            "layerName": "Reservoir",
                            "outer": 30.0
                        }
                    ],
                    "influxRate": [
                        {
                            "MD": 900.0,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "value": 9.14534e-05
                        },
                        {
                            "MD": 900.0,
                            "inner": 25.0,
                            "layerName": "Reservoir",
                            "outer": 27.5,
                            "value": 9.14196e-05
                        },
                        {
                            "MD": 911.765,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "value": 6.87024e-05
                        },
                        {
                            "MD": 911.765,
                            "inner": 25.0,
                            "layerName": "Reservoir",
                            "outer": 27.5,
                            "value": 6.86834e-05
                        },
                        {
                            "MD": 923.529,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "value": 4.59832e-05
                        },
                        {
                            "MD": 923.529,
                            "inner": 25.0,
                            "layerName": "Reservoir",
                            "outer": 27.5,
                            "value": 4.59747e-05
                        },
                        {
                            "MD": 935.294,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "value": 2.32864e-05
                        },
                        {
                            "MD": 935.294,
                            "inner": 25.0,
                            "layerName": "Reservoir",
                            "outer": 27.5,
                            "value": 2.32842e-05
                        },
                        {
                            "MD": 947.059,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "value": 5.97397e-07
                        },
                        {
                            "MD": 947.059,
                            "inner": 25.0,
                            "layerName": "Reservoir",
                            "outer": 27.5,
                            "value": 5.97395e-07
                        },
                        {
                            "MD": 952.941,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "value": -1.07494e-05
                        },
                        {
                            "MD": 952.941,
                            "inner": 25.0,
                            "layerName": "Reservoir",
                            "outer": 27.5,
                            "value": -1.07494e-05
                        },
                        {
                            "MD": 964.706,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "value": -3.34509e-05
                        },
                        {
                            "MD": 964.706,
                            "inner": 25.0,
                            "layerName": "Reservoir",
                            "outer": 27.5,
                            "value": -3.34509e-05
                        },
                        {
                            "MD": 976.471,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "value": -5.61719e-05
                        },
                        {
                            "MD": 976.471,
                            "inner": 25.0,
                            "layerName": "Reservoir",
                            "outer": 27.5,
                            "value": -5.61719e-05
                        },
                        {
                            "MD": 988.235,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "value": -7.89176e-05
                        },
                        {
                            "MD": 988.235,
                            "inner": 25.0,
                            "layerName": "Reservoir",
                            "outer": 27.5,
                            "value": -7.89176e-05
                        },
                        {
                            "MD": 994.118,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "value": -9.02986e-05
                        },
                        {
                            "MD": 994.118,
                            "inner": 25.0,
                            "layerName": "Reservoir",
                            "outer": 27.5,
                            "value": -9.02986e-05
                        }
                    ],
                    "num": 0.0,
                    "pressure": [
                        {
                            "MD": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": 1000000.0
                        },
                        {
                            "MD": 846.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": 99488900.0
                        },
                        {
                            "MD": 852.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": 99517500.0
                        },
                        {
                            "MD": 876.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": 99632000.0
                        },
                        {
                            "MD": 905.882,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": 99774500.0
                        },
                        {
                            "MD": 905.882,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "value": 99774500.0
                        },
                        {
                            "MD": 917.647,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "value": 99830600.0
                        },
                        {
                            "MD": 929.412,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "value": 99886600.0
                        },
                        {
                            "MD": 941.176,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "value": 99942600.0
                        },
                        {
                            "MD": 952.941,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "value": 99998500.0
                        },
                        {
                            "MD": 964.706,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "value": 100055000.0
                        },
                        {
                            "MD": 976.471,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "value": 100111000.0
                        },
                        {
                            "MD": 988.235,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "value": 100167000.0
                        },
                        {
                            "MD": 1000.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 9.263547938860583,
                            "value": 100223000.0
                        },
                        {
                            "MD": 1000.0,
                            "inner": 9.263547938860583,
                            "layerName": "Casing / Liner",
                            "outer": 25.0,
                            "value": 100223000.0
                        }
                    ],
                    "temperature": [],
                    "title": "",
                    "unitType": ""
                }
            ],
            "title": "mainbore",
            "wellTrajectory": {
                "points": [
                    {
                        "MD": 0.0,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 0.0,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 250.0,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 250.0,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 500.0,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 500.0,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 750.0,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 750.0,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 780.0,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 780.0,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 810.0,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 810.0,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 840.0,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 840.0,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 846.0,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 846.0,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 852.0,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 852.0,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 870.0,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 870.0,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 876.0,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 876.0,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 900.0,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 900.0,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 905.882,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 905.882,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 911.765,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 911.765,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 917.647,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 917.647,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 923.529,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 923.529,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 929.412,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 929.412,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 935.294,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 935.294,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 941.176,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 941.176,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 947.059,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 947.059,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 952.941,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 952.941,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 964.706,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 964.706,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 976.471,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 976.471,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 988.235,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 988.235,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 994.118,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 994.118,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    },
                    {
                        "MD": 1000.0,
                        "MDH": 0.0,
                        "Rwell": 25.0,
                        "TVD": 1000.0,
                        "X": 0.0,
                        "Y": 0.0,
                        "cosInclination": 0.0,
                        "sinInclination": 1.0
                    }
                ],
                "radiusFactor": 0.004318,
                "viewDiameterWell": 50.0
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

it('Test SRP', () => {
    ResolverFactory.initResolver(ResolverFactory.TEST_RESOLVER)
    if (ResolverFactory.getResolver() instanceof TestResolver)
        (ResolverFactory.getResolver() as TestResolver).setWellSchematicData(wellSchematicData)
    act(() => {
        ReactDOM.render(<App />, container)
    })
    act(() => { GlobalObserver.getInstance().observableResolverInit.notify(true) })
    setTimeout(() => { }, 1000)
    expect(container).toMatchSnapshot()
})