import {useState} from "react";
//style
import "./style.scss";

function CommentsList({onAddComment, comments, hash}) {
    const [text, setText] = useState("");
    const [color, setColor] = useState("");

    const changeColor = (e) => {
        setColor(e.target.value)
    };

    const changeTextarea = (e) => {
        const value = e.target.value?.trimStart();
        setText(value)
    };

    const addComment = (e) => {
        e.preventDefault();
        if (text?.length <= 2) {
            return;
        }
        onAddComment({
            id: comments?.length + 1,
            hash: 0,
            text: text,
            color: color || "#000000"
        })
        setText("");
        setColor("");
    };

    return (
        <div className="comments">
            <h2>
                Comments #{hash}
            </h2>
            <div className="comments-block">
                {comments.map((comment, index) => (
                    <div
                        key={index}
                        className="comments-element"
                    >
                        <div
                            className="comments-element-color"
                            style={{background: comment?.color}}
                        >
                        </div>
                        <div className="comments-element-text">
                            {comment?.text}
                        </div>
                    </div>
                ))}
            </div>
            <form className="comments-bottom" onSubmit={addComment}>
                <div className="comments-color">
                    <input
                        type="color"
                        onChange={changeColor}
                        value={color || "#000000"}
                    />
                </div>
                <div className="comments-text">
                        <textarea
                            placeholder="Type comment here ..."
                            required={true}
                            minLength={3}
                            value={text}
                            onChange={changeTextarea}
                        />
                </div>
                <div className="comments-btn">
                    <button
                        type="submit"
                        className="btn btn-add"
                    >
                        Add New
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CommentsList;