import './App.css';
import { Container, Row, Col } from 'reactstrap';
import Task from './components/Task';
import AddTask from './components/AddTask';

function App() {
	return (
		<div>
			<header className="App-header">
				Tasks.js
			</header>
			<Container className="th-container">
				<Row>
					<Col lg>
						<div>
							Calendar
						</div>
					</Col>
					<Col>
						<Task />	
						<AddTask />
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default App;