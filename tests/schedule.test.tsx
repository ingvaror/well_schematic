import * as React from "react";
import { act } from "react-dom/test-utils";
import * as ReactDOM from 'react-dom';
import { App } from "../src/app"
import { ResolverFactory } from "../src/resolver/resolverFactory";
import { WellSchematicData } from "../src/resolver/wellSchematicData";
import { GlobalObserver } from "../src/resolver/globalObserver";
import { NETOOL_WELLSCHEMATIC_DEVIATION_WITH_AXES, SCHEMATIC_PRESSURE, SCHEMATIC_RATES } from "../src/resolver/schematicProps";
import { TestResolver } from "../src/resolver/testResolver";

var wellSchematicData: WellSchematicData = {
    availableColorized: [
        "Flow rate",
        "Pressure",
        "Phase flow fractions",
        "Nothing"
    ],
    currentTitleLateral: "mainbore",
    currentschedule: {
        "colorized": "Flow rate",
        "num": 0.00578704
    },
    laterals: [
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
                            "inner": 5.088099607843137,
                            "key": "layer_1_1",
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "packerLeaking": false
                        }
                    ],
                    "length": 8.83803,
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
                            "Rwell": 6.178406666666667,
                            "TVD": 0.0,
                            "X": 865.457,
                            "Y": 1322.37,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 4.41901,
                            "MDH": 4.41901,
                            "Rwell": 6.178406666666667,
                            "TVD": 0.0,
                            "X": 869.266,
                            "Y": 1320.13,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 8.83803,
                            "MDH": 8.83803,
                            "Rwell": 6.178406666666667,
                            "TVD": 0.0,
                            "X": 873.246,
                            "Y": 1318.21,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        }
                    ],
                    "userNotes": "",
                    "viewDiameterWell": 12.356813333333333
                },
                {
                    "MD": 8.83803,
                    "TVD": 0.0,
                    "devices": [
                        {
                            "completionName": "ICV_HTML",
                            "layerName": "Inflow control",
                            "outer": 3.9977925490196076,
                            "rotate": -90.0,
                            "scaleHeight": 0.08141064698948697,
                            "scaleWidth": 0.14741801895742204,
                            "x1": 8.83803,
                            "y1": 3.9977925490196076
                        }
                    ],
                    "item": "2",
                    "key": "completion_2",
                    "layers": [
                        {
                            "completionName": "SECTION_ICV_HTML",
                            "description": "ICV",
                            "gravelInAnnulus": false,
                            "inner": 3.634356862745098,
                            "key": "layer_2_1",
                            "layerName": "Inflow control",
                            "outer": 3.9977925490196076,
                            "packerLeaking": false
                        },
                        {
                            "completionName": "PERF_CEMENTED_HTML",
                            "description": "Perf. cemented liner",
                            "gravelInAnnulus": false,
                            "inner": 5.088099607843137,
                            "key": "layer_2_2",
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "packerLeaking": false
                        }
                    ],
                    "length": 4.41897,
                    "pipes": [],
                    "points": [
                        {
                            "MD": 8.83803,
                            "MDH": 8.83803,
                            "Rwell": 6.178406666666667,
                            "TVD": 0.0,
                            "X": 873.246,
                            "Y": 1318.21,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 13.257,
                            "MDH": 13.257,
                            "Rwell": 6.178406666666667,
                            "TVD": 0.0,
                            "X": 877.38,
                            "Y": 1316.66,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        }
                    ],
                    "userNotes": "",
                    "viewDiameterWell": 12.356813333333333
                },
                {
                    "MD": 13.257,
                    "TVD": 0.0,
                    "devices": [
                        {
                            "completionName": "ICD_HTML",
                            "layerName": "Inflow control",
                            "outer": 3.9977925490196076,
                            "rotate": -90.0,
                            "scaleHeight": 0.030637132556849706,
                            "scaleWidth": 0.0681984399355102,
                            "x1": 13.257,
                            "y1": 3.9977925490196076
                        }
                    ],
                    "item": "3",
                    "key": "completion_3",
                    "layers": [
                        {
                            "completionName": "SECTION_ICD_HTML",
                            "description": "Debug ICD",
                            "gravelInAnnulus": false,
                            "inner": 3.634356862745098,
                            "key": "layer_3_1",
                            "layerName": "Inflow control",
                            "outer": 3.9977925490196076,
                            "packerLeaking": true
                        },
                        {
                            "completionName": "PERF_CEMENTED_HTML",
                            "description": "Perf. cemented liner",
                            "gravelInAnnulus": false,
                            "inner": 5.088099607843137,
                            "key": "layer_3_2",
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "packerLeaking": false
                        }
                    ],
                    "length": 4.419100000000002,
                    "pipes": [],
                    "points": [
                        {
                            "MD": 13.257,
                            "MDH": 13.257,
                            "Rwell": 6.178406666666667,
                            "TVD": 0.0,
                            "X": 877.38,
                            "Y": 1316.66,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        },
                        {
                            "MD": 17.6761,
                            "MDH": 17.6761,
                            "Rwell": 6.178406666666667,
                            "TVD": 0.0,
                            "X": 881.641,
                            "Y": 1315.49,
                            "cosInclination": 1.0,
                            "sinInclination": 0.0
                        }
                    ],
                    "userNotes": "",
                    "viewDiameterWell": 12.356813333333333
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
                            "outer": 5.088099607843137,
                            "value": 0.0251518
                        },
                        {
                            "MD": 8.83803,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 0.00042811
                        },
                        {
                            "MD": 8.83803,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 0.024705
                        },
                        {
                            "MD": 13.257,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 2.1154e-05
                        },
                        {
                            "MD": 13.257,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 0.0125421
                        },
                        {
                            "MD": 17.6761,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 0.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 0.0
                        }
                    ],
                    "fractions": [
                        {
                            "MD": 0.0,
                            "Q": 1.0,
                            "Qgas": 0.749951,
                            "Qoil": 0.250049,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 4.41901,
                            "Q": 1.0,
                            "Qgas": 0.749947,
                            "Qoil": 0.250053,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 8.83803,
                            "Q": 1.0,
                            "Qgas": 0.749944,
                            "Qoil": 0.250056,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.0,
                            "Qgas": 0.749944,
                            "Qoil": 0.250056,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.0,
                            "Qgas": 0.749751,
                            "Qoil": 0.250249,
                            "Qwater": 0.0,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.0,
                            "Qgas": 0.74975,
                            "Qoil": 0.25025,
                            "Qwater": 0.0,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 7.414088
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.0,
                            "Qgas": 0.749944,
                            "Qoil": 0.250056,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.0,
                            "Qgas": 0.749691,
                            "Qoil": 0.250309,
                            "Qwater": 0.0,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.0,
                            "Qgas": 0.749689,
                            "Qoil": 0.250311,
                            "Qwater": 0.0,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 7.414088
                        }
                    ],
                    "influxRate": [
                        {
                            "MD": 8.83803,
                            "inner": 3.634356862745098,
                            "layerName": "Inflow control",
                            "outer": 3.9977925490196076,
                            "value": 9.20281e-05
                        },
                        {
                            "MD": 8.83803,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": 0.00284376
                        },
                        {
                            "MD": 8.83803,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 6.7962473333333335,
                            "value": 0.000898625
                        },
                        {
                            "MD": 13.257,
                            "inner": 3.634356862745098,
                            "layerName": "Inflow control",
                            "outer": 3.9977925490196076,
                            "value": 4.7827e-06
                        },
                        {
                            "MD": 13.257,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": 0.00284297
                        },
                        {
                            "MD": 13.257,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 6.7962473333333335,
                            "value": 0.000898584
                        }
                    ],
                    "num": 0.00578704,
                    "pressure": [
                        {
                            "MD": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137,
                            "value": 4158860.0
                        },
                        {
                            "MD": 4.41901,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137,
                            "value": 4158920.0
                        },
                        {
                            "MD": 8.83803,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137,
                            "value": 4158980.0
                        },
                        {
                            "MD": 13.257,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 4158980.0
                        },
                        {
                            "MD": 13.257,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 4162440.0
                        },
                        {
                            "MD": 13.257,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": 4162470.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 4158980.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 4163540.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": 4163560.0
                        }
                    ],
                    "temperature": [],
                    "title": "@Qoil=",
                    "unitType": "flowrate-liquid"
                },
                {
                    "flowRate": [
                        {
                            "MD": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137,
                            "value": 1.10529
                        },
                        {
                            "MD": 8.83803,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 0.0339271
                        },
                        {
                            "MD": 8.83803,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 1.07136
                        },
                        {
                            "MD": 13.257,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 0.0015296
                        },
                        {
                            "MD": 13.257,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 0.550592
                        },
                        {
                            "MD": 17.6761,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 0.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 0.0
                        }
                    ],
                    "fractions": [
                        {
                            "MD": 0.0,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 7.414088
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 7.414088
                        }
                    ],
                    "influxRate": [
                        {
                            "MD": 8.83803,
                            "inner": 3.634356862745098,
                            "layerName": "Inflow control",
                            "outer": 3.9977925490196076,
                            "value": 0.00733139
                        },
                        {
                            "MD": 8.83803,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": 0.125179
                        },
                        {
                            "MD": 8.83803,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 6.7962473333333335,
                            "value": 0.00107935
                        },
                        {
                            "MD": 13.257,
                            "inner": 3.634356862745098,
                            "layerName": "Inflow control",
                            "outer": 3.9977925490196076,
                            "value": 0.00034614
                        },
                        {
                            "MD": 13.257,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": 0.124942
                        },
                        {
                            "MD": 13.257,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 6.7962473333333335,
                            "value": 0.0010773
                        }
                    ],
                    "num": 0.00694444,
                    "pressure": [
                        {
                            "MD": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137,
                            "value": -1299300.0
                        },
                        {
                            "MD": 13.257,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": -1294790.0
                        },
                        {
                            "MD": 13.257,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": -671799.0
                        },
                        {
                            "MD": 13.257,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": -671738.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": -1294790.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": -617088.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": -617028.0
                        }
                    ],
                    "temperature": [],
                    "title": "@Qoil=",
                    "unitType": "flowrate-liquid"
                },
                {
                    "flowRate": [
                        {
                            "MD": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137,
                            "value": 1.28951
                        },
                        {
                            "MD": 8.83803,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 0.042956
                        },
                        {
                            "MD": 8.83803,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 1.24655
                        },
                        {
                            "MD": 13.257,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 0.00193127
                        },
                        {
                            "MD": 13.257,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 0.642041
                        },
                        {
                            "MD": 17.6761,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 0.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 0.0
                        }
                    ],
                    "fractions": [
                        {
                            "MD": 0.0,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 4.41901,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 7.414088
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 7.414088
                        }
                    ],
                    "influxRate": [
                        {
                            "MD": 8.83803,
                            "inner": 3.634356862745098,
                            "layerName": "Inflow control",
                            "outer": 3.9977925490196076,
                            "value": 0.00928369
                        },
                        {
                            "MD": 8.83803,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": 0.146081
                        },
                        {
                            "MD": 8.83803,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 6.7962473333333335,
                            "value": 0.00125957
                        },
                        {
                            "MD": 13.257,
                            "inner": 3.634356862745098,
                            "layerName": "Inflow control",
                            "outer": 3.9977925490196076,
                            "value": 0.000437037
                        },
                        {
                            "MD": 13.257,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": 0.145728
                        },
                        {
                            "MD": 13.257,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 6.7962473333333335,
                            "value": 0.00125652
                        }
                    ],
                    "num": 0.00810185,
                    "pressure": [
                        {
                            "MD": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137,
                            "value": -6498410.0
                        },
                        {
                            "MD": 13.257,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": -6492020.0
                        },
                        {
                            "MD": 13.257,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": -5492620.0
                        },
                        {
                            "MD": 13.257,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": -5492550.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": -6492020.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": -5411080.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": -5411010.0
                        }
                    ],
                    "temperature": [],
                    "title": "@Qoil=",
                    "unitType": "flowrate-liquid"
                },
                {
                    "flowRate": [
                        {
                            "MD": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137,
                            "value": 1.47372
                        },
                        {
                            "MD": 8.83803,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 0.0490388
                        },
                        {
                            "MD": 8.83803,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 1.42468
                        },
                        {
                            "MD": 13.257,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 0.00221509
                        },
                        {
                            "MD": 13.257,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 0.733495
                        },
                        {
                            "MD": 17.6761,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 0.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 0.0
                        }
                    ],
                    "fractions": [
                        {
                            "MD": 0.0,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 7.414088
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 7.414088
                        }
                    ],
                    "influxRate": [
                        {
                            "MD": 8.83803,
                            "inner": 3.634356862745098,
                            "layerName": "Inflow control",
                            "outer": 3.9977925490196076,
                            "value": 0.010596
                        },
                        {
                            "MD": 8.83803,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": 0.167008
                        },
                        {
                            "MD": 8.83803,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 6.7962473333333335,
                            "value": 0.00144001
                        },
                        {
                            "MD": 13.257,
                            "inner": 3.634356862745098,
                            "layerName": "Inflow control",
                            "outer": 3.9977925490196076,
                            "value": 0.000501262
                        },
                        {
                            "MD": 13.257,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": 0.166487
                        },
                        {
                            "MD": 13.257,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 6.7962473333333335,
                            "value": 0.00143552
                        }
                    ],
                    "num": 0.00925926,
                    "pressure": [
                        {
                            "MD": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137,
                            "value": -11630000.0
                        },
                        {
                            "MD": 13.257,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": -11621200.0
                        },
                        {
                            "MD": 13.257,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": -10319300.0
                        },
                        {
                            "MD": 13.257,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": -10319200.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": -11621200.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": -10199200.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": -10199100.0
                        }
                    ],
                    "temperature": [],
                    "title": "@Qoil=",
                    "unitType": "flowrate-liquid"
                },
                {
                    "flowRate": [
                        {
                            "MD": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137,
                            "value": 1.65794
                        },
                        {
                            "MD": 8.83803,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 0.0551308
                        },
                        {
                            "MD": 8.83803,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 1.60281
                        },
                        {
                            "MD": 13.257,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 0.0025077
                        },
                        {
                            "MD": 13.257,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 0.824755
                        },
                        {
                            "MD": 17.6761,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 0.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 0.0
                        }
                    ],
                    "fractions": [
                        {
                            "MD": 0.0,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 4.41901,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 7.414088
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 7.414088
                        }
                    ],
                    "influxRate": [
                        {
                            "MD": 8.83803,
                            "inner": 3.634356862745098,
                            "layerName": "Inflow control",
                            "outer": 3.9977925490196076,
                            "value": 0.0119083
                        },
                        {
                            "MD": 8.83803,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": 0.187977
                        },
                        {
                            "MD": 8.83803,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 6.7962473333333335,
                            "value": 0.00162082
                        },
                        {
                            "MD": 13.257,
                            "inner": 3.634356862745098,
                            "layerName": "Inflow control",
                            "outer": 3.9977925490196076,
                            "value": 0.000567478
                        },
                        {
                            "MD": 13.257,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": 0.187205
                        },
                        {
                            "MD": 13.257,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 6.7962473333333335,
                            "value": 0.00161416
                        }
                    ],
                    "num": 0.0104167,
                    "pressure": [
                        {
                            "MD": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137,
                            "value": -16812000.0
                        },
                        {
                            "MD": 13.257,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": -16800100.0
                        },
                        {
                            "MD": 13.257,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": -15155700.0
                        },
                        {
                            "MD": 13.257,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": -15155600.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": -16800100.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": -14977600.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": -14977500.0
                        }
                    ],
                    "temperature": [],
                    "title": "@Qoil=",
                    "unitType": "flowrate-liquid"
                },
                {
                    "flowRate": [
                        {
                            "MD": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137,
                            "value": 1.84215
                        },
                        {
                            "MD": 8.83803,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 0.0612414
                        },
                        {
                            "MD": 8.83803,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 1.78091
                        },
                        {
                            "MD": 13.257,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 0.00281687
                        },
                        {
                            "MD": 13.257,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 0.915647
                        },
                        {
                            "MD": 17.6761,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": 0.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": 0.0
                        }
                    ],
                    "fractions": [
                        {
                            "MD": 0.0,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 4.41901,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667
                        },
                        {
                            "MD": 13.257,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 7.414088
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.00000017,
                            "Qgas": 0.993371,
                            "Qoil": 0.00662917,
                            "Qwater": 0.0,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667
                        },
                        {
                            "MD": 17.6761,
                            "Q": 1.0,
                            "Qgas": 0.0,
                            "Qoil": 1.0,
                            "Qwater": 0.0,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 7.414088
                        }
                    ],
                    "influxRate": [
                        {
                            "MD": 8.83803,
                            "inner": 3.634356862745098,
                            "layerName": "Inflow control",
                            "outer": 3.9977925490196076,
                            "value": 0.0132212
                        },
                        {
                            "MD": 8.83803,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": 0.209026
                        },
                        {
                            "MD": 8.83803,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 6.7962473333333335,
                            "value": 0.0018023
                        },
                        {
                            "MD": 13.257,
                            "inner": 3.634356862745098,
                            "layerName": "Inflow control",
                            "outer": 3.9977925490196076,
                            "value": 0.000637442
                        },
                        {
                            "MD": 13.257,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": 0.207844
                        },
                        {
                            "MD": 13.257,
                            "inner": 6.178406666666667,
                            "layerName": "Reservoir",
                            "outer": 6.7962473333333335,
                            "value": 0.00179211
                        }
                    ],
                    "num": 0.0115741,
                    "pressure": [
                        {
                            "MD": 0.0,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 5.088099607843137,
                            "value": -22053300.0
                        },
                        {
                            "MD": 13.257,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": -22037300.0
                        },
                        {
                            "MD": 13.257,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": -20010400.0
                        },
                        {
                            "MD": 13.257,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": -20010300.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 0.0,
                            "layerName": "Tubing",
                            "outer": 3.634356862745098,
                            "value": -22037300.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 3.9977925490196076,
                            "layerName": "Inflow control",
                            "outer": 5.088099607843137,
                            "value": -19737800.0
                        },
                        {
                            "MD": 17.6761,
                            "inner": 5.088099607843137,
                            "layerName": "Casing / Liner",
                            "outer": 6.178406666666667,
                            "value": -19737700.0
                        }
                    ],
                    "temperature": [],
                    "title": "@Qoil=",
                    "unitType": "flowrate-liquid"
                }
            ],
            "title": "mainbore",
            "wellTrajectory": {
                "points": [
                    {
                        "MD": 0.0,
                        "MDH": 0.0,
                        "Rwell": 6.178406666666667,
                        "TVD": 0.0,
                        "X": 865.457,
                        "Y": 1322.37,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 4.41901,
                        "MDH": 4.41901,
                        "Rwell": 6.178406666666667,
                        "TVD": 0.0,
                        "X": 869.266,
                        "Y": 1320.13,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 8.83803,
                        "MDH": 8.83803,
                        "Rwell": 6.178406666666667,
                        "TVD": 0.0,
                        "X": 873.246,
                        "Y": 1318.21,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 13.257,
                        "MDH": 13.257,
                        "Rwell": 6.178406666666667,
                        "TVD": 0.0,
                        "X": 877.38,
                        "Y": 1316.66,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    },
                    {
                        "MD": 17.6761,
                        "MDH": 17.6761,
                        "Rwell": 6.178406666666667,
                        "TVD": 0.0,
                        "X": 881.641,
                        "Y": 1315.49,
                        "cosInclination": 1.0,
                        "sinInclination": 0.0
                    }
                ],
                "radiusFactor": 0.017472142224370685,
                "viewDiameterWell": 12.356813333333333
            }
        }
    ],
    rangessimulationresults: new Map(),
    units: new Map(),
    viewOptions: {
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

it('Init schedule case for IPR', () => {
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

it('Change num schedule for IPR', () => {
    ResolverFactory.initResolver(ResolverFactory.TEST_RESOLVER)
    if (ResolverFactory.getResolver() instanceof TestResolver)
        (ResolverFactory.getResolver() as TestResolver).setWellSchematicData(wellSchematicData)
    act(() => {
        ReactDOM.render(<App />, container)
    })
    act(() => { GlobalObserver.getInstance().observableResolverInit.notify(true) })
    setTimeout(() => { }, 1000)
    act(() => { ResolverFactory.getResolver().onUpdateSchedule({ num: 0.00694444, colorized: SCHEMATIC_RATES }) })
    setTimeout(() => { }, 1000)
    expect(container).toMatchSnapshot()
})

it('Change colorized schedule for IPR', () => {
    ResolverFactory.initResolver(ResolverFactory.TEST_RESOLVER)
    if (ResolverFactory.getResolver() instanceof TestResolver)
        (ResolverFactory.getResolver() as TestResolver).setWellSchematicData(wellSchematicData)
    act(() => {
        ReactDOM.render(<App />, container)
    })
    act(() => { GlobalObserver.getInstance().observableResolverInit.notify(true) })
    setTimeout(() => { }, 1000)
    act(() => { ResolverFactory.getResolver().onUpdateSchedule({ num: 0.00578704, colorized: SCHEMATIC_PRESSURE }) })
    setTimeout(() => { }, 1000)
    expect(container).toMatchSnapshot()
})

it('Schedule hide table', () => {
    ResolverFactory.initResolver(ResolverFactory.TEST_RESOLVER)
    if (ResolverFactory.getResolver() instanceof TestResolver)
        (ResolverFactory.getResolver() as TestResolver).setWellSchematicData(wellSchematicData)
    act(() => {
        ReactDOM.render(<App />, container)
    })
    act(() => { GlobalObserver.getInstance().observableResolverInit.notify(true) })
    setTimeout(() => { }, 1000)
    act(() => { GlobalObserver.getInstance().observableShowTable.notify(false) })
    setTimeout(() => { }, 1000)
    expect(container).toMatchSnapshot()
})

