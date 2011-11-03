$(document).ready(function(){		
    $('#FinanceMain').hide();
		
    $('.toggle').click(function(){
	$('#FinanceMain').toggle("slow");
    });		
				
    var nowOnlyPrice = $('.colors_productprice').text();//Now Only: £376.18 
    var nowOnlyPriceSplit = nowOnlyPrice.split("Now Only: £");//,376.18 
    var orderTotal = nowOnlyPriceSplit[1].replace(/,/g, '');//376.18	
    var rateType = 'finance';
    if (orderTotal >= 2000 && rateType == 'finance'){
	var financeOption = $('#FinanceType [value="ONIF36"]').val();		    
    } else {
	var financeOption = $('#FinanceType').val();		    
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