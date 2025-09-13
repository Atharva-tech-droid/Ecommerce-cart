document.addEventListener( "DOMContentLoaded", ()=>{

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMsg = document.getElementById("empty-cart");
    const cartTotalMsg = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-prices");
    const checkOutButton = document.getElementById("checkout-btn");

    const cart = []

    const products = [
        { id: 1, name: "Product 1", price: 19.99  },
        { id: 2, name: "Product 2", price: 29.99  },
        { id: 3, name: "Product 3", price: 59.999  },
    ];

    products.forEach(product =>{
        const productDiv = document.createElement("div");
        productDiv.classList.add("product")
        productDiv.innerHTML = ` <span>${product.name} - $${product.price.toFixed(2)}</span> 
        <button data-id = "${product.id}">Add To Cart</button>`;
        productList.appendChild(productDiv);

    })

    productList.addEventListener( "click", (e)=>{
        if( e.target.tagName === "BUTTON" ){
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find( p => p.id === productId );
            addToCart(product);
        }
    } )

    function addToCart(product){
        cart.push(product);
        renderCart()
    }

    function renderCart(){
        cartItems.innerText = "";
        let totalPrice = 0;

        if (cart.length > 0) {
            emptyCartMsg.classList.add("hidden");
            cartTotalMsg.classList.remove("hidden") ; // i want to display cart items thus not called render func in product array for each
            cart.forEach( (item, index)=>{
                totalPrice = totalPrice + item.price;
                const cartItem = document.createElement("div");
                cartItem.innerHTML = `${item.name} - ${item.price.toFixed(2)}`;
                cartItems.appendChild(cartItem);
                totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
            } )
        }
        else{
            emptyCartMsg.classList.remove("hidden")
        }
    }

    checkOutButton.addEventListener( "click", ()=>{
        cart.length = 0;
        totalPriceDisplay.textContent = `$0.00`;  // manually set the value zero
        alert("Checkout Successfully");
        renderCart();  // since we made cart length as 0 , all values are gone and now render func called thus now else part will run 
    } )
} )