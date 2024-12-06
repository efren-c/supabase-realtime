import { ThemeSwitcher } from '@/components/theme-switcher';
import styles from './Footer.module.css'

const BlogFooter = () => {
    return (
        <footer className={styles.footer}>
            <p>© 2024 CF Blog. All rights reserved.</p>
            <ThemeSwitcher />

        </footer>
    )
}

export default BlogFooter;