const searchForm = document.querySelector(".search-form")
const productList = document.querySelector(".product-list")

searchForm.addEventListener("submit", async function (event) {
    event.preventDefault()
    const inputValue = event.target[0].value

    const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${inputValue}`)
    const products = (await data.json()).results.slice(0, 10)

    displayItems(products)
})

function displayItems(products) {
    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3> ${product.title}</h3>
            <p class ="product-price">${product.price.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</p>
            <p class ="product-store">Loja:${product.seller.nickname}</p>
        </div>
    `).join("")
}