import { Component, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './ErrorBoundary.module.css'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.box}>
            <h2 className={styles.title}>Something went wrong</h2>
            <p className={styles.message}>
              {this.state.error?.message ?? 'An unexpected error occurred.'}
            </p>
            <div className={styles.actions}>
              <button className={styles.retryButton} onClick={this.handleReset}>
                Try again
              </button>
              <Link to="/" className={styles.homeLink} onClick={this.handleReset}>
                ← Back to search
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
