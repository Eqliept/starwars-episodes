export function el(tag, options = {}) {
    const elm = document.createElement(tag);

    if (options.classes) {
        options.classes.map(element => {
            elm.classList.add(element);
        })
    }

    if (options.text) {
        elm.textContent = options.text;
    }

    if (options.attrs) {
        options.attrs.map(element => {
            const [[key, value]] = Object.entries(element);
            elm.setAttribute(key, value);
        })
    }

    return elm;
}