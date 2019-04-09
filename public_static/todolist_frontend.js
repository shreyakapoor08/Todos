
 function getAllTodos (cb) {
     $.get('/todos/', (data) => {
         cb(data);
     })
 }

 function addNewTodo (task, cb) {
    $.post('/todos/', {
        task: task
    }, (data) => {
        cb(data);
    })
}

function setDone(el) {
    // when we tick any item we have an event and second we need to
    //find which element we tick
    if (el.checked) {

    } else {

    }
}


$(function () { //window.onload in jquery si simply writing function in dollar function
    let newTaskBox = $('#newtask')
    let addTaskBtn = $('#addtask')
    let todolistDiv = $('#todolist')
    let inputCheckBox = $('input.todo-done')
    console.log(inputCheckBox)


    function refreshTodoList (todos) {
        todolistDiv.empty();

        for (todo of todos) {
            console.log(todo)
            let newTodoItem = $(`
            <div class="todoitem row col-12">
            <input data-todoid="${todo.id}" onchange="setDone(this)" type="checkbox" class="col todo-done"> <!--jab bhi koi event hota hai toh window.event sends the event that is happening now -->
            <div class="col"></div>
            <div class="col-10">${todo.task}</div> 
            </div>`
            );
            todolistDiv.prepend(newTodoItem) // jis order mai fetch hua uske ulte order mai add ho jayega
        };
    }

    getAllTodos((todos) => refreshTodoList(todos))

    addTaskBtn.click(() => {
        addNewTodo(newTaskBox.val(), (todos) => refreshTodoList(todos))
    })
})