import "./style.scss";

document.querySelector(".btn").addEventListener("click", async function () {
  let userName = document.querySelector(".userName").value.trim();

  let repos = await findUserRepos(userName);
  let reposList = document.querySelector(".repos");
  reposList.innerHTML = ""; // To clear the userName

  repos.forEach((repo) => {
    let tr = document.createElement("tr");
    let anchor = document.createElement("a");
    anchor.href = repo.html_url;
    anchor.target = "_blank";
    anchor.classList.add("anchor_style");

    let tdName = document.createElement("td");
    let tdDate = document.createElement("td");

    tdName.classList.add("tdName_style");

    tdName.appendChild(anchor);
    tr.appendChild(tdName);
    tr.appendChild(tdDate);

    let formattedData = formateDate(Date.parse(repo.created_at)); // Date.parse = string into an object

    anchor.innerText = repo.name;
    tdDate.innerText = formattedData;

    reposList.appendChild(tr);
  });
});

// --------- =^.^= --------- Find the users repos

async function findUserRepos(username) {
  let url = `https://api.github.com/users/${username}/repos`;
  let response = await fetch(url);
  return response.json();
}

// --------- =^.^= --------- Formatted data

function formateDate(dateObject) {
  let formatter = new Intl.DateTimeFormat("en");
  return formatter.format(dateObject);
}
// --------- =^.^= --------- to clear the input text when refresh the page

function init() {
  document.querySelector(".userName").value = "";
}
window.onload = init;
