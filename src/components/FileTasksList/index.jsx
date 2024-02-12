import cl from "./FileTasksList.module.scss";
import {DeleteIcon} from "../icons/DeleteIcon";


export const FileTasksList = (
    {
        lessonData,
        activeTab,
        handleDownloadClick,
        getFileIcon,
        userData,
        dataSubject,
        handleDeleteFile
    }
) => {
    return (
        <>
            {lessonData.items
                .filter((lesson) => lesson.type === activeTab)
                .map((lesson, id) => (
                    <div key={id}>
                        {lesson.file_path.map((filePath, id) => (
                            <div className={cl.fileWrapper}>
                                <a href={filePath} download onClick={(event) => {
                                    event.preventDefault();
                                    handleDownloadClick(filePath)
                                }} key={id}
                                >
                                    <div className={cl.programFile}>
                                        {getFileIcon()}{' '}
                                        {filePath.split('/').pop()}
                                    </div>
                                </a>
                                {userData?._id === dataSubject.user._id &&
                                    <>
                                        &nbsp;&nbsp;
                                        <DeleteIcon onClick={() => handleDeleteFile(lesson._id, filePath)}>
                                            Удалить
                                        </DeleteIcon>
                                    </>
                                }
                            </div>
                        ))}
                    </div>
                ))}
        </>
    );
};