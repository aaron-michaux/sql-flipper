
# Setup
@see https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658

```bash
# Install nodejs
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash - 
sudo apt -y install nodejs

# Install a bunch of stuff
npm install --save-dev @babel/core@7.10.0 @babel/cli@7.10.0 @babel/preset-env@7.10.0 @babel/preset-react@7.10.0
npm install --save-dev webpack@4.19.1 webpack-cli@3.1.1 webpack-dev-server@3.1.8 style-loader@0.23.0 css-loader@1.0.0 babel-loader@8.0.2
npm install react@16.14.0 react-dom@16.14.0
npm install react-hot-loader
npm install @reduxjs/toolkit
npm install redux
npm install react-redux
npm install --save-dev redux-devtools

# Create the app using the template
npx create-react-app my-app --template redux
```
