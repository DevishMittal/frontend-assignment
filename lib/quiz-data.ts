export type Question = {
    id: number;
    text: string;
    options: string[];
    correctAnswer: string;
};

export const QUIZ_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What sound does a cat make?",
        options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
        correctAnswer: "Meow-Meow", 
    },
    {
        id: 2,
        text: "What would you probably find in your fridge?",
        options: ["Shoes", "Ice Cream", "Books"],
        correctAnswer: "Ice Cream",
    },
    {
        id: 3,
        text: "What color are bananas?",
        options: ["Blue", "Yellow", "Red"],
        correctAnswer: "Yellow",
    },
    {
        id: 4,
        text: "How many stars are in the sky?",
        options: ["Two", "Infinite", "One Hundred"],
        correctAnswer: "Infinite",
    },
];
