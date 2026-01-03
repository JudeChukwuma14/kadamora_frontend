import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';
import { LazyErrorBoundary, EnhancedPageLoader } from './utils/lazyLoading';
import RequireAuth from '@components/guards/RequireAuth';
import RedirectIfAuthenticated from '@components/guards/RedirectIfAuthenticated';

// load layouts
import AuthLayout from './components/container/Auth/AuthLayout'
import DashboardLayout from './components/container/DashboardLayout'

// lazy load all pages
const Home = lazy(() => import('@pages/LandingPage/Home/Home'))
const About = lazy(() => import('@pages/LandingPage/About/AboutUs'))
const Timeline = lazy(() => import('@pages/LandingPage/Timeline'))
const ContactUs = lazy(() => import('@pages/LandingPage/ContactUs'));
const UnAuthPropertyListing = lazy(() => import('@pages/LandingPage/PropertyListing'));
const UnAuthPropertyView = lazy(() => import('@pages/LandingPage/PropertyView'));

// auth
const Login = lazy(() => import('@pages/Auth/Login'))
const Signup = lazy(() => import('@pages/Auth/Signup'))
const SignupVerify = lazy(() => import('@pages/Auth/SignupVerify'))
const SignupVerified = lazy(() => import('@pages/Auth/SignupVerified'))
const ForgotPassword = lazy(() => import('@pages/Auth/ForgotPassword'))
const ResetPassword = lazy(() => import('@pages/Auth/ResetPassword'))

// dashboard
const Dashboard = lazy(() => import('@pages/Dashboard/Home/Dashboard'))
const PropertyListing = lazy(() => import('@pages/Dashboard/PropertyListing/Home/PropertyManagementPage'))
const PropertyManagement = lazy (() => import('@pages/Dashboard/PropertyManagement/PropertyManagementRoot'))
const PropertyView = lazy (() => import('@pages/Dashboard/PropertyListing/PropertyView/PropertyView'))
const MyListing = lazy(() => import('@pages/Dashboard/PropertyListing/MyListing/MyListing'));
const NotFound = lazy(() => import('@pages/Misc/NotFound'));
const MySaved = lazy(() => import('@pages/Dashboard/PropertyListing/SavedProperty/MyListing'));



// loading fallback
function PageLoader() {
    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600 font-medium">Loading page...</span>
            </div>
        </div>
    );
}

export default function AppRoutes(){
    return(
        <LazyErrorBoundary fallback={<EnhancedPageLoader/>}>
             <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="timeline" element={<Timeline />} />
                    <Route path="contact" element={<ContactUs />} />
                    <Route path="property-listing" element={<UnAuthPropertyListing />} />
                    <Route path="property-view/:id" element={<UnAuthPropertyView />} />

                    <Route
                        path="auth"
                        element={
                            <RedirectIfAuthenticated>
                                <AuthLayout />
                            </RedirectIfAuthenticated>
                        }
                    >
                        <Route index element={<Login />} />
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="signup/verify" element={<SignupVerify />} />
                        <Route path="signup/verified" element={<SignupVerified />} />
                        <Route path="forgot-password" element={<ForgotPassword />} />
                        <Route path="reset-password/:code" element={<ResetPassword />} />
                    </Route>
                    <Route
                        path="dashboard"
                        element={
                            <RequireAuth>
                                <DashboardLayout />
                             </RequireAuth>
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="home" element={<Dashboard />} />
                        <Route path="property-listing" element={<PropertyListing />} />
                        <Route path="property-management/*" element={<PropertyManagement />} />
                        <Route path="my-listing" element={<MyListing />} />
                        <Route path="property-view/:id" element={<PropertyView />} />
                        <Route path="saved" element={<MySaved />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </LazyErrorBoundary>
    )
}