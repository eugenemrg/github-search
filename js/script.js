document.addEventListener('DOMContentLoaded', e => {

    const searchForm = document.getElementById('search-form')
    const searchInput = document.getElementById('username-input')
    const searchOptions = document.querySelector('.search-options')
    const userButton = document.querySelector('.search-user-option')
    const repoButton = document.querySelector('.search-repository-option')

    searchInput.addEventListener('input', e => {
        if (searchInput.value.trim() !== '') {
            searchOptions.style.display = 'block'
        } else {
            searchOptions.style.display = 'none'
        }
    })

    userButton.addEventListener('click', e => {
        if(searchInput.value.trim() !== ''){
            fetchUserDetails()
        }
    })

    repoButton.addEventListener('click', e => {
        if(searchInput.value.trim() !== ''){
            fetchUserRepoDetails(`https://api.github.com/users/${searchInput.value.trim()}/repos`)
        }
    })

    searchForm.addEventListener('submit', e => {
        e.preventDefault()
        fetchUserDetails()
    })
})

function fetchUserDetails() {
    const searchInput = document.getElementById('username-input')

    fetch(`https://api.github.com/users/${searchInput.value}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            populateUserDetails(data)
        })
}

function fetchUserRepoDetails(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
}

function hideAllContainers() {
    document.querySelector('.main-container').style.display = 'none'
    document.querySelector('.users-container').style.display = 'none'
}

function resetCardsContainer() {
    document.querySelector('.user-cards-container').textContent = ''
    document.querySelector('.section-title').textContent = 'Searching for user...'
}

function populateUserDetails(userObject){
    // Removes existing container items and changes test to default
    hideAllContainers()
    resetCardsContainer()

    let sectionTitle = document.querySelector('.section-title')
    let cardsContainer = document.querySelector('.user-cards-container')
    cardsContainer.textContent = ''

    if(userObject.message === 'Not Found'){
        console.log('No user');
        sectionTitle.textContent = 'No user found!'
        document.querySelector('.users-container').style.display = 'block'
    }else{
        let card = document.createElement('div')
        card.className = 'user-card'

        let cardImage = document.createElement('img')
        cardImage.className = 'user-image'
        cardImage.src = userObject.avatar_url
        cardImage.alt = 'User avatar image'

        let cardContent = document.createElement('div')
        cardContent.className = 'user-card-content'

        let userName = document.createElement('p')
        userName.className = 'user-name'
        userName.textContent = userObject.login

        let followDetails = document.createElement('div')
        followDetails.className = 'follow-extra'

        let followers = document.createElement('p')
        followers.className = 'follow-detail'
        followers.textContent = `${userObject.followers} followers`

        let following = document.createElement('p')
        following.className = 'follow-detail'
        following.textContent = `${userObject.following} following`

        followDetails.appendChild(followers)
        followDetails.appendChild(following)

        let userLinks = document.createElement('div')
        userLinks.className = 'user-extra'

        let userGitHubLink = document.createElement('a')
        userGitHubLink.className = 'user-button'
        userGitHubLink.textContent = 'Go to GitHub'
        userGitHubLink.href = userObject.html_url

        let userReposLink = document.createElement('a')
        userReposLink.className = 'user-button'
        userReposLink.textContent = 'Show repositories'

        userLinks.appendChild(userGitHubLink)
        userLinks.appendChild(userReposLink)

        cardContent.appendChild(userName)
        cardContent.appendChild(followDetails)
        cardContent.appendChild(userLinks)

        card.appendChild(cardImage)
        card.appendChild(cardContent)

        cardsContainer.appendChild(card)
        sectionTitle.textContent = `${document.getElementById('username-input').value}'s profile`
        document.querySelector('.users-container').style.display = 'block'
    }
}