var FinanceWidget = {
    financeOption: 'Select Finance Option1:', 
    financeDeposit: 'Select Deposit:'		
};

//$("#financeCalculator_widget").tmpl(FinanceWidget).appendTo("#Finance_Widget" );
	
//Loading External Template
$.get('production/templating/FinanceCalculator_Widget.html', function(fc){
    $.tmpl(fc, FinanceWidget).appendTo("#Finance_Widget");
});
  
$(document).ready(function() {
    
    var nowOnlyPrice = $('.colors_productprice').text();//Now Only: £376.18 	        
    var nowOnlyPriceSplit = nowOnlyPrice.split("Now Only: £");//,376.18 
    var orderTotal = nowOnlyPriceSplit[1].replace(/,/g, '');//376.18		    
    var rateType = 'finance';	    	    
    var financeDeposit = $('#FinanceDeposit').val();
    
    var financeOption;
    if (orderTotal >= 2000 && rateType == 'finance'){
	financeOption = $('#FinanceType [value="ONIF36"]').val();
	
    } else {
	financeOption = $('#FinanceType').val();	
    }
	    
    var resetOptions = $('#FinanceType').html(); //save the state of the <select> element
    	    
    try{
	var fc = new FinanceCalculator(financeOption, orderTotal, financeDeposit, rateType, resetOptions);
    } catch (e){
	if (e.name == 'fCException')
	{
	    return create({
		modal: true
	    }, e.message);
	}
    }
    var f_details = fc.returnFinanceOption();   
    var f_data = {
	fd_price: "\u00A3" + f_details.goods_val,
	fd_deposit_percent: "\u00A3" + f_details.d_pc,
	fd_deposit_Amount: "\u00A3" + f_details.d_amount,
	fd_loan_amount: "\u00A3" + f_details.l_amount,
	fd_terms: f_details.term + "months", 
	fd_apr: f_details.apr + "%",
	fd_loanrepay: "\u00A3" + f_details.l_repay, 
	fd_loancost: "\u00A3" + f_details.l_cost, 
	fd_totalrepay: "\u00A3" + f_details.total, 
	fd_monthly: "\u00A3" + f_details.m_inst,
	monthly_repay: "\u00A3" + f_details.m_inst		
    };
	    
    // $("#FinanceCalculator_Values").tmpl(f_data).appendTo("#fc_values" );
	
    $.get('production/templating/FinanceCalculator_Values.html', function(fcv){
	$.tmpl(fcv, f_data).appendTo("#fc_values");
    });
	  
    $('#FinanceMain').hide();

    $('.toggle').hover(function(){$(this).addClass('toggleHover')}, function(){$(this).removeClass('toggleHover')});

    $('.toggle').click(function(){
	$('#FinanceMain').toggle("slow");
    });
	    
    //if dropdown menu selected
    $('#FinanceType, #FinanceDeposit').change(function(){		
	var financeOption = $('#FinanceType').val();			    
	var nowOnlyPrice = $('.colors_productprice').text();
	var nowOnlyPriceSplit = nowOnlyPrice.split("Now Only: £");
	var orderTotal = nowOnlyPriceSplit[1].replace(/,/g, '');
	var financeDeposit =  $('#FinanceDeposit').val();		    		

	try {
	    //No need to pass resetOption to a constructor when calculating from the <select> dropdown box itself.
	    var fc = new FinanceCalculator(financeOption, orderTotal, financeDeposit, rateType); 
	    fc.generateTable();
		    
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