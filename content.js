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

const snoopy = [
    "           __-----_.                        ______",
    "          /  \\      \\           o  O  O   _(      )__",
    "         /    |  |   \\_---_   o._.      _(           )_",
    "        |     |            \\   | |\"\"\"\"(_   Let's see... )",
    "        |     |             |@ | |    (_               _)",
    "         \\___/   ___       /   | |      (__          _)",
    "           \\____(____\\___/     | |         (________)",
    "           |__|                | |          |",
    "           /   \\-_             | |         |'",
    "         /      \\_ \"__ _       !_!--v---v--\"",
    "        /         \"|  |>)      |\"\"\"\"\"\"\"\"|",
    "       |          _|  | ._--\"\"||        |",
    "       _\\_____________|_|_____||________|_",
    "      /                                   \\",
    "     /_____________________________________\\",
    "     /                                     \\",
    "    /_______________________________________\\",
    "    /                                       \\",
    "   /_________________________________________\\",
    "        {                               }",
    "        <_______________________________|",
    "        |                               >",
    "        {_______________________________|         ________",
    "        <                               }        / SNOOPY \\",
    "        |_______________________________|       /__________\\",
    "\\|/       \\\\/             \\||//           |//            ",
    " "
];

function printMessages(messages) {
    return new Promise((resolve) => {
        const terminal = document.getElementById("terminal");
        let messageIndex = 0;
        let charIndex = 0;
        let newP = document.createElement("p");
        terminal.appendChild(newP);
        const intervalId = setInterval(function () {
            if (messageIndex >= messages.length) {
                clearInterval(intervalId);
                resolve();
                return;
            }
            const char = messages[messageIndex][charIndex];
            if (char === ' ') {
                newP.innerHTML += '&nbsp;';
            } else {
                newP.innerHTML += char;
            }
            charIndex++;
            if (charIndex >= messages[messageIndex].length) {
                charIndex = 0;
                messageIndex++;
                newP = document.createElement("p");
                terminal.appendChild(newP);
            }
        }, 1);
    });
}

function printCommandLine() {
    return new Promise((resolve) => {
        const terminal = document.getElementById("terminal");
        let newP = document.createElement("p");
        let input = document.createElement("input");
        terminal.appendChild(newP);
        newP.innerHTML = "guest@oweneaton.com:~$ ";
        newP.appendChild(input);
        document.addEventListener("click", function (event){
           input.focus();
        });
        input.addEventListener('keyup', function(event) {
            if (event.keyCode === 13) {
                checkCommand(input.value);
                input.disabled = true;
            }
        });
        setTimeout(() => {
            input.focus();
        }, 200);
    });
}

function printLink(message, message2, link) {
    let newP = document.createElement("p");
    newP.innerHTML = "&nbsp;" + message + " <a href='"+ link +"' target='_blank'>" + message2 + "</a>";
    terminal.appendChild(newP);
}

