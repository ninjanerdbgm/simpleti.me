// simpleti.me script
// Made by matt
// --
// matt@simpleti.me
// https://github.com/ninjanerdbgm/simpleti.me
// --

// Initialize startup variables.

// Determine if the device loading the page is mobile or not.
// This uses regex, which is slow. I'm looking to improve this, but
// for the time being, this works.
let isMobile = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) && (isMobile = !0);

// Grab the time the page was loaded and initialize the elapsed time 
// since page load to 0. This will be used for the self-adjusting timer
// that keeps track of the current time of day (polls every second).
let startClock = new Date().getTime();
let elapsedSinceLoaded = 0;

// Init the default font sizes (in em).
let defaultClockTextSize = 4;
let defaultTodTextSize = 2.5;
// Adjust the default sizes based on whether or not the device is mobile
// (and has a mobile device pixel ratio)
let clockFontSize = isMobile ? (window.devicePixelRatio < 4 ? 2.5 : defaultClockTextSize) : defaultClockTextSize;
let todFontSize = isMobile ? (window.devicePixelRatio < 4 ? 1.75 : defaultTodTextSize) : defaultTodTextSize;

// Init default color scheme (Blue Slate)
let bgColor = '#181a34';
let textBorderColor = '#000';
let textMainColor = '#f9ffcb';
let textGlowColor = '#000';

// Init variables used to determine the random pre-/post-fixes 
// for the clock
let random = 0;
let randomPost = 0;
let lastCheck = 0;

// Init default language
let setLanguage = "en";
let localize = i18n({
    domain: "messages",
    locale: setLanguage
});    

// Finally, set a variable that tracks whether or not the
// configuration dialog is being displayed. Init to false.
let showingColorChooser = false;

/// showColorChooser()
/// 
/// Shows the configuration dialog.
function showColorChooser() {
    $('#color-Chooser').show();
    screen.width == 640 ? $('#color-Chooser').attr({
        style: 'display:flex'
    }) : $('#color-Chooser').attr({
        style: 'display:block'
    });
    $('#color-colorForm').show();
    $('#color-defaultColors').show();
    $('#color-themeSelect').show();
    $('#color-closeBox').show();
}

/// hideColorChooser()
///
/// Hides the configuration dialog.
function hideColorChooser() {
    $('#color-Chooser').hide();
    $('#color-colorForm').hide();
    $('#color-defaultColors').hide();
    $('#color-themeSelect').hide();
    $('#color-closeBox').hide();
}

/// setGreenHaze()
///
/// Sets the green haze color scheme.
function setGreenHaze() {
    bgColor = '#333';
    textBorderColor = '#0ADD0A';
    textGlowColor = '#0AAA0A';
    textMainColor = '#f5f5f5';
    setColors();
}

/// setMauve()
///
/// Sets the mauve color scheme.
function setMauve() {
    bgColor = '#242a36';
    textBorderColor = '#000';
    textGlowColor = '#2c2633';
    textMainColor = '#c499dd';
    setColors();
}

/// setHiddenForest()
///
/// Sets the hidden forest color scheme.
function setHiddenForest() {
    bgColor = '#292110';
    textBorderColor = '#180f00';
    textGlowColor = '#112f08';
    textMainColor = '#22a749';
    setColors();
}

/// resetColors()
///
/// Sets the blue slate color scheme.
function resetColors() {
    bgColor = '#181a34';
    textBorderColor = '#000';
    textGlowColor = '#000';
    textMainColor = '#f9ffcb';
    setColors();
}

