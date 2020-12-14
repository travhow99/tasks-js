import './App.css';
import { Container, Row, Col } from 'reactstrap';
import Task from './components/Task';
import AddTask from './components/AddTask';
import Calendar from './components/Calendar';

function App() {
	return (
		<div>
			<header className="App-header">
				Tasks.js
			</header>
			<Container className="th-container">
				<Row>
					<Col lg>
						<Calendar />
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