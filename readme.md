## Wordbaser++

An enhanced version of [baser-react](https://github.com/blainesch/baser-react). (A script to help you find better word combinations.)

![Image](https://i.imgur.com/38aMCmN.png)

Sample: https://zhuhangsirs.azurewebsites.net/wordbaser/simulator.html

### Enhancements
- Able to pre-define letters to board via JavaScript. See tip\*\*
- Updated dictionary for more words (~396K)
- Swap color sides
- Clear selected words traced on the board (bug)
- Fill words onto board from textarea input
- *TODO: Save/Load snapshot of board information*

### Known Issues
1. Pre-defined letters do not rendered into react component. See tip\*\*
2. Clear button did not clean in proper way.

**Tip: Click the first letter (top left) and keep hitting 'TAB' button until you reach the last letter (bottom right).**

### How to use
1. Use `npm install` or Copy from 'gh-pages' branch.
2. Open simulator.html JavaScript section, modify accordingly.
3. See known issues before you 'Find Word'.

Wordbase game App (available on
[iphone](https://itunes.apple.com/us/app/wordbase/id777638764?mt=8) and
[android](https://play.google.com/store/apps/details?id=com.wordbaseapp&hl=en))
