export async function getTasks() {
    const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=5',
    );

    if (!response.ok) {
        throw new Error('API Failed');
    }

    return response.json();
}
