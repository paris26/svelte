<script>
    import {onMount} from 'svelte';
    import {auth, database} from '../lib/firebase/firebase';

    const nonAuthRoutes = ['/'];
    
    onMount(() => {
        console.log('mounted');
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            const currentPath = window.location.pathname;
            if (!user && !nonAuthRoutes.includes(currentPath)) {
                window.location.href = '/';
            }
        });
    });

</script>

<div class="mainContainer">
    <slot />
</div>


<style>
    .mainContainer {
        min-height: 100vh;
        background: linear-gradient(to right, #000428, #000046); 
        color: white;
        position : relative;
        display: flex;
        flex-direction: column;
    }

</style>