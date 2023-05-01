import React from 'react';
import PropTypes from 'prop-types';

import { AdaptivityProvider,
	ConfigProvider,
	AppRoot,
	SplitLayout,
	SplitCol,
	View,
	Panel,
	PanelHeader,
	Header,
	Group,
	Card,
	CardGrid,
	SimpleCell,
	Forms, FormItem, FormField } from '@vkontakte/vkui';

import persik from '../img/persik.png';
import './Persik.css';

const Persik = props => (

	
	<View activePanel="card">
		<Panel id="card">
			<Group>
			<Header mode="primary" size="large">
				Большой заголовок
			</Header>
			</Group>
			</Panel>
		</View>
);



Persik.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Persik;
