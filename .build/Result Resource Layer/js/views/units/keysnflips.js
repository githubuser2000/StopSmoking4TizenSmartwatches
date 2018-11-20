/*global define, tau, tizen,  document, Math*/

/**
 * Timer page module
 */

/**
 * 
 */
/*
 * 
 */

define({
	name : 'views/units/keysnflips',
	requires : [ 'core/audio', 'models/checkdate','views/units/pageslib','models/makeResults', 'models/storage' ],
	def : function keysnflips(req) {
		/**
		 * Diese Datei dient allem, was mit Eingabefeldern und dem Zahlenfeld zur Eingabe zu tun hat
		 */
		'use strict';
		var storage = req.models.storage,
		chkdate = req.models.checkdate,// e = req.core.event, app = req.core.application, 		
		mkRes = req.models.makeResults,
		intervalvar1 = null,
		//storage = req.core.storage.idb,
		// Timer = req.models.timer.Timer,
		// Time = req.helpers.timer.Time,
		//power = req.core.power, 
		audio = req.core.audio, //pageHelper = req.helpers.page,
		// ceil = Math.ceil,
		// maskPage = document.getElementById('mask-page'),
		// elTotalTime = document.getElementById('timer-up-total-time'),
		//timer = null, 
		//timerUpPage = null,
		flipsclass=null,
		flipsdata = null,
		blinktime=1000,
				//startTimeMilli = 60 * 1000,
		// keyPressed = true,
		// autoHideTimerId = null,
		//alarmInvoked = false, 
				//alarmStatus = false, 
				//powerKeyDown = false,
		// AUTO_HIDE_TIME = 60 * 1000,
		//STORAGE_TIMER_TIME_KEY_BASE = 'TimerTimeBase', 
		//sTimerKeyBase = null, 
		//STORAGE_TIMER_TIME_KEY_PAUSED = 'TimerTimePaused', 
		ALARM_SOUND_PATH = 'sounds/sounds_alarm.mp3',
		rememberPageForIterateFlips=null,
		res = {},
		//pageId = null, 
		 /*countdown = false*/
		pageslib = req;
		pageslib=pageslib.views;
		pageslib=pageslib.units;
		pageslib=pageslib.pageslib;
		
		
		/**
		 * Dazu da, dass vorstehende Nullen mit dem Unterstrich ersetzt werden
		 * @param digits
		 * @returns digits
		 */
		
		function NoZerosBefore(digits) {
			var i,a=-1,b;
			for (i=0;i<digits.length && digits[i]==0;i++) {
				digits=changeChar(digits,i,'_');
			}
			for (i=digits.length-1;i>=0;i--) {
				if (digits[digits.length-1]=='_') {
					digits=changeChar(digits,digits.length-1,'0');
					break;
				} else if (digits.length>=3)
					     if (digits[digits.length-3]=='.' || digits[digits.length-3]==',')
						   if (digits[digits.length-4]=='_') {
							 digits=changeChar(digits,digits.length-4,'0');
							 break;
						   }
			}
			return digits;
		}
		
		/**
		 * Gibt die Anzahl der Eingabefelder aus
		 * @param Welches_Keyboard_also_die_Nummer
		 * @returns Anzahl_der_Flips
		 */
		// sollte ich irgendwann aus der HTML generieren lassen, statt einzeln in eine Funktion zu schreiben!
		function fflipNo(keybNo) {
			var flipNo=null;
			switch (parseInt(keybNo)) {
				case 0:
						switch (flipsdata[keybNo].cursorPos) {
							case 0:
							case 1:	flipNo=0;
									break;
							case 2:
							case 3: flipNo=1;
									break;
							case 4:
							case 5: flipNo=2;
									break;
						}
						break;
				case 1:
					switch (flipsdata[keybNo].cursorPos) {
						case 0:
						case 1:	flipNo=0;
								break;
						case 2:
						case 3: flipNo=1;
								break;
					}
					break;
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
					flipNo=0;
					break;
				default:
					flipNo=null;
			}
			return flipNo;
		}
		/**
		 * ausgabe der Cursorposition
		 * @param Nummer_des_Keyboards
		 * @returns CursorPosition_von_zusammen_allen_Eingabefeldern_pro_Seite
		 */
		function flipInsidePosition(keybNo) {
			var InsidePosition=null;
			switch (keybNo) {
				case 0:
				case 1:
						InsidePosition=flipsdata[keybNo].cursorPos % 2;
						break;
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
						InsidePosition=flipsdata[keybNo].cursorPos;
						break;
				default:
						InsidePosition=null;
			}
			return InsidePosition;			
		}
		/**
		 * Hilfsfunktion in einem String ein Zeichen zu ersetzen
		 * @param text
		 * @param position
		 * @param newchar
		 * @returns
		 */
		function changeChar(text,position,newchar) {
			return text.substr(0,position)+newchar+text.substr(position+1,text.length-position-1);
		}
/*
		*//**
		 * blinkender Cursor
		 *//*
		function blink_an() {
			var keybNo=getKeyboardNumber(), flipNo=fflipNo(keybNo);
			if (keybNo!=null && flipNo!=null) {
				flipsdata[keybNo].flips[flipNo].textContent=changeChar(flipsdata[keybNo].flips[flipNo].textContent,flipInsidePosition(keybNo),'_');
			}
			//console.log("bla change");
			setTimeout(blink_aus, 1500);
		}

		*//**
		 * blinkender Cursor
		 *//*
		function blink_aus() {
			var keybNo=getKeyboardNumber(), flipNo=fflipNo(keybNo);
			if (keybNo!=null && flipNo!=null) {
				flipsdata[keybNo].flips[flipNo].textContent=changeChar(flipsdata[keybNo].flips[flipNo].textContent,flipInsidePosition(keybNo),flipsdata[keybNo].digits[flipsdata[keybNo].cursorPos]);
			}
			setTimeout(blink_an, 1500);
		}
*/

		/**
		 * blinkender Cursor
		 */
		function blink_on() {
			var keybNo=getKeyboardNumber(), flipNo=fflipNo(keybNo);
			if (keybNo!=null && flipNo!=null) {
				flipsdata[keybNo].flips[flipNo].textContent=changeChar(flipsdata[keybNo].flips[flipNo].textContent,flipInsidePosition(keybNo),'_');
				setTimeout(blink_off, blinktime)
			}
		}

		/**
		 * blinkender Cursor
		 */
		function blink_off() {
			var keybNo=getKeyboardNumber(), flipNo=fflipNo(keybNo);
			if (keybNo!=null && flipNo!=null) {
				flipsdata[keybNo].flips[flipNo].textContent=changeChar(flipsdata[keybNo].flips[flipNo].textContent,flipInsidePosition(keybNo),flipsdata[keybNo].digits[flipsdata[keybNo].cursorPos]);
			}
		}		
		
		function blink() {
			blink_on();
			intervalvar1=setInterval(blink_on, blinktime*2);
		}
		function stopBlink() {
			 clearInterval(intervalvar1);
			 blink_off();
			 
			 
		}
		
		
		/**
		 * Ausgabe, welches Keyboard (zu der Seite) gerade aktiv ist
		 */
		// sollte ich irgendwann aus der HTML generieren lassen, statt einzeln in eine Funktion zu schreiben!
		function getKeyboardNumber() {
			var pageNo=parseInt(document.getElementById("pageIs").value);
			//console.log('pageNo= '+pageNo);
			switch (pageNo) {
				case 1: 
					return 0;				
				case 2: 
					return 1;					
				case 4:
					return 2;
				case 5:
					return 3;
				case 6:
					return 4;
				case 7:
					return 5;
				case 8:
					return 6;
				default:
					return null;
			}			
		}
		
		/**
		 * verstehe ich nicht mehr, egal! ^^
		 */
		function deactivateFlips() {
			var q,pageNum=getKeyboardNumber();
			for (q = 0; q < flipsdata[pageNum].flips.length; q += 1) {
				flipsdata[pageNum].flips[q].parentNode.classList.remove('active');
			}
		}
/*
		function lockFlips() {
			deactivateFlips();
			var q;
			for (q = 0; q < flips.length; q += 1) {
				flipsdata[0].flips[q].parentNode.classList.add('locked');
			}
		}*/
		/**
		 * Reset active classes for the flips. The given flip will become
		 * active.
		 * 
		 * @param {jQuery}
		 *            flip Flip element.
		 */

		function setActiveFlip(flipParent) {
			deactivateFlips();
			flipParent.classList.add('active');
		}
		/**
		 * Refresh content of a flip.
		 * 
		 * If flipIndex is undefined, then refresh the active flip (resetting
		 * active classes included).
		 * 
		 * @param {int}
		 *            flipIndex
		 * @return {bool}
		 */

		function refreshFlip(htmlFlip,flipIndex,keyboardnumber) {
			var refreshActiveClasses = false, flip = null, content = '';					
				if (flipIndex === undefined) {
					// calculate the index of the currently active flip
					if (keyboardnumber < 2)
						flipIndex = Math.floor(flipsdata[keyboardnumber].cursorPos / 2);
					else
						flipIndex = 0;
					refreshActiveClasses = true;
				}
				console.log('2016-03-25- keybno flipind '+keyboardnumber+' '+flipIndex);
				flip = flipsdata[keyboardnumber].flips[flipIndex];

			// content string of the flip (two digits)
				if (keyboardnumber < 2){
					content = flipsdata[keyboardnumber].digits[flipIndex * 2].toString()
							+ flipsdata[keyboardnumber].digits[flipIndex * 2 + 1];
					
				} else if (keyboardnumber >= 2) {
					content='';
					flipsdata[keyboardnumber].digits.forEach(function (element,index) {
						content += element.toString();
					});
				}
				if (refreshActiveClasses) {
					setActiveFlip(flip.parentNode);
				}

				//flip.innerHTML = content;
				flip.innerHTML = NoZerosBefore(content);
				// checkFlipsValue();

				return true;
			
			
		}
		/**
		 * 
		 * @param htmlFlip
		 * @param flipIndex
		 */
		function refreshFlipA(htmlFlip,flipIndex) {
			console.log('getKeyboardNumber() '+getKeyboardNumber());
			refreshFlip(htmlFlip,flipIndex,getKeyboardNumber());	
		}
		function refreshFlipB(htmlFlip,flipIndex) {
			console.log('flipsdataNindex '+rememberPageForIterateFlips+' '+flipIndex);
			refreshFlip(htmlFlip,flipIndex,rememberPageForIterateFlips);
		}
		/**
		 * Refresh all flips
		 * Alle Flips refreshen aus digits
		 */

		function refreshFlips() {
			var keyboardnumber=getKeyboardNumber();
			/*if (flipIndex<=flipsdata[keyboardnumber].flips.length) {
				.forEach(logArrayElements);
			}*/
			//var flipIndex=flipsdataElement.flips.length,
			if (flipsdata[keyboardnumber] !== undefined) {
				flipsdata[keyboardnumber].flips.forEach(refreshFlipA);
			}
			/*refreshFlip(0);
			refreshFlip(1);
			refreshFlip(2);*/
		}
		/**
		 * Einen Flips refreshen, diese Funktion wird mit ForEach von woanders verwendet
		 * @param flipsdataN
		 * @param flipsdataNindex
		 */
		function refreshEachFlip(flipsdataN,flipsdataNindex) {
			//if (flipsdataN !== undefined) {
			rememberPageForIterateFlips=flipsdataNindex;
			console.log('flipsdataNindex A '+flipsdataNindex);
			flipsdataN.flips.forEach(refreshFlipB);
			//}
		}
		
		/**
		 * alle Flips refreshen
		 */
		function refreshAllFlips() {
			flipsdata.forEach(refreshEachFlip);
			makeDurance();
		}
		
		/**
		 * wenn am, dann wechsle zu pm, wenn pm dann am
		 */
		function amPm() {			
			var keyboardnumber=getKeyboardNumber();
			console.log("amPM digits[4]?=pm: "+flipsdata[keyboardnumber].digits[4]+" keybnum: "+keyboardnumber);
			if (parseInt(keyboardnumber)==1) {
				if (flipsdata[keyboardnumber].digits[4]!='p') {
					flipsdata[keyboardnumber].digits[4]='p';
					flipsdata[keyboardnumber].digits[5]='m';
					console.log("set to p");
				} else {
					flipsdata[keyboardnumber].digits[4]='a';
					flipsdata[keyboardnumber].digits[5]='m';	
					console.log("set to a");
				}
			}
			//var d_=flipsdata[keyboardnumber].digits
			flipsdata[keyboardnumber].digits=chkdate.makeClockTime(flipsdata);
			
		}
		
		/**
		 * in einer Seite für den aktuellen Flip einen Wert ersetzen im Flip
		 * @param Wert_der_hinzugefügt_werden_muss
		 */
		// Refactoren und das Refactoren planen, aus dieser Funktion mehrere kleine machen und das danach testen!
		// andere Aufräumarbeiten: lange variablenkombis in eine variable packen, wenn diese oft verwendet wird, ein sehr kurzer Name
		function addDigit(value) {
			// left (even)
			/*
			var cursorPos=flipsdata[0].cursorPos,
			digits=flipsdata[0].digits;
			*/
			var keyboardnumber=getKeyboardNumber();

			console.log("numberclass: " + keyboardnumber);
			if (flipsdata[keyboardnumber].cursorPos % 2 === 0 && keyboardnumber < 2) {
				// zero the first digit, it will be shifted out anyway
				flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos] = 0;
				// set the left digit on the right side
				flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos + 1] = value;
				// alex: else also wenn rechte ziffer nicht linke ( modulo 2)
			} else {
				/*
				 * Alex: cursorPos ist vorheriges und value aktuelles
				 */
				console.log('digits a: '+flipsdata[keyboardnumber].digits);
				switch (keyboardnumber) {
				  case 0:
						flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos - 1] = flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos];

						flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos] = value;
						console.log('keyb=0: '+flipsdata[keyboardnumber].digits);
						flipsdata[keyboardnumber].digits = new chkdate.makeDate(flipsdata[keyboardnumber].digits);
						break;
				  case 1:
						if (flipsdata[keyboardnumber].cursorPos > 1) {
	                    	if (10 * flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos] + value > 59) {
	                    		flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos] = 5;
	                        	value = 9;
	                    	}
	                	} else {
	                		// cursorPos = 0 oder = 1
	                		// später noch einprogrammieren unterschied zwischen 24:00 und 0:00
	                    	if (10 * flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos] + value > 12) {
	                    		flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos] = 1;
	                        	value = 2;
	                    	}
	                    	/*
	                    	if (10 * flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos] + value == 0) {
	                    		value = 1;
	                    		flipsdata[keyboardnumber].digits[0]=1;
	                    		flipsdata[keyboardnumber].digits[1]=2;
	                    	}*/
	                	}
						flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos - 1] = flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos];
						// - set the right digit
						flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos] = value;
						var d_=flipsdata[keyboardnumber].digits;
						
						console.log('_cursorpos: '+flipsdata[keyboardnumber].cursorPos);	
						if (flipsdata[keyboardnumber].cursorPos > 0) { 
							flipsdata[keyboardnumber].digits=chkdate.makeClockTime(flipsdata);
							console.log('makeClockTime');	
						}
						/*
						if (flipsdata[keyboardnumber].digits[0]==0 && flipsdata[keyboardnumber].digits[1] == 0) {
							flipsdata[keyboardnumber].digits[0]=1;
							flipsdata[keyboardnumber].digits[1]=2;
						}*/
						console.log('keyb<2 or =4: '+flipsdata[keyboardnumber].digits);
					break;
				  case 2:
					if (flipsdata[keyboardnumber].cursorPos !== 3){
						//flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos + 1] = flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos];
						// - set the right digit
						flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos] = value;
					} else{
						//flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos - 1] = flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos];						
						flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos] = value;
						flipsdata[keyboardnumber].cursorPos += 1;
					}
					flipsdata[keyboardnumber].digits=flipsdata[keyboardnumber].digits.slice(flipsdata[keyboardnumber].digits.length-7,flipsdata[keyboardnumber].digits.length);
					console.log('keyb2 digits size '+flipsdata[keyboardnumber].digits.length);
					break;
				  case 3:
					if (flipsdata[keyboardnumber].cursorPos !== 1){
						//flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos + 1] = flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos];
						// - set the right digit
						flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos] = value;
					} else{
						//flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos - 1] = flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos];						
						flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos] = value;
						flipsdata[keyboardnumber].cursorPos += 1;
					}
					flipsdata[keyboardnumber].digits=flipsdata[keyboardnumber].digits.slice(flipsdata[keyboardnumber].digits.length-5,flipsdata[keyboardnumber].digits.length);
					console.log('keyb2 digits size '+flipsdata[keyboardnumber].digits.length);					
				    break;
				  case 4:
						//flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos - 1] = flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos];
						// - set the right digit
						flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos] = value;
						console.log('keyb<2 or =4: '+flipsdata[keyboardnumber].digits);
						break;
				  case 5:
						flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos] = value;
						console.log('keyb<2 or =5: '+flipsdata[keyboardnumber].digits);
						break;
				  case 6:
					  
						flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos] = value;
						//flipsdata[keyboardnumber].digits = new chkdate.makePercent(flipsdata[keyboardnumber].digits);
						console.log('keyb=6: '+flipsdata[keyboardnumber].digits);
						break;
				} 
				console.log('digits b: '+flipsdata[keyboardnumber].digits);

			}

			refreshFlips(keyboardnumber);
			// alles getan, jetzt nur noch Cursor Pos setzen:
			//if (keyboardnumber<2) {
			flipsdata[keyboardnumber].cursorPos += 1;
			/*} else if (keyboardnumber===2) {				
				if (flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos]===5){
					flipsdata[keyboardnumber].cursorPos = 3;
				}*//* else {
					flipsdata[keyboardnumber].cursorPos -= 2;
				}*/
