const dbPromised = idb.open("football_league", 1, upgradeDb => {
  const teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("team_name", "team_name", {
    unique: false
  });
});

saveForLater = (team) => {
  dbPromised
    .then( (db) => {
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");
      console.log(team);
      store.add(team);
      return tx.complete;
    })
    .then(() => {
      console.log("Tim berhasil di simpan.");
    });
}

getAll = () => {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
        return store.getAll();
      })
      .then((teams) => {
        resolve(teams);
      });
  });
}

getById = (id) => {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
        return store.get(parseInt(id));
      })
      .then((team) => {
        resolve(team);
      });
  });
}

function dbDeleteTeam(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        store.delete(parseInt(id));
        return store.complete;
      })
      .then(function () {
        console.log("Team Favorit telah dihapus.");
      });
  });
}