/// setColors()
///
/// Adjusts all the colors for the clock at once.
/// This is called on page load, and whenever the spectrum.js
/// color sliders are moved/set.
function setColors() {
    // Set the spectrum sliders to the correct color.
    $('#color-bgColor').spectrum('set', bgColor);    
    $('#color-textBorderColor').spectrum('set', textBorderColor);
    $('#color-textGlowColor').spectrum('set', textGlowColor);
    $('#color-textMainColor').spectrum('set', textMainColor);

    // Adjust page colors.
    /// Body background
    $('body').attr({
        style: 'background-color: ' + bgColor
    });
    /// Clock 
    $('#time').attr({
        style: 'color: ' + textMainColor + ';text-shadow: 0 0 2px ' + textBorderColor + ', 0 0 4px ' + textBorderColor + ',' + '0 0 6px ' + textBorderColor + ', 0 0 8px ' + textGlowColor + ',' + '0 0 10px ' + textGlowColor + ', 0 0 12px ' + textGlowColor + ',' + '0 0 14px ' + textGlowColor + ', 0 0 16px ' + textGlowColor + ';font-size: ' + clockFontSize + 'em;'
    });
    /// Time of day
    $('#nightOrDay').attr({
        style: 'color:' + textMainColor + ';font-size:' + todFontSize + 'em;text-shadow: 0 0 2px ' + textBorderColor + ', 0 0 4px ' + textBorderColor + ',' + '0 0 6px ' + textBorderColor + ', 0 0 8px ' + textGlowColor + ',' + '0 0 10px ' + textGlowColor + ', 0 0 12px ' + textGlowColor + ',' + '0 0 14px ' + textGlowColor + ', 0 0 16px ' + textGlowColor + ';'
    });
    /// Date
    $('#date').attr({
        style: 'color: ' + textMainColor + ';text-shadow: 0 0 2px ' + textBorderColor + ', 0 0 4px ' + textBorderColor + ',' + '0 0 6px ' + textBorderColor + ', 0 0 8px ' + textGlowColor + ',' + '0 0 10px ' + textGlowColor + ', 0 0 12px ' + textGlowColor + ',' + '0 0 14px ' + textGlowColor + ', 0 0 16px ' + textGlowColor + ';'
    });
    /// Configuration dialog
    $("#color-Chooser").attr({
        style: "background-color: " + bgColor + ";color: " + textMainColor + ";border: 2px solid " + textMainColor + ";"
    });
    /// Select Boxes
    $(".simpletime-select").attr({
        style: "color: " + textMainColor + ";border: 1px solid " + textMainColor + ";background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),linear-gradient(to bottom, " + bgColor + " 0%, " + bgColor + " 100%)"
    });
    /// Select Box Options
    $(".simpletime-select > option").attr({
        style: "color: " + textMainColor + ";background-color: " + bgColor + ";"
    });
    /// Header links
    $("a.email > svg > g").attr({fill: textMainColor});
    $("a.twitter > svg > g").attr({fill: textMainColor});
    $("a.github > svg > g").attr({fill: textMainColor});

    // If the Configuration dialog was being shown, show it again.
    if (showingColorChooser) showColorChooser();
}

/// setTheme(theme)
/// params:
///     - theme: The theme to switch to
/// Switches to a pre-set theme.
function setTheme(theme) {
    switch (theme) {
    case 'Blue Slate':
        resetColors();
        break;
    case 'Green Haze':
        setGreenHaze();
        break;
    case 'Mauve':
        setMauve();
        break;
    case 'Hidden Forest':
        setHiddenForest();
        break;
    }    
}

/// updateTime()
///
/// setInterval decays after a while if the clock is left open. So this is
/// a self-adjusting timer that fires every 10th of a second exactly.
/// Calls newTime(), then re-adjusts.
function updateTime() {
    // Incrased the elapsed time since the page was loaded.
    elapsedSinceLoaded += 100;

    // Divide the elapsed time since loaded by 100, then again by 10 and floor round.
    let elapsed = Math.floor(elapsedSinceLoaded / 100) / 10;
    // If the result of a regular round equals the floor round, call newTime()
    if (Math.round(elapsed) == elapsed) {
        newTime();
    }

    // Calculate the decay, and call this function, accounting for it.
    let diff = (new Date().getTime() - startClock) - time;
    setTimeout(updateTime, (100 - diff));
}

/// newRandom(date)
/// params: 
///     - date: the current date
/// Generates new random numbers every three minutes
/// that are used to determine which phrases are displayed
/// as pre-/post-fixes.
function newRandom(date) {
    if (lastCheck != date.getMinutes() && (date.getMinutes() % 3 == 0)) {
        random = Math.floor(Math.random() + 2);
        randomPost = Math.floor(Math.random() * 10);
        lastCheck = date.getMinutes();
    }
}

