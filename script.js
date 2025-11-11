let currentYear = 0;
let isLightMode = false;
let touchStartX = 0;
let touchEndX = 0;

// Handle browser back/forward buttons
window.addEventListener("popstate", function (event) {
  if (event.state) {
    navigateToState(event.state);
  } else {
    showHome();
  }
});

// Initialize with home state
window.addEventListener("load", function () {
  if (!window.history.state) {
    window.history.replaceState({ page: "home" }, "", "#home");
  }
});

// Mobile swipe gesture detection
document.addEventListener(
  "touchstart",
  function (e) {
    touchStartX = e.changedTouches[0].screenX;
  },
  false
);

document.addEventListener(
  "touchend",
  function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  false
);

function handleSwipe() {
  const swipeThreshold = 100;
  const swipeDistance = touchEndX - touchStartX;

  // Swipe right (back gesture)
  if (swipeDistance > swipeThreshold) {
    window.history.back();
  }
}

function navigateToState(state) {
  switch (state.page) {
    case "home":
      showHomeInternal();
      break;
    case "subjects":
      showSubjectsInternal(state.year);
      break;
    case "resources":
      showResourcesInternal(state.year, state.subject);
      break;
    case "howto":
      showHowToDownloadInternal();
      break;
    case "about":
      showAboutInternal();
      break;
    case "contact":
      showContactInternal();
      break;
    default:
      showHomeInternal();
  }
}

// Load data from data.json
let subjectsData = null;

// Define initial subjects structure
let subjects = {
  1: [
    "physics",
    "chemistry",
    "soft skills",
    "electrical",
    "electronics",
    "evs",
    "maths sem 1",
    "maths sem 2",
    "mechanical",
    "pps",
  ],
  2: [], // Will be populated from data.json
};

// Load data and update subjects
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    subjectsData = data;
    // Populate 2nd year subjects from data.json
    if (data.home && data.home.second) {
      // Debug log
      console.log("Loading 2nd year subjects:", Object.keys(data.home.second));

      // Get all subjects and preserve their exact names as in data.json
      subjects[2] = Object.keys(data.home.second).sort((a, b) =>
        a.localeCompare(b)
      );

      // Debug log
      console.log("Loaded subjects:", subjects[2]);
    }
  })
  .catch((error) => console.error("Error loading data:", error));

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
  document.getElementById("howtoPage").style.display = "none";
  document.getElementById("aboutPage").style.display = "none";
  document.getElementById("contactPage").style.display = "none";
}

function showSubjectsInternal(year) {
  currentYear = year;
  document.getElementById("homePage").style.display = "none";
  document.getElementById("subjectsPage").style.display = "block";
  document.getElementById("resourcesPage").style.display = "none";
  document.getElementById("howtoPage").style.display = "none";
  document.getElementById("aboutPage").style.display = "none";
  document.getElementById("contactPage").style.display = "none";

  document.getElementById("currentYear").textContent =
    year + getSuffix(year) + " Year";
  document.getElementById("yearTitle").textContent =
    year + getSuffix(year) + " Year Subjects";

  const subjectGrid = document.getElementById("subjectGrid");
  subjectGrid.innerHTML = "";

  // Debug log
  console.log("Rendering subjects for year", year, ":", subjects[year]);

  subjects[year].forEach((subject, index) => {
    const card = document.createElement("div");
    card.className = "card subject-card";

    // Store the exact subject name as a data attribute
    card.setAttribute("data-subject", subject);

    card.onclick = () => {
      console.log("Clicked subject:", subject);
      showResources(year, subject);
    };

    // Format the display name (can be customized if needed)
    const displayName = subject;

    // Use a computer SVG for Codetantra / Codentantra subjects (case-insensitive)
    const lower = subject.toLowerCase();
    const isCodetantra =
      lower.includes("codetantra") || lower.includes("codentantra");

    if (isCodetantra) {
      card.innerHTML = `
                <svg class="card-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M8 21h8"></path>
                  <path d="M12 17v4"></path>
                </svg>
                <h3>${displayName}</h3>
                <p>Click to view resources</p>
            `;
    } else {
      card.innerHTML = `
                <i class="fas fa-book-reader"></i>
                <h3>${displayName}</h3>
                <p>Click to view resources</p>
            `;
    }
    subjectGrid.appendChild(card);
  });
}

