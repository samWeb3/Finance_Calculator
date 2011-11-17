/**
 * Finance Calculater Exception handler class
 * http://www.javascriptexamples.org/2011/01/05/how-to-throw-an-exception-in-javascript-2/
 */
function FinanceCalculatorException(message){
    this.name= "fCException";
    this.message = message;
}

/**
 * Finance Calculator for IdealHomeStore['ideal'] and FurnitureOnFinance['furniture']
 * 
 * @param financeOption	    Fiance option selected from <Select> DropDown menu
 * @param orderTotal	    Total Value of money Spent by Customer
 * @param financeDeposit    Finance deposit selected from Discount DropDown menu
 * @param rateType	    'ideal' or 'finance' 
 * @param resetOptions	    Reset the state of the <select> element
 * @param parentElement    parent element of ('.color_productPrice), in case of Finance Cal on product page
 */
function FinanceCalculator(financeOption, orderTotal, financeDeposit, rateType, resetOptions, parentElement){   
    //Furniture on Finance [Placed on page] Rates Band
    this.finance_rateA = ['ONIF6', 'ONIF12', 'ONIB24-19.5', 'ONIB36-19.5'];
    this.finance_rateB = ['ONIF6', 'ONIF12', 'ONIF24', 'ONIB36-19.5'];
    this.finance_rateC = ['ONIF6', 'ONIF12', 'ONIF24', 'ONIF36'];

    //Ideal Home Store [widgets]
    this.ideal_rateA = ['ONIB12-19.5', 'ONIB24-19.5', 'ONIB36-19.5'];
    this.ideal_rateB = ['ONIF6', 'ONIF12', 'ONIB24-19.5', 'ONIB36-19.5'];
    this.ideal_rateC = ['ONIF6', 'ONIF12', 'ONIF24', 'ONIB36-19.5'];
    
    this.financeOption = financeOption;
    this.orderTotal = orderTotal;
    this.financeDeposit = financeDeposit;
    this.fDepositAmount = orderTotal *(financeDeposit/100);
    this.rateType = rateType;
    this.resetOptions = resetOptions; 
    this.parentElement = parentElement;
    
    //Once object is initialized init() method is called to determine bands of rates and generate table for financial calculator
    this.init();
}

/**
 * Switch Rate types: ideal or finance 
 * calls ratesDisplayIdeal() that Filter bands of rate based on orderTotal
 * call generateTable() or ratesDisplayFinance() that displays values on Financial Calculator
 */
FinanceCalculator.prototype.init = function(){
    switch (this.rateType){
	case 'ideal':	    	    
	    this.ratesDisplayIdeal();	    
	    this.generateTable();
	    break;
	case 'finance':	  	 	    
	    this.ratesDisplayFinance();
	    this.generateTable();
	    break;
	case 'productDetails':	   
	    this.ratesDisplayProductDetails();
	    break;	 
	default:
	    throw new FinanceCalculatorException("Invalid Rate Type: [ENTER: ideal, finance or productDetails]!");
	    break;	       
    }
}

/**
 * Filters bands of rates[rateBands] based on the orderTotal for Ideal Home Store
 */
FinanceCalculator.prototype.ratesDisplayIdeal = function(){   
    var rateBands;
    if (this.orderTotal < 500){	
	$('#FinanceMain').hide("slow");
	throw new FinanceCalculatorException("Order Total less than \u00A3500 !");	
    } else if (this.orderTotal >= 500 && this.orderTotal < 1000) {
	$('#FinanceMain').show("slow");
	rateBands = this.ideal_rateA;	
    } else if (this.orderTotal >= 1000 && this.orderTotal < 2000){
	$('#FinanceMain').show("slow");
	rateBands = this.ideal_rateB;		
    } else if (this.orderTotal >= 2000){
	$('#FinanceMain').show("slow");
	rateBands = this.ideal_rateC;		
    }   
    
    if (this.parentElement){
	this.displayBandsProducts(rateBands);
    } else {
	this.displayBands(rateBands);   
    }
}

/**
 * Filters bands of rates Based on the orderTotal for Furniture on Finance
 */
FinanceCalculator.prototype.ratesDisplayFinance = function(){        
    var toggleBar = document.getElementById('WidgetBar');
    var rateBands;
    if (this.orderTotal < 300){
	if (!toggleBar){
	    $('#FinanceMain').hide("slow");
	    throw new FinanceCalculatorException("Order Total less than \u00A3300 !");
	} else {	    
	    $('.toggleBar').html('PLACE ORDER ABOVE <span class="highlight">\u00A3300</span> TO VIEW FINANCE OPTION!');	
	}
    } else if (this.orderTotal >= 300 && this.orderTotal < 1000) {
	if (!toggleBar){
	    $('#FinanceMain').show("slow");    
	}	
	rateBands = this.finance_rateA;	
    } else if (this.orderTotal >= 1000 && this.orderTotal < 2000){
	if (!toggleBar){
	    $('#FinanceMain').show("slow");    
	} 
	rateBands = this.finance_rateB;			
    } else if (this.orderTotal >= 2000){
	if (!toggleBar){
	    $('#FinanceMain').show("slow");    
	} 
	rateBands = this.finance_rateC;		
    }     
    
    if (this.parentElement){
	this.displayBandsProducts(rateBands);
    } else {
	this.displayBands(rateBands);   
    }
}

