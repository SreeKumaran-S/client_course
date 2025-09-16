(function () {
    let geo_data = ["chennai", "coimbatore", "trichy", "nagercoil"];

    let findMatchingLocation = (locationInput)=>{
        locationInput = locationInput.toLowerCase();
        let results = geo_data.filter((locationItem)=>{
            return locationItem === locationInput;
        });
        return results;
    };

    console.log(findMatchingLocation("Chennai"));
})();