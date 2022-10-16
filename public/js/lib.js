export const createElement = (tag, className, innerHTML) => {
    const element = document.createElement(tag);
    element.className = className;
    element.innerHTML = innerHTML;

    return element;
};

export const removeAllChildren = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

export const showElement = (element) => { element.classList.replace('hidden', 'show') };
export const hideElement = (element) => { element.classList.replace('show', 'hidden') };