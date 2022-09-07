import ReqParamsCompIndex from '../components/reqParamsComp/index';
import EventListener from '../components/eventListener';
import 'antd/dist/antd.css';
import ObserverPage from '../components/observer';
import Animation from '../components/animattion';
import DebouncePage from '../components/debounce';
import MediaPage from '../components/media';

export default function Web() {
	return (
		<div style={{ padding: 20 }}>
			{/* <h1>media: </h1>
			<MediaPage /> */}
			{/* <h1>debounce: </h1>
			<DebouncePage />
			<h1>Animation: </h1>
			<Animation />
			<h1>Observer: </h1>
			<ObserverPage />
			<h1>EventListener: </h1>
			<EventListener /> */}
			<h1>useDeepEffect: </h1>
			<ReqParamsCompIndex />
		</div>
	);
}
