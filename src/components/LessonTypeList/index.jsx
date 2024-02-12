import cl from "./LessonTypeList.module.scss";
import {DeleteIcon} from "../icons/DeleteIcon";


const lessonTypeOptions = [
    { value: 'PZ', label: 'Практическое занятие' },
    { value: 'LR', label: 'Лабораторная работа' },
    { value: 'LK', label: 'Лекционное занятие' },
    { value: 'KR', label: 'Контрольная работа' },
];

export const LessonTypeList = (
    {
        id,
        lessonTypes,
        activeTab,
        handleTabChange,
        userData,
        dataSubject,
        handleDeleteType
    }
) => {
    const getLabelByValue = (value) => {
        const matchingOption = lessonTypeOptions.find((option) => option.value === value);
        return matchingOption ? matchingOption.label : value;
    };

    return (
        <div className={cl.LessonTypeListWrapper}>
                {lessonTypes.map((type, index) => (
                    <div key={index} className={cl.LessonTypeList}>
                        <input
                            type="radio"
                            id={type}
                            name="lessonType"
                            value={type}
                            checked={activeTab === type}
                            onChange={() => handleTabChange(type)}
                        />
                        <label htmlFor={type}>{getLabelByValue(type)}</label>
                        {userData?._id === dataSubject.user._id &&
                            <DeleteIcon onClick={() => handleDeleteType(id, type)} className="button-delete">
                                Удалить
                            </DeleteIcon >
                        }
                    </div>
                ))}
        </div>
    );
};