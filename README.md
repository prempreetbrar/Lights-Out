# Lights Out
Lights Out, a replica of the popular game made by Tiger Electronics (read more about it [here]( https://en.wikipedia.org/wiki/Lights_Out_%28game%29)). Game made using React.js and Material-UI.

The rules are simple. You want to turn all the lights off to win; whenever you click a light, it and its surrounding lights are all toggled (like a "plus" sign). [Here](https://en.wikipedia.org/wiki/Lights_Out_(game)#Light_chasing) is an easy strategy that guarantees a win.

## Note that the board given is ALWAYS solvable (you don't have to worry about encountering an unbeatable board!) **Click [*here*](https://prempreetbrar.github.io/Lights-Out/) to play!** Or, watch a quick gif of me playing below:

![](Lights-Out-Demo.gif)

&nbsp;

### If you are on Windows and want to start up the project on your local machine:

1. Ensure you have **Node.js 16.13.0 and npm (any version)** or above installed by writing ```node --version``` and ```npm --version``` in the terminal; if either Node or npm are missing, [install Node.js and npm](https://nodejs.org/en/download/) (ensure you click *Windows Installer* on the LTS tab for your installation), open the .msi file and follow the steps.
<ul>
  <li><u>There will be a custom setup tab that says you can "click the icons in the tree" to change the installation. DO NOT click any of the icons; simply click next.</u></li>
  <li>There will be a screen that says "Tools for Native Modules." Ensure you check the box that says <u>"Automatically install the necessary tools."<u></li>
</ul>
  
  
2. A terminal called "Install Additional Tools for Node.js" will pop up, prompting you to ```Press any key to continue . . . ```. Continue pressing keys until you are prompted to open Powershell.

3. Powershell will open and begin installing packages; it may look like the terminal has "frozen"; this is simply the installation taking its time, DO NOT close the Powershell terminal (if it has still not finished after 20 minutes then hit the enter key to see if it will display any message, as the confirmation message may be stuck in a backlog). 

4. The Powershell terminal will eventually say ```Type ENTER to exit``` (or immediately after you pressed the enter key); type ENTER and hit the enter key.

5. Check if you have node installed by running ```node --version``` in the terminal. If not, open the .msi installation package and click "repair." Follow the steps.

6. Click on the green button on the top right that says "Code". Click download ZIP, unzip the file, right click on the *Lights-out-master* folder and select *copy as path*. Open up a terminal and write

```
cd <putThePathYouCopiedHereUsingControlV (without the angle brackets)>
npm install
npm start
```
This will open up the Lights Out game using your computer as a host in your default browser. (It may take up to a minute to load when starting the app up initially).

&nbsp;
    
### If you are on MacOS and want to start up the project on your local machine:
    
1. Ensure you have **Node.js 16.13.0 and npm (any version)** or above installed by writing ```node --version``` and ```npm --version``` in the terminal; if either Node or npm are missing, write ```brew --version``` in the terminal. If brew is not missing, continue to step 2. If brew is missing, first install it by writing 
    ```/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"```
in the terminal. 
2. In the terminal, write
    
    ```
    brew update
    brew install node
    ```

3. Check if you have node and npm installed by running ```node --version``` and ```npm --version``` in the terminal. If not, repeat step 2.
    
4. Click on the green button on the top right that says "Code". Click download ZIP, right click on the *Lights-out-master* folder, click *Get Info*, copy the path (the text beside *Where*): 
![image](https://user-images.githubusercontent.com/89614923/177059031-e221486f-dfcd-4d1a-b864-e04de2f3e93d.png)
    
5. Open up a terminal and write

```
cd <putThePathYouCopiedHereUsingControlV (without the angle brackets)>
npm install
npm start
```
This will open up the Hangman game using your computer as a host in your default browser. (It may take up to a minute to load when starting the app up initially).
    
&nbsp;    

### If you are on Linux and want to start up the project on your local machine:
    
1. Open up a terminal and write ```sudo apt-get install build-essential curl git m4 ruby texinfo libbz2-dev libcurl4-openssl-dev libexpat-dev libncurses-dev zlib1g-dev``` if you have a **Ubuntu** or **Debian**  based Linux distribution; write ```sudo yum groupinstall 'Development Tools' && sudo yum install curl git m4 ruby texinfo bzip2-devel curl-devel expat-devel ncurses-devel zlib-devel``` if you have a **Fedora** based Linux distribution. It will prompt you to type in Y/N, make sure you type in Y (yes to the installation).

2. Open up a terminal (or use the same one) and write ```homebrew --version```. If you are missing homebrew, write ```ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/linuxbrew/go/install)"``` to install it (if you have homebrew skip to step 3).
    
3. Open up a terminal (or use the same one) and write ```vim ~/.bashrc```. Add the following three lines of code to the file:
    
    ```
    export PATH="$HOME/.linuxbrew/bin:$PATH"
    export MANPATH="$HOME/.linuxbrew/share/man:$MANPATH"
    export INFOPATH="$HOME/.linuxbrew/share/info:$INFOPATH"
    ```
    
4. Open up a terminal (or use the same one) and write ```brew install node```. Wait for the installation to finish.

5. Open up a terminal (or use the same one) and write ```node --version``` and ```npm --version```. If either node or npm are missing, repeat steps 1-4.

6. Click on the green button on the top right that says "Code". Click download ZIP, and then unzip the *Lights-out-master* folder. Open up a terminal (or use the same one) and write
    
    ```
    cd ~/<Your Username>/Downloads/Lights-out-master
    npm install
    npm start
    ```

This will open up the Lights Out game using your computer as a host in your default browser. (It may take up to a minute to load when starting the app up initially).
    
## Features

- The board you are given is ALWAYS solvable; however, the algorithm I implemented may not work if you change your board to a different size (especially if you make it a rectangle).
- You can go into the code and change the grid from 5x5 to a different size (5x5 is the default).
- You can restart as many times as you'd like.

## Limitations/Design Choices

- Functional components and React hooks are used, however, in the process of making this I ensured I had a deep understanding of class components (in case I am ever working with an older codebase).
- I rarely use arrow functions; I want to be as explicit as I can when possible, and only use arrow functions for callbacks. In a class component, I would use an arrow function so I don't have to explicitly bind ```this```, but this is not a concern in a functional component.
- The algorithm for determining if a board is solvable is a brute force method (it solves the entire game itself before showing the board to you).  I tried using a more generalized method but these involved [a lot of linear algebra](https://ida.mtholyoke.edu/bitstream/handle/10166/693/375.pdf?sequence=1&isAllowed=y) (which I love but wasn't wanting to code at this moment :D). My focus was on learning React, rather than getting sidetracked on the best algorithm to use in the game.
- The game itself uses HTML tables; this is a 1990s approach to formatting a webpage, but I stuck with it because my primary focus was on the interaction between the components, NOT on HTML and CSS. 
- A lot of the CSS is taken from a tutorial; without this CSS I would have had a grey and white square (which wouldn't have been as appealing!). The focus of this project was to improve my React skills.
