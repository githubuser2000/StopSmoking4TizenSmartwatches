/*global define, window, document, history*/

/**
 * Init page module
 */

define({
    name: 'views/units/pageslib',
    def: function pageslib() {
        'use strict';
        var bin=null,
        	per=null;

        
        /**
         * Radiobuttonswerte in attributen speichern und als objekt ausgeben
         * @returns Objekt_packungsart_pro_welcher_zeiteinheit
         */
        function getPerUnit() {
        	$( "#binsPerTime").text(function(i, oldText) {
        		bin=$('input[name=packagingtype]:checked').val()==='box'?'boxes':'bins';
        		per=$('input[name=period]:checked').val()==='perDay'?'perDay':'perWeek';
                return $('input[name=period]:checked').val()==='perDay'?bin+" per day":bin+" per week";
            });
        	return {bin : bin, per : per};
        }
        
        /**
         * Texte anpassen wegen der Auswahl der Radiobuttonwerte
         */
        function changeTexts() {
        	console.log("chgtxt: "+$('input[name=packagingtype]:checked').val()+ " "+$('input[name=period]:checked').val());
        	$( "#pricePerPackagetye").text(function(i, oldText) {
                return $('input[name=packagingtype]:checked').val()==='box'?"1 cigarette box in $":"1 tabako bin in $";
            });
        	getPerUnit();
        	$( "#CigarettesPerPackaging").text(function(i, oldText){
        		
                return $('input[name=packagingtype]:checked')==='box'?"cigarettes per box":"cigarettes per day";
            });
        	
        }
        
        /**
         * Tastatur vervielfältigen, damit sie nicht redundant programmiert werden muss
         * Texte wegen Radiobuttons anpassen
         * erster und letzter Footerbuttontext ändern
         */
        function init() {
        	console.log("init pageslib");
        	//$( "#timer-keyboard").clone().appendTo( "#section1" );
        	$( "#flip-container").clone().appendTo( "#section3" );
        	$( "#timer-keyboard").clone().appendTo( "#section3" );
        	$( "#timer-keyboard").clone().appendTo( "#section5" );
        	$( "#timer-keyboard").clone().appendTo( "#section6" );
        	$( "#timer-keyboard").clone().appendTo( "#section7" );
        	$( "#timer-keyboard").clone().appendTo( "#section8" );
        	$( "#timer-keyboard").clone().appendTo( "#section9" );
        	document.getElementsByClassName('flips')[3].textContent="12";
        	document.getElementsByClassName('flips')[4].textContent="00";
        	document.getElementsByClassName('flips')[5].textContent="pm";
        	changeTexts();
        	$( ".footerbuttons:eq(0)").text("ending");//.remove();
        	$( ".footerbuttons:eq( "+($( ".footerbuttons").length-1)+" )").text("begin");//.remove();
        }
        return {
        	init : init, changeTexts : changeTexts, getPerUnit : getPerUnit
        };
    }
});
