document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("atlas-container");
    const botonesFiltro = document.querySelectorAll(".filtro");
    const btnTema = document.getElementById("btn-tema");
    let todosLosCasos = [];

    // 1. Sistema de Modo Negatoscopio (Dark Mode)
    btnTema.addEventListener("click", () => {
        const body = document.body;
        if (body.getAttribute("data-theme") === "dark") {
            body.removeAttribute("data-theme");
            btnTema.textContent = "💡 Encender Negatoscopio";
        } else {
            body.setAttribute("data-theme", "dark");
            btnTema.textContent = "🔦 Apagar Negatoscopio";
        }
    });

    // 2. Cargar los datos desde tu archivo JSON
    fetch('datos.json')
        .then(response => response.json())
        .then(casos => {
            todosLosCasos = casos;
            renderizarCasos(todosLosCasos);
        })
        .catch(error => console.error("Error pericial al cargar los expedientes:", error));

    // 3. Sistema de Filtros Interactivos
    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", (e) => {
            // Quitar clase activo a todos y dársela al clicado
            botonesFiltro.forEach(btn => btn.classList.remove("activo"));
            e.target.classList.add("activo");

            const categoriaSeleccionada = e.target.getAttribute("data-cat");
            
            if (categoriaSeleccionada === "Todos") {
                renderizarCasos(todosLosCasos);
            } else {
                const casosFiltrados = todosLosCasos.filter(caso => caso.categoria === categoriaSeleccionada);
                renderizarCasos(casosFiltrados);
            }
        });
    });

    // 4. Función para dibujar las tarjetas con el Mini-juego
    function renderizarCasos(casos) {
        contenedor.innerHTML = ""; // Limpiar contenedor
        
        if(casos.length === 0) {
            contenedor.innerHTML = "<div class='sin-resultados'>No hay expedientes en esta categoría.</div>";
            return;
        }

        casos.forEach(caso => {
            const tarjeta = document.createElement("div");
            tarjeta.className = "card";
            
            tarjeta.innerHTML = `
                <div class="img-container">
                    <img src="${caso.imagen}" alt="${caso.titulo}" title="Pase el ratón para hacer zoom analítico">
                </div>
                <div class="card-content">
                    <span class="tag">${caso.categoria}</span>
                    <h3>${caso.titulo}</h3>
                    <p>${caso.descripcion}</p>
                    
                    <div class="seccion-dictamen">
                        <strong>Reto Pericial:</strong> Analiza la imagen y debate con tu equipo antes de revelar el dictamen oficial.
                        <button class="btn-revelar" onclick="revelarDictamen(this)">🔎 Revelar Dictamen</button>
                        <p class="hallazgo-oculto">${caso.hallazgo_clave}</p>
                    </div>
                </div>
            `;
            contenedor.appendChild(tarjeta);
        });
    }
});

// 5. Lógica del Mini-juego: Quitar la censura
function revelarDictamen(boton) {
    const textoOculto = boton.nextElementSibling;
    textoOculto.classList.add("revelado");
    boton.style.display = "none"; // Desaparece el botón una vez revelado
}
