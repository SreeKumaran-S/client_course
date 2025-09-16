(function () {
    let person = {
        list: [
            { name: "kumaresan" },
            { name: "arun" }
        ],
        addItem: function (newName) {
            this.list.push({ name: newName });
        },
        updateItem: function (index, newName) {
            if (index >= 0 && index < this.list.length) {
                this.list[index].name = newName;
            } else {
                console.log("Invalid index:", index);
            }
        },
        show: function () {
            console.log(this.list);
        }
    };

    person.addItem("harold");
    person.updateItem(1, "Manikandan");
    person.show();
})();