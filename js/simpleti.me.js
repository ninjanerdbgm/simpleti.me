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

function hideColorChooser() {
    $('#color-Chooser').hide();
    $('#color-colorForm').hide();
    $('#color-defaultColors').hide();
    $('#color-themeSelect').hide();
    $('#color-closeBox').hide();
}

function setGreenHaze() {
    bgColor = '#333';
    textBorderColor = '#0ADD0A';
    textGlowColor = '#0AAA0A';
    textMainColor = '#f5f5f5';
    setColors();
}

function setMauve() {
    bgColor = '#242a36';
    textBorderColor = '#000';
    textGlowColor = '#2c2633';
    textMainColor = '#c499dd';
    setColors();
}

function setHiddenForest() {
    bgColor = '#292110';
    textBorderColor = '#180f00';
    textGlowColor = '#112f08';
    textMainColor = '#22a749';
    setColors();
}

function resetColors() {
    bgColor = '#0b0c1c';
    textBorderColor = '#000';
    textGlowColor = '#000';
    textMainColor = '#f9ffcb';
    setColors();
}

function setColors() {
    $('#color-bgColor').spectrum('set', bgColor);
    $('body').attr({
        style: 'background-color: ' + bgColor
    });
    $('#color-textBorderColor').spectrum('set', textBorderColor);
    $('#color-textGlowColor').spectrum('set', textGlowColor);
    $('#time').attr({
        style: 'text-shadow: 0 0 2px ' + textBorderColor + ', 0 0 4px ' + textBorderColor + ',' + '0 0 6px ' + textBorderColor + ', 0 0 8px ' + textGlowColor + ',' + '0 0 10px ' + textGlowColor + ', 0 0 12px ' + textGlowColor + ',' + '0 0 14px ' + textGlowColor + ', 0 0 16px ' + textGlowColor + ';'
    });
    $('#time').attr({
        style: 'color: ' + textMainColor
    });
    $('#time').attr({
        style: 'font-size: ' + clockFontSize + 'em'
    });
    $('#nightOrDay').attr({
        style: 'font-size: ' + todFontSize + 'em'
    });
    $('#color-textMainColor').spectrum('set', textMainColor);

    $("a.email > svg > g").attr({fill: textMainColor});
    $("a.twitter > svg > g").attr({fill: textMainColor});
    $("a.github > svg > g").attr({fill: textMainColor});
    newTime();
}

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

function updateTime() {
    setInterval(newTime, 1000);
}

function newRandom(date) {
    if (lastCheck != date.getMinutes() && (date.getMinutes() % 3 == 0)) {
        random = Math.floor(Math.random() + 2);
        randomPost = Math.floor(Math.random() * 10);
        lastCheck = date.getMinutes();
    }
}

function encodeUrl(bg, mainText, border, glow, clockFont, todFont, todChecked, dateChecked) {
    let locHref = window.location.href;
    let encodedText = '';
    locHref.indexOf('/?') != -1 && (encodedText = locHref.split('?')[1]);
    let encodedString = btoa(bg.replace('#', '')) + 'a246' + btoa(mainText.replace('#', '')) + 'b246' + btoa(border.replace('#', '')) + 'c246' + btoa(glow.replace('#', '')) + 'd246' + btoa(clockFont.toString()) + 'e246' + btoa(todFont.toString()) + 'f246' + btoa(todChecked.toString()) + 'g246' + btoa(dateChecked.toString());
    if (!window.location.protocol.includes("file:")) {
        encodedText.includes(encodedString) || window.history.pushState({
            where: 'simpleti.me'
        }, 'simpleti.me', '/?' + encodedString);
    }
}

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
        let dateHidden = encString.split('g246')[1];
        bg = '#' + atob(bg);
        mainText = '#' + atob(mainText);
        border = '#' + atob(border);
        glow = '#' + atob(glow);
        clockFont = atob(clockFont);
        todFont = atob(todFont);
        todHidden = atob(todHidden);
        dateHidden = atob(dateHidden);
        bgColor = bg;
        textMainColor = mainText;
        textBorderColor = border;
        textGlowColor = glow;
        clockFontSize = clockFont;
        todFontSize = todFont;      
        $("#color-clockFontSize").val(clockFont);
        $("#color-todFontSize").val(todFont);
        $('#color-showTimeOfDay').prop("checked", todHidden === "true");
        $('#color-showDate').prop("checked", dateHidden === "true");
        setColors();
    }
}