/**
 * Filters bands of rates Based on the orderTotal for Furniture on Finance
 */
FinanceCalculator.prototype.ratesDisplayProductDetails = function(){        
    var toggleBar = document.getElementById('WidgetBar');
    var rateBands;
    if (this.orderTotal < 0){
	if (!toggleBar){
	    $('#FinanceMain').hide("slow");
	    throw new FinanceCalculatorException("Order Total less than \u00A3300 !");
	} else {	    
	    $('.toggleBar').html('Order Less than <span class="highlight">\u00A30</span>');	
	}
    } else if (this.orderTotal > 0 && this.orderTotal < 1000) {
	if (!toggleBar){
	    $('#FinanceMain').show("slow");    
	}	
	rateBands = this.finance_rateA;	
    } else if (this.orderTotal >= 1000 && this.orderTotal < 2000){
	if (!toggleBar){
	    $('#FinanceMain').show("slow");    
	} 
	rateBands = this.finance_rateB;			
    } else if (this.orderTotal >= 2000){
	if (!toggleBar){
	    $('#FinanceMain').show("slow");    
	} 
	rateBands = this.finance_rateC;		
    }     
    
    if (this.parentElement){
	this.displayBandsProducts(rateBands);
    } else {
	this.displayBands(rateBands);   
    }
}

/**
 * Adds appropriate sets of rates options on the <select> dropdown list
 * 
 * @param rateBands   bands of array filtered from ratesDisplayFinance() or ratesDisplayIdeal()
 */
FinanceCalculator.prototype.displayBands = function(rateBands){
    //Reset the state of <SELECT> element back to original one
    
    $('#FinanceType').html(this.resetOptions);        
    
    /**      
     * Add the bands rate into the value attribute of option in select element
     * Then add the class="makeSafe"
     */
    for (var i in rateBands){
	$("#FinanceType option[value="+rateBands[i]+"]").addClass('makeSafe');
    }
    
    //Remove all option that doesn't have makeSafe class attribute
    $("#FinanceType option:not(.makeSafe)").remove();       
}

/**
 * Adds appropriate sets of rates options on the <select> dropdown list on Product page
 * 
 * @param rateBands   bands of array filtered from ratesDisplayFinance() or ratesDisplayIdeal()
 */
FinanceCalculator.prototype.displayBandsProducts = function(rateBands){       
    
    /**      
     * Add the bands rate into the value attribute of option in select element
     * Then add the class="makeSafe"
     */
    for (var i in rateBands){
	this.parentElement.find("#FinanceType option[value="+rateBands[i]+"]").addClass('makeSafe');
    }
    
    //Remove all option that doesn't have makeSafe class attribute
    this.parentElement.find("#FinanceType option:not(.makeSafe)").remove();       
}

/**
* Use FinanceDetails class API 
* Pass the value to the financial calculator
*/
FinanceCalculator.prototype.generateTable = function(){       
    var financialDetails = new FinanceDetails(this.financeOption, parseFloat(this.orderTotal), parseInt(this.financeDeposit), parseFloat(this.fDepositAmount));   
    $('.fd_price').text("\u00A3" + financialDetails.goods_val);
    $('.fd_deposit_percent').text(financialDetails.d_pc + '%');
    $('.fd_deposit').text("\u00A3" + financialDetails.d_amount);
    $('.fd_loanamount').text("\u00A3" + financialDetails.l_amount);
    $('.fd_terms').text(financialDetails.term + ' months');
    $('.fd_apr').text(financialDetails.apr + '%');
    $('.fd_loanrepay').text("\u00A3" + financialDetails.l_repay);
    $('.fd_loancost').text("\u00A3" + financialDetails.l_cost);
    $('.fd_totalrepay').text("\u00A3" + financialDetails.total);
    $('.fd_monthly').text("\u00A3" + financialDetails.m_inst);
    $('.MonthlyRepay').text("\u00A3" + financialDetails.m_inst);
}

/**
* Use FinanceDetails class API 
* Pass the value to the financial calculator
*/
FinanceCalculator.prototype.returnFinanceOption = function(){   
    var financialDetails = new FinanceDetails(this.financeOption, parseFloat(this.orderTotal), parseInt(this.financeDeposit), parseFloat(this.fDepositAmount));       
    return financialDetails;
}

/*
 * Boxy LightBox Message
 */
function create(options, message) {
    //Displays Header in Lightbox
    options = $.extend({
	title: "Notification"
    }, options || {});
    new Boxy("<div><p>" + message + "</p>" + "<p class='alignCenter marginT20px'><a class='button' href='#' onclick='Boxy.get(this).hideAndUnload(); return false'>OK</a></p></div>", options);      
    return false;
}

