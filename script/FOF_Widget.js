$(document).ready(function(){	
    $('#Finance_Widget').html('<div id="FinanceCalculator"><div id="WidgetBar"><div class="toggleBar">BUY FROM ONLY <span class="MonthlyRepay">£0</span> PER MONTH. <strong class="toggle">FIND OUT MORE</strong></div></div><div id="FinanceMain" class="group"><div id="fc_leftColumn"><label>Select Finance Option:</label><br><select id="FinanceType"><option value="ONIF6">6 Months Interest Free Credit</option><option value="ONIB6-19.5">6 Months Classic Credit</option><option value="ONIF12">12 Months Interest Free Credit</option><option value="ONIB12-19.5">12 Months Classic Credit</option><option value="ONIF24">24 Months Interest Free Credit</option><option value="ONIB24-19.5">24 Months Classic Credit</option><option value="ONIF36">36 Months Interest Free Credit</option><option value="ONIB36-19.5" SELECTED>36 Months Classic Credit</option></select><ul><li>Price</li><li>Deposit(%)</li><li>Deposit(£)</li><li>Loan Amount</li><li>Term Agreement</li><li>APR</li><li>Loan Repayment</li><li>Cost of Loan</li><li>Total Amount</li><li class="repayment_value">Monthly Installment</li></ul></div><div id="fc_rightColumn"><label>Select Deposit:</label><br><select id="FinanceDeposit"><option value="10" class="deposit10">10%</option><option value="20" class="deposit20">20%</option><option value="30" class="deposit30">30%</option><option value="40" class="deposit40">40%</option><option value="50" class="deposit50">50%</option></select><ul><li class="fd_price"></li><li class="fd_deposit_percent"></li><li class="fd_deposit"></li><li class="fd_loanamount"></li><li class="fd_terms"></li><li class="fd_apr"></li><li class="fd_loanrepay"></li><li class="fd_loancost"></li><li class="fd_totalrepay"></li><li class="fd_monthly repayment_value"></li></ul></div></div></div>');
    
    $('#FinanceMain').hide();
    
    $('.toggle').hover(function(){$(this).addClass('toggleHover')}, function(){$(this).removeClass('toggleHover')});
		
    $('.toggle').click(function(){	
	$('#FinanceMain').toggle("slow");	
    });	    
				
    var nowOnlyPrice = $('.colors_productprice').text();//Now Only: £376.18 
    var nowOnlyPriceSplit = nowOnlyPrice.split("Now Only: £");//,376.18 
    var orderTotal = nowOnlyPriceSplit[1].replace(/,/g, '');//376.18	
    var rateType = 'finance';
    var financeOption;
    if (orderTotal >= 2000 && rateType == 'finance'){	
	financeOption = $('#FinanceType [value="ONIF36"]').val();		    
    } else {
	financeOption = $('#FinanceType').val();		    
    }		
    var financeDeposit =  $('#FinanceDeposit').val();		
    var resetOptions = $('#FinanceType').html(); //save the state of the <select> element
		
    try {
	new FinanceCalculator(financeOption, orderTotal, financeDeposit, rateType, resetOptions); 		    
    } catch (e){
	if (e.name == 'fCException')
	{
	    return create({
		modal: true
	    }, e.message);
	}
    }
		
    //if dropdown menu selected
    $('#FinanceType, #FinanceDeposit').change(function(){		    
	var financeOption = $('#FinanceType').val();			    
	var nowOnlyPrice = $('.colors_productprice').text();
	var nowOnlyPriceSplit = nowOnlyPrice.split("Now Only: £");
	var orderTotal = nowOnlyPriceSplit[1].replace(/,/g, '');
	var financeDeposit =  $('#FinanceDeposit').val();		    		
		
	try {
	    //No need to pass resetOption to a constructor when calculating from the <select> dropdown box itself.
	    new FinanceCalculator(financeOption, orderTotal, financeDeposit, rateType); 
	} catch (e){
	    if (e.name == 'fCException')
	    {
		return create({
		    modal: true
		}, e.message);
	    }
	}
    });		       
});