/// encodeUrl()
///
/// Grabs the current color scheme, time of day and date 
/// display preferences, and font size preferences, and
/// encodes them to a url-friendly GUID. It then attaches
/// that data to the current url for bookmarking/sharing
/// capabilities.
function encodeUrl() {
    // Get the url
    let locHref = window.location.href;
    // Get display preferences
    let showTimeofDay = $('#color-showTimeOfDay').is(":checked");
    let showDate = $('#color-showDate').is(":checked");
    // Init the existing GUID string
    let encodedText = '';

    // If there's an existing GUID, grab it.
    // Make sure locHref points to the TLD.
    if (locHref.indexOf('/?') != -1) {
        encodedText = locHref.split('?')[1];
        locHref = locHref.split('/?')[0];
    }
    // Set a new string to a new encoded GUID.
    let encodedString = btoa(bgColor.replace('#', '')) 
        + 'a246' + btoa(textMainColor.replace('#', '')) 
        + 'b246' + btoa(textBorderColor.replace('#', '')) 
        + 'c246' + btoa(textGlowColor.replace('#', '')) 
        + 'd246' + btoa(clockFontSize.toString()) 
        + 'e246' + btoa(todFontSize.toString()) 
        + 'f246' + btoa(showTimeofDay.toString()) 
        + 'g246' + btoa(showDate.toString()) 
        + 'h246' + btoa(setLanguage.toString());

    // Make sure we're not running locally
    if (!window.location.protocol.includes("file:")) {
        // If we are on a web server, and the new GUID doesn't match the old one,
        // append the new GUID to the TLD.
        encodedText.includes(encodedString) || window.history.pushState({
            where: 'simpleti.me'
        }, 'simpleti.me', locHref + (locHref[locHref.length - 1] === '/' ? '?' : '/?') + encodedString);
    }
}

/// decodeUrl()
///
/// Gets the encoded GUID in the url and decodes it. It then
/// sets the theme, display preferences, and font size
/// preferences to those values.
function decodeUrl() {
    let locHref = window.location.href;
    if (locHref.indexOf('/?') != -1) {
        let encString = locHref.split('?')[1];
        let bg = encString.split('a246')[0];
        let mainText = encString.split('a246')[1].split('b246')[0];
        let border = encString.split('b246')[1].split('c246')[0];
        let glow = encString.split('c246')[1].split('d246')[0];
        let clockFont = encString.split('d246')[1].split('e246')[0];
        let todFont = encString.split('e246')[1].split('f246')[0];
        let todHidden = encString.split('f246')[1].split('g246')[0];
        let dateHidden = encString.split('g246')[1].split('h246')[0];
        let setLang = encString.split('h246')[1];

        bg = '#' + atob(bg);
        mainText = '#' + atob(mainText);
        border = '#' + atob(border);
        glow = '#' + atob(glow);
        clockFont = atob(clockFont);
        todFont = atob(todFont);
        todHidden = atob(todHidden);
        dateHidden = atob(dateHidden);
        setLang = atob(setLang);
        bgColor = bg;
        textMainColor = mainText;
        textBorderColor = border;
        textGlowColor = glow;
        clockFontSize = clockFont;
        todFontSize = todFont;      

        $("#color-clockFontSize").val(isMobile ? (window.devicePixelRatio < 4 ? parseFloat(clockFont) + 1.5 : clockFont) : clockFont);
        $("#color-todFontSize").val(isMobile ? (window.devicePixelRatio < 4 ? parseFloat(todFont) + 1.5 : todFont) : todFont);
        $('#color-showTimeOfDay').prop("checked", todHidden === "true");
        $('#color-showDate').prop("checked", dateHidden === "true");
        $('#color-langSelect').val(setLang);

        fetch("loc/" + setLang + ".json").then(response => response.json()).then(json => { 
            localize.loadJSON(json, 'messages'); 
            localize.setLocale(setLang);            
            setLanguage = setLang;
        }).catch(err => console.error(err)); 

        setColors();
    }
}

