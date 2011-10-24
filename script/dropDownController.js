
$(document).ready(function()
{    
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
	$('#PaymentMethodTypeDisplay [value="Check by Mail"]').attr('onClick','return create({modal: true})');	
    }
    
    $('#PaymentMethodTypeDisplay').change(function()
    {
	if($('#PaymentMethodTypeDisplay option:selected').html() == 'Finance' && price < 300)
	{
	    alert('Finance is not an option for orders under £300.');
	}
    });    
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
 * Triggers the form with the function is invoked
 * http://api.jquery.com/trigger/
 */
function triggerForm(){    
    $("form:first").trigger("submit");
}

/*
 * Creating new dialogs box that displays Terms and Conditions upon selection finance option
 */
function create(options) {
    //Displays Header in Lightbox
    options = $.extend({
	title: "Dialog"
    }, options || {});
    var dialog = new Boxy("<div><p>Will I qualify for finance? we will only consider your application if:<p> <ul><li>You are over 18 and employed at least 16 hours per week (retired &amp; houseperson applicants welcome)</li><li>You have a good credit history with no late payments, debt relief orders, CCJ's, IVA's or bankruptcies</li><li>You are a permanent UK resident and able to supply a UK address history for the last 3 year</li></ul>" + "<p class='alignCenter marginT20px'><a class='button' onclick='triggerForm();'>Accept</a><a class='button' href='index.html#' onclick='Boxy.get(this).hide(); hideFinanceOption(); displayErrorMessage(); return false'>Decline</a><a class='button' href='index.html#' onclick='Boxy.get(this).hide(); return false'>Cancel</a></p></div>", options);
    dialog.setTitle("Terms and Conditions");    
    return false;
}
function recent() {
    return allDialogs[allDialogs.length-1];
}
function tweenUp() {
    recent().tween(400,400);
}
function tweenDown() {
    recent().tween(100,100);
}


