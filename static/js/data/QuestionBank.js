// static/js/data/QuestionBank.js
/**
 * Atharva Quantum Engine Core v10 - Knowledge Repository Matrix
 * Procedural configuration vectors scaled explicitly for early childhood cognitive tracking.
 */

const ARCADE_QUESTION_DATABASE = {
    phonics: [
        { id: "ph_01", query: "Which word rhymes with the flying 'CAT'?", choices: ["BAT", "DOG", "SUN", "PIG"], target: "BAT", reward: 10 },
        { id: "ph_02", query: "Find the missing starting sound logic: '____-P-P-L-E'", choices: ["A", "B", "M", "T"], target: "A", reward: 10 },
        { id: "ph_03", query: "Identify the high-frequency sight word block: 'T-H-____-Y'", choices: ["E", "A", "O", "I"], target: "E", reward: 10 },
        { id: "ph_04", query: "Atharva is holding a glowing, magical ____ book!", choices: ["storybook", "math", "cooking", "music"], target: "storybook", reward: 15 },
        { id: "ph_05", query: "There are friendly green ____ floating inside space labs!", choices: ["aliens", "bicycles", "kittens", "trains"], target: "aliens", reward: 15 },
        { id: "ph_06", query: "Atharva is wearing a cool, sharp blue ____ cap!", choices: ["cap", "shoe", "sock", "belt"], target: "cap", reward: 10 },
        { id: "ph_07", query: "Which layout word rhymes with 'SOCCER BALL'?", choices: ["WALL", "RED", "RUN", "JUMP"], target: "WALL", reward: 10 },
        { id: "ph_08", query: "Complete the sentence action node: 'Atharva loves to ____ soccer!'", choices: ["play", "eat", "sleep", "fly"], target: "play", reward: 15 },
        { id: "ph_09", query: "Isolate the opposite word element: The sun is hot, but snow is ____.", choices: ["cold", "warm", "blue", "fast"], target: "cold", reward: 10 },
        { id: "ph_10", query: "Find the building blocks: 'B-L-U-____' is the color of his hat.", choices: ["E", "O", "A", "I"], target: "E", reward: 10 },
        { id: "ph_11", query: "Which word starts with the blending sound 'CH-'?", choices: ["CHAIR", "BOOK", "FISH", "STAR"], target: "CHAIR", reward: 15 },
        { id: "ph_12", query: "Complete the sight sequence puzzle: 'W-H-____-R-E'", choices: ["E", "O", "A", "U"], target: "E", reward: 15 },
        { id: "ph_13", query: "Which layout object sounds like it ends with '-ING'?", choices: ["RING", "BALL", "BOOK", "HAT"], target: "RING", reward: 10 },
        { id: "ph_14", query: "Find the matching action vowel block: 'R-____-N' (to sprint fast)", choices: ["U", "O", "E", "I"], target: "U", reward: 10 }
    ],
    telemetry: [
        { id: "gk_01", query: "Which tall, long-necked mammal appears on the digital hologram layout?", choices: ["Giraffe", "Elephant", "Zebra", "Cheetah"], target: "Giraffe", reward: 10 },
        { id: "gk_02", query: "What blue planet are we investigating out of the observatory deck windows?", choices: ["Earth", "Mars", "Jupiter", "Mercury"], target: "Earth", reward: 10 },
        { id: "gk_03", query: "Which giant animal has floppy ears and a huge water trunk tail pipeline?", choices: ["Elephant", "Rhino", "Hippo", "Giraffe"], target: "Elephant", reward: 10 },
        { id: "gk_04", query: "What hot, giant fire star sits at the dead center of our home solar system?", choices: ["The Sun", "The Moon", "Mars", "Pluto"], target: "The Sun", reward: 15 },
        { id: "gk_05", query: "How many legs does a fast running robotic soccer spider bug have?", choices: ["8 legs", "4 legs", "2 legs", "10 legs"], target: "8 legs", reward: 15 },
        { id: "gk_06", query: "What color do you get when you mix RED and YELLOW paints together?", choices: ["Orange", "Green", "Purple", "Blue"], target: "Orange", reward: 15 },
        { id: "gk_07", query: "Which cool seasonal pattern brings snowy flakes down to Toronto fields?", choices: ["Winter", "Summer", "Spring", "Autumn"], target: "Winter", reward: 10 },
        { id: "gk_08", query: "What primary tool does a science explorer use to view microscopic cells?", choices: ["Microscope", "Telescope", "Hammer", "Compass"], target: "Microscope", reward: 20 },
        { id: "gk_09", query: "Which flying animal can spread its colorful wings and fly out of trees?", choices: ["Bird", "Fish", "Rabbit", "Frog"], target: "Bird", reward: 15 },
        { id: "gk_10", query: "How many tracking months are arranged inside one full orbital calendar year?", choices: ["12 months", "6 months", "10 months", "24 months"], target: "12 months", reward: 10 },
        { id: "gk_11", query: "What glowing body shines bright in the night sky over our houses?", choices: ["The Moon", "The Ocean", "A Tree", "A Cloud"], target: "The Moon", reward: 10 },
        { id: "gk_12", query: "Which ocean dweller has sharp teeth and swims incredibly fast through coral loops?", choices: ["Shark", "Goldfish", "Turtle", "Crab"], target: "Shark", reward: 15 },
        { id: "gk_13", query: "How many wheels keep a standard space ranger bicycle balanced?", choices: ["2 wheels", "4 wheels", "3 wheels", "1 wheel"], target: "2 wheels", reward: 10 },
        { id: "gk_14", query: "What type of living organism grows deep green roots down inside the soil?", choices: ["Plant", "Rock", "Cloud", "Robot"], target: "Plant", reward: 10 }
    ],
    achievements: [
        { id: "rank_1", title: "GALAXY KNIGHT", desc: "Unlock entry parameters to the second tier orbital sector.", threshold: 40 },
        { id: "rank_2", title: "SOCCER ALL-STAR", desc: "Unlock high-velocity calculation field operations.", threshold: 90 },
        { id: "rank_3", title: "COSMIC SUPERHERO", desc: "Attain total mastery over the system infrastructure.", threshold: 160 }
    ]
};

// Freeze data context to protect reference blocks against client-side tampering or memory leaks
Object.freeze(ARCADE_QUESTION_DATABASE);