function mostrarDetalles() {
    let detalles = document.getElementById("detallesReceta");
    if (detalles.style.display === "none") {
        detalles.style.display = "block";
    } else {
        detalles.style.display = "none";
    }
}