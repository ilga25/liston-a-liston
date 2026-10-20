# Listón a Listón

Herramienta gratuita para planificar el reparto horizontal de listones decorativos, calcular posiciones de marcado y estimar compra de barras. Sin dependencias, anuncios ni analítica. No es una calculadora estructural ni de barandillas.

Sitio previsto: https://ilga25.github.io/liston-a-liston/

## Publicación
GitHub Pages desde `main`, carpeta raíz. Archivos a publicar: index.html, como-repartir-listones.html, privacidad.html, 404.html, app.js, calc.js, style.css, favicon.svg, sitemap.xml, .nojekyll.

## Verificación
`node check.cjs`: 13 comprobaciones de ejemplo/errores y 32 combinaciones de invariantes. Fórmulas puras en calc.js. La revisión de navegador se registra en la cartera del chat de trabajo.

## Límites
Tramos sin obstáculos, ancho único, 2–300 piezas, cortes del mismo largo. La reserva se aplica a piezas; no incluye saneado de extremos. Sin comprobación de cargas o fijaciones. No se garantiza tráfico ni ingresos.


## Integración publicitaria
Código de AdSense instalado, mensaje europeo de Google publicado en español, con rechazo y gestión de opciones. Estado de aprobación publicitaria pendiente. Tras regenerar los archivos, ejecutar work/integrate_ads.py antes de desplegar para conservar esta integración y la privacidad actualizada.
