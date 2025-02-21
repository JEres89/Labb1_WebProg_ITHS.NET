
const iframe = `<iframe title="Map from google maps with our location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3034.0649419527012!2d11.999671891196805!3d57.67861357096856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464ff369d0835015%3A0xba46082e9c214f49!2sIT-H%C3%B6gskolan!5e1!3m2!1sen!2sse!4v1740143910897!5m2!1sen!2sse" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

function LoadMap() {
	let mapdiv = document.getElementById("map");
	mapdiv.innerHTML = iframe;
}

LoadMap();