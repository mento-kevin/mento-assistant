import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import AiConfigPage from './pages/AiConfigPage';
import PlanningPage from './pages/PlanningPage';
import DailyReviewPage from './pages/DailyReviewPage';
import WeeklyReviewPage from './pages/WeeklyReviewPage';
import FinancePage from './pages/FinancePage';
import InspirationPage from './pages/InspirationPage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
import LoginPage from './pages/LoginPage';
import { StorageService } from './services/storage';
import { useUserStore } from './store/useUserStore';
import { useAuthStore } from './store/useAuthStore';
import AIService from './services/ai';

/** 需要已登录才能访问的路由守卫 */
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useUserStore((s) => s.user);
  
  // 检查：要么通过正式登录，要么通过快速体验（有用户昵称）
  const hasAccess = isLoggedIn || (user.nickname && user.nickname.length > 0);
  
  if (!hasAccess) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const currentAccount = useAuthStore((s) => s.currentAccount);

  // 只在用户首次登录或完全没有数据时同步，避免覆盖已设置的资料
  useEffect(() => {
    if (currentAccount) {
      // 检查用户是否已经有数据，避免覆盖
      if (!user.nickname && !user.phone && currentAccount.phone) {
        // 只有用户完全没有数据时才同步
        setUser({
          nickname: currentAccount.nickname || '',
          phone: currentAccount.phone || '',
          isAdmin: currentAccount.isAdmin || false,
        });
      } else if (user.phone !== currentAccount.phone) {
        // 只同步手机号不一致的情况（换账号）
        setUser({
          phone: currentAccount.phone,
          isAdmin: currentAccount.isAdmin,
        });
      }
    }
  }, [currentAccount, user.nickname, user.phone, setUser]);

  // 初始化数据迁移
  useEffect(() => {
    StorageService.migrate();
  }, []);

  // 初始化AI服务
  useEffect(() => {
    if (user.aiConfig.provider && user.aiConfig.apiKey) {
      try {
        AIService.setProvider(
          user.aiConfig.provider,
          user.aiConfig.apiKey,
          user.aiConfig.model,
          user.aiConfig.apiEndpoint,
        );
      } catch (error) {
        console.error('Failed to initialize AI service:', error);
      }
    }
  }, [user.aiConfig.provider, user.aiConfig.apiKey, user.aiConfig.model]);

  return (
    <>
      <Routes>
        {/* 登录页：无需 AppLayout 包裹 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 需要昵称才能访问的应用路由 */}
        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/ai-config" element={<AiConfigPage />} />
        <Route path="/planning" element={<PlanningPage />} />
        <Route path="/daily-review" element={<DailyReviewPage />} />
        <Route path="/weekly-review" element={<WeeklyReviewPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/inspiration" element={<InspirationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<ProfileEditPage />} />
        </Route>

        {/* 兜底：未匹配路由跳首页 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
