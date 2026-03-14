import styles from './Skeleton.module.css'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  variant?: 'rect' | 'circle' | 'text'
  className?: string
}

export function Skeleton({
  width,
  height,
  variant = 'rect',
  className = '',
}: SkeletonProps) {
  const style = {
    width: width ?? '100%',
    height: height ?? (variant === 'text' ? '1rem' : '100%'),
  }

  return (
    <div
      className={`${styles.skeleton} ${styles[variant]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  )
}
