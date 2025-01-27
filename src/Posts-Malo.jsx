import { useState, useEffect } from "react"

function Posts() {
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch('https://jsonplaceholder.typicode.com/1/comments')
            const postList = await res.json() //Podemos darle otro nombre a esta variable
            setPosts(postList)
        }

        fetchPosts()
    }, []) //Como solo se va a ejecutar una vez, el array va vacio. Queremos que nos muestre todos los post cargados a la vez

    useEffect (() => {
        async function fetchUserNames() {
            const res = await fetch('https://jsonplaceholder.typicode.com/users')
            const userList = await res.json()
             // Mapeamos los usuarios por su ID para un acceso rápido
        const userMap = userList.reduce((acc, user) => {
            acc[user.id] = user.name
            return acc
          }, {})
            setUsers(userMap)
        }

        fetchUserNames()
    }, [])

    return (
        
        <div className = "post-list">
            {
                posts.map((post) => (
                    <div className = "post" key={post.id}>
                        <h1>{post.title}</h1>
                        <p><strong>Autor:</strong> {users[post.userId] || "Desconocido"}</p>
                        <p>{post.body}</p>
                    </div>                  
                ))
            }
        </div>
        
    )
}

export default Posts