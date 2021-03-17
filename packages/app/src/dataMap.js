export const dataNames = {
	startLevel: ["startlvl"],
	cargo: ["cargo1", "cargo2", "cargo3", "cargo4"],
	hatch: ["hatch1", "hatch2", "hatch3", "hatch4"],
	rocketCargo: ["rock1c", "rock2c", "rock3c"],
	rocketHatch: ["rock1h", "rock2h", "rock3h"],
	shipCargo: ['shipc'],
	shipHatch: ['shiph'],
	climbing: {
		levelReached: "climblvlReached",
		assist: "assist"
	},
	attributes: {
		broken: "broken",
		tip: "tip",
		cargoFromDepot: "depot",
		hatchesFromFloor: "floor"
	},
	gameInfo: {
		opposingSideTime: "opposide",
		penaltyPoints: "ppoints",
		hatchesDropped: "hdropped"
	},
	matchInfo: {
		matchNumber: "matchNumber",
		teamNumber: "teamNumber"
	}
}

export const climbOptions = [
	"No climb",
	"Level 1",
	"Level 2",
	"Level 3"
]
export const defaultClimbOption = 0;

export const assistOptions = [
	"No assist",
	"Level 2",
	"Level 3"
]

export const startLevelOptions = [
	"Didn't cross baseline",
	"Level 1",
	"Level 2"
]
export const defaultAssistOption = 0;

export const gamePieceOptions = [
	"None",
	"Rocket level 1",
	"Rocket level 2",
	"Rocket level 3",
	"Cargo Ship"
]
export const defaultGamePieceOption = 0;

function swap(json) {
	let ret = {};
	for (let key in json) {
		ret[json[key]] = key;
	}
	return ret;
}
export const dataTypes = {
	"startLevel": swap(startLevelOptions),
	"cargo": swap(gamePieceOptions),
	"hatch": swap(gamePieceOptions),
	"rocketCargo": [0, 1, 2, 3, 4],
	"rocketHatch": [0, 1, 2, 3, 4],
	"shipCargo": [0, 1, 2, 3, 4, 5, 6, 7, 8],
	"shipHatch": [0, 1, 2, 3, 4, 5, 6, 7, 8],
	"climbing": { ...swap(climbOptions), "No assist": 0 },
	"attributes": [0, 1],
	"gameInfo": "number",
	"matchInfo": "number"
}


export const dmap = {
	name: "Match Form",
	form: [
		{
			title: "Sandstorm",
			rows: [
				{
					title: "Start Level",
					type: "picker",
					options: ["Didn't cross baseline", "Level 1", "Level 2"],
					id: 'ssl'
				},
				[
					{
						title: "Hatch 1",
						type: "picker",
						options: ["None", "Rocket Level 1", "Rocket Level 2", "Rocket Level 3", "Cargo Ship"],
						id: 'sh1'
					},
					{
						title: "Cargo 1",
						type: "picker",
						options: ["None", "Rocket Level 1", "Rocket Level 2", "Rocket Level 3", "Cargo Ship"],
						id: 'sc1'
					}
				],
				[
					{
						title: "Hatch 2",
						type: "picker",
						options: ["None", "Rocket Level 1", "Rocket Level 2", "Rocket Level 3", "Cargo Ship"],
						id: 'sh2'
					},
					{
						title: "Cargo 2",
						type: "picker",
						options: ["None", "Rocket Level 1", "Rocket Level 2", "Rocket Level 3", "Cargo Ship"],
						id: 'sc2'
					}
				],
				[
					{
						title: "Hatch 3",
						type: "picker",
						options: ["None", "Rocket Level 1", "Rocket Level 2", "Rocket Level 3", "Cargo Ship"],
						id: 'sh3'
					},
					{
						title: "Cargo 3",
						type: "picker",
						options: ["None", "Rocket Level 1", "Rocket Level 2", "Rocket Level 3", "Cargo Ship"],
						id: 'sc3'
					}
				],
				[
					{
						title: "Hatch 4",
						type: "picker",
						options: ["None", "Rocket Level 1", "Rocket Level 2", "Rocket Level 3", "Cargo Ship"],
						id: 'sh4'
					},
					{
						title: "Cargo 4",
						type: "picker",
						options: ["None", "Rocket Level 1", "Rocket Level 2", "Rocket Level 3", "Cargo Ship"],
						id: 'sc4'
					}
				]
			]
		},
		{
			title: "Tele-op",
			rows: [
				{
					title: "Rocket 1",
					type: "text"
				},
				{
					title: "Cargo",
					type: "slider",
					range: [0, 4],
					increment: 1,
					id: 'tc1'
				},
				{
					title: "Hatch",
					type: "slider",
					range: [0, 4],
					increment: 1,
					id: 'th1'
				},

				{
					title: "Rocket 2",
					type: "text"
				},
				{
					title: "Cargo",
					type: "slider",
					range: [0, 4],
					increment: 1,
					id: 'tc2'
				},
				{
					title: "Hatch",
					type: "slider",
					range: [0, 4],
					increment: 1,
					id: 'th2'
				},

				{
					title: "Rocket 3",
					type: "text"
				},
				{
					title: "Cargo",
					type: "slider",
					range: [0, 4],
					increment: 1,
					id: 'tc3'
				},
				{
					title: "Hatch",
					type: "slider",
					range: [0, 4],
					increment: 1,
					id: 'th3'
				},

				{
					title: "Cargo Ship",
					type: "text"
				},
				{
					title: "Cargo",
					type: "slider",
					range: [0, 8],
					increment: 1,
					id: 'tcc'
				},
				{
					title: "Hatch",
					type: "slider",
					range: [0, 8],
					increment: 1,
					id: 'thc'
				},
			]
		},
		{
			title: "Climbing",
			rows: [
				[
					{
						title: "Level Reached",
						type: "picker",
						options: ["No climb", "Level 1", "Level 2", "Level 3"],
						id: 'cl'
					},
					{
						title: "Assist",
						type: "picker",
						options: ["No assist", "Level 2", "Level 3"],
						id: 'ca'
					}
				]
			]
		},
		{
			title: "Attributes",
			rows: [
				{
					title: "Did the robot break?",
					type: "toggle",
					options: ["No", "Yes"],
					id: 'ab'
				},
				{
					title: "Did the robot tip?",
					type: "toggle",
					options: ["No", "Yes"],
					id: 'at'
				},
				{
					title: "Can it pick up hatches from the floor?",
					type: "toggle",
					options: ["No", "Yes"],
					id: 'af'
				},
				{
					title: "Time spent on opponents side of field",
					type: "timer",
					id: 'as'
				},
				{
					title: "Number of hatches dropped",
					type: "number",
					increments: [-1, 1],
					id: 'ah'
				},
			]
		}
	]
}

export const dmaps = { [dmap.id]: dmap };