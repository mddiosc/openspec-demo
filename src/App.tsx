import { Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import BookDetailPage from './pages/BookDetailPage'
import AuthorDetailPage from './pages/AuthorDetailPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/works/:workId" element={<BookDetailPage />} />
      <Route path="/authors/:authorId" element={<AuthorDetailPage />} />
    </Routes>
  )
}
