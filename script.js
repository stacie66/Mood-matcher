let selectedMood = null;
let moodStats = JSON.parse(localStorage.getItem('moodStats')) || {
  happy: 0,
  sad: 0,
  excited: 0,
  tired: 0
};

const output = document.getElementById('output');
const statsDiv = document.createElement('div');
statsDiv.id = 'mood-stats';
output.after(statsDiv);

// Load and show mood stats
function showStats() {
  statsDiv.innerHTML = `
    <h3>🧠 Mood Stats</h3>
    <ul>
      <li>😊 Happy: ${moodStats.happy}</li>
      <li>😢 Sad: ${moodStats.sad}</li>
      <li>🤩 Excited: ${moodStats.excited}</li>
      <li>😴 Tired: ${moodStats.tired}</li>
    </ul>
  `;
}
showStats();

document.querySelectorAll('.mood').forEach(button => {
  button.addEventListener('click', () => {
    // Emoji animation
    const emoji = button.textContent.trim();
    const floatingEmoji = document.createElement('div');
    floatingEmoji.textContent = emoji;
    floatingEmoji.className = 'floating-emoji';
    button.appendChild(floatingEmoji);

    setTimeout(() => floatingEmoji.remove(), 1000);

    // Mood selection
    document.querySelectorAll('.mood').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    selectedMood = button.getAttribute('data-mood');
  });
});

document.getElementById('moodForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const feeling = document.getElementById('feeling').value.trim();

  if (!name) {
    alert("Please enter your name!");
    return;
  }

  if (feeling.length < 10) {
    alert("Your description should be at least 10 characters.");
    return;
  }

  if (!selectedMood) {
    alert("Please select your mood!");
    return;
  }

  // Mood messages
  const messages = {
    happy: `Keep smiling, ${name}! 😊 Happiness is contagious.`,
    sad: `Sending hugs your way, ${name}. 💙 Better days are coming.`,
    excited: `Woohoo, ${name}! 🎉 Ride that excitement wave!`,
    tired: `Time to rest, ${name}. 😴 You’ve earned it.`
  };

  // Update mood stats
  moodStats[selectedMood]++;
  localStorage.setItem('moodStats', JSON.stringify(moodStats));
  showStats();

  // Save last user entry
  localStorage.setItem('lastUser', JSON.stringify({ name, mood: selectedMood, feeling }));

  // Sound effect
  const sound = new Audio('https://www.myinstants.com/media/sounds/woohoo.mp3');
  sound.play();

  // Output message
  output.innerHTML = `
    <strong>${messages[selectedMood]}</strong>
    <p>Your note: "${feeling}"</p>
  `;
  output.style.display = 'block';
});