function newTime() {
    let date = new Date();
    newRandom(date);
    encodeUrl(bgColor, textMainColor, textBorderColor, textGlowColor, clockFontSize, todFontSize, $('#color-showTimeOfDay').is(":checked"), $('#color-showDate').is(":checked"));
    let ish = 'ish';
    let times = ['twelve', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];
    let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    let pres = ['almost ', 'approaching ', 'nearly '];
    let mids = ['til', 'past'];
    let ends = randomPost > 4 ? ' or so' : ish;
    let curMins = date.getMinutes();
    let pastThirty = date.getMinutes() > 30 ? 0 : 1;
    let hourAsString = times[date.getHours() % 12];
    let nextHourAsString = times[(date.getHours() + 1) % 12];
    let five = 'five ' + mids[pastThirty] + ' ' + hourAsString;
    let ten = 'ten ' + mids[pastThirty] + ' ' + hourAsString;
    let fifteen = 'a quarter ' + mids[pastThirty] + ' ' + hourAsString;
    let twenty = 'twenty ' + mids[pastThirty] + ' ' + hourAsString;
    let twentyfive = 'twenty-five ' + mids[pastThirty] + ' ' + hourAsString;
    let thirty = 'half past ' + hourAsString;
    let thirtyfive = 'thirty-five after ' + hourAsString;
    let fourty = 'twenty ' + mids[pastThirty] + ' ' + nextHourAsString;
    let fourtyfive = 'a quarter ' + mids[pastThirty] + ' ' + nextHourAsString;
    let fifty = 'ten ' + mids[pastThirty] + ' ' + nextHourAsString;
    let fiftyfive = 'five ' + mids[pastThirty] + ' ' + nextHourAsString;
    let shouldDisplayNextHour = curMins >= 38;
    let timeAsString = function() {
        return curMins == 0 ? hourAsString : curMins == 5 ? five : curMins == 10 ? ten : curMins == 15 ? fifteen : curMins == 20 ? twenty : curMins == 25 ? twentyfive : curMins == 30 ? thirty : curMins == 35 ? thirtyfive : curMins == 40 ? fourty : curMins == 45 ? fourtyfive : curMins == 50 ? fifty : curMins == 55 ? fiftyfive : curMins < 2 ? hourAsString.replace('ive', 'iv').replace('ine', 'in') + ish : curMins < 5 ? pres[random] + five + ends : curMins < 8 ? (five + ends).replace('fiveish', 'fivish') : curMins < 10 ? pres[random] + ten : curMins < 13 ? ten + ends : curMins < 15 ? pres[random] + fifteen : curMins < 18 ? fifteen + ends : curMins < 20 ? pres[random] + twenty : curMins < 23 ? twenty + ends : curMins < 25 ? pres[random] + twentyfive : curMins < 28 ? twentyfive + ends : curMins < 30 ? pres[random] + thirty : curMins < 33 ? thirty + ends : curMins < 35 ? pres[random] + thirtyfive : curMins < 38 ? (thirtyfive + ends).replace('fiveish', 'fivish') : curMins < 40 ? pres[random] + fourty : curMins < 43 ? fourty + ends : curMins < 45 ? pres[random] + fourtyfive : curMins < 48 ? fourtyfive + ends : curMins < 50 ? pres[random] + fifty : curMins < 13 ? fifty + ends : curMins < 55 ? pres[random] + fiftyfive : curMins < 13 ? (fiftyfive + ends).replace('fiveish', 'fivish') : curMins < 60 ? pres[random] + nextHourAsString + ends : void 0;
    };
    let timeOfDay = '';
    date.getHours() <= 11 || date.getHours() == 23 && shouldDisplayNextHour ? timeOfDay = ' in the morning.' : date.getHours() == 16 && shouldDisplayNextHour ? timeOfDay = ' at night.' : date.getHours() > 11 && date.getHours() < 17 || date.getHours() == 11 && shouldDisplayNextHour ? timeOfDay = ' in the afternoon.' : timeOfDay = ' at night.';
    let ord = function(number) {
        if (number > 3 && number < 21)
            return 'th';
        switch (number % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
        }
    };
    let dateStr = 'on the ' + date.getDate() + ord(date.getDate) + ' of ' + months[date.getMonth()] + ', ' + date.getFullYear();
    $('#time').html(timeAsString());
    $('#date').html(dateStr);
    $('#nightOrDay').html(timeOfDay);
    $('#time').attr({
        style: 'color:' + textMainColor + ';font-size:' + clockFontSize + 'em;text-shadow: 0 0 2px ' + textBorderColor + ', 0 0 4px ' + textBorderColor + ',' + '0 0 6px ' + textBorderColor + ', 0 0 8px ' + textGlowColor + ',' + '0 0 10px ' + textGlowColor + ', 0 0 12px ' + textGlowColor + ',' + '0 0 14px ' + textGlowColor + ', 0 0 16px ' + textGlowColor + ';'
    });
    $('#date').attr({
        style: 'color:' + textMainColor + ';' + 'text-shadow: 0 0 2px ' + textBorderColor + ', 0 0 4px ' + textBorderColor + ',' + '0 0 6px ' + textBorderColor + ', 0 0 8px ' + textGlowColor + ',' + '0 0 10px ' + textGlowColor + ', 0 0 12px ' + textGlowColor + ',' + '0 0 14px ' + textGlowColor + ', 0 0 16px ' + textGlowColor + ';'
    });
    $('#nightOrDay').attr({
        style: 'color:' + textMainColor + ';font-size:' + todFontSize + 'em;text-shadow: 0 0 2px ' + textBorderColor + ', 0 0 4px ' + textBorderColor + ',' + '0 0 6px ' + textBorderColor + ', 0 0 8px ' + textGlowColor + ',' + '0 0 10px ' + textGlowColor + ', 0 0 12px ' + textGlowColor + ',' + '0 0 14px ' + textGlowColor + ', 0 0 16px ' + textGlowColor + ';'
    });
    
    if ($('#color-showTimeOfDay').is(":checked")) $("#nightOrDay").show();
    else $("#nightOrDay").hide();
    if ($('#color-showDate').is(":checked")) $("#date").show();
    else $("#date").hide();
}

