import { writable } from 'svelte/store';


let jwtToken = ''
if (typeof window !== 'undefined') {
    jwtToken = JSON.parse(localStorage.getItem('token'))
}


export const token = writable(jwtToken);


if (typeof window !== 'undefined') {

    token.subscribe(value => {
        console.log(value)
        localStorage.setItem('token', JSON.stringify(value))
        console.log(JSON.parse(localStorage.getItem('token')))
    })

}

export const userName = writable('');