// quizdata.js stores quiz data in a JavaScript array of objects (which contain the actual
// quiz data itsself), in a JavaScript variable.
// I've used this seperate data file approach to provide a decent level of abstraction
// within my JavaScript and split up my data model from my actually code that controls the quiz view.
// Created by Dylan McKee on 16/04/2015.

var quizData = [
    {
        title:"Quiz1",
        description: "This is a rly good quiz srlsy. 10/10 would take.",
        questions: [
            {
                question:"Question 1",
                answers: [
                    "Answer 1",
                    "Answer 2",
                    "Answer 3",
                    "Answer 4"
                ],
                correctAnswer: 1
            }
        ]
    }

];
