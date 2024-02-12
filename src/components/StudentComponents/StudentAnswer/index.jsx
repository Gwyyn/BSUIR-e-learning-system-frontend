import cl from "./StudentAnswer.module.scss";

import clsx from "clsx";
import styles from "../../Subject/Subject.module.scss";
import {Link} from "react-router-dom";


export const StudentAnswer = (
    {
        answerId,
        subjectId,
        activeTab,
        userId,
        task,
        gradeData,
        children,
        isFullAnswer,
        isLoading
    }
) => {
    if(isLoading){
        return <p>Loading...</p>
    }

    return (
        <div className={clsx(styles.root, {[styles.rootFull]: isFullAnswer})}>
            <div className={styles.wrapper}>
                <div className={styles.indention}>
                    {gradeData &&
                        <div className={clsx(styles.status, {[styles.statusChecked]: gradeData.status ==="checked"})}>
                            {gradeData.status}
                        </div>
                    }
                    {children && <div className={styles.content}>{children}</div>}
                    <div className={clsx(styles.title, {[styles.titleFull]: isFullAnswer})}>
                        {isFullAnswer
                            ? <span></span>
                            : <Link to={`/answers/${subjectId}/${userId}/${activeTab}/${answerId}`}>{task}</Link>}
                    </div>
                </div>
            </div>
        </div>
    );
}
