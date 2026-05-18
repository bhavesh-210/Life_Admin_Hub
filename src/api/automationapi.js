// Simple API helper jo kuch tasks fetch karta hai (demo)
export async function getTasks() {
    const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=5',
    );

    // Agar response OK nahi hai to error throw karenge
    if (!response.ok) {
        throw new Error('API Failed');
    }

    // JSON parse karke return karo
    return response.json();
}
