document.addEventListener("DOMContentLoaded", () => {
    const UI = {
        buttons: {
            generate: document.getElementById("Generate"),
            arrows: {
                prev: document.querySelector(".arrow.prev"),
                next: document.querySelector(".arrow.next")
            }
        },
        displays: {
            key: document.getElementById("key"),
            quality: document.getElementById("quality"),
            direction: document.getElementById("direction"),
            pairing: document.getElementById("pairing")
        },
        pairingRow: document.querySelector(".pairing-row")
    };

    const CONFIG = {
        keys: ["C", "F", "Bb", "Eb", "Ab", "Db", "Gb", "B", "E", "A", "D", "G"],
        directions: ["Clockwise", "Counter Clockwise"],
        qualities: {
            1: ["Major", "Minor"],
            2: ["Major-Major", "Major-Minor", "Minor-Minor", "Minor-Major"]
        },
        pairings: {
            "Major-Major": ["I-IV", "I-V", "IV-I", "V-I"],
            "Major-Minor": ["I-vi", "I-ii", "I-iii"],
            "Minor-Minor": ["i-iv", "i-v", "iv-i", "v-i"],
            "Minor-Major": ["vi-I", "ii-I", "iii-I"]
        },
        levels: {
            total: 5,
            current: 1
        }
    };

    const updateUI = () => {
        document.querySelector(".title").textContent = `Level ${CONFIG.levels.current}`;
    
        // Toggle pairing row visibility via class (instead of inline styles)
        UI.pairingRow.classList.toggle('visible', CONFIG.levels.current >= 2);
    
        // Update arrow visibility
        UI.buttons.arrows.prev.style.visibility = CONFIG.levels.current === 1 ? "hidden" : "visible";
        UI.buttons.arrows.next.style.visibility = CONFIG.levels.current === CONFIG.levels.total ? "hidden" : "visible";
    };

    const resetValues = () => {
        Object.values(UI.displays).forEach(display => {
            display.textContent = "-";
        });
    };

    const generateValues = () => {
        const { current: level } = CONFIG.levels;
        const key = CONFIG.keys[Math.floor(Math.random() * CONFIG.keys.length)];
        const direction = CONFIG.directions[Math.floor(Math.random() * 2)];
        
        if (level === 1) {
            // Level 1: Simple Major/Minor qualities
            const quality = CONFIG.qualities[1][Math.floor(Math.random() * 2)];
            resetValues();
            UI.displays.key.textContent = key;
            UI.displays.direction.textContent = direction;
            UI.displays.quality.textContent = quality;
        } else {
            // Level 2+: Advanced qualities and pairings
            const qualityKey = CONFIG.qualities[2][Math.floor(Math.random() * CONFIG.qualities[2].length)];
            const pairing = CONFIG.pairings[qualityKey][Math.floor(Math.random() * CONFIG.pairings[qualityKey].length)];
            
            resetValues();
            UI.displays.key.textContent = key;
            UI.displays.direction.textContent = direction;
            UI.displays.quality.textContent = qualityKey.replace("-", "/");
            UI.displays.pairing.textContent = pairing;
        }
    };

    UI.buttons.generate.addEventListener("click", generateValues);

    UI.buttons.arrows.next.addEventListener("click", () => {
        if (CONFIG.levels.current < CONFIG.levels.total) {
            CONFIG.levels.current++;
            updateUI();
            resetValues();
        }
    });

    UI.buttons.arrows.prev.addEventListener("click", () => {
        if (CONFIG.levels.current > 1) {
            CONFIG.levels.current--;
            updateUI();
            resetValues();
        }
    });

    updateUI();
});
