<script>
    import { doc, setDoc } from "firebase/firestore";
    import { authHandlers, authStore } from "../../store/store";
    import { database } from "$lib/firebase/firebase";
    import TodoCarousel from "../../components/TodoCarousel.svelte";

    let todoList = [];
    let currTodo = "";
    let error = false;

    $: showCookieConsent = !$authStore.cookies;

    function handleAcceptCookies() {
        authStore.update((store) => ({ ...store, cookies: true }));
    }

    function handleDeclineCookies() {
        authStore.update((store) => ({ ...store, cookies: false }));
    }

    authStore.subscribe((curr) => {
        todoList = curr.data?.todos || [];
    });

    function addTodo() {
        if (!currTodo) {
            error = true;
            return;
        }
        todoList = [...todoList, currTodo];
        currTodo = "";
        error = false;
    }

    function editTodo(index) {
        currTodo = todoList[index];
        todoList = todoList.filter((_, i) => i !== index);

        setTimeout(() => {
            const input = document.querySelector(".enterTodo input");
            input.focus();
            input.setSelectionRange(currTodo.length, currTodo.length);
        }, 0);
    }

    function removeTodo(index) {
        todoList = todoList.filter((_, i) => i !== index);
    }

    async function saveTodos() {
        try {
            const userRef = doc(database, "users", $authStore.user.uid);
            await setDoc(
                userRef,
                {
                    todos: todoList,
                },
                {
                    merge: true,
                },
            );
        } catch (e) {
            console.log(e);
        }
    }
</script>

{#if !$authStore.loading}
    <div class="mainContainer">
        <div class="headerConainer">
            <h1>Todo List</h1>
            <div class="headerButtons">
                <button on:click={saveTodos}
                    ><i class="fa-regular fa-floppy-disk"></i>
                    <p>Save</p></button
                >
                <button on:click={authHandlers.logout}
                    ><i class="fa-solid fa-right-from-bracket"></i>
                    <p>Logout</p></button
                >
            </div>
        </div>

        <main>
            <TodoCarousel {todoList} onEdit={editTodo} onRemove={removeTodo} />
            {#if todoList.length === 0 && currTodo === ""}
                <p>No todos added yet</p>
                <p>Add a todo to get started</p>
            {/if}
            {#each todoList as todo, index}
                <div class="todo">
                    <p>
                        {index + 1}. {todo}
                    </p>
                    <div class="actions">
                        <i
                            on:click={() => {
                                editTodo(index);
                            }}
                            on:keydown={(e) => {}}
                            class="fa-regular fa-pen-to-square"
                        ></i>
                        <i
                            on:click={() => {
                                removeTodo(index);
                            }}
                            on:keydown={() => {}}
                            class="fa-solid fa-trash"
                        ></i>
                    </div>
                </div>
            {/each}
        </main>
        <div class="enterTodo {error ? 'errorBorder' : ''}">
            <input
                bind:value={currTodo}
                on:keydown={(e) => {
                    if (e.key === "Enter") addTodo();
                }}
                placeholder="Enter a todo"
            />
            <button on:click={addTodo}>Add</button>
        </div>
        {#if showCookieConsent}
            <div class="cookie-consent">
                <div class="cookie-content">
                    <h2>Cookie Settings</h2>
                    <p>
                        We use cookies to enhance your browsing experience and
                        analyze our traffic. Please choose whether to accept
                        these cookies.
                    </p>
                    <div class="cookie-buttons">
                        <button on:click={handleAcceptCookies} class="accept">
                            Accept All
                        </button>
                        <button on:click={handleDeclineCookies} class="decline">
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        {/if}
    </div>
{/if}

<style>
    .mainContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        min-height: 100vh;
        gap: 24px;
        padding: 24px;
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
    }

    .headerConainer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .headerButtons {
        display: flex;
        align-items: center;
        gap: 14px;
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

    .headerConainer button:hover {
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
        font-size: 1.4rem;
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

    .cookie-consent {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 300px;
        background: navy;
        border: 1px solid navy;
        border-radius: 5px;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    }

    .cookie-content {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .cookie-content h2 {
        font-size: 1.2rem;
        color: white;
        margin: 0;
    }

    .cookie-content p {
        font-size: 0.9rem;
        color: white;
        margin: 0;
    }

    .cookie-buttons {
        display: flex;
        gap: 8px;
        margin-top: 8px;
    }

    .cookie-buttons button {
        padding: 8px 16px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.9rem;
    }

    .cookie-buttons .accept {
        background: blue;
        color: white;
    }

    .cookie-buttons .decline {
        background: transparent;
        border: 1px solid blue;
        color: white;
    }

    .cookie-buttons button:hover {
        opacity: 0.9;
    }
</style>
