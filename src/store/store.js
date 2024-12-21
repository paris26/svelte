import { auth } from '$lib/firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { writable } from 'svelte/store';


// declare the AuthStore
export const authStore = writable({
    user: null,
    loading: true,
    data: {},
});


export const authHandlers = {
    signup : async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
    },
    login: async (email, password) => {
        await signInWithEmailAndPassword(auth , email, password);
    },
    logout: async () => {
        await signOut(auth);
    }
}

