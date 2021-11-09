import React from "react";
import { Link } from 'react-router-dom';
import './style.scss';

const NotFound = (props) => {
    return <>
        <div className="page_404">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 ">
                        <div className="w-100 col-sm-10 col-sm-offset-1  text-center">
                            <div className="background-notfound">
                                <h1 className="text-center ">404</h1>
                            </div>
                            <div className="contant_box_404">
                                {!props.somethingHappen ? <>
                                    <h3 className="h2">Look like you're lost</h3>
                                    <p>the page you are looking for not avaible!</p>
                                </> : <>
                                    <h3 className="h2">Something went wrong.</h3>
                                </>}
                                <Link to="/" className="link_404">Go to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default NotFound;