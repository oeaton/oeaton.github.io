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
                " shutdown - hopefully this works",
                " "
            ]).then(printCommandLine);
            break;
        case "about":
            printMessages([
                " ",
                " Hi there! I'm a Computer Science student at Arizona State",
                " University and a Community Assistant on campus.  I enjoy",
                " outdoor activities like fishing in my free time. I also",
                " enjoy traveling to new places. This summer, I'm interning",
                " at Caterpillar as a data analyst for Autonomous Mining",
                " Trucks. I am anticipating my graduation in May 2025.",
                " Always open for new challenges and connections.",
                " Let's connect!",
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
        case "shutdown":
            printMessages(["Bye."]).then(() => {
                setTimeout(() => {
                    window.open('','_self').close()
                    window.location.replace("https://google.com");
                }, 400);
            });
            break;
        case "snoopy":
            printMessages([" "]);
            printMessages(snoopy).then(() => {
                printCommandLine();
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