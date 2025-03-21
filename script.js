// Declairing Variables for fatchdata

const basUrl = "https://www.youtube.com/watch?v=";
const cardsContainer = document.querySelector(".cards_main_container");

// Declairing Variables for get document elements

const pageNumber = document.querySelectorAll("button");

async function display(pageNumber) {
  try {
    const api = await fetch(
      `https://api.freeapi.app/api/v1/public/youtube/videos?page=${pageNumber}&limit=10&query=javascript&sortBy=keep%2520one%253A%2520mostLiked%2520%257C%2520mostViewed%2520%257C%2520latest%2520%257C%2520oldest`
    );
    const response = await api.json();

    const data = response.data.data;

    data.forEach((element) => {
      // Declairing all variables for data fatch

      const thumbnailsUrl = element.items.snippet.thumbnails.medium.url;

      const title = element.items.snippet.title;

      const channelName = element.items.snippet.channelTitle;

      const videoId = element.items.id;

      const videoLink = basUrl.concat(videoId);

      //   Creating Card

      // Declairing All Card Elements

      const cardLinkContainer = document.createElement("a");
      cardLinkContainer.classList.add("for_card_click");

      const cardMain = document.createElement("div");
      cardMain.classList.add("card_main");

      const tumbnailContainer = document.createElement("div");
      tumbnailContainer.classList.add("thumbnail_container");

      const thumbnail = document.createElement("img");

      const titleElement = document.createElement("h3");

      const channelNameElement = document.createElement("h4");

      //   Add values in all Elements

      cardLinkContainer.setAttribute("href", videoLink);
      cardLinkContainer.setAttribute("target", "_blank");

      thumbnail.setAttribute("src", thumbnailsUrl);

      titleElement.innerHTML = `<i class="fas fa-video"></i>  ${title}`;

      channelNameElement.innerHTML = `<i class="fas fa-user-circle"></i>  ${channelName}`;

      //   Append child in Crad Element

      cardLinkContainer.appendChild(cardMain);

      cardMain.appendChild(tumbnailContainer);
      tumbnailContainer.appendChild(thumbnail);

      cardMain.appendChild(titleElement);

      cardMain.appendChild(channelNameElement);

      //   Append whole card container in to main container

      cardsContainer.appendChild(cardLinkContainer);
    });
  } catch (error) {
    alert(error);
  }
}

pageNumber.forEach((pageNumber) => {
  pageNumber.addEventListener("click", () => {
    console.log(pageNumber.innerText);

    cardsContainer.innerHTML = "";
    display(pageNumber.innerText);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  cardsContainer.innerHTML = "";
  display(1);
});
