// Gift data array with tiers
const gifts = [
    {
        title: "Crown of Leadership",
        image: "images/crown-leadership.jpg",
        message: "A royal emblem bearing the mark of 2A1. Grants +5 to Charisma and +3 to Leadership. The crown symbolizes authority over 30 souls (18♂ + 12♀).",
        tier: "legendary",
        effect: "Royal Authority: All nearby allies gain +2 to all stats for 3 turns."
    },
    {
        title: "Bubble of Joy",
        image: "images/bubble-joy.jpg",
        message: "A magical bubble wand that creates iridescent spheres of pure happiness. Each bubble carries the essence of childlike wonder and domestic bliss.",
        tier: "epic",
        effect: "Joy Burst: Creates 5 bubbles that heal 20 HP each and remove 1 negative status effect."
    },
    {
        title: "Karaoke Star",
        image: "images/karaoke-star.jpg",
        message: "The essence of musical celebration captured in a card. Grants the power of vocal magic and the ability to turn any moment into a party.",
        tier: "rare",
        effect: "Musical Charm: Next spell cast has 50% chance to be free and gains +2 to effectiveness."
    },
    {
        title: "Night Rider",
        image: "images/night-rider.jpg",
        message: "A mysterious card that embodies the spirit of nocturnal adventures. The trio's energy creates an unbreakable bond of friendship.",
        tier: "epic",
        effect: "Night Vision: See through darkness and gain +3 to Stealth for 5 turns."
    },
    {
        title: "Cat Whisperer",
        image: "images/cat-whisperer.jpg",
        message: "A magical connection to feline spirits. The bucket becomes a portal to the realm of cats, granting understanding of all feline creatures.",
        tier: "rare",
        effect: "Feline Bond: Summon a cat familiar for 3 turns that can scout and distract enemies."
    },
    {
        title: "Elevator Guardian",
        image: "images/elevator-guardian.jpg",
        message: "A protective spirit that watches over travelers. The metallic walls reflect not just light, but the hopes and dreams of those who pass through.",
        tier: "magic",
        effect: "Safe Passage: Next movement action costs no energy and grants +1 to Defense."
    },
    {
        title: "Fashion Phantom",
        image: "images/fashion-phantom.jpg",
        message: "A mysterious figure wrapped in shadows and style. The hooded cloak conceals not just identity, but the power to transform appearance at will.",
        tier: "epic",
        effect: "Style Shift: Transform into any character for 2 turns, gaining their abilities."
    },
    {
        title: "Heart of Gold",
        image: "images/heart-gold.jpg",
        message: "A pure heart symbol that radiates warmth and compassion. The blue heart represents loyalty and the strength of genuine friendship.",
        tier: "rare",
        effect: "Heart's Blessing: Heal all allies for 15 HP and grant +1 to all stats for 2 turns."
    },
    {
        title: "Birthday Wish",
        image: "images/birthday-wish.jpg",
        message: "The power of birthday magic captured in a single flame. When Chris blows out the candle, all wishes become possible for one glorious moment.",
        tier: "legendary",
        effect: "Birthday Miracle: Grant one wish - instantly complete any action or restore full HP/MP."
    },
    {
        title: "Catnap Duo",
        image: "images/catnap-duo.jpg",
        message: "Two feline spirits in perfect harmony. Their peaceful slumber radiates tranquility, calming all who witness their serene bond.",
        tier: "magic",
        effect: "Peaceful Rest: Restore 10 HP and remove 1 negative status effect from all allies."
    }
];

// Tier configurations - Genshin Impact Style
const tiers = {
    magic: {
        name: "Magic",
        color: "#87CEEB",
        bgColor: "#E6F3FF",
        borderColor: "#4682B4",
        animation: "normal-reveal",
        sparkleColor: "#87CEEB",
        rarity: 35,
        shakeIntensity: 2,
        bgFlashColor: "#87CEEB",
        particleColor: "#87CEEB"
    },
    rare: {
        name: "Rare",
        color: "#9370DB",
        bgColor: "#F0E6FF",
        borderColor: "#6A5ACD",
        animation: "rare-reveal",
        sparkleColor: "#9370DB",
        rarity: 25,
        shakeIntensity: 3,
        bgFlashColor: "#9370DB",
        particleColor: "#9370DB"
    },
    epic: {
        name: "Epic",
        color: "#FF69B4",
        bgColor: "#FFE6F3",
        borderColor: "#FF1493",
        animation: "epic-reveal",
        sparkleColor: "#FF69B4",
        rarity: 20,
        shakeIntensity: 4,
        bgFlashColor: "#FF69B4",
        particleColor: "#FF69B4"
    },
    legendary: {
        name: "Legendary",
        color: "#FFD700",
        bgColor: "#FFF8DC",
        borderColor: "#FFA500",
        animation: "legendary-reveal",
        sparkleColor: "#FFD700",
        rarity: 10,
        shakeIntensity: 5,
        bgFlashColor: "#FFD700",
        particleColor: "#FFD700"
    }
};

