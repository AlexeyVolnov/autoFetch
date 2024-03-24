import {FC,useEffect, useState} from "react";
import Post from "./Post/Post.tsx";
import {T_post} from "../../types.ts";
import style from './PostList.module.scss'



const PostList: FC = () => {

	const [posts, setPosts] = useState<T_post[] | []>([])
	const [currentPage, setCurrentPage] = useState(1)
  const maxAutoFetchPosts = 6
	const [fetching, setFetching] = useState(true)

	const fetchPosts = async () => {
		try {
			const data = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}}`)
			const newPosts = await data.json()
			setPosts((prevState) => [...prevState, ...newPosts])
			setCurrentPage((prevState) => prevState + 1)
		} catch (e) {
			console.log(e)
		}finally {
			setFetching(false)
		}
	}

	const scrollHandler = (e:any) => {
		if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
			setFetching(true)
		}
	}


	useEffect(() => {
		fetching && currentPage < maxAutoFetchPosts && fetchPosts()
	}, [fetching])


	useEffect(() => {
		document.addEventListener("scroll", scrollHandler)
		return function () {
			document.removeEventListener("scroll", scrollHandler)
		}
	}, [])

	return (
			<div className={style.postList}>
				{posts.map(post => <Post key={post.id} post={post}/>)}
				{currentPage >= maxAutoFetchPosts && <button onClick={fetchPosts} className={style.buttonFetchPosts}>показать еще</button>}
			</div>
	)
}

export default PostList