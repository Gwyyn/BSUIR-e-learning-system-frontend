import cl from "./CreateTypeOfLesson.module.scss";


export const CreateTypeOfLesson = ({selectedLessonType, handleSelectChange, handleCreateType, lessonTypes}) => {
    return (
        <div className={cl.createTypeLesson}>
            <div className={cl.dropdown}>
                <select value={selectedLessonType} onChange={handleSelectChange} className={cl.dropdownList}>
                    <option value="" className={cl.dropdownListOption}>Выберите тип занятия</option>
                    <option value="PZ" className={cl.dropdownListOption}>Практическое занятие</option>
                    <option value="LR" className={cl.dropdownListOption}>Лабораторная работа</option>
                    <option value="LK" className={cl.dropdownListOption}>Лекционное занятие</option>
                    <option value="KR" className={cl.dropdownListOption}>Контрольная работа</option>
                </select>
            </div>

            &nbsp;
            &nbsp;
            <button onClick={handleCreateType} className={cl.chooseBtn}>
                Создать тип занятия
            </button>
        </div>
    );
};