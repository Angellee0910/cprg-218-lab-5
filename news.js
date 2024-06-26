/**
 * Create one card from item data.
 */
function createCardElement(item) {
    return `
        <li class="card">
            <img src=${item.image} alt="">
            <div class="card-content">
                <p class="subheader">
                    ${item.author}
                </p>
                <h3 class="header">
                    <a href="${item.url}" target="_blank">${item.title}</a>
                </h3>
            </div>
        </li>
      `;
  }
  
  /**
   * Create multiple cards from array of item data.
   */
  function createCardElements(data) {
    return data.map(createCardElement).join("");
  }

/**
 * Fetch list of news sources and urls.
 */
async function fetchNewsSourceList() {
    try {
      // Get a list of News source
      const response = await fetch(
        "https://newsdata.io/api/1/sources?apikey=pub_4140449f4e39acfb4b6164da145f2d96cc518&country=ca&prioritydomain=medium"
      );
      const data = await response.json();
      return data.results;
      //Error handling
    } catch (error) {
      console.log(error);
    }
  }

/**
 * Fetch details of a new source.
 */
async function fetchNewsList(sourceid) {
    try {
      const url = `https://newsdata.io/api/1/news?apikey=pub_4140449f4e39acfb4b6164da145f2d96cc518&country=ca&domain=${sourceid}`;
      const response = await fetch(url);
      const json = await response.json();
      return json;
    //   Error handlingß
    } catch (error) {
      console.log(error);
    }
  }

/**
 * Option 1
 */
function renderOption1Results(data) {
    document.getElementById("option-1-results").innerHTML = "";
    if (data.results) {
        data.results.forEach((item) => {
            if(item.image_url === null) {
                image = "./images/no_image.jpg";
            }else{
                image = item.image_url;
            }
            if(item.creator === null) {
                author = "No Author";
            }else{
                author = item.creator;
            }
            const card = createCardElement({
                title: item.title,
                author: author,
                image: image,
                url: item.link,
            }); 
            document.getElementById("option-1-results").innerHTML += card;
        });
      }
  }

/**
 * Populate the dropdown list with news sources and their endpoint source id.
 */
async function renderOption1Dropdown() {
    const select = document.getElementById("dropdown");
    const list = await fetchNewsSourceList();
    if (list) {
      list.forEach((item) => {
        const option = document.createElement("option");
        option.textContent = item.name;
        option.value = item.id;
        select.appendChild(option);
      });
    }
  }

/**
 * Attach an event listener to the submit button for the Option 1 dropdown list.
 */
const option1SubmitButton = document.getElementById("submit-button");
option1SubmitButton.addEventListener("click", option1DropdownClickHandler);


async function option1DropdownClickHandler(event) {
    const select = document.getElementById("dropdown");
    const sourceid = select.options[select.selectedIndex].value;
    
    const data = await fetchNewsList(sourceid);
    if (data) {
      renderOption1Results(data);
    }
  }

renderOption1Dropdown();