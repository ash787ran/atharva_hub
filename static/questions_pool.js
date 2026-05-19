// static/questions_pool.js
/**
 * Atharva Game Engine V12 - Core Knowledge Repository Dataset
 * Scaled explicitly for age-appropriate cognitive tracking.
 */

const ARCADE_QUESTION_DATABASE = {
    phonics: [
        { id: "p1", query: "Which word rhymes with the flying 'CAT'?", choices: ["BAT", "DOG", "SUN", "PIG"], target: "BAT", reward: 10 },
        { id: "p2", query: "Find the missing starting sound logic: '____-P-P-L-E'", choices: ["A", "B", "M", "T"], target: "A", reward: 10 },
        { id: "p3", query: "Identify the high-frequency sight word block: 'T-H-____-Y'", choices: ["E", "A", "O", "I"], target: "E", reward: 10 },
        { id: "p4", query: "Atharva is holding a glowing, magical ____ book!", choices: ["storybook", "math", "cooking", "music"], target: "storybook", reward: 15 },
        { id: "p5", query: "There are friendly green ____ floating inside space labs!", choices: ["aliens", "bicycles", "kittens", "trains"], target: "aliens", reward: 15 },
        { id: "p6", query: "Atharva is wearing a cool, sharp blue ____ cap!", choices: ["cap", "shoe", "sock", "belt"], target: "cap", reward: 10 },
        { id: "p7", query: "Which layout word rhymes with 'SOCCER BALL'?", choices: ["WALL", "RED", "RUN", "JUMP"], target: "WALL", reward: 10 },
        { id: "p8", query: "Complete the sentence action node: 'Atharva loves to ____ soccer!'", choices: ["play", "eat", "sleep", "fly"], target: "play", reward: 15 },
        { id: "p9", query: "Isolate the opposite word element: The sun is hot, but snow is ____.", choices: ["cold", "warm", "blue", "fast"], target: "cold", reward: 10 },
        { id: "p10", query: "Find the building blocks: 'B-L-U-____' is the color of his hat.", choices: ["E", "O", "A", "I"], target: "E", reward: 10 },
        { id: "p11", query: "Which word starts with the blending sound 'CH-'?", choices: ["CHAIR", "BOOK", "FISH", "STAR"], target: "CHAIR", reward: 15 },
        { id: "p12", query: "Complete the sight sequence puzzle: 'W-H-____-R-E'", choices: ["E", "O", "A", "U"], target: "E", reward: 15 },
        { id: "p13", query: "Which layout object sounds like it ends with '-ING'?", choices: ["RING", "BALL", "BOOK", "HAT"], target: "RING", reward: 10 },
        { id: "p14", query: "Find the matching action vowel block: 'R-____-N' (to sprint fast)", choices: ["U", "O", "E", "I"], target: "U", reward: 10 }
    ],
    telemetry: [
        { id: "g1", query: "Which tall, long-necked mammal appears on the digital hologram layout?", choices: ["Giraffe", "Elephant", "Zebra", "Cheetah"], target: "Giraffe", reward: 10 },
        { id: "g2", query: "What blue planet are we investigating out of the observatory deck windows?", choices: ["Earth", "Mars", "Jupiter", "Mercury"], target: "Earth", reward: 10 },
        { id: "g3", query: "Which giant animal has floppy ears and a huge water trunk tail pipeline?", choices: ["Elephant", "Rhino", "Hippo", "Giraffe"], target: "Elephant", reward: 10 },
        { id: "g4", query: "What hot, giant fire star sits at the dead center of our home solar system?", choices: ["The Sun", "The Moon", "Mars", "Pluto"], target: "The Sun", reward: 15 },
        { id: "g5", query: "How many legs does a fast running robotic soccer spider bug have?", choices: ["8 legs", "4 legs", "2 legs", "10 legs"], target: "8 legs", reward: 15 },
        { id: "g6", query: "What color do you get when you mix RED and YELLOW paints together?", choices: ["Orange", "Green", "Purple", "Blue"], target: "Orange", reward: 15 },
        { id: "g7", query: "Which cool seasonal pattern brings snowy flakes down to Toronto fields?", choices: ["Winter", "Summer", "Spring", "Autumn"], target: "Winter", reward: 10 },
        { id: "g8", query: "What primary tool does a science explorer use to view microscopic cells?", choices: ["Microscope", "Telescope", "Hammer", "Compass"], target: "Microscope", reward: 20 },
        { id: "g9", query: "Which flying animal can spread its colorful wings and fly out of trees?", choices: ["Bird", "Fish", "Rabbit", "Frog"], target: "Bird", reward: 15 },
        { id: "g10", query: "How many tracking months are arranged inside one full orbital calendar year?", choices: ["12 months", "6 months", "10 months", "24 months"], target: "12 months", reward: 10 },
        { id: "g11", query: "What glowing body shines bright in the night sky over our houses?", choices: ["The Moon", "The Ocean", "A Tree", "A Cloud"], target: "The Moon", reward: 10 },
        { id: "g12", query: "Which ocean dweller has sharp teeth and swims incredibly fast through coral loops?", choices: ["Shark", "Goldfish", "Turtle", "Crab"], target: "Shark", reward: 15 },
        { id: "g13", query: "How many wheels keep a standard space ranger bicycle balanced?", choices: ["2 wheels", "4 wheels", "3 wheels", "1 wheel"], target: "2 wheels", reward: 10 },
        { id: "g14", query: "What type of living organism grows deep green roots down inside the soil?", choices: ["Plant", "Rock", "Cloud", "Robot"], target: "Plant", reward: 10 }
    ]
};

// Freeze object to lock database reference points against memory leak vectors
Object.freeze(ARCADE_QUESTION_DATABASE);