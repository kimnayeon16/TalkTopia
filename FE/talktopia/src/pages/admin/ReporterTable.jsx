import React from 'react';
import './ReporterTable.css';

const ReporterTable = ({ data }) => {
    return (
        <table className="reporter-table">
            <thead>
                <tr>
                    <th>DB No</th>
                    <th>신고자</th>
                    <th>신고 당한 사람</th>
                    <th>신고 내용</th>
                    <th>생성 시간</th>
                    <th>방 ID</th>
                </tr>
            </thead>
            <tbody>
                {data.map((entry) => (
                    <tr key={entry.ruId}>
                        <td>{entry.ruId}</td>
                        <td>{entry.ruReporter}</td>
                        <td>{entry.ruBully}</td>
                        <td>{entry.ruBody}</td>
                        <td>{entry.ruCreateTime}</td>
                        <td>{entry.ruVrSession}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ReporterTable;
