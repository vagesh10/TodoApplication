let todoItemContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveButton = document.getElementById("saveTodoButton");



function getTodoLIstFromLocalStorage() {
    let stringified = localStorage.getItem("todoList");
    let parseTOdo = JSON.parse(stringified);
    if (parseTOdo === null) {
        return [];
    } else {
        return parseTOdo;
    }
}

let todoList = getTodoLIstFromLocalStorage();



saveButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}


function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    console.log(checkboxElement.checked);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueId;
        if (eachTodoId === todoId) {
            return true
        } else {
            return false
        }
    })
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }

    /* if(checkboxElement.checked===true){
         labelElement.classList.add("checked");
     }else{
         labelElement.classList.remove("checked");
     }*/
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemContainer.removeChild(todoElement);
    let deleteEle = todoList.findIndex(function(eachTodo) {
        let eachtodoId = "todo" + eachTodo.uniqueId;
        if (eachtodoId === todoId) {
            return true
        } else {
            return false
        }
    })
    todoList.splice(deleteEle, 1);
    console.log(todoList);
}


function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueId;
    let labelId = "label" + todo.uniqueId;
    let todoId = "todo" + todo.uniqueId;
    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("todo-list-container", "d-flex", "flex-row");
    todoItemContainer.appendChild(todoElement);
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.placeholder = "What needs to be done?";


    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;

    inputElement.classList.add("checkbox-input");


    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.type = "label";
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelElement.classList.add("checkbox-label");
    labelContainer.appendChild(labelElement);


    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);
}
for (let eachTodo of todoList) {
    createAndAppendTodo(eachTodo);

}


function onAddTodo() {
    let todosCount = todoList.length;

    todosCount += 1;
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    if (userInputValue === "") {
        alert("Enter Valid input")
        return
    }
    let newTodo = {
        text: userInputValue,
        uniqueId: todosCount,
        isChecked: false
    }
    todoList.push(newTodo);
    console.log(todoList);

    createAndAppendTodo(newTodo);
    userInputElement.value = " ";
}
addTodoButton.onclick = function() {
    onAddTodo();

}
