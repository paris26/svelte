<script>
    export let todoList = [];
    export let onEdit = (index) => {};
    export let onRemove = (index) => {};

    let currentIndex = 0;
    let isAnimating = false;

    function nextSlide() {
        if (isAnimating || todoList.length === 0) return;
        isAnimating = true;
        currentIndex = (currentIndex + 1) % todoList.length;
        setTimeout(() => (isAnimating = false), 500);
    }

    function prevSlide() {
        if (isAnimating || todoList.length === 0) return;
        isAnimating = true;
        currentIndex = (currentIndex - 1 + todoList.length) % todoList.length;
        setTimeout(() => (isAnimating = false), 500);
    }

    function goToSlide(index) {
        if (isAnimating) return;
        currentIndex = index;
    }

    function handleKeyDown(e, action) {
        if (e.key === "Enter" || e.key === " ") {
            action();
        }
    }

    $: {
        if (currentIndex >= todoList.length) {
            currentIndex = Math.max(0, todoList.length - 1);
        }
    }
</script>

<div class="carousel-wrapper" style="display: block;">
    {#if todoList.length > 0}
        <div class="carousel" role="region" aria-label="Todo items carousel">
            <div
                class="slides"
                style="transform: translateX(-{currentIndex * 100}%)"
            >
                {#each todoList as todo, index}
                    <div
                        class="slide"
                        role="group"
                        aria-label="Todo item {index + 1} of {todoList.length}"
                    >
                        <div class="todo-item">
                            <span class="todo-number" aria-hidden="true"
                                >{index + 1}</span
                            >
                            <p>{todo}</p>
                            <div class="actions">
                                <button
                                    class="icon-button"
                                    on:click={() => onEdit(index)}
                                    on:keydown={(e) =>
                                        handleKeyDown(e, () => onEdit(index))}
                                    aria-label="Edit todo"
                                >
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </button>
                                <button
                                    class="icon-button"
                                    on:click={() => onRemove(index)}
                                    on:keydown={(e) =>
                                        handleKeyDown(e, () => onRemove(index))}
                                    aria-label="Remove todo"
                                >
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>

            {#if todoList.length > 1}
                <button
                    class="nav-btn prev"
                    on:click={prevSlide}
                    aria-label="Previous todo"
                >
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button
                    class="nav-btn next"
                    on:click={nextSlide}
                    aria-label="Next todo"
                >
                    <i class="fa-solid fa-chevron-right"></i>
                </button>

                <div class="indicators" role="tablist">
                    {#each todoList as _, index}
                        <button
                            class="indicator {currentIndex === index
                                ? 'active'
                                : ''}"
                            on:click={() => goToSlide(index)}
                            role="tab"
                            aria-selected={currentIndex === index}
                            aria-label="Go to todo {index + 1}"
                        ></button>
                    {/each}
                </div>
            {/if}
        </div>
    {:else}
        <div class="empty-state" role="status">
            <p>Add todos to see them in the carousel</p>
        </div>
    {/if}
</div>

<style>
    .carousel-wrapper {
        width: 100%;
        margin: 24px 0;
        position: relative;
    }

    .carousel {
        position: relative;
        background: #001a2b;
        border: 1px solid #0891b2;
        border-radius: 5px;
        overflow: hidden;
        height: 180px;
        display: block;
        width: 100%;
    }

    .slides {
        display: flex;
        height: 100%;
        width: 100%;
        transition: transform 0.5s ease-in-out;
    }

    .slide {
        flex: 0 0 100%;
        min-width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 60px;
    }

    .todo-item {
        background: #003c5b;
        padding: 16px 20px;
        border-radius: 5px;
        width: 100%;
        position: relative;
        border-left: 3px solid cyan;
    }

    .todo-number {
        position: absolute;
        top: -10px;
        left: -10px;
        background: cyan;
        color: #001a2b;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 0.9rem;
    }

    .todo-item p {
        color: white;
        margin: 0;
        text-align: left;
        font-size: 1.1rem;
        padding-right: 80px; /* Space for actions */
    }

    .actions {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        gap: 14px;
        align-items: center;
    }

    .icon-button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1.3rem;
        padding: 4px;
    }

    .icon-button:hover {
        color: coral;
    }

    .nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: #003c5b;
        color: white;
        border: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.3s;
        z-index: 2;
    }

    .nav-btn:hover {
        opacity: 0.8;
    }

    .nav-btn.prev {
        left: 10px;
    }

    .nav-btn.next {
        right: 10px;
    }

    .indicators {
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
        z-index: 2;
    }

    .indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #4a5568;
        border: none;
        padding: 0;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .indicator.active {
        background: cyan;
    }

    .empty-state {
        text-align: center;
        color: white;
        padding: 20px;
        background: #001a2b;
        border: 1px solid #0891b2;
        border-radius: 5px;
    }
</style>
