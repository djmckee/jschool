"use strict";
// ^ using strict JavaScript to ensure speed and enforce code quality.
// The main.js file that will be used on the JSchool site.
// Created by Dylan McKee on 15/04/2015.

// 3rd party JavaScript libraries that I've downloaded and am using are stored
// within the js/lib directory.

/* RequireJS is a library that I downloaded from http://requirejs.org/ on the
   16/04/15, and is licensed under the MIT liscence.

   It is being used as a dependency/library management system within this project.

*/
// set up RequireJS, configuring the libraries that I wish to import with it...
require.config({
    baseUrl: 'js/lib',
    paths: {
        // I downloaded the jQuery library from https://jquery.com/ on 16/04/15
        // It is licensed under the jQuery license
        jquery: 'jquery-2.1.3',
        // I downloaded the highlight.js library from https://highlightjs.org/
        // on 16/04/15. It is licensed under a suitably permissive library.
        highlight: 'highlight.pack',
        profileData: '../profile',
        quizData: '../quizdata',
        quiz: '../quiz',
        certificategenerator: '../certificategenerator'
        }
});

// import our requirements - bringing the libraries we specified above into scope - and begin the actual JavaScripting
require(["jquery", "highlight", "profileData", "quizData", "quiz", "certificategenerator"], function() {
    // this code is called once RequireJS has loaded the libraries I require.
    $(document).ready(function() {
        // whilst library loading will *probably* take longer than loading the DOM,
        // I don't wanna assume anything - so be cautious and use document ready
        // (from jQuery) to ensure that the DOM is loaded fully before performing JS.
        console.log('hello world');

        // remove any potential 'no js!' warnings - JS is evidently enabled...
        $('#no-js-warning').remove();

        // If the page contains any code tags, highlight their syntax with highlight.js.
        if ($('code') !== null) {
            // If there's code in the page, highlight it...
            // iterate through the code tags...
            $('code').each(function(i, block) {
                // highlight the code within the tag.
                hljs.highlightBlock(block);
            });
        }

        if ($('#quiz-container').length > 0) {
            // it's a quiz page, initialise the quiz.js
            initialiseQuizPage();
        }

        if ($('#quiz-info-lead').length > 0) {
            // We need to append the brief "you've completed X of Y quizzes" text...
            // load profile data in first...
            loadProfileData();
            // get quiz scores from persisted profile data (see profile.js)...
            var completedResults = getCompletedQuizScores();

            // Count the number of keys in the completed quiz object (indicating the number of completed quizzes)
            // I found the following counting method from http://stackoverflow.com/questions/126100/how-to-efficiently-count-the-number-of-keys-properties-of-an-object-in-javascrip
            var completed = Object.keys(completedResults).length;

            // fill in deafult text in case the user hasn't completed quizzes yet
            var stringToInclude = "It doesn't look like you've completed any quizzes yet - get started by choosing from the selection below!";

            if (completed > 0) {
                // okay the user's actually done something worth writing about.

                // concatenate the string together using String() to typecase Numbers to Strings for simple concatenation purposes
                stringToInclude = "You've completed " + String(completed) + " of the quizzes so far - well done!";

            }

            // add stringToInclude in the right kind of HTML element then append to '#homepage-lead'.
            var element = '<p>' + stringToInclude + '</p>';

            // append it!
            $('#quiz-info-lead').append(element);
        }

        if ($('#quiz-section').length > 0) {
            // it's the quizzes page!
            // currently available quizzes are located in quizData (initialised by quizData.js)
            // iterate through the quizData array, drawing a div for each one in the quiz-section grid.
            for (var i = 0; i < quizData.length; i++) {
                // get the current quiz element
                var quiz = quizData[i];

                // begin computing some HTML for it...
                var quizElement = '<div>';

                // add a title...
                quizElement += ('<h3>' + quiz.title + '</h3>');

                // add a description
                quizElement += ('<p>' + quiz.description + '</p>');

                // the user may have taken the quiz already? If they have, add a cool icon and thing telling them their score...
                var score = profileData.data[quiz.title];

                // if score is null, they haven't taken it - otherwise, they have, and it contains their quiz score
                // (comparison here using != because if they got a score of zero, we're not going to count it as done!)
                if (score != null) {
                    // yay, score is a number, they've taken the quiz.
                    // formulate a HTML element to congratulate them...
                    quizElement += '<p class="quiz-status">';
                    quizElement += '<i class="fa fa-check-circle-o"></i>';
                    quizElement += ' You\'ve already taken this quiz, with a score of ' + String(score);
                    quizElement += ' out of ' + String(quiz.questions.length) + '.';
                    quizElement += '</p>';

                }

                // compute Base 64 Encoding of the quiz name to use in link
                var encodedQuizName = btoa(quiz.title);

                // formulate link to quiz page...
                var quizLinkComponent = 'quiz.html?quizid=' + encodedQuizName;

                // add link element to grid element...
                quizElement += ('<a class="rounded-button" href="' + quizLinkComponent + '"> Take the quiz! </a>');

                // close element...
                quizElement += '</div>';

                // append to the grid...
                $('#quiz-section').append(quizElement);

            }

            // add the 'clear all button' functionality
            $('#quiz-clear-section > a').click(function(){
                // prompt the user?
                var shouldClear = confirm("Are you sure you want to clear all quiz score history forever?");

                // if they want to, go ahead
                if (shouldClear) {
                    clearAllProfileDataForever();

                    // refresh the page so it appears cleared to them too...
                    // (looked this up at http://www.w3schools.com/jsref/met_loc_reload.asp)
                    location.reload();
                }

            });

            // add 'make certificate' button functionality...
            $('#certificate-claim-button').click(function(){
                // check the user's earned a certificate, otherwise fail with alert!
                if (Object.keys(profileData.data).length >= quizData.length) {
                    generateCertificate();
                } else {
                    alert('Sorry - it doesn\'t look like you\'ve earned a certificate yet...');
                }
            });

            // see if the user's completed all quizzes yet?
            if (Object.keys(profileData.data).length >= quizData.length) {
                // they've completed (at least) as many quizzes as are available
                // allow them to print the certificate.
                var congratulationsMessage = '<p>You\'ve completed all quizzes - <a href="#" id="certificate-claim-button">click here</a> to get your certificate';
                $('#quiz-info-lead').append(congratulationsMessage);
            }

        }

    });


});
