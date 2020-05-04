import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { find, reject } from 'lodash';
import { HomeworkService } from '../../services/homework.service';

import './App.css';
import { ListItem, HomeworkDetails } from '..';

// const BACKEND_SERVER = 'https://promise-server.herokuapp.com';
// const BACKEND_SERVER = 'http://localhost:5000';

export class App extends Component {
  state = {
    homeworks: []
  }

  async componentDidMount() {
    this.homeworkService = new HomeworkService();
    const homeworks = await this.homeworkService.fetchList();
    this.setState({ homeworks });
  }

  handleAction = async (action) => {
    switch(action.type) {

      case 'delete':
        try {
          this.homeworkService.deleteOne(action);
          this.setState({ homeworks: reject(this.state.homeworks, { id: action.value.id }) });
        } catch (ignore) { }
        break;

      case 'update':
        try {
          const newHomeworks = await this.homeworkService.updateOne(this.state.homeworks, action);
          this.setState({ homeworks: newHomeworks });
        } catch (ignore) { }
        break;

      default:
        console.log('App click', action);
    }
  }


  render() {
    return (
      <div className="App">
        <header>
          App main page
          <Link to="/"><div>Home</div></Link>
        </header>

        <Route path="/" exact={true}>
          {this.state.homeworks.map((hw) =>
            <ListItem
              key={hw.id}
              id={hw.id}
              title={hw.title}
              number={hw.number}
              onAction={this.handleAction}>
            </ListItem>
          )}
        </Route>

        <Route path="/homeworks/:hwid/" render={({ match }) => {
          const homework = find(this.state.homeworks, { id: match.params.hwid });
          if (!homework) return null;
          return <HomeworkDetails homework={homework} onAction={this.handleAction}></HomeworkDetails>
        }}/>
      </div>
    )
  }
}

