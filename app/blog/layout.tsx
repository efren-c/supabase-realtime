import { ReactElement } from "react";
import BlogFooter from "./components/Footer";
import BlogHeader from "./components/Header";

const BlogLayout = ({ children }: { children: ReactElement }) => {
    return (
        <>
            <BlogHeader />
            <main> {children} </main>
            <BlogFooter />
        </>
    )
}

export default BlogLayout;