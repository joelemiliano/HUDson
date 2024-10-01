# HUDson
[en](https://github.com/joelemiliano/HUDson/edit/main/README.md)

Herramienta para MediaWiki para cargar scripts disponibles en tu archivo JS

## Descargo de responsabilidad
* Si no quieres de HUDson sea catalogado como una herramienta de disrupción, no mas ¡NO EJECUTES CODIGO MALICIOSO EN WIKIS PUBLICAS!
* NO CORRAS CODIGO QUE TE HA DADO ALGUN DESCONOCIDO SI NO SABES QUE HACE

## Como usar HUDson
Necesitas usar la versión indicada de HUDson dependiendo de la skin que usas, seleccionala aqui:
* [Vector 2010](https://github.com/joelemiliano/HUDson/blob/main/HUDson-vector-es.js) ([en](https://github.com/joelemiliano/HUDson/blob/main/HUDson-vector.js))

Si por ejemplo usted usa Vector 2010, copia el codigo para esa skin y pegalo en ``Especial:MiPágina/vector.js``.

Automaticamente el archivo JS de HUDson va a ser creado en ``Especial:MiPágina/hudson.js`` que contiene por defecto un script de ejemplo.

### Como añadir un script
Simple, va a  ``Especial:MiPágina/hudson.js`` y añade una linea, debe empezar con un comentario como este: ``// === Aqui va el titulo de el script ===`` (DEBE PONER EL ===). Luego no mas añade el codigo JS que quiere correr abajo del comentario.
