import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import cl from './Home.module.scss';

import {Post} from '../../components';
import {TagsBlock} from '../../components';

import {fetchPosts, fetchTags} from "../../redux/slices/posts";

export const Home = () => {
    const dispatch = useDispatch();
    const useData = useSelector(state => state.auth.data)
    const {posts, tags} = useSelector(state => state.posts)

    const isPostsLoading = posts.status === 'loading';
    const isTagsLoading = tags.status === 'loading';

    React.useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchTags())
    }, [])


    return (
        <>
            <div className={cl.gridContainer}>
                <div className={cl.postContainer}>
                    {(posts.items).map((obj, index) =>
                        isPostsLoading ? (
                            <Post key={index} isLoading={true}/>
                        ) : (
                            <Post
                                id={obj._id}
                                title={obj.title}
                                imageUrl={obj.imageUrl ? `http://localhost:3001${obj.imageUrl}`: ''}
                                // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                                user={obj.user}
                                createdAt={obj.createdAt}
                                viewsCount={obj.viewsCount}
                                tags={obj.tags}
                                isEditable={useData?.role === 'admin'}
                            />
                        )
                    )}
                </div>
                <div className={cl.sidebar}>
                    <TagsBlock items={tags.items} isLoading={isTagsLoading}/>
                </div>
            </div>
        </>
    );
};