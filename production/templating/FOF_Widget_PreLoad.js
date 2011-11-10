var FinanceWidget = {
    financeOption: 'Select Finance Option1:', 
    financeDeposit: 'Select Deposit:'		
};

//Loading External Template
$.get('production/templating/FinanceCalculator_Widget.html', function(fc){
    $.tmpl(fc, FinanceWidget).appendTo("#Finance_Widget");
});
  