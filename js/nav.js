const nav = `
	<nav class="nav bg-dark bg-gradient fixed-top nav-pills">
		<img id="logo" src="logo.png" alt="Company logo" />
		<div class="d-flex flex-sm-row flex-column">
			<div class="nav-item">
				<a id="navHome" target="_parent" class="nav-link" href="index.html">Home</a>
			</div>
			<div class="nav-item">
				<a id="navAbout" target="_parent" class="nav-link" href="about.html">About Us</a>
			</div>
			<div class="nav-item">
				<a id="navStore" target="_parent" class="nav-link" href="store.html">Store</a>
			</div>
		</div>
	</nav>`;

function LoadNav(source) {
	let header = document.body.firstElementChild;
	header.innerHTML = nav;

	header.querySelector(`#${source}`).classList.add("active");
}

//Me hoping I could have a reusable nav element
/** 
const headerNav = [];

function LoadNav(source) {
	if (headerNav.length === 0) {
		let div = document.createElement("div");
		let img = document.createElement("img");
		img.src = "logo.png";
		img.alt = "Company logo";
		img.id = "logo";
		div.appendChild(img);
		headerNav.push(div);

		let nav = document.createElement("nav");
		nav.className = "nav bg-gradient fixed-top nav-pills";

		let links = [["navHome", "index", "Home"], ["navAbout", "about", "About Us"], ["navStore", "store", "Store"]];
		for (let i = 0; i < links.length; i++) {
			let item = document.createElement("div");
			item.className = "nav-item";
			let itemLink = document.createElement("a");
			itemLink.id = links[i][0];
			itemLink.target = "_parent";
			itemLink.className = "nav-link";
			itemLink.href = `${links[i][1]}.html`;
			itemLink.innerHTML = links[i][2];
			item.appendChild(itemLink);
			nav.appendChild(item);
		}
		headerNav.push(nav);
	}

	let header = document.body.firstElementChild;
	if (header.hasChildNodes()) {
		header.innerHTML = "";
	}
	header.appendChild(headerNav[0]);
	header.appendChild(headerNav[1]);

	header.querySelector(`#${source}`).classList.add("active");
}*/