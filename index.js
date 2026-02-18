async function fetchGithubUserActivity(username) {
    const response = await fetch(`https://api.github.com/users/${username}/events/public`, {
        headers: {
            "User-Agent": "node.js"
        }
    })
    return response.json();
}



fetchGithubUserActivity('luizlost01')
.then((e) => {
    console.log(e);  
})
.catch((err) => {
    console.error(err.message);
    process.exit(1);
    
})
