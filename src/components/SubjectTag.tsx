import styles from './SubjectTag.module.css'

interface SubjectTagProps {
  subject: string
}

export function SubjectTag({ subject }: SubjectTagProps) {
  return <span className={styles.tag}>{subject}</span>
}