// DOM elements
const pullButton = document.getElementById('pullButton');
const giftCard = document.getElementById('giftCard');
const giftTitle = document.getElementById('giftTitle');
const giftImage = document.getElementById('giftImage');
const giftMessage = document.getElementById('giftMessage');
const giftClose = document.getElementById('giftClose');
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const confettiContainer = document.getElementById('confettiContainer');
const capsule = document.getElementById('capsule');

// State variables
let isMusicPlaying = false;
let currentGift = null;
let foundCards = new Set(); // Track found cards

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load found cards from session storage
    const savedCards = sessionStorage.getItem('foundCards');
    if (savedCards) {
        foundCards = new Set(JSON.parse(savedCards));
        updateCardsFoundCounter();
    }
    
    // Initialize audio
    initializeAudio();
    
    // Add event listeners
    pullButton.addEventListener('click', pullGift);
    giftClose.addEventListener('click', hideGift);
    musicToggle.addEventListener('click', toggleMusic);
    
    // Add hover effect to pixel art treasure chest
    const pixelChest = document.querySelector('.pixel-chest-sprite');
    pixelChest.addEventListener('mouseenter', () => {
        pixelChest.style.transform = 'scale(1.05)';
    });
    pixelChest.addEventListener('mouseleave', () => {
        pixelChest.style.transform = 'scale(1)';
    });
    
    // Add click effect to treasure chest
    pixelChest.addEventListener('click', () => {
        if (!pullButton.disabled) {
            pullGift();
        }
    });
    
    // Add click sound effect
    pullButton.addEventListener('click', playClickSound);
});

// Create custom retro Pokémon-style background music
function createRetroPokemonMusic() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const masterGain = audioContext.createGain();
    masterGain.connect(audioContext.destination);
    masterGain.gain.value = 0.25;
    
    // Create a simple retro gaming loop
    const createNote = (frequency, duration, startTime, type = 'square') => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(masterGain);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type; // Retro 8-bit sound
        
        gainNode.gain.setValueAtTime(0.08, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    };
    
    // Pokémon-style melody (more authentic)
    const notes = [
        // Main melody - Pokémon-style progression
        { freq: 523.25, duration: 0.4, type: 'square' }, // C
        { freq: 659.25, duration: 0.4, type: 'square' }, // E
        { freq: 783.99, duration: 0.4, type: 'square' }, // G
        { freq: 1046.50, duration: 0.8, type: 'square' }, // C (high)
        { freq: 783.99, duration: 0.4, type: 'square' }, // G
        { freq: 659.25, duration: 0.4, type: 'square' }, // E
        { freq: 523.25, duration: 0.8, type: 'square' }, // C
        { freq: 493.88, duration: 0.4, type: 'square' }, // B
        { freq: 440.00, duration: 0.4, type: 'square' }, // A
        { freq: 392.00, duration: 0.8, type: 'square' }, // G
        // Bridge
        { freq: 349.23, duration: 0.4, type: 'triangle' }, // F
        { freq: 392.00, duration: 0.4, type: 'triangle' }, // G
        { freq: 440.00, duration: 0.4, type: 'triangle' }, // A
        { freq: 493.88, duration: 0.8, type: 'triangle' }, // B
    ];
    
    let currentTime = audioContext.currentTime;
    const loopDuration = 6.4; // Total loop time
    
    const playLoop = () => {
        notes.forEach((note, index) => {
            createNote(note.freq, note.duration, currentTime + (index * 0.4), note.type);
        });
        
        currentTime += loopDuration;
        
        // Schedule next loop
        setTimeout(playLoop, loopDuration * 1000);
    };
    
    playLoop();
    
    return {
        stop: () => {
            masterGain.gain.value = 0;
        }
    };
}

