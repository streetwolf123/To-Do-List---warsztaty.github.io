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

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((donebutton, index) => {
            donebutton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };



    const renderTasks = () => {
        const taskToHTLM = (task) => `
            <li class="list__task ${task.done && hideDoneTasks ? "list__tasks--hiden" : ""} ">                
                <button class="js-done task__button--toggleDone task__buttons">
                    <i class="${task.done ? "" : "button__toggleDone--none"}">✔</i>
                </button>
                       
                    <span class="task__content ${task.done ? "task__content--done" : ""}"> ${task.content}</span>
                   
                <button class="js-remove task__buttonRemove task__buttons">
                    🗑️
                </button>               
            </li>
            `;
        const tasksObject = document.querySelector(".js-list")
        tasksObject.innerHTML = tasks.map(taskToHTLM).join("");
    };

    const renderButtons = () => {
        const navButtons = document.querySelector(".js-list__headerButtons");

        if (!tasks.length) {
            navButtons.innerHTML = "";
            return;
        }
        navButtons.innerHTML = `           
                <button class="buttons js-header__buttonToggleAllDone" ${tasks.every(({ done }) => done) ? "disabled " : ""}>
                    Ukończ wszystkie
                </button>                    
                <button class="buttons js-header__buttonHideAllDone">
                    ${hideDoneTasks ? "Pokaz" : "Ukryj"} ukończone
                </button>           
            `;
    }

    const bindEventsNavButtons = () => {
        const toggleAllDoneObject = document.querySelector(".js-header__buttonToggleAllDone");

        if (toggleAllDoneObject) {
            toggleAllDoneObject.addEventListener("click", markAllTaskDone);
        };

        const hideAllDoneObject = document.querySelector(".js-header__buttonHideAllDone");

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

        const newTaskElement = document.querySelector(".js-form__input");
        const newTaskContent = newTaskElement.value.trim()

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        newTaskElement.value = "";

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
            document.querySelector(".js-form__input").focus();

        });
    };

    init();

};
