import React, { Component } from "react";
import ReactDOM from "react-dom";
import courses from "./courses";
import "./styles.css";
import authorEndpoint from "./fetchAuthorData";

let hash = new Map();
let authorHash = new Map();

//Save the unique categories and count the occurence using a hash
function categoryNum(objArr) {
  for (let i = 0; i < objArr.length; i++) {
    if (objArr[i].tags) {
      for (let j = 0; j < objArr[i].tags.length; j++) {
        if (hash.has(objArr[i].tags[j])) {
          hash.set(objArr[i].tags[j], hash.get(objArr[i].tags[j]) + 1);
        } else {
          hash.set(objArr[i].tags[j], 1);
        }
      }
    }
  }
  return hash;
}

let resHash = categoryNum(courses);

//Organize tags into "category(frequency)" format
resHash = Array.from(resHash, ([key, value]) => [key, value]);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterTrue: false,
      filterWord: "",
      authors: {}
    };
  }

  //fetch author names and set the information to state
  componentDidMount() {
    fetch(authorEndpoint)
      .then(response => response.json())
      .then(item =>
        this.setState({ authors: { ...item.authors, ...this.state.authors } })
      )
      .catch(error => {
        console.log(error);
      });
  }

  onAllClick(evt) {
    this.setState({
      filterTrue: false,
      filterWord: ""
    });
  }

  onClick(evt) {
    this.setState({
      filterTrue: evt.target.id.slice(0, 5),
      filterWord: evt.target.id.slice(5, evt.target.id.length - 2)
    });
  }
  render() {
    const authorsData = this.state.authors;

    //Record the unique authors and count the occurence using a hash
    function categoryAuthor(objArr) {
      for (let item in objArr) {
        if (authorHash.has(objArr[item])) {
          continue;
        } else {
          authorHash.set(objArr[item].id, objArr[item].name);
        }
      }
      return authorHash;
    }

    let authorsMap = categoryAuthor(authorsData);

    //using some Bootstrap for styling
    return (
      <div className="App">
        <div id="courseTags">
          <h1>Course Catalog</h1>

          <nav className="navbar navbar-light ">
            <form className="form-inline">
              <h3>What would you like to learn today?</h3>
              <button
                className="btn btn-outline-success"
                onClick={this.onAllClick.bind(this)}
                type="button"
              >
                Show all courses
              </button>

              <div className="courses-buttons p-2 justify-content:space-evenly  ">
                {resHash
                  .sort((a, b) => (a < b ? -1 : 1))
                  .map(tag => (
                    <button
                      className="btn btn-sm btn-outline-secondary btn-light"
                      type="button"
                      id={`true,${tag}`}
                      onClick={this.onClick.bind(this)}
                    >{`${tag[0]} (${tag[1]})`}</button>
                  ))}
              </div>
            </form>
          </nav>
        </div>

        <div className="col-sm">
          <div className="card-deck">
            <div className="card-columns">
              {courses
                .filter(course => {
                  if (this.state.filterTrue) {
                    return (
                      this.state.filterTrue &&
                      course.tags.includes(this.state.filterWord)
                    );
                  } else {
                    return course;
                  }
                })
                .map(course => (
                  <div
                    className="card"
                    d-flex="true"
                    align-items-flex-start
                    justify-content-flex-start
                    key={course.key}
                  >
                    <div className="card-body ">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title"> {course.title}</h5>
                          <h6>by {authorsMap.get(course.author_id)}</h6>
                          <p>{[...course.tags].map(item => item + " ")}</p>
                        </div>
                        <div className="col">
                          <img
                            className="card-img-top"
                            src={course.image}
                            alt={"alt"}
                          />
                        </div>
                      </div>
                      <a href="/" className="start btn-secondary btn-sm">
                        Start!
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
