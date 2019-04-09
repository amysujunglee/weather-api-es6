window.addEventListener('load', ()=> {
    let long;
    let lat;
    let tempDescription = document.querySelector('.temp-description');
    let tempDegree = document.querySelector('.temp-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let tempSection = document.querySelector('.temp-section');
    const tempSpan = document.querySelector('.temp-section span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/245d49e69b70bf335ec2a19a8f8e22b5/${lat},${long}`;
    
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { temperature, summary, icon } = data.currently;
                // Set DOM Elements from the API
                tempDegree.textContent = temperature;
                tempDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                // Formula for celsius
                let celsius = (temperature - 32) * (5 / 9);

                // Set Icon
                setIcons(icon, document.querySelector('.icon'));

                // Change temperature to Celsius/Farenheit
                tempSection.addEventListener('click', () => {
                    if(tempSpan.textContent === 'F') {
                        tempSpan.textContent = 'C';
                        tempDegree.textContent = Math.floor(celsius);
                    } else {
                        tempSpan.textContent = 'F';
                        tempDegree.textContent = temperature;
                    }
                });
            });
        });
    }
    
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: 'white'}); // Why "Skycones"?
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});