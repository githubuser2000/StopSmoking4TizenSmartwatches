/*global define*/

define({
	name : 'models/checkdate',
//	requires : [],
	def : function checkdate() {
		'use strict';
		/**
		 * Datei, um Aufgaben bezüglich des Datums zu tätigen
		 */
  
		// current_dt = tizen.time.getCurrentDateTime(),
		/*
		 * is_leap = tizen.time.isLeapYear(current_dt.getFullYear()); if
		 * (is_leap) { days_of_months[1]=29; console.log("This year is a leap
		 * year."); }
		 */		
		var	days_of_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
		
		function clockTimeStamp(hour24,minute) {
			return hour24*60+minute;
		}

		function twelfe2twentyfour(hour,aOrP) {
			console.log('Zeitumwandlung '+hour+' '+aOrP);
			if (hour==0)
				hour=12;
			var twelfe=hour==12,morning=aOrP=='a';
			if (!twelfe) {
				if (morning) {
					return hour;
				} else {
					return hour+12;
				}
			} else {
				if (morning) {
					return 0;
				} else {
					return 12;
				}
			}
		}
		function twentyfour2twelfe(hour) {
			return {
				hour : (hour==0||hour==12)?12:hour%12,
				// 0 ist am 12 ist pm
				aOrP : (hour>=12)?'p':'a'
			}
		}
		
		/**
		 * Wie viele Tage hat ein Monat im gregorianischen Kalender
		 * Ausnahmefälle werden nur von 2000 bis 2099 betrachtet,
		 * sonst gäbe es noch mehr Ausnahmen!
		 * @param month
		 * @param yearTwoDigits
		 * @returns
		 */
		function daysPerMonth(month, yearTwoDigits) {
			console.log('ay '+yearTwoDigits+' '+(2000 + yearTwoDigits)+' '+month);
			//var dateX = new tizen.TZDate((2000 + yearTwoDigits), month, day-1,1,1,1), 
			
			//console.log('az '+dateX.toLocaleString());
			console.log('a '+days_of_months);
			if (tizen.time.isLeapYear((2000 + yearTwoDigits))) {
				days_of_months[1] = 29;
			} else {
				days_of_months[1] = 28;
			}
			console.log('b '+month);
			console.log('c '+days_of_months[1]);
			console.log('d '+days_of_months[month-1]);
			return days_of_months[month-1];
		}

		/**
		 * Aus dem Array des Datums mache  Objekt mit Datum
		 * @param dateAsArray
		 * @returns {___anonymous1357_1517}
		 */
		function dateArray_to_date(dateAsArray) {
			return {
				day : dateAsArray[0] * 10 + dateAsArray[1],
				month : dateAsArray[2] * 10 + dateAsArray[3],
				yearTwoDigits : dateAsArray[4] * 10 + dateAsArray[5]
			};
		}
		
		/**
		 * gibt aus Datum mit vielen Bequemlichkeitsmerkmalen und wenn es in der Zukunft liegt, nur das aktuelle Datum
		 * @param day
		 * @param month
		 * @param Jahr_aus_2_Ziffern_bestehend
		 * @returns {___anonymous2675_2748}
		 */
		// muss noch genauer getestet werden auf Sonderfälle, die aus dem Funktionskörper ersichtlich werden
		function makeDate_(day, month, yearTwoDigits) {
			if (month < 1) {
				month = 1;
			} else if (month > 12) {
				if (month <= 19)
					month = 12;
				else if (month > 19)
					month = Math.floor((month / 10) % 10);
			}
			if (day < 1) {
				day = 1;
			} else {
				var dpm = daysPerMonth(month, yearTwoDigits);
				console.log("days per month: "+dpm+" month: "+month);
				if (day > dpm) {
					if (day <= 39)
						day = dpm;
					else if (day > 39)
						day = Math.floor((day / 10) % 10);
				}				
			}			
			console.log(day+" "+month+" "+yearTwoDigits);
			
			var now = tizen.time.getCurrentDateTime();
			console.log("k "+now.toLocaleString());
			
			if ((new tizen.TZDate((2000 + yearTwoDigits), month-1, day,0,0,0)).laterThan(now)) {
				if (now.getFullYear() - 2000 == yearTwoDigits) 
					yearTwoDigits = yearTwoDigits - 1;
				else {
					day = now.getDate();
					month = now.getMonth()+1;
					yearTwoDigits = now.getFullYear() - 2000;					
				}
				console.log("j "+day+" "+month+" "+yearTwoDigits);
			} else {
				console.log("g "+day+" "+month+" "+yearTwoDigits);
			};
			console.log('day_: '+day);
			return {
				day : day,
				month : month,
				yearTwoDigits : yearTwoDigits
			};
		}
		
		/**
		 * nur zwischen  und 100 draus machen
		 * @param percent
		 * @returns
		 */
		function makePercent(percent) {
			if (percent>100) {
				percent = 100;				
			}
			if (percent<0) {
				percent = 0;			
			}	
			return percent;
		}
		
		/**
		 * Aus Datumsvariablen mache ein Datumarray
		 * @param day
		 * @param month
		 * @param yearTwoDigits
		 * @returns {Array}
		 */
		function date_to_dateArray(day, month,
				yearTwoDigits) {
			return [ Math.floor(day / 10), day % 10, Math.floor(month / 10),
					month % 10, Math.floor(yearTwoDigits / 10),
					yearTwoDigits % 10 ];
		}
		
		/**
		 * siehe Beschreibung von date_to_dateArray und makeDate_
		 * @param digits
		 * @returns
		 */
		function makeDate(digits) {			
			var datex = dateArray_to_date(digits), newdate = makeDate_(
					datex.day, datex.month, datex.yearTwoDigits);
			console.log(datex.day+" "+datex.month+" "+datex.yearTwoDigits);
			console.log(newdate.day+" "+newdate.month+" "+newdate.yearTwoDigits);			
			return date_to_dateArray(newdate.day,newdate.month,newdate.yearTwoDigits);
			
			 

		}
		/**
		 * Heutiges Datum als Array ausgeben
		 * @returns
		 */
		function todayAsArray() {
			var now = tizen.time.getCurrentDateTime();
			console.log('tt '+now.toLocaleString()+' '+(now.getDate())+' '+(now.getMonth()+1)+' '+date_to_dateArray(now.getDay(),now.getMonth(),(now.getFullYear()-2000)));
			return date_to_dateArray(now.getDate(),now.getMonth()+1,(now.getFullYear()-2000));				
		}
		
		/*
		function elapsedTimeUnits(pasttime) {
			// min,hour,day,week,month,year
			var now = tizen.time.getCurrentDateTime();
			if (now.earlierThan(pasttime)) {
				return null;
			}
			var now_min = now.getMinutes(),
			now_hour = now.getHours(),
			now_day = now.getDate(),
			now_month = now.getMonth()+1,
			now_year = now.getFullYear(),
			past_min = pasttime.getMinutes(),
			past_hour = pasttime.getHours(),
			past_day = pasttime.getDate(),
			past_month = pasttime.getMonth()+1,
			past_year = pasttime.getFullYear(),
			// min,hour,day,week,month,year
			elapsed= [now_min-past_min,now_hour-past_hour,now_day-past_day,0,now_month-past_month,now_year-past_year];
			//Math.floor((now_day-past_day)/7)
			if (past_month>now_month) {
				elapsed[5]--;
			}
			if (past_day>now_day) {
				elapsed[4]--;
			}
			if (past_hour>now_hour) {
				elapsed[2]--;
			}
			if (past_min>now_min) {
				elapsed[1]--;
			}			
			elapsed[3]=Math.floor(elapsed[2]/7);
			elapsed[2]=elapsed[2]%7;
			return elapsed;
		}
		function toDate(daytimearray,datearray) {
			*//*
			 * [{
							digits : [0, 1, 0, 1, 0, 0 ],
							cursorPos : 0,
							flips : [flipsclass[0],flipsclass[1],flipsclass[2]]
						},{
							digits : [1, 2, 0, 0, 'p', 'm' ],
							cursorPos : 0, 
							flips : [flipsclass[3],flipsclass[4],flipsclass[5]]
						},{
			 *//*
			var hour;
			if (daytimearray[4]==='p') {
				hour=(daytimearray[0]*10+daytimearray[1])+12;
			} else {
				hour=(daytimearray[0]*10+daytimearray[1]);
			}
			// bei Monat minus 1 ?
			return new tizen.TZDate((2000 + (datearray[4]*10)+datearray[5]), 
					(datearray[2]*10)+datearray[3], (datearray[0]*10)+datearray[1],hour,daytimearray[2]*10+daytimearray[3],1);
		}*/
		/**
		 * Ausgeben wie spät es jetzt ist als Array
		 */
		function nowOclock() {
			var now = tizen.time.getCurrentDateTime(),
				hourAorP=twentyfour2twelfe(now.getHours()),
				hour=hourAorP.hour<10?'0'+hourAorP.hour.toString():hourAorP.hour.toString(),
				minute=now.getMinutes()<10?('0'+(now.getMinutes().toString())):now.getMinutes().toString();
				console.log('stunde jetzt: '+now.getHours()+' Ergebnis: '+hour+' '+hourAorP.aOrP);
			return [parseInt(hour[0]),parseInt(hour[1]),parseInt(minute[0]),parseInt(minute[1]),hourAorP.aOrP,'m'];
		}
		
		function makeClockTime(flipsdata) {
			var d_=flipsdata[1].digits,
			hour=parseInt(d_[0])*10+parseInt(d_[1]),
			minutes=parseInt(d_[2])*10+parseInt(d_[3]),
			pOrA=d_[4],
			/*e=elapsedTimeUnits(flipsdata[1].digits,flipsdata[0].digits),*/
			d2=flipsdata[0].digits,
			hour24=null;
			console.log('eee '+flipsdata[1].digits+' '+flipsdata[0].digits);
			console.log('ad '+pOrA);
			var now = tizen.time.getCurrentDateTime();
			if (parseInt(d2[0])*10+parseInt(d2[1])==now.getDate() && 
					parseInt(d2[2])*10+parseInt(d2[3])==now.getMonth()+1 &&
					parseInt(d2[4])*10+parseInt(d2[5])+2000==now.getFullYear()) {
				console.log('hour__'+hour);
				hour24=twelfe2twentyfour(hour,pOrA);
				if (now.getHours()<hour24) {
					hour24=now.getHours();
				}
				if (now.getHours()==hour24 && now.getMinutes() < minutes) {
					minutes=now.getMinutes();
				}
				console.log('ae '+hour24+':'+minutes);
			} else {
				if (hour==0 || hour>12)
					hour=12;
				minutes=minutes<60?minutes:minutes%10;
				hour24=twelfe2twentyfour(hour,pOrA);
				console.log('af '+hour24+' '+minutes);
			}
			var hour12=twentyfour2twelfe(hour24);
			hour12.hour=hour12.hour<10?'0'+hour12.hour.toString():hour12.hour.toString();
			minutes=minutes<10?'0'+minutes.toString():minutes.toString();
			console.log('ag '+hour12.hour+' '+hour12.aOrP);
		    return [hour12.hour.toString()[0],hour12.hour.toString()[1],minutes.toString()[0],minutes.toString()[1],hour12.aOrP,'m'];
			
			
	/*		
			hour=hour<13?hour:hour%10;
			if (hour==0)parseInt(
				hour=12;
			minutes=minutes<60?minutes:minutes%10;
			pOrA=pOrA==='p'||pOrA==='a'?pOrA:'p';
			var now = tizen.time.getCurrentDateTime();
			console.log('hour|'+hour);

			// wenn dann gleich heute ist
			if (now.getDate()===d[0]*10+d[1] && now.getMonth()+1===d[2]*10+d[3] && now.getFullYear()===d[4]*10+d[5]+2000) {
				if (clockTimeStamp(now.getHours(),now.getMinutes())<clockTimeStamp(hour,minutes)) {
					hour=now.getHours();
					minutes=now.getMinutes();
					console.log('hour|>'+hour);
					
				}
			}
			console.log('hour|'+hour);
			var thistime=twentyfour2twelfe(hour);
			hour=thistime.hour;
			console.log('hour_'+hour);
			pOrA= thistime.aOrP;
			hour=hour<10?'0'+hour.toString():hour.toString();
			minutes=minutes<10?'0'+minutes.toString():minutes.toString();
			console.log('aOrP '+ pOrA);
			return [hour[0],hour[1],minutes[0],minutes[1],pOrA,'m'];
			minutes=minutes<60?minutes:minutes%10;
*/
		}
		
		/**
		 * Wie viel Zeit ist vergangen seit Zeitangabe in Parametern, Ausgabe als Array
		 * @param Tag_als_Array
		 * @param Datum_als_Array
		 * @returns Ausgabe_der_vergangenen_Zeit_als_Array
		 */
		function elapsedTimeUnits(daytimearray,datearray) {
			console.log('elapsedTimeUnits '+daytimearray+' '+datearray+' '+twelfe2twentyfour(daytimearray[0]*10+daytimearray[1],daytimearray[4]));
			// min,hour,day,week,month,year			
			var now = tizen.time.getCurrentDateTime(),
			//then=(new tizen.TZDate((2000 + (datearray[4]*10)+datearray[5]), datearray[2]*10+datearray[3]-1, datearray[0]*10+datearray[1],1,1,1));
		    then=(new tizen.TZDate((2000 + (parseInt(datearray[4])*10)+parseInt(datearray[5])), parseInt(datearray[2])*10+parseInt(datearray[3])-1, parseInt(datearray[0])*10+parseInt(datearray[1]),twelfe2twentyfour(parseInt(daytimearray[0])*10+parseInt(daytimearray[1]),daytimearray[4]),parseInt(daytimearray[2])*10+parseInt(daytimearray[3]),59));
			console.log('now: '+now.toLocaleString());
			console.log('then: '+then.toLocaleString());
			console.log('now earlier then: '+now.earlierThan(then));

			if (now.earlierThan(then)) {
				return [0,0,0,0,0,0];
			}
			var now_min = now.getMinutes(),
			now_hour = now.getHours(),
			now_day = now.getDate(),
			now_month = now.getMonth()+1,
			now_year = now.getFullYear(),
			past_min = parseInt(daytimearray[2])*10+parseInt(daytimearray[3]),
			past_hour = twelfe2twentyfour(parseInt(daytimearray[0])*10+parseInt(daytimearray[1]),daytimearray[4]),
			past_day = parseInt(datearray[0])*10+parseInt(datearray[1]),
			past_month = parseInt(datearray[2])*10+parseInt(datearray[3]),
			past_year = 2000+(parseInt(datearray[4])*10)+parseInt(datearray[5]),
			// min,hour,day,week,month,year
			elapsed= [now_min-past_min,now_hour-past_hour,now_day-past_day,0,now_month-past_month,now_year-past_year];
			console.log('aa now past hour '+now_hour+' '+past_hour+' '+(daytimearray[4]==='p')+' '+daytimearray[3]);
			console.log('aa 3 '+elapsed);
			console.log('aa 4 '+now_hour+' '+past_hour);
			//Math.floor((now_day-past_day)/7)
			if (elapsed[0]<0) {
				elapsed[0]+=60;
				elapsed[1]--;
			}			
			if (elapsed[1]<0) {
				elapsed[1]+=24;
				elapsed[2]--;
			}
			if (elapsed[2]<0) {
				elapsed[2]=daysPerMonth(past_month,2000-past_year)-past_day+now_day;
				elapsed[4]--;
			}
			if (elapsed[4]<0) {
				elapsed[4]+=12;
				elapsed[5]--;
			}
			var elap;
			for (elap in elapsed)
				if (elap<0) 
					return [0,0,0,0,0,0];
			
			elapsed[3]=Math.floor(elapsed[2]/7);
			elapsed[2]=elapsed[2]%7;
			console.log('aa 4 '+elapsed);
			return elapsed;
		}
		
		return { makeDate : makeDate, todayAsArray : todayAsArray, makePercent : makePercent, elapsedTimeUnits : elapsedTimeUnits, nowOclock : nowOclock, makeClockTime : makeClockTime};
	}
});
