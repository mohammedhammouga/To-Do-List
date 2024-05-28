document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task-button');

    const getTasks = async () => {
        const response = await fetch('/tasks');
        const tasks = await response.json();
        return tasks;
    };

    const addTask = async (task) => {
        await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task })
        });
    };

    const deleteTask = async (index) => {
        await fetch(`/tasks/${index}`, { method: 'DELETE' });
    };

    const renderTasks = async () => {
        const tasks = await getTasks();
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                await deleteTask(index);
                renderTasks();
            });
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    };

    addTaskButton.addEventListener('click', async () => {
        const task = newTaskInput.value.trim();
        if (task) {
            await addTask(task);
            newTaskInput.value = '';
            renderTasks();
        }
    });

    renderTasks();
});