//			}
			// if cursor is out of range, go back to seconds
			switch (keyboardnumber) {
			  case 0:
				if (value === 0 && flipsdata[keyboardnumber].cursorPos === 5) {
					flipsdata[keyboardnumber].cursorPos = 4;
				}
				if (flipsdata[keyboardnumber].cursorPos > 5) {
					flipsdata[keyboardnumber].cursorPos = 4;
				} else {
					refreshFlips(keyboardnumber);
				}
				break;
			  case 1:
				  if (flipsdata[keyboardnumber].cursorPos > 3) {
						console.log('cursor größer 3, wird auf 2 gesetzt');
						flipsdata[keyboardnumber].cursorPos = 2;
					} else {
						console.log('cursor kleinergleich 3');
						refreshFlips(keyboardnumber);
					}
				break;
			  case 2:
				  if (flipsdata[keyboardnumber].cursorPos > 6) {
						console.log('cursor von drittem Keyboard größer 6, wird auf 0 gesetzt');
						flipsdata[keyboardnumber].cursorPos = 0;
					} else {
						console.log('cursor kleinergleich 6');
						refreshFlips(keyboardnumber);
					}
				break;
			  case 3:
				  if (flipsdata[keyboardnumber].cursorPos > 4) {
						console.log('cursor von drittem Keyboard größer 4, wird auf 0 gesetzt');
						flipsdata[keyboardnumber].cursorPos = 0;
					} else {
						console.log('cursor kleinergleich 6');
						refreshFlips(keyboardnumber);
					}
				break;
			  case 4:
				    /*
					if (value === 0 && flipsdata[keyboardnumber].cursorPos === 1) {
						flipsdata[keyboardnumber].cursorPos = 0;
					}*/
					if (flipsdata[keyboardnumber].cursorPos > 1) {
						flipsdata[keyboardnumber].cursorPos = 0;
					} else {
						refreshFlips(keyboardnumber);
					}
					break;
			  case 5:
				    /*
					if (value === 0 && flipsdata[keyboardnumber].cursorPos === 1) {
						flipsdata[keyboardnumber].cursorPos = 0;
					}*/
					if (flipsdata[keyboardnumber].cursorPos > 1) {
						flipsdata[keyboardnumber].cursorPos = 0;
					} else {
						refreshFlips(keyboardnumber);
					}
					break;
			  case 6:
				    /*
					if (value === 0 && flipsdata[keyboardnumber].cursorPos === 1) {
						flipsdata[keyboardnumber].cursorPos = 0;
					}*/
					if (flipsdata[keyboardnumber].cursorPos > 1) {
						flipsdata[keyboardnumber].cursorPos = 0;
					} else {
						refreshFlips(keyboardnumber);
					}
					break;
			  default:
			}
			//storage.saveTime(flipsdata[0].digits,flipsdata[1].digits);
			storage.startSave(flipsdata[0].digits,flipsdata[1].digits);
		}



		/*
		 * function checkFlipsValue() {
		 * 
		 * var start = document.getElementById('timer-start-btn'); if
		 * (Math.max.apply(null, digits) === 0) { start.blur(); start.disabled =
		 * true; } else { start.disabled = false; } }
		 */
		
