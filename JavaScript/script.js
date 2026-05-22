// Part One - Journal Section

// Selecting mood
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
}

moodBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const mood = btn.dataset.mood
    const moodText = btn.textContent

    moodBtn.forEach((otherBtn) => {
      otherBtn.classList.add("hidden")
      otherBtn.classList.remove("active")
    })

    btn.classList.add("active")

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
})

// Journal
submitBtn.addEventListener("click", (e) => {
  e.preventDefault()

  const moodEmojiValue = selectedMoodEmoji.textContent
  const moodTextValue = selectedMoodText.textContent
  const journalTextValue = journalInput.value.trim()

  
  if (moodTextValue === "" || journalTextValue === "") {
    showToast("Please choose a mood and write your journal.")
    return
  }

  const newJournal = {
    id: Date.now(),
    emoji: moodEmojiValue,
    mood: moodTextValue,
    text: journalTextValue,
    date: new Date().toLocaleDateString()
  }

  const journals = JSON.parse(localStorage.getItem("journals")) || []
  journals.push(newJournal)
  localStorage.setItem("journals", JSON.stringify(journals))

  showToast("Journal saved!")

  journalInput.value = ""

  renderPastJournals()
  fetchMoodMusic()
})

//Showing toast
function showToast(message) {
  toast.textContent = message
  toast.classList.add("show")

  setTimeout(() => {
    toast.classList.remove("show")
  }, 2000)
}

// Render Past Journals
function renderPastJournals() {
  const journals = JSON.parse(localStorage.getItem("journals")) || []

  pastJournalList.innerHTML = ""

  if (journals.length === 0) {
    emptyPlaceholder.classList.remove("hidden")
    return
  }

  emptyPlaceholder.classList.add("hidden")

  const lastThreeJournals = journals.slice(-3).reverse()

  lastThreeJournals.forEach((journal) => {
    const journalCard = document.createElement("div")
    journalCard.classList.add("journal-history-card")

    journalCard.innerHTML = `
      <h3>${journal.emoji} ${journal.mood}</h3>
      <p class="journal-date">${journal.date}</p>
      <p>${journal.text}</p>
      <button type="button" class="clear-journal-btn" data-id="${journal.id}">×</button>
    `

    pastJournalList.appendChild(journalCard)
  })
}

// Deleting one Past Journal
pastJournalList.addEventListener("click", (e) => {
  if (e.target.classList.contains("clear-journal-btn")) {
    const journalId = Number(e.target.dataset.id)

    const journals = JSON.parse(localStorage.getItem("journals")) || []

    const updatedJournals = journals.filter((journal) => {
      return journal.id !== journalId
    })

    localStorage.setItem("journals", JSON.stringify(updatedJournals))

    renderPastJournals()
  }
})

// Journal History on phone
historyBtn.addEventListener("click", () => {
  pastJournalSidebar.classList.toggle("show-history")

  if (pastJournalSidebar.classList.contains("show-history")) {
    historyBtn.textContent = "Hide Past Journals"
  } else {
    historyBtn.textContent = "View Past Journals"
  }
})

// Show saved journals when page loads
renderPastJournals()


// Part Two - Music Section

// Searching Music
musicInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault()
    fetchSearchMusic()
  }
})

searchBtn.addEventListener("click", () => {
  fetchSearchMusic()
})

async function fetchSearchMusic() {
  searchResults.innerHTML = ""

  const userInput = musicInput.value.trim()

  if (userInput === "") {
    searchResults.innerHTML = `<p class="status">Please type a song name first.</p>`
    return
  }

  try {
    const response = await fetch(
      `https://discoveryprovider.audius.co/v1/tracks/search?query=${encodeURIComponent(userInput)}`
    )

    if (!response.ok) {
      searchResults.innerHTML = `<p class="status">Sorry - something went wrong. Try again!</p>`
      return
    }

    const data = await response.json()

    if (!data.data || data.data.length === 0) {
      searchResults.innerHTML = `<p class="status">Sorry - we couldn't find the song you were looking for. Try again!</p>`
      return
    }

    const songsToShow = data.data.slice(0, 10)

    songsToShow.forEach((song) => {
      const card = document.createElement("div")
      card.classList.add("music-search-card")
      card.classList.add("col-6")

      const artwork = song.artwork?.["150x150"] || ""
      const title = song.title || "Unknown Name"
      const artist = song.user?.name || "Unknown Artist"
      const genre = song.genre || "Not specified"
      const mood = song.mood || "None"
      const description = song.description || "This creator did not add a description."

      card.innerHTML = `
        ${artwork ? `<img src="${artwork}" alt="cover art">` : ""}
        <h3>${title}</h3>
        <p><b>Artist:</b> ${artist}</p>
        <p><b>Genre:</b> ${genre}</p>
        <p><b>Mood:</b> ${mood}</p>
        <button type="button" class="desc">Description</button>
      `

      const descBtn = card.querySelector(".desc")

      descBtn.addEventListener("click", () => {
        alert(description)
      })

      searchResults.appendChild(card)
    })

  } catch (error) {
    searchResults.innerHTML = `<p class="status">Network error. Please try again later.</p>`
  }
}

const emotionMap = {
    Happy: ["Upbeat", "Easygoing", "Cool", "Romantic"],
    Calm: ["Peaceful", "Tender", "Sophisticated", "Sensual"],
    Excited: ["Excited", "Energizing", "Feiry", "Rowdy", "Stirring"],
    Confident: ["Empowering", "Defiant", "Cool"],
    Lonely: ["Yearning", "Brooding"],
    Sad: ["Melancholy", "Sentimental", "Yearning"],
    Tired: ["Easygoing", "Peaceful"],
    Anxious: ["Serious", "Brooding", "Gritty"],
    Angry: ["Aggressive", "Fiery", "Defiant", "Gritty"]
}



async function fetchMoodMusic() {
    musicList.innerHTML = ``

    for (const mood of emotionMap[selectedMoodText.textContent]) {
        console.log(mood)
        const response = await fetch(`https://discoveryprovider.audius.co/v1/tracks/search?mood=${mood}`)
        const data = await response.json()

        console.log(data)

        for (let i = 0; i < 2; i++) {
            const card = document.createElement("div")
            card.classList.add("music-card")

            card.innerHTML = `
           <img src="${data.data[i].artwork?.["150x150"]}" alt="cover art">
           <h3>${data.data[i]?.title || "Unknown Name"}</h3>
           <p> <b>Artist:</b> ${data.data[i]?.artists || "Unknown Artist"}</p >
           <p> <b>Genre:</b> ${data.data[i]?.genre || "Not specified"}</p >
           <p> <b>Mood:</b> ${data.data[i]?.mood || "None"}</p >
           <button class="desc"> Description </button>
         </div>`
            const descBtn = card.querySelector(".desc")
            descBtn.addEventListener("click", (e) => {
                alert(`${data.data[i]?.description || "This creator did not add a description."}`)})

                musicList.appendChild(card)
            }

        }
        // 
    }