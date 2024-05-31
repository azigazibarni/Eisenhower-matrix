window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

window.addEventListener('beforeunload', (event) => {
    addToLocalStorage();
    event.preventDefault();
    event.returnValue = '';  
});

(function () {
    document.getElementById("currYear").innerHTML = new Date().getFullYear();
})();

(function () {
    let coll = document.querySelectorAll(".collapsible");
    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            }
            else {
                content.style.maxHeight = content.scrollHeight + "px";
            } 
        });
    };
})();

(function () {
    let messageContainer = document.getElementById("messageContainer");
    let messageTitle = document.getElementById("messageTitle");
    let messageText = document.getElementById("messageText");
    let messageButton = document.getElementById("messageButton");

    messageButton.onclick = function(){
        this.closest('div').remove();
    }

    if (typeof(localStorage) !== "undefined") {
        messageTitle.innerHTML = "Localstorage found!";
        messageText.innerHTML = "This site uses your browser's built-in localstorage API to store data locally.";
        messageContainer.style.borderColor = 'green';
        messageTitle.style.color = 'green';
    }
    else {
        messageTitle.innerHTML = "Localstorage not found!";
        messageText.innerHTML = "This site is designed to use your browser's built-in localstorage API to store data locally. However, it is currently unavaliable."
        messageContainer.style.borderColor = 'maroon';
        messageTitle.style.color = 'maroon';
    }
})();

let boxes = document.getElementsByClassName('dropBox');
function itemDraggable() {
    this.addEventListener('dragstart', function(e) {

        let selected = e.target;
        if (selected.tagName === "INPUT" || selected.tagName === "IMG") {return}
        
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].addEventListener('dragover', function(e) {
                e.preventDefault();
            });
            boxes[i].addEventListener('drop', function() {
                try {boxes[i].appendChild(selected);}
                catch {return}
                finally {selected = null;}
            });
        } 
    });
};

function addItem(box = boxes[0], value = '') {
    function removeMe() {
        this.closest('div').remove();
    }
    let item = document.createElement('div');
        item.className = 'list_item';
        item.draggable = 'true';
    let item_input = document.createElement('input');
        item_input.setAttribute('type','textarea');
        item_input.setAttribute('placeholder','Type here..');
        item_input.value = value;
        item.appendChild(item_input);
    let item_b = document.createElement('button');
        item_b.type = 'button';
        item_b.className = 'delButt';
        item_b.innerHTML = '<img src="bin.svg" draggable="false">';
        item_b.addEventListener('click', removeMe); 
    item.appendChild(item_b);
    box.appendChild(item);
};

const keys = ['box_create', 'box_do', 'box_schedule', 'box_delegate', 'box_delete'];
const containers = [document.getElementById('box_create'), document.getElementById('box_do'), document.getElementById('box_schedule'), document.getElementById('box_delegate'), document.getElementById('box_delete')];

function loadLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(keys[i]) != '') {
            var rContent = localStorage.getItem(keys[i]);
            try {
                var content = rContent.split(";");
                for (let j = 0; j < content.length; j++) {
                    addItem(containers[i], content[j]);
                }
            }
            catch {
                addItem(containers[i], rContent)
            } 
        }
    }
    localStorage.clear()
}
loadLocalStorage();

function addToLocalStorage() {
    localStorage.clear()
    var inputStrings = [[], [], [], [], []];
    var inputFields = document.getElementsByTagName('input');
    for (let i = 0; i < inputFields.length; i++) {
        if (inputFields[i].value != '') {
            var currentListItem = inputFields[i].parentElement;
            var currentBox = currentListItem.parentElement;
            inputStrings[keys.indexOf(currentBox.id)].push(String(inputFields[i].value));
        }
    }
    for (let i = 0; i < inputStrings.length; i++) {
        try {
           var finalstring = String(inputStrings[i].join(';')); 
        }
        catch {
            var finalstring = inputStrings[i];
        }
        if (finalstring != '') {
            localStorage.setItem(keys[i], finalstring)
        }
        else {
            localStorage.setItem(keys[i], '')
        }
    }
}