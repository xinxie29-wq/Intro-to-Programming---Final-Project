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
      otherBtn.classList.add("hidden")
    })

    selectedMoodEmoji.textContent = moodEmojis[mood]
    selectedMoodText.textContent = moodText
    selectedMoodDisplay.classList.remove("hidden")
  })
})

clearMoodBtn.addEventListener("click", () => {
  moodBtn.forEach((btn) => {
    btn.classList.remove("hidden")
    btn.classList.remove("active")
  })

  selectedMoodEmoji.textContent = ""
  selectedMoodText.textContent = ""
  selectedMoodDisplay.classList.add("hidden")
});

// Journal
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const moodEmojiValue = selectedMoodEmoji.textContent;
  const moodTextValue = selectedMoodText.textContent;
  const journalTextValue = journalInput.value.trim();

  // Check if the input is empty
  if (moodTextValue === "" || journalTextValue === "") {
    alert("Please choose a mood and write your journal.");
    return
  }

  // Store the new journal
  const newJournal = {
    emoji: moodEmojiValue,
    mood: moodTextValue,
    text: journalTextValue,
    date: new Date().toLocaleDateString()
  }

  const journals = JSON.parse(localStorage.getItem("journals")) || []
  journals.push(newJournal)
  localStorage.setItem("journals", JSON.stringify(journals))
  alert("Journal Saved")
  journalInput.value = ""
  renderPastJournals()
})

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


//Music Section
//Searching Music
musicInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchSearchMusic()
  }
})

searchBtn.addEventListener("click", (e) => {
  fetchSearchMusic()
})

async function fetchSearchMusic() {
  searchResults.innerHTML = ""
  const userinput = musicInput.value
  const response = await fetch(`https://discoveryprovider.audius.co/v1/tracks/search?query=${encodeURIComponent(userinput)}`)

  const data = await response.json()

  if (!response) {
    status.textContent = "Sorry - we couldn't find the song you were looking for. Try again!"
  }
  console.log(data)
  console.log(data.data[0].artwork["150x150"])

  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div")
    card.classList.add("music-search-card")
    card.classList.add("col-6")

    card.innerHTML = `
            <img src="${data.data[i].artwork?.["150x150"]}" alt="cover art">
            <h3>${data.data[i]?.title || "Unknown Name"}</h3>
            <p> <b>Artist:</b> ${data.data[i]?.artists || "Unknown Artist"}</p>
            <p> <b>Genre:</b> ${data.data[i]?.genre || "Not specified"}</p>
            <p> <b>Mood:</b> ${data.data[i]?.mood || "None"}</p>
            <button class="desc"> Description </button>
          </div>`
    const descBtn = card.querySelector(".desc")
    descBtn.addEventListener("click", (e) => {
      alert(`${data.data[i]?.description || "This creator did not add a description."}`)
    })
    searchResults.appendChild(card)

  }
}