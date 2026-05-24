document.addEventListener('DOMContentLoaded', () => {
  // --- STATE ---
  const state = {
    activeTab: 'predict', // 'predict' or 'dataset'
    name: '',
    education: '',
    skills: [],
    certifications: [],
    softSkills: [],
    isLoading: false,
    predictionResult: null,

    // Dataset explorer state
    dataset: [],
    filteredDataset: [],
    currentPage: 0,
    rowsPerPage: 10,
    searchQuery: '',
    isDatasetLoading: true
  };

  // --- DATA OPTIONS ---
  const OPTIONS = {
    skills: [
      "Python", "JavaScript", "React", "Node.js", "TypeScript", "Angular", "Vue.js",
      "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Scikit-learn",
      "SQL", "MongoDB", "MySQL", "PostgreSQL", "Docker", "AWS", "Git",
      "HTML", "CSS", "PHP", "R", "Excel", "Pandas", "NumPy",
      "NLP", "OpenCV", "LangChain", "Hugging Face", "MLOps", "Keras",
      "REST APIs", "GraphQL", "SPSS", "Statistics", "Data Visualization",
      "Google Analytics", "Tableau"
    ],
    certifications: [
      "AWS Cloud Practitioner", "AWS Machine Learning", "Google TensorFlow Developer",
      "Deep Learning Specialization", "IBM AI Engineering", "MongoDB Developer",
      "React Developer Certification", "Node.js Certification", "Meta Frontend Developer",
      "Tableau Desktop Specialist", "None"
    ],
    softSkills: [
      "Communication", "Teamwork", "Leadership", "Problem Solving",
      "Critical Thinking", "Creativity", "Adaptability", "Collaboration",
      "Attention to Detail", "Time Management"
    ],
    education: ["Diploma", "Bachelor's", "Master's", "PhD"]
  };

  // --- PREDICTOR DICTIONARIES ---
  const ROLE_TIPS = {
    "AI Engineer": [
      "Master deep learning frameworks like TensorFlow and PyTorch",
      "Build a portfolio of ML projects on GitHub",
      "Stay updated with latest research papers on arXiv",
      "Learn MLOps for production deployment"
    ],
    "Web Developer": [
      "Build full-stack projects with modern frameworks",
      "Learn cloud deployment (AWS, Vercel, Netlify)",
      "Contribute to open-source projects",
      "Master responsive design and accessibility"
    ],
    "Data Analyst": [
      "Get proficient with SQL and Excel for data manipulation",
      "Learn data visualization tools like Tableau or Power BI",
      "Practice statistical analysis and hypothesis testing",
      "Build dashboards and reports for real-world datasets"
    ],
    "Data Scientist": [
      "Strengthen your statistics and probability foundations",
      "Learn feature engineering techniques",
      "Practice with Kaggle competitions",
      "Master storytelling with data"
    ]
  };

  const RELATED_ROLES = {
    "AI Engineer": ["ML Engineer", "Data Scientist", "Research Engineer", "NLP Engineer"],
    "Web Developer": ["Full Stack Developer", "Frontend Engineer", "UI/UX Developer", "DevOps Engineer"],
    "Data Analyst": ["Business Analyst", "Data Scientist", "BI Developer", "Analytics Engineer"],
    "Data Scientist": ["ML Engineer", "AI Engineer", "Data Analyst", "Research Scientist"]
  };

  // --- INLINE SVG ICONS ---
  const ICONS = {
    AI_Engineer: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" /><path d="M17.599 6.5a3 3 0 0 0 .399-1.375" /><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" /><path d="M3.477 10.896a4 4 0 0 1 .585-.396" /><path d="M19.938 10.5a4 4 0 0 1 .585.396" /><path d="M6 18a4 4 0 0 1-1.967-.516" /><path d="M19.967 17.484A4 4 0 0 1 18 18" /></svg>`,
    Web_Developer: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    Data_Analyst: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    Data_Scientist: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>`,
    Default_Icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    Lightbulb: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
    ChevronLeft: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
    ChevronRight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`
  };

  // --- ELEMENT SELECTORS ---
  const el = {
    // Navigation Tabs
    predictTabBtn: document.getElementById('tab-predict-btn'),
    datasetTabBtn: document.getElementById('tab-dataset-btn'),
    predictPanel: document.getElementById('panel-predict'),
    datasetPanel: document.getElementById('panel-dataset'),

    // Form inputs
    userNameInput: document.getElementById('user-name'),
    eduTrigger: document.getElementById('edu-trigger'),
    eduTriggerLabel: document.getElementById('edu-trigger-label'),
    eduOptionsContainer: document.getElementById('edu-options'),
    skillsSearch: document.getElementById('skills-search'),
    skillsDropdown: document.getElementById('skills-dropdown'),
    skillsTags: document.getElementById('skills-tags'),
    certsSearch: document.getElementById('certs-search'),
    certsDropdown: document.getElementById('certs-dropdown'),
    certsTags: document.getElementById('certs-tags'),
    softSearch: document.getElementById('soft-search'),
    softDropdown: document.getElementById('soft-dropdown'),
    softTags: document.getElementById('soft-tags'),
    predictBtn: document.getElementById('predict-btn'),

    // Predictor outputs/states
    resultEmpty: document.getElementById('result-empty-state'),
    resultLoading: document.getElementById('result-loading-state'),
    resultContent: document.getElementById('result-content-state'),
    resultRoleName: document.getElementById('result-role-name'),
    resultRoleIcon: document.getElementById('result-role-icon'),
    resultConfidenceVal: document.getElementById('result-confidence-val'),
    resultConfidenceFill: document.getElementById('result-confidence-fill'),
    resultRelatedTags: document.getElementById('result-related-tags'),
    resultTipsList: document.getElementById('result-tips-list'),

    // Dataset view
    datasetTableBody: document.getElementById('dataset-table-body'),
    datasetTableLoading: document.getElementById('dataset-loading-row'),
    datasetCountLabel: document.getElementById('dataset-count-label'),
    datasetSearch: document.getElementById('dataset-search'),
    btnPrevPage: document.getElementById('btn-prev-page'),
    btnNextPage: document.getElementById('btn-next-page'),
    pageStatusLabel: document.getElementById('page-status-label'),
    pageNumberIndicator: document.getElementById('page-number-indicator')
  };

  // --- TAB NAVIGATION ENGINE ---
  function switchTab(tabId) {
    state.activeTab = tabId;
    if (tabId === 'predict') {
      el.predictTabBtn.classList.add('active');
      el.datasetTabBtn.classList.remove('active');
      el.predictPanel.classList.add('active');
      el.datasetPanel.classList.remove('active');
    } else {
      el.predictTabBtn.classList.remove('active');
      el.datasetTabBtn.classList.add('active');
      el.predictPanel.classList.remove('active');
      el.datasetPanel.classList.add('active');
      // Load dataset if not already done
      if (state.dataset.length === 0) {
        fetchDataset();
      }
    }
  }

  el.predictTabBtn.addEventListener('click', () => switchTab('predict'));
  el.datasetTabBtn.addEventListener('click', () => switchTab('dataset'));

  // --- CUSTOM SELECTOR ENGINE (EDUCATION) ---
  el.eduTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = el.eduOptionsContainer.classList.contains('open');
    closeAllDropdowns();
    if (!isOpen) {
      el.eduOptionsContainer.classList.add('open');
      el.eduTrigger.classList.add('active');
    }
  });

  // Populate Education options
  OPTIONS.education.forEach(eduLevel => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'select-option';
    btn.textContent = eduLevel;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.education = eduLevel;
      el.eduTriggerLabel.textContent = eduLevel;
      el.eduTrigger.classList.remove('placeholder');
      el.eduOptionsContainer.classList.remove('open');
      el.eduTrigger.classList.remove('active');
      validateForm();
    });
    el.eduOptionsContainer.appendChild(btn);
  });

  // --- DYNAMIC TAG MANAGER (SKILLS, CERTS, SOFT SKILLS) ---
  function setupTagManager(inputEl, dropdownEl, tagContainerEl, optionsList, activeArrayKey) {
    // Render the active tag chips
    function renderTags() {
      tagContainerEl.innerHTML = '';
      state[activeArrayKey].forEach(tag => {
        const chip = document.createElement('span');
        chip.className = 'tag-chip';
        chip.innerHTML = `${tag} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
        
        chip.addEventListener('click', () => {
          state[activeArrayKey] = state[activeArrayKey].filter(t => t !== tag);
          renderTags();
          validateForm();
        });
        tagContainerEl.appendChild(chip);
      });
    }

    // Filter and open autocomplete dropdown list
    function filterDropdown() {
      const query = inputEl.value.toLowerCase().trim();
      const filtered = optionsList.filter(o => 
        o.toLowerCase().includes(query) && !state[activeArrayKey].includes(o)
      );

      dropdownEl.innerHTML = '';
      if (filtered.length > 0 && document.activeElement === inputEl) {
        dropdownEl.classList.add('open');
        filtered.slice(0, 8).forEach(option => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'autocomplete-option';
          btn.textContent = option;
          btn.addEventListener('mousedown', (e) => {
            e.preventDefault(); // Prevent focus loss
            state[activeArrayKey].push(option);
            renderTags();
            inputEl.value = '';
            dropdownEl.classList.remove('open');
            validateForm();
          });
          dropdownEl.appendChild(btn);
        });
      } else {
        dropdownEl.classList.remove('open');
      }
    }

    inputEl.addEventListener('focus', filterDropdown);
    inputEl.addEventListener('input', filterDropdown);
    inputEl.addEventListener('blur', () => {
      setTimeout(() => dropdownEl.classList.remove('open'), 150);
    });

    return { renderTags };
  }

  const skillManager = setupTagManager(el.skillsSearch, el.skillsDropdown, el.skillsTags, OPTIONS.skills, 'skills');
  const certManager = setupTagManager(el.certsSearch, el.certsDropdown, el.certsTags, OPTIONS.certifications, 'certifications');
  const softManager = setupTagManager(el.softSearch, el.softDropdown, el.softTags, OPTIONS.softSkills, 'softSkills');

  // --- GENERAL FORM ENGINE ---
  el.userNameInput.addEventListener('input', (e) => {
    state.name = e.target.value;
  });

  function validateForm() {
    const isValid = state.education !== '' && state.skills.length > 0;
    el.predictBtn.disabled = !isValid;
  }

  // --- PREDICT ENGINE ---
  el.predictBtn.addEventListener('click', async () => {
    if (state.education === '' || state.skills.length === 0) return;

    state.isLoading = true;
    el.resultEmpty.style.display = 'none';
    el.resultContent.style.display = 'none';
    el.resultLoading.style.display = 'flex';
    el.predictBtn.disabled = true;

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2400));

    // Determine predicted job role based on skills
    const hasML = state.skills.some(s =>
      ["Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "NLP", "OpenCV", "Keras", "Scikit-learn", "MLOps", "LangChain", "Hugging Face"].includes(s)
    );
    const hasWeb = state.skills.some(s =>
      ["React", "Angular", "Vue.js", "Node.js", "JavaScript", "TypeScript", "HTML", "CSS", "PHP", "REST APIs"].includes(s)
    );
    const hasData = state.skills.some(s =>
      ["SQL", "Excel", "R", "Pandas", "Tableau", "SPSS", "Statistics", "Data Visualization", "NumPy"].includes(s)
    );

    let role = "Web Developer";
    let confidence = 75 + Math.random() * 20;
    if (hasML && !hasWeb) {
      role = "AI Engineer";
      confidence = 80 + Math.random() * 18;
    } else if (hasData && !hasML && !hasWeb) {
      role = "Data Analyst";
      confidence = 78 + Math.random() * 18;
    } else if (hasML && hasData) {
      role = "Data Scientist";
      confidence = 76 + Math.random() * 20;
    }

    state.predictionResult = {
      role,
      confidence: Math.round(confidence)
    };

    state.isLoading = false;
    renderPrediction();
  });

  function renderPrediction() {
    el.resultLoading.style.display = 'none';
    if (!state.predictionResult) {
      el.resultEmpty.style.display = 'flex';
      el.resultContent.style.display = 'none';
      return;
    }

    const { role, confidence } = state.predictionResult;

    // Update texts and icons
    el.resultRoleName.textContent = role;
    el.resultRoleIcon.innerHTML = ICONS[role.replace(" ", "_")] || ICONS.Default_Icon;
    el.resultConfidenceVal.textContent = `${confidence}%`;

    // Dynamic scale confidence filling bar
    el.resultConfidenceFill.style.width = '0%';
    setTimeout(() => {
      el.resultConfidenceFill.style.width = `${confidence}%`;
    }, 100);

    // Populate Related Roles
    el.resultRelatedTags.innerHTML = '';
    const related = RELATED_ROLES[role] || [];
    related.forEach(r => {
      const chip = document.createElement('span');
      chip.className = 'tag-chip';
      chip.textContent = r;
      el.resultRelatedTags.appendChild(chip);
    });

    // Populate Career Tips list
    el.resultTipsList.innerHTML = '';
    const tips = ROLE_TIPS[role] || [];
    tips.forEach(tip => {
      const li = document.createElement('li');
      li.className = 'tip-item';
      li.innerHTML = `<span class="tip-dot"></span><div>${tip}</div>`;
      el.resultTipsList.appendChild(li);
    });

    el.resultContent.style.display = 'flex';
    el.predictBtn.disabled = false;
  }

  // --- DATASET EXPLORER ENGINE ---
  async function fetchDataset() {
    state.isDatasetLoading = true;
    el.datasetTableLoading.style.display = 'table-row';

    // List of potential CSV endpoints to test (helps resolve static serving paths)
    const pathsToTry = [
      './public/data/job_role_realistic_dataset.csv',
      './data/job_role_realistic_dataset.csv',
      '/data/job_role_realistic_dataset.csv',
      '/public/data/job_role_realistic_dataset.csv'
    ];

    let textData = null;
    for (const p of pathsToTry) {
      try {
        const res = await fetch(p);
        if (res.ok) {
          textData = await res.text();
          break;
        }
      } catch (e) {
        // Continue silently to next path
      }
    }

    if (!textData) {
      console.error("Could not fetch dataset CSV from any endpoint.");
      state.isDatasetLoading = false;
      el.datasetTableLoading.innerHTML = `<td colspan="7" style="text-align: center; color: var(--accent); padding: 2rem;">Error: Failed to load dataset CSV file.</td>`;
      return;
    }

    parseCSV(textData);
  }

  function parseCSV(text) {
    const lines = text.trim().split('\n');
    const parsed = [];

    for (let i = 1; i < lines.length; i++) {
      const columns = parseCSVLine(lines[i]);
      if (columns.length >= 9) {
        parsed.push({
          skills: columns[0],
          certifications: columns[1],
          experience: columns[2],
          education: columns[3],
          projects: columns[4],
          commits: columns[5],
          softSkills: columns[6],
          salary: columns[7],
          role: columns[8]
        });
      }
    }

    state.dataset = parsed;
    state.filteredDataset = parsed;
    state.isDatasetLoading = false;
    el.datasetTableLoading.style.display = 'none';
    el.datasetCountLabel.textContent = `(${parsed.length} records)`;
    
    renderTable();
  }

  function parseCSVLine(line) {
    const result = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  }

  function renderTable() {
    el.datasetTableBody.innerHTML = '';

    const start = state.currentPage * state.rowsPerPage;
    const end = start + state.rowsPerPage;
    const totalRecords = state.filteredDataset.length;
    const totalPages = Math.ceil(totalRecords / state.rowsPerPage) || 1;

    // Boundary check
    if (state.currentPage >= totalPages) {
      state.currentPage = totalPages - 1;
    }
    if (state.currentPage < 0) {
      state.currentPage = 0;
    }

    const pageData = state.filteredDataset.slice(start, end);

    if (pageData.length === 0) {
      el.datasetTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--muted-foreground); padding: 3rem 0;">No matching records found</td></tr>`;
      el.btnPrevPage.disabled = true;
      el.btnNextPage.disabled = true;
      el.pageStatusLabel.textContent = `Showing 0-0 of 0`;
      el.pageNumberIndicator.textContent = `1 / 1`;
      return;
    }

    pageData.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="table-role-badge">${row.role}</span></td>
        <td>${row.education}</td>
        <td>${row.experience}y</td>
        <td class="truncate-cell" title="${row.skills}">${row.skills}</td>
        <td class="truncate-cell" title="${row.certifications}">${row.certifications}</td>
        <td class="truncate-cell" title="${row.softSkills}">${row.softSkills}</td>
        <td>₹${row.salary}L</td>
      `;
      el.datasetTableBody.appendChild(tr);
    });

    // Handle button disabled state
    el.btnPrevPage.disabled = state.currentPage === 0;
    el.btnNextPage.disabled = state.currentPage >= totalPages - 1;

    const actualEnd = Math.min(end, totalRecords);
    el.pageStatusLabel.textContent = `Showing ${start + 1}-${actualEnd} of ${totalRecords}`;
    el.pageNumberIndicator.textContent = `${state.currentPage + 1} / ${totalPages}`;
  }

  // Table Pagination Listeners
  el.btnPrevPage.addEventListener('click', () => {
    if (state.currentPage > 0) {
      state.currentPage--;
      renderTable();
    }
  });

  el.btnNextPage.addEventListener('click', () => {
    const totalPages = Math.ceil(state.filteredDataset.length / state.rowsPerPage);
    if (state.currentPage < totalPages - 1) {
      state.currentPage++;
      renderTable();
    }
  });

  // Table Live Search Listener
  el.datasetSearch.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.toLowerCase().trim();
    state.currentPage = 0; // Reset to page 1

    if (state.searchQuery === '') {
      state.filteredDataset = state.dataset;
    } else {
      state.filteredDataset = state.dataset.filter(row => {
        return row.role.toLowerCase().includes(state.searchQuery) ||
               row.skills.toLowerCase().includes(state.searchQuery) ||
               row.education.toLowerCase().includes(state.searchQuery) ||
               row.certifications.toLowerCase().includes(state.searchQuery) ||
               row.softSkills.toLowerCase().includes(state.searchQuery);
      });
    }

    renderTable();
  });

  // --- GENERAL CLICK HANDLING ---
  function closeAllDropdowns() {
    el.eduOptionsContainer.classList.remove('open');
    el.eduTrigger.classList.remove('active');
  }

  document.addEventListener('click', closeAllDropdowns);

  // --- VANILLA CANVAS PARTICLE ANIMATION ENGINE ---
  function setupParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particlesList = [];
    const colors = ['#7c3aed', '#3b82f6', '#ec4899'];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1; // Between 1 and 3
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.3 + 0.1; // 0.1 to 0.4
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce boundaries
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize particles
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      particlesList.push(new Particle());
    }

    // Main animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Connect particles
      for (let i = 0; i < particlesList.length; i++) {
        for (let j = i + 1; j < particlesList.length; j++) {
          const dx = particlesList[i].x - particlesList[j].x;
          const dy = particlesList[i].y - particlesList[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(particlesList[i].x, particlesList[i].y);
            ctx.lineTo(particlesList[j].x, particlesList[j].y);
            ctx.strokeStyle = '#7c3aed';
            ctx.globalAlpha = (1 - distance / 120) * 0.08;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Update & Draw
      particlesList.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  setupParticles();
});
