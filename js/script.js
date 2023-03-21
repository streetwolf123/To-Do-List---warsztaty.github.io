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

    const addNewTask = (newTask) => {
        tasks.push({
            content: newTask,
        });
        render();
    };

    const removeTask = (tasksIndex) => {
        tasks.splice(tasksIndex, 1);
        render();

    };

    const toggleTaskDone = (tasksIndex) => {
        tasks[tasksIndex].done = !tasks[tasksIndex].done;
        render();
    };

    const bindEvents = () => {
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


    }


    const render = () => {
        let taskObject = "";

        for (const task of tasks) {
            taskObject += `
            <li class="list__task list__tasks-flex ${task.done ? "list__tasks--done" : ""} ">
                
                <button class="js-done li__buttonDone li__button">
                    <i class="${task.done ? "fa-solid fa-check button__i" : ""}"></i>
                </button>
                              
                <p class="task-js paragraph-js paragraph-flex ${task.done ? "li__paragraph-done" : ""}"> ${task.content}</p>
                          
                <button class="task-js js-remove li__buttonRemove li__button">
                    <i class="fa-sharp fa-solid fa-xmark"></i>
                </button>
               
               
            </li>
            `;
        
        };
        
        document.querySelector(".list-js").innerHTML = taskObject;
        bindEvents();

       

    }




    const onFormSubmit = () => {

        const newTask = document.querySelector(".form__input-js");

        if (newTask === "") {

            return;

        } else {

            addNewTask(newTask.value.trim());
        };  
    };

    const init = () => {
        render();

        const form = document.querySelector(".form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            

            onFormSubmit();

            

        });
    };

    init();

};
