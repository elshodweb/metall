let baseURL = "http://localhost:3000";

async function removeCard(id) {
  try {
    const response = await fetch(baseURL + `/api/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete card");
    }
    window.location.reload();
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

let formEdit = document.querySelector("#formEditCard");

formEdit.addEventListener("submit", async function (event) {
  try {
    event.preventDefault();
    const formData = new FormData(formEdit);
    const url = formEdit.getAttribute("action");
    let response = await fetch(url, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(response);
    }
    window.location.reload();
  } catch (error) {
    console.log(error.message);
  }
});

let wrapperForm = document.querySelector("#editCard");
function addIdForForm(card) {
  card = JSON.parse(card);

  formEdit.querySelector("[name='name']").value = card.name;
  formEdit.querySelector("[name='price']").value = card.price;
  formEdit.querySelector("[name='description']").value = card.description;

  wrapperForm.style.opacity = "1";
  wrapperForm.style.visibility = "visible";

  formEdit.action = baseURL + `/api/cards/${card.id}`;
}
