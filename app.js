document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('fileInput'); // Elemento input de archivo
  const uploadButton = document.getElementById('uploadButton'); // Botón para convertir a .ico
  const removeBgButton = document.getElementById('removeBgButton'); // Botón para quitar el fondo
  const result = document.getElementById('result'); // Contenedor para resultados

  // Convertir imagen a .ico
  uploadButton.addEventListener('click', function() {
    const file = fileInput.files[0]; // Obtener archivo seleccionado
    if (file) {
      // Lógica para convertir a .ico
    } else {
      alert('Por favor selecciona una imagen primero.');
    }
  });

  // Quitar fondo de la imagen
  removeBgButton.addEventListener('click', function() {
    const file = fileInput.files[0]; // Obtener archivo seleccionado
    if (file) {
      const reader = new FileReader(); // Crear FileReader para leer archivo
      reader.onload = function(event) {
        const img = new Image(); // Crear elemento de imagen
        img.src = event.target.result; // Asignar el resultado de FileReader como fuente de imagen
        img.onload = function() {
          const canvas = document.createElement('canvas'); // Crear elemento canvas
          const ctx = canvas.getContext('2d'); // Obtener contexto 2D del canvas
          canvas.width = img.width; // Asignar ancho de la imagen al canvas
          canvas.height = img.height; // Asignar altura de la imagen al canvas

          ctx.drawImage(img, 0, 0); // Dibujar la imagen en el canvas

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); // Obtener datos de la imagen
          const data = imageData.data; // Obtener los datos de los píxeles

          const threshold = 10; // Umbral para detección de fondo
          const bgColor = { r: data[0], g: data[1], b: data[2] }; // Color del fondo (primer píxel)

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i]; // Valor rojo del píxel
            const g = data[i + 1]; // Valor verde del píxel
            const b = data[i + 2]; // Valor azul del píxel

            // Comparar con el color de fondo
            if (Math.abs(r - bgColor.r) < threshold &&
                Math.abs(g - bgColor.g) < threshold &&
                Math.abs(b - bgColor.b) < threshold) {
              data[i + 3] = 0; // Hacer el píxel transparente
            }
          }

          ctx.putImageData(imageData, 0, 0); // Poner los datos modificados de vuelta en el canvas

          const imgURL = canvas.toDataURL('image/png'); // Crear URL de la imagen PNG
          result.innerHTML = `<p>¡Fondo eliminado!</p><a href="${imgURL}" download="image.png" class="btn">Descargar Imagen sin Fondo</a>`; // Mostrar enlace para descargar
        };
      };
      reader.readAsDataURL(file); // Leer archivo como URL de datos
    } else {
      alert('Por favor selecciona una imagen primero.');
    }
  });
});
