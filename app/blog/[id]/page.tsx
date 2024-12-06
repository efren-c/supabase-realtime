import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Markdown from "react-markdown";

const BlogDetail = async ({ params }: { params: Promise<{ id: number }> }) => {
    const id = (await params).id

    const supabase = await createClient()

    const { data, error } = await supabase.from('post').select(`
        title, content, published_date, image,
        category(name),
        author(first_name, last_name)
        `).eq("id", id).single()

    if (error) {
        console.error(error)
        return (
            <h2>Error al cargar el post</h2>
        )
    }

    return (
        <div>
            {data?.title}
            <div>
                <Image src={data.image} alt={data.title} width={500} height={200} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
            <Markdown>
                {data?.content}
            </Markdown>
        </div>
    )
}

export default BlogDetail;