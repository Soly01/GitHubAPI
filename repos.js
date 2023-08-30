let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button ");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

function getRepos() {
  if (theInput.value === "") {
    reposData.innerHTML = "<span>Please Write GitHub Username.</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => response.json())

      .then((repos) => {
        reposData.innerHTML = "";
        repos.forEach((rep) => {
          let mainDiv = document.createElement("div");

          let repoName = document.createTextNode(rep.name);
          mainDiv.appendChild(repoName);

          let theURL = document.createElement("a");
          let URLText = document.createTextNode("Visit");
          theURL.href = `https://github.com/${theInput.value}/${rep.name}`;
          theURL.setAttribute("target", "_blank");
          theURL.appendChild(URLText);
          mainDiv.appendChild(theURL);

          let starsSpan = document.createElement("span");
          let starsSpanText = document.createTextNode(
            `Start ${rep.stargazers_count}`
          );
          starsSpan.appendChild(starsSpanText);
          mainDiv.appendChild(starsSpan);
          mainDiv.className = "repo-box";

          reposData.appendChild(mainDiv);
        });
      });
  }
}
