
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    orderBy
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

const db = getFirestore(app);

// ==========================
// PLANOS
// ==========================

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
// ==========================
// SERVIÇOS
// ==========================

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
// ==========================
// GALERIA
// ==========================

export async function getGallery() {

    const q = query(
        collection(db, "gallery"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    const images = [];

    snapshot.forEach(doc => {

        images.push({
            id: doc.id,
            ...doc.data()
        });

    });

    return images;

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
