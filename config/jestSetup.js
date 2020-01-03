// import "raf/polyfill"; // may need this when dealing with requestAnimationFrame
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as Aphrodite from 'aphrodite';
import * as AphroditeNoImportant from 'aphrodite/no-important';

// fix for known Jest + Aphrodite issue: https://github.com/Khan/aphrodite/issues/62
// adapting what appears to be the "cleanest" solution, from: https://github.com/dmiller9911/jest-aphrodite-react/blob/8c1344eb9b9e271bd171a95f53c005d934cb696d/jestSetup.js
Aphrodite.StyleSheetTestUtils.suppressStyleInjection();
AphroditeNoImportant.StyleSheetTestUtils.suppressStyleInjection();

// configure Enzyme adapter for React
Enzyme.configure({ adapter: new Adapter() });
