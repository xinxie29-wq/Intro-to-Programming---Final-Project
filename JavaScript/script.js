// moodBtn.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     moodBtn.forEach((btn) =>{
//         btn.classList.add("hidden")
//     })
//   });
// });


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
