/* ========================= */
/* FIREBASE IMPORTS */
/* ========================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

/* ========================= */
/* FIREBASE CONFIG */
/* ========================= */

const firebaseConfig = {
    apiKey: "AIzaSyClRF8ADnGrS6ITInhgbH7T3ukGdyqwQTc",
    authDomain: "jaco-horse-rides.firebaseapp.com",
    projectId: "jaco-horse-rides",
    storageBucket: "jaco-horse-rides.firebasestorage.app",
    messagingSenderId: "635093038580",
    appId: "1:635093038580:web:b672b6e7e29c36f562b5a1",
    measurementId: "G-88FTE1KN0J"
};

/* ========================= */
/* INITIALIZE FIREBASE */
/* ========================= */

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ========================= */
/* ELEMENTS */
/* ========================= */

const reviewForm = document.querySelector("#review-form");
const nameInput = document.querySelector("#review-name");
const ratingInput = document.querySelector("#review-rating");
const commentInput = document.querySelector("#review-comment");

const starsContainer = document.querySelector("#review-stars");
const starButtons = document.querySelectorAll(
    "#review-stars button"
);

const submitButton = document.querySelector("#review-submit");
const messageElement = document.querySelector("#review-message");

const reviewsList = document.querySelector("#reviews-list");
const reviewsAverage = document.querySelector("#reviews-average");
const reviewsTotal = document.querySelector("#reviews-total");

/* ========================= */
/* STOP IF SECTION IS MISSING */
/* ========================= */

if (
    !reviewForm ||
    !nameInput ||
    !ratingInput ||
    !commentInput ||
    !reviewsList
) {
    console.error("Reviews section not found.");
}

/* ========================= */
/* SELECT RATING */
/* ========================= */

starButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedRating =
            Number(button.dataset.rating);

        ratingInput.value = selectedRating;

        paintStars(selectedRating);

    });

});

function paintStars(rating) {

    starButtons.forEach((button) => {

        const starRating =
            Number(button.dataset.rating);

        button.classList.toggle(
            "active",
            starRating <= rating
        );

    });

}

/* ========================= */
/* FORM MESSAGE */
/* ========================= */

function showMessage(text, type = "") {

    messageElement.textContent = text;
    messageElement.className = "review-message";

    if (type) {
        messageElement.classList.add(type);
    }

}

/* ========================= */
/* SEND REVIEW */
/* ========================= */

reviewForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();
    const rating = Number(ratingInput.value);

    if (name.length < 2) {

        showMessage(
            "Please enter your name.",
            "error"
        );

        return;
    }

    if (rating < 1 || rating > 5) {

        showMessage(
            "Please select a star rating.",
            "error"
        );

        return;
    }

    if (comment.length < 5) {

        showMessage(
            "Please write a longer review.",
            "error"
        );

        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "SENDING...";

    showMessage("");

    try {

        await addDoc(
            collection(db, "reviews"),
            {
                name: name,
                rating: rating,
                comment: comment,
                date: serverTimestamp(),
                approved: true
            }
        );

        reviewForm.reset();

        ratingInput.value = "0";
        paintStars(0);

        showMessage(
            "Thank you! Your review was published.",
            "success"
        );

    } catch (error) {

        console.error(
            "Error sending review:",
            error
        );

        showMessage(
            "The review could not be sent. Please try again.",
            "error"
        );

    } finally {

        submitButton.disabled = false;
        submitButton.textContent = "SEND REVIEW";

    }

});

/* ========================= */
/* ESCAPE AND CREATE ELEMENTS */
/* ========================= */

function createReviewCard(review) {

    const card =
        document.createElement("article");

    card.className = "review-card";

    const header =
        document.createElement("div");

    header.className = "review-card-header";

    const avatar =
        document.createElement("div");

    avatar.className = "review-avatar";
    avatar.textContent =
        review.name.charAt(0).toUpperCase();

    const person =
        document.createElement("div");

    const name =
        document.createElement("h3");

    name.className = "review-card-name";
    name.textContent = review.name;

    const date =
        document.createElement("span");

    date.className = "review-card-date";
    date.textContent = formatReviewDate(review.date);

    person.append(name, date);
    header.append(avatar, person);

    const stars =
        document.createElement("div");

    stars.className = "review-card-stars";
    stars.textContent =
        "★".repeat(review.rating) +
        "☆".repeat(5 - review.rating);

    const comment =
        document.createElement("p");

    comment.className = "review-card-comment";
    comment.textContent = review.comment;

    card.append(header, stars, comment);

    return card;

}

/* ========================= */
/* FORMAT DATE */
/* ========================= */

function formatReviewDate(timestamp) {

    if (!timestamp || !timestamp.toDate) {
        return "Just now";
    }

    return timestamp.toDate().toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

}

/* ========================= */
/* LOAD REVIEWS */
/* ========================= */

const reviewsQuery = query(
    collection(db, "reviews"),
    orderBy("date", "desc")
);

onSnapshot(
    reviewsQuery,

    (snapshot) => {

        reviewsList.innerHTML = "";

        const reviews = [];

        snapshot.forEach((documentSnapshot) => {

            const review =
                documentSnapshot.data();

            if (review.approved === true) {
                reviews.push(review);
            }

        });

        if (reviews.length === 0) {

            const empty =
                document.createElement("p");

            empty.className = "reviews-empty";
            empty.textContent =
                "Be the first rider to leave a review.";

            reviewsList.appendChild(empty);

            updateReviewSummary([]);

            return;
        }

        reviews.forEach((review) => {

            reviewsList.appendChild(
                createReviewCard(review)
            );

        });

        updateReviewSummary(reviews);

    },

    (error) => {

        console.error(
            "Error loading reviews:",
            error
        );

        reviewsList.innerHTML =
            '<p class="reviews-empty">Reviews could not be loaded.</p>';

    }
);

/* ========================= */
/* REVIEW SUMMARY */
/* ========================= */

function updateReviewSummary(reviews) {

    const total = reviews.length;

    const ratingTotal = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
    );

    const average =
        total > 0
            ? ratingTotal / total
            : 0;

    reviewsAverage.textContent =
        average.toFixed(1);

    reviewsTotal.textContent =
        `${total} ${total === 1 ? "review" : "reviews"}`;

}
