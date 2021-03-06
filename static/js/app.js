window.addEventListener('DOMContentLoaded', (event) => {
    const mainContent = document.querySelector(".wrapper__main");
    const inputs_to_clear_radio = [...document.querySelectorAll(".choice--radio")];
    let executed_title = false
    let executed_sub = false
    let executed_vid = false
    let executed_view = false

    const clear_inputs = () => {
        inputs_to_clear_radio.map(input_radio => {
            input_radio.checked = false
        })
    }

    // show suggestions
    const suggest = (data, inp) => {
        const array_of_titles = data.map(channel => channel.title)
        inp.addEventListener("input", e => {
            console.log(inp)
            const value = inp.value
            console.log(value)
            closeAllLists();
            if (!value) { return false; }
            let a = document.createElement("DIV");
            a.classList.add("autocomplete-list")
            inp.parentNode.appendChild(a);
            array_of_titles.map(title => {
                if (title.substr(0, value.length).toUpperCase() == value.toUpperCase()) {
                    let b = document.createElement("DIV");
                    b.innerHTML = `<strong>${title.substr(0, value.length)}</strong>${title.substr(value.length)}`
                    b.innerHTML += `<input type='hidden' value='${title}'>`
                    b.addEventListener("click", e => {
                        inp.value = b.querySelector("input").value;
                        const input_event = new Event("input");
                        inp.dispatchEvent(input_event)
                        closeAllLists();
                    })
                    a.appendChild(b);
                }
            })
        })
        const closeAllLists = elmnt => {
            var x = [...document.getElementsByClassName("autocomplete-list")];
            x.map(list => {
                if (elmnt !== list && elmnt !== inp) {
                    document.querySelector(`.${list.className}`).parentNode.removeChild(list);
                }
            })
        }
        document.addEventListener("click", e => {
            closeAllLists(e.target);
        })
    }
    //sort by select
    const sort_select = (data, x, y) => {
        if (typeof y !== "undefined") {
            data.sort((a, b) => {
                return (+a[x][y].replace(/[" ".,]/g, "") -
                    +b[x][y].replace(/[" ".,]/g, ""))
            })
        } else {
            data.sort((a, b) => {
                if (a[x].toLowerCase() < b[x].toLowerCase()) { return -1; }
                if (a[x].toLowerCase() > b[x].toLowerCase()) { return 1; }
                return 0;
            })
        }
    }

    //filter by search
    const filter_by_search = (data) => {
        const input_to_search = document.querySelector(".filter__input");
        input_to_search.addEventListener("input", event => {
                mainContent.innerHTML = ""
                const data_filter = data.filter(channel => {
                    const is_there = channel.title.toLowerCase().includes(input_to_search.value.toLowerCase())
                    if (is_there) {
                        return channel
                    }
                });
                one_channel(data_filter)
        })
    }
    //adding sort function to input select 
    let check_input_sort = (data) => {
        const inputs_to_sort = [...document.querySelectorAll(".choice__label")];
        inputs_to_sort.map((input, index) => {
            if (index === 0) {
                const btn_sort = document.querySelector(`label[for=${input.htmlFor}]`)
                btn_sort.addEventListener("click", () => {
                    if (!executed_title) {
                        mainContent.innerHTML = ""
                        executed_title = true
                        executed_vid = false
                        executed_sub = false
                        executed_view = false
                        sort_select(data, "title")
                        one_channel(data)
                    } else { return }
                });
            } else {
                const btn_sort = document.querySelector(`label[for=${input.htmlFor}]`);
                btn_sort.addEventListener("click", () => {
                    if (index == 1 && !executed_sub) {
                        mainContent.innerHTML = ""
                        executed_sub = true
                        executed_vid = false
                        executed_title = false
                        executed_view = false
                        sort_select(data, "statistics", "subscriberCount")
                        one_channel(data)
                    } else if (index == 2 && !executed_vid) {
                        mainContent.innerHTML = ""
                        executed_vid = true
                        executed_sub = false
                        executed_view = false
                        executed_title = false
                        sort_select(data, "statistics", "videoCount")
                        one_channel(data)
                    } else if (index === 3 && !executed_view) {
                        mainContent.innerHTML = ""
                        executed_view = true
                        executed_sub = false
                        executed_vid = false
                        executed_title = false
                        sort_select(data, "statistics", "viewCount")
                        one_channel(data)
                    }
                });
            }
        })
    }

    const numberWithCommas = (x) => {
        if (typeof x !== "undefined")
            return x.toString().replace(/[.," "]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //body one channel

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
    //create one channel  
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
    //fetch data
    const getChannels = async () => {
        try {
            const response = await fetch("http://localhost:4000/channels");
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                one_channel(data)
                check_input_sort(data)
                filter_by_search(data)
                suggest(data, document.querySelector(".filter__input"))
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
})
