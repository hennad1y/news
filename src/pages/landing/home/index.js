import React from "react";

const Home = () => {
    return (
        <div className="mt-5">
            <h1 className="mb-5">Welcome</h1>

            <div className="mb-3">
                This is a news application.
            </div>
            <div className="mb-3">
                Search and browsing of the news in different languages has been realized. Also you can bookmark the news
                interesting for you.
            </div>
            <div className="mb-3">
                You must register and log in before using functional described above. The news page is protected from
                not authorized users
            </div>
            <div className="mb-3">
                Application use api:
                <p>
                    1) <a href="//firebase.google.com/" target="_blank" rel="noopener noreferrer">Firebase</a> -
                    a resource granting registration, authorization and storage of the news favoured by the user
                </p>
                <p>
                    2) <a href="//newsapi.org/" target="_blank" rel="noopener noreferrer">Newsapi</a> -
                    a news resource.
                </p>
            </div>
        </div>
    )
};

export default Home;