const base_url = "https://api.football-data.org/v2/";

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function getStandings() {
  return new Promise(function (resolve, reject) {
    if ('caches' in window) {
      caches.match(`${base_url}competitions/2021/standings`).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var standingsHTML = "";
            data.standings[0].table.forEach(function (team) {
              standingsHTML += `
                <tr>
                  <td>${team.position}</td>
                  <td><img width="50" src="${team.team.crestUrl}"/></td>
                  <td>${team.team.name}</td>
                  <td>${team.playedGames}</td>
                  <td>${team.won}</td>
                  <td>${team.draw}</td>
                  <td>${team.lost}</td>
                  <td>${team.points}</td>
                  <td>${team.goalsFor}</td>
                  <td>${team.goalsAgainst}</td>
                  <td>${team.goalDifference}</td>
                  <td><a href="./standing.html?id=${team.team.id}">more</td>
                </tr>
                `;
            });
            document.getElementById("standings").innerHTML = standingsHTML;
            resolve(data);
          })
        }
      })
    }

    fetch(`${base_url}competitions/2021/standings`, {
        headers: {
          "X-Auth-Token": '67ce74e591bf45848bd67f6c8d4686a3'
        }
      })
      .then(status)
      .then(json)
      .then(function (data) {
        var standingsHTML = "";
        data.standings[0].table.forEach(function (team) {
          standingsHTML += `
               <tr>
                  <th scope="row">${team.position}</th>
                  <td><img width="50" src="${team.team.crestUrl}" alt="logo ${team.team.name}" /></td>
                  <td>${team.team.name}</td>
                  <td>${team.playedGames}</td>
                  <td>${team.won}</td>
                  <td>${team.draw}</td>
                  <td>${team.lost}</td>
                  <td>${team.points}</td>
                  <td>${team.goalsFor}</td>
                  <td>${team.goalsAgainst}</td>
                  <td>${team.goalDifference}</td>
                  <td><a href="./standing.html?id=${team.team.id}"><i class="small material-icons">more_horiz</i></td>
                </tr>
              `;
        });
        document.getElementById("standings").innerHTML = standingsHTML;
        resolve(data);
      })
      .catch(error);
  })
}

function getTeamById() {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(`${base_url}teams/${idParam}`).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var teamHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.crestUrl}" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.name}</span>
              </div>
            </div>
            `;
            document.getElementById("body-content").innerHTML = teamHTML;
            resolve(data);
          });
        }
      });
    }
    fetch(`${base_url}teams/${idParam}`, {
        headers: {
          "X-Auth-Token": '67ce74e591bf45848bd67f6c8d4686a3'
        }
      })
      .then(status)
      .then(json)
      .then((data) => {
        console.log(data);
        let teamHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
            <img src="${data.crestUrl}" />
            </div>
            <div class="card-content">
              <span class="card-title">${data.name}</span>
              ${snarkdown(data.website)}
            </div>
          </div>
        `;
        document.getElementById("body-content").innerHTML = teamHTML;
        resolve(data);
      });
  })
}

function getSavedTeams() {
  return new Promise(function (resolve, reject) {
    getAll().then(function (standings) {
      console.log(standings);
      // Menyusun komponen card artikel secara dinamis
      var standingsHTML = "";
      standings.forEach(function (team) {
        standingsHTML += `
            <div class="card">
              <a href="./standing.html?id=${team.id}&saved=true">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${team.crestUrl}" />
                </div>
              </a>
              <div class="card-content">
                <span class="card-title truncate">${team.name}</span>
                 <button onclick="M.toast({html: 'Team Dihapus dari Favorit'})" style="float:right;" id="${team.id}" class="removeButton btn">Remove</button>
              </div>
              <br>
            </div>
          `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #body-content
      document.getElementById("saved").innerHTML = standingsHTML;

      let removeButtons = document.querySelectorAll(".removeButton");
      for (let button of removeButtons) {
        button.addEventListener("click", function (event) {
          let id = event.target.id;
          console.log('ini id', id)
          dbDeleteTeam(id).then(() => {
            getSavedTeams()
          })
        })
      }
    });
  })
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then(function (data) {
    teamHTML = '';
    var teamHTML = `
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
        <img src="${data.crestUrl}" />
        </div>
        <div class="card-content">
          <span class="card-title">${data.name}</span>
          ${snarkdown(data.website)}
        </div>
      </div>   
    `;
    document.getElementById("body-content").innerHTML = teamHTML;
   
  });
}