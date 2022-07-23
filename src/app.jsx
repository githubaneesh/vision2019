// @flow
import React, {Component} from 'react';
import '../node_modules/normalize.css';
import './assets/styles/main.scss';  /* removed index.scss and linked main.css -GM  */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo,faPlus,faHome,faDownload,faPrint,faFilm,faFilePdf,faCog,faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faIgloo,faPlus,faHome,faDownload,faPrint,faFilm,faFilePdf,faCog,faTrash);
type Props = {};
type State = {};

class App extends React.Component<State, Props> {

  constructor(props: Object)
  {
    super(props);
  }
  componentDidMount() {
    const {history} = this.props;
    if(history.location.pathname == "/"){
      return history.push("/home");
    }
  }
  render(){
    return (
      null
    )
  }
}

export default App;