(function () {
    let person = {
        name: "Sk",
        age: 25,
        city: "Avadi",
    };
    console.log(Object.getOwnPropertyNames(person));
    console.log(Object.keys(person).includes("age"));
})();