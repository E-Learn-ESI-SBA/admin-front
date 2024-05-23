import {FirebaseApp, initializeApp} from "firebase/app";
import {FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import {firebaseConfig} from "@/config/firebase";
import {FConfig} from "@/types";
export abstract class AbstractFirebase {
    abstract  uploadFile(file: File ): Promise<unknown>
}

export class Firebase extends AbstractFirebase{
    private firebase : FirebaseApp
    private storage: FirebaseStorage
    constructor(firebaseConfig:FConfig) {
        super()
        this.firebase = initializeApp(firebaseConfig)
        this.storage = getStorage(this.firebase)

    }

    uploadFile(file: File) {
        return new Promise((resolve, reject) => {
        const fileName = new Date().toISOString().split("T")[0] + file.name;
        const storageRef = ref(this.storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve({ imageUrl:downloadURL });
                });
            },
        );
    });
    }
}
export const firebaseService = new Firebase(firebaseConfig)