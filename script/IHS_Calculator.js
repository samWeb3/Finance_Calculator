$(document).ready(function(){	
    $('.price_entry').focus().select();  
    
    var rateType = 'ideal';
    var resetOptions = $('#FinanceType').html(); //saves the original state of the <select> element
		
    //If calculate button clicked
    $('.view_finance').click(function(){
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

    //add onKeyPress attribute on input field
    $('.price_entry').attr('onKeyPress', 'calculateMonInst(event)');    
    $('#triggerButton').attr('onClick', 'addFocusOKButton()');
    
});

  
/**
 * When Enter key is pressed on Price Entry Input box, Calculate button is invoked!
 */
function calculateMonInst(e){
    if (e && e.keyCode == 13){
	//If browser is not IE invoke Calculate click button
	//In ie Calculate button is already set to focus
	if (!$.browser.msie){
	    $('#triggerButton').click();//invoke calculate button			  
	}
	
	//Set a focus on text box
	    $('.price_entry').select().focus(); //works on all browser, not is IE

	    /**
	     * Unlike FireFox, IE run the focus() method before the textbox render properly. 
	     * Because Javascript is put after textbox we need to delay the focus execute time 
	     * using setTimeout() function.
	     * 
	     * http://www.mkyong.com/javascript/focus-is-not-working-in-ie-solution/
	     */	
	    setTimeout(function() {
		$('.price_entry').focus();
	    }, 10); //IE fix: focus time delay
	
	addFocusOKButton();	
    }
}

/**
 * Adding foucs on OK Button, so when Enter is presed on keyboard
 * another pop-up dialog doesn't appear while Boxy Dialog box is open
 */
function addFocusOKButton(){ //set a focus on ok button    
    var boxyOKButton = $('.boxy-content .button');
    if (boxyOKButton){	
	boxyOKButton.focus();//firefox
	setTimeout(function() {
	    boxyOKButton.focus();
	}, 10); //IE fix 	
    }    
}
