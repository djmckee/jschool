// This file gets the svg data from the 'certificate-container' div,
// sets name and current day's date (formatted properly as a nice tidy string),
// and then saves the rendered svg certificate to the user's computer as a download
// (offered in a link)...

// Created by Dylan McKee on 21/04/2015.

var CertificateGenerator = new function() {

    // Storing SVG data as a variable because AJAX doesn't work locally in Google Chrome due to security reasons, grr.
    // In real life this would obviously be serverside in an appropriate location in its own SVG file, but this sadly
    // isn't possible here due to Cross Site Scripting security limitations.
    // The SVG data is from certificate.svg, in the images folder.
    var certificateSvgData = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="841.89px" height="595.28px" viewBox="0 0 841.89 595.28" enable-background="new 0 0 841.89 595.28" xml:space="preserve">';
    certificateSvgData += '<rect id="box" fill="#2C3E50" stroke="#000000" stroke-miterlimit="10" width="841.89" height="595.28"/>';
    certificateSvgData += '<rect id="box_1_" x="33.904" y="23.972" fill="#F1F2F2" stroke="#000000" stroke-miterlimit="10" width="774.083" height="547.336"/>';
    certificateSvgData += '<rect id="box_2_" x="64.479" y="45.591" fill="#35495E" stroke="#000000" stroke-miterlimit="10" width="712.931" height="504.098"/>';
    certificateSvgData += '<rect x="84.474" y="69.842" fill="none" width="157.895" height="42.982"/>';
    certificateSvgData += '<text transform="matrix(1 0 0 1 84.4736 103.3521)" fill="#FDFDFE" font-family="\'Lato-Light\', \'Lato\', Helvetica, Arial, sans-serif" font-size="46">Jschool</text>';
    certificateSvgData += '<rect x="203.239" y="196.315" fill="none" width="435.412" height="42.982"/>';
    certificateSvgData += '<text transform="matrix(1 0 0 1 261.1738 223.2695)" fill="#FDFDFE" font-family="\'Lato-Light\', \'Lato\', Helvetica, Arial, sans-serif" font-size="37">This is to certify that</text>';
    certificateSvgData += '<rect x="64.479" y="254.658" fill="none" width="712.931" height="42.982"/>';
    certificateSvgData += '<text id="name_label" style="text-anchor: middle; font-weight: 200;" transform="matrix(1 0 0 1 322.0454 284.1382)" fill="#FDFDFE" font-family="\'Lato-Regular\'" font-size="40">Your Name</text>';
    certificateSvgData += '<rect x="209.239" y="326.298" fill="none" width="435.412" height="139.158"/>';
    certificateSvgData += '<text transform="matrix(1 0 0 1 220.9893 353.252)"><tspan x="0" y="0" fill="#FDFDFE" font-family="\'Lato-Light\', \'Lato\', Helvetica, Arial, sans-serif" font-size="37">has completed the Jschool </tspan><tspan x="42.494" y="44.4" fill="#FDFDFE" font-family="\'Lato-Light\', \'Lato\', Helvetica, Arial, sans-serif" font-size="37">tutorials in front-end </tspan><tspan x="13.92" y="88.8" fill="#FDFDFE" font-family="\'Lato-Light\', \'Lato\', Helvetica, Arial, sans-serif" font-size="37">JavaScript development.</tspan></text>';
    certificateSvgData += '<rect x="64.479" y="518.965" fill="none" width="712.931" height="30.725"/>';
    certificateSvgData += '<text id="date_label" style="text-anchor: middle; font-weight: 200;" transform="matrix(1 0 0 1 367.0859 533.7051)" fill="#FDFDFE" font-family="\'Lato-Regular\'" font-size="20">22/04/2016</text>';
    certificateSvgData += '</svg>';

    this.generateCertificate = function(){
        // get the contents of certificateSvgData rendered into
        // a div with an id of certificate-container (set to display none!)
        // create SVG Element...
        var svgElement = '<div id="certificate-container" display="none">';

        // append the SVG data in...
        svgElement += certificateSvgData;

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
        $('div#certificate-container svg #name_label').text(name);

        // get the current date and format it
        // I looked up date formatting at http://stackoverflow.com/questions/5250244/jquery-date-formatting
        var date = new Date();
        var day = date.getDate();
        // plus one here because JavaScript dates are zero indexed :o
        var month =  (date.getMonth() + 1);
        var year = date.getFullYear();

        var dateString = String(day) + '/' + String(month) + '/' + String(year);

        // set the date label to the formatted date string
        $('div#certificate-container svg #date_label').text(dateString);

        // encode the SVG entirely to base64 encoding for download purposes
        var encodedSvg = btoa($('div#certificate-container').html());

        // SVG downloading via link from http://stackoverflow.com/questions/2483919/how-to-save-svg-canvas-to-local-filesystem
        var linkOpen = '<a class="button" href-lang="image/svg+xml" href="data:image/svg+xml;base64,\n';

        // create a data String object using the toString method, ensuring type safety
        var dataString = encodedSvg.toString();

        // and close the link tag (note use of HTML5's download attribute to specify a download filename and encourage the browser to download the file rather than viewing in a window)
        var linkClose = '" target="_blank" download="jschool-certificate.svg">Download your certificate!</a>';

        // concatenate these together...
        var linkString = linkOpen.concat(dataString, linkClose);

        // append the link (as a styled 'button' - thanks to the button CSS class) to the quiz-info-lead section...
        $('#quiz-info-lead').append(linkString);

        // remove certificate-container div from the body - all data is now in the link's href as base64 encoded data...
        $('#certificate-container').remove();

    }

}
