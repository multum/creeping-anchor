# Creeping Anchor

Плавающий указатель элемента меню с состоянием hover и подсвечивание в меню просматриваемой секции страницы. Demo: https://codepen.io/JoyZi/pen/eEbLaB

### Settings

Option | Type | Default 
------ | ---- | ------- 
speed | number | 500 
activeLinks | boolean | true
offsetLeft | number | 0 
anchors | boolean | false
onViewChange | function | null

### [Demo](https://codepen.io/JoyZi/pen/eEbLaB)

### Инициализация после подключения самого плагина

```javascript
$( document ).ready( function () {
     $( ".nav__list" ).creepingAnchor( {
        offsetLeft: 0,
        position: "bottom",
        speed: 400,
        anchors: true,
        onViewChange: function ( section ) {
           // onViewChange - callback смены активной области страницы
           // section - активная область страницы
        }
    } );
});
```
