$(document).ready(function(){		
    var rateType = 'finance';
    var resetOptions = $('#FinanceType').html(); //saves the original state of the <select> element		
		
    //If calculate button clicked
    $('.view_finance').click(function(){
	var financeOption = $('#FinanceType').val();	    
	var orderTotal = $('.price_entry').val();
		    		    
	var financeDeposit =  $('#FinanceDeposit').val();		    
		    		
	try {			
	    new FinanceCalculator(financeOption, orderTotal, financeDeposit, rateType, resetOptions); 
	    //trigger button twice to overcome small bug For e.g. enter 3000 and cal without following line
	    document.getElementById('triggerButton').click();			
	} catch (e){
	    if (e.name == 'fCException')
	    {
		return create({
		    modal: true
		}, e.message);
	    }
	}
    });		
		
    //if dropdown menu selected
    $('#FinanceType, #FinanceDeposit').change(function(){		    
	var financeOption = $('#FinanceType').val();		    
	var orderTotal = $('.price_entry').val();		    
	var financeDeposit =  $('#FinanceDeposit').val();		    		    
		    		    
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
    });
		
    /**
     * Note: Place this code at the bottom. 
     * If palced on the top, calculate button may not respond when page refreshed with orderTotal value less than 300. 
     * Because of the exception terminating the code
     */
    var financeOption = $('#FinanceType').val();		
    var orderTotal = $('.price_entry').val();		
    var financeDeposit =  $('#FinanceDeposit').val();
		
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
});