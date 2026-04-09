import { GeneratedQuestions, UploadedFile } from './types';

export const mockQuestions: GeneratedQuestions = {
  mcqs: [
    { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi body"], answer: "Mitochondria", difficulty: 'easy' },
    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: "Mars", difficulty: 'easy' },
    { question: "What is the chemical formula of water?", options: ["H2O2", "CO2", "H2O", "NaCl"], answer: "H2O", difficulty: 'easy' },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], answer: "William Shakespeare", difficulty: 'medium' },
    { question: "What is the speed of light in vacuum?", options: ["3×10⁶ m/s", "3×10⁸ m/s", "3×10¹⁰ m/s", "3×10⁴ m/s"], answer: "3×10⁸ m/s", difficulty: 'medium' },
    { question: "Which gas do plants absorb during photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide", difficulty: 'easy' },
    { question: "What is the SI unit of force?", options: ["Joule", "Newton", "Pascal", "Watt"], answer: "Newton", difficulty: 'medium' },
    { question: "Which organelle is responsible for protein synthesis?", options: ["Mitochondria", "Ribosome", "Lysosome", "Nucleus"], answer: "Ribosome", difficulty: 'hard' },
    { question: "What is the value of pi (π) up to 2 decimal places?", options: ["3.14", "3.16", "3.12", "3.18"], answer: "3.14", difficulty: 'easy' },
    { question: "Which is the largest organ in the human body?", options: ["Liver", "Brain", "Skin", "Heart"], answer: "Skin", difficulty: 'medium' },
  ],
  fillInBlanks: [
    { question: "The process of converting light energy to chemical energy is called ___.", options: ["Photosynthesis", "Respiration", "Osmosis", "Diffusion", "Transpiration", "Fermentation", "Digestion", "Excretion", "Combustion", "Evaporation"], answer: "Photosynthesis", difficulty: 'easy' },
    { question: "The smallest unit of matter is an ___.", options: ["Atom", "Molecule", "Cell", "Electron", "Proton", "Neutron", "Ion", "Compound", "Element", "Isotope"], answer: "Atom", difficulty: 'easy' },
    { question: "DNA stands for ___ acid.", options: ["Deoxyribonucleic", "Ribonucleic", "Deoxyribo", "Amino", "Nucleic", "Phosphoric", "Citric", "Sulfuric", "Hydrochloric", "Carbonic"], answer: "Deoxyribonucleic", difficulty: 'medium' },
    { question: "The Earth revolves around the ___.", options: ["Sun", "Moon", "Mars", "Jupiter", "Venus", "Saturn", "Mercury", "Neptune", "Pluto", "Uranus"], answer: "Sun", difficulty: 'easy' },
    { question: "The boiling point of water is ___ °C.", options: ["100", "50", "200", "0", "75", "150", "25", "212", "90", "110"], answer: "100", difficulty: 'easy' },
    { question: "Newton's ___ law states that every action has an equal and opposite reaction.", options: ["Third", "First", "Second", "Fourth", "Fifth", "Zeroth", "Sixth", "Seventh", "Eighth", "Ninth"], answer: "Third", difficulty: 'medium' },
    { question: "The chemical symbol for gold is ___.", options: ["Au", "Ag", "Fe", "Cu", "Zn", "Pb", "Sn", "Hg", "Pt", "Al"], answer: "Au", difficulty: 'medium' },
  ],
  oneWordAnswers: [
    { question: "What is the hardest natural substance on Earth?", answer: "Diamond", difficulty: 'easy' },
    { question: "What type of blood cells fight infection?", answer: "White", difficulty: 'medium' },
    { question: "What is the chemical symbol for sodium?", answer: "Na", difficulty: 'easy' },
    { question: "What planet has the most moons?", answer: "Saturn", difficulty: 'hard' },
    { question: "What gas makes up about 78% of Earth's atmosphere?", answer: "Nitrogen", difficulty: 'medium' },
  ],
  trueFalse: [
    { question: "The sun is a star.", answer: true, difficulty: 'easy' },
    { question: "Sound travels faster than light.", answer: false, difficulty: 'easy' },
    { question: "Human body has 206 bones.", answer: true, difficulty: 'medium' },
    { question: "Venus is the closest planet to the Sun.", answer: false, difficulty: 'medium' },
    { question: "DNA is a double helix structure.", answer: true, difficulty: 'hard' },
  ],
  matchFollowing: [
    {
      pairs: [
        { left: "Mitochondria", right: "Powerhouse of cell" },
        { left: "Chloroplast", right: "Photosynthesis" },
        { left: "Ribosome", right: "Protein synthesis" },
        { left: "Nucleus", right: "Control center" },
        { left: "Lysosome", right: "Digestion" },
        { left: "Golgi body", right: "Packaging" },
        { left: "Cell membrane", right: "Protection" },
      ],
      difficulty: 'medium',
    },
  ],
  assertionReason: [
    {
      assertion: "Plants appear green in color.",
      reason: "Chlorophyll absorbs green light from the spectrum.",
      answer: 'assertion_correct_reason_wrong',
      difficulty: 'hard',
    },
    {
      assertion: "Metals are good conductors of electricity.",
      reason: "Metals have free electrons that can move easily.",
      answer: 'both_correct_reason_explains',
      difficulty: 'medium',
    },
    {
      assertion: "The moon produces its own light.",
      reason: "The moon reflects sunlight.",
      answer: 'assertion_correct_reason_wrong',
      difficulty: 'easy',
    },
    {
      assertion: "Water boils at 100°C at sea level.",
      reason: "The boiling point of water increases with altitude.",
      answer: 'assertion_correct_reason_wrong',
      difficulty: 'hard',
    },
  ],
};

export const mockFiles: UploadedFile[] = [
  {
    id: '1',
    name: 'Biology_Chapter5.pdf',
    type: 'application/pdf',
    size: 2400000,
    status: 'completed',
    progress: 100,
    created_at: '2026-03-24T10:30:00Z',
    questions: mockQuestions,
  },
  {
    id: '2',
    name: 'Physics_Notes.jpg',
    type: 'image/jpeg',
    size: 1200000,
    status: 'completed',
    progress: 100,
    created_at: '2026-03-23T14:15:00Z',
    questions: mockQuestions,
  },
  {
    id: '3',
    name: 'Chemistry_Formula.png',
    type: 'image/png',
    size: 800000,
    status: 'processing',
    progress: 65,
    created_at: '2026-03-25T09:00:00Z',
  },
];
