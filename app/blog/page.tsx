import { createClient } from "@/utils/supabase/server";
import Post from "./components/Post";

const BlogPage = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase.from('post').select(`
        id, title, description, published_date, image,
        category(name),
        author(first_name, last_name)
        `)

    if (error) {
        console.error(error)
        return (
            <h2>Error al cargar los posts</h2>
        )
    }

    return (
        <div>
            {data?.map(post => <Post key={`home-post-${post.id}`} {...post} />)}
        </div>
    )
}

export default BlogPage;