function showResourcesInternal(year, subject) {
  if (!subjectsData) {
    console.error("Data not loaded yet");
    return;
  }

  currentYear = year;
  document.getElementById("homePage").style.display = "none";
  document.getElementById("subjectsPage").style.display = "none";
  document.getElementById("resourcesPage").style.display = "block";
  document.getElementById("howtoPage").style.display = "none";
  document.getElementById("aboutPage").style.display = "none";
  document.getElementById("contactPage").style.display = "none";

  document.getElementById("breadYear").textContent =
    year + getSuffix(year) + " Year";
  document.getElementById("breadSubject").textContent = subject;
  document.getElementById("subjectTitle").textContent = subject;

  const resourceSection = document.getElementById("resourceSection");
  resourceSection.innerHTML = "";

  // Get the subject data based on year
  const yearData =
    year === 1 ? subjectsData.home.first : subjectsData.home.second;

  // Debug log to check available subjects
  console.log("Available subjects:", Object.keys(yearData));
  console.log("Looking for subject:", subject);

  // For second year, try exact match first then try other cases
  let subjectData = null;
  if (year === 2) {
    // First try direct match
    subjectData = yearData[subject];
    if (!subjectData) {
      // If not found, try to find a case-insensitive match
      const subjectKey = Object.keys(yearData).find(
        (key) => key.toLowerCase() === subject.toLowerCase()
      );
      if (subjectKey) {
        subjectData = yearData[subjectKey];
      }
    }
  } else {
    subjectData = yearData[subject.toLowerCase()];
  }

  if (!subjectData) {
    resourceSection.innerHTML =
      "<p>No resources available for this subject.</p>";
    return;
  }

  // Special handling for Codetantra structure
  if (
    subject.toLowerCase().includes("codetantra") ||
    subject.toLowerCase().includes("codentantra")
  ) {
    // Handle Codetantra's unique structure
    Object.entries(subjectData).forEach(([category, content]) => {
      if (typeof content === "object" && !Array.isArray(content)) {
        const codeItems = Object.entries(content).map(([name, link]) => ({
          name,
          link,
        }));
        if (codeItems.length > 0) {
          const categoryDiv = createResourceCategory(
            category,
            "fa-code",
            codeItems
          );
          resourceSection.appendChild(categoryDiv);
        }
      }
    });
    return;
  }

  // Add notes section if available
  if (subjectData.notes) {
    // Handle different note structures
    if (typeof subjectData.notes === "object") {
      // Check if it's a nested structure (like DS and DSTL)
      const hasNestedStructure = Object.values(subjectData.notes).some(
        (value) => typeof value === "object" && !Array.isArray(value)
      );

      if (hasNestedStructure) {
        // Handle nested structure (e.g., different professors' notes)
        Object.entries(subjectData.notes).forEach(([category, content]) => {
          if (typeof content === "object" && !Array.isArray(content)) {
            const notesItems = Object.entries(content).map(([name, link]) => ({
              name,
              link,
            }));
            if (notesItems.length > 0) {
              const notesDiv = createResourceCategory(
                `Notes - ${category}`,
                "fa-sticky-note",
                notesItems
              );
              resourceSection.appendChild(notesDiv);
            }
          }
        });
      } else {
        // Handle flat structure
        const notesItems = Object.entries(subjectData.notes).map(
          ([name, link]) => ({
            name,
            link,
          })
        );
        const notesDiv = createResourceCategory(
          "Notes",
          "fa-sticky-note",
          notesItems
        );
        resourceSection.appendChild(notesDiv);
      }
    }
  }

  // Add assignments section if available
  if (subjectData.assignments) {
    const assignmentItems = Object.entries(subjectData.assignments).map(
      ([name, link]) => ({
        name,
        link,
      })
    );
    const assignmentsDiv = createResourceCategory(
      "Assignments",
      "fa-tasks",
      assignmentItems
    );
    resourceSection.appendChild(assignmentsDiv);
  }

  // Add papers section if available
  if (subjectData.paper || subjectData.papers) {
    const paperData = subjectData.paper || subjectData.papers;
    const paperItems = Object.entries(paperData).map(([name, link]) => ({
      name,
      link,
    }));
    const papersDiv = createResourceCategory(
      "Previous Year Questions",
      "fa-file-text",
      paperItems
    );
    resourceSection.appendChild(papersDiv);
  }

  // Add YouTube videos section if available
  if (subjectData["Youtube Video (Gateway Classes)"]) {
    const videoData = subjectData["Youtube Video (Gateway Classes)"];
    const videoItems = Object.entries(videoData)
      .filter(([name, data]) => Array.isArray(data))
      .map(([name, [link]]) => ({
        name: `${name} - Video Lecture`,
        link,
      }));
    if (videoItems.length > 0) {
      const videosDiv = createResourceCategory(
        "Video Lectures",
        "fa-youtube",
        videoItems
      );
      resourceSection.appendChild(videosDiv);
    }
  }
}

