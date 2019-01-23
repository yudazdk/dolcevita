if (typeof $ != 'function') {
    var $ = jQuery.noConflict();
}

var tasks = [];

getTasks();

function arrangeTasksData() {
    var rows = '';
    var completedTasks = 0;

    $( "#toal-tasks" ).html(tasks.length);

    tasks.forEach(function(task, i) {
        var row = '<tr> '
            + '<td>' + (i+1) + '</td>'
            + '<td>'+ task.name + '</td>'
            + '<td><button onclick=showEditModal(' + task.id + ',"' + task.name + '")>Edit</button></td>'
            + '</tr>';
        rows += row;

        if ( task.is_completed ) {
            completedTasks++;
        }
    });

    $("#completed-tasks" ).html(completedTasks);
    $("#remaining-tasks" ).html(tasks.length - completedTasks);

    $( "#table-body" ).html(rows);
}

function getTasks() {
    $.ajax({
        url: "api/index.php",
        method: "GET",
        data: { action : 'getAll' }
    }).done(function( response ) {
        tasks = JSON.parse(response);
        arrangeTasksData();
    });
}

function addTask(name) {
    $.ajax({
        url: "api/index.php",
        method: "GET",
        data: { action : 'add', name: name }
    }).done(function( response ) {
        tasks = JSON.parse(response);
        arrangeTasksData();
    });
}

function editTask(id, name, isCompleted) {

    $.ajax({
        url: "api/index.php",
        method: "GET",
        data: { action : 'edit', id: id, name: name, is_completed: isCompleted }
    }).done(function( response ) {
        tasks = JSON.parse(response);
        arrangeTasksData();
    });
}

function deleteTask(id) {
    $.ajax({
        url: "api/index.php",
        method: "GET",
        data: { action : 'delete', id: id }
    }).done(function( response ) {
        tasks = JSON.parse(response);
        arrangeTasksData();
    });
}

function showEditModal(id, name){
    $('#bs-example-modal-sm').modal('show');
    $('name').text(name)
}

function showAddModal() {
    $('name').text('')
}


$(document).ready(function () {

});