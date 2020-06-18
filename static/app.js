const mainContent = document.querySelector(".wrapper__main");
const numberWithCommas = (x) => {
    if (typeof x !== "undefined")
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
console.log(html().trim())
const one_channel = (data) => {
    data.map(channel => {
        const param_html = [channel.customUrl, channel.thumbnails.default.url, channel.title, channel.statistics.subscriberCount,
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
getChannels()