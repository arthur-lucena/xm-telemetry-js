/**
 *
 * @author arthur vieira moreira lucena
 */

JSON.__proto__._t_create = function () {
    this['length'] = 0;

    if (window.navigator.appVersion) {
        this['appVersion'] = window.navigator.appVersion;
    }

    if (window.navigator.platform) {
        this['platform'] = window.navigator.platform;
    }
}

JSON.__proto__._t_push = function (elem) {
    this[this['length']+''] = elem;
    this['length'] = this['length'] + 1;
}

Telemetry = {};

Telemetry.interact = function(e) {
    e.stopPropagation();

    interaction = {
        // seq				: Telemetry.interactions.lengt,
        evt 			: e.type,
        targetTag       : e.target.nodeName,
        id 				: e.target.id,
        className		: e.target.className,
        content         : e.target.innerText,
        value			: e.target.value,
        date      		: new Date()
    }

    var json = JSON.parse(localStorage.getItem("Telemetry.interactions:"+Telemetry.url));
    json._t_push(interaction);
    localStorage.setItem("Telemetry.interactions:"+Telemetry.url, JSON.stringify(json));
};

Telemetry.runTelemetry = function (selector, url) {
    Telemetry.url = url;

    var json = {};
    json._t_create();
    localStorage.setItem("Telemetry.interactions:"+Telemetry.url, JSON.stringify(json));

	if (selector) {
		var elementsButtons = document.querySelector(selector).querySelectorAll('button');
		var elementsA = document.querySelector(selector).querySelectorAll('a');
		var elementsOption = document.querySelector(selector).querySelectorAll('option');
		var elementsInput = document.querySelector(selector).querySelectorAll('input');
	} else {
		var elementsButtons = document.querySelectorAll('button');
		var elementsA = document.querySelectorAll('a');
		var elementsOption = document.querySelectorAll('option');
		var elementsInput = document.querySelectorAll('input');
	}

	for (var i = 0; i < elementsButtons.length; i++) {
		elementsButtons[i].addEventListener('mouseup', Telemetry.interact);
	}

	for (var i = 0; i < elementsA.length; i++) {
		elementsA[i].addEventListener('mouseup', Telemetry.interact);
	}

	for (var i = 0; i < elementsOption.length; i++) {
		elementsOption[i].addEventListener('click', Telemetry.interact);
	}

	for (var i = 0; i < elementsInput.length; i++) {
		elementsInput[i].addEventListener('onblur', Telemetry.interact);
	}
};

Telemetry.getTelemetry = function (url) {
	return JSON.parse(localStorage.getItem("Telemetry.interactions:"+Telemetry.url));
};
