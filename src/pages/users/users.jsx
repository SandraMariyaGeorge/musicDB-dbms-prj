import React from 'react';
import '../table.css';
export default function User() {
    return (
        <div >
            <table>
                <thead>
                    <tr>
                        <th>USER ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>SUBSCRIPTION PLAN</th>
                        <th>JOIN DATE</th>
                        <th>BIRTH DATE</th>
                        <th>COUNTRY</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Add table rows here */}
                </tbody>
            </table>
        </div>
    );
}
