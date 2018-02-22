# loadjs

JavaScript функция для асинхронной загрзуки скриптов прям из JS файлов.

### Пример

```
import loadJS from 'loadjs';

loadJS( "path/to/script.js", function() {
    // callback on file loaded
});
```