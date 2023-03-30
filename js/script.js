{
    let tasks = [
        {
            content: "jeść",
            done: false,
        },
        {
            content: "Spać",
            done: true,
        },
    ];

    let hideDoneTasks = false;

    const addNewTask = (newTask) => {

        tasks = [
            ...tasks,
            { content: newTask, done: false }
        ];
        render();
    };

    const removeTask = (taskIndex) => {

        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ]
        render();
    };

    const toggleTaskDone = (taskIndex) => {

        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };


    const markAllTaskDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true
        }));
        render()
    }

    const toggleHideDoneTask = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }


    const bindEventsListButtons = () => {

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const doneButtons = document.querySelectorAll(".js-done");

        doneButtons.forEach((donebutton, index) => {
            donebutton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };



    const renderTasks = () => {

        const taskToHTLM = (task) => `
            <li class="list__task list__tasks-flex ${task.done && hideDoneTasks ? "list__tasks--hiden" : ""} ">                
                <button class="js-done li__buttonDone li__buttons">
                    <i class="${task.done ? "fa-solid fa-check button__i" : ""}"></i>
                </button>
                       
                    <span class="task-js paragraph-js paragraph-flex ${task.done ? "li__paragraph-done" : ""}"> ${task.content}</span>
                   
                <button class="task-js js-remove li__buttonRemove li__buttons">
                🗑️
                </button>               
            </li>
            `;

        const tasksElement = document.querySelector(".list-js")
        tasksElement.innerHTML = tasks.map(taskToHTLM).join("");
    };

    const renderButtons = () => {

        const navButtons = document.querySelector(".nav__buttons-js");

        if (!tasks.length) {
            navButtons.innerHTML = "";
            return;
        }
        navButtons.innerHTML = `
            
                <button class="nav__buttons list__buttonAllDone-js list__buttonAllDone-flex" ${tasks.every(({ done }) => done) ? "disabled " : ""}>
                    Ukończ wszystkie
                </button>                    
                <button class="nav__buttons list__buttonHideAllDone-js list__buttonHideAllDone-flex">
                    ${hideDoneTasks ? "Pokaz" : "Ukryj"} ukończone
                </button>
           
            `;
    }

const bindEventsNavButtons = () => {

    const toggleAllDoneObject = document.querySelector(".list__buttonAllDone-js");

    if (toggleAllDoneObject) {
        toggleAllDoneObject.addEventListener("click", markAllTaskDone);
    };

    const hideAllDoneObject = document.querySelector(".list__buttonHideAllDone-js");

    if (hideAllDoneObject) {
        hideAllDoneObject.addEventListener("click", toggleHideDoneTask);
    };
}



const render = () => {
    renderTasks();
    bindEventsListButtons();

    renderButtons();
    bindEventsNavButtons();
};

const onFormSubmit = () => {

    const newTask = document.querySelector(".form__input-js");

    if (newTask.value === "") {

        return;

    } else {

        addNewTask(newTask.value.trim());

    };

    newTask.value = "";

};

const init = () => {

    render();

    const form = document.querySelector(".form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        onFormSubmit();

    });
    const buttonSend = document.querySelector(".form__button-send");

    buttonSend.addEventListener("click", () => {
        document.querySelector(".form__input-js").focus();

    });
};

init();

};
