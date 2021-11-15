getData();

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        const root = document.createElement('div');
        const username = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        
        username.textContent = `username: ${item.username}`;
        geo.textContent = `${item.lat}°, ${item.lon}°`;
        const dateString = new Date(item.timestamp).toLocaleString();
        geo.textContent = dateString;

        root.append(username, geo, date);
        document.body.append(root);
    };
    console.log(data);
};