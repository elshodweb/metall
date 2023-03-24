let baseURL = "http://localhost:3000";

async function removeContact(id) {
  try {
    const response = await fetch(baseURL + `/api/contacts/${id}`, {
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


async function removeCalled(id) {
  try {
    const response = await fetch(baseURL + `/api/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to change called");
    }
    window.location.reload();
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

