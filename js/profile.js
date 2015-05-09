// The profile.js file will persist user 'profile' information such as quiz completion status/scores
// serialized inside of JSON objects, and persisted using local storage.
// Created by Dylan McKee on 16/04/2015.

var Profile = new function () {

    // A 'constant' key to use to save profile data under in local storage with.
    var PROFILE_DATA_SAVE_KEY = "profileData";

    // The profile data object that our saved data is loaded into.
    this.profileData = {
        // a blank data field, to eventually hopefully be filled with key/value pairs
        // with a string as the key (the quiz name), and a number as the value (the quiz score).
        data: {}
    };

    this.loadProfileData = function () {
        // to be called on quiz page initialisation/homepage initialisation.
        // this function loads in profile data from local storage, into the data field of the variable in this file.

        // get item from localStorage
        var serialized = window.localStorage.getItem(PROFILE_DATA_SAVE_KEY);

        // if there's nothing there give up, set the data field to a blank object and return...
        if (serialized === null) {
            // no data to retrieve,
            // set data field to a blank object...
            this.profileData.data = {};
            // and return!
            return;
        }

        // okay we've verified there's some serialized data, make it into an object by parsing the JSON...
        // and set the de-serialized object to be the data field of the profileData object.
        this.profileData.data = JSON.parse(serialized);

    };

    this.saveProfileData = function () {
        // serialize the contents of the data field of the profileData object into a JSON string...
        var seraialized = JSON.stringify(this.profileData.data);

        // save the string to local storage...
        window.localStorage.setItem(PROFILE_DATA_SAVE_KEY, seraialized);

    };

    this.addQuizScoreToProfileData = function (quizName, quizScore) {
        // set profileData data key/value pair to what we've been passed....
        this.profileData.data[quizName] = quizScore;

        // save changes we've made.
        this.saveProfileData();
    };

    this.getCompletedQuizScores = function () {

        // return score data.
        return this.profileData.data;
    };

    this.clearAllProfileDataForever = function () {
        // reset local storage data! The user wishes to reset their account.
        window.localStorage.clear();
    }

};
