document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('product-form');
    const productList = document.getElementById('product-list');

    // Função para carregar os produtos da lista armazenada no localStorage
    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        productList.innerHTML = ''; // Limpa a lista de produtos

        if (products.length === 0) {
            productList.innerHTML = '<p>Nenhum produto cadastrado.</p>';
        } else {
            products.forEach((product, index) => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');

                productItem.innerHTML = `
                    <span>${product.name}</span>
                    <span>${product.quantity}</span>
                    <div>
                        <button class="edit" onclick="editProduct(${index})">Editar</button>
                        <button class="remove" onclick="removeProduct(${index})">Remover</button>
                    </div>
                `;

                productList.appendChild(productItem);
            });
        }
    }

    // Função para remover um produto
    window.removeProduct = function(index) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(index, 1); // Remove o produto do array
        localStorage.setItem('products', JSON.stringify(products)); // Atualiza o localStorage
        loadProducts(); // Recarrega a lista de produtos
    };

    // Função para editar um produto
    window.editProduct = function(index) {
        // Redireciona para a página de adicionar produto com o índice do produto a ser editado
        window.location.href = `add-product.html?edit=${index}`;
    };

    // Chama a função para carregar os produtos quando a página for carregada
    if (productList) {
        loadProducts();
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita o comportamento padrão do formulário

            const productName = document.getElementById('product-name').value;
            const productQuantity = document.getElementById('product-quantity').value;

            if (productName && productQuantity) {
                const products = JSON.parse(localStorage.getItem('products')) || [];
                const editIndex = new URLSearchParams(window.location.search).get('edit');

                if (editIndex !== null) {
                    // Modo de edição: atualiza o produto existente
                    products[editIndex] = { name: productName, quantity: productQuantity };
                } else {
                    // Modo de adição: adiciona um novo produto
                    products.push({ name: productName, quantity: productQuantity });
                }

                localStorage.setItem('products', JSON.stringify(products));

                // Exibe a mensagem de sucesso
                alert('Produto salvo com sucesso!');

                // Redireciona para a lista de produtos
                window.location.href = 'product-list.html';
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }

    // Preenche os campos do formulário se estiver no modo de edição
    const editIndex = new URLSearchParams(window.location.search).get('edit');
    if (editIndex !== null && form) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const product = products[editIndex];

        if (product) {
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-quantity').value = product.quantity;
        }
    }
});