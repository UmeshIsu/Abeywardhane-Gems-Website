import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import './styles/admin.css';

// Auth pages
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Dashboard
import Dashboard from './pages/Dashboard';

// Content modules
import BlogList from './pages/blogs/BlogList';
import BlogForm from './pages/blogs/BlogForm';
import GemList from './pages/gems/GemList';
import GemForm from './pages/gems/GemForm';
import GalleryManager from './pages/gallery/GalleryManager';
import ExhibitionList from './pages/exhibitions/ExhibitionList';
import ExhibitionForm from './pages/exhibitions/ExhibitionForm';
import TestimonialList from './pages/testimonials/TestimonialList';
import TestimonialForm from './pages/testimonials/TestimonialForm';
import AwardList from './pages/awards/AwardList';
import AwardForm from './pages/awards/AwardForm';
import EventList from './pages/events/EventList';
import EventForm from './pages/events/EventForm';
import ServiceList from './pages/services/ServiceList';
import ServiceForm from './pages/services/ServiceForm';
import HeroManager from './pages/hero/HeroManager';

// System
import ContactSubmissions from './pages/contacts/ContactSubmissions';
import MediaLibrary from './pages/media/MediaLibrary';
import GeneralSettings from './pages/settings/GeneralSettings';
import UserList from './pages/users/UserList';
import ActivityLog from './pages/logs/ActivityLog';

export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public auth routes */}
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />

        {/* Protected admin routes */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          {/* Blog */}
          <Route path="blogs" element={<BlogList />} />
          <Route path="blogs/new" element={<BlogForm />} />
          <Route path="blogs/:id" element={<BlogForm />} />

          {/* Gems */}
          <Route path="gems" element={<GemList />} />
          <Route path="gems/new" element={<GemForm />} />
          <Route path="gems/:id" element={<GemForm />} />

          {/* Gallery */}
          <Route path="gallery" element={<GalleryManager />} />

          {/* Exhibitions */}
          <Route path="exhibitions" element={<ExhibitionList />} />
          <Route path="exhibitions/new" element={<ExhibitionForm />} />
          <Route path="exhibitions/:id" element={<ExhibitionForm />} />

          {/* Testimonials */}
          <Route path="testimonials" element={<TestimonialList />} />
          <Route path="testimonials/new" element={<TestimonialForm />} />
          <Route path="testimonials/:id" element={<TestimonialForm />} />

          {/* Awards */}
          <Route path="awards" element={<AwardList />} />
          <Route path="awards/new" element={<AwardForm />} />
          <Route path="awards/:id" element={<AwardForm />} />

          {/* Events */}
          <Route path="events" element={<EventList />} />
          <Route path="events/new" element={<EventForm />} />
          <Route path="events/:id" element={<EventForm />} />

          {/* Services */}
          <Route path="services" element={<ServiceList />} />
          <Route path="services/:id" element={<ServiceForm />} />

          {/* Hero slides */}
          <Route path="hero" element={<HeroManager />} />

          {/* System */}
          <Route path="contacts" element={<ContactSubmissions />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="settings" element={<GeneralSettings />} />
          <Route path="users" element={<UserList />} />
          <Route path="logs" element={<ActivityLog />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
