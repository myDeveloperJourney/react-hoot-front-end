import { useState, useEffect } from 'react';
import CommentForm from '../CommentForm/CommentForm';
import * as hootService from '../../services/hootService';
// import { show } from '../../services/hootService'; // best way to import
import { useParams } from 'react-router';

const HootDetails = (props) => {
    const [hoot, setHoot] = useState(null);
    const { hootId } = useParams();

    const handleAddComment = async (commentFormData) => {
        const newComment = await hootService.createComment(
            hootId, 
            commentFormData
        );
        
        setHoot({
            ...hoot, 
            comments: [...hoot.comments, newComment]
        });
    };
    
    useEffect(() => {
        const fetchHoot = async () => {
            const hootData = await hootService.show(hootId);
            setHoot(hootData);
        }
        fetchHoot(); // this will run when the effect function runs
        // the effect function runs when we have a hootId

    }, [hootId]);

    if(!hoot) return <main>Loading ... </main> // show loading while hoot is getting requested

    return (
        <main>
            <section>
                <header>
                    <p>{hoot.category.toUpperCase()}</p>
                    <h1>{hoot.title}</h1>
                    <p>
                        {`${hoot.author.username} posted on 
                          ${new Date(hoot.createdAt).toLocaleDateString()}`}
                    </p>
                </header>
                <p>{hoot.text}</p>
            </section>
            <section>
                <h2>Comments</h2>
                
                <CommentForm 
                    handleAddComment={handleAddComment} 
                />

                {!hoot.comments.length && <p>There are no comments</p>}
                {hoot.comments.map((comment) => (
                    <article key={comment._id}>
                        <header>
                            <p>
                                {`${comment.author.username} posted on
                                    ${new Date(comment.createdAt).toLocaleDateString()}
                                `}
                            </p>
                        </header>
                        <p>{comment.text}</p>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default HootDetails;