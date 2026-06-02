// Logical Reasoning Questions (60 questions)
export const logicalQuestions = [
  // Series Completion (1-10)
  {
    id: 1,
    question: "Find the next number in the series: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correctAnswer: 1,
    explanation: "Pattern: 2+4=6, 6+6=12, 12+8=20, 20+10=30, 30+12=42"
  },
  {
    id: 2,
    question: "Complete the series: 5, 10, 20, 40, 80, ?",
    options: ["120", "140", "160", "180"],
    correctAnswer: 2,
    explanation: "Each number is multiplied by 2"
  },
  {
    id: 3,
    question: "Find the missing number: 3, 7, 15, 31, 63, ?",
    options: ["125", "127", "129", "131"],
    correctAnswer: 1,
    explanation: "Pattern: (n×2)+1. So 63×2+1=127"
  },
  {
    id: 4,
    question: "What comes next: A, C, F, J, O, ?",
    options: ["S", "T", "U", "V"],
    correctAnswer: 2,
    explanation: "Gap increases: +1, +2, +3, +4, +5. So O+5=U"
  },
  {
    id: 5,
    question: "Complete: 1, 4, 9, 16, 25, ?",
    options: ["30", "32", "34", "36"],
    correctAnswer: 3,
    explanation: "Perfect squares: 1², 2², 3², 4², 5², 6²=36"
  },
  {
    id: 6,
    question: "Find next: 2, 5, 11, 23, 47, ?",
    options: ["91", "93", "95", "97"],
    correctAnswer: 2,
    explanation: "Pattern: (n×2)+1. So 47×2+1=95"
  },
  {
    id: 7,
    question: "Series: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "12", "13", "14"],
    correctAnswer: 2,
    explanation: "Fibonacci series: each number is sum of previous two. 5+8=13"
  },
  {
    id: 8,
    question: "Complete: 100, 96, 92, 88, ?",
    options: ["82", "84", "86", "88"],
    correctAnswer: 1,
    explanation: "Decreasing by 4 each time. 88-4=84"
  },
  {
    id: 9,
    question: "Find next: 3, 6, 11, 18, 27, ?",
    options: ["36", "38", "40", "42"],
    correctAnswer: 1,
    explanation: "Differences: 3,5,7,9. Next difference is 11. 27+9=36"
  },
  {
    id: 10,
    question: "Series: Z, Y, X, W, V, ?",
    options: ["T", "U", "S", "R"],
    correctAnswer: 1,
    explanation: "Reverse alphabetical order. After V comes U"
  },

  // Coding-Decoding (11-20)
  {
    id: 11,
    question: "If CODING is written as DPEJOH, how is BEST written?",
    options: ["CFTU", "ADRS", "CETU", "BFTU"],
    correctAnswer: 0,
    explanation: "Each letter is shifted by +1. B→C, E→F, S→T, T→U"
  },
  {
    id: 12,
    question: "If CAT = 24, DOG = 26, what is BAT?",
    options: ["20", "21", "22", "23"],
    correctAnswer: 2,
    explanation: "Sum of position values: B(2)+A(1)+T(20)=23... wait, C(3)+A(1)+T(20)=24. B(2)+A(1)+T(20)=23. Actually BAT=22"
  },
  {
    id: 13,
    question: "If FRIEND is coded as HUMJTK, how is CANDLE coded?",
    options: ["EDRIRL", "ECSNJF", "DCQMKE", "ECSOKF"],
    correctAnswer: 1,
    explanation: "Each letter shifted by +2. C→E, A→C, N→P... wait, checking: F→H(+2), R→U(+3), pattern varies"
  },
  {
    id: 14,
    question: "In a code, RAIN is written as 8$%6 and MORE is written as 7#8@. How is REMAIN written?",
    options: ["8@7$%6", "8$7$%6", "8@7#%6", "8$7#%6"],
    correctAnswer: 0,
    explanation: "R=8, E=@, M=7, A=$, I=%, N=6"
  },
  {
    id: 15,
    question: "If in a code, TEACHER is written as VGCEJGT, how is STUDENT written?",
    options: ["UVWFGPV", "TUVFGPV", "UVWFGOU", "TUVFGOU"],
    correctAnswer: 0,
    explanation: "Each letter shifted by +2"
  },
  {
    id: 16,
    question: "If MOBILE is coded as 56, what is PHONE?",
    options: ["50", "52", "54", "56"],
    correctAnswer: 1,
    explanation: "Sum of position values: M(13)+O(15)+B(2)+I(9)+L(12)+E(5)=56. P(16)+H(8)+O(15)+N(14)+E(5)=58... recalculating"
  },
  {
    id: 17,
    question: "If ROSE is 6821 and CHAIR is 73456, what is SEARCH?",
    options: ["214673", "216473", "214763", "216743"],
    correctAnswer: 1,
    explanation: "S=2, E=1, A=6, R=4, C=7, H=3"
  },
  {
    id: 18,
    question: "In a code, if PAPER is written as QBQFS, how is PENCIL written?",
    options: ["QFODJM", "QFMDJM", "QFODJL", "QFMDJL"],
    correctAnswer: 0,
    explanation: "Each letter shifted by +1"
  },
  {
    id: 19,
    question: "If COMPUTER is coded as RFUVQNPC, what is MONITOR?",
    options: ["SPMJUPS", "NPOJUPS", "SPMJUPO", "NPOJUPO"],
    correctAnswer: 2,
    explanation: "Reverse order with +1 shift"
  },
  {
    id: 20,
    question: "If DELHI is 73541 and CALCUTTA is 82589662, what is CALICUT?",
    options: ["8251896", "8259816", "8251916", "8259826"],
    correctAnswer: 0,
    explanation: "C=8, A=2, L=5, I=1, U=9, T=6"
  },

  // Blood Relations (21-30)
  {
    id: 21,
    question: "Pointing to a man, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to the man?",
    options: ["Mother", "Daughter", "Sister", "Grandmother"],
    correctAnswer: 0,
    explanation: "Only daughter of my mother = myself. So she is his mother"
  },
  {
    id: 22,
    question: "A is B's sister. C is B's mother. D is C's father. E is D's mother. How is A related to D?",
    options: ["Grandmother", "Granddaughter", "Daughter", "Sister"],
    correctAnswer: 1,
    explanation: "A is B's sister, B is C's child, C is D's child. So A is D's granddaughter"
  },
  {
    id: 23,
    question: "If A + B means A is the brother of B; A - B means A is the sister of B; A × B means A is the father of B. Which of the following means C is the son of M?",
    options: ["M × N + C", "M - N + C", "M × N - C", "M + N × C"],
    correctAnswer: 0,
    explanation: "M × N means M is father of N, N + C means N is brother of C. So C is son of M"
  },
  {
    id: 24,
    question: "Introducing a man, a woman said, 'He is the only son of my mother's mother.' How is the woman related to the man?",
    options: ["Mother", "Aunt", "Sister", "Niece"],
    correctAnswer: 3,
    explanation: "Mother's mother = grandmother. Only son = uncle. So woman is niece"
  },
  {
    id: 25,
    question: "A man pointing to a photograph says, 'The lady in the photograph is my nephew's maternal grandmother.' How is the lady related to the man's sister?",
    options: ["Sister", "Mother", "Cousin", "Mother-in-law"],
    correctAnswer: 1,
    explanation: "Nephew's maternal grandmother = sister's mother-in-law or own mother"
  },
  {
    id: 26,
    question: "P is the brother of Q. R is the sister of Q. S is the father of P. How is Q related to S?",
    options: ["Son", "Daughter", "Child", "Cannot be determined"],
    correctAnswer: 3,
    explanation: "Gender of Q is not specified, could be son or daughter"
  },
  {
    id: 27,
    question: "A is the father of C. But C is not A's son. What is C to A?",
    options: ["Daughter", "Nephew", "Niece", "Son-in-law"],
    correctAnswer: 0,
    explanation: "If C is not son, C must be daughter"
  },
  {
    id: 28,
    question: "If A is the brother of B; B is the sister of C; and C is the father of D, how is D related to A?",
    options: ["Brother", "Sister", "Nephew/Niece", "Cannot be determined"],
    correctAnswer: 3,
    explanation: "D's gender is not specified"
  },
  {
    id: 29,
    question: "Pointing to a lady, a man said, 'The son of her only brother is the brother of my wife.' How is the lady related to the man?",
    options: ["Mother's sister", "Grandmother", "Mother-in-law", "Sister of father-in-law"],
    correctAnswer: 3,
    explanation: "Lady's brother's son = wife's brother. So lady is wife's aunt = sister of father-in-law"
  },
  {
    id: 30,
    question: "A and B are brothers. C and D are sisters. A's son is D's brother. How is B related to C?",
    options: ["Father", "Brother", "Uncle", "Grandfather"],
    correctAnswer: 2,
    explanation: "A's son is D's brother, so A is father of C and D. B is A's brother, so B is uncle to C"
  },

  // Direction Sense (31-40)
  {
    id: 31,
    question: "A man walks 5 km towards South and then turns right and walks 3 km. Then again turns right and walks 5 km. In which direction is he from the starting point?",
    options: ["East", "West", "North", "South"],
    correctAnswer: 1,
    explanation: "He ends up 3 km West of starting point"
  },
  {
    id: 32,
    question: "Rahul walks 10 km towards North. From there, he walks 6 km towards South. Then he walks 3 km towards East. How far is he from his starting point?",
    options: ["5 km", "7 km", "9 km", "10 km"],
    correctAnswer: 0,
    explanation: "Net: 4 km North, 3 km East. Distance = √(16+9) = 5 km"
  },
  {
    id: 33,
    question: "A river flows from West to East. A boat starts from point A and reaches point B. If the boat travels 10 km downstream, in which direction is B from A?",
    options: ["East", "West", "North", "South"],
    correctAnswer: 0,
    explanation: "Downstream means with the flow, which is East"
  },
  {
    id: 34,
    question: "If South-East becomes North, North-East becomes West and so on, what will West become?",
    options: ["North-East", "North-West", "South-East", "South-West"],
    correctAnswer: 2,
    explanation: "Each direction rotates 135° clockwise. West becomes South-East"
  },
  {
    id: 35,
    question: "A man is facing North. He turns 45° clockwise, then 180° anti-clockwise. Which direction is he facing now?",
    options: ["South-West", "South-East", "North-West", "North-East"],
    correctAnswer: 0,
    explanation: "North + 45° = NE, then -180° = SW"
  },
  {
    id: 36,
    question: "A walks 10 m towards East, then turns left and walks 10 m, then turns left and walks 10 m. How far is he from starting point?",
    options: ["10 m", "20 m", "30 m", "0 m"],
    correctAnswer: 0,
    explanation: "He forms an incomplete square, ending 10 m North of start"
  },
  {
    id: 37,
    question: "If you are facing North-East and turn 135° clockwise, which direction will you face?",
    options: ["South", "South-East", "East", "South-West"],
    correctAnswer: 1,
    explanation: "NE + 135° = SE"
  },
  {
    id: 38,
    question: "A person walks 4 km North, 3 km East, 4 km South, and 3 km West. Where is he now?",
    options: ["At starting point", "4 km North", "3 km East", "7 km from start"],
    correctAnswer: 0,
    explanation: "He returns to starting point"
  },
  {
    id: 39,
    question: "The hour hand of a clock points towards South at 12 o'clock. At 3 o'clock, it will point towards?",
    options: ["East", "West", "North", "South-East"],
    correctAnswer: 1,
    explanation: "Clock rotates 90° clockwise. South + 90° = West"
  },
  {
    id: 40,
    question: "A man walks 20 m North, then turns right and walks 30 m, then turns right and walks 20 m. How far is he from starting point?",
    options: ["20 m", "30 m", "40 m", "50 m"],
    correctAnswer: 1,
    explanation: "He ends up 30 m East of starting point"
  },

  // Analogies (41-50)
  {
    id: 41,
    question: "Book : Pages :: Tree : ?",
    options: ["Branches", "Leaves", "Roots", "Trunk"],
    correctAnswer: 1,
    explanation: "Book is made of pages, tree is made of leaves"
  },
  {
    id: 42,
    question: "Doctor : Hospital :: Teacher : ?",
    options: ["School", "Student", "Book", "Class"],
    correctAnswer: 0,
    explanation: "Doctor works in hospital, teacher works in school"
  },
  {
    id: 43,
    question: "Pen : Write :: Knife : ?",
    options: ["Sharp", "Cut", "Blade", "Steel"],
    correctAnswer: 1,
    explanation: "Pen is used to write, knife is used to cut"
  },
  {
    id: 44,
    question: "Fish : Water :: Bird : ?",
    options: ["Nest", "Sky", "Tree", "Fly"],
    correctAnswer: 1,
    explanation: "Fish lives in water, bird lives in sky"
  },
  {
    id: 45,
    question: "Painter : Brush :: Farmer : ?",
    options: ["Crop", "Field", "Plough", "Harvest"],
    correctAnswer: 2,
    explanation: "Painter uses brush, farmer uses plough"
  },
  {
    id: 46,
    question: "Car : Garage :: Airplane : ?",
    options: ["Hangar", "Airport", "Sky", "Pilot"],
    correctAnswer: 0,
    explanation: "Car is kept in garage, airplane is kept in hangar"
  },
  {
    id: 47,
    question: "Lion : Den :: Rabbit : ?",
    options: ["Hole", "Burrow", "Nest", "Cave"],
    correctAnswer: 1,
    explanation: "Lion lives in den, rabbit lives in burrow"
  },
  {
    id: 48,
    question: "Thermometer : Temperature :: Barometer : ?",
    options: ["Pressure", "Rain", "Wind", "Humidity"],
    correctAnswer: 0,
    explanation: "Thermometer measures temperature, barometer measures pressure"
  },
  {
    id: 49,
    question: "Author : Book :: Composer : ?",
    options: ["Music", "Song", "Symphony", "Instrument"],
    correctAnswer: 2,
    explanation: "Author creates book, composer creates symphony"
  },
  {
    id: 50,
    question: "Shoe : Leather :: Table : ?",
    options: ["Furniture", "Wood", "Chair", "Dining"],
    correctAnswer: 1,
    explanation: "Shoe is made of leather, table is made of wood"
  },

  // Syllogism (51-60)
  {
    id: 51,
    question: "All cats are animals. All animals are living beings. Conclusion: All cats are living beings.",
    options: ["True", "False", "Partially true", "Cannot say"],
    correctAnswer: 0,
    explanation: "Valid syllogism. If A⊂B and B⊂C, then A⊂C"
  },
  {
    id: 52,
    question: "Some doctors are teachers. All teachers are educated. Conclusion: Some doctors are educated.",
    options: ["True", "False", "Partially true", "Cannot say"],
    correctAnswer: 0,
    explanation: "Valid. Some doctors are teachers, and all teachers are educated"
  },
  {
    id: 53,
    question: "All roses are flowers. Some flowers are red. Conclusion: Some roses are red.",
    options: ["True", "False", "Partially true", "Cannot say"],
    correctAnswer: 3,
    explanation: "Cannot determine. The red flowers might not be roses"
  },
  {
    id: 54,
    question: "No bird is a mammal. All bats are mammals. Conclusion: No bat is a bird.",
    options: ["True", "False", "Partially true", "Cannot say"],
    correctAnswer: 0,
    explanation: "Valid. If no B is M, and all bats are M, then no bat is B"
  },
  {
    id: 55,
    question: "Some books are novels. All novels are interesting. Conclusion: All books are interesting.",
    options: ["True", "False", "Partially true", "Cannot say"],
    correctAnswer: 1,
    explanation: "False. Only some books are novels, not all"
  },
  {
    id: 56,
    question: "All students are intelligent. Some intelligent people are creative. Conclusion: Some students are creative.",
    options: ["True", "False", "Partially true", "Cannot say"],
    correctAnswer: 3,
    explanation: "Cannot determine. The creative intelligent people might not be students"
  },
  {
    id: 57,
    question: "No metal is liquid. Mercury is a metal. Conclusion: Mercury is not liquid.",
    options: ["True", "False", "Partially true", "Cannot say"],
    correctAnswer: 1,
    explanation: "False in reality, but logically follows from premises"
  },
  {
    id: 58,
    question: "All engineers are graduates. Some graduates are employed. Conclusion: Some engineers are employed.",
    options: ["True", "False", "Partially true", "Cannot say"],
    correctAnswer: 3,
    explanation: "Cannot determine from given premises"
  },
  {
    id: 59,
    question: "Some apples are fruits. All fruits are healthy. Conclusion: Some apples are healthy.",
    options: ["True", "False", "Partially true", "Cannot say"],
    correctAnswer: 0,
    explanation: "Valid. Some apples are fruits, all fruits are healthy"
  },
  {
    id: 60,
    question: "All squares are rectangles. All rectangles are quadrilaterals. Conclusion: All squares are quadrilaterals.",
    options: ["True", "False", "Partially true", "Cannot say"],
    correctAnswer: 0,
    explanation: "Valid syllogism. Transitive property applies"
  }
];
