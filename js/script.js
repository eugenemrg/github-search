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

    function fetchUserDetails() {
        fetch(`https://api.github.com/users/${searchInput.value}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }

    function fetchUserRepoDetails(url) {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }
})