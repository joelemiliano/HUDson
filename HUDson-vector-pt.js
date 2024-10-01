// HUDson source code
// joelemiliano 2024

mw.loader.using('mediawiki.util').then(function() {
    var listDiv = null;  // Variable para almacenar el div de la list
    var isAnimating = false;  // Bandera para evitar interacciones durante la animación

    // Get username
    var userName = mw.config.get('wgUserName');

    // Definimos la URL del archivo JS que queremos cargar, reemplazando el nombre de usuario
    var scriptUrl = mw.util.getUrl('User:' + userName + '/hudson.js', { action: 'raw', ctype: 'text/javascript' });
    var scriptPage = 'User:' + userName + '/hudson.js';  // Página del archivo

    // Función para verificar si el archivo jsload.js existe
    function verifyAndCreateHudsonFile() {
        // Verificamos si la página del script existe
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: mw.util.getUrl(scriptPage),
                method: 'GET',
                success: function() {
                    // La página existe
                    resolve(true);
                },
                error: function() {
                    // La página no existe, intentamos crearla
                    createHudsonFile().then(resolve).catch(reject);
                }
            });
        });
    }

    // Función para crear el archivo jsload.js si no existe
    function createHudsonFile() {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: mw.util.wikiScript('api'),
                type: 'POST',
                dataType: 'json',
                data: {
                    action: 'edit',
                    title: scriptPage,
                    text: "// === Alerta ===\nalert('Olá mundo!');",
                    token: mw.user.tokens.get('csrfToken'),  // Necesitamos el token CSRF para realizar la edición
                    format: 'json'
                },
                success: function(response) {
                    if (response && response.edit && response.edit.result === 'Success') {
                        mw.notify('hudson.js foi criado com sucesso na sua página de utilizador');
                        resolve(true);
                    } else {
                        mw.notify('Erro ao criar hudson.js', { type: 'error' });
                        reject();
                    }
                },
                error: function() {
                    mw.notify('Erro ao criar hudson.js', { type: 'error' });
                    reject();
                }
            });
        });
    }

    // Función para cargar y procesar el archivo jsload.js
    function loadScriptList() {
        // Si el menú ya está abierto, lo cerramos con animación
        if (listDiv) {
            closeMenuAnim();
            return;
        }

        // Si el menú no está abierto, lo cargamos
        fetch(scriptUrl)
            .then(response => response.text())
            .then(data => {
                // Dividimos el contenido en secciones usando el comentario especial "// === Nombre del Script ==="
                var scripts = data.split(/\/\/ === (.+) ===/);
                
                if (scripts.length > 1) {
                    showScriptListAnim(scripts);
                } else {
                    mw.notify('Não foram encontrados quaisquer scripts em hudson.js. Adicione alguns scripts!');
                }
            })
            .catch(error => {
                console.error('Erro ao carregar o ficheiro JS:', error);
            });
    }

    // Mostrar list de scripts con animación
    function showScriptListAnim(scripts) {
        // Crear un div para la list de scripts
        listDiv = document.createElement('div');
        listDiv.style.padding = '10px';
        listDiv.style.border = '1px solid #ccc';
        listDiv.style.backgroundColor = '#fff';
        listDiv.style.position = 'absolute';
        listDiv.style.right = '10px';
        listDiv.style.top = '50px';
        listDiv.style.zIndex = '1000';
        listDiv.style.opacity = '0';  // Para la animación inicial
        listDiv.style.transform = 'translateY(-20px)';  // Para la animación inicial
        listDiv.style.transition = 'opacity 0.25s, transform 0.25s';  // Animación CSS

        // Crear un título para la list
        var title = document.createElement('h3');
        title.textContent = 'Scripts do' + userName;
        title.style = 'color:#54595d; font-size:16px;';
        listDiv.appendChild(title);

        // Crear una list <ul> para mostrar los scripts
        var list = document.createElement('ul');

        // Iterar sobre los scripts y crear elementos de la list
        for (var i = 1; i < scripts.length; i += 2) {
            var scriptName = scripts[i].trim();
            var scriptCode = scripts[i + 1].trim();

            var listItem = document.createElement('li');
            var link = document.createElement('a');
            link.href = '#';
            link.textContent = scriptName;

            // Agregar el evento para cargar el script cuando se haga clic en el enlace
            link.onclick = (function(code) {
                return function(event) {
                    event.preventDefault();
                    runScript(code);
                };
            })(scriptCode);

            listItem.appendChild(link);
            list.appendChild(listItem);
        }

        listDiv.appendChild(list);
        document.body.appendChild(listDiv);

        // Añadir un pequeño retraso para que la animación ocurra después de la inserción en el DOM
        setTimeout(function() {
            listDiv.style.opacity = '1';
            listDiv.style.transform = 'translateY(0)';
        }, 10);
    }

    // Función para ejecutar el script seleccionado y cerrar el menú con animación
    function runScript(scriptCode) {
        var script = document.createElement('script');
        script.textContent = scriptCode;
        document.head.appendChild(script);  // Añadimos el script al <head>
        mw.notify('O script foi executado com sucesso');
        closeMenuAnim();  // Cerrar el menú después de ejecutar el script
    }

    // Función para cerrar el menú con animación
    function closeMenuAnim() {
        if (listDiv && !isAnimating) {
            isAnimating = true;
            listDiv.style.opacity = '0';
            listDiv.style.transform = 'translateY(-20px)';

            // Después de la animación, eliminar el menú
            setTimeout(function() {
                if (listDiv) {
                    listDiv.remove();
                    listDiv = null;
                    isAnimating = false;
                }
            }, 250);  // Duración de la animación (0.25s)
        }
    }

    // Creamos el enlace en la barra superior para cargar la list de scripts
    var listItem = document.createElement('li');
    listItem.id = 'pt-hudson';  // Le damos un ID único
    listItem.classList.add('mw-list-item');

    var link = document.createElement('a');
    link.href = '#';
    link.textContent = 'HUDson';
    link.title = 'Mostrar lista de scripts';
    link.style = 'font-weight:bold';
    link.onclick = function(event) {
        event.preventDefault();
        if (!isAnimating) {
            loadScriptList();  // Abrir o cerrar el menú
        }
    };

    listItem.appendChild(link);

    // Añadir el enlace a la barra de herramientas de usuario
    var personalTools = document.querySelector('.vector-menu-content .vector-menu-content-list');
    if (personalTools) {
        personalTools.appendChild(listItem);
    } else {
        console.error('O menu HUDson não existe');
    }

    // Verificar si el archivo jsload.js existe o crearlo si no
    verifyAndCreateHudsonFile().then(function() {
        mw.notify('hudson.js existe e está pronto');
    }).catch(function() {
        mw.notify('Não é possível verificar a existência de hudson.js e criá-lo', { type: 'error' });
    });
});

