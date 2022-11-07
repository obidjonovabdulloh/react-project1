import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBybNWMO8IZMO2KlYJmTI6jdO9XDrL9W-0",
    authDomain: "crown-clothing-db-7b2a1.firebaseapp.com",
    projectId: "crown-clothing-db-7b2a1",
    storageBucket: "crown-clothing-db-7b2a1.appspot.com",
    messagingSenderId: "892449565051",
    appId: "1:892449565051:web:e765e3535673b2d72975de"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account",
})

export const auth = getAuth();

export const singInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider)

export const singInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider)

export const db = getFirestore();
    
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, "users", userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log("error users", error.message);
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const singInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}


export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);