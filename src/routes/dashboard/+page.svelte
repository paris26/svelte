<script>
    let todoList = ['Do the groceries'];
    let currTodo = '';
    let error = false;
    
    function addTodo() {
        if(!currTodo) {
            error = true;
            return;
        }
        todoList = [...todoList, currTodo];
        currTodo = '';
        error = false;
    }


   function editTodo(index) {
        currTodo = todoList[index];
        todoList = todoList.filter((_, i) => i !== index);

        setTimeout(() => {
        const input = document.querySelector('.enterTodo input');
        input.focus();
        input.setSelectionRange(currTodo.length, currTodo.length);
    }, 0);
    }       


    function removeTodo( index) {
         todoList = todoList.filter((_, i) => i !== index);
    }

</script>



<div class="mainContainer"> 
    <div class="headerConainer">
        <h1>Todo List</h1>
        <button><i class="fa-regular fa-floppy-disk"></i><p>Save</p></button>
    </div>
    <main>
        {#if todoList.length === 0 && currTodo === ''}
            <p>No todos added yet</p>
            <p>Add a todo to get started</p>
        {/if}
        {#each todoList as todo , index}
            <div class="todo">
                <p>
                    {index + 1}. {todo}
                </p>
                <div class="actions">
                    <i on:click={() => {editTodo(index)}} on:keydown={(e)=> {}} class="fa-regular fa-pen-to-square"></i>
                    <i on:click={() => {removeTodo(index)}} on:keydown={()=> {}} class="fa-solid fa-trash"></i>
                </div>
            </div>
        {/each}
    </main>
    <div class="enterTodo {error ? 'errorBorder' : ''}" >  
       <input 
            bind:value={currTodo} 
            on:keydown={(e) => {
                if(e.key === 'Enter') addTodo();
                }} 
            placeholder="Enter a todo"
        >
        <button on:click={addTodo}>Add</button>
    </div>
</div>


<style>

    .mainContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        min-height : 100vh;
        gap: 24px;
        padding: 24px;
        width : 100%;
        max-width: 1000px;
        margin: 0 auto;
    }

    .headerConainer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .headerConainer button {
        background: #003c5b;
        color: white;
        padding: 12px 18px;
        border: none;
        border-radius: 5px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    }

    .headerConainer button i {
         font-size: 1.2rem;
    }

    .headerConainer button:hover{
           opacity: 0.8;
    }

    main {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;
    }

    .todo {
        border-left: 1px solid cyan;
        padding: 8px 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;

    }

    .actions {
        display: flex;
        gap: 14px;
        align-items: center;
        font-size: 1.3rem;
    }

    .actions i {
         cursor: pointer;
    }

    .actions i:hover {
        color: coral;
    }

    .enterTodo {
        display: flex;
        align-items: stretch;
        border: 1px solid #0891b2;
        border-radius: 5px;
        overflow: hidden;
    }

    .errorBorder {
        border-color: coral !important;
    }

    .enterTodo input {
        background: transparent;
        border: none;
        padding: 14px;
        flex: 1;
        color: white;
    }

    .enterTodo input:focus {
        outline: none;
    }

    .enterTodo button {
        padding: 0 28px;
        background: #003c5b;
        color: white;
        border: none;
        font-weight: 600;
        cursor: pointer;

    }

    .enterTodo button:hover {
        opacity: 0.8;
    }


</style>