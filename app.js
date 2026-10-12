document.addEventListener("DOMContentLoaded", () => {
	const contenedor = document.getElementById("atlas-container");

	if (!contenedor) {
		console.error('No se encontró el contenedor "atlas-container".');
		return;
	}

	fetch("datos.json")
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Error HTTP ${response.status}`);
			}
			return response.json();
		})
		.then((casosForenses) => {
			if (!Array.isArray(casosForenses)) {
				throw new Error("El archivo datos.json debe contener una lista de casos.");
			}

			casosForenses.forEach((caso) => {
				const tarjeta = document.createElement("article");
				tarjeta.className = "card";

				const imagen = document.createElement("img");
				imagen.src = caso.imagen || "";
				imagen.alt = caso.titulo || "Imagen del caso";

				const contenido = document.createElement("div");
				contenido.className = "card-content";

				const categoria = document.createElement("span");
				categoria.className = "tag";
				categoria.textContent = caso.categoria || "Sin categoría";

				const titulo = document.createElement("h3");
				titulo.textContent = caso.titulo || "Caso sin título";

				const descripcion = document.createElement("p");
				descripcion.textContent = caso.descripcion || "";

				const hallazgo = document.createElement("p");
				const etiquetaHallazgo = document.createElement("strong");
				etiquetaHallazgo.textContent = "Hallazgo Clave: ";
				hallazgo.append(etiquetaHallazgo, document.createTextNode(caso.hallazgo_clave || "No especificado"));

				contenido.append(categoria, titulo, descripcion, hallazgo);
				tarjeta.append(imagen, contenido);
				contenedor.appendChild(tarjeta);
			});
		})
		.catch((error) => {
			console.error("Error al cargar los casos periciales:", error);
		});
});
