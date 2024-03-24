import {FC, memo} from "react";
import style from './Post.module.scss'
import {T_post} from "../../../types.ts";

interface IPostProps {
	post: T_post
}


const Post: FC<IPostProps> = ({post}) => {

	return (
			<div className={style.post}>
				<div className={style.title}>{post.title}</div>
				<div>{post.id}</div>
				<div className={style.body}>{post.body}</div>
			</div>
	)
}

export default memo(Post)