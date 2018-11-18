const React = require('react');
const ReactDOM = require('react-dom');

class Main extends React.Component {

    render() {
        return <h1>Hello World !!!</h1>
    }
}


ReactDOM.render(
    <Main />, document.getElementById('app')
);