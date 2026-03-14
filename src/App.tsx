import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Header } from './components/Header'
import { useThemeStore } from './store/themeStore'
import SearchPage from './pages/SearchPage'
import BookDetailPage from './pages/BookDetailPage'
import AuthorDetailPage from './pages/AuthorDetailPage'
import SubjectBrowsePage from './pages/SubjectBrowsePage'
import FavoritesPage from './pages/FavoritesPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ErrorBoundary key="/"><SearchPage /></ErrorBoundary>} />
        <Route path="/works/:workId" element={<ErrorBoundary key="/works"><BookDetailPage /></ErrorBoundary>} />
        <Route path="/authors/:authorId" element={<ErrorBoundary key="/authors"><AuthorDetailPage /></ErrorBoundary>} />
        <Route path="/subjects/:subject" element={<ErrorBoundary key="/subjects"><SubjectBrowsePage /></ErrorBoundary>} />
        <Route path="/favorites" element={<ErrorBoundary key="/favorites"><FavoritesPage /></ErrorBoundary>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
