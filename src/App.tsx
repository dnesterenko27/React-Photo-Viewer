import React from 'react';
import List from "./list/List";

class App extends React.Component<any, any> {
    render() {
        return (
            <div className="wrapper">
                <h1>Photos</h1>
                <List/>
            </div>
        )
    }
}

export default App;
