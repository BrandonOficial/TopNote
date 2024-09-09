//Parallax
var swiper = new Swiper('.Slider' , {
    autoplay:true,
    speed:1500,
    loop:true,
    parallax:true,

    navigation:{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
    },
});


//Board
const columns = document.querySelectorAll(".column__cards");

let draggedCard = null;

const dragStart = (event) => {
    draggedCard = event.target;
    event.dataTransfer.effectAllowed = "move";
};

const dragOver = (event) => {
    event.preventDefault();
};

const handleColumnHighlight = (target, add) => {
    if (target.classList.contains("column__cards")) {
        target.classList.toggle("column--highlight", add);
    }
};

const dragEnter = (event) => {
    handleColumnHighlight(event.target, true);
};

const dragLeave = (event) => {
    handleColumnHighlight(event.target, false);
};

const drop = (event) => {
    const { target } = event;
    handleColumnHighlight(target, false);
    if (target.classList.contains("column__cards")) {
        target.appendChild(draggedCard);
    }
};

const createRemoveButton = (card) => {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remover";
    removeBtn.className = "remove-btn";

    removeBtn.addEventListener("click", () => {
        card.remove();
    });

    return removeBtn;
};

const createCard = (event) => {
    const { target } = event;
    if (!target.classList.contains("column__cards")) return;

    const card = document.createElement("section");
    card.className = "card";
    card.draggable = true;
    card.contentEditable = true;

    // Adiciona o botão de remover
   // const removeBtn = createRemoveButton(card);
    //card.appendChild(removeBtn);

    card.addEventListener("focusout", () => {
        card.contentEditable = false;
        if (!card.textContent.trim()) card.remove();
    });

    card.addEventListener("dragstart", dragStart);

    // Adiciona evento de duplo clique para editar o card
    card.addEventListener("dblclick", () => {
        card.contentEditable = true;
        card.focus();
    });

    target.appendChild(card);
    card.focus();
};

columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);
    column.addEventListener("click", createCard); // Clique simples para criar card
});
