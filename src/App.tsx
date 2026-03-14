import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import SearchPage from './pages/SearchPage'
import BookDetailPage from './pages/BookDetailPage'
import AuthorDetailPage from './pages/AuthorDetailPage'
import SubjectBrowsePage from './pages/SubjectBrowsePage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ErrorBoundary key="/"><SearchPage /></ErrorBoundary>} />
      <Route path="/works/:workId" element={<ErrorBoundary key="/works"><BookDetailPage /></ErrorBoundary>} />
      <Route path="/authors/:authorId" element={<ErrorBoundary key="/authors"><AuthorDetailPage /></ErrorBoundary>} />
      <Route path="/subjects/:subject" element={<ErrorBoundary key="/subjects"><SubjectBrowsePage /></ErrorBoundary>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
