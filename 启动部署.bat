@echo off
chcp 65001 > nul
echo.
echo ================================================
echo    OPC Assistant 部署助手
echo ================================================
echo.
echo 正在准备部署资源...
echo.

:: 打开项目文件夹
echo [1/5] 打开项目文件夹...
explorer "c:\Users\79849\Desktop\opc\opc-assistant"

:: 等待2秒
timeout /t 2 > nul

:: 打开GitHub创建仓库页面
echo [2/5] 打开GitHub创建仓库页面...
start https://github.com/new

:: 等待2秒
timeout /t 2 > nul

:: 打开Vercel注册页面
echo [3/5] 打开Vercel注册页面...
start https://vercel.com/signup

echo.
echo ================================================
echo    准备完成！
echo ================================================
echo.
echo 请按照以下步骤操作：
echo.
echo 1. 在打开的GitHub页面创建仓库（opc-assistant）
echo 2. 复制新仓库的URL
echo 3. 回到GitHub仓库页面，点击"uploading an existing file"
echo 4. 上传项目文件（不包括node_modules）
echo 5. 去Vercel导入GitHub仓库并部署
echo.
echo 详细步骤请查看：
echo 🚀_一键部署指南.txt
echo.
pause
