npm run deploy -- -m "Deploy React app to GitHub Pages"
git add .
git commit -m "first commit"
git branch -M main
git remote rm origin
git remote add origin https://github.com/sonuv2201/To-do-List-Project.git
git push -u origin main