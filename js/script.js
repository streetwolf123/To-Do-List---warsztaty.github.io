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

    const renderTasks = () => {
        let taskObject = "";

        for (const task of tasks) {
            taskObject += `
            <li class="list__task list__tasks-flex ${task.done ? "list__tasks--done" : ""} ">
                
                <button class="js-done li__buttonDone li__buttons">
                    <i class="${task.done ? "fa-solid fa-check button__i" : ""}"></i>
                </button>
                       
                    <p class="task-js paragraph-js paragraph-flex ${task.done ? "li__paragraph-done" : ""}"> ${task.content}</p>
                   
                <button class="task-js js-remove li__buttonRemove li__buttons">
                🗑️
                </button>
               
               
            </li>
            `;
        
        };
        
        document.querySelector(".list-js").innerHTML = taskObject;
        bindEvents();

       
    };

    const renderButtons = () => {

    };

   
  

    const render = () => {
       renderTasks();

    }




    const onFormSubmit = () => {

        

        const newTask = document.querySelector(".form__input-js");
        

        if(newTask.value === "") {

            return;

        } else {

            addNewTask(newTask.value.trim());
            
        };  

        newTask.value = "";

    }

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
