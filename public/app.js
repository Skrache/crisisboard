/*  public/app.js  */

// Global state management
const appState = {
  complaints: [],
  searchQuery: '',
  activeFilters: {},
  sortBy: 'date-desc',
  searchHistory: [],
  suggestions: [
    'hygiene', 'security', 'food quality', 'harassment', 'bullying',
    'electrical', 'cleanliness', 'maintenance', 'hostel', 'canteen',
    'library', 'classroom', 'laboratory', 'parking', 'urgent',
    'pending', 'resolved', 'in progress', 'rejected'
  ]
};

// Sample complaint data for demonstration
const sampleComplaints = [
  {
    id: 1,
    text: "The hostel bathroom needs urgent cleaning. There's a persistent foul smell.",
    category: "hygiene",
    status: "pending",
    priority: "high",
    location: "hostel",
    date: new Date('2024-01-15'),
    email: "student@college.edu"
  },
  {
    id: 2,
    text: "Food quality in canteen has deteriorated significantly. Many students are complaining.",
    category: "food",
    status: "in-progress",
    priority: "medium",
    location: "canteen",
    date: new Date('2024-01-14'),
    email: "anonymous"
  },
  {
    id: 3,
    text: "Electrical issues in Computer Lab 3. Power sockets are not working properly.",
    category: "electrical",
    status: "resolved",
    priority: "high",
    location: "laboratory",
    date: new Date('2024-01-13'),
    email: "student@college.edu"
  },
  {
    id: 4,
    text: "Security concern: Unauthorized people entering the library without proper verification.",
    category: "security",
    status: "pending",
    priority: "urgent",
    location: "library",
    date: new Date('2024-01-12'),
    email: "anonymous"
  },
  {
    id: 5,
    text: "Maintenance required for classroom AC units. Temperature control is not working.",
    category: "maintenance",
    status: "in-progress",
    priority: "medium",
    location: "classroom",
    date: new Date('2024-01-11'),
    email: "student@college.edu"
  }
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  console.log('Initializing CrisisBoard app...');
  
  // Load sample data
  appState.complaints = [...sampleComplaints];
  console.log('Loaded sample complaints:', appState.complaints.length);
  console.log('Sample complaints:', appState.complaints);
  
  // Load search history from localStorage
  loadSearchHistory();
  
  // Initialize all event listeners
  initializeEventListeners();
  
  // Render initial complaints
  renderComplaints();
  
  // Initialize theme
  initializeTheme();
  
  console.log('CrisisBoard app initialization complete');
}