window.addEventListener('resize', function() {
    isMobile = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) && (isMobile = !0);
});

var bgColor = '#0b0c1c';
var textBorderColor = '#000';
var textMainColor = '#f9ffcb';
var textGlowColor = '#000';
var clockFontSize = 4;
var todFontSize = 2.5;
var random = 0;
var randomPost = 0;
var lastCheck = 0;
var isMobile = !1;
(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) && (isMobile = !0),
$(function() {
    $('#colorLink').click(function() {
        showColorChooser();
    }),
    $('body').click(function(e) {
        let t = e.target.parentNode.id == null ? "" : e.target.parentNode.id;
        $('#color-Chooser').is(':visible') ? ((!e.target.id.includes('color-') && !t.includes("color-")) || e.target.id == 'closeBox') && hideColorChooser() : showColorChooser();
    });
    $('#color-themeSelect').on('change', function() {
        setTheme($(this).val());
    });
    $('#color-clockFontSize').on('change', function() {
        clockFontSize = $(this).val();
        setColors();
    });
    $('#color-todFontSize').on('change', function() {
        todFontSize = $(this).val();
        if (isMobile) todFontSize -= 0.5;
        setColors();
    });    
    $('#color-showTimeOfDay').on('click', function() {
        if ($(this).is(":checked")) $("#nightOrDay").show();
        else $("#nightOrDay").hide();
    });  
    $('#color-showDate').on('click', function() {
        if ($(this).is(":checked")) $("#date").show();
        else $("#date").hide();
    });  
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
    $('#aboutLink').fadeOut(10000, function() {
        $('#aboutLink').hide();
    });

    decodeUrl();
    newTime();
    updateTime();
    hideColorChooser();

    $("a.email > svg > g").attr({fill: textMainColor});
    $("a.twitter > svg > g").attr({fill: textMainColor});
    $("a.github > svg > g").attr({fill: textMainColor});
});
