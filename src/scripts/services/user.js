import { baseUrl, maxItems } from "/src/scripts/variables.js";

async function getUser(userName){
    const response = await fetch(`${baseUrl}/${userName}`);
    return await response.json()
}

async function getFollower(userName){
    const response = await fetch(`${baseUrl}/${userName}/followers`)
    return await response.json()
}

async function getFollowing(userName){
    const response = await fetch(`${baseUrl}/${userName}/following`)
    return await response.json()
}

async function userEvents(userName){
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${maxItems}`)
    return await response.json()
}

export { getUser, getFollower, getFollowing, userEvents }
