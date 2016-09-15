document.addEventListener('DOMContentLoaded', init, false);

function init () {
		var elSelected = document.querySelector('.form-prefix'),
				elHide = document.querySelector('.icon-arrow');

		elSelected.addEventListener('change', hideArrow, false);

		function hideArrow (event) {
				if (elSelected.selectedIndex != -1) {
					elHide.classList.add('hide-before');
				}

				if (elSelected.selectedIndex == 0) {
					elHide.classList.remove('hide-before');
				}
		}
}