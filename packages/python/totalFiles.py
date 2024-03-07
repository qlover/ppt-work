import os

def count_ppt_files(directory):
    ppt_count = 0
    # 遍历目录及其子目录
    for root, dirs, files in os.walk(directory):
        # 统计当前目录下的PPT文件数量
        ppt_count += len([file for file in files if file.endswith('.ppt') or file.endswith('.pptx')])
    return ppt_count

# 指定目录路径
directory_path = 'D:\\qrj\\download'

# 统计指定目录及其子目录下所有PPT文件的总数
ppt_count = count_ppt_files(directory_path)
print("Total number of .ppt and .pptx files in the directory and its subdirectories:", ppt_count)