// Initialize audio system
function initializeAudio() {
    // Disable external audio completely - only use custom music
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    backgroundMusic.volume = 0; // Mute external audio
    
    // Set audio properties for custom music only
    console.log('Audio system initialized - using custom retro Pokémon music only');
    
    // Don't load external audio sources
    // backgroundMusic.load(); // Commented out to prevent external audio loading
}

// Update cards found counter
function updateCardsFoundCounter() {
    const counterElement = document.querySelector('.stat-number');
    if (counterElement) {
        counterElement.textContent = foundCards.size;
    }
}

// Save found cards to session storage
function saveFoundCards() {
    sessionStorage.setItem('foundCards', JSON.stringify([...foundCards]));
}

// Pull a random gift with tier weighting
function pullGift() {
    // Disable button temporarily
    pullButton.disabled = true;
    pullButton.style.opacity = '0.7';
    
    // Animate the treasure chest with sparkle effect
    const pixelChest = document.querySelector('.pixel-chest-sprite');
    pixelChest.style.animation = 'none';
    pixelChest.offsetHeight; // Trigger reflow
    pixelChest.style.animation = 'treasure-shake 0.5s ease-in-out';
    
    // Add sparkle effect to treasure chest
    addTreasureSparkles();
    
    // Random delay for suspense
    setTimeout(() => {
        // Get random gift with tier weighting
        const randomIndex = getWeightedRandomGift();
        currentGift = gifts[randomIndex];
        
        // Track found card
        foundCards.add(currentGift.title);
        updateCardsFoundCounter();
        saveFoundCards();
        
        // Update gift display
        giftTitle.textContent = currentGift.title;
        giftImage.src = currentGift.image;
        giftImage.alt = currentGift.title;
        giftMessage.textContent = currentGift.message;
        
        // Apply tier styling
        applyTierStyling(currentGift.tier);
        
        // Show gift with tier-specific animation
        showGift(currentGift.tier);
        
        // Create tier-specific effects
        createTierEffects(currentGift.tier);
        
        // Play tier-specific sound
        playTierSound(currentGift.tier);
        
        // Re-enable button after animation completes
        setTimeout(() => {
            pullButton.disabled = false;
            pullButton.style.opacity = '1';
        }, 2000);
        
    }, 800);
}

// Get weighted random gift based on tier rarity
function getWeightedRandomGift() {
    const weights = gifts.map(gift => tiers[gift.tier].rarity);
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < gifts.length; i++) {
        random -= weights[i];
        if (random <= 0) {
            return i;
        }
    }
    return 0;
}

// Apply tier-specific styling to gift card
function applyTierStyling(tier) {
    const tierConfig = tiers[tier];
    const giftCard = document.getElementById('giftCard');
    
    giftCard.style.background = tierConfig.bgColor;
    giftCard.style.borderColor = tierConfig.borderColor;
    giftCard.style.boxShadow = `0 15px 35px ${tierConfig.color}40`;
    
    // Update title color
    const giftTitle = document.getElementById('giftTitle');
    giftTitle.style.color = tierConfig.color;
    
    // Add tier badge below the image
    let tierBadge = document.querySelector('.tier-badge');
    if (!tierBadge) {
        tierBadge = document.createElement('div');
        tierBadge.className = 'tier-badge';
        // Insert after the image container
        const imageContainer = giftCard.querySelector('.gift-image-container');
        imageContainer.parentNode.insertBefore(tierBadge, imageContainer.nextSibling);
    }
    tierBadge.textContent = tierConfig.name;
    tierBadge.style.backgroundColor = tierConfig.color;
    tierBadge.style.color = 'white';
    
    // Add effect display as a separate element
    let effectDisplay = document.querySelector('.effect-display');
    if (!effectDisplay) {
        effectDisplay = document.createElement('div');
        effectDisplay.className = 'effect-display';
        giftCard.appendChild(effectDisplay);
    }
    effectDisplay.innerHTML = `<strong>Effect:</strong> ${currentGift.effect}`;
    effectDisplay.style.color = tierConfig.color;
    effectDisplay.style.fontWeight = '600';
    effectDisplay.style.marginTop = '20px';
    effectDisplay.style.marginBottom = '10px';
    effectDisplay.style.padding = '12px';
    effectDisplay.style.backgroundColor = `${tierConfig.color}20`;
    effectDisplay.style.borderRadius = '8px';
    effectDisplay.style.border = `1px solid ${tierConfig.color}40`;
    effectDisplay.style.fontSize = '0.95rem';
    effectDisplay.style.lineHeight = '1.4';
    effectDisplay.style.fontFamily = 'VT323, monospace';
    effectDisplay.style.textAlign = 'center';
}

