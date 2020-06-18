const mainContent = document.querySelector(".wrapper__main");


const one_channel = (data) => {
    data.map(channel => {
        const html=""
        const newArt = document.createElement("article");
        mainContent.appendChild(newArt)
    })
}

const getChannels = async () => {
    try {
        const response = await fetch("http://localhost:4000/channels");
        if (response.ok) {
            const data = await response.json();
            data.map(channel => {
                const newArt = document.createElement("article");
                mainContent.appendChild(newArt);
            })
        } else {
            throw ("404 not found")
        }

    } catch (error) {
        alert(error)
        console.log(error);
        mainContent.innerText = "Problem is " + error
    }
}
//getChannels()
// function htmlToElement(html) {
//     var template = document.createElement('template');
//     html = html.trim(); // Never return a text node of whitespace as the result
//     template.innerHTML = html;
//     return template.content.firstChild;
// }