$(document).on("keyup", "[name=grossIncome]", function () {
    var numcheck = $(this).val();
    numcheck = numcheck.replace(/[^0-9\.]/g, '');
    numcheck = addCommas(numcheck);
    $(this).val(numcheck);
});

$('.calculatorbox').on('click','[name=performCalculation]',function() {
    var error = 0;
    $('.grossIncomemsg').hide();

    // check if it's a valid value
    var grossIncome = $('[name=grossIncome]').val();
    grossIncome = grossIncome.replace(/[^0-9\.]/g, '');
    if (!$.isNumeric(grossIncome)) {
        $('.grossIncomemsg').text('Incorrect value for Gross Income');
        $('.grossIncomemsg').show();
        error = 1;
    }

    var per = $('[name=per]').val();

    if (per == 0) { gross = grossIncome * 52; }
    if (per == 1) { gross = grossIncome * 26; }
    if (per == 2) { gross = grossIncome * 12; }
    if (per == 3) { gross = parseFloat(grossIncome); }

    var t1 = 10.5; // Gross Income Less than 14,000
    var t2 = 17.5; // Gross Income from 14,001 to 48,000
    var t3 = 30; // Gross Income from 48,001 to 70,000
    var t4 = 33; // Gross Income 70,001 to 180,000
    var t5 = 39; // Gross Income 180,001 onwards

    tax1 = 0;
    tax2 = 0;
    tax3 = 0;
    tax4 = 0;
    tax5 = 0;
    kiwiSaver = 0;
    studentLoan = 0;
    ietc = 0;

    if(gross <= 14000){
        tax1 = gross * t1 / 100;
    }
        
    if(gross > 14000 && gross <= 48000){
        tax1 = 14000 * t1 / 100;
        tax2 = (gross - 14000) * t2 / 100;
    }

    if(gross>48000 && gross<=70000){
        tax1 = 14000 * t1 / 100;
        tax2 = (48000 - 14000) * t2 / 100;
        tax3 = (gross - 48000) * t3 / 100;
    }

    if(gross > 70000 && gross <= 180000){
        tax1 = 14000 * t1 / 100;
        tax2 =(48000 - 14000) * t2 / 100;
        tax3 =(70000 - 48000) * t3 / 100;
        tax4 =(gross - 70000) * t4 / 100;
    }

    if(gross > 180000) {
        tax1 = 14000 * t1 / 100;
        tax2 =(48000 - 14000) * t2 / 100;
        tax3 =(70000 - 48000) * t3 / 100;
        tax4 =(180000 - 70000) * t4 / 100;
        tax5 =(gross - 180000) * t5 / 100;
    }

    var paye = tax1 + tax2 + tax3 + tax4 + tax5;

    // ACC levy calculation
    // 20230401 adjusted maximum earnings level from $136,544 to $139,384 and the levy rate from $1.46 per $100 to $1.53 per $100.
    if (gross <= 139384) {
        levy = gross * 0.0153;
    } else {
        levy = 139384 * 0.0153;
    }

    var kiwi = $('[name=kiwiSaver]').val();
    kiwiSaver = gross * kiwi;

    var student = $('[name=studentLoan]').val();
    // adjust student loan rate in two places here
    if (gross > 22828 && student == 1) {
        studentLoan = (gross - 22828) * 0.12;
    }

    if(gross >= 24000 && gross <= 48000){
        if(gross >= 24000 && gross <= 44000){
            ietc = 520;
        } else {
            ietc = 520 - ((gross - 44000) * 0.13);
        }
    }

    $('.ietc').text(ietc.toFixed(2));

    var net = gross - paye - levy - kiwiSaver - studentLoan + parseFloat(ietc);

    // Gross Income
    $('.hourGross').text('$' + addCommas((gross / 2080).toFixed(2)));
    $('.dayGross').text('$' + addCommas((gross / 260).toFixed(2)));
    $('.weekGross').text('$' + addCommas((gross / 52).toFixed(2)));
    $('.fortnightGross').text('$' + addCommas((gross / 26).toFixed(2)));
    $('.monthGross').text('$' + addCommas((gross / 12).toFixed(2)));
    $('.quarterGross').text('$' + addCommas((gross / 4).toFixed(2)));
    $('.yearGross').text('$' + addCommas(gross.toFixed(2)));
    //$('.decadeGross').text('$' + addCommas((gross * 10).toFixed(2)));

    // PAYE
    $('.hourPaye').text('$' + addCommas((paye / 2080).toFixed(2)));
    $('.dayPaye').text('$' + addCommas((paye / 260).toFixed(2)));
    $('.weekPaye').text('$' + addCommas((paye / 52).toFixed(2)));
    $('.fortnightPaye').text('$' + addCommas((paye / 26).toFixed(2)));
    $('.monthPaye').text('$' + addCommas((paye / 12).toFixed(2)));
    $('.quarterPaye').text('$' + addCommas((paye / 4).toFixed(2)));
    $('.yearPaye').text('$' + addCommas(paye.toFixed(2)));
    //$('.decadePaye').text('$' + addCommas((paye * 10).toFixed(2)));

    // Levy
    $('.hourAcc').text('$' + addCommas((levy / 2080).toFixed(2)));
    $('.dayAcc').text('$' + addCommas((levy / 260).toFixed(2)));
    $('.weekAcc').text('$' + addCommas((levy / 52).toFixed(2)));
    $('.fortnightAcc').text('$' + addCommas((levy / 26).toFixed(2)));
    $('.monthAcc').text('$' + addCommas((levy / 12).toFixed(2)));
    $('.quarterAcc').text('$' + addCommas((levy / 4).toFixed(2)));
    $('.yearAcc').text('$' + addCommas(levy.toFixed(2)));
    //$('.decadeAcc').text('$' + addCommas((levy * 10).toFixed(2)));

    // KiwiSaver
    $('.hourKiwi').text('$' + addCommas((kiwiSaver / 2080).toFixed(2)));
    $('.dayKiwi').text('$' + addCommas((kiwiSaver / 260).toFixed(2)));
    $('.weekKiwi').text('$' + addCommas((kiwiSaver / 52).toFixed(2)));
    $('.fortnightKiwi').text('$' + addCommas((kiwiSaver / 26).toFixed(2)));
    $('.monthKiwi').text('$' + addCommas((kiwiSaver / 12).toFixed(2)));
    $('.quarterKiwi').text('$' + addCommas((kiwiSaver / 4).toFixed(2)));
    $('.yearKiwi').text('$' + addCommas(kiwiSaver.toFixed(2)));
    //$('.decadeKiwi').text('$' + addCommas((kiwiSaver * 10).toFixed(2)));

    // Student Loan
    $('.hourStudent').text('$' + addCommas((studentLoan / 2080).toFixed(2)));
    $('.dayStudent').text('$' + addCommas((studentLoan / 260).toFixed(2)));
    $('.weekStudent').text('$' + addCommas((studentLoan / 52).toFixed(2)));
    $('.fortnightStudent').text('$' + addCommas((studentLoan / 26).toFixed(2)));
    $('.monthStudent').text('$' + addCommas((studentLoan / 12).toFixed(2)));
    $('.quarterStudent').text('$' + addCommas((studentLoan / 4).toFixed(2)));
    $('.yearStudent').text('$' + addCommas(studentLoan.toFixed(2)));
    //$('.decadeStudent').text('$' + addCommas((studentLoan * 10).toFixed(2)));

    // Net Pay
    $('.hourNet').text('$' + addCommas((net / 2080).toFixed(2)));
    $('.dayNet').text('$' + addCommas((net / 260).toFixed(2)));
    $('.weekNet').text('$' + addCommas((net / 52).toFixed(2)));
    $('.fortnightNet').text('$' + addCommas((net / 26).toFixed(2)));
    $('.monthNet').text('$' + addCommas((net / 12).toFixed(2)));
    $('.quarterNet').text('$' + addCommas((net / 4).toFixed(2)));
    $('.yearNet').text('$' + addCommas(net.toFixed(2)));
    //$('.decadeNet').text('$' + addCommas((net * 10).toFixed(2)));
    $("#div-show-1").css("display","");
    $("#div-show-2").css("display","");
    $("#div-show-3").css("display","");
    if (error != 1) {
        showGraph(paye.toFixed(2), levy.toFixed(2), kiwiSaver.toFixed(2), studentLoan.toFixed(2), net.toFixed(2));
    }
});