// Show gift card with tier-specific animation
function showGift(tier) {
    const giftCard = document.getElementById('giftCard');
    const tierConfig = tiers[tier];
    
    // Use relative positioning to avoid scrolling issues
    giftCard.style.position = 'relative';
    giftCard.style.top = 'auto';
    giftCard.style.left = 'auto';
    giftCard.style.transform = 'none';
    giftCard.style.zIndex = '1001';
    giftCard.style.maxWidth = '450px';
    giftCard.style.maxHeight = 'none'; // Remove height restriction
    giftCard.style.overflowY = 'visible'; // No scrolling needed
    
    giftCard.classList.remove('hidden');
    giftCard.classList.add(tierConfig.animation);
    
    // Scroll to the gift card with smooth animation
    setTimeout(() => {
        giftCard.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start', // Changed from 'center' to 'start' to show more content below
            inline: 'center'
        });
        
        // Additional scroll to ensure pull button is visible
        setTimeout(() => {
            window.scrollBy({
                top: 100, // Scroll down an additional 100px
                behavior: 'smooth'
            });
        }, 500); // Wait for initial scroll to complete
    }, 300); // Small delay to let the card appear first
    
    // Remove animation class after completion and ensure button is re-enabled
    setTimeout(() => {
        giftCard.classList.remove(tierConfig.animation);
        // Make sure button is clickable again
        pullButton.disabled = false;
        pullButton.style.opacity = '1';
    }, 1500);
}

// Hide gift card
function hideGift() {
    const giftCard = document.getElementById('giftCard');
    giftCard.classList.add('hidden');
    giftCard.style.position = 'relative';
    giftCard.style.top = 'auto';
    giftCard.style.left = 'auto';
    giftCard.style.transform = 'none';
    giftCard.style.zIndex = 'auto';
    giftCard.style.maxWidth = 'none';
    giftCard.style.maxHeight = 'none';
    giftCard.style.overflowY = 'visible';
    
    // Ensure pull button is always clickable when gift is closed
    pullButton.disabled = false;
    pullButton.style.opacity = '1';
}

// Toggle background music
function toggleMusic() {
    if (isMusicPlaying) {
        // Stop all music sources
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        if (window.customMusic) {
            window.customMusic.stop();
        }
        musicToggle.classList.remove('active');
        musicToggle.querySelector('.music-text').textContent = 'Music Off';
        isMusicPlaying = false;
    } else {
        // Only use custom retro Pokémon music - no external sources
        if (!window.customMusic) {
            window.customMusic = createRetroPokemonMusic();
        }
        musicToggle.classList.add('active');
        musicToggle.querySelector('.music-text').textContent = 'Music On (Retro Pokémon)';
        isMusicPlaying = true;
        console.log('Custom retro Pokémon music started');
        
        // Ensure external audio is completely stopped
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }
}

// Create tier-specific effects - Genshin Style
function createTierEffects(tier) {
    const tierConfig = tiers[tier];
    
    // Create confetti
    createTierConfetti(tier);
    
    // Add gentle screen shake
    addScreenShake(tierConfig.shakeIntensity);
    
    // Add background flash
    addBackgroundFlash(tierConfig.bgFlashColor);
    
    // Add special effects based on tier
    if (tier === 'legendary') {
        addLegendaryEffects();
    } else if (tier === 'epic') {
        addEpicEffects();
    } else if (tier === 'rare') {
        addRareEffects();
    } else {
        addNormalEffects();
    }
}

// Add gentle screen shake effect
function addScreenShake(intensity) {
    const container = document.querySelector('.container');
    const originalTransform = container.style.transform;
    
    let shakeCount = 0;
    const maxShakes = 10;
    
    const shake = () => {
        if (shakeCount >= maxShakes) {
            container.style.transform = originalTransform;
            return;
        }
        
        const x = (Math.random() - 0.5) * intensity;
        const y = (Math.random() - 0.5) * intensity;
        container.style.transform = `translate(${x}px, ${y}px)`;
        
        shakeCount++;
        setTimeout(shake, 100);
    };
    
    shake();
}

