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
							"title": "Sector",
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
								"id": "aasl" // auto attempted sector low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "aash" // auto attempted sector high
							},
						],

						{
							"title": "Target zone",
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
								"id": "aatzl" // auto attempted target zone low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "aatzh" // auto attempted target zone high
							},
						],

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
							"title": "Close side of OPPONENT trench",
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
								"id": "aacotl" // auto attempted close opponent trench low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "aacoth" // auto attempted close opponent trench high
							},
						],

						{
							"title": "Far side of OPPONENT trench",
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
								"id": "aafotl" // auto attempted far opponent trench low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "aafoth" // auto attempted far opponent trench high
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
							"title": "Behind the rendezvous",
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
								"id": "aabrl" // auto attempted behind rendezvous low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "aabrh" // auto attempted behind rendezvous high
							},
						],

						{
							"title": "In front of rendezvous",
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
								"id": "aafrl" // auto attempted front rendezvous low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "aafrh" // auto attempted front rendezvous high
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
							"title": "Sector",
							"type": "text",
						},
						{
							"title": "Low",
							"type": "number",
							"increments": [
								-1,
								1
							],
							"id": "assl" // auto scored sector low
						},
						[
							{
								"title": "Outer",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "asso" // auto scored sector outer
							},
							{
								"title": "Inner",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "assi" // auto scored sector inner
							},
						],

						{
							"title": "Target zone",
							"type": "text",
						},
						{
							"title": "Low",
							"type": "number",
							"increments": [
								-1,
								1
							],
							"id": "astzl" // auto scored target zone low
						},
						[
							{
								"title": "Outer",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "astzo" // auto scored target zone outer
							},
							{
								"title": "Inner",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "astzi" // auto scored target zone inner
							},
						],

						{
							"title": "Close side of trench",
							"type": "text",
						},
						{
							"title": "Low",
							"type": "number",
							"increments": [
								-1,
								1
							],
							"id": "asctl" // auto scored close trench low
						},
						[
							{
								"title": "Outer",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "ascto" // auto scored close trench outer
							},
							{
								"title": "Inner",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "ascti" // auto scored close trench inner
							},
						],

						{
							"title": "Far side of trench",
							"type": "text",
						},
						{
							"title": "Low",
							"type": "number",
							"increments": [
								-1,
								1
							],
							"id": "asftl" // auto scored far trench low
						},
						[
							{
								"title": "Outer",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "asfto" // auto scored far trench outer
							},
							{
								"title": "Inner",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "asfti" // auto scored far trench inner
							},
						],

						{
							"title": "Close side of OPPONENT trench",
							"type": "text",
						},
						{
							"title": "Low",
							"type": "number",
							"increments": [
								-1,
								1
							],
							"id": "ascotl" // auto scored close opponent trench low
						},
						[
							{
								"title": "Outer",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "ascoto" // auto scored close opponent trench outer
							},
							{
								"title": "Inner",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "ascoti" // auto scored close opponent trench inner
							},
						],

						{
							"title": "Far side of OPPONENT trench",
							"type": "text",
						},
						{
							"title": "Low",
							"type": "number",
							"increments": [
								-1,
								1
							],
							"id": "asfotl" // auto scored far opponent trench low
						},
						[
							{
								"title": "Outer",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "asfoto" // auto scored far opponent trench outer
							},
							{
								"title": "Inner",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "asfoti" // auto scored far opponent trench inner
							},
						],

						{
							"title": "Rendezvous",
							"type": "text",
						},
						{
							"title": "Low",
							"type": "number",
							"increments": [
								-1,
								1
							],
							"id": "asrl" // auto scored rendezvous low
						},
						[
							{
								"title": "Outer",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "asro" // auto scored rendezvous outer
							},
							{
								"title": "Inner",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "asri" // auto scored rendezvous inner
							},
						],

						{
							"title": "Behind the rendezvous",
							"type": "text",
						},
						{
							"title": "Low",
							"type": "number",
							"increments": [
								-1,
								1
							],
							"id": "asbrl" // auto scored behind rendezvous low
						},
						[
							{
								"title": "Outer",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "asbro" // auto scored behind rendezvous outer
							},
							{
								"title": "Inner",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "asbri" // auto scored behind rendezvous inner
							},
						],

						{
							"title": "In front of the rendezvous",
							"type": "text",
						},
						{
							"title": "Low",
							"type": "number",
							"increments": [
								-1,
								1
							],
							"id": "asfrl" // auto scored front rendezvous low
						},
						[
							{
								"title": "Outer",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "asfro" // auto scored front rendezvous outer
							},
							{
								"title": "Inner",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "asfri" // auto scored front rendezvous inner
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
							"title": "Close side of OPPONENT trench",
							"type": "toggle",
							"options": [
								"No",
								"Yes"
							],
							"id": "arcot" // auto refuel close opposing trench
						},
						{
							"title": "Far side of OPPONENT trench",
							"type": "toggle",
							"options": [
								"No",
								"Yes"
							],
							"id": "arfot" // auto refuel far opposing trench
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
				/* TELEOP STARTS HERE */
				{
					"title": "Teleop",
					"rows": [
						{
							"title": "Balls ATTEMPTED from:",
							"type": "text"
						},

						{
							"title": "Sector",
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
								"id": "tasl" // teleop attempted sector low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tash" // teleop attempted sector high
							},
						],

						{
							"title": "Target zone",
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
								"id": "tatzl" // teleop attempted target zone low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tatzh" // teleop attempted target zone high
							},
						],

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
							"title": "Close side of OPPONENT trench",
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
								"id": "tacotl" // teleop attempted close opponent trench low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tacoth" // teleop attempted close opponent trench high
							},
						],

						{
							"title": "Far side of OPPONENT trench",
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
								"id": "tafotl" // teleop attempted far opponent trench low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tafoth" // teleop attempted far opponent trench high
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
							"title": "Behind the rendezvous",
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
								"id": "tabrl" // teleop attempted behind rendezvous low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tabrh" // teleop attempted behind rendezvous high
							},
						],

						{
							"title": "In front of rendezvous",
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
								"id": "tafrl" // teleop attempted front rendezvous low
							},
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tafrh" // teleop attempted front rendezvous high
							},
						],


						{
							"title": "",
							"type": "text"
						},


						{
							"title": "Balls SCORED from:",
							"type": "text"
						},

						{
							"title": "Sector",
							"type": "text",
						},
						{
							"title": "Low",
							"type": "number",
							"increments": [
								-1,
								1
							],
							"id": "tssl" // teleop scored sector low
						},
						[
							{
								"title": "Outer",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tsso" // teleop scored sector outer
							},
							{
								"title": "Inner",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tssi" // teleop scored sector inner
							},
						],

						{
							"title": "Target Zone",
							"type": "text",
						},
						{
							"title": "Low",
							"type": "number",
							"increments": [
								-1,
								1
							],
							"id": "tstzl" // teleop scored target zone low
						},
						[
							{
								"title": "Outer",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tstzo" // teleop scored target zone outer
							},
							{
								"title": "Inner",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tstzi" // teleop scored target zone inner
							},
						],

						{
							"title": "Close side of trench",
							"type": "text",
						},
						{
							"title": "Low",
							"type": "number",
							"increments": [
								-1,
								1
							],
							"id": "tsctl" // teleop scored close trench low
						},
						[
							{
								"title": "Outer",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tscto" // teleop scored close trench outer
							},
							{
								"title": "Inner",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tscti" // teleop scored close trench inner
							},
						],

						{
							"title": "Far side of trench",
							"type": "text",
						},
						{
							"title": "Low",
							"type": "number",
							"increments": [
								-1,
								1
							],
							"id": "tsftl" // teleop scored far trench low
						},
						[
							{
								"title": "Outer",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tsfto" // teleop scored far trench outer
							},
							{
								"title": "Inner",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tsfti" // teleop scored far trench inner
							},
						],

						{
							"title": "Close side of OPPONENT trench",
							"type": "text",
						},
						{
							"title": "Low",
							"type": "number",
							"increments": [
								-1,
								1
							],
							"id": "tscotl" // teleop scored close opponent trench low
						},
						[
							{
								"title": "Outer",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tscoto" // teleop scored close opponent trench outer
							},
							{
								"title": "Inner",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tscoti" // teleop scored close opponent trench inner
							},
						],

						{
							"title": "Far side of OPPONENT trench",
							"type": "text",
						},
						{
							"title": "Low",
							"type": "number",
							"increments": [
								-1,
								1
							],
							"id": "tsfotl" // teleop scored far opponent trench low
						},
						[
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tsfoto" // teleop scored far opponent trench outer
							},
							{
								"title": "Inner",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tsfoti" // teleop scored far opponent trench inner
							},
						],

						{
							"title": "Rendezvous",
							"type": "text",
						},
						{
							"title": "Low",
							"type": "number",
							"increments": [
								-1,
								1
							],
							"id": "tsrl" // teleop scored rendezvous low
						},
						[
							{
								"title": "High",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tsro" // teleop scored rendezvous outer
							},
							{
								"title": "Inner",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tsri" // teleop scored rendezvous inner
							},
						],

						{
							"title": "Behind the rendezvous",
							"type": "text",
						},
						{
							"title": "Low",
							"type": "number",
							"increments": [
								-1,
								1
							],
							"id": "tsbrl" // teleop scored behind rendezvous low
						},
						[
							{
								"title": "Outer",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tsbro" // teleop scored behind rendezvous outer
							},
							{
								"title": "Inner",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tsbri" // teleop scored behind rendezvous inner
							},
						],

						{
							"title": "In front of the rendezvous",
							"type": "text",
						},
						{
							"title": "Low",
							"type": "number",
							"increments": [
								-1,
								1
							],
							"id": "tsfrl" // teleop scored front rendezvous low
						},
						[
							{
								"title": "Outer",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tsfro" // teleop scored front rendezvous outer
							},
							{
								"title": "Inner",
								"type": "number",
								"increments": [
									-1,
									1
								],
								"id": "tsfri" // teleop scored front rendezvous inner
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
							"title": "Rotation?",
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