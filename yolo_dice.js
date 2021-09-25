import fetch from 'node-fetch';
import fs from 'fs';

if (!globalThis.fetch) {
	globalThis.fetch = fetch;
}

async function getDice() {
    let api = `https://api.yolodice.xyz/dice/`;
    let json = {data:[],rarity:{}};
    for (let i = 0; i < 3636; i++) {
        let res = await fetch(`${api}${i}`).then(res => res.json());

        if(res.attributes) {
            let rarity = res.attributes.find(a => a.trait_type === 'Access');
        
            if (json.rarity[rarity.value]) {
                json.rarity[rarity.value]++;
            } else {
                json.rarity[rarity.value] = 1;
            }    
        }
        json.data.push(res);
    }

    let data = JSON.stringify(json);
    fs.writeFileSync('dice.json', data);
}

getDice();