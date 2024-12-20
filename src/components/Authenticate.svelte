<script>
let email = "";
let password = "";
let confirmPass = "";
let error = false;
let register = false;

function handleAuthenticate() {
    if(!email || !password || (register && !confirmPass)) {
        alert("Please fill in all the fields");
        error = true;
        return;
    }
}


function handleRegister() {
    register = !register;
}
</script>



<div class="authContainer"> 
    <form>
        <h1>{register ? "Register" : "Login"}</h1>
        {#if error}
            <p class="error">The information you entered is incorrect</p>
        {/if}
            <label>
                <p class={email ? "above": "center"}> Email</p>
                <input bind:value={email} type="email" placeholder="Email">
            </label>
            <label >
                <p class={password ? "above": "center"}> Password</p>
                <input bind:value={password} type="password"  placeholder="Password">
            </label>     
            {#if register}        
                <label>
                    <p class={confirmPass ? "above": "center"}> Confirm Password</p>
                    <input bind:value={confirmPass} type="password" placeholder="Confirm Password">
                </label>
            {/if}
            <button type="button">Submit</button>
    </form>

    <div class="options">
         <p>Or</p>
        {#if register}
            <div>
                <p>Already have an account?</p>
                <p on:click={handleRegister} on:keydown={() => {}}>Login</p>
            </div>  
        {:else}
            <div>
                <p>Don't have an account?</p>
             <p on:click={handleRegister} on:keydown={() => {}}>Register</p>
            </div>
        {/if}
    </div>

</div>


<style>
    .authContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        padding: 20px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

    form, .options {
        width: 400px;
        max-width: 100%;
        margin: 0 auto; 
    }

    form input {
        width: 100%;
    }

    h1 {
        text-align: center;
        font-size: 3rem;
    }

    form label {
        position : relative;
        border: 1px solid navy;
        border-radius: 5px;
    }
    
    form label:focus-within {
       border-color: blue;
    }

    form input {
        border : none;
        background: transparent;
        color: white;
        padding : 14px; 
    }

    form input:focus {
        border : none;
        outline: none;
        font-size: 1.2rem;
    }


    form button {
        background: navy;
        color: white;
        padding: 14px 0;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1.2rem;
    }

    form button:hover {
        background: blue;
    }
    
    .above,
    .center {
        position: absolute;
        transform: translateY(-50%);
        pointer-events: none;
        color : white;
        border-radius : 5px;
        padding: 0 6px;
        font-size: 0.8rem;
    }

    .above{
        top: 0;
        left: 24px;
        background: navy;
        border: 1px solid navy;
        font-size: 0.9rem;
    }

    .center {
        top: 50%;
        left: 6px;
        border: 1px solid transparent;
        opacity: 0;
    }

    .options{
        padding: 14px 0;
        overflow: hidden;
        font-size: 0.9rem;
        display: flex;
        flex-direction: column;
         gap: 8px;
    }

    .options > p {
        position: relative;  
        text-align: center;
        width: fit-content ;
        margin: 0 auto;
        padding: 0 14px;
    }   
    .options > p::after,
    .options > p::before{
        position: absolute;
        content: "";
        top: 50%;
        transform: translateY(-50%);
        width: 100vw;
        height: 1.5px;
        background: white;
    }

    .options > p::after{
        right: 100%;
    }

    .options > p::before{
        left: 100%;
    }

    .options > div {
        display: flex;
        align-items: center;
        gap: 8px;
        justify-content: center;
    }

    .options > div p:last-of-type {
        color: cyan;
        cursor: pointer;
    }

</style>