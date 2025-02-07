const apiUrl = "https://api.jsoning.com/mock/public/products";
var products;

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
		fetch(apiUrl, {
			headers: {
				"accept": "application/json",
				"Cross-Origin-Resource-Policy": "cross-origin"
			}
		})
		.then(response => response.json())
		.then(result => products = result, () => products = "Product data unavailable")
		.then(() => ShowProducts());
	}
	else {
		ShowProducts();
	}
}

function ShowProducts() {
	let store = document.getElementById("shopdiv");
	if (products === "Product data unavailable") {
		let error = document.createElement("p");
		error.innerHTML = products;
		store.innerHTML = error;
	}
	else {
		store.innerHTML = "";
		for (var i = 0; i < products.length; i++) {
			let product = products[i];
			let productDiv = document.createElement("div");
			productDiv.id = product.id;
			productDiv.className = "product";
			productDiv.innerHTML =
				`<div class="product-image">
				<img src="${product.image_url}" alt="${product.name}" />
				</span>
				<h3>${product.name}</h3>
				<p>${product.description}</p>
				<p>Price: $${product.price}</p>
				<p>Category: ${product.category}</p>
				<p>Stock: ${product.stock}</p>
				<p>Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
				<button onclick="AddToCart(${product.id})">Add to Cart</button>
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