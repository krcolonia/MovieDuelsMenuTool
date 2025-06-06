const menuDef = document.getElementById("menuDef");
let numItems = 0;

var currentId = "";
var lastId = 0;

function itemDef(
  left,
  top,
  width,
  height,
  textContent = "",
  additionalStyle = "",
  id = null
) {
  const itemDef = document.createElement("button");
  itemDef.className = "itemDef";
  itemDef.style.left = left.toString() + "px";
  itemDef.style.top = top.toString() + "px";
  itemDef.style.width = width.toString() + "px";
  itemDef.style.height = height.toString() + "px";
  itemDef.textContent = textContent;
  itemDef.style.cssText += additionalStyle;
  itemDef.setAttribute("id", id);
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
  const textContent = document.getElementById("createText").value;
  const additionalStyle = document.getElementById("createStyle").value;

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
	document.getElementById("createText").value = "";
	document.getElementById("createStyle").value = "";

  itemDef(left, top, width, height, textContent, additionalStyle, ++lastId);
}

function editItemDef() {
  if (currentId === "") {
    alert("No itemDef selected to edit!");
    return;
  }

  document.getElementById("createContainer").style.display = "none";
  document.getElementById("editContainer").style.display = "block";
	document.getElementById("currentIdDisplay").textContent = currentId;

  const itemDefToEdit = document.getElementById(currentId);
  if (itemDefToEdit) {
    document.getElementById("editLeft").value =
      itemDefToEdit.style.left.replace("px", "");
    document.getElementById("editTop").value = itemDefToEdit.style.top.replace(
      "px",
      ""
    );
    document.getElementById("editWidth").value =
      itemDefToEdit.style.width.replace("px", "");
    document.getElementById("editHeight").value =
      itemDefToEdit.style.height.replace("px", "");
    document.getElementById("editText").value = itemDefToEdit.textContent;

    let styleString = itemDefToEdit.style.cssText;

    styleString = styleString
      .replace(/left:[^;]+;/g, "")
      .replace(/top:[^;]+;/g, "")
      .replace(/width:[^;]+;/g, "")
      .replace(/height:[^;]+;/g, "");
    document.getElementById("style").value = styleString.trim();

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
	const textContent = document.getElementById("editText").value;
	const additionalStyle = document.getElementById("editStyle").value;

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
		itemDefToEdit.textContent = textContent;
		itemDefToEdit.style.cssText += additionalStyle;

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
	document.getElementById("createContainer").style.display = "block";
	currentId = ""; // Reset currentId when canceling edit
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