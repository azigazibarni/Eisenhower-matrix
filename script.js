let list_items = document.getElementsByClassName('list_item');
let box1 = document.getElementById('box_create');
let box2 = document.getElementById('box_2');
let box3 = document.getElementById('box_3');
let box4 = document.getElementById('box_4');
let box5 = document.getElementById('box_5');

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

function currYear() {
    document.getElementById("currYear").innerHTML = new Date().getFullYear();
}

function itemDraggable() {
    for(item of list_items) {
    item.addEventListener('dragstart', function(e) {
        let selected = e.target;
        if (selected.hasAttribute('type')) {
            return
        }
        if (selected.hasAttribute('src')) {
            return
        }
        //box create
        box1.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        box1.addEventListener('drop', function() {
            box1.appendChild(selected);
            selected = null;
        })
        //do
        box2.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        box2.addEventListener('drop', function() {
            box2.appendChild(selected);
            selected = null;
        })
        //schedule
        box3.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        box3.addEventListener('drop', function() {
            box3.appendChild(selected);
            selected = null;
        })
        //delegate
        box4.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        box4.addEventListener('drop', function() {
            box4.appendChild(selected);
            selected = null;
        })
        //delete
        box5.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        box5.addEventListener('drop', function() {
            box5.appendChild(selected);
            selected = null;
        })
    })
}
    const deleteButtons = document.querySelectorAll('.delButt');
    function removeMe() {
        this.closest('div').remove();
    }
    deleteButtons.forEach( button => {
      button.addEventListener('click', removeMe); 
    });
}

function addItem() {
    let item = document.createElement('div');
    let item_input = document.createElement('input');
    let item_b = document.createElement('button');
    item.className = 'list_item';
    item.draggable = 'true';
    item_input.setAttribute('type','textarea');
    item_input.setAttribute('placeholder','Start here..');
    item.appendChild(item_input);
    item_b.type = 'button';
    item_b.className = 'delButt';
    item_b.innerHTML = '<img src="bin.svg" draggable="false">';
    item.appendChild(item_b)
    box1.appendChild(item);
    itemDraggable();
}

var coll = document.querySelectorAll(".collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
        content.style.maxHeight = null;
    }
    else {
        content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}