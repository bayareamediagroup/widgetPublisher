/* this script will be served from the bayareamedia.net 
 * this is the entry point for the third-party appliction.
 * */
var payload = (function(window, undefined) {
	/* private */
	const apiKey = 'z5DpKECxcT9bjrURVyaR0qrWT94M5xgcxed12zU0rdc';

	const _helper = function (param) {
		return param[1];
	};

	const _getCity = function(param) {
		const city = _helper(param.split('&city='));
		return city[0]; 
	};

	const _getAll = function(param) {
		const all = _helper(param.split('&all='));
		return all[0]; 
	};

	const _getIcon = function(param) {
		const icon = _helper(param.split('&icon='));
		return icon[0]; 
	};

	const _getTemp = function(param) {
		const temp = _helper(param.split('&temp='));
		return temp[0]; 
	};

	const _getKey = function(param) {
		const key = _helper(param.split('&key='));
		return key; 
	};

	/* return the zipcode */
	const _getZip = function (query) {
		const param = _helper(query.split('?'));
		const zip = _helper(param.split('='));
		return zip;
	};

	/* return the URL string */
	const _getURL = function() {
		let el;
		let scripts = document.getElementsByTagName('script');

		for (let i = 0; i < scripts.length; i++) {

			el = scripts[i].src;

			if((el.search("payload")) > 0) {
				console.log("payload: ", scripts[i].src);
				return scripts[i].src;
			}
		}

		return null;
	};

	const _addElement = function (data) {
		const icon_size = 25;
		const windowWidth = window.innerWidth;

		var wrapper = document.createElement('div');
		wrapper.id = 'wrapper';
		wrapper.style ="background-color: #4f94d4; border-radius: 5px; height: 300px; width: 300px;padding: 10px;";

		var current_wrapper = document.createElement('div');
		current_wrapper.id = 'current';
		current_wrapper.style = 'color: #fff; font-size: 20px;';

		var city  = document.createElement('span');
		city.id = "_city";
		city.style = "color: #fff; font-size: 20px;";

		var comfort = document.createElement('span');
		comfort.id = "_comfort";
		comfort.style = "font-size: 14px;";

		var description = document.createElement('span');
		description.id = "_description";
		description.style = "font-size: 14px";

		var img = document.createElement('img');
		img.id = '_icon';

		var state = document.createElement('span');
		state.id = "_state";
		state.style = "color: #ffffff; font-size: 20px";

		var temperature = document.createElement('span');
		temperature.id = "_temperature";
		temperature.style = "font-size: 40px";

		document.getElementById('wx').appendChild(wrapper);
		document.getElementById('wrapper').appendChild(city);
		document.getElementById('wrapper').appendChild(state);
		document.getElementById('wrapper').appendChild(current_wrapper);
		document.getElementById('current').appendChild(temperature);
		document.getElementById('current').appendChild(comfort);
		document.getElementById('current').appendChild(description);

		var list = ["_icon", "_city", "_comfort", "_description", "_icon", "_state", "_temperature" ];

		var tag_city = document.getElementById('_city');
		var tag_comfort = document.getElementById('_comfort');
		var tag_description = document.getElementById('_description');
		var tag_icon = document.getElementById('_icon');
		var tag_state = document.getElementById('_state');
		var tag_temperature = document.getElementById('_temperature');

		/* if city is 1, then show widget */
		if(_getCity(_getURL()) == 1) {
			if ((windowWidth > 800) && (windowWidth < 1300)) {
				tag_temperature.innerHTML = " " + data.observations.location[0].observation[0].temperature.slice(0, 2) + '&deg;<br/>';
				tag_comfort.innerHTML = " " + data.observations.location[0].observation[0].comfort.slice(0, 2) + '&deg;<br/>';
			} else if (windowWidth > 1300) {
				tag_city.innerHTML = data.observations.location[0].city + "<br/>";
				tag_state.innerHTML = data.observations.location[0].state + "<br/>";
			} else { }
		} else if(_getAll(_getURL()) == 1) {

			/*
			tag_icon.src = data.observations.location[0].observation[0].iconLink.concat("?apiKey=", apiKey);
			tag_icon.height = icon_size;
			tag_icon.width = icon_size;
			tag_icon.style = 'cursor: pointer';
			*/

			if((windowWidth >= 300) && (windowWidth <= 400)) {
				wx.innerHTML = " " + data.observations.location[0].observation[0].temperature.slice(0, 2) + '&deg;';
			} else if ((windowWidth > 800) && (windowWidth < 1300)) {
				tag_temperature.innerHTML = " " + data.observations.location[0].observation[0].temperature.slice(0, 2) + '&deg;';
				tag_comfort.innerHTML = " " + data.observations.location[0].observation[0].comfort.slice(0, 2) + '&deg;<br/>';
				//locCity.innerHTML = data.observations.location[0].city + ", " + data.observations.location[0].state.slice(0, 2) + "<br/>";
				//wx.innerHTML = " " + data.observations.location[0].observation[0].temperature.slice(0, 2) + '&deg;';
			} else if (windowWidth > 1300) {
				tag_city.innerHTML = " " + data.observations.location[0].observation[0].city + ", ";
				tag_state.innerHTML = " " + data.observations.location[0].observation[0].state + '<br/>';
				tag_temperature.innerHTML = " " + data.observations.location[0].observation[0].temperature.slice(0, 2) + '&deg;<br/>';
				tag_comfort.innerHTML = "Feels Like: " + data.observations.location[0].observation[0].comfort.slice(0, 2) + '&deg;<br/>';
				//city.innerHTML = data.observations.location[0].city + ", " + data.observations.location[0].state + "<br/>";
				//wx.innerHTML = " " + data.observations.location[0].observation[0].temperature.slice(0, 2) + '&deg; F';
				//loc.innerHTML = data.observations.location[0].city + ", " + data.observations.location[0].state.slice(0, 2) + "<br/>";
			} else { }
		} else if(_getIcon(_getURL()) == 1) {
			tag_icon.src = data.observations.location[0].observation[0].iconLink.concat("?apiKey=", apiKey);
			tag_icon.height = icon_size;
			tag_icon.width = icon_size;
			tag_icon.style = 'cursor: pointer';
		} else if(_getTemp(_getURL()) == 1) {
			if ((windowWidth > 800) && (windowWidth < 1300)) {
				//wx.innerHTML = " " + data.observations.location[0].observation[0].temperature.slice(0, 2) + '&deg;';
			} else if (windowWidth > 1300) {
				//city.innerHTML = 'Patrick';
				//wx.innerHTML = " " + data.observations.location[0].observation[0].temperature.slice(0, 2) + '&deg; F';
				//		loc.innerHTML = data.observations.location[0].city + ", " + data.observations.location[0].state.slice(0, 2) + "<br/>";
			} else { }
		}
	};

	const _getAPI = function() {
		const baseURL = 'https://weather.ls.hereapi.com/weather/1.0/report.json?';
		const product = 'observation';
		const apiKey = 'z5DpKECxcT9bjrURVyaR0qrWT94M5xgcxed12zU0rdc';
		const zipcode = 94606;
		const metric = false;

		return baseURL + "product=" + product + "&oneobservation=" + true + "&apiKey=" + apiKey + "&zipcode=" + zipcode + "&metric=" + metric;
	};

	window.document.title = "Weather for: " + _getZip(_getURL());

	/* public */
	return {
		fetch: function() {

			let xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function() {
				if(this.readyState == 4 && this.status == 200) {
					const json = _addElement(JSON.parse(this.responseText));
				}
			}

			xhr.open("get", _getAPI(), true)
			xhr.send();
		},

		loadAdditionalFiles: function(url) {
			let script = document.createElement("script"); 
			script.async = true;

			script.src = url;

			let includeScript = document.getElementsByTagName('script')[0];
			includeScript.parentNode.insertBefore(script, includeScript);
		}
	};
})(window);

let sites = new Array();
sites[0] = 'app/helper1.js';
sites[1] = 'app/helper2.js';
sites[2] = 'app/helper3.js';

for(var i = 0; i < sites.length; i++) {
	payload.loadAdditionalFiles(sites[i]);
}

payload.fetch();
