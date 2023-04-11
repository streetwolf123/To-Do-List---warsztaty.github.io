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
            <li class="list__task ${task.done && hideDoneTasks ? "list__tasks--hiden" : ""} ">                
                <button class="js-done li__buttonDone li__buttons">
                    <i class="${task.done ? "fa-solid fa-check button__i" : ""}"></i>
                </button>
                       
                    <span class="js-task paragraph-js ${task.done ? "li__paragraph-done" : ""}"> ${task.content}</span>
                   
                <button class="js-task js-remove li__buttonRemove li__buttons">
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
                <button class="list__buttons js-list__buttonAllDone list__buttonAllDone-flex" ${tasks.every(({ done }) => done) ? "disabled " : ""}>
                    Ukończ wszystkie
                </button>                    
                <button class="list__buttons js-list__buttonHideAllDone list__buttonHideAllDone-flex">
                    ${hideDoneTasks ? "Pokaz" : "Ukryj"} ukończone
                </button>           
            `;
    }

    const bindEventsNavButtons = () => {
        const toggleAllDoneObject = document.querySelector(".js-list__buttonAllDone");

        if (toggleAllDoneObject) {
            toggleAllDoneObject.addEventListener("click", markAllTaskDone);
        };

        const hideAllDoneObject = document.querySelector(".js-list__buttonHideAllDone");

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
