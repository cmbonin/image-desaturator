import React from 'react';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

export default class Navigation extends React.Component {
	render () {
		return (
			<Nav bsStyle="tabs">
				<IndexLinkContainer to="/">
					<NavItem>Black and white an image</NavItem>
				</IndexLinkContainer>
			</Nav>
		);
	}
}
