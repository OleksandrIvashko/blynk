import {useEffect, useMemo, useState} from "react";
import CommentsList from "../CommentsList/CommentsList";
//style
import "./style.scss";

function ListItems() {
    const [list, setList] = useState(localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : []);
    const [itemTitle, setItemTitle] = useState("");
    const activeItem = useMemo(() => list.find(el => el.isActive), [list])

    const onChangeInput = (e) => {
        const value = e.target.value?.trimStart();
        setItemTitle(value);
    };

    const addItem = (e) => {
        e.preventDefault();
        if (itemTitle?.length <= 2) {
            return;
        }

        setList([
            ...list,
            {
                id: ( Math.random() * 1000),
                title: itemTitle,
                count: 0,
                comments: [],
                commentHash: Math.floor(Math.random() * 100000000),
                isActive: false
            }
        ]);
        setItemTitle("");
    };

    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(list))
    }, [list])

    const deleteItem = (item) => {
        const _list = list.filter(el => el?.id !== item?.id);
        setList(_list);
    };

    const changeActiveItem = (el) => {
        setList((prevList) => {
            return prevList.map(item => {
                item.isActive = item?.id === el?.id
                return item;
            })
        })
    };

    const onAddComment = (comment) => {
        setList((prevList) => {
            return prevList.map((item) => {
                if (item?.id === activeItem?.id) {
                    item.comments = [
                        ...item.comments,
                        comment
                    ];
                }
                return item;
            })
        });
    };

    return (
        <div className="list">
            <div className="list-task">
                <h2>
                    Items
                </h2>
                <form className="list-top" onSubmit={addItem}>
                    <div className="list-input">
                        <input
                            type="text"
                            placeholder="Type name here ..."
                            onChange={onChangeInput}
                            value={itemTitle}
                            required={true}
                            minLength={3}
                        />
                    </div>
                    <div className="list-btn">
                        <button
                            type="submit"
                            className="btn"
                        >
                            Add New
                        </button>
                    </div>
                </form>
                <div className="list-content">
                    {list.map(el => (
                        <div
                            key={el.id}
                            className={`list-item ${el?.isActive ? "active" : ""}`}
                            onClick={() => changeActiveItem(el)}
                        >
                            <div className="list-item-title">
                                {el?.title}
                            </div>
                            <div className="list-item-options">
                                <div className="list-item-options-count">
                                    {el?.comments?.length || 0}
                                </div>
                                <div className="list-item-options-btn">
                                    <button
                                        className="btn btn-delete"
                                        onClick={() => deleteItem(el)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {activeItem ?
                <CommentsList onAddComment={onAddComment} hash={activeItem.commentHash} comments={activeItem.comments}/>
                : ""
            }
        </div>
    )
}

export default ListItems;