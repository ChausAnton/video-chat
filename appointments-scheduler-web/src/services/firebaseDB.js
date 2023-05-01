import {
    collection,
    getDocs, 
    getFirestore, 
    where,
    query,
    addDoc,
    deleteDoc,
    doc,
    setDoc,
} from 'firebase/firestore';
import { FirebaseClient } from './firebaseAuth';

export class FirebaseData {
    static db;

    static setDB(app) {
        this.db = getFirestore(app);
    }

    static async saveUserEmail(email) {
       await setDoc(doc(this.db, 'users', email), {email});
    }

    static async getUserList() {
        const user = FirebaseClient.getUser();
        const usersCollection = collection(this.db, 'users');
        const q = query(
            usersCollection, 
            where('email', '!=', user.email),
        );

        const usersSnapshot = await getDocs(q);

        const usersList = usersSnapshot.docs.map(doc => {
            return doc.data();
        });

        return usersList;
    }

    static async getEvents(start, end) {
        const user = FirebaseClient.getUser();
        const eventCollection = collection(this.db, 'events');
        const q = query(
            eventCollection, 
            where('startDate', '>=', new Date(start)),
            where('startDate', '<=', new Date(end))
        );

        const eventSnapshot = await getDocs(q);
        const eventList = eventSnapshot.docs.map(doc => {
            const eventData = doc.data();
            eventData.id = doc.id;
            eventData.start = new Date(eventData.startDate.seconds * 1000);
            eventData.end = new Date(eventData.endDate.seconds * 1000);
            return eventData;
        });

        const events = eventList.filter(event => {
           
            if(event.status === 'public') {
                return true;
            }
            else if(user.email === event.authorEmail) {
                return true;
            }
            else if(event.users.indexOf(user.email) !== -1) {
                return true;
            }
            return false;
        });

        return events;
    }

    static async createEvent(data) {
        const docRef = await addDoc(collection(this.db, 'events'), data);
        return docRef.id;
    }

    static async deleteEvent(eventId) {
        const res = await deleteDoc(doc(this.db, 'events', eventId));
        return res;
    }

    static async upadateEvent(data, eventId) {
        return await setDoc(doc(this.db, 'events', eventId), data, {merge: true});
    }
}

