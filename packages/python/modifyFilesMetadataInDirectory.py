import os
from pptx import Presentation


def modify_pptx_metadata(file_path):
    try:
        print(file_path)
        # 获取文件名（不包含扩展名）作为标题
        file_name = os.path.splitext(os.path.basename(file_path))[0]
        prs = Presentation(file_path)
        prs.core_properties.title = file_name
        # prs.core_properties.title = "晓橙"
        prs.core_properties.author = "晓橙"
        prs.core_properties.comments = "晓橙"
        prs.save(file_path)
    except Exception as e:
        print(f"Error occurred while updating metadata for {file_path}: {e}")


def modify_metadata_in_directory(directory_path):
    for root, dirs, files in os.walk(directory_path):
        for file_name in files:
            if file_name.endswith(".pptx"):
                file_path = os.path.join(root, file_name)
                modify_pptx_metadata(file_path)


# 示例用法
directory_path = "D:\\qrj\\download\\3.1"
modify_metadata_in_directory(directory_path)
