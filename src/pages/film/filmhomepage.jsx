import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import Film from "./film";
import AddFilm from "./add-film"
import UpdateFilm from "./update-film";
class FilmHomepage extends React.Component{
      render(){
      	return(
        <Switch>
        <Route path='/filmhomepage' component={Film} exact></Route>
        <Route path='/filmhomepage/add-film' component={AddFilm}></Route>
         <Route path='/filmhomepage/update-film' component={UpdateFilm}></Route>
        <Redirect to="/filmhomepage"/>
        </Switch>


      		)
      }
}

export default FilmHomepage