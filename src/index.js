import './css/style.css';

const d = document;

const w = window;

const btn = d.querySelector('#btn-search');

const username = d.querySelector('#username'); 



const printer = ({avatar, name, twitter}) => {
    const div = d.querySelector('#print-user');
    if(name == null || twitter == null) {
        div.innerHTML = `
            <div class="alert alert-dark" role="alert">
                Usuario no encontrado
            </div>
            `
    } else {
        div.innerHTML = `
            <img class="img-avatar" src=${avatar}/>
            <h2 class="user-name">${name}</h2>
            <h2 class="user-twitter">@${twitter}</h2>
        `
    }
}
const repoPrint = ({repoName, url}) => {
    const div = d.querySelector('#print-user');
    div.innerHTML += `
        <div class="repo-container">
            <h3 class="repo-name"><a href=${url}>${repoName}</a></h3>
            <h3 class="repo-url"><a href=${url}>${url}</a></h3>
        </div>
    `
}

btn.addEventListener('click', () => {
    let realUser = username.value.split(' ').join('')
    if(realUser.length){ 
        setTimeout(() => {
            fetch(`https://api.github.com/users/${realUser}`)
                .then((response) => response.json())
                .then(data => {
                    printer({
                        avatar : data.avatar_url,
                        name : data.name,
                        twitter : data.twitter_username
                    })
                    fetch(data.repos_url)
                    .then((result) => result.json())
                    .then((repos) => repos.map((info) => {
                        return repoPrint({
                            repoName : info.name,
                            url : info.html_url
                        })
                    }))
                })
                
        }, 2000)
    } 
})


