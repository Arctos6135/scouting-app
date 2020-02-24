import console = require("console");

function returnDataMap() {
	const dataMap = {
		"Match Form": {
			"id": 0,
			"form": [
				{
					"title": "Sandstorm",
					"rows": [
						{
							"title": "Start Level",
							"type": "picker",
							"options": [
								"Didn't cross baseline",
								"Level 1",
								"Level 2"
							],
							"id": "ssl"
						},
						[
							{
								"title": "Hatch 1",
								"type": "picker",
								"options": [
									"None",
									"Rocket Level 1",
									"Rocket Level 2",
									"Rocket Level 3",
									"Cargo Ship"
								],
								"id": "sh1"
							},
							{
								"title": "Cargo 1",
								"type": "picker",
								"options": [
									"None",
									"Rocket Level 1",
									"Rocket Level 2",
									"Rocket Level 3",
									"Cargo Ship"
								],
								"id": "sc1"
							}
						],
						[
							{
								"title": "Hatch 2",
								"type": "picker",
								"options": [
									"None",
									"Rocket Level 1",
									"Rocket Level 2",
									"Rocket Level 3",
									"Cargo Ship"
								],
								"id": "sh2"
							},
							{
								"title": "Cargo 2",
								"type": "picker",
								"options": [
									"None",
									"Rocket Level 1",
									"Rocket Level 2",
									"Rocket Level 3",
									"Cargo Ship"
								],
								"id": "sc2"
							}
						],
						[
							{
								"title": "Hatch 3",
								"type": "picker",
								"options": [
									"None",
									"Rocket Level 1",
									"Rocket Level 2",
									"Rocket Level 3",
									"Cargo Ship"
								],
								"id": "sh3"
							},
							{
								"title": "Cargo 3",
								"type": "picker",
								"options": [
									"None",
									"Rocket Level 1",
									"Rocket Level 2",
									"Rocket Level 3",
									"Cargo Ship"
								],
								"id": "sc3"
							}
						],
						[
							{
								"title": "Hatch 4",
								"type": "picker",
								"options": [
									"None",
									"Rocket Level 1",
									"Rocket Level 2",
									"Rocket Level 3",
									"Cargo Ship"
								],
								"id": "sh4"
							},
							{
								"title": "Cargo 4",
								"type": "picker",
								"options": [
									"None",
									"Rocket Level 1",
									"Rocket Level 2",
									"Rocket Level 3",
									"Cargo Ship"
								],
								"id": "sc4"
							}
						]
					]
				},
				{
					"title": "Tele-op",
					"rows": [
						{
							"title": "Rocket 1",
							"type": "text"
						},
						{
							"title": "Cargo",
							"type": "slider",
							"range": [
								0,
								4
							],
							"increment": 1,
							"id": "tc1"
						},
						{
							"title": "Hatch",
							"type": "slider",
							"range": [
								0,
								4
							],
							"increment": 1,
							"id": "th1"
						},
						{
							"title": "Rocket 2",
							"type": "text"
						},
						{
							"title": "Cargo",
							"type": "slider",
							"range": [
								0,
								4
							],
							"increment": 1,
							"id": "tc2"
						},
						{
							"title": "Hatch",
							"type": "slider",
							"range": [
								0,
								4
							],
							"increment": 1,
							"id": "th2"
						},
						{
							"title": "Rocket 3",
							"type": "text"
						},
						{
							"title": "Cargo",
							"type": "slider",
							"range": [
								0,
								4
							],
							"increment": 1,
							"id": "tc3"
						},
						{
							"title": "Hatch",
							"type": "slider",
							"range": [
								0,
								4
							],
							"increment": 1,
							"id": "th3"
						},
						{
							"title": "Cargo Ship",
							"type": "text"
						},
						{
							"title": "Cargo",
							"type": "slider",
							"range": [
								0,
								8
							],
							"increment": 1,
							"id": "tcc"
						},
						{
							"title": "Hatch",
							"type": "slider",
							"range": [
								0,
								8
							],
							"increment": 1,
							"id": "thc"
						}
					]
				},
				{
					"title": "Climbing",
					"rows": [
						[
							{
								"title": "Level Reached",
								"type": "picker",
								"options": [
									"No climb",
									"Level 1",
									"Level 2",
									"Level 3"
								],
								"id": "cl"
							},
							{
								"title": "Assist",
								"type": "picker",
								"options": [
									"No assist",
									"Level 2",
									"Level 3"
								],
								"id": "ca"
							}
						]
					]
				},
				{
					"title": "Attributes",
					"rows": [
						[
							{
								"title": "Did the robot break?",
								"type": "toggle",
								"options": [
									"No",
									"Yes"
								],
								"id": "ab"
							},
							{
								"title": "Did the robot tip?",
								"type": "toggle",
								"options": [
									"No",
									"Yes"
								],
								"id": "at"
							},
						],	
						{
							"title": "Can it pick up hatches from the floor?",
							"type": "toggle",
							"options": [
								"No",
								"Yes"
							],
							"id": "af"
						},
						{
							"title": "Time spent on opponents side of field",
							"type": "timer",
							"id": "as"
						},
						{
							"title": "Number of hatches dropped",
							"type": "number",
							"increments": [
								-1,
								1
							],
							"id": "ah"
						}
					]
				}
			]
		},
		"Other Data": {
			"id": 1,
			"form": [
				{
					"title": "Person",
					"rows": [
						[
							{
								"title": "Height",
								"type": "slider",
								"range": [
									0,
									250
								],
								"id": "h"
							},
							{
								"title": "Weight",
								"type": "slider",
								"range": [
									0,
									100
								],
								"id": "w"
							}
						]
					]
				}
			]
		},
		"2020 form": {
			"id": 2,
			"form": [
				{
					"title": "Auto",
					"rows": [
						{
							"title": "Preloaded balls",
							"type": "slider",
							"range": [
								0,
								3
							],
							"increment": 1,
							"id": "apb" // auto preloaded balls
						},
						{
							"title": "Moved off of line?",
							"type": "toggle",
							"options": [
								"No",
								"Yes"
							],
							"id": "aml" // auto moved line
						},


						{
							"title": "Balls attempted from:",
							"type": "text"
						},

						{
							"title": "Close side of trench",
							"type": "text",
						},
						[
							{
								"title": "Low",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "aactl" // auto attempted close trench low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "aacth" // auto attempted close trench high
							},
						],

						{
							"title": "Far side of trench",
							"type": "text",
						},
						[
							{
								"title": "Low",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "aaftl" // auto attempted far trench low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "aafth" // auto attempted far trench high
							},
						],

						{
							"title": "Rendezvous",
							"type": "text",
						},
						[
							{
								"title": "Low",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "aarl" // auto attempted rendezvous low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "aarh" // auto attempted rendezvous high
							},
						],

						{
							"title": "Cross court",
							"type": "text",
						},
						[
							{
								"title": "Low",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "aaccl" // auto attempted cross court low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "aacch" // auto attempted cross court high
							},
						],


						{
							"title": "",
							"type": "text"
						},


						{
							"title": "Balls scored from:",
							"type": "text"
						},

						{
							"title": "Close side of trench",
							"type": "text",
						},
						[
							{
								"title": "Low",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "asctl" // auto scored close trench low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "ascth" // auto scored close trench high
							},
						],

						{
							"title": "Far side of trench",
							"type": "text",
						},
						[
							{
								"title": "Low",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "asftl" // auto scored far trench low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "asfth" // auto scored far trench high
							},
						],

						{
							"title": "Rendezvous",
							"type": "text",
						},
						[
							{
								"title": "Low",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "asrl" // auto scored rendezvous low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "asrh" // auto scored rendezvous high
							},
						],

						{
							"title": "Cross court",
							"type": "text",
						},
						[
							{
								"title": "Low",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "asccl" // auto scored cross court low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "ascch" // auto scored cross court high
							},
						],


						{
							"title": "",
							"type": "text"
						},


						{
							"title": "Refuel from:",
							"type": "text"
						},
						{
							"title": "Close side of trench",
							"type": "toggle",
							"options": [
								"No",
								"Yes"
							],
							"id": "arct" // auto refuel close trench 
						},
						{
							"title": "Far side of trench",
							"type": "toggle",
							"options": [
								"No",
								"Yes"
							],
							"id": "arft" // auto refuel far trench 
						},
						{
							"title": "Rendezvous",
							"type": "toggle",
							"options": [
								"No",
								"Yes"
							],
							"id": "arr" // auto refuel rendezvous 
						},
						{
							"title": "Alliance partner",
							"type": "toggle",
							"options": [
								"No",
								"Yes"
							],
							"id": "arp" // auto refuel partner 
						},

						{
							"title": "Did they dispense to alliance partners?",
							"type": "picker",
							"options": [
								"No",
								"Attempted",
								"Successful"
							],
							"id": "adp" // auto dispense partner
						},
					]
				},
				{
					"title": "Teleop",
					"rows": [
						{
							"title": "Balls attempted from:",
							"type": "text"
						},

						{
							"title": "Close side of trench",
							"type": "text",
						},
						[
							{
								"title": "Low",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tactl" // teleop attempted close trench low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tacth" // teleop attempted close trench high
							},
						],

						{
							"title": "Far side of trench",
							"type": "text",
						},
						[
							{
								"title": "Low",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "taftl" // teleop attempted far trench low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tafth" // teleop attempted far trench high
							},
						],

						{
							"title": "Rendezvous",
							"type": "text",
						},
						[
							{
								"title": "Low",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tarl" // teleop attempted rendezvous low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tarh" // teleop attempted rendezvous high
							},
						],

						{
							"title": "Cross court",
							"type": "text",
						},
						[
							{
								"title": "Low",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "taccl" // teleop attempted cross court low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tacch" // teleop attempted cross court high
							},
						],


						{
							"title": "",
							"type": "text"
						},


						{
							"title": "Balls scored from:",
							"type": "text"
						},

						{
							"title": "Close side of trench",
							"type": "text",
						},
						[
							{
								"title": "Low",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tsctl" // teleop scored close trench low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tscth" // teleop scored close trench high
							},
						],

						{
							"title": "Far side of trench",
							"type": "text",
						},
						[
							{
								"title": "Low",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tsftl" // teleop scored far trench low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tsfth" // teleop scored far trench high
							},
						],

						{
							"title": "Rendezvous",
							"type": "text",
						},
						[
							{
								"title": "Low",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tsrl" // teleop scored rendezvous low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tsrh" // teleop scored rendezvous high
							},
						],

						{
							"title": "Cross court",
							"type": "text",
						},
						[
							{
								"title": "Low",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tsccl" // teleop scored cross court low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tscch" // teleop scored cross court high
							},
						],

						{
							"title": "Refuel from:",
							"type": "text"
						},
						{
							"title": "Ground",
							"type": "toggle",
							"options": [
								"No",
								"Yes"
							],
							"id": "trg" // teleop refuel ground 
						},
						{
							"title": "Higher level loading bay",
							"type": "toggle",
							"options": [
								"No",
								"Yes"
							],
							"id": "trh" // teleop refuel high 
						},

						{
							"title": "Did they dispense to alliance partners?",
							"type": "picker",
							"options": [
								"No",
								"Attempted",
								"Successful"
							],
							"id": "tdp" // teleop dispense partner
						},
					]
				},
				{
					"title": "Control Panel",
					"rows": [
						{
							"title": "Spin?",
							"type": "toggle",
							"options": [
								"No",
								"Yes"
							],
							"id": "tps" // teleop panel spin
						},
						{
							"title": "Position?",
							"type": "toggle",
							"options": [
								"No",
								"Yes"
							],
							"id": "tpp" // teleop panel position
						}
					]
				},
				{
					"title": "Endgame",
					"rows": [
						[
							{
								"title": "Level",
								"type": "picker",
								"options": [
									"None",
									"Park",
									"Hang"
								],
								"id": "el" // endgame level
							},
							{
								"title": "Assist",
								"type": "picker",
								"options": [
									"None",
									"Was assisted",
									"Assisted another"
								],
								"id": "ea" // endgame assist
							}
						],
						{
							"title": "Time from rendezvous to hook",
							"type": "timer",
							"id": "th" // time hook
						},
						{
							"title": "Time from hook to fully lifted",
							"type": "timer",
							"id": "tl" // time lift
						},
						{
							"title": "Leveling",
							"type": "toggle",
							"options": [
								"No",
								"Yes"
							],
							"id": "lt" // leveling techniques
						}
					]
				},
				{
					"title": "Attributes",
					"rows": [
						{
							"title": "Can they outtake balls to pass?",
							"type": "toggle",
							"options": [
								"No",
								"Yes"
							],
							"id": "ao" // atrribute outtake
						},
						{
							"title": "Can they drive under the trench?",
							"type": "toggle",
							"options": [
								"No",
								"Yes"
							],
							"id": "ad" // atrribute drive
						},
						{
							"title": "Did they break?",
							"type": "toggle",
							"options": [
								"No",
								"Yes"
							],
							"id": "ab" // attribute break
						},
						{
							"title": "Did they tip?",
							"type": "toggle",
							"options": [
								"No",
								"Yes"
							],
							"id": "at" // attribute tip
						}
					]
				}
			]
		}
	}
	
	return dataMap;
}

if (require.main === module) {
	console.log(returnDataMap());
}

export default returnDataMap;