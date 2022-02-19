const stationForm = document.getElementById("station-form");
const operatorName = document.getElementById("operatorName");
const state = document.getElementById('state');
const phoneNumber = document.getElementById('phoneNumber');
const radioButtons = document.querySelectorAll('input[name="Status"]');
const Address = document.getElementById("address");

// Send POST to API to add store
async function addStore(e) {
  e.preventDefault();

  if (operatorName.value === "" || Address.value === "") {
    alert("Please fill in fields");
  }
  
  var x = document.getElementById("offline").checked;
  const sendBody = {
    operatorName : operatorName.value,
    state : state.value,
    address: Address.value,
    phoneNumber : phoneNumber.value,
    status : x
  };

  console.log(sendBody);

  try {
    const res = await fetch("/api/stations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendBody),
    });

    if (res.status === 400) {
      throw Error("Store already exists!");
    }

    alert("Store added!");
    window.location.href = "/index.html";
  } catch (err) {
    alert(err);
    return;
  }
}

stationForm.addEventListener("submit", addStore);
