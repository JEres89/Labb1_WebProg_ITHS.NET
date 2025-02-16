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
	"image": "img-thumbnail object-fit-contain col-3",//"img-thumbnail float-start align-top",
	"info": "col-9",
	"description": "float-start col-12",
	"category": "float-end col-auto ",
	"rating": "float-start col-12 col-md-6",
	"stock": "text-center col-4 d-inline m-0",
	"price": "text-center col-4 d-inline m-0",
	"tocart": "btn btn-primary col-4 float-end m-0",
	"footer": "modal-footer col-12 row align-items-center"
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
			let container = CreateModal(product);
			store.appendChild(container);
			let productDiv = document.createElement("div");
			productDiv.id = `product${product.id}`;
			productDiv.className = "product";
			productDiv.innerHTML =
			`<div id="product${product.id}" role="button" class="product row " data-bs-target="#product${product.id}-modal" data-bs-toggle="modal">
				<img src="./res/${(new String(product.name)).replace(" ", "_")}.jpg" alt="image of ${product.name}" class="${productElementClasses["image"]}">
				<div class="${productElementClasses["info"]}">
					<h3 class="">${product.name}</h3>
					<p>Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
					<b>Price: $${product.price}</b>
				</div>
			</div>`;
			//`<img class="${productElementClasses["image"]}" src="./res/${(new String(product.name)).replace(" ", "_")}.jpg" alt="image of ${product.name}" />
			//<div class="${productElementClasses["info"]}">
			//	<h3>${product.name}</h3>
			//	<p class="${productElementClasses["description"]}">${product.description}</p>
			//	<p class="${productElementClasses["price"]}">Price: $${product.price}</p>
			//	<p class="${productElementClasses["category"]}">Category: ${product.category}</p>
			//	<p class="${productElementClasses["stock"]}">Stock: ${product.stock}</p>
			//	<p class="${productElementClasses["rating"]}">Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
			//	<button class="${productElementClasses["tocart"]}" onclick="AddToCart(${product.id})">Add to Cart</button>
			//</div>`;
			store.appendChild(productDiv);
		}
	}
}

function CreateModal(product) {
	let productContainer = document.createElement("div");
	productContainer.innerHTML =
`<div class="modal fade " id="product${product.id}-modal" aria-hidden="true" aria-labelledby="product${product.id}-label" tabindex="-1">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content text-bg-light">
			<div class="modal-header">
				<h1 class="modal-title fs-5 col-8" id="product${product.id}-label">${product.name}</h1>
				<span class="${productElementClasses["category"]}">${product.category}</span>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<p class="${productElementClasses["description"]}">${product.description}</p>
				<span class="${productElementClasses["rating"]}">Rating: ${product.rating.rate} (${product.rating.count} reviews)</span>
				<!--<div class="col-12 row align-items-center">
					<span class="${productElementClasses["stock"]}">Stock: ${product.stock}</span>
					<span class="${productElementClasses["price"]}">Price: $${product.price}</span>
					<button class="${productElementClasses["tocart"]}" onclick="AddToCart(${product.id})">Add to Cart</button>
				</div>-->
			</div>
			<div class="${productElementClasses["footer"]}">
				<span class="${productElementClasses["stock"]}">Stock: ${product.stock}</span>
				<span class="${productElementClasses["price"]}">Price: $${product.price}</span>
				<button class="${productElementClasses["tocart"]}" onclick="AddToCart(${product.id})">Add to Cart</button>
			</div>
		</div>
	</div>
</div>`;
	//`
	//<div class="modal fade" id="product${product.id}-modal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
	//	<div class="modal-dialog modal-dialog-centered">
	//		<div class="modal-content">
	//			<div class="modal-header">
	//				<h1 class="modal-title fs-5" id="exampleModalToggleLabel">${product.name}</h1>
	//				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	//			</div>
	//			<div class="modal-body">
	//				<img class="${productElementClasses["image"]}" src="./res/${(new String(product.name)).replace(" ", "_")}.jpg" alt="image of ${product.name}" />
	//				<div class="${productElementClasses["info"]}">
	//					<p class="${productElementClasses["description"]}">${product.description}</p>
	//					<p class="${productElementClasses["price"]}">Price: $${product.price}</p>
	//					<p class="${productElementClasses["category"]}">Category: ${product.category}</p>
	//					<p class="${productElementClasses["stock"]}">Stock: ${product.stock}</p>
	//					<p class="${productElementClasses["rating"]}">Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
	//				</div>
	//			</div>
	//			<div class="modal-footer">
	//				<button class="float-start ${productElementClasses["tocart"]}" onclick="AddToCart(${product.id})">Add to Cart</button>
	//			</div>
	//		</div>
	//	</div>
	//</div>

	//`;
	return productContainer;
}

function CreateElement(type, params) {
	let element = document.createElement(type);
	for (let [key, value] of Object.entries(params)) {
		element[key] = value;
	}
	return element;
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