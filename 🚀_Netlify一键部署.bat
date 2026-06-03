@echo off
chcp 65001 > nul
cls
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                      OPC Assistant 部署助手                    ║
echo ║                           （无需 GitHub）                        ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo [1/3] 打开构建文件夹（dist）...
explorer "c:\Users\79849\Desktop\opc\opc-assistant\dist"
timeout /t 1 > nul
echo.
echo [2/3] 打开 Netlify 部署页面...
start https://app.netlify.com
timeout /t 1 > nul
echo.
echo ════════════════════════════════════════════════════════════════
echo.
echo ✅ 准备完成！
echo.
echo 请按照以下步骤操作：
echo.
echo 1. 在 Netlify 页面注册/登录（用邮箱即可）
echo 2. 点击 "Add new site" -^> "Deploy manually"
echo 3. 把打开的 dist 文件夹里的文件拖拽到 Netlify 页面
echo 4. 等待上传（1-2分钟）
echo 5. 网站上线！🎉
echo.
echo ════════════════════════════════════════════════════════════════
echo.
pause
