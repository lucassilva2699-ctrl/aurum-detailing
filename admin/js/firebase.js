// ======================================
// FIREBASE
// ======================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    setDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyCpy9qxQp25l44vKJdT9c0G8vpc6R0WmI8",
    authDomain: "aurum-detailing.firebaseapp.com",
    projectId: "aurum-detailing",
    storageBucket: "aurum-detailing.firebasestorage.app",
    messagingSenderId: "479595937250",
    appId: "1:479595937250:web:4e95c63594bdded4274dbb",
    measurementId: "G-SKH5CKC9N9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export async function saveGalleryImage(data) {

    await addDoc(collection(db, "gallery"), {

        title: data.title,

        description: data.description,

        imageUrl: data.imageUrl,

        publicId: data.publicId,

        createdAt: serverTimestamp(),

        active: true

    });
    

}
export async function getGalleryImages() {

    const snapshot = await getDocs(collection(db, "gallery"));

    const images = [];

    snapshot.forEach(doc => {

        images.push({

            id: doc.id,

            ...doc.data()

        });

    });

    return images;

}
export async function deleteGalleryImage(id) {

    await deleteDoc(doc(db, "gallery", id));

}
// ======================================
// SERVIÇOS
// ======================================

export async function saveService(data) {

    await addDoc(collection(db, "services"), {

        title: data.title,

        description: data.description,

        order: data.order,

        imageUrl: data.imageUrl,

        publicId: data.publicId,

        createdAt: serverTimestamp()

    });

}

export async function getServices() {

   const q = query(
    collection(db, "services"),
    orderBy("order", "asc")
);

const snapshot = await getDocs(q);

    const services = [];

    snapshot.forEach(doc => {

        services.push({

            id: doc.id,

            ...doc.data()

        });

    });

    return services;

}

export async function deleteService(id) {

    await deleteDoc(doc(db, "services", id));

}
export async function countDocuments(collectionName) {

    const snapshot = await getDocs(collection(db, collectionName));

    return snapshot.size;

}
// ======================================
// PLANOS
// ======================================

export async function savePlan(data) {

    await addDoc(collection(db, "plans"), {

        title: data.title,

        price: data.price,

        benefits: data.benefits,

        order: data.order,

        createdAt: serverTimestamp()

    });

}

export async function getPlans() {

    const q = query(
        collection(db, "plans"),
        orderBy("order", "asc")
    );

    const snapshot = await getDocs(q);

    const plans = [];

    snapshot.forEach(doc => {

        plans.push({

            id: doc.id,

            ...doc.data()

        });

    });

    return plans;

}

export async function deletePlan(id) {

    await deleteDoc(doc(db, "plans", id));

}
// ======================================
// AUTHENTICATION
// ======================================

export async function login(email, password) {

    return await signInWithEmailAndPassword(auth, email, password);

}

export async function logout() {

    return await signOut(auth);

}

export function checkAuth(callback) {

    return onAuthStateChanged(auth, callback);

}
// ==========================
// FAQ
// ==========================

export async function saveFaq(data) {

    await addDoc(collection(db, "faq"), data);

}

export async function getFaq() {

    const q = query(
        collection(db, "faq"),
        orderBy("order", "asc")
    );

    const snapshot = await getDocs(q);

    const faq = [];

    snapshot.forEach(doc => {

        faq.push({
            id: doc.id,
            ...doc.data()
        });

    });

    return faq;

}

export async function deleteFaq(id) {

    await deleteDoc(doc(db, "faq", id));

}
// ==========================
// CONFIGURAÇÕES DO SITE
// ==========================

export async function getSettings() {

    const ref = doc(db, "settings", "site");

    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {

        return snapshot.data();

    }

    return {};

}

export async function saveSettings(data) {

    const ref = doc(db, "settings", "site");

    await setDoc(ref, data);

}