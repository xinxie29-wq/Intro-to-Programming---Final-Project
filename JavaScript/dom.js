// Mood Buttons
const moodBtn = document.querySelectorAll(".mood-btn")
const happyBtn = document.getElementById("happy-btn")
const exciteBtn = document.getElementById("excited-btn")
const calmBtn = document.getElementById("calm-btn")
const confidentBtn = document.getElementById("confident-btn")
const loneBtn = document.getElementById("lonely-btn")
const sadBtn = document.getElementById("sad-btn")
const tiredBtn = document.getElementById("tired-btn")
const anxiousBtn = document.getElementById("anxious-btn")
const angryBtn = document.getElementById("angry-btn")

// after selecting mood
const selectedMoodDisplay = document.getElementById("selected-mood-display");
const selectedMoodEmoji = document.getElementById("selected-mood-emoji");
const selectedMoodText = document.getElementById("selected-mood-text");
const clearMoodBtn = document.getElementById("clear-mood-btn");

//Journal Section
const journalInput = document.getElementById("journal-input")
const submitBtn = document.getElementById("journal-submit-btn")
//Journal History
const pastJournalList = document.getElementById("past-journal-list");
const emptyPlaceholder = document.getElementById("empty-placeholder");


// Music Section
const searchBtn = document.getElementById("music-search-btn")
const musicList = document.querySelector(".music-list")
const musicCard = document.querySelector(".music-card")
const musicInput = document.getElementById("music-search-input")