/// newTime()
///
/// Updates the clock
function newTime() {
    // Get the current date
    let date = new Date();
    // Get new random numbers (if necessary)
    // and add the theme encoding to the url (if necessary)
    newRandom(date);
    encodeUrl();

    // Init a bunch of stuff
    // Ish is special, it gets it own localized string.
    let ish = localize.gettext('ish');
    // Set the times array
    let times = [
        localize.gettext('twelve'), 
        localize.gettext('one'), 
        localize.gettext('two'), 
        localize.gettext('three'), 
        localize.gettext('four'), 
        localize.gettext('five'), 
        localize.gettext('six'), 
        localize.gettext('seven'), 
        localize.gettext('eight'), 
        localize.gettext('nine'), 
        localize.gettext('ten'), 
        localize.gettext('eleven')
    ];
    // Set the months array
    let months = [
        localize.gettext('jan'), 
        localize.gettext('feb'), 
        localize.gettext('mar'), 
        localize.gettext('apr'), 
        localize.gettext('may'), 
        localize.gettext('jun'), 
        localize.gettext('jul'), 
        localize.gettext('aug'), 
        localize.gettext('sep'), 
        localize.gettext('oct'), 
        localize.gettext('nov'), 
        localize.gettext('dec')
    ];
    // Set the prefix array
    let pres = [
        localize.gettext('almost '), 
        localize.gettext('approaching '), 
        localize.gettext('nearly ')
    ];
    // Set the infix array
    let mids = [
        localize.gettext('til'), 
        localize.gettext('past')
    ];
    // Set the suffix (to either the localized " or so" string, or "ish")
    let ends = randomPost > 4 ? localize.gettext(' or so') : ish;
    // Get the current minute
    let curMins = date.getMinutes();
    // Set a boolean if it's past the 30 minute mark of the hour
    // This will be used to determine which infix to use.
    let pastThirty = date.getMinutes() > 30 ? 0 : 1;
    // Get the current hour from the times array
    let hourAsString = times[date.getHours() % 12];
    // Get the next hour from the times array
    let nextHourAsString = times[(date.getHours() + 1) % 12];
    // Set some flair text for each five minute interval in the hour
    let five = localize.gettext('five %1 %2',mids[pastThirty],hourAsString);
    let ten = localize.gettext('ten %1 %2',mids[pastThirty],hourAsString);
    let fifteen = localize.gettext('a quarter %1 %2',mids[pastThirty],hourAsString);
    let twenty = localize.gettext('twenty %1 %2',mids[pastThirty],hourAsString);
    let twentyfive = localize.gettext('twenty-five %1 %2',mids[pastThirty],hourAsString);
    let thirty = localize.gettext('half past %1',hourAsString,nextHourAsString);
    let thirtyfive = localize.gettext('thirty-five after %1',hourAsString);
    let fourty = localize.gettext('twenty %1 %2',mids[pastThirty],nextHourAsString);
    let fourtyfive = localize.gettext('a quarter %1 %2',mids[pastThirty],nextHourAsString);
    let fifty = localize.gettext('ten %1 %2',mids[pastThirty],nextHourAsString);
    let fiftyfive = localize.gettext('five %1 %2',mids[pastThirty],nextHourAsString);

    // Determine if the clock should be relative to the next hour or the current hour.
    let shouldDisplayNextHour = curMins >= 38;

    // Determine what colloquial language to display based on the minute.
    let timeAsString = function() {
        switch (curMins) {
            case 0: return hourAsString;
            case 5: return five;
            case 10: return ten;
            case 15: return fifteen;
            case 20: return twenty;
            case 25: return twentyfive;
            case 30: return thirty;
            case 35: return thirtyfive;
            case 40: return fourty;
            case 45: return fourtyfive;
            case 50: return fifty;
            case 55: return fiftyfive;
            default: {
                if (curMins < 2) return hourAsString.replace('ive', 'iv').replace('ine', 'in') + ish;
                if (curMins < 5) return pres[random] + five + ends;
                if (curMins < 8) return (five + ends).replace('fiveish', 'fivish');
                if (curMins < 10) return pres[random] + ten;
                if (curMins < 13) return ten + ends;
                if (curMins < 15) return pres[random] + fifteen;
                if (curMins < 18) return fifteen + ends;
                if (curMins < 20) return pres[random] + twenty;
                if (curMins < 23) return twenty + ends;
                if (curMins < 25) return pres[random] + twentyfive;
                if (curMins < 28) return twentyfive + ends;
                if (curMins < 30) return pres[random] + thirty;
                if (curMins < 33) return thirty + ends;
                if (curMins < 35) return pres[random] + thirtyfive;
                if (curMins < 38) return (thirtyfive + ends).replace('fiveish', 'fivish');
                if (curMins < 40) return pres[random] + fourty;
                if (curMins < 43) return fourty + ends;
                if (curMins < 45) return pres[random] + fourtyfive;
                if (curMins < 48) return fourtyfive + ends;
                if (curMins < 50) return pres[random] + fifty;
                if (curMins < 53) return fifty + ends;
                if (curMins < 55) return pres[random] + fiftyfive;
                if (curMins < 58) return (fiftyfive + ends).replace('fiveish', 'fivish');
                if (curMins < 60) return pres[random] + nextHourAsString + ends;
            }
        }        
    };
    
    // Determine the time of day based on minute and hour.
    let timeOfDay = '';
    if (date.getHours() != 11 && date.getHours() != 16 && date.getHours() != 23) {
        if (date.getHours() < 11) timeOfDay = localize.gettext(' in the morning.');
        if (date.getHours() > 11 && date.getHours() < 16) timeOfDay = localize.gettext(' in the afternoon.');
        if (date.getHours() > 16) timeOfDay = localize.gettext(' at night.');
    } else {
        if (date.getHours() == 11) {
            if (shouldDisplayNextHour) timeOfDay = localize.gettext(' in the afternoon.');
            else timeOfDay = localize.gettext(' in the morning.');
        }
        if (date.getHours() == 16) {
            if (shouldDisplayNextHour) timeOfDay = localize.gettext(' at night.');
            else timeOfDay = localize.gettext(' in the afternoon.');            
        }
        if (date.getHours() == 23) {
            if (shouldDisplayNextHour) timeOfDay = localize.gettext(' at night.');
            else timeOfDay = localize.gettext(' in the morning.');            
        }
    }
    
    // Determine the ordinal ending of the current date.
    let ord = function(number) {
        if (number > 3 && number < 21)
            return localize.gettext('th');
        switch (number % 10) {
        case 1:
            return localize.gettext('st');
        case 2:
            return localize.gettext('nd');
        case 3:
            return localize.gettext('rd');
        default:
            return localize.gettext('th');
        }
    };

    // Set the date string.
    let dateStr = localize.gettext('on the %1%2 of %3, %4',date.getDate(),ord(date.getDate()),months[date.getMonth()],date.getFullYear());

    // Update the clock if the current display text has been changed.
    if ($("#time").html() !== timeAsString()) {
        $('#time').html(timeAsString());
        $('#date').html(dateStr);
        $('#nightOrDay').html(timeOfDay);        
    }

    // Show/hide the time of day or the date based on user setting.
    if ($('#color-showTimeOfDay').is(":checked")) $("#nightOrDay").show();
    else $("#nightOrDay").hide();
    if ($('#color-showDate').is(":checked")) $("#date").show();
    else $("#date").hide();
}

