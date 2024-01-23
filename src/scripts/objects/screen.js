const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                                <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                <div class="data">
                                    <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1> 
                                    <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
                                </div>
                             </div>` 
        
        this.userProfile.innerHTML += `<div class="followers">
                                            <ul>
                                                <li>Seguidores
                                                    <p>${user.followers.length}</p>
                                                </li>
                                                <li>Seguindo                                                                                                                    
                                                    <p>${user.following.length}</p>
                                                </li>
                                            </ul>
                                        </div>`                                     
        
        let repositoriesItens = '';
        user.repositories.forEach(repo => 
            repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name} 
            <span class="forks"> <i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
            <span class="stars"> ⭐ ${repo.stargazers_count}</span>
            <span class="watchers"> 👀 ${repo.watchers}</span>
            <span class="language">👨‍💻 ${repo.language ?? ''}</span></a></li>`)


        if (user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`

        }
        let userEvents = ''
        user.events.forEach(events => {
            if (events.payload.commits && events.payload.commits.length > 0) {
              const lastCommit = events.payload.commits[events.payload.commits.length - 1];
              userEvents += `<li>${events.repo.name} - ${lastCommit.message}</li>`;
            }
          });
          
          

        if (user.events.length > 0){
            this.userProfile.innerHTML += `<div class="events">
                                                <h2>Eventos</h2>
                                                <ul>${userEvents}</ul>
                                            </div>`
        }
    },
  
    renderNotFound(){
            this.userProfile.innerHTML = `<h3>Usuário não encontrado</h3>`
    }

}

export { screen }
