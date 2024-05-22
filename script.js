window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

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

    const deleteButtons = document.querySelectorAll('.delButt');
    function removeMe() {
        this.closest('div').remove();
    }
    deleteButtons.forEach( button => {
        button.addEventListener('click', removeMe); 
    });
};

function addItem() {
    let item = document.createElement('div');
        item.className = 'list_item';
        item.draggable = 'true';
    let item_input = document.createElement('input');
        item_input.setAttribute('type','textarea');
        item_input.setAttribute('placeholder','Type here..');
        item.appendChild(item_input);
    let item_b = document.createElement('button');
        item_b.type = 'button';
        item_b.className = 'delButt';
        item_b.innerHTML = '<img src="bin.svg" draggable="false">';
    item.appendChild(item_b);
    boxes[0].appendChild(item);
};


//function textValue() {
//    console.log(document.querySelector('#inputText').value);
//}