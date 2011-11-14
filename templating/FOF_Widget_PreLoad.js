var FinanceWidget = {
    financeOption: 'Select Finance Option:', 
    financeDeposit: 'Select Deposit:'		
};

//Loading External Template
$.get('production/templating/FinanceCalculator_Widget.html', function(fc){
    $.tmpl(fc, FinanceWidget).appendTo("#Finance_Widget");
});
  