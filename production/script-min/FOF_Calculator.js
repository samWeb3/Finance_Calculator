$(document).ready(function(){$(".price_entry").focus().select();var a=$("#FinanceType").html();$(".view_finance").click(function(){var c=$("#FinanceType").val(),d=$(".price_entry").val(),e=$("#FinanceDeposit").val();try{new FinanceCalculator(c,d,e,"finance",a),document.getElementById("triggerButton").click()}catch(b){if(b.name=="fCException")return create({modal:true},b.message)}});$("#FinanceType, #FinanceDeposit").change(function(){var c=$("#FinanceType").val(),d=$(".price_entry").val(),e=$("#FinanceDeposit").val(); try{new FinanceCalculator(c,d,e,"finance",a)}catch(b){if(b.name=="fCException")return create({modal:true},b.message)}});var g=$("#FinanceType").val(),h=$(".price_entry").val(),i=$("#FinanceDeposit").val();try{new FinanceCalculator(g,h,i,"finance",a)}catch(f){if(f.name=="fCException")return create({modal:true},f.message)}$(".price_entry").attr("onKeyPress","calculateMonInst(event)");$("#triggerButton").attr("onClick","addFocusOKButton()")}); function calculateMonInst(a){a&&a.keyCode==13&&($.browser.msie||$("#triggerButton").click(),$(".price_entry").select().focus(),setTimeout(function(){$(".price_entry").focus()},10),addFocusOKButton())}function addFocusOKButton(){var a=$(".boxy-content .button");a&&(a.focus(),setTimeout(function(){a.focus()},10))};