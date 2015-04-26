// quiz.js runs the quiz view page - using data from quizdata.js (and saving
// data into profile.js upon completion).
// Created by Dylan McKee on 16/04/2015.

// a placeholder variable to hold our quiz questions array
var quizQuestions = [];

// the current question index in teh array. Start at -1 to indicate no array loaded. This will be zero-indexed.
var currentQuestionIndex = -1;

// a variable to hold the currently selected answer. This will be 1 indexed.
var currentAnswerSelection = 0;

// an array to hold current answer selections
var currentSelections = [];

// a placeholder for the current question title.
var currentQuizTitle = '';

// to be called in the document ready method of the main.js, once we've
// established that the current page is indeed a quiz page.
function initialiseQuizPage() {


    // okay, work out what quiz we want... Base 64 decode the URL's quizid component...
    // get URL string piece
    var getQueryComponents = window.location.search.split("?")[1];
    var quizIdEncoded = getQueryComponents.split("quizid=")[1];

    // looked up Base 64 Decode at https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/atob
    var decodedName = null;

    try {
        // this needs to be a in a try/catch block because invalid quiz names throw
        // an ugly InvalidCharacterError which needs catching...
        decodedName = window.atob(quizIdEncoded);
    } catch (error) {
        // keep decodedName as null - we'll be able to pick up the error later.
        decodedName = null;
    }

    // set title placeholder
    currentQuizTitle = decodedName;

    // iterate through the quizzes until we find a name that matches the current one...
    for (var i = 0; i < quizData.length; i++) {
        var q = quizData[i];
        var iTitle = q.title;
        // is it the right one?
        if (iTitle == decodedName) {
            // it's our quiz!
            // set questions and break.
            quizQuestions = q.questions;
            break;
        }
    }


    //okay, if quizQuestions is null by this point, something's gone *horribly* wrong.
    if (quizQuestions.length < 1 || quizQuestions === null) {
        // something's gone horribly wrong - let's direct users to the quizzes page...
        // remove the progress and answer sections...
        $('#progress-update').remove();
        $('#answer-container').remove();

        // title needs to be 'Quiz Not Found'...
        currentQuizTitle = 'Quiz Not Found';

        // fill in some warning text... (hijacking the nice question-number CSS style)
        // and make it fade in using our CSS animation class...
        var warningElement = '<p class="fade-in" id="question-number">We\'re terribly sorry but the quiz in question couldn\'t be found - please select from the choices <a href="quizzes.html">here</a>.</p>';

        // append the warning to the quiz container...
        $('.lead').append(warningElement);
    }


    // set title up... (both window title and title in HTML)
    window.document.title = (currentQuizTitle + ' | Jschools Quiz');

    $('#quiz-title').text(currentQuizTitle);

    // set the progress bar's maximum value to the number of questions in the quiz
    $('#progress-update > progress').attr('max', quizQuestions.length);

    // check there's some questions before we actually try to display them...
    if (quizQuestions.length > 0) {
        // okay, there's actually questions - go ahead...
        // call the nextQuestionClicked method to set-up the first question... (cutting down on code duplication)
        nextQuestionClicked();
    }

}

//called when an answer's been selected - with the button that was clicked on to select the answer being passed into it
function answerClicked(clickedButton) {
    console.log('answerClicked');
    console.log(clickedButton);

    // get the 'data-quiz-answer-id' attribute from clickedButton
    var dataObjects = clickedButton.dataset;

    // get the id number from the set
    var buttonId = dataObjects.quizAnswerId;

    // cast buttonId to a Number.
    var selected = +buttonId;

    // make current selection what's been selected...
    currentAnswerSelection = selected;

    // go to the next question...
    nextQuestionClicked();
}