// Add background flash effect
function addBackgroundFlash(color) {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = color;
    flash.style.opacity = '0.1';
    flash.style.zIndex = '998';
    flash.style.pointerEvents = 'none';
    flash.style.transition = 'opacity 0.8s ease';
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(flash);
        }, 800);
    }, 200);
}

// Add legendary effects - 5-Star Wish Style
function addLegendaryEffects() {
    // Create golden elemental particles
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.backgroundColor = '#FFD700';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '997';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            particle.style.animation = 'legendary-particle 4s ease-out forwards';
            particle.style.boxShadow = '0 0 10px #FFD700';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    document.body.removeChild(particle);
                }
            }, 4000);
        }, i * 150);
    }
    
    // Add CSS for legendary particles
    if (!document.querySelector('#legendary-styles')) {
        const style = document.createElement('style');
        style.id = 'legendary-styles';
        style.textContent = `
            @keyframes legendary-particle {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: scale(2) rotate(180deg);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(0) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add epic effects - Elemental Burst Style
function addEpicEffects() {
    // Create elemental particles
    const colors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FFC0CB'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.backgroundColor = colors[i % colors.length];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '997';
            particle.style.left = (Math.random() * window.innerWidth) + 'px';
            particle.style.top = (Math.random() * window.innerHeight) + 'px';
            particle.style.animation = 'epic-particle 3s ease-out forwards';
            particle.style.boxShadow = '0 0 8px ' + colors[i % colors.length];
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    document.body.removeChild(particle);
                }
            }, 3000);
        }, i * 200);
    }
    
    // Add CSS for epic particles
    if (!document.querySelector('#epic-styles')) {
        const style = document.createElement('style');
        style.id = 'epic-styles';
        style.textContent = `
            @keyframes epic-particle {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.5) rotate(180deg);
                    opacity: 0.7;
                }
                100% {
                    transform: scale(0) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add rare effects - 4-Star Style
function addRareEffects() {
    // Create purple sparkles
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.backgroundColor = '#9370DB';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '997';
            sparkle.style.left = (Math.random() * window.innerWidth) + 'px';
            sparkle.style.top = (Math.random() * window.innerHeight) + 'px';
            sparkle.style.animation = 'rare-sparkle 2.5s ease-out forwards';
            sparkle.style.boxShadow = '0 0 6px #9370DB';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    document.body.removeChild(sparkle);
                }
            }, 2500);
        }, i * 250);
    }
    
    // Add CSS for rare sparkles
    if (!document.querySelector('#rare-styles')) {
        const style = document.createElement('style');
        style.id = 'rare-styles';
        style.textContent = `
            @keyframes rare-sparkle {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.2) rotate(180deg);
                    opacity: 0.6;
                }
                100% {
                    transform: scale(0) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add normal effects - 3-Star Style
function addNormalEffects() {
    // Create simple blue sparkles
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.width = '3px';
            sparkle.style.height = '3px';
            sparkle.style.backgroundColor = '#87CEEB';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '997';
            sparkle.style.left = (Math.random() * window.innerWidth) + 'px';
            sparkle.style.top = (Math.random() * window.innerHeight) + 'px';
            sparkle.style.animation = 'normal-sparkle 2s ease-out forwards';
            sparkle.style.boxShadow = '0 0 4px #87CEEB';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    document.body.removeChild(sparkle);
                }
            }, 2000);
        }, i * 300);
    }
    
    // Add CSS for normal sparkles
    if (!document.querySelector('#normal-styles')) {
        const style = document.createElement('style');
        style.id = 'normal-styles';
        style.textContent = `
            @keyframes normal-sparkle {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                50% {
                    transform: scale(1);
                    opacity: 0.5;
                }
                100% {
                    transform: scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Create tier-specific confetti animation - Genshin Style
function createTierConfetti(tier) {
    const tierConfig = tiers[tier];
    const colors = [tierConfig.color, tierConfig.sparkleColor, '#FFFFFF'];
    const particleCount = tier === 'legendary' ? 60 : tier === 'epic' ? 45 : tier === 'rare' ? 30 : 20;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.3 + 's';
            
            // Add tier-specific confetti shapes
            if (tier === 'legendary') {
                confetti.style.borderRadius = '50%';
                confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
                confetti.style.boxShadow = '0 0 8px ' + tierConfig.color;
            } else if (tier === 'epic') {
                confetti.style.borderRadius = '0';
                confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
                confetti.style.boxShadow = '0 0 4px ' + tierConfig.color;
            } else if (tier === 'rare') {
                confetti.style.borderRadius = '2px';
                confetti.style.boxShadow = '0 0 3px ' + tierConfig.color;
            } else {
                confetti.style.borderRadius = '2px';
            }
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 80);
    }
}

// Play click sound effect - Retro Gaming Style
function playClickSound() {
    // Create a retro gaming "power-up" sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Add sparkle effects to treasure chest
function addTreasureSparkles() {
    const sparkleColors = ['#FFD700', '#FFA500', '#FF69B4', '#87CEEB'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'absolute';
            sparkle.style.width = '6px';
            sparkle.style.height = '6px';
            sparkle.style.backgroundColor = sparkleColors[i % sparkleColors.length];
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            sparkle.style.left = (Math.random() * 300 + 25) + 'px';
            sparkle.style.top = (Math.random() * 200 + 50) + 'px';
            sparkle.style.animation = 'treasure-sparkle 1s ease-out forwards';
            sparkle.style.boxShadow = '0 0 8px ' + sparkleColors[i % sparkleColors.length];
            
            document.querySelector('.gacha-machine').appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        }, i * 100);
    }
}

