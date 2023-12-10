'use server';

export default async function postLogin({ username, password }) {
    const result = await fetch(`${process.env.API_HOST}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
        cache: 'no-store'
    });

    if (result.status !== 200) {
        const body = await result.text();

        throw new Error(body);
    }

    const body = await result.json();

    return body;
}