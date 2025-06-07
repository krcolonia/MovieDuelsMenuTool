const menuDef = document.getElementById("menuDef");
let numItems = 0;

var currentId = "";
var lastId = 0;

function itemDef(
  left,
  top,
  width,
  height,
  name = "",
	group = "",
  id = null
) {
  const itemDef = document.createElement("button");
  itemDef.className = "itemDef";
  itemDef.style.left = left.toString() + "px";
  itemDef.style.top = top.toString() + "px";
  itemDef.style.width = width.toString() + "px";
  itemDef.style.height = height.toString() + "px";
  itemDef.setAttribute("name", name);
  itemDef.setAttribute("id", id);
  itemDef.setAttribute("group", group);
	lastId = id;
	numItems += 1;

  itemDef.addEventListener("click", function () {
    currentId = itemDef.id;
    editItemDef();
  });

  menuDef.appendChild(itemDef);
	updateItemCountDisplay();
}

function createItemDef() {
  const left = parseInt(document.getElementById("createLeft").value);
  const top = parseInt(document.getElementById("createTop").value);
  const width = parseInt(document.getElementById("createWidth").value);
  const height = parseInt(document.getElementById("createHeight").value);
  const textContent = document.getElementById("createName").value;
  const group = document.getElementById("createGroup").value;

  if (isNaN(left)) {
    alert("Left value is empty!");
    return;
  }
  if (isNaN(top)) {
    alert("Top value is empty!");
    return;
  }
  if (isNaN(width)) {
    alert("Width value is empty!");
    return;
  }
  if (isNaN(height)) {
    alert("Height value is empty!");
    return;
  }

	document.getElementById("createLeft").value = "";
	document.getElementById("createTop").value = "";
	document.getElementById("createWidth").value = "";
	document.getElementById("createHeight").value = "";
	document.getElementById("createName").value = "";
	document.getElementById("createGroup").value = "";

  itemDef(left, top, width, height, textContent, group, ++lastId);
}

function editItemDef() {
  if (currentId === "") {
    alert("No itemDef selected to edit!");
    return;
  }

  document.getElementById("createContainer").style.display = "none";
  document.getElementById("editContainer").style.display = "block";
  document.getElementById("generatedCode").style.display = "flex";
	document.getElementById("currentIdDisplay").textContent = currentId;

  const itemDefToEdit = document.getElementById(currentId);

	document.getElementById("codeArea").textContent = `itemDef 
{
	name				"${itemDefToEdit.getAttribute("name")}"
	group				${itemDefToEdit.getAttribute("group")}
	style				WINDOW_STYLE_SHADER
	type				ITEM_TYPE_BUTTON
	rect				${itemDefToEdit.style.left.replace("px", "")} ${itemDefToEdit.style.top.replace("px", "")} ${itemDefToEdit.style.width.replace("px", "")} ${itemDefToEdit.style.height.replace("px", "")}
	forecolor			1 1 1 0.8
	visible				1
}`;

  if (itemDefToEdit) {
    document.getElementById("editLeft").value =
      itemDefToEdit.style.left.replace("px", "");
    document.getElementById("editTop").value = 
			itemDefToEdit.style.top.replace("px", "");
    document.getElementById("editWidth").value =
      itemDefToEdit.style.width.replace("px", "");
    document.getElementById("editHeight").value =
      itemDefToEdit.style.height.replace("px", "");
    document.getElementById("editName").value = itemDefToEdit.getAttribute("name");
    document.getElementById("editGroup").value = itemDefToEdit.getAttribute("group");

    const currentIdDisplay = document.getElementById("currentIdDisplay");
    if (currentIdDisplay) {
      currentIdDisplay.textContent = currentId;
    }
  } else {
    alert("ItemDef with ID " + currentId + " not found!");
  }
}

function applyEdits() {
  if (currentId === "") {
    alert("No itemDef selected to edit!");
    return;
  }
	const left = parseInt(document.getElementById("editLeft").value);
	const top = parseInt(document.getElementById("editTop").value);
	const width = parseInt(document.getElementById("editWidth").value);
	const height = parseInt(document.getElementById("editHeight").value);
	const name = document.getElementById("editName").value;
	const group = document.getElementById("editGroup").value;

	if (isNaN(left)) {
		alert("Left value is empty!");
		return;
	}
	if (isNaN(top)) {
		alert("Top value is empty!");
		return;
	}
	if (isNaN(width)) {
		alert("Width value is empty!");
		return;
	}
	if (isNaN(height)) {
		alert("Height value is empty!");
		return;
	}

	const itemDefToEdit = document.getElementById(currentId);
	if (itemDefToEdit) {
		itemDefToEdit.style.left = left + "px";
		itemDefToEdit.style.top = top + "px";
		itemDefToEdit.style.width = width + "px";
		itemDefToEdit.style.height = height + "px";
		itemDefToEdit.setAttribute("name", name)
		itemDefToEdit.setAttribute("group", group);

		document.getElementById("codeArea").textContent = `itemDef 
{
	name				"${itemDefToEdit.getAttribute("name")}"
	group				${itemDefToEdit.getAttribute("group")}
	style				WINDOW_STYLE_SHADER
	type				ITEM_TYPE_BUTTON
	rect				${itemDefToEdit.style.left.replace("px", "")} ${itemDefToEdit.style.top.replace("px", "")} ${itemDefToEdit.style.width.replace("px", "")} ${itemDefToEdit.style.height.replace("px", "")}
	forecolor			1 1 1 0.8
	visible				1
}`;

		updateItemCountDisplay();
		console.log("Edits applied to ItemDef:", currentId);
	} else {
		alert("ItemDef with ID " + currentId + " not found!");
	}
}

function deleteItemDef() {
  if (currentId === "") {
    alert("No itemDef selected to delete!");
    return;
  }

  const itemDefToDelete = document.getElementById(currentId);
  if (itemDefToDelete) {
    itemDefToDelete.remove();
    numItems--;
    console.log("ItemDef deleted:", currentId);

		updateItemCountDisplay();
		cancelEdit();
  } else {
    alert("ItemDef with ID " + currentId + " not found!");
  }
}

function cancelEdit() {
	document.getElementById("editContainer").style.display = "none";
	document.getElementById("generatedCode").style.display = "none";
	document.getElementById("createContainer").style.display = "block";
	currentId = "";
	console.log("Edit canceled, currentId reset.");
}

function updateItemCountDisplay() {
	if (document.getElementById("itemCountDisplay") === null) {
		return;
	}
  document.getElementById("itemCountDisplay").textContent = numItems;
}

const createItemDefBtn = document.getElementById("createItemDefBtn");
const editItemDefBtn = document.getElementById("editItemDefBtn");
const deleteItemDefBtn = document.getElementById("deleteItemDefBtn");
const cancelEditBtn = document.getElementById("cancelEdit");

createItemDefBtn.addEventListener("click", createItemDef);
editItemDefBtn.addEventListener("click", applyEdits);
deleteItemDefBtn.addEventListener("click", deleteItemDef);
cancelEditBtn.addEventListener("click", cancelEdit);

updateItemCountDisplay();