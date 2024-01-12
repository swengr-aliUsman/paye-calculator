<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

    <style>
        .head-income{
            font-size: 20px;
            font-weight: 500;
        }
        .val-income{
            font-size: 30px;
            font-weight: 600;
            color: #1e73be;
        }
        .main-div-flex-div{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .border{
            border: 1px solid #1e73be;
            padding: 10px;
        }
        @media(max-width:500px){
            .container.grid-container {
                padding: 0;
                margin: 0;
                width: 100%;
            }
        }
    </style>
</head>
    <div class="container grid-container">


        <div class="mt-3 mb-3 calculatorbox border p-4">
                <!-- KiwiSaver Field -->
                <label>Are you enrolled in KiwiSaver?</label>
                <select class="form-control" name="kiwiSaver">
                    <option value="0">No</option>
                    <option value="0.02">Yes 2%</option>
                    <option value="0.03">Yes 3%</option>
                    <option value="0.04">Yes 4%</option>
                    <option value="0.06">Yes 6%</option>
                    <option value="0.08">Yes 8%</option>
                    <option value="0.10">Yes 10%</option>
                </select>

                <!-- Student Loan Field -->
                <label class="mt-1">Do you have a Student Loan?</label>
                <select class="form-control" name="studentLoan">
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>

                <!-- Loan Term Field -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="col-sm-6">
                                <label class="mt-1">Gross Income</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">$</span>
                                    </div>
                                    <input type="text" class="form-control" name="grossIncome">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label class="mt-1">Per</label>
                                <select class="form-control" name="per">
                                    <option value="0">Week</option>
                                    <option value="1">Fortnight</option>
                                    <option value="2">Month</option>
                                    <option value="3" selected="">Year</option>
                                </select>
                            </div>
                        </div>
                        <div class="grossIncomemsg fontred fontbold" style="display: none;"></div>
                    </div>
                </div>

                <!-- Calculate Button -->
                <div class="text-center mt-4"><input type="submit" class="btn btn-success" name="performCalculation" value="Calculate" id="performCalculation"></div>
            </div>
            <div class="col-sm-5 m-auto text-center"  id="div-show-3" style="display:none">
                    <h4>
                        PAYE Income Results
                    </h4>
                </div>
            <div class="col-sm-12 row m-auto text-center main-div-flex-div mb-5" id="div-show-1" style="display:none">
                
                <div class="col-sm-3 p-2 bg-light m-4 border">
                    <span class="head-income">
                        Hour
                    </span>
                    <br><br>
                    <span class="val-income hourNet">

                    </span>
                </div>
                <div class="col-sm-3 p-2 bg-light m-4 border">
                    <span class="head-income">
                        Day
                    </span>
                    <br><br>
                    <span class="val-income dayNet">

                    </span>
                </div>
                <div class="col-sm-3 p-2 bg-light m-4 border">
                    <span class="head-income">
                        Week
                    </span>
                    <br><br>
                    <span class="val-income weekNet">

                    </span>
                </div>
                <div class="col-sm-3 p-2 bg-light m-4 border">
                    <span class="head-income">
                        Fortnight
                    </span>
                    <br><br>
                    <span class="val-income fortnightNet">

                    </span>
                </div>
                <div class="col-sm-3 p-2 bg-light m-4 border">
                    <span class="head-income">
                        Month
                    </span>
                    <br><br>
                    <span class="val-income monthNet">

                    </span>
                </div>
                <div class="col-sm-3 p-2 bg-light m-4 border">
                    <span class="head-income">
                        Quarter
                    </span>
                    <br>
                    <br>
                    <span class="val-income quarterNet">

                    </span>
                </div>
                <div class="col-sm-3 p-2 bg-light m-4 border">
                    <span class="head-income">
                        Year
                    </span>
                    <br><br>
                    <span class="val-income yearNet">

                    </span>
                </div>  
                
            </div>
            <!-- Charts and Results -->
        <div class=" col-sm-12 font12 mb-4 font10mobile" id="div-show-2" style="display:none">
            <div class="col-sm-6 m-auto">
                <div class="fakechart">
                    $0
                </div>
                <div id="chartcanvas" class="marcenter mb-4">
                    <!--<canvas id="doughnut-chart" width="800" height="450"></canvas>-->
                </div>
            </div>

            <h4 class="text-center mt-4">PAYE Income Breakdown</h4>

            <div class="font14 fontbold mb-1 text-center">Independent Tax Earner Credit (IETC) Applicable: $<span class="ietc">0.00</span></div>

            <div class="table-responsive mt-4">
                <table class="table table-striped table-hover text-right">
                    <thead>
                        <tr>
                            <th></th>
                            <th>GROSS</th>
                            <th>PAYE</th>
                            <th>ACC</th>
                            <th>KIWI</th>
                            <th>STUDENT</th>
                            <th>NET PAY</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-left"><strong>Hour</strong></td>
                            <td class="hourGross"></td>
                            <td class="hourPaye"></td>
                            <td class="hourAcc"></td>
                            <td class="hourKiwi"></td>
                            <td class="hourStudent"></td>
                            <td class="hourNet"></td>
                        </tr>
                        <tr>
                            <td class="text-left"><strong>Day</strong></td>
                            <td class="dayGross"></td>
                            <td class="dayPaye"></td>
                            <td class="dayAcc"></td>
                            <td class="dayKiwi"></td>
                            <td class="dayStudent"></td>
                            <td class="dayNet"></td>
                        </tr>
                        <tr class="week">
                            <td class="text-left"><strong>Week</strong></td>
                            <td class="weekGross"></td>
                            <td class="weekPaye"></td>
                            <td class="weekAcc"></td>
                            <td class="weekKiwi"></td>
                            <td class="weekStudent"></td>
                            <td class="weekNet"></td>
                        </tr>
                        <tr>
                            <td class="text-left"><strong>Fortnight</strong></td>
                            <td class="fortnightGross"></td>
                            <td class="fortnightPaye"></td>
                            <td class="fortnightAcc"></td>
                            <td class="fortnightKiwi"></td>
                            <td class="fortnightStudent"></td>
                            <td class="fortnightNet"></td>
                        </tr>
                        <tr>
                            <td class="text-left"><strong>Month</strong></td>
                            <td class="monthGross"></td>
                            <td class="monthPaye"></td>
                            <td class="monthAcc"></td>
                            <td class="monthKiwi"></td>
                            <td class="monthStudent"></td>
                            <td class="monthNet"></td>
                        </tr>
                        <tr>
                            <td class="text-left"><strong>Quarter</strong></td>
                            <td class="quarterGross"></td>
                            <td class="quarterPaye"></td>
                            <td class="quarterAcc"></td>
                            <td class="quarterKiwi"></td>
                            <td class="quarterStudent"></td>
                            <td class="quarterNet"></td>
                        </tr>
                        <tr>
                            <td class="text-left"><strong>Year</strong></td>
                            <td class="yearGross"></td>
                            <td class="yearPaye"></td>
                            <td class="yearAcc"></td>
                            <td class="yearKiwi"></td>
                            <td class="yearStudent"></td>
                            <td class="yearNet"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
    <script src="script.js"></script>
</body>
</html>