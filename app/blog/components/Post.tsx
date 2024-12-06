import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

import styles from './Post.module.css'
import { FC } from "react";


type PostProps = {
    id: string;
    title: string;
    image: string;
    published_date: string;
    description: string;
    author: {
        first_name: string;
        last_name: string;
    };
    category: {
        name: string;
    };
};

const Post: FC<PostProps> = ({ image, title, id, published_date: publishedDate, author, category, description }) => {
    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <Image src={image} alt={title} width={200} height={200} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className={styles.image} />
            </div>
            <div className={styles.rightContainer}>
                <Link href={`/blog/${id}`} >
                    <h4 className={styles.title}>{title}</h4>
                </Link>

                <div className={styles.tagsContainer}>
                    <span className={styles.tagLabel}>
                        Date:
                        <span className={styles.tagValue}>
                            {dayjs(publishedDate).format('DD/M/YYYY')}
                        </span>
                    </span>

                    <span className={styles.tagLabel}>
                        Author:
                        <span className={styles.tagValue}>
                            {`${author.first_name} ${author.last_name}`}
                        </span>

                        <span className={styles.tagLabel}>
                            Category:
                            <span className={styles.tagValue}>
                                {category.name}
                            </span>
                        </span>
                    </span>
                </div>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Post;