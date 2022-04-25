window.onload = function () {
  fetch("api/getInventory")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let table = document.querySelector(".tbody");
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
                <td class="inventory-image"><img src="${
                  "assets/pixel_dungeon/items/items_" +
                  String(item.path_to_image).padStart(2, "0") +
                  ".png"
                }"/></td>
                <td class="inventory-name"><h4>${
                  item.name.charAt(0).toUpperCase() + item.name.slice(1)
                }</h4></td>
                <td class="inventory-quantity"><p>${item.quantity}</p></td>
                `;
        table.appendChild(newRow);
      }
    });
};
