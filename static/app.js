const mainContent = document.querySelector(".wrapper__main");
const sort_title = document.querySelector("#sort-title");
const dataGlobal = []
let executed_title = false
let executed_sub = false
let executed_vid = false
let executed_view = false
let check_input_sort = (data) => {
    const inputs_to_sort = [...document.querySelectorAll(".choice__label")];
    inputs_to_sort.map((input, index) => {
        if (index === 0) {
            const btn_sort = document.querySelector(`label[for=${input.htmlFor}]`)
            btn_sort.addEventListener("click", (event) => {
                console.log("kamil")
                if (!executed_title) {
                    mainContent.innerHTML = ""
                    executed_title = true
                    executed_vid = false
                    executed_sub = false
                    executed_view = false
                    data.sort((a, b) => {
                        if (a.title.toLowerCase() < b.title.toLowerCase()) { return -1; }
                        if (a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
                        return 0;
                    })
                    one_channel(data)
                } else { return }
            });
        } else {
            const btn_sort = document.querySelector(`label[for=${input.htmlFor}]`);
            btn_sort.addEventListener("click", (event) => {
                if (index == 1 && !executed_sub) {
                    mainContent.innerHTML = ""
                    executed_sub = true
                    executed_vid = false
                    executed_title = false
                    executed_view = false
                    data.sort((a, b) => +numberWithCommas(a.statistics.subscriberCount).replace(/\,/g, "") - +numberWithCommas(b.statistics.subscriberCount).replace(/\,/g, ""))
                    one_channel(data)
                } else if (index == 2 && !executed_vid) {
                    mainContent.innerHTML = ""
                    executed_vid = true
                    executed_sub = false
                    executed_view = false
                    executed_title = false
                    data.sort((a, b) => +numberWithCommas(a.statistics.videoCount).replace(/\,/g, "") - +numberWithCommas(b.statistics.videoCount).replace(/\,/g, ""))
                    one_channel(data)
                } else if (index === 3 && !executed_view) {
                    mainContent.innerHTML = ""
                    executed_view = true
                    executed_sub = false
                    executed_vid = false
                    executed_title = false
                    data.sort((a, b) => +numberWithCommas(a.statistics.viewCount).replace(/\,/g, "") - +numberWithCommas(b.statistics.viewCount).replace(/\,/g, ""))
                    one_channel(data)
                }
            });
        }
    })
}

const numberWithCommas = (x) => {
    if (typeof x !== "undefined")
        return x.toString().replace(" ", "").replace(/\./g, "").replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const html = (link_to_channel, logo, channel_title, num_sub, num_vid, num_view) => {
    return (`
<a href=${link_to_channel} class="logo" style="background-image: url(${logo})">
</a>
<h2 class="channel_title">${channel_title}</h2>
<div class="all_numbers">
    <p class="numbers">
        <span class="sub_vid_view">SUBSCRIBERS:</span>
        <span class="num_sub_vid_view">${numberWithCommas(num_sub)}</span>
    </p>
    <p class="numbers">
        <span class="sub_vid_view">VIDEOS:</span>
        <span class="num_sub_vid_view">${numberWithCommas(num_vid)}</span>
    </p>
    <p class="numbers">
        <span class="sub_vid_view">VIEWS:</span>
        <span class="num_sub_vid_view">${numberWithCommas(num_view)}</span>
    </p>
</div>
`)
}
const one_channel = (data) => {
    data.map(channel => {
        const param_html = [channel.customUrl, channel.thumbnails.medium.url, channel.title, channel.statistics.subscriberCount,
        channel.statistics.videoCount, channel.statistics.viewCount]
        let newArt = document.createElement("article");
        newArt.classList.add("channel")
        newArt.innerHTML = html(...param_html)
        mainContent.appendChild(newArt)
    })
}

const getChannels = async () => {
    try {
        const response = await fetch("http://localhost:4000/channels");
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            dataGlobal.push(...data)
            one_channel(data)

        } else {
            throw ("404 not found")
        }
    } catch (error) {
        alert(error)
        console.log(error);
        mainContent.innerText = "Problem is " + error
    }
}
getChannels(check_input_sort(dataGlobal))