function showGraph(paye, levy, kiwiSaver, studentLoan, net) {
    $('.fakechart').remove();
    $("#doughnut-chart").remove();
    $("#chartcanvas").append('<canvas id="doughnut-chart" width="400" height="300"></canvas>');

    Chart.pluginService.register({
        beforeDraw: function (chart) {
            if (chart.config.options.elements.center) {
                //Get ctx from string
                var ctx = chart.chart.ctx;
                
                        //Get options from the center object in options
                var centerConfig = chart.config.options.elements.center;
                var fontStyle = centerConfig.fontStyle || 'Arial';
                        var txt = centerConfig.text;
                var color = centerConfig.color || '#000';
                var sidePadding = centerConfig.sidePadding || 20;
                var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
                //Start with a base font of 30px
                ctx.font = "30px " + fontStyle;
                
                        //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                var stringWidth = ctx.measureText(txt).width;
                var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                // Find out how much the font can grow in width.
                var widthRatio = elementWidth / stringWidth;
                var newFontSize = Math.floor(30 * widthRatio);
                var elementHeight = (chart.innerRadius * 2);

                // Pick a new font size so it will not be larger than the height of label.
                var fontSizeToUse = Math.min(newFontSize, elementHeight);

                //Set font settings to draw it correctly.
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                ctx.font = fontSizeToUse+"px " + fontStyle;
                ctx.fillStyle = color;
                
                //Draw text in center
                ctx.fillText(txt, centerX, centerY);
            }
        }
    });

    var config = {
        type: 'doughnut',
        data: {
            labels: [
                "PAYE Tax",
                "ACC",
                "KiwiSaver",
                "Student Loan",
                "Net Pay"
            ],
            datasets: [{
                data: [paye, levy, kiwiSaver, studentLoan, net],
                backgroundColor: [
                    "#24dc9a",
                    "#c45850",
                    "#ff6347",
                    "#8e5ea2",
                    "#1e73be"
                ],
                hoverBackgroundColor: [
                    "#24dc9a",
                    "#c45850",
                    "#ff6347",
                    "#8e5ea2",
                    "#1e73be"
                ]
             }]
        },
        options: {
            elements: {
                center: {
                    text: '$' + addCommas(net),
                    color: '#1e73be', // Default is #000000
                    fontStyle: 'Lato', // Default is Arial
                    sidePadding: 20 // Default is 20 (as a percentage)
                }
            },
            tooltips: {
              callbacks: {
                    label: function(tooltipItem, data) {
                        var value = data.datasets[0].data[tooltipItem.index];
                        if(parseInt(value) >= 1000){
                                   return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                } else {
                                   return '$' + value;
                                }
                    }
              } // end callbacks:
            }, //end tooltips 
        }
    };

    var ctx = document.getElementById("doughnut-chart").getContext("2d");
    var myChart = new Chart(ctx, config);
}

// add commas to amount
function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    formattedamount = x1 + x2
    return formattedamount;
}