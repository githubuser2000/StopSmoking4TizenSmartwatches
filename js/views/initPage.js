/*global define, window, document, history*/

/**
 * Init page module
 */

define({
    name: 'views/initPage',
    requires: [
        'core/event',
        'core/template',
        'core/application',
        /*'views/stopWatchPage',
        'views/units/pageslib',
        'views/page2',
        'views/page3',
        'views/page1',*/
        'core/systeminfo',
        'views/units/navi'/*,
        'models/storage'*/
    ],
    def: function viewsInitPage(req) {
        'use strict';

        var e = req.core.event,
            app = req.core.application,
            //pageslib = req.views.units.pageslib,
            //timerPage = req.views.page2,
            sysInfo = req.core.systeminfo/*,
            storage = req.views.units.storage*/
            /*,
            keyboard = "<table id=\"timer-keyboard\"><tr><td class=\"key\"><button type=\"button\" data-value=\"1\" classs=\"ui-btn\">1</button></td>"+
                    "<td class=\"key\"><button type=\"button\" data-value=\"2\" classs=\"ui-btn\">2</button></td>" +
                    "<td class=\"key\"><button type=\"button\" data-value=\"3\" classs=\"ui-btn\">3</button></td>" +
                "</tr>                <tr>                    <td class=\"key\"><button type=\"button\" data-value=\"4\" classs=\"ui-btn\">4</button></td>"+
                    "<td class=\"key\"><button type=\"button\" data-value=\"5\" classs=\"ui-btn\">5</button></td>"+
                    "<td class=\"key\"><button type=\"button\" data-value=\"6\" classs=\"ui-btn\">6</button></td>"+
                "</tr>"+
                "<tr>"+
                    "<td class=\"key\"><button type=\"button\" data-value=\"7\" classs=\"ui-btn\">7</button></td>"+
                    "<td class=\"key\"><button type=\"button\" data-value=\"8\" classs=\"ui-btn\">8</button></td>"+
                    "<td class=\"key\"><button type=\"button\" data-value=\"9\" classs=\"ui-btn\">9</button></td>"+
                "</tr>"+
                "<tr>"+
                    "<td class=\"key\"></td>"+
                    "<td class=\"key\"><button type=\"button\" data-value=\"0\" classs=\"ui-btn\">0</button></td>"+
                    "<td class=\"key\"><button type=\"button\" data-value=\"del\" classs=\"ui-btn del\">&nbsp;</button></td>"+
                "</tr>"+
            "</table>"*/;

        function onHardwareKeysTap(ev) {
            var keyName = ev.keyName,
                page = document.getElementsByClassName('ui-page-active')[0],
                pageid = page ? page.id : '';
            if (keyName === 'back') {
            	/*
                if (timerPage.isAlarmInvoked()) {
                    e.fire('visibility.change', {
                        hidden: true
                    });
                    app.exit();
                }
                if (pageid === 'stopwatch-page' || pageid === 'timer-page') {
                    e.fire('visibility.change', {
                        hidden: true
                    });
                    app.exit();
                } else {
                    history.back();
                }
                */
            	app.exit();
            }
        }

        function onVisibilityChange(ev) {
            e.fire('visibility.change', ev);
        }

        /**
         * Handler onLowBattery state
         */
        function onLowBattery() {
            app.exit();
        }

        /**
         * Catch device PowerOff button press
         * @param {object} ev
         */
        function onKeyDown(ev) {
            if (ev.keyIdentifier.indexOf('Power') !== -1) {
                e.fire('device.powerOff');
            }
        }

        function bindEvents() {
            document.addEventListener('keydown', onKeyDown);
            window.addEventListener('tizenhwkey', onHardwareKeysTap);
            document.addEventListener('visibilitychange', onVisibilityChange);
            sysInfo.listenBatteryLowState();
        }

        function init() {
            // bind events to page elements
            bindEvents();
            sysInfo.checkBatteryLowState();
            //tau.changePage("timer-content");
        }

        e.listeners({
            'core.systeminfo.battery.low': onLowBattery
        });

        return {
            init: init
        };
    }

});
