
// This whole file is crappy because it was written for a quick mini-project.
// Need extensive cleanup if you wanna use it to actually manage state in a
// project.
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
        if (stateProxy[key] === undefined) return;
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

// This gets dynamically added elements working. AFAIK nodeType===1 is a newly
// added thing.
// TODO find out what nodeType values mean
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

    // Set a variable (need to do it here, not in js global scope)
    stateProxy.counter = 69;

    // TODO: does this work for the 2-way input thing?
    // UPDATE: no - the value is cached in the input, not js state variable.
    //updateElement('textbind');

    // TODO: does this work for the 2-way input thing?
    // UPDATE: yes it does!
    const element = document.querySelector("[data-linked='textbind']");
    const stateKey = element.getAttribute("data-linked");
    if (stateKey) {
        stateProxy[stateKey] = element.value;
    }
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
