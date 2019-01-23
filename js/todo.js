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
            + '<td>' + (i+1) + '</td>';

        if ( task.is_completed == 1) {
            row += '<td class="task-completed">' + task.name + '</td>';
        } else {
            row += '<td>' + task.name + '</td>';
        }

        row += '<td>' + task.created_at + '</td>'
            + '<td>' +
            '<button class="btn btn-primary" onclick=showEditModal(' + task.id + ') '
            + 'id="task_' + task.id + '"'
            + 'data-id="' + task.id + '"'
            + 'data-name="' + task.name + '"'
            + 'data-is_completed="' + task.is_completed + '"'
            + '>Edit</button> '
            + '<button class="btn btn-danger" onclick=deleteTask(' + task.id + ')>Delete</button> '
            + '</td>'
            + '</tr>';
        rows += row;

        if (task.is_completed) {
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
        method: "post",
        data: { action : 'add', name: name }
    }).done(function( response ) {
        tasks = JSON.parse(response);
        arrangeTasksData();
    });
}

function editTask(id, name, isCompleted) {
    $.ajax({
        url: "api/index.php",
        method: "post",
        data: { action : 'edit', id: id, name: name, is_completed: isCompleted }
    }).done(function( response ) {
        tasks = JSON.parse(response);
        arrangeTasksData();
    });
}

function deleteTask(id) {
    $.ajax({
        url: "api/index.php",
        method: "post",
        data: { action : 'delete', id: id }
    }).done(function( response ) {
        tasks = JSON.parse(response);
        arrangeTasksData();
    });
}

function showEditModal(id){

    $('#bs-example-modal-sm').modal('show');

    $('#name').val($('#task_' + id).attr('data-name'));

    $("#task-status select").val($('#task_' + id).attr('data-is_completed'));

    $('#task-status').removeClass('hidden');

    $("#save-button").attr('data-id', $('#task_' + id).attr('data-id'));

    $(".modal-title").text('Edit Task');
}

function showAddModal() {
    $('#bs-example-modal-sm').modal('show');

    $('#name').val('');

    $('#task-status').addClass('hidden');

    $("#save-button").attr('data-id', -1);

    $(".modal-title").text('Add Task');
}


$(document).ready(function () {

    $('#save-button').click( function () {
        var data_id = $(this).attr('data-id');

        if ( data_id == -1 ) {
            // Adding task
            addTask( $('#name').val() );
        } else {
            editTask(data_id, $('#name').val(), $("#task-status select").val());
        }

        $('#bs-example-modal-sm').modal('hide');
    });
});