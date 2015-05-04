// quizdata.js stores quiz data in a JavaScript array of objects (which contain the actual
// quiz data itsself).
// I've used this seperate data file approach to provide a decent level of abstraction
// within my JavaScript and split up my data model from my actually code that controls the quiz view.
// Created by Dylan McKee on 16/04/2015.

var QuizData = new function() {
    this.data = [
        {
            title:"Introduction",
            description: "History, facts and syntax.",
            questions: [
                {
                    question:"In which year was JavaScript first invented?",
                    answers: [
                        "1995",
                        "1989",
                        "2002",
                        "1742"
                    ],
                    correctAnswer: 1
                }, {
                    question:"Who standardises the JavaScript language?",
                    answers: [
                        "Netscape",
                        "Google",
                        "ECMA",
                        "Microsoft"
                    ],
                    correctAnswer: 3
                }, {
                    question:"Is \"22\" === 22 true or false?",
                    answers: [
                        "True",
                        "False"
                    ],
                    correctAnswer: 2
                }, {
                    question:"Which langauges inspired JavaScript's syntax?",
                    answers: [
                        "HTML & XML",
                        "Python & Ruby",
                        "Java, C & C++",
                        "Erlang & Haskell",
                        "CoffeeScript"
                    ],
                    correctAnswer: 3
                }, {
                    question:"Which langauges can be ran in the browser?",
                    answers: [
                        "Only Python",
                        "Only JavaScript",
                        "C & C++",
                        "Only PHP"
                    ],
                    correctAnswer: 2
                }
            ]
        }

    ];
}
