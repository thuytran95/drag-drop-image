document.querySelectorAll('.drop-zone__input').forEach(inputElement => {
	// closet starts at the input field and making the way up until it finds an elemnt with the class of drop-zone
	const dropZoneElement = inputElement.closest('.drop-zone');

	dropZoneElement.addEventListener('click', e => {
		inputElement.click();
	});

	inputElement.addEventListener('change', e => {
		if (inputElement.files.length > 0) {
			updateThumbnail(dropZoneElement, inputElement.files[0]);
		}
	});

	dropZoneElement.addEventListener('dragover', e => {
		// prevent default action (open as link for some elements)
		e.preventDefault();
		dropZoneElement.classList.add('drop-zone--over');
	});

	['dragleave', 'dragend'].forEach(type => {
		dropZoneElement.addEventListener(type, e => {
			dropZoneElement.classList.remove('drop-zone--over');
		});
	});

	dropZoneElement.addEventListener('drop', e => {
		// prevent default action (open as link for some elements)
		e.preventDefault();
		if (e.dataTransfer.files.length) {
			inputElement.files = e.dataTransfer.files;
			updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
		}

		dropZoneElement.classList.remove('drop-zone--over');
	});
});

/*
UPdate the thumbnail on a drop zone element

@param {HT}
*/

function updateThumbnail(dropZoneElement, file) {
	let thumnailElement = dropZoneElement.querySelector('drop-zone__thumb');

	// first time remove prompt
	if (dropZoneElement.querySelector('.drop-zone__prompt')) {
		dropZoneElement.querySelector('.drop-zone__prompt').remove();
	}

	// first time there is no thumbnail element so let created
	if (!thumnailElement) {
		thumnailElement = document.createElement('div');
		thumnailElement.classList.add('drop-zone__thumb');
		dropZoneElement.appendChild(thumnailElement);
	}

	thumnailElement.dataset.label = file.name;

	//  Show thumbnail for the image files
	if (file.type.startsWith('image/')) {
		const reader = new FileReader();

		// synchronous call
		reader.readAsDataURL(file);
		reader.onload = () => {
			thumnailElement.style.backgroundImage = `url('${reader.result}')`;
		};
	} else {
		thumnailElement.style.backgroundImage = null;
	}
}
