var vw = window.innerWidth || document.documentElement.clientWidth;

var PIXEL_SIZE = 0;

if ( vw > 776 ) {
    PIXEL_SIZE = 64;
} else {
    PIXEL_SIZE = 42;
}

const container = document.querySelector(".pixel_bg_container");



function get_random_hue_rotation() {
    // Generate a random hue rotation value between 0 and 360 degrees
    const random_rotation = Math.floor(Math.random() * 361);

    // Return the CSS value for hue-rotate
    return `hue-rotate(${random_rotation}deg)`;
}


// Calculate the number of cubes that can fit in the container
const container_width = container.clientWidth;
const container_height = container.clientHeight;
const num_cubes_x = Math.floor(container_width / PIXEL_SIZE) + 1;
const num_cubes_y = Math.floor(container_height / PIXEL_SIZE) + 1;

var all_cubes = [];

// Create and append cubes to the container
for (let i = 0; i < num_cubes_y; i++) {
    for (let j = 0; j < num_cubes_x; j++) {
        var cube = document.createElement('div');
        cube.classList.add('pixel_bg');
        cube.style.height = PIXEL_SIZE + 'px';
        cube.style.width = PIXEL_SIZE + 'px';
        cube.style.left = j * PIXEL_SIZE + 'px';
        cube.style.top = i * PIXEL_SIZE + 'px';
        container.appendChild(cube);
        all_cubes.push(cube);
    }
}

const max_previous_elements = 8;
const previous_hovered_elements = [];
var prev_cube = null;

document.addEventListener('mousemove', event => {
    const cursorX = event.clientX;
    const cursorY = event.clientY;

    // Check if the cursor is within any of the cube positions
    const current_hovered_element = all_cubes.find(cube => {
        const rect = cube.getBoundingClientRect();
        return (
            cursorX >= rect.left &&
            cursorX <= rect.right &&
            cursorY >= rect.top &&
            cursorY <= rect.bottom
        );
    });

    // Check if cursor moved to another element
    if (current_hovered_element == prev_cube)
        return;

    // Remove the first element if the array exceeds the maximum limit
    if (previous_hovered_elements.length >= max_previous_elements) {
        const removed_element = previous_hovered_elements.shift();
        removed_element.classList.remove('hovered');
        removed_element.style.opacity = 1;
    }

    // Add the hover class to the current element
    current_hovered_element.classList.add('hovered');
    current_hovered_element.style.filter = get_random_hue_rotation();

    // Reset the trace
    setTimeout(() => {
        current_hovered_element.classList.remove('hovered');
        current_hovered_element.style.filter = 'hue-rotate(0)';
        current_hovered_element.style.opacity = 1;
    }, 2000);

    // Add the current element to the array
    previous_hovered_elements.push(current_hovered_element);

    // Set opacity for all previous elements
    previous_hovered_elements.forEach((element, index) => {
        const opacity = ((index + 1) / max_previous_elements) + 0.1;
        element.style.opacity = opacity;
    });

    prev_cube = current_hovered_element;

})

// ==================================================================
// =========================== Star dust ============================
// ==================================================================
artificialy_hovered_elements = [];
function dust() {
    const random_y = (Math.random() * num_cubes_y);
    const random_x = (Math.random() * num_cubes_x);

    if (random_x > num_cubes_x / 3 && random_y > num_cubes_y / 3) {
        const pos = Math.floor(random_x * random_y);
        var artif_hover = all_cubes[pos];

        // Add the hover class to the current element
        artif_hover.classList.add('hovered');
        artif_hover.style.backgroundColor = 'white';
        artif_hover.style.opacity = 0.5 + Math.random();
        // artif_hover.style.filter = get_random_hue_rotation();

        setTimeout(() => {
            artif_hover.classList.remove('hovered');
            artif_hover.style.filter = 'hue-rotate(0)';
            artif_hover.style.backgroundColor = '';
            artif_hover.style.opacity = 1;
        }, 3400 + 400 * Math.random());

        artificialy_hovered_elements.push(artif_hover);

    }


    setTimeout(() => {
        requestAnimationFrame(dust);
    }, 200 + 200 * Math.random());

}

dust(); // start the loop