function initializeEventListeners() {
  console.log('Initializing event listeners...');
  
  // Search functionality
  const searchInput = document.getElementById('searchInput');
  const searchSuggestions = document.getElementById('searchSuggestions');
  const searchHistory = document.getElementById('searchHistory');
  
  if (searchInput) {
    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('focus', showSearchHistory);
    searchInput.addEventListener('blur', hideSearchSuggestions);
    searchInput.addEventListener('keydown', handleSearchKeydown);
    console.log('Search input listeners added');
  } else {
    console.error('Search input not found!');
  }
  
  // Filter functionality
  const filterHeader = document.getElementById('filterHeader');
  const filterContent = document.getElementById('filterContent');
  const filterToggleIcon = document.getElementById('filterToggleIcon');
  
  console.log('Filter elements found:', {
    filterHeader: !!filterHeader,
    filterContent: !!filterContent,
    filterToggleIcon: !!filterToggleIcon
  });
  
  if (filterHeader) {
    // Remove any existing listeners to prevent duplicates
    filterHeader.removeEventListener('click', toggleFilterPanel);
    
    // Add click listener
    filterHeader.addEventListener('click', function(e) {
      console.log('Filter header clicked!', e);
      e.preventDefault();
      e.stopPropagation();
      toggleFilterPanel();
    });
    
    // Also add click listener to the entire header area
    filterHeader.addEventListener('mousedown', function(e) {
      console.log('Filter header mousedown!', e);
    });
    
    console.log('Filter header listener added');
  } else {
    console.error('Filter header not found!');
  }
  
  // Filter selects
  const filterSelects = ['categoryFilter', 'statusFilter', 'priorityFilter', 'dateFilter', 'locationFilter'];
  filterSelects.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('change', handleFilterChange);
      console.log(`Filter listener added for ${id}`);
    } else {
      console.error(`Filter element ${id} not found!`);
    }
  });
  
  // Sort functionality
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', handleSortChange);
    console.log('Sort listener added');
  } else {
    console.error('Sort select not found!');
  }
  
  // Clear search
  const clearSearchBtn = document.getElementById('clearSearch');
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', clearSearch);
    console.log('Clear search listener added');
  } else {
    console.error('Clear search button not found!');
  }
  
  // Form submission
  const complaintForm = document.getElementById('complaintForm');
  if (complaintForm) {
    complaintForm.addEventListener('submit', handleComplaintSubmission);
    console.log('Form submission listener added');
  } else {
    console.error('Complaint form not found!');
  }
  
  // Sign in button
  const signInBtn = document.getElementById('signInBtn');
  if (signInBtn) {
    signInBtn.addEventListener('click', handleSignIn);
    console.log('Sign in listener added');
  } else {
    console.error('Sign in button not found!');
  }
  
  console.log('Event listeners initialization complete');
  
  // Test filter panel state
  const testFilterContent = document.getElementById('filterContent');
  if (testFilterContent) {
    console.log('Initial filter panel state:', {
      element: testFilterContent,
      classes: testFilterContent.className,
      display: window.getComputedStyle(testFilterContent).display,
      hasOpenClass: testFilterContent.classList.contains('open')
    });
  }
}

// Search functionality
function handleSearchInput(e) {
  const query = e.target.value.trim();
  appState.searchQuery = query;
  
  if (query.length === 0) {
    hideSearchSuggestions();
    renderComplaints();
    return;
  }
  
  if (query.length >= 2) {
    showSearchSuggestions(query);
  } else {
    hideSearchSuggestions();
  }
  
  // Debounce search
  clearTimeout(window.searchTimeout);
  window.searchTimeout = setTimeout(() => {
    performSearch();
  }, 300);
}

function showSearchSuggestions(query) {
  const suggestions = appState.suggestions.filter(suggestion => 
    suggestion.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);
  
  const searchSuggestions = document.getElementById('searchSuggestions');
  
  if (suggestions.length === 0) {
    searchSuggestions.style.display = 'none';
    return;
  }
  
  searchSuggestions.innerHTML = suggestions.map(suggestion => `
    <div class="search-suggestion" onclick="selectSuggestion('${suggestion}')">
      ${highlightMatch(suggestion, query)}
    </div>
  `).join('');
  
  searchSuggestions.style.display = 'block';
}

function hideSearchSuggestions() {
  setTimeout(() => {
    document.getElementById('searchSuggestions').style.display = 'none';
    document.getElementById('searchHistory').style.display = 'none';
  }, 200);
}

function selectSuggestion(suggestion) {
  document.getElementById('searchInput').value = suggestion;
  appState.searchQuery = suggestion;
  hideSearchSuggestions();
  performSearch();
  addToSearchHistory(suggestion);
}

function showSearchHistory() {
  if (appState.searchHistory.length === 0) return;
  
  const searchHistory = document.getElementById('searchHistory');
  searchHistory.innerHTML = appState.searchHistory.map(item => `
    <div class="search-history-item" onclick="selectHistoryItem('${item}')">
      <span class="search-history-icon">🕒</span>
      <span>${item}</span>
    </div>
  `).join('');
  
  searchHistory.style.display = 'block';
}

function selectHistoryItem(item) {
  document.getElementById('searchInput').value = item;
  appState.searchQuery = item;
  hideSearchSuggestions();
  performSearch();
}

function addToSearchHistory(query) {
  if (!appState.searchHistory.includes(query)) {
    appState.searchHistory.unshift(query);
    appState.searchHistory = appState.searchHistory.slice(0, 10); // Keep only last 10
    saveSearchHistory();
  }
}

