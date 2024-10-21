const apiUrl = "https://dummyjson.com/products";

// Função para buscar todos os produtos
async function fetchProducts() {
    const response = await fetch(apiUrl);
    return await response.json();
}

// Função para exibir produtos na tabela (para a página inicial, por exemplo)
async function displayProducts() {
    const products = await fetchProducts();
    const tbody = document.getElementById('productTableBody');
    tbody.innerHTML = '';

    products.products.forEach(product => {
        tbody.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduct(${product.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

function editProduct(id) {
    // Lógica de edição (pode ser um formulário ou algo semelhante)
    alert(`Editando produto com ID: ${id}`);
}

function deleteProduct(id) {
    // Aqui você pode implementar a lógica para remover o produto
    alert(`Produto com ID: ${id} foi excluído.`);
    // Depois de confirmar a exclusão, você pode chamar displayProducts() novamente para atualizar a lista
    // await removeProduct(id); // Implemente essa função para remover o produto do backend
    displayProducts(); // Atualiza a lista de produtos
}



// Função para exibir produtos filtrados
async function filterByCategory() {
    const category = document.getElementById('categorySelect').value;
    const products = await fetchProducts();
    const results = products.products.filter(product => product.category === category);
    
    const tbody = document.getElementById('filteredProductTableBody');
    tbody.innerHTML = '';
    results.forEach(product => {
        tbody.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
            </tr>
        `;
    });
}

// Função para buscar produtos com base na pesquisa
async function searchProduct() {
    const input = document.getElementById('searchInput').value;
    const products = await fetchProducts();
    const results = products.products.filter(product => product.title.toLowerCase().includes(input.toLowerCase()));
    
    const tbody = document.getElementById('searchResults');
    tbody.innerHTML = '';
    results.forEach(product => {
        tbody.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
            </tr>
        `;
    });
}

// Função para ordenar produtos em ordem alfabética
async function sortProducts() {
    const products = await fetchProducts();
    products.products.sort((a, b) => a.title.localeCompare(b.title));
    
    const tbody = document.getElementById('sortedProductTableBody');
    tbody.innerHTML = '';
    products.products.forEach(product => {
        tbody.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
            </tr>
        `;
    });
}

// Função para popular o seletor de categorias
async function populateCategories() {
    const products = await fetchProducts();
    const categories = [...new Set(products.products.map(product => product.category))];
    const categorySelect = document.getElementById('categorySelect');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Chamar as funções ao carregar as páginas
if (document.getElementById('productTableBody')) {
    displayProducts();
}
if (document.getElementById('filteredProductTableBody')) {
    populateCategories();
    document.getElementById('filterButton').onclick = filterByCategory;
}
if (document.getElementById('sortedProductTableBody')) {
    sortProducts();
}
if (document.getElementById('searchButton')) {
    document.getElementById('searchButton').onclick = searchProduct;
}

// Outras funções que você já tinha (se existirem)
// Exemplo de funções de editar e deletar produtos
function showEditForm(id, title, price) {
    // Função existente para editar produtos
}

async function deleteProduct(id) {
    // Função existente para deletar produtos
}
