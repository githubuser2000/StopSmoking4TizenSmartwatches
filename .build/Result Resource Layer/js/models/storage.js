/*global define, tau, tizen,  document, Math*/

/**
 * Timer page module
 */

define({
	name : 'models/storage',
	def : function storage() {		
		'use strict';
		var //documentsDir,
		    newFile = null,
	        //flipsTimeString = null,
	        intoCallback = null,
	        page = 1,
	        setPage = null,
	        //thisdir = null,  
	        wgtprivateFolder='wgt-private', //wgt-private
	        folder='documents',
	        radioBtnString='boxes\nperDay\n',
	        restdigitsstring='0000.00\n00.00\n00\n01\n50%',
			appFile = null,
			flipsdata = null,
			storedArrayIntoFlipsData = null,
			//filename="stopSmokingData",
			filename=".StopSmoking.conf",
			amountFileRows=10,
			thatdir=null,
			trials=0;
		/**
		 * Datei die Laden und Speichern von allen relevanten Appdaten behandelt
		 * @param storages
		 */
		/*
		 *             storage.saveAppData(pageId);
            pageslib.getPerUnit(),
		 */
		
		/* Success event handler */
		function checkCorruptedRemovableDrives(storages) 
		{ 
		   for (var i = 0; i < storages.length; i++) 
		   { 
			  if (storages[i].state == "MOUNTED")
			      console.log("Storage " + storages[i].label + " was added!");
		      if (storages[i].type != "EXTERNAL")
		         continue; 
		      if (storages[i].state == "UNMOUNTABLE") 
		         console.log("External drive " + storages[i].label + " is corrupted.");
		   }
		}
		/* Success event handler */
		function onStorage(storage) 
		{ 
		   console.log("Storage found:" + storage.label);
		   console.log("Storage File or Folder:" + storage.label);
		  
		}
		/**
		 * Uhrzeit und Datum in Datei schreiben
		 * @param fs
		 *//*
		function writeTimesIntoFile(fs)
		{*/
		   /* Write HelloWorld to the file */
		   //fs.write(flipsTimeString);
/*
		   fs.position = 0;

		   fs.read(testFile.fileSize);
*//*
		   fs.close();
		}*/
		
		/**
		 * App Daten außer Datum und außer Uhrzeit in die Datei dafür speichern 
		 * @param fs
		 *//*
		function writeAppDataIntoFile(fs)
		{
		   console.log('save app data: '+page+'\n'+radioBtnString+restdigitsstring);
		   fs.write(page+'\n'+radioBtnString+restdigitsstring);
		   fs.position = 0;

		   fs.read(appFile.fileSize);
		   fs.close();*/
		   /*
		      if (appFile.isDirectory == false) 
		    	  appFile.readAsText(function(str) {
		    		  console.log("5 File content: " + str);
		    		  console.log("5 File content size is: " + str.length);
		    	  }, null, "UTF-8");
		   */
		//}
		/*
		function writeAppDataIntoFile(fs)
		{
		   fs.position = 0;

		   fs.read(testFile.fileSize);

		   fs.close();
		}*/
		/**
		 * Umwandeln des Zeitstrings in ein Arraydatentyp
		 */
		function convertTimeStringToArrays(timeString) {
			console.log('convert '+timeString);
			if (timeString!=null) {
				console.log('convert !=null '+timeString!=null);
				console.log('convert length '+timeString.length);
				if (timeString.length>=17) {
					console.log('convert Bedingungen erfüllt');
					return [ 
					        [parseInt(timeString[0]),parseInt(timeString[1]),parseInt(timeString[3]),parseInt(timeString[4]),parseInt(timeString[6]),parseInt(timeString[7])],
					        [parseInt(timeString[9]),parseInt(timeString[10]),parseInt(timeString[12]),parseInt(timeString[13]),timeString[15],timeString[16]]
					       ];
				} else
					return null;
			} else
				return null;
		}
		
		/**
		 * Lese Uhrzeit und Datum aus Datei und übergebe das zum Eintragen in die Digits für die Flips
		 * @param files
		 *//*
		function ReadTimeFromFile_IntoDigits(files) {
			   console.log('callback-1?: '+typeof intoCallback);
			   console.log("Amount of Files is " + files.length);
			   var fileex=null;
			   for (var i = 0; i < files.length; i++) {
			     console.log("File Name is " + files[i].name); // displays file name
			     if (files[i].name==="lastSmokingDay") {
			    	 fileex=i;
			    	 console.log('file number is '+i);
			     }
			   }
			   
			   if (fileex==null) {
				   //newFile = documentsDir.createFile("lastSmokingDay");
				   ;
			   } else {
				      if (files[fileex].isDirectory == false) 
				    	  files[fileex].readAsText(function(str) {
				    		  console.log("File content: " + str);
				    		  console.log("File content size is: " + str.length);
				    		  intoCallback(convertTimeStringToArrays(str));
				    	  }, null, "UTF-8");
			   }

		}*/
		
		/**
		 * Wandle den String für die Appdaten ohne Datum und Uhrziet in ein Array
		 * @param text
		 * @returns {Array}
		 */
		function stringToArray(text) {
			var i, array=new Array(amountFileRows),k=0;				    		  
			array[0]='';
			a:
			for (i=0;i<text.length;i++) {
				if (text[i]==='\n') {
					k++;
					if (k===amountFileRows)
						break a;
					array[k]='';
				} else
					array[k]+=text[i];
			}
			/*
			// Weil hinter letztem noch meist Kram ist, weil die Datei nicht erst geleert wird, wenn sie beschrieben wird
			if (typeof array[7] !== 'undefined' && typeof array[7][0] !== 'undefined' && typeof array[7][1] !== 'undefined' && typeof array[7][2] !== 'undefined')
				array[7]=[array[7][0],array[7][1],'%'];
			*/
			/*if (array.length>8)
				throw "Anpassen! Dass letztes Element nicht anhängsel hat wegen speicherung! Siehe oben im Code!";
				*/
			return array;
		}

		/**
		 * Lese die AppDaten aus der Datei in die App, weswegen 2 Delegaten aufgerufen werden müssen
		 * @param files
		 *//*
		function ReadAppData_into_App(files) {
			   var fileex=null;
			   for (var i = 0; i < files.length; i++) {
			     console.log("File Name (4) is " + files[i].name); // displays file name
			     if (files[i].name==="appdata") {
			    	 fileex=i;
			    	 console.log('file number is '+i);
			    	 appFile=files[i];
			     }
			   }
			   if (fileex==null) {
				   console.log('no file for saving appdata');
				   //newFile = documentsDir.createFile("appdata");
				   ;
			   } else {
				   console.log('file for saving appdata exists');
				      if (files[fileex].isDirectory == false) 
				    	  files[fileex].readAsText(function(str) {
						      console.log("File 3 content: " + str);
				    		  console.log("File 3 content size is: " + str.length);
				    		  var array=stringToArray(str);
			    			  setPage(array[0]);
			    			  console.log('Array: '+array+'arraylength: '+array.length);
			    			  console.log('Array[1] und [2]: '+array[1]+'|'+array[2]+'|');
				    		  document.getElementById("packagingtypebox").checked = array[1]==='boxes';
				    		  document.getElementById("packagingtypetabako").checked = array[1]==='bins';
				    		  document.getElementById("periodperDay").checked = array[2]==='perDay';
				    		  document.getElementById("periodperWeek").checked = array[2]==='perWeek';

				    		  radioBtnString=($('input[name=packagingtype]:checked').val()==='box'?'boxes':'bins')+'\n';
							  radioBtnString+=($('input[name=period]:checked').val()==='perDay'?'perDay':'perWeek')+'\n';

							  if (storedArrayIntoFlipsData!=='undefined') {
				    			  console.log('Funktionszeiger war übergeben worden.');
				    			  storedArrayIntoFlipsData(array);
				    		  }
				    		  /*
				    		   * hecked id="packagingtypebox" class="radio2x2">box  cigarettes<br>        		
				<input type="radio" name="packagingtype" value="tabako" id="packagingtypetabako" class="radio2x2">bin tabako + ..<br>
        	    <br>
				<input type="radio" name="period" value="perDay" checked id="periodperDay" class="radio2x2">per day<br>
				<input type="radio" name="period" value="perWeek" id="periodperWeek" class="r
				    		   */
				    /*	  }, null, "UTF-8");
			   }
		}
		*/
		/**
		 * 
		 * 
		 * files listen, ob file da, file notfalls erstellen, zum schreiben öffnen, funktion zum Schreiben laden
		 * @param files
		 *//*
		function writeAppData(files) {
			   console.log("Amount of Files 3 is " + files.length);
			   var fileex=false, fileNo = null;
			   for (var i = 0; i < files.length; i++) {
			     console.log("File Name is " + files[i].name); // displays file name
			     if (files[i].name==="appdata") {
			    	 fileex=true;
			    	 fileNo=i;
			     }
			   }
			   
			   if (!fileex)
				   newFile = hiddenDir.createFile("appdata");
			   else
				   newFile = files[fileNo];
			   
			   if (newFile != null) 
				   newFile.openStream("rw", writeAppDataIntoFile, null, "UTF-8");
			 }
		*/
		
		/**
		 * files listen, ob file da, file notfalls erstellen, zum schreiben öffnen, funktion zum Schreiben laden
		 * @param files
		 *//*
		function WriteTimeData(files) {
		   console.log("Amount of Files is " + files.length);
		   var fileex=false, fileNo = null;
		   for (var i = 0; i < files.length; i++) {
		     console.log("File Name is " + files[i].name); // displays file name
		     if (files[i].name==="lastSmokingDay") {
		    	 fileex=true;
		    	 fileNo=i;
		     }
		   }
		   
		   if (!fileex)
			   newFile = documentsDir.createFile("lastSmokingDay");
		   else
			   newFile = files[fileNo];
		   
		   if (newFile != null) 
			   newFile.openStream("rw", writeTimesIntoFile, null, "UTF-8");
		   */
/*
		   var testFile = documentsDir.createFile("test.txt");

		   if (testFile != null) {
		     testFile.openStream(
		       "w",
		       function(fs) {
		         fs.write("HelloWorld");
		         fs.close();
		       }, function(e) {
		         console.log("Error " + e.message);
		       }, "UTF-8"
		     );
		   }
		 }*/
/*
		 function onerror(error) {
		   console.log("The error " + error.message + " occurred when listing the files in the selected folder");
		 }
		
		function listFiles_(dir) {
		     documentsDir = dir;
		     dir.listFiles(WriteTimeData, onerror);
		}
		function listFiles2_(dir) {
		     documentsDir = dir;
		     dir.listFiles(ReadTimeFromFile_IntoDigits, onerror);
		}
		function listFiles3_(dir) {
		     hiddenDir = dir;
		     dir.listFiles(writeAppData, onerror);
		}
		function listFiles4_(dir) {
		     hiddenDir = dir;
		     console.log('listFiles4_ '+hiddenDir);
		     dir.listFiles(ReadAppData_into_App, onerror);
		}
		
		function listFiles_Error(e) {
		     console.log("Error" + e.message);
		}*/
		
		/**
		 * Uhrzeit und Datum speichern vorbereiten, Angabe des Ordners
		 * @param date
		 * @param clocktime
		 *//*
		function saveTime(date,clocktime) {
			flipsTimeString=date[0].toString()+date[1].toString()+'.'+date[2].toString()+date[3].toString()+'.'+date[4].toString()+date[5].toString()+'\n'+clocktime[0].toString()+clocktime[1].toString()+':'+clocktime[2].toString()+clocktime[3].toString()+' '+clocktime[4]+clocktime[5];
			// zum Beschreiben:
			tizen.filesystem.resolve(folder, listFiles_,listFiles_Error,"rw");
		}*/
		/**
		 *Speichern der Appdaten vorbeiten, Angabe des Ordners
		 *//*
		function saveAppData() {
			//flipsdata=flipsdata_;
			//storedArrayIntoFlipsData=storedArrayIntoFlipsData_;
			console.log('page to save: '+page);
			// zum Beschreiben:
			restdigitsstring='';
			var i,k;
			for (i=2;i<flipsdata.length;i++) {
				for (k=0;k<flipsdata[i].digits.length;k++) {
					restdigitsstring+=flipsdata[i].digits[k].toString();
					//console.log('saveAppData: '+flipsdata[i].digits.toString()+'|'+flipsdata[i].digits);
				}
				restdigitsstring+='\n';
			}
			console.log('geworden ist draus: '+restdigitsstring);
			tizen.filesystem.resolve(wgtprivateFolder, listFiles3_,listFiles_Error,"rw");
		}*/

		/**
		 * Rückgabe an den Delegaten der Information der Uhrzeit und des Datums
		 * @param intoCallback2
		 *//*
		function getSavedTime(intoCallback2) {
			console.log('callback-2?: '+typeof intoCallback2);
			intoCallback=intoCallback2;
			console.log('callback-1A?: '+typeof intoCallback2);
			tizen.filesystem.resolve(folder, listFiles2_,listFiles_Error,"r");
		}*/

		function setsetPage(setPage2) {
			setPage=setPage2;
		}

		/**
		 * Übergabe des Delegaten zum verwenden des Arrays für die Appdaten
		 * @param storedArrayIntoFlipsData_
		 */
		function MakestoredArrayIntoFlipsData(storedArrayIntoFlipsData_) {
			storedArrayIntoFlipsData=storedArrayIntoFlipsData_;
		} 
		
		/**
		 * App Daten laden vorbereiten und dann laden
		 *//*
		function loadAppData() {
			console.log('loadAppData');
			tizen.filesystem.resolve(wgtprivateFolder, listFiles4_,listFiles_Error,"r");
		}
		*/

		function setPageID(page_){
			page=page_;
		}
		
		function setflipsdata(flipsdata_) {
			flipsdata=flipsdata_;
		}

		/**
		 * Attribute über Radiobuttonwerte setzen
		 * App Datas speichern (Warum eigentlich das schon beim Start?)
		 */
		function init() {
			console.log("init storage js");
			/* Search for the storages */
			tizen.filesystem.listStorages(checkCorruptedRemovableDrives);
			tizen.filesystem.getStorage("documents", onStorage);
			tizen.filesystem.getStorage(wgtprivateFolder, onStorage);

			Array.prototype.forEach.call(document.getElementsByClassName("radio2x2"),function (element,list) {
				element.onclick = function (e) {
					radioBtnString=($('input[name=packagingtype]:checked').val()==='box'?'boxes':'bins')+'\n';
					radioBtnString+=($('input[name=period]:checked').val()==='perDay'?'perDay':'perWeek')+'\n';
					console.log('radio btn clicked: '+radioBtnString);
					//saveAppData();
					startSave(flipsdata[0].digits,flipsdata[1].digits);
				};
			});
			//console.log('laenge, string: '+b.length+' '+b.toString());
		}
		
		function writeFile(fs) {
			   console.log('save app data: '+page+'\n'+radioBtnString+restdigitsstring);
			   fs.write(page+'\n'+radioBtnString+restdigitsstring);
			   fs.position = 0;
			   //fs.read(appFile.fileSize);
			   fs.close();			
		}
		
		function initiateWrite(thisdir) {
			   thatdir=thisdir;
			   console.log('init write: '+thisdir+'/'+filename);
			   tizen.filesystem.resolve(thisdir+'/'+filename, function(file) {
				   console.log('File '+file.isFile+' '+file.name);
				   if (file.isFile) { 
					   file.openStream("rw", writeFile, null, "UTF-8");
				   }
			   }, elseFileWriteError,"rw");
	    }		
		
		/*
		function prepareSave(dir) {
		     thisdir = dir;
		     initiateWrite();
		     //tizen.filesystem.resolve(dir,initiateWrite,elsePrepareSaveError,"rw");
		     //dir.resolve("helloWorld.doc");e
		     //dir.listFiles(initiateWrite, elsePrepareSaveError);
		     // ReadTimeFromFile_IntoDigits
		}*/
		
		function startSave(date,clocktime) {
			var flipsTimeString=date[0].toString()+date[1].toString()+'.'+date[2].toString()+date[3].toString()+'.'+date[4].toString()+date[5].toString()+'\n'+clocktime[0].toString()+clocktime[1].toString()+':'+clocktime[2].toString()+clocktime[3].toString()+' '+clocktime[4]+clocktime[5];
			// zum Beschreiben:
			console.log('page to save: '+page);
			// zum Beschreiben:
			restdigitsstring='';
			var i,k;
			for (i=2;i<flipsdata.length;i++) {
				for (k=0;k<flipsdata[i].digits.length;k++) {
					restdigitsstring+=flipsdata[i].digits[k].toString();
					//console.log('saveAppData: '+flipsdata[i].digits.toString()+'|'+flipsdata[i].digits);
				}
				restdigitsstring+='\n';
			}
			restdigitsstring+=flipsTimeString;
			console.log('geworden ist draus: '+restdigitsstring);
		    //initiateWrite(wgtprivateFolder);
		    initiateWrite(folder);

			/*
			tizen.filesystem.resolve(wgtprivateFolder, function (){
				
			},elseErrorStartSave,"rw");
			tizen.filesystem.resolve(folder, prepareSave, elseErrorStartSave,"rw");
			*/			
		}
		function initiateRead(thisdir) {
			  thatdir=thisdir;
			  console.log('callback-1?: '+typeof intoCallback+' '+thisdir+'/'+filename);

			  tizen.filesystem.resolve(thisdir+'/'+filename, function(file) {
				   console.log('File Info '+file.isFile+' '+file.name+' '+file.fullPath);
     			   if (!file.isFile) {
     				   ;
			   	   } else {
				          console.log('file for saving appdata exists');
				          file.readAsText(function(str) {
						      console.log("File 3 content: " + str);
				    		  console.log("File 3 content size is: " + str.length);
				    		  var array=stringToArray(str);
				    		  /*
				    		  if (array.length<amountFileRows) {
				    			  console.log('other dir! wrong array size');
				                  if (thatdir===folder) {
				        				initiateRead(wgtprivateFolder);
				                  }	          
				    			  return;
				    		  }
				    		  */
				    		  // Ich könnte noch alles IOs mit Regex verfizieren lassen, beim Schreiben und Lesen
			    			  setPage(parseInt(array[0]));
			    			  console.log('Array: '+array+'arraylength: '+array.length);
			    			  console.log('Array[1] und [2]: '+array[1]+'|'+array[2]+'|');
				    		  document.getElementById("packagingtypebox").checked = array[1]==='boxes';
				    		  document.getElementById("packagingtypetabako").checked = array[1]==='bins';
				    		  document.getElementById("periodperDay").checked = array[2]==='perDay';
				    		  document.getElementById("periodperWeek").checked = array[2]==='perWeek';

				    		  radioBtnString=($('input[name=packagingtype]:checked').val()==='box'?'boxes':'bins')+'\n';
							  radioBtnString+=($('input[name=period]:checked').val()==='perDay'?'perDay':'perWeek')+'\n';

							  if (storedArrayIntoFlipsData!=='undefined') {
				    			  console.log('Funktionszeiger war übergeben worden.');
				    			  storedArrayIntoFlipsData([array[0],array[1],array[2],array[3],array[4],array[5],array[6],array[7]]);
				    		  }
				    		  console.log("File content: " + str);
				    		  console.log("File content size is: " + str.length);
				    		  console.log("array content: " + array);
 			    		      intoCallback(convertTimeStringToArrays(array[8]+'\n'+array[9]));
				    	  }, null, "UTF-8");
			   		}
			  }, elseFileReadError,"r");
		}

		/*
		function prepareLoad(dir) {
			thisdir = dir;
			initiateRead();
			//dir.listFiles(initiateRead, elsePrepareLoadError);			
		}*/
		function elseFileReadError(error) {
			console.log("The error " + error.message + " at elseFileReadError");
			/*
              if (thatdir===folder) {
  				initiateRead(wgtprivateFolder);
              }	
              */
		}
		function elseFileWriteError(error) {
			console.log("The error " + error.message + " at elseFileWriteError");
			
			if (trials<2)
				tizen.filesystem.resolve(folder, function(dir) {
					console.log('write error, create File! Trials'+trials+' '+thatdir+'/'+filename);
					trials++;
					var file = dir.createFile(filename);
					console.log('File '+file.isFile+' '+file.name);
					if (file.isFile) { 
				       file.openStream("rw", writeFile, null, "UTF-8");
					}
				}, function() {
					console.log("The error " + error.message + " at elseFileWriteError 2");					
				},"rw");
		}
		

		function elsePrepareSaveError(error) {
			console.log("The error " + error.message + " at elsePrepareSaveError");
		}
		function elseErrorStartSave(error) {
			console.log("The error " + error.message + " at elseErrorStartSave");
		}
		
		
		function elsePrepareLoadError(error) {
			console.log("The error " + error.message + " at elsePrepareLoadError");
  /*          if (thatdir===folder) {
  				initiateRead(wgtprivateFolder);
              }	          
*/
		}
		function ElsestartLoadError(error) {
			console.log("The error " + error.message + " at ElsestartLoadError");
		}

		function startLoad2(setPage2) {
			setPage=setPage2;
			startLoad();
		}

		
		function startLoad() {
			console.log('callback-S?: '+typeof intoCallback);
			initiateRead(folder);
			//tizen.filesystem.resolve(wgtprivateFolder, prepareLoad,ElsestartLoadError,"r");
			//tizen.filesystem.resolve(folder, prepareLoad,ElsestartLoadError,"r");
			console.log('loadAppData');

		}
		function setCallback(intoCallback2) {
			intoCallback=intoCallback2;
		}

		return { init : init, 
			/*saveTime : saveTime , 
			getSavedTime : getSavedTime, 
			saveAppData : saveAppData , 
			loadAppData : loadAppData , */
			restdigitsstring : restdigitsstring, 
			setPageID : setPageID, 
			setflipsdata : setflipsdata, 
			setsetPage : setsetPage, 
			MakestoredArrayIntoFlipsData : MakestoredArrayIntoFlipsData,
			
			startSave : startSave,
			startLoad2 : startLoad2,
			setCallback : setCallback
			};
	}
});