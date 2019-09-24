import React from "react";

const HomePage = ({ history }) => {
  let text = "";
  return (
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted stackable header">
            <img
              className="ui image massive"
              src="/assets/baseline_restaurant_white_18dp.png"
              alt="logo"
            />
            <div className="content">Carlo De Fromaggio</div>
          </h1>
          <h2>An Italian Experience</h2>
          <form
            onSubmit={event => {
              if (text === "1234") {
                history.push("/events");
              } else {
                text = "";
                alert("Wrong password!");
              }
              event.preventDefault();
            }}
          >
            <label>
              <input
                type="password"
                onChange={event => {
                  text = event.target.value;
                }}
              />
            </label>
            <input type="submit" value="Log in" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
