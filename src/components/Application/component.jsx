import React from 'react';
import { PageHeader } from 'react-bootstrap';
import ImageDesaturator from '../ImageDesaturator/component';

export default class Application extends React.Component {


  render () {
    return (
      <div className="container">
        <PageHeader>
          Image Desaturator
        </PageHeader>
        <ImageDesaturator />
      </div>
    );
  }
}
