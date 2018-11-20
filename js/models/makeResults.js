/*global define*/

define({
	name : 'models/makeResults',
//	requires : [],
	def : function makeResults() {
		'use strict';

		// current_dt = tizen.time.getCurrentDateTime(),
		/*
		 * is_leap = tizen.time.isLeapYear(current_dt.getFullYear()); if
		 * (is_leap) { days_of_months[1]=29; console.log("This year is a leap
		 * year."); }
		 */
		/**
		 * 
		 */
		var timeString = '',
			TimeStamp=0,
			gesundheitsdaten = {
					cancer : 0,
					lung : 0,
					infarct : 0,
					taste : 0,
					cmonoxid : 0,
					blood : 0,
					cough_husten : 0				
			};	
		
		/**
		 * Berechnen eines eigens definierten Zeitstempels, als Funktion innerhalb einer ForEach Anweisung
		 * @param amount
		 * @param position
		 * @param array
		 * @returns
		 */
		function calcTimeStamp(amount,position,array) {
			if (position===0) {
				TimeStamp=0;
			}
			amount=parseInt(amount);
			switch(position) {
				case 0 :
					TimeStamp+=amount;
					break;
				case 1 :
					TimeStamp+=amount*60;
					break;
				case 2 :
					TimeStamp+=amount*60*24;
					break;
				case 3 :
					TimeStamp+=amount*60*24*7;
					break;
				case 4 :
					TimeStamp+=amount*60*24*365.25/12;
					break;						
				case 5 :
					TimeStamp+=amount*60*24*365.25;
					break;
				default:
					return null;
					break;
		}
			
		}
		/**
		 * Ausgabe der Zeiteinheit und ob als Plural oder Singular Wort
		 * Funktion innerhalb eines ForEach
		 */
		function UnitName(amount,position,array) {
			amount=parseInt(amount);
			if (position===0) {
				timeString='';
			}
			
			if (amount!==0) {		
				timeString+=' <nobr>';
				switch(position) {
					case 0 :
						// für nicht anzeigen
						//if (parseInt(array[3])===0 || parseInt(array[4])===0 || parseInt(array[5])===0) {
							timeString+=amount.toString();
							timeString+=(amount===1)?(' minute'):(' minutes');						
							timeString+=', ';
						//}						
						break;
					case 1 :
						// für nicht anzeigen
						//if ( parseInt(array[4])===0 || parseInt(array[5])===0 ) {
							timeString+=amount.toString();
							timeString+=(amount===1)?(' hour'):(' hours');
							timeString+=', ';
						//}
						break;
					case 2 :
						timeString+=amount.toString();
						timeString+=(amount===1)?(' day'):(' days');
						timeString+=', ';
						break;
					case 3 :
						timeString+=amount.toString();
						timeString+=(amount===1)?(' week'):(' weeks');
						timeString+=', ';
						break;
					case 4 :
						timeString+=amount.toString();
						timeString+=(amount===1)?(' month'):(' months');
						timeString+=', ';
						break;						
					case 5 :
						timeString+=amount.toString();
						timeString+=(amount===1)?(' year'):(' years');
						timeString+=', ';
						break;
					default:						
						break;
				}
				timeString+='</nobr> ';
			}
			if (position===5 && timeString[timeString.length-10]===',') {
				timeString=timeString.substr(0,timeString.length-10)+'</nobr> ';
			}
		}
		
		/**
		 * ZeitArray mit 2 ForEach in ein Zeitstring wandeln mit Wörtern
		 * @param timeArray
		 * @returns {String}
		 */
		function getResultTime(timeArray) {
			console.log('timeArray: '+timeArray);
			timeString='';
			console.log('timeArray '+timeArray);
			timeArray.forEach(UnitName);			
			timeArray.forEach(calcTimeStamp);
			console.log('timeString '+timeString);
			console.log('timeArray: '+timeArray);
			if (timeString=='')
				return '<nobr>0 Minutes.</nobr>';
			else
				return timeString;
			/*var t;
			for (t in timeArray)
				if (t!=0)*/
		}
		/*
		 *         Dim kebsrisikosenkung As Integer = Math.Round(stunden_gesamt / (9.5 * 365.25 * 24) * 1000)
        Dim lunge_regeneriert As Integer = Math.Round(stunden_gesamt / (7.5 * 365.25 * 24) * 1000)
        Dim Herzinfarktrisiko As Integer = Math.Round(stunden_gesamt / (1.5 * 365.25 * 24) * 1000)
        Dim geschmack As Integer = Math.Round(stunden_gesamt / 48 * 100)
        Dim kohlmonox As Integer = Math.Round(stunden_gesamt / 12 * 100)
        Dim durchblutung As Integer = Math.Round(stunden_gesamt / 24 / 14 * 100)
        Dim husten As Integer = Math.Round(stunden_gesamt / 24 / 30.4 * 100)
		 */
		
		/**
		 * Gesundheitsdaten berechnen
		 */
		function calcHealth(timeArray) {
			timeArray.forEach(calcTimeStamp);
			var HoursTimeStamp=TimeStamp/60;
			
			gesundheitsdaten.cancer=Math.round(HoursTimeStamp / (9.5 * 365.25 * 24) * 1000 );
			gesundheitsdaten.lung=Math.round(HoursTimeStamp / (7.5 * 365.25 * 24) * 1000);
			gesundheitsdaten.infarct=Math.round(HoursTimeStamp / (1.5 * 365.25 * 24) * 1000);
			gesundheitsdaten.taste=Math.round(HoursTimeStamp / 48 * 100);
			gesundheitsdaten.cmonoxid=Math.round(HoursTimeStamp / 12 * 100);
			gesundheitsdaten.blood=Math.round(HoursTimeStamp / 24 / 14 * 100);
			gesundheitsdaten.cough_husten=Math.round(HoursTimeStamp / 24 / 30.4 * 100);
			
	        if (gesundheitsdaten.cmonoxid > 100) { 
	        	gesundheitsdaten.cmonoxid = 100;
	        }
	        if (gesundheitsdaten.taste > 100) {
	        	gesundheitsdaten.taste = 100;
	        }
	        if (gesundheitsdaten.cancer > 1000) {
	        	gesundheitsdaten.cancer = 1000;
	        }
	        if (gesundheitsdaten.lung > 1000) {
	        	gesundheitsdaten.lung = 1000;
	        }
	        if (gesundheitsdaten.infarct > 1000) {
	        	gesundheitsdaten.infarct = 1000;
	        }
	        if (gesundheitsdaten.blood > 100) {
	        	gesundheitsdaten.blood = 100;
	        }
	        if (gesundheitsdaten.cough_husten > 100) {
	        	gesundheitsdaten.cough_husten = 100;
	        }
	        gesundheitsdaten.cancer/=10;
	        gesundheitsdaten.infarct/=10;
	        gesundheitsdaten.lung/=10;
	        return gesundheitsdaten;
		}
		
		/**
		 * Berechnen wie viel Zeit eingespart wurde, aus den Rauchdauerzeiten, mündend in einen String
		 * @param amount
		 * @param minutes
		 * @returns {String}
		 */
		function smokeTimeSaved(amount, minutes) {
			var minutes=Math.round(amount*minutes*TimeStamp/60/24),
				hours=Math.floor(minutes/60),
				days=Math.floor(hours/24),
				months=Math.floor(days/30),
				years=Math.floor(months/12);
			
				console.log('saved3 '+Math.round(amount*minutes*TimeStamp/60/24));
				console.log('saved0 '+[minutes,hours,days,0,months,years].toString());
			
				minutes%=60;
				hours%=24;				
				days%=30;
			var	weeks=Math.floor(days/7);
				days%=7;				
				
				[minutes,hours,days,weeks,months,years].forEach(UnitName);				
				
				console.log('saved1 '+[minutes,hours,days,weeks,months,years].toString());
				console.log('saved2 '+timeString);
				if (minutes == 0)
					timeString = '<nobr>0 Minutes.</nobr>';
			return timeString;
		}
		
		/**
		 * Berechnen wie viel Geld gespart wurde durch nicht rauchen
		 * @param timeArray
		 * @param price
		 * @param amount
		 * @param per
		 * @param bin
		 * @returns {Number}
		 */
		function moneySaved(timeArray,price,amount,per,bin) {
			console.log('moneySaved'+timeArray+' '+price+' '+amount+' '+per+' '+bin);
			timeArray.forEach(calcTimeStamp);
			var money=TimeStamp/60/24; // days
			money=(per==='perWeek')?(money/7):money; // weeks
			price=parseInt(price[0])*1000+parseInt(price[1])*100+parseInt(price[2])*10+parseInt(price[3])+parseInt(price[5])/10+parseInt(price[6])/100;
			amount=parseInt(amount[0])*10+parseInt(amount[1])+parseInt(amount[3])/10+parseInt(amount[4])/100;
			money*=price*amount;
			/*
			 *			digits : [0,0,0,0,'.', 0,0 ], 2
							cursorPos : 0, 
							flips : [flipsclass[6]]							
						},{
							digits : [0,0,'.', 0,0 ], 3
			 */
			console.log('money: '+money);
			return money;
		}
		 
		
		return { getResultTime : getResultTime, calcHealth : calcHealth, smokeTimeSaved : smokeTimeSaved, moneySaved : moneySaved };
	}
});
