import { Link } from 'react-router-dom'
import styles from './SubjectTag.module.css'

interface SubjectTagProps {
  subject: string
}

export function SubjectTag({ subject }: SubjectTagProps) {
  return (
    <Link
      to={`/subjects/${encodeURIComponent(subject)}`}
      className={styles.tag}
    >
      {subject}
    </Link>
  )
}
