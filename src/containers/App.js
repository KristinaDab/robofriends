import React, {Component} from 'react';
import CardList from '../components/CardList'
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';




class App extends Component {
	constructor() {
		super()
		//State is that something can change and 
		// affect our app and state lives usually in the parent component
		// So, our app has 2 states: robots and searchfield
		this.state = {        
			robots: [],
			searchfield: ''
		}

	}

	// Here we don't need arrow function because it is a part of React
	//This will be run after render() method. Like an update. And then render again
	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => {this.setState({robots: users})});
	}

	// This function updates the state of the searchfield to whatever we type
	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value}) //Updating the searchfield

	}

	render() {

		const {robots, searchfield} = this.state;

		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		});

		if(!robots.length) {
			return <h1>Loading</h1>
		} else {
			return (
				<div className='tc'>
					<h1 className='f1'>Robofriends</h1>
					<Searchbox searchChange={this.onSearchChange}/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots={filteredRobots} />
						</ErrorBoundry>
					</Scroll>
				</div>
				);

		}
	}
}

export default App;