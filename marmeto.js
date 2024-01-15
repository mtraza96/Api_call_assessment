document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

async function fetchProducts() {
    try {
        const response = await fetch('https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093');
        const data = await response.json();
        console.log('API Response:', data);
        displayProducts(data);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
function displayProducts(response) {
    const container = document.getElementById('productContainer');
    container.innerHTML = '';

    // Check if the 'data' property is present in the response
    if (response.hasOwnProperty('data') && Array.isArray(response.data)) {
        const products = response.data;

        products.forEach(product => {
            const item = document.createElement('div');
            item.className = 'listItem'; // Initially in list view

            // Adjust class based on view mode (list/grid)
            item.classList.add('gridItem');

            // Assuming each product is an object with 'product_title' and 'product_variants' properties
            const productBadge = product.product_badge;
            const productImage = product.product_image;
            const productTitle = product.product_title || 'N/A';
            const productVariants = product.product_variants || [];

            const variantList = productVariants.map(variant => {
        
                const variantDetails = Object.values(variant).join('/');

                return `<li>${variantDetails}</li>`;
            }).join('');

            item.innerHTML = `
            <div class="productBadge_container">
            <span class="product_badge">${productBadge}</span>
            <div class="image_container">
            <img src="https://img.freepik.com/premium-photo/white-cap-with-logo-it-is-shown-gray-background_81048-11806.jpg?w=740" class="product_image"/>
           </div>
            <ul class="variantList">
            <h3 class="product_Title">${productTitle}</h3> 
            ${variantList} 
            </ul>
                </div>
            `;

            container.appendChild(item);
        });
    } else {
        console.error('Invalid data format received from the API.');
    }
}


function toggleView() {
    const container = document.getElementById('productContainer');
    container.classList.toggle('listView');
    container.classList.toggle('gridView');
}

// Add functionality to highlight search key in input 

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
    const searchKey = searchInput.value.toLowerCase();
    const items = document.querySelectorAll('.listItem, .gridItem');

    items.forEach(item => {
        const itemText = item.innerText.toLowerCase();

        if (itemText.includes(searchKey)) {
            // Highlight matching text
            item.innerHTML = itemText.replace(
                new RegExp(`(${searchKey})`, 'ig'),
                '<span class="highlight">$1</span>'
            );
        } else {
            // Reset highlighting
            item.innerHTML = itemText;
        }
    });
});
