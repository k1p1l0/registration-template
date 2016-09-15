'use strict';

document.addEventListener('DOMContentLoaded', init, false);

function init () {
	let classHide = 'hide-before';

	// action arrow in boxes 
	(() => {
		let el = document.querySelector('.form-prefix'),
			  elHide = document.querySelector('.icon-arrow');

		el.addEventListener('change', hideArrow, false);

		function hideArrow (event) {
			if (el.selectedIndex != -1) {
				elHide.classList.add(classHide);
			}

			if (el.selectedIndex == 0) {
				elHide.classList.remove(classHide);
			}
		}
	})();

	// action arrow in big boxes 
	(() => {
		let els = document.querySelectorAll('.chooser'),
			  elsHide = document.querySelectorAll('.icon-arrow-big');

		for (let i = 0; i < els.length; i++) {
			els[i].addEventListener('change', hideArrow.bind(i), false);
		}

		function hideArrow (event) {
			if (els[this].selectedIndex != -1) {
				elsHide[this].classList.add(classHide);
			}

			if (els[this].selectedIndex == 0) {
				elsHide[this].classList.remove(classHide);
			}
		}
	})();
}