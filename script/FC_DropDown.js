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
	    if (this.options[this.selectedIndex].value == "Check by Mail"){
		hideCreditCardDetails();
		return create({
		    modal: true
		});
	    } else {
		Choose_PaymentMethodType(this.selectedIndex)
	    }
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
/**
* Checks if all the options are selected on the term and condition
*/
function allCheckBoxSelected(){
    if(($('#over18').attr('checked')) && ($('#goodCredit').attr('checked')) && ($('#ukResident').attr('checked'))){
	selectPayPalOption();//when back button is clicked after form submmited
	triggerForm();
    } else if (($('#over18').attr('checked')) && ($('#goodCredit').attr('checked'))){
	$('.alert').slideDown("slow");
	$('.alert').html( 'Are you a permanent UK resident?');
    } else if (($('#over18').attr('checked')) && ($('#ukResident').attr('checked'))) {
	$('.alert').slideDown("slow");
	$('.alert').html( 'Do you have a good credit history?');
    } else if (($('#goodCredit').attr('checked')) && ($('#ukResident').attr('checked'))) {
	$('.alert').slideDown("slow");
	$('.alert').html('Are you over 18?');
    } else if ($('#over18').attr('checked')){
	$('.alert').slideDown("slow");
	$('.alert').html('Ensure remaining two options are selected!');
    } else if ($('#goodCredit').attr('checked')){
	$('.alert').slideDown("slow");
	$('.alert').html('Ensure remaining two options are selected!');
    } else if ($('#ukResident').attr('checked')){
	$('.alert').slideDown("slow");
	$('.alert').html('Ensure remaining two options are selected!');
    } else {
	$('.alert').slideDown("slow");
	$('.alert').html('Ensure all options are selected!');
    }
}
/*
* Create new dialogs box that displays Terms and Conditions upon the selection of finance option.
*/
function create(options) {
    //Displays Header in Lightbox
    options = $.extend({
	title: "Terms and Conditions"
    }, options || {});
    /**
     *  As boxy dialog is created every user triggers Finance Option, 
     *  Boxy.get(this).hideAndUnload() is used instead of Boxy.get(this).hide() so box is hidden and object is deleted whenever user clicks cancel button
     *  This ensures there is only one copy of a dialog box and correct reference made to the element [such as checkbox] when Finance Option is clicked twice
     */
    new Boxy("<div><p>Please confirm the following:</p><div class='alert error_message messageBoxSmall'>Ensure all options are selected!</div><ul><li><input id='over18' type='checkbox' class='checkbox' />I am over 18 and employed at least 16 hours per week (retired &amp; houseperson applicants welcome)</li><li><input id='goodCredit' type='checkbox' class='checkbox' />I have a good credit history with no late payments, debt relief orders, CCJ's, IVA's or bankruptcies</li><li><input id='ukResident' type='checkbox' class='checkbox'/>I am a permanent UK resident and able to supply a UK address history for the last 3 year</li></ul>" + "<p class='alignCenter marginT20px'><a class='button' href='#' onclick='allCheckBoxSelected();'>Accept and Place Order</a><a class='button' href='index.html#' onclick='Boxy.get(this).hideAndUnload(); hideFinanceOption(); displayErrorMessage(); return false'>Decline</a><a class='button' href='index.html#' onclick='Boxy.get(this).hideAndUnload(); selectPayPalOption(); return false;'>Cancel</a></p></div>", options);        
    return false;
}