function checkCommand(input) {
    let inputV2 = input.toLowerCase();
    switch (inputV2) {
        case "help":
            printMessages([
                " ",
                " List of available commands:",
                " ",
                " about - displays information about me",
                " bored - let me think of something for you to do",
                " contact - displays contact information",
                " findMe - let me see if I can find you...",
                " projects - displays a list of my projects",
                " snoopy - displays some really cool art :)",
                " today - facts about today",
                " "
            ]).then(printCommandLine);
            break;
        case "about":
            printMessages([
                " ",
                " I am a computer science student at Arizona State",
                " University's Ira A. Fulton Schools of Engineering, with an",
                " expected graduation date of May 2025. I have a cumulative",
                " GPA of 3.78 and a high school diploma from Walden Grove",
                " High School with a cumulative GPA of 3.85. I have leadership",
                " experience as a Community Assistant for University Housing,",
                " where I actively support and empower a community of 58",
                " residents by connecting them with resources to promote",
                " academic success and wellness. I also have experience",
                " working as a electronics associate at Walmart and have",
                " developed various programming projects including a word game",
                " helper and a personal website showcasing my programming",
                " projects. I have experience in programming languages such as",
                " C/C++, Java, JavaScript, Python, Scheme, Prolog, HTML, CSS,",
                " and tools such as Microsoft, AWS, Git, GitHub, Linux/Unix.",
                " I have received the Provost's award.",
                " "
            ]).then(printCommandLine);
            break;
        case "bored":
            printMessages([
                " ",
                " Bored I see, let me think of something for you to do...",
                " (Thinking really hard)",
                " "
            ]);
            setTimeout(() =>{
                fetch('https://www.boredapi.com/api/activity/')
                    .then(response => response.json())
                    .then(data => {
                        printMessages([" You should " + data.activity.toLowerCase()])
                            .then(() => {
                                printMessages([" "]);
                                printCommandLine();
                            })
                    });
            }, 5000);
            break;
        case "contact":
            printMessages([
                " ",
                " Awww, sorry I can not tell you everything."
            ]).then(() => {
                printLink("But you can message me on ", "Linkedin", "https://www.linkedin.com/in/oeaton1/");
            }).then(() => {
                printMessages([" "]);
            }).then(() => {
                printCommandLine();
            });
            break;
        case "findme":
            printMessages([" This is your last chance :)", " Loading...", " "])
                .then(() => {
                    setTimeout(() => {
                        let userIp;
                        fetch('https://api.ipify.org?format=json')
                            .then(response => response.json())
                            .then(data => {
                                userIp = data.ip;
                            })
                            .then(() => {
                                fetch(`https://ipinfo.io/${userIp}/json?token=821377ee3c7e0e`)
                                    .then(response => response.json())
                                    .then(info => {
                                        printMessages([" Country: " + info.country]);
                                        printMessages([" Region: " + info.region]);
                                        printMessages([" City: " + info.city]);
                                        printMessages([" Zip Code: " + info.postal]);
                                        printMessages([" Time Zone: " + info.timezone]);
                                        printMessages([" Org: " + info.org]);
                                    })
                                    .then(() => {
                                        printMessages([" ", "                       \\,`/ / ", "                       _)..  `_", " We'll Stop there...  ( __  -\\", "  Maybe use a VPN         '`.", "                         ( \\>_-_,", "                         _||_ ~-/", " "])
                                            .then(() => {
                                                printCommandLine();
                                            })
                                    });
                            });
                    }, 5000); 
                });
            break;
        case "projects":
            printMessages([" "]);
            printLink("Wordle Helper","To Project", "https://replit.com/@oeaton/Wordle-Helper?v=1");
            printLink("This Website", "To Project", "https://replit.com/@oeaton/Website?v=1");
            printMessages([" "]);
            printCommandLine();
            break;
        case "snoopy":
            printMessages([" "]);
            printMessages(snoopy).then(() => {
                printCommandLine();
            });
            break;
        case "today":
            const date = new Date();
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month as it returns 0-based index and pad it with 0 if it is a single-digit month
            const day = date.getDate().toString().padStart(2, '0'); // Pad day with 0 if it is a single-digit day
            const formattedDate = `${month}/${day}`;
            fetch(`http://numbersapi.com/${formattedDate}/date`)
                .then(response => response.text())
                .then(data => {
                    printMessages([" "]);
                    if (data.length > 52) {
                        let words = data.split(" ");
                        let line = ` Today:`;
                        let i = 0;
                        while (i < words.length) {
                            if (line.length + words[i].length + 1 <= 59) {
                                line += " " + words[i];
                                i++;
                            } else {
                                printMessages([line]);
                                line = " " + words[i];
                                i++;
                            }
                        }
                        if (line.trim().length > 0) {
                            printMessages([line]);
                        }
                    } else {
                        printMessages([` Today: ${data}`]);
                    }
                })
                .then(() => {
                    setTimeout(() => {
                        printMessages([" "])
                            .then(() => {
                                printCommandLine();
                            });
                    }, 300);
                });
            break;
        default:
            printMessages([
                " ",
                " Invalid command. Enter \"help\" for a list of available commands.",
                " "
            ]).then(printCommandLine);
    }
}

async function doSomething() {
    await printMessages(welcome);
    await printCommandLine();
}

doSomething();