document.querySelector(".logo-section").addEventListener("click", function () {
  showHome();
  closeMenu(); // optional if you want to auto-close nav on mobile
});

// Public functions (with history push)
function showHome() {
  window.history.pushState({ page: "home" }, "", "#home");
  showHomeInternal();
}

function showSubjects(year) {
  window.history.pushState(
    { page: "subjects", year: year },
    "",
    `#subjects-${year}`
  );
  showSubjectsInternal(year);
}

function showSubjectsFromBread() {
  showSubjects(currentYear);
}

function showResources(year, subject) {
  window.history.pushState(
    { page: "resources", year: year, subject: subject },
    "",
    `#resources-${year}`
  );
  showResourcesInternal(year, subject);
}

function createResourceCategory(title, icon, items) {
  const div = document.createElement("div");
  div.className = "resource-category";

  let html = `<h3><i class="fas ${icon}"></i> ${title}</h3><div class="download-grid">`;

  items.forEach((item, index) => {
    const isVideo = item.link.includes("youtu");
    const itemIcon = isVideo ? "fa-youtube" : "fa-file-pdf";
    const itemType = isVideo ? "Video" : "PDF Document";
    const buttonText = isVideo ? "Watch" : "Download";
    const buttonIcon = isVideo ? "fa-play" : "fa-download";

    html += `
                <div class="download-item">
                    <div class="download-info">
                        <i class="fas ${itemIcon}"></i>
                        <div>
                            <strong>${item.name}</strong>
                            <div style="color: #666; font-size: 0.9em; margin-top: 5px;">${itemType}</div>
                        </div>
                    </div>
                    <button class="download-btn" onclick="downloadFile('${item.link}')">
                        <i class="fas ${buttonIcon}"></i>
                        ${buttonText}
                    </button>
                </div>
            `;
  });

  html += "</div>";
  div.innerHTML = html;
  return div;
}

function downloadFile(fileUrl) {
  // Remove any trailing spaces
  fileUrl = fileUrl.trim();
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
  document.getElementById("howtoPage").style.display = "block";
  document.getElementById("aboutPage").style.display = "none";
  document.getElementById("contactPage").style.display = "none";
}

function showAboutInternal() {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("subjectsPage").style.display = "none";
  document.getElementById("resourcesPage").style.display = "none";
  document.getElementById("howtoPage").style.display = "none";
  document.getElementById("aboutPage").style.display = "block";
  document.getElementById("contactPage").style.display = "none";
}

function showContactInternal() {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("subjectsPage").style.display = "none";
  document.getElementById("resourcesPage").style.display = "none";
  document.getElementById("howtoPage").style.display = "none";
  document.getElementById("aboutPage").style.display = "none";
  document.getElementById("contactPage").style.display = "block";
}

function showHowToDownload() {
  window.history.pushState({ page: "howto" }, "", "#howto");
  showHowToDownloadInternal();
}

function showAbout() {
  window.history.pushState({ page: "about" }, "", "#about");
  showAboutInternal();
}

function showContact() {
  window.history.pushState({ page: "contact" }, "", "#contact");
  showContactInternal();
}

function toggleMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const hamburger = document.querySelector(".hamburger");

  mobileMenu.classList.toggle("active");
  mobileMenuOverlay.classList.toggle("active");
  hamburger.classList.toggle("active");

  // Prevent body scroll when menu is open
  if (mobileMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

function closeMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const hamburger = document.querySelector(".hamburger");

  mobileMenu.classList.remove("active");
  mobileMenuOverlay.classList.remove("active");
  hamburger.classList.remove("active");

  // Restore body scroll
  document.body.style.overflow = "";
}

// Theme toggle functionality
function toggleTheme() {
  const currentTheme = document.body.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.body.setAttribute("data-theme", newTheme);

  // Update theme icon
  const themeIcon = document.getElementById("themeIcon");
  if (newTheme === "light") {
    // Sun icon
    themeIcon.innerHTML = `
      <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2"/>
    `;
  } else {
    // Moon icon
    themeIcon.innerHTML = `
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" fill="none"/>
    `;
  }

  // Save theme preference
  localStorage.setItem("theme", newTheme);
}

// Search functionality
function openSearchModal() {
  document.getElementById("searchModal").style.display = "block";
  document.getElementById("searchInput").focus();
}

function closeSearchModal() {
  document.getElementById("searchModal").style.display = "none";
  document.getElementById("searchInput").value = "";
  document.getElementById("searchResults").innerHTML = `
    <div class="search-placeholder">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
        <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
      </svg>
      <p>Start typing to search for subjects and resources</p>
    </div>
  `;
}

function performSearch() {
  const query = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();
  const resultsContainer = document.getElementById("searchResults");

  if (query.length < 2) {
    resultsContainer.innerHTML = `
      <div class="search-placeholder">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
          <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
        </svg>
        <p>Start typing to search for subjects and resources</p>
      </div>
    `;
    return;
  }

  const results = [];

  // Search through subjects
  Object.entries(subjects).forEach(([year, subjectList]) => {
    subjectList.forEach((subject) => {
      if (subject.toLowerCase().includes(query)) {
        results.push({
          type: "subject",
          title: subject,
          description: `Year ${year} - Subject`,
          year: parseInt(year),
          subject: subject,
          icon: "fa-book",
        });
      }
    });
  });

  // Search through pages
  const pages = [
    {
      name: "Home",
      description: "Main page with year selection",
      page: "home",
      icon: "fa-home",
    },
    {
      name: "How to Download",
      description: "Step by step download guide",
      page: "howto",
      icon: "fa-question-circle",
    },
    {
      name: "About",
      description: "Learn more about our platform",
      page: "about",
      icon: "fa-info-circle",
    },
    {
      name: "Contact",
      description: "Get in touch with us",
      page: "contact",
      icon: "fa-envelope",
    },
  ];

  pages.forEach((page) => {
    if (
      page.name.toLowerCase().includes(query) ||
      page.description.toLowerCase().includes(query)
    ) {
      results.push({
        type: "page",
        title: page.name,
        description: page.description,
        page: page.page,
        icon: page.icon,
      });
    }
  });

  // Display results
  if (results.length === 0) {
    resultsContainer.innerHTML = `
      <div class="search-placeholder">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
          <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
        </svg>
        <p>No results found for "${query}"</p>
      </div>
    `;
  } else {
    let html = "";
    results.forEach((result) => {
      const onClick =
        result.type === "subject"
          ? `showResources(${result.year}, '${result.subject}'); closeSearchModal();`
          : `show${
              result.page.charAt(0).toUpperCase() + result.page.slice(1)
            }(); closeSearchModal();`;

      html += `
        <div class="search-result-item" onclick="${onClick}">
          <div class="search-result-icon">
            <i class="fas ${result.icon}"></i>
          </div>
          <div class="search-result-info">
            <h4>${result.title}</h4>
            <p>${result.description}</p>
          </div>
        </div>
      `;
    });
    resultsContainer.innerHTML = html;
  }
}

// Close modal when clicking outside
document.addEventListener("click", function (event) {
  const modal = document.getElementById("searchModal");
  if (event.target === modal) {
    closeSearchModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeSearchModal();
  }
});

// Initialize theme on page load
document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);

  // Update theme icon based on current theme
  const themeIcon = document.getElementById("themeIcon");
  if (savedTheme === "light") {
    themeIcon.innerHTML = `
      <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2"/>
    `;
  } else {
    themeIcon.innerHTML = `
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" fill="none"/>
    `;
  }
});
