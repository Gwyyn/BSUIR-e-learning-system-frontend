// GradesTable.jsx
import React from 'react';
import "./GradesTable.module.scss";

export const GradesTable = ({ gradesData }) => {
    console.log(gradesData);

    const renderMarks = (subjectData, subject, lessonType) => {
        const marks = subjectData[subject][lessonType];
        return marks.map((mark, index) => <td key={index}>{mark}</td>);
    };

    const renderAverageMark = (subjectData, subject) => {
        const marks = subjectData[subject].LR.concat(
            subjectData[subject].LK,
            subjectData[subject].PZ
        );
        const averageMark =
            marks.reduce((sum, mark) => sum + mark, 0) / marks.length || 0;
        return <td colSpan="10" rowSpan="3">{averageMark.toFixed(2)}</td>;
    };

    const renderMarkCells = (subjectData, subject, lessonType) => {
        const marks = subjectData[subject][lessonType];
        const emptyCells = Array.from({ length: 10 - marks.length }, (_, index) => (
            <td key={index} className="empty-cell"></td>
        ));

        return [...marks.map((mark, index) => (
            <td key={index} className="mark-cell">
                {mark}
            </td>
        )), ...emptyCells];
    };

    const renderTable = () => {
        const subjects = Object.keys(gradesData);

        return subjects.map((subject, index) => (
            <React.Fragment key={index}>
                <tr>
                    <td rowSpan="3">{gradesData[subject].title}</td>
                    <td>LR</td>
                    {renderMarkCells(gradesData, subject, 'LR')}
                    {renderAverageMark(gradesData, subject)}
                </tr>
                <tr>
                    <td>LK</td>
                    {renderMarkCells(gradesData, subject, 'LK')}
                </tr>
                <tr>
                    <td>PZ</td>
                    {renderMarkCells(gradesData, subject, 'PZ')}
                </tr>
            </React.Fragment>
        ));
    };

    return (
        <table>
            <thead>
            <tr>
                <th>Название предмета</th>
                <th>Тип</th>
                <th colSpan="10">Отметки</th>
                <th>Средняя отметка</th>
            </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
        </table>
    );
};