/// Listen for resize events and determine if the resize changed the device to mobile.
/// Note: I think this only really happens if using the device toolbar in Chrome's dev
///       settings, but it might have practical applications, so I'm leaving it.
window.addEventListener('resize', function() {
    // Update the font size on resize.
    isMobile = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) && (isMobile = !0);    
    clockFontSize = isMobile ? (window.devicePixelRatio < 4 ? 2.5 : defaultClockTextSize) : defaultClockTextSize;
    todFontSize = isMobile ? (window.devicePixelRatio < 4 ? 1.75 : defaultTodTextSize) : defaultTodTextSize;
    setColors();
});

/// Fetch the localization.
fetch("loc/" + setLanguage + ".json").then(response => response.json()).then(json => { localize.loadJSON(json, 'messages'); }).catch(err => console.error(err));

/// DOM loaded
$(function() {
    // Set the font size
    defaultClockTextSize = $("#color-clockFontSize > option.opDefault").val();
    defaultTodTextSize = $("#color-todFontSize > option.opDefault").val();

    /// Set event handlers
    // Determine whether to show or hide the config dialog.
    $('body').click(function(e) {
        let target = $(e.target);
        if (!target.closest(".simpletime-select").length && !target.closest(".topnav").length) {
            if ((!target.closest("#color-Chooser").length || target.closest("#closeBox").length) && $("#color-Chooser").is(":visible")) hideColorChooser();
            else showColorChooser();
        }
    });
    // Set the theme on user selection.
    $('#color-themeSelect').on('change', function() {
        showingColorChooser = $("#color-Chooser").is(":visible");
        setTheme($(this).val());        
    });
    // Set the language on user selection.
    $('#color-langSelect').on('change', function() {
        setLanguage = $(this).val();
        fetch("loc/" + setLanguage + ".json").then(response => response.json()).then(json => { 
            localize.loadJSON(json, 'messages'); 
            localize.setLocale(setLanguage);
            encodeUrl();
        }).catch(err => console.error(err)); 
    });
    // Set the clock font size on user selection.
    $('#color-clockFontSize').on('change', function() {
        clockFontSize = isMobile ? (window.devicePixelRatio < 4 ? parseFloat($(this).val()) - 1.5 : $(this).val()) : $(this).val();
        setColors();
    });
    // Set the time of day font size on user selection.
    $('#color-todFontSize').on('change', function() {
        todFontSize = isMobile ? (window.devicePixelRatio < 4 ? parseFloat($(this).val()) - 0.75 : $(this).val()) : $(this).val();
        setColors();
    });    
    // Show/hide the time of day on user selection.
    $('#color-showTimeOfDay').on('click', function() {
        if ($(this).is(":checked")) $("#nightOrDay").show();
        else $("#nightOrDay").hide();
    });  
    // Show/hide the time of day on user selection.
    $('#color-showDate').on('click', function() {
        if ($(this).is(":checked")) $("#date").show();
        else $("#date").hide();
    });  
    // Update the background color as user moves the color slider.
    $('#color-bgColor').spectrum({
        color: '#0b0c1c',
        preferredFormat: 'hex3',
        clickoutFiresChange: true,
        containerClassName: "colorPickerBG",
        showButtons: false,
        showInitial: true,
        showInput: !0,
        change: function(color) {
            bgColor = color.toHexString();
            setColors();
            $("#color-Chooser").show();
        },
        beforeShow: function(color) {
            bgColor = color.toHexString(),
            setColors();
        },
        move: function(color) {
            bgColor = color.toHexString(),
            setColors();
            $("#color-Chooser").hide();
        }
    });
    // Update the border color as user moves the color slider.
    $('#color-textBorderColor').spectrum({
        color: '#000',
        preferredFormat: 'hex3',
        showInput: !0,
        clickoutFiresChange: true,
        containerClassName: "colorPickerBG",
        showButtons: false,
        showInitial: true,
        allowEmpty: true,
        change: function(color) {
            textBorderColor = (color == null || color._a == 0) ? "transparent" : color.toHexString(),
            setColors();
            $("#color-Chooser").show();
        },
        beforeShow: function(color) {
            textBorderColor = (color == null || color._a == 0) ? "transparent" : color.toHexString(),
            setColors();
        },
        move: function(color) {
            textBorderColor = (color == null || color._a == 0) ? "transparent" : color.toHexString(),
            setColors();
            $("#color-Chooser").hide();
        }
    });
    // Update the glow color as user moves the color slider.
    $('#color-textGlowColor').spectrum({
        color: '#000',
        preferredFormat: 'hex3',
        showInput: !0,
        clickoutFiresChange: true,
        containerClassName: "colorPickerBG",
        showButtons: false,
        showInitial: true,
        allowEmpty: true,
        change: function(color) {             
            textGlowColor = (color == null || color._a == 0) ? "transparent" : color.toHexString(),
            setColors();
            $("#color-Chooser").show();
        },
        beforeShow: function(color) {
            textGlowColor = (color == null || color._a == 0) ? "transparent" : color.toHexString(),
            setColors();
        },
        move: function(color) {
            textGlowColor = (color == null || color._a == 0) ? "transparent" : color.toHexString(),
            setColors();
            $("#color-Chooser").hide();
        }
    });
    // Update the main text color as user moves the color slider.
    $('#color-textMainColor').spectrum({
        color: '#f9ffcb',
        preferredFormat: 'hex3',
        clickoutFiresChange: true,
        containerClassName: "colorPickerBG",  
        showInitial: true,
        showInput: !0,
        change: function(color) {
            textMainColor = color.toHexString(),
            setColors();
            $("#color-Chooser").show();
        },
        beforeShow: function(color) {
            textMainColor = color.toHexString(),
            setColors();
        },
        move: function(color) {
            textMainColor = color.toHexString(),
            setColors();
            $("#color-Chooser").hide();
        }
    });

    // Fade out the config dialog instructions slowly over 10 seconds.
    $('#aboutLink').fadeOut(10000, function() {
        $('#aboutLink').hide();
    });

    // Call some initial functions.
    decodeUrl();
    newTime();
    updateTime();
    hideColorChooser();
    setColors();

    // Set the topnav icon colors.
    $("a.email > svg > g").attr({fill: textMainColor});
    $("a.twitter > svg > g").attr({fill: textMainColor});
    $("a.github > svg > g").attr({fill: textMainColor});
});
