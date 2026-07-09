import { checkAuth } from "./firebase.js";

checkAuth((user) => {

    if (!user) {

        window.location.href = "index.html";

    }

});