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
        }, {
            title:"Data Types in JavaScript",
            description: "JavaScript's key built-in data types.",
            questions: [
                {
                    question:"Given the following decleration: var a = 5.65; - what type would a be?",
                    answers: [
                        "A float",
                        "A double",
                        "A Number",
                        "An int"
                    ],
                    correctAnswer: 3
                }, {
                    question:"True or False: Strings can be added together using the '+' operator, just like numbers?",
                    answers: [
                        "True",
                        "False"
                    ],
                    correctAnswer: 1
                }, {
                    question:"How would a String be converted to a Number?",
                    answers: [
                        "\"5\".toNumber",
                        "Number(\"5\")",
                        "+\"5\""
                    ],
                    correctAnswer: 3
                }, {
                    question:"How would the 3rd element of myArray be accessed?",
                    answers: [
                        "myArray[3]",
                        "myArray.get(2)",
                        "myArray[2]",
                        "myArray.get(3)",
                        "myArray.3"
                    ],
                    correctAnswer: 3
                }
            ]
        }, {
            title:"Functions in JavaScript",
            description: "How do functions work in JavaScript?",
            questions: [
                {
                    question:"What keyword defines a function?",
                    answers: [
                        "func",
                        "funky",
                        "function",
                        "public static void"
                    ],
                    correctAnswer: 3
                }, {
                    question:"True or False: JavaScript functions have to declare a return type?",
                    answers: [
                        "True",
                        "False"
                    ],
                    correctAnswer: 2
                }, {
                    question:"How many parameters can a JavaScript function have?",
                    answers: [
                        "None",
                        "1",
                        "2",
                        "Unlimited"
                    ],
                    correctAnswer: 4
                }, {
                    question:"How many objects can a JavaScript function return?",
                    answers: [
                        "Unlimited",
                        "2",
                        "1",
                        "27",
                        "OVER 9000"
                    ],
                    correctAnswer: 3
                }, {
                    question:"Can functions be treated as variables?",
                    answers: [
                        "Yes - as anonymous functions",
                        "Yes - as static functions",
                        "No"
                    ],
                    correctAnswer: 1
                }, {
                    question:"Can JavaScript objects hold functions within them?",
                    answers: [
                        "Yes",
                        "No"
                    ],
                    correctAnswer: 1
                }
            ]
        }, {
            title:"The Console",
            description: "What's the console, and how can it be used when coding JavaScript?",
            questions: [
                {
                    question:"Where is the console located?",
                    answers: [
                        "The Moon",
                        "The Web Inspector",
                        "The Terminal",
                        "/dev/null"
                    ],
                    correctAnswer: 2
                }, {
                    question:"True or False: JavaScript variables can be defined in the console?",
                    answers: [
                        "True",
                        "False"
                    ],
                    correctAnswer: 1
                }, {
                    question:"True or False: JavaScript functions can be defined in the console?",
                    answers: [
                        "True",
                        "False"
                    ],
                    correctAnswer: 1
                }, {
                    question:"JavaScript written in the console gets saved with the web page on exit?",
                    answers: [
                        "True",
                        "False"
                    ],
                    correctAnswer: 2
                }
            ]
        }, {
            title:"JavaScript in HTML",
            description: "How can JavaScript be linked in with HTML?",
            questions: [
                {
                    question:"What tag is used to link JavaScript in HTML?",
                    answers: [
                        "&lt;java&gt;",
                        "&lt;javascript&gt;",
                        "&lt;js&gt;",
                        "&lt;script&gt;"
                    ],
                    correctAnswer: 4
                }, {
                    question:"True or False: JavaScript should be in seperate files that are linked to when used on production websites?",
                    answers: [
                        "True",
                        "False"
                    ],
                    correctAnswer: 1
                }, {
                    question:"Where should JavaScript script tags be located ideally?",
                    answers: [
                        "Within the &lt;head&gt;",
                        "After the &lt;/html&gt;",
                        "At the end of the &lt;body&gt;",
                        "In the console"
                    ],
                    correctAnswer: 3
                }, {
                    question:"Does the order in which JavaScript files are linked matter?",
                    answers: [
                        "Yes",
                        "No"
                    ],
                    correctAnswer: 1
                }
            ]
        }


    ];
}
