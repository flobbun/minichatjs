export const createElement = (tag, className, innerHTML) => {
    const element = document.createElement(tag);
    element.className = className;
    element.innerHTML = innerHTML;

    return element;
};