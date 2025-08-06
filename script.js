// Dynamic greeting based on time
function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const greetingElement = document.getElementById('greeting-text');
    
    if (hour < 12) {
        greetingElement.textContent = 'Good morning';
    } else if (hour < 18) {
        greetingElement.textContent = 'Good afternoon';
    } else {
        greetingElement.textContent = 'Good evening';
    }
}

// Player functionality
let isPlaying = false;
let currentProgress = 0;
let currentVolume = 70;

function togglePlayPause() {
    const playPauseBtn = document.querySelector('.play-pause-btn i');
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        playPauseBtn.className = 'fas fa-pause';
        startProgressAnimation();
    } else {
        playPauseBtn.className = 'fas fa-play';
        stopProgressAnimation();
    }
}

let progressInterval;

function startProgressAnimation() {
    progressInterval = setInterval(() => {
        currentProgress += 0.5;
        if (currentProgress >= 100) {
            currentProgress = 0;
            togglePlayPause(); // Auto stop when song ends
        }
        updateProgressBar();
    }, 1000);
}

function stopProgressAnimation() {
    clearInterval(progressInterval);
}

function updateProgressBar() {
    const progressFilled = document.querySelector('.progress-filled');
    progressFilled.style.width = currentProgress + '%';
    
    // Update time display
    const totalSeconds = Math.floor((currentProgress / 100) * 225); // 3:45 = 225 seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const timeElement = document.querySelector('.time');
    timeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Progress bar click functionality
function setupProgressBar() {
    const progressBar = document.querySelector('.progress');
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        currentProgress = (clickX / width) * 100;
        updateProgressBar();
    });
}

// Volume control functionality
function setupVolumeControl() {
    const volumeBar = document.querySelector('.volume-bar');
    const volumeIcon = document.querySelector('.volume-control .control-btn i');
    
    volumeBar.addEventListener('click', (e) => {
        const rect = volumeBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        currentVolume = (clickX / width) * 100;
        updateVolumeBar();
        updateVolumeIcon();
    });
    
    // Volume icon click to mute/unmute
    volumeIcon.parentElement.addEventListener('click', () => {
        if (currentVolume > 0) {
            currentVolume = 0;
        } else {
            currentVolume = 70;
        }
        updateVolumeBar();
        updateVolumeIcon();
    });
}

function updateVolumeBar() {
    const volumeFilled = document.querySelector('.volume-filled');
    volumeFilled.style.width = currentVolume + '%';
}

function updateVolumeIcon() {
    const volumeIcon = document.querySelector('.volume-control .control-btn i');
    if (currentVolume === 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (currentVolume < 50) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
}

// Card hover effects and play button functionality
function setupCardInteractions() {
    const playButtons = document.querySelectorAll('.play-btn');
    const cardPlayButtons = document.querySelectorAll('.card .play-btn');
    
    // Main play/pause button
    const mainPlayPauseBtn = document.querySelector('.play-pause-btn');
    mainPlayPauseBtn.addEventListener('click', togglePlayPause);
    
    // Card play buttons
    cardPlayButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Simulate playing a new song
            const card = btn.closest('.card');
            const songTitle = card.querySelector('h3').textContent;
            const artistName = card.querySelector('p').textContent;
            
            // Update current song info
            document.querySelector('.song-title').textContent = songTitle;
            document.querySelector('.artist-name').textContent = artistName;
            
            // Reset progress and start playing
            currentProgress = 0;
            if (!isPlaying) {
                togglePlayPause();
            }
        });
    });
}

// Quick access items functionality
function setupQuickAccess() {
    const quickItems = document.querySelectorAll('.quick-item');
    quickItems.forEach(item => {
        item.addEventListener('click', () => {
            const songTitle = item.querySelector('span').textContent;
            document.querySelector('.song-title').textContent = songTitle;
            document.querySelector('.artist-name').textContent = 'Various Artists';
            
            currentProgress = 0;
            if (!isPlaying) {
                togglePlayPause();
            }
        });
    });
}

// Heart button functionality
function setupHeartButton() {
    const heartBtn = document.querySelector('.heart-btn');
    let isLiked = false;
    
    heartBtn.addEventListener('click', () => {
        isLiked = !isLiked;
        const icon = heartBtn.querySelector('i');
        
        if (isLiked) {
            icon.className = 'fas fa-heart';
            icon.style.color = '#1db954';
        } else {
            icon.className = 'far fa-heart';
            icon.style.color = '#b3b3b3';
        }
    });
}

// Sidebar navigation functionality
function setupSidebarNavigation() {
    const navItems = document.querySelectorAll('.nav-menu li');
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
        });
    });
    
    playlistItems.forEach(item => {
        item.addEventListener('click', () => {
            const playlistName = item.textContent;
            document.querySelector('.song-title').textContent = playlistName;
            document.querySelector('.artist-name').textContent = 'Playlist';
            
            currentProgress = 0;
            if (!isPlaying) {
                togglePlayPause();
            }
        });
    });
}

// Smooth scrolling for content area
function setupSmoothScrolling() {
    const content = document.querySelector('.content');
    let isScrolling = false;
    
    content.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                // Add any scroll-based animations here
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
}

// Navigation buttons functionality
function setupNavigationButtons() {
    const backBtn = document.querySelector('.nav-btn:first-child');
    const forwardBtn = document.querySelector('.nav-btn:last-child');
    
    backBtn.addEventListener('click', () => {
        // Simulate going back
        console.log('Going back...');
    });
    
    forwardBtn.addEventListener('click', () => {
        // Simulate going forward
        console.log('Going forward...');
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateGreeting();
    setupProgressBar();
    setupVolumeControl();
    setupCardInteractions();
    setupQuickAccess();
    setupHeartButton();
    setupSidebarNavigation();
    setupSmoothScrolling();
    setupNavigationButtons();
    
    // Update greeting every minute
    setInterval(updateGreeting, 60000);
    
    // Initialize volume bar
    updateVolumeBar();
    updateVolumeIcon();
});

// Add some keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Spacebar to play/pause
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        togglePlayPause();
    }
    
    // Arrow keys for volume
    if (e.code === 'ArrowUp') {
        e.preventDefault();
        currentVolume = Math.min(100, currentVolume + 5);
        updateVolumeBar();
        updateVolumeIcon();
    }
    
    if (e.code === 'ArrowDown') {
        e.preventDefault();
        currentVolume = Math.max(0, currentVolume - 5);
        updateVolumeBar();
        updateVolumeIcon();
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
