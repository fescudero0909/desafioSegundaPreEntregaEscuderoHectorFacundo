
class Product {
    constructor(id,name, weight, price, img, quantity) {
        this.id = id,   
        this.name = name,
        this.weight = weight,
        this.price = Number(price),
        this.img = img;
        this.quantity = quantity
    }
};

const coffe1 = new Product (1,'Bolivia', 250, 2000, '/assets/img/cafeBolivia.jpg',1);
const coffe2 = new Product (2,'Bolivia Caturra 48', 250, 2500, '/assets/img/cafeBoliviaCaturra48.jpg',1);
const coffe3 = new Product (3,'Bolivia Caturra 72', 250, 2500, '/assets/img/cafeBoliviaCaturra72.jpg',1);
const coffe4 = new Product (4,'Bolivia Caturra NAT', 250, 1500, '/assets/img/cafeBoliviaCaturraNAT.jpg',1);
const coffe5 = new Product (5,'Brasil', 250, 3000, '/assets/img/cafeBrasil.jpg',1);
const coffe6 = new Product (6,'Colombia Volcanico', 250, 3500, '/assets/img/cafeColombiaVolcanico.jpg',1);
const coffe7 = new Product (7,'Colombia El Corazón', 250, 3500, '/assets/img/cafeColombiaElCorazon.jpg',1);

//creamos arrays de productos

const products = [
    coffe1,
    coffe2,
    coffe3,
    coffe4,
    coffe5,
    coffe6,
    coffe7
];

const shoppingCart =[];



//elemento contenedor de las tarjeta de productos
function gridproducts (){

const contenedor = document.getElementById('container-cards');

//recorremos nuestro array de products

products.forEach( product => {
    
    //creamos el elemento contenedor de las tarjetas de productos
    const div = document.createElement('div');

    div.classList.add ('tarjetas');
    div.classList.add ('col-12');
    div.classList.add ('col-sm-6');
    div.classList.add ('col-lg-4');

    //insertamos el HTML
    div.innerHTML = `
        
            <div class="tarjetaProducto col-12">
                <p class="producto">${product.name}</p>
                <img class="imgProducto img-fluid col-12" src=${product.img} alt="">
                <div class="row align-items-center">
                    <a class="btn btnAgregar col-6 m-3" id="${product.id}">Agregar al carrito</a>
                    <p class="precio col-5 text-center mb-0">$ ${product.price}</p> 
                </div>
            </div> 
        `;    

    contenedor.appendChild(div);

    //para agregar cada producto diferenciado por el id utlizando evento CLICK
    div.querySelector('.btnAgregar').addEventListener('click', () =>{

        addShoppingCart (product.id);

        saveProductStorage  (shoppingCart)

    })

});

}

gridproducts();

//funcion para agregar al carrito
function addShoppingCart (id) {

    //obtenemos los datos de los productos pr el id
    let datos = products.find(products => products.id === id);
    //console.log (datos);

    //buscamos dentro del nuevo array los productoos con id iguales y los agrupamos
    let SumaProductosEnCarrito = shoppingCart.find (products => products.id === id);
            
    if (SumaProductosEnCarrito){
        SumaProductosEnCarrito.quantity++;
    } else{
        datos.quantity = 1;
        shoppingCart.push(datos);
        console.log(shoppingCart);
    }

    //mensaje de confirmación incorporacion al carrito
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Agregado al carrito',
        showConfirmButton: false,
        timer: 1500
    })

        
    counterCart();
    saveProductStorage  (shoppingCart)
    cartview ();
    totalToPay ();
   
    
    
}

//hago una funcion para ver el contenido del carrito 

function  cartview (){
    //Llamo al carrito HTML
    const cart = document.getElementById('carrito');

    //limpia el array  cada vez que hago click en el boton comprar y los agrupa por producto
    cart.innerHTML = ' ';

    //Elemento contenedor del  carrito
    shoppingCart.forEach ((product, id) =>{
        const div = document.createElement('div');

        div.classList.add ('col-12');

        div.innerHTML = `
            <div class="row align-items-center">
                <img class="imgProductoCarrito img-fluid col-3 m-2" src=${product.img} alt="">
                <p class="producto col-3  m-2">${product.name}</p>
                <p class="col-2 m-2">Cantidad: ${product.quantity}</p>
                <p class="precio col-2  m-2">$ ${product.price} x unid.</p>
                <a class="btnEliminar col-1 m-2" >Eliminar</a>
            </div>

        `
        //evento al boton eliminar para los productos en el carrito
        div.querySelector('.btnEliminar').addEventListener ('click', () =>{
            deleteProductOfCart (id);
        })
        
        

        cart.appendChild(div);
        
        

    })
}

//elimiar del carrito
function deleteProductOfCart (id) {
    
    shoppingCart[id].quantity--

    if(shoppingCart[id].quantity === 0){
        shoppingCart.splice (id, 1);
    }

    counterCart();

    //mensaje de eliminacion del producot en el carrito
    Swal.fire({
        position: 'center',
        icon: 'error', 
        title: 'Porducto Eliminado',
        showConfirmButton: false,
        timer: 1500
    })
    
    totalToPay ()
    cartview()
} 

//llamo al contador para que sume la cantidad de productos(id) en el carrito (burbuja al lado del carrito)
function counterCart() {
    const counterCart = document.getElementById('contadorCarrito');
    counterCart.innerText = shoppingCart.length
}



//resumen de compra (descripción y monto a pagar)
function totalToPay (){
    let subtotal = 0;
    let iva = 0;
    let total =  0;

    shoppingCart.forEach((products) => {
        subtotal += products.price * products.quantity;
        iva = subtotal * 0.21;
        total = subtotal + iva;
    })

    const totalPay = document.getElementById('total');
        
    totalPay.innerText =  `El total a pagar (incluido impuestos) es $ ${total}`
        
    //ventana al tocar el boton finalizar
    document.getElementById ('btnFinalizar').addEventListener ('click', () =>{
        Swal.fire({
            title: `El detalle de su factura es:
                    

                    Subtotal = $ ${subtotal}
                    IVA = $ ${iva}

                    Total = $ ${total}
                    `,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    })
}

    
//Storage
const saveProductStorage = (shoppingCart) =>{
    const enJSON = JSON.stringify(shoppingCart);
    localStorage.setItem ('Products in shopping cart' , enJSON);
    
}    