function loadSearchHistory() {
  const saved = localStorage.getItem('crisisboard_search_history');
  if (saved) {
    appState.searchHistory = JSON.parse(saved);
  }
}

function saveSearchHistory() {
  localStorage.setItem('crisisboard_search_history', JSON.stringify(appState.searchHistory));
}

function handleSearchKeydown(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const query = e.target.value.trim();
    if (query) {
      addToSearchHistory(query);
      performSearch();
    }
  }
}

// Filter functionality
function toggleFilterPanel() {
  console.log('toggleFilterPanel called');
  const filterContent = document.getElementById('filterContent');
  const filterToggleIcon = document.getElementById('filterToggleIcon');
  
  console.log('filterContent element:', filterContent);
  console.log('filterToggleIcon element:', filterToggleIcon);
  
  if (filterContent) {
    const wasOpen = filterContent.classList.contains('open');
    console.log('Was open:', wasOpen);
    
    // Toggle the open class
    filterContent.classList.toggle('open');
    const isNowOpen = filterContent.classList.contains('open');
    console.log('Is now open:', isNowOpen);
    
    // Additional debugging
    console.log('Filter panel state:', {
      wasOpen: wasOpen,
      isNowOpen: isNowOpen,
      classes: filterContent.className,
      display: window.getComputedStyle(filterContent).display
    });
    
    if (filterToggleIcon) {
      filterToggleIcon.style.transform = isNowOpen ? 'rotate(180deg)' : '';
    }
  } else {
    console.error('filterContent element not found!');
  }
}

function handleFilterChange(e) {
  const filterType = e.target.id.replace('Filter', '');
  const value = e.target.value;
  
  console.log('Filter changed:', filterType, value); // Debug log
  
  if (value) {
    appState.activeFilters[filterType] = value;
  } else {
    delete appState.activeFilters[filterType];
  }
  
  console.log('Active filters:', appState.activeFilters); // Debug log
  updateActiveFilterChips();
  performSearch();
}

function updateActiveFilterChips() {
  const activeFiltersContainer = document.getElementById('activeFilters');
  const chips = Object.entries(appState.activeFilters).map(([key, value]) => `
    <div class="filter-chip" onclick="removeFilter('${key}')">
      ${getFilterDisplayName(key, value)}
      <span class="remove">×</span>
    </div>
  `).join('');
  
  activeFiltersContainer.innerHTML = chips;
}

function getFilterDisplayName(key, value) {
  const displayNames = {
    category: 'Category: ' + value.charAt(0).toUpperCase() + value.slice(1),
    status: 'Status: ' + value.charAt(0).toUpperCase() + value.slice(1),
    priority: 'Priority: ' + value.charAt(0).toUpperCase() + value.slice(1),
    date: 'Date: ' + value.charAt(0).toUpperCase() + value.slice(1),
    location: 'Location: ' + value.charAt(0).toUpperCase() + value.slice(1)
  };
  return displayNames[key] || `${key}: ${value}`;
}

function removeFilter(filterType) {
  delete appState.activeFilters[filterType];
  document.getElementById(filterType + 'Filter').value = '';
  updateActiveFilterChips();
  performSearch();
}

function handleSortChange(e) {
  appState.sortBy = e.target.value;
  performSearch();
}

