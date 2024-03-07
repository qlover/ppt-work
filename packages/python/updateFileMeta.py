import os
import subprocess

# 要修改的目录路径
directory_path = 'D:\\qrj\\download\\2.29\\2极简风格'

# 新的备注和作者
new_comments = 'New comments'
new_author = 'New author'

# 遍历目录下的所有文件
for root, dirs, files in os.walk(directory_path):
  for file in files:
    file_path = os.path.join(root, file)

    # 修改文件备注
    subprocess.run(f'powershell -Command "(Get-Item \'{file_path}\').Comments = \'{new_comments}\'"', shell=True)

    # 修改文件作者
    subprocess.run(f'powershell -Command "(Get-Item \'{file_path}\').Author = \'{new_author}\'"', shell=True)
