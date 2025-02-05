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
	fetch(apiUrl)
		.then(response => response.json())
		.then(result => products = result, () => products = "Product data unavailable");
		/* .then(data => {
			console.log(data);
			let output = '<h2>Products</h2>';
			data.forEach(function (product) {
				output += `
				<div>
					<h3>${product.name}</h3>
					<p>${product.description}</p>
				</div>
			`;
			});
			document.getElementById('output').innerHTML = output;
		}); */
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
//	fetch('https://api.github.com/users/defunkt')
//		.then(response => response.json())
//		.then(data => console.log(data));

//}