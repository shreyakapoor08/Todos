
 function getAllTodos (cb) { // cb is callback
     $.get('/todos/', (data) => {
         cb(data);
     })
 }

 function addNewTodo (task, cb) {
    $.post('/todos/', {
        task: task,
        userId: localStorage.getItem('userid')
    }, (data) => {
        cb(data);
    })
}
//${TodoId} - goes into params - see achaaa yeh kaise kara
function setTodoDone(todoId, done, cb) {
        $.post(`/todos/${todoId}`, {
           //this is what goes into body , if its a post req in case of AJAX
            done: done
        }, (todos) => {
            cb(todos)
        })
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
            let checkBox = $(`<input data-todoid="${todo.id}" onchange="setDone(this)" type="checkbox" class="col todo-done">`) // jab bhi koi event hota hai toh window.event sends the event that is happening now
            if (todo.done) {
                checkBox.prop('checked', true)
            }
            let newTodoItem = $(`
            <div class="todoitem row col-12">
                <div class="col"></div>
                <div class="col-10">${todo.task}</div> 
            </div>`
            );
            newTodoItem.prepend(checkBox)
            todolistDiv.prepend(newTodoItem) // jis order mai fetch hua uske ulte order mai add ho jayega
        }
    }

    window.setDone = function (el) {
        // when we tick any item we have an event and second we need to
        //find which element we tick
        let todoId = $(el).attr('data-todoid')
        //attr works like val only thing is in val--without arg it gets and with 1 arg it sets
        //attr mai with 1 arg it gets and with 2 arg it sets
        console.log(todoId)
        if (el.checked) {
            setTodoDone(todoId, true, refreshTodoList)
        } else {
            setTodoDone(todoId, false, refreshTodoList)
        }
    }


    getAllTodos((todos) => refreshTodoList(todos))

    addTaskBtn.click(() => {
        addNewTodo(newTaskBox.val(), (todos) => refreshTodoList(todos))
    })
})