let currentYear = 0;
let isLightMode = false;
let touchStartX = 0;
let touchEndX = 0;

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
  if (event.state) {
    navigateToState(event.state);
  } else {
    showHome();
  }
});

// Initialize with home state
window.addEventListener('load', function() {
  if (!window.history.state) {
    window.history.replaceState({ page: 'home' }, '', '#home');
  }
});

// Mobile swipe gesture detection
document.addEventListener('touchstart', function(e) {
  touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', function(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, false);

function handleSwipe() {
  const swipeThreshold = 100;
  const swipeDistance = touchEndX - touchStartX;
  
  // Swipe right (back gesture)
  if (swipeDistance > swipeThreshold) {
    window.history.back();
  }
}

function navigateToState(state) {
  switch(state.page) {
    case 'home':
      showHomeInternal();
      break;
    case 'subjects':
      showSubjectsInternal(state.year);
      break;
    case 'resources':
      showResourcesInternal(state.year, state.subject);
      break;
    case 'howto':
      showHowToDownloadInternal();
      break;
    case 'about':
      showAboutInternal();
      break;
    case 'contact':
      showContactInternal();
      break;
    default:
      showHomeInternal();
  }
}

const subjects = {
  1: [
    "Engineering Mathematics-I",
    "Engineering Physics",
    "Engineering Chemistry",
    "Basic Electrical Engineering",
    "Programming in C",
    "Engineering Graphics",
  ],
  2: [
    "Engineering Mathematics-II",
    "Data Structures",
    "Digital Electronics",
    "Computer Organization",
    "Object Oriented Programming",
    "Database Management Systems",
  ],
  3: [
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
    "Theory of Computation",
    "Design and Analysis of Algorithms",
    "Web Technologies",
  ],
  4: [
    "Machine Learning",
    "Artificial Intelligence",
    "Cloud Computing",
    "Information Security",
    "Mobile Application Development",
    "Project Work",
  ],
};

const resources = {
  notes: [
    {
      name: "Complete Module 1 Notes",
      link: "https://your-link-here.com/module1.pdf",
    },
    {
      name: "Complete Module 2 Notes",
      link: "https://your-link-here.com/module2.pdf",
    },
    {
      name: "Complete Module 3 Notes",
      link: "https://your-link-here.com/module3.pdf",
    },
    {
      name: "Complete Module 4 Notes",
      link: "https://your-link-here.com/module4.pdf",
    },
    {
      name: "Complete Module 5 Notes",
      link: "https://your-link-here.com/module5.pdf",
    },
    {
      name: "Revision Notes",
      link: "https://your-link-here.com/revision.pdf",
    },
  ],
  pyqs: [
    {
      name: "Previous Year Question Paper 2024",
      link: "https://your-link-here.com/pyq2024.pdf",
    },
    {
      name: "Previous Year Question Paper 2023",
      link: "https://your-link-here.com/pyq2023.pdf",
    },
    {
      name: "Previous Year Question Paper 2022",
      link: "https://your-link-here.com/pyq2022.pdf",
    },
    {
      name: "Previous Year Question Paper 2021",
      link: "https://your-link-here.com/pyq2021.pdf",
    },
    {
      name: "Important Questions Bank",
      link: "https://your-link-here.com/questions.pdf",
    },
  ],
  assignments: [
    {
      name: "Assignment 1",
      link: "https://your-link-here.com/assignment1.pdf",
    },
    {
      name: "Assignment 2",
      link: "https://your-link-here.com/assignment2.pdf",
    },
    {
      name: "Assignment 3",
      link: "https://your-link-here.com/assignment3.pdf",
    },
    {
      name: "Lab Manual",
      link: "https://your-link-here.com/lab-manual.pdf",
    },
    {
      name: "Tutorial Questions",
      link: "https://your-link-here.com/tutorials.pdf",
    },
  ],
};

// Internal functions (without history push)
function showHomeInternal() {
  document.getElementById("homePage").style.display = "block";
  document.getElementById("subjectsPage").style.display = "none";
  document.getElementById("resourcesPage").style.display = "none";
}

function showSubjectsInternal(year) {
  currentYear = year;
  document.getElementById("homePage").style.display = "none";
  document.getElementById("subjectsPage").style.display = "block";
  document.getElementById("resourcesPage").style.display = "none";

  document.getElementById("currentYear").textContent =
    year + getSuffix(year) + " Year";
  document.getElementById("yearTitle").textContent =
    year + getSuffix(year) + " Year Subjects";

  const subjectGrid = document.getElementById("subjectGrid");
  subjectGrid.innerHTML = "";

  subjects[year].forEach((subject, index) => {
    const card = document.createElement("div");
    card.className = "card subject-card";
    card.onclick = () => showResources(year, subject);
    card.innerHTML = `
                <i class="fas fa-book-reader"></i>
                <h3>${subject}</h3>
                <p>Click to view resources</p>
            `;
    subjectGrid.appendChild(card);
  });
}

function showResourcesInternal(year, subject) {
  currentYear = year;
  document.getElementById("homePage").style.display = "none";
  document.getElementById("subjectsPage").style.display = "none";
  document.getElementById("resourcesPage").style.display = "block";

  document.getElementById("breadYear").textContent =
    year + getSuffix(year) + " Year";
  document.getElementById("breadSubject").textContent = subject;
  document.getElementById("subjectTitle").textContent = subject;

  const resourceSection = document.getElementById("resourceSection");
  resourceSection.innerHTML = "";

  const notesDiv = createResourceCategory(
    "Notes",
    "fa-sticky-note",
    resources.notes
  );
  resourceSection.appendChild(notesDiv);

  const pyqsDiv = createResourceCategory(
    "Previous Year Questions",
    "fa-file-text",
    resources.pyqs
  );
  resourceSection.appendChild(pyqsDiv);

  const assignmentsDiv = createResourceCategory(
    "Assignments",
    "fa-tasks",
    resources.assignments
  );
  resourceSection.appendChild(assignmentsDiv);
}

document.querySelector(".logo-section").addEventListener("click", function() {
  showHome();
  closeMenu(); // optional if you want to auto-close nav on mobile
});


// Public functions (with history push)
function showHome() {
  window.history.pushState({ page: 'home' }, '', '#home');
  showHomeInternal();
}

function showSubjects(year) {
  window.history.pushState({ page: 'subjects', year: year }, '', `#subjects-${year}`);
  showSubjectsInternal(year);
}

function showSubjectsFromBread() {
  showSubjects(currentYear);
}

function showResources(year, subject) {
  window.history.pushState({ page: 'resources', year: year, subject: subject }, '', `#resources-${year}`);
  showResourcesInternal(year, subject);
}

function createResourceCategory(title, icon, items) {
  const div = document.createElement("div");
  div.className = "resource-category";

  let html = `<h3><i class="fas ${icon}"></i> ${title}</h3><div class="download-grid">`;

  items.forEach((item, index) => {
    html += `
                <div class="download-item">
                    <div class="download-info">
                        <i class="fas fa-file-pdf"></i>
                        <div>
                            <strong>${item.name}</strong>
                            <div style="color: #666; font-size: 0.9em; margin-top: 5px;">PDF Document</div>
                        </div>
                    </div>
                    <button class="download-btn" onclick="downloadFile('${item.link}')">
                        <i class="fas fa-download"></i>
                        Download
                    </button>
                </div>
            `;
  });

  html += "</div>";
  div.innerHTML = html;
  return div;
}

function downloadFile(fileUrl) {
  // Open the file link in a new tab
  window.open(fileUrl, "_blank");
}

function getSuffix(num) {
  if (num === 1) return "st";
  if (num === 2) return "nd";
  if (num === 3) return "rd";
  return "th";
}

function showHowToDownloadInternal() {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("subjectsPage").style.display = "none";
  document.getElementById("resourcesPage").style.display = "none";

  document.querySelector(".content-area").innerHTML = `
            <h2 class="page-title">
                <i class="fas fa-question-circle"></i>
                How to Download?
            </h2>
            <p class="page-subtitle">Follow these simple steps to download your study materials</p>
            <div style="max-width: 800px; margin: 30px auto;">
                <div style="background: #2a2a2b; padding: 30px; border-radius: 15px; margin-bottom: 20px;">
                    <h3 style="color: #667eea; margin-bottom: 15px;"><i class="fas fa-1"></i> Select Your Year</h3>
                    <p>Click on your current academic year (1st, 2nd, 3rd, or 4th year) from the home page.</p>
                </div>
                <div style="background: #2a2a2b; padding: 30px; border-radius: 15px; margin-bottom: 20px;">
                    <h3 style="color: #667eea; margin-bottom: 15px;"><i class="fas fa-2"></i> Choose Subject</h3>
                    <p>Browse through the list of subjects and click on the one you need materials for.</p>
                </div>
                <div style="background: #2a2a2b; padding: 30px; border-radius: 15px; margin-bottom: 20px;">
                    <h3 style="color: #667eea; margin-bottom: 15px;"><i class="fas fa-3"></i> Download Resources</h3>
                    <p>Click the download button next to any notes, PYQs, or assignments you need. Files will be downloaded to your device.</p>
                </div>
            </div>
            <button class="download-btn" onclick="showHome()" style="margin: 20px auto; display: block;">
                <i class="fas fa-home"></i> Back to Home
            </button>
        `;
}

function showAboutInternal() {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("subjectsPage").style.display = "none";
  document.getElementById("resourcesPage").style.display = "none";

  document.querySelector(".content-area").innerHTML = `
            <h2 class="page-title">
                <i class="fas fa-info-circle"></i>
                About Us
            </h2>
            <p class="page-subtitle">Your trusted source for B.Tech study materials</p>
            <div style="max-width: 900px; margin: 30px auto;">
                <div style="background: #2a2a2b; padding: 40px; border-radius: 15px; line-height: 1.8;">
                    <h3 style="color: #667eea; margin-bottom: 20px;">Welcome to Notes Wale Bhaiya!</h3>
                    <p style="margin-bottom: 20px;">We are dedicated to helping B.Tech students access quality study materials, previous year questions, and assignments for all four years of their engineering journey.</p>
                    
                    <h3 style="color: #667eea; margin-bottom: 20px; margin-top: 30px;">Our Mission</h3>
                    <p style="margin-bottom: 20px;">To provide comprehensive, organized, and easily accessible study resources that help students excel in their academics and prepare effectively for exams.</p>
                    
                    <h3 style="color: #667eea; margin-bottom: 20px; margin-top: 30px;">What We Offer</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="padding: 10px 0;"><i class="fas fa-check" style="color: #667eea; margin-right: 10px;"></i> Complete module-wise notes</li>
                        <li style="padding: 10px 0;"><i class="fas fa-check" style="color: #667eea; margin-right: 10px;"></i> Previous year question papers</li>
                        <li style="padding: 10px 0;"><i class="fas fa-check" style="color: #667eea; margin-right: 10px;"></i> Assignments and lab manuals</li>
                        <li style="padding: 10px 0;"><i class="fas fa-check" style="color: #667eea; margin-right: 10px;"></i> Organized by year and subject</li>
                    </ul>
                </div>
            </div>
            <button class="download-btn" onclick="showHome()" style="margin: 20px auto; display: block;">
                <i class="fas fa-home"></i> Back to Home
            </button>
        `;
}

function showContactInternal() {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("subjectsPage").style.display = "none";
  document.getElementById("resourcesPage").style.display = "none";

  document.querySelector(".content-area").innerHTML = `
            <h2 class="page-title">
                <i class="fas fa-envelope"></i>
                Contact Us
            </h2>
            <p class="page-subtitle">Get in touch with us for any queries or suggestions</p>
            <div style="max-width: 700px; margin: 30px auto;">
                <div style="background: #2a2a2b; padding: 40px; border-radius: 15px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <i class="fas fa-user-circle" style="font-size: 4em; color: #667eea; margin-bottom: 20px;"></i>
                        <h3 style="color: #667eea; margin-bottom: 10px;">Notes Wale Bhaiya Team</h3>
                    </div>
                    
                    <div style="margin: 25px 0;">
                        <h4 style="color: #667eea; margin-bottom: 10px;"><i class="fas fa-envelope" style="margin-right: 10px;"></i> Email</h4>
                        <p>noteswalebhaiya@gmail.com</p>
                    </div>
                    
                    <div style="margin: 25px 0;">
                        <h4 style="color: #667eea; margin-bottom: 10px;"><i class="fas fa-phone" style="margin-right: 10px;"></i> Phone</h4>
                        <p>+91 XXXXX XXXXX</p>
                    </div>
                    
                    <div style="margin: 25px 0;">
                        <h4 style="color: #667eea; margin-bottom: 10px;"><i class="fab fa-telegram" style="margin-right: 10px;"></i> Telegram</h4>
                        <p>@noteswalebhaiya</p>
                    </div>
                    
                    <div style="margin: 25px 0;">
                        <h4 style="color: #667eea; margin-bottom: 10px;"><i class="fab fa-whatsapp" style="margin-right: 10px;"></i> WhatsApp</h4>
                        <p>Join our community group for updates</p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 30px; border-top: 1px solid #3a3a3b;">
                        <p style="color: #b0b0b0;">We typically respond within 24 hours</p>
                    </div>
                </div>
            </div>
            <button class="download-btn" onclick="showHome()" style="margin: 20px auto; display: block;">
                <i class="fas fa-home"></i> Back to Home
            </button>
        `;
}

function showHowToDownload() {
  window.history.pushState({ page: 'howto' }, '', '#howto');
  showHowToDownloadInternal();
}

function showAbout() {
  window.history.pushState({ page: 'about' }, '', '#about');
  showAboutInternal();
}

function showContact() {
  window.history.pushState({ page: 'contact' }, '', '#contact');
  showContactInternal();
}

function toggleMenu() {
  const nav = document.getElementById("headerNav");
  const hamburger = document.querySelector(".hamburger");
  nav.classList.toggle("active");
  hamburger.classList.toggle("active");
}

function closeMenu() {
  const nav = document.getElementById("headerNav");
  const hamburger = document.querySelector(".hamburger");
  nav.classList.remove("active");
  hamburger.classList.remove("active");
}