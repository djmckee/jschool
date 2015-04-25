// This file gets the svg data from the 'certificate-container' div,
// sets name and current day's date (formatted properly as a nice tidy string),
// and then saves the rendered svg certificate to the user's computer as a download
// (offered in a link)...

// Created by Dylan McKee on 21/04/2015.

function generateCertificate(){
    // get the contents of certificate.svg and rendered it into
    // a div with an id of certificate-container (set to display none!)
    $.get("certificate.svg", function(data) {
        // create SVG Element...
        var svgElement = '<div id="certificate-container" display="none">';

        // append the loaded SVG data in...
        svgElement += data;

        // close the element...
        svgElement += '</div>';

        // append it to the end of the body...
        $('body').append(svgElement);

        // okay, pefrorm SVG rendering...
        // prompt user for their name to use in the certificate using an alert...
        var name = prompt('Please enter your name for use in the certificate:');

        // (only two equals here because valid names can't be blank strings either!)
        if (name == null) {
            // they haven't entered a name - warn and return!
            alert('Sorry - but we can\'t create your certificate without knowing your name...');
            return;
        }

        // set name field in SVG to the name string we've been passed...
        $('div#certificate-template-container svg #name_label').text(name);

        // get the current date and format it
        // I looked up date formatting at http://stackoverflow.com/questions/5250244/jquery-date-formatting
        var date = new Date();
        var day = date.getDate();
        var month =  (date.getMonth() + 1);
        var year = date.getFullYear();

        var dateString = String(day) + '/' + String(month) + '/' + String(year);

        // set the date label to the formatted date string
        $('div#certificate-template-container svg #date_label').text(dateString);

        // encode the SVG entirely to base64 encoding for download purposes
        var encodedSvg = btoa($('div#certificate-template-container').html());

        // SVG downloading via link from http://stackoverflow.com/questions/2483919/how-to-save-svg-canvas-to-local-filesystem
        var linkString = '<a class="button" href-lang="image/svg+xml" href="data:image/svg+xml;base64,\n' + encodedSvg + '" target="_blank" download="jschool-certificate.svg">Download</a>';

        // append the link (as a styled 'button' - thanks to the button CSS class) to the quiz-info-lead section...
        $('#quiz-info-lead').append(linkString);

        // remove certificate-container div from the body - all data is now in the link's href as base64 encoded data...
        $('#certificate-container').remove();

    });

}
