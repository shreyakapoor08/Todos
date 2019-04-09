
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


$(function () { //window.onload in jquery si simply writing function in dollar function
    let newTaskBox = $('#newtask')
    let addTaskBtn = $('#addtask')
    let todolistDiv = $('#todolist')


    function refreshTodoList (todos) {
        todolistDiv.empty();

        for (todo of todos) {
            let newTodoItem = $(`
            <div class="todoitem row col-12">
            <input type="checkbox" class="col">
            <div class="col"></div>
            <div class="col-10">$(todo.task)</div>
            </div>`
            );
            todolistDiv.prepend(newTodoItem) // jis order mai fetch hua uske ulte order mai add ho jayega
        }
    }

    getAllTodos((todos) => refreshTodoList(todos))

    addTaskBtn.click(() => {
        addNewTodo(newTaskBox.val(), (todos) => refreshTodoList(todos))
    })
})