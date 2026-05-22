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
const toast = document.getElementById("toast")

//Journal History
const pastJournalList = document.getElementById("past-journal-list");
const emptyPlaceholder = document.getElementById("empty-placeholder");
const clearJournalBtn = document.querySelectorAll(".clear-journal-btn")
//Journal History on phone
const historyBtn = document.getElementById("history-toggle-btn")
const pastJournalSidebar = document.querySelector(".past-journal-sidebar")

// Music Section
const musicInput = document.querySelector("#music-search-input")
const searchBtn = document.getElementById("music-search-btn")
const searchResults = document.querySelector("#music-search-results")
const status = document.querySelector(".status")
const musicList = document.querySelector(".music-list")
