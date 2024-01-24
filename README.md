# wieting-frontmatter-CMS 

This repository is the new home for https://Wieting.TamaToledo.com.  It's a Hugo website with NO `npm` wrapper and it will eventually use the [FrontMatter CMS](https://frontmatter.codes) _VSCode_ extension for content editing.  This repo, https://github.com/Summitt-Services/wieting-frontmatter-CMS, was built from https://github.com/SummittServices/wieting-staticCMS and https://github.com/SummittDweller/wieting-npm which may soon be archived.  

The old `README.md` files from predecessor projects are preserved here as `old-Netlify-version-README.md` and `old-wieting-npm-README.md` for reference.  

## Local Development  

To run this project locally you should clone it (or `git pull`) and then from the project root directory run `hugo server`.  This should generate a local `http://localhost:1313` copy of the website for evaluation and debugging.  

# Deploy to AWS Amplify

Pushing this change should trigger my first build to https://main.d2hqwupnoud3ca.amplifyapp.com/.  

# Not So Hot

Well, the first build of the site referenced above was pretty bad, so I followed the advice provided at https://gohugo.io/hosting-and-deployment/hosting-on-aws-amplify/ and set my build image to use Hugo:latest.  Let's see if that helps.  