// Search and filter logic
function performSearch() {
  let filteredComplaints = [...appState.complaints];
  
  console.log('Starting search with:', {
    searchQuery: appState.searchQuery,
    activeFilters: appState.activeFilters,
    totalComplaints: filteredComplaints.length
  });
  
  // Text search
  if (appState.searchQuery) {
    const query = appState.searchQuery.toLowerCase();
    filteredComplaints = filteredComplaints.filter(complaint => 
      complaint.text.toLowerCase().includes(query) ||
      complaint.category.toLowerCase().includes(query) ||
      complaint.location.toLowerCase().includes(query) ||
      complaint.status.toLowerCase().includes(query)
    );
    console.log('After text search:', filteredComplaints.length, 'complaints');
  }
  
  // Apply filters
  Object.entries(appState.activeFilters).forEach(([filterType, value]) => {
    console.log(`Applying ${filterType} filter with value: ${value}`);
    filteredComplaints = filteredComplaints.filter(complaint => {
      let matches = false;
      switch (filterType) {
        case 'category':
          matches = complaint.category === value;
          break;
        case 'status':
          matches = complaint.status === value;
          break;
        case 'priority':
          matches = complaint.priority === value;
          break;
        case 'location':
          matches = complaint.location === value;
          break;
        case 'date':
          matches = filterByDate(complaint.date, value);
          break;
        default:
          matches = true;
      }
      console.log(`Complaint ${complaint.id} (${complaint.category}/${complaint.status}/${complaint.priority}/${complaint.location}) matches ${filterType}: ${matches}`);
      return matches;
    });
    console.log(`After ${filterType} filter:`, filteredComplaints.length, 'complaints');
  });
  
  // Apply sorting
  filteredComplaints = sortComplaints(filteredComplaints, appState.sortBy);
  
  console.log('Final results:', filteredComplaints.length, 'complaints');
  
  // Render results
  renderComplaints(filteredComplaints);
  updateSearchResultsInfo(filteredComplaints.length);
}

function filterByDate(complaintDate, dateFilter) {
  const now = new Date();
  const complaintTime = complaintDate.getTime();
  
  switch (dateFilter) {
    case 'today':
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return complaintTime >= today.getTime();
    case 'week':
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return complaintTime >= weekAgo.getTime();
    case 'month':
      const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      return complaintTime >= monthAgo.getTime();
    case 'quarter':
      const quarterAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
      return complaintTime >= quarterAgo.getTime();
    case 'year':
      const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      return complaintTime >= yearAgo.getTime();
    default:
      return true;
  }
}

function sortComplaints(complaints, sortBy) {
  return complaints.sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return b.date - a.date;
      case 'date-asc':
        return a.date - b.date;
      case 'priority-desc':
        return getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
      case 'priority-asc':
        return getPriorityWeight(a.priority) - getPriorityWeight(b.priority);
      case 'status':
        return a.status.localeCompare(b.status);
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });
}

function getPriorityWeight(priority) {
  const weights = { 'low': 1, 'medium': 2, 'high': 3, 'urgent': 4 };
  return weights[priority] || 0;
}

function clearSearch() {
  appState.searchQuery = '';
  appState.activeFilters = {};
  
  // Reset form inputs
  document.getElementById('searchInput').value = '';
  ['categoryFilter', 'statusFilter', 'priorityFilter', 'dateFilter', 'locationFilter'].forEach(id => {
    document.getElementById(id).value = '';
  });
  
  // Clear filter chips
  document.getElementById('activeFilters').innerHTML = '';
  
  // Hide search results info
  document.getElementById('searchResultsInfo').style.display = 'none';
  
  // Render all complaints
  renderComplaints();
}

function updateSearchResultsInfo(count) {
  const searchResultsInfo = document.getElementById('searchResultsInfo');
  const resultsCount = document.getElementById('resultsCount');
  
  if (appState.searchQuery || Object.keys(appState.activeFilters).length > 0) {
    resultsCount.textContent = `${count} result${count !== 1 ? 's' : ''} found`;
    searchResultsInfo.style.display = 'flex';
  } else {
    searchResultsInfo.style.display = 'none';
  }
}

