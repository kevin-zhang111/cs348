import { useState, useEffect } from "react"

export default function Users() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4005/api/Users')
            const json = await response.json()
            setUsers(json)
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user, index) => (
                    <li key={index} style={{ paddingBottom: '25px' }}>
                        <div>Username: {user.username}</div>
                        <div>Most Listened Song: {user.most_listened_song}</div>
                        <div>Most Listened Artist: {user.most_listened_artist}</div>
                    </li>
                ))}
            </ul> 
        </div>
    );
}