# Basics using REact (hooks) with D3
vid src: https://www.youtube.com/watch?v=9uEmNgHzPhQ

Installing React with create-react-app
https://reactjs.org/docs/create-a-new-react-app.html#create-react-app

First uninstall old version of create-react-app with: 
$ npm uninstall -g create-react-app
Then run: 
$ npx create-react-app my-app

## React.Fragment

````js

render() {
  return (
    // Extraneous div element :(
    <div>
      Some text.
      <h2>A heading</h2>
      More text.
      <h2>Another heading</h2>
      Even more text.
    </div>
  );
}

````

````js

render() {
  return (
    <Fragment>
      Some text.
      <h2>A heading</h2>
      More text.
      <h2>Another heading</h2>
      Even more text.
    </Fragment>
  );
}

````

It’s a tiny bit faster and has less memory usage (no need to create an extra DOM node). 
Some CSS mechanisms like Flexbox and CSS Grid have a special parent-child relationship, and adding divs in the middle makes it hard to keep the desired layout while extracting logical components.
You can replace the extra div tags with React.Fragment
3. Writing React.Fragment every time is too long for you. React.Fragment has a shorthand syntax that you can use. It is <>...</>.

Why use React.Fragment than div
https://stackoverflow.com/questions/47761894/why-are-fragments-in-react-16-better-than-container-divs

