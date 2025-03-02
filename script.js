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
        }
    };

    const CONFIG = {
        keys: ["C", "F", "Bb", "Eb", "Ab", "Db", "Gb", "B", "E", "A", "D", "G"],
        directions: ["Clockwise", "Counter Clockwise"],
        qualities: {
            1: ["Major", "Minor"],
            2: Object.keys({
                "Major-Major": ["I-IV", "I-V", "IV-I", "V-I"],
                "Major-Minor": ["I-vi", "I-ii", "I-iii"],
                "Minor-Minor": ["i-iv", "i-v", "iv-i", "v-i"],
                "Minor-Major": ["vi-I", "ii-I", "iii-I"]
            })
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
        
        UI.displays.pairing.parentElement.style.display = 
            CONFIG.levels.current === 2 ? "flex" : "none";
        
        UI.buttons.arrows.prev.style.visibility = 
            CONFIG.levels.current === 1 ? "hidden" : "visible";
        
        UI.buttons.arrows.next.style.visibility = 
            CONFIG.levels.current === CONFIG.levels.total ? "hidden" : "visible";
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
            const quality = CONFIG.qualities[1][Math.floor(Math.random() * 2)];
            resetValues();
            UI.displays.key.textContent = key;
            UI.displays.direction.textContent = direction;
            UI.displays.quality.textContent = quality;
        } else if (level === 2) {
            const qualityKey = CONFIG.qualities[2][Math.floor(Math.random() * CONFIG.qualities[2].length)];
            const pairing = CONFIG.pairings[qualityKey][Math.floor(Math.random() * CONFIG.pairings[qualityKey].length)];
            
            resetValues();
            UI.displays.key.textContent = key;
            UI.displays.direction.textContent = direction;
            UI.displays.quality.textContent = qualityKey.split("-").join("/");
            UI.displays.pairing.textContent = pairing;
        } else {
            resetValues();
            UI.displays.key.textContent = key;
            UI.displays.direction.textContent = direction;
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