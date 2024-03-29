$(document).ready(function()
{  
    /* Add message div if it doesn't exist*/
    var message = document.getElementById('#message');
    if (!message){	
	$('#v65-onepage-ShippingCost').append('<tr><td colspan="2"><div id="message"></div></td></tr>'); 
    }       
    $('#v65-checkout-payment-header').hide();    
    
    var price = $('.pricecolor').text();
    price = jQuery.trim(price);    
    price = price.substr(1);
    
    if(price < 300)
    {	
	hideFinanceOption();
    }
    else
    {	
	displayFinanceOption();	
	//Not supported IE < 9
	//$('#PaymentMethodTypeDisplay [value="Check by Mail"]').attr('onClick','return create({modal: true})');	
	//Not Supported IE < 8
	//$('#PaymentMethodTypeDisplay').attr('onChange','if (this.options[this.selectedIndex].value == "Check by Mail"){ hideCreditCardDetails(); return create({modal: true}); } else { Choose_PaymentMethodType(this.selectedIndex)}' );
	
	//Supported IE 7, 8, 9
	$('#PaymentMethodTypeDisplay').change(function(){
	    if (this.options[this.selectedIndex].value == "Check by Mail"){ hideCreditCardDetails(); return create({modal: true}); } else { Choose_PaymentMethodType(this.selectedIndex)}
	});	
    }    
});
/**
 * Hides the finance option from the SELECT dropdown menu
 */
function hideFinanceOption(){
    $('#PaymentMethodTypeDisplay [value="Check by Mail"]').remove();
}
/**
 * Display finance option on the SELECT dropdown menu
 */
function displayFinanceOption(){
    $('#PaymentMethodTypeDisplay [value="Check by Mail"]').show();
}
/**
 * Display custom message
 */
function displayErrorMessage(){
    display = document.getElementById("message");
    display.innerHTML = "<div class='error_message messageBox'>Not qualified for finance option!</div>";
}
/**
 * Triggers the form with the function is invoked * 
 */
function triggerForm(){    
    $("#v65-onepage-CheckoutForm").trigger("submit");
}
/**
 * When cancel option selected on boxy lightbox
 */
function selectPayPalOption(){    
    $('#PaymentMethodTypeDisplay [value="PayPal"]').attr('selected', 'selected');
}
/**
 * Hide credit card details section if already shown
 */
function hideCreditCardDetails(){
    $('#span_paymentfields_credit_card').hide();
}

/*
 * Create new dialogs box that displays Terms and Conditions upon the selection of finance option.
 */
function create(options) {
    //Displays Header in Lightbox
    options = $.extend({
	title: "Terms and Conditions"
    }, options || {});
    new Boxy("<div><p>Will I qualify for finance? we will only consider your application if:<p> <ul><li>You are over 18 and employed at least 16 hours per week (retired &amp; houseperson applicants welcome)</li><li>You have a good credit history with no late payments, debt relief orders, CCJ's, IVA's or bankruptcies</li><li>You are a permanent UK resident and able to supply a UK address history for the last 3 year</li></ul>" + "<p class='alignCenter marginT20px'><a class='button' onclick='triggerForm();'>Accept</a><a class='button' href='index.html#' onclick='Boxy.get(this).hide(); hideFinanceOption(); displayErrorMessage(); return false'>Decline</a><a class='button' href='index.html#' onclick='Boxy.get(this).hide(); selectPayPalOption(); return false'>Cancel</a></p></div>", options);    
    return false;
}
