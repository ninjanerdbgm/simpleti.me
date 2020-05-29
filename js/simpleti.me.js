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

function setTheme(a) {
    switch (a) {
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

function newRandom(a) {
    if (lastCheck != a.getMinutes() && (a.getMinutes() % 3 == 0)) {
        random = Math.floor(Math.random() + 2);
        randomPost = Math.floor(Math.random() * 10);
        lastCheck = a.getMinutes();
    }
}

function encodeUrl(d, e, f, g, h, i, j, k) {
    let a = window.location.href;
    let b = '';
    a.indexOf('/?') != -1 && (b = a.split('?')[1]);
    let c = btoa(d.replace('#', '')) + 'a246' + btoa(e.replace('#', '')) + 'b246' + btoa(f.replace('#', '')) + 'c246' + btoa(g.replace('#', '')) + 'd246' + btoa(h.toString()) + 'e246' + btoa(i.toString()) + 'f246' + btoa(j.toString()) + 'g246' + btoa(k.toString());
    if (!window.location.protocol.includes("file:")) {
        b.includes(c) || window.history.pushState({
            where: 'simpleti.me'
        }, 'simpleti.me', '/?' + c);
    }
}

function decodeUrl() {
    let f = window.location.href;
    if (f.indexOf('/?') != -1) {
        let a = f.split('?')[1];
        let b = a.split('a246')[0];
        let c = a.split('a246')[1].split('b246')[0];
        let d = a.split('b246')[1].split('c246')[0];
        let e = a.split('c246')[1].split('d246')[0];
        let g = a.split('d246')[1].split('e246')[0];
        let h = a.split('e246')[1].split('f246')[0];
        let i = a.split('f246')[1].split('g246')[0];
        let j = a.split('g246')[1];
        b = '#' + atob(b);
        c = '#' + atob(c);
        d = '#' + atob(d);
        e = '#' + atob(e);
        g = atob(g);
        h = atob(h);
        i = atob(i);
        j = atob(j);
        bgColor = b;
        textMainColor = c;
        textBorderColor = d;
        textGlowColor = e;
        clockFontSize = g;
        todFontSize = h;      
        $("#color-clockFontSize").val(g);
        $("#color-todFontSize").val(h);
        $('#color-showTimeOfDay').prop("checked", i === "true");
        $('#color-showDate').prop("checked", j === "true");
        setColors();
    }
}

function newTime() {
    var b = new Date();
    newRandom(b);
    encodeUrl(bgColor, textMainColor, textBorderColor, textGlowColor, clockFontSize, todFontSize, $('#color-showTimeOfDay').is(":checked"), $('#color-showDate').is(":checked"));
    var v = 'ish';
    var w = ['twelve', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];
    let x = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    var d = ['almost ', 'approaching ', 'nearly '];
    var e = ['til', 'past'];
    var c = randomPost > 4 ? ' or so' : v;
    var a = b.getMinutes();
    var f = b.getMinutes() > 30 ? 0 : 1;
    var g = w[b.getHours() % 12];
    var h = w[(b.getHours() + 1) % 12];
    var j = 'five ' + e[f] + ' ' + g;
    var k = 'ten ' + e[f] + ' ' + g;
    var l = 'a quarter ' + e[f] + ' ' + g;
    var m = 'twenty ' + e[f] + ' ' + g;
    var n = 'twenty-five ' + e[f] + ' ' + g;
    var o = 'half past ' + g;
    var p = 'thirty-five after ' + g;
    var q = 'twenty ' + e[f] + ' ' + h;
    var r = 'a quarter ' + e[f] + ' ' + h;
    var s = 'ten ' + e[f] + ' ' + h;
    var t = 'five ' + e[f] + ' ' + h;
    let u = a >= 38;
    var y = function() {
        return a == 0 ? g : a == 5 ? j : a == 10 ? k : a == 15 ? l : a == 20 ? m : a == 25 ? n : a == 30 ? o : a == 35 ? p : a == 40 ? q : a == 45 ? r : a == 50 ? s : a == 55 ? t : a < 2 ? g.replace('ive', 'iv').replace('ine', 'in') + v : a < 5 ? d[random] + j + c : a < 8 ? (j + c).replace('fiveish', 'fivish') : a < 10 ? d[random] + k : a < 13 ? k + c : a < 15 ? d[random] + l : a < 18 ? l + c : a < 20 ? d[random] + m : a < 23 ? m + c : a < 25 ? d[random] + n : a < 28 ? n + c : a < 30 ? d[random] + o : a < 33 ? o + c : a < 35 ? d[random] + p : a < 38 ? (p + c).replace('fiveish', 'fivish') : a < 40 ? d[random] + q : a < 43 ? q + c : a < 45 ? d[random] + r : a < 48 ? r + c : a < 50 ? d[random] + s : a < 13 ? s + c : a < 55 ? d[random] + t : a < 13 ? (t + c).replace('fiveish', 'fivish') : a < 60 ? d[random] + h + c : void 0;
    };
    var i = '';
    b.getHours() <= 11 || b.getHours() == 23 && u ? i = ' in the morning.' : b.getHours() == 16 && u ? i = ' at night.' : b.getHours() > 11 && b.getHours() < 17 || b.getHours() == 11 && u ? i = ' in the afternoon.' : i = ' at night.';
    let z = function(a) {
        if (a > 3 && a < 21)
            return 'th';
        switch (a % 10) {
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
    let A = 'on the ' + b.getDate() + z(b.getDate) + ' of ' + x[b.getMonth()] + ', ' + b.getFullYear();
    $('#time').html(y());
    $('#date').html(A);
    $('#nightOrDay').html(i);
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
    $('body').click(function(a) {
        let t = a.target.parentNode.id == null ? "" : a.target.parentNode.id;
        $('#color-Chooser').is(':visible') ? ((!a.target.id.includes('color-') && !t.includes("color-")) || a.target.id == 'closeBox') && hideColorChooser() : showColorChooser();
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
        change: function(a) {
            bgColor = a.toHexString();
            setColors();
            $("#color-Chooser").show();
        },
        beforeShow: function(a) {
            bgColor = a.toHexString(),
            setColors();
        },
        move: function(a) {
            bgColor = a.toHexString(),
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
        change: function(a) {
            textBorderColor = (a == null || a._a == 0) ? "transparent" : a.toHexString(),
            setColors();
            $("#color-Chooser").show();
        },
        beforeShow: function(a) {
            textBorderColor = (a == null || a._a == 0) ? "transparent" : a.toHexString(),
            setColors();
        },
        move: function(a) {
            textBorderColor = (a == null || a._a == 0) ? "transparent" : a.toHexString(),
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
        change: function(a) {             
            textGlowColor = (a == null || a._a == 0) ? "transparent" : a.toHexString(),
            setColors();
            $("#color-Chooser").show();
        },
        beforeShow: function(a) {
            textGlowColor = (a == null || a._a == 0) ? "transparent" : a.toHexString(),
            setColors();
        },
        move: function(a) {
            textGlowColor = (a == null || a._a == 0) ? "transparent" : a.toHexString(),
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
        change: function(a) {
            textMainColor = a.toHexString(),
            setColors();
            $("#color-Chooser").show();
        },
        beforeShow: function(a) {
            textMainColor = a.toHexString(),
            setColors();
        },
        move: function(a) {
            textMainColor = a.toHexString(),
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
