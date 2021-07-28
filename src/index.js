module.exports = function check(str, bracketsConfig) {
    let indClose,
        bOpen,
        bStr, normalized,
        i = 0, lev = 0,
        find = false,
        left, right;
    
    if (str.length === 0) return true;

    // конфиг в виде строки
    bStr = bracketsConfig.reduce((pattrn, x) => pattrn + x[0] + x[1], '');

    // строка только со скобками, избавились от лишних символов
    normalized = str.split('').filter(x => bStr.indexOf(x) >= 0 ? x : '').join('');

    // открытая скобка и позиция закрытой скобки в конфиге
    bOpen = normalized[0];
    indClose = bStr.indexOf(bOpen) + 1;

    // закрытая скобка
    while (!find && i < normalized.length - 1) {
        // кроме искомой закрывающейся скобки может открыться еще одна, сохраним уровень
        if (normalized[i + 1] === bOpen && bOpen != bStr[indClose]) {
            lev++;
            find = false
        }
        if (normalized[i + 1] === bStr[indClose]) {
            if (lev > 0) {
                lev--;
                find = false;
            } else {
                find = true;
            }
        }
        i++;
    }

    if (!find) return false;

    left = normalized.replace(bOpen, '').substring(0, i - 1);
    right = normalized.slice(i + 1);

    return !find ? false : true && check(normalized.replace(bOpen, '').substring(0, i - 1), bracketsConfig) && check(normalized.slice(i + 1), bracketsConfig);
}
