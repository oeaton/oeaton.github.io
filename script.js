// Grab necessary elements
const outputElement = document.getElementById("output");
const inputElement = document.getElementById("input");
const terminalElement = document.getElementById("terminal");

// Welcome, ASCII art
const welcome = [
    ".    +    _  .          .          .    +     .     .    . ",
    "  ,-,   .(_)     /    .     .      .        /   .         .",
    " /.(    .   .   /  .    .     .     .    . /    .   .      ",
    " \\ {      .    /      .   .        .  .   /    .          /",
    "  `-`  . .    * .  .     /.   .     .    *     .     .   / ",
    " .   .  .  +       .    /     .          .          .   /  ",
    "   .   .            .  /         .  .         .        *   ",
    " .    .   .      .    *     .     .    .      .   .       .",
    "  . .        .  .       .   .      .    .     .     .    . ",
    "************************************************************",
    "*                 Welcome to my portfolio                  *",
    "*        Type \"help\" for list of available commands        *",
    "************************************************************"
];

// Print welcome text
outputElement.innerText = welcome.join("\n");

// Available commands
const commands = {
    'help': `about: Learn more about me
contact: Get in touch
clear: Clear the screen
shutdown: Close this tab (or redirect if blocked)`,

    'about': `My name is Owen Eaton and I enjoy the outdoors and traveling.
I work at Caterpillar as a performance engineer in the
engineering Co-Op program. I am also currently a Senior at
Arizona State University and will be graduating in
May 2025 with my BS in Computer Science. I am always open
for new challenges and connections!`,

    'contact': `Email: oeaton@asu.edu
GitHub: github.com/oeaton
LinkedIn: www.linkedin.com/in/oeaton1/`,

    'clear': () => { outputElement.innerText = ''; },

    'shutdown': () => {
        // Try closing the tab, else redirect to Google
        window.open('', '_self');
        const closed = window.close();
        if (!closed) {
            window.location.href = "https://www.google.com";
        }
    }
};

// Typing speed in ms per character
const typingSpeed = 0.01;

// Command history
const commandHistory = [];
let historyIndex = -1; // Current position in history
let lastCommand = null; // Track last command run

// Type text character-by-character
function typeWriter(text, callback) {
    let index = 0;
    const interval = setInterval(() => {
        if (index < text.length) {
            outputElement.innerText += text.charAt(index);
            index++;
            terminalElement.scrollTop = terminalElement.scrollHeight;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, typingSpeed);
}

// Post-process output for clickable links (for 'contact' command)
function postProcessOutput(command) {
    if (command === 'contact') {
        let text = outputElement.innerText;
        text = text.replace(
            "GitHub: github.com/oeaton",
            "GitHub: <a href='https://github.com/oeaton' target='_blank'>github.com/oeaton</a>"
        );
        text = text.replace(
            "LinkedIn: www.linkedin.com/in/oeaton1/",
            "LinkedIn: <a href='https://www.linkedin.com/in/oeaton1/' target='_blank'>www.linkedin.com/in/oeaton1/</a>"
        );
        // Convert newlines to <br> and set as HTML
        outputElement.innerHTML = text.replace(/\n/g, '<br>');
    }
}

// Keep input clean if empty
inputElement.addEventListener("input", () => {
    if (!inputElement.innerText.trim()) {
        inputElement.innerText = "";
    }
});

// Handle key presses
inputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        // Execute command on Enter
        event.preventDefault();
        const input = inputElement.innerText.trim();
        inputElement.innerText = "";
        const command = input.toLowerCase();
        lastCommand = command;

        // Save command in history if not empty
        if (input) {
            commandHistory.push(input);
            historyIndex = commandHistory.length;
        }

        // Run the command
        if (commands[command]) {
            if (typeof commands[command] === "function") {
                const result = commands[command]();
                if (result !== undefined) {
                    const prefix = (outputElement.innerText.length === 0) ? `$ ${input}\n${result}` : `\n$ ${input}\n${result}`;
                    typeWriter(prefix, () => {
                        postProcessOutput(command);
                    });
                } else {
                    postProcessOutput(command);
                }
            } else {
                const prefix = (outputElement.innerText.length === 0) ? `$ ${input}\n${commands[command]}` : `\n$ ${input}\n${commands[command]}`;
                typeWriter(prefix, () => {
                    postProcessOutput(command);
                });
            }
        } else if (input) {
            // Command not found
            const prefix = (outputElement.innerText.length === 0) ? `$ ${input}\nCommand not found. Type 'help' for a list of commands.` : `\n$ ${input}\nCommand not found. Type 'help' for a list of commands.`;
            typeWriter(prefix);
        }
    } else if (event.key === "ArrowUp") {
        // Scroll back through history
        event.preventDefault();
        if (commandHistory.length > 0) {
            if (historyIndex > 0) {
                historyIndex--;
            }
            inputElement.innerText = commandHistory[historyIndex] || '';
            placeCaretAtEnd(inputElement);
        }
    } else if (event.key === "ArrowDown") {
        // Scroll forward through history
        event.preventDefault();
        if (commandHistory.length > 0) {
            if (historyIndex < commandHistory.length) {
                historyIndex++;
            }
            if (historyIndex === commandHistory.length) {
                inputElement.innerText = '';
            } else {
                inputElement.innerText = commandHistory[historyIndex];
            }
            placeCaretAtEnd(inputElement);
        }
    }
});

// Helper to put caret at end of input
function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
        && typeof document.createRange != "undefined") {
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

// Keep focus on input
inputElement.addEventListener("blur", () => {
    inputElement.focus();
});

document.addEventListener("click", () => {
    inputElement.focus();
});

// Auto-scroll on changes
const observer = new MutationObserver(() => {
    terminalElement.scrollTop = terminalElement.scrollHeight;
});

observer.observe(outputElement, { childList: true });