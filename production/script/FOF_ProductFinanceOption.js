$(document).ready(function(){
    //iterates over each $('.colors_productprice') elements
    $('.colors_productprice').each(function(){
	//Get the text inside the element Split the text "Now Only: £" from it
	var nowOnlySplit = $(this).text().split("Now Only: £");
	//replace (,) with space
	var nowOnlyPrice = nowOnlySplit[1].replace(/,/g, '');		    		    
		
	//add new attribute 'value' inside each element
	$(this).attr('value', nowOnlyPrice);
		    
	//If value of an element '.colors_productprice' is over over 300
	if (nowOnlyPrice > 300){
	    /*
	     ** $(this).parents('td.v65-productDetailInfo'): select parent element of ('.color_productPrice) and assign it to var
	     */			
	    var parentElement = $(this).parents('td.v65-productDetailInfo');				
			
	    /**
	     * 1. selects the parent element 'td.v65-productDetailInfo' of each '.colors_productprice' element
	     * 2. append table
	     */			
	    parentElement.append('<table border="0" width="100%"><tr><td colspan="2"><div id="FinanceCalculator" class="marginTB10px shadow"><div id="WidgetBar"><div class="toggleBar cursor">FINANCE OPTION FROM: <span class="MonthlyRepay">£0</span> <!--strong class="toggle">Click Here</strong--></div></div><div id="FinanceMain" class="group"><div id="fc_leftColumn"><label>Finance<br /> Option:</label><br><select id="FinanceType"><option value="ONIF6">6 Months Interest Free Credit</option><option value="ONIB6-19.5">6 Months Classic Credit</option><option value="ONIF12">12 Months Interest Free Credit</option><option value="ONIB12-19.5">12 Months Classic Credit</option><option value="ONIF24">24 Months Interest Free Credit</option><option value="ONIB24-19.5">24 Months Classic Credit</option><option value="ONIF36">36 Months Interest Free Credit</option><option value="ONIB36-19.5" SELECTED>36 Months Classic Credit</option></select><ul><li>Price</li><li>Deposit(&#37;)</li><li>Deposit(&#163;)</li><li>Loan Amount</li><li>Term Agreement</li><li>APR</li><li>Loan Repayment</li><li>Cost of Loan</li><li>Total Amount</li><li class="repayment_value">Monthly Installment</li></ul></div><div id="fc_rightColumn"><label>Select<br /> Deposit:</label><br><select id="FinanceDeposit"><option value="10" class="deposit10">10%</option><option value="20" class="deposit20">20%</option><option value="30" class="deposit30">30%</option><option value="40" class="deposit40">40%</option><option value="50" class="deposit50">50%</option></select><ul><li class="fd_price"></li><li class="fd_deposit_percent"></li><li class="fd_deposit"></li><li class="fd_loanamount"></li><li class="fd_terms"></li><li class="fd_apr"></li><li class="fd_loanrepay"></li><li class="fd_loancost"></li><li class="fd_totalrepay"></li><li class="fd_monthly repayment_value"></li></ul></div></div></div></td></tr></table>');
			
	    /* Once Table has been appended
	     * find('#FinanceMain').hide()	    finds #FinanceMain() div and hides it
	     */
	    //$(this).parents('td.v65-productDetailInfo').find('#FinanceMain').hide();
	    parentElement.find('#FinanceMain').hide();
			
	    /**
	     * As above find the .toggle class
	     */			
	    parentElement.find('#WidgetBar').click(function(){
		parentElement.find('#FinanceMain').slideToggle("slow");
	    });
			
	    var orderTotal = nowOnlyPrice;	
	    var rateType = 'productDetails';
	    var financeOption;
	    if (orderTotal >= 2000){
		//Need to ensure correct option is selected
		parentElement.find('#FinanceType [value="ONIF36"]').attr('selected','selected');
		financeOption = parentElement.find('#FinanceType [value="ONIF36"]').val();
	    } else {
		financeOption = $('#FinanceType').val();
	    }			
	    var financeDeposit =  parentElement.find('#FinanceDeposit').val();									
	    var resetOptions = $('#FinanceType').html();

	    try {			   
		var financeCalculator = new FinanceCalculator(financeOption, orderTotal, financeDeposit, rateType, resetOptions, parentElement);
		var financialDetails = financeCalculator.returnFinanceOption();
		parentElement.find('.fd_price').text("\u00A3" + financialDetails.goods_val);
		parentElement.find('.fd_deposit_percent').text(financialDetails.d_pc + '%');
		parentElement.find('.fd_deposit').text("\u00A3" + financialDetails.d_amount);
		parentElement.find('.fd_loanamount').text("\u00A3" + financialDetails.l_amount);
		parentElement.find('.fd_terms').text(financialDetails.term + ' months');
		parentElement.find('.fd_apr').text(financialDetails.apr + '%');
		parentElement.find('.fd_loanrepay').text("\u00A3" + financialDetails.l_repay);
		parentElement.find('.fd_loancost').text("\u00A3" + financialDetails.l_cost);
		parentElement.find('.fd_totalrepay').text("\u00A3" + financialDetails.total);
		parentElement.find('.fd_monthly').text("\u00A3" + financialDetails.m_inst);
		parentElement.find('.MonthlyRepay').text("\u00A3" + financialDetails.m_inst);
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
		var financeOption = parentElement.find('#FinanceType').val();			    
		var orderTotal = nowOnlyPrice;							    
		var financeDeposit =  parentElement.find('#FinanceDeposit').val();

		try {
		    var financeCalculator = new FinanceCalculator(financeOption, orderTotal, financeDeposit, rateType, resetOptions, parentElement);
		    var financialDetails = financeCalculator.returnFinanceOption();

		    parentElement.find('.fd_price').text("\u00A3" + financialDetails.goods_val);
		    parentElement.find('.fd_deposit_percent').text(financialDetails.d_pc + '%');
		    parentElement.find('.fd_deposit').text("\u00A3" + financialDetails.d_amount);
		    parentElement.find('.fd_loanamount').text("\u00A3" + financialDetails.l_amount);
		    parentElement.find('.fd_terms').text(financialDetails.term + ' months');
		    parentElement.find('.fd_apr').text(financialDetails.apr + '%');
		    parentElement.find('.fd_loanrepay').text("\u00A3" + financialDetails.l_repay);
		    parentElement.find('.fd_loancost').text("\u00A3" + financialDetails.l_cost);
		    parentElement.find('.fd_totalrepay').text("\u00A3" + financialDetails.total);
		    parentElement.find('.fd_monthly').text("\u00A3" + financialDetails.m_inst);
		    parentElement.find('.MonthlyRepay').text("\u00A3" + financialDetails.m_inst);
		} catch (e){
		    if (e.name == 'fCException')
		    {
			return create({
			    modal: true
			}, e.message);
		    }
		}   
	    });
	}		   
    });
});