﻿const apiUrl = "https://api.jsoning.com/mock/public/products";
var products;
var productsUnavailable;
var loading;
GetProducts();
var cart = [];

const trashIcon = "M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5";
const currencySymbol = "$";

const modalCSS = {
	"info": "ms-3 my-2",
	"description": "float-start col-12",
	"category": "float-end col-auto ",
	"rating": "float-start col-12 col-md-6",
	"stock": "text-center col-4 d-inline m-0",
	"price": "text-center col-4 d-inline m-0",
	"tocart": "btn btn-primary col-4 float-end m-0",
	"footer": "modal-footer col-12 row align-items-center"
}

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
		loading = fetch(apiUrl)
			.then(response => response.json())
			.then(result => { products = result; productsUnavailable = null; }, () => productsUnavailable = "Product data unavailable");
	}
	else {
		loading = null;
	}
}

async function ShowProducts() {
	if (loading) {
		await loading;
		loading = null;
	}
	else {
		return "nope";
	}
	let store = document.getElementById("main-content");
	if (productsUnavailable) {
		store.innerHTML = `<p>${productsUnavailable}</p>`;
	}
	else {
		store.innerHTML = "";
		for (var i = 0; i < products.length; i++) {
			let product = products[i];
			let container = CreateModal(product);
			store.appendChild(container);
			let productDiv = CreateElement("div", {
				"id": `product${product.id}`,
				"class": "product",
				"role": "button",
				"data-bs-target": `#product${product.id}-modal`,
				"data-bs-toggle": "modal"
			});
			productDiv.innerHTML =
			`<img src="./res/${(new String(product.name)).replace(" ", "_").toLowerCase()}.jpg" alt="image of ${product.name}">
			<div class="${modalCSS["info"]}">
				<h3 class="">${product.name}</h3>
				<p>Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
				<b>Price: $${product.price}</b>
			</div>`;
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
				<span class="${modalCSS["category"]}">${product.category}</span>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<p class="${modalCSS["description"]}">${product.description}</p>
				<span class="${modalCSS["rating"]}">Rating: ${product.rating.rate} (${product.rating.count} reviews)</span>
			</div>
			<div class="${modalCSS["footer"]}">
				<span class="${modalCSS["stock"]}">Stock: ${product.stock}</span>
				<span class="${modalCSS["price"]}">Price: $${product.price}</span>
				<button class="${modalCSS["tocart"]}" onclick="AddToCart(${product.id})">Add to Cart</button>
			</div>
		</div>
	</div>
</div>`;
	return productContainer;
}

function CreateElement(type, params) {
	let element = document.createElement(type, );
	if (element instanceof HTMLUnknownElement) {
		element = document.createElementNS(params["xmlns"], type);
	}
	for (let [key, value] of Object.entries(params)) {
		element.setAttribute(key, value);
	}
	return element;
}

function AddToCart(id) {
	let product = products.find(p => p.id == id);
	if (!product) {
		alert("Product not found");
		return;
	}

	let cartDiv = document.getElementById("cart");
	let sumDiv = document.getElementById("cartSum");

	let productDiv;

	if (cart.indexOf(product) > -1) {
		product.count++;
		productDiv = document.getElementById(`cartProduct_${id}`);
		productDiv.innerHTML = `
		<div class="cart-product-name">${product.count}x ${product.name}</div>
		<div class="cart-item-price">${currencySymbol + (product.price * product.count).toFixed(2)}</div>
		`;
	}
	else {
		product.count = 1;
		cart.push(product);
		productDiv = CreateElement("div", { "class": "cartProduct", "id": `cartProduct_${id}` });
		productDiv.innerHTML = `<div class="cart-product-name">${product.name}</div>\n<div class="cart-item-price">${currencySymbol + product.price}</div>\n`;
	}

	let svg = CreateElement("svg", {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "currentColor",
		"class": "cart-bin",
		"viewBox": "0 0 16 16",
		"role": "button",
		"onclick": `RemoveFromCart(${id})`
	});
	svg.innerHTML = `\n<path d="${trashIcon}"/>`;
	productDiv.appendChild(svg);
	cartDiv.firstElementChild.appendChild(productDiv);
	sumDiv.innerHTML = `Total: $${CalculateSum()}`;
	cartDiv.hidden = false;
}

function RemoveFromCart(id) {
	let product = cart.find(p => p.id == id);
	if (!product) {
		alert("Product not found");
		return;
	}
	let cartDiv = document.getElementById("cart");
	let productDiv = document.getElementById(`cartProduct_${id}`);
	cartDiv.firstElementChild.removeChild(productDiv);
	cart = cart.filter(p => p.id != id);
	let sumDiv = document.getElementById("cartSum");
	if (cart.length == 0) {
		cartDiv.hidden = true;
	}
	sumDiv.innerHTML = `Total: $${CalculateSum()}`;
}

function CalculateSum() {
	let sum = 0;
	for (let i = 0; i < cart.length; i++) {
		sum += cart[i].price*cart[i].count;
	}
	return sum.toFixed(2);
}
