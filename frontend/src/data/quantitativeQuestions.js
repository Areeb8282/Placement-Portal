// Quantitative Aptitude Questions (60 questions)
export const quantitativeQuestions = [
  // Percentage Questions (1-10)
  {
    id: 1,
    question: "If 20% of a number is 50, what is 40% of that number?",
    options: ["80", "100", "120", "150"],
    correctAnswer: 1,
    explanation: "If 20% = 50, then 100% = 250. So 40% = 100"
  },
  {
    id: 2,
    question: "What is 15% of 240?",
    options: ["30", "36", "40", "45"],
    correctAnswer: 1,
    explanation: "15% of 240 = (15/100) × 240 = 36"
  },
  {
    id: 3,
    question: "A number increased by 25% becomes 75. What is the original number?",
    options: ["50", "55", "60", "65"],
    correctAnswer: 2,
    explanation: "Let x be the number. x + 0.25x = 75, so 1.25x = 75, x = 60"
  },
  {
    id: 4,
    question: "If the price of a product increases from 80 to 100, what is the percentage increase?",
    options: ["20%", "25%", "30%", "35%"],
    correctAnswer: 1,
    explanation: "Increase = 20, Percentage = (20/80) × 100 = 25%"
  },
  {
    id: 5,
    question: "40% of 60 + 60% of 40 = ?",
    options: ["24", "36", "48", "52"],
    correctAnswer: 2,
    explanation: "24 + 24 = 48"
  },
  {
    id: 6,
    question: "A shopkeeper marks his goods 40% above cost price and gives a discount of 20%. What is his profit percentage?",
    options: ["8%", "10%", "12%", "15%"],
    correctAnswer: 2,
    explanation: "Let CP = 100. MP = 140. SP = 140×0.8 = 112. Profit = 12%"
  },
  {
    id: 7,
    question: "If 30% of a number is 90, what is 70% of that number?",
    options: ["180", "210", "240", "270"],
    correctAnswer: 1,
    explanation: "If 30% = 90, then 100% = 300. So 70% = 210"
  },
  {
    id: 8,
    question: "A number is decreased by 10% and then increased by 10%. What is the net change?",
    options: ["No change", "1% decrease", "1% increase", "2% decrease"],
    correctAnswer: 1,
    explanation: "Let x = 100. After decrease: 90. After increase: 99. Net = 1% decrease"
  },
  {
    id: 9,
    question: "What percent of 50 is 12.5?",
    options: ["20%", "25%", "30%", "35%"],
    correctAnswer: 1,
    explanation: "(12.5/50) × 100 = 25%"
  },
  {
    id: 10,
    question: "If 25% of a number is 75, what is the number?",
    options: ["250", "275", "300", "325"],
    correctAnswer: 2,
    explanation: "25% = 75, so 100% = 75 × 4 = 300"
  },

  // Ratio and Proportion (11-20)
  {
    id: 11,
    question: "If the ratio of boys to girls in a class is 3:2 and there are 15 boys, how many girls are there?",
    options: ["8", "10", "12", "15"],
    correctAnswer: 1,
    explanation: "3:2 = 15:x, so x = (15×2)/3 = 10"
  },
  {
    id: 12,
    question: "Divide 120 in the ratio 2:3:5",
    options: ["24, 36, 60", "20, 40, 60", "30, 40, 50", "25, 35, 60"],
    correctAnswer: 0,
    explanation: "Total parts = 10. Each part = 12. So 24, 36, 60"
  },
  {
    id: 13,
    question: "If A:B = 2:3 and B:C = 4:5, what is A:C?",
    options: ["8:15", "2:5", "3:5", "4:15"],
    correctAnswer: 0,
    explanation: "A:B:C = 8:12:15, so A:C = 8:15"
  },
  {
    id: 14,
    question: "Two numbers are in the ratio 5:7. If their sum is 144, what is the larger number?",
    options: ["60", "72", "84", "96"],
    correctAnswer: 2,
    explanation: "Total parts = 12. Each part = 12. Larger = 7×12 = 84"
  },
  {
    id: 15,
    question: "If 3:x = 9:15, what is x?",
    options: ["3", "5", "7", "9"],
    correctAnswer: 1,
    explanation: "3×15 = 9×x, so x = 5"
  },
  {
    id: 16,
    question: "The ratio of ages of A and B is 4:5. After 6 years, the ratio will be 5:6. What is A's current age?",
    options: ["20", "24", "28", "30"],
    correctAnswer: 1,
    explanation: "Let ages be 4x and 5x. (4x+6)/(5x+6) = 5/6. Solving: x = 6, A = 24"
  },
  {
    id: 17,
    question: "If A:B = 3:4 and B:C = 2:3, find A:B:C",
    options: ["3:4:6", "6:8:12", "3:2:3", "6:4:3"],
    correctAnswer: 0,
    explanation: "A:B = 3:4, B:C = 2:3. Making B same: A:B:C = 3:4:6"
  },
  {
    id: 18,
    question: "Two numbers are in ratio 2:3. If 5 is added to each, the ratio becomes 3:4. Find the numbers.",
    options: ["10, 15", "12, 18", "14, 21", "16, 24"],
    correctAnswer: 0,
    explanation: "(2x+5)/(3x+5) = 3/4. Solving: x = 5. Numbers are 10, 15"
  },
  {
    id: 19,
    question: "If x:y = 2:3 and y:z = 4:5, what is x:z?",
    options: ["8:15", "2:5", "6:15", "4:15"],
    correctAnswer: 0,
    explanation: "x:y:z = 8:12:15, so x:z = 8:15"
  },
  {
    id: 20,
    question: "Divide 500 in the ratio 1:2:2",
    options: ["100, 200, 200", "150, 150, 200", "100, 150, 250", "125, 175, 200"],
    correctAnswer: 0,
    explanation: "Total parts = 5. Each part = 100. So 100, 200, 200"
  },

  // Speed, Time, Distance (21-30)
  {
    id: 21,
    question: "A train travels 120 km in 2 hours. What is its speed in m/s?",
    options: ["16.67 m/s", "33.33 m/s", "60 m/s", "120 m/s"],
    correctAnswer: 0,
    explanation: "Speed = 120/2 = 60 km/h = 60×1000/3600 = 16.67 m/s"
  },
  {
    id: 22,
    question: "A car travels at 60 km/h for 3 hours. What distance does it cover?",
    options: ["120 km", "150 km", "180 km", "200 km"],
    correctAnswer: 2,
    explanation: "Distance = Speed × Time = 60 × 3 = 180 km"
  },
  {
    id: 23,
    question: "If a person walks 4 km in 1 hour, how long will it take to walk 10 km?",
    options: ["2 hours", "2.5 hours", "3 hours", "3.5 hours"],
    correctAnswer: 1,
    explanation: "Time = Distance/Speed = 10/4 = 2.5 hours"
  },
  {
    id: 24,
    question: "Two trains of length 100m and 150m are running at 40 km/h and 50 km/h. In how much time will they cross each other (opposite direction)?",
    options: ["8 seconds", "10 seconds", "12 seconds", "15 seconds"],
    correctAnswer: 1,
    explanation: "Relative speed = 90 km/h = 25 m/s. Total length = 250m. Time = 250/25 = 10s"
  },
  {
    id: 25,
    question: "A man covers a distance of 20 km in 2.5 hours partly on foot at 4 km/h and partly on bicycle at 10 km/h. Find the distance covered on foot.",
    options: ["5 km", "8 km", "10 km", "12 km"],
    correctAnswer: 2,
    explanation: "Let distance on foot = x. x/4 + (20-x)/10 = 2.5. Solving: x = 10 km"
  },
  {
    id: 26,
    question: "A train 150m long passes a pole in 15 seconds. What is its speed in km/h?",
    options: ["30 km/h", "36 km/h", "40 km/h", "45 km/h"],
    correctAnswer: 1,
    explanation: "Speed = 150/15 = 10 m/s = 10×3.6 = 36 km/h"
  },
  {
    id: 27,
    question: "A person travels from A to B at 40 km/h and returns at 60 km/h. What is the average speed?",
    options: ["48 km/h", "50 km/h", "52 km/h", "55 km/h"],
    correctAnswer: 0,
    explanation: "Average speed = 2×40×60/(40+60) = 48 km/h"
  },
  {
    id: 28,
    question: "If a car increases its speed from 40 km/h to 60 km/h, by what percentage does the time taken decrease?",
    options: ["25%", "33.33%", "40%", "50%"],
    correctAnswer: 1,
    explanation: "Time ratio = 60:40 = 3:2. Decrease = 1/3 = 33.33%"
  },
  {
    id: 29,
    question: "A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less. Find the speed.",
    options: ["30 km/h", "40 km/h", "45 km/h", "50 km/h"],
    correctAnswer: 1,
    explanation: "Let speed = x. 360/x - 360/(x+5) = 1. Solving: x = 40 km/h"
  },
  {
    id: 30,
    question: "Two cities are 300 km apart. Two trains start simultaneously from these cities towards each other at 40 km/h and 50 km/h. When will they meet?",
    options: ["2.5 hours", "3 hours", "3.33 hours", "4 hours"],
    correctAnswer: 2,
    explanation: "Relative speed = 90 km/h. Time = 300/90 = 3.33 hours"
  },

  // Average (31-40)
  {
    id: 31,
    question: "The average of 5 numbers is 20. If one number is excluded, the average becomes 15. What is the excluded number?",
    options: ["25", "30", "35", "40"],
    correctAnswer: 3,
    explanation: "Sum of 5 numbers = 100. Sum of 4 numbers = 60. Excluded = 40"
  },
  {
    id: 32,
    question: "The average of 10 numbers is 40. If 5 is added to each number, what is the new average?",
    options: ["40", "42", "45", "50"],
    correctAnswer: 2,
    explanation: "New average = 40 + 5 = 45"
  },
  {
    id: 33,
    question: "The average age of 30 students is 15 years. If the teacher's age is included, the average becomes 16 years. What is the teacher's age?",
    options: ["40 years", "42 years", "45 years", "46 years"],
    correctAnswer: 3,
    explanation: "Total age of students = 450. Total with teacher = 496. Teacher = 46"
  },
  {
    id: 34,
    question: "The average of 6 numbers is 30. If one number is changed from 24 to 36, what is the new average?",
    options: ["30", "32", "34", "36"],
    correctAnswer: 1,
    explanation: "Increase = 12. New average = 30 + 12/6 = 32"
  },
  {
    id: 35,
    question: "The average of first 10 natural numbers is:",
    options: ["5", "5.5", "6", "6.5"],
    correctAnswer: 1,
    explanation: "Average = (1+2+...+10)/10 = 55/10 = 5.5"
  },
  {
    id: 36,
    question: "The average of 5 consecutive odd numbers is 27. What is the largest number?",
    options: ["29", "31", "33", "35"],
    correctAnswer: 1,
    explanation: "Middle number = 27. Numbers are 23, 25, 27, 29, 31"
  },
  {
    id: 37,
    question: "The average weight of 8 persons increases by 2.5 kg when a new person replaces one of them weighing 65 kg. What is the weight of the new person?",
    options: ["75 kg", "80 kg", "85 kg", "90 kg"],
    correctAnswer: 2,
    explanation: "Total increase = 8×2.5 = 20 kg. New person = 65+20 = 85 kg"
  },
  {
    id: 38,
    question: "The average of 20 numbers is 15. If 3 is added to every number, what is the new average?",
    options: ["15", "17", "18", "20"],
    correctAnswer: 2,
    explanation: "New average = 15 + 3 = 18"
  },
  {
    id: 39,
    question: "The average of first 50 natural numbers is:",
    options: ["24.5", "25", "25.5", "26"],
    correctAnswer: 2,
    explanation: "Average = (1+2+...+50)/50 = 1275/50 = 25.5"
  },
  {
    id: 40,
    question: "The average of 4 numbers is 20. If one number is excluded, the average becomes 18. What is the excluded number?",
    options: ["24", "26", "28", "30"],
    correctAnswer: 1,
    explanation: "Sum of 4 = 80. Sum of 3 = 54. Excluded = 26"
  },

  // Profit and Loss (41-50)
  {
    id: 41,
    question: "A shopkeeper buys an article for 100 and sells it for 120. What is the profit percentage?",
    options: ["15%", "18%", "20%", "25%"],
    correctAnswer: 2,
    explanation: "Profit = 20. Profit% = (20/100)×100 = 20%"
  },
  {
    id: 42,
    question: "If the cost price is 80% of the selling price, what is the profit percentage?",
    options: ["20%", "25%", "30%", "35%"],
    correctAnswer: 1,
    explanation: "Let SP = 100. CP = 80. Profit = 20. Profit% = (20/80)×100 = 25%"
  },
  {
    id: 43,
    question: "An article is sold at a loss of 10%. If it was sold for 90 more, there would have been a gain of 5%. What is the cost price?",
    options: ["500", "600", "700", "800"],
    correctAnswer: 1,
    explanation: "Difference = 15% = 90. So 100% = 600"
  },
  {
    id: 44,
    question: "A man buys 12 pens for 10 and sells 10 pens for 12. What is his profit percentage?",
    options: ["40%", "44%", "48%", "50%"],
    correctAnswer: 1,
    explanation: "CP of 1 pen = 10/12. SP of 1 pen = 12/10. Profit% = 44%"
  },
  {
    id: 45,
    question: "If selling price is doubled, the profit triples. What is the profit percentage?",
    options: ["50%", "66.67%", "75%", "100%"],
    correctAnswer: 3,
    explanation: "Let CP = 100, SP = x. Profit = x-100. 2x-100 = 3(x-100). x = 200. Profit% = 100%"
  },
  {
    id: 46,
    question: "A trader marks his goods 20% above cost price and gives a discount of 10%. What is his profit percentage?",
    options: ["6%", "8%", "10%", "12%"],
    correctAnswer: 1,
    explanation: "Let CP = 100. MP = 120. SP = 108. Profit = 8%"
  },
  {
    id: 47,
    question: "By selling an article for 240, a man loses 20%. At what price should he sell it to gain 20%?",
    options: ["300", "320", "340", "360"],
    correctAnswer: 3,
    explanation: "CP = 240/0.8 = 300. SP for 20% gain = 300×1.2 = 360"
  },
  {
    id: 48,
    question: "A shopkeeper sells two articles at 1000 each. On one he gains 25% and on the other he loses 25%. What is his overall profit or loss?",
    options: ["No profit no loss", "4% loss", "6.25% loss", "8% loss"],
    correctAnswer: 2,
    explanation: "CP1 = 800, CP2 = 1333.33. Total CP = 2133.33. Total SP = 2000. Loss = 6.25%"
  },
  {
    id: 49,
    question: "If the cost price of 10 articles is equal to the selling price of 8 articles, what is the profit percentage?",
    options: ["20%", "25%", "30%", "35%"],
    correctAnswer: 1,
    explanation: "Let CP of 1 = 1. CP of 10 = 10 = SP of 8. SP of 1 = 1.25. Profit = 25%"
  },
  {
    id: 50,
    question: "A man sells an article at 10% profit. If he had bought it at 10% less and sold it for 55 more, he would have gained 25%. What is the cost price?",
    options: ["500", "600", "700", "800"],
    correctAnswer: 0,
    explanation: "Let CP = x. 1.1x + 55 = 0.9x × 1.25. Solving: x = 500"
  },

  // Simple Interest & Compound Interest (51-60)
  {
    id: 51,
    question: "What is the simple interest on 1000 at 10% per annum for 2 years?",
    options: ["100", "150", "200", "250"],
    correctAnswer: 2,
    explanation: "SI = (1000×10×2)/100 = 200"
  },
  {
    id: 52,
    question: "At what rate percent per annum will 1000 amount to 1210 in 2 years at simple interest?",
    options: ["8%", "9%", "10%", "10.5%"],
    correctAnswer: 3,
    explanation: "SI = 210. Rate = (210×100)/(1000×2) = 10.5%"
  },
  {
    id: 53,
    question: "The compound interest on 8000 at 15% per annum for 2 years compounded annually is:",
    options: ["2400", "2520", "2580", "2640"],
    correctAnswer: 2,
    explanation: "Amount = 8000(1.15)² = 10580. CI = 2580"
  },
  {
    id: 54,
    question: "A sum of money doubles itself in 10 years at simple interest. What is the rate of interest?",
    options: ["8%", "10%", "12%", "15%"],
    correctAnswer: 1,
    explanation: "If P doubles, SI = P. Rate = (P×100)/(P×10) = 10%"
  },
  {
    id: 55,
    question: "The difference between compound interest and simple interest on a sum for 2 years at 10% per annum is 10. What is the sum?",
    options: ["800", "900", "1000", "1100"],
    correctAnswer: 2,
    explanation: "Difference = P(R/100)² = 10. P(0.1)² = 10. P = 1000"
  },
  {
    id: 56,
    question: "At what rate percent per annum will a sum of money double itself in 5 years at simple interest?",
    options: ["15%", "18%", "20%", "25%"],
    correctAnswer: 2,
    explanation: "If P doubles, SI = P. Rate = (P×100)/(P×5) = 20%"
  },
  {
    id: 57,
    question: "The simple interest on a sum of money is 1/9 of the principal. If the rate and time are equal, what is the rate of interest?",
    options: ["3%", "3.33%", "4%", "5%"],
    correctAnswer: 1,
    explanation: "SI = P/9. Let rate = time = x. P×x×x/100 = P/9. x² = 100/9. x = 3.33%"
  },
  {
    id: 58,
    question: "A sum amounts to 2420 in 2 years and 2662 in 3 years at compound interest. What is the rate of interest?",
    options: ["8%", "9%", "10%", "12%"],
    correctAnswer: 2,
    explanation: "Interest for 1 year = 242. Rate = (242×100)/2420 = 10%"
  },
  {
    id: 59,
    question: "The compound interest on 10000 at 20% per annum for 1.5 years compounded half-yearly is:",
    options: ["3000", "3100", "3310", "3400"],
    correctAnswer: 2,
    explanation: "Amount = 10000(1.1)³ = 13310. CI = 3310"
  },
  {
    id: 60,
    question: "A sum of money at simple interest amounts to 815 in 3 years and to 854 in 4 years. What is the sum?",
    options: ["650", "698", "700", "720"],
    correctAnswer: 1,
    explanation: "SI for 1 year = 39. SI for 3 years = 117. Principal = 815-117 = 698"
  }
];
