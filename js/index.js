// footer section

const foot = document.createElement('footer');
foot.className = 'footer';
document.body.append(foot);


// Date and Year Information


let today = new Date();
let thisYear = today.getFullYear();


//copyright section, which uses the Date/Year and appends to the footer


const copyright = document.createElement('p');
copyright.innerHTML = "© Mary Alice Moore " + thisYear;

foot.appendChild(copyright);


//skills section


const skills = ["Python", "JavaScript", "CLass Coordinating", "HTML", "CSS"];
const skillsSection = document.querySelector(".skills");

for (let i = 0; i < skills.length; i++) {
    let skillBubble = document.createElement('li');
    console.log(skillBubble);
    skillsSection.appendChild(skillBubble);
    skillBubble.innerHTML = skills[i];
};


//getting info from GitHub via Fetch and sticking it in the elements


fetch("https://api.github.com/users/mamooredesigns/repos")
    .then((response) => {
        if (response.ok) {
            return response.text();
        } else {
        throw new Error("Whoops!  We've got an error!");
        }
    })
    .then((data) => {
        const repositories = JSON.parse(data);
        //console.log(repositories);

        const projectSection = document.getElementById("projects-box");
        let projectList = projectSection.querySelector("ul");
        projectSection.appendChild(projectList);

        for(let repository of repositories) {
            let project = document.createElement("li");
            project.innerHTML = `<a class="proj-link" href="${repository.html_url}">${repository.name}</a>`;
            projectList.appendChild(project);
        }
    })
    .catch((error) => {
        console.error("Try again later...", error.message)
    });


//message section


let messageForm = document.querySelector("[name='connectWithUsers']");
let messageSection = document.getElementById("message-section");
let messageList = messageSection.querySelector("ul");
messageSection.hidden = true;


//Count messages


let idCounter = 0;

function makeID() {
    return 'entry' + idCounter++;
}

let entryByID = {};


//submit button 


messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let name = event.target.usersName.value;
    let email = event.target.usersEmail.value;
    let message = event.target.usersMessage.value;

    let uid = makeID();
    let newMessage = document.createElement('li');
    newMessage.classList.add('message-item');
    newMessage.innerHTML = `<a href="mailto:${email}">${name}</a><span> wrote: <br> ${  message  }<br></span>`;
    newMessage.setAttribute('id', uid);

    entryByID[uid] = { usersName: name, usersEmail: email, usersMessage: message };

    messageList.appendChild(newMessage);
    messageForm.reset();
    messageSection.hidden = false;
});
