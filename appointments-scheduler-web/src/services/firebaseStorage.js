import { 
    getStorage, 
    ref, 
    uploadBytes, 
    getDownloadURL,
    deleteObject,
} from 'firebase/storage';
import { FirebaseData } from './firebaseDB';
import { v4 as uuidv4 } from 'uuid';

export class FirebaseStorage {
    static storage;

    static setStorage(app) {
        this.storage = getStorage(app);
    }

    static async uploadImage(fileList, eventId) {
        const file = fileList[0];
        const storageRef = ref(this.storage, 'images/' + uuidv4());
        await uploadBytes(storageRef, file.originFileObj);
        const url = await getDownloadURL(storageRef);
        await FirebaseData.upadateEvent({image: url}, eventId);
    }

    static async deleteImage(url) {
        if(url) {
            const imageRef = ref(this.storage, url);
            return await deleteObject(imageRef);
        }
    }
}
