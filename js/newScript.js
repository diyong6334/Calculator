//alert("Hi");
var numOfClick =0;
var isDotPressed = false;
var value1_isGotten_expecting_value2 = false;
var cleanSlate = true;
var value_1 = "", value_2 = "", prevSymbol = "";

function buttonClick(buttonValue){
	var screen = document.getElementById("screen");
	var result;
	switch(buttonValue){
		case "on_off":
		case "clr":
			cleanSlate = true;
			value_1 = ""; value_2 = ""; prevSymbol = ""; isDotPressed = false;
			value1_isGotten_expecting_value2 = false;
			result = "0."; // I use this to clear d screen. For Clr.
			if (buttonValue=="on_off"){
				switch(screen.textContent.trim()){
					case "":
						result = "0.";
						//screen.textContent = result;
						//return;
						break;
					default:
						result =  "&nbsp;";
						screen.innerHTML = result;
						return;
				}
			}
			break;
		case "del":
			var screenVal = screen.textContent;
			if (screenVal.indexOf(".")==screenVal.length-1){
				result = screenVal.substr(0, screenVal.length-2) + ".";
				isDotPressed = false;
			}else{
				result = screenVal.substr(0, screenVal.length-1);
			}
			if (value_1=="" && value_2=="" && isDotPressed==false){
				cleanSlate = true;
			}else cleanSlate = false;
			result = result=="." ? "0." : result;
			break;
		case ".":
			cleanSlate = false;
			var screenVal = screen.textContent;
			if (!(screenVal.indexOf(".") == (screenVal.length-1)) && (screenVal.indexOf(".")!= -1)){
				return;
			}
			isDotPressed = true;
			if (value_1=="" && value_2==""){
				result = "0.";
				break;
			}
			if (screenVal.indexOf(".") == screenVal.length-1){ return; }
			if (screenVal.indexOf(".") == -1) result = screenVal + ".";
			return;
		case "+":
		case "-":
		case "*":
		case "/":
			var screenVal = screen.textContent;
			screenVal = screenVal[screenVal.length-1]=="." ? // (screenVal.indexOf(".")==screenVal.length-1)
						 screenVal.replace(".", "") :
						 screenVal;
			cleanSlate = false;
						 // value_1 = 5.1; value_2 = "";prevSymbol = "+";
						 
			if (value_1 == ""){
				value_1 = screenVal;
				prevSymbol = buttonValue;
				value1_isGotten_expecting_value2 = true;
				return;
				// Value_1's value still on-screen. Clear it here or so.
			}else if (value_2 == ""){
				if (screenVal == 0){
					alert("ERROR! \nDivision by zero impossible.");
					value_1 = ""; value_2 = ""; prevSymbol = "";
					screen.textContent = "0."; isDotPressed = false;
					return;
				}
				value_2 = screenVal;
				if (prevSymbol != ""){ // 13.toString()                   "13"
					result = eval(value_1 + prevSymbol + value_2);
					result = result.toString().indexOf(".") != -1 ? result : (result + ".");
					value_1 = result; value_2 = ""; isDotPressed = false; prevSymbol = buttonValue;
					value1_isGotten_expecting_value2 = true;
				}
			}
				
			break;
		case "=":
			if (value_1 == ""){ return; }
			if (value_1 != ""){
				if (value_2 == "" && value1_isGotten_expecting_value2 != false){
					alert("Wrong Format!\nAlways Enter a second value.");
					return;
				}else if (value_2 == "" && value1_isGotten_expecting_value2==false){
					var screenVal = screen.textContent;
					screenVal = screenVal[screenVal.length-1]=="." ? // (screenVal.indexOf(".")==screenVal.length-1)
								 screenVal.replace(".", "") :
								 screenVal;
					if (screenVal == 0){
						alert("ERROR! \nDivision by zero impossible.");
						value_1 = ""; value_2 = ""; prevSymbol = "";
						screen.textContent = "0."; isDotPressed = false;
						return;
					}
					value_2 = screenVal;
				}
				result = eval(value_1 + prevSymbol + value_2);
				result = result.toString().indexOf(".") != -1 ? result : (result + ".");
				value_1 = ""; value_2 = ""; prevSymbol = ""; isDotPressed = false;
				value1_isGotten_expecting_value2 = false; cleanSlate = true;
			}
		break;
		default: // if user press 0 - 9 button.
			var screenVal = screen.textContent;
			if (value1_isGotten_expecting_value2 == true || (cleanSlate == true)){
				screenVal = ""; 
				value1_isGotten_expecting_value2 = false;
			}
			if (isDotPressed == false){
				screenVal = screenVal[screenVal.length-1]=="." ? // (screenVal.indexOf(".")==screenVal.length-1)
							 screenVal.replace(".", "") :
							 screenVal;
			}
			if (screenVal == 0 && isDotPressed == false){
				screenVal = "";
			}
			result = screenVal + buttonValue + (isDotPressed == false?".":"");
			
		break;
	}
	//var clickedButton = document.getElementById("");
	
	//alert("Content of screen is => " + screen.textContent);
	/*screen.textContent = "See my output";
	if (screen.textContent == "0."){
		screen.textContent = "";
	}*/
	screen.textContent = result;
}