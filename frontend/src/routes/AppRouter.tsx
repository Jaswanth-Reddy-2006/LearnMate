import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import DashboardPage from '../pages/DashboardPage'
import CatalogPage from '../pages/CatalogPage'
import LearnPage from '../pages/LearnPage'
import LessonPlayerPage from '../pages/LessonPlayerPage'
import QuizPage from '../pages/QuizPage'
import CommunityPage from '../pages/CommunityPage'
import VideoStudioPage from '../pages/VideoStudioPage'
import ProfilePage from '../pages/ProfilePage'
import ModerationPage from '../pages/ModerationPage'
import OnboardingPage from '../pages/OnboardingPage'
import MainLayout from '../components/layout/MainLayout'
import NotFoundPage from '../pages/NotFoundPage'

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="onboarding" element={<OnboardingPage />} />
      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="learn" element={<LearnPage />} />
        <Route path="lesson/:lessonId" element={<LessonPlayerPage />} />
        <Route path="quiz/:lessonId" element={<QuizPage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="studio" element={<VideoStudioPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="moderation" element={<ModerationPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
