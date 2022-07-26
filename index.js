'use strict';

 const OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '87a9db25abmshbf82857a13969c6p1bf530jsn838da3d57ba6',
        'X-RapidAPI-Host': 'ip-geolocation-and-threat-detection.p.rapidapi.com'
      }
  };

  const fetchIpInfo =  ip => {
    const url = `https://ip-geolocation-and-threat-detection.p.rapidapi.com/${ip}`;
    return fetch(url,OPTIONS)
        .then(response => response.json())
        //.then(data => data)
        .catch(error => console.log(error));

    }

    const $ = selector => document.querySelector(selector);

    const $form = $('#ip-form');
    const $ip = $('#ip');
    const $submit = $('#submit');
    const $results = $('#results');

    $form.addEventListener('submit', async (e) => {
        e.preventDefault();
        //const {value} = $ip;
        const ip = $ip.value;
        if (!ip) return;

        $submit.setAttribute('disabled', '');
        $submit.setAttribute('aria-busy', 'true');

        const ipInfo = await fetchIpInfo(ip)

        if (ipInfo) {
            $submit.removeAttribute('disabled');
            $submit.removeAttribute('aria-busy');
            $ip.value = '';
            $ip.focus();
        
            $results.innerHTML = ` <p>Resultado:</p>
            <p>IP: ${ipInfo.ip}
            <br>Type: ${ipInfo.type}
            <br>Company: ${ipInfo.company.name}
            </p>`;



            $results.innerHTML += JSON.stringify(ipInfo, null, 2);

            // ipInfo.then(data => {
            //     console.log(data);
            //     const $miIp = document.querySelector('#result-ip');
            //     $miIp.innerHTML = ip;
            //     const $carrier = document.querySelector('#result-carrier');
            //     $carrier.innerHTML = data.carrier.name;
            //     const $company = document.querySelector('#result-company');
            //     $company.innerHTML = data.company.name;
            //     const $connection = document.querySelector('#result-connection');
            //     $connection.innerHTML = data.connection.domain;
            //});

        }

});

