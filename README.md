Filmų saitas

QuickSetup:
### Launching the project

1. Once you’re inside the project directory, right click on any file or folder within and choose

![Screenshot of a first step.](https://code.visualstudio.com/assets/docs/terminal/basics/open-in-terminal-command.png)

2. A terminal should start, inside the terminal make sure that the directory is inside the downloaded repo, if that is the case, type:

  ```sh
  npm i
  ```

  > Hit **Enter**. This will install all the necessary libraries and files for this project. 

3. When all files have been downloaded, you should be able to type again inside the terminal, type:

  ```sh
  npm run dev
  ```

  > This command will run the React project, you should see **VITE vX.X.XX  ready in XXX ms**

4. Open the localhost link (Either copy it or `ctrl + click` / `cmd + click`)

![Screenshot of a first step.](https://flaviocopes.com/images/vite-react-app/Untitled%205.png)

5. VOILA!!! You have a running and fully working project!

Context

This project started as a way to practice working with APIs, filtering data, and developing a user-friendly interface.
What did I set out to build?

The goal was to create an app where users can browse and filter movies based on their interests.
Challenges & Learning Experiences

One challenge was managing multiple filters and making sure the app stayed fast and responsive, even with paginated data. I learned a lot about handling API calls efficiently and managing state with different UI elements.
Tools and Technologies

I chose React because it’s well-suited for building dynamic interfaces, and create-react-app to jumpstart the setup. JavaScript was used for the filtering logic, and CSS helped style the app.
Future Improvements

In the future, I hope to add features like user accounts, more sorting options, and improve the display of search results.

2024/10/31
