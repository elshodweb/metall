let baseURL = "http://localhost:3000";

async function removeHero(id) {
  try {
    const response = await fetch(baseURL + `/api/hero/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete hero");
    }
    window.location.reload();
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

let formEdit = document.querySelector("#formEditHero");

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

let wrapperForm = document.querySelector("#editHero");
function addIdForForm(hero) {
  hero = JSON.parse(hero);

  formEdit.querySelector("[name='title']").value = hero.title;
  formEdit.querySelector("[name='subtitle']").value = hero.subtitle;
  formEdit.querySelector("[name='description']").value = hero.description;

  wrapperForm.style.opacity = "1";
  wrapperForm.style.visibility = "visible";

  formEdit.action = baseURL + `/api/hero/${hero.id}`;
}
