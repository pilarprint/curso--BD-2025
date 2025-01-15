const SUPABASE_URL = "https://nfpajmykxjulznjuluiw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mcGFqbXlreGp1bHpuanVsdWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzODIxNTEsImV4cCI6MjA1MTk1ODE1MX0.vYa2QIFMHgdRuNIriWmSXRRBjPm20bYGIS7BEGgBlAk";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// Función para obtener productos
async function fetchProductos() {
    try {
        const { data, error } = await supabase.from("productos").select("*");
        if (error) throw error;
        const productContainer = document.getElementById("product-container");
        productContainer.innerHTML = ""; // Limpiar contenedor
        data.forEach((producto) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
<img src="./imagenes/${producto.image_url}" alt="${producto.name}">
<h3>${producto.name}</h3>
<p>Precio: $${producto.price}</p>
`;
            productContainer.appendChild(productCard);
        });
    } catch (err) {
        console.error("Error obteniendo productos:", err);
    }
}
// Función para insertar una reseña
async function insertResena(username, message,idproduct) {
    try {
        const { error } = await supabase.from("resenas").insert([
            { username: username, message: message,product_id:idproduct },
        ]);
        if (error) throw error;
        alert("¡Reseña enviada con éxito!");
    } catch (err) {
        console.error("Error enviando reseña:", err);
        alert("Ocurrió un error al enviar tu reseña.");
    }
}
// Manejar envío del formulario de reseñas
document.getElementById("review-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const message = document.getElementById("message").value;
    await insertResena(username, message,idproduct);
    e.target.reset(); // Limpiar formulario
});
// Cargar productos al cargar la página
fetchProductos();

// Función para obtener productos filtrados
async function searchProducto() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    try {
        const { data, error } = await supabase
            .from("productos")
            .select("*")
            .ilike("name", `%${query}%`); // Filtrar productos por nombre
        if (error) throw error;
        renderProductos(data); // Re-renderizar los productos
    } catch (err) {
        console.error("Error buscando productos:", err);
    }
}
// Función para renderizar los productos
function renderProductos(data) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ""; // Limpiar contenedor
    data.forEach((producto) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
    <img src="imagenes/${producto.image_url}" alt="${producto.name}">
    <h3>${producto.name}</h3>
    <p>Precio: $${producto.price}</p>
    <button onclick="viewProductDetail(${producto.id})">Ver detalles</button>
    `;
        productContainer.appendChild(productCard);
    });
}

let idproduct=null

// Función para ver el detalle de un producto
async function viewProductDetail(productId) {
    idproduct=productId
    try {
        // Obtener detalle del producto
        const { data: producto, error: productoError } = await supabase
            .from("productos")
            .select("*")
            .eq("id", productId)
            .single();
        if (productoError) throw productoError;
        // Obtener reseñas del producto
        const { data: resenas, error: resenasError } = await supabase
            .from("resenas")
            .select("*")
            .eq("product_id", productId);
        if (resenasError) throw resenasError;
        // Mostrar detalles del producto
        document.getElementById("detalle-producto-name").innerText = producto.name;
        document.getElementById("detalle-producto-image").src =
            `imagenes/${producto.image_url}`;
        document.getElementById("detalle-producto-price").innerText =
            `$${producto.price}`;
        document.getElementById("detalle-producto-description").innerText =
            producto.description || "No hay descripción disponible.";
        // Mostrar reseñas
        const resenasContainer = document.getElementById("detalle-producto-resenas");
        resenasContainer.innerHTML = ""; // Limpiar reseñas previas
        resenas.forEach(resena => {
            const resenaDiv = document.createElement("div");
            resenaDiv.classList.add("resena-card");
            resenaDiv.innerHTML = `
    <strong>${resena.username}</strong>
    <p>${resena.message}</p>
    `;
            resenasContainer.appendChild(resenaDiv);
        });
        // Mostrar la sección de detalle del producto
        document.getElementById("producto-detalle").style.display = "block";
        document.getElementById("productos").style.display = "none";
    } catch (err) {
        console.error("Error obteniendo detalles del producto:", err);
    }
}
// Función para cerrar los detalles del producto
function closeProductDetail() {
    document.getElementById("producto-detalle").style.display = "none";
    document.getElementById("productos").style.display = "block";
}
