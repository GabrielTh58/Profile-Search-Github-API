import { getUser, getFollower, getFollowing, userEvents } from "/src/scripts/services/user.js"
import { getRepositories } from "/src/scripts/services/repositories.js"

import { user } from "/src/scripts/objects/user.js"
import { screen } from "/src/scripts/objects/screen.js"


document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value;
    if(validateEmptyInput(userName)) return
    getUserData(userName);
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value // retorna o valor que esta no input
    const key = e.which || e.keyCode // pega o evento(chave) da tecla
    const isEnterkeyPressed = key === 13

    if(isEnterkeyPressed){
        validateEmptyInput(userName)
        getUserData(userName)
    }
})

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert("Preencha o campo com nome do usuário do GitHub")
        return true
    }
}

async function getUserData(userName){
    const userResponse = await getUser(userName)
    const repositoriesResponse = await getRepositories(userName)
    console.log(repositoriesResponse);

    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    
    user.followers = await getFollower(userName)
    user.following = await getFollowing(userName)
    user.events = await userEvents(userName);

    screen.renderUser(user,repositoriesResponse)
 
    console.log(user);
}



