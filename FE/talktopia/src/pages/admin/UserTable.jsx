// UserTable.js
import React from 'react';
import '../../css/UserTable.css'

function UserTable({ user }) {
    return (
        <table className="user-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Profile Image</th>
                    <th>Language</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{user.userId}</td>
                    <td>{user.userName}</td>
                    <td>{user.userEmail}</td>
                    <td>
                        <img src={user.userProfileImgUrl} alt="Profile" width="50" />
                    </td>
                    <td>{user.userLan}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default User
