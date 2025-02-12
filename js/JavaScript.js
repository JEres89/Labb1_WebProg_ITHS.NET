const apiUrl = "https://api.jsoning.com/mock/public/products";
var products;
var productsUnavailable;

const nav = 
`<div>
	<img id = "logo" src = "logo.png" alt = "Company logo" />
</div>
	<nav class="nav bg-gradient fixed-top nav-pills">
		<div class="nav-item">
			<a id="navHome" target="_parent" class="nav-link" href="index.html">Home</a>
		</div>
		<div class="nav-item">
			<a id="navAbout" target="_parent" class="nav-link" href="about.html">About Us</a>
		</div>
		<div class="nav-item">
			<a id="navStore" target="_parent" class="nav-link" href="store.html">Store</a>
		</div>
	</nav>`;

const productElementClasses = {
	"image": "img-thumbnail float-start ",
	"info": "float-end ",
	"description": "",
	"price": "",
	"category": "",
	"stock": "",
	"rating": ""
}
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

/** Response objects format
{
    "id": "1",
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse with adjustable DPI settings and long battery life.",
    "price": 29.99,
    "category": "Peripherals",
    "stock": 150,
    "sku": "WMOUSE-001",
    "image_url": "https://example.com/images/wirelessmouse.jpg",
    "rating": {
        "rate": 4.5,
        "count": 200
    }
}
*/
function GetProducts() {
	if (!products) {
		fetch(apiUrl)
			.then(response => response.json())
			.then(result => { products = result; productsUnavailable = null; }, () => productsUnavailable = "Product data unavailable")
			.then(() => ShowProducts());
	}
	else {
		ShowProducts();
	}
}

function ShowProducts() {
	let store = document.getElementById("shopdiv");
	if (productsUnavailable) {
		store.innerHTML = `<p>${productsUnavailable}</p>`;
	}
	else {
		store.innerHTML = "";
		for (var i = 0; i < products.length; i++) {
			let product = products[i];
			let productDiv = document.createElement("div");
			productDiv.id = `product_${product.id}`;
			productDiv.className = "product";
			productDiv.innerHTML =
			`<img class="${productElementClasses[image]}" src="/res/${(new String(product.name)).replace(" ", "_")}.jpg" alt="image of ${product.name}" />
			<div class="${productElementClasses[info]}">
				<h3>${product.name}</h3>
				<p class="${productElementClasses[description]}">${product.description}</p>
				<p class="${productElementClasses[price]}">Price: $${product.price}</p>
				<p class="${productElementClasses[category]}">Category: ${product.category}</p>
				<p class="${productElementClasses[stock]}">Stock: ${product.stock}</p>
				<p class="${productElementClasses[rating]}">Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
				<button class="${productElementClasses[tocart]}" onclick="AddToCart(${product.id})">Add to Cart</button>
			</div>`;
			store.appendChild(productDiv);
		}
	}
}

// For curl requests
//function GetSections() {

//	//const data = JSON.stringify({
//	//	'sections': [
//	//		'Business',
//	//		'Sports',
//	//		'Technology'
//	//	]
//	//});
//	const data = '{"sections": ["Business","Sports","Technology"]}';

//	let xhr = new XMLHttpRequest();
//	//xhr.withCredentials = true;
//	xhr.open('POST', 'https://ok.surf/api/v1/news-section');
//	xhr.setRequestHeader('accept', 'application/json');
//	xhr.setRequestHeader('Content-Type', 'application/json');

//	xhr.onload = function () {
//		console.log(xhr.response);
//	};

//	xhr.send(data);
//}