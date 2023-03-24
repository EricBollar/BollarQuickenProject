https://github.com/EricBollar/BollarQuickenProject

Here are the additions that I made to this project:

1. Implemented Key Presses
    - Created useKeyboard.js which uses hooks to manage the state of certain key presses by making an eventlistener on the page.

2. Refactored the project
    - Having the entire game in one file made it a bit difficult to work with in terms of adding onto it
    - Split the project into TurtleGame.js, Navbar.js, and Footer.js. Index.js uses the updated React render call to render App.js, which simply formats the main components.

3. Implemented Canvas Re-sizing
    - With the project now destructured, it was straight-forward to use the given UI for Canvas resizing and implement it

4. Implemented Color Selection
    - Created ColorSliders.js which handles the color selection process and passes the information to TurtleGame.js

5. Implemented Pagination
    - Created "/otherpage" which can be redirected to with buttons in the navbar. Can also redirect back to "/"
