
console.log("loading state");

state = {}

stateProxy = new Proxy(state, {
    set(target, key, value) {
        target[key] = value;
        updateElement(key);
        return true;
    }
});

function updateElement(key) {
    const elements = document.querySelectorAll(`[data-var='${key}']`);
    elements.forEach(element => {
        element.innerHTML = stateProxy[key];
    });

    const listElement = document.querySelectorAll(`[data-list='${key}']`);
    listElement.forEach(element => {
        updateList(element, key);
    });
}

// Function to update list elements dynamically
function updateList(listElement, stateKey) {
    listElement.innerHTML = ""; // Clear existing list items
    const items = stateProxy[stateKey];
    console.log(`Updating list with items: ${items}`);
    items.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = item;
        listElement.appendChild(li);
    });
}

// TODO: This currently isn't hooked up - I think this needs to be done
//       to have dynamically added elements working
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            console.log(`node.nodeType: ${node.nodeType}`);
            if (node.nodeType === 1 && node.hasAttribute('data-var')) {
                console.log("var element added");
                const stateKey = node.getAttribute('data-var');
                // because this thing is hooked up to update when the value is changed.
                stateProxy[stateKey] = stateProxy[stateKey]; 
            }

            if (node.nodeType === 1 && node.hasAttribute('data-list')) {
                console.log("list element added");
                const stateKey = node.getAttribute('data-list');
                // because this thing is hooked up to update when the value is changed.
                stateProxy[stateKey] = stateProxy[stateKey]; 
            }
        });
    });
});

// Start observing the document for added elements
document.addEventListener("DOMContentLoaded", () => {
    // Start observing `document.body` for changes
    observer.observe(document.body, { childList: true, subtree: true });

    stateProxy.counter = 69;
});

// Two-way binding for input elements
document.addEventListener("input", event => {
    const element = event.target;
    const stateKey = element.getAttribute("data-linked");
    if (stateKey) {
        stateProxy[stateKey] = element.value;
    }
    console.log(`state changed: ${stateKey} -> ${state[stateKey]}`);
});

// Usage: Update state variables dynamically
setTimeout(() => {
    stateProxy.counter = 0;
}, 2000);

function increment(key) {
    stateProxy[key]++;
}

function addListElement(key) {
    console.log("this happened?");
    if (stateProxy[key] === undefined) {
        stateProxy[key] = [];
    }
    stateProxy[key] = stateProxy[key].concat("entry");
    console.log(`Example list: ${key} -> ${state[key]}`);
}

function addDiv() {
    const exampleDivSpot = document.getElementById("exampleDivSpot");
    
    if (exampleDivSpot) {
        const newParagraph = document.createElement("p");
        newParagraph.setAttribute("data-var", "counter");
        exampleDivSpot.replaceWith(newParagraph);
    } else {
        console.error("Element with id 'exampleDivSpot' not found.");
    }
}