// Add some interactive effects
document.addEventListener('mousemove', (e) => {
    const sparkles = document.querySelectorAll('.sparkle');
    sparkles.forEach((sparkle, index) => {
        const speed = (index + 1) * 0.02;
        const x = (e.clientX * speed) % window.innerWidth;
        const y = (e.clientY * speed) % window.innerHeight;
        sparkle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (!pullButton.disabled) {
            pullGift();
        }
    } else if (e.code === 'Escape') {
        hideGift();
    } else if (e.code === 'KeyM') {
        toggleMusic();
    }
});

// Add touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && !pullButton.disabled) {
            // Swipe up to pull
            pullGift();
        } else if (diff < 0) {
            // Swipe down to close gift
            hideGift();
        }
    }
}

// Add loading animation for images
giftImage.addEventListener('load', function() {
    this.style.opacity = '1';
});

giftImage.addEventListener('error', function() {
    // Fallback for missing images
    this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZGN0Y3Ii8+CjxwYXRoIGQ9Ik0xMDAgNjBDODkuNTQ0IDYwIDgxIDY4LjU0NCA4MSA3OEM4MSA4Ny40NTYgODkuNTQ0IDk2IDEwMCA5NkMxMTAuNDU2IDk2IDExOSA4Ny40NTYgMTE5IDc4QzExOSA2OC41NDQgMTEwLjQ1NiA2MCAxMDAgNjBaIiBmaWxsPSIjRkY2QjlEIi8+CjxwYXRoIGQ9Ik0xMDAgMTEwQzg5LjU0NCAxMTAgODEgMTE4LjU0NCA4MSAxMjhDODEgMTM3LjQ1NiA4OS41NDQgMTQ2IDEwMCAxNDZDMTAwLjQ1NiAxNDYgMTE5IDEzNy40NTYgMTE5IDEyOEMxMTkgMTE4LjU0NCAxMTAuNDU2IDExMCAxMDAgMTEwWiIgZmlsbD0iI0ZGOUFDRSIvPgo8L3N2Zz4K';
    this.alt = 'Gift Image';
});

// Initialize image opacity
giftImage.style.opacity = '0';
giftImage.style.transition = 'opacity 0.3s ease';

// Add some fun easter eggs
let clickCount = 0;
const title = document.querySelector('.title');

title.addEventListener('click', () => {
    clickCount++;
    if (clickCount >= 5) {
        title.textContent = '🎁 Gacha Gift (Secret Mode!) 🎁';
        title.style.animation = 'bounce 0.5s ease-in-out';
        setTimeout(() => {
            title.textContent = '🎁 Gacha Gift 🎁';
            title.style.animation = 'bounce 2s infinite';
        }, 2000);
        clickCount = 0;
    }
});

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 