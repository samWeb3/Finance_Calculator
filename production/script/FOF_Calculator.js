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



function calculateMonInst(e){
    if (e && e.keyCode == 13){		    
	document.getElementById('triggerButton').click();
    }
}

// Cross-browser implementation of element.addEventListener()
 function eventListener(evnt, elem, func) {
      if (elem.addEventListener) // W3C DOM
	elem.addEventListener(evnt,func,false);
      else if (elem.attachEvent) { // IE DOM
	var r = elem.attachEvent("on"+evnt, func);
	return r;
      }      
 }