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
            2: ["Major-Major", "Major-Minor", "Minor-Minor", "Minor-Major"],
            3: [
                "Major/Sus2", "Major/Sus4", "Major/Sus2/Minor", "Major/Sus4/Minor",
                "Minor/Sus2", "Minor/Sus4"
            ]
        },
        pairings: {
            "Major-Major": ["I → IV", "I → V", "IV → I", "V → I"],
            "Major-Minor": ["I → vi", "I → ii", "I → iii"],
            "Minor-Minor": ["i → iv", "i → v", "iv → i", "v → i"],
            "Minor-Major": ["vi → I", "ii → I", "iii → I"],
            "Major/Sus2": ["I → I sus2 → V", "I → I sus2 → IV"],
            "Major/Sus4": ["I → I sus4 → V", "I → I sus4 → IV"],
            "Major/Sus2/Minor": ["I → I sus2 → i", "I → I sus2 → v", "I → I sus2 → ii", "I → ii sus2 → ii"],
            "Major/Sus4/Minor": ["I → I sus4 → i", "I → I sus4 → v", "I → I sus4 → ii", "I → ii sus4 → ii"],
            "Minor/Sus2": ["i → i sus2 → v", "i → i sus2 → iv"],
            "Minor/Sus4": ["i → i sus4 → v", "i → i sus4 → iv"]
        },
        levels: {
            total: 5,
            current: 1
        }
    };

    // Matrix effect helper function
    const matrixEffect = (element, finalText, iterations = 15, interval = 25) => {
                const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{};:'\",.<>/?";
        let currentIteration = 0;
        const timer = setInterval(() => {
            let displayText = "";
            for (let i = 0; i < finalText.length; i++) {
                if (Math.random() < currentIteration / iterations) {
                    displayText += finalText[i];
                } else {
                    displayText += characters[Math.floor(Math.random() * characters.length)];
                }
            }
            element.textContent = displayText;
            if (currentIteration >= iterations) {
                clearInterval(timer);
                element.textContent = finalText;
                            }
            currentIteration++;
        }, interval);
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
        
        let qualityKey, pairing;

        resetValues();

        if (level === 1) {
            // Level 1: Simple Major/Minor qualities
            qualityKey = CONFIG.qualities[1][Math.floor(Math.random() * CONFIG.qualities[1].length)];
            matrixEffect(UI.displays.key, key);
            matrixEffect(UI.displays.direction, direction);
            matrixEffect(UI.displays.quality, qualityKey);
        } else if (level === 2) {
            // Level 2: Advanced qualities and pairings
            qualityKey = CONFIG.qualities[2][Math.floor(Math.random() * CONFIG.qualities[2].length)];
            pairing = CONFIG.pairings[qualityKey][Math.floor(Math.random() * CONFIG.pairings[qualityKey].length)];
            
            matrixEffect(UI.displays.key, key);
            matrixEffect(UI.displays.direction, direction);
            // Replace "-" with "/" in quality for display
            matrixEffect(UI.displays.quality, qualityKey.replace("-", "/"));
            matrixEffect(UI.displays.pairing, pairing);
        } else if (level === 3) {
            // Level 3: Mixing suspended chords with Major/Minor
            qualityKey = CONFIG.qualities[3][Math.floor(Math.random() * CONFIG.qualities[3].length)];
            pairing = CONFIG.pairings[qualityKey][Math.floor(Math.random() * CONFIG.pairings[qualityKey].length)];
            
            matrixEffect(UI.displays.key, key);
            matrixEffect(UI.displays.direction, direction);
            matrixEffect(UI.displays.quality, qualityKey);
            matrixEffect(UI.displays.pairing, pairing);
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
