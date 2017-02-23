const ns = require('util-news-selectors');
const doc = document;
const card = require('./card.hbs');
const data = require('./data.json');
const resultTemplate = require('./permanent.hbs');
const container = doc.createElement('div');
container.innerHTML = card(data);
doc.getElementById('prc-init').appendChild(container);

Array.prototype.slice.call(doc.querySelectorAll('[type="radio"][id^="prc-"]')).forEach(el => el.addEventListener('change', recalculate));
Array.prototype.slice.call(doc.querySelectorAll('[type="text"][id^="prc-"]')).forEach(el => el.addEventListener('keyup', recalculate));
doc.querySelector('#prc-container button').addEventListener('click', recalculate);

function recalculate() {
	var industry;
	var basis;
	var rate;
	var hours;

	console.log(this);

	try {
		industry = doc.querySelector('[name="prc-industry"]:checked').value;
		basis = doc.querySelector('[name="prc-employment-basis"]:checked').value;
		rate = parseFloat(doc.getElementById('prc-hourly-rate').value.replace("$",''));
		hours = parseFloat(doc.getElementById('prc-hours-on-sunday').value);
	} catch (e) {}

	if (!!industry && !!basis && !!rate && !!hours) {

		doc.getElementById('prc-result').innerHTML = resultTemplate({
			fastFood: industry === 'fast food',
			sunday: (!("sunday" in data.industries[industry][basis])) ? false : {
				loss: (hours * (data.industries[industry][basis].sunday[0] * rate - data.industries[industry][basis].sunday[1] * rate)).toFixed(2),
				rateBefore: data.industries[industry][basis].sunday[0] * 100,
				rateAfter: data.industries[industry][basis].sunday[1] * 100
			},
			holiday: (!("holiday" in data.industries[industry][basis])) ? false : {
				loss: (hours * (data.industries[industry][basis].holiday[0] * rate - data.industries[industry][basis].holiday[1] * rate)).toFixed(2),
				rateBefore: data.industries[industry][basis].holiday[0] * 100,
				rateAfter: data.industries[industry][basis].holiday[1] * 100
			}
		});

	} else {
		if (this.className.indexOf('btn') > -1) {
			doc.getElementById('prc-result').innerHTML = `<p class="error">Please complete all fields.</p>`;
			return;
		}
	}
}
