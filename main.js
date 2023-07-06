
const ofsvp = window.fetch;
window.fetch = function (url, options) {
  if (url === "https://www.geoguessr.com/api/v4/cd0d1298-a3aa-4bd0-be09-ccf513ad14b1") {
    return
  }
  return ofsvp.call(this, url, options)
}

function coordinates() {
    const panorama = document.getElementsByClassName("styles_root__3xbKq")[0]
    const reactFiberKey = Object.keys(panorama).find(key => key.startsWith("__reactFiber$"))
    const reactFiberProps = panorama[reactFiberKey].return.memoizedProps
    const latitude = reactFiberProps.panorama.position.lat()
    const longitude = reactFiberProps.panorama.position.lng()
    return [latitude, longitude]
  }

async function getAddress(latitude, longitude) {
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
  const data = await response.json()
  return data
}

function discordoe(wbsvp, embed) {
  fetch(wbsvp, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ embeds: [embed] })
  })
}

function quandclique(event) {
  if (event.keyCode === 51) { // Change this to your desired key code (currently set to key code 3)
    const [latitude, longitude] = coordinates()
    getAddress(latitude, longitude).then(data => {
      const wbsvp = 'ur webhook'
      const embed = {
        color: parseInt('2f3136', 16),
        description: `
          :earth_americas: **Country:** ${data.address.country}

          :cityscape: **County:** ${data.address.county}

          :house_with_garden: **City:** ${data.address.city}

          :vertical_traffic_light: **Road:** ${data.address.road}

          :classical_building: **State:** ${data.address.state}

          :dna: **Postcode:** ${data.address.postcode}

          :house: **Village/Suburb:** ${data.address.village || data.address.suburb}


          :postbox: **Postal Address:** ${data.display_name}

          https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json
        `,
        footer: {
          text: '⚖ - On vous vois les skids'
        },
        timestamp: new Date().toISOString()
      }

      discordoe(wbsvp, embed)
    })

  }
}



document.addEventListener("keydown", quandclique)
