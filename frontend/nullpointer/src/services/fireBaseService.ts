import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../configuration/firebaseConfig";

export const uploadFile = (file: File): Promise<string> => {
    return new Promise((resolve: any, reject: any) => {
        const storageRef = ref(storage, `uploads/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    resolve(downloadUrl);
                })
            }
        )
    });
}

export const findDownloadUrl = async (userId: number): Promise<string> => {
    try {
        const imageRef = ref(storage, `users/${userId}/profile.jpg`);
        const url = await getDownloadURL(imageRef);
        return url;
    } catch (error) {
        return "https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png";
    }
};