/*
		function unlockFlips() {
			var q;
			for (q = 0; q < flips.length; q += 1) {
				flipsdata[0].flips[q].parentNode.classList.remove('locked');
			}
			flipsdata[0].cursorPos = 0;
			refreshFlip(); // activate the first flip
		}
*/
		

		/**
		 * Resets flips to first selected start time
		 */
/*
		function resetFlips(keyboardnumber) {
			//unlockFlips();
			refreshFlips(keyboardnumber);
		}*/
		/**
		 * Deletes a digit from the timer's display.
		 */

		function deleteDigit() {
			var keyboardnumber=getKeyboardNumber();
			// reset the current flip
			// the flip must be the same, but the current position
			// must point to the left digit (even position)
			/*
			var cursorPos=flipsdata[keyboardnumber].cursorPos,
			digits=flipsdata[keyboardnumber].digits;*/
			switch (keyboardnumber) {
			  case 0:
			  case 1:
				if (flipsdata[keyboardnumber].cursorPos % 2 === 1) {
					flipsdata[keyboardnumber].cursorPos -= 1;
				}
				flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos] = 0; // left
				if (flipsdata[keyboardnumber].cursorPos < 3) {
					flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos + 1] = 1;
				} else {
					flipsdata[keyboardnumber].digits[flipsdata[keyboardnumber].cursorPos + 1] = 0;
				}
				break;
			  case 2:
					flipsdata[keyboardnumber].cursorPos = 0;
					flipsdata[keyboardnumber].digits = [0,0,0,5,'.', 0,0 ];
					break;
			  case 3:
					flipsdata[keyboardnumber].cursorPos = 0;
					flipsdata[keyboardnumber].digits = [0,1,'.', 0,0 ];
					break;
			  case 4:
					flipsdata[keyboardnumber].cursorPos = 0;
					flipsdata[keyboardnumber].digits = [2,0];
					break;
			  case 5:
					flipsdata[keyboardnumber].cursorPos = 0;
					flipsdata[keyboardnumber].digits = [0,8];
					break;
			  case 6:
					flipsdata[keyboardnumber].cursorPos = 0;
					flipsdata[keyboardnumber].digits = [5,0,'%'];
					break;
			  default:
				  break;
			}
				/*
			if (flipsdata[keyboardnumber].cursorPos > 3) {
				if (flipsdata[keyboardnumber].digits[4]!=='p') {
					flipsdata[keyboardnumber].digits[4]='p';
					flipsdata[keyboardnumber].digits[5]='m';
				} else {
					flipsdata[keyboardnumber].digits[4]='a';
					flipsdata[keyboardnumber].digits[5]='m';					
				}
			}*/
			/*
			 * if (cursorPos!==5) digits[cursorPos + 1] = 1; // right else
			 * digits[cursorPos + 1] = 0; // right
			 */
			refreshFlips();
		}
		/**
		 * Berechnen, wie lange man nicht geraucht hat, also zwischen eingegebenen verwendetem Datum und heute
		 * Und die Gesundheitsdaten auch berechnen und ausgeben
		 * Und wie viel Rauchzeit und Geld man gespart hat
		 */
		function makeDurance() {			
			//console.log('times: '+flipsdata[1].digits.toString()+' '+flipsdata[0].digits.toString());
			console.log('xxxx '+flipsdata[1].digits);
			var elapsed=chkdate.elapsedTimeUnits(flipsdata[1].digits,flipsdata[0].digits);
			document.getElementById("dauer").innerHTML = '<span class="resultTexts">not smoked for: '+(mkRes.getResultTime(elapsed)).toString()+'</span>';
			var
			healthdata=mkRes.calcHealth(elapsed),
			smokeTimeSaved=mkRes.smokeTimeSaved(parseInt(flipsdata[4].digits[0])*10+parseInt(flipsdata[4].digits[1]),parseInt(flipsdata[5].digits[0])*10+parseInt(flipsdata[5].digits[1])),
			//money=mkRes.moneySaved(timeArray,price,amount,per,bin),
			getPerUnit=pageslib.getPerUnit(),
			//(timeArray,price,amount,per,bin)
			money=mkRes.moneySaved(elapsed,flipsdata[2].digits,flipsdata[3].digits,getPerUnit.per,getPerUnit.bin);
			//res.width=$("#resWidth").html(disp.resolutionWidth);

			if (res.height==480 && res.width==360)
				TwoInchHealthResult(healthdata);
			else if (res.height==320 && res.width==320)  				
				document.getElementById("health").innerHTML = '<table width="100%"><tr><td class="resultTexts">usual cancer risk </td></tr><tr><td align="right" class="resultTexts">'+healthdata.cancer+'%</td></tr><tr><td class="resultTexts">lung recycled </td></tr><tr><td align="right" class="resultTexts">'+healthdata.lung+'%</td></tr><tr><td class="resultTexts">taste + smell</td></tr><tr><td class="resultTexts"  align="right">'+healthdata.taste+'%</td></tr><tr><td class="resultTexts">blood circulation</td></tr><tr><td class="resultTexts"  align="right">'+healthdata.blood+'%</td></tr><tr><td class="resultTexts">no breathlessness</td></tr><tr><td class="resultTexts"  align="right">'+healthdata.cough_husten+'%</td></tr><tr><td class="resultTexts">normal infarct risk</td></tr><tr><td class="resultTexts"  align="right">'+healthdata.infarct+'%</td></tr><tr><td class="resultTexts">usual carbon monoxide</td></tr><tr><td class="resultTexts"  align="right">'+healthdata.cmonoxid+'%<br><span style="opacity: 0.0;;">.</span></td></tr></table>';
			else
				TwoInchHealthResult(healthdata);
			document.getElementById("timesaved").innerHTML = '<span class="resultTexts">saved time, by don\'t have been smoking: '+smokeTimeSaved+'</span>';
			document.getElementById("moneysaved").innerHTML = '<span class="resultTexts">saved money: <nobr>$ '+money.toFixed(2)+'</nobr></span>';
			
		}
		function TwoInchHealthResult(healthdata) {
			document.getElementById("health").innerHTML = '<table width="100%"><tr><td class="resultTexts">usual cancer risk </td><td align="right" class="resultTexts">'+healthdata.cancer+'%</td></tr><tr><td class="resultTexts">lung recycled </td><td align="right" class="resultTexts">'+healthdata.lung+'%</td></tr><tr><td class="resultTexts">taste + smell</td><td class="resultTexts"  align="right">'+healthdata.taste+'%</td></tr><tr><td class="resultTexts">blood circulation</td><td class="resultTexts"  align="right">'+healthdata.blood+'%</td></tr><tr><td class="resultTexts">no breathlessness</td><td class="resultTexts"  align="right">'+healthdata.cough_husten+'%</td></tr><tr><td class="resultTexts">normal infarct risk</td><td class="resultTexts"  align="right">'+healthdata.infarct+'%</td></tr><tr><td class="resultTexts">usual carbon monoxide</td><td class="resultTexts"  align="right">'+healthdata.cmonoxid+'%<br><span style="opacity: 0.0;;">.</span></td></tr></table>';
			
		}
		/**
		 * Key press handler
		 * Wenn eine Taste des virtuellen Nummernkeyboards gedrückt wurde, dann rufe meine Funktionen auf, z.B.  addDigit(...)
		 * @this {HTMLElement}
		 */

		function onKeyPress(event) {
			var value = event.target.getAttribute('data-value'),
		 	classstring=event.target.class.toString(),
		 	keyboardnumber=getKeyboardNumber(),i,k,restdigitsstring='';
			if (!isNaN(value)) {
				value = parseInt(value, 10);
			}
			console.log("key " + value);
			// keyPressed = true;
			if (!(keyboardnumber === 1 && flipsdata[keyboardnumber].cursorPos > 3)) {
				if (typeof value === 'number') {
					addDigit(value);
				} else if (value === 'del') {
					deleteDigit();
				}
			} else if (value !== 'del') {
				flipsdata[keyboardnumber].cursorPos=0
			}			
			makeDurance();
			//document.getElementById("dauer").innerHTML = flipsdata[1].digits.toString();
		    storage.setflipsdata(flipsdata);
		    storage.setPageID(document.getElementById("pageIs").value);
            console.log('keysnflips vor saveAppData set:'+document.getElementById("pageIs").value+' '+flipsdata);
            storage.startSave(flipsdata[0].digits,flipsdata[1].digits);
		}
		/**
		 * Aus einem definierten Array, vom Dateiladen, werden die Daten entnommen und in die digits vom flipsdata objekt gespeichert
		 * @param array
		 */
		function storedArrayIntoFlipsData(array) {
			var i,k;
			if (array.length>=3)
		      //for (i=3;i<array.length;i++) {
			  for (i=3;i<flipsdata.length+2;i++) {
				if (typeof array[i] === "object" || typeof array[i] === "string") // Array ist in js ein Object
				  for (k=0;k<array[i].length;k++) {
					flipsdata[i-1].digits[k]=array[i][k].toString();
					console.log('eingefügt,Arraylength: '+flipsdata[i-1].digits+'|'+array[i]+'|'+array[i].length);
				  }
			  }
			refreshAllFlips();
		}

		/**
		 * Wenn ein Flip mit dem Finger berührt wird
		 * ggf. Datum nicht zu hoch werden lassen
		 * am zu pm oder umgekehrt wechseln lassen
		 * Cursorposition anpassen
		 * flips refreshen
		 * @this {jQuery}
		 */

		function onFlipTap(evt) {
			/* jshint validthis:true */
			
			if (this.classList.contains('locked')) {
				return;
			}
			var keyboardnumber=getKeyboardNumber(),
				index = this.getAttribute('data-index'),
				classstring=evt.target.class.toString(),
				flipnumber=parseInt(classstring.substr(classstring.length-8,1));
			console.log("keyboardnumber bla "+keyboardnumber);
			console.log("keyboardnumber blub "+flipnumber);
			setActiveFlip(this);
			if (keyboardnumber===0) {
				flipsdata[keyboardnumber].digits = new chkdate.makeDate(flipsdata[keyboardnumber].digits);
			}
			if (keyboardnumber===1 && flipnumber===2) { // dass es das richtige Keyboard ist wird in amPm() getestet
				console.log("keyboardnumber blub2 "+flipnumber);
				amPm();
			}
			if (keyboardnumber==1)
				flipsdata[keyboardnumber].digits=chkdate.makeClockTime(flipsdata);
			
			
			refreshFlips();
			if (flipnumber<2) {
				flipsdata[keyboardnumber].cursorPos = 2 * index;
			} 
			makeDurance();
		}
		/**
		 * Set flips value form locale storage or alarm
		 */
/*
		function setFlips() {
			//storage.get(STORAGE_TIMER_TIME_KEY_PAUSED);
		}*/
		/**
		 * Resetten zu Standardwerten.
		 * nur zu aktuellem Keyboard, bzw. der Seite mit dem Keyboard
		 * Cursorposition zu 0
		 * 
		 * @param {Event}
		 *            ev Event.
		 */

		function reset(ev) {
			var keyboardnumber=getKeyboardNumber();
			if (ev) {
				ev.preventDefault();
				// remove alarm if reset from UI
				// removeAlarm();
			}
			//show();
			//alarmStatus = false;
			//timer.reset();
			//power.normal();
			//startTimeMilli = 0;
			
			flipsdata[keyboardnumber].cursorPos = 0;
			document.getElementById('timer-keyboard').style.display = 'table';
			// fireTick();
			// showButtons();
			// refreshTimer(sTimerKeyBase);
			//resetFlips();
			//clearStorage();
			audio.pause();
			//countdown = false;
		}
		
		/**
		 * Event Listeners hinzufügen zu virtuellen Keyboards 
		 * @param objekt_des_keyboards
		 * @param nummer_des_keyboards
		 */
		function bindEventsPerKeyboard1(currentValue,whichkeyboard) {
			
			var q,buttons = currentValue.querySelectorAll('button')/*,
			flipsclass=document.getElementsByClassName('flips'),
			flipsdata = [{
							digits : [0, 1, 0, 1, 0, 0 ],
							cursorPos : 0,
							flips : [flipsclass[0],flipsclass[1],flipsclass[2]]
							},{
							digits : [0, 1, 0, 1, 0, 0 ],
							cursorPos : 0, 
							flips : [flipsclass[3],flipsclass[4],flipsclass[5]]
						}]*/;
			for (q = 0; q < buttons.length; q += 1) {
				buttons[q].class=buttons[q].class+' keyboard'+whichkeyboard;
				buttons[q].addEventListener('click', onKeyPress);
			}
			console.log("keyboard: "+whichkeyboard);
			console.log("flipsamount: "+document.getElementsByClassName('flips').length );
			
			for (q = 0; q < flipsdata[whichkeyboard].flips.length; q += 1) {
				//flipsdata[whichkeyboard].flips[q].id='flip'+q;
				console.log("Flip123: "+q);
				flipsdata[whichkeyboard].flips[q].class=flipsdata[whichkeyboard].flips[q].class+' flip'+q+' flips'+whichkeyboard;
				flipsdata[whichkeyboard].flips[q].parentNode.addEventListener('click', onFlipTap);
			}
		}
		/**
		 * Alle Eventhandler für Events hinzufügen
		 */
		function bindEvents() {
			//var buttons, q;
			//buttons = document.getElementById('timer-keyboard').querySelectorAll('button');
			Array.prototype.forEach.call(document.getElementsByClassName("timer-keyboards"), bindEventsPerKeyboard1);			
			//buttons = document.getElementsByClassName("timer-keyboards")[0].querySelectorAll('button');
		}
		/**
		 * In digits des flipsdata objekts speichern, entweder aktuelle zeit oder wenn es das gibt, die gespeicherte zeit, wo man aufgehört hat mit rauchen 
		 * @param savedTime
		 */
		function intoCallback(savedTime) {
			console.log('savedTime: '+savedTime[0]+' '+savedTime[1]);
			flipsdata[0].digits=savedTime==null?chkdate.todayAsArray():savedTime[0];
			flipsdata[1].digits=savedTime==null?chkdate.nowOclock():savedTime[1];
			refreshAllFlips();
		}/*
		function intoCallbackFlipsdata(array) {
			var i;
			for (i=0;i<array.length;i++) {
				flipsdata[i+2]
			}
		}
*/
		/**
		 * was am Anfang geschehen soll, wenn dieses Objekt geladen wird
		 * 1. hole flips
		 * 2. erzeuge flipsdata objekt
		 * 3. gespeicherte Zeit holen, damit diese dadurch in das flipsdata objekt gespeichert wird
		 * 4. Flips refreshen
		 * 5. blinken starten
		 * 6- Eventhandler binden 
		 */
		function init2() {
			tizen.systeminfo.getPropertyValue("DISPLAY", function(disp) {
	            //res.width=$("#resWidth").html(disp.resolutionWidth);
	            //res.height=$("#resHeight").html(disp.resolutionHeight);
	            res.width=disp.resolutionWidth;
	            res.height=disp.resolutionHeight;
				if (res.height==320 && res.width==320)  {
					$(".resultTexts").css( "font-size","1.5em");
					$(".flip.larger").css( "width","260px");
					$(".footerbuttons").css( "font-size","0.7em");
					$(".ui-header").css( "font-size","0.6em");
					$(".footerbuttons").css( "height","35px");
					$(".footerbuttons").css( "line-height","35px");
					$(".ui-header").css(  "height","30px");
					$(".ui-header").css(  "line-height","30px");
					$(".ui-header").css(  "margin","0");
					$(".ui-header").css(  "border","0 none");
					$(".ui-header").css(  "padding","0");
					$(".ui-content").css(  "margin-top","0");
					$(".ui-content").css(  "border","0 none");
					$(".ui-content").css(  "padding-top","0");
					$(".ui-content").css(  "margin-bottom","0");
					$(".ui-content").css(  "border","0 none");
					$(".ui-content").css(  "padding-bottom","0");
					$(".ui-content").css(  "height","*");
					$(".ui-content").css(  "line-height","*");
					$(".ui-footer").css(  "margin","0");
					$(".ui-footer").css(  "border","0 none");
					$(".ui-footer").css(  "padding","0");
					$(".ui-footer").css( "height","35px");
					$(".ui-footer").css( "line-height","30px");
					$(".ui-btn").css( "height","35px");
				}
	        });

			storage.setCallback(intoCallback);
			flipsclass=document.getElementsByClassName('flips');
			console.log('jetzte: '+chkdate.nowOclock());
			
			flipsdata = [{
							//digits : [0, 1, 0, 1, 0, 0 ],
							digits : chkdate.todayAsArray(),
							cursorPos : 0,
							flips : [flipsclass[0],flipsclass[1],flipsclass[2]]
						},{
							//digits : [1, 2, 0, 0, 'p', 'm' ],
							digits : chkdate.nowOclock(),
							cursorPos : 0, 
							flips : [flipsclass[3],flipsclass[4],flipsclass[5]]
						},{
							digits : [0,0,0,5,'.', 0,0 ],
							cursorPos : 0, 
							flips : [flipsclass[6]]							
						},{
							digits : [0,1,'.', 0,0 ],
							cursorPos : 0, 
							flips : [flipsclass[7]]							
						},{
							digits : [2,0],
							cursorPos : 0, 
							flips : [flipsclass[8]]							
						},{
							digits : [0,8],
							cursorPos : 0, 
							flips : [flipsclass[9]]							
						},{
							digits : [5,0,'%'],
							cursorPos : 0, 
							flips : [flipsclass[10]]							
						}];
			//storage.getSavedTime(intoCallback);
			storage.setflipsdata(flipsdata);
			//storage.startLoad();
			//flipsdata[getKeyboardNumber()].flips.forEach(refreshFlip);
			//console.log("init keysnflips: "+flipsdata[0].flips.length);
			//console.log("init keysnflips: "+flipsdata[1].flips.length);
			//console.log("init keysnflips: "+flipsdata[2].flips.length);
			//storage.loadAppData();
			//flipsdata[0].digits = chkdate.todayAsArray();
			//refreshFlips();
			refreshAllFlips();		
			//resetFlips();
			audio.setFile(ALARM_SOUND_PATH);
			bindEvents();
			//blink_an();
			blink();
			/*
			for (var i=1; i < 50; i++) {
				setTimeout(blink_aus, (900*i));
				setTimeout(blink_an, (900*i)+300);
			}
			while (true) {
				if (getKeyboardNumber()!=null) {
					
				}
			}*/
		}
		function getFlipsData() {
			return flipsdata;
		}
		
		
		return {
			init2 : init2,
			onFlipTap : onFlipTap,
			onKeyPress : onKeyPress,
			//resetFlips : resetFlips,
			reset : reset,
			//setFlips : setFlips,
			//lockFlips : lockFlips,
			audio : audio,
			refreshAllFlips : refreshAllFlips,
			storedArrayIntoFlipsData : storedArrayIntoFlipsData,
			getFlipsData : getFlipsData,
		    blink : blink,
			stopBlink : stopBlink
		};

	}
});