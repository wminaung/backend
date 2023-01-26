const url = "http://localhost:3000/data";
const fetchUserData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const showUserData = () => {
  fetchUserData().then((data) => {
    const userData = document.getElementById("user");
    userData.innerHTML = "";
    data.forEach((user) => {
      userData.innerHTML += `
        <div class="card bg-info  my-2 " >
        <div class="card-body">
<pre>
  id: ${user.id}
  name: ${user.name};
  email: ${user.email}:
  password: ${user.password}
</pre>
        </div>
      </div>`;
    });
  });
};
showUserData();
const userFormData = document.querySelector("#userFormData");

const registerData = async (dataToServer) => {
  const serverResponse = await fetch(url, {
    method: "POST",
    body: JSON.stringify(dataToServer),
  });

  const data = await serverResponse.json();
  if (data.status === "success") {
    showUserData();
  }
};

userFormData.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  if (name === "" || email === "" || password === "") {
    alert("Hey put your all info");
    return;
  }
  const dataToServer = { name, email, password };
  registerData(dataToServer);
});
