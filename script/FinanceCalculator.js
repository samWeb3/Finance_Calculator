/**
 * Finance Calculator for IdealHomeStore['ideal'] and FurnitureOnFinance['furniture']
 * 
 * @param string financeOption	    Fiance Option Selected from Select DropDown menu
 * @param int	 orderTotal	    Total Value of money Spent by Customer
 * @param int	 financeDeposit	    Finance Deposit selected from Discount DropDown menu
 * @param string	rateType		    'ideal' or 'finance' 
 */
function FinanceCalculator(financeOption, orderTotal, financeDeposit, rateType){
   
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
    
    //Once object is initialized called init() method to determing bands of rates and generateTable for financial calculator
    this.init();
}

/**
 * Switch Rate types ideal or finance 
 * calls ratesDisplayIdeal() that Filter bands of rate based on orderTotal
 * call generateTable() that displays values on Financial Calculator
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
	 default:
	 alert ("Invalid Rate Type: [ENTER: ideal OR finance]!");
	 break;	       
    }
}

/**
 * Filters bands of rates[rateBands]  based on the orderTotal for Ideal Home Store
 */
FinanceCalculator.prototype.ratesDisplayIdeal = function(){   
    if (this.orderTotal < 500){	
	$('#FinanceMain').hide("slow");
	throw new FinanceCalculatorException("Order Total less than \u00A3500 !");
    } else if (this.orderTotal >= 500 && this.orderTotal < 1000) {
	$('#FinanceMain').show("slow");
	var rateBands = this.ideal_rateA;	
    } else if (this.orderTotal >= 1000 && this.orderTotal < 2000){
	$('#FinanceMain').show("slow");
	var rateBands = this.ideal_rateB;	
    } else if (this.orderTotal >= 2000){
	$('#FinanceMain').show("slow");
	var rateBands = this.ideal_rateC;	
    }
    
    this.displayBands(rateBands);
}

/**
 * Filters bands of rates Based on the orderTotal for Furniture on Finance
 */
FinanceCalculator.prototype.ratesDisplayFinance = function(){        
    var toggleBar = document.getElementById('WidgetBar');
    
    if (this.orderTotal < 300){			
	$('.toggleBar').html('PLACE ORDER ABOVE <span class="highlight">\u00A3300</span> TO VIEW FINANCE OPTION!');	
	if (!toggleBar){
	    $('#FinanceMain').hide("slow");
	    throw new FinanceCalculatorException("Order Total less than \u00A3300 !");
	} 
    } else if (this.orderTotal >= 300 && this.orderTotal < 1000) {
	if (!toggleBar){
	    $('#FinanceMain').show("slow");    
	}	
	var rateBands = this.finance_rateA;		
    } else if (this.orderTotal >= 1000 && this.orderTotal < 2000){
	if (!toggleBar){
	    $('#FinanceMain').show("slow");    
	}
	var rateBands = this.finance_rateB;		
    } else if (this.orderTotal >= 2000){
	if (!toggleBar){
	    $('#FinanceMain').show("slow");    
	}
	var rateBands = this.finance_rateC;	
    }
    //pass bands of array
    this.displayBands(rateBands);   
}

/**
 * DisplayBands adds appropriate sets of rates options on the <select> dropdown list
 * 
 *  @param array rateBands	    rateBands of array filtered from IF statements in  ratesDisplayFinance()
 */
FinanceCalculator.prototype.displayBands = function(rateBands){
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



/*
 * Boxy LightBox Message
 */
function create(options, message) {
    //Displays Header in Lightbox
    options = $.extend({
	title: "Notification"
    }, options || {});
    var dialog = new Boxy("<div><p>" + message + ".</p>" + "<p class='alignCenter marginT20px'><a class='button' href='#' onclick='Boxy.get(this).hide(); return false'>OK</a></p></div>", options);      
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
