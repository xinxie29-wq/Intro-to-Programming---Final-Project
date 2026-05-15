//Part One - Journal Section
//Selecting mood
const moodEmojis = {
  happy: "😊",
  excited: "🤩",
  calm: "😌",
  confident: "😎",
  lonely: "🥺",
  sad: "😔",
  tired: "😴",
  anxious: "😰",
  angry: "😠"
};

moodBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const mood = btn.dataset.mood;
    const moodText = btn.textContent;

    moodBtn.forEach((otherBtn) => {
      otherBtn.classList.add("hidden");
    });

    selectedMoodEmoji.textContent = moodEmojis[mood];
    selectedMoodText.textContent = moodText;
    selectedMoodDisplay.classList.remove("hidden");
  });
});

clearMoodBtn.addEventListener("click", () => {
  moodBtn.forEach((btn) => {
    btn.classList.remove("hidden");
    btn.classList.remove("active");
  });

  selectedMoodEmoji.textContent = "";
  selectedMoodText.textContent = "";
  selectedMoodDisplay.classList.add("hidden");
});

//Journal
submitBtn.addEventListener("click", (e) => {
  e.preventDefault()
//Check if the input is empty
  if (moodText === "" || journalText === "") {
    alert("Please choose a mood and write your journal.");
    return;
  }

  //store the new journal
   const newJournal = {
    emoji: moodEmoji,
    mood: moodText,
    text: journalText,
    date: new Date().toLocaleDateString()
  };

const journals = JSON.parse(localStorage.getItem("journals")) || [];
  journals.push(newJournal);
  localStorage.setItem("journals", JSON.stringify(journals));
  alert("Journal Saved");
  journalInput.value = "";
  renderPastJournals();

  //Create journal history in the sidebar
  function renderPastJournals() {
  const journals = JSON.parse(localStorage.getItem("journals")) || [];

  pastJournalList.innerHTML = "";

  if (journals.length === 0) {
    emptyPlaceholder.classList.remove("hidden");
    return;
  }

  emptyPlaceholder.classList.add("hidden");

  const lastThreeJournals = journals.slice(-3).reverse();

  lastThreeJournals.forEach((journal) => {
    const journalCard = document.createElement("div");
    journalCard.classList.add("journal-history-card");

    journalCard.innerHTML = `
      <h3>${journal.emoji} ${journal.mood}</h3>
      <p class="journal-date">${journal.date}</p>
      <p>${journal.text}</p>
    `;

    pastJournalList.appendChild(journalCard);
  });
}
})


//Part 2 - Music Section
//Genarating Music

//Search Area

// const searchBtn = document.getElementById("music-search-btn")

// const musicList = document.querySelector(".music-list")
// const musicCard = document.querySelector(".music-card")

// const musicInput = document.getElementById("music-search-input")

// musicInput.addEventListener("keydown", (e) => {
//   if (e.key = "Enter") {
//     fetchMusicName()
//   } 
// })


// async function fetchMusicName() {
  
// }