// Rendering functions
function renderComplaints(complaints = null) {
  const complaintsToRender = complaints || appState.complaints;
  const complaintsList = document.getElementById('complaintsList');
  
  if (complaintsToRender.length === 0) {
    complaintsList.innerHTML = `
      <div class="text-center py-8 text-gray-500">
        <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <p class="text-lg font-medium">No complaints found</p>
        <p class="text-sm">Try adjusting your search or filters</p>
      </div>
    `;
    return;
  }
  
  complaintsList.innerHTML = complaintsToRender.map(complaint => `
    <div class="bg-white rounded-lg p-4 shadow-md border border-gray-200 mb-3 dark-mode-item">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <p class="text-gray-800 text-sm md:text-base">${highlightSearchTerms(complaint.text)}</p>
          <div class="flex flex-wrap gap-2 mt-2">
            <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">${complaint.category}</span>
            <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">${complaint.location}</span>
            <span class="px-2 py-1 text-xs font-medium ${getPriorityColor(complaint.priority)}">${complaint.priority}</span>
          </div>
          <p class="text-xs md:text-sm text-gray-500 mt-2">Submitted ${formatDate(complaint.date)}</p>
        </div>
        <div class="flex flex-col items-end gap-2">
          <span class="px-2 py-1 text-xs font-medium ${getStatusColor(complaint.status)} rounded-full">
            ${complaint.status}
          </span>
          <button onclick="deleteComplaint(${complaint.id})" class="text-red-600 hover:text-red-800 text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function highlightSearchTerms(text) {
  if (!appState.searchQuery) return text;
  
  const query = appState.searchQuery.toLowerCase();
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<span class="search-highlight">$1</span>');
}

function highlightMatch(text, query) {
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<span class="search-highlight">$1</span>');
}

function getPriorityColor(priority) {
  const colors = {
    'low': 'bg-gray-100 text-gray-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'high': 'bg-orange-100 text-orange-800',
    'urgent': 'bg-red-100 text-red-800'
  };
  return colors[priority] || colors.low;
}

function getStatusColor(status) {
  const colors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'resolved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800'
  };
  return colors[status] || colors.pending;
}

function formatDate(date) {
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

// Complaint management
function handleComplaintSubmission(e) {
  e.preventDefault();
  
  const text = document.getElementById('issueText').value.trim();
  if (!text) {
    alert('Please enter an issue description.');
    return;
  }
  
  const includeEmail = document.getElementById('includeEmail').checked;
  const email = includeEmail ? 'user@example.com' : 'anonymous';
  
  // Create new complaint
  const newComplaint = {
    id: Date.now(),
    text: text,
    category: 'pending', // Will be categorized by AI later
    status: 'pending',
    priority: 'medium',
    location: 'general',
    date: new Date(),
    email: email
  };
  
  // Add to complaints array
  appState.complaints.unshift(newComplaint);
  
  // Clear form
  document.getElementById('issueText').value = '';
  document.getElementById('includeEmail').checked = false;
  
  // Show success message
  const statusMessage = document.getElementById('statusMessage');
  statusMessage.textContent = '✅ Issue submitted successfully!';
  statusMessage.className = 'text-center text-sm font-medium text-green-600';
  
  setTimeout(() => {
    statusMessage.textContent = '';
    statusMessage.className = 'text-center text-sm font-medium';
  }, 3000);
  
  // Re-render complaints
  renderComplaints();
}

function deleteComplaint(id) {
  if (confirm('Are you sure you want to delete this complaint?')) {
    appState.complaints = appState.complaints.filter(complaint => complaint.id !== id);
    renderComplaints();
  }
}

function handleSignIn() {
  alert('Sign-in functionality will be implemented soon!');
}

// Theme functionality
function initializeTheme() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark', currentTheme === 'dark');
  
  const themeToggles = document.querySelectorAll('.theme-toggle');
  themeToggles.forEach(toggle => {
    toggle.classList.toggle('dark', currentTheme === 'dark');
    toggle.addEventListener('click', toggleTheme);
  });
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  
  const themeToggles = document.querySelectorAll('.theme-toggle');
  themeToggles.forEach(toggle => {
    toggle.classList.toggle('dark', isDark);
  });
  
  // Update dynamically created items
  const darkModeItems = document.querySelectorAll('.dark-mode-item');
  darkModeItems.forEach(item => {
    if (isDark) {
      item.classList.add('dark-mode-item');
    } else {
      item.classList.remove('dark-mode-item');
    }
  });
}
