async function fetchGithubUserActivity(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/events`, {
            headers: {
                "User-Agent": "node.js"
            }
        });
        
        if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
        
        return response.json();
    } catch (err) {
        console.error(err.message);
        return []; 
    }
}

function formatApiData(events) {
    if (!Array.isArray(events)) {
        console.log("Erro: A resposta não é uma lista de eventos.");
        return;
    }
    if (events.length === 0) {
        console.log('Nenhum dado encontrado (Out Of data)');
        return;
    }

    const pushEventCount = events.filter(e => e.type === "PushEvent").length;
    console.log(`O Usuario Realizou: ${pushEventCount} Commits`);

    const publicEventCount = events.filter(e => e.type === "PublicEvent").length
    console.log(`O Usuario Subiu: ${publicEventCount} Novo(s) Projeto(s)`);
}


const username = process.argv[2]
if (!username) {
    console.error('Username Not Defined');
    process.exit(1)
}

fetchGithubUserActivity(username)
        .then((data) => {
            formatApiData(data);
        });
