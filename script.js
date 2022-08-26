let items = [];
const addElement = document.getElementById("addTodoList");
const listElement = document.getElementById("list-todo");
const count = document.getElementById("countElement");
const checkboxes = document.getElementsByClassName("check-box");
const clearElement = document.getElementById("clear-button");

addElement.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && event.target.value) {
    const value = event.target.value;
    const item = {
      value: value,
      checked: false,
      id: uuidv4(),
    };
    items.push(item);
    addElement.value = "";
    renderItems();
    updateItemsLeft();
  }
});

const deleteItem = (id) => {
  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });

  renderItems();
  updateItemsLeft();
};

function checkedItem(id) {
  items = items.map((item) => {
    if (item.id !== id) {
      return item;
    } else {
      return {
        value: item.value,
        checked: !item.checked,
        id: item.id,
      };
    }
  });

  updateItemsLeft();
}

function updateItemsLeft() {
  const auxItems = items.filter((item) => {
    if (!item.checked) {
      return item;
    }
  });

  count.innerHTML = `${auxItems.length} items left`;
}

function clearCompleted() {
  items = items.filter((item) => {
    if (!item.checked) {
      return item;
    }
  });

  renderItems();
  updateItemsLeft();
}

function renderItems() {
  listElement.innerHTML = "";

  items.forEach((item) => {
    listElement.innerHTML =
      `
      <li id="item-${item.id}">
        <input ${item.checked ? "checked" : ""} type="checkbox" id="checkbox-${
        item.id
      }" class="check-box" onclick='checkedItem("${item.id}")' name="checkbox-${
        item.id
      }" />

        <label for="checkbox-${item.id}">
          <span>${item.value}</span>
        </label>

        <button id="delete-button" class='del-button' onclick='deleteItem("${
          item.id
        }")'>
          <img src="images/icon-cross.svg" alt="delete button">
        </button>
      </li>
    ` + listElement.innerHTML;
  });
}
