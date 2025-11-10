## Alternar temas de estilos

Cómo alternar temas:

1. Abre `Modulo 01/Basico/Ejercicio 02/mystyle.scss`.
2. Dentro verás líneas como estas (ejemplo):

```scss
@import "theme-a";
// @import "theme-b" ;
```

3. Para activar `theme-b` y desactivar `theme-a`, comenta la línea de `theme-a` y descomenta la de `theme-b`:

```scss
// @import "theme-a";
@import "theme-b" ;
```

4. Guarda el archivo y recompila tu SCSS.
