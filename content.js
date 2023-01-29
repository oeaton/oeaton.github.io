const snoopy = [
    "            ,-~~-.___.                               .",
    "           / ()=(()   \\            .,              \\ | /",
    "          (   (        0       ;';'  ';'.        '-.;;;.-'",
    "           \\._\\, ,----'        ';.,;    ,;      -==;;;;;==-",
    "      ##XXXxxxxxxx                '.';.'         .-';;;'-.",
    "             /  ---'~;                             / | \\",
    "            /    /~|-                                '",
    "          =(   ~~  |",
    "    /~~~~~~~~~~~~~~~~~~~~~\\",
    "   /_______________________\\",
    "  /_________________________\\",
    " /___________________________\\",
    "    |____________________|",
    "    |____________________|",
    "    |____________________|       ____",
    "    |                    | \\|/  /____\\    \\\\/   |//   \\||//",
    " "
];

const welcome = [
    ".         _  .          .          .    +     .          . ",
    "  ,-,   .(_)          .            .            .          ",
    " /.(    .   .      .    .     .     .    .      .   .      ",
    " \\ {      .           .   .        .           .          /",
    "  `-`  . .      .  .     /.   .     .    .     .     .   / ",
    "        .  +       .    /     .          .          .   /  ",
    "       .            .  /         .            .        *   ",
    "      .   .      .    *     .     .    .      .   .       .",
    "  . .        .  .       .   .      .    .     .     .    . ",
    "************************************************************",
    "*                 Welcome to my portfolio                  *",
    "*        Type \"help\" for list of available commands        *",
    "************************************************************"
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
                " contact - displays contact information",
                " projects - displays a list of my projects",
                " snoopy - displays some really cool art :)",
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
        case "projects":
            printMessages([" "]);
            printLink("Wordle Helper","To Project", "https://replit.com/@oeaton/Wordle-Helper?v=1");
            printLink("This Website", "To Project", "https://replit.com/@oeaton/Website?v=1");
            printMessages([" "]);
            printCommandLine();
            break;
        case "secret":
            // let userIp;
            // fetch('https://api.ipify.org?format=json')
            //     .then(response => response.json())
            //     .then(data => {
            //         userIp = data.ip;
            //     })
            //     .then(() => {
            //         fetch(`https://ipinfo.io/${userIp}/json?token=821377ee3c7e0e`)
            //             .then(response => response.json())
            //             .then(info => {
            //                 printMessages(["Country: " + info.country]);
            //                 printMessages(["Region: " + info.region]);
            //                 printMessages(["City: " + info.city]);
            //                 printMessages(["Zip Code: " + info.postal]);
            //                 printMessages(["Time Zone: " + info.timezone]);
            //                 printMessages(["Org: " + info.org]);
            //             });
            //     });

            let userIp;
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => {
                    userIp = data.ip;
                })
                .then(() => {
                    printMessages([" This is your last chance :)", " Loading...", " "]);
                    setTimeout(() => {
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
                                printMessages([" "]);
                                printMessages([" Sorry :/"]);
                                printMessages([" "])
                                    .then(() => {
                                        printCommandLine();
                                    })
                            });
                    }, 5000);
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