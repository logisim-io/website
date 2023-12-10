'use server';

export default async function postSignup({ username, password, confirmPassword }) {
    const result = await fetch(`${process.env.API_HOST}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, confirmPassword }),
        cache: 'no-store'
    });

    if (result.status !== 200) {
        const body = await result.text();

        throw new Error(body);
    }

    const body = await result.json();

    return body;
}