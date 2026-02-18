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
    console.log(`O Usuario Realizou: ${pushEventCount} Commits nos Repositórios: `);
    events.forEach(element => {
        if(element.type == "PushEvent") {
            console.log(element.repo.name);
        }
    });
    const publicEventCount = events.filter(e => e.type === "PublicEvent").length
    console.log(`O Usuario Subiu: ${publicEventCount} Novo(s) Projeto(s)`);
    events.forEach(element => {
        if(element.type == 'PublicEvent') {
            console.log(element.repo.name);
        }        
    })

    const PullRequestEventCount = events.filter(e => e.type === "PullRequestEvent").length
    console.log(`O Usuario Abriu ${PullRequestEventCount} Pull Requests`);
    events.forEach(element => {
        if(element.type == 'PullRequestEvent') {
            console.log(element.repo.name);
        }        
    })




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