// check an answer's been selected
function nextQuestionClicked() {
    // if this is NOT the first run (which just sets up the quiz),
    // then save the current selection into the array of selected answers...
    if (currentQuestionIndex > -1) {
        // it's not the first run - it's a genuine 'next question' request,
        // save the currently selected answer to array
        currentSelections.push(currentAnswerSelection);
    }

    // if the current question is the final question, call the finish method and return.
    if (currentQuestionIndex == (quizQuestions.length - 1)) {
        finishQuiz();
        return;
    }

    // remove previous answer buttons
    $('.answer-button').remove();

    // increment the current question index...
    currentQuestionIndex++;

    // get the current question/answer object...
    var currentQuestion = quizQuestions[currentQuestionIndex];

    // fill in the question number
    var currentQuestionNumber = (currentQuestionIndex + 1);
    $('#question-number').text(('Question ' + currentQuestionNumber));

    // set question number at the bottom in the progress section too
    $('#progress-update > span').text(String(currentQuestionNumber) + '/' + String((quizQuestions.length)));

    // and update the progress bar's value too
    $('#progress-update > progress').val(currentQuestionNumber);

    // and update the progress bar's status

    // get the question text.
    var questionText = currentQuestion.question;

    // set question label.
    $('#question-text').text(questionText);

    // get the mulitple choice answers.
    var answersArray = currentQuestion.answers;

    // iterate through the array, making the answer buttons...
    for (var i = 0; i < answersArray.length; i++) {
        // get answer text...
        var answerTitle = answersArray[i];

        // make the html element...
        var answerElement = '<a class="answer-button" href="#" data-quiz-answer-id="' + String((i + 1)) + '">';
        answerElement += answerTitle;
        answerTitle += '</a>';

        // append it to the answers container
        $('#answer-container').append(answerElement);

        // don't need to add an event listener- it's done in the quiz initialisation method thanks to jQuery.

    }

    // attach an 'answer clicked' listener to answer buttons, passing the button through to the function so that
    // its state can be set properly
    $('.answer-button').click(function(){
        // call the answer button clicked method, passing through the button so that it can be maninpulated
        // and have data read from it.
        answerClicked(this);
    });

}

// if it's the final question, clear up!
function finishQuiz() {
    // remove answer buttons - fade them out in a nice stylish CSS manner...
    $('#answer-container').addClass('fade-out', null);

    // fade out question text
    $('#question-container').addClass('fade-out', null);

    // fade out progress section
    $('#progress-update').addClass('fade-out', null);

    // calculate scores...
    var correctAnswers = 0;

    for (var i = 0; i < currentSelections.length; i++) {
        // see if the answer (cast to a number) equals the desired answer from the question at the current index (again cast to a number)
        var usersChoice = +(currentSelections[i]);
        var question = quizQuestions[i];
        console.log(question);
        var correctChoice = question.correctAnswer;

        // was the user correct?!
        if (usersChoice == correctChoice) {
            // they got it right, increment correctAnswers count
            correctAnswers++;
        }

    }

    // concatenate a 'well done' congratulations string
    var totalQuestions = String(quizQuestions.length);

    var completionString = 'Well done! You scored ' + String(correctAnswers) + ' out of ' + String(totalQuestions) + '.';

    // save score to profile!
    addQuizScoreToProfileData(currentQuizTitle, correctAnswers);

    // compute social sharing links to attach to the buttons...
    // get the current URL so that we can share the link and make things viral
    var currentUrl = window.location.href;

    // concatenate twitter link (as per their docs: https://dev.twitter.com/web/tweet-button)
    var twitterLink = 'https://twitter.com/home?status=I just scored ' + String(correctAnswers) + '/' + String(totalQuestions) + ' on ' + currentQuizTitle + '...%20' + currentUrl;

    // concatenate facebook link too (as per API docs: https://developers.facebook.com/docs/plugins/share-button)
    var facebookLink = 'https://www.facebook.com/sharer/sharer.php?u=' + currentUrl;

    // after animations have completed, in 1s (1000 milliseconds) time, remove elements that were being animated
    // out from the DOM, and add the new elements
    setTimeout(function(){
        // remove the previously faded out elements from the DOM - their animated fade out is complete by now
        $('#answer-container').remove();
        $('#progress-update').remove();
        $('#question-container').remove();

        // programatically create the HTML elements required for the 'quiz complete' section
        var quizCompleteElement = '<div id="quiz-complete" class="fade-in">';

        // add a nice large tick icon from FontAwesome
        var tick = '<i class="fa fa-check-circle-o"></i>';

        quizCompleteElement += tick;

        // add 'well done' message in pargraph element
        var wellDoneParagraph = '<p>' + completionString + '</p>';

        // append to quiz complete element
        quizCompleteElement += wellDoneParagraph;

        // append 'result will be saved' string...
        var savedString = '<p id="result-saved-string">Your result has been saved to your profile.</p>';

        quizCompleteElement += savedString;

        // append 'back to quizzes' link
        var backLink = '<a href="quizzes.html">Back to quizzes...</a>';

        quizCompleteElement += backLink;

        // append social sharing buttons
        var socialSharingContainer = '<div id="social-links">';

        var facebookButton = '<a id="facebook-button" target="blank" href="' + facebookLink + '"><i class="fa fa-facebook-square"></i> Share on Facebook</a>';

        var twitterButton = '<a id="twitter-button" target="blank" href="' + twitterLink + '"><i class="fa fa-twitter-square"></i> Share on Twitter</a>';

        // append and close their container...
        socialSharingContainer += facebookButton;
        socialSharingContainer += twitterButton;
        socialSharingContainer += '</div>';

        quizCompleteElement += socialSharingContainer;

        // append the quiz complete items to the quiz-container section...
        $('#quiz-container').append(quizCompleteElement);

    }, 1000);


}
