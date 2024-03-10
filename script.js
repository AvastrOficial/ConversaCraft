function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('active');
}

 function redirigirAGithub() {
    window.location.href = "https://github.com/hack-chat/main?tab=readme-ov-file";
  }
      
       function visitamigithub() {
    window.location.href = "https://github.com/AvastrOficial/ConversaCraft";
  }
      
      
      
      var contadorChats = 0;
        var chatData = JSON.parse(localStorage.getItem('chatData')) || [];

        window.onload = function () {
            cargarChatsGuardados();
        };

  function verificarNombreExistente(nombre) {
    var nombreExistente = false;
    var filas = document.querySelectorAll('#chatList tr');

    filas.forEach(function(fila) {
        var nombreEnFila = fila.children[3].textContent;
        if (nombreEnFila === nombre) {
            nombreExistente = true;
            document.getElementById('errorMessage').textContent = 'El nombre personalizado ya existe.';
            document.getElementById('errorMessage').style.display = 'block';
            setTimeout(function() {
                document.getElementById('errorMessage').style.display = 'none';
            }, 3000); // 3000 milisegundos = 3 segundos
        }
    });

    return nombreExistente;
}


function generarEnlace() {
    var inputText = document.getElementById('chatInput').value.trim();
    var linkOutput = 'https://hack.chat/?' + inputText;
    var chatList = document.getElementById('chatList');
    var alertaCaracter = document.getElementById('alertaCaracter');

    if (inputText.length > 10) {
        alertaCaracter.textContent = 'Por favor, ingrese al menos 10 caracteres.';
        alertaCaracter.style.display = 'block';
      
        // Ocultar el mensaje de alerta después de 3 segundos
        setTimeout(function() {
            alertaCaracter.style.display = 'none';
        }, 2000); // Duración de 3 segundos

        return; // Salir de la función si el texto es demasiado corto
    } else {
        alertaCaracter.style.display = 'none';
    }



    if (verificarNombreExistente(inputText)) {  
        return; // Salir de la función si el nombre ya existe
    }

    contadorChats++;
    var newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><button class="delete-button" onclick="borrarFila(this)">Borrar</button></td>
        <td>${contadorChats}</td>
        <td><a href="${linkOutput}" target="_blank">${linkOutput}</a></td>
        <td>${inputText}</td>
        <td>${getCurrentDateTime()}</td>
    `;
    chatList.appendChild(newRow);

    // Guardar en el almacenamiento local
    chatData.push({
        id: contadorChats,
        link: linkOutput,
        nombre: inputText,
        fechaHora: getCurrentDateTime()
    });
    localStorage.setItem('chatData', JSON.stringify(chatData));

    if (contadorChats > 5) {
        document.getElementById('tableContainer').style.overflowY = 'scroll';
    }
  
}

        function cargarChatsGuardados() {
            chatData.forEach(function (chat) {
                var newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td><button class="delete-button" onclick="borrarFila(this)">Borrar</button></td>
                    <td>${chat.id}</td>
                    <td><a href="${chat.link}" target="_blank">${chat.link}</a></td>
                    <td>${chat.nombre}</td>
                    <td>${chat.fechaHora}</td>
                `;
                document.getElementById('chatList').appendChild(newRow);
            });

            if (chatData.length > 5) {
                document.getElementById('tableContainer').style.overflowY = 'scroll';
            }
            contadorChats = chatData.length;
        }

        function getCurrentDateTime() {
            var now = new Date();
            var date = now.toLocaleDateString();
            var time = now.toLocaleTimeString();
            return date + ' ' + time;
        }

        function borrarFila(button) {
            var row = button.parentNode.parentNode;
            var id = parseInt(row.children[1].textContent);
            row.parentNode.removeChild(row);

            // Eliminar del almacenamiento local
            chatData = chatData.filter(function (chat) {
                return chat.id !== id;
            });
            localStorage.setItem('chatData', JSON.stringify(chatData));
            
            actualizarContadorChats();
        }

        function actualizarContadorChats() {
            contadorChats = 0;
            var filas = document.querySelectorAll('#chatList tr');
            filas.forEach(function (fila, index) {
                if (index !== 0) {
                    contadorChats++;
                    fila.children[1].textContent = contadorChats;
                }
            });
            if (contadorChats <= 5) {
                document.getElementById('tableContainer').style.overflowY = 'auto';
            }
        }
      
      // Obtener el elemento de entrada
var inputElement = document.getElementById('chatInput');

// Agregar un evento 'click' al campo de entrada
inputElement.addEventListener('click', function() {
    // Borra el texto del campo de entrada y muestra una animación simulada
    inputElement.value = ''; // Borra el texto
    inputElement.placeholder = 'Ingrese el texto personalizado'; // Muestra un mensaje temporal en el placeholder
    inputElement.classList.add('input-animation'); // Agrega la clase para la animación

    // Restablece el placeholder y remueve la clase después de un tiempo
    setTimeout(function() {
        inputElement.classList.remove('input-animation'); // Remueve la clase después de un tiempo
        inputElement.placeholder = 'Ingrese el texto personalizado'; // Restaura el placeholder
    }, 1000); // Duración de la animación en milisegundos
});
