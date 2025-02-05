const apiUrl = "https://api.jsoning.com/mock/public/products";

function GetProducts() {
	fetch(apiUrl)
		.then(response => response.json())
		.then(data => {
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
		});
}

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