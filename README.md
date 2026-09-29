# BitEggCoin

Landing page del prototipo académico BitEggCoin, una propuesta tecnológica y económica vinculada a la producción avícola en Guatemala. El sitio presenta el modelo, su operación, el escenario económico, el mercado, la plataforma propuesta, la organización y los riesgos del proyecto.

## Contenido

| Archivo o carpeta | Descripción |
| --- | --- |
| `index.html` | Estructura de la página, navegación, secciones informativas y formularios de demostración. |
| `styles.css` | Diseño adaptable, componentes, animaciones y estilos de la página y sus ventanas. |
| `script.js` | Navegación, ventanas, registro local, acceso al simulador externo y encuesta. |
| `BitEggCoin_Version_Final.pdf` | Documento académico descargable que sirve como fuente del contenido. |
| `Img/` | Ilustraciones utilizadas en la landing page. |

## Funcionalidad

- Navegación adaptable con menú móvil, enlaces a secciones y botón para volver al inicio.
- Contenido del proyecto: etapas, video, operación avícola, mercado, presupuesto, tecnología, estructura empresarial y riesgos.
- Descarga del documento PDF desde la sección de documentación.
- Acceso al simulador publicado en `https://becsimulator.netlify.app/`. El botón para explorar, el acceso de demostración y el acceso como invitado llevan a ese sitio.
- Formulario de registro demostrativo que guarda el nombre, correo y contraseña en el almacenamiento local del navegador. El inicio de sesión acepta la cuenta de demostración o la cuenta guardada en ese navegador y redirige al simulador.
- Encuesta de experiencia que guarda sus respuestas localmente en el navegador.

La landing page es estática y no tiene servidor, base de datos ni autenticación real. El registro y la encuesta son demostrativos; sus datos no se envían a ningún servicio. No uses información sensible ni contraseñas reutilizadas. El panel modal de ejemplo incluido en el HTML no forma parte del flujo activo de acceso.

## Ejecución

Abre `index.html` directamente en un navegador o sirve esta carpeta con una extensión como Live Server. No se requiere instalar dependencias ni compilar el proyecto. Para descargar correctamente el documento, conserva `BitEggCoin_Version_Final.pdf` junto a `index.html`.

## Acceso de demostración

- Correo: `usuario@biteggcoin.gt`
- Contraseña: `123456`

Este acceso solo permite probar el flujo de la landing page y redirige al simulador. Los datos productivos, económicos y de participación que presenta el proyecto son ilustrativos: el prototipo no procesa dinero, no opera con Bitcoin ni ofrece rendimientos.
