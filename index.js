// Product A info
let productA = {
    emoji: "⭐",
    revenue: 200,
    commision: 50
}

// Product B info
let productB = {
    emoji: "🔥",
    revenue: 300,
    commision: 75
}

/* Firebase setup */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js"
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyCKPRcaahjtPDNQcG2bckuJ6g2pXRrc_Us",
    authDomain: "salesboard-b19d7.firebaseapp.com",
    projectId: "salesboard-b19d7",
    storageBucket: "salesboard-b19d7.firebasestorage.app"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const loggedOutView = document.getElementById("logged-out-view")
const loggedInView = document.getElementById("logged-in-view")
const userName = document.getElementById('user-name')
const userProfilePictureEl = document.getElementById("user-profile-picture")
const continueWithGoogle = document.getElementById('continue-with-google')
const logOut = document.getElementById("log-out")


onAuthStateChanged(auth, function (user) {
    if (user) {
        loggedInView.style.display = "block"
        loggedOutView.style.display = "none"
        showProfilePicture(userProfilePictureEl, user)
        showUserName(userName, user)
    } else {
        loggedInView.style.display = "block"
        loggedOutView.style.display = "none"
    }
})

function showUserName(userElement, user) {
    const displayName = user.displayName
    if(displayName) {
        const userFirstName = displayName.split(" ")[0]
        userElement.textContent = `Hi, ${userFirstName}`
    } else {
        userElement.textContent = `New User`
    }
}

function showProfilePicture(imgElement, user) {
    const photoURL = user.photoURL
    
    if (photoURL) {
        imgElement.src = photoURL
    } else {
        imgElement.src = "./images/default-profile-picture.jpeg"
    }
}

continueWithGoogle.addEventListener('click', function() {
    signInWithPopup(auth, provider)
        .then((result) => {
        })
        .catch((error) => {
            console.error(error.message)
        }) 
})

logOut.addEventListener('click', function() {
    signOut(auth)
})


/* Salesboard App */ 
/* UI- Element */ 
const productAbtn = document.getElementById('product-a')
const productBbtn = document.getElementById('product-b')
const liveScoreEl = document.getElementById('live-score')
const liveAchievemnetsEl = document.getElementById('live-achievements')
const totalRevenueEl = document.getElementById('total-revenue')
const totalCommisionEl = document.getElementById('total-commission')

let totalRevenue = 0
let totalCommision = 0
let totalLiveScore = []
let totalAchievements = 0
let firstSale = true
let getCashEmoji = true
let getTrophyEmoji = true

productAbtn.addEventListener('click', () => {
    const { emoji, revenue, commision } = productA
    liveScoreEl.value += emoji
    totalRevenue += revenue
    totalRevenueEl.value = '$' + totalRevenue
    totalCommision += commision
    totalCommisionEl.value = '$' + totalCommision
    liveScoreCount()
    liveAchievementCount()
    saleAchievement()
})

productBbtn.addEventListener('click', () => {
    const { emoji, revenue, commision } = productB
    liveScoreEl.value += emoji
    totalRevenue += revenue
    totalRevenueEl.value = '$' + totalRevenue
    totalCommision += commision
    totalCommisionEl.value = '$' + totalCommision
    liveScoreCount()
    liveAchievementCount()
    saleAchievement()
})

function liveScoreCount() {
    totalLiveScore.push(liveScoreEl.value)
    document.getElementById('live-score-count').innerHTML = `Live Score - ${totalLiveScore.length}`
}

function liveAchievementCount() {
    if (firstSale) {
        totalAchievements++
    }

    if (totalRevenue >= 2500 && getCashEmoji) {
        totalAchievements++
    }

    if (totalLiveScore.length > 15 && getTrophyEmoji) {
        totalAchievements++
    }

    document.getElementById('live-achievement-count').innerHTML = `Live Achievement - ${totalAchievements}`
}

function saleAchievement() {
    if (firstSale) {
        liveAchievemnetsEl.value = '🔔'
        firstSale = false
    }

    if (totalRevenue >= 2500 && getCashEmoji) {
        liveAchievemnetsEl.value += '💰'
        getCashEmoji = false
    }

    if (totalLiveScore.length > 15 && getTrophyEmoji) {
        liveAchievemnetsEl.value += '🏆'
        getTrophyEmoji = false
    }
}

