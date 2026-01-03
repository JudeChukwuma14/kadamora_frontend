import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, type FirebaseStorage } from 'firebase/storage';

interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

function getFirebaseConfig(): FirebaseConfig {
    // const config: FirebaseConfig = {
    //     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    //     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    //     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    //     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    //     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    //     appId: import.meta.env.VITE_FIREBASE_APP_ID,
    // } as FirebaseConfig;

    const config: FirebaseConfig = {
        // apiKey: 'AIzaSyBQ3orH1u2If0Mae2-np49rzeB-VOuTmXU',
        // authDomain: 'clusma.firebaseapp.com',
        // projectId: 'clusma',
        // storageBucket: 'clusma.firebasestorage.app',
        // messagingSenderId: '375813556830',
        // appId: '1:375813556830:web:ba7866a123f91f1dbd02cf',
        // measurementId: 'G-56TE7J8T7P',
          apiKey: "AIzaSyAzq7qddjbdS0-W7B_Kjn2iO3oltSH34wc",
            authDomain: "kadamora-cfba2.firebaseapp.com",
            projectId: "kadamora-cfba2",
            storageBucket: "kadamora-cfba2.firebasestorage.app",
            messagingSenderId: "340591978898",
            appId: "1:340591978898:web:80226e8d1f32e1920cf94b",
            measurementId: "G-7SHDGKWYQB"
    } as FirebaseConfig;

    const missing = Object.entries(config)
        .filter(([, value]) => !value)
        .map(([key]) => key);

    if (missing.length > 0) {
        throw new Error(`Missing Firebase environment variables: ${missing.join(', ')}`);
    }

    return config;
}

let firebaseApp: FirebaseApp | null = null;
let storageInstance: FirebaseStorage | null = null;

function ensureFirebaseApp(): FirebaseApp {
    if (firebaseApp) return firebaseApp;
    const config = getFirebaseConfig();
    firebaseApp = getApps().length > 0 ? getApps()[0] : initializeApp(config);
    return firebaseApp;
}

export function getFirebaseStorage(): FirebaseStorage {
    if (storageInstance) return storageInstance;
    const app = ensureFirebaseApp();
    storageInstance = getStorage(app);
    return storageInstance;
}

export async function uploadFileToStorage(
    file: File,
    path: string,
    onProgress?: (percent: number) => void,
): Promise<string> {
    const storage = getFirebaseStorage();
    const fileRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(fileRef, file, {
        contentType: file.type || 'application/octet-stream',
    });

    return new Promise((resolve, reject) => {
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                if (!onProgress) return;
                const percent = snapshot.totalBytes ? (snapshot.bytesTransferred / snapshot.totalBytes) * 100 : 0;
                onProgress(Math.min(100, percent));
            },
            (error) => reject(error),
            async () => {
                try {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(url);
                } catch (error) {
                    reject(error);
                }
            },
        );
    });
}
