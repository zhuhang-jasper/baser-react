## Wordbaser++

An enhanced version of [baser-react](https://github.com/blainesch/baser-react). (A script to help you find better word combinations.)

![Image](https://i.imgur.com/J0yNZft.png)

Sample: https://zhuhangsirs.azurewebsites.net/wordbaser/simulator.html

### Enhancements
- ~~Updated dictionary for more words (396K)~~
- Swap color sides
- Clear selected words traced on the board
- Fill words onto board from textarea input (bug) See tip\*\*
- Board Preset snapshots (requires modification at Javascript)

### Known Issues
1. Letters filled from textarea do not render into react component. See tip\*\*
2. Cannot load board preset once the board was rendered.

**Tip: Click the first letter (top left) and keep hitting 'TAB' button until you reach the last letter (bottom right).**

### How to use
1. Use `npm install`
2. Open simulator.html, modify JavaScript accordingly.

Wordbase game App (available on
[iphone](https://itunes.apple.com/us/app/wordbase/id777638764?mt=8) and
[android](https://play.google.com/store/apps/details?id=com.wordbaseapp&hl=en))
