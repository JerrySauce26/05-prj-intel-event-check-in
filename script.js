const form = document.getElementById('checkInForm');
const nameInput = document.getElementById('attendeeName');
const teamSelect = document.getElementById('teamSelect');

let count = 0;
const maxCount = 50;

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, team);
  //Increment count
  count++;
  console.log("Total check-ins: " , count)



  // Update progress bar smoothly
  const percentage = Math.round((count / maxCount) * 100);
  console.log(`Progress: ${percentage}%`);
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = `${percentage}%`;

  // Update attendee count in span
  const attendeeCountSpan = document.getElementById("attendeeCount");
  attendeeCountSpan.textContent = count;


  // Update team Counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Highlight the winning team
  function highlightWinningTeam() {
    const teams = ["water", "zero", "power"];
    let max = 0;
    let winners = [];
    teams.forEach(function (t) {
      const count = parseInt(document.getElementById(t + "Count").textContent);
      if (count > max) {
        max = count;
        winners = [t];
      } else if (count === max && max > 0) {
        winners.push(t);
      }
    });
    teams.forEach(function (t) {
      const card = document.querySelector(".team-card." + t);
      card.classList.remove("winner");
    });
    winners.forEach(function (t) {
      const card = document.querySelector(".team-card." + t);
      card.classList.add("winner");
      // Remove and re-add for animation effect
      setTimeout(function () {
        card.classList.remove("winner");
        void card.offsetWidth;
        card.classList.add("winner");
      }, 10);
    });
  }
  highlightWinningTeam();


  // Show welcome message visually above the form with emoji and fade-in effect
  const greeting = document.getElementById("greeting");
  greeting.innerHTML = `🎉 <b>Welcome, ${name} from ${teamName}!</b> Thank you for checking in!`;
  greeting.classList.add("show");
  // Remove the effect after a short time (optional, keeps it animated for new check-ins)
  setTimeout(function () {
    greeting.classList.remove("show");
  }, 3500);

  form.reset();
  
});