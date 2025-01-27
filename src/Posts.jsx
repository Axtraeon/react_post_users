import { useState, useEffect } from "react";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState({}); // Cambiar a un objeto vacío para almacenar el userMap

    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts");
            const postList = await res.json(); // Renombrar aquí si lo deseas
            setPosts(postList);
        }

        fetchPosts();
    }, []); // Este efecto se ejecuta una sola vez

    useEffect(() => {
        async function fetchUserNames() {
            const res = await fetch("https://jsonplaceholder.typicode.com/users");
            const userList = await res.json(); // Cambiar el nombre para evitar conflictos
            // Crear un objeto mapeado por ID
            const userMap = userList.reduce((acc, user) => {
                acc[user.id] = user.name;
                return acc;
            }, {});
            setUsers(userMap); // Guardar el objeto en el estado
        }

        fetchUserNames();
    }, []); // Este efecto también se ejecuta una sola vez

    return (
        <div className="post-list">
            {posts.map((post) => (
                <div className="post" key={post.id}>
                    <h1>{post.title}</h1>
                    <p>
                        <strong>Autor:</strong> {users[post.userId] || "Desconocido"}
                    </p>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
}

export default Posts;
