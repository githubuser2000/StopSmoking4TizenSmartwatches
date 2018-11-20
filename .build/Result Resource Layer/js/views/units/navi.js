/*global define, tau, tizen,  document, Math*/

/**
 * Timer page module
 */

define({
	name : 'views/units/navi',
	requires : [ 'core/audio','views/units/pageslib','views/units/keysnflips' , 'models/storage'
	             ],
	def : function navi(req) {		
		'use strict';
		var	pageId = null,
		storage = req.models.storage,
		keysnflips = req.views.units.keysnflips,
		pageslib = req;
		pageslib=pageslib.views;
		pageslib=pageslib.units;
		pageslib=pageslib.pageslib;
		/**
		 * Objekt für die Navigation von Seiten, durch die durchgegangen wird
		 * @param page
		 */
		
		/*
        function chgpage(ev,placenumber) {
        	ev.stopPropagation();
            ev.preventDefault();
            pageId = pages[placenumber];
            console.log("chgpage "+(placenumber)+' '+(pageId));
            tau.changePage(pageId);
        }

        
        */
		/**
		 * Setzen welche die Seite nun sein wird
		 * attribut setzen
		 * hidden element in html setzen welche die seite ist, als eine Art der globalen Variable
		 * Texte anpassen, weil durch die Radiobuttonswahl schachteltyp und per woche oder tag eine Einstellung geändert wurde 
		 * Seite mit Tau ändern
		 */
		
        function setPage(page) {
        	page=parseInt(page);
        	keysnflips.stopBlink();
            pageId = page;            
            console.log("pageIs "+document.getElementById("pageIs").value);
            document.getElementById("pageIs").value=pageId.toString();
            console.log("pageIs "+document.getElementById("pageIs").value);
            pageslib.changeTexts();
            tau.changePage('#'+pageId);
            keysnflips.refreshAllFlips();
            keysnflips.blink();
        }
		
        
        /**
         * Was passiert, wenn ein Knopf betätigt wird
         * @param ev
         */
        function buttonsevent(ev) {
        	keysnflips.stopBlink();
        	ev.stopPropagation();
            ev.preventDefault();            
            pageId = parseInt(ev.target.placenumber);   
            console.log('button set page: '+pageId);
            console.log("button "+ev.target.placenumber);
            console.log("pageIs "+document.getElementById("pageIs").value);
            document.getElementById("pageIs").value=pageId.toString();
            console.log("pageIs "+document.getElementById("pageIs").value);
            pageslib.changeTexts();
            tau.changePage('#'+pageId);
            keysnflips.refreshAllFlips();
            storage.setPageID(pageId);
            storage.setflipsdata(keysnflips.getFlipsData());
            console.log('navi vor saveAppData set:'+pageId+' '+keysnflips.getFlipsData());
            //storage.saveAppData();
            var flipsdata=keysnflips.getFlipsData();
            storage.startSave(flipsdata[0].digits,flipsdata[1].digits);
            keysnflips.blink();
       }

        /**
         * funktion die bei ForEach aufgerufen wird
         * für Hinzufügen eines Event Listeners
         * @param currentValue
         * @param index
         * @param array
         */
        function setbuttonsevent(currentValue,index,array) {
        	
            if (index>0&&index<array.length-1)
            	currentValue.placenumber=Math.floor(index / 2)+(index%2)*2 - 1;
            else if (index==0)
            	currentValue.placenumber=Math.floor((array.length-1) / 2);
            else
            	currentValue.placenumber=0;
        	currentValue.addEventListener( 'click', buttonsevent );
        }
        
        /**
         * Funktion die bei ForEach aufgerufen wird
         * Alle tags der Klasse ui-page erhalten die id der nummer ihres ersten auftreffens
         * sie werden also durchnummeriert
         * @param currentValue
         * @param index
         * @param array
         */
        function setuipageid(currentValue,index,array) {
        	currentValue.id=index;
        	console.log("id "+index);        	
        }

        /**
         * Alle Eventhandler vergeben
         */
		function bindEvents() {
			Array.prototype.forEach.call(document.getElementsByClassName("ui-page"), setuipageid);
			Array.prototype.forEach.call(document.getElementsByClassName("footerbuttons"), setbuttonsevent);
		}

		/**
		 * Delegat Pagesetzen und Datenumwandlung für Flipsdaten der Storage Datei übergeben
		 * Nach einer halben Sekunde muss das wohl verarbeitet worden sein, dann können alle in Dateien gespeicherten App Daten geladen und angewendet werden
		 * mit der Methode loadAppData
		 */
		function init() {
			keysnflips.init2();
            storage.setsetPage(setPage);
            storage.MakestoredArrayIntoFlipsData(keysnflips.storedArrayIntoFlipsData);
            
			setTimeout(storage.startLoad2, 200,setPage);

			console.log("init navi js");
			bindEvents();
		}
		return {
			init : init, pageId : pageId
		};

	}
});