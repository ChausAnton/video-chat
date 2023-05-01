import { 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signInWithPopup, 
    signInWithEmailAndPassword, 
    signOut,
    sendPasswordResetEmail,
} from 'firebase/auth';
import { FirebaseData } from './firebaseDB';

export class FirebaseClient {
    static auth;
    
    static async signUp(payload) {
        await createUserWithEmailAndPassword(this.auth, payload.email, payload.password);
        await updateProfile(this.auth.currentUser, {displayName: payload.displayName});
    }

    static setAuth(auth) {
        this.auth = auth;
    }

    static async signInPopup(provider) {
        const { user } = await signInWithPopup(this.auth, provider);
        window.localStorage.setItem('user', JSON.stringify(user));
        await FirebaseData.saveUserEmail(user.email);
        return user;
    }

    static async signInEmail(payload) {
        const { user } = await signInWithEmailAndPassword(this.auth, payload.email, payload.password);
        window.localStorage.setItem('user', JSON.stringify(user));
        await FirebaseData.saveUserEmail(this.auth.currentUser.email);
        
        return user;
    }

    static async signOut() {
        window.localStorage.removeItem('user');
        return await signOut(this.auth);
    }

    static async passwordReset(payload) {
       return await sendPasswordResetEmail(this.auth, payload.email);
    }

    static getUser() {
        return JSON.parse(window.localStorage.getItem('user'));
    }
}

