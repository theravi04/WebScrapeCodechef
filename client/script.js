const userInp = document.getElementById("userInp");
const main = document.getElementById("main");
const load = document.getElementById("load");

function sendreq() {
  // load.innerText = "Loading...."

  setInterval(() => {
    setTimeout(() => {
      load.innerText = "Loading..";
      setTimeout(() => {
        load.innerText = "Loading...";
        setTimeout(() => {
          load.innerText = "Loading....";
        }, 500);
      }, 500);
    }, 500);
  }, 1500);
  fetch(`http://localhost:4000/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userInp.value,
    }),
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 404) {
        throw new Error("Not Found");
      } else {
        throw new Error("Not Found this user");
      }
    })
    .then((data) => {
      console.log(data);
      main.innerHTML = `<div class="content">
    <div class="request-box">
        <h1 class="request-title">User Profile</h1>
        <div class="user-info">
            <p><strong>User ID:</strong>${data.userId}</p>
            <p><strong>User Rating:</strong>${data.userRating}</p>
            <p><strong>User Stars:</strong> ${data.userStar}</p>
        </div>
    </div>
</div>`;
    })
    .catch((err) => {
      console.error("error: " + err.message);
      alert(err.message);
      load.innerText = "";
    });
}
