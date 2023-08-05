from github import Github
import os

def git_push(token, repo_name, file_paths, exclude_folders=None):
    g = Github(token)
    repo = g.get_user().get_repo(repo_name)

    for file_path in file_paths:
        if exclude_folders and any(folder in file_path for folder in exclude_folders):
            continue

        with open(file_path, 'rb') as file:
            content = file.read()
            file_name = os.path.basename(file_path)
            try:
                repo.create_file(file_name, f"Upload {file_name}", content)
                print(f"File {file_name} uploaded successfully.")
            except Exception as e:
                print(f"Failed to upload {file_name}. Error: {e}")

if __name__ == "__main__":
    github_token = "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"
    repository_name = "yelt"
    application_folder_path = "C:\\Users\\maxim\\Desktop\\test"
    exclude_folders = ["node_modules"]

    file_paths = []
    for root, dirs, files in os.walk(application_folder_path):
        for file in files:
            if not file.startswith('.'):  # Пропускаем скрытые файлы
                file_path = os.path.join(root, file)
                file_paths.append(file_path)

    git_push(github_token, repository_name, file_paths, exclude_folders)
