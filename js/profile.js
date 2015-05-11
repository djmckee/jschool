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

        // get item from localStorage (using the SimpleStore.js polyfill)
        var data = store(PROFILE_DATA_SAVE_KEY)

        // if there's nothing there give up, set the data field to a blank object and return...
        if (data === null) {
            // no data to retrieve,
            // set data field to a blank object...
            this.profileData.data = {};
            // and return!
            return;
        }

        // okay we've verified there's some data, set it equal to the current profile data...
        this.profileData.data = data;

    };

    this.saveProfileData = function () {
        // save the data to local storage... (using SimpleStore.js polyfill abstraction layer)
        store(PROFILE_DATA_SAVE_KEY, this.profileData.data);

    };

    this.addQuizScoreToProfileData = function (quizName, quizScore) {
        // load existing data so as not to overwrite existing completions with the completion status of just one quiz...
        this.loadProfileData();

        // set profileData data key/value pair to what we've been passed....
        this.profileData.data[quizName] = quizScore;

        // save changes we've made.
        this.saveProfileData();
    };

    this.getCompletedQuizScores = function () {
        // load existing data...
        this.loadProfileData();

        // return score data.
        return this.profileData.data;
    };

    this.clearAllProfileDataForever = function () {
        // reset local storage data by setting a null value for the key in the SimpleStore.js polyfill abstraction
        store(PROFILE_DATA_SAVE_KEY, null